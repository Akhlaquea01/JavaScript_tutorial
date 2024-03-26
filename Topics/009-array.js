// TOPIC: Introduction to Arrays

const friends = [ 'Michael', 'Steven', 'Peter' ];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[ 0 ]);

console.log(friends.length);
console.log(friends[ friends.length - 1 ]);

friends[ 2 ] = 'Jay';
console.log(friends);

const firstName = 'Jonas';
const jonas = [ firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends ];
console.log(jonas);
console.log(jonas.length);


const calcAge = function (birthYeah) {
  return new Date().getFullYear() - birthYeah;
};
const years = [ 1990, 1967, 2002, 2010, 2018 ];

const ages = [ calcAge(years[ 0 ]), calcAge(years[ 1 ]), calcAge(years[ years.length - 1 ]) ];
console.log(ages);


// TOPIC: Basic Array Operations (Methods)
const friendsArray = [ 'Michael', 'Steven', 'Peter' ];

// => Add elements
const newLength = friendsArray.push('Jay'); //INFO: will return new length after pushing
console.log(newLength);

friendsArray.unshift('John');

// => Remove elements
friendsArray.pop(); // Last
const popped = friendsArray.pop();//Peter
console.log(popped);

friendsArray.shift(); // First

// => IndexOf
console.log(friendsArray.indexOf('Steven'));

// => LastIndexOf
console.log(friendsArray.lastIndexOf('Michael'));


// => Includes
friendsArray.push(23);
console.log(friendsArray.includes('Bob'));
console.log(friendsArray.includes(23));

if (friendsArray.includes('Steven')) {
  console.log('You have a friend called Steven');
}




let arr = [ 'a', 'b', 'c', 'd', 'e' ];

// TOPIC: SLICE

// => The slice() method returns selected elements in an array, as a new array.
// => The slice() method selects from a given start, up to a (not inclusive) given end.
// => The slice() method does not change the original array.

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); //last two value
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([ ...arr ]);

// TOPIC: SPLICE

// =>The splice() method adds and/or removes array elements.
// =>The splice() method overwrites the original array.
// => 3 onwards New elements(s) to be added.

let arrSplice = [ 'a', 'b', 'c', 'd', 'e' ];
console.log(arrSplice.splice(2)); //['c', 'd', 'e']
arrSplice.splice(-1);
console.log(arrSplice); //['a']
arrSplice.splice(1, 2, '1', '2', '3'); // ['a', '1', '2', '3']
console.log(arrSplice);

// TOPIC: REVERSE

// => The reverse() method reverses the order of the elements in an array.
// => The reverse() method overwrites the original array.

const arrRevrse = [ 'j', 'i', 'h', 'g', 'f' ];
console.log(arrRevrse.reverse());

// TOPIC: CONCAT

// => The concat() method concatenates (joins) two or more arrays.
// => The concat() method returns a new array, containing the joined arrays.
// => The concat() method does not change the existing arrays.

const letters = arr.concat(arrRevrse);
console.log(letters);
console.log([ ...arr, ...arrRevrse ]);

// TOPIC: JOIN

// => The join() method returns an array as a string.
// => The join() method does not change the original array.
// => Any separator can be specified. The default is comma (,).
console.log(letters.join(' -&- '));


// TOPIC: at Method

// => The at() method takes an integer value and returns the item at that index.
console.log(arr[ 0 ]);
console.log(arr.at(0));
console.log('jonas'.at(0));

console.log(arr[ arr.length - 1 ]);
console.log(arr.at(-1));
console.log('jonas'.at(-1));



// TOPIC: Looping Arrays: forEach

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ];
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// TOPIC: The filter Method
const deposit = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposit);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

const words = [ 'spray', null, 'elite', undefined, 'destruction', 0, false ];
const filterTruthyVal = words.filter(Boolean);
console.log(filterTruthyVal); //['spray', 'elite', 'destruction']

// TOPIC: The reduce Method

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[ 0 ]);
console.log(max);

const reduceArray = [ 1, 2, 3, 4, 5, 6 ];
// => 100 is initial acc value and it not provided will take first element on array
const val = reduceArray.reduce((acc, cur) => acc + cur, 100);
console.log(val);

// TOPIC: The Magic of Chaining Methods
const eurToUsd = 1.1;

const totalDepositsUSD = movements.filter(mov => mov > 0).map((mov, i, arr) => {
  return mov * eurToUsd;
}).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// TOPIC: Find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);


// TOPIC: SOME
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// TOPIC: EVERY
console.log(movements.every(mov => mov > 0));
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [ 1, 30, 39, 29, 10, 13 ];

console.log(array1.every(isBelowThreshold));

// TOPIC: Separate callback
const deposit2 = mov => mov > 0;
console.log(movements.some(deposit2));
console.log(movements.every(deposit2));
console.log(movements.filter(deposit2));

// TOPIC: Flat

// => A new array with the sub-array elements concatenated into it.
// =>The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

const arr4 = [ [ 1, 2, 3 ], [ 4, 5, 6 ], 7, 8 ];
console.log(arr4.flat());

const arrDeep = [ [ [ 1, 2 ], 3 ], [ 4, [ 5, 6 ] ], 7, 8 ];
console.log(arrDeep.flat(2));


// TOPIC: FlatMap

// => The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level.

const arr1 = [ 1, 2, [ 3 ], [ 4, 5 ], 6, [] ];
const flattened = arr1.flatMap(num => num);
console.log(flattened); // Expected output: Array [1, 2, 3, 4, 5, 6]


const arr2 = [ "it's Sunny in", "", "California" ];
arr2.map((x) => x.split(" ")); // [["it's","Sunny","in"],[""],["California"]]
arr2.flatMap((x) => x.split(" ")); // ["it's","Sunny","in", "", "California"]


// TOPIC: Sorting Arrays

// => Strings
const owners = [ 'Jonas', 'Zach', 'Adam', 'Martha' ];
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

console.log(Array.from([ 1, 2, 3 ], x => x + x)); // Expected output: Array [2, 4, 6]



// TOPIC: Object Destructuring on Array

const countries = [ 'India', 'Pakistan', 'Nepal', 'China' ];

const [ ind, , nep ] = countries;//,skipping by empty space,
console.log(ind);
console.log(nep);


// TOPIC: copyWithin
const array2 = [ 'a', 'b', 'c', 'd', 'e' ];
// Copy to index 0 the element at index 3
console.log(array2.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array2.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]

console.log([ 1, 2, 3, 4, 5 ].copyWithin(-2));
// [1, 2, 3, 1, 2]

console.log([ 1, , 3 ].copyWithin(2, 1, 2)); // [1, empty, empty]


// TOPIC: reduceRight()
const array3 = [[0, 1], [2, 3], [4, 5]];

const result = array3.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

console.log(result);
// Expected output: Array [4, 5, 2, 3, 0, 1]

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


// TOPIC: findIndex()
const array4 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array4.findIndex(isLargeNumber));
// TOPIC: findLast
const array5 = [5, 12, 50, 130, 44];

const found = array5.findLast((element) => element > 45);

console.log(found);
// Expected output: 130

// TOPIC: Form

console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]

const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]

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
