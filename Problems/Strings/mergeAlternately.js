/**
You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s
 */
const mergeAlternately = function (word1, word2) {
    const result = [];
    const maxLength = Math.max(word1.length, word2.length);

    for (let index = 0; index < maxLength; index++) {
        if (index < word1.length) {
            result.push(word1[index]);
        }
        if (index < word2.length) {
            result.push(word2[index]);
        }
    }

    return result.join('');
};

console.log(mergeAlternately('ab', 'pqrs')); // Output: "apbqrs"
