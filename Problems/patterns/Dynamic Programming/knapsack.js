/**
 * 🧮 0/1 Knapsack Problem
 *
 * Given:
 * - A set of items, each with a weight and a value
 * - A knapsack with a maximum weight capacity
 *
 * Goal:
 * - Choose a subset of items such that the total weight does not exceed the capacity
 * - Maximize the total value of selected items
 *
 * ❗ Note: You can either take an item or leave it — no fractions allowed (0/1 constraint)
 *
 * Example:
 *   weights = [1, 3, 4, 5]
 *   values  = [1, 4, 5, 7]
 *   capacity = 7
 *   Output: 9 (take items with weight 3 and 4 → values 4 + 5)
 */

function knapsack(weights, values, capacity) {
    const itemCount = weights.length;

    // dp[i][w] will hold the max value for first i items and capacity w
    const dp = Array.from({ length: itemCount + 1 }, () =>
        Array(capacity + 1).fill(0)
    );

    // Build the dp table in bottom-up manner
    for (let i = 1; i <= itemCount; i++) {
        for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
            const currentWeight = weights[i - 1];
            const currentValue = values[i - 1];

            if (currentWeight <= currentCapacity) {
                // Two options: exclude or include current item
                dp[i][currentCapacity] = Math.max(
                    dp[i - 1][currentCapacity],                           // exclude
                    currentValue + dp[i - 1][currentCapacity - currentWeight] // include
                );
            } else {
                // Item too heavy to include, inherit value from previous item set
                dp[i][currentCapacity] = dp[i - 1][currentCapacity];
            }
        }
    }

    // Final answer: max value using all items and full capacity
    return dp[itemCount][capacity];
}

// Test the function with sample data
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;

console.log(knapsack(weights, values, capacity)); // Output: 9
