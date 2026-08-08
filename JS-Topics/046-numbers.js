/*******************************************************
 * TOPIC: NUMBERS — CONVERSION, PRECISION & BigInt
 *
 * JS has only ONE numeric type for regular numbers
 * (double-precision floating point) — no separate int/float
 * types. That single choice explains almost every "weird"
 * number behavior in the language, including why BigInt
 * exists as a second, separate numeric type.
 *
 * Covers:
 *  1. Numeric conversion rules
 *  2. Floating-point imprecision
 *  3. Parsing strings to numbers
 *  4. NaN / finite / integer checks
 *  5. Math & rounding
 *  6. BigInt — exact integers beyond safe range
 *  7. Intl.NumberFormat — locale-aware formatting
 *******************************************************/


/********************************************************
 * 1️⃣ NUMERIC CONVERSION RULES
 *
 * Value      | Becomes
 * ---------- | -------
 * undefined  | NaN
 * null       | 0
 * true/false | 1 / 0
 * string     | trimmed, then parsed; empty string -> 0; unparsable -> NaN
 ********************************************************/

console.log(Number(undefined)); // NaN
console.log(Number(null));      // 0
console.log(Number(true));      // 1
console.log(Number(' 23 '));    // 23 — whitespace trimmed first
console.log(Number('23px'));    // NaN — not fully parsable, unlike parseInt (see §3)


/********************************************************
 * 2️⃣ FLOATING-POINT IMPRECISION
 *
 * JS numbers follow IEEE 754 double-precision, the same
 * standard most languages use — some decimal fractions
 * simply cannot be represented exactly in binary, so tiny
 * rounding errors appear in arithmetic.
 ********************************************************/

console.log(23 === 23.0);        // true — no separate int/float types, so these ARE the same value
console.log(0.1 + 0.2);          // 0.30000000000000004 — classic float imprecision
console.log(0.1 + 0.2 === 0.3);  // false — never compare floats with === after arithmetic; use a tolerance instead
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true — the correct way to compare


/********************************************************
 * 3️⃣ PARSING STRINGS TO NUMBERS
 ********************************************************/

console.log(Number('23'));  // 23
console.log(+'23');         // 23 — unary plus, same conversion as Number()

console.log(Number.parseInt('30px', 10));  // 30   — parseInt reads as much as it CAN, then stops
console.log(Number.parseInt('e23', 10));   // NaN  — can't start parsing from a letter
console.log(Number.parseInt('  2.5rem  ')); // 2   — parseInt stops at the decimal point
console.log(Number.parseFloat('  2.5rem  ')); // 2.5 — parseFloat keeps going through the decimal


/********************************************************
 * 4️⃣ NaN / FINITE / INTEGER CHECKS
 ********************************************************/

console.log(Number.isNaN(20));      // false
console.log(Number.isNaN(+'20X'));  // true — +'20X' evaluates to NaN first
console.log(Number.isFinite(20));   // true
console.log(Number.isFinite(23 / 0)); // false — Infinity is not finite
console.log(Number.isInteger(23));   // true
console.log(Number.isInteger(23.0)); // true — no separate float type, 23.0 IS an integer value


/********************************************************
 * 5️⃣ MATH & ROUNDING
 ********************************************************/

console.log(Math.sqrt(25));               // 5
console.log(Math.max(5, 18, 23, 11, 2));  // 23
console.log(Math.min(5, 18, 23, 11, 2));  // 2
console.log(Math.trunc(Math.random() * 6) + 1); // random integer 1-6
console.log(Math.round(23.3));  // 23
console.log(Math.ceil(23.3));   // 24
console.log(Math.floor(23.9));  // 23
console.log((2.345).toFixed(2)); // "2.35" — returns a STRING, not a number
console.log(5 % 2); // 1 — modulo

const diameter = 287_460_000_000; // numeric separators (ES2021) — purely visual, ignored by the parser
console.log(diameter); // 287460000000


/********************************************************
 * 6️⃣ BigInt — EXACT INTEGERS BEYOND THE SAFE RANGE
 *
 * Regular numbers can only represent integers EXACTLY up
 * to Number.MAX_SAFE_INTEGER (2^53 - 1) — beyond that,
 * precision silently degrades. BigInt is a SEPARATE
 * numeric type (note `typeof` says "bigint", not "number")
 * that represents arbitrarily large integers exactly,
 * created with an `n` suffix or the BigInt() function.
 ********************************************************/

console.log(Number.MAX_SAFE_INTEGER);     // 9007199254740991
console.log(2 ** 53 - 1);                 // 9007199254740991 — still exact, right at the edge
console.log(2 ** 53 + 1);                 // 9007199254740992 — WRONG! precision already lost (should be ...993)

console.log(9007199254740991n + 2n);      // 9007199254740993n — BigInt keeps it exact, past the safe range
console.log(typeof 20n);                  // "bigint" — a genuinely different type from "number"

// BigInt arithmetic:
console.log(10000n + 10000n); // 20000n
console.log(11n / 3n);        // 3n — integer division; BigInt has no fractional part, ever

// The BIG restriction: BigInt and Number can NEVER be mixed directly
try {
    console.log(1n + 1); // TypeError: Cannot mix BigInt and other types
} catch (err) {
    console.log(err.message);
}
console.log(1n + BigInt(1)); // 2n — must explicitly convert one side to match the other

// Comparisons (not arithmetic) ARE allowed to mix the two types:
console.log(1n === 1);  // false — different types, strict equality fails
console.log(1n == 1);   // true  — loose equality DOES coerce across the two (see 003-equality_and_coercion.js)
console.log(1n < 2);    // true  — relational operators work across types


/********************************************************
 * 7️⃣ Intl.NumberFormat — LOCALE-AWARE FORMATTING
 *
 * Formats a number according to a locale's conventions
 * (thousands separators, decimal marks, currency symbols)
 * without hand-rolling string manipulation.
 ********************************************************/

const num = 3884764.23;
console.log(new Intl.NumberFormat('de-DE').format(num)); // "3.884.764,23" — German uses . and , the OPPOSITE way US does
console.log(new Intl.NumberFormat('en-US').format(num)); // "3,884,764.23"
console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)); // "$3,884,764.23"


/********************************************************
 * 8️⃣ NUMBER CONSTANTS
 ********************************************************/

console.log(Number.MAX_VALUE);          // largest representable number at all (not necessarily "safe"/exact)
console.log(Number.MIN_VALUE);          // smallest positive number greater than 0
console.log(Number.POSITIVE_INFINITY);  // Infinity
console.log(Number.NEGATIVE_INFINITY);  // -Infinity
console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991 — largest integer still exactly representable
console.log(Number.MIN_SAFE_INTEGER);   // -9007199254740991


/********************************************************
 * 9️⃣ INTERVIEW NOTES
 *
 * ✔ There is only ONE regular numeric type in JS — no
 *   separate int/float — which is why 0.1 + 0.2 !== 0.3.
 * ✔ BigInt and Number cannot be mixed in ARITHMETIC (throws),
 *   but CAN be compared with ==, <, > (no throw).
 * ✔ Use BigInt only when you genuinely need integers beyond
 *   Number.MAX_SAFE_INTEGER exactly — e.g. IDs from a system
 *   that uses 64-bit integers, precise financial ledgers.
 * ✔ .toFixed() returns a STRING — a common source of bugs
 *   when the result is used in further arithmetic unchanged.
 *
 * KEY: JS numbers trade exactness for a single simple type —
 * BigInt exists specifically to opt back into exactness for
 * large integers, at the cost of losing decimals and free
 * mixing with regular numbers.
 ********************************************************/
