/*******************************************************
 * TOPIC: OPTIONAL CHAINING & NULLISH COALESCING
 *
 * Modern JS operators for safely handling null/undefined
 *
 * Covers:
 *  1. Optional Chaining (?.)
 *  2. Optional method calls ?.()
 *  3. Optional bracket notation ?.[key]
 *  4. Nullish Coalescing (??)
 *  5. Nullish Assignment (??=)
 *  6. Logical OR Assignment (||=)
 *  7. Logical AND Assignment (&&=)
 *  8. Combining operators
 *******************************************************/


/********************************************************
 * 1️⃣ OPTIONAL CHAINING (?.)
 *
 * Access deeply nested properties WITHOUT throwing
 * if an intermediate value is null or undefined.
 *
 * Returns undefined if chain breaks.
 ********************************************************/

const user = {
    name: "Alice",
    address: {
        city: "Bangalore",
        zip: "560001"
    },
    getGreeting() {
        return `Hello, ${this.name}!`;
    }
};

// Without optional chaining — verbose and error-prone
const city1 = user && user.address && user.address.city;
console.log(city1); // "Bangalore"

// ✅ With optional chaining
const city2 = user?.address?.city;
console.log(city2); // "Bangalore"

// Accessing a property that doesn't exist — returns undefined (no error)
const country = user?.address?.country;
console.log(country); // undefined

// The user object is null
const nullUser = null;
console.log(nullUser?.address?.city); // undefined — no TypeError!

// Compare: Without ?. this would throw:
// console.log(nullUser.address);  // ❌ TypeError!


/********************************************************
 * 2️⃣ OPTIONAL METHOD CALLS ?.()
 ********************************************************/

console.log(user.getGreeting?.()); // "Hello, Alice!"

const noMethod = {};
console.log(noMethod.getGreeting?.()); // undefined — no error

// Calling a callback that might not be provided
function fetchData(callback) {
    const data = { id: 1, name: "Post" };
    callback?.(data); // safe: only calls if callback exists
}

fetchData((d) => console.log("Got:", d.name)); // Got: Post
fetchData(); // no error, callback is undefined


/********************************************************
 * 3️⃣ OPTIONAL BRACKET NOTATION ?.[key]
 *
 * For dynamic property access.
 ********************************************************/

const config = { theme: "dark", lang: "en" };
const key = "theme";

console.log(config?.[key]); // "dark"

const nullConfig = null;
console.log(nullConfig?.[key]); // undefined


/********************************************************
 * 4️⃣ NULLISH COALESCING (??)
 *
 * Returns the RIGHT side if LEFT is null or undefined.
 * Unlike ||, it does NOT treat 0, false, "" as falsy.
 ********************************************************/

// ?? vs ||
const score = 0;

console.log(score || 100);  // 100 — because 0 is falsy ❌
console.log(score ?? 100);  // 0   — because 0 is NOT null/undefined ✅

const name1 = "";
console.log(name1 || "Guest");  // "Guest" — "" is falsy with ||
console.log(name1 ?? "Guest");  // "" — "" is not null/undefined with ??

const isActive = false;
console.log(isActive ?? true);  // false — false is NOT null/undefined

// Common use: default values
function greet(name) {
    const displayName = name ?? "Anonymous";
    console.log(`Hello, ${displayName}!`);
}

greet("Bob");      // Hello, Bob!
greet(null);       // Hello, Anonymous!
greet(undefined);  // Hello, Anonymous!
greet("");         // Hello, !  (empty string is kept — it's not null/undefined)


/********************************************************
 * 5️⃣ NULLISH ASSIGNMENT (??=)  — ES2021
 *
 * Assign only if the variable is null or undefined.
 ********************************************************/

let a = null;
a ??= "default";
console.log(a); // "default"

let b = 0;
b ??= 99;
console.log(b); // 0 — not assigned because 0 ≠ null/undefined

let c = "existing";
c ??= "new value";
console.log(c); // "existing" — not null/undefined, so no change


/********************************************************
 * 6️⃣ LOGICAL OR ASSIGNMENT (||=)  — ES2021
 *
 * Assign if the variable is FALSY (0, "", false, null, undefined)
 ********************************************************/

let x = 0;
x ||= 42;
console.log(x); // 42 — 0 is falsy

let y = "hello";
y ||= "world";
console.log(y); // "hello" — truthy, not changed


/********************************************************
 * 7️⃣ LOGICAL AND ASSIGNMENT (&&=)  — ES2021
 *
 * Assign only if the variable is TRUTHY.
 ********************************************************/

let p = 1;
p &&= 99;
console.log(p); // 99 — 1 is truthy, so assign

let q = 0;
q &&= 99;
console.log(q); // 0 — 0 is falsy, so NOT assigned


/********************************************************
 * 8️⃣ COMBINING OPERATORS — REAL-WORLD EXAMPLES
 ********************************************************/

// API response with optional fields
const apiResponse = {
    data: {
        user: {
            profile: {
                bio: null
            }
        }
    }
};

const bio = apiResponse?.data?.user?.profile?.bio ?? "No bio provided";
console.log(bio); // "No bio provided"

// Config object with defaults
function createApp(config) {
    const port    = config?.port    ?? 3000;
    const host    = config?.host    ?? "localhost";
    const debug   = config?.debug   ?? false;
    const timeout = config?.timeout ?? 5000;

    console.log(`Server: ${host}:${port} | debug=${debug} | timeout=${timeout}ms`);
}

createApp({ port: 8080 });
// Server: localhost:8080 | debug=false | timeout=5000ms

createApp(null);
// Server: localhost:3000 | debug=false | timeout=5000ms

// Array of users, some might be null
const users = [
    { name: "Alice", role: "admin" },
    null,
    { name: "Bob" }
];

const roles = users.map(u => u?.role ?? "guest");
console.log(roles); // ["admin", "guest", "guest"]


/********************************************************
 * 9️⃣ INTERVIEW NOTES
 *
 * ?. optional chaining   → safe property access
 * ??  nullish coalescing → default only for null/undefined
 * ??= nullish assignment → assign only if null/undefined
 * ||= logical OR assign  → assign if falsy
 * &&= logical AND assign → assign if truthy
 *
 * KEY DIFFERENCE:
 *  ?? checks: is it null or undefined? (strict)
 *  || checks: is it falsy? (0, "", false also trigger it)
 *
 * ✔ Use ?? when 0 or "" are valid values
 * ✔ Use ?. to safely traverse unknown data structures
 * ✔ Use ??= for lazy initialization of object properties
 ********************************************************/
