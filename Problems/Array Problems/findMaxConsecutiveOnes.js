/**
 * Given a binary array nums, return the maximum number of consecutive 1's in the array.
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
 */
const findMaxConsecutiveOnes = function (nums) {
    let maxCount = 0; // Tracks the maximum number of consecutive 1's
    let currentCount = 0; // Tracks the current streak of consecutive 1's

    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 1) {
            currentCount++; // Increment current streak
            maxCount = Math.max(maxCount, currentCount); // Update maximum if needed
        } else {
            currentCount = 0; // Reset streak if a 0 is encountered
        }
    }

    return maxCount;
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3

