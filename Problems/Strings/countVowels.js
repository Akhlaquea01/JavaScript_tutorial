/**
 * Counts the number of vowels in a string (case-insensitive).
 * Time: O(n)  Space: O(1)
 */
function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    str = str.toLowerCase();

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