/**
 * Brute-force: for each index, multiplies every other element together (nested loop).
 * Time: O(n^2)  Space: O(n)
 */
function productExceptSelf(nums) {
    let n = nums.length;
    let result = [];

    for (let i = 0; i < n; i++) {
        let product = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }
        result.push(product);
    }

    return result;
}


/**
 * Optimized: builds the result from running left-side and right-side products in two passes.
 * Time: O(n)  Space: O(n)
 */
function productExceptSelf2(nums) {
    let n = nums.length;
    let result = new Array(n).fill(1);

    // Pass 1: result[i] becomes the product of all elements to the left of i
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Pass 2: multiply in the product of all elements to the right of i
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

// Example usage:
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
console.log(productExceptSelf2([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
