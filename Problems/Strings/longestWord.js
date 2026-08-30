/**
 * Find the longest word in a string.
 * @param {string} str - The input string.
 * Time: O(n)  Space: O(n)
 */

function longestWord(str) {
    const words = str.split(' ').filter(Boolean);
    let longest = "";

    for (const word of words) {
        if (word.length >= longest.length) {
            longest = word;
        }
    }

    return longest;
}
console.log(longestWord("The quick brown fox jumps over the lazy dog")); // Output: "jumps"