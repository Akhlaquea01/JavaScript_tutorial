// 02 — Classes & objects
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "class-object",
  part: "foundations",
  emoji: "🧱",
  title: "Classes & Objects",
  tagline: "A class is the blueprint; an object is one real thing built from it.",
  blocks: [
    {
      type: "table",
      columns: ["", "Class", "Object"],
      rows: [
        ["What", "Blueprint / template", "One instance made from the blueprint"],
        ["Holds", "Which fields and methods exist", "Actual values for those fields"],
        ["Example", "`Vehicle` (make, colour, drive, brake)", "A red Yamaha bike"],
        ["How many", "One definition", "As many instances as you need"]
      ]
    },
    {
      type: "table",
      heading: "Three ways to create objects in JavaScript",
      columns: ["Way", "Good for", "Problem"],
      rows: [
        ["Object literal", "A quick one-off object", "Shape is repeated by hand, nothing enforces the same fields, hard to extend"],
        ["Constructor function + `new`", "Many similar objects; shape written once", "Fields are public (anyone can mutate), awkward to specialise, methods defined inside get copied per object"],
        ["`class`", "Clean structure, inheritance, `#private` fields", "Nothing major: it is sugar over the same prototype system"]
      ]
    },
    {
      type: "code",
      lang: "js",
      label: "Same idea, three ways",
      code: `
// 1) Object literal: fine for a one-off
const car = { make: "Toyota", model: "Camry" };

// 2) Constructor function: reusable, but fields are public
function Car(make, model) {
  this.make = make;
  this.model = model;
}
const fortuner = new Car("Toyota", "Fortuner");
fortuner.make = "Maruti";        // anyone can overwrite it

// 3) class: same idea, cleaner, supports inheritance + #private
class Vehicle {
  #make;                         // private field
  constructor(make) { this.#make = make; }
  describe() { return "I am a " + this.#make; }
}
console.log(new Vehicle("Yamaha").describe());   // I am a Yamaha
`
    },
    {
      type: "callout",
      kind: "insight",
      text: "JavaScript is prototype-based, not class-based like Java or PHP. `class` is a nicer way to write the same prototype setup, just like `async/await` is a nicer way to write promises."
    }
  ],
  recap: [
    "Class = reusable blueprint. Object = one instance with real values.",
    "Literal for one-offs, constructor function for templates, `class` for structure + inheritance + privacy.",
    "JS classes are syntactic sugar over prototypes.",
    "`#name` makes a field private. Forget the `#` and it is public."
  ],
  qa: [
    { q: "Why not just use object literals everywhere?", a: "You repeat the shape each time, nothing guarantees every object has the same fields, and variants are hard to organise." },
    { q: "Why did classes arrive if constructor functions work?", a: "Cleaner syntax, a built-in constructor, easy inheritance with `extends`, and private fields with `#`." }
  ]
});
