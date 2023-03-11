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
const staff = [ 'Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter' ];
const staffUnique = [ ...new Set(staff) ];
console.log(staffUnique);

console.log(
  new Set([ 'Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter' ]).size
);

console.log(new Set('jonasschmedtmann').size);

// => forEach With  Sets
const currenciesUnique = new Set([ 'USD', 'GBP', 'USD', 'EUR', 'EUR' ]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});