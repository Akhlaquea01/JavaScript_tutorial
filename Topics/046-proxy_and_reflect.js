/*******************************************************
 * TOPIC: PROXY AND REFLECT IN JAVASCRIPT
 *
 * `Proxy` lets you wrap an object and intercept operations
 * on it (like getting/setting properties, function calls).
 * `Reflect` provides built-in methods that correspond to
 * the proxy traps.
 *
 * Covers:
 *  1. Proxy basic syntax (target, handler)
 *  2. Traps: get, set, has, deleteProperty
 *  3. Data validation with Proxy
 *  4. Negative array indices via Proxy
 *  5. The Reflect API
 *  6. Why Proxy + Reflect are used together
 *******************************************************/


/********************************************************
 * 1️⃣ PROXY BASIC SYNTAX
 *
 * target → The original object you want to wrap.
 * handler → Object containing "traps" (functions)
 *           that intercept operations.
 ********************************************************/

const user = {
    name: "Alice",
    age: 25
};

// Create a proxy without traps (just forwards everything)
const transparentProxy = new Proxy(user, {});
console.log(transparentProxy.name); // "Alice"


// A proxy that intercepts 'get'
const getProxy = new Proxy(user, {
    get(target, property) {
        if (property === "name") {
            return target[property].toUpperCase();
        }
        return target[property];
    }
});

console.log(getProxy.name); // "ALICE" (intercepted)
console.log(getProxy.age);  // 25 (passed through)


/********************************************************
 * 2️⃣ COMMON TRAPS
 *
 * get(target, prop, receiver)
 * set(target, prop, value, receiver)
 * has(target, prop)           (intercepts 'in' operator)
 * deleteProperty(target, prop)(intercepts 'delete' operator)
 ********************************************************/

const dictionary = {
    hello: "hola",
    bye: "adios"
};

const dictProxy = new Proxy(dictionary, {
    get(target, phrase) {
        if (phrase in target) {
            return target[phrase];
        } else {
            return phrase; // default to returning the requested phrase
        }
    },
    has(target, phrase) {
        // Hide a specific word
        if (phrase === "secret") return false;
        return phrase in target;
    }
});

console.log(dictProxy.hello); // "hola"
console.log(dictProxy.apple); // "apple" (intercepted)

console.log("hello" in dictProxy);  // true
console.log("secret" in dictProxy); // false (intercepted)


/********************************************************
 * 3️⃣ DATA VALIDATION WITH PROXY
 *
 * Use the 'set' trap to prevent invalid data.
 * The 'set' trap must return true if successful, false otherwise.
 ********************************************************/

let numbers = [];

numbers = new Proxy(numbers, {
    set(target, prop, val) {
        if (typeof val !== 'number') {
            throw new TypeError("Array only accepts numbers");
        }
        target[prop] = val;
        return true; // indicates success
    }
});

numbers.push(1); // OK
numbers.push(2); // OK

try {
    numbers.push("three"); // ❌ TypeError: Array only accepts numbers
} catch (e) {
    console.error(e.message);
}


/********************************************************
 * 4️⃣ NEGATIVE ARRAY INDICES VIA PROXY
 *
 * Python allows arr[-1] to get the last element.
 * We can implement this in JS using Proxy!
 ********************************************************/

let array = [10, 20, 30];

array = new Proxy(array, {
    get(target, prop) {
        // If prop is a negative number
        const index = Number(prop);
        if (index < 0) {
            return target[target.length + index];
        }
        // Otherwise return normally
        return target[prop];
    }
});

console.log(array[0]);  // 10
console.log(array[-1]); // 30 (last element)
console.log(array[-2]); // 20


/********************************************************
 * 5️⃣ THE REFLECT API
 *
 * `Reflect` is a built-in object providing methods for
 * interceptable JavaScript operations.
 * The methods are exactly the same as the Proxy handler methods.
 ********************************************************/

const myObj = { a: 1 };

// Instead of:
// console.log(myObj.a);
// console.log('a' in myObj);
// delete myObj.a;

// You can use:
console.log(Reflect.get(myObj, 'a')); // 1
console.log(Reflect.has(myObj, 'a')); // true
Reflect.deleteProperty(myObj, 'a');
console.log(myObj.a);                 // undefined


/********************************************************
 * 6️⃣ WHY USE PROXY + REFLECT TOGETHER?
 *
 * Best practice: Always forward intercepted operations
 * to the original object using Reflect.
 * This guarantees you perfectly replicate the default behavior
 * (especially concerning `this` context and getters/setters).
 ********************************************************/

const user2 = {
    _name: "Guest",
    get name() {
        return this._name;
    }
};

const userProxy = new Proxy(user2, {
    get(target, prop, receiver) {
        // Log the access
        console.log(`GET ${prop}`);

        // ❌ BAD: return target[prop];
        // ✅ GOOD: Delegate to Reflect
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        console.log(`SET ${prop} = ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
});

console.log(userProxy.name); // GET name -> "Guest"


/********************************************************
 * 7️⃣ INTERVIEW NOTES
 *
 * ✔ Proxy is used heavily in modern frameworks like Vue 3
 *   (for reactivity) and in ORMs/testing libraries.
 * ✔ Reflect pairs perfectly with Proxy traps.
 * ✔ A proxy cannot be "transparently" detected (no typeof Proxy).
 * ✔ Performance: Proxies are slower than direct property access,
 *   so use them when specifically needed (e.g., validation, API abstraction).
 ********************************************************/
