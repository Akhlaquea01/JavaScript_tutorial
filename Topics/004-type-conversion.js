// TOPIC: Type Conversion

// Converting string to number using Number constructor
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

// Converting non-numeric string to NaN
console.log(Number('Jonas'));
console.log(typeof NaN);

// Converting number to string using String constructor
console.log(String(23), 23);


// TOPIC: Type Coercion

// Implicit type coercion: Number to string concatenation
console.log('I am ' + 23 + ' years old');

// Implicit type coercion: String to number subtraction and division
console.log('23' - '10' - 3);
console.log('23' / '2');

// Explicit type coercion: String to number and then back to string
let n = '1' + 1; // '11'
n = n - 1;
console.log(n);


// TOPIC: Truthy and Falsy Values

// Falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('Jonas')); // true
console.log(Boolean({})); // true
console.log(Boolean('')); // false
