/**
 * Problem Statement:
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * The same number may be chosen from candidates an unlimited number of times.
 * 
 * Example:
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * 
 * Approach:
 * 1. Use backtracking to explore all possible combinations
 * 2. At each step, we can either:
 *    - Include the current candidate (if it doesn't exceed target)
 *    - Move to the next candidate (to avoid duplicates)
 * 3. We'll build combinations incrementally and backtrack when sum exceeds target
 * 
 * Time Complexity: O(2^t) - Where t is target value (worst case)
 * Space Complexity: O(t) - For the recursion stack (excluding output space)
 */

function combinationSum(candidates, target) {
    const result = [];

    /**
     * Backtracking helper function
     * @param {number} start - Starting index in candidates
     * @param {number[]} currentCombination - Current combination being built
     * @param {number} remainingSum - Remaining sum to reach target
     */
    function backtrack(start, currentCombination, remainingSum) {
        // Base case: exact solution found
        if (remainingSum === 0) {
            result.push([...currentCombination]);
            return;
        }

        // Explore all candidates starting from 'start' index
        for (let i = start; i < candidates.length; i++) {
            const num = candidates[i];

            // Skip if number exceeds remaining sum
            if (num > remainingSum) continue;

            // 1. Include the number in current combination
            currentCombination.push(num);

            // 2. Recursively explore with same candidate (since we can reuse)
            backtrack(i, currentCombination, remainingSum - num);

            // 3. Backtrack - remove the number from combination
            currentCombination.pop();
        }
    }

    // Start backtracking from index 0 with empty combination and full target
    backtrack(0, [], target);

    return result;
}

// Test case
const candidates = [2, 3, 6, 7];
const target = 7;
console.log(combinationSum(candidates, target));
// Output: [[2, 2, 3], [7]]