/**
1=> (15^10) * n + 12099
2=> n^1.98
3=> n^3 / (sqrt(n))
4=> (2^20) * n

Which of the following is not bounded by O(n^2)?
 */


// Initialize variable n for testing
let n = 1000;

// Expression 1: (15^10) * n + 12099
const expr1 = Math.pow(15, 10) * n + 12099;
// Since (15^10) is a constant, the time complexity is O(n)
console.log("Expression 1: O(n)", expr1);

// Expression 2: n^1.98
const expr2 = Math.pow(n, 1.98);
// This is bounded by O(n^2), since 1.98 < 2
console.log("Expression 2: O(n^1.98) is bounded by O(n^2):", expr2);

// Expression 3: n^3 / sqrt(n) = n^2.5
const expr3 = Math.pow(n, 3) / Math.sqrt(n);
// This grows faster than O(n^2), hence not bounded by O(n^2)
console.log("Expression 3: O(n^2.5) is not bounded by O(n^2):", expr3);

// Expression 4: (2^20) * n
const expr4 = Math.pow(2, 20) * n;
// This is O(n) because (2^20) is a constant factor
console.log("Expression 4: O(n)", expr4);

// Final result: Expression 3 is not bounded by O(n^2)
