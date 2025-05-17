// Initialize variables
let a = 0, b = 0;

// First nested loop - sum values for 'a'
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        a += j;  // Constant time operation in each inner iteration
    }
}

// Second loop - sum values for 'b'
for (let k = 0; k < N; k++) {
    b += k;  // Constant time operation in each iteration
}

// Optionally, log the results to the console (if needed)
console.log('Sum of a:', a);
console.log('Sum of b:', b);

/**
 * Time Complexity:
 * The first nested loop runs N * N times, which gives O(N^2) time complexity.
 * The second loop runs N times, which gives O(N) time complexity.
 * 
 * Total time complexity: O(N^2) + O(N) = O(N^2) (since N^2 dominates N).
 * 
 * Space Complexity:
 * The space used is constant, as we only use a few variables (a, b, i, j, k).
 * Thus, space complexity is O(1).
 * 
 * Final Complexity:
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
