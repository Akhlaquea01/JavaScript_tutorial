// TOPIC: Introduction to Arrays

// TOPIC: Introduction to Arrays

// Definition: An array is a data structure that stores a collection of elements.

// Define an array of friends
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

// Create an array using the Array constructor
const years = new Array(1991, 1984, 2008, 2020);

// Access elements in the array
console.log(friends[0]); // Access the first element
console.log(friends.length); // Get the length of the array
console.log(friends[friends.length - 1]); // Access the last element

// Modify elements in the array
friends[2] = 'Jay'; // Replace an element
console.log(friends);

// Define a mixed array
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);


// Calculate ages from birth years
const ages = years.map(year => new Date().getFullYear() - year);
console.log(ages);


// TOPIC: Basic Array Operations (Methods)

// Add elements to the end of the array
const newLength = friends.push('Jay');
console.log(newLength);

// Add elements to the beginning of the array
friends.unshift('John');

// Remove elements from the end of the array
const popped = friends.pop();

// Remove elements from the beginning of the array
friends.shift();

// Find index of an element
console.log(friends.indexOf('Steven'));

// Find last index of an element
console.log(friends.lastIndexOf('Michael'));

// Check if an element exists in the array
console.log(friends.includes('Steven'));

// Slice elements from an array
console.log(friends.slice(1, 3));

// Splice elements in an array
friends.splice(1, 2, 'Bob', 'Alice');

// Reverse the order of elements in the array
console.log(friends.reverse());

// Concatenate arrays
const newFriends = ['Mary', 'David'];
const allFriends = friends.concat(newFriends);

// Join elements of an array into a string
console.log(allFriends.join(' - '));

// Access elements using the at() method
console.log(friends.at(0));

// Loop through array elements using forEach
movements.forEach((mov, i) => {
  console.log(`Movement ${i + 1}: ${mov > 0 ? 'Deposit' : 'Withdrawal'} ${Math.abs(mov)}`);
});

// Filter elements based on a condition
const deposits = movements.filter(mov => mov > 0);

// Reduce elements to a single value
const balance = movements.reduce((acc, cur) => acc + cur, 0);

// Find the first element matching a condition
const firstWithdrawal = movements.find(mov => mov < 0);

// Check if any element matches a condition
const anyDeposits = movements.some(mov => mov > 0);

// Check if all elements match a condition
const allDeposits = movements.every(mov => mov > 0);

// Flatten nested arrays
const nestedArray = [[1, 2, 3], [4, 5], 6];
const flattenedArray = nestedArray.flat();


// Sort arrays
const sortedNumbers = movements.sort((a, b) => a - b);

// Fill array with a specified value
const filledArray = new Array(5).fill(0);

// Create an array from a string or iterable object
const fromString = Array.from('hello');
const fromIterable = Array.from(new Set([1, 2, 3]));

// Destructure array elements
const [first, , third] = countries;

// Copy array elements within the same array
const arrayCopy = ['a', 'b', 'c', 'd', 'e'];
const copiedArray = arrayCopy.copyWithin(0, 3);

// Reduce array from right to left
const rightToLeft = [[0, 1], [2, 3], [4, 5]].reduceRight((acc, cur) => acc.concat(cur));

// Iterate over array entries
for (const [index, element] of array.entries()) {
  console.log(index, element);
}

// TOPIC: findIndex()
// Find index of an element in array
const largeNumberIndex = [5, 12, 8, 130, 44].findIndex(num => num > 13);
const array4 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array4.findIndex(isLargeNumber));

// Find last element in array
const lastElement = [5, 12, 50, 130, 44].slice().reverse().find(num => num > 45);


// TOPIC: Flat

// => A new array with the sub-array elements concatenated into it.
// =>The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

const arr4 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr4.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));


// TOPIC: FlatMap

// => The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level.

const arr1 = [1, 2, [3], [4, 5], 6, []];
const flattened = arr1.flatMap(num => num);
console.log(flattened); // Expected output: Array [1, 2, 3, 4, 5, 6]


const arr2 = ["it's Sunny in", "", "California"];
arr2.map((x) => x.split(" ")); // [["it's","Sunny","in"],[""],["California"]]
arr2.flatMap((x) => x.split(" ")); // ["it's","Sunny","in", "", "California"]


// TOPIC: Sorting Arrays

// => Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// => Numbers

// Ascending
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
movements.sort((a, b) => b - a);
console.log(movements);


// TOPIC: Fill method

// => fill(value, start, end)

const x = new Array(7);
console.log(x);
x.fill(1, 3, 5);
x.fill(1);
console.log(x);
x.fill(23, 2, 6);
console.log(x);

// TOPIC: Array.from
const y2 = Array.from({ length: 7 }, () => 1);
console.log(y2); //[1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

console.log(Array.from('foo')); // Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x)); // Expected output: Array [2, 4, 6]


console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]

const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]

// TOPIC: Object Destructuring on Array

const countries = ['India', 'Pakistan', 'Nepal', 'China'];

const [ind, , nep] = countries;//,skipping by empty space,
console.log(ind);
console.log(nep);


// TOPIC: copyWithin
const array2 = ['a', 'b', 'c', 'd', 'e'];
// Copy to index 0 the element at index 3
console.log(array2.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array2.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]

console.log([1, 2, 3, 4, 5].copyWithin(-2));
// [1, 2, 3, 1, 2]

console.log([1, , 3].copyWithin(2, 1, 2)); // [1, empty, empty]


// TOPIC: Entries()
const a = ["a", "b", "c"];

for (const [index, element] of a.entries()) {
  console.log(index, element);
}

// 0 'a'
// 1 'b'
// 2 'c'

const array = ["a", "b", "c"];
const arrayEntries = array.entries();

for (const element of arrayEntries) {
  console.log(element);
}

// [0, 'a']
// [1, 'b']
// [2, 'c']



// TOPIC: findLast
const array5 = [5, 12, 50, 130, 44];

const found = array5.findLast((element) => element > 45);

console.log(found);
// Expected output: 130



// TOPIC: Group
// Not supported yet in browsers
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];
// const result2 = inventory.group(({ type }) => type);
// console.log(result2);
/* Result is:
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
