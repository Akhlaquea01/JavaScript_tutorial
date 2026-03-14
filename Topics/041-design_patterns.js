/*******************************************************
 * TOPIC: DESIGN PATTERNS IN JAVASCRIPT
 *
 * Reusable solutions to commonly occurring problems in
 * software design. Especially requested in LLD interviews.
 *
 * Covers:
 *  1. Singleton Pattern
 *  2. Factory Pattern
 *  3. Observer Pattern (Pub/Sub)
 *  4. Module Pattern (Review)
 *******************************************************/

/********************************************************
 * 1️⃣ SINGLETON PATTERN
 *
 * Restricts instantiation of a class to a SINGLE object.
 * Useful for global states (Database connection, Logger, Store).
 ********************************************************/

class Database {
    constructor(connectionString) {
        if (Database.instance) {
            console.log("Returning existing DB connection...");
            return Database.instance;
        }

        this.connectionString = connectionString;
        this.connected = true;

        console.log("Creating new DB connection!");
        Database.instance = this; // Save instance to static property
    }

    query(sql) {
        return `Executing: ${sql} on ${this.connectionString}`;
    }
}

const db1 = new Database("mongodb://localhost:27017"); // Creating new DB connection!
const db2 = new Database("mongodb://other-host");      // Returning existing DB connection...

console.log(db1 === db2); // true — Both variables point to the same object!
console.log(db2.connectionString); // mongodb://localhost:27017 (Ignored "other-host")


/********************************************************
 * 2️⃣ FACTORY PATTERN
 *
 * A function/class that creates objects without exposing
 * the instantiation logic globally.
 ********************************************************/

class Developer {
    constructor(name) {
        this.name = name;
        this.type = "Developer";
    }
}

class Designer {
    constructor(name) {
        this.name = name;
        this.type = "Designer";
    }
}

class EmployeeFactory {
    create(name, type) {
        switch (type) {
            case 1:
                return new Developer(name);
            case 2:
                return new Designer(name);
            default:
                throw new Error("Unknown employee type");
        }
    }
}

const factory = new EmployeeFactory();
const employees = [];

employees.push(factory.create("John", 1));
employees.push(factory.create("Sarah", 2));

employees.forEach(emp => {
    console.log(`Hi, I am ${emp.name} and I am a ${emp.type}`);
});


/********************************************************
 * 3️⃣ OBSERVER PATTERN (Pub/Sub)
 *
 * A subject (publisher) maintains a list of dependents
 * (observers/subscribers) and notifies them of state changes.
 * Basis for Redux and DOM Event Listeners.
 ********************************************************/

class Subject {
    constructor() {
        this.observers = []; // List of functions
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter(fn => fn !== fnToRemove);
    }

    fire(data) {
        this.observers.forEach(fn => fn(data));
    }
}

// Instantiate subject
const newsLetter = new Subject();

// Create observers
const Observer1 = (news) => console.log("Observer 1 received news:", news);
const Observer2 = (news) => console.log("Observer 2 received news:", news);

// Subscribe them
newsLetter.subscribe(Observer1);
newsLetter.subscribe(Observer2);

// Notify all
newsLetter.fire("New JS Features released!");
// Output: Both observers receive the news

// Unsubscribe one
newsLetter.unsubscribe(Observer1);

// Notify again
newsLetter.fire("React 19 announced!");
// Output: Only Observer 2 receives the news


/********************************************************
 * 4️⃣ MODULE PATTERN (Brief Review)
 *
 * Encapsulate "private" state via closures, exposing
 * only a public API. (See closures file for details)
 ********************************************************/

const CounterModule = (function () {
    let count = 0; // Private

    return { // Public
        increment: () => ++count,
        get: () => count
    };
})();

CounterModule.increment();
console.log(CounterModule.get()); // 1
console.log(CounterModule.count); // undefined (Private)


/********************************************************
 * SUMMARY FOR INTERVIEWS (LLD)
 *
 * Singleton: Need exactly ONE global instance coordinating tasks.
 * Factory:   Complex object creation logic isolated in one place.
 * Observer:  Reacting to events (buttons, state changes, websockets).
 * Module:    Data privacy and encapsulation.
 ********************************************************/
