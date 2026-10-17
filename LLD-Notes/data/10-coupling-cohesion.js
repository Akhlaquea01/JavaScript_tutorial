// 10 — Coupling and cohesion
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "coupling-cohesion",
  part: "principles",
  emoji: "🧲",
  title: "Coupling & Cohesion",
  tagline: "Aim for loose coupling between modules and high cohesion inside each one.",
  blocks: [
    {
      type: "cards",
      cards: [
        {
          title: "Coupling = how much modules depend on each other",
          items: [
            "**Tight:** a change in one place ripples through many others (a house of cards).",
            "**Loose:** clear boundaries, so changes stay local. Small “blast radius”."
          ]
        },
        {
          title: "Cohesion = how related a module’s own jobs are",
          items: [
            "**High:** one kind of work, strongly related.",
            "**Low:** unrelated jobs in one class, like auth + payment + notifications."
          ]
        }
      ]
    },
    {
      type: "cards",
      heading: "Analogy: a fast-food counter",
      cards: [
        {
          tone: "bad",
          title: "Tightly coupled",
          items: [
            "One person takes the order, checks the kitchen, serves, waits for the customer and cleans.",
            "Hard to train, hard to replace, any change is risky."
          ]
        },
        {
          tone: "good",
          title: "Loosely coupled",
          items: [
            "Receptionist → kitchen display → cook → ready display → server.",
            "Each step talks across a clear boundary, never into another’s internals."
          ]
        }
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "High cohesion is SRP in spirit (one clear responsibility). Loose coupling is what abstractions and interfaces buy you (see DIP)."
    }
  ],
  recap: [
    "Coupling = dependency between modules. Cohesion = relatedness inside a module.",
    "Goal: **low coupling, high cohesion**.",
    "Tight coupling = changes ripple. Loose coupling = changes stay local.",
    "A class mixing auth, payments and notifications has low cohesion."
  ],
  qa: [
    { q: "Which one do you want high, which low?", a: "Cohesion high, coupling low." },
    { q: "How does this link to SRP?", a: "A class with one responsibility is naturally highly cohesive." }
  ]
});
