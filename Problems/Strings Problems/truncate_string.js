function truncate(str, length) {
    if (str.length > length && length > 0) {
        return str.slice(0, length) + "...";
    } else {
        return str;
    }
}

// Example usage
console.log(truncate("What is the airspeed velocity of an unladen swallow?", 10)); // Output: "What is th..."
console.log(truncate("Hello", 20)); // Output: "Hello" (no truncation)
