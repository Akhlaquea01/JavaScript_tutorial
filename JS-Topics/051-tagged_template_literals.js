/*******************************************************
 * TOPIC: TAGGED TEMPLATE LITERALS
 *
 * A "tag" is a function placed right before a template
 * literal (no parentheses, no dot). Instead of the template
 * being auto-converted to a string, the tag function
 * receives the raw string PIECES and the interpolated
 * VALUES separately, and gets full control over the output.
 *
 * Covers:
 *  1. Regular vs tagged template literals
 *  2. Anatomy: strings array + values
 *  3. Practical use: sanitizing/escaping user input
 *  4. Practical use: a mini i18n-style formatter
 *  5. raw strings via String.raw
 *******************************************************/


/********************************************************
 * 1️⃣ REGULAR vs TAGGED TEMPLATE LITERALS
 ********************************************************/

const name = 'Akhlaque';
console.log(`Hello, ${name}!`); // regular template literal -> immediately becomes a string

function tag(strings, ...values) {
    console.log(strings); // the literal text pieces, split around each ${}
    console.log(values);  // the interpolated values, in order
    return 'tag decided the output';
}

console.log(tag`Hello, ${name}!`); // tagged — `tag` intercepts everything before any string is built


/********************************************************
 * 2️⃣ ANATOMY OF THE TAG FUNCTION
 *
 * For `` tag`a${x}b${y}c` ``:
 *   strings = ['a', 'b', 'c']   (always 1 more than the number of values)
 *   values  = [x, y]
 * The tag function decides how to stitch these back together.
 ********************************************************/

function rebuild(strings, ...values) {
    // Reconstructing the default (regular template literal) behavior manually:
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] !== undefined ? values[i] : '');
    }, '');
}

const price = 42;
console.log(rebuild`The price is $${price}.00`); // "The price is $42.00" — same as a plain template literal


/********************************************************
 * 3️⃣ PRACTICAL USE: ESCAPING/SANITIZING VALUES
 *
 * Only the INTERPOLATED VALUES came from outside — the
 * string pieces are always literal, trusted code. A tag
 * can escape just the untrusted parts before combining them.
 ********************************************************/

function escapeHtml(strings, ...values) {
    const escape = (str) => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return strings.reduce((result, str, i) => {
        const value = values[i] !== undefined ? escape(values[i]) : '';
        return result + str + value;
    }, '');
}

const userInput = '<script>alert("hi")</script>';
console.log(escapeHtml`User said: ${userInput}`);
// "User said: &lt;script&gt;alert(\"hi\")&lt;/script&gt;" — safe to insert into HTML


/********************************************************
 * 4️⃣ PRACTICAL USE: FORMATTING VALUES CONSISTENTLY
 *
 * A tag can apply consistent formatting rules to every
 * interpolated value automatically, instead of formatting
 * each ${} call site by hand.
 ********************************************************/

function currency(strings, ...values) {
    const formatted = values.map(v =>
        typeof v === 'number' ? `$${v.toFixed(2)}` : v
    );
    return strings.reduce((result, str, i) => result + str + (formatted[i] ?? ''), '');
}

const total = 19.5;
console.log(currency`Your total is ${total}`); // "Your total is $19.50" — auto-formatted, no .toFixed() at the call site


/********************************************************
 * 5️⃣ String.raw — ACCESSING THE UN-ESCAPED SOURCE TEXT
 *
 * Tag functions also receive `strings.raw`, the pieces
 * exactly as typed, BEFORE escape sequences like \n are
 * processed. `String.raw` is a built-in tag that uses this.
 ********************************************************/

console.log(`Line1\nLine2`);       // an actual newline — \n was processed
console.log(String.raw`Line1\nLine2`); // "Line1\nLine2" — literal backslash-n, never processed

// Useful for things like file paths or regex source strings where you don't want \ to be an escape char.
console.log(String.raw`C:\Users\name`); // "C:\Users\name" — not mangled by escape processing


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ The most famous real-world example is `styled-components`
 *   in React: `` styled.div`color: red;` `` — the tag parses
 *   CSS out of a template literal.
 * ✔ Tag functions receive strings/values SEPARATELY —
 *   nothing is concatenated for you; that's the whole point.
 * ✔ `strings.raw` gives you the un-escaped source text,
 *   which `String.raw` uses internally.
 * ✔ This is the standard way to build a safe, reusable
 *   escaping/formatting layer around template literals.
 *
 * KEY: a tag function turns a template literal from "build
 * a string" into "call a function with structured pieces of
 * a string" — giving you a hook to transform the result.
 ********************************************************/
