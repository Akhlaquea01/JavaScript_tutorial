// TOPIC: Destructuring

// =>SPREAD, because on RIGHT side of =
const arr2 = [ 1, 2, ...[ 3, 4 ] ];

// =>REST, because on LEFT side of =
const [ a1, b1, ...others ] = [ 1, 2, 3, 4, 5 ];
console.log(a1, b1, others);


// =>Objects
const { sat, ...weekdays } = {
  'sun': { open: '10', close: '18' },
  'mon': { open: '9', close: '19' },
  'tue': { open: '9', close: '19' },
  'wed': { open: '9', close: '19' },
  'thu': { open: '9', close: '19' },
  'fri': { open: '9', close: '21' },
  'sat': { open: '10', close: '18' },
};;
console.log(weekdays);

// =>Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[ i ];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [ 23, 5, 7 ];
add(...x1);


// TOPIC: The Spread Operator (...)

const arr3 = [ 7, 8, 9 ];
const badNewArr = [ 1, 2, arr3[ 0 ], arr3[ 1 ], arr3[ 2 ] ];
console.log(badNewArr);

const newArr = [ 1, 2, ...arr3 ];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

// =>Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [ ...str, ' ', 'S.' ];
console.log(letters);
console.log(...str);


// =>Mutating variables
let a2 = 111;
let b2 = 999;
const obj = { a2: 23, b2: 7, c2: 14 };
({ a2, b2 } = obj);
console.log(a2, b2);



// TOPIC: Destructuring Arrays
const arr = [ 2, 3, 4 ];
const a = arr[ 0 ];
const b = arr[ 1 ];
const c = arr[ 2 ];

const [ x, y, z ] = arr;
console.log(x, y, z);
console.log(arr);


// TOPIC: Nested destructuring
const nested = [ 2, 4, [ 5, 6 ] ];
const [ i, , [ j, k ] ] = nested;
console.log(i, j, k);

// TOPIC: Default values
const [ p = 1, q = 1, r = 1 ] = [ 8, 9 ];
console.log(p, q, r);
