/* DSA-Learn/engine/util.js
   DOM-free helpers shared by the page and by the Node check script:
   text markup, code highlighting, demo inputs (parse / format / random), tree helpers and the
   frame builder that runs a demo's tracer. */
(function () {
  "use strict";

  const DSA = (window.DSA = window.DSA || {});
  const U = (DSA.util = {});

  /* ---------- text ---------- */
  U.esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // **bold**, *italic*, `code` inside any data string; everything else is escaped
  U.inline = function (s) {
    const codes = [];
    // park the code spans first so that **bold with `code` inside** and *italic* work around them
    const parked = String(s).replace(/`([^`]*)`/g, (_, c) => {
      codes.push(c);
      return "\u0000" + (codes.length - 1) + "\u0000";
    });
    return U.esc(parked)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\u0000(\d+)\u0000/g, (_, i) => `<code class="ic">${U.esc(codes[i])}</code>`);
  };

  const TOKEN_RE =
    /(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(function|return|const|let|var|if|else|for|while|of|in|new|class|constructor|this|null|true|false|undefined|break|continue|typeof|throw)\b|\b(\d+)\b/g;

  U.highlight = function (code, lang) {
    if (lang === "text") return U.esc(code);
    let out = "";
    let last = 0;
    let m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(code))) {
      out += U.esc(code.slice(last, m.index));
      const cls = m[1] ? "tk-c" : m[2] ? "tk-s" : m[3] ? "tk-k" : "tk-n";
      out += `<span class="${cls}">${U.esc(m[0])}</span>`;
      last = TOKEN_RE.lastIndex;
    }
    return out + U.esc(code.slice(last));
  };

  U.clone = (o) => JSON.parse(JSON.stringify(o));

  // { from..to: tone } for a run of cells, e.g. U.span(2, 5, "bad")
  U.span = (from, to, tone) => Object.fromEntries(Array.from({ length: Math.max(0, to - from + 1) }, (_, k) => [from + k, tone]));

  // small deterministic random generator (so the check script is repeatable)
  U.rng = function (seed) {
    let a = seed >>> 0;
    const next = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    next.int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
    return next;
  };

  /* ---------- code listing ---------- */
  // lines: ["plain line", [codeText, note?, id?], ...]  ->  [{text, note, id}]
  U.normalizeCode = function (code) {
    const lines = (code.lines || []).map((l) =>
      typeof l === "string" ? { text: l, note: "", id: "" } : { text: l[0], note: l[1] || "", id: l[2] || "" }
    );
    const idToLines = {};
    lines.forEach((l, i) => {
      if (l.id) (idToLines[l.id] = idToLines[l.id] || []).push(i);
    });
    return { lang: code.lang || "js", fn: code.fn, lines, idToLines, source: lines.map((l) => l.text).join("\n") };
  };

  /* ---------- trees (LeetCode-style level-order text) ---------- */
  const T = (U.tree = {});

  // "1,2,3,null,4" -> root node {id, val, left, right}; id = position of the token in the text
  T.fromLevel = function (tokens) {
    if (!tokens.length || tokens[0] === null) return null;
    const make = (val, id) => ({ id, val, left: null, right: null });
    const root = make(tokens[0], 0);
    const queue = [root];
    let i = 1;
    for (let q = 0; q < queue.length; q++) {
      const node = queue[q];
      for (const side of ["left", "right"]) {
        if (i >= tokens.length) break;
        const tok = tokens[i];
        if (tok !== null) {
          node[side] = make(tok, i);
          queue.push(node[side]);
        }
        i++;
      }
    }
    if (i < tokens.length) throw new Error("too many values");
    return root;
  };

  T.toLevel = function (root) {
    if (!root) return [];
    const out = [];
    const queue = [root];
    for (let q = 0; q < queue.length; q++) {
      const n = queue[q];
      if (n === null) { out.push(null); continue; }
      out.push(n.val);
      queue.push(n.left, n.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  };

  T.nodes = function (root) {
    const list = [];
    (function walk(n) { if (!n) return; list.push(n); walk(n.left); walk(n.right); })(root);
    return list;
  };

  // random tree with n nodes, returned as level-order token list
  T.random = function (rnd, n) {
    const root = { val: rnd.int(1, 9), left: null, right: null };
    const nodes = [root];
    while (nodes.length < n) {
      const parent = nodes[rnd.int(0, nodes.length - 1)];
      const side = rnd() < 0.5 ? "left" : "right";
      if (parent[side]) continue;
      parent[side] = { val: rnd.int(1, 9), left: null, right: null };
      nodes.push(parent[side]);
    }
    return T.toLevel(root);
  };

  /* ---------- linked lists (for the check script and practice tests) ---------- */
  U.list = {
    // [1,2,3] -> head node of 1 -> 2 -> 3 (optionally the tail points back to node cycleAt)
    build(vals, cycleAt) {
      const nodes = vals.map((val) => ({ val, next: null }));
      nodes.forEach((n, i) => (n.next = nodes[i + 1] || null));
      if (cycleAt !== undefined && cycleAt >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[cycleAt];
      return nodes[0] || null;
    },
    toArray(head, limit) {
      const out = [];
      for (let n = head; n && out.length < (limit || 100); n = n.next) out.push(n.val);
      return out;
    }
  };

  /* ---------- demo inputs ---------- */
  // spec: { type: numlist|number|text|treelist|select, name, label, value, ...constraints }
  const I = (U.inputs = {});

  I.format = function (spec, v) {
    if (spec.type === "numlist") return v.join(", ");
    if (spec.type === "intervals" || spec.type === "edges") return v.map((p) => p[0] + "-" + p[1]).join(", ");
    return String(v);
  };

  I.parse = function (spec, raw) {
    raw = String(raw).trim();
    const fail = (error) => ({ ok: false, error });
    switch (spec.type) {
      case "number": {
        if (!/^-?\d+$/.test(raw)) return fail(spec.label + ": enter a whole number.");
        const v = Number(raw);
        if (spec.min != null && v < spec.min) return fail(spec.label + ": must be at least " + spec.min + ".");
        if (spec.max != null && v > spec.max) return fail(spec.label + ": must be at most " + spec.max + ".");
        return { ok: true, value: v };
      }
      case "numlist": {
        const parts = raw.split(/[\s,]+/).filter(Boolean);
        if (!parts.every((p) => /^-?\d+$/.test(p))) return fail(spec.label + ": use whole numbers separated by commas.");
        const v = parts.map(Number);
        const [lo, hi] = spec.len || [1, 12];
        if (v.length < lo || v.length > hi) return fail(spec.label + ": use between " + lo + " and " + hi + " numbers.");
        if (spec.min != null && v.some((x) => x < spec.min)) return fail(spec.label + ": numbers must be at least " + spec.min + ".");
        if (spec.max != null && v.some((x) => x > spec.max)) return fail(spec.label + ": numbers must be at most " + spec.max + ".");
        if (spec.sorted && v.some((x, i) => i && x < v[i - 1])) return fail(spec.label + ": must be sorted from small to large.");
        if (spec.unique && new Set(v).size !== v.length) return fail(spec.label + ": numbers must all be different.");
        return { ok: true, value: v };
      }
      case "intervals": {
        // "1-3, 2-6, 8-10"  ->  [[1,3],[2,6],[8,10]]   (start-end, start smaller than end)
        const hint = " Example: 1-3, 2-6, 8-10 (start-end).";
        const parts = raw.split(/[\s,]+/).filter(Boolean);
        const [lo, hi] = spec.len || [1, 8];
        if (parts.length < lo || parts.length > hi) return fail(spec.label + ": use between " + lo + " and " + hi + " intervals." + hint);
        const pairs = [];
        for (const p of parts) {
          const m = /^(\d+)-(\d+)$/.exec(p);
          if (!m) return fail(spec.label + ": \"" + p + "\" is not a start-end pair." + hint);
          const s = Number(m[1]);
          const e = Number(m[2]);
          if (s >= e) return fail(spec.label + ": in " + p + " the start must be smaller than the end.");
          if (s < (spec.min != null ? spec.min : 0) || e > (spec.max != null ? spec.max : 20)) return fail(spec.label + ": use times from " + (spec.min != null ? spec.min : 0) + " to " + (spec.max != null ? spec.max : 20) + " so it fits on screen.");
          pairs.push([s, e]);
        }
        return { ok: true, value: pairs };
      }
      case "edges": {
        // "0-1, 0-2, 1-3"  ->  [[0,1],[0,2],[1,3]]   (node numbers; undirected unless the demo says otherwise)
        const hint = " Example: 0-1, 0-2, 1-3 (node-node).";
        const parts = raw.split(/[\s,]+/).filter(Boolean);
        const [lo, hi] = spec.len || [0, 12];
        if (parts.length < lo || parts.length > hi) return fail(spec.label + ": use between " + lo + " and " + hi + " edges." + hint);
        const maxNode = spec.maxNode != null ? spec.maxNode : 7;
        const pairs = [];
        const seen = new Set();
        for (const p of parts) {
          const m = /^(\d+)-(\d+)$/.exec(p);
          if (!m) return fail(spec.label + ": \"" + p + "\" is not a node-node pair." + hint);
          const u = Number(m[1]);
          const v = Number(m[2]);
          if (u === v) return fail(spec.label + ": " + p + " joins a node to itself (not allowed here).");
          if (u > maxNode || v > maxNode) return fail(spec.label + ": node numbers go from 0 to " + maxNode + ".");
          const key = spec.directed ? u + ">" + v : Math.min(u, v) + "-" + Math.max(u, v);
          if (seen.has(key)) return fail(spec.label + ": " + p + " appears twice.");
          seen.add(key);
          pairs.push([u, v]);
        }
        return { ok: true, value: pairs };
      }
      case "text": {
        const [lo, hi] = spec.len || [1, 20];
        if (raw.length < lo || raw.length > hi) return fail(spec.label + ": use " + lo + " to " + hi + " characters.");
        if (spec.alphabet && [...raw].some((c) => !spec.alphabet.includes(c))) {
          return fail(spec.label + ": allowed characters are " + spec.alphabet.split("").join(" ") + (spec.alphabet.includes(" ") ? " (and space)." : "."));
        }
        return { ok: true, value: raw };
      }
      case "treelist": {
        const parts = raw.split(/[\s,]+/).filter(Boolean);
        const hint = " Example: 1,2,3,null,4 (level by level, null = no child).";
        if (!parts.length || parts.length > (spec.maxTokens || 15)) return fail(spec.label + ": use 1 to " + (spec.maxTokens || 15) + " values." + hint);
        const toks = [];
        for (const p of parts) {
          if (/^(null|#)$/i.test(p)) toks.push(null);
          else if (/^-?\d+$/.test(p)) toks.push(Number(p));
          else return fail(spec.label + ": only numbers and null." + hint);
        }
        if (toks[0] === null) return fail(spec.label + ": the first value is the root, it cannot be null.");
        let root;
        try { root = T.fromLevel(toks); } catch (e) { return fail(spec.label + ": a null node cannot have children." + hint); }
        const count = T.nodes(root).length;
        if (count > (spec.maxNodes || 10)) return fail(spec.label + ": at most " + (spec.maxNodes || 10) + " nodes so it fits on screen.");
        return { ok: true, value: root };
      }
      case "select": {
        const opt = spec.options.find((o) => o[0] === raw);
        return opt ? { ok: true, value: raw } : fail(spec.label + ": pick one of the options.");
      }
    }
    return fail("Unknown input type " + spec.type);
  };

  I.random = function (spec, rnd) {
    switch (spec.type) {
      case "number": return rnd.int(spec.min != null ? spec.min : 0, spec.max != null ? spec.max : 20);
      case "numlist": {
        const [lo, hi] = spec.len || [3, 8];
        const len = rnd.int(lo, hi);
        const mn = spec.min != null ? spec.min : 1;
        const mx = spec.max != null ? spec.max : 20;
        let v = [];
        if (spec.unique) {
          const pool = [];
          for (let x = mn; x <= mx; x++) pool.push(x);
          while (v.length < len && pool.length) v.push(pool.splice(rnd.int(0, pool.length - 1), 1)[0]);
        } else {
          for (let i = 0; i < len; i++) v.push(rnd.int(mn, mx));
        }
        return spec.sorted ? v.sort((a, b) => a - b) : v;
      }
      case "intervals": {
        const [lo, hi] = spec.len || [3, 6];
        const mn = spec.min != null ? spec.min : 0;
        const mx = spec.max != null ? spec.max : 20;
        const maxLen = spec.maxLen || 8;
        const v = [];
        for (let i = 0, n = rnd.int(lo, hi); i < n; i++) {
          const s = rnd.int(mn, mx - 1);
          v.push([s, rnd.int(s + 1, Math.min(mx, s + maxLen))]);
        }
        return v;
      }
      case "edges": {
        const [lo, hi] = spec.len || [2, 8];
        const maxNode = spec.maxNode != null ? spec.maxNode : 7;
        const v = [];
        const seen = new Set();
        for (let tries = 0, want = rnd.int(lo, hi); v.length < want && tries < 60; tries++) {
          const a = rnd.int(0, maxNode);
          const b = rnd.int(0, maxNode);
          const key = spec.directed ? a + ">" + b : Math.min(a, b) + "-" + Math.max(a, b);
          if (a !== b && !seen.has(key)) { seen.add(key); v.push([a, b]); }
        }
        return v;
      }
      case "text": {
        if (spec.samples) return spec.samples[rnd.int(0, spec.samples.length - 1)];
        if (!spec.alphabet) return spec.value;
        const [lo, hi] = spec.len || [1, 8];
        const chars = spec.alphabet.replace(/ /g, "");
        let s = "";
        for (let i = 0, n = rnd.int(lo, hi); i < n; i++) s += chars[rnd.int(0, chars.length - 1)];
        return s;
      }
      case "treelist": return T.random(rnd, rnd.int(3, Math.min(8, spec.maxNodes || 8))).map((x) => (x === null ? "null" : x)).join(",");
      case "select": return spec.options[rnd.int(0, spec.options.length - 1)][0];
    }
    return spec.value;
  };

  // parse every spec from its default value -> { name: value }
  I.defaults = function (specs) {
    const out = {};
    for (const s of specs) {
      const r = I.parse(s, I.format(s, s.value));
      if (!r.ok) throw new Error("default for '" + s.name + "' is invalid: " + r.error);
      out[s.name] = r.value;
    }
    return out;
  };

  /* ---------- running a demo ---------- */
  U.STEP_LIMIT = 400;
  U.build = function (demo, inp) {
    const frames = [];
    const snap = (f) => {
      if (frames.length >= U.STEP_LIMIT) throw new Error("STEP_LIMIT");
      frames.push(U.clone(f));
    };
    const scene = demo.scene ? demo.scene(inp) : {};
    demo.frames(inp, snap, scene);
    return { frames, scene };
  };
})();
