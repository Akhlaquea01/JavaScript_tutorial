/* TOPIC: Data Types
Type	               typeof return value	             Object wrapper
Null	                "object"	                         N/A
Undefined	            "undefined"	                         N/A
Boolean	              "boolean"	                           Boolean
Number	              "number"	                           Number
BigInt	              "bigint"	                           BigInt
String	              "string"	                           String
Symbol	              "symbol"	                           Symbol
=> NaN ("Not a Number") is a special kind of number value that's typically encountered when the result of an arithmetic operation cannot be expressed as a number. It is also the only value in JavaScript that is not equal to itself.
=> All primitive types, except null, can be tested by the typeof operator. typeof null returns "object", so one has to use === null to test for null.

*/

// Boolean
let isJavaScriptFun = true;
console.log(typeof isJavaScriptFun);
const booleanObject = new Boolean(1 < 0); // false

// String
console.log(typeof 'Jonas'); // string
const stringObject = new String("A String object");
console.log(stringObject); // "A String object"
console.log(stringObject.charAt(2)); // gives value "S"

// Undefined
let currentYear;
console.log(currentYear); // undefined
console.log(typeof currentYear); // undefined

// Null
console.log(typeof nullValue); // object

// BigInt
const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER); // 9007199254740991n
console.log(bigIntValue + 1n === bigIntValue + 2n); // false because 9007199254740992n and 9007199254740993n are unequal

// Number
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2; // true because both are 9007199254740992

console.log(typeof 23);

// Symbol
/*
A Symbol is a unique and immutable primitive value and may be used as the key of an Object property. In some programming languages, Symbols are called "atoms". The purpose of symbols is to create unique property keys that are guaranteed not to clash with keys from other code.
*/
const symbolValue = Symbol("foo");
Symbol("foo") === Symbol("foo"); // false

////////////////////////////////////
// TOPIC: let, const and var
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990; // ERROR: we can't update a value to a constant

var jobTitle = 'programmer';
console.log(jobTitle);
jobTitle = 'teacher';
console.log(jobTitle);


/* Variable naming
There are two limitations on variable names in JavaScript:

The name must contain only letters, digits, or the symbols $ and _.
The first character must not be a digit.
*/


// We can also declare multiple variables in one line:

let userName = 'John', userAge = 25, userMessage = 'Hello';
let $dollars = 1; // declared a variable with the name "$dollars"
let _underscore = 2; // and now a variable with the name "_underscore"


// Case matters
// Variables named apple and APPLE are two different variables.

// Non-Latin letters are allowed, but not recommended

let имя = '...';
let 我 = '...';