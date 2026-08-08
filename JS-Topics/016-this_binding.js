/*******************************************************
 * TOPIC: `this` BINDING RULES
 *
 * Unlike most variables, `this` is NOT determined by
 * lexical scope — it's determined by HOW a function is
 * CALLED (the "call site"), with one big exception: arrow
 * functions. There are exactly a handful of rules; once you
 * know them, `this` stops being mysterious.
 *
 * Covers:
 *  1. Default binding — plain function call
 *  2. Implicit binding — method call (obj.fn())
 *  3. Explicit binding — call/apply/bind
 *  4. new binding — constructor calls
 *  5. Arrow functions — lexical `this` (no binding of their own)
 *  6. Priority order when rules overlap
 *******************************************************/


/********************************************************
 * 1️⃣ DEFAULT BINDING — plain function call
 *
 * Call a function with no object in front of it, and `this`
 * is `undefined` in strict mode (or the global object in
 * non-strict "sloppy" mode).
 ********************************************************/

'use strict';

function whoAmI() {
    console.log(this);
}
whoAmI(); // undefined — strict mode, no object owns this call


/********************************************************
 * 2️⃣ IMPLICIT BINDING — method call
 *
 * When a function is called AS A PROPERTY of an object
 * (`obj.method()`), `this` inside it is that object —
 * whichever object appeared immediately before the dot.
 ********************************************************/

const user = {
    name: 'Akhlaque',
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

user.greet(); // "Hi, I'm Akhlaque" — this = user, because user.greet() was the call

const greetFn = user.greet;
// greetFn();  // "Hi, I'm undefined" — called with NO object in front now, default binding applies!
// Losing implicit binding like this is one of the most common `this` bugs.


/********************************************************
 * 3️⃣ EXPLICIT BINDING — call / apply / bind
 *
 * You can force `this` to be whatever you want, regardless
 * of how the function is normally called (full details in
 * 021-call-apply-&-bind.js).
 ********************************************************/

function introduce() {
    console.log(`I am ${this.name}`);
}

const person = { name: 'Sanchit' };
introduce.call(person);  // "I am Sanchit" — this forced to `person`
introduce.apply(person); // same, args passed differently
const bound = introduce.bind(person);
bound();                 // "I am Sanchit" — this permanently locked to `person`


/********************************************************
 * 4️⃣ new BINDING — constructor calls
 *
 * When a function is called with `new`, JS creates a brand
 * new object, and `this` inside the function refers to THAT
 * new object (which is then returned automatically).
 ********************************************************/

function Person(name) {
    this.name = name; // `this` = the new object being constructed
}

const p1 = new Person('Aman');
console.log(p1.name); // 'Aman'


/********************************************************
 * 5️⃣ ARROW FUNCTIONS — LEXICAL `this`
 *
 * Arrow functions do NOT have their own `this` at all.
 * They capture `this` from their ENCLOSING lexical scope,
 * exactly like a normal variable would (see 015-scope_chain.js)
 * — call/apply/bind cannot override it, and calling an arrow
 * function as a method doesn't give it the object either.
 ********************************************************/

const team = {
    name: 'Frontend',
    membersRegular: function () {
        setTimeout(function () {
            // plain function callback: `this` here is NOT `team` (default binding kicks in)
            console.log(this?.name); // undefined
        }, 0);
    },
    membersArrow: function () {
        setTimeout(() => {
            // arrow function: `this` is inherited from membersArrow's scope, where `this` IS team
            console.log(this.name); // 'Frontend'
        }, 0);
    }
};

team.membersRegular();
team.membersArrow();


/********************************************************
 * 6️⃣ PRIORITY ORDER WHEN RULES OVERLAP
 *
 * When more than one rule could apply, this is the order
 * JS actually uses (highest priority first):
 *
 *   1. new binding          — new Fn()
 *   2. Explicit binding     — fn.call/apply/bind()
 *   3. Implicit binding     — obj.fn()
 *   4. Default binding      — fn()
 *
 * Arrow functions opt OUT of this entire system — they
 * always use lexical `this`, no matter which of the above
 * would otherwise apply.
 ********************************************************/


/********************************************************
 * 7️⃣ INTERVIEW NOTES
 *
 * ✔ Ask "what's immediately to the left of the dot at the
 *   call site?" — that's implicit binding, the most common case.
 * ✔ Passing a method as a callback (setTimeout, event
 *   handlers, array callbacks) strips its implicit binding —
 *   use an arrow function or .bind() to preserve `this`.
 * ✔ Arrow functions are NEVER a good choice for object
 *   methods that need `this` to be the object — they'd
 *   capture the surrounding (often global) `this` instead.
 * ✔ Classic gotcha: destructuring a method off an object
 *   (`const { greet } = user`) loses implicit binding just
 *   like reassigning it to a variable does.
 *
 * KEY: `this` is resolved at CALL TIME based on the call
 * site — except arrow functions, which resolve it at
 * DEFINITION time, lexically, like any other variable.
 ********************************************************/
