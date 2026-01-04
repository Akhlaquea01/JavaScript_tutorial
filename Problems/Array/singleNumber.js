/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.



Example 1:

Input: nums = [2,2,1]

Output: 1
 */

function singleNumber(nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;

        for (let j = 0; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }

        if (count === 1) {
            return nums[i];
        }
    }
}

/**
 * Approach 2: XOR Bitwise Operation
 * Time Complexity: O(N) - Linear time complexity as we iterate through the array once.
 * Space Complexity: O(1) - Constant space complexity.
 *
 * Logic:
 * 1. A ^ A = 0 (XOR-ing a number with itself results in 0)
 * 2. A ^ 0 = A (XOR-ing a number with 0 results in the number itself)
 *
 * Since every element appears twice except one, all pairs will cancel each other out (become 0),
 * leving only the single number in the result.
 */
function singleNumber2(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        // Accumulate the XOR of all elements.
        // Pairs cancel out: (A ^ A) ^ (B ^ B) ^ C = 0 ^ 0 ^ C = C
        result ^= nums[i];
    }
    return result;
}

console.log(singleNumber([4, 1, 2, 1, 2]));
console.log(singleNumber2([4, 1, 2, 1, 2]));
