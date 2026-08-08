/**
 * Problem Statement: Implement Debouncing and Throttling in JavaScript.
 *
 * 1. **Debouncing**: Ensures that a function is only executed after a specified delay 
 *    has passed since the last time it was invoked. If the function is called again 
 *    before the delay expires, the timer resets.  
 *    - Use case: Search input handling (wait until user stops typing before making API call).
 *    - Analogy: A child asks for a chocolate. If they remain silent for 10 minutes, they get it.
 *      If they ask again before 10 minutes, the timer resets.
 *
 */

/**
 * Debounce Function
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - A debounced function.
 */
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer); // Reset the timer
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Debounce Example: Logging user input after the user stops typing
const logInput = debounce((text) => console.log(`User typed: ${text}`), 1000);

// Simulate user typing
logInput("H");
logInput("He");
logInput("Hel");
setTimeout(() => logInput("Hello"), 500); // Only "Hello" will be logged after 1000ms
