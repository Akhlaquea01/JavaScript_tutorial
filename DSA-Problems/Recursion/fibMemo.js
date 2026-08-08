/**
 * Calculates nth Fibonacci number using memoization
 * @param {number} n - The Fibonacci number to compute
 * @param {Object} memo - Cache for storing computed results
 * @returns {number} - The nth Fibonacci number
 */
function fibMemoVerbose(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n] !== undefined) {
        console.log(`Cache hit for n = ${n}: ${memo[n]}`);
        return memo[n];
    }
    console.log(`Computing fibMemo(${n})`); // Log when computation happens
    memo[n] = fibMemoVerbose(n - 1, memo) + fibMemoVerbose(n - 2, memo);
    return memo[n];
}

console.log(fibMemoVerbose(5));
// console.log(fibMemoVerbose(5));