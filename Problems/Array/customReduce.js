/**
 * Polyfill for Array.prototype.reduce: reduces the array to a single value via callback, skipping sparse slots.
 * Time: O(n)  Space: O(1)
 */
Array.prototype.customReduce = function (callback, initialValue) {
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
        if (Object.hasOwn(this, i)) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

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
