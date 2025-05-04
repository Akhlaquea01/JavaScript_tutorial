/**
The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
Example 1:

Input: nums = [3,2,3]
Output: 3
 */
const majorityElement = function (nums) {
    const countMap = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if (countMap.has(element)) {
            countMap.set(element, (countMap.get(element) + 1))
        } else {
            countMap.set(element, 1)
        }
        if (countMap.has(element) && countMap.get(element) > nums.length / 2) {
            return element;
        }

    }
};
console.log(majorityElement([3, 2, 3]))