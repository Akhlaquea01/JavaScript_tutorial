/**
 * Finds indices of the two numbers in nums that add up to target (brute-force pair scan).
 * Time: O(n^2)  Space: O(1)
 */
const twoSum = function (nums, target) {
    for (let index = 0; index < nums.length; index++) {
        let firstNum = nums[index];
        for (let j = 1; j < nums.length; j++) {
            let secondNum = nums[j];
            if (firstNum + secondNum == target && index != j) {
                return [index, j]
            }
        }
    }
};

// console.log(twoSum([2, 7, 11, 15],9));
// console.log(twoSum([3, 2, 4],6));
console.log(twoSum([2, 5, 5, 11], 10));


/**
 * One-pass hash map approach: for each number, checks whether its complement was already seen.
 * Time: O(n)  Space: O(n)
 */
const twoSum2 = function (nums, target) {
    const numMap = new Map(); // Use a Map to store numbers and their indices
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i); // Store the number with its index
    }
};

console.log(twoSum2([2, 5, 5, 11], 10));
