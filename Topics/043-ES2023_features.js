/*******************************************************
 * TOPIC: ES2023 (ECMAScript 2023) FEATURES
 *
 * Covers:
 *  1. Array `findLast()` and `findLastIndex()`
 *  2. Change Array by Copy Methods:
 *     - `toReversed()`
 *     - `toSorted()`
 *     - `toSpliced()`
 *     - `with()`
 *  3. Symbols as WeakMap keys
 *  4. Hashbang Grammar (`#!`)
 *******************************************************/

/********************************************************
 * 1️⃣ ARRAY findLast() & findLastIndex()
 *
 * Search an array from the END (right-to-left).
 * Avoids having to reverse the array first.
 ********************************************************/

const numbers = [5, 12, 50, 130, 44, 20];

// Old way: Find the LAST element > 40
const reversed = [...numbers].reverse();
const lastLargeOld = reversed.find(n => n > 40);

// ES2023 way:
const lastLarge = numbers.findLast(n => n > 40);
console.log(lastLarge); // 44 (Scanning backwards, 44 appears before 130/50)

// Find the index (from the original array)
const lastLargeIdx = numbers.findLastIndex(n => n > 40);
console.log(lastLargeIdx); // 4 (Index of 44 in the original array)


/********************************************************
 * 2️⃣ CHANGE ARRAY BY COPY METHODS
 *
 * By default, `.reverse()`, `.sort()`, and `.splice()`
 * MUTATE the original array. This causes bugs when you
 * want immutable code (like in React or Redux).
 *
 * ES2023 introduces safe counterparts that return a NEW array.
 ********************************************************/

const original = [3, 1, 4, 2];

// --- A) toReversed() ---
// Safe alternative to .reverse()
const reversedArr = original.toReversed();
console.log("Reversed:", reversedArr); // [2, 4, 1, 3]
console.log("Original (unchanged):", original); // [3, 1, 4, 2]

// --- B) toSorted() ---
// Safe alternative to .sort()
const sortedArr = original.toSorted((a, b) => a - b);
console.log("Sorted:", sortedArr);     // [1, 2, 3, 4]
console.log("Original (unchanged):", original); // [3, 1, 4, 2]

// --- C) toSpliced() ---
// Safe alternative to .splice()
const months = ["Jan", "Mar", "Apr", "May"];
// Insert "Feb" at index 1
const newMonths = months.toSpliced(1, 0, "Feb");
console.log("New Months:", newMonths); // ["Jan", "Feb", "Mar", "Apr", "May"]
console.log("Original (unchanged):", months);

// --- D) with() ---
// Safe alternative to arr[index] = value
const arr = ["a", "b", "c"];
const changedArr = arr.with(1, "z"); // Replace index 1 with "z"
console.log(changedArr);             // ["a", "z", "c"]
console.log("Original (unchanged):", arr); // ["a", "b", "c"]


/********************************************************
 * 3️⃣ SYMBOLS AS WEAKMAP KEYS
 *
 * WeakMaps used to ONLY accept Objects as keys.
 * Now they accept Symbols as well, allowing for private
 * unique keys without creating empty objects.
 ********************************************************/

const weakMeta = new WeakMap();

// Before ES2023, keys had to be objects: const key = {}
// Now, Symbols are allowed as keys!
const metaKey = Symbol("metadata");

weakMeta.set(metaKey, { id: 1, created: "2024-01-01" });

console.log(weakMeta.get(metaKey).id); // 1


/********************************************************
 * 4️⃣ HASHBANG GRAMMAR
 *
 * Standardizes the use of `#!/usr/bin/env node`
 * at the top of executable JavaScript files in Unix.
 * Before this, build tools sometimes choked on the non-JS syntax.
 * Now it is officially supported in the ECMAScript spec.
 ********************************************************/

// Example (needs to be exact line 1)
// #!/usr/bin/env node
console.log("This file can be executed directly via terminal in Linux/Mac!");
