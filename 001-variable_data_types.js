// TOPIC: Values, Variable & Variable name conventions

console.log("Jonas");
console.log(23);
let js = "amazing";
console.log(js);


let akhlaque_ahmad = "AA";
let $function = 27;
let PI = 3.1415;


////////////////////////////////////
// TOPIC: Data Types
/*
Type	               typeof return value	             Object wrapper
Null	                "object"	                           N/A
Undefined	            "undefined"	                         N/A
Boolean	              "boolean"	                           Boolean
Number	              "number"	                           Number
BigInt	              "bigint"	                           BigInt
String	              "string"	                           String
Symbol	              "symbol"	                           Symbol
*/
// => NaN ("Not a Number") is a special kind of number value that's typically encountered when the result of an arithmetic operation cannot be expressed as a number. It is also the only value in JavaScript that is not equal to itself.
// => All primitive types, except null, can be tested by the typeof operator. typeof null returns "object", so one has to use === null to test for null.

// Boolean
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof true);
console.log(typeof javascriptIsFun);
const booleanValue = new Boolean(1 < 0);//false

// Number
console.log(typeof 23);

// String
console.log(typeof 'Jonas');
javascriptIsFun = 'YES!';
const string4 = new String("A String object");
console.log(string4);
console.log("cat".charAt(1)); // gives value "a"

// undefined
let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

// Null
console.log(typeof null);

// BigInt
const bigIntVal = BigInt(Number.MAX_SAFE_INTEGER); // 9007199254740991n
console.log(bigIntVal + 1n === bigIntVal + 2n); // false because 9007199254740992n and 9007199254740993n are unequal

//Symbol
const sym2 = Symbol("foo");
Symbol("foo") === Symbol("foo"); // false

////////////////////////////////////
// TOPIC: let, const and var
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990; // ERROR: we can't update a value to a constant

var job = 'programmer';
console.log(job);
job = 'teacher';
console.log(job);
