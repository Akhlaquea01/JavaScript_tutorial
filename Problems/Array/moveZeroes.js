/**
 * Moves all zeroes in the array to the end while preserving the relative order of non-zero elements.
 * Time: O(n)  Space: O(n)
 */
var moveZeroes = function (nums) {
    const Arr = new Array(nums.length).fill(0);
    let ind = 0;
    for (let index = 0; index < nums.length; index++) {
        if (nums[index]) {
            Arr[ind] = nums[index];
            ind += 1;
        }
    }
    return nums = Arr;
};

console.log(moveZeroes([0, 1, 0, 3, 12]));

/**
 * In-place variant: moves zeroes to the end using a two-pointer overwrite pass.
 * Time: O(n)  Space: O(1)
 */
var moveZeroes2 = function (nums) {
    let nonZeroIndex = 0;

    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        }
    }

    // Fill the remaining elements with zero
    for (let i = nonZeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    return nums;
};
console.log(moveZeroes2([0, 1, 0, 3, 12]));