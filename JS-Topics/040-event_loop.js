/*******************************************************
 * TOPIC: THE EVENT LOOP & CONCURRENCY MODEL
 *
 * How JavaScript (a single-threaded language) handles
 * non-blocking asynchronous operations.
 *
 * Covers:
 *  1. Call Stack
 *  2. Web APIs (or C++ APIs in Node)
 *  3. Task Queue (Macrotask Queue)
 *  4. Microtask Queue
 *  5. Event Loop execution order
 *  6. Practical examples
 *******************************************************/

/********************************************************
 * 1️⃣ THE CALL STACK
 *
 * LIFO (Last In, First Out) structure where JS executes
 * function calls. Since JS is single-threaded, there is
 * only ONE call stack.
 ********************************************************/

function multiply(a, b) { return a * b; }
function square(n) { return multiply(n, n); }
function printSquare(n) {
    const squared = square(n);
    console.log(squared);
}
// Call Stack order: printSquare -> square -> multiply -> (pops)


/********************************************************
 * 2️⃣ SYNCHRONOUS VS ASYNCHRONOUS
 *
 * Synchronous code blocks the stack. Async code gets
 * pushed to Web APIs and callbacks are queued.
 ********************************************************/

console.log("Start");

// setTimeout is NOT a core JS feature; it's a browser/Node API
setTimeout(() => {
    console.log("Timeout callback");
}, 0);

console.log("End");

// Output Order:
// 1. "Start"
// 2. "End"
// 3. "Timeout callback" (even with 0 delay!)


/********************************************************
 * 3️⃣ MACROTASK QUEUE vs MICROTASK QUEUE
 *
 * When an async operation completes, its callback goes
 * to a queue waiting for the Call Stack to be empty.
 *
 * Microtasks (High Priority):
 *  - Promises (.then, .catch, .finally)
 *  - queueMicrotask()
 *  - MutationObserver (Browser)
 *
 * Macrotasks (Normal Priority):
 *  - setTimeout, setInterval
 *  - I/O operations (fs.readFile)
 *  - DOM events (clicks)
 ********************************************************/

console.log("1. Stack (Sync)");

setTimeout(() => {
    console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise)");
});

console.log("2. Stack (Sync)");

// Output Order EXPLAINED:
// 1. Script runs: prints "1. Stack"
// 2. setTimeout goes to Web API. Callback put in Macrotask queue.
// 3. Promise resolves. Callback put in Microtask queue.
// 4. Script runs: prints "2. Stack"
// 5. EVENT LOOP CHECKS MICROTASK QUEUE FIRST! Prints "3. Microtask"
// 6. EVENT LOOP CHECKS MACROTASK QUEUE! Prints "4. Macrotask"


/********************************************************
 * 4️⃣ THE INFINITE LOOP TRAP
 *
 * The Event Loop only checks queues when the Call Stack
 * is EMPTY. If the stack is blocked (infinite while loop),
 * NO callbacks will ever run!
 ********************************************************/

/*
setTimeout(() => console.log("I will never run!"), 1000);

while(true) {
    // Blocks the Call Stack forever. JS is frozen.
}
*/


/********************************************************
 * 5️⃣ NESTED MICROTASKS
 *
 * Microtasks can queue other microtasks. The Event Loop
 * will NOT move to Macrotasks until the ENTIRE Microtask
 * queue is empty.
 ********************************************************/

setTimeout(() => console.log("MACROTASK"), 0);

Promise.resolve().then(() => {
    console.log("MICROTASK 1");

    // Queues another microtask
    Promise.resolve().then(() => {
        console.log("MICROTASK 2");
    });
});

// Output:
// MICROTASK 1
// MICROTASK 2
// MACROTASK


/********************************************************
 * 6️⃣ INTERVIEW QUESTION EXAMPLES
 ********************************************************/

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

new Promise((resolve) => {
    console.log("D"); // ⚠️ Promise constructor is SYNCHRONOUS!
    resolve();
}).then(() => console.log("E"));

console.log("F");

// Take a guess at the output!
//
//
//
// Answer: A, D, F, C, E, B
// Explanation:
// Sync: A, D (Promise executor runs immediately), F
// Microtasks: C (from first Promise), E (from second)
// Macrotasks: B (from timeout)
