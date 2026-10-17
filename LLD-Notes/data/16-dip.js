// 16 — D: Dependency Inversion Principle
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "dip",
  part: "solid",
  emoji: "🔄",
  title: "D — Dependency Inversion",
  tagline: "High-level code should depend on abstractions, not on concrete low-level details.",
  blocks: [
    {
      type: "text",
      text: "A high-level module holds the core logic (e.g. `Car`). Low-level modules are the details it uses (`PetrolEngine`, `DieselEngine`, `EVEngine`). Both should meet at an interface in the middle. That shields core logic from infrastructure churn."
    },
    {
      type: "code",
      lang: "text",
      label: "Dependency direction",
      code: `
Before:  Car ──────▶ PetrolEngine           (add Diesel / EV = edit Car)

After:   Car ──▶ «Engine» ◀── PetrolEngine / DieselEngine / EVEngine
`
    },
    {
      type: "code",
      lang: "ts",
      label: "Car depends on Engine, not on a specific engine",
      code: `
interface Engine { start(): void; }

class PetrolEngine implements Engine { start() { console.log("Petrol engine started"); } }
class DieselEngine implements Engine { start() { console.log("Diesel engine started"); } }
class EVEngine     implements Engine { start() { console.log("EV motor started"); } }   // added later, Car unchanged

class Car {
  private engine: Engine;
  constructor(engine: Engine) { this.engine = engine; }   // injected from outside

  startCar() {
    this.engine.start();
    console.log("Car started");
  }
}

new Car(new PetrolEngine()).startCar();
// Petrol engine started
// Car started
`
    },
    {
      type: "table",
      heading: "Inversion vs injection",
      columns: ["", "Dependency Inversion", "Dependency Injection"],
      rows: [
        ["What", "A design principle", "A technique"],
        ["Rule", "Depend on abstractions", "Pass dependencies in from outside instead of creating them inside"],
        ["Here", "`Car` uses the `Engine` interface", "`Engine` is passed to the `Car` constructor"]
      ]
    },
    {
      type: "points",
      heading: "Real example: logging",
      items: [
        "Scattered `console.log` calls hurt when production needs JSON logs, timestamps, service names or function names. You would edit every call site.",
        "Instead, the app talks to a **logging abstraction**. Behind it you can swap `console.log`, Winston or Bunyan without touching business code.",
        "In production, logs also flow into a pipeline such as **ELK** (Elasticsearch, Logstash, Kibana) for central collection and search. Logging is not just printing: think retention and **cost**, since keeping every log forever is expensive."
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "“High-level” and “low-level” are relative. The engine is low-level to the car but high-level to its spark plug. Business logic should never depend directly on DB or logging details."
    }
  ],
  recap: [
    "High-level modules depend on abstractions, not on concrete low-level classes.",
    "`Car` → `Engine` interface ← `PetrolEngine` / `EVEngine`.",
    "Injection (passing the dependency in) is a technique to achieve inversion.",
    "Wrap volatile details (logging, DB, payments) behind an interface."
  ],
  qa: [
    { q: "Dependency Inversion vs Injection?", a: "Inversion is the principle (depend on abstractions). Injection is one way to do it (receive the dependency instead of creating it)." },
    { q: "Add EV support to `Car`: what changes?", a: "Nothing in `Car`. Add an `EVEngine` that implements `Engine` and pass it in." }
  ]
});
