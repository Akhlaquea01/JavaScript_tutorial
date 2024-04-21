// Spread operator in arrays
const arr2 = [1, 2, ...[3, 4]]; // Spread operator
console.log(arr2);

// Rest pattern in arrays
const [a1, b1, ...others] = [1, 2, 3, 4, 5]; // Rest pattern
console.log(a1, b1, others);

// Destructuring objects and extracting properties
const { sat, ...weekdays } = {
  'sun': { open: '10', close: '18' },
  'mon': { open: '9', close: '19' },
  'tue': { open: '9', close: '19' },
  'wed': { open: '9', close: '19' },
  'thu': { open: '9', close: '19' },
  'fri': { open: '9', close: '21' },
  'sat': { open: '10', close: '18' },
};
console.log(weekdays);

// Rest parameters in functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
const x1 = [23, 5, 7];
add(...x1);

// Spread operator in arrays
const arr3 = [7, 8, 9];
const newArr = [1, 2, ...arr3]; // Spread operator
console.log(newArr);

// Iterating over iterables with spread
const str = 'Jonas';
const letters = [...str, ' ', 'S.']; // Spread operator
console.log(letters);

// Mutating variables using destructuring
let a2 = 111;
let b2 = 999;
const obj = { a2: 23, b2: 7, c2: 14 };
({ a2, b2 } = obj); // Destructuring assignment
console.log(a2, b2);

// Destructuring arrays
const arr = [2, 3, 4];
const [x, y, z] = arr; // Destructuring assignment
console.log(x, y, z);

// Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; // Destructuring assignment
console.log(i, j, k);

// Default values in destructuring
const [p = 1, q = 1, r = 1] = [8, 9]; // Default values
console.log(p, q, r);
