// TOPIC: setTimeout
const ingredients = [ 'olives', 'spinach' ];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// TOPIC: setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

// TOPIC: Perfornmance
const t0 = performance.now();
setTimeout(() => {
  const t1 = performance.now();
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
}, 200);