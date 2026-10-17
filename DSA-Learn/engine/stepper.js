/* DSA-Learn/engine/stepper.js
   The interactive step-through widget used in every topic: editable inputs, a picture that moves,
   a plain-English caption per step, a code panel that highlights the running line, play/pause/scrub,
   and the whole walkthrough as readable text.
   Demo shape is documented at the top of data/00-meta.js. */
(function () {
  "use strict";
  const DSA = window.DSA;
  const U = DSA.util;
  const { esc, inline, highlight } = U;

  const SPEED_MS = { slow: 1800, normal: 1050, fast: 450 };
  const active = new Set();
  DSA.stopAll = () => {
    active.forEach((d) => d.stop());
    active.clear();
  };

  // the code lines of a demo, shared by the stepper panel and the "explained" listing
  DSA.codePanel = (code) =>
    `<pre class="cp">${code.lines.map((l, i) => `<span class="cp-l" data-i="${i}">${highlight(l.text, code.lang) || " "}</span>`).join("")}</pre>`;

  DSA.codeExplained = function (code, title) {
    return `<div class="cx"><div class="cx-t"><span>${esc(title || "Code")}</span><button type="button" class="copy" data-copy>Copy</button></div>${code.lines
      .map(
        (l) =>
          `<div class="cx-row${l.note ? " has-note" : ""}"><pre class="cx-code"><code>${highlight(l.text, code.lang) || " "}</code></pre><div class="cx-note">${l.note ? inline(l.note) : ""}</div></div>`
      )
      .join("")}<textarea class="sr" aria-hidden="true" tabindex="-1" readonly>${esc(code.source)}</textarea></div>`;
  };

  DSA.mountDemo = function (host, demo) {
    const code = demo._code || (demo._code = U.normalizeCode(demo.code));
    const specs = demo.inputs || [];
    const kind = DSA.viz.kinds[demo.viz || "array"];

    let frames = [];
    let idx = 0;
    let timer = null;
    let speed = "normal";
    let canvas = null;
    let current = null; // values currently drawn

    const legend = (demo.legend || []).map(([tone, text]) => `<span><i class="t-${tone}" style="background:var(--tc);border-color:var(--tb)"></i>${esc(text)}</span>`).join("");
    const field = (s) => {
      const id = `f-${demo.id}-${s.name}`;
      const wide = s.type === "numlist" || s.type === "treelist" || s.type === "text" || s.type === "intervals" || s.type === "edges";
      const control =
        s.type === "select"
          ? `<select id="${id}" name="${s.name}">${s.options.map((o) => `<option value="${esc(o[0])}"${o[0] === s.value ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select>`
          : `<input id="${id}" name="${s.name}" type="text" inputmode="${s.type === "number" ? "numeric" : "text"}" autocomplete="off" spellcheck="false" value="${esc(U.inputs.format(s, s.value))}" size="${wide ? 22 : 6}">`;
      return `<label class="fld${wide ? " wide" : ""}" for="${id}">${esc(s.label)}${control}</label>`;
    };

    host.className = "demo";
    host.innerHTML = `
      <div class="demo-head"><h3>${esc(demo.title)}</h3>${demo.intro ? `<p>${inline(demo.intro)}</p>` : ""}</div>
      ${
        specs.length
          ? `<form class="demo-inputs" autocomplete="off">${specs.map(field).join("")}
              <button class="btn go" type="submit">▶ Run</button>
              <button class="btn" type="button" data-act="rand" title="Fill in a random valid input">🎲 Random</button>
              <button class="btn" type="button" data-act="reset">↺ Reset</button>
              <div class="demo-err" role="alert"></div></form>`
          : ""
      }
      <div class="demo-body">
        <div class="demo-main">
          ${legend ? `<div class="legend">${legend}</div>` : ""}
          <div class="stage"><div class="canvas"></div><div class="vars"></div><div class="boxes"></div><div class="out"></div></div>
          <div class="caption" aria-live="polite"><div class="cap-step"></div><p class="cap-say"></p><p class="cap-why"></p></div>
          <div class="controls">
            <button class="btn" data-act="first" title="First step" aria-label="First step">⏮</button>
            <button class="btn" data-act="prev" title="Previous step (←)" aria-label="Previous step">◀</button>
            <button class="btn go" data-act="play" title="Play / pause (space)" aria-label="Play">▶ Play</button>
            <button class="btn" data-act="next" title="Next step (→)" aria-label="Next step">▶▶</button>
            <button class="btn" data-act="last" title="Last step" aria-label="Last step">⏭</button>
            <input type="range" min="0" max="0" value="0" aria-label="Scrub through the steps">
            <select aria-label="Speed"><option value="slow">Slow</option><option value="normal" selected>Normal</option><option value="fast">Fast</option></select>
          </div>
        </div>
        <aside class="demo-code" aria-label="Code being run">${DSA.codePanel(code)}</aside>
      </div>
      <details class="demo-text"><summary>Read this example as text (no animation)</summary><ol></ol></details>`;

    const $ = (sel) => host.querySelector(sel);
    const els = {
      canvas: $(".canvas"), vars: $(".vars"), boxes: $(".boxes"), out: $(".out"),
      step: $(".cap-step"), say: $(".cap-say"), why: $(".cap-why"),
      scrub: $('input[type="range"]'), play: $('[data-act="play"]'),
      err: $(".demo-err") || document.createElement("div"), // demos without inputs have no form, so no error line
      text: $(".demo-text ol"), speed: $(".controls select"),
      lines: [...host.querySelectorAll(".cp-l")]
    };

    /* ---------- drawing a frame ---------- */
    function show(i) {
      idx = Math.max(0, Math.min(frames.length - 1, i));
      const f = frames[idx];
      const prev = idx > 0 ? frames[idx - 1] : null;
      canvas.update(f, prev);
      els.vars.innerHTML = DSA.viz.stage.vars(f, prev);
      els.boxes.innerHTML = DSA.viz.stage.boxes(f);
      els.out.innerHTML = DSA.viz.stage.out(f);
      els.step.textContent = `Step ${idx + 1} of ${frames.length}`;
      els.say.innerHTML = inline(f.say);
      const ids = [].concat(f.at || []);
      const note = ids.map((id) => (code.idToLines[id] || []).map((n) => code.lines[n].note)).flat().find(Boolean);
      els.why.innerHTML = note ? "💡 " + inline(note) : "";
      const on = new Set(ids.flatMap((id) => code.idToLines[id] || []));
      els.lines.forEach((l, n) => l.classList.toggle("on", on.has(n)));
      els.scrub.value = idx;
      host.querySelector('[data-act="first"]').disabled = host.querySelector('[data-act="prev"]').disabled = idx === 0;
      host.querySelector('[data-act="next"]').disabled = host.querySelector('[data-act="last"]').disabled = idx === frames.length - 1;
      if (!timer) els.play.textContent = idx === frames.length - 1 ? "↻ Replay" : "▶ Play";
    }

    function stop() {
      clearTimeout(timer);
      timer = null;
      els.play.textContent = frames.length && idx === frames.length - 1 ? "↻ Replay" : "▶ Play";
    }
    function play() {
      if (timer) return stop();
      if (idx >= frames.length - 1) show(0);
      els.play.textContent = "⏸ Pause";
      const tick = () => {
        if (idx >= frames.length - 1) return stop();
        show(idx + 1);
        timer = setTimeout(tick, SPEED_MS[speed]);
      };
      timer = setTimeout(tick, SPEED_MS[speed] * 0.5);
    }

    /* ---------- running with an input ---------- */
    function run(values) {
      stop();
      let built;
      try {
        built = U.build(demo, values);
      } catch (e) {
        els.err.textContent = e.message === "STEP_LIMIT" ? "That input needs too many steps to draw. Try a shorter one." : "Could not draw this input: " + e.message;
        return false;
      }
      els.err.textContent = "";
      frames = built.frames;
      current = values;
      canvas = kind.mount(els.canvas, built.scene);
      els.scrub.max = frames.length - 1;
      els.text.innerHTML = frames.map((f) => `<li>${inline(f.say)}</li>`).join("");
      show(0);
      return true;
    }

    function readForm() {
      const form = $(".demo-inputs");
      const values = {};
      for (const s of specs) {
        const r = U.inputs.parse(s, form.elements[s.name].value);
        if (!r.ok) { els.err.textContent = r.error; return null; }
        values[s.name] = r.value;
      }
      const bad = demo.validate && demo.validate(values);
      if (bad) { els.err.textContent = bad; return null; }
      return values;
    }

    function fill(raws) {
      const form = $(".demo-inputs");
      specs.forEach((s) => (form.elements[s.name].value = raws[s.name]));
    }

    /* ---------- events ---------- */
    host.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      const act = b.dataset.act;
      if (act === "play") play();
      else if (act === "next") { stop(); show(idx + 1); }
      else if (act === "prev") { stop(); show(idx - 1); }
      else if (act === "first") { stop(); show(0); }
      else if (act === "last") { stop(); show(frames.length - 1); }
      else if (act === "reset") {
        const raws = {};
        specs.forEach((s) => (raws[s.name] = U.inputs.format(s, s.value)));
        fill(raws);
        els.err.textContent = "";
        run(U.inputs.defaults(specs));
      } else if (act === "rand") {
        for (let tries = 0; tries < 40; tries++) {
          const rnd = U.rng((Math.random() * 4294967296) >>> 0);
          const raws = {};
          const values = {};
          let ok = true;
          if (demo.random) {
            Object.assign(raws, demo.random(rnd));
          } else {
            specs.forEach((s) => (raws[s.name] = U.inputs.format(s, U.inputs.random(s, rnd))));
          }
          for (const s of specs) {
            const r = U.inputs.parse(s, raws[s.name]);
            if (!r.ok) { ok = false; break; }
            values[s.name] = r.value;
          }
          if (ok && demo.validate && demo.validate(values)) ok = false;
          if (ok) { fill(raws); els.err.textContent = ""; run(values); return; }
        }
        els.err.textContent = "Could not make a random input, try editing by hand.";
      }
    });
    const form = $(".demo-inputs");
    if (form) form.addEventListener("submit", (e) => { e.preventDefault(); const v = readForm(); if (v) run(v); });
    els.scrub.addEventListener("input", () => { stop(); show(Number(els.scrub.value)); });
    els.speed.addEventListener("change", () => { speed = els.speed.value; });
    host.tabIndex = 0;
    host.addEventListener("keydown", (e) => {
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) && e.target.type !== "range") return;
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); show(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stop(); show(idx - 1); }
      else if (e.key === " " && e.target === host) { e.preventDefault(); play(); }
      else if (e.key === "Home") { e.preventDefault(); stop(); show(0); }
      else if (e.key === "End") { e.preventDefault(); stop(); show(frames.length - 1); }
    });

    run(U.inputs.defaults(specs));
    const api = { stop, show, get frames() { return frames; } };
    active.add(api);
    return api;
  };
})();
