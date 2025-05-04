/**
 * Problem Statement:
 * -------------------
 * Given a **sorted array** of integers, remove the duplicates **in-place** such that each unique element 
 * appears only once. Return the new length of the modified array.
 * 
 * The relative order of the elements should be kept the same.
 * Do not use extra space for another array — perform the operation in-place.
 * 
 * Example:
 * Input:  nums = [1, 1, 2, 2, 3, 4, 4, 5]
 * Output: 5
 * Modified array: [1, 2, 3, 4, 5]
 */

// Two Pointer Technique[Same Direction] (Time Complexity: O(n), Space: O(1)) ✅
// -------------------------------------------------------------
// 1. Use two pointers: `writeIndex` (slow) and `readIndex` (fast).
// 2. Traverse the array using `readIndex` starting from index 1.
// 3. If the current element is not equal to the last written unique element,
//    - Increment `writeIndex`
//    - Write the new unique value at `writeIndex`
// 4. At the end, the unique elements will be in the first `writeIndex + 1` positions.
function removeDuplicatesFromSortedArray(sortedArray) {
    if (sortedArray.length === 0) return 0;

    let writeIndex = 0; // Position to overwrite with next unique element

    for (let readIndex = 1; readIndex < sortedArray.length; readIndex++) {
        if (sortedArray[readIndex] !== sortedArray[writeIndex]) {
            writeIndex++;
            sortedArray[writeIndex] = sortedArray[readIndex];
        }
    }

    return writeIndex + 1; // Length of array with unique elements
}

// Example
const sortedArray = [1, 1, 2, 2, 3, 4, 4, 5];
const newLength = removeDuplicatesFromSortedArray(sortedArray);
console.log(sortedArray.slice(0, newLength)); // Output: [1, 2, 3, 4, 5]
