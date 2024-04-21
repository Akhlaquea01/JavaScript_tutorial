/*
Map:

=>A Map is an ordered collection of key-value pairs, where each key is unique. It allows you to associate values with keys, making it easy to store and retrieve data.
Keys can be of any data type, including objects, functions, and primitive types (e.g., strings, numbers).
=>Map maintains the order of insertion, which means the keys and values are stored in the same order in which they were added.
=>You can use methods like set() to add key-value pairs, get() to retrieve values by key, has() to check if a key exists, delete() to remove a key-value pair, and clear() to remove all entries.

Methods and properties are:

new Map() – creates the map.
map.set(key, value) – stores the value by the key.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the element (the key/value pair) by the key.
map.clear() – removes everything from the map.
map.size – returns the current element count.

For looping over a map, there are 3 methods:

map.keys() – returns an iterable for keys,
map.values() – returns an iterable for values,
map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
*/
// Convert object to map
const openingHours = {
  'sun': { open: '10', close: '18' },
  'mon': { open: '9', close: '19' },
  'tue': { open: '9', close: '19' },
  'wed': { open: '9', close: '19' },
  'thu': { open: '9', close: '19' },
  'fri': { open: '9', close: '21' },
  'sat': { open: '10', close: '18' },
};

const hoursMap = new Map(Object.entries(openingHours));

// Accessing opening and closing hours for a specific day
const day = 'mon';
if (hoursMap.has(day)) {
  const { open, close } = hoursMap.get(day);
  console.log(`On ${day}, we are open from ${open} to ${close}.`);
} else {
  console.log(`No information available for ${day}.`);
}

// Iterating through all days and their hours
for (const [day, hours] of hoursMap) {
  const { open, close } = hours;
  console.log(`On ${day}, we are open from ${open} to ${close}.`);
}

// Quiz app using Map
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

console.log(question.get('question')); // Get the question

// Display all options
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
console.log(question.get(question.get('correct') === answer)); // Check if the answer is correct

// Convert map to array
console.log([...question]); // Convert the map to an array
console.log([...question.keys()]); // Get all keys as an array
console.log([...question.values()]); // Get all values as an array

// Map fundamentals
const rest = new Map();
rest
  .set('name', 'Classico Italiano')
  .set(1, 'Firenze, Italy')
  .set(2, 'Lisbon, Portugal')
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name')); // Get the name of the restaurant
console.log(rest.get(true)); // Get the opening message when true
console.log(rest.get(1)); // Get the location
console.log(rest.has('categories')); // Check if categories key exists
rest.delete(2); // Delete the second key-value pair
console.log(rest.size); // Get the size of the map

// Iterate through map using forEach
rest.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// More ways to iterate through a map
for (const [key, value] of rest) {
  console.log(`${key}: ${value}`);
}

for (const key of rest.keys()) {
  console.log(key);
}

for (const value of rest.values()) {
  console.log(value);
}

for (const [key, value] of rest.entries()) {
  console.log(`${key}: ${value}`);
}

// Merge two maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const merged = new Map([...currencies, ...rest]);
console.log(merged.get('USD')); // Get the currency value for USD
console.log(merged.get(1)); // Get the location value for key 1

// Convert map to array and vice versa
const myMap = new Map([[1, 'one'], [2, 'two']]);
console.log(Array.from(myMap)); // Convert map to array
console.log([...myMap]); // Another way to convert map to array
const myMapArray = [['key1', 'value1'], ['key2', 'value2']];
console.log(new Map(myMapArray)); // Convert array to map
