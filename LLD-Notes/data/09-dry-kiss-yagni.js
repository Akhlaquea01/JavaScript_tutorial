// 09 — The small everyday principles: DRY, KISS, YAGNI, composition over inheritance, Law of Demeter
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "dry-kiss-yagni",
  part: "principles",
  emoji: "🧹",
  title: "DRY, KISS, YAGNI & Friends",
  tagline: "No duplicated knowledge, no needless complexity, no code for imaginary futures.",
  blocks: [
    {
      type: "table",
      columns: ["Principle", "Means", "Smell it fixes"],
      rows: [
        ["DRY (Don’t Repeat Yourself)", "Each piece of logic or knowledge lives in one place", "Same rule copy-pasted in several functions"],
        ["KISS (Keep It Simple)", "Choose the simplest design that works", "Clever, over-engineered code"],
        ["YAGNI (You Aren’t Gonna Need It)", "Don’t build what isn’t needed yet", "“We might need this later” features"],
        ["Composition over inheritance", "Prefer plugging in parts (HAS-A) when it lowers coupling", "Deep, fragile class hierarchies"],
        ["Law of Demeter", "Talk to your direct neighbours only; keep call chains shallow", "`a.getB().getC().doIt()`"]
      ]
    },
    {
      type: "code",
      lang: "js",
      tone: "bad",
      label: "DRY violated: tax rule written twice",
      code: `
const total      = (price) => price + price * 0.18;
const finalTotal = (price) => price + price * 0.18 - 50;   // same tax logic again
`
    },
    {
      type: "code",
      lang: "js",
      tone: "good",
      label: "DRY respected: one source of truth",
      code: `
const TAX = 0.18;
const withTax    = (price) => price + price * TAX;
const finalTotal = (price, discount = 0) => withTax(price) - discount;

console.log(withTax(100));          // 118
console.log(finalTotal(100, 50));   // 68
`
    },
    {
      type: "callout",
      kind: "tip",
      text: "Merge duplicated *knowledge*, not code that merely looks alike. DRY is also not the same as SRP (who owns what) or LSP (safe substitution); they overlap in spirit but answer different questions."
    },
    {
      type: "code",
      lang: "js",
      label: "Law of Demeter",
      code: `
order.getCustomer().getAddress().getCity();   // bad: you know too much about the insides
order.getShippingCity();                      // good: ask your direct neighbour
`
    }
  ],
  recap: [
    "DRY: one source of truth for repeated logic.",
    "KISS: simplest thing that works.",
    "YAGNI: don’t build it until you need it.",
    "Prefer composition when inheritance adds coupling; keep call chains shallow (Demeter)."
  ],
  qa: [
    { q: "How did the tax example get fixed?", a: "The tax calculation moved into one helper (`withTax`), and the other function calls it with an optional discount." },
    { q: "Is it always good to merge similar code?", a: "No. Merge it only when it really is the same knowledge; otherwise you couple unrelated things." }
  ]
});
