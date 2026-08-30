/**
 * Problem Description: Subarray Sum (using Hash Map)
 *
 * Given an array of integers and a target sum, find the starting and ending
 * indices of a contiguous subarray that sums up to the target.
 *
 * Input:
 * - nums: An array of integers.
 * - target: The integer target sum.
 *
 * Output:
 * - An array [startIndex, endIndex] if a solution is found, otherwise [].
 *
 * Constraints:
 * - Use a hash map (Map or Object).
 */

/**
 * Finds the indices of a contiguous subarray that sums up to a target value
 * using a Map and the concept of prefix sums.
 * Time: O(n)  Space: O(n)
 *
 * @param {number[]} nums - The input array of integers.
 * @param {number} target - The target sum.
 * @returns {number[]} An array containing the starting and ending indices of the subarray, or an empty array if no solution is found.
 */
function subarraySum(nums, target) {
    const sumIndex = new Map();

    // Seed with prefix sum 0 at index -1, so a subarray starting at index 0
    // (where currentSum already equals target) resolves to start index 0.
    sumIndex.set(0, -1);

    let currentSum = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];
        const requiredSum = currentSum - target;

        if (sumIndex.has(requiredSum)) {
            return [sumIndex.get(requiredSum) + 1, i];
        }

        // Only store the first occurrence of a sum, so the earliest valid start index wins.
        if (!sumIndex.has(currentSum)) {
            sumIndex.set(currentSum, i);
        }
    }

    return [];
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Positive Numbers
    const nums1 = [2, 4, 6, 3];
    const target1 = 10; // 4 + 6 = 10
    console.log("Positive Numbers:");
    console.log(`Input: [${nums1.join(', ')}], Target: ${target1}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums1, target1))); // Expected: [1, 2]
    console.log("---------------");

    // Example 2: Includes Zero
    const nums2 = [1, 2, 3, 0, 4];
    const target2 = 6; // 1 + 2 + 3 = 6, or 2 + 3 + 0 + 1 = 6
    console.log("Includes Zero:");
    console.log(`Input: [${nums2.join(', ')}], Target: ${target2}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums2, target2))); // Expected: [0, 2] (first solution found)
    console.log("---------------");

    // Example 3: Negative Numbers
    const nums3 = [1, -1, 2, 3];
    const target3 = 4; // 1 + -1 + 2 + 3 = 5 (no), -1 + 2 + 3 = 4
    console.log("Negative Numbers:");
    console.log(`Input: [${nums3.join(', ')}], Target: ${target3}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums3, target3))); // Expected: [1, 3]
    console.log("---------------");

    // Example 4: No Subarray
    const nums4 = [1, 2, 3, 4];
    const target4 = 10;
    console.log("No Subarray:");
    console.log(`Input: [${nums4.join(', ')}], Target: ${target4}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums4, target4))); // Expected: []
    console.log("---------------");

    // Example 5: Empty Array
    const nums5 = [];
    const target5 = 1;
    console.log("Empty Array:");
    console.log(`Input: [${nums5.join(', ')}], Target: ${target5}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums5, target5))); // Expected: []
    console.log("---------------");

    // Example 6: Single-element array that matches target
    const nums6 = [5];
    const target6 = 5;
    console.log("Single-element array matching target:");
    console.log(`Input: [${nums6.join(', ')}], Target: ${target6}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums6, target6))); // Expected: [0, 0]
    console.log("---------------");

    // Example 7: Zero as target, subarray of zeros
    const nums7 = [-1, 1, 0, 0];
    const target7 = 0;
    console.log("Zero as target, subarray of zeros:");
    console.log(`Input: [${nums7.join(', ')}], Target: ${target7}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums7, target7))); // Expected: [0, 1] or [2, 2] or [3, 3] or [2, 3] (depends on implementation, [0,1] is valid)
    console.log("---------------");

    // Example 8: Array of all zeros with target of zero
    const nums8 = [0, 0, 0, 0];
    const target8 = 0;
    console.log("Array of all zeros, target zero:");
    console.log(`Input: [${nums8.join(', ')}], Target: ${target8}`);
    console.log("Output: ", JSON.stringify(subarraySum(nums8, target8))); // Expected: [0, 0] (or any valid single zero subarray)
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run (Order of inner arrays may vary for some cases):
    -----------------------------
    --- Sample Run ---
    Positive Numbers:
    Input: [2, 4, 6, 3], Target: 10
    Output: [1,2]
    ---------------
    Includes Zero:
    Input: [1, 2, 3, 0, 4], Target: 6
    Output: [0,2]
    ---------------
    Negative Numbers:
    Input: [1, -1, 2, 3], Target: 4
    Output: [1,3]
    ---------------
    No Subarray:
    Input: [1, 2, 3, 4], Target: 10
    Output: []
    ---------------
    Empty Array:
    Input: [], Target: 1
    Output: []
    ---------------
    Single-element array matching target:
    Input: [5], Target: 5
    Output: [0,0]
    ---------------
    Zero as target, subarray of zeros:
    Input: [-1, 1, 0, 0], Target: 0
    Output: [0,1]
    ---------------
    Array of all zeros, target zero:
    Input: [0, 0, 0, 0], Target: 0
    Output: [0,0]
    ---------------
    --- End Sample Run ---
*/
