Session Overview
This revision covered the main OOP building blocks that shape clean low-level design: relationships between classes (inheritance, composition, aggregation, association), coupling and cohesion, and the core SOLID principles. The emphasis was on SRP, OCP, LSP, ISP, and DIP, with practical examples around payments, logging, and engines.
It also touched on DRY, plus the broader design mindset: use abstractions to reduce change impact, and accept that real systems often involve trade-offs rather than perfect principle compliance.

OOP Relationships: Inheritance, Composition, Aggregation, and Association
Object-oriented design often starts by asking what kind of relationship exists between two classes. The key distinction is whether one class is a, has a, or uses a relationship with another.

Inheritance is an is-a relationship. A specialized class inherits behavior from a base class. It is the classic parent-child relationship in OOP, where the child is a more specific version of the parent.

Composition is a strong has-a relationship. The whole owns the part, and the part usually does not make sense independently of the whole. A human and a heart is the example that was used: the heart is treated as part of the human’s internal structure.

Key insight: Composition is the tightest form of coupling among the “has-a” relationships.

Aggregation is also a has-a relationship, but weaker than composition. The whole has the part, but the part can exist independently and may even be shared. A team and a player is the example here: a player can exist outside a single team and may participate elsewhere.

Association is the loosest relationship: a uses-a relationship. It is not ownership, just interaction or usage. A driver uses a car; a person uses a bank.

The implementation intuition is useful:

Composition: the part object is usually created inside the whole.
Aggregation: the part object is passed in, often through a constructor.
Association: one object uses another’s functionality, often by receiving it as a method parameter or calling its methods.
Key insight: If you can tell whether the whole owns the part, merely references it, or just uses it, you can usually identify the correct relationship type.

Key takeaway: Learn to distinguish ownership, reference, and usage — that is the foundation of choosing the right OOP relationship.

Coupling and Cohesion
Coupling describes how much one part of a system depends on another. Tight coupling means a change in one place tends to affect many others. Loose coupling means components are more independent, so changes stay localized.

The fast-food analogy made this intuitive. In a tightly coupled setup, one person takes the order, checks the kitchen, serves the food, waits for the customer, and cleans up. Everything depends on everything else, which makes training harder, replacement harder, and changes riskier. In software, this is the “house of cards” problem: one change can ripple through the system.

A loosely coupled system breaks work into separate parts with clear boundaries. In the restaurant example, a receptionist takes the order, a kitchen display shows requests to the kitchen, a cook prepares the food, a server display marks readiness, and a server delivers the food. Each piece interacts through a clear boundary rather than directly depending on internal behavior.

Key insight: Coupling is about dependency between components; the goal is to keep the blast radius of change small.

Cohesion is the flip side: how closely related the responsibilities inside a single module are. A highly cohesive module does one kind of work that is strongly related. A low-cohesion module tries to do unrelated things, like authentication, payment, and notifications all in one class.

This tied directly back to SRP: high cohesion aligns with a single well-defined responsibility.

Key takeaway: Keep modules cohesive inside and loosely coupled outside.

SOLID Overview and Why Trade-offs Matter
The session revisited SOLID as a practical design toolkit, not a set of rigid laws. The recurring theme was that principles can conflict, and real design work is about balancing them against business and product constraints.

Key insight: In interviews and real projects, you are expected to discuss trade-offs, not just recite definitions.

The bigger-picture framing was that SOLID helps you build code that is easier to extend, test, and maintain, but you do not always satisfy every principle perfectly. Sometimes a design choice improves one principle while slightly weakening another.

The instructor also emphasized that design decisions should depend on context:

expected product lifetime
number of users
load/throughput
likely future changes
business priorities
A short-lived or low-traffic system may not justify elaborate architecture. A system meant to last years likely does.

Key takeaway: SOLID is a guide for better design, but context decides how far you should apply it.

SRP and OCP
Single Responsibility Principle (SRP) says a class or function should have one responsibility. If it has too many reasons to change, it likely violates SRP.

Open/Closed Principle (OCP) says classes should be open for extension, closed for modification. You should be able to add new behavior without editing already-working code.

Key insight: OCP is about adding new code instead of changing stable code; SRP is about keeping responsibilities focused.

The payment-service example illustrated this well. A giant if/else block handling every payment type is a bad pattern because every new payment method requires editing the same block. A better design uses an interface for payment behavior and separate classes for each payment type. The orchestration layer decides which implementation to use, but the existing logic stays stable.

The reason OCP matters is simple: changing existing code increases the risk of breaking dependent code and forces broader retesting. If requirements change frequently, stable architecture becomes more valuable.

Key takeaway: SRP keeps responsibilities clean; OCP keeps changes additive instead of invasive.

Liskov Substitution Principle (LSP)
Liskov Substitution Principle says a derived class should be replaceable for its base class without affecting program correctness. In simple terms, a child class must be a valid substitute for its parent.

Key insight: LSP is about behavioral compatibility, not just inheritance syntax.

The family analogy helped: if the parent is expected to do something reliably, the child stepping into that role should still meet the same expectations. In code, if a base class promises a behavior, all subclasses should honor that promise.

The payment example made the violation obvious. Suppose BitcoinPayment, UPIPayment, and GiftCardPayment are all used through a common PaymentMethod abstraction. If GiftCardPayment behaves differently enough that the caller needs special-case handling, substitutability breaks. That is what makes LSP important: callers should not need to know which subclass they are dealing with.

A particularly useful rule of thumb emerged:

If a subclass forces the caller to add special checks, the hierarchy is probably violating LSP.
If a subclass changes the meaning of the parent contract, the substitution has failed.
There was also a payment-service variant where a GiftCardPaymentType needed special zero-amount handling. The deeper point was not the zero amount itself; it was that the subclass introduced behavior that no longer fit cleanly into the parent contract. If the main code has to branch on type or remember special cases, the abstraction is leaky.

LSP vs OCP: these are related but different.

OCP is about avoiding modification of existing code.
LSP is about preserving behavioral substitutability across subclasses.
A class can be added without modifying old code and still violate LSP if it behaves inconsistently with the abstraction.

Key takeaway: A subclass must preserve the parent contract; if callers need workarounds, the inheritance hierarchy is broken.

Interface Segregation Principle (ISP)
ISP says clients should not be forced to depend on interfaces they do not use. The key correction here was that ISP is specifically about interfaces, not classes.

Key insight: Large, “fat” interfaces force implementers to provide dummy methods or throw “not supported” errors, which is exactly what ISP tries to avoid.

The payment processor example made this concrete. A single interface with methods for credit card, debit card, PayPal, and bank transfer seems convenient at first. But if a provider like Razorpay only supports credit and debit cards, it would still be forced to implement PayPal and bank transfer methods — often by stubbing them out or throwing errors. That is unnecessary coupling.

The better design is to split by capability:

CreditCardProcessor
DebitCardProcessor
PayPalProcessor
BankTransferProcessor
Then each class implements only what it actually supports. Razorpay can implement credit and debit card interfaces; another provider can implement bank transfer too.

The analogy to SRP is natural: both principles push you toward smaller, focused units. ISP just applies this idea to interfaces.

A question came up about method overloading, but the important point was that overloading is not the real issue here. The issue is the shape of the interface and whether a class is being forced to implement methods it does not need.

Key takeaway: Prefer small, capability-specific interfaces; avoid forcing implementations to fake support for unrelated behavior.

Dependency Inversion Principle (DIP)
Dependency Inversion Principle says high-level modules should not depend directly on low-level modules. Instead, both should depend on an abstraction.

Key insight: The abstraction protects core logic from infrastructure churn.

This was explained through several examples.

Car and engine
Car is the high-level module. PetrolEngine, DieselEngine, CNGEngine, and EVEngine are low-level modules. If Car depends directly on PetrolEngine, adding new engine types later becomes painful.

The fix is to depend on an interface:

interface Engine {
  start(): void;
}

class PetrolEngine implements Engine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class DieselEngine implements Engine {
  start(): void {
    console.log("Diesel engine started");
  }
}

class CNGEngine implements Engine {
  start(): void {
    console.log("CNG engine started");
  }
}

class Car {
  constructor(private engine: Engine) {}

  startCar() {
    this.engine.start();
    console.log("Car started");
  }
}

const car = new Car(new PetrolEngine());
car.startCar();
If EV support is needed later, you add a new EVEngine implementation without changing Car.

Logging
A direct console.log scattered through the code is fragile if production logging needs change. If logs must later be formatted as JSON, include timestamps, service names, or function names, changing each call site is painful.

Instead, create a logging service abstraction. The application talks to the logging service, and the service chooses the concrete logger behind the scenes. Examples mentioned included console.log, Winston, and Bunyan, plus a broader production pipeline like ELK.

ELK and production logging
ELK stands for:

Elasticsearch
Logstash
Kibana
The point was that production logging is not just printing a message. It involves central collection, search, retention, and cost trade-offs. A large system may generate enormous amounts of logs, so retaining everything forever is expensive.

Dependency inversion vs dependency injection
These are not the same thing:

Dependency inversion is the principle.
Dependency injection is one technique to implement it.
Passing an Engine through the constructor is dependency injection. The Car receives what it needs instead of creating it itself.

Relative abstraction
A module can be low-level in one context and high-level in another. From the car’s perspective, the engine is low-level. From the engine’s perspective, spark plug or fuel-injection details may be low-level. Abstraction is relative to the layer you are looking at.

Key takeaway: High-level code should depend on interfaces, not concrete implementation details.

DRY
DRY means Don’t Repeat Yourself. The goal is to avoid duplicating code or logic so each piece of knowledge lives in one clear place.

Key insight: If the same idea appears in multiple places, centralize it so there is one source of truth.

The refactoring example used tax calculation. Two functions — calculate total and calculate final total — repeated the same tax logic. The cleaner approach was to combine them into a single function with an additional flag, such as whether to calculate the final total. The tax logic then lives in one place, making future changes easier and less error-prone.

DRY was also distinguished from SOLID:

DRY is about avoiding repeated knowledge or logic.
SRP is about responsibility structure.
LSP is about substitutability.
They can overlap in spirit, but they are not the same thing.

Key takeaway: Keep shared logic in one place; avoid duplicating the same knowledge across functions or classes.

Practical Design Mindset: Collaboration, Abstraction, and Real Systems
A major theme was that software design is collaborative and iterative. In larger systems, you usually do not solve architecture alone. Design often involves multiple review cycles, feedback from architects, developers, DB teams, and infra teams.

The orchestration-engine example showed this well. A real system might first seem like a linked-list problem, then a tree, and finally a graph. After that, you may discover it is specifically a DAG, which changes the traversal and execution strategy. Even if the final low-level design ends up with only a handful of classes, the design discussion can still be deep.

Key insight: Small class count does not mean simple design.

The same idea applied to engineering roles: in larger organizations, responsibility is shared, and communication must adapt to the audience — CTO, developer, architect, or engineering manager. Good engineering is not just writing code; it includes discussion, review, and explaining trade-offs clearly.

Key takeaway: Real system design is iterative, collaborative, and context-driven.

Quick Reference
Relationships
Inheritance: is-a
Composition: strong has-a, whole owns the part
Aggregation: weaker has-a, part can exist independently
Association: uses-a
SOLID
SRP: one class/function, one responsibility
OCP: extend behavior without modifying stable code
LSP: subclasses must preserve the base contract
ISP: small, focused interfaces
DIP: high-level modules depend on abstractions, not concrete implementations
Coupling vs Cohesion
Coupling = dependency between modules
Cohesion = relatedness of responsibilities within a module
Aim for low coupling, high cohesion
Trade-offs
Principles can conflict
OCP may be broken to support a new edge case
LSP is about behavior; OCP is about code modification
Choose based on business need, lifecycle, and expected change
DRY
Keep one source of truth for repeated logic
Centralize repeated calculations or rules
Use shared helpers, methods, or abstractions instead of duplication
DIP examples
Car depends on Engine interface, not PetrolEngine
App depends on logging abstraction, not direct console.log
Business logic should not depend directly on DB or logging details
Quick mental checklist
Is this is-a, has-a, or uses-a?
Does this class have one responsibility?
Can I extend this without modifying stable code?
Can this subclass fully replace its parent?
Is this interface too broad?
Am I depending on abstraction or concrete detail?
Am I duplicating logic that should live in one place?