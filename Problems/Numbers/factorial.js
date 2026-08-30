/**
 * Computes n! recursively. Throws a RangeError for negative input.
 * Time: O(n)  Space: O(n) call stack
 */
function factorial(n) {
    // Factorial is undefined for negative numbers
    if (n < 0) {
        throw new RangeError("factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    } else {
        // n! = n * (n-1)!
        return n * factorial(n - 1);
    }
}
console.log("Factorial of 5:", factorial(5)); // Output: 120 (5! = 5 * 4 * 3 * 2 * 1)
console.log("Factorial of 0:", factorial(0)); // Output: 1 (0! = 1)