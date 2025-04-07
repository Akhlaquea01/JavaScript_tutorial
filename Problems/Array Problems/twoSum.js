/**
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
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


// Method-2
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
