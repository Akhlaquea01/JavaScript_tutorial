Notes
info
These are AI-generated notes and might have some hiccups
Session Overview
This part of the series introduced low-level design (LLD) and how it fits into the software delivery flow from business need to implementation. It then built up the OOP foundation needed for LLD: classes and objects, constructor functions, class syntax, encapsulation, inheritance, and abstraction.
You also saw why JavaScript’s object model is different from Java/PHP style OOP, how this and super behave in inheritance, and how TypeScript abstract classes help define contracts for subclasses.

Low-Level Design: what it is and where it fits
Low-level design is the code-level planning stage of a system. It answers questions like: what classes do you need, what methods and attributes should they have, how do they interact, and what validations or data structures are required?

It sits between broad architecture and actual implementation:

Business problem
PRD / BRD — the business requirement is documented clearly
High-Level Design (HLD) — major components, architecture, and feasibility
Low-Level Design (LLD) — detailed design of each component
Implementation
The PM was framed as the bridge between business and engineering.

Key insight: The PM converts a business problem into a technical problem.

HLD vs LLD
High-Level Design is about the system as a whole:

major modules
data flow
broad database choices
integrations
overall architecture
Low-Level Design is about one component in detail:

classes
methods
attributes
object interactions
validation logic
internal data structures
Key insight: HLD tells you what the system should look like; LLD tells developers how to build a piece of it.

What LLD should cover
LLD is not only about functionally correct code. It should also reflect non-functional constraints:

Performance — response time targets matter
Security — sensitive data must not leak
Scalability — a small service and a global service need very different designs
Enterprise context
The reason LLD matters so much in large organizations is that systems often live for years or decades. Design choices have to account for:

security
compliance
disaster recovery
backups
data residency
network policies
A migration example was used: moving an old mainframe application and its data into a modern cloud / MongoDB setup. The point was not the technology itself, but how many constraints enterprise design must satisfy.

Key insight: In real systems, design is constrained by compliance, recovery, and infrastructure — not just by whether the code runs.

Key takeaway: LLD is the detailed blueprint that turns architecture into implementable code while respecting functional and non-functional requirements.

Classes and Objects in OOP
The first OOP foundation was the difference between a class and an object.

A class is a blueprint. It defines:

properties / fields — the data the object will have
methods / behaviors — what the object can do
An object is an instance of a class with actual values filled in.

Key insight: A class is the template; an object is the concrete thing created from it.

Vehicle example
A vehicle class might define:

identity
state
behaviors like drive, brake, accelerate
A specific object might be a Yamaha bike:

make/model values
color
actual behavior through the class’s methods
The purpose of the class/object distinction is to support reusable, structured design:

class = reusable shape
object = one created entity
Key takeaway: OOP starts by separating the reusable blueprint from the actual instance.

JavaScript object creation: literals, constructor functions, and classes
JavaScript supports OOP, but it is historically prototype-based, not class-based in the same way as Java or PHP. That is why object creation in JS can happen in multiple ways.

1) Object literals
The simplest form is an object literal:

const car = {
  make: "Toyota",
  model: "Camry",
  start: function () {
    console.log(this);
  }
};
This is fine for one-off objects, but it becomes messy when you need many similar objects.

Problems with object literals
Duplication: you repeat the same shape many times
No enforced structure: different objects may use different field names
Poor extensibility: harder to organize related variants cleanly
Key insight: Object literals are fine for simple one-offs, but they become unwieldy for repeated structured creation.

2) Constructor functions
A constructor function is a reusable function used to create many similar objects.

function Car(make, model) {
  this.make = make;
  this.model = model;

  this.start = function () {
    // start logic
  };

  this.drive = function () {
    // drive logic
  };
}

const fortuner = new Car("Toyota", "Fortuner");
This solves some duplication and consistency issues because the structure is defined once.

Limitations of constructor functions
They still expose state publicly
Mutation is easy from outside
Extending to more specialized types is awkward
If methods are defined inside the constructor, each instance may carry its own copy
Example of unwanted mutation:

fortuner.make = "Maruti";
fortuner.model = "Alto";
Key insight: Constructor functions reduce duplication, but they do not give strong control over visibility or variation.

3) ES6 class syntax
Class syntax was introduced as a cleaner abstraction over the same prototype-based model.

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    // start logic
  }

  drive() {
    // drive logic
  }
}
Class syntax gives you:

a cleaner structure
a built-in constructor
easier inheritance
private fields with #
Key insight: JavaScript classes are largely syntactic sugar over prototypes, similar to how async/await is syntactic sugar over promises.

Private fields in classes
Private fields use #:

class Car {
  #make;
  #model;

  constructor(make, model) {
    this.#make = make;
    this.#model = model;
  }

  start() {
    return `${this.#make} ${this.#model} is cruising`;
  }
}
Trying to access them outside the class fails:

const car = new Car();
car.#make = "Toyota"; // Error
Key insight: In JavaScript, # is the private-field syntax. Forgetting it makes the member public.

JavaScript vs TypeScript visibility
JavaScript has:

public by default
private with #
It does not have the full Java-style access modifier system. TypeScript adds more familiar typing and visibility features on top.

Key takeaway: In JavaScript, choose object literals for simple one-offs, constructor functions for reusable templates, and class syntax when you need cleaner structure, inheritance, and private state.

Encapsulation
Encapsulation means bundling data and methods together while controlling access to internal state.

Think of a capsule: you take it as one unit and do not need to inspect its ingredients.

The class owns the internal data, and outside code interacts with it through controlled methods.

Why it matters
Encapsulation helps with:

data integrity
security
maintainability
flexibility
If outside code can change fields directly, bugs become easy to introduce. If the class controls updates, it can validate input before changing anything.

Getter/setter pattern
To expose state safely:

use getter methods to read values
use setter methods to update values
That way you can enforce:

permission checks
validation
type constraints
business rules
Key insight: Encapsulation is not just “making fields private.” It is about controlling how state changes.

Access modifiers reference point
The class-level visibility idea was compared with Java:

private
public
protected
default / package-private
In Java:

protected is accessible in subclasses and the same class/package context
default is package-limited
JavaScript is more limited:

no native protected
public by default
private via #
Private methods too
Not just attributes, but methods can also be private in JavaScript with #. Private helpers are useful for hiding implementation details and keeping the public API clean.

Testing private members
Private methods are usually not tested directly from the outside. You test the public methods that use them.

Key insight: Test the public interface; private members are implementation details.

Key takeaway: Encapsulation protects internal state and behavior, and lets the class enforce rules before anything changes.

Inheritance
Inheritance means a child class derives from a parent class and reuses its properties and behavior.

Inheritance gives you code reuse and a type hierarchy.

Why it matters
Instead of repeating shared behavior in every class, you move it into a base class and let child classes extend it.

Example hierarchy:

Vehicle
WheeledVehicle
TwoWheelVehicle
FourWheelVehicle
This lets you put shared behavior at the top and specialized behavior lower down.

extends and super
In JavaScript, inheritance is written with extends.

class Dog extends Animal {
  constructor(name, sound, type) {
    super(name, sound);
    this.type = type;
  }
}
If a subclass defines a constructor, it must call super() before using this.

Key insight: super() initializes the parent part of the object; this cannot be used before that.

Using inherited methods
If a child method wants to add to the parent behavior, use super.methodName():

class Human extends Mammal {
  speak() {
    super.speak();
    console.log("something else");
  }
}
Do not call this.speak() inside speak() unless you want recursion.

Watch out: this.speak() inside speak() calls the same method again and can loop forever.

Inheritance types mentioned
Single inheritance
Hierarchical inheritance
Multi-level inheritance
JavaScript does not support:

multiple inheritance
full classical hybrid inheritance
TypeScript has interfaces, which help express contracts, but JavaScript does not have built-in interfaces.

Example: Animal, Mammal, Human
The inheritance chain was used to show:

a base class with shared state and behavior
subclasses adding their own fields
super resolving up the chain
A useful rule from the discussion:

Key insight: Do not try to bypass the normal parent-child chain; use the immediate inherited path.

Private methods and inheritance
Private methods are local to the class that defines them. A child class cannot see or override them in the usual sense. If a child defines a method with the same name, it is not overriding the parent’s private method — it is a separate private method.

Key takeaway: Inheritance is for shared behavior across related classes, but it must be used carefully with super() and the correct method-resolution path.

Abstraction
Abstraction means exposing only the essential behavior and hiding the internal implementation.

A classic example used was a library:

the user asks for a book
the user does not care how the book is found
the user only cares that the book gets issued
Key insight: Abstraction hides complexity and presents a clean service.

Abstraction vs encapsulation
Encapsulation protects internal data and implementation at the class level
Abstraction presents a simplified interface or service to the user
Encapsulation helps achieve abstraction, but abstraction is broader.

How abstraction is implemented
Abstraction is typically achieved with:

inheritance
abstract classes
interfaces
TypeScript abstract classes
JavaScript does not natively support abstract classes, so the abstraction example moved to TypeScript.

abstract class Vehicle {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }

  abstract start(): void;

  stop(): void {
    console.log("Stopping");
  }
}
A child class must implement the abstract method:

class Car extends Vehicle {
  start(): void {
    console.log("Starting with petrol engine");
  }
}
If it does not, TypeScript reports an error.

Abstract classes and instantiation
An abstract class:

cannot be instantiated directly
acts as a blueprint
can contain both concrete and abstract methods
An abstract method has no implementation in the abstract class. Subclasses must provide one unless they are also abstract.

Key insight: Abstract methods define the contract; concrete classes provide the implementation.

TypeScript compilation flow
Write .ts
tsc compiles to JavaScript
JavaScript runs in Node/runtime
Key takeaway: Abstraction is about clean public behavior and hidden internals, often enforced with abstract classes or interfaces in TypeScript.

Quick reference
LLD flow
Business need → PRD/BRD → HLD → LLD → implementation
HLD vs LLD
HLD: architecture, components, data flow
LLD: classes, methods, fields, interactions, validations
JavaScript object creation
Object literal: quick one-off object
Constructor function: reusable template with new
Class syntax: cleaner syntax, inheritance, # private fields
Encapsulation
Bundle data + methods
Hide internal state
Use getters/setters for controlled access
Private fields in JS use #
Inheritance
Use extends
Call super() before this
Use super.method() to call parent behavior
JavaScript supports single / hierarchical / multi-level inheritance, not multiple inheritance
Abstraction
Show only essential behavior
Hide internal details
Common tools: inheritance, abstract classes, interfaces
TypeScript supports abstract classes; JavaScript does not natively
OOP pillars
Encapsulation
Inheritance
Polymorphism
Abstraction
Important warnings
Watch out: this.method() inside the same method can recurse forever
Watch out: this in a subclass constructor cannot be used before super()
Watch out: forgetting # makes a field public in JavaScript
Watch out: private methods are not meaningfully overridden the way public/protected methods are