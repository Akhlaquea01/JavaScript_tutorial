/**
 * Finds the longest subarray with sum K (Hash Map Approach)
 * @param {number[]} nums - Array of integers (positive/negative)
 * @param {number} K - Target sum
 * @returns {number} - Length of the longest subarray
 */
function longestSubarrayWithSumK(nums, K) {
    const prefixSumMap = new Map();
    prefixSumMap.set(0, -1); // Initialize for cases where subarray starts at index 0
    let currentSum = 0;
    let maxLength = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];

        // If (currentSum - K) exists in the map, update maxLength
        if (prefixSumMap.has(currentSum - K)) {
            maxLength = Math.max(maxLength, i - prefixSumMap.get(currentSum - K));
        }

        // Store the earliest occurrence of currentSum
        if (!prefixSumMap.has(currentSum)) {
            prefixSumMap.set(currentSum, i);
        }
    }

    return maxLength;
}

// Example
console.log(longestSubarrayWithSumK([1, -1, 5, -2, 3], 3)); // Output: 4