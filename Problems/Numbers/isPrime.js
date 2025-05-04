function isPrime(n) {
    // If n is less than or equal to 1, it's not prime
    if (n <= 1) {
        return false;
    }

    // Check divisibility from 2 to square root of n
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            // If n is divisible by any number between 2 and square root of n, it's not prime
            return false;
        }
    }

    // If n is not divisible by any number between 2 and square root of n, it's prime
    return true;
}

console.log("Is 7 prime?", isPrime(7)); // Output: true
console.log("Is 12 prime?", isPrime(12)); // Output: false

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