/**
 * Removes all occurrences of val from nums in place, returning the array truncated to the remaining elements.
 * Time: O(n)  Space: O(1)
 */
const removeElement = function (nums, val) {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }

    // return k;
    nums.length = k;
    return nums;
};

console.log(removeElement([3, 2, 2, 3], 3));