// Iteration: The for Loop

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

///////////////////////////////////////
// Looping Arrays, Breaking and Continuing

const years = [ 1991, 2007, 1969, 2020 ];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[ i ]);
}
console.log(ages);

// continue and break
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
