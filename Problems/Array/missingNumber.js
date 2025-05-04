function missingNumber(nums) {
    const n = nums.length; // Total number of elements, including the missing one
    const expectedSum = (n * (n + 1)) / 2; // Sum of numbers from 0 to n
    const actualSum = nums.reduce((acc, num) => acc + num, 0); // Sum of elements in the array
    return expectedSum - actualSum; // The missing number
}

// Example Test:
console.log(missingNumber([3, 0, 1])); // Output: 2
console.log(missingNumber([0, 1]));    // Output: 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Output: 8


function missingNumber2(nums) {
    nums.sort((a, b) => a - b); // Sort the array

    // Check for the missing number
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            return i; // Return the missing index
        }
    }

    // If no number is missing in the range [0, n-1], return n
    return nums.length;
}
// Example Test:
console.log(missingNumber2([3, 0, 1])); // Output: 2
console.log(missingNumber2([0, 1]));    // Output: 2
console.log(missingNumber2([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Output: 8
