/**
 * Merges nums2 into nums1 in place (nums1 has trailing space for n elements), keeping both sorted ascending.
 * Time: O(m + n)  Space: O(1)
 */
function mergeSortedArray(nums1, m, nums2, n) {
    let nums1Index = m - 1;
    let nums2Index = n - 1;
    // Fill nums1 from the end so we never overwrite elements we still need to compare
    let insertIndex = m + n - 1;

    while (nums1Index >= 0 && nums2Index >= 0) {
        if (nums1[nums1Index] > nums2[nums2Index]) {
            nums1[insertIndex] = nums1[nums1Index];
            nums1Index--;
        } else {
            nums1[insertIndex] = nums2[nums2Index];
            nums2Index--;
        }
        insertIndex--;
    }

    // Any remaining nums2 elements are smaller than everything left in nums1 (already in place), so copy them over
    while (nums2Index >= 0) {
        nums1[insertIndex] = nums2[nums2Index];
        nums2Index--;
        insertIndex--;
    }

    console.log(nums1);
}

// mergeSortedArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
mergeSortedArray([0], 0, [1], 1);
