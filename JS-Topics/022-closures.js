/*******************************************************
 * TOPIC: CLOSURES IN JAVASCRIPT
 *
 * A closure is a function that "remembers" the variables
 * from its outer (enclosing) scope even after that outer
 * function has finished executing.
 *
 * Covers:
 *  1. What is a Closure?
 *  2. How closures capture scope
 *  3. Practical uses: counter, data privacy, memoization
 *  4. Closures in loops (common bug + fix)
 *  5. IIFE (Immediately Invoked Function Expression)
 *  6. Module pattern with closures
 *******************************************************/


/********************************************************
 * 1️⃣ WHAT IS A CLOSURE?
 *
 * When a function is defined inside another function,
 * the inner function has access to:
 *  - Its own local variables
 *  - The outer function's variables
 *  - Global variables
 *
 * This "memory" is the closure.
 ********************************************************/

function outer() {
    const message = "Hello from outer!"; // outer variable

    function inner() {
        console.log(message); // inner accesses outer's variable
    }

    return inner; // returns the function, NOT the result
}

const fn = outer(); // outer() has finished, but...
fn();               // Output: "Hello from outer!" — closure in action!


/********************************************************
 * 2️⃣ CLOSURE CAPTURES REFERENCE, NOT VALUE
 *
 * The inner function holds a LIVE reference to
 * the outer variable, not a snapshot copy.
 ********************************************************/

function makeCounter() {
    let count = 0; // private variable

    return {
        increment() { count++; },
        decrement() { count--; },
        getCount()  { return count; }
    };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2

// count is NOT accessible from outside — it's private!
// console.log(counter.count); // undefined


/********************************************************
 * 3️⃣ DATA PRIVACY WITH CLOSURES
 *
 * Closures allow you to create "private" variables
 * that can only be accessed via controlled functions.
 ********************************************************/

function createBankAccount(initialBalance) {
    let balance = initialBalance; // private

    return {
        deposit(amount) {
            if (amount > 0) balance += amount;
            console.log(`Deposited ${amount}. Balance: ${balance}`);
        },
        withdraw(amount) {
            if (amount > balance) {
                console.log("Insufficient funds!");
            } else {
                balance -= amount;
                console.log(`Withdrew ${amount}. Balance: ${balance}`);
            }
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);   // Deposited 500. Balance: 1500
account.withdraw(200);  // Withdrew 200. Balance: 1300
console.log(account.getBalance()); // 1300


/********************************************************
 * 4️⃣ CLOSURE IN LOOPS — CLASSIC BUG & FIX
 *
 * ❌ Bug: var in a loop shares the SAME binding
 ********************************************************/

// BUG: all timeouts print 3
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        // console.log(i); // prints 3, 3, 3 — all reference same `i`
    }, 100);
}

// ✅ Fix 1: Use let (block-scoped, new binding per iteration)
for (let j = 0; j < 3; j++) {
    setTimeout(function () {
        console.log(j); // prints 0, 1, 2
    }, 100);
}

// ✅ Fix 2: IIFE to capture each value
for (var k = 0; k < 3; k++) {
    (function (captured) {
        setTimeout(function () {
            console.log(captured); // prints 0, 1, 2
        }, 100);
    })(k);
}


/********************************************************
 * 5️⃣ IIFE — Immediately Invoked Function Expression
 *
 * A function that is defined and called at the same time.
 * Used to create isolated scope.
 ********************************************************/

const result = (function () {
    const secret = 42;
    return secret * 2;
})();

console.log(result); // 84
// console.log(secret); // ReferenceError — secret is private


/********************************************************
 * 6️⃣ MODULE PATTERN USING CLOSURES
 *
 * Simulate private/public separation (like classes)
 * before ES6 classes existed.
 ********************************************************/

const ShoppingCart = (function () {
    // Private state
    const items = [];

    // Public API
    return {
        addItem(item) {
            items.push(item);
            console.log(`Added: ${item}`);
        },
        removeItem(item) {
            const idx = items.indexOf(item);
            if (idx > -1) items.splice(idx, 1);
        },
        getItems() {
            return [...items]; // return a copy, not the original
        },
        total() {
            return items.length;
        }
    };
})();

ShoppingCart.addItem("Apple");   // Added: Apple
ShoppingCart.addItem("Banana");  // Added: Banana
console.log(ShoppingCart.getItems()); // ["Apple", "Banana"]
console.log(ShoppingCart.total());    // 2


/********************************************************
 * 7️⃣ MEMOIZATION WITH CLOSURES
 *
 * Cache expensive function results using closures.
 ********************************************************/

function memoize(fn) {
    const cache = {}; // closure variable

    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            console.log("Returning from cache");
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const slowSquare = (n) => {
    // simulate expensive computation
    return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5));  // computes: 25
console.log(fastSquare(5));  // from cache: 25
console.log(fastSquare(10)); // computes: 100


/********************************************************
 * 8️⃣ INTERVIEW NOTES
 *
 * ✔ Closures power: callbacks, event handlers, setTimeout
 * ✔ Closures enable data privacy (no private keyword needed)
 * ✔ Every function in JS is a closure (captures its scope)
 * ✔ Classic interview question: counter/bank account problems
 * ✔ Be aware of memory: closures keep outer vars alive
 *   → potential memory leaks if not managed carefully
 *
 * KEY: A closure = function + its lexical environment
 ********************************************************/
