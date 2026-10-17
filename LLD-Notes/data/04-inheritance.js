// 04 — Inheritance
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "inheritance",
  part: "oop",
  emoji: "🧬",
  title: "Inheritance",
  tagline: "A child class reuses and extends a parent. Use it when “child IS-A parent” sounds natural.",
  blocks: [
    {
      type: "points",
      items: [
        "Gives **code reuse** and a **type hierarchy**: shared behaviour sits high, specialised behaviour sits low.",
        "Example chain: `Vehicle` → `WheeledVehicle` → `TwoWheeler` / `FourWheeler`."
      ]
    },
    {
      type: "code",
      lang: "js",
      label: "extends + super",
      code: `
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(this.name + " makes a sound"); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);              // 1) call parent constructor BEFORE using this
    this.breed = breed;
  }
  speak() {
    super.speak();            // 2) reuse the parent's behaviour...
    console.log(this.name + " barks");   // ...then add your own
  }
}

new Dog("Rex", "Lab").speak();
// Rex makes a sound
// Rex barks
`
    },
    {
      type: "points",
      heading: "Two rules to remember",
      items: [
        "If a subclass has a constructor, it must call `super()` **before** touching `this`.",
        "To extend a parent method, call `super.method()`. Calling `this.method()` inside the same method calls *itself* again."
      ]
    },
    {
      type: "callout",
      kind: "warning",
      text: "`this.speak()` inside `speak()` recurses forever. `this` before `super()` throws a ReferenceError."
    },
    {
      type: "table",
      heading: "Types of inheritance",
      columns: ["Type", "Shape", "JavaScript?"],
      rows: [
        ["Single", "One child, one parent", "Yes"],
        ["Multi-level", "A → B → C", "Yes"],
        ["Hierarchical", "Many children, one parent", "Yes"],
        ["Multiple", "One child, many parents", "No"],
        ["Hybrid (mix of the above)", "Combination", "Not fully"]
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "Private methods belong to the class that defines them. If a child declares a `#helper` with the same name, it is a separate method, not an override. Also, always go up the normal parent chain; don’t try to skip levels."
    }
  ],
  recap: [
    "Inheritance = IS-A. Child gets parent’s fields and methods.",
    "`extends` to inherit, `super()` first in the constructor, `super.method()` to build on a parent method.",
    "JS supports single, multi-level and hierarchical. No multiple inheritance.",
    "JS has no built-in interfaces (TypeScript adds them)."
  ],
  qa: [
    { q: "Why must `super()` come first?", a: "It builds the parent part of the object. Until then `this` does not exist yet." },
    { q: "Can a JS class extend two classes?", a: "No. Only one parent. Combine behaviours with composition or (in TypeScript) interfaces." }
  ]
});
