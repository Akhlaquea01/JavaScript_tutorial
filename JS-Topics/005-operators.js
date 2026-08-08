// TOPIC: Basic Operators

// TOPIC: Arithmetic Operators
// Perform mathematical operations such as addition, subtraction, multiplication, division, and exponentiation.
const currentYear = 2037;
const ageJonas = currentYear - 1991;
const ageSarah = currentYear - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3); //INFO: 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// TOPIC: Assignment Operators
// Assign values to variables and perform arithmetic operations at the same time.
let z = 10 + 5; // 15
z += 10; // z = z + 10 = 25
z *= 4; // z = z * 4 = 100
z++; // z = z + 1 = 101
z--; // z = z - 1 = 100
z--; // z = z - 1 = 99
console.log(z);

// TOPIC: Comparison Operators
// Compare values and return a boolean (true or false) based on the comparison result.
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isJonasFullAge = ageJonas >= 18;
console.log(currentYear - 1991 > currentYear - 2018);

// TOPIC: Operator Precedence
// Determines the order in which operators are evaluated when there are multiple operators in an expression.


console.log(currentYear - 1991 > currentYear - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);



// TOPIC: Logical Assignment Operators
// Combine logical operations with assignment in a concise way.
const restaurant1 = {
  name: 'Capri',
  numGuests: 0,
};

const restaurant2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// TOPIC: OR assignment operator
// Assign a value only if the variable is falsy (null, undefined, 0, false, NaN, or an empty string).
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10;
console.log(restaurant1);
console.log(restaurant2);

// TOPIC: Nullish Assignment Operator
// Assign a value only if the variable is null or undefined.
restaurant1.numGuests ??= 10;
restaurant2.numGuests ??= 10;

let height = 0;
console.log(height ?? 100); // 0

// TOPIC: AND assignment operator
// Assign a value only if the variable is truthy (not null, undefined, 0, false, NaN, or an empty string).
restaurant1.owner &&= '<ANONYMOUS>';
restaurant2.owner &&= '<ANONYMOUS>';
console.log(restaurant1);
console.log(restaurant2);


// TOPIC: The Nullish Coalescing Operator
// Returns the right-hand operand when the left-hand operand is null or undefined, otherwise returns the left-hand operand.
const restaurant = {};
restaurant.numGuests = 0;
const guests = restaurant.numGuests ?? 10;
console.log(guests);

// TOPIC: Short Circuiting (&& and ||)
// Use short-circuiting to evaluate expressions more efficiently and concisely.
console.log('---- OR ----');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'jonas');

// TOPIC: Equality Operators: == vs. ===
// Compare values for equality and strict equality.
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');

const favourite = 22;

if (favourite === 23) {
  console.log('Cool! 23 is an amazing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 9) {
  console.log('9 is also a cool number');
} else {
  console.log('Number is not 23, 7, or 9');
}

if (favourite !== 23) console.log('Why not 23?');

// TOPIC: Logical Operators
// Perform logical operations such as AND, OR, and NOT to evaluate conditions.
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const isTired = false;
console.log(hasDriversLicense && hasGoodVision && !isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}

// TOPIC: Comma Operator
/*
The comma operator , is one of the rarest and most unusual operators. Sometimes, it’s used to write shorter code, so we need to know it in order to understand what’s going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma ,. Each of them is evaluated but only the result of the last one is returned.

For example:
*/
let a = (1 + 2, 3 + 4);
console.log(a); // 7 (the result of 3 + 4)
