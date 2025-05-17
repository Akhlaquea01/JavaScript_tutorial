/**
 * Problem Description: Find Pairs (using Set)
 *
 * Given two arrays and a target sum, find all pairs where one number from
 * the first array and one from the second sum up to the target.
 *
 * Input:
 * - arr1: An array of numbers.
 * - arr2: An array of numbers.
 * - target: The integer target sum.
 *
 * Output:
 * - An array of arrays, where each inner array [num1, num2] is a pair
 * with num1 from arr1 and num2 from arr2, summing to target.
 *
 * Constraints:
 * - Use a Set.
 */

/**
 * Finds all pairs of numbers (one from arr1, one from arr2) that sum up to the target.
 * Uses a Set for efficient lookup of complements from arr1.
 *
 * @param {number[]} arr1 - The first input array of numbers.
 * @param {number[]} arr2 - The second input array of numbers.
 * @param {number} target - The target sum.
 * @returns {number[][]} An array of pairs [number_from_arr1, number_from_arr2] that sum to the target.
 */
function findPairs(arr1, arr2, target) {
    // Step 1: Create a Set from the elements of arr1.
    // This allows for O(1) average time complexity when checking if a number exists in arr1.
    const mySet = new Set(arr1); // Directly initialize Set from arr1

    // Alternative Step 1 (manual loop):
    // const mySet = new Set();
    // for (const num of arr1) {
    //     mySet.add(num);
    // }

    // Initialize an empty array to store the pairs that sum up to the target.
    const pairs = [];

    // Step 2: Iterate through the second array, arr2.
    for (const num of arr2) {
        // For each number in arr2, calculate the 'complement' needed from arr1
        // to reach the target sum.
        const complement = target - num;

        // Check if this calculated 'complement' exists in the Set created from arr1.
        // If it exists, it means we have found a number in arr1 that pairs with
        // the current number from arr2 to sum up to the target.
        if (mySet.has(complement)) {
            // If a complement is found in the Set, add the pair [complement, num]
            // to our results array. The problem specifies the first number in the
            // pair should be from arr1 (which is our complement) and the second
            // from arr2 (which is the current num).
            pairs.push([complement, num]);
        }
    }

    // Return the array containing all the pairs found.
    // If no pairs were found, the 'pairs' array will be empty, which is the correct behavior.
    return pairs;
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Single Pair Matching
    const arr1_1 = [1, 2, 3];
    const arr2_1 = [4, 5, 6];
    const target1 = 7; // Pairs: [1,6], [2,5], [3,4]
    console.log("Single Pair Matching:");
    console.log(`Input: [${arr1_1.join(', ')}], [${arr2_1.join(', ')}], Target: ${target1}`);
    console.log("Output: ", findPairs(arr1_1, arr2_1, target1));
    // Expected Output: [[1, 6], [2, 5], [3, 4]] (Order of pairs may vary)
    console.log("---------------");

    // Example 2: Multiple Pairs (different numbers)
    const arr1_2 = [1, 2, 3];
    const arr2_2 = [7, 6, 5];
    const target2 = 8; // Pairs: [1,7], [2,6], [3,5]
    console.log("Multiple Pairs:");
    console.log(`Input: [${arr1_2.join(', ')}], [${arr2_2.join(', ')}], Target: ${target2}`);
    console.log("Output: ", findPairs(arr1_2, arr2_2, target2));
    // Expected Output: [[1, 7], [2, 6], [3, 5]] (Order of pairs may vary)
    console.log("---------------");

    // Example 3: No Matching Pairs
    const arr1_3 = [1, 2, 3];
    const arr2_3 = [7, 8, 9];
    const target3 = 5; // No pairs sum to 5
    console.log("No Matching Pairs:");
    console.log(`Input: [${arr1_3.join(', ')}], [${arr2_3.join(', ')}], Target: ${target3}`);
    console.log("Output: ", findPairs(arr1_3, arr2_3, target3)); // Expected: []
    console.log("---------------");

    // Example 4: Empty Arrays
    const arr1_4 = [];
    const arr2_4 = [];
    const target4 = 10;
    console.log("Empty Arrays:");
    console.log(`Input: [${arr1_4.join(', ')}], [${arr2_4.join(', ')}], Target: ${target4}`);
    console.log("Output: ", findPairs(arr1_4, arr2_4, target4)); // Expected: []
    console.log("---------------");

    // Example 5: One Empty Array
    const arr1_5 = [1, 2, 3];
    const arr2_5 = [];
    const target5 = 4;
    console.log("One Empty Array:");
    console.log(`Input: [${arr1_5.join(', ')}], [${arr2_5.join(', ')}], Target: ${target5}`);
    console.log("Output: ", findPairs(arr1_5, arr2_5, target5)); // Expected: []
    console.log("---------------");

    // Example 6: Arrays with duplicate numbers
    const arr1_6 = [1, 2, 2, 3];
    const arr2_6 = [4, 5, 5, 6];
    const target6 = 7; // Pairs: [1,6], [2,5], [2,5], [3,4]
    console.log("Arrays with duplicate numbers:");
    console.log(`Input: [${arr1_6.join(', ')}], [${arr2_6.join(', ')}], Target: ${target6}`);
    console.log("Output: ", findPairs(arr1_6, arr2_6, target6));
    // Expected Output: [[1, 6], [2, 5], [2, 5], [3, 4]] (Order of pairs may vary)
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run (Order of pairs may vary):
    -----------------------------
    --- Sample Run ---
    Single Pair Matching:
    Input: [1, 2, 3], [4, 5, 6], Target: 7
    Output: [[1,6],[2,5],[3,4]]
    ---------------
    Multiple Pairs:
    Input: [1, 2, 3], [7, 6, 5], Target: 8
    Output: [[1,7],[2,6],[3,5]]
    ---------------
    No Matching Pairs:
    Input: [1, 2, 3], [7, 8, 9], Target: 5
    Output: []
    ---------------
    Empty Arrays:
    Input: [], [], Target: 10
    Output: []
    ---------------
    One Empty Array:
    Input: [1, 2, 3], [], Target: 4
    Output: []
    ---------------
    Arrays with duplicate numbers:
    Input: [1, 2, 2, 3], [4, 5, 5, 6], Target: 7
    Output: [[1,6],[2,5],[2,5],[3,4]]
    ---------------
    --- End Sample Run ---
*/
