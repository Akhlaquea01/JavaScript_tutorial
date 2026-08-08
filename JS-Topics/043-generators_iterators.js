/*******************************************************
 * TOPIC: GENERATORS & ITERATORS IN JAVASCRIPT
 *
 * Generators produce values lazily — one at a time,
 * pausing between each value using the `yield` keyword.
 *
 * Covers:
 *  1. Iterator Protocol
 *  2. Iterable Protocol
 *  3. Generator functions (function*)
 *  4. yield & yield*
 *  5. Infinite sequences
 *  6. Generator-based async flow
 *  7. Custom iterable objects
 *******************************************************/


/********************************************************
 * 1️⃣ ITERATOR PROTOCOL
 *
 * An iterator is any object with a next() method
 * that returns: { value, done }
 ********************************************************/

// Manual iterator
function createRangeIterator(start, end) {
    let current = start;
    return {
        next() {
            if (current <= end) {
                return { value: current++, done: false };
            }
            return { value: undefined, done: true };
        }
    };
}

const iter = createRangeIterator(1, 3);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: undefined, done: true }


/********************************************************
 * 2️⃣ ITERABLE PROTOCOL
 *
 * An object is iterable if it has a [Symbol.iterator]()
 * method that returns an iterator.
 *
 * Built-in iterables: Array, String, Map, Set, arguments
 ********************************************************/

const arr = [10, 20, 30];
const arrIterator = arr[Symbol.iterator]();
console.log(arrIterator.next()); // { value: 10, done: false }
console.log(arrIterator.next()); // { value: 20, done: false }

// for...of uses the iterator protocol internally
for (const val of [1, 2, 3]) {
    console.log(val);
}


/********************************************************
 * 3️⃣ GENERATOR FUNCTIONS (function*)
 *
 * A generator function returns a Generator object.
 * Execution is PAUSED at each `yield` and resumed
 * on the next .next() call.
 ********************************************************/

function* simpleGenerator() {
    console.log("Start");
    yield 1;
    console.log("After first yield");
    yield 2;
    console.log("After second yield");
    yield 3;
    console.log("Done");
}

const gen = simpleGenerator();
console.log(gen.next()); // Start → { value: 1, done: false }
console.log(gen.next()); // After first yield → { value: 2, done: false }
console.log(gen.next()); // After second yield → { value: 3, done: false }
console.log(gen.next()); // Done → { value: undefined, done: true }


/********************************************************
 * 4️⃣ RANGE GENERATOR
 ********************************************************/

function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

// Use in for...of
for (const num of range(1, 10, 2)) {
    process.stdout.write(num + " "); // 1 3 5 7 9
}
console.log();

// Spread a generator
console.log([...range(0, 5)]); // [0, 1, 2, 3, 4, 5]


/********************************************************
 * 5️⃣ INFINITE SEQUENCE GENERATOR
 *
 * Generators can be infinite — only produce values
 * when asked (lazy evaluation).
 ********************************************************/

function* naturals() {
    let n = 1;
    while (true) {
        yield n++;
    }
}

function take(n, iter) {
    const result = [];
    for (const val of iter) {
        result.push(val);
        if (result.length === n) break;
    }
    return result;
}

console.log(take(5, naturals())); // [1, 2, 3, 4, 5]

// Fibonacci generator
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

console.log(take(8, fibonacci())); // [0, 1, 1, 2, 3, 5, 8, 13]


/********************************************************
 * 6️⃣ PASSING VALUES INTO GENERATORS
 *
 * You can pass a value back TO the generator via
 * gen.next(value) — it becomes the result of yield.
 ********************************************************/

function* twoWay() {
    const x = yield "Give me a number:";
    const y = yield "Give me another:";
    return x + y;
}

const tw = twoWay();
console.log(tw.next());      // { value: "Give me a number:", done: false }
console.log(tw.next(10));    // { value: "Give me another:", done: false }
console.log(tw.next(20));    // { value: 30, done: true }


/********************************************************
 * 7️⃣ yield* — DELEGATING TO ANOTHER GENERATOR
 ********************************************************/

function* innerGen() {
    yield "a";
    yield "b";
}

function* outerGen() {
    yield 1;
    yield* innerGen(); // delegate to inner
    yield 2;
}

console.log([...outerGen()]); // [1, "a", "b", 2]


/********************************************************
 * 8️⃣ CUSTOM ITERABLE OBJECT
 ********************************************************/

const range2 = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,
            next() {
                if (this.current <= this.last) {
                    return { value: this.current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

for (const num of range2) {
    process.stdout.write(num + " "); // 1 2 3 4 5
}
console.log();

// Spread works too
console.log([...range2]); // [1, 2, 3, 4, 5]


/********************************************************
 * 9️⃣ GENERATOR FOR ASYNC FLOW (Pre async/await)
 *
 * Generators were used for async control flow before
 * async/await arrived (e.g., co library).
 ********************************************************/

// With async/await this is now handled natively,
// but generators still shine in:
// - Lazy pipelines
// - Custom data streams
// - Stateful iteration


/********************************************************
 * 🔟 SUMMARY
 *
 * Iterator   = Object with next() → { value, done }
 * Iterable   = Object with [Symbol.iterator]()
 * Generator  = function* that yields values lazily
 *
 * ✔ Use generators for: infinite sequences, lazy data,
 *   state machines, co-routines
 * ✔ All generators are iterators AND iterables
 * ✔ for...of, spread, destructuring all use iterators
 ********************************************************/
