/**
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal
substring
 consisting of non-space characters only.
 * Time: O(n)  Space: O(n)
 */

const lengthOfLastWord = function (s) {
    s = s.trim();
    const arry = s.split(' ');
    return arry[arry.length - 1].length;
};

console.log(lengthOfLastWord('   fly me   to   the moon  '));

/**
 * Finds the length of the last word by scanning backward from the end of the string.
 * Time: O(n)  Space: O(1)
 */
const lengthOfLastWord2 = function (s) {
    s = s.trim();
    let length = 0;
    for (let i = s.length - 1;
        i >= 0; i--) {
        if (s[i] === ' ') {
            break;
        } length++;
    }
    return length;
};

console.log(lengthOfLastWord2('   fly me   to   the moon  '));