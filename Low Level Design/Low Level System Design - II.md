Session Overview
This session built up from core OOP fundamentals into deeper design thinking in TypeScript/JavaScript. It covered abstraction with abstract classes and interfaces, then moved into polymorphism and how JavaScript differs from classically compiled OOP languages.
It also explored object relationships for low-level design: inheritance, association, aggregation, composition, and the practical design trade-offs between them.
The final part introduced design principles, especially SOLID — with focus on SRP and OCP — and showed how they help you write code that is easier to extend, test, and maintain.

OOP Foundations, Abstraction, and TypeScript’s Role
The recap started from the basic building blocks of object-oriented programming: classes, objects, object initialization, encapsulation, private fields and methods, inheritance, interfaces, and the idea of a class hierarchy. These concepts set the stage for the later design discussion.

The four pillars of OOP were identified as:

Inheritance
Encapsulation
Abstraction
Polymorphism
The session focused mainly on the first three in this part, while polymorphism was only mentioned as part of the broader list for now.

Key insight: In JavaScript, OOP support is not always as direct as in classical OOP languages, so TypeScript is often used when you want stronger patterns like abstract classes and interfaces.

Abstract classes
An abstract class is a class you cannot instantiate directly. You use it when you want a shared base structure, but you do not want people creating objects from that base class itself.

An abstract class can contain:

abstract methods — declared with the abstract keyword and meant to be implemented by subclasses
concrete methods — methods with implementations
properties / member variables
a constructor
Key insight: A class marked abstract cannot be instantiated, even if all of its methods have implementations.

Intuition
Think of an abstract class as a partially complete blueprint: it can provide shared code and shared data, but it still leaves some details for child classes.

Interfaces
An interface is another way to define abstraction. It acts as a contract: if a class claims to implement it, the class must provide the required members.

Interfaces were presented as especially useful for modeling capabilities like:

Drivable
Flyable
Each interface defines the methods a class must provide, without forcing a shared implementation.

Key insight: An interface says what must exist, not how it is done.

Worked example: vehicles and capabilities
A vehicle can have many possible behaviors:

drive
start
stop
maybe even fly, in special cases
But not every vehicle should be forced into one giant superclass. Instead, the design can split behavior into smaller contracts:

Drivable

drive(): void
start(): void
stop(): void
Flyable

methods like takeoff/cruise/land style behavior
A Car or Train can extend a common Vehicle class and implement Drivable. TypeScript will complain if the required interface methods are missing, which is exactly the point: the contract is enforced.

Key insight: One class can implement multiple interfaces, but it can extend only one class.

Inheritance vs interfaces
The session compared the two main abstraction tools:

Inheritance is for an is-a relationship and shared code
Interfaces are for shared capability contracts and flexibility
Inheritance is limited to one parent class, while interfaces help when one class needs to support multiple independent behaviors.

Abstract class vs interface in TypeScript
The comparison was sharpened:

Abstract class

can include state, constructor, and implemented methods
best when you want a shared base with common behavior
Interface

a pure contract/shape
best when you want reusable behavior requirements without inheritance coupling
Key insight: Use abstract classes for shared base behavior; use interfaces for reusable contracts across unrelated classes or when you need to work around single inheritance.

Important Q&A points
Can you instantiate an abstract class? No
Can an interface have implementations? No in the classical sense discussed here
Can an abstract class implement an interface? Yes
Can an interface extend another interface? Yes
Can an abstract class extend another abstract class? Yes
Can an interface extend an abstract class? No
Watch out: These abstraction features were discussed as TypeScript features; plain JavaScript does not support them in the same way.

Key takeaway: Abstract classes give you shared base behavior; interfaces give you flexible, reusable contracts.

Polymorphism and Method Behavior in JavaScript/TypeScript
Polymorphism means “many forms.” It refers to a variable, function, or object behaving differently depending on context.

It usually appears in inheritance-based designs, where the same method name can produce different results depending on the actual object behind it.

Key insight: Polymorphism lets you work with a common superclass or interface while still getting object-specific behavior.

Compile-time vs runtime polymorphism
Two forms were discussed:

Compile-time polymorphism
Also called method overloading. The same method name exists with different parameter lists, and the compiler chooses between them.

Runtime polymorphism
Also called method overriding. A child class provides its own implementation of a method defined in the parent class.

Why overloading is not a true JavaScript feature
JavaScript does not support compile-time polymorphism in the strict OOP sense. You can call functions with fewer or more arguments than declared, and missing values may become undefined. So JavaScript does not dispatch based on signature the way Java does.

Key insight: JavaScript does not support true method overloading; it relies on flexible runtime function behavior instead.

Overriding example: Animal and Mammal
A parent Animal class has a speak() method. A child Mammal class defines its own speak() method.

Calling speak() on Animal uses the parent version
Calling speak() on Mammal uses the child version
If the child does not override the method, it inherits the parent implementation
This is runtime polymorphism in action.

Key insight: If a child class does not override a method, it inherits the parent’s behavior.

Quick recap of the distinction
Method overloading: same method name, different parameter lists, compile-time selection, not truly supported in JavaScript
Method overriding: same method name in child and parent, child changes the implementation, supported in JS/TS
Key takeaway: In JS/TS, overriding is the practical polymorphism tool; overloading is not supported as a strict language feature.

Object Relationships in Low-Level Design
Once the OOP basics were in place, the session moved into LLD relationship modeling — how classes relate to each other in a class diagram.

The four relationships covered were:

Inheritance
Association
Aggregation
Composition
Key insight: Relationship modeling is central to low-level design; it is not enough to know classes and methods — you need to know how classes connect.

Inheritance: is-a
Inheritance means one class is a type of another.

Examples:

Car is a Vehicle
Aeroplane is a Vehicle
UML
Inheritance is drawn with a line and an unfilled triangle pointing from child to parent.

Watch out: The arrow direction is child → parent, not the reverse.

Intuition
Use inheritance when the “is-a” sentence sounds natural.

Key takeaway: Inheritance models an is-a relationship and is best when a subclass truly belongs to the parent category.

Association: uses-a / general connection
Association is a weak relationship where objects are connected but neither owns the other strongly.

Examples included:

Car and Driver
Person and Bank
A car can be driven by multiple drivers, and a driver can drive multiple cars. Similarly, a person can interact with a bank without owning it, and the bank does not own the person.

UML
Association is drawn as a plain line.

Intuition
This is a “uses-a” relationship: one object interacts with another, but they remain independent.

Key insight: If instances of another class are passed into methods, that often suggests association.

Key takeaway: Association means objects use each other without ownership.

Aggregation: weak has-a
Aggregation is a whole-part relationship where the part can exist independently of the whole.

Examples:

Team and Player
Library and Books
Bicycle and Wheels
A team may hold references to players, but the players already exist and can later move to another team. A library can reference books without owning their entire existence.

UML
Aggregation uses an unfilled diamond on the whole side.

Intuition
The whole groups the parts, but does not control their lifecycle.

Key insight: Aggregation means the part can exist without the whole.

Key takeaway: Aggregation is a weak has-a relationship with independent lifecycles.

Composition: strong has-a
Composition is the strongest relationship discussed. The whole creates and owns the part, and the part’s lifecycle depends on the whole.

Examples:

House and Rooms
Human and Heart
If the house is destroyed, the room as part of that house no longer makes sense. In the Human and Heart example, the heart is created inside the human object and is owned by it.

UML
Composition uses a filled diamond on the whole side.

Intuition
Composition is a true part-of relationship: the part is tightly bound to the whole.

Key insight: Composition means the part cannot exist without the whole.

Worked example: Human and Heart
A Heart class is created, and a Human class instantiates its own Heart in the constructor.

class Heart {
    // functionality: beats per minute
    void beat() {
        System.out.println("Beating 72 beats per minute");
    }
}

class Human {
    private Heart heart;

    public Human() {
        this.heart = new Heart();
    }
}
Because Human creates the Heart, owns it, and controls its lifecycle, this is composition.

Watch out: The distinction is about instances, not just classes.

Comparing aggregation and composition
The main difference is ownership and lifecycle:

Aggregation: the child can survive without the parent
Composition: the child depends on the parent
The session also stressed that design depends on the domain model. For example, Human and Heart is often composition, but in a transplant or donor-based domain, you may model the relationship differently.

Key insight: The same real-world nouns can map to different relationships depending on the software model.

Why these relationships matter
A major design task in LLD is deciding:

when to use inheritance
when to use association
when to use aggregation
when to use composition
Key takeaway: Choosing the right relationship is about modeling ownership and lifecycle correctly, not just picking a familiar word.

Design Principles and Why They Matter
The session then shifted to design principles — guidelines that help you write software that is easier to maintain, scale, and reuse.

Design principles are not hard rules. They are more like conventions or best practices that help you make better choices.

Key insight: Design principles guide you toward code that is easier for humans to work with over time.

Why design principles matter
Design principles provide a shared vocabulary for teams. They let developers quickly say things like:

“This does not follow Liskov Substitution Principle.”
“This violates DRY.”
“This does not feel KISS.”
That shared language makes collaboration easier and helps teams recognize bad design faster.

They also matter because software can live for decades. Good design helps code remain maintainable, understandable, and robust over time.

High-level goals of design principles
Maintainability
Scalability
Reusability
Robustness
Readability
Understandability
Core design ideas mentioned
The session grouped several broad ideas together:

Modularity
Encapsulation
Polymorphism
Abstraction
Separation of concern
Separation of concern
This was illustrated by splitting a large application into parts like:

controllers
models
routes
Instead of stuffing everything into one huge file or service, you separate responsibilities so each piece stays understandable.

Named principles mentioned
The following principles were explicitly listed:

SOLID
DRY
KISS
YAGNI
Composition over inheritance
Law of Demeter
Design principles vs design patterns
A useful distinction was made:

Design principles are broad guidelines for thinking about software design
Design patterns are reusable solutions to recurring design problems
Key insight: Principles shape your thinking; patterns solve recurring structural problems.

Why design patterns are useful
Many software domains repeat the same structural challenges:

payments
e-commerce
logistics
fintech
Even when the business changes, similar engineering problems recur. That is why patterns are reusable.

The Gang of Four (GoF) was mentioned as the group associated with cataloguing classic design patterns.

Example of a recurring pattern: Observer
The Observer pattern was discussed as a recurring model of dependency and notification.

Examples of the same pattern showed up in:

React state updates
Angular-style reactive behavior
Kafka/message-driven systems
The exact technology differs, but the underlying problem — one thing notifying dependents — is the same.

Key takeaway: Design principles help you write better code, while design patterns give you reusable ways to solve recurring problems.

SOLID Principles
SOLID was introduced as a practical set of five principles for writing code that is modular, flexible, and extensible.

The five principles are:

S — Single Responsibility Principle
O — Open-Closed Principle
L — Liskov Substitution Principle
I — Interface Segregation Principle
D — Dependency Inversion Principle
Watch out: Dependency inversion is the principle; dependency injection is a technique that can help achieve it.

Why SOLID matters
SOLID helps keep code maintainable as it grows. The main theme is that change should be localized, readable, and safe.

Single Responsibility Principle (SRP)
SRP says a class should have one responsibility and one reason to change.

A class should focus on one cohesive job rather than mixing unrelated concerns.

Why SRP matters
When a class has multiple responsibilities, it becomes harder to:

understand
maintain
test
change safely
It also increases coupling and makes the codebase more fragile.

Key insight: One responsibility means fewer reasons for the class to change.

Example: bloated order service
An Order Processing Service was used as the example. It handled:

order creation
payment processing
email confirmation
That violates SRP because the class is doing several unrelated jobs.

If the business later adds:

SMS notifications
WhatsApp notifications
different payment methods
the same class becomes a hot spot for changes.

Refactoring toward SRP
A better structure is to split the responsibilities:

Order service — handles order creation/workflow
Payment service — handles payment logic
Notification service — handles email/SMS/WhatsApp logic
The order service can use the other services, but it should not implement their logic itself.

Key insight: Keep the responsibility with the right class; delegate unrelated work to dedicated classes.

Reuse example
A new use case like a District Pass can reuse payment and notification services while keeping its own business rules separate. That is one of SRP’s advantages: the same support services can be reused across different workflows.

Key takeaway: SRP keeps classes focused, easier to test, and easier to reuse.

Open-Closed Principle (OCP)
OCP says software entities should be open for extension, closed for modification.

That means you should be able to add new behavior without repeatedly editing stable existing code.

Key insight: If adding a new feature means rewriting existing logic, the design is not following OCP.

Why OCP matters
OCP reduces risk in long-lived systems:

fewer changes to working code
fewer bugs introduced by edits
easier maintenance
safer testing
Anti-pattern: conditional ladders
A common OCP violation is a payment service full of:

if
else if
switch-style branching
Example behavior:

if card, do one thing
if Bitcoin, do another
if UPI, add another branch later
This is a code smell because every new payment type forces you to modify existing code.

Watch out: Large conditional ladders are a strong sign that OCP is being violated.

Better design: abstractions and polymorphism
The session showed a refactor using a common interface:

interface PaymentMethod {
  processPayment(amount: number): number;
}
Then each payment type becomes its own class:

class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number): number {
    console.log("Processing credit card payment");
    return amount;
  }
}

class DebitCardPayment implements PaymentMethod {
  processPayment(amount: number): number {
    console.log("Processing debit card payment");
    return amount;
  }
}

class BitcoinPayment implements PaymentMethod {
  processPayment(amount: number): number {
    console.log("Processing bitcoin payment");
    return amount;
  }
}
The service depends only on the abstraction:

class PaymentService {
  deductAmount(paymentMethod: PaymentMethod, amount: number): number {
    return paymentMethod.processPayment(amount);
  }
}
The caller chooses which implementation to pass in:

const paymentService = new PaymentService();

const paymentMethod = new CreditCardPayment();
// could also be DebitCardPayment, BitcoinPayment, etc.

paymentService.deductAmount(paymentMethod, 100);
Why this satisfies OCP
To add a new payment type:

create a new class
implement the same interface
do not change PaymentService
The variation moves into separate classes behind a common contract.

Key insight: OCP is often achieved by pushing variation into implementations behind an interface.

Key takeaway: OCP keeps stable code stable by making new behavior plug in through abstraction instead of conditional edits.

Quick Reference
Abstraction
Abstract class: cannot be instantiated; can contain state, constructor, abstract methods, and concrete methods
Interface: pure contract; no implementation in the classical sense discussed here
TypeScript supports both more directly than plain JavaScript
Polymorphism
Overloading: same method name, different parameter lists; not true JS feature
Overriding: child class replaces parent method implementation; supported in JS/TS
Object relationships
Inheritance = is-a
Association = uses-a
Aggregation = weak has-a
Composition = strong has-a
UML cues
Inheritance: line + unfilled triangle
Association: plain line
Aggregation: line + unfilled diamond
Composition: line + filled diamond
Design principles
SRP: one class, one responsibility
OCP: add new behavior without modifying existing stable code
DRY: avoid duplication
KISS: keep it simple
YAGNI: don’t build what you don’t need
Law of Demeter: keep interaction chains shallow
Composition over inheritance: prefer composition when it reduces coupling
OCP implementation pattern
Define a contract:
PaymentMethod
Create separate implementations:
CreditCardPayment
DebitCardPayment
BitcoinPayment
Depend on the abstraction in the service:
deductAmount(paymentMethod, amount)
Choose the implementation in the caller
Things to remember
Abstract classes are for shared base behavior; interfaces are for reusable contracts
JS supports overriding, not true overloading
Relationship choice depends on ownership and lifecycle
Design principles are guidelines, not hard rules
Conditional ladders often signal a design that should be refactored toward OCP