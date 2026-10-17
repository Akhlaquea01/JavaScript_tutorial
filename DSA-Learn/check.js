// DSA-Learn/check.js: checks every topic in DSA-Learn/data/ before you trust it.
// For each demo it runs the DISPLAYED code and the animation tracer on 60+ inputs and compares the
// results, so the picture can never drift from the code. It also runs every practice solution against
// its tests and checks the template (gist, analogy, mistakes, ...), ids, files and caption text.
//
//   node DSA-Learn/check.js                      check everything
//   node DSA-Learn/check.js --only=stack         one topic
//   node DSA-Learn/check.js --trace              also print the caption of every step of each default run
// Exit code is 1 when anything is wrong.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const root = rootArg || path.join(__dirname, "..");
const TRACE = process.argv.includes("--trace");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);
const dir = path.join(root, "DSA-Learn");
const problems = [];
const fail = (where, msg) => problems.push(where + ": " + msg);

const sandbox = { console };
sandbox.window = sandbox;
vm.createContext(sandbox);
const load = (f) => vm.runInContext(fs.readFileSync(f, "utf8"), sandbox, { filename: f });
load(path.join(dir, "engine", "util.js"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const tags = [...html.matchAll(/<script src="(DSA-Learn\/[^"]+)"/g)].map((m) => m[1]);
const dataTags = tags.filter((t) => t.includes("/data/"));
const onDisk = fs.readdirSync(path.join(dir, "data")).filter((f) => f.endsWith(".js")).sort().map((f) => "DSA-Learn/data/" + f);
if (JSON.stringify(dataTags) !== JSON.stringify(onDisk)) fail("html", "data <script> tags != files on disk\n   html: " + dataTags.join(", ") + "\n   disk: " + onDisk.join(", "));
if (tags[tags.length - 1] !== "DSA-Learn/renderer.js") fail("html", "renderer.js must be the last script");
for (const t of ["DSA-Learn/engine/util.js", "DSA-Learn/engine/viz.js", "DSA-Learn/engine/viz-more.js", "DSA-Learn/engine/stepper.js"]) if (!tags.includes(t)) fail("html", "missing " + t);
for (const t of dataTags) load(path.join(root, t));

const DSA = sandbox.DSA;
const U = DSA.util;
const META = sandbox.DSA_META;
const TOPICS = sandbox.DSA_TOPICS || [];
const groupIds = new Set(META.groups.map((g) => g.id));
const orderIds = new Set(META.order.map((l) => l.id));
const topicIds = new Set(TOPICS.map((t) => t.id));
for (const l of META.order) if (!topicIds.has(l.id)) fail("meta", "order lists '" + l.id + "' but no data file defines it");
const strip = (s) => String(s).replace(/[`*]/g, "");

const TONES = new Set(["cur", "good", "bad", "mark", "done", "dim"]);
const BOX_KINDS = new Set(["stack", "queue", "set", "list", "map", "buckets", "text"]);

function checkStrings(v, where) {
  if (typeof v === "string") {
    if ((v.match(/`/g) || []).length % 2) fail(where, "odd number of backticks: " + v.slice(0, 70));
  } else if (Array.isArray(v)) v.forEach((x, i) => checkStrings(x, where + "[" + i + "]"));
  else if (v && typeof v === "object") for (const k in v) if (typeof v[k] !== "function") checkStrings(v[k], where + "." + k);
}

function makeFn(code, where) {
  const norm = U.normalizeCode(code);
  try {
    return new Function(norm.source + "\n;return " + code.fn + ";")();
  } catch (e) {
    fail(where, "displayed code does not run: " + e.message);
    return null;
  }
}

function checkFrame(demo, f, i, n, where, scene) {
  const w = where + " frame " + i;
  if (typeof f.say !== "string" || !f.say) fail(w, "missing say");
  else if (U.inline(f.say).replace(/<code class="ic">[^<]*<\/code>/g, "").includes("*")) fail(w, "stray * after markup (wrap operators in backticks): " + f.say.slice(0, 80));
  if (/undefined|NaN|\[object/.test(String(f.say) + " " + String(f.out || ""))) fail(w,"suspicious generated text: " + String(f.say).slice(0, 90) + " | " + (f.out || ""));
  const code = demo._norm;
  for (const id of [].concat(f.at || [])) if (!code.idToLines[id]) fail(w, "at '" + id + "' has no code line with that id");
  if (!f.at) fail(w, "missing at");
  if (f.tone) for (const [k, t] of Object.entries(f.tone)) if (!TONES.has(t)) fail(w, "bad tone " + t);
  for (const b of f.boxes || []) if (!BOX_KINDS.has(b.kind)) fail(w, "bad box kind " + b.kind);
  if (demo.viz === "bars") {
    if (!Array.isArray(f.bars) || !f.bars.length) fail(w, "bars viz needs bars[]");
    else for (const b of f.bars) if (typeof b.label !== "string" || !Number.isFinite(b.value) || b.value < 0) fail(w, "bad bar " + JSON.stringify(b));
  }
  if (demo.viz === "list") {
    if (!Array.isArray(f.lists) || !f.lists.length) return fail(w, "list viz needs lists[]");
    f.lists.forEach((l, r) => {
      const len = (l.nodes || []).length;
      if (!Array.isArray(l.nodes)) return fail(w, "list " + r + " has no nodes[]");
      if (l.links && l.links.length !== len) fail(w, "list " + r + ": links[] length " + l.links.length + " != nodes " + len);
      for (const t of l.links || []) if (t !== null && !(Number.isInteger(t) && t >= -1 && t <= len)) fail(w, "list " + r + ": link target out of range: " + t);
      for (const [k, idx] of Object.entries(l.ptr || {})) if (idx !== null && !(Number.isInteger(idx) && idx >= -1 && idx <= len)) fail(w, "list " + r + ": ptr " + k + " out of range: " + idx);
      for (const k of Object.keys(l.tone || {})) if (!(Number(k) >= 0 && Number(k) < len)) fail(w, "list " + r + ": tone index out of range: " + k);
    });
  }
  if (demo.viz === "grid") {
    if (!Array.isArray(f.grid) || !f.grid.length || !Array.isArray(f.grid[0])) return fail(w, "grid viz needs grid[][]");
    const R = f.grid.length;
    const C = f.grid[0].length;
    if (f.grid.some((row) => row.length !== C)) fail(w, "grid rows have different lengths");
    for (const k of Object.keys(f.tone || {})) {
      const [r, c] = k.split(",").map(Number);
      if (!(r >= 0 && r < R && c >= 0 && c < C)) fail(w, "grid tone out of range: " + k);
    }
  }
  if (demo.viz === "graph") {
    const { n, edges, directed } = scene || {};
    if (!(Number.isInteger(n) && n >= 1)) return fail(w, "graph viz needs scene.n");
    const keys = new Set((edges || []).map(([u, v]) => (directed ? u + ">" + v : Math.min(u, v) + "-" + Math.max(u, v))));
    for (const [u, v] of edges || []) if (!(u >= 0 && u < n && v >= 0 && v < n)) fail(w, "edge " + u + "-" + v + " has a node outside 0.." + (n - 1));
    for (const key of ["tone", "badge"]) for (const k of Object.keys(f[key] || {})) if (!(Number(k) >= 0 && Number(k) < n)) fail(w, key + " uses unknown node " + k);
    for (const [k, t] of Object.entries(f.etone || {})) {
      const m = /^(\d+)([->])(\d+)$/.exec(k);
      if (!m) { fail(w, "bad etone key " + k); continue; }
      const kk = directed ? m[1] + ">" + m[3] : Math.min(m[1], m[3]) + "-" + Math.max(m[1], m[3]);
      if (!keys.has(kk)) fail(w, "etone uses an edge that does not exist: " + k);
      if (!TONES.has(t)) fail(w, "etone bad tone " + t);
    }
  }
  if (demo.viz === "intervals") {
    const { min, max, n, rows, merged, mergedMax } = scene || {};
    if (!(Number.isFinite(min) && Number.isFinite(max) && max > min)) return fail(w, "intervals viz needs scene.min < scene.max");
    const okIv = (iv, what) => {
      if (!(Number.isFinite(iv.s) && Number.isFinite(iv.e) && iv.s >= min && iv.e <= max && iv.s < iv.e)) fail(w, what + " out of range or reversed: " + JSON.stringify(iv));
      if (iv.tone && !TONES.has(iv.tone)) fail(w, what + " bad tone " + iv.tone);
    };
    if (!Array.isArray(f.intervals)) return fail(w, "intervals viz needs intervals[]");
    if (f.intervals.length > (n || 1)) fail(w, f.intervals.length + " intervals but scene.n is " + n);
    f.intervals.forEach((iv, k) => {
      okIv(iv, "interval " + k);
      if (iv.lane != null && !(iv.lane >= 0 && iv.lane < (rows || n))) fail(w, "interval " + k + " lane out of range: " + iv.lane);
    });
    if (f.merged && !merged) fail(w, "frame has merged[] but scene.merged is not set");
    if (f.merged) {
      if (f.merged.length > (mergedMax || n || 1)) fail(w, "too many merged bars");
      f.merged.forEach((iv, k) => okIv(iv, "merged " + k));
    }
    if (f.line != null && !(f.line >= min && f.line <= max)) fail(w, "line outside the time range: " + f.line);
  }
  if (demo.viz === "heap") {
    const caps = (scene && scene.caps) || [7];
    if (!Array.isArray(f.heaps) || f.heaps.length !== caps.length) return fail(w, "heap viz needs heaps[] with one entry per scene.caps");
    f.heaps.forEach((h, b) => {
      if (!Array.isArray(h.values)) return fail(w, "heap " + b + " has no values[]");
      if (h.values.length > caps[b]) fail(w, "heap " + b + " has " + h.values.length + " values but capacity " + caps[b]);
      for (const [k, t] of Object.entries(h.tone || {})) {
        if (!(Number(k) >= 0 && Number(k) < h.values.length)) fail(w, "heap " + b + ": tone index out of range: " + k);
        if (!TONES.has(t)) fail(w, "heap " + b + ": bad tone " + t);
      }
    });
  }
  if (demo.viz === "tree") {
    const ids = new Set();
    (function walk(n) { if (!n) return; ids.add(n.id); (n.children || [n.left, n.right]).forEach(walk); })(scene && scene.tree);
    for (const key of ["tone", "badge", "vals"]) for (const k of Object.keys(f[key] || {})) if (!ids.has(Number(k))) fail(w, key + " uses unknown node id " + k);
    for (const key of ["path", "hide"]) for (const k of f[key] || []) if (!ids.has(k)) fail(w, key + " uses unknown node id " + k);
  }
  if ((demo.viz || "array") === "array") {
    if (!Array.isArray(f.cells)) return fail(w, "array viz needs cells[]");
    const len = f.cells.length;
    for (const [k, idx] of Object.entries(f.ptr || {})) if (idx !== null && !(Number.isInteger(idx) && idx >= -1 && idx <= len)) fail(w, "ptr " + k + " out of range: " + idx);
    for (const k of Object.keys(f.tone || {})) if (!(Number(k) >= 0 && Number(k) < len)) fail(w, "tone index out of range: " + k);
    if (f.range && (f.range.length !== 2)) fail(w, "bad range");
    for (const r of f.rows || []) if (!Array.isArray(r.cells)) fail(w, "row without cells");
  }
}

function rawsFor(demo, rnd) {
  const specs = demo.inputs || [];
  if (demo.random) return demo.random(rnd);
  const raws = {};
  for (const s of specs) raws[s.name] = U.inputs.format(s, U.inputs.random(s, rnd));
  return raws;
}

function parseRaws(demo, raws) {
  const out = {};
  for (const s of demo.inputs || []) {
    const r = U.inputs.parse(s, raws[s.name]);
    if (!r.ok) return null;
    out[s.name] = r.value;
  }
  if (demo.validate && demo.validate(out)) return null;
  return out;
}

function runCodeTests(where, code, tests) {
  const fn = makeFn(code, where);
  if (!fn) return;
  for (const tc of tests) {
    const args = tc.args.map((a) => {
      if (a && typeof a === "object" && !Array.isArray(a) && "tree" in a) return U.tree.fromLevel(a.tree);
      if (a && typeof a === "object" && !Array.isArray(a) && "list" in a) return U.list.build(a.list, a.cycleAt);
      return JSON.parse(JSON.stringify(a));
    });
    let got;
    try { got = fn(...args); } catch (e) { fail(where, "threw " + e.message + " on " + JSON.stringify(tc.args)); continue; }
    if (tc.out === "list") got = U.list.toArray(got);
    if (tc.out === "tree") got = U.tree.toLevel(got);
    if (JSON.stringify(got) !== JSON.stringify(tc.expect)) fail(where, "got " + JSON.stringify(got) + " expected " + JSON.stringify(tc.expect) + " for " + JSON.stringify(tc.args));
  }
}

let demoCount = 0, runCount = 0, practiceCount = 0;
for (const t of TOPICS) {
  if (ONLY && t.id !== ONLY) continue;
  const w = "topic " + t.id;
  if (!groupIds.has(t.group)) fail(w, "unknown group " + t.group);
  if (!orderIds.has(t.id)) fail(w, "id is not in META.order (so it would not appear in the sidebar order)");
  for (const f of ["emoji", "title", "tagline", "gist", "complexity", "idea", "analogy", "demos", "mistakes", "remember", "practice", "recall", "related"]) if (!t[f]) fail(w, "missing " + f);
  if (t.gist && (t.gist.length < 3 || t.gist.length > 5)) fail(w, "gist should have 3-5 bullets");
  if (t.mistakes && t.mistakes.length < 3) fail(w, "want at least 3 mistakes");
  if (t.recall && t.recall.length < 4) fail(w, "want at least 4 recall questions");
  if (t.practice && !(t.practice.hints && t.practice.hints.length >= 2)) fail(w, "practice needs 2+ hints");
  for (const id of (t.needs || []).concat((t.related && t.related.topics) || [])) if (!orderIds.has(id) && !topicIds.has(id)) fail(w, "unknown related topic " + id);
  for (const f of (t.related && t.related.files) || []) if (!fs.existsSync(path.join(root, f))) fail(w, "related file not found: " + f);
  checkStrings(t, w);

  for (const demo of t.demos || []) {
    demoCount++;
    const dw = w + " / demo " + demo.id;
    demo._norm = U.normalizeCode(demo.code);
    const fn = makeFn(demo.code, dw);
    if (!demo.call) fail(dw, "missing call()");
    const noteCount = demo._norm.lines.filter((l) => l.note).length;
    if (noteCount < 3) fail(dw, "only " + noteCount + " annotated lines (want 3+)");
    for (const s of demo.inputs || []) if (!["numlist", "number", "text", "treelist", "intervals", "edges", "select"].includes(s.type)) fail(dw, "bad input type " + s.type);

    let defaults;
    try { defaults = U.inputs.defaults(demo.inputs || []); } catch (e) { fail(dw, e.message); continue; }
    if (demo.validate && demo.validate(defaults)) fail(dw, "default input fails validate(): " + demo.validate(defaults));

    // default run: structure + optional transcript
    let lengths = [];
    const inputsToTry = [{ label: "default", inp: defaults }];
    const rnd = U.rng(12345);
    for (let k = 0, got = 0; k < 400 && got < 60; k++) {
      const inp = parseRaws(demo, rawsFor(demo, rnd));
      if (inp) { inputsToTry.push({ label: "random#" + got, inp }); got++; }
    }
    if (inputsToTry.length < 20) fail(dw, "could not generate enough valid random inputs (" + inputsToTry.length + ")");

    for (const { label, inp } of inputsToTry) {
      let built;
      try { built = U.build(demo, U.clone(inp)); } catch (e) { fail(dw, label + ": tracer threw " + e.message + " for " + JSON.stringify(inp).slice(0, 120)); continue; }
      runCount++;
      const { frames } = built;
      if (!frames.length) { fail(dw, label + ": no frames"); continue; }
      lengths.push(frames.length);
      frames.forEach((f, i) => checkFrame(demo, f, i, frames.length, dw + " (" + label + ")", built.scene));
      const last = frames[frames.length - 1];
      if (!("result" in last)) fail(dw, label + ": last frame has no result");
      if (!last.out) fail(dw, label + ": last frame has no out banner");
      if (fn && demo.call) {
        let expected;
        try { expected = demo.call(fn, U.clone(inp)); } catch (e) { fail(dw, label + ": displayed code threw " + e.message + " for " + JSON.stringify(inp).slice(0, 120)); continue; }
        if (JSON.stringify(expected) !== JSON.stringify(last.result)) fail(dw, label + ": code gives " + JSON.stringify(expected) + " but trace ends with " + JSON.stringify(last.result) + " for " + JSON.stringify(inp).slice(0, 140));
      }
      if (label === "default" && TRACE) {
        console.log("\n--- " + t.id + " / " + demo.id + " (default input, " + frames.length + " frames)");
        frames.forEach((f, i) => console.log(String(i + 1).padStart(2) + ". [" + [].concat(f.at).join("+") + "] " + strip(f.say) + (f.out ? "   => " + f.out : "")));
      }
    }
    console.log("demo " + (t.id + "/" + demo.id).padEnd(34) + " frames: default " + lengths[0] + ", min " + Math.min(...lengths) + ", max " + Math.max(...lengths) + " | runs " + lengths.length);
  }

  // practice solution
  const p = t.practice;
  if (p && p.solution) {
    practiceCount++;
    const norm = U.normalizeCode(p.solution.code);
    if (norm.lines.filter((l) => l.note).length < 3) fail(w + " / practice", "solution has fewer than 3 annotated lines");
    if (!p.tests || p.tests.length < 4) fail(w + " / practice", "want 4+ tests");
    runCodeTests(w + " / practice", p.solution.code, p.tests || []);
  }
  // extra code shown in the notes (for example a delete operation) can be verified too: topic.checks = [{ code, tests }]
  for (const [k, chk] of (t.checks || []).entries()) runCodeTests(w + " / check " + k, chk.code, chk.tests || []);
}

console.log("\ntopics checked:", ONLY ? 1 : TOPICS.length, "| demos:", demoCount, "| traced runs:", runCount, "| practice solutions:", practiceCount);
// many random inputs report the same mistake: show each kind once with a count
const grouped = new Map();
for (const p of problems) {
  const key = p.replace(/\(random#\d+\)/g, "(random)").replace(/frame \d+/g, "frame N");
  grouped.set(key, (grouped.get(key) || 0) + 1);
}
const lines = [...grouped].slice(0, 40).map(([k, n]) => k + (n > 1 ? "   [x" + n + "]" : ""));
console.log("problems:", problems.length ? "\n - " + lines.join("\n - ") + (grouped.size > 40 ? "\n ... and " + (grouped.size - 40) + " more kinds" : "") : "none");
process.exit(problems.length ? 1 : 0);
