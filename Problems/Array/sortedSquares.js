/**
 * Squares each element of a sorted array and returns the result sorted in non-decreasing order.
 * Time: O(n log n)  Space: O(1)
 */
const sortedSquares = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i] * nums[i];
    }
    nums.sort((a, b) => a - b);
    return nums;
};
console.log(sortedSquares([-4, -1, 0, 3, 10]))