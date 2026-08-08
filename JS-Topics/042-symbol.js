/*******************************************************
 * TOPIC: SYMBOL
 *
 * `Symbol` is JS's 7th primitive type. Every symbol is
 * GUARANTEED unique — even two symbols created with the
 * exact same description are never equal. This makes them
 * ideal for property keys that must never accidentally
 * collide with a string key (yours or a library's).
 *
 * Covers:
 *  1. Creating symbols — always unique
 *  2. Symbols as non-colliding object keys
 *  3. Symbols are hidden from normal enumeration
 *  4. Symbol.for — the global symbol registry
 *  5. Well-known symbols (Symbol.iterator and friends)
 *******************************************************/


/********************************************************
 * 1️⃣ CREATING SYMBOLS — ALWAYS UNIQUE
 *
 * The description passed to Symbol() is just for debugging
 * — it plays NO role in equality. Two symbols are only ever
 * equal to themselves.
 ********************************************************/

const sym1 = Symbol('id');
const sym2 = Symbol('id');

console.log(sym1 === sym2);       // false — same description, still two distinct symbols
console.log(typeof sym1);         // "symbol"
console.log(sym1.description);    // "id"


/********************************************************
 * 2️⃣ SYMBOLS AS NON-COLLIDING OBJECT KEYS
 *
 * Because every symbol is unique, using one as a property
 * key guarantees no other code — not even a well-meaning
 * library — can accidentally overwrite it with a same-named
 * string key.
 ********************************************************/

const ID = Symbol('id');

const user = {
    name: 'Akhlaque',
    [ID]: 12345, // computed key — stores under the symbol, not the string 'id'
    id: 'not the same key at all', // a completely separate, ordinary string key
};

console.log(user[ID]); // 12345
console.log(user.id);  // 'not the same key at all' — no collision between the two


/********************************************************
 * 3️⃣ SYMBOLS ARE HIDDEN FROM NORMAL ENUMERATION
 *
 * for...in, Object.keys/values/entries, and
 * JSON.stringify all SKIP symbol-keyed properties. This is
 * intentional — symbols are meant for "metadata" that
 * shouldn't clutter normal iteration.
 ********************************************************/

console.log(Object.keys(user));           // ['name', 'id'] — ID is invisible here
console.log(JSON.stringify(user));        // '{"name":"Akhlaque","id":"not the same key at all"}' — ID omitted entirely

// To see symbol keys, you need the dedicated method:
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]


/********************************************************
 * 4️⃣ Symbol.for — THE GLOBAL SYMBOL REGISTRY
 *
 * Unlike Symbol(), which always creates a NEW unique
 * symbol, Symbol.for(key) checks a GLOBAL registry first —
 * calling it twice with the same key returns the SAME symbol.
 * Useful when different parts of a codebase (or even
 * different realms, like an iframe) need to agree on one shared symbol.
 ********************************************************/

const a = Symbol.for('shared-key');
const b = Symbol.for('shared-key');
console.log(a === b); // true — same entry in the global registry, unlike plain Symbol()

console.log(Symbol.keyFor(a)); // 'shared-key' — look up the registry key from the symbol itself


/********************************************************
 * 5️⃣ WELL-KNOWN SYMBOLS
 *
 * JS itself uses specific built-in symbols as hooks the
 * engine looks for automatically. The most common one:
 * Symbol.iterator, which makes an object work with
 * for...of (see 043-generators_iterators.js for the full
 * custom-iterable walkthrough).
 ********************************************************/

const range = {
    from: 1,
    to: 3,
    [Symbol.iterator]() { // this well-known symbol is what for...of looks for
        let current = this.from;
        const last = this.to;
        return {
            next() {
                return current <= last
                    ? { value: current++, done: false }
                    : { value: undefined, done: true };
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3 — for...of found and used Symbol.iterator automatically
}


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Every Symbol() call produces a unique value — the
 *   description string is only for debugging/logging.
 * ✔ Symbol.for() is the ONE exception — it's an intentional
 *   shared-registry lookup, not a unique-creation call.
 * ✔ Symbol-keyed properties are invisible to for...in,
 *   Object.keys/entries, and JSON.stringify — they're a
 *   deliberate way to attach "hidden" metadata to an object.
 * ✔ Well-known symbols (Symbol.iterator, Symbol.asyncIterator,
 *   Symbol.hasInstance, etc.) are how JS lets you hook into
 *   built-in language behavior (for...of, instanceof, ...).
 *
 * KEY: reach for Symbol when you need a property key that
 * is GUARANTEED never to collide with anything else, or
 * when you want to hook into a built-in JS protocol.
 ********************************************************/
