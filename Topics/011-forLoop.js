// TOPIC: Iteration: The for Loop
// Simple for loop example
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// Using a for loop to calculate ages
const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// TOPIC: Breaking and Continuing
const firstName = 'Jonas';
const friends = ['Michael', 'Steven', 'Peter'];

const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];

// Using continue to skip non-string elements
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;
  console.log(jonas[i], typeof jonas[i]);
}

// Using break to stop loop execution on encountering a number
console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;
  console.log(jonas[i], typeof jonas[i]);
}

// Iterating through an array with entries() to access index and value
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// Using labeled break to exit outer loop
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input //= prompt(`Value at coords (${i},${j})`, '');
    if (!input) break outer; // Breaks out of both loops when input is empty
    // Process input...
  }
}

const fruits = ['apple', 'banana', 'cherry'];
const iterator = fruits.entries();
for (const [index, value] of iterator) {
  console.log(index, value);
}