/**
 * Polyfill for Array.prototype.filter: returns a new array of elements for which callback returns truthy.
 * Time: O(n)  Space: O(n)
 */
Array.prototype.customFilter = function (callback) {
    const filteredArray = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            filteredArray.push(this[i]);
        }
    }

    return filteredArray;
};




// Test the custom filter, reduce, and some methods
const numbers = [1, 2, 3, 4, 5];

// Example: Filter even numbers using customFilter
const evenNumbers = numbers.customFilter(function (num) {
    return num % 2 === 0;
});
console.log("Even numbers:", evenNumbers);
// Output: [2, 4]


