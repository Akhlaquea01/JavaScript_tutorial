/**
 * Polyfill for Array.prototype.map: returns a new array with callback applied to each element.
 * Time: O(n)  Space: O(n)
 */
Array.prototype.customMap = function (callback) {
    const mappedArray = [];

    for (let i = 0; i < this.length; i++) {
        mappedArray.push(callback(this[i], i, this));
    }

    return mappedArray;
};

// Test the custom map method
const numbers = [1, 2, 3, 4, 5];

// Example: Double each element of the array using customMap
const doubledNumbers = numbers.customMap(function (num) {
    return num * 2;
});
console.log("Doubled numbers:", doubledNumbers);
// Output: [2, 4, 6, 8, 10]
