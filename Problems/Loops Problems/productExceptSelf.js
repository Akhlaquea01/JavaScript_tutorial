/**
 * Calculates the product of all elements except the current element for each position
 * @param {number[]} nums - Input array of numbers
 * @return {number[]} Array where each element is product of all other elements
 */

function productExceptSelf(nums) {
    let n = nums.length;
    let result = [];

    for (let i = 0; i < n; i++) {
        let product = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= nums[j]; // Multiply all numbers except nums[i]
            }
        }
        result.push(product);
    }

    return result;
}


function productExceptSelf2(nums) {
    let n = nums.length;
    let result = new Array(n).fill(1);

    // For each position, multiply all elements to its left
    // We calculate the product of all left-side elements before each index:[1,1,2,6]
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        // Store the product of all left elements
        result[i] = leftProduct;
        // Update leftProduct for next iteration
        leftProduct *= nums[i];
    }

    // For each position, multiply all elements to its right with the existing left product
    // multiply each element by the product of all right-side elements:[24*1,12*1,4*2,1*6]
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        // Multiply the existing left product with right product
        result[i] *= rightProduct;
        // Update rightProduct for next iteration
        rightProduct *= nums[i];
    }

    return result;
}

// Example usage:
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
console.log(productExceptSelf2([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
