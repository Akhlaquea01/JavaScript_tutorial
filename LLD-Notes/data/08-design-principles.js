// 08 — Design principles: what they are and why they matter
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "design-principles",
  part: "principles",
  emoji: "📐",
  title: "Why Design Principles?",
  tagline: "Guidelines, not laws, that keep code easy to maintain, extend and reuse for years.",
  blocks: [
    {
      type: "points",
      heading: "Why they matter",
      items: [
        "They give a team a **shared vocabulary**: “this breaks LSP”, “that violates DRY”, “not very KISS”. Bad design gets spotted faster.",
        "Software can live for decades. Good design keeps it understandable and robust that long.",
        "They are conventions and best practices, so you apply judgment. They are not hard rules."
      ]
    },
    {
      type: "points",
      heading: "What good design aims for",
      style: "chips",
      items: ["Maintainability", "Scalability", "Reusability", "Robustness", "Readability", "Understandability"]
    },
    {
      type: "points",
      heading: "Core ideas behind them",
      items: [
        "**Modularity**, **encapsulation**, **abstraction**, **polymorphism**.",
        "**Separation of concerns**: give each part its own job. Example: split a big app into *controllers*, *models* and *routes* instead of one giant file."
      ]
    },
    {
      type: "points",
      heading: "Named principles you will hear",
      style: "chips",
      items: ["SOLID", "DRY", "KISS", "YAGNI", "Composition over inheritance", "Law of Demeter"]
    },
    {
      type: "cards",
      heading: "Principles vs patterns",
      cards: [
        { title: "Design principle", text: "A broad guideline for *how to think* about design (e.g. SOLID, DRY)." },
        { title: "Design pattern", text: "A reusable solution to a *recurring* design problem. The Gang of Four (GoF) catalogued the classic ones." }
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "Patterns exist because domains repeat problems (payments, e-commerce, logistics, fintech). Example: **Observer**, “one thing notifies its dependents”, shows up in React state updates, Angular reactive code and Kafka-style messaging. The tech changes; the problem is the same."
    }
  ],
  recap: [
    "Principles are guidelines that improve maintainability, scalability, reusability and readability.",
    "They give teams a shared language for reviewing design.",
    "Separation of concerns: one job per part (controllers / models / routes).",
    "Principles shape your thinking; patterns are ready-made solutions to recurring problems."
  ],
  qa: [
    { q: "Principle or pattern: Observer?", a: "Pattern. It is a reusable structure for “notify my dependents when something changes”." },
    { q: "Principle or pattern: SRP?", a: "Principle. It is guidance on how to split responsibilities, not a specific code structure." }
  ]
});
