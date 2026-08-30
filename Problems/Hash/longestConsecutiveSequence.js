/**
 * Problem Description: Longest Consecutive Sequence (using Set)
 *
 * Finds the length of the longest consecutive sequence of numbers in an array.
 *
 * Input:
 * - nums: An array of integers.
 *
 * Output:
 * - The length of the longest consecutive sequence.
 *
 * Constraints:
 * - Use a Set.
 */

/**
 * Finds the length of the longest consecutive sequence of numbers in an array
 * using a Set for efficient lookups.
 * Time: O(n)  Space: O(n)
 *
 * @param {number[]} nums - The input array of integers.
 * @returns {number} The length of the longest consecutive sequence. Returns 0 for an empty array.
 */
function longestConsecutiveSequence(nums) {
    if (nums.length === 0) {
        return 0;
    }

    const numSet = new Set(nums);
    let longestStreak = 0;

    for (const num of numSet) {
        // Only start counting from a sequence's beginning (num - 1 not present),
        // so each sequence is walked exactly once instead of from every member.
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: No Consecutive Sequence
    const nums1 = [1, 3, 5];
    console.log("No Consecutive Sequence:");
    console.log(`Input: [${nums1.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums1)); // Expected: 1
    console.log("---------------");

    // Example 2: Single Element
    const nums2 = [1];
    console.log("Single Element:");
    console.log(`Input: [${nums2.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums2)); // Expected: 1
    console.log("---------------");

    // Example 3: Consecutive Sequence
    const nums3 = [1, 2, 3, 4, 5];
    console.log("Consecutive Sequence:");
    console.log(`Input: [${nums3.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums3)); // Expected: 5
    console.log("---------------");

    // Example 4: Unordered Input
    const nums4 = [5, 2, 3, 1, 4];
    console.log("Unordered Input:");
    console.log(`Input: [${nums4.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums4)); // Expected: 5
    console.log("---------------");

    // Example 5: Empty Array
    const nums5 = [];
    console.log("Empty Array:");
    console.log(`Input: [${nums5.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums5)); // Expected: 0
    console.log("---------------");

    // Example 6: Multiple Sequences
    const nums6 = [1, 2, 3, 10, 11, 12]; // Sequences: [1,2,3] (len 3), [10,11,12] (len 3)
    console.log("Multiple Sequences:");
    console.log(`Input: [${nums6.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums6)); // Expected: 3
    console.log("---------------");

    // Example 7: More complex unordered with gaps
    const nums7 = [100, 4, 200, 1, 3, 2]; // Sequence: [1,2,3,4] (len 4)
    console.log("More complex unordered with gaps:");
    console.log(`Input: [${nums7.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums7)); // Expected: 4
    console.log("---------------");

    // Example 8: Duplicates in input
    const nums8 = [1, 2, 0, 1, 3, 2]; // Sequence: [0,1,2,3] (len 4)
    console.log("Duplicates in input:");
    console.log(`Input: [${nums8.join(', ')}]`);
    console.log("Output: ", longestConsecutiveSequence(nums8)); // Expected: 4
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    No Consecutive Sequence:
    Input: [1, 3, 5]
    Output: 1
    ---------------
    Single Element:
    Input: [1]
    Output: 1
    ---------------
    Consecutive Sequence:
    Input: [1, 2, 3, 4, 5]
    Output: 5
    ---------------
    Unordered Input:
    Input: [5, 2, 3, 1, 4]
    Output: 5
    ---------------
    Empty Array:
    Input: []
    Output: 0
    ---------------
    Multiple Sequences:
    Input: [1, 2, 3, 10, 11, 12]
    Output: 3
    ---------------
    More complex unordered with gaps:
    Input: [100, 4, 200, 1, 3, 2]
    Output: 4
    ---------------
    Duplicates in input:
    Input: [1, 2, 0, 1, 3, 2]
    Output: 4
    ---------------
    --- End Sample Run ---
*/
