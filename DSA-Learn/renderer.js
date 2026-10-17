/* DSA-Learn/renderer.js
   Builds index.html from window.DSA_META + window.DSA_TOPICS (DSA-Learn/data/*.js):
   sidebar, home page, and the fixed learn-first template every topic is shown in.
   No note content lives here. The topic shape is documented at the top of data/00-meta.js. */
(function () {
  "use strict";
  const DSA = window.DSA;
  const { esc, inline } = DSA.util;
  const META = Object.assign({ title: "DSA Learn", groups: [], order: [], storagePrefix: "dsa-learn" }, window.DSA_META);
  const TOPICS = window.DSA_TOPICS || [];

  /* =========================================================
     1. CATALOG: every topic in learning order (META.order lists the ids in order;
        a topic that is missing from it goes last in its group)
     ========================================================= */
  const byId = new Map(TOPICS.map((t) => [t.id, t]));
  const groupOf = new Map(META.groups.map((g, i) => [g.id, { ...g, rank: i }]));
  const catalog = [];
  META.groups.forEach((g) => {
    META.order
      .filter((l) => l.group === g.id && byId.has(l.id))
      .forEach((l) => {
        const t = byId.get(l.id);
        catalog.push({ id: l.id, group: g.id, emoji: t.emoji, title: t.title, topic: t });
        byId.delete(l.id);
      });
    TOPICS.filter((t) => t.group === g.id && byId.has(t.id)).forEach((t) => catalog.push({ id: t.id, group: g.id, emoji: t.emoji, title: t.title, topic: t }));
  });
  catalog.forEach((c, i) => (c.num = i + 1));
  const entry = new Map(catalog.map((c) => [c.id, c]));
  const total = catalog.length;

  const collect = (v, out) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach((x) => collect(x, out));
    else if (v && typeof v === "object") for (const k in v) if (!/^(id|emoji|group|viz|lang|fn)$/.test(k)) collect(v[k], out);
  };
  catalog.forEach((c) => {
    const parts = [c.title, groupOf.get(c.group).title];
    collect(c.topic, parts);
    c.search = parts.join(" ").replace(/[`*]/g, "").toLowerCase();
  });

  /* =========================================================
     2. STORAGE, THEME
     ========================================================= */
  const store = {
    get(k) { try { return localStorage.getItem(META.storagePrefix + ":" + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(META.storagePrefix + ":" + k, v); } catch (e) { /* ignore */ } }
  };
  const revised = () => { try { return new Set(JSON.parse(store.get("revised")) || []); } catch (e) { return new Set(); } };
  const saveRevised = (s) => store.set("revised", JSON.stringify([...s]));

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    document.getElementById("themeBtn").textContent = t === "dark" ? "🌙" : "☀️";
  }

  /* =========================================================
     3. SMALL HTML BUILDERS
     ========================================================= */
  const list = (items, cls) => `<ul class="list ${cls || ""}">${items.map((i) => `<li><span>${inline(i)}</span></li>`).join("")}</ul>`;

  function block(b) {
    switch (b.type) {
      case "text": return `<p>${inline(b.text)}</p>`;
      case "points": return list(b.items, b.style);
      case "callout": return `<div class="callout ${b.kind || ""}">${inline(b.text)}</div>`;
      case "table":
        return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.columns.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`;
      case "code": return DSA.codeExplained(DSA.util.normalizeCode(b.code), b.title);
    }
    return "";
  }
  const blocks = (arr) => (arr || []).map((b) => (b.heading ? `<div class="sub">${inline(b.heading)}</div>` : "") + block(b)).join("");

  const SECTIONS = [
    { id: "idea", icon: "💡", title: "The idea, in plain words", nav: "Idea", has: (t) => t.idea },
    { id: "analogy", icon: "🌍", title: "A real-world picture", nav: "Analogy", has: (t) => t.analogy },
    { id: "example", icon: "🎬", title: "See it work, step by step", nav: "Example", has: (t) => t.demos && t.demos.length },
    { id: "code", icon: "💻", title: "The code, line by line", nav: "Code", has: (t) => t.demos && t.demos.length },
    { id: "complexity", icon: "⏱️", title: "How fast? How much memory?", nav: "Speed", has: (t) => t.complexity },
    { id: "mistakes", icon: "⚠️", title: "Common mistakes", nav: "Mistakes", has: (t) => t.mistakes && t.mistakes.length },
    { id: "remember", icon: "🧠", title: "How to remember it", nav: "Remember", has: (t) => t.remember },
    { id: "practice", icon: "✍️", title: "Practice", nav: "Practice", has: (t) => t.practice },
    { id: "recall", icon: "🔁", title: "Check yourself", nav: "Recall", has: (t) => t.recall && t.recall.length }
  ];

  const BUILD = {
    idea(t) {
      const i = t.idea;
      return (
        `<div class="prose">${(i.plain || []).map((p) => `<p>${inline(p)}</p>`).join("")}</div>` +
        (i.signals ? `<div class="sub">Reach for it when you see…</div><div class="panel">${list(i.signals, "ok")}</div>` : "") +
        (i.notFor ? `<div class="sub">Not the right tool when…</div>${list(i.notFor, "no")}` : "") +
        blocks(i.more)
      );
    },
    analogy(t) {
      const a = t.analogy;
      return (
        `<div class="panel story-card"><h3 style="margin:0 0 6px">${inline(a.title)}</h3><div class="story">${(Array.isArray(a.story) ? a.story : [a.story]).map((p) => `<p style="margin:0 0 8px">${inline(p)}</p>`).join("")}</div></div>` +
        (a.map ? `<div class="sub">The picture ↔ the code</div>` + block({ type: "table", columns: ["In the story", "In the algorithm"], rows: a.map }) : "") +
        (a.breaks ? `<p class="breaks"><strong>Where the picture stops working:</strong> ${inline(a.breaks)}</p>` : "")
      );
    },
    example(t) {
      return t.demos.map((d) => `<div class="demo-host" data-demo="${esc(d.id)}"></div>`).join("");
    },
    code(t) {
      return t.demos
        .map((d) => `<div class="sub">${esc(d.title)}</div>${d.codeIntro ? `<p>${inline(d.codeIntro)}</p>` : ""}${DSA.codeExplained(d._code || (d._code = DSA.util.normalizeCode(d.code)), "JavaScript")}`)
        .join("");
    },
    complexity(t) {
      const c = t.complexity;
      return (
        `<div class="chips" style="margin:0 0 8px"><span class="chip hl">Time: ${esc(c.time)}</span><span class="chip hl">Space: ${esc(c.space)}</span></div>` +
        `<div class="prose">${(c.why || []).map((p) => `<p>${inline(p)}</p>`).join("")}</div>` +
        blocks(c.more)
      );
    },
    mistakes(t) {
      return `<div class="mist">${t.mistakes
        .map((m) => `<div><h4>✕ ${inline(m.oops)}</h4><p><strong>Why it hurts:</strong> ${inline(m.why)}</p><p class="fx">✓ Instead: ${inline(m.fix)}</p></div>`)
        .join("")}</div>`;
    },
    remember(t) {
      const r = t.remember;
      return (
        (r.mnemonic ? `<div class="mnemonic">🧩 ${inline(r.mnemonic)}</div>` : "") +
        (r.rules ? `<div class="sub">Rules of thumb</div>${list(r.rules, "ok")}` : "") +
        (r.template ? `<div class="sub">The skeleton to memorise</div>${DSA.codeExplained(DSA.util.normalizeCode(r.template), "Template")}` : "") +
        blocks(r.more)
      );
    },
    practice(t) {
      const p = t.practice;
      return `<div class="practice">
        <h3>${esc(p.title)}${p.level ? `<span class="lvl">${esc(p.level)}</span>` : ""}</h3>
        <p>${inline(p.problem)}</p>
        ${(p.examples || []).map((e) => `<div class="ex"><strong>Input:</strong> <code>${esc(e.input)}</code> &nbsp;→&nbsp; <strong>Output:</strong> <code>${esc(e.output)}</code>${e.why ? `<br><em>${inline(e.why)}</em>` : ""}</div>`).join("")}
        <p style="color:var(--muted);font-size:13.5px">Try it on paper or in the console first. Open a hint only when stuck.</p>
        ${(p.hints || []).map((h, i) => `<details class="rev"><summary>💡 Hint ${i + 1}</summary><div>${inline(h)}</div></details>`).join("")}
        ${p.solution ? `<details class="rev"><summary>✅ Show the solution</summary><div>
            <div class="prose">${(p.solution.explain || []).map((x) => `<p>${inline(x)}</p>`).join("")}</div>
            ${DSA.codeExplained(DSA.util.normalizeCode(p.solution.code), "Solution")}
          </div></details>` : ""}
      </div>`;
    },
    recall(t) {
      return `<p style="color:var(--muted);margin-top:0">Answer out loud first, then open the card.</p><div class="recall">${t.recall
        .map((r) => `<details><summary>${inline(r.q)}</summary><div>${inline(r.a)}</div></details>`)
        .join("")}</div>`;
    },
    related(t) {
      const r = t.related || {};
      const link = (id) => {
        const e = entry.get(id);
        if (!e) return "";
        return `<a class="chip" href="#${esc(id)}">${e.emoji} ${esc(e.title)}</a>`;
      };
      return (
        (r.topics ? `<div class="chips">${r.topics.map(link).join("")}</div>` : "") +
        (r.files ? `<div class="sub">Your own solutions in this repo</div><div class="chips">${r.files.map((f) => `<a class="chip" href="${esc(f)}" target="_blank" rel="noopener"><code>${esc(f)}</code></a>`).join("")}</div>` : "")
      );
    }
  };

  /* =========================================================
     4. VIEWS
     ========================================================= */
  function topicView(c) {
    const t = c.topic;
    const g = groupOf.get(c.group);
    const done = revised().has(t.id);
    const secs = SECTIONS.filter((s) => s.has(t));
    const needs = (t.needs || []).map((id) => {
      const e = entry.get(id);
      if (!e) return "";
      return `<a class="chip" href="#${esc(id)}">← ${esc(e.title)}</a>`;
    }).join("");
    const idx = catalog.indexOf(c);
    const nav = (e, dir) => {
      if (!e) return `<span></span>`;
      return `<a class="${dir === "next" ? "r" : ""}" href="#${esc(e.id)}"><small>${dir === "next" ? "Next topic →" : "← Previous topic"}</small>${e.emoji} ${esc(e.title)}</a>`;
    };

    return `<div class="page">
      <div class="crumbs"><a href="#">Home</a> › ${g.emoji} ${esc(g.title)}</div>
      <div class="t-head">
        <div><h1>${t.emoji} ${esc(t.title)}</h1><p class="tagline">${inline(t.tagline)}</p></div>
        <label class="revised"><input type="checkbox" id="revisedBox" ${done ? "checked" : ""}> Mark as revised</label>
      </div>
      <div class="chips">
        ${t.complexity ? `<span class="chip hl">⏱ ${esc(t.complexity.time)} time</span><span class="chip hl">💾 ${esc(t.complexity.space)} space</span>` : ""}
        ${t.level ? `<span class="chip">Level: ${esc(t.level)}</span>` : ""}${needs ? `<span class="chip" style="background:none">Read first:</span>${needs}` : ""}
      </div>
      ${t.gist ? `<div class="gist"><h2>In 30 seconds</h2>${list(t.gist)}</div>` : ""}
      <nav class="secnav" aria-label="Sections">${secs.map((s) => `<a href="#" data-sec="${s.id}">${s.icon} ${s.nav}</a>`).join("")}${t.related ? '<a href="#" data-sec="related">🔗 Related</a>' : ""}</nav>
      ${secs.map((s, n) => `<section class="sec" id="sec-${s.id}"><h2><span class="num">${n + 1}</span>${s.icon} ${s.title}</h2>${BUILD[s.id](t)}</section>`).join("")}
      ${t.related ? `<section class="sec" id="sec-related"><h2><span class="num">${secs.length + 1}</span>🔗 Related</h2>${BUILD.related(t)}</section>` : ""}
      <div class="pager">${nav(catalog[idx - 1], "prev")}${nav(catalog[idx + 1], "next")}</div>
    </div>`;
  }

  const TEMPLATE_LEGEND = [
    ["💡", "The idea", "What it is in plain words, and the clues that tell you to use it."],
    ["🌍", "An analogy", "A real-life picture so the idea sticks without memorising."],
    ["🎬", "See it work", "An animation you can step through, replay, and re-run on your own input."],
    ["💻", "The code", "Short code with a note on every important line."],
    ["⏱️", "Speed and memory", "Why it costs what it costs, in plain words."],
    ["⚠️", "Common mistakes", "What goes wrong, why, and the fix."],
    ["🧠", "How to remember", "A one-liner, rules of thumb, and a skeleton to memorise."],
    ["✍️", "Practice", "A small problem with hints and a worked solution."],
    ["🔁", "Check yourself", "Recall questions to test what stayed in your head."]
  ];

  function homeView() {
    const last = store.get("last");
    const lastEntry = last && entry.get(last) && entry.get(last).topic ? entry.get(last) : null;
    return `<div class="page">
      <div class="hero"><h1>📘 ${esc(META.title)}</h1><p>${esc(META.subtitle || "")}</p></div>
      ${lastEntry ? `<div class="cont">▶ Continue where you left off: <a href="#${esc(lastEntry.id)}"><strong>${lastEntry.emoji} ${esc(lastEntry.title)}</strong></a></div>` : ""}
      <div class="road-g"><h3>How every topic is organised (same order, every time)</h3>
        <div class="cards">${TEMPLATE_LEGEND.map(([i, t, d]) => `<div class="card"><h3>${i} ${t}</h3><p>${d}</p></div>`).join("")}</div></div>
      ${META.groups
        .map((g) => {
          const items = catalog.filter((c) => c.group === g.id);
          return `<div class="road-g"><h3>${g.emoji} ${esc(g.title)} <span style="text-transform:none;letter-spacing:0;font-weight:400">— ${esc(g.desc || "")}</span></h3><div class="road">${items
            .map((c) => `<a class="pill" href="#${esc(c.id)}">${c.emoji} ${esc(c.title)}</a>`)
            .join("")}</div></div>`;
        })
        .join("")}
      <div class="road-g"><h3>🏗️ More notes</h3><div class="road"><a class="pill" href="lld-notes.html">🏗️ Low Level Design notes: OOP, class relationships, SOLID and design patterns</a></div></div>
    </div>`;
  }

  /* =========================================================
     5. SIDEBAR, ROUTER
     ========================================================= */
  function renderSidebar() {
    const done = revised();
    document.getElementById("side").innerHTML = META.groups
      .map((g) => {
        const items = catalog.filter((c) => c.group === g.id);
        if (!items.length) return "";
        return `<div class="grp" data-g="${esc(g.id)}"><div class="g-title">${g.emoji} ${esc(g.title)}</div>${items
          .map((c) => `<a class="nav-i" href="#${esc(c.id)}" data-id="${esc(c.id)}" data-s="${esc(c.search)}"><input type="checkbox" data-check="${esc(c.id)}" title="Mark as revised" ${done.has(c.id) ? "checked" : ""}><span class="n">${String(c.num).padStart(2, "0")}</span><span class="t">${c.emoji} ${esc(c.title)}</span></a>`)
          .join("")}</div>`;
      })
      .join("") + `<div class="grp"><div class="g-title">More notes</div><a class="nav-i" href="lld-notes.html" data-s="low level design lld oop solid design patterns notes"><span class="n">🏗️</span><span class="t">Low Level Design notes</span></a></div>`;
  }

  function updateProgress() {
    const done = [...revised()].filter((id) => entry.has(id)).length;
    document.getElementById("progLabel").textContent = `${done}/${total}`;
    document.getElementById("progFill").style.width = total ? (done / total) * 100 + "%" : "0%";
    document.getElementById("progBox").title = `${done} of ${total} topics marked as revised`;
  }

  let spy = null;
  function route() {
    DSA.stopAll();
    if (spy) spy.disconnect();
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const c = entry.get(id);
    const main = document.getElementById("main");
    document.querySelectorAll(".nav-i").forEach((a) => a.classList.toggle("on", a.dataset.id === id));

    if (!c || !c.topic) {
      main.innerHTML = homeView();
      document.title = META.title;
      window.scrollTo(0, 0);
      return;
    }
    store.set("last", id);
    main.innerHTML = topicView(c);
    document.title = c.title + " · " + META.title;
    c.topic.demos && c.topic.demos.forEach((d) => DSA.mountDemo(main.querySelector(`[data-demo="${d.id}"]`), d));

    // section chips: smooth scroll + highlight the one in view
    const links = [...main.querySelectorAll(".secnav a")];
    links.forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const el = document.getElementById("sec-" + a.dataset.sec);
        if (el) el.scrollIntoView();
      })
    );
    spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("on", "sec-" + a.dataset.sec === en.target.id));
        });
      },
      { rootMargin: "-120px 0px -65% 0px" }
    );
    main.querySelectorAll(".sec").forEach((s) => spy.observe(s));

    const box = document.getElementById("revisedBox");
    box.addEventListener("change", () => {
      const s = revised();
      if (box.checked) s.add(id); else s.delete(id);
      saveRevised(s);
      document.querySelector(`[data-check="${id}"]`).checked = box.checked;
      updateProgress();
    });
    window.scrollTo(0, 0);
    document.getElementById("side").classList.remove("open");
  }

  /* =========================================================
     6. WIRING
     ========================================================= */
  function init() {
    document.getElementById("pageTitle").textContent = META.title;
    renderSidebar();
    updateProgress();
    applyTheme(store.get("theme") || "dark");

    document.getElementById("themeBtn").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      store.set("theme", next);
      applyTheme(next);
    });
    document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("side").classList.toggle("open"));

    const side = document.getElementById("side");
    side.addEventListener("click", (e) => {
      if (e.target.matches("[data-check]")) e.stopPropagation();
    });
    side.addEventListener("change", (e) => {
      const id = e.target.dataset && e.target.dataset.check;
      if (!id) return;
      const s = revised();
      if (e.target.checked) s.add(id); else s.delete(id);
      saveRevised(s);
      const box = document.getElementById("revisedBox");
      if (box && location.hash.slice(1) === id) box.checked = e.target.checked;
      updateProgress();
    });

    // search filters the sidebar; Enter opens the first match
    const input = document.getElementById("search");
    input.addEventListener("input", () => {
      const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      document.querySelectorAll(".nav-i").forEach((a) => a.classList.toggle("hidden", !terms.every((t) => a.dataset.s.includes(t))));
      document.querySelectorAll(".grp").forEach((g) => g.classList.toggle("hidden", !g.querySelector(".nav-i:not(.hidden)")));
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const first = document.querySelector(".nav-i:not(.hidden)");
        if (first) location.href = first.getAttribute("href");
      }
      if (e.key === "Escape") { input.value = ""; input.dispatchEvent(new Event("input")); input.blur(); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); input.focus(); }
    });

    // copy buttons in annotated code
    document.getElementById("main").addEventListener("click", (e) => {
      const b = e.target.closest("[data-copy]");
      if (!b) return;
      const text = b.closest(".cx").querySelector("textarea").value;
      const ok = () => { b.textContent = "Copied!"; setTimeout(() => (b.textContent = "Copy"), 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, () => (b.textContent = "Select + Ctrl+C"));
    });

    window.addEventListener("hashchange", route);
    route();
  }

  init();
})();
