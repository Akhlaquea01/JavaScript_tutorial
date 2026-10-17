// LLD-Notes/data/00-meta.js — page title + the topic groups ("parts") shown in the sidebar.
//
// HOW THE DATA FILES WORK
// ------------------------------------------------------------------
// Every other file in this folder adds ONE topic:
//
//   window.LLD_TOPICS = window.LLD_TOPICS || [];
//   window.LLD_TOPICS.push({
//     id:      "srp",              // unique, used in the URL hash (#srp)
//     part:    "solid",            // must match a part id below
//     emoji:   "🎯",
//     title:   "S — Single Responsibility",
//     tagline: "One-sentence essence of the topic.",
//     blocks:  [ ...blocks... ],   // the detailed notes (hidden in Quick revise)
//     recap:   [ "...", "..." ],   // 3-5 "Remember" bullets (kept in Quick revise)
//     qa:      [ { q: "...", a: "..." } ],   // optional flash-card questions
//   });
//
// BLOCK TYPES (each may have an optional `heading`)
//   { type: "points",  items: [...], style: "bullets" | "steps" | "check" | "chips" }
//   { type: "text",    text: "..." }
//   { type: "table",   columns: [...], rows: [[...], [...]] }
//   { type: "cards",   cards: [ { title, items: [...], tone: "good" | "bad" } ] }   // side-by-side boxes
//   { type: "code",    lang: "js" | "ts" | "text", label: "...", tone: "good" | "bad", code: `...` }
//   { type: "flow",    steps: [ "A", "B", "C" ] }                                  // A → B → C
//   { type: "uml",     items: [ { kind: "inheritance" | "association" | "aggregation" | "composition",
//                                 a: "Left class", b: "Right class", note: "..." } ] }
//   { type: "callout", kind: "insight" | "warning" | "tip", text: "..." }
//
// TEXT RULES
//   - Any string supports  **bold**  and  `inline code`  (HTML is escaped, so < and > are safe).
//   - Use "double quoted" JS strings; write curly quotes “like this” inside prose.
//   - Code blocks are template literals: do NOT use backticks or ${...} inside them
//     (use "a" + b string concatenation in examples instead).
//   - A topic with no `recap` is always shown in full (used by the cheat sheet).
//
// TO ADD A TOPIC: create NN-your-topic.js here, then add its <script> tag to
// lld-notes.html (before renderer.js). Order inside a part = <script> order.

window.LLD_META = {
  title: "LLD Quick Revision Notes",
  subtitle:
    "Short, plain-English notes on Low-Level Design: OOP basics, how classes relate, and the design principles (SOLID and friends). " +
    "Tick a topic once you have revised it. Hit ⚡ Quick revise for a last-minute skim.",
  storagePrefix: "lld-notes",
  parts: [
    { id: "foundations",   emoji: "🧭", title: "Foundations",          desc: "What LLD is and the class/object basics it builds on." },
    { id: "oop",           emoji: "🧱", title: "The 4 OOP Pillars",    desc: "Encapsulation, inheritance, abstraction, polymorphism." },
    { id: "relationships", emoji: "🔗", title: "Class Relationships",  desc: "How classes connect in a class diagram." },
    { id: "principles",    emoji: "📐", title: "Design Principles",    desc: "Guidelines that keep code easy to change." },
    { id: "solid",         emoji: "🧩", title: "SOLID",                desc: "Five principles, one at a time, with the same payment example." },
    { id: "revision",      emoji: "🧠", title: "Real World & Revision", desc: "Trade-offs in practice, plus a one-page cheat sheet." }
  ]
};
