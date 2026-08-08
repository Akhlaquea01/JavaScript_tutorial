/*******************************************************
 * TOPIC: DATE & Intl DATE/STRING FORMATTING
 *
 * Covers:
 *  1. Creating Date objects
 *  2. Reading & formatting date components
 *  3. Modifying dates & date arithmetic
 *  4. Intl.DateTimeFormat — locale-aware date formatting
 *  5. Intl.Collator — locale-aware string comparison/sorting
 *******************************************************/


/********************************************************
 * 1️⃣ CREATING DATE OBJECTS
 ********************************************************/

// Creating a new Date object representing the current date and time
const now = new Date();
console.log(now);

// Creating Date objects using different date string formats
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

// Creating Date objects using specified date components
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

// Creating Date objects from timestamps
console.log(new Date(0)); // Epoch time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Three days later

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 (November)
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 (Thursday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // "2037-11-19T21:23:00.000Z"
console.log(future.getTime()); // Milliseconds since Jan 1, 1970
console.log(future.toString()); // "Thu Nov 19 2037 15:23:00 GMT+0530 (India Standard Time)"
console.log(future.toDateString()); // "Thu Nov 19 2037"
console.log(future.toTimeString()); // "15:23:00 GMT+0530 (India Standard Time)"
console.log(future.toUTCString()); // "Sun, 19 Nov 2037 09:53:00 GMT"
console.log(future.toJSON()); // "2037-11-19T21:23:00.000Z"
console.log(future.toLocaleString()); // "11/19/2037, 3:23:00 PM"
console.log(future.toLocaleDateString()); // "11/19/2037"
console.log(future.toLocaleTimeString()); // "3:23:00 PM"

// Creating Date objects from timestamps
console.log(new Date(2142256980000)); // Sun Jan 17 2038 19:33:00 GMT+0530 (India Standard Time)

// Getting the current timestamp
console.log(Date.now()); // Milliseconds since Jan 1, 1970

// Modifying date components
future.setFullYear(2040);
console.log(future); // Sun Nov 19 2040 15:23:00 GMT+0530 (India Standard Time)

// Operations with dates
const future2 = new Date(2037, 10, 19, 15, 23);
console.log(+future2); // Convert to timestamp

// Calculating days passed between two dates
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// Getting the current weekday
console.log(now.toLocaleString('default', { weekday: "long" })); // e.g., "Wednesday"


/********************************************************
 * 4️⃣ Intl.DateTimeFormat — LOCALE-AWARE DATE FORMATTING
 *
 * toLocaleString/toLocaleDateString (used above) are
 * actually shorthand for creating an Intl.DateTimeFormat
 * under the hood. Using it directly is preferable when you
 * need to format the SAME date many times — you build the
 * formatter once and reuse it, instead of re-parsing the
 * options on every call.
 ********************************************************/

const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
console.log(formatter.format(future)); // "Thursday, 19 November 2037"

// Same date, different locale — notice month/day order and separators both change:
console.log(new Intl.DateTimeFormat('en-US').format(future)); // "11/19/2037"
console.log(new Intl.DateTimeFormat('de-DE').format(future)); // "19.11.2037"
console.log(new Intl.DateTimeFormat('ja-JP').format(future)); // "2037/11/19"


/********************************************************
 * 5️⃣ Intl.Collator — LOCALE-AWARE STRING COMPARISON
 *
 * Plain `<`/`>`/.sort() compare strings byte-by-byte
 * (UTF-16 code unit order), which does NOT match how
 * humans alphabetize in most languages — accented letters
 * in particular sort "wrong" with a plain comparison.
 * Intl.Collator fixes this.
 ********************************************************/

const words = ['café', 'cafe', 'cafeteria', 'able'];

console.log([...words].sort()); // plain sort — 'café' may land in a surprising spot (compares raw code units)

const collator = new Intl.Collator('en', { sensitivity: 'base' }); // 'base' = ignore accents when comparing
console.log([...words].sort(collator.compare)); // ['able', 'cafe', 'café', 'cafeteria'] — sorted the way a human expects


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Month is 0-indexed in the Date constructor/getMonth()
 *   (0 = January, 10 = November) — a classic off-by-one trap.
 * ✔ Date arithmetic works because a Date coerces to its
 *   timestamp (milliseconds since epoch) with `+date` or
 *   subtraction — that's what calcDaysPassed relies on above.
 * ✔ Prefer building an Intl.DateTimeFormat/Collator instance
 *   ONCE and reusing it, rather than calling
 *   toLocaleString/.sort() repeatedly with the same options —
 *   better performance for repeated formatting/sorting.
 * ✔ Never assume a specific toLocaleString() output format —
 *   it varies by user locale/browser; only rely on it for
 *   display, never for parsing back or exact string matching.
 *
 * KEY: Date handles the underlying timestamp math; Intl
 * handles presenting dates (and strings) the way a human
 * in a given locale actually expects to read them.
 ********************************************************/
