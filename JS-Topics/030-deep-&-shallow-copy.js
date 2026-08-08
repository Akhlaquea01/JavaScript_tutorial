/*******************************************************
 * TOPIC: DEEP COPY vs SHALLOW COPY
 *
 * Copying an object can mean two very different things:
 * a SHALLOW copy duplicates only the top level, while
 * nested objects/arrays stay SHARED with the original. A
 * DEEP copy duplicates everything, all the way down, so
 * the two are completely independent.
 *
 * Covers:
 *  1. Shallow copy — Object.assign / spread
 *  2. Why shallow copy still shares nested data
 *  3. Deep copy — the old JSON.parse/stringify trick
 *  4. structuredClone — the modern, built-in deep clone
 *  5. Choosing the right one
 *******************************************************/


/********************************************************
 * 1️⃣ SHALLOW COPY — Object.assign / spread
 *
 * Both create a NEW top-level object, copying each
 * property's VALUE across. For primitives (numbers,
 * strings) that's a true, independent copy. For anything
 * that's itself an object/array, only the REFERENCE gets
 * copied — both objects end up pointing at the same nested data.
 ********************************************************/

let originalObj = {
    name: "John",
    age: 30,
    hobbies: ["reading", "cooking"]
};

let shallowCopyObj = Object.assign({}, originalObj); // equivalent: { ...originalObj }

console.log(originalObj);    // { name: "John", age: 30, hobbies: ["reading", "cooking"] }
console.log(shallowCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }


/********************************************************
 * 2️⃣ WHY SHALLOW COPY STILL SHARES NESTED DATA
 *
 * `age` is a primitive — reassigning it on one object
 * never affects the other. But `hobbies` is an array —
 * both objects hold a reference to the SAME array, so
 * mutating it through either one is visible on both.
 ********************************************************/

originalObj.age = 35;                 // primitive reassignment — independent, only affects originalObj
originalObj.hobbies.push("gardening"); // mutating the SHARED array

console.log(originalObj);    // { name: "John", age: 35, hobbies: ["reading", "cooking", "gardening"] }
console.log(shallowCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking", "gardening"] }
// ^ shallowCopyObj.age is untouched, but its hobbies array picked up "gardening" too — same array, both places.


/********************************************************
 * 3️⃣ DEEP COPY — THE OLD JSON.parse/stringify TRICK
 *
 * Serializing to a JSON string and parsing it back builds
 * an entirely new structure, all the way down — no shared
 * references anywhere. It works, but has real limitations
 * (see 031-JSON.js §2 for what stringify silently drops):
 * functions, undefined, Symbols, and Dates (become strings)
 * are all lost or mangled, and circular references throw.
 ********************************************************/

let originalObj2 = {
    name: "John",
    age: 30,
    hobbies: ["reading", "cooking"]
};

let deepCopyObj = JSON.parse(JSON.stringify(originalObj2));

originalObj2.age = 35;
originalObj2.hobbies.push("gardening");

console.log(originalObj2); // { name: "John", age: 35, hobbies: ["reading", "cooking", "gardening"] }
console.log(deepCopyObj);  // { name: "John", age: 30, hobbies: ["reading", "cooking"] } — completely independent


/********************************************************
 * 4️⃣ structuredClone — THE MODERN, BUILT-IN DEEP CLONE
 *
 * A global function (no import needed, available in modern
 * browsers and Node 17+) that deep-clones a value properly:
 * it correctly handles Dates, Maps, Sets, typed arrays, AND
 * circular references — everything JSON.parse/stringify gets
 * wrong. It still can't clone functions or DOM nodes (throws
 * a DataCloneError for those, rather than silently dropping them).
 ********************************************************/

const withDateAndMap = {
    createdAt: new Date(),
    tags: new Set(['a', 'b']),
    meta: new Map([['key', 'value']])
};

const cloned = structuredClone(withDateAndMap);

console.log(cloned.createdAt instanceof Date); // true  — JSON.stringify would have turned this into a string
console.log(cloned.tags instanceof Set);       // true  — JSON.stringify would have turned this into {}
console.log(cloned.tags === withDateAndMap.tags); // false — genuinely independent copy

// Circular references: JSON.stringify throws on these, structuredClone handles them fine.
const circular = { name: 'self-referencing' };
circular.self = circular;
const clonedCircular = structuredClone(circular); // no error
console.log(clonedCircular.self === clonedCircular); // true — the clone's own circular link is preserved correctly


/********************************************************
 * 5️⃣ CHOOSING THE RIGHT ONE
 *
 *                    | Shallow copy      | JSON trick        | structuredClone
 * ------------------ | ----------------- | ------------------ | ----------------
 * Nested objects      | shared reference  | independent        | independent
 * Functions            | shared reference  | silently dropped    | throws (can't clone)
 * Dates/Map/Set         | shared reference  | mangled/dropped     | preserved correctly
 * Circular references   | shared reference  | throws              | handled correctly
 * Availability           | everywhere        | everywhere           | modern runtimes only
 ********************************************************/


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Shallow copy only protects the TOP LEVEL — nested
 *   objects/arrays remain shared unless copied separately.
 * ✔ JSON.parse(JSON.stringify(x)) is a common quick deep
 *   clone, but silently loses functions/undefined/Symbols
 *   and turns Dates into strings.
 * ✔ structuredClone is the modern, correct default for
 *   deep cloning — reach for it first in any environment
 *   that supports it.
 * ✔ None of these can clone functions — if an object holds
 *   methods you need preserved, you need a custom deep-copy
 *   function or a class-based approach instead.
 *
 * KEY: "deep" vs "shallow" is really about how far the
 * copy follows references — shallow stops at the first
 * level, deep follows every nested reference down.
 ********************************************************/
