/*******************************************************
 * TOPIC: EQUALITY, TYPE COERCION & TRUTHY/FALSY
 *
 * JS has two equality operators that behave very
 * differently, plus a small, fixed list of values that
 * count as "false" in a boolean context. Knowing these
 * exactly removes an entire category of "why is this
 * true/false" confusion.
 *
 * Covers:
 *  1. === strict equality — no coercion, ever
 *  2. == loose equality — coerces, with real rules
 *  3. The 8 falsy values (memorize this list)
 *  4. NaN — the value that's never equal to itself
 *  5. Infinity arithmetic edge cases
 *******************************************************/


/********************************************************
 * 1️⃣ === STRICT EQUALITY — NO COERCION
 *
 * Compares type AND value. If the types differ, the
 * result is immediately false — no conversion happens.
 ********************************************************/

console.log(5 === 5);     // true  — same type, same value
console.log(5 === '5');   // false — different types (number vs string), no coercion attempted
console.log(null === undefined); // false — different types


/********************************************************
 * 2️⃣ == LOOSE EQUALITY — COERCES FIRST
 *
 * If the types differ, JS converts one or both sides to a
 * common type BEFORE comparing. The rules aren't random —
 * but they're easy to misremember, which is why === is
 * almost always the safer default.
 ********************************************************/

console.log(5 == '5');      // true  — string '5' is coerced to number 5, then compared
console.log(0 == false);    // true  — false is coerced to number 0
console.log('' == false);   // true  — both sides coerce to 0
console.log(null == undefined); // true  — special case: these two only equal each other, nothing else
console.log(null == 0);     // false — null does NOT coerce to 0 for ==, despite the rule above

// The classic warning example — why == is dangerous with arrays/objects:
console.log([] == false);       // true  — [] -> '' -> 0, false -> 0
console.log([] == ![]);         // true  — ![] is false first, then same coercion as above


/********************************************************
 * 3️⃣ THE 8 FALSY VALUES — THE ENTIRE LIST
 *
 * Everything else in JS is truthy, including "" with
 * spaces, [], {}, and every function. Objects and arrays
 * are ALWAYS truthy, even when empty — this trips people
 * up constantly.
 ********************************************************/

const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];
falsyValues.forEach(v => console.log(v, '->', Boolean(v))); // every line prints false

// Commonly mistaken as falsy, but actually truthy:
console.log(Boolean([]));      // true — empty array is still an object, objects are always truthy
console.log(Boolean({}));      // true — same reasoning
console.log(Boolean('0'));     // true — non-empty STRING, even though it "looks like" zero
console.log(Boolean(' '));     // true — a space is a non-empty string


/********************************************************
 * 4️⃣ NaN — NEVER EQUAL TO ITSELF
 *
 * NaN is the ONLY value in JS where `x === x` is false.
 * This is required by the IEEE 754 floating-point spec —
 * NaN represents "not a number", and two "not a number"
 * results are never considered the same computation.
 ********************************************************/

console.log(NaN === NaN);        // false — the classic gotcha
console.log(Number.isNaN(NaN));  // true  — the correct way to check for NaN
console.log(isNaN('hello'));     // true  — but the GLOBAL isNaN() coerces its argument first (risky)
console.log(Number.isNaN('hello')); // false — Number.isNaN does NOT coerce, so a string is never NaN to it


/********************************************************
 * 5️⃣ Infinity ARITHMETIC
 *
 * Infinity behaves like a real (if unusual) number in
 * arithmetic, with a few special results worth knowing.
 ********************************************************/

console.log(1 / 0);          // Infinity  — division by zero doesn't throw in JS
console.log(-1 / 0);         // -Infinity
console.log(Infinity + 1);   // Infinity  — still infinity
console.log(Infinity - Infinity); // NaN — an undefined operation, correctly yields NaN
console.log(Infinity > Number.MAX_SAFE_INTEGER); // true


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Default to === / !== always; reach for == only for the
 *   deliberate `x == null` idiom (catches both null AND undefined).
 * ✔ Memorize the 8 falsy values — everything else, including
 *   [] and {}, is truthy.
 * ✔ Use Number.isNaN(), never the global isNaN() — the global
 *   version coerces its argument first and gives false positives.
 * ✔ NaN !== NaN is not a bug, it's the IEEE 754 spec — plan
 *   for it when checking computed results.
 *
 * KEY: === asks "are these the same type AND value?" with
 * zero conversion. == asks "can these be made equal after
 * converting?" — memorizing every == rule is less useful
 * than just avoiding it.
 ********************************************************/
