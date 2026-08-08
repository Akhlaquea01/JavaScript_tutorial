/**
 * @param {number[]} nums
 * @return {number}

 Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

 

Example 1:

Input: nums = [3,2,1]
Output: 1
Explanation:
The first distinct maximum is 3.
The second distinct maximum is 2.
The third distinct maximum is 1.
 */
var thirdMax = function (nums) {
    let max1 = null;
    let max2 = null;
    let max3 = null;

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        
        // Skip duplicate values
        if (num === max1 || num === max2 || num === max3) continue;
        
        // Fix 2: Check for null/undefined before comparing values
        if (max1 === null || num > max1) {
            max3 = max2;
            max2 = max1;
            max1 = num;
        } else if (max2 === null || num > max2) {
            max3 = max2;
            max2 = num;
        } else if (max3 === null || num > max3) {
            max3 = num;
        }
    }
    
    // Fix 3: Explicitly check if max3 is filled to handle 0 correctly
    return max3 !== null ? max3 : max1;
};
