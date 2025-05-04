/**
 * Performs binary search using Divide and Conquer approach.
 * @param {number[]} arr - Sorted array in which to search
 * @param {number} target - The value to search for
 * @param {number} start - Starting index of the current search range
 * @param {number} end - Ending index of the current search range
 * @returns {number} Index of the target if found, otherwise -1
 */
function binarySearch(arr, target, start = 0, end = arr.length - 1) {
    // Base Case: If the search range is invalid, the target is not in the array
    if (start > end) return -1;

    // Find the middle index
    const mid = Math.floor((start + end) / 2);

    // Check if the middle element is the target
    if (arr[mid] === target) return mid;

    // If the target is smaller than the middle element,
    // recursively search in the left half
    if (arr[mid] > target)
        return binarySearch(arr, target, start, mid - 1);
    else
        // If the target is larger than the middle element,
        // recursively search in the right half
        return binarySearch(arr, target, mid + 1, end);
}
const nums = [1, 3, 5, 7, 9, 11];
console.log(binarySearch(nums, 7)); // Output: 3
