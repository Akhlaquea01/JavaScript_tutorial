// Extend the Array prototype with a custom reduce method
Array.prototype.customReduce = function (callback, initialValue) {
    // Initialize an accumulator variable
    let accumulator = initialValue;
    let startIndex = 0;

    // Handle the case where no initialValue is provided
    if (initialValue === undefined) {
        // Find the first non-empty element to use as the initial value
        let foundInitialValue = false;
        for (let i = 0; i < this.length; i++) {
            if (Object.hasOwn(this, i)) {
                accumulator = this[i];
                startIndex = i + 1;
                foundInitialValue = true;
                break;
            }
        }
        // If the array is empty or sparse with no elements, throw a TypeError
        if (!foundInitialValue) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
    }

    // Iterate over each element of the array, skipping empty slots
    for (let i = startIndex; i < this.length; i++) {
        // Check if the current index is present in the array
        if (Object.hasOwn(this, i)) {
            // Update the accumulator by applying the callback function to it
            accumulator = callback(accumulator, this[i], i, this);
        }
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
