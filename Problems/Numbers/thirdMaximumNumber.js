/**
 * Returns the third distinct maximum in nums, or the maximum if fewer than
 * three distinct values exist.
 * Time: O(n)  Space: O(1)
 */
var thirdMax = function (nums) {
    let max1 = null;
    let max2 = null;
    let max3 = null;

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        
        // Skip duplicate values
        if (num === max1 || num === max2 || num === max3) continue;

        // Guard against null so a real number never loses to an unset slot
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
    
    // max3 stays null when fewer than 3 distinct values exist; check
    // explicitly (rather than truthiness) so a value of 0 is handled correctly
    return max3 !== null ? max3 : max1;
};
