function factorial(n) {
    // Base case: if n is 0 or 1, return 1
    if (n === 0 || n === 1) {
        return 1;
    } else {
        // Recursive case: n! = n * (n-1)!
        // Recursively call factorial function with (n - 1)
        return n * factorial(n - 1);
    }
}
console.log("Factorial of 5:", factorial(5)); // Output: 120 (5! = 5 * 4 * 3 * 2 * 1)
console.log("Factorial of 0:", factorial(0)); // Output: 1 (0! = 1)