// TOPIC: Taking Decisions: if-else Statements

// If-else statements allow us to execute different code blocks based on conditions.

// Execute different tasks based on the day of the week.
const currentDay = 'friday';
if (currentDay === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (currentDay === 'tuesday') {
  console.log('Prepare theory videos');
} else if (currentDay === 'wednesday' || currentDay === 'thursday') {
  console.log('Write code examples');
} else if (currentDay === 'friday') {
  console.log('Record videos');
} else if (currentDay === 'saturday' || currentDay === 'sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}


// TOPIC: The Conditional (Ternary) Operator

// The ternary operator provides a concise way to write if-else statements.

const userAge = 15;
userAge >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');

// It can also be used in template literals for dynamic content.
console.log(`I like to drink ${userAge >= 18 ? 'wine 🍷' : 'water 💧'}`);

// TOPIC: Short-circuit Evaluation

/*
  Short-circuit evaluation is a technique used in logical expressions where the second argument is only evaluated if the first argument does not suffice to determine the value of the expression.
*/

// Example 1: Using && operator for conditional execution
// If the condition on the left is false, the right-side expression isn't evaluated.
const isAuthenticated = true;
const userLoggedIn = isAuthenticated && 'User is logged in';
console.log(userLoggedIn); // Output: User is logged in

// Example 2: Using || operator for fallback values
// If the first operand evaluates to true, the second operand isn't evaluated.
const defaultName = 'Guest';
const username = ''; // Assume this is provided by user input
const displayName = username || defaultName;
console.log(displayName); // Output: Guest (if username is an empty string)
