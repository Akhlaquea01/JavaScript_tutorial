// Extend the Array prototype with a custom map method
Array.prototype.customMap = function (callback) {
    // Initialize an empty array to store the mapped results
    const mappedArray = [];

    // Iterate over each element of the array
    for (let i = 0; i < this.length; i++) {
        // Apply the callback function to the current element and store the result
        mappedArray.push(callback(this[i], i, this));
    }

    // Return the mapped array
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
