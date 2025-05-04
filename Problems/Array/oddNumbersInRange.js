/**
 Count Odd Numbers in an Interval Range (LC) 
Example 1:
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].

Example 2:
Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].
 */

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
function countOdds(low, high) {
    let count = 0;
    for (let i = low; i <= high; i++) {
        if (i % 2 != 0) {
            count = count + 1;
        }
    }
    return count;
};

console.log(countOdds(8, 10))
console.log(countOdds(3, 7))


// Approach 2:
/**
 * 
 Input: low = 3, high = 7
 OddHigh=⌊(7+1)/2⌋=4
 OddLow=⌊3/2⌋=1
 Result=4−1=3
 */
// function countOdds(low, high) {
//     return Math.floor((high + 1) / 2) - Math.floor(low / 2);
// };
