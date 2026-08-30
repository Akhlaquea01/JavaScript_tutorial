/**
 Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 Input: s = "anagram", t = "nagaram"
 Output: true
 * Time: O(n)  Space: O(1)
 */

const isAnagram = function (s, t) {
    if (s.length !== t.length) return false;

    const count = new Array(26).fill(0); // Array to count character frequencies (assuming lowercase letters)

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }

    // If all counts are zero, the strings are anagrams
    return count.every(c => c === 0);
};

console.log(isAnagram('nagaram', 'anagram'));
