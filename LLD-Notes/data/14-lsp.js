// 14 — L: Liskov Substitution Principle
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "lsp",
  part: "solid",
  emoji: "🔁",
  title: "L — Liskov Substitution",
  tagline: "A child class must work anywhere its parent is expected, with no surprises for the caller.",
  blocks: [
    {
      type: "points",
      items: [
        "It is about **behavioural compatibility**, not just writing `extends`.",
        "If the parent promises something, every subclass must keep that promise.",
        "Callers should never need to know which subclass they hold."
      ]
    },
    {
      type: "code",
      lang: "js",
      tone: "bad",
      label: "GiftCardPayment breaks the parent’s promise",
      code: `
// Contract of Payment.pay(): ALWAYS returns a receipt { paid }
class Payment {
  pay(amount) { return { paid: amount }; }
}
class UpiPayment extends Payment {}

class GiftCardPayment extends Payment {
  constructor(balance) { super(); this.balance = balance; }
  pay(amount) {
    if (amount > this.balance) return null;   // no receipt: contract broken
    this.balance -= amount;
    return { paid: amount };
  }
}

function checkout(payment, amount) {
  const receipt = payment.pay(amount);
  console.log("Paid", receipt.paid);           // TypeError for a low-balance gift card
}
checkout(new UpiPayment(), 100);               // Paid 100
checkout(new GiftCardPayment(50), 100);        // crashes
// The "fix" of adding  if (payment instanceof GiftCardPayment)  is exactly the smell
`
    },
    {
      type: "code",
      lang: "js",
      tone: "good",
      label: "Every subclass keeps the same contract",
      code: `
// Contract: pay() ALWAYS returns { ok, paid }
class Payment {
  pay(amount) { return { ok: true, paid: amount }; }
}
class GiftCardPayment extends Payment {
  constructor(balance) { super(); this.balance = balance; }
  pay(amount) {
    if (amount > this.balance) return { ok: false, paid: 0 };   // same shape
    this.balance -= amount;
    return { ok: true, paid: amount };
  }
}

function checkout(payment, amount) {            // no instanceof, no special cases
  const r = payment.pay(amount);
  console.log(r.ok ? "Paid " + r.paid : "Payment failed");
}
checkout(new Payment(), 100);                   // Paid 100
checkout(new GiftCardPayment(50), 100);         // Payment failed
`
    },
    {
      type: "points",
      heading: "Rules of thumb for spotting a violation",
      items: [
        "The caller has to add **special checks** or branch on the subclass type.",
        "A subclass **changes the meaning** of the parent’s contract.",
        "The abstraction is “leaky”: you must remember the exceptions."
      ]
    },
    {
      type: "table",
      heading: "LSP vs OCP",
      columns: ["", "OCP", "LSP"],
      rows: [
        ["Asks", "Can I add behaviour without editing old code?", "Does the new subclass behave like its parent?"],
        ["About", "Code modification", "Behaviour across subclasses"]
      ]
    },
    {
      type: "callout",
      kind: "insight",
      text: "You can add a class without touching old code (OCP satisfied) and still break LSP, if that class behaves inconsistently with the abstraction."
    }
  ],
  recap: [
    "A subclass must be a valid substitute for its parent.",
    "Keep the parent’s contract: same kind of inputs, outputs and guarantees.",
    "If callers need `instanceof` or special cases, the hierarchy is broken.",
    "LSP is about behaviour; OCP is about not editing old code."
  ],
  qa: [
    { q: "A subclass overrides a method to throw “not supported”. Which principle is hurt?", a: "LSP (callers can’t substitute it safely). It also hints at an ISP problem: the parent type is too broad." },
    { q: "Is `extends` enough to satisfy LSP?", a: "No. Syntax is not the point; the subclass must honour the parent’s behaviour." }
  ]
});
