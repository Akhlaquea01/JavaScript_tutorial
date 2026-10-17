// 06 — Polymorphism
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "polymorphism",
  part: "oop",
  emoji: "🔀",
  title: "Polymorphism",
  tagline: "Same method call, different behaviour depending on the actual object behind it.",
  blocks: [
    {
      type: "text",
      text: "“Many forms.” You write code against a parent class or interface, and each child plugs in its own behaviour. The caller doesn’t need to know which child it has."
    },
    {
      type: "table",
      heading: "Overloading vs overriding",
      columns: ["", "Overloading", "Overriding"],
      rows: [
        ["Also called", "Compile-time polymorphism", "Runtime polymorphism"],
        ["Meaning", "Same method name, different parameter lists", "Child replaces the parent’s method with its own version"],
        ["Who decides", "Compiler, from the signature", "Runtime, from the actual object"],
        ["In JS / TS", "Not truly supported", "Supported"]
      ]
    },
    {
      type: "code",
      lang: "js",
      label: "Overriding in action",
      code: `
class Animal { speak() { return "..."; } }
class Dog extends Animal { speak() { return "Woof"; } }   // overrides
class Cat extends Animal { }                              // no override: inherits "..."

for (const a of [new Animal(), new Dog(), new Cat()]) {
  console.log(a.speak());     // same call, three behaviours
}
// ...
// Woof
// ...
`
    },
    {
      type: "code",
      lang: "js",
      tone: "bad",
      label: "Why JS has no real overloading",
      code: `
function add(a, b)    { return a + b; }
function add(a, b, c) { return a + b + c; }   // replaces the first add

console.log(add(1, 2));   // NaN  (c is undefined)
`
    },
    {
      type: "callout",
      kind: "insight",
      text: "JS functions accept any number of arguments (missing ones become `undefined`), so it never picks a version by signature. In practice, **overriding is the polymorphism tool you use in JS/TS.**"
    }
  ],
  recap: [
    "Polymorphism = one interface, many behaviours.",
    "Overriding (runtime): child redefines a parent method. Works in JS/TS.",
    "Overloading (compile-time): same name, different parameters. Not truly in JS.",
    "No override in the child? It simply inherits the parent’s version."
  ],
  qa: [
    { q: "Overloading vs overriding in one line?", a: "Overloading = same name, different parameters, picked at compile time. Overriding = child replaces a parent method, picked at runtime." },
    { q: "What does the second `add` do in JS?", a: "It replaces the first one. JS keeps only one function per name." }
  ]
});
