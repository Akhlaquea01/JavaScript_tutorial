/*******************************************************
 * TOPIC: ES2022 (ECMAScript 2022) FEATURES
 *
 * Covers:
 *  1. Top-level await
 *  2. Class Private Fields & Methods (#)
 *  3. Class Static Initialization Blocks
 *  4. Array / String `.at()` method
 *  5. Object.hasOwn()
 *  6. Error.cause
 *  7. RegExp match indices ('d' flag)
 *******************************************************/

/********************************************************
 * 1️⃣ TOP-LEVEL AWAIT
 *
 * Previously, `await` could only be used inside an
 * `async function`. Now, it can be used at the top
 * level of a module.
 *
 * Note: Only works in ES Modules (.mjs or type="module")
 ********************************************************/

// Works perfectly fine at the root level of a module:
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await res.json();
// console.log(data);


/********************************************************
 * 2️⃣ CLASS PRIVATE FIELDS & METHODS (#)
 *
 * True privacy in JavaScript classes! Variables/methods
 * starting with `#` cannot be accessed from outside the class.
 ********************************************************/

class BankAccount {
    // Private field
    #balance = 0;

    constructor(initialDeposit) {
        if (initialDeposit > 0) {
            this.#balance = initialDeposit;
        }
    }

    // Private method
    #logTransaction(msg) {
        console.log(`[LOG]: ${msg}`);
    }

    deposit(amount) {
        this.#balance += amount;
        this.#logTransaction(`Deposited ${amount}`);
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
// console.log(account.#balance); // ❌ SyntaxError: Private field
// account.#logTransaction("test"); // ❌ SyntaxError: Private method

console.log(account.getBalance()); // 100
account.deposit(50);               // [LOG]: Deposited 50


/********************************************************
 * 3️⃣ CLASS STATIC INITIALIZATION BLOCKS
 *
 * Allows complex initialization of static fields
 * (ones that belong to the class itself, not instances).
 ********************************************************/

class Config {
    static dbConnection;
    static apiKeys = [];

    // Static block runs exactly ONCE when the class is evaluated
    static {
        try {
            // Complex setup logic goes here
            this.dbConnection = "Connected to DB";
            this.apiKeys.push("KEY_123");
        } catch (error) {
            console.error(error);
        }
    }
}

console.log(Config.dbConnection); // "Connected to DB"


/********************************************************
 * 4️⃣ THE .at() METHOD (Arrays & Strings)
 *
 * A clean way to get the last elements without doing
 * arr[arr.length - 1]. Accepts negative integers.
 ********************************************************/

const letters = ['a', 'b', 'c', 'd', 'e'];

// Old way
console.log(letters[letters.length - 1]); // e

// ES2022 way
console.log(letters.at(-1)); // e
console.log(letters.at(-2)); // d
console.log(letters.at(0));  // a

const greeting = "Hello World";
console.log(greeting.at(-1)); // d


/********************************************************
 * 5️⃣ Object.hasOwn()
 *
 * A safer, modern replacement for Object.prototype.hasOwnProperty.call()
 * Checks if an object has a property as its OWN property (not inherited).
 ********************************************************/

const person = { name: "Alice" };

// Old way (can be overridden, e.g. person.hasOwnProperty = null)
console.log(person.hasOwnProperty("name")); // true

// ES2022 safer way
console.log(Object.hasOwn(person, "name")); // true
console.log(Object.hasOwn(person, "age"));  // false

// Why is it safer? Consider an object with no prototype:
const noProto = Object.create(null);
noProto.key = 42;
// noProto.hasOwnProperty("key"); // ❌ TypeError
console.log(Object.hasOwn(noProto, "key")); // ✅ true


/********************************************************
 * 6️⃣ Error.cause
 *
 * Wrap deeper errors with more context, while preserving
 * the original error object.
 ********************************************************/

function processData(rawData) {
    try {
        JSON.parse(rawData);
    } catch (err) {
        // Pass the original error as the 'cause'
        throw new Error("Failed to process data", { cause: err });
    }
}

try {
    processData("{bad json}");
} catch (err) {
    console.log("Main error:", err.message); // Main error: Failed to process data
    console.log("Original cause:", err.cause.message); // Original cause: Expected property name...
}


/********************************************************
 * 7️⃣ REGEXP MATCH INDICES ('d' flag)
 *
 * Gets the start and end indices of the matched strings.
 ********************************************************/

const regex = /match/d;
const text = "Find the match in this string";

const result = regex.exec(text);
// It returns a `.indices` array containing [start, end] positions
console.log(result.indices[0]); // [9, 14]
