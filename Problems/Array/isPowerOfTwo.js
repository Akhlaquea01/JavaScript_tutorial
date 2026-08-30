/**
 * Checks whether an integer is a power of two.
 * Time: O(log n)  Space: O(1)
 */
const isPowerOfTwo = function (n) {
    if (n <= 0) return false;

    while (n > 1) {
        if (n % 2 !== 0) {
            return false;
        }
        n = n / 2;
    }

    return true;
};

console.log(isPowerOfTwo(64));
console.log(isPowerOfTwo(65));
