function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = `${fn.name}-${JSON.stringify(args)}`; // Include function name in the key

        if (cache.has(key)) {
            console.log("Fetching from cache:", key);
            return cache.get(key);
        }

        console.log("Calculating result for:", key);
        const result = fn(...args);
        cache.set(key, result);

        return result;
    };
}

// Uses Example

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// Memoize different operations
const memoizedAdd = memoize(add);
const memoizedSubtract = memoize(subtract);
const memoizedMultiply = memoize(multiply);

console.log(memoizedAdd(1, 2));        // Calculating result for: add-[1,2] -> 3
console.log(memoizedAdd(1, 2));        // Fetching from cache: add-[1,2] -> 3

console.log(memoizedSubtract(1, 2));   // Calculating result for: subtract-[1,2] -> -1
console.log(memoizedSubtract(1, 2));   // Fetching from cache: subtract-[1,2] -> -1

console.log(memoizedMultiply(2, 3));   // Calculating result for: multiply-[2,3] -> 6
console.log(memoizedMultiply(2, 3));   // Fetching from cache: multiply-[2,3] -> 6
