/**
 * Finds the majority element (the value that appears more than n/2 times); assumes one always exists.
 * Time: O(n)  Space: O(n)
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