/**
 * Removes duplicates from a sorted array in place, returning the count of unique elements.
 * Time: O(n)  Space: O(1)
 */
const removeDuplicates = function (nums) {
    if (nums.length === 0) return 0;

    let k = 0; // Pointer for unique elements
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[k]) {
            k++;
            nums[k] = nums[i];
        }
    }
    nums.length = k + 1;
    console.log(nums);
    return k + 1;
};
console.log(removeDuplicates([1, 1, 2, 3, 4]))