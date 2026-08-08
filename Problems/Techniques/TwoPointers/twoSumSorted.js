/**
 * Problem Statement:
 * -------------------
 * Given a **sorted array** of integers in ascending order and a target number,
 * return the indices of the two numbers such that they add up to the target.
 * 
 * Assumptions:
 * - The input array is sorted in non-decreasing order.
 * - Exactly one solution exists.
 * - You cannot use the same element twice.
 * 
 * Example:
 * Input: numbers = [2, 7, 11, 15], target = 9
 * Output: [0, 1]
 * Explanation: numbers[0] + numbers[1] = 2 + 7 = 9
 */

// Two Pointer Technique[Opposite Direction] (Time Complexity: O(n)) ✅
// ------------------------------------------------
// 1. Initialize two pointers: one at the start and one at the end of the array.
// 2. Calculate the sum of the numbers at these two pointers.
// 3. If the sum equals the target, return their indices.
// 4. If the sum is less than the target, move the left pointer to the right (need a larger sum).
// 5. If the sum is greater than the target, move the right pointer to the left (need a smaller sum).
function findTwoSumIndicesSorted(sortedArray, targetSum) {
    let startPointer = 0;
    let endPointer = sortedArray.length - 1;

    while (startPointer < endPointer) {
        const currentSum = sortedArray[startPointer] + sortedArray[endPointer];

        if (currentSum === targetSum) {
            return [startPointer, endPointer]; // Indices of the two numbers
        } else if (currentSum < targetSum) {
            startPointer++; // Move right to increase the sum
        } else {
            endPointer--; // Move left to decrease the sum
        }
    }

    return []; // No valid pair found (though one is guaranteed)
}

// Example
const sortedArray = [2, 7, 11, 15];
const target = 9;
console.log(findTwoSumIndicesSorted(sortedArray, target)); // Output: [0, 1]
