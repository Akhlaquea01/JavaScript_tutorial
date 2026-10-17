// 07 — Class relationships (inheritance, association, aggregation, composition)
window.LLD_TOPICS = window.LLD_TOPICS || [];
window.LLD_TOPICS.push({
  id: "relationships",
  part: "relationships",
  emoji: "🔗",
  title: "Object Relationships",
  tagline: "Is it IS-A, HAS-A (strong or weak) or USES-A? Ownership and lifecycle decide.",
  blocks: [
    {
      type: "uml",
      heading: "The four relationships (UML cues)",
      items: [
        { kind: "inheritance", a: "Car", b: "Vehicle", note: "hollow triangle points to the **parent**. Arrow goes child → parent." },
        { kind: "association", a: "Driver", b: "Car", note: "just a plain line. Both stay independent." },
        { kind: "aggregation", a: "Team", b: "Player", note: "hollow diamond on the **whole**. Part can live alone." },
        { kind: "composition", a: "House", b: "Room", note: "filled diamond on the **whole**. Part dies with it." }
      ]
    },
    {
      type: "table",
      heading: "Side by side",
      columns: ["Relationship", "Meaning", "Part’s lifecycle", "Examples", "In code"],
      rows: [
        ["Inheritance", "IS-A", "n/a (a type of)", "Car is a Vehicle", "`extends`"],
        ["Association", "USES-A", "Fully independent", "Driver–Car, Person–Bank", "Object passed to a method or just called"],
        ["Aggregation", "Weak HAS-A", "Part can outlive the whole", "Team–Player, Library–Book, Bicycle–Wheel", "Part passed in (usually constructor)"],
        ["Composition", "Strong HAS-A", "Part dies with the whole", "House–Room, Human–Heart", "Whole creates the part itself"]
      ]
    },
    {
      type: "code",
      lang: "js",
      label: "How each looks in code",
      code: `
// Composition: Human CREATES and owns its Heart
class Heart { beat() { return "72 bpm"; } }
class Human {
  #heart = new Heart();              // born with the human, gone with it
  pulse() { return this.#heart.beat(); }
}

// Aggregation: Team is GIVEN players that exist on their own
class Player { constructor(name) { this.name = name; } }
class Team {
  constructor(players) { this.players = players; }   // passed in, can outlive the team
}

// Association: Driver just USES a car for a moment
class Driver {
  drive(car) { return car.name + " is moving"; }     // car passed to a method
}

console.log(new Human().pulse());                              // 72 bpm
console.log(new Team([new Player("Asha")]).players.length);    // 1
console.log(new Driver().drive({ name: "Swift" }));            // Swift is moving
`
    },
    {
      type: "callout",
      kind: "tip",
      text: "Quick test: **who creates the part?** Created inside the class → composition. Passed into the constructor → aggregation. Only passed to a method or called → association."
    },
    {
      type: "callout",
      kind: "insight",
      text: "It depends on your domain model. Human–Heart is usually composition, but in a transplant or donor system the heart exists on its own, so you would model it differently. The distinction is about *instances* and ownership, not just the class names."
    }
  ],
  recap: [
    "Inheritance = IS-A. Association = USES-A. Aggregation = weak HAS-A. Composition = strong HAS-A.",
    "Aggregation: part outlives whole. Composition: part dies with the whole.",
    "UML: triangle (inheritance), plain line (association), hollow diamond (aggregation), filled diamond (composition).",
    "Pick the relationship by ownership and lifecycle, not by familiar words."
  ],
  qa: [
    { q: "Aggregation vs composition?", a: "Both are HAS-A. In aggregation the part can exist without the whole (Team–Player). In composition it cannot (House–Room)." },
    { q: "Which way does the inheritance arrow point?", a: "From the child to the parent." },
    { q: "Where does the diamond go?", a: "On the whole’s side, for both aggregation (hollow) and composition (filled)." }
  ]
});
