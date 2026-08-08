/*******************************************************
 * TOPIC: var vs let vs const — SCOPING DIFFERENCES
 *
 * All three declare variables, but they differ in scope
 * boundary, redeclaration rules, and hoisting behavior
 * (see 014-hoisting.js for the hoisting half of this).
 * This file focuses on WHERE each one is visible and
 * what's legal to do with it.
 *
 * Covers:
 *  1. Function scope (var) vs block scope (let/const)
 *  2. Redeclaration rules
 *  3. Reassignment rules (const doesn't mean "immutable")
 *  4. Why let/const were introduced — the loop-variable bug
 *  5. Practical guidance
 *******************************************************/


/********************************************************
 * 1️⃣ FUNCTION SCOPE vs BLOCK SCOPE
 *
 * `var` only respects FUNCTION boundaries — it completely
 * ignores if/for/while/{} blocks. `let`/`const` respect
 * every block, including a bare { } with nothing else.
 ********************************************************/

function scopeDemo() {
    if (true) {
        var varVariable = 'var';
        let letVariable = 'let';
        const constVariable = 'const';
    }

    console.log(varVariable);   // 'var' — leaked out of the if-block, still visible here
    try {
        console.log(letVariable); // ReferenceError — letVariable doesn't exist outside the block
    } catch (err) {
        console.log(err.message);
    }
}

scopeDemo();


/********************************************************
 * 2️⃣ REDECLARATION RULES
 *
 * `var` allows redeclaring the same name in the same scope
 * without complaint — it just overwrites. `let`/`const`
 * throw a SyntaxError for a duplicate declaration in the
 * SAME scope (a different nested scope is fine — that's
 * shadowing, see 015-scope_chain.js).
 ********************************************************/

var count = 1;
var count = 2; // fine, just reassigns — no error
console.log(count); // 2

let total = 1;
try {
    eval('let total = 2;'); // SyntaxError: Identifier 'total' has already been declared
} catch (err) {
    console.log(err.message);
}


/********************************************************
 * 3️⃣ REASSIGNMENT RULES — const ≠ IMMUTABLE
 *
 * `const` only prevents reassigning the BINDING (the
 * variable name can't be pointed at a new value). It says
 * nothing about the value's own mutability — an object or
 * array held by `const` can still have its contents changed.
 ********************************************************/

const config = { debug: false };
config.debug = true;      // fine — mutating the object's contents, not reassigning `config` itself
console.log(config);      // { debug: true }

try {
    config = { debug: false }; // TypeError: Assignment to constant variable
} catch (err) {
    console.log(err.message);
}

// Use Object.freeze() (see 024-object.js) if you actually need the CONTENTS to be immutable too.


/********************************************************
 * 4️⃣ WHY let/const WERE INTRODUCED — THE LOOP BUG
 *
 * `var`'s function-scoping (combined with closures) used
 * to cause a famous bug: every callback in a loop shared
 * the SAME `var` binding, so they'd all see its FINAL value.
 * `let` creates a fresh binding for each loop iteration,
 * fixing this without any extra code.
 ********************************************************/

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var loop:', i), 0); // prints 3, 3, 3 — same shared `i` for all three
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let loop:', j), 0); // prints 0, 1, 2 — each iteration gets its own `j`
}


/********************************************************
 * 5️⃣ PRACTICAL GUIDANCE
 *
 * - Default to `const` — it documents "this binding never
 *   changes," which makes code easier to reason about.
 * - Use `let` only when you genuinely need to reassign
 *   (loop counters, accumulators, values reassigned in branches).
 * - Avoid `var` entirely in new code — its function-scoping
 *   and silent redeclaration are strictly worse than what
 *   let/const offer, with no upside.
 ********************************************************/


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ var = function-scoped, redeclarable, hoisted+initialized
 *   to undefined.
 * ✔ let/const = block-scoped, NOT redeclarable in the same
 *   scope, hoisted but stuck in the TDZ until their line runs.
 * ✔ const freezes the BINDING, not the VALUE — objects/arrays
 *   held by const are still mutable.
 * ✔ The var-in-a-loop-with-setTimeout question is one of
 *   the most common practical interview questions — know
 *   both why it happens and both ways to fix it (let, or an
 *   IIFE capturing the value per iteration).
 *
 * KEY: prefer const by default, let when reassignment is
 * required, and treat var as effectively deprecated.
 ********************************************************/
