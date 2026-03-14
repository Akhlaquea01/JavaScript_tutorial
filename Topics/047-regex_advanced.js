/*******************************************************
 * TOPIC: REGEX GROUPS, LOOKAHEAD, & LOOKBEHIND
 *
 * Advanced Regular Expression features in Javascript.
 *
 * Covers:
 *  1. Capture Groups `()` and Backreferences `\1`
 *  2. Non-capturing Groups `(?:)`
 *  3. Named Capture Groups `(?<name>)` (ES2018)
 *  4. Lookahead `(?=)` and Negative Lookahead `(?!)`
 *  5. Lookbehind `(?<=)` and Negative Lookbehind `(?<!)` (ES2018)
 *******************************************************/


/********************************************************
 * 1️⃣ CAPTURE GROUPS & BACKREFERENCES
 *
 * Parentheses `()` group characters together and "capture"
 * the matched text. You can reference them later in the regex.
 ********************************************************/

// Example: Find repeated words (e.g., "the the")
// \1 points to the FIRST captured group
const regexRepeated = /(\b\w+\b)\s+\1/i;

console.log(regexRepeated.test("hello hello")); // true
console.log(regexRepeated.test("hello world")); // false

// Extracting parts
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const match = "Date is 2024-05-15".match(dateRegex);
console.log(match[0]); // "2024-05-15" (full match)
console.log(match[1]); // "2024" (Group 1 - Year)
console.log(match[2]); // "05"   (Group 2 - Month)
console.log(match[3]); // "15"   (Group 3 - Day)


/********************************************************
 * 2️⃣ NON-CAPTURING GROUPS (?:)
 *
 * Use `(?:)` when you need to group parts of a regex for
 * operations like `|` or `*`, but you don't need to extract
 * the text (saves memory).
 ********************************************************/

// Grouping "http://" or "https://" but we don't care about extracting it
const urlRegex = /(?:https?:\/\/)([\w.-]+)/;
const urlMatch = "Visit https://google.com".match(urlRegex);

console.log(urlMatch[1]); // "google.com" (Notice HTTP part isn't captured)


/********************************************************
 * 3️⃣ NAMED CAPTURE GROUPS (?<name>) — ES2018
 *
 * Give an explicit name to a group so you don't have
 * to rely on array indices.
 ********************************************************/

const namedDateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchName = "Date is 2024-05-15".match(namedDateRegex);

// Groups are stored in the `.groups` object
console.log(matchName.groups.year);  // "2024"
console.log(matchName.groups.month); // "05"
console.log(matchName.groups.day);   // "15"

// Replacing with named groups
const usDate = "2024-05-15".replace(namedDateRegex, "$<month>/$<day>/$<year>");
console.log(usDate); // "05/15/2024"


/********************************************************
 * 4️⃣ LOOKAHEAD (?=) & NEGATIVE LOOKAHEAD (?!)
 *
 * Assert that what follows matches (or doesn't match),
 * WITHOUT including it in the final matched result.
 ********************************************************/

// Positive Lookahead (?=)
// Find a number ONLY if it is followed by " USD"
const str1 = "It costs 100 USD or 90 EUR";
const usdRegex = /\d+(?= USD)/;
console.log(str1.match(usdRegex)[0]); // "100" (Notice " USD" is not part of the match)

// Negative Lookahead (?!)
// Find a number ONLY if it is NOT followed by " USD"
const notUsdRegex = /\d+(?! USD)/g;
console.log(str1.match(notUsdRegex)); // ["10", "90"] (Matches the 10 from 100 which isn't followed by USD, and 90)
// To match whole numbers not followed by USD: /\b\d+\b(?! USD)/


/********************************************************
 * 5️⃣ LOOKBEHIND (?<=) & NEGATIVE LOOKBEHIND (?<!) — ES2018
 *
 * Assert that what precedes matches (or doesn't match),
 * WITHOUT including it in the final matched result.
 ********************************************************/

// Positive Lookbehind (?<=)
// Match "Smith" ONLY if preceded by "John "
const str2 = "John Smith vs Agent Smith";
const johnSmithRegex = /(?<=John )Smith/;
console.log(str2.match(johnSmithRegex)[0]); // "Smith" (Matched the first one)

// Negative Lookbehind (?<!)
// Match "Smith" ONLY if NOT preceded by "John "
const otherSmithRegex = /(?<!John )Smith/;
console.log(str2.match(otherSmithRegex)[0]); // "Smith" (Matched the second one)


/********************************************************
 * 6️⃣ PRACTICAL INTERVIEW EXAMPLE: PASSWORD VALIDATION
 *
 * Using Lookaheads to enforce complex password rules:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 ********************************************************/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

console.log(passwordRegex.test("weak"));       // false
console.log(passwordRegex.test("Strong123"));  // true
console.log(passwordRegex.test("NoNumbersHere")); // false

/********************************************************
 * SUMMARY
 *
 * `(abc)`       → Capture Group (creates \1, groups result)
 * `(?:abc)`     → Non-capturing group (groups operations only)
 * `(?<id>abc)`  → Named capture group (access via .groups.id)
 * `X(?=Y)`      → Positive lookahead (X only if followed by Y)
 * `X(?!Y)`      → Negative lookahead (X only if NOT followed by Y)
 * `(?<=Y)X`     → Positive lookbehind (X only if preceded by Y)
 * `(?<!Y)X`     → Negative lookbehind (X only if NOT preceded by Y)
 ********************************************************/
