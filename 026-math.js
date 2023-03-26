// TOPIC: MIN/MAX
const numbers = [ 6, 7, 4, 2, 7, 9, 99 ];
console.log(Math.max(...numbers));
console.log(Math.min(...numbers));

// TOPIC: ABS
function difference(a, b) {
    return Math.abs(a - b);
  }
  
  console.log(difference(3, 5));
  // Expected output: 2
  
  console.log(difference(5, 3));
  // Expected output: 2
  
  console.log(difference(1.23456, 7.89012));
  // Expected output: 6.6555599999999995