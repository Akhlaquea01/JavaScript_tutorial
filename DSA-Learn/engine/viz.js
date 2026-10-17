/* DSA-Learn/engine/viz.js
   The visualisers. Each "kind" draws the main picture of a frame; the pieces shared by every kind
   (variables, boxes such as stack/queue/map/buckets, and the final answer banner) live in `stage`.

   Frame fields by kind
     array : cells[], ptr{label:index}, tone{index:tone}, range[l,r], rows[{label,cells,tone}], endSlot, label
     tree  : tone{nodeId:tone}, path[nodeIds], badge{nodeId:text}          (scene.tree = root node)
     none  : nothing (only boxes / vars)
   Shared  : vars{name:value}, boxes[{label,kind,items,hint}], out, outTone
   Tones   : cur  good  bad  mark  done  dim                                                         */
(function () {
  "use strict";
  const DSA = window.DSA;
  const { esc } = DSA.util;
  const viz = (DSA.viz = { kinds: {}, stage: {} });

  /* =========================================================
     ARRAY
     ========================================================= */
  viz.kinds.array = {
    mount(el) {
      let sig = null;
      let cellEls = [];
      let rowEls = [];
      let lane = null;
      const ptrEls = new Map();
      const colour = new Map();

      function build(f) {
        const n = f.cells.length;
        const rows = f.rows || [];
        sig = [n, rows.map((r) => r.cells.length).join(","), f.endSlot ? 1 : 0, f.label || ""].join("|");
        const cell = (i, withIdx) => `<div class="va-cell"><span class="x">${withIdx ? i : ""}</span><span class="v"></span></div>`;
        const main = Array.from({ length: n }, (_, i) => cell(i, true)).join("") + (f.endSlot ? `<div class="va-cell end"><span class="x">${n}</span><span class="v">end</span></div>` : "");
        const extra = rows
          .map((r) => `<div><div class="va-title">${esc(r.label || "")}</div><div class="va-row sm">${r.cells.map((_, i) => cell(i, false)).join("")}</div></div>`)
          .join("");
        el.innerHTML = `<div class="va">${f.label ? `<div class="va-title">${esc(f.label)}</div>` : ""}<div class="va-row va-main">${main}</div><div class="va-ptrs"></div><div class="va-extra">${extra}</div></div>`;
        cellEls = [...el.querySelectorAll(".va-row.va-main .va-cell:not(.end)")];
        rowEls = [...el.querySelectorAll(".va-row.sm")].map((r) => [...r.querySelectorAll(".va-cell")]);
        lane = el.querySelector(".va-ptrs");
        ptrEls.clear();
      }

      const toneClass = (t) => (t ? " t-" + t : "");

      return {
        update(f, prev) {
          const s = [f.cells.length, (f.rows || []).map((r) => r.cells.length).join(","), f.endSlot ? 1 : 0, f.label || ""].join("|");
          if (s !== sig) build(f);
          const n = f.cells.length;
          const [lo, hi] = f.range || [0, n + 1];
          const hasRange = !!f.range;

          cellEls.forEach((c, i) => {
            const changed = prev && prev.cells && prev.cells.length === n && prev.cells[i] !== f.cells[i];
            const out = hasRange && (i < lo || i > hi);
            c.className = "va-cell" + toneClass(f.tone && f.tone[i]) + (out ? " is-out" : "") + (changed ? " chg" : "");
            c.querySelector(".v").textContent = f.cells[i];
          });
          const endCell = el.querySelector(".va-cell.end");
          if (endCell) endCell.classList.toggle("is-out", hasRange && (n < lo || n > hi));

          (f.rows || []).forEach((r, ri) => {
            r.cells.forEach((v, i) => {
              const c = rowEls[ri][i];
              const prevRow = prev && prev.rows && prev.rows[ri];
              const changed = prevRow && prevRow.cells[i] !== v;
              c.className = "va-cell" + toneClass(r.tone && r.tone[i]) + (changed ? " chg" : "");
              c.querySelector(".v").textContent = v === null || v === undefined ? "" : v;
            });
          });

          // pointers: one element per label, slid with CSS transitions
          const groups = {};
          Object.entries(f.ptr || {}).forEach(([label, idx]) => {
            if (!Number.isInteger(idx)) return;
            (groups[idx] = groups[idx] || []).push(label);
          });
          const seen = new Set();
          let deepest = 1;
          Object.entries(groups).forEach(([idx, labels]) => {
            labels.sort();
            deepest = Math.max(deepest, labels.length);
            labels.forEach((label, k) => {
              seen.add(label);
              let p = ptrEls.get(label);
              if (!p) {
                if (!colour.has(label)) colour.set(label, colour.size % 6);
                p = document.createElement("div");
                p.className = "va-ptr pc" + colour.get(label);
                p.textContent = label;
                lane.appendChild(p);
                ptrEls.set(label, p);
                p.style.left = `calc(${idx} * (var(--cw) + var(--cg)) + var(--cw) / 2)`;
                void p.offsetWidth; // start from here, not from 0
              }
              p.classList.remove("gone");
              p.style.left = `calc(${idx} * (var(--cw) + var(--cg)) + var(--cw) / 2)`;
              p.style.top = k * 17 + "px";
            });
          });
          ptrEls.forEach((p, label) => p.classList.toggle("gone", !seen.has(label)));
          lane.style.height = 12 + deepest * 17 + "px";
        }
      };
    }
  };

  /* =========================================================
     TREE (binary tree, or n-ary tree with `children`; SVG)
       scene.tree  : root node { id, val, left, right }  or  { id, val, children: [...], edge? }
       frame       : tone{id:tone}, path[ids], badge{id:text}, vals{id:text}, hide[ids]
     ========================================================= */
  viz.kinds.tree = {
    mount(el, scene) {
      const root = scene.tree;
      if (!root) {
        el.innerHTML = '<div class="vt-empty">Empty tree</div>';
        return { update() {} };
      }
      const kids = (n) => (n.children ? n.children : [n.left, n.right].filter(Boolean));
      const all = [];
      (function collect(n) { all.push(n); kids(n).forEach(collect); })(root);
      const nary = all.some((n) => n.children);

      // positions in "slots" (x) and levels (d)
      const pos = new Map();
      let slot = 0;
      let maxD = 0;
      if (!nary) {
        (function walk(n, d) {
          if (!n) return;
          walk(n.left, d + 1);
          pos.set(n.id, { x: slot++, d });
          maxD = Math.max(maxD, d);
          walk(n.right, d + 1);
        })(root, 0);
      } else {
        (function walk(n, d) {
          const ks = kids(n);
          maxD = Math.max(maxD, d);
          if (!ks.length) {
            pos.set(n.id, { x: slot++, d });
            return;
          }
          ks.forEach((k) => walk(k, d + 1));
          pos.set(n.id, { x: (pos.get(ks[0].id).x + pos.get(ks[ks.length - 1].id).x) / 2, d });
        })(root, 0);
      }

      const maxLen = Math.max(...all.map((n) => String(n.val).length));
      const pill = maxLen > 2;
      const nodeW = pill ? Math.max(40, maxLen * 8 + 16) : 38;
      const dx = Math.max(48, nodeW + 14);
      const dy = nary ? 72 : 64;
      const pad = 24;
      const slots = Math.max(...[...pos.values()].map((p) => p.x));
      const W = slots * dx + pad * 2 + nodeW;
      const H = maxD * dy + pad * 2 + 22;
      const cx = (id) => pad + nodeW / 2 + pos.get(id).x * dx;
      const cy = (id) => pad + 8 + pos.get(id).d * dy;

      const edges = [];
      const nodes = [];
      all.forEach((n) => {
        kids(n).forEach((c) => {
          edges.push(`<line class="vt-edge" data-p="${n.id}" data-c="${c.id}" x1="${cx(n.id)}" y1="${cy(n.id)}" x2="${cx(c.id)}" y2="${cy(c.id)}"/>`);
          if (c.edge !== undefined) {
            edges.push(`<text class="vt-el" data-c="${c.id}" x="${(cx(n.id) + cx(c.id)) / 2 + (cx(c.id) < cx(n.id) ? -7 : 7)}" y="${(cy(n.id) + cy(c.id)) / 2 + 4}">${esc(c.edge)}</text>`);
          }
        });
        const shape = pill
          ? `<rect x="${-nodeW / 2}" y="-15" width="${nodeW}" height="30" rx="13"/>`
          : `<circle r="19"/>`;
        nodes.push(`<g class="vt-node" data-id="${n.id}" transform="translate(${cx(n.id)},${cy(n.id)})">${shape}<text class="vt-val" y="5">${esc(n.val)}</text><text class="vt-badge" y="${pill ? 29 : 33}"></text></g>`);
      });

      el.innerHTML = `<div class="vt-strip" hidden></div><svg class="vt" viewBox="0 0 ${W} ${H}" style="width:${W}px" role="img" aria-label="Tree">${edges.join("")}${nodes.join("")}</svg>`;
      const strip = el.querySelector(".vt-strip");
      const nodeEls = new Map([...el.querySelectorAll(".vt-node")].map((g) => [Number(g.dataset.id), g]));
      const edgeEls = [...el.querySelectorAll(".vt-edge")];
      const labelEls = [...el.querySelectorAll(".vt-el")];
      const own = new Map(all.map((n) => [n.id, String(n.val)]));

      return {
        update(f) {
          // optional strip of values above the tree (for example the level-order input array)
          strip.hidden = !f.cells;
          if (f.cells) strip.innerHTML = f.cells.map((c, k) => `<span class="vt-tok${f.cellTone && f.cellTone[k] ? " t-" + f.cellTone[k] : ""}">${esc(c)}</span>`).join("");
          const path = new Set(f.path || []);
          const hide = new Set(f.hide || []);
          nodeEls.forEach((g, id) => {
            const t = f.tone && f.tone[id];
            g.setAttribute("class", "vt-node" + (t ? " t-" + t : "") + (hide.has(id) ? " vt-hide" : ""));
            g.querySelector(".vt-badge").textContent = (f.badge && f.badge[id]) || "";
            g.querySelector(".vt-val").textContent = f.vals && f.vals[id] !== undefined ? f.vals[id] : own.get(id);
          });
          edgeEls.forEach((e) => {
            const on = path.has(Number(e.dataset.p)) && path.has(Number(e.dataset.c));
            e.setAttribute("class", "vt-edge" + (on ? " on" : "") + (hide.has(Number(e.dataset.c)) ? " vt-hide" : ""));
          });
          labelEls.forEach((t) => t.setAttribute("class", "vt-el" + (hide.has(Number(t.dataset.c)) ? " vt-hide" : "")));
        }
      };
    }
  };

  /* =========================================================
     NONE (boxes only)
     ========================================================= */
  viz.kinds.none = {
    mount() {
      return { update() {} };
    }
  };

  /* =========================================================
     SHARED STAGE PIECES
     ========================================================= */
  const fmt = (v) => (v !== null && typeof v === "object" ? JSON.stringify(v).replace(/,/g, ", ") : String(v));

  viz.stage.vars = function (f, prev) {
    const vars = f.vars || {};
    const before = (prev && prev.vars) || {};
    return Object.keys(vars)
      .map((k) => `<span class="var${prev && fmt(before[k]) !== fmt(vars[k]) ? " chg" : ""}">${esc(k)} = <b>${esc(fmt(vars[k]))}</b></span>`)
      .join("");
  };

  const chip = (it, extra) => {
    const o = it !== null && typeof it === "object" ? it : { v: it };
    return `<span class="ch${o.tone ? " t-" + o.tone : ""}${o.new ? " is-new" : ""}">${extra ? `<span class="tg">${extra}</span>` : ""}${esc(o.v)}</span>`;
  };

  function box(b) {
    const items = b.items || [];
    const empty = '<span class="bx-empty">empty</span>';
    let body;
    switch (b.kind) {
      case "stack":
        body = items.length ? `<div class="bx-stack">${items.slice().reverse().map((it, i) => chip(it, i === 0 ? "top" : "")).join("")}</div>` : empty;
        break;
      case "queue":
        body = items.length ? `<div class="bx-row">${items.map((it, i) => chip(it, i === 0 ? "front" : i === items.length - 1 && items.length > 1 ? "back" : "")).join("")}</div>` : empty;
        break;
      case "map":
        body = items.length
          ? `<div class="bx-map">${items.map((it) => `<span class="ch${it.tone ? " t-" + it.tone : ""}${it.new ? " is-new" : ""}">${esc(it.k)}</span><span class="ar">→</span><span class="ch${it.tone ? " t-" + it.tone : ""}${it.new ? " is-new" : ""}">${esc(it.v)}</span>`).join("")}</div>`
          : empty;
        break;
      case "buckets":
        body = `<div class="bx-bk">${items
          .map((it) => `<div class="bk"><span class="bk-i${it.tone ? " t-" + it.tone : ""}">${esc(it.id)}</span>${it.chain && it.chain.length ? it.chain.map((c) => chip(c)).join('<span class="ar">→</span>') : '<span class="bx-empty">empty</span>'}</div>`)
          .join("")}</div>`;
        break;
      default: // set | list | text
        body = items.length ? `<div class="bx-row">${items.map((it) => chip(it)).join("")}</div>` : empty;
    }
    return `<div class="bx"><div class="bx-l">${esc(b.label || "")}${b.hint ? ` <span class="bx-h">${esc(b.hint)}</span>` : ""}</div>${body}</div>`;
  }

  viz.stage.boxes = (f) => (f.boxes || []).map(box).join("");
  viz.stage.out = (f) => (f.out ? `<div class="out-banner${f.outTone === "bad" ? " bad" : ""}">${f.outTone === "bad" ? "✕" : "✓"} ${esc(f.out)}</div>` : "");
})();
