/**
 * Counts the number of digits in a number (handles negatives).
 * Time: O(d)  Space: O(1)
 */
function countDigits(num) {
    let count = 0;
    num = Math.abs(num);
    if (num === 0) return 1;
    while (num > 0) {
        count = count + 1;
        num = Math.floor(num / 10);
    }
    return count;
}

console.log(countDigits(121)); // 3
console.log(countDigits(-1211413131)); // 10