// Problem Statement: Write a function to count the number of vowels in a string.

function countVowels(str) {
    // Define an array of vowels
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    // Convert the string to lowercase to handle case-insensitivity
    str = str.toLowerCase();

    // Iterate through the string and count vowels
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

// Usage example
console.log(countVowels("hello")); // Output: 2
console.log(countVowels("world")); // Output: 1