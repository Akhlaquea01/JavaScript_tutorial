////////////////////////////////////
// Linking a JavaScript File
let js = "amazing";
console.log(40 + 8 + 23 - 10);

////////////////////////////////////
// Values and Variables
console.log("Jonas");
console.log(23);
console.log(js);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";


////////////////////////////////////
// Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);

console.log(typeof true);
console.log(typeof 23);
console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);

////////////////////////////////////
// let, const and var
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990; // Error

var job = 'programmer';
job = 'teacher';

lastName = 'Schmedtmann';
console.log(lastName);

////////////////////////////////////
// Basic Operators
// Math operators
const yearNow = 2037;
const ageJonas1 = yearNow - 1991;
const ageSarah1 = yearNow - 2018;
console.log(ageJonas1, ageSarah1);

console.log(ageJonas1 * 2, ageJonas1 / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName2 = 'Jonas';
const lastName2 = 'Schmedtmann';
console.log(firstName2 + ' ' + lastName2);

// Assignment operators
let z = 10 + 5; // 15
z += 10; // x = x + 10 = 25
z *= 4; // x = x * 4 = 100
z++; // x = x + 1
z--;
z--;
console.log(z);

// Comparison operators
console.log(ageJonas1 > ageSarah1); // >, <, >=, <=
console.log(ageSarah1 >= 18);

const isFullAge = ageSarah1 >= 18;

console.log(yearNow - 1991 > yearNow - 2018);

////////////////////////////////////
// Operator Precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);

////////////////////////////////////
// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;


const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);

///////////////////////////////////////
// Logical Assignment Operators
const rest1 = {
    name: 'Capri',
    // numGuests: 20,
    numGuests: 0,
  };
  
  const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni Rossi',
  };
  
  // OR assignment operator
  // rest1.numGuests = rest1.numGuests || 10;
  // rest2.numGuests = rest2.numGuests || 10;
  // rest1.numGuests ||= 10;
  // rest2.numGuests ||= 10;
  
  // nullish assignment operator (null or undefined)
  rest1.numGuests ??= 10;
  rest2.numGuests ??= 10;
  
  // AND assignment operator
  // rest1.owner = rest1.owner && '<ANONYMOUS>';
  // rest2.owner = rest2.owner && '<ANONYMOUS>';
  rest1.owner &&= '<ANONYMOUS>';
  rest2.owner &&= '<ANONYMOUS>';
  
  console.log(rest1);
  console.log(rest2);
  
  
  ///////////////////////////////////////
  // The Nullish Coalescing Operator
  restaurant.numGuests = 0;
  const guests = restaurant.numGuests || 10;
  console.log(guests);
  
  // Nullish: null and undefined (NOT 0 or '')
  const guestCorrect = restaurant.numGuests ?? 10;
  console.log(guestCorrect);
  
  ///////////////////////////////////////
  // Short Circuiting (&& and ||)
  
  console.log('---- OR ----');
  // Use ANY data type, return ANY data type, short-circuiting
  console.log(3 || 'Jonas');
  console.log('' || 'Jonas');
  console.log(true || 0);
  console.log(undefined || null);
  
  console.log(undefined || 0 || '' || 'Hello' || 23 || null);
  
  restaurant.numGuests = 0;
  const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(guests1);
  
  const guests2 = restaurant.numGuests || 10;
  console.log(guests2);
  
  console.log('---- AND ----');
  console.log(0 && 'Jonas');
  console.log(7 && 'Jonas');
  
  console.log('Hello' && 23 && null && 'jonas');
  
  // Practical example
  if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
  }
  
  restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
  
  