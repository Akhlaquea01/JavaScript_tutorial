/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
 * @param {*} n 
 */
let climbStairs = function (n) {
    // Base case: if n is small, handle directly
    if (n <= 1) {
        return 1;
    }

    // Initialize two variables to represent the number of ways for the last two steps
    let previousWays = 1; // Ways to reach step 1 (or step 0 in a 0-indexed sense)
    let currentWays = 1;  // Ways to reach step 1

    // Iterate from the second step up to n
    for (let i = 2; i <= n; i++) {
        // The number of ways to reach the current step is the sum of the ways to reach the previous two steps
        const nextWays = previousWays + currentWays;
        previousWays = currentWays;
        currentWays = nextWays;
    }

    return currentWays;
};
let climbStairs2 = function (n) {
    // Base case 1: If the number of stairs is negative, it's impossible.
  // There are 0 ways to climb a negative number of stairs.
  if (n < 0) {
    return 0;
  }

  // Base case 2: If we are at the top (0 stairs left), there is one way to be there
  // (by having taken all necessary steps). This is the goal state.
  if (n === 0) {
    return 1;
  }

  // Recursive step: To find the number of ways to climb 'n' stairs,
  // we can either take 1 step or 2 steps from the current position.
  
  // Calculate the number of ways if we take one step. This leaves 'n-1' stairs.
  const one_step = climbStairs2(n - 1);
  
  // Calculate the number of ways if we take two steps. This leaves 'n-2' stairs.
  const two_step = climbStairs2(n - 2);

  // The total number of ways to climb 'n' stairs is the sum of the ways
  // from taking one step and two steps.
  return one_step + two_step;
};
console.log(climbStairs2(30))