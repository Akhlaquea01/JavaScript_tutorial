/*
=>A Set is an ordered collection of unique values, which means that it doesn't allow duplicate values.
=>You can use methods like add() to add elements, has() to check if an element exists, delete() to remove an element, and clear() to remove all elements.
=>Unlike arrays, Set does not provide direct access to elements by index, and it doesn't have key-value pairs. It's mainly used to store a list of unique values.

A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:

new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
set.add(value) – adds a value, returns the set itself.
set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.

The same methods Map has for iterators are also supported:

set.keys() – returns an iterable object for values,
set.values() – same as set.keys(), for compatibility with Map,
set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.
*/
// Creating a Set
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // Output: Set(3) { 'Pasta', 'Pizza', 'Risotto' }

// Creating a Set from a string
console.log(new Set('Jonas')); // Output: Set(5) { 'J', 'o', 'n', 'a', 's' }

// Set operations
console.log(ordersSet.size); // Output: 3
console.log(ordersSet.has('Pizza')); // Output: true
console.log(ordersSet.has('Bread')); // Output: false
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); // Adding duplicate element (ignored)
ordersSet.delete('Risotto'); // Deleting an element
console.log(ordersSet); // Output: Set(3) { 'Pasta', 'Pizza', 'Garlic Bread' }

// Iterating over a Set
for (const order of ordersSet) {
  console.log(order);
}

// Example: Removing duplicates from an array using Set
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; // Converting array to Set and back to array
console.log(staffUnique); // Output: [ 'Waiter', 'Chef', 'Manager' ]

// Set size and uniqueness
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); // Output: 3 (unique elements)

console.log(new Set('jonasschmedtmann').size); // Output: 11 (unique characters)

// forEach with Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});

// Converting a string to a Set
const myString = 'hello';
const mySet = new Set(myString);
console.log(mySet); // Output: Set { 'h', 'e', 'l', 'o' }
console.log(mySet.size); // Output: 4
const myArray = Array.from(mySet);
console.log(myArray); // Output: [ 'h', 'e', 'l', 'o' ]
for (let item of mySet) {
  console.log(item);
}
mySet.clear(); // Clearing the set
