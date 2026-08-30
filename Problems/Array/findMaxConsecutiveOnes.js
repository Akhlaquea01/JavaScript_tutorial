/**
 * Returns the maximum number of consecutive 1's in a binary array.
 * Time: O(n)  Space: O(1)
 */
const findMaxConsecutiveOnes = function (nums) {
    let maxCount = 0;
    let currentCount = 0;

    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 1) {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }

    return maxCount;
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3

