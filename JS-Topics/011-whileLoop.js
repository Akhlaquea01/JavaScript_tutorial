// TOPIC: while Loop

// Example 1: Basic while loop for repetitions
let rep = 1;
while (rep <= 10) {
    console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
    rep++;
}

// Example 2: Roll a dice until you get a 6
let dice;
do {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`You rolled a ${dice}`);
} while (dice !== 6);
console.log('Loop is about to end...');

// TOPIC: Do While

// Example 3: Basic do-while loop for iterating
let text = "";
let i = 0;
do {
    text += "The number is " + i;
    i++;
} while (i < 10);
console.log(text);
