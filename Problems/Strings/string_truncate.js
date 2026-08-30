/**
 * Truncates a string to the given length using slice (only if the input is a String).
 * Time: O(n)  Space: O(n)
 */
function truncateStr(string, length) {
    if (string.constructor === String) {
        return string.slice(0, length);
    }
}

console.log(truncateStr("string", 20));