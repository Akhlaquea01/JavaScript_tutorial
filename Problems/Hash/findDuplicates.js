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
 * Time: O(n)  Space: O(n)
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number[]} A new array containing the duplicate numbers.
 */
function findDuplicates(nums) {
    const numCounts = new Map();

    for (let num of nums) {
        const currentCount = numCounts.get(num) || 0;
        numCounts.set(num, currentCount + 1);
    }

    const duplicates = [];

    for (let [key, value] of numCounts.entries()) {
        if (value > 1) {
            duplicates.push(key);
        }
    }

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
