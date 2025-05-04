/**
 * Finds the longest subarray with sum K (Two Pointers Approach)
 * @param {number[]} nums - Array of positive integers
 * @param {number} K - Target sum
 * @returns {number} - Length of the longest subarray
 */
function longestSubarrayWithSumK(nums, K) {
    let left = 0;
    let currentSum = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];

        // If sum exceeds K, shrink the window from the left
        while (currentSum > K && left <= right) {
            currentSum -= nums[left];
            left++;
        }

        // If sum equals K, update maxLength
        if (currentSum === K) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
    }

    return maxLength;
}

// Example
console.log(longestSubarrayWithSumK([10, 5, 2, 7, 1, 9], 15)); // Output: 4