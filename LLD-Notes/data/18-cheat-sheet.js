// 18 — One-page cheat sheet. No `recap`, so Quick revise keeps all of it visible.
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "cheat-sheet",
  part: "revision",
  emoji: "📝",
  title: "Final Cheat Sheet",
  tagline: "Everything in one place for the last 10 minutes before an interview.",
  blocks: [
    {
      type: "flow",
      heading: "LLD pipeline",
      steps: ["Business need", "PRD / BRD", "HLD", "LLD", "Code"]
    },
    {
      type: "table",
      heading: "4 OOP pillars",
      columns: ["Pillar", "In one line", "JS note"],
      rows: [
        ["Encapsulation", "Bundle data + methods, control access to state", "`#private`; no native `protected`"],
        ["Inheritance", "Child reuses parent (IS-A)", "`extends`, `super()` before `this`; no multiple inheritance"],
        ["Abstraction", "Expose essentials, hide details", "Abstract classes and interfaces need TypeScript"],
        ["Polymorphism", "One call, many behaviours", "Overriding yes; overloading not truly"]
      ]
    },
    {
      type: "table",
      heading: "Relationships",
      columns: ["Relationship", "Question to ask", "UML", "Code cue"],
      rows: [
        ["Inheritance", "Is X a Y?", "Line + hollow triangle (child → parent)", "`extends`"],
        ["Association", "Does X just use Y?", "Plain line", "Passed to a method"],
        ["Aggregation", "Does X hold Y that can live alone?", "Hollow diamond on the whole", "Passed to constructor"],
        ["Composition", "Does X own Y, which dies with it?", "Filled diamond on the whole", "`new` inside the class"]
      ]
    },
    {
      type: "table",
      heading: "Principles and their smells",
      columns: ["Principle", "Rule", "Smell"],
      rows: [
        ["SRP", "One class, one responsibility", "Class does orders + payments + emails"],
        ["OCP", "Extend by adding code, not editing", "`if/else` ladder per type"],
        ["LSP", "Subclass can replace parent safely", "`instanceof` / special cases in the caller"],
        ["ISP", "Small, focused interfaces", "Empty or “not supported” methods"],
        ["DIP", "Depend on abstractions", "`new Concrete()` inside high-level code"],
        ["DRY", "One source of truth", "Same logic copy-pasted"],
        ["KISS / YAGNI", "Simple; build only what’s needed", "Over-engineering, speculative features"],
        ["Demeter", "Talk to direct neighbours", "`a.getB().getC().do()`"]
      ]
    },
    {
      type: "table",
      heading: "JavaScript gotchas",
      columns: ["Gotcha", "What happens"],
      rows: [
        ["Forgetting `#`", "The field is public"],
        ["`this` before `super()` in a subclass constructor", "ReferenceError"],
        ["`this.method()` inside `method()`", "Infinite recursion; use `super.method()` for the parent’s version"],
        ["Declaring two functions with the same name", "The last one wins (no overloading)"],
        ["Private method with the same name in a child", "A separate method, not an override"]
      ]
    },
    {
      type: "points",
      heading: "Mental checklist before you finalise a design",
      style: "check",
      items: [
        "Is this IS-A, HAS-A or USES-A?",
        "Does this class have one responsibility?",
        "Can I extend this without modifying stable code?",
        "Can this subclass fully replace its parent?",
        "Is this interface too broad?",
        "Do I depend on an abstraction or on a concrete detail?",
        "Am I duplicating logic that should live in one place?",
        "Low coupling, high cohesion?"
      ]
    }
  ]
});
