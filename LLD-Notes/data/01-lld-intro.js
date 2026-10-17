// 01 — What is LLD? (shape of this object is documented at the top of 00-meta.js)
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "lld-intro",
  part: "foundations",
  emoji: "🧭",
  title: "What is LLD?",
  tagline: "LLD is the code-level blueprint: which classes you need, what they hold, and how they talk to each other.",
  blocks: [
    {
      type: "flow",
      heading: "Where LLD fits",
      steps: ["Business problem", "PRD / BRD", "HLD", "LLD", "Code"]
    },
    {
      type: "points",
      items: [
        "**PRD / BRD** = the business requirement written down clearly.",
        "**HLD** = the big picture: major components, architecture, is it feasible?",
        "**LLD** = the detailed design of each component, ready for developers to code.",
        "The PM is the bridge: they turn a *business* problem into a *technical* one."
      ]
    },
    {
      type: "cards",
      heading: "HLD vs LLD",
      cards: [
        { title: "HLD — the whole system", items: ["Major modules", "Data flow", "Broad database choices", "Integrations", "Overall architecture"] },
        { title: "LLD — one component, in detail", items: ["Classes", "Methods and attributes", "How objects interact", "Validation logic", "Internal data structures"] }
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "HLD shows what the system looks like. LLD shows developers how to build one piece of it."
    },
    {
      type: "points",
      heading: "A good LLD is more than “code that works”",
      items: [
        "**Performance** — hit the response-time target.",
        "**Security** — sensitive data must not leak.",
        "**Scalability** — a small internal tool and a global service need very different designs."
      ]
    },
    {
      type: "points",
      heading: "Why it matters even more in big companies",
      items: [
        "Enterprise systems live for years or decades, so design must respect **security, compliance, disaster recovery, backups, data residency and network policies**.",
        "Example: moving an old mainframe app to a cloud / MongoDB setup. The lesson is not the tech, it is how many constraints a real design has to satisfy."
      ]
    }
  ],
  recap: [
    "Flow: Business need → PRD/BRD → HLD → LLD → code.",
    "HLD = architecture and components. LLD = classes, methods, fields, interactions.",
    "Good LLD covers functional needs *and* performance, security and scalability.",
    "In real systems, compliance, recovery and infrastructure shape the design, not just “does it run”."
  ],
  qa: [
    { q: "HLD vs LLD in one line?", a: "HLD decides the system’s shape (components, data flow); LLD decides how one component is built (classes, methods, validations)." },
    { q: "Why is the PM called a bridge?", a: "They convert a business problem into a technical problem that engineers can design for." }
  ]
});
