// Extend the Array prototype with a custom filter method
Array.prototype.customFilter = function (callback) {
    // Initialize an empty array to store the filtered results
    const filteredArray = [];

    // Iterate over each element of the array
    for (let i = 0; i < this.length; i++) {
        // If the callback function returns true for the current element, add it to the filtered array
        if (callback(this[i], i, this)) {
            filteredArray.push(this[i]);
        }
    }

    // Return the filtered array
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


