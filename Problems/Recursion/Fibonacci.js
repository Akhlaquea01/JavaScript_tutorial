/**
 * Calculates the nth Fibonacci number via naive double recursion.
 * Time: O(2^n)  Space: O(n) (call stack)
 */
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2); // Branches into two calls per level
}

console.log(fib(10));
