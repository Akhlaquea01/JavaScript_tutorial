/**
 * Create a function that accepts two arrays, arr1 and arr2.
The function should return true if every value in arr1 has its corresponding value squared in arr2.
The frequency of values must also be the same.
same([1, 2, 3], [1, 4, 9]);          // true
same([1, 2, 3], [1, 9]);             // false (missing 4)
 */

function same(arr1, arr2) { 
    if (arr1.length !== arr2.length) return false; // Check if lengths are equal

    const frequencyCounter1 = {}; // Object to store frequency of elements in arr1
    const frequencyCounter2 = {}; // Object to store frequency of elements in arr2

    // Count frequencies of elements in arr1
    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }

    // Count frequencies of elements in arr2
    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    // Check if every value in arr1 has its corresponding value squared in arr2
    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) return false; // Check if square exists in arr2
        if (frequencyCounter1[key] !== frequencyCounter2[key ** 2]) return false; // Check frequencies
    }

    return true; // All checks passed, arrays are the same
}

console.log(same([1, 2, 3], [1, 4, 9])); // true
console.log(same([1, 2, 3], [1, 9])); // false (missing 4)