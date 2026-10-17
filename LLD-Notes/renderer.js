/* LLD-Notes/renderer.js
   Turns window.LLD_META + window.LLD_TOPICS (LLD-Notes/data/*.js) into lld-notes.html.
   No note content lives here — only drawing, search, progress, theme and quick-revise logic.
   The block/field shapes are documented at the top of data/00-meta.js. */
(function () {
  "use strict";

  /* =========================================================
     1. DATA — normalise parts and topics
     ========================================================= */
  const META = Object.assign({ title: "LLD Notes", subtitle: "", storagePrefix: "lld", parts: [] }, window.LLD_META);
  const parts = META.parts.slice();
  const partRank = new Map(parts.map((p, i) => [p.id, i]));

  // a topic pointing at an unknown part still shows up, in a fallback group
  (window.LLD_TOPICS || []).forEach((t) => {
    if (!partRank.has(t.part)) {
      partRank.set(t.part, parts.length);
      parts.push({ id: t.part, emoji: "📄", title: t.part || "More", desc: "" });
    }
  });

  const topics = (window.LLD_TOPICS || [])
    .map((t, i) => Object.assign({}, t, { _order: i }))
    .sort((a, b) => partRank.get(a.part) - partRank.get(b.part) || a._order - b._order)
    .map((t, i) => Object.assign(t, { num: i + 1 }));

  /* =========================================================
     2. TEXT HELPERS
     ========================================================= */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const C = {
    inlineCode: "px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-cyan-300 font-mono text-[12.5px]",
    strong: "font-semibold text-slate-900 dark:text-white",
    prose: "text-sm leading-7 text-slate-600 dark:text-slate-300"
  };

  // **bold**, *italic* and `code` inside any data string; everything else is escaped
  function inline(s) {
    return String(s)
      .split("`")
      .map((seg, i) =>
        i % 2
          ? `<code class="${C.inlineCode}">${esc(seg)}</code>`
          : esc(seg)
              .replace(/\*\*([^*]+)\*\*/g, `<strong class="${C.strong}">$1</strong>`)
              .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      )
      .join("");
  }

  // tiny syntax colouring: comments, strings, keywords (code blocks are always dark)
  const TOKEN_RE =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(class|extends|implements|interface|abstract|constructor|super|new|return|const|let|function|if|else|throw|get|private|protected|public|static|this|void|number|string|boolean|for|of|in|null|true|false|undefined|typeof|instanceof)\b/g;

  function highlight(code, lang) {
    if (lang === "text") return esc(code);
    let out = "";
    let last = 0;
    let m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(code))) {
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? "text-slate-400 italic" : m[2] ? "text-amber-300" : "text-fuchsia-400";
      out += `<span class="${cls}">${esc(m[0])}</span>`;
      last = TOKEN_RE.lastIndex;
    }
    return out + esc(code.slice(last));
  }

  // every visible string of a topic, lower-cased, for the search box
  const SKIP_KEYS = new Set(["id", "part", "emoji", "type", "kind", "tone", "style", "lang"]);
  function collectText(v, out) {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach((x) => collectText(x, out));
    else if (v && typeof v === "object") for (const k in v) if (!SKIP_KEYS.has(k)) collectText(v[k], out);
  }
  function searchText(t) {
    const out = [];
    collectText(t, out);
    return out.join(" ").replace(/[`*]/g, "").toLowerCase();
  }

  /* =========================================================
     3. BLOCK RENDERERS — one function per `type`
     ========================================================= */
  const HEADING = "text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2";

  const TONE_BORDER = {
    good: "border-emerald-400 dark:border-emerald-500/60",
    bad: "border-rose-400 dark:border-rose-500/60",
    none: "border-slate-200 dark:border-slate-700"
  };
  const TONE_TITLE = {
    good: "text-emerald-700 dark:text-emerald-400",
    bad: "text-rose-700 dark:text-rose-400",
    none: "text-slate-900 dark:text-white"
  };

  const CALLOUT = {
    insight: { icon: "💡", label: "Key idea", box: "border-violet-500 bg-violet-50 dark:bg-violet-500/10", title: "text-violet-700 dark:text-violet-400" },
    warning: { icon: "⚠️", label: "Watch out", box: "border-amber-500 bg-amber-50 dark:bg-amber-500/10", title: "text-amber-700 dark:text-amber-400" },
    tip: { icon: "🎯", label: "Tip", box: "border-sky-500 bg-sky-50 dark:bg-sky-500/10", title: "text-sky-700 dark:text-sky-400" }
  };

  const UML = {
    inheritance: { name: "Inheritance", tag: "is-a" },
    association: { name: "Association", tag: "uses-a" },
    aggregation: { name: "Aggregation", tag: "has-a (weak)" },
    composition: { name: "Composition", tag: "has-a (strong)" }
  };

  function umlSvg(it) {
    const W = 400, H = 60, y = 30, boxW = 112;
    const ax = 12, bx = W - 12 - boxW; // box A: 12..124   box B: 276..388
    const from = ax + boxW; // right edge of A
    const BG = "fill-white dark:fill-slate-900";
    const line = (x1, x2) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="stroke-current" stroke-width="1.6"/>`;
    const diamond = (x, fill) =>
      `<polygon points="${x},${y} ${x + 14},${y - 9} ${x + 28},${y} ${x + 14},${y + 9}" class="stroke-current ${fill}" stroke-width="1.6"/>`;

    let shape = "";
    if (it.kind === "inheritance") {
      shape = line(from, bx - 18) +
        `<polygon points="${bx},${y} ${bx - 18},${y - 10} ${bx - 18},${y + 10}" class="stroke-current ${BG}" stroke-width="1.6"/>`;
    } else if (it.kind === "association") {
      shape = line(from, bx);
    } else if (it.kind === "aggregation") {
      shape = line(from + 28, bx) + diamond(from, BG);
    } else if (it.kind === "composition") {
      shape = line(from + 28, bx) + diamond(from, "fill-current");
    }

    const box = (x, label) =>
      `<rect x="${x}" y="8" width="${boxW}" height="44" rx="6" class="fill-slate-50 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-500" stroke-width="1.4"/>` +
      `<text x="${x + boxW / 2}" y="35" text-anchor="middle" font-size="13" font-weight="600" class="fill-slate-800 dark:fill-slate-100">${esc(label)}</text>`;
    const label = esc(it.label || UML[it.kind].tag);

    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(UML[it.kind].name)}: ${esc(it.a)} to ${esc(it.b)}" class="w-full max-w-[400px] text-slate-600 dark:text-slate-300">
      ${shape}${box(ax, it.a)}${box(bx, it.b)}
      <text x="${(from + bx) / 2}" y="${y - 14}" text-anchor="middle" font-size="11" class="fill-current">${label}</text>
    </svg>`;
  }

  const BLOCKS = {
    points(b) {
      const style = b.style || "bullets";
      if (style === "chips") {
        return `<div class="flex flex-wrap gap-2">${b.items
          .map((i) => `<span class="px-2.5 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">${inline(i)}</span>`)
          .join("")}</div>`;
      }
      const marker = (i) =>
        style === "steps"
          ? `<span class="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center">${i + 1}</span>`
          : style === "check"
          ? `<span class="flex-shrink-0 mt-0.5 text-emerald-500 font-bold">✓</span>`
          : `<span class="flex-shrink-0 mt-0.5 text-cyan-500">▸</span>`;
      return `<ul class="space-y-1.5">${b.items
        .map((it, i) => `<li class="flex gap-2.5 ${C.prose}">${marker(i)}<span class="min-w-0 break-words">${inline(it)}</span></li>`)
        .join("")}</ul>`;
    },

    text(b) {
      return `<p class="${C.prose}">${inline(b.text)}</p>`;
    },

    table(b) {
      const th = "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1.5 text-left font-semibold";
      const td = "border border-slate-200 dark:border-slate-700 px-3 py-1.5 align-top";
      return `<div class="overflow-x-auto"><table class="w-full text-sm leading-6 border-collapse">
        <thead><tr>${b.columns.map((c) => `<th class="${th}">${inline(c)}</th>`).join("")}</tr></thead>
        <tbody>${b.rows
          .map((r) => `<tr>${r.map((c, i) => `<td class="${td} ${i === 0 ? C.strong : ""}">${inline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`;
    },

    cards(b) {
      const cols = b.cards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
      return `<div class="grid grid-cols-1 ${cols} gap-3">${b.cards
        .map((c) => {
          const tone = c.tone || "none";
          return `<div class="rounded-lg border ${TONE_BORDER[tone]} bg-white dark:bg-slate-900/40 p-3.5">
            <div class="text-sm font-bold mb-2 ${TONE_TITLE[tone]}">${inline(c.title)}</div>
            ${c.items ? BLOCKS.points({ items: c.items }) : ""}${c.text ? `<p class="${C.prose}">${inline(c.text)}</p>` : ""}
          </div>`;
        })
        .join("")}</div>`;
    },

    code(b) {
      const lang = b.lang || "js";
      const tone = b.tone || "none";
      const bar = tone === "good" ? "text-emerald-400" : tone === "bad" ? "text-rose-400" : "text-slate-400";
      const label = b.label ? esc(b.label) : lang === "text" ? "diagram" : lang;
      return `<div class="code-block rounded-lg border ${TONE_BORDER[tone]} overflow-hidden bg-slate-950">
        <div class="flex items-center justify-between gap-3 px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px]">
          <span class="font-semibold ${bar}">${label}</span>
          <span class="flex items-center gap-2"><span class="uppercase tracking-wider text-slate-500">${lang === "text" ? "" : lang}</span>
          <button type="button" class="copy-btn px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200">Copy</button></span>
        </div>
        <pre class="p-3 overflow-x-auto text-[13px] leading-relaxed"><code class="font-mono whitespace-pre text-slate-200">${highlight(b.code.replace(/^\n/, "").replace(/\s+$/, ""), lang)}</code></pre>
      </div>`;
    },

    flow(b) {
      const pill = "px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-200";
      return `<div class="flex flex-wrap items-center gap-2">${b.steps
        .map((s, i) => `${i ? '<span class="text-slate-400" aria-hidden="true">→</span>' : ""}<span class="${pill}">${inline(s)}</span>`)
        .join("")}</div>`;
    },

    uml(b) {
      return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-3">${b.items
        .map(
          (it) => `<div class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-3">
            ${umlSvg(it)}
            <div class="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300"><strong class="${C.strong}">${UML[it.kind].name}</strong>${it.note ? " — " + inline(it.note) : ""}</div>
          </div>`
        )
        .join("")}</div>`;
    },

    callout(b) {
      const k = CALLOUT[b.kind] || CALLOUT.insight;
      return `<div class="pl-3 pr-3 py-2.5 border-l-4 ${k.box} rounded-r-lg text-sm leading-6 text-slate-700 dark:text-slate-300 break-words">
        <strong class="${k.title}">${k.icon} ${k.label}:</strong> ${inline(b.text)}
      </div>`;
    }
  };

  function renderBlock(b) {
    const draw = BLOCKS[b.type];
    if (!draw) return `<div class="mt-5 text-xs text-rose-500">Unknown block type: ${esc(b.type)}</div>`;
    const heading = b.heading ? `<h3 class="${HEADING}">${inline(b.heading)}</h3>` : "";
    return `<div class="mt-5">${heading}${draw(b)}</div>`;
  }

  /* =========================================================
     4. PAGE RENDERERS
     ========================================================= */
  const NAV_BASE =
    "nav-item flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 mb-0.5 transition-colors";
  const NAV_ACTIVE = ["bg-slate-100", "dark:bg-slate-800", "text-blue-600", "dark:text-blue-400", "font-semibold", "border-l-2", "border-blue-500", "dark:border-blue-400"];
  const SECTION =
    "section bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 mb-5 scroll-mt-20";

  const topicsOf = (part) => topics.filter((t) => t.part === part.id);

  function renderSidebar() {
    const done = getProgress();
    document.getElementById("sidebar").innerHTML = parts
      .map((p) => {
        const list = topicsOf(p);
        if (!list.length) return "";
        return `<div data-part-nav="${esc(p.id)}">
          <div class="px-2.5 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">${p.emoji} ${esc(p.title)}</div>
          ${list
            .map(
              (t) => `<a href="#${esc(t.id)}" class="${NAV_BASE}" data-id="${esc(t.id)}" data-search="${esc(t._search)}">
                <input type="checkbox" autocomplete="off" class="check w-4 h-4 accent-emerald-500 cursor-pointer flex-shrink-0" data-id="${esc(t.id)}" title="Mark as revised" ${done.has(t.id) ? "checked" : ""}>
                <span class="opacity-50 text-[11px] min-w-[18px]">${String(t.num).padStart(2, "0")}</span>
                <span class="flex-1">${t.emoji} ${esc(t.title)}</span>
              </a>`
            )
            .join("")}
        </div>`;
      })
      .join("");
    // set .checked as a property too, so browser form-restore can't leave stale ticks
    document.querySelectorAll("#sidebar .check").forEach((cb) => (cb.checked = done.has(cb.dataset.id)));
  }

  function renderTopic(t) {
    const hasRecap = Array.isArray(t.recap) && t.recap.length > 0;
    const blocks = (t.blocks || []).map(renderBlock).join("");
    // with a recap, the detail can be collapsed by Quick revise; without one it always shows
    const detail = hasRecap ? `<div class="detail">${blocks}</div>` : blocks;

    const recap = hasRecap
      ? `<div class="mt-6 rounded-lg border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 p-3.5">
           <div class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">⚡ Remember</div>
           ${BLOCKS.points({ items: t.recap, style: "check" })}
         </div>`
      : "";

    const qa = t.qa && t.qa.length
      ? `<div class="mt-5"><h3 class="${HEADING}">🎤 Quick questions</h3>
          ${t.qa
            .map(
              (x) => `<details class="group border border-slate-200 dark:border-slate-700 rounded-lg mb-2 bg-slate-50 dark:bg-slate-800/50">
                <summary class="cursor-pointer select-none px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200">${inline(x.q)}</summary>
                <div class="px-3 pb-3 ${C.prose}">${inline(x.a)}</div>
              </details>`
            )
            .join("")}
        </div>`
      : "";

    return `<section id="${esc(t.id)}" class="${SECTION}" data-search="${esc(t._search)}">
      <h2 class="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white mb-1">
        <span class="text-[11px] border border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 rounded px-1.5 py-0.5">${String(t.num).padStart(2, "0")}</span>
        <span>${t.emoji} ${esc(t.title)}</span>
      </h2>
      <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">📌 ${inline(t.tagline)}</p>
      ${detail}${recap}${qa}
    </section>`;
  }

  function renderContent() {
    document.getElementById("sections").innerHTML = parts
      .map((p) => {
        const list = topicsOf(p);
        if (!list.length) return "";
        return `<div data-part="${esc(p.id)}">
          <div class="flex items-baseline gap-2 flex-wrap mt-8 mb-3 pb-1.5 border-b border-slate-200 dark:border-slate-800">
            <span class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">${p.emoji} ${esc(p.title)}</span>
            ${p.desc ? `<span class="text-xs text-slate-400 dark:text-slate-500">${esc(p.desc)}</span>` : ""}
          </div>
          ${list.map(renderTopic).join("")}
        </div>`;
      })
      .join("");
  }

  /* =========================================================
     5. LOCAL STORAGE (every access guarded — it can throw or be empty)
     ========================================================= */
  const store = {
    get(key) { try { return localStorage.getItem(`${META.storagePrefix}:${key}`); } catch (e) { return null; } },
    set(key, val) { try { localStorage.setItem(`${META.storagePrefix}:${key}`, val); } catch (e) { /* ignore */ } }
  };

  function getProgress() {
    try { return new Set(JSON.parse(store.get("progress")) || []); } catch (e) { return new Set(); }
  }
  function updateProgressBar() {
    const known = new Set(topics.map((t) => t.id));
    const done = [...getProgress()].filter((id) => known.has(id)).length;
    document.getElementById("progressLabel").textContent = `${done}/${topics.length}`;
    document.getElementById("progressFill").style.width = topics.length ? `${(done / topics.length) * 100}%` : "0%";
  }
  function setupProgress() {
    const sidebar = document.getElementById("sidebar");
    sidebar.addEventListener("click", (e) => {
      if (e.target.classList.contains("check")) e.stopPropagation(); // tick without navigating
    });
    sidebar.addEventListener("change", (e) => {
      if (!e.target.classList.contains("check")) return;
      const set = getProgress();
      if (e.target.checked) set.add(e.target.dataset.id); else set.delete(e.target.dataset.id);
      store.set("progress", JSON.stringify([...set]));
      updateProgressBar();
    });
  }

  /* =========================================================
     6. THEME, QUICK REVISE, SEARCH, COPY, SIDEBAR, SCROLL-SPY
     ========================================================= */
  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const btn = document.getElementById("themeToggle");
    btn.textContent = theme === "dark" ? "🌙" : "☀️";
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  function setupTheme() {
    applyTheme(store.get("theme") || "dark");
    document.getElementById("themeToggle").addEventListener("click", () => {
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      store.set("theme", next);
      applyTheme(next);
    });
  }

  const QUICK_ON = ["bg-amber-100", "dark:bg-amber-500/20", "border-amber-400", "dark:border-amber-500/60", "text-amber-800", "dark:text-amber-300"];
  function applyQuick(on) {
    document.querySelectorAll(".detail").forEach((el) => el.classList.toggle("hidden", on));
    const btn = document.getElementById("quickToggle");
    btn.setAttribute("aria-pressed", String(on));
    QUICK_ON.forEach((c) => btn.classList.toggle(c, on));
  }
  function setupQuick() {
    applyQuick(store.get("quick") === "1");
    document.getElementById("quickToggle").addEventListener("click", () => {
      const on = document.getElementById("quickToggle").getAttribute("aria-pressed") !== "true";
      store.set("quick", on ? "1" : "0");
      applyQuick(on);
    });
  }

  function setupSearch() {
    const input = document.getElementById("searchInput");
    input.addEventListener("input", () => {
      const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const matches = (hay) => terms.every((term) => hay.includes(term));
      let any = false;
      document.querySelectorAll(".section").forEach((sec) => {
        const ok = matches(sec.dataset.search);
        sec.classList.toggle("hidden", !ok);
        if (ok) any = true;
      });
      document.querySelectorAll(".nav-item").forEach((a) => a.classList.toggle("hidden", !matches(a.dataset.search)));
      // hide a group header once all its topics are hidden
      document.querySelectorAll("[data-part]").forEach((g) => g.classList.toggle("hidden", !g.querySelector(".section:not(.hidden)")));
      document.querySelectorAll("[data-part-nav]").forEach((g) => g.classList.toggle("hidden", !g.querySelector(".nav-item:not(.hidden)")));
      document.getElementById("noResults").classList.toggle("hidden", any);
    });
    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement && document.activeElement.tagName);
      if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey) { e.preventDefault(); input.focus(); }
      if (e.key === "Escape" && document.activeElement === input) { input.value = ""; input.dispatchEvent(new Event("input")); input.blur(); }
    });
  }

  function setupCopy() {
    document.getElementById("sections").addEventListener("click", (e) => {
      const btn = e.target.closest(".copy-btn");
      if (!btn) return;
      const text = btn.closest(".code-block").querySelector("code").textContent;
      const done = () => {
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => (btn.textContent = "Press Ctrl+C"));
      else btn.textContent = "Unavailable";
    });
  }

  function setupSidebarToggle() {
    const sidebar = document.getElementById("sidebar");
    document.getElementById("hamburger").addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      sidebar.classList.toggle("translate-x-0");
    });
    sidebar.addEventListener("click", (e) => {
      if (e.target.closest("a.nav-item") && window.innerWidth < 768) {
        sidebar.classList.add("-translate-x-full");
        sidebar.classList.remove("translate-x-0");
      }
    });
  }

  function setupScrollSpy() {
    const links = document.querySelectorAll(".nav-item");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = document.querySelector(`.nav-item[data-id="${entry.target.id}"]`);
          if (!link) return;
          links.forEach((l) => l.classList.remove(...NAV_ACTIVE));
          link.classList.add(...NAV_ACTIVE);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    document.querySelectorAll(".section").forEach((s) => obs.observe(s));
  }

  /* =========================================================
     7. INIT
     ========================================================= */
  function init() {
    topics.forEach((t) => (t._search = searchText(t)));
    document.title = META.title;
    document.getElementById("pageTitle").textContent = "🏗️ " + META.title;
    document.getElementById("pageSubtitle").textContent = META.subtitle;

    renderSidebar();
    renderContent();
    setupProgress();
    updateProgressBar();
    setupTheme();
    setupQuick();
    setupSearch();
    setupCopy();
    setupSidebarToggle();
    setupScrollSpy();

    // the target section did not exist when the browser first looked for #hash
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  init();
})();
