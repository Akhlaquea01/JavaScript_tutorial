/**
 * Polyfill for Array.prototype.some: returns true if callback returns truthy for any element.
 * Time: O(n)  Space: O(1)
 */
Array.prototype.customSome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }

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
