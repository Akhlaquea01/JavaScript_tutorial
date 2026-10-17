// 15 — I: Interface Segregation Principle
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "isp",
  part: "solid",
  emoji: "✂️",
  title: "I — Interface Segregation",
  tagline: "Don’t force a class to depend on methods it never uses. Split fat interfaces into small ones.",
  blocks: [
    {
      type: "points",
      items: [
        "ISP is about **interfaces**, not classes.",
        "A fat interface forces implementers to write dummy methods or throw “not supported”.",
        "Think of it as SRP applied to interfaces: small, focused units."
      ]
    },
    {
      type: "code",
      lang: "ts",
      tone: "bad",
      label: "Fat interface: Razorpay is forced to fake two methods",
      code: `
interface PaymentProcessor {
  payByCredit(amt: number): void;
  payByDebit(amt: number): void;
  payByPayPal(amt: number): void;
  payByBankTransfer(amt: number): void;
}

class Razorpay implements PaymentProcessor {
  payByCredit(amt: number) { console.log("credit", amt); }
  payByDebit(amt: number)  { console.log("debit", amt); }
  payByPayPal(amt: number)       { throw new Error("not supported"); }   // forced dummy
  payByBankTransfer(amt: number) { throw new Error("not supported"); }   // forced dummy
}
`
    },
    {
      type: "code",
      lang: "ts",
      tone: "good",
      label: "Split by capability: implement only what you support",
      code: `
interface CreditCardProcessor   { payByCredit(amt: number): void; }
interface DebitCardProcessor    { payByDebit(amt: number): void; }
interface PayPalProcessor       { payByPayPal(amt: number): void; }
interface BankTransferProcessor { payByBankTransfer(amt: number): void; }

class Razorpay implements CreditCardProcessor, DebitCardProcessor {
  payByCredit(amt: number) { console.log("credit", amt); }
  payByDebit(amt: number)  { console.log("debit", amt); }
}

class BankGateway implements BankTransferProcessor {
  payByBankTransfer(amt: number) { console.log("bank transfer", amt); }
}

new Razorpay().payByCredit(100);          // credit 100
new BankGateway().payByBankTransfer(200); // bank transfer 200
`
    },
    {
      type: "callout",
      kind: "tip",
      text: "Smell check: empty method bodies, or `throw new Error(\"not supported\")` inside an implemented interface."
    },
    {
      type: "callout",
      kind: "insight",
      text: "Method overloading is a red herring here. The issue is the *shape* of the interface and whether a class is made to implement things it doesn’t need."
    }
  ],
  recap: [
    "Clients should not depend on interfaces they don’t use.",
    "Prefer small, capability-specific interfaces over one big one.",
    "A class implements only the interfaces it truly supports (it can implement several).",
    "Fat interface smell: dummy or “not supported” methods."
  ],
  qa: [
    { q: "ISP vs SRP?", a: "Same spirit (small, focused units). SRP is about classes having one job; ISP is about interfaces being small and focused." },
    { q: "How do you fix a fat interface?", a: "Split it by capability, and have each class implement just the ones it supports." }
  ]
});
