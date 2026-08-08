/*******************************************************
 * TOPIC: THE PROTOTYPE CHAIN
 *
 * Every JS object has a hidden internal link to another
 * object — its "prototype". When you access a property
 * that doesn't exist on the object itself, JS automatically
 * looks it up the prototype chain until it finds it (or
 * reaches `null`, the end of the chain).
 *
 * Covers:
 *  1. Object.getPrototypeOf — inspecting the chain
 *  2. Where class methods actually live
 *  3. Property lookup walks the chain automatically
 *  4. Own property vs inherited property
 *  5. The chain always ends at Object.prototype → null
 *******************************************************/


/********************************************************
 * 1️⃣ EVERY OBJECT HAS A PROTOTYPE
 *
 * Object.getPrototypeOf(obj) returns the object one
 * level up the chain. Plain object literals inherit
 * from Object.prototype by default.
 ********************************************************/

const person5 = { name: 'Sanchit', gender: 'male', age: 26 };

console.log(Object.getPrototypeOf(person5) === Object.prototype); // true


/********************************************************
 * 2️⃣ CLASS METHODS LIVE ON THE PROTOTYPE, NOT THE INSTANCE
 *
 * When you write a method inside a class body, JS puts it
 * on ClassName.prototype ONCE — every instance shares that
 * single copy via the chain, instead of each instance
 * carrying its own duplicate function.
 ********************************************************/

class Person {
    constructor(name, age, gender) {
        this.name = name;   // own property — unique per instance
        this.age = age;
        this.gender = gender;
    }

    greet() { // lives on Person.prototype, shared by every instance
        console.log(`${this.name} says hello`);
    }
}

const person1 = new Person('Sanchit', 26, 'male');
const person2 = new Person('Aman', 30, 'male');

console.log(person1.greet === person2.greet); // true — same function reference, not a copy
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true — the chain link `new` sets up


/********************************************************
 * 3️⃣ PROPERTY LOOKUP WALKS THE CHAIN AUTOMATICALLY
 *
 * person1.greet() works even though `greet` is NOT an own
 * property of person1 — JS fails to find it on person1,
 * walks up to Person.prototype, and finds it there.
 ********************************************************/

person1.greet(); // "Sanchit says hello" — found on Person.prototype, not on person1 itself


/********************************************************
 * 4️⃣ OWN PROPERTY vs INHERITED PROPERTY
 *
 * hasOwnProperty() tells you whether a property lives
 * directly ON the object, or is only reachable through
 * the prototype chain.
 ********************************************************/

console.log(person1.hasOwnProperty('name'));  // true  — set in the constructor, own property
console.log(person1.hasOwnProperty('greet')); // false — inherited from Person.prototype
console.log('greet' in person1);              // true  — `in` checks the whole chain, not just own props


/********************************************************
 * 5️⃣ THE CHAIN ALWAYS ENDS AT Object.prototype → null
 *
 * Arrays and functions have their own prototypes in the
 * middle of the chain (Array.prototype, Function.prototype)
 * with extra built-in methods — but every chain eventually
 * reaches Object.prototype, and then null.
 ********************************************************/

const arr = [4, 2, 5, 6, 3, 4, 7];

const arrayProto = Object.getPrototypeOf(arr);          // Array.prototype (has .map, .filter, ...)
const objectProto = Object.getPrototypeOf(arrayProto);  // Object.prototype (has .toString, .hasOwnProperty, ...)
const endOfChain = Object.getPrototypeOf(objectProto);  // null — the chain terminates here

console.log(arrayProto === Array.prototype);   // true
console.log(objectProto === Object.prototype); // true
console.log(endOfChain);                       // null

// This is WHY array methods like .map/.filter work on any array:
// they're defined once on Array.prototype and found via the chain.


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Every object has exactly one prototype link (not
 *   multiple — JS inheritance is single-chain, not a tree).
 * ✔ Class syntax is sugar over this exact mechanism —
 *   methods go on ClassName.prototype automatically.
 * ✔ Property LOOKUP walks the chain; property ASSIGNMENT
 *   (obj.x = 1) always creates/updates an OWN property,
 *   it never writes through to the prototype.
 * ✔ The chain always terminates at `null` — that's how
 *   `for...in`/property lookup knows to stop.
 *
 * KEY: "Prototypal inheritance" = objects delegate to
 * other objects for properties/methods they don't have
 * themselves, via this chain of prototype links.
 ********************************************************/
