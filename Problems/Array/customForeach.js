/**
 * Polyfill for Array.prototype.forEach: invokes callback once for each array element.
 * Time: O(n)  Space: O(1)
 */
Array.prototype.customForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

// Test the custom forEach method
const numbers = [1, 2, 3, 4, 5];

// Example: Print each element of the array using customForEach
numbers.customForEach(function (num) {
    console.log(num);
});
// Output:
// 1
// 2
// 3
// 4
// 5
