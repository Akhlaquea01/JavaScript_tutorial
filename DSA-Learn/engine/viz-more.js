/* DSA-Learn/engine/viz-more.js
   More visualiser kinds (the array / tree / none kinds live in viz.js).

   bars : bars[{label, value, tone, note}], max?, scale ("linear" | "log"), unit?
          horizontal bars, used to compare how much work or memory different approaches need            */
(function () {
  "use strict";
  const DSA = window.DSA;
  const { esc } = DSA.util;
  const kinds = DSA.viz.kinds;

  /* =========================================================
     BARS
     ========================================================= */
  kinds.bars = {
    mount(el) {
      let sig = null;
      let rows = [];
      return {
        update(f) {
          const bars = f.bars || [];
          const s = bars.map((b) => b.label).join("|");
          if (s !== sig) {
            sig = s;
            el.innerHTML = `<div class="vb">${f.title ? `<div class="va-title">${esc(f.title)}</div>` : ""}${bars
              .map((b) => `<div class="vb-row"><span class="vb-l">${esc(b.label)}</span><span class="vb-track"><i class="vb-fill"></i></span><span class="vb-v"></span></div>`)
              .join("")}</div>`;
            rows = [...el.querySelectorAll(".vb-row")];
          }
          const log = f.scale === "log";
          const sc = (v) => (log ? Math.log(1 + v) : v);
          const max = Math.max(1, sc(f.max != null ? f.max : Math.max(...bars.map((b) => b.value), 1)));
          bars.forEach((b, i) => {
            const r = rows[i];
            r.className = "vb-row" + (b.tone ? " t-" + b.tone : "");
            r.querySelector(".vb-fill").style.width = Math.max(0.8, (sc(b.value) / max) * 100) + "%";
            r.querySelector(".vb-v").textContent = Number(b.value).toLocaleString("en-US") + (f.unit ? " " + f.unit : "") + (b.note ? "  " + b.note : "");
          });
        }
      };
    }
  };

  /* =========================================================
     GRID (boards and 2D maps)
       frame.grid : 2D array of strings / numbers, tone{"row,col":tone}, checker (true = chess shading)
     ========================================================= */
  kinds.grid = {
    mount(el) {
      let sig = null;
      let cells = [];
      return {
        update(f) {
          const g = f.grid;
          const R = g.length;
          const C = g[0].length;
          const s = R + "x" + C;
          if (s !== sig) {
            sig = s;
            el.innerHTML = `<div class="vg" style="grid-template-columns: repeat(${C}, var(--cw))">${g
              .flatMap((row, r) => row.map((_, c) => `<div class="vg-cell" data-r="${r}" data-c="${c}"></div>`))
              .join("")}</div>`;
            cells = [...el.querySelectorAll(".vg-cell")];
          }
          cells.forEach((cell) => {
            const r = Number(cell.dataset.r);
            const c = Number(cell.dataset.c);
            const t = f.tone && f.tone[r + "," + c];
            cell.className = "vg-cell" + (t ? " t-" + t : "") + (f.checker && (r + c) % 2 ? " alt" : "");
            cell.textContent = g[r][c];
          });
        }
      };
    }
  };

  /* =========================================================
     LIST (linked lists, SVG)
       frame.lists[]: { label?, nodes[values], links?[next index per node], ptr{label:index}, tone{index:tone} }
       A link target of n (= nodes.length) is "null" on the right, -1 is "null" on the left.
       Default links: node i → i + 1, the last node → null (n). A link that changed since the previous
       frame is drawn amber so rewiring is easy to see.
     ========================================================= */
  kinds.list = {
    mount(el) {
      const GAP = 68, NW = 46, NH = 34, ROW = 136, TOP = 62, LEFT = 14;
      const cx = (i) => LEFT + GAP * (i + 1) + NW / 2;
      let sig = null;
      let svg = null;
      let linkG = null;
      let ptrG = null;
      let nodeEls = [];
      let nullEls = [];
      const ptrEls = new Map();
      const colour = new Map();
      const nextOf = (l, i) => (l.links && l.links[i] !== undefined ? l.links[i] : i < l.nodes.length - 1 ? i + 1 : l.nodes.length);

      function build(lists) {
        sig = lists.map((l) => l.nodes.length + "|" + (l.label || "")).join(";");
        const maxN = Math.max(...lists.map((l) => l.nodes.length));
        const W = LEFT * 2 + GAP * (maxN + 2) + NW;
        const H = TOP + (lists.length - 1) * ROW + NH + 56;
        let g = "";
        lists.forEach((l, r) => {
          const y = TOP + r * ROW;
          if (l.label) g += `<text class="vl-label" x="${LEFT}" y="${y - 38}">${esc(l.label)}</text>`;
          l.nodes.forEach((v, i) => {
            g += `<g class="vl-node" transform="translate(${cx(i)},${y})"><rect x="${-NW / 2}" y="0" width="${NW}" height="${NH}" rx="8"/><text class="vl-v" y="22">${esc(v)}</text></g>`;
          });
          g += `<text class="vl-null" x="${cx(-1)}" y="${y + 23}">∅</text><text class="vl-null" x="${cx(l.nodes.length)}" y="${y + 23}">∅</text>`;
        });
        el.innerHTML = `<svg class="vl" viewBox="0 0 ${W} ${H}" style="width:${W}px" role="img" aria-label="Linked list"><g class="vl-links"></g><g class="vl-nodes">${g}</g><g class="vl-ptrs"></g></svg>`;
        svg = el.querySelector("svg");
        linkG = svg.querySelector(".vl-links");
        ptrG = svg.querySelector(".vl-ptrs");
        ptrEls.forEach((p) => ptrG.appendChild(p)); // keep pointer elements so they keep sliding
        const rows = [];
        let k = 0;
        lists.forEach((l, r) => {
          rows.push({ nodes: [...svg.querySelectorAll(".vl-node")].slice(k, k + l.nodes.length) });
          k += l.nodes.length;
        });
        nodeEls = rows;
        const nulls = [...svg.querySelectorAll(".vl-null")];
        nullEls = lists.map((l, r) => ({ left: nulls[r * 2], right: nulls[r * 2 + 1] }));
      }

      const head = (x, y, dir, hot) => {
        const pts = { right: `${x},${y} ${x - 8},${y - 5} ${x - 8},${y + 5}`, left: `${x},${y} ${x + 8},${y - 5} ${x + 8},${y + 5}`, down: `${x},${y} ${x - 5},${y - 8} ${x + 5},${y - 8}`, up: `${x},${y} ${x - 5},${y + 8} ${x + 5},${y + 8}` }[dir];
        return `<polygon class="vl-head${hot ? " hot" : ""}" points="${pts}"/>`;
      };

      return {
        update(f, prev) {
          const lists = f.lists;
          const s = lists.map((l) => l.nodes.length + "|" + (l.label || "")).join(";");
          if (s !== sig) build(lists);

          let links = "";
          lists.forEach((l, r) => {
            const n = l.nodes.length;
            const y = TOP + r * ROW;
            const yc = y + NH / 2;
            const before = prev && prev.lists && prev.lists[r] && prev.lists[r].nodes.length === n ? prev.lists[r] : null;
            const used = { left: false, right: false };
            l.nodes.forEach((v, i) => {
              const t = nextOf(l, i);
              if (t === null) return;
              const hot = before ? nextOf(before, i) !== t : false;
              const cls = "vl-link" + (hot ? " hot" : "");
              if (t === n) used.right = true;
              if (t === -1) used.left = true;
              if (t === i + 1 || t === i - 1) {
                const forward = t > i;
                const nullSlot = t === n || t === -1;
                const x1 = cx(i) + (forward ? NW / 2 : -NW / 2);
                const x2 = nullSlot ? cx(t) + (forward ? -11 : 11) : cx(t) + (forward ? -NW / 2 : NW / 2);
                const ly = forward ? yc : yc + 9;
                links += `<line class="${cls}" x1="${x1}" y1="${ly}" x2="${x2 + (forward ? -6 : 6)}" y2="${ly}"/>${head(x2, ly, forward ? "right" : "left", hot)}`;
              } else if (t === i) {
                links += `<path class="${cls}" d="M ${cx(i) - 9} ${y} C ${cx(i) - 26} ${y - 34} ${cx(i) + 26} ${y - 34} ${cx(i) + 9} ${y - 8}"/>${head(cx(i) + 9, y - 1, "down", hot)}`;
              } else if (t > i) {
                links += `<path class="${cls}" d="M ${cx(i)} ${y} C ${cx(i)} ${y - 42} ${cx(t)} ${y - 42} ${cx(t)} ${y - 8}"/>${head(cx(t), y - 1, "down", hot)}`;
              } else {
                links += `<path class="${cls}" d="M ${cx(i)} ${y + NH} C ${cx(i)} ${y + NH + 42} ${cx(t)} ${y + NH + 42} ${cx(t)} ${y + NH + 8}"/>${head(cx(t), y + NH + 1, "up", hot)}`;
              }
            });
            // pointers that sit on a null slot also reveal it
            Object.values(l.ptr || {}).forEach((idx) => {
              if (idx === n) used.right = true;
              if (idx === -1) used.left = true;
            });
            nullEls[r].left.setAttribute("class", "vl-null" + (used.left ? " on" : ""));
            nullEls[r].right.setAttribute("class", "vl-null" + (used.right ? " on" : ""));
            l.nodes.forEach((v, i) => {
              const t = l.tone && l.tone[i];
              nodeEls[r].nodes[i].setAttribute("class", "vl-node" + (t ? " t-" + t : ""));
            });
          });
          linkG.innerHTML = links;

          // pointers
          const seen = new Set();
          lists.forEach((l, r) => {
            const groups = {};
            Object.entries(l.ptr || {}).forEach(([label, idx]) => {
              if (Number.isInteger(idx)) (groups[idx] = groups[idx] || []).push(label);
            });
            Object.entries(groups).forEach(([idx, labels]) => {
              labels.sort();
              labels.forEach((label, k) => {
                const key = r + ":" + label;
                seen.add(key);
                let p = ptrEls.get(key);
                const x = cx(Number(idx));
                const y = TOP + r * ROW - 16 - k * 17;
                if (!p) {
                  if (!colour.has(label)) colour.set(label, colour.size % 6);
                  p = document.createElementNS("http://www.w3.org/2000/svg", "g");
                  p.setAttribute("class", "vl-ptr pc" + colour.get(label));
                  p.innerHTML = `<text y="0">${esc(label)}</text><path d="M -4 4 L 4 4 L 0 10 Z"/>`;
                  p.style.transform = `translate(${x}px, ${y}px)`;
                  ptrG.appendChild(p);
                  ptrEls.set(key, p);
                  void p.getBoundingClientRect();
                }
                p.classList.remove("gone");
                p.style.transform = `translate(${x}px, ${y}px)`;
              });
            });
          });
          ptrEls.forEach((p, key) => p.classList.toggle("gone", !seen.has(key)));
        }
      };
    }
  };

  /* =========================================================
     INTERVALS (a time line of ranges, with an optional sweep line and a merged lane; SVG)
       scene : { min, max, n, rows?, merged?, mergedMax? }   n = most intervals ever drawn, rows = lanes (default n)
       frame : intervals[{ s, e, tone?, label?, lane? }]     one lane per interval unless `lane` is given
               merged[{ s, e, tone?, label? }], mergedLabel drawn together on one extra lane under the intervals
               line (a time) and lineLabel                    a dashed vertical sweep line that slides
       Bars cover [s, e], so touching intervals ([1,4] and [4,6]) meet at one tick.
     ========================================================= */
  kinds.intervals = {
    mount(el, scene) {
      const { min, max } = scene;
      const n = scene.n || 1;
      const rows = scene.rows || n;
      const hasRes = !!scene.merged;
      const nRes = scene.mergedMax || n;
      const W = 600, PL = 16, PR = 16, ROW = 26, BAR = 18, TOP = 22;
      const ux = (W - PL - PR) / (max - min);
      const X = (t) => PL + (t - min) * ux;
      const resTitleY = TOP + rows * ROW + 12;
      const resY = resTitleY + 6;
      const axisY = (hasRes ? resY + ROW : TOP + rows * ROW) + 4;
      const H = axisY + 26;
      const step = max - min > 30 ? 2 : 1;
      let grid = "";
      let ticks = "";
      for (let t = min; t <= max; t += step) {
        grid += `<line x1="${X(t)}" x2="${X(t)}" y1="${TOP - 4}" y2="${axisY}"/>`;
        ticks += `<text x="${X(t)}" y="${axisY + 15}">${t}</text>`;
      }
      const bar = (cls) => `<g class="${cls}"><rect rx="5"/><text/></g>`;
      el.innerHTML = `<svg class="vi" viewBox="0 0 ${W} ${H}" role="img" aria-label="Time line of intervals">
        <g class="vi-grid">${grid}</g>
        <line class="vi-axisline" x1="${PL}" x2="${W - PR}" y1="${axisY}" y2="${axisY}"/>
        <g class="vi-axis">${ticks}</g>
        ${hasRes ? `<text class="vi-title" x="${PL}" y="${resTitleY}"></text>` : ""}
        <g class="vi-bars">${Array.from({ length: n }, () => bar("vi-bar")).join("")}</g>
        <g class="vi-res">${Array.from({ length: hasRes ? nRes : 0 }, () => bar("vi-bar")).join("")}</g>
        <g class="vi-line gone"><line y1="${TOP - 10}" y2="${axisY}"/><text y="${TOP - 13}"></text></g>
      </svg>`;
      const svg = el.querySelector("svg");
      const bars = [...svg.querySelectorAll(".vi-bars .vi-bar")];
      const res = [...svg.querySelectorAll(".vi-res .vi-bar")];
      const title = svg.querySelector(".vi-title");
      const line = svg.querySelector(".vi-line");
      const lineText = line.querySelector("text");

      const place = (g, iv, y) => {
        const x1 = X(iv.s);
        const w = Math.max(6, X(iv.e) - x1);
        const rect = g.querySelector("rect");
        rect.setAttribute("x", x1);
        rect.setAttribute("y", y);
        rect.setAttribute("width", w);
        rect.setAttribute("height", BAR);
        const t = g.querySelector("text");
        const label = iv.label !== undefined ? iv.label : "[" + iv.s + ", " + iv.e + "]";
        t.textContent = label;
        const inside = w >= 8 + String(label).length * 6.4;
        t.setAttribute("x", inside ? x1 + w / 2 : x1 + w + 5);
        t.setAttribute("y", y + 13);
        t.setAttribute("text-anchor", inside ? "middle" : "start");
        g.setAttribute("class", "vi-bar" + (iv.tone ? " t-" + iv.tone : "") + (inside ? "" : " out"));
        g.style.display = "";
      };

      return {
        update(f) {
          const ivs = f.intervals || [];
          bars.forEach((g, i) => {
            const iv = ivs[i];
            if (!iv) return void (g.style.display = "none");
            place(g, iv, TOP + (iv.lane != null ? iv.lane : i) * ROW);
          });
          if (hasRes) {
            title.textContent = f.mergedLabel || "";
            const rs = f.merged || [];
            res.forEach((g, i) => {
              const iv = rs[i];
              if (!iv) return void (g.style.display = "none");
              place(g, iv, resY);
            });
          }
          const has = f.line !== undefined && f.line !== null;
          line.classList.toggle("gone", !has);
          if (has) {
            line.style.transform = `translateX(${X(f.line)}px)`;
            lineText.textContent = f.lineLabel || "";
          }
        }
      };
    }
  };

  /* =========================================================
     GRAPH (nodes on a circle, straight edges, optional arrowheads; SVG)
       scene : { n, edges[[u, v]], directed?, pos?[[x, y] as 0..1 fractions] }     nodes are 0 .. n-1
       frame : tone{node:tone}, etone{"u-v":tone}, badge{node:text}
               an undirected edge key is "u-v" in either order; a directed one is "u>v"
     ========================================================= */
  kinds.graph = {
    mount(el, scene) {
      const n = scene.n;
      const directed = !!scene.directed;
      const W = 460, H = n <= 2 ? 150 : 310, NR = 19;
      const pos = [];
      for (let i = 0; i < n; i++) {
        if (scene.pos && scene.pos[i]) pos.push({ x: 28 + scene.pos[i][0] * (W - 56), y: 28 + scene.pos[i][1] * (H - 70) });
        else if (n === 1) pos.push({ x: W / 2, y: H / 2 - 12 });
        else if (n === 2) pos.push({ x: W / 2 + (i ? 70 : -70), y: H / 2 - 12 });
        else {
          const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
          const R = Math.min(W / 2 - 44, H / 2 - 48);
          pos.push({ x: W / 2 + R * Math.cos(a), y: H / 2 - 8 + R * Math.sin(a) });
        }
      }
      const norm = (u, v) => (directed ? u + ">" + v : Math.min(u, v) + "-" + Math.max(u, v));
      let edgeSvg = "";
      (scene.edges || []).forEach(([u, v]) => {
        const dx = pos[v].x - pos[u].x, dy = pos[v].y - pos[u].y;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        const x1 = pos[u].x + ux * NR, y1 = pos[u].y + uy * NR;
        const x2 = pos[v].x - ux * (NR + (directed ? 1 : 0)), y2 = pos[v].y - uy * (NR + (directed ? 1 : 0));
        let head = "";
        if (directed) {
          const hx = x2 - ux * 9, hy = y2 - uy * 9;
          head = `<polygon points="${x2},${y2} ${hx - uy * 5},${hy + ux * 5} ${hx + uy * 5},${hy - ux * 5}"/>`;
        }
        edgeSvg += `<g class="vg2-edge" data-k="${norm(u, v)}"><line x1="${x1}" y1="${y1}" x2="${directed ? x2 - ux * 8 : x2}" y2="${directed ? y2 - uy * 8 : y2}"/>${head}</g>`;
      });
      let nodeSvg = "";
      for (let i = 0; i < n; i++) nodeSvg += `<g class="vt-node" data-id="${i}" transform="translate(${pos[i].x},${pos[i].y})"><circle r="${NR}"/><text class="vt-val" y="5">${i}</text><text class="vt-badge" y="35"></text></g>`;
      el.innerHTML = `<svg class="vt vg2" viewBox="0 0 ${W} ${H}" style="width:${W}px" role="img" aria-label="Graph">${edgeSvg}${nodeSvg}</svg>`;
      const nodeEls = [...el.querySelectorAll(".vt-node")];
      const edgeEls = new Map([...el.querySelectorAll(".vg2-edge")].map((g) => [g.dataset.k, g]));

      return {
        update(f) {
          nodeEls.forEach((g, i) => {
            const t = f.tone && f.tone[i];
            g.setAttribute("class", "vt-node" + (t ? " t-" + t : ""));
            g.querySelector(".vt-badge").textContent = (f.badge && f.badge[i]) || "";
          });
          const tones = {};
          Object.entries(f.etone || {}).forEach(([k, t]) => {
            const m = /^(\d+)([->])(\d+)$/.exec(k);
            if (m) tones[norm(Number(m[1]), Number(m[3]))] = t;
          });
          edgeEls.forEach((g, k) => g.setAttribute("class", "vg2-edge" + (tones[k] ? " t-" + tones[k] : "")));
        }
      };
    }
  };

  /* =========================================================
     HEAP (a binary heap drawn as a tree, with its backing array underneath; SVG + HTML)
       scene.caps  : [capacity of each heap]  (fixes the layout so nodes do not jump while the heap grows)
       frame.heaps : [{ label?, hint?, values[], tone{index:tone} }]
     Node i sits at array index i: parent (i-1)>>1, children 2i+1 and 2i+2. An edge lights up when both
     of its ends carry a tone, which is how a compare or a swap between parent and child is shown.
     ========================================================= */
  kinds.heap = {
    mount(el, scene) {
      const caps = (scene && scene.caps) || [7];
      const NW = 38, DX = 46, DY = 58, PAD = 20, TOP = 24;
      const pos = (i, leaf) => {
        const d = Math.floor(Math.log2(i + 1));
        const k = i - (2 ** d - 1);
        return { x: PAD + (k + 0.5) * ((leaf * DX) / 2 ** d), y: TOP + d * DY };
      };
      const blocks = caps.map((cap) => {
        const L = Math.max(1, Math.ceil(Math.log2(cap + 1)));
        const leaf = 2 ** (L - 1);
        const W = leaf * DX + PAD * 2;
        const H = TOP + (L - 1) * DY + 34;
        let edges = "";
        let nodes = "";
        for (let i = 0; i < cap; i++) {
          const p = pos(i, leaf);
          if (i > 0) {
            const q = pos((i - 1) >> 1, leaf);
            edges += `<line class="vt-edge" data-i="${i}" x1="${q.x}" y1="${q.y}" x2="${p.x}" y2="${p.y}"/>`;
          }
          nodes += `<g class="vt-node" data-i="${i}" transform="translate(${p.x},${p.y})"><circle r="19"/><text class="vt-val" y="5"></text><text class="vt-badge" y="33">${i}</text></g>`;
        }
        const cells = Array.from({ length: cap }, (_, i) => `<span class="vh-c empty" data-i="${i}"><i>${i}</i><b></b></span>`).join("");
        return `<div class="vh-block"><div class="va-title"></div><svg class="vt vh" viewBox="0 0 ${W} ${H}" style="width:${Math.min(W, 560)}px" role="img" aria-label="Heap">${edges}${nodes}</svg><div class="vh-arr">${cells}</div></div>`;
      });
      el.innerHTML = `<div class="vh-wrap">${blocks.join("")}</div>`;
      const parts = [...el.querySelectorAll(".vh-block")].map((b) => ({
        title: b.querySelector(".va-title"),
        nodes: [...b.querySelectorAll(".vt-node")],
        edges: [...b.querySelectorAll(".vt-edge")],
        cells: [...b.querySelectorAll(".vh-c")]
      }));

      return {
        update(f, prev) {
          (f.heaps || []).forEach((h, b) => {
            const part = parts[b];
            if (!part) return;
            const vals = h.values || [];
            const before = prev && prev.heaps && prev.heaps[b] ? prev.heaps[b].values : null;
            part.title.innerHTML = esc(h.label || "") + (h.hint ? ` <span class="bx-h">${esc(h.hint)}</span>` : "");
            part.nodes.forEach((g, i) => {
              const live = i < vals.length;
              const t = h.tone && h.tone[i];
              g.setAttribute("class", "vt-node" + (t ? " t-" + t : "") + (live ? "" : " vh-gone"));
              g.querySelector(".vt-val").textContent = live ? vals[i] : "";
            });
            part.edges.forEach((e, k) => {
              const i = k + 1;
              const live = i < vals.length;
              const on = live && h.tone && h.tone[i] && h.tone[(i - 1) >> 1];
              e.setAttribute("class", "vt-edge" + (on ? " on" : "") + (live ? "" : " vh-gone"));
            });
            part.cells.forEach((c, i) => {
              const live = i < vals.length;
              const t = h.tone && h.tone[i];
              const changed = live && before && before[i] !== vals[i];
              c.className = "vh-c" + (live ? "" : " empty") + (t ? " t-" + t : "") + (changed ? " chg" : "");
              c.querySelector("b").textContent = live ? vals[i] : "";
            });
          });
        }
      };
    }
  };
})();
