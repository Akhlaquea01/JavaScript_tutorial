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

////////////////////////////////////
// TOPIC: Basic Operators
// TOPIC: Math operators
const yearNow = 2037;
const ageJonas1 = yearNow - 1991;
const ageSarah1 = yearNow - 2018;
console.log(ageJonas1, ageSarah1);

console.log(ageJonas1 * 2, ageJonas1 / 10, 2 ** 3); //INFO: 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName2 = 'Jonas';
const lastName2 = 'Schmedtmann';
console.log(firstName2 + ' ' + lastName2);

// TOPIC: Assignment operators
let z = 10 + 5; // 15
z += 10; // z = z + 10 = 25
z *= 4; // z = z * 4 = 100
z++; // z = z + 1 = 101
z--; // z = z - 1 = 100
z--; // z = z - 1 = 99
console.log(z);

// TOPIC: Comparison operators
console.log(ageJonas1 > ageSarah1); // >, <, >=, <=
console.log(ageSarah1 >= 18);

const isFullAge = ageSarah1 >= 18;

console.log(yearNow - 1991 > yearNow - 2018);

// TOPIC: Operator Precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);



// TOPIC: Logical Assignment Operators
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// TOPIC: OR assignment operator
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;
console.log(rest1);
console.log(rest2);
rest1.numGuests ||= 20;
rest2.numGuests ||= 20;

// TOPIC: nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// TOPIC: AND assignment operator
rest1.owner = rest1.owner && '<ANONYMOUS>';
rest2.owner = rest2.owner && '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);
rest1.owner &&= '<ANONYMOUS2>';
rest2.owner &&= '<ANONYMOUS2>';

console.log(rest1);
console.log(rest2);


// TOPIC: The Nullish Coalescing Operator
const restaurant = {};
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// TOPIC: Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// TOPIC: Short Circuiting (&& and ||)
// Use ANY data type, return ANY data type, short-circuiting

console.log('---- OR ----');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1, 'guests1');

const guests2 = restaurant.numGuests || 10;
console.log(guests2, 'guests2');

console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');
