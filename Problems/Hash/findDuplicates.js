/**
 * Problem Description: Find Duplicates (using Hash Map)
 *
 * Given an array of numbers, find and return all numbers that appear more than once.
 *
 * Input:
 * - nums: An array of numbers.
 *
 * Output:
 * - An array containing the duplicate numbers. Returns an empty array if no duplicates.
 *
 * Constraints:
 * - Use a hash map (Map or Object) for efficient counting.
 */

/**
 * Finds duplicate numbers in an array using a Map to count frequencies.
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number[]} A new array containing the duplicate numbers.
 */
function findDuplicates(nums) {
    // Step 1: Create a Map to store the frequency of each number.
    // Keys will be the numbers from the input array, values will be their counts.
    const numCounts = new Map();

    // Step 2: Iterate through the input array 'nums'.
    // For each number, update its count in the numCounts Map.
    for (let num of nums) {
        // Get the current count of the number. If it's not in the map yet, get() returns undefined,
        // so we use '|| 0' to default the count to 0.
        const currentCount = numCounts.get(num) || 0;
        // Increment the count and set it back in the map for the current number.
        numCounts.set(num, currentCount + 1);

        // Concise alternative for the above two lines:
        // numCounts.set(num, (numCounts.get(num) || 0) + 1);
    }

    // Step 3: Initialize an empty array to store the duplicate numbers found.
    const duplicates = [];

    // Step 4: Iterate through the key-value pairs (entries) in the numCounts Map.
    // Map.entries() returns an iterator yielding [key, value] pairs.
    for (let [key, value] of numCounts.entries()) {
        // Step 5: Check if the value (count) for the current number (key) is greater than 1.
        // If the count is greater than 1, it means the number is a duplicate.
        if (value > 1) {
            // Step 6: Add the number (the key) to the duplicates array.
            duplicates.push(key);
        }
    }

    // Step 7: Return the array containing all identified duplicate numbers.
    return duplicates;
}


// --- Sample Run Examples ---

console.log("--- Sample Run ---");

// Example 1: No Duplicates
console.log("No Duplicates:");
const arr1 = [1, 2, 3, 4, 5];
console.log("Input: ", JSON.stringify(arr1));
console.log("Output: ", JSON.stringify(findDuplicates(arr1))); // Expected: []
console.log("---------------");

// Example 2: Single Duplicate
console.log("Single Duplicate:");
const arr2 = [1, 2, 2, 3, 4];
console.log("Input: ", JSON.stringify(arr2));
console.log("Output: ", JSON.stringify(findDuplicates(arr2))); // Expected: [2]
console.log("---------------");

// Example 3: Multiple Duplicates
console.log("Multiple Duplicates:");
const arr3 = [1, 1, 2, 2, 3, 4];
console.log("Input: ", JSON.stringify(arr3));
console.log("Output: ", JSON.stringify(findDuplicates(arr3))); // Expected: [1, 2]
console.log("---------------");

// Example 4: Repeating Duplicates (more than 2 occurrences)
console.log("Repeating Duplicates:");
const arr4 = [1, 1, 1, 2, 2, 2, 3];
console.log("Input: ", JSON.stringify(arr4));
console.log("Output: ", JSON.stringify(findDuplicates(arr4))); // Expected: [1, 2]
console.log("---------------");

// Example 5: Empty Array
console.log("Empty Array:");
const arr5 = [];
console.log("Input: ", JSON.stringify(arr5));
console.log("Output: ", JSON.stringify(findDuplicates(arr5))); // Expected: []
console.log("---------------");

// Example 6: Single Element
console.log("Single Element:");
const arr6 = [1];
console.log("Input: ", JSON.stringify(arr6));
console.log("Output: ", JSON.stringify(findDuplicates(arr6))); // Expected: []
console.log("---------------");

// Example 7: Duplicates not consecutively
console.log("Duplicates not consecutively:");
const arr7 = [1, 2, 1, 3, 2, 4];
console.log("Input: ", JSON.stringify(arr7));
console.log("Output: ", JSON.stringify(findDuplicates(arr7))); // Expected: [1, 2]
console.log("---------------");

// Example 8: Negative numbers and zero
console.log("Negative numbers and zero:");
const arr8 = [-1, 0, -1, 5, 0];
console.log("Input: ", JSON.stringify(arr8));
console.log("Output: ", JSON.stringify(findDuplicates(arr8))); // Expected: [-1, 0]
console.log("---------------");


/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    No Duplicates:
    Input: [1,2,3,4,5]
    Output: []
    ---------------
    Single Duplicate:
    Input: [1,2,2,3,4]
    Output: [2]
    ---------------
    Multiple Duplicates:
    Input: [1,1,2,2,3,4]
    Output: [1,2]
    ---------------
    Repeating Duplicates:
    Input: [1,1,1,2,2,2,3]
    Output: [1,2]
    ---------------
    Empty Array:
    Input: []
    Output: []
    ---------------
    Single Element:
    Input: [1]
    Output: []
    ---------------
    Duplicates not consecutively:
    Input: [1,2,1,3,2,4]
    Output: [1,2]
    ---------------
    Negative numbers and zero:
    Input: [-1,0,-1,5,0]
    Output: [-1,0]
    ---------------
*/
