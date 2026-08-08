/**
 * Problem Statement:
 * -------------------
 * Given an array of integers and a number 'k',
 * find the maximum sum of any contiguous subarray of size 'k'.
 * 
 * Example:
 * Input: arr = [1, 4, 2, 10, 2, 3, 1, 0, 20], k = 4
 * Output: 24
 * Explanation: The subarray [10, 2, 3, 9] has the maximum sum of 24.
 */

// Brute-Force Approach (Time Complexity: O(n²)) ❌
// ------------------------------------------------
// 1. Loop over all possible starting points of subarrays of size k.
// 2. For each subarray, calculate the sum of its k elements.
// 3. Track the highest sum encountered.
function maxSumSubarray(arr, windowSize) {
    let maxSum = -Infinity;

    for (let startIndex = 0; startIndex <= arr.length - windowSize; startIndex++) {
        let currentWindowSum = 0;

        for (let offset = 0; offset < windowSize; offset++) {
            currentWindowSum += arr[startIndex + offset];
        }

        maxSum = Math.max(maxSum, currentWindowSum);
    }

    return maxSum;
}

// Optimized Sliding Window Approach (Time Complexity: O(n)) ✅
// ------------------------------------------------------------
// 1. Calculate the sum of the first window of size k.
// 2. Move the window forward one element at a time by:
//    - Subtracting the element that falls out of the window.
//    - Adding the new element that enters the window.
// 3. Update the maxSum if the new window sum is greater.
function maxSumSubarraySlidingWindow(arr, windowSize) {
    if (arr.length < windowSize) return null; // Edge case

    let currentWindowSum = arr.slice(0, windowSize).reduce((a, b) => a + b, 0);
    let maxSum = currentWindowSum;

    for (let endIndex = windowSize; endIndex < arr.length; endIndex++) {
        const elementExiting = arr[endIndex - windowSize];
        const elementEntering = arr[endIndex];

        currentWindowSum = currentWindowSum - elementExiting + elementEntering;
        maxSum = Math.max(maxSum, currentWindowSum);
    }

    return maxSum;
}

// Example
const arr = [1, 4, 2, 10, 2, 3, 1, 0, 20];
const k = 4;
console.log(maxSumSubarraySlidingWindow(arr, k)); // Output: 24
