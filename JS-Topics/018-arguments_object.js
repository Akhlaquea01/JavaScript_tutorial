/*******************************************************
 * TOPIC: THE `arguments` OBJECT
 *
 * Inside any regular (non-arrow) function, `arguments` is
 * an automatically-available, array-LIKE object holding
 * every argument the function was actually called with —
 * regardless of how many parameters were declared. Mostly
 * superseded by rest parameters in modern code, but still
 * common in older code and worth understanding fully.
 *
 * Covers:
 *  1. arguments exists automatically, no declaration needed
 *  2. It's array-LIKE, not a real array
 *  3. Converting it to a real array
 *  4. arguments captures ALL calls, even beyond declared params
 *  5. Arrow functions have NO arguments object of their own
 *  6. Rest parameters — the modern replacement
 *******************************************************/


/********************************************************
 * 1️⃣ ARGUMENTS EXISTS AUTOMATICALLY
 ********************************************************/

function showArgs(a, b) {
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 } — every argument passed, not just a/b
}

showArgs(1, 2, 3);


/********************************************************
 * 2️⃣ ARRAY-LIKE, NOT A REAL ARRAY
 *
 * `arguments` has a `.length` and numeric indices, but it
 * does NOT have array methods like .map/.filter/.forEach —
 * calling those on it directly throws.
 ********************************************************/

function tryArrayMethod() {
    console.log(arguments.length); // works — array-like objects DO have .length
    console.log(arguments[0]);     // works — indexing works too
    try {
        arguments.map(x => x * 2); // TypeError: arguments.map is not a function
    } catch (err) {
        console.log(err.message);
    }
}

tryArrayMethod(10, 20);


/********************************************************
 * 3️⃣ CONVERTING TO A REAL ARRAY
 *
 * Two common ways — both produce a genuine Array with
 * full access to every array method.
 ********************************************************/

function sumAll() {
    const asArray1 = Array.from(arguments);      // modern, readable
    const asArray2 = [...arguments];             // spread syntax, equally common
    return asArray1.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10 — only possible once it's a real array with .reduce


/********************************************************
 * 4️⃣ arguments CAPTURES EVERY CALL, NOT JUST DECLARED PARAMS
 *
 * Declared parameters (a, b) are really just convenient
 * names for the first few slots — `arguments` always
 * reflects the FULL call, no matter how many parameters
 * were written in the function signature.
 ********************************************************/

function addTwo(a, b) {
    console.log(a, b);              // 1 2 — only the first two, matched to named params
    console.log(arguments.length);  // 5   — but ALL 5 arguments were actually passed
}

addTwo(1, 2, 3, 4, 5);


/********************************************************
 * 5️⃣ ARROW FUNCTIONS HAVE NO arguments OF THEIR OWN
 *
 * Just like `this` (see 016-this_binding.js), an arrow
 * function has no `arguments` binding of its own — using
 * the name inside one looks it up in the ENCLOSING
 * (non-arrow) function's scope instead.
 ********************************************************/

function outer() {
    const inner = () => {
        console.log(arguments); // refers to OUTER's arguments, not inner's own (arrow has none)
    };
    inner('ignored', 'these', 'args'); // inner's own call args are NOT what gets logged
}

outer('a', 'b'); // logs outer's arguments: [Arguments] { '0': 'a', '1': 'b' }

// A bare arrow function at the top level (no enclosing regular function) would throw
// ReferenceError: arguments is not defined — there's nowhere for it to look up to.


/********************************************************
 * 6️⃣ REST PARAMETERS — THE MODERN REPLACEMENT
 *
 * Rest params (`...args`, see 020-spread_rest.js) give you
 * a REAL array directly, work in arrow functions, and only
 * collect the "extra" args after any named ones — strictly
 * better than `arguments` for new code.
 ********************************************************/

function sumAllModern(...args) {
    return args.reduce((total, n) => total + n, 0); // `args` is already a real array — no conversion needed
}

console.log(sumAllModern(1, 2, 3, 4)); // 10

const sumArrow = (...args) => args.reduce((total, n) => total + n, 0);
console.log(sumArrow(5, 5, 5)); // 15 — works fine in an arrow function, unlike `arguments`


/********************************************************
 * 7️⃣ INTERVIEW NOTES
 *
 * ✔ `arguments` is array-LIKE — convert with Array.from()
 *   or [...arguments] before using array methods.
 * ✔ It reflects the actual call, independent of how many
 *   parameters were declared.
 * ✔ Arrow functions don't have their own — the name
 *   resolves via the scope chain to an enclosing function's.
 * ✔ Prefer rest parameters in all new code — real array,
 *   works everywhere, and self-documents which params are "extra".
 *
 * KEY: `arguments` is a legacy mechanism for reading all
 * call-time arguments — rest parameters do the same job
 * better in every way except backward compatibility.
 ********************************************************/
