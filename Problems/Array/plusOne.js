/**
 * Increments a large integer represented as an array of digits (most significant first) by one.
 * Time: O(n)  Space: O(1)
 */
var plusOne = function(digits) {
    // Alternative: let result = BigInt(digits.join('')) + 1n; return result.toString().split('').map(Number);

    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }

        // 9 rolls over to 0 and carries the one into the digit to the left
        digits[i] = 0;
    }

    // Loop completed means every digit was 9 (e.g. [9,9,9] -> [0,0,0]); prepend the carried leading 1
    digits.unshift(1);
    return digits;
};
console.log(plusOne([4,3,9,9]))