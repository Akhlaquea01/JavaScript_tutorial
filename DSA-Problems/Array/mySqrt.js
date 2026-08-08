/**
 * @param {number} x
 * @return {number}
 */
function mySqrt(x) {
    let i = 0;

    // Incrementally test each number
    while (i * i <= x) {
        i++;
    }

    // The square root is the last value before overshooting
    return i - 1;
}

// Example Test Cases
console.log(mySqrt(4));  // Output: 2
console.log(mySqrt(8));  // Output: 2
console.log(mySqrt(16)); // Output: 4
console.log(mySqrt(0));  // Output: 0
console.log(mySqrt(1));  // Output: 1
