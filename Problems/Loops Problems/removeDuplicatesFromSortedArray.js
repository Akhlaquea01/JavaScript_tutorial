// Remove Duplicates from Sorted Array
/**
 Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
 */

const removeDuplicates = function (nums) {
    if (nums.length === 0) return 0;

    let k = 0; // Pointer for unique elements
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[k]) {
            k++; // Move the pointer
            nums[k] = nums[i]; // Place the next unique element
        }
    }
    nums.length = k + 1;
    console.log(nums);
    return k + 1; // Return the count of unique elements
};
console.log(removeDuplicates([1, 1, 2, 3, 4]))