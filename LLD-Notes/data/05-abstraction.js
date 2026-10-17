// 05 — Abstraction (abstract classes + interfaces)
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "abstraction",
  part: "oop",
  emoji: "🎭",
  title: "Abstraction",
  tagline: "Show what something does, hide how it does it.",
  blocks: [
    {
      type: "text",
      text: "Library example: you ask for a book and it gets issued. You don’t care how the library finds it. Abstraction gives users a clean service and keeps the messy details out of sight."
    },
    {
      type: "table",
      heading: "Abstraction vs encapsulation",
      columns: ["", "Abstraction", "Encapsulation"],
      rows: [
        ["Focus", "A simplified interface or service for the user", "Protecting a class’s internal data and implementation"],
        ["Scope", "Broader design idea", "Class-level mechanism"],
        ["Link", "Encapsulation helps you achieve abstraction", ""]
      ]
    },
    {
      type: "points",
      heading: "How you build abstraction",
      items: [
        "Inheritance, **abstract classes** and **interfaces**.",
        "Plain JavaScript has **no abstract classes or interfaces**, so these examples use **TypeScript** (`.ts` → compiled to `.js` by `tsc` → run on Node)."
      ]
    },
    {
      type: "cards",
      heading: "Abstract class vs interface (TypeScript)",
      cards: [
        {
          title: "Abstract class",
          items: [
            "Cannot be instantiated, even if every method has a body",
            "Can have state, a constructor, concrete **and** abstract methods",
            "Best for a **shared base** with common behaviour",
            "A class can extend only **one**"
          ]
        },
        {
          title: "Interface",
          items: [
            "Pure contract: *what* must exist, not *how*",
            "No state, no implementation",
            "Best for **capabilities** (`Drivable`, `Flyable`) across unrelated classes",
            "A class can implement **many**"
          ]
        }
      ]
    },
    {
      type: "code",
      lang: "ts",
      label: "Abstract base + capability contracts",
      code: `
interface Drivable { drive(): void; }
interface Flyable  { fly(): void; }

abstract class Vehicle {
  make: string;
  constructor(make: string) { this.make = make; }

  abstract start(): void;                    // contract: every child MUST implement
  stop(): void { console.log("Stopping"); }  // shared, ready-made behaviour
}

class Car extends Vehicle implements Drivable {
  start() { console.log("Petrol engine on"); }
  drive() { console.log("Driving"); }
}

class FlyingCar extends Vehicle implements Drivable, Flyable {
  start() { console.log("Hybrid engine on"); }
  drive() { console.log("Driving"); }
  fly()   { console.log("Flying"); }
}

// new Vehicle("x");   // error: cannot create an instance of an abstract class
// A Car missing start() or drive() is a compile error: the contract is enforced
const car = new Car("Toyota");
car.start();
car.stop();
`
    },
    {
      type: "callout",
      kind: "tip",
      text: "Rule of thumb: **is-a with shared code → abstract class. “can do” capability, or you need more than one → interface.**"
    },
    {
      type: "table",
      heading: "Common questions",
      columns: ["Question", "Answer"],
      rows: [
        ["Instantiate an abstract class?", "No"],
        ["Interface with an implementation?", "No (pure contract)"],
        ["Abstract class implements an interface?", "Yes"],
        ["Interface extends another interface?", "Yes"],
        ["Abstract class extends another abstract class?", "Yes"],
        ["Interface extends an abstract class?", "No in Java-style OOP (as taught). TypeScript is looser: an interface *can* extend a class and inherits its shape."]
      ]
    }
  ],
  recap: [
    "Abstraction = expose the essential behaviour, hide the details.",
    "Abstract class: shared base, can’t be instantiated, one parent only.",
    "Interface: pure contract, a class can implement many.",
    "JS has neither natively. Use TypeScript."
  ],
  qa: [
    { q: "Abstract class or interface for `Drivable` / `Flyable`?", a: "Interfaces. They are capabilities, and a class may need several of them." },
    { q: "What does `abstract start(): void` force?", a: "Every concrete subclass must provide `start()`, or TypeScript reports an error." }
  ]
});
