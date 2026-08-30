/**
 * Builds the sequence of Fibonacci numbers <= n.
 * Returns [] for negative n, [0] when n === 0.
 * Time: O(k)  Space: O(k), where k is the number of terms produced
 */
function fibonacci(n) {
    if (n < 0) return []; // No Fibonacci numbers are <= a negative limit

    const sequence = [0];
    if (n === 0) return sequence;

    sequence.push(1);

    // Generate further Fibonacci numbers while they stay <= n
    for (let i = 2; ; i++) {
        const next = sequence[i - 1] + sequence[i - 2];
        if (next > n) break;
        sequence.push(next);
    }

    return sequence;
}

console.log("Fibonacci sequence up to 20:", fibonacci(20)); // Output: [0, 1, 1, 2, 3, 5, 8, 13]