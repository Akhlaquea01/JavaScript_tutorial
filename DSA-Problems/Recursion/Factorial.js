function factorial(n) {
    // 1. Base Case
    if (n === 0 || n === 1) {
        return 1;
    }

    // 2. Recursive Call & Relation
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
