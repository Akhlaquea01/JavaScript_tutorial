/**
 * Problem Statement:
 * Given an array nums of distinct integers, return all the possible permutations.
 * You can return the answer in any order.
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * Approach:
 * 1. Use backtracking to generate all permutations
 * 2. At each step, we'll swap elements to generate different orderings
 * 3. We'll fix one element at a time and permute the remaining elements
 * 4. The recursion tree will explore all possible orderings
 * 
 * Time Complexity: O(n * n!) - There are n! permutations and each takes O(n) time to build
 * Space Complexity: O(n) - For the recursion stack (excluding output space)
 */

function permute(nums) {
    const result = [];

    /**
     * Backtracking helper function
     * @param {number} first - Current index being fixed
     */
    function backtrack(first) {
        // If all elements are fixed, we have a complete permutation
        if (first === nums.length) {
            result.push([...nums]);
            return;
        }

        for (let i = first; i < nums.length; i++) {
            // 1. Swap the current element with the first element
            [nums[first], nums[i]] = [nums[i], nums[first]];

            // 2. Recursively generate permutations for next position
            backtrack(first + 1);

            // 3. Backtrack - swap back to original order
            [nums[first], nums[i]] = [nums[i], nums[first]];
        }
    }

    // Start backtracking from index 0
    backtrack(0);

    return result;
}

// Test case
const nums = [1, 2, 3];
console.log(permute(nums));
/* Output:
[
  [1, 2, 3], [1, 3, 2],
  [2, 1, 3], [2, 3, 1],
  [3, 1, 2], [3, 2, 1]
]
*/