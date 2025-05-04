/**
 * Finds the longest palindromic substring.
 * @param {string} s - Input string
 * @returns {string} - Longest palindrome
 */
function longestPalindrome(s) {
    if (s.length < 1) return "";

    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes (e.g., "bab")
        const len1 = expandAroundCenter(s, i, i);
        // Check for even-length palindromes (e.g., "baab")
        const len2 = expandAroundCenter(s, i, i + 1);

        const maxLen = Math.max(len1, len2);

        // Update the longest palindrome boundaries
        if (maxLen > end - start) {
            start = i - Math.floor((maxLen - 1) / 2);
            end = i + Math.floor(maxLen / 2);
        }
    }

    return s.substring(start, end + 1);
}

/**
 * Expands around the center to find the longest palindrome.
 * @param {string} s - Input string
 * @param {number} left - Left expansion index
 * @param {number} right - Right expansion index
 * @returns {number} - Length of the palindrome
 */
function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1; // Length of the palindrome
}

// Example Usage
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"