/**
 * Computes n! recursively.
 * Time: O(n)  Space: O(n) (call stack)
 */
function factorial(n) {
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
