// 13 — O: Open/Closed Principle
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "ocp",
  part: "solid",
  emoji: "🔌",
  title: "O — Open / Closed",
  tagline: "Add new behaviour by adding new code, not by editing code that already works.",
  blocks: [
    {
      type: "callout",
      kind: "warning",
      text: "Smell: a long `if / else if / switch` ladder that grows every time a new type appears."
    },
    {
      type: "code",
      lang: "js",
      tone: "bad",
      label: "Every new payment type means editing this function",
      code: `
function pay(type, amount) {
  if (type === "card")         console.log("card payment", amount);
  else if (type === "bitcoin") console.log("bitcoin payment", amount);
  else if (type === "upi")     console.log("upi payment", amount);   // added later = edit
}
`
    },
    {
      type: "code",
      lang: "ts",
      tone: "good",
      label: "Variation lives behind an interface",
      code: `
interface PaymentMethod {
  processPayment(amount: number): number;
}

class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number) { console.log("credit card payment"); return amount; }
}
class BitcoinPayment implements PaymentMethod {
  processPayment(amount: number) { console.log("bitcoin payment"); return amount; }
}

class PaymentService {                          // depends only on the abstraction
  deductAmount(method: PaymentMethod, amount: number) {
    return method.processPayment(amount);
  }
}

const service = new PaymentService();
service.deductAmount(new CreditCardPayment(), 100);   // credit card payment
service.deductAmount(new BitcoinPayment(), 100);      // bitcoin payment
`
    },
    {
      type: "points",
      heading: "To add UPI later",
      style: "steps",
      items: [
        "Create `UpiPayment implements PaymentMethod`.",
        "Pass it to `deductAmount`.",
        "`PaymentService` stays untouched."
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "Why bother? Editing working code risks breaking whatever depends on it and forces re-testing. OCP matters most when requirements change often. The trick is to **push variation into separate implementations behind a common contract** (polymorphism)."
    }
  ],
  recap: [
    "Open for extension, closed for modification.",
    "Spot it: type-based `if/else` or `switch` ladders.",
    "Fix: interface + one class per variant; the caller picks the implementation.",
    "OCP = don’t *edit* stable code. (Different from LSP, see next topics.)"
  ],
  qa: [
    { q: "Where does the “which payment?” decision go after the refactor?", a: "In the caller (or orchestration layer), which passes in the chosen implementation. The service itself never branches on type." },
    { q: "Is OCP about never touching old code?", a: "Mostly about not needing to. Sometimes you bend it for an edge case, which is a trade-off to be explained." }
  ]
});
