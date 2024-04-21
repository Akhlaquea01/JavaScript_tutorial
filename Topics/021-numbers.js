/*Numeric conversion rules:

Value	Becomes
undefined	=>NaN
null	=> 0
true and false =>	1 and 0
string	Whitespaces (includes spaces, tabs \t, newlines \n etc.) from the start and end are removed. If the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives =>NaN.*/
// TOPIC: Converting and Checking Numbers

// Comparing integer and float numbers
console.log(23 === 23.0); // true

// Demonstrating floating-point arithmetic imprecision
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Converting strings to numbers
console.log(Number('23')); // 23
console.log(+'23'); // 23

// Parsing strings to integers
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN

// Parsing strings to floats
console.log(Number.parseInt('  2.5rem  ')); // 2
console.log(Number.parseFloat('  2.5rem  ')); // 2.5

// Checking for NaN (Not a Number)
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false (Infinity)

// Checking if a value is finite
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false (Infinity)

// Checking if a value is an integer
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false (Infinity)

// TOPIC: Math and Rounding

// Calculating square roots
console.log(Math.sqrt(25)); // 5

// Finding maximum and minimum values
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Generating random numbers
console.log(Math.trunc(Math.random() * 6) + 1); // Random number between 1 and 6

// Rounding numbers
console.log(Math.round(23.3)); // 23
console.log(Math.ceil(23.3)); // 24
console.log(Math.floor(23.9)); // 23

// Rounding decimals and converting to fixed precision
console.log((2.345).toFixed(2)); // "2.35"

// Performing modulo operation
console.log(5 % 2); // 1

// Demonstrating numeric separators for better readability
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

// Using BigInt for handling large numbers
console.log(2 ** 53 - 1); // 9007199254740991
console.log(2 ** 53 + 1); // 9007199254740992n

// Operations with BigInt
console.log(10000n + 10000n); // 20000n

// Checking BigInt values
console.log(typeof 20n); // bigint

// Dividing BigInt values
console.log(11n / 3n); // 3n

// Internationalizing Numbers (Intl)
const num = 3884764.23;
console.log(new Intl.NumberFormat('de-DE').format(num)); // 3.884.764,23

// Constants related to numbers
console.log(Number.MAX_VALUE); // Largest positive representable number
console.log(Number.MIN_VALUE); // Smallest positive representable number greater than 0
console.log(Number.POSITIVE_INFINITY); // Positive Infinity
console.log(Number.NEGATIVE_INFINITY); // Negative Infinity
console.log(Number.NaN); // Not a Number
console.log(Number.MAX_SAFE_INTEGER); // Largest integer value that can be accurately represented
console.log(Number.MIN_SAFE_INTEGER); // Smallest integer value that can be accurately represented

