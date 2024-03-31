// TOPIC: Taking Decisions: if-else Statements
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

const day = 'friday';
if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}


//Que:
/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/


const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Marks's (${BMIMark})!`);
}

// TOPIC: The Conditional (Ternary) Operator

age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');
console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);



/*No break/continue to the right side of ‘?’
Please note that syntax constructs that are not expressions cannot be used with the ternary operator ?. In particular, directives such as break/continue aren’t allowed there.

For example, if we take this code:*/

if (11 > 5) {
  console.log(11);
} else {
  // continue;
}
// …and rewrite it using a question mark:

(11 > 5) ? console.log(11) : ''; //continue;
/* continue isn't allowed here
…it stops working: there’s a syntax error.
This is just another reason not to use the question mark operator ? instead of if.*/



// If you have to execute a function only if condition is true:
if (1 == 1) {
  doSomething();
}

// You can use short-circuit:
1 == 1 && doSomething();

function doSomething() {
  console.log("doSomething");
};