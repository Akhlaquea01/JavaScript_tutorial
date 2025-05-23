/**
 * Problem Statement: Implement Debouncing and Throttling in JavaScript.
 * 
 * Throttling: Ensures that a function is executed at most once in a specified 
 * time interval, ignoring additional calls until the interval is over.  
 * 
 * Use case: Limiting button clicks or API requests in rapid succession.
 * 
 * Analogy: A child asks for food, and the mother says food will be served in 10 minutes. 
 * If the child keeps asking, they are ignored until the 10 minutes are up.
 */

/**
 * Throttle Function
 * @param {Function} func - The function to be throttled.
 * @param {number} limit - The time interval in milliseconds.
 * @returns {Function} - A throttled function.
 */
function throttle(func, limit) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            func.apply(this, args); // Pass arguments to the original function
            lastCall = now;
        }
    };
}

// Example Usage:

// Throttle Example: Limiting button clicks with arguments
const logClick = throttle((name) => console.log(`Button clicked by ${name}`), 2000);

// Simulate button clicks with arguments
logClick("Alice"); // Executes immediately
setTimeout(() => logClick("Bob"), 500);   // Ignored
setTimeout(() => logClick("Charlie"), 2500); // Executes after 2.5s
