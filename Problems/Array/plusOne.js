/**
 * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

 

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    // let result=BigInt(digits.join(''))+1n
    // result=result.toString().split('').map(Number);
    // return result;

    // OR Method 2
    // Start from the last digit and move left
    for (let i = digits.length - 1; i >= 0; i--) {
        // If the current digit is less than 9, just increment and return
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }

        // If the digit is 9, set it to 0 and carry the one over
        digits[i] = 0;
    }

    // If the loop completes, it means all digits were 9
    // For example, [9,9,9] becomes [0,0,0], and we need to add a leading 1
    digits.unshift(1);
    return digits;
};
console.log(plusOne([4,3,9,9]))