// Find the Index of the First Occurrence in a String

/**
 * Finds the index of the first occurrence of needle in haystack using the built-in indexOf.
 * Time: O(n * m)  Space: O(1)
 */
const strStr = function (haystack, needle) {
    return haystack.indexOf(needle);
};

console.log(strStr('Akhlaque', 'aq'));

/**
 * Finds the index of the first occurrence of needle in haystack by checking every starting position.
 * Time: O(n * m)  Space: O(1)
 */
function strStr2(haystack, needle) {
    const needleLength = needle.length;
    const haystackLength = haystack.length;

    for (let i = 0; i <= haystackLength - needleLength; i++) {
        if (haystack.substring(i, i + needleLength) === needle) {
            return i;
        }
    }
    return -1;
}
console.log(strStr2('Akhlaque', 'aq'));