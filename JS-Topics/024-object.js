/*******************************************************
 * TOPIC: OBJECTS IN JAVASCRIPT
 *
 * An object is a collection of key-value pairs. Keys are
 * always strings (or Symbols); values can be anything —
 * including functions, which become "methods".
 *
 * Covers:
 *  1. Object literals & dot vs bracket access
 *  2. Dynamic property access (computed keys)
 *  3. Looping over objects (for...in vs Object.entries)
 *  4. Methods, shorthand syntax, and `this`
 *  5. Object.freeze — shallow immutability
 *******************************************************/


/********************************************************
 * 1️⃣ OBJECT LITERALS & DOT vs BRACKET ACCESS
 *
 * Dot notation needs a literal, known property name.
 * Bracket notation takes any expression that evaluates
 * to a string — that's the only way to build a key
 * dynamically at runtime.
 ********************************************************/

const person = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    age: new Date().getFullYear() - 1999,
    job: 'coder',
    friends: ['Aman', 'Firoz', 'Choti'],
    location: 'Portugal',
    twitter: '@iam_atts_'
};

console.log(person.firstName); // 'Akhlaque' — dot notation, key known ahead of time


/********************************************************
 * 2️⃣ DYNAMIC PROPERTY ACCESS
 *
 * Bracket notation evaluates its contents as an expression
 * first, THEN uses the result as the key. This is how you
 * read a property whose name you only know at runtime.
 ********************************************************/

const nameKey = 'Name';
console.log(person['first' + nameKey]); // 'Akhlaque' — same as person.firstName

const interestedIn = "firstName";
if (person[interestedIn]) {
    console.log(person[interestedIn]); // 'Akhlaque'
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

// A common real use: build a lookup table and index into it dynamically
const foodMap = {
    Burger: 200,
    pizza: 500,
    juice: 200
};

function getPrice(item) {
    return foodMap[item]; // `item` is a variable — bracket notation is required
}

console.log(getPrice("Burger")); // 200


/********************************************************
 * 3️⃣ LOOPING OVER OBJECTS
 *
 * `for...in` iterates over ENUMERABLE keys (including
 * inherited ones from the prototype chain, which is a
 * common source of bugs). `Object.keys/values/entries`
 * only return the object's OWN properties and are
 * usually the safer, more explicit choice.
 ********************************************************/

for (const key in person) {
    console.log(`${key}: ${person[key]}`); // own keys only here, since person has no custom prototype
}

// Object.entries() gives [key, value] pairs — pairs well with destructuring
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Object.keys() / Object.values() when you only need one side
console.log(Object.keys(person));   // ['firstName', 'lastName', 'age', ...]
console.log(Object.values(person)); // ['Akhlaque', 'Ahmad', 27, ...]


/********************************************************
 * 4️⃣ METHODS, SHORTHAND SYNTAX & `this`
 *
 * A function stored as a property is a "method". Inside
 * a method, `this` refers to the object the method was
 * CALLED on (see 016-this_binding.js for the full rules).
 * ES6 method shorthand (`calcAge() {}`) is equivalent to
 * `calcAge: function() {}`.
 ********************************************************/

const user = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    birthYear: 1999,
    job: 'coder',
    friends: ['Aman', 'Firoz', 'Varun'],
    hasDriversLicense: true,

    calcAge() { // shorthand method syntax
        this.age = new Date().getFullYear() - this.birthYear;
        return this.age;
    },

    getSummary: function () { // equivalent, longhand syntax
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    }
};

console.log(user.calcAge());    // e.g. 27 — also sets user.age as a side effect
console.log(user.age);          // same number, now cached on the object
console.log(user.getSummary()); // "Akhlaque is a 27-year old coder, and he has a driver's license."


/********************************************************
 * 5️⃣ Object.freeze — SHALLOW IMMUTABILITY
 *
 * Object.freeze() prevents adding/removing/reassigning
 * top-level properties. It is SHALLOW: nested objects/
 * arrays are still mutable unless you freeze them too —
 * which is exactly what this factory function does.
 ********************************************************/

function createPerson(name, age, favoriteFood, address, street, hobbies) {
    return Object.freeze({
        name,
        age,
        favoriteFood,
        address: Object.freeze(address),       // freeze nested object too
        street,
        hobbies: Object.freeze([...hobbies]),  // copy first, then freeze (don't freeze the caller's array)
    });
}

const immutablePerson = createPerson("Kyle", 25, "Rice", {}, "1234", ["Weight Lifting", "Bowling"]);

immutablePerson.name = "Someone Else"; // silently ignored (throws in strict mode)
console.log(immutablePerson.name);     // still "Kyle"
console.log(immutablePerson);


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Bracket notation is the only way to use a dynamic/
 *   computed key — dot notation requires a literal name.
 * ✔ for...in walks the prototype chain; Object.keys/
 *   values/entries only look at the object's own props.
 * ✔ Object.freeze is shallow — nested objects/arrays
 *   need to be frozen separately (or deep-frozen manually).
 * ✔ Regular functions used as methods get `this` bound
 *   to the caller; arrow functions do NOT (see 050).
 *
 * KEY: An object is a dynamic bag of key-value pairs —
 * how you read/write/iterate it depends on whether the
 * key is known ahead of time or only at runtime.
 ********************************************************/
