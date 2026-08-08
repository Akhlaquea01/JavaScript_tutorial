/**
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 *
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 *
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1.
 * To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
 * and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 *
 * Example 1:
 * Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 * Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
 * The result of the merge is [1,2,2,3,5,6].
 */

function mergeSortedArray(nums1, m, nums2, n) {
    // Variable to track the current index in the first array (nums1).
    // m is the number of valid elements in nums1, so m - 1 is the last valid index.
    let nums1Index = m - 1;

    // Variable to track the current index in the second array (nums2).
    // n is the length of nums2, so n - 1 is the last index.
    let nums2Index = n - 1;

    // Variable to track where we should place the next largest number in nums1.
    // We start filling nums1 from the very end (index m + n - 1) to avoid overwriting existing data.
    let insertIndex = m + n - 1;

    // Loop as long as there are elements left to compare in both arrays.
    while (nums1Index >= 0 && nums2Index >= 0) {
        // Compare the elements at the current pointers.
        // We want to put the larger value at the end of the combined array.
        if (nums1[nums1Index] > nums2[nums2Index]) {
            // If nums1's element is larger, put it at the insertion position.
            nums1[insertIndex] = nums1[nums1Index];
            // Move the pointer in nums1 to the left (to the next number to consider).
            nums1Index--;
        } else {
            // If nums2's element is larger or equal, put it at the insertion position.
            nums1[insertIndex] = nums2[nums2Index];
            // Move the pointer in nums2 to the left.
            nums2Index--;
        }
        // Move the insertion pointer to the left, ready for the next number.
        insertIndex--;
    }

    // After the main loop, if there are remaining elements in nums2, copy them.
    // This happens if nums2 has some of the smallest numbers (smaller than everything left in nums1).
    // We don't need to check if elements remain in nums1 because they are already in the correct place.
    while (nums2Index >= 0) {
        nums1[insertIndex] = nums2[nums2Index];
        nums2Index--;
        insertIndex--;
    }

    // Print the final merged array to the console.
    console.log(nums1);
}

// mergeSortedArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
mergeSortedArray([0], 0, [1], 1);
