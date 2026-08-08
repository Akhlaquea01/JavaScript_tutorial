/**
 * Check Anagram Equality

Write a function called same(str1, str2) that accepts two strings. The function should return true if:

Both strings contain exactly the same characters (case-insensitive).

The characters in each string may be in any order.

The frequency of each character in both strings must be the same.

Otherwise, return false.

🔁 This is essentially checking if the two strings are anagrams of each other.
 */

function same(str1, str2) {
    str1 = str1.toLowerCase(); // Convert str1 to lowercase
    str2 = str2.toLowerCase(); // Convert str2 to lowercase
    if (str1.length !== str2.length) return false; // Check if lengths are equal

    const frequencyCounter1 = {}; // Object to store frequency of elements in str1
    const frequencyCounter2 = {}; // Object to store frequency of elements in str2

    // Count frequencies of elements in str1
    for (let ch of str1) {
        frequencyCounter1[ch] = (frequencyCounter1[ch] || 0) + 1;
    }

    // Count frequencies of elements in str2
    for (let ch of str2) {
        frequencyCounter2[ch] = (frequencyCounter2[ch] || 0) + 1;
    }

    // Check if every value in str1 has its corresponding value squared in str2
    for (let key in frequencyCounter1) {
        if (!(key in frequencyCounter2)) return false; // Check if square exists in str2
        if (frequencyCounter1[key] !== frequencyCounter2[key]) return false; // Check frequencies
    }

    return true; // All checks passed, arrays are the same
}

console.log(same("A", "AB"));
console.log(same('Akh', 'khA'));

// Method 2:
function same2(str1, str2) {
    if (str1.length !== str2.length) return false;

    const normalize = str =>
        str.toLowerCase().split('').sort().join('');

    return normalize(str1) === normalize(str2);
}
console.log(same2("A", "AB"));
console.log(same2('Akh', 'khA')); 
