// Initialize variable
let a = 0;

// First loop - iterates N times
for (let i = 0; i < N; i++) {
    // Second loop - iterates (N - i) times
    for (let j = N; j > i; j--) {
        a += i + j;  // Constant time operation in each inner iteration
    }
}

// Optionally, log the result (if needed)
console.log('Result of a:', a);

/**
 * Time Complexity:
 * The outer loop runs N times, and the inner loop runs (N - i) times for each iteration of the outer loop.
 * 
 * The total number of iterations is the sum of the first N integers, which is O(N^2).
 * 
 * Space Complexity:
 * Only a few variables are used, so the space complexity is O(1).
 * 
 * Final Complexity:
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
