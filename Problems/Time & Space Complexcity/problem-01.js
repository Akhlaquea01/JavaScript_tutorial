// Initialize variables
let a = 0, b = 0;

// Function to generate a random number between 0 and 99 (simulating rand())
const rand = () => Math.floor(Math.random() * 100); // Random number between 0 and 99

// First loop - sum random values for 'a' (runs N times)
for (let i = 0; i < N; i++) {
    a += rand();  // O(1) operation in each iteration
}

// Second loop - sum random values for 'b' (runs M times)
for (let j = 0; j < M; j++) {
    b += rand();  // O(1) operation in each iteration
}

// Optionally, log the results to the console (if needed)
console.log('Sum of a:', a);
console.log('Sum of b:', b);

/**
 * Time Complexity:
 * The first loop runs N times. In each iteration, rand() is called, which is assumed to take constant time O(1). 
 * Thus, the total time for the first loop is O(N).
 * 
 * The second loop runs M times, and each call to rand() takes O(1). 
 * Hence, the total time for the second loop is O(M).
 * 
 * The total time complexity is the sum of both loops:
 * O(N) + O(M) = O(N + M)
 * In Big-O notation, we drop constants and smaller terms, so the time complexity is O(N + M).
 * 
 * Space Complexity:
 * The variables 'a' and 'b' both occupy constant space, i.e., O(1).
 * The loops only use a small, fixed amount of space for the loop counters 'i' and 'j', which is also O(1).
 * rand() is assumed to take O(1) space, as stated in the problem.
 * Since the space used does not depend on the size of N or M and remains constant, the space complexity is O(1).
 * 
 * Final Complexity:
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
