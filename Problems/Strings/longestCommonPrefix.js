const longestCommonPrefix = function (strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0]; // Start with the first string as the initial prefix

    for (let i = 1; i < strs.length; i++) {
        // Check each string and trim the prefix until it matches
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1); // Remove the last character
            if (prefix === "") return "";
        }
    }

    return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
