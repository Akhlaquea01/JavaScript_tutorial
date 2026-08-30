/**
 * Checks whether n is a prime number via trial division up to sqrt(n).
 * Time: O(sqrt(n))  Space: O(1)
 */
function isPrime(n) {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

console.log("Is 7 prime?", isPrime(7)); // Output: true
console.log("Is 12 prime?", isPrime(12)); // Output: false

// Naive O(n) variant, kept for comparison
function isPrime2(p) {
    if (p <= 1) return false;

    for (let i = 2; i < p; i++) {
        if (p % i === 0) {
            return false;
        }
    }

    return true;
}
console.log("Is 7 prime?", isPrime(7)); // Output: true