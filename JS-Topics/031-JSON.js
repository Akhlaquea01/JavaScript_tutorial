/*******************************************************
 * TOPIC: JSON — JavaScript Object Notation
 *
 * JSON.stringify() turns a JS value into a JSON string
 * (for sending over a network, saving to storage, etc).
 * JSON.parse() does the reverse. Together they're the
 * standard way to serialize/deserialize data.
 *
 * Covers:
 *  1. Basic stringify / parse
 *  2. What gets silently dropped by stringify
 *  3. replacer & reviver functions
 *  4. Circular references — the classic failure case
 *******************************************************/


/********************************************************
 * 1️⃣ BASIC stringify / parse
 ********************************************************/

const user = { name: 'Alice', age: 30, isAdmin: false };

const json = JSON.stringify(user);
console.log(json);        // '{"name":"Alice","age":30,"isAdmin":false}'
console.log(typeof json); // "string" — it's plain text now, not an object

const parsedBack = JSON.parse(json);
console.log(parsedBack);            // { name: 'Alice', age: 30, isAdmin: false }
console.log(parsedBack === user);   // false — a brand new object, not the original reference


/********************************************************
 * 2️⃣ WHAT stringify SILENTLY DROPS
 *
 * JSON has no concept of functions, undefined, or Symbols —
 * stringify just omits them instead of throwing.
 ********************************************************/

const withExtras = {
    name: 'Bob',
    greet: function () { console.log('hi'); }, // dropped
    nickname: undefined,                        // dropped
    id: Symbol('id'),                           // dropped
    age: 25
};

console.log(JSON.stringify(withExtras)); // '{"name":"Bob","age":25}' — functions/undefined/Symbols vanish


/********************************************************
 * 3️⃣ replacer & reviver — CUSTOMIZING THE PROCESS
 *
 * stringify's 2nd argument (replacer) can filter/transform
 * each key-value pair as it's serialized.
 * parse's 2nd argument (reviver) does the same in reverse,
 * as each pair is deserialized.
 ********************************************************/

const product = { name: 'Laptop', price: 1200, internalCode: 'X99' };

const publicJson = JSON.stringify(product, (key, value) => {
    if (key === 'internalCode') return undefined; // strip internal-only fields before sending to a client
    return value;
});
console.log(publicJson); // '{"name":"Laptop","price":1200}'

const withDate = JSON.parse('{"event":"launch","date":"2026-01-01"}', (key, value) => {
    if (key === 'date') return new Date(value); // revive plain strings back into real Date objects
    return value;
});
console.log(withDate.date instanceof Date); // true


/********************************************************
 * 4️⃣ CIRCULAR REFERENCES — stringify's BLIND SPOT
 *
 * JSON.stringify() throws "Converting circular structure
 * to JSON" if an object references itself, directly or
 * indirectly — there's no way to represent a cycle in the
 * JSON format. A replacer function is how you break the
 * cycle manually before it becomes a problem.
 ********************************************************/

let room = { number: 23 };
let meetup = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room
};

// Wire up a circular reference on purpose, to demonstrate the failure:
room.occupiedBy = meetup; // room -> meetup
meetup.self = meetup;     // meetup -> itself

// JSON.stringify(meetup); // would throw: TypeError: Converting circular structure to JSON

// Fix: use a replacer to skip the properties that create the cycle
let serializedMeetup = JSON.stringify(meetup, function replacer(key, value) {
    if (key === 'self' || key === 'occupiedBy') {
        return undefined; // drop these — they're what caused the cycle
    }
    return value;
});

console.log(serializedMeetup);
// '{"title":"Conference","place":{"number":23}}'

let deserializedMeetup = JSON.parse(serializedMeetup);
console.log(deserializedMeetup); // a clean object, no circular structure to worry about


/********************************************************
 * 5️⃣ INTERVIEW NOTES
 *
 * ✔ stringify silently drops functions, undefined, and
 *   Symbols — it does NOT throw for those.
 * ✔ stringify DOES throw for circular references — that's
 *   the one case you must handle explicitly (replacer, or
 *   a library like `flatted`).
 * ✔ `structuredClone(obj)` (see 013) can deep-clone objects
 *   that DO contain circular references — JSON.stringify
 *   can't be used for that at all.
 * ✔ JSON.parse(JSON.stringify(x)) is a common "cheap deep
 *   clone" trick — but it shares JSON's same limitations
 *   (loses functions/undefined/Symbols, dates become strings).
 *
 * KEY: JSON is a TEXT format with a small set of supported
 * types (string, number, boolean, null, array, plain object)
 * — anything outside that set needs manual handling.
 ********************************************************/
