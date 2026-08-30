/**
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
A subarray is a contiguous non-empty sequence of elements within an array.
Example 1:
Input: nums = [1,1,1], k = 2
Output: 2
Example 2:
Input: nums = [1,2,3], k = 3
Output: 2
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * Time: O(n)  Space: O(n)
 */
var subarraySum = function (nums, k) {
    const sumFrequency = new Map();
    sumFrequency.set(0, 1);

    let currentSum = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];

        const requiredSum = currentSum - k;

        // If the required prefix sum exists in the map, it means we have found
        // some subarrays ending at the current index that sum to k.
        if (sumFrequency.has(requiredSum)) {
            // Add the frequency of the required prefix sum to the count
            count += sumFrequency.get(requiredSum);
        }

        // Update the frequency of the current prefix sum in the map
        sumFrequency.set(currentSum, (sumFrequency.get(currentSum) || 0) + 1);

    }
    return count;
};

console.log(subarraySum([1, 2, 1, 2, 1], 3))