// 12 — S: Single Responsibility Principle
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "srp",
  part: "solid",
  emoji: "🎯",
  title: "S — Single Responsibility",
  tagline: "A class should do one cohesive job, so it has only one reason to change.",
  blocks: [
    {
      type: "points",
      heading: "Why it matters",
      items: [
        "A class with many jobs is harder to **understand, test and change safely**.",
        "It also raises coupling, so one edit can break an unrelated feature."
      ]
    },
    {
      type: "code",
      lang: "js",
      tone: "bad",
      label: "One class, three reasons to change",
      code: `
class OrderService {
  placeOrder(order) {
    console.log("order created");
    console.log("charging " + order.amount + " by card");   // payment logic
    console.log("emailing confirmation");                   // notification logic
  }
}
// SMS? WhatsApp? UPI? Every new need edits this one class.
`
    },
    {
      type: "code",
      lang: "js",
      tone: "good",
      label: "Each job in its own class; OrderService just coordinates",
      code: `
class PaymentService {
  charge(amount) { console.log("charging " + amount); }
}
class NotificationService {
  notify(msg) { console.log("notify: " + msg); }
}

class OrderService {
  constructor(payment, notifier) {
    this.payment = payment;
    this.notifier = notifier;
  }
  placeOrder(order) {
    console.log("order created");
    this.payment.charge(order.amount);       // delegate, don't implement
    this.notifier.notify("order confirmed");
  }
}

new OrderService(new PaymentService(), new NotificationService()).placeOrder({ amount: 500 });
// order created
// charging 500
// notify: order confirmed
`
    },
    {
      type: "points",
      heading: "What you gain",
      items: [
        "New channel (SMS, WhatsApp)? Only `NotificationService` changes.",
        "New payment method? Only `PaymentService` changes.",
        "A new use case like a **District Pass** can reuse payment and notification services and keep only its own business rules."
      ]
    }
  ],
  recap: [
    "One class = one responsibility = one reason to change.",
    "Split unrelated jobs (orders, payments, notifications) into separate classes.",
    "The coordinating class delegates; it does not implement others’ logic.",
    "Payoff: easier to test, change and reuse."
  ],
  qa: [
    { q: "Quick test for an SRP violation?", a: "If you describe the class with “and” (creates orders **and** charges cards **and** sends email), it probably does too much." },
    { q: "Does SRP mean one method per class?", a: "No. It means one *cohesive responsibility*; the class can have several methods that serve it." }
  ]
});
