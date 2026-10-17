// 17 — Design in the real world (trade-offs, collaboration)
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "design-mindset",
  part: "revision",
  emoji: "🧠",
  title: "Design in the Real World",
  tagline: "Real design is iterative, collaborative and full of trade-offs. A small class count doesn’t mean an easy problem.",
  blocks: [
    {
      type: "points",
      heading: "What changes outside the textbook",
      items: [
        "You rarely design alone. Expect several **review cycles** with architects, developers, DB and infra teams.",
        "Explain trade-offs in the language of your audience: CTO, developer, architect, engineering manager.",
        "Principles are weighed against **lifetime, users, load, likely changes and business priorities**."
      ]
    },
    {
      type: "flow",
      heading: "Example: how an orchestration engine’s design evolved",
      steps: ["Linked list?", "Tree?", "Graph?", "Specifically a DAG"]
    },
    {
      type: "callout",
      kind: "insight",
      text: "Realising it is a DAG (directed acyclic graph) changes how you traverse and execute it, e.g. running tasks in dependency order. The final LLD may be just a handful of classes, yet the thinking behind them is deep."
    },
    {
      type: "points",
      heading: "Using this in interviews",
      items: [
        "Name the principle, show the smell, show the fix, then **state the trade-off**.",
        "Ask about expected scale and lifetime before choosing how elaborate the design should be.",
        "It is fine to say a design bends one principle on purpose, if you can justify it."
      ]
    }
  ],
  recap: [
    "Design is a team sport: reviews, feedback, explaining trade-offs.",
    "Context (scale, lifetime, change, priorities) decides how much structure you need.",
    "Few classes ≠ simple design.",
    "Interviewers want trade-offs, not just definitions."
  ]
});
