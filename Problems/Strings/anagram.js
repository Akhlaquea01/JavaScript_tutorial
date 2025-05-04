/**
 * Groups anagrams together using a hash map.
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Groups of anagrams
 */
function groupAnagrams(strs) {
    const anagramMap = new Map();

    for (const str of strs) {
        // Sort the string to use as a key
        const sortedStr = str.split('').sort().join('');

        // Group anagrams in the map
        if (anagramMap.has(sortedStr)) {
            anagramMap.get(sortedStr).push(str);
        } else {
            anagramMap.set(sortedStr, [str]);
        }
    }

    return Array.from(anagramMap.values());
}

// Example Usage
const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(input));
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]