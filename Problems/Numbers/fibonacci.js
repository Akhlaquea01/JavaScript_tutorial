function fibonacci(n) {
    const sequence = [0, 1]; // Initialize Fibonacci sequence with first two numbers

    // Generate Fibonacci sequence up to n
    for (let i = 2; i <= n; i++) {
        const next = sequence[i - 1] + sequence[i - 2]; // Calculate next Fibonacci number
        if (next <= n) {
            sequence.push(next); // Add next Fibonacci number to the sequence if it's less than or equal to n
        } else {
            break; // Break the loop if next Fibonacci number exceeds n
        }
    }

    return sequence; // Return the Fibonacci sequence
}

console.log("Fibonacci sequence up to 20:", fibonacci(20)); // Output: [0, 1, 1, 2, 3, 5, 8, 13]