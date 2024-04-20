// TOPIC: Functions

// Declaration of a function named logger
function logger() {
  console.log('My name is Jonas');
}

// Invoking the logger function multiple times
logger();

// Function that processes fruit and returns juice
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

// Using the fruitProcessor function to make apple juice and apple-orange juice
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);


// Function declaration
function calcAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}
const age1 = calcAge(1999);
console.log(age1);

// Function expression
const calcAge2 = function (birthYear) {
  return new Date().getFullYear() - birthYear;
};
const age2 = calcAge2(1991);
console.log(age2);


// Arrow functions

// Arrow function to calculate age
const calcAge3 = birthYear => new Date().getFullYear() - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

// Arrow function to calculate years until retirement
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = new Date().getFullYear() - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, 'Akhlaque'));
console.log(yearsUntilRetirement(1980, 'Ashfaque'));


// Functions Calling Other Functions

// Function to cut fruit into pieces
function cutFruitPieces(fruit) {
  return fruit * 4;
}

// Function to process fruit and make juice
function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));


// Functions Accepting Callback Functions

// Function to convert string to single word
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// Function to convert first word to uppercase
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function to transform a string
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);


// Functions Returning Functions

// Function to create a greeting
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// Creating greetings and invoking them
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge: Function to create a greeting using arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Jonas');


// Function Scope and Closures
function outerFunction() {
  const outerVar = 'I am in outer scope';

  function innerFunction() {
    const innerVar = 'I am in inner scope';
    console.log(outerVar); // Accessible
  }

  innerFunction();
  // console.log(innerVar); // Error: innerVar is not defined
}

// Closures
function createCounter() {
  let count = 0;

  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Higher-order Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function calculate(operation, a, b) {
  return operation(a, b);
}

console.log(calculate(add, 5, 3)); // 8
console.log(calculate(subtract, 10, 4)); // 6

// Function Currying and Partial Application
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10



// Recursion
function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(5)); // 120

// Immediately Invoked Function Expressions (IIFE)
(function () {
  const message = 'Hello, IIFE!';
  console.log(message);
})();

// Generator Functions

// Define a generator function to generate an infinite sequence of numbers
function* generateSequence() {
  let num = 1;
  while (true) {
    try {
      let value = yield num++; // Receive values from the outside and increment the number
      console.log('Received value:', value);
    } catch (error) {
      console.error('Error in generator:', error);
    }
  }
}

// Define another generator function to delegate to the previous one
function* generateCompositeSequence() {
  yield 'Start';
  yield* generateSequence(); // Delegate to generateSequence
  yield 'End';
}

// Create an instance of the composite generator
const sequence = generateCompositeSequence();

// Output the generated values
console.log(sequence.next().value); // Start
console.log(sequence.next().value); // 1
console.log(sequence.next(42).value); // Received value: 42
console.log(sequence.next().value); // 2
// console.log(sequence.throw('Error!')); // Error in generator: Error!
console.log(sequence.next().value); // End



// Async Functions and Promises
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function asyncFunction() {
  console.log('Async function starts');
  await delay(2000);
  console.log('Async function ends after delay');
}

asyncFunction();
