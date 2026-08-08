/*******************************************************
 * TOPIC: SPREAD & REST OPERATORS IN JAVASCRIPT
 *
 * Both use the `...` syntax but serve OPPOSITE roles:
 *
 *  SPREAD  → expands  an iterable/object into elements
 *  REST    → collects elements into an array/object
 *
 * Covers:
 *  1. Spread with Arrays
 *  2. Spread with Objects
 *  3. Spread with Function Calls
 *  4. Rest Parameters in Functions
 *  5. Rest in Destructuring
 *  6. Common patterns & interview traps
 *******************************************************/


/********************************************************
 * 1️⃣ SPREAD WITH ARRAYS
 ********************************************************/

// Clone an array (shallow copy)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — unchanged
console.log(copy);     // [1, 2, 3, 4]

// Merge arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Insert in the middle
const withMiddle = [0, ...a, 3.5, ...b, 7];
console.log(withMiddle); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Convert string to array of chars
const chars = [..."Hello"];
console.log(chars); // ["H", "e", "l", "l", "o"]

// Convert Set to array (remove duplicates)
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
console.log(unique); // [1, 2, 3, 4]


/********************************************************
 * 2️⃣ SPREAD WITH OBJECTS
 ********************************************************/

// Clone an object (shallow copy)
const user = { name: "Alice", age: 25 };
const clonedUser = { ...user };
clonedUser.age = 30;
console.log(user.age);       // 25 — unchanged
console.log(clonedUser.age); // 30

// Merge objects (later keys override earlier ones)
const defaults = { theme: "light", lang: "en", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 16 };
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", lang: "en", fontSize: 16 }

// Add/override specific properties
const updatedUser = { ...user, age: 26, city: "Bangalore" };
console.log(updatedUser);
// { name: "Alice", age: 26, city: "Bangalore" }

// ⚠️ Spread is SHALLOW — nested objects are still references
const nested = { a: { b: 1 } };
const shallowCopy = { ...nested };
shallowCopy.a.b = 99;
console.log(nested.a.b); // 99 — nested object was mutated!


/********************************************************
 * 3️⃣ SPREAD IN FUNCTION CALLS
 ********************************************************/

function add(x, y, z) {
    return x + y + z;
}

const nums = [1, 2, 3];
console.log(add(...nums)); // 6 — same as add(1, 2, 3)

// Math.max / Math.min with arrays
const values = [4, 7, 1, 9, 2];
console.log(Math.max(...values)); // 9
console.log(Math.min(...values)); // 1

// Push multiple items
const arr = [1, 2];
arr.push(...[3, 4, 5]);
console.log(arr); // [1, 2, 3, 4, 5]


/********************************************************
 * 4️⃣ REST PARAMETERS IN FUNCTIONS
 *
 * Rest collects all REMAINING arguments into an array.
 * Must be the LAST parameter.
 ********************************************************/

function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100

// Mixed: fixed + rest
function introduce(firstName, lastName, ...hobbies) {
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Hobbies: ${hobbies.join(", ")}`);
}

introduce("Alice", "Smith", "Coding", "Reading", "Gaming");
// Name: Alice Smith
// Hobbies: Coding, Reading, Gaming

// ⚠️ Rest vs arguments object
// arguments → array-like, not a real array, no arrow fn support
// rest      → real Array with all Array methods ✅


/********************************************************
 * 5️⃣ REST IN DESTRUCTURING
 ********************************************************/

// Array destructuring with rest
const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log(first);     // 10
console.log(second);    // 20
console.log(remaining); // [30, 40, 50]

// Object destructuring with rest
const { name, age, ...rest } = {
    name: "Bob",
    age: 28,
    city: "Delhi",
    role: "Admin"
};
console.log(name); // Bob
console.log(rest); // { city: "Delhi", role: "Admin" }

// Ignore first elements
const [, , third, ...tail] = [1, 2, 3, 4, 5];
console.log(third); // 3
console.log(tail);  // [4, 5]


/********************************************************
 * 6️⃣ PRACTICAL PATTERNS
 ********************************************************/

// Deep clone (simple, no functions/circular refs)
const deepCopy = JSON.parse(JSON.stringify({ a: { b: 1 } }));

// Immutable array update (React/Redux pattern)
const todos = ["buy milk", "go gym"];
const addTodo = (list, item) => [...list, item];
const removeTodo = (list, idx) => [
    ...list.slice(0, idx),
    ...list.slice(idx + 1)
];

console.log(addTodo(todos, "read book"));   // [..., "read book"]
console.log(removeTodo(todos, 0));          // ["go gym"]

// Immutable object update
const state = { count: 0, name: "App" };
const newState = { ...state, count: state.count + 1 };
console.log(newState); // { count: 1, name: "App" }


/********************************************************
 * 7️⃣ INTERVIEW NOTES
 *
 * SPREAD expands — used where values are expected
 * REST collects — used where parameters are defined
 *
 * ✔ Spread = [...arr], {...obj}, fn(...args)
 * ✔ Rest   = function(...args), [a, ...rest], {a, ...rest}
 * ✔ Spread is shallow — beware nested objects
 * ✔ Rest must be the LAST parameter
 * ✔ arguments ≠ rest (arguments is not a real array)
 ********************************************************/
