/*******************************************************
 * TOPIC: ES2024 (ECMAScript 2024) FEATURES
 *
 * Covers:
 *  1. `Promise.withResolvers()`
 *  2. `Object.groupBy()` & `Map.groupBy()`
 *  3. `String.isWellFormed()` and `toWellFormed()`
 *  4. Set Methods (union, intersection, difference, etc.)
 *  5. ArrayBuffer updates
 *******************************************************/

/********************************************************
 * 1️⃣ Promise.withResolvers()
 *
 * A clean way to create a promise AND extract its
 * `resolve` and `reject` functions to the outer scope.
 * Replaces the old "Deferred" pattern.
 ********************************************************/

// The Old Way:
/*
let oldResolve, oldReject;
const oldPromise = new Promise((resolve, reject) => {
    oldResolve = resolve;
    oldReject = reject;
});
*/

// ES2024 Way:
const { promise, resolve, reject } = Promise.withResolvers();

// You can now pass `resolve` or `reject` to other functions/events
setTimeout(() => resolve("Success!"), 1000);

promise.then(msg => console.log(msg)); // Prints "Success!" after 1s


/********************************************************
 * 2️⃣ DATA GROUPING (Object.groupBy & Map.groupBy)
 *
 * A native, built-in way to group array elements.
 * Replaces Lodash `_.groupBy`.
 ********************************************************/

const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 }
];

// --- Object.groupBy ---
// Groups items by the string/number returned by the callback
const resultObj = Object.groupBy(inventory, ({ type }) => type);

console.log(resultObj.vegetables); // [{ name: "asparagus", ... }]
console.log(resultObj.fruit);      // [{ name: "bananas", ... }, { name: "cherries", ... }]
console.log(resultObj.meat);       // [{ name: "goat", ... }, { name: "fish", ... }]

// --- Map.groupBy ---
// Groups items using a Map (useful when keys are Objects, not strings)
const lowStock = { status: "low" };
const highStock = { status: "high" };

const resultMap = Map.groupBy(inventory, ({ quantity }) => {
    return quantity < 10 ? lowStock : highStock;
});

// resultMap is a Map object where the keys are the `lowStock` and `highStock` object references
console.log(resultMap.get(lowStock).length);  // 3


/********************************************************
 * 3️⃣ STRING WELL-FORMEDNESS
 *
 * Checks/fixes strings containing lone surrogates (invalid Unicode).
 * Useful when dealing with emoji strings or binary data parsed as utf-16.
 ********************************************************/

const lonelySurrogate = "\uD800"; // Invalid Unicode sequence

console.log(lonelySurrogate.isWellFormed()); // false
console.log("normal string".isWellFormed()); // true

// toWellFormed() replaces invalid surrogates with U+FFFD ()
console.log(lonelySurrogate.toWellFormed()); // ""


/********************************************************
 * 4️⃣ NATIVE SET METHODS (Math Sets)
 *
 * Finally, JavaScript Sets have built-in math operations!
 * You no longer need to write manual loops or use libraries.
 ********************************************************/

const evens = new Set([2, 4, 6, 8]);
const primes = new Set([2, 3, 5, 7]);

// 1. Union: Elements in EITHER set
console.log(evens.union(primes));
// Set { 2, 4, 6, 8, 3, 5, 7 }

// 2. Intersection: Elements in BOTH sets
console.log(evens.intersection(primes));
// Set { 2 }

// 3. Difference: Elements in evens, but NOT in primes
console.log(evens.difference(primes));
// Set { 4, 6, 8 }

// 4. Symmetric Difference: Elements in ONE of the sets, but not both
console.log(evens.symmetricDifference(primes));
// Set { 4, 6, 8, 3, 5, 7 }

// 5. isSubsetOf: Are all evens in primes?
const multiplesFour = new Set([4, 8]);
console.log(multiplesFour.isSubsetOf(evens)); // true

// 6. isSupersetOf: Does evens contain all multiples of four?
console.log(evens.isSupersetOf(multiplesFour)); // true

// 7. isDisjointFrom: Do they share NO elements?
const odds = new Set([1, 3, 5]);
console.log(evens.isDisjointFrom(odds)); // true (no overlap)


/********************************************************
 * 5️⃣ RESIZABLE ARRAYBUFFERS
 *
 * ArrayBuffers (used for TypedArrays like Uint8Array, WebGL, etc.)
 * can now be resized or transferred efficiently without
 * manually copying their contents.
 ********************************************************/

const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(buffer.byteLength); // 8

// Resize it up dynamically
buffer.resize(12);
console.log(buffer.byteLength); // 12
