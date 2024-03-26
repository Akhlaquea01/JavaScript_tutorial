// TOPIC: Iteration: The for Loop
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

const years = [ 1991, 2007, 1969, 2020 ];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[ i ]);
}
console.log(ages);

// TOPIC: Breaking and Continuing

const jonas = [ firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends ];

console.log('--- ONLY STRINGS ---');

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[ i ] !== 'string') continue;

  console.log(jonas[ i ], typeof jonas[ i ]);
}

console.log('--- BREAK WITH NUMBER ---');

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[ i ] === 'number') break;

  console.log(jonas[ i ], typeof jonas[ i ]);
}

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ];

for (const [ i, movement ] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)

    // do something with the value...
  }
}

console.log('Done!');