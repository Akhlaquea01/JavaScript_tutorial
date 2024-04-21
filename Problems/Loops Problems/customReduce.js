// Extend the Array prototype with a custom reduce method
Array.prototype.customReduce = function (callback, initialValue) {
    // Initialize an accumulator variable
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    // Iterate over each element of the array
    for (let i = startIndex; i < this.length; i++) {
        // Update the accumulator by applying the callback function to it
        accumulator = callback(accumulator, this[i], i, this);
    }

    // Return the final accumulator value
    return accumulator;
};
// Test the custom filter, reduce, and some methods
const numbers = [1, 2, 3, 4, 5];

// Example: Sum of array elements using customReduce
const sum = numbers.customReduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log("Sum:", sum);
// Output: 15
