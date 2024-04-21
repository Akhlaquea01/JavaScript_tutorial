// TOPIC: setTimeout

// Creating a setTimeout to simulate pizza preparation
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

// Cancelling the setTimeout if spinach is one of the ingredients
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// TOPIC: setInterval

// Creating a setInterval to log the current time every second
const intervalTimer = setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

// TOPIC: Performance

// Measuring the performance of a setTimeout
const t0 = performance.now(); // Start time
setTimeout(() => {
  const t1 = performance.now(); // End time
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
}, 200);

