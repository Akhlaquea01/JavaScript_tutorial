// Extend the Array prototype with a custom forEach method
Array.prototype.customForEach = function (callback) {
    // Iterate over each element of the array
    for (let i = 0; i < this.length; i++) {
        // Apply the callback function to the current element
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
