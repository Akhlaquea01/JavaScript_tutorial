/**
 * Problem Description: Two Sum (using Hash Map)
 *
 * Given an array of integers and a target sum, find the indices of two numbers
 * in the array that add up to the target.
 *
 * Input:
 * - nums: An array of integers.
 * - target: The integer target sum.
 *
 * Output:
 * - An array [index1, index2] if a solution is found, otherwise [].
 *
 * Constraints:
 * - Use a hash map (Map or Object).
 */

/**
 * Finds the indices of two numbers in an array that sum up to a target value
 * using a Map for efficient lookup.
 * Time: O(n)  Space: O(n)
 *
 * @param {number[]} nums - The input array of integers.
 * @param {number} target - The target sum.
 * @returns {number[]} An array containing the indices of the two numbers, or an empty array if no solution is found.
 */
function twoSum(nums, target) {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        if (numMap.has(complement)) {
            // Returns the first solution found if multiple exist.
            return [numMap.get(complement), i];
        }

        numMap.set(num, i);
    }

    return [];
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Unique Solution
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    console.log("Unique Solution:");
    console.log(`Input: [${nums1.join(', ')}], Target: ${target1}`);
    console.log("Output: ", JSON.stringify(twoSum(nums1, target1))); // Expected: [0, 1]
    console.log("---------------");

    // Example 2: Duplicate Numbers in the input array, contributing to the sum
    const nums2 = [3, 3, 11, 15];
    const target2 = 6;
    console.log("Duplicate Numbers:");
    console.log(`Input: [${nums2.join(', ')}], Target: ${target2}`);
    console.log("Output: ", JSON.stringify(twoSum(nums2, target2))); // Expected: [0, 1]
    console.log("---------------");

    // Example 3: No Solution
    const nums3 = [2, 7, 11, 15];
    const target3 = 30;
    console.log("No Solution:");
    console.log(`Input: [${nums3.join(', ')}], Target: ${target3}`);
    console.log("Output: ", JSON.stringify(twoSum(nums3, target3))); // Expected: []
    console.log("---------------");

    // Example 4: Negative Numbers
    const nums4 = [-1, -2, -3, -4, -5];
    const target4 = -8; // -3 + -5 = -8
    console.log("Negative Numbers:");
    console.log(`Input: [${nums4.join(', ')}], Target: ${target4}`);
    console.log("Output: ", JSON.stringify(twoSum(nums4, target4))); // Expected: [2, 4]
    console.log("---------------");

    // Example 5: Empty Array
    const nums5 = [];
    const target5 = 0;
    console.log("Empty Array:");
    console.log(`Input: [${nums5.join(', ')}], Target: ${target5}`);
    console.log("Output: ", JSON.stringify(twoSum(nums5, target5))); // Expected: []
    console.log("---------------");

    // Example 6: Array with one element (no possible pair)
    const nums6 = [5];
    const target6 = 10;
    console.log("Single Element Array:");
    console.log(`Input: [${nums6.join(', ')}], Target: ${target6}`);
    console.log("Output: ", JSON.stringify(twoSum(nums6, target6))); // Expected: []
    console.log("---------------");

    // Example 7: Solution with elements far apart
    const nums7 = [1, 5, 9, 12, 15, 20];
    const target7 = 27; // 12 + 15 = 27
    console.log("Solution with elements far apart:");
    console.log(`Input: [${nums7.join(', ')}], Target: ${target7}`);
    console.log("Output: ", JSON.stringify(twoSum(nums7, target7))); // Expected: [3, 4]
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Unique Solution:
    Input: [2, 7, 11, 15], Target: 9
    Output: [0,1]
    ---------------
    Duplicate Numbers:
    Input: [3, 3, 11, 15], Target: 6
    Output: [0,1]
    ---------------
    No Solution:
    Input: [2, 7, 11, 15], Target: 30
    Output: []
    ---------------
    Negative Numbers:
    Input: [-1, -2, -3, -4, -5], Target: -8
    Output: [2,4]
    ---------------
    Empty Array:
    Input: [], Target: 0
    Output: []
    ---------------
    Single Element Array:
    Input: [5], Target: 10
    Output: []
    ---------------
    Solution with elements far apart:
    Input: [1, 5, 9, 12, 15, 20], Target: 27
    Output: [3,4]
    ---------------
    --- End Sample Run ---
*/
