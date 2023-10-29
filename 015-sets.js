/*
=>A Set is an ordered collection of unique values, which means that it doesn't allow duplicate values.
=>You can use methods like add() to add elements, has() to check if an element exists, delete() to remove an element, and clear() to remove all elements.
=>Unlike arrays, Set does not provide direct access to elements by index, and it doesn't have key-value pairs. It's mainly used to store a list of unique values.
*/
// TOPIC: Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// => Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);

// => forEach With  Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// Set with string
const myString = "hello";
const mySet = new Set(myString);
console.log(mySet); // outputs Set {"h", "e", "l", "o"}
console.log(mySet.size);
const myArray = Array.from(mySet);
console.log(myArray); // outputs [1, 2, 3]
for (let item of mySet) {
  console.log(item);
}
mySet.clear();
