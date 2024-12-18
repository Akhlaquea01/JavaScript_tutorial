// Find the Index of the First Occurrence in a String

const strStr = function (haystack, needle) {
    return haystack.indexOf(needle);
};

console.log(strStr('Akhlaque', 'aq'));

function strStr2(haystack, needle) {
    const needleLength = needle.length;
    const haystackLength = haystack.length;

    for (let i = 0; i <= haystackLength - needleLength; i++) {
        if (haystack.substring(i, i + needleLength) === needle) {
            return i; // Return the index if a match is found
        }
    }
    return -1; // Return -1 if no match is found
}
console.log(strStr2('Akhlaque', 'aq'));