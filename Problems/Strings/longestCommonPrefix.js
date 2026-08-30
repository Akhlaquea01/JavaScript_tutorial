/**
 * Finds the longest common prefix string among an array of strings by shrinking a candidate prefix until it matches every string.
 * Time: O(n * m)  Space: O(1)
 */
const longestCommonPrefix = function (strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }

    return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
