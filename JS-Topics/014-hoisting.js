/*******************************************************
 * TOPIC: HOISTING & THE TEMPORAL DEAD ZONE
 *
 * Before running any code, JS scans each scope and
 * registers `var`, `function`, `let`, and `const`
 * declarations ahead of time. This "setup pass" is
 * called hoisting — but what each keyword actually gets
 * hoisted TO is very different, and that difference is
 * the source of most hoisting bugs.
 *
 * Covers:
 *  1. var hoisting — declared AND initialized to undefined
 *  2. function declaration hoisting — the whole function
 *  3. let/const hoisting — declared but NOT initialized (TDZ)
 *  4. Function expressions are NOT hoisted like declarations
 *  5. Practical rule of thumb
 *******************************************************/


/********************************************************
 * 1️⃣ var HOISTING
 *
 * `var` declarations are hoisted to the top of their
 * function (not block) scope AND initialized to `undefined`
 * immediately — that's why reading one before its line
 * doesn't throw, it just gives `undefined`.
 ********************************************************/

console.log(name); // undefined — NOT a ReferenceError, because `var name` was already hoisted
var name = 'Akhlaque';
console.log(name); // 'Akhlaque'

// The above is equivalent to how the engine actually treats it:
// var name;              <- hoisted to the top, initialized to undefined
// console.log(name);     <- undefined
// name = 'Akhlaque';     <- assignment happens right where you wrote it
// console.log(name);     <- 'Akhlaque'


/********************************************************
 * 2️⃣ FUNCTION DECLARATIONS ARE FULLY HOISTED
 *
 * Unlike `var`, a function DECLARATION is hoisted with its
 * entire body — you can call it before the line it's
 * written on.
 ********************************************************/

sayHi(); // "Hi!" — works even though sayHi is called before its definition

function sayHi() {
    console.log('Hi!');
}


/********************************************************
 * 3️⃣ let/const — HOISTED BUT NOT INITIALIZED (TDZ)
 *
 * `let` and `const` ARE hoisted (the engine knows the
 * name exists in the scope), but they are NOT initialized
 * until their declaration line actually runs. The gap
 * between the top of the scope and that line is called
 * the "Temporal Dead Zone" — accessing the variable in
 * that window throws a ReferenceError.
 ********************************************************/

try {
    console.log(city); // ReferenceError: Cannot access 'city' before initialization
} catch (err) {
    console.log(err.message);
}
let city = 'Lisbon';
console.log(city); // 'Lisbon' — fine now, past the declaration line

// This is DIFFERENT from "city is undefined" — the TDZ actively
// forbids access, it doesn't just default to a value.


/********************************************************
 * 4️⃣ FUNCTION EXPRESSIONS FOLLOW THEIR VARIABLE'S RULES
 *
 * A function stored in a variable is hoisted like THAT
 * variable, not like a function declaration — the function
 * body itself is not available early.
 ********************************************************/

try {
    sayBye(); // TypeError: sayBye is not a function (var sayBye exists but is still `undefined` here)
} catch (err) {
    console.log(err.message);
}
var sayBye = function () {
    console.log('Bye!');
};

try {
    sayHello(); // ReferenceError — `const sayHello` is in its TDZ
} catch (err) {
    console.log(err.message);
}
const sayHello = () => console.log('Hello!');


/********************************************************
 * 5️⃣ PRACTICAL RULE OF THUMB
 *
 * You rarely need to reason about hoisting explicitly if
 * you follow one habit: declare everything before you use
 * it, top-to-bottom, and prefer let/const over var. The TDZ
 * is actually a SAFETY feature — it turns "used before
 * declared" bugs into an immediate, loud error instead of
 * a silent `undefined`.
 ********************************************************/


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ var: hoisted + initialized to undefined.
 * ✔ function declarations: hoisted with their full body.
 * ✔ let/const: hoisted but NOT initialized — TDZ throws
 *   if accessed before the declaration line.
 * ✔ function EXPRESSIONS (`var f = function(){}`,
 *   `const f = () => {}`) follow the hoisting rule of
 *   whatever keyword holds them, not the function-declaration rule.
 * ✔ Classic interview trap: predict the output of code
 *   mixing var/let and console.log calls before declarations.
 *
 * KEY: hoisting doesn't move your code — it's the engine
 * pre-registering names in a scope before execution starts.
 * WHAT gets pre-registered (and whether it's usable yet)
 * depends entirely on the keyword.
 ********************************************************/
