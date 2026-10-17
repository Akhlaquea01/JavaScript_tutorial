// 11 — SOLID overview
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "solid-overview",
  part: "solid",
  emoji: "🧩",
  title: "SOLID at a Glance",
  tagline: "Five principles for code that is modular, flexible and easy to extend. Use them with judgment.",
  blocks: [
    {
      type: "table",
      columns: ["", "Principle", "One line", "Smell when broken"],
      rows: [
        ["S", "Single Responsibility", "One class, one job, one reason to change", "Class does orders + payments + emails"],
        ["O", "Open / Closed", "Open for extension, closed for modification", "Long `if / else if / switch` ladders"],
        ["L", "Liskov Substitution", "A subclass must be a drop-in replacement for its parent", "Callers need special cases per subclass"],
        ["I", "Interface Segregation", "Many small interfaces beat one fat one", "Empty or “not supported” methods"],
        ["D", "Dependency Inversion", "Depend on abstractions, not concrete classes", "`new ConcreteThing()` inside high-level code"]
      ]
    },
    {
      type: "points",
      heading: "Using SOLID in real life",
      items: [
        "Principles can **conflict**. Improving one may slightly weaken another (e.g. you may bend OCP to handle one new edge case).",
        "**Context decides** how far to go: expected product lifetime, number of users, load, likely future changes, business priorities.",
        "A short-lived, low-traffic tool may not deserve elaborate design. A system meant to last years does.",
        "In interviews, **discuss trade-offs**, don’t just recite definitions."
      ]
    },
    {
      type: "callout",
      kind: "warning",
      text: "Dependency **Inversion** is the principle. Dependency **Injection** is one technique to achieve it. They are not the same thing."
    },
    {
      type: "callout",
      kind: "insight",
      text: "The next five topics reuse one running example, *payments* (card, UPI, Bitcoin, gift card), so you can see each principle on familiar ground."
    }
  ],
  recap: [
    "S: one reason to change. O: extend, don’t edit. L: subclass can stand in for parent. I: small interfaces. D: depend on abstractions.",
    "Principles can conflict; context (lifetime, users, load, change) decides how strictly to apply them.",
    "Dependency inversion (principle) ≠ dependency injection (technique)."
  ],
  qa: [
    { q: "Can you always satisfy all five?", a: "Not always. Real design means balancing them against business needs, and being able to explain the trade-off." }
  ]
});
