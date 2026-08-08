// Problem Statement: Write a function to check if a string is a palindrome.

function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Compare the formatted string with its reverse
    for (let i = 0; i < formattedStr.length / 2; i++) {
        if (formattedStr[i] !== formattedStr[formattedStr.length - 1 - i]) {
            return false; // If characters don't match, it's not a palindrome
        }
    }

    return true; // If all characters match, it's a palindrome
}

// Example 1: Palindrome string - "A man, a plan, a canal, Panama"
console.log(isPalindrome("A man, a plan, a canal, Panama"));
// Output: true
// Explanation: The string is "A man a plan a canal Panama". When non-alphanumeric characters are removed and converted to lowercase, it becomes "amanaplanacanalpanama". The string reads the same forwards and backwards, so it's a palindrome.

// Example 2: Non-palindrome string - "hello"
console.log(isPalindrome("hello"));
// Output: false
// Explanation: The string "hello" is not the same when read forwards and backwards, so it's not a palindrome.
