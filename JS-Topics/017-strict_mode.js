/*******************************************************
 * TOPIC: STRICT MODE
 *
 * `'use strict'` opts a script (or function) into a
 * stricter variant of JS that turns several silent
 * mistakes into thrown errors, and disables a few
 * confusing legacy features. ES6 classes and ES modules
 * are ALWAYS strict, whether you write the pragma or not.
 *
 * Covers:
 *  1. How to enable it
 *  2. Silent failures that become real errors
 *  3. `this` in plain function calls
 *  4. Other footguns it removes
 *  5. Where it's implicitly already on
 *******************************************************/


/********************************************************
 * 1️⃣ HOW TO ENABLE IT
 *
 * Put the exact string 'use strict' as the very first
 * statement of a file (whole-script) or a function body
 * (function-only). It has to be first — JS engines only
 * recognize it in that position.
 ********************************************************/

'use strict';
// Everything below in this file now runs in strict mode.


/********************************************************
 * 2️⃣ SILENT FAILURES BECOME REAL ERRORS
 *
 * Sloppy mode often fails silently, letting bugs slip
 * through. Strict mode throws instead.
 ********************************************************/

// (a) Assigning to an undeclared variable
try {
    undeclaredVar = 5; // ReferenceError in strict mode
    // In sloppy mode this would silently create a global variable — a classic bug source.
} catch (err) {
    console.log(err.message);
}

// (b) Writing to a read-only/frozen property
const frozenObj = Object.freeze({ value: 1 });
try {
    frozenObj.value = 2; // TypeError in strict mode
    // In sloppy mode this fails SILENTLY — frozenObj.value just stays 1, with no warning at all.
} catch (err) {
    console.log(err.message);
}

// (c) Duplicate parameter names
try {
    // eslint-disable-next-line no-eval
    eval('"use strict"; function bad(a, a) { return a; }'); // SyntaxError in strict mode
} catch (err) {
    console.log(err.message);
}


/********************************************************
 * 3️⃣ `this` IN PLAIN FUNCTION CALLS
 *
 * See 016-this_binding.js for the full rules — the
 * strict-mode-specific part is this one difference:
 ********************************************************/

function whoAmI() {
    console.log(this);
}
whoAmI();
// Strict mode:  undefined
// Sloppy mode:  the global object (window/globalThis) — a frequent source of accidental globals


/********************************************************
 * 4️⃣ OTHER FOOTGUNS STRICT MODE REMOVES
 *
 * - `with` statements are banned entirely (SyntaxError) —
 *   they made scope lookup ambiguous.
 * - `delete` on a plain variable/function name throws,
 *   instead of silently doing nothing.
 * - Octal literals like `010` are banned — sloppy mode
 *   silently reinterpreted these, a classic source of
 *   numeric bugs.
 ********************************************************/


/********************************************************
 * 5️⃣ WHERE STRICT MODE IS ALREADY ON, IMPLICITLY
 *
 * You don't need to write the pragma at all in:
 *  - ES modules (any file using import/export)
 *  - The body of ES6 classes
 * These are strict by default, no opt-in required.
 ********************************************************/

class AlwaysStrict {
    method() {
        // this class body is strict mode even without 'use strict' anywhere
        console.log(this);
    }
}


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Strict mode's whole purpose: turn silent, hard-to-debug
 *   mistakes into loud, immediate errors.
 * ✔ Assigning to an undeclared variable is probably the
 *   single most valuable thing it catches.
 * ✔ Classes and ES modules are strict automatically —
 *   most modern code is already strict without you doing anything.
 * ✔ It must be the literal first statement to take effect —
 *   putting it after other code does nothing.
 *
 * KEY: strict mode doesn't add features — it REMOVES
 * ambiguity and silent failure, making bugs surface
 * immediately instead of causing confusing behavior later.
 ********************************************************/
