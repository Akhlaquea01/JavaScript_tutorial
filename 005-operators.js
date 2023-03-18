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

// => Efficient way to use multiple || 
const orVal = "or";
if (orVal == 'or' || orVal == 'and' || orVal == 'xor') {
  console.log(orVal);
}
if ([ 'or', 'and', 'xor' ].includes(orVal)) {
  console.log(orVal);
}

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

// TOPIC: Equality Operators: == vs. ===
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');

const favourite = 22;

if (favourite === 23) {
  console.log('Cool! 23 is an amzaing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 9) {
  console.log('9 is also a cool number');
} else {
  console.log('Number is not 23 or 7 or 9');
}

if (favourite !== 23) console.log('Why not 23?');

//TOPIC:  Logical Operators
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);


const isTired = false;
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}

// Que:

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123

GOOD LUCK 😀
*/


const scoreDolphins = (97 + 112 + 80) / 3;
const scoreKoalas = (109 + 95 + 50) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log('Dolphins win the trophy 🏆');
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  console.log('Koalas win the trophy 🏆');
} else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >= 100) {
  console.log('Both win the trophy!');
} else {
  console.log('No one wins the trophy 😭');
}