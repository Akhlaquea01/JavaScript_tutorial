/*******************************************************
 * TOPIC: ES2025 (ECMAScript 2025) FEATURES
 *
 * (Note: Some of these are late Stage 3 or newly ratified Stage 4,
 * widely considered as the ES2025 feature set.)
 *
 * Covers:
 *  1. Iterator Helpers (map, filter, take, drop)
 *  2. Promise.try()
 *  3. Explicit Resource Management (`using` kwd)
 *  4. Import Attributes (JSON modules)
 *  5. Float16Array
 *******************************************************/

/********************************************************
 * 1️⃣ ITERATOR HELPERS
 *
 * Iterators (like what Generators produce) now have Array-like
 * methods directly on the IteratorPrototype!
 * These are LAZY — they don't produce the whole array in memory.
 ********************************************************/

function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

const iterator = generateSequence();

// Before ES2025, you had to spread the generator into an array to map it:
// const mapped = [...generateSequence()].map(x => x * 2);

// ES2025: Lazy chainable helpers
const newIter = iterator
    .filter(val => val % 2 === 0)   // keeps 2, 4
    .map(val => val * 10);          // transforms to 20, 40

console.log(newIter.next().value); // 20
console.log(newIter.next().value); // 40

// Other helpers:
// .take(n)    -> take first n items and stop
// .drop(n)    -> skip first n items
// .reduce()
// .some() / .every()
// .find()
// .toArray()  -> evaluate the lazy sequence into a real Array


/********************************************************
 * 2️⃣ Promise.try()
 *
 * A clean way to start a promise chain, wrapping any synchronous
 * exceptions AND returning a Promise for async operations.
 * Avoids messy `new Promise(resolve => resolve(func()))` patterns.
 ********************************************************/

const maybeThrowsAsync = () => {
    if (Math.random() > 0.5) throw new Error("Sync failure!");
    return Promise.resolve("Success!");
};

// Start chain cleanly with Promise.try
Promise.try(maybeThrowsAsync)
    .then(result => console.log(result))
    .catch(err => console.error("Caught safely:", err.message));


/********************************************************
 * 3️⃣ EXPLICIT RESOURCE MANAGEMENT (`using` keyword)
 *
 * Automatically clean up resources (DB connections, file handles,
 * locks) when they go out of scope, similar to C#'s `using`
 * or Python's `with`.
 *
 * Requires objects to implement [Symbol.dispose] or [Symbol.asyncDispose].
 ********************************************************/

class DatabaseConnection {
    constructor(id) {
        this.id = id;
        console.log(`DB ${this.id} connected`);
    }

    // This method is called automatically when the scope ends
    [Symbol.dispose]() {
        console.log(`DB ${this.id} disconnected (cleanup)`);
    }
}

function processData() {
    // using keyword creates a scoped binding
    using db = new DatabaseConnection("prod-1");

    console.log("Querying data...");
    // If an error triggers or function finishes, Symbol.dispose is called automatically!

} // <--- db[Symbol.dispose]() is invoked right here implicitly

processData();
// Output:
// DB prod-1 connected
// Querying data...
// DB prod-1 disconnected (cleanup)


// Async versions exist too: `await using` runs [Symbol.asyncDispose]()
// Useful for async cleanups (closing network sockets).


/********************************************************
 * 4️⃣ IMPORT ATTRIBUTES
 *
 * Import JSON or other module types securely by asserting
 * their type explicitly. Prevents security risks where a server
 * might pretend a JS file is a JSON file to execute code.
 ********************************************************/

// ES2025 syntax (replacing older 'assert'):
/*
import data from "./data.json" with { type: "json" };
console.log(data.version);
*/


/********************************************************
 * 5️⃣ Float16Array
 *
 * A new TypedArray for 16-bit floating point numbers.
 * Huge benefit for WebGL, WebGPU, and Machine Learning where
 * 16-bit precision is enough, saving exactly 50% memory
 * compared to 32-bit floats.
 ********************************************************/

// Creating a Float16 buffer of 5 elements
const fp16 = new Float16Array(5);

fp16[0] = 3.14159;
// Note: Limited precision changes 3.14159 to approx 3.140625 naturally
console.log(fp16[0]);


/********************************************************
 * SUMMARY OF THE EVOLUTION (ES2022 - ES2025)
 *
 * JS has heavily evolved towards:
 * 1. Safe Arrays: findLast, .at(), toSorted/toReversed
 * 2. Less boilerplate: Promise.withResolvers, Object.groupBy
 * 3. Class power: Private fields (#), Static blocks
 * 4. Memory/Resource safety: `using`, Float16Array
 * 5. Feature completion: Native Set Math, advanced Regex
 ********************************************************/
