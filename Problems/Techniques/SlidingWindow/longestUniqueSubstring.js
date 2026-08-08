/**
 * Problem Statement:
 * -------------------
 * Given a string, find the length of the longest substring without repeating characters.
 * 
 * Example:
 * Input: "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 */

// Optimized Sliding Window Approach (Time Complexity: O(n)) ✅
// ------------------------------------------------------------
// 1. Use a sliding window to track the current substring without repeating characters.
// 2. Use a Set to keep track of characters inside the current window.
// 3. Move the `endIndex` forward one character at a time:
//    - If the character is not in the set, add it and update maxLength.
//    - If it is, remove characters from the start of the window (`startIndex`) until the duplicate is removed.
// 4. The window always represents a substring with all unique characters.
function lengthOfLongestUniqueSubstring(input) {
    let seenCharacters = new Set();
    let maxLength = 0;
    let startIndex = 0;

    for (let endIndex = 0; endIndex < input.length; endIndex++) {
        const currentChar = input[endIndex];

        // Shrink the window from the left if the character is already in the set
        while (seenCharacters.has(currentChar)) {
            seenCharacters.delete(input[startIndex]);
            startIndex++;
        }

        // Add the current character and update maxLength
        seenCharacters.add(currentChar);
        maxLength = Math.max(maxLength, endIndex - startIndex + 1);
    }

    return maxLength;
}

// Example
const inputString = "abcabcbb";
console.log(lengthOfLongestUniqueSubstring(inputString)); // Output: 3
