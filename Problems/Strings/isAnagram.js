/**
 Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 Input: s = "anagram", t = "nagaram"
 Output: true
 */

const isAnagram = function (s, t) {
    // return s.split('').sort().join('') == t.split('').sort().join('');
    if (s.length !== t.length) return false; // Early exit if lengths differ

    const count = new Array(26).fill(0); // Array to count character frequencies (assuming lowercase letters)

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++; // Increment for character in s
        count[t.charCodeAt(i) - 97]--; // Decrement for character in t
    }

    // If all counts are zero, the strings are anagrams
    return count.every(c => c === 0);
};

console.log(isAnagram('nagaram', 'anagram'));
