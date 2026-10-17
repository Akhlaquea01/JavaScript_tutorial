// 03 — Encapsulation
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "encapsulation",
  part: "oop",
  emoji: "🔒",
  title: "Encapsulation",
  tagline: "Keep data and the methods that use it together, and control exactly how that data can change.",
  blocks: [
    {
      type: "points",
      items: [
        "Bundle **data + methods** into one unit (think of a capsule: you use it, you don’t open it).",
        "Outside code talks to the class through methods, not by poking at fields.",
        "Payoff: **data integrity, security, maintainability, flexibility**.",
        "Because the class controls updates, it can **validate before it changes anything**: permissions, types, business rules."
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "Encapsulation is not only “make fields private”. It is about controlling *how state changes*."
    },
    {
      type: "code",
      lang: "js",
      label: "Private state + controlled access",
      code: `
class BankAccount {
  #balance = 0;                              // private: outside code can't touch it

  get balance() { return this.#balance; }    // controlled read

  deposit(amount) {                          // controlled write (validated)
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    this.#audit("withdrew " + amount);
  }

  #audit(msg) { console.log("[audit] " + msg); }   // private method: hidden helper
}

const acc = new BankAccount();
acc.deposit(100);
acc.withdraw(30);                            // [audit] withdrew 30
console.log(acc.balance);                    // 70
// acc.#balance = 1000000;                   // SyntaxError: private field
`
    },
    {
      type: "table",
      heading: "Access modifiers: Java vs JavaScript",
      columns: ["Level", "Java", "JavaScript"],
      rows: [
        ["public", "Yes", "Default for everything"],
        ["private", "Yes", "`#name` (fields and methods)"],
        ["protected", "Yes (subclass access)", "None built in"],
        ["default / package", "Yes", "None built in"]
      ]
    },
    {
      type: "callout",
      kind: "tip",
      text: "Don’t test private methods directly. Test the public methods that use them. Private members are implementation details."
    }
  ],
  recap: [
    "Encapsulation = data + methods in one unit, with controlled access.",
    "Expose state through getters/setters or methods that validate input.",
    "JS has public (default) and `#private`. No native `protected`.",
    "Test the public interface, not the private internals."
  ],
  qa: [
    { q: "Is encapsulation the same as making everything private?", a: "No. Hiding is the tool; the goal is to control how state changes so rules (validation, permissions) always run." },
    { q: "How do you hide a helper method in JS?", a: "Prefix it with `#`, like `#audit()`. It becomes private to the class." }
  ]
});
