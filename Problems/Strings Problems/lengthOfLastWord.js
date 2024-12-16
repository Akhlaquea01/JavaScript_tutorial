/**
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal 
substring
 consisting of non-space characters only.
 */

const lengthOfLastWord = function (s) {
    s = s.trim();
    const arry = s.split(' ');
    return arry[arry.length - 1].length;
};

console.log(lengthOfLastWord('   fly me   to   the moon  '));

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