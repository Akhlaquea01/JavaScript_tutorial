
// Extend the Array prototype with a custom some method
Array.prototype.customSome = function (callback) {
    // Iterate over each element of the array
    for (let i = 0; i < this.length; i++) {
        // If the callback function returns true for any element, return true
        if (callback(this[i], i, this)) {
            return true;
        }
    }

    // Return false if no element satisfies the condition
    return false;
};

// Test the custom filter, reduce, and some methods
const numbers = [1, 2, 3, 4, 5];

// Example: Check if any element is greater than 5 using customSome
const greaterThanFive = numbers.customSome(function (num) {
    return num > 5;
});
console.log("Is any number greater than 5?", greaterThanFive);
// Output: false
