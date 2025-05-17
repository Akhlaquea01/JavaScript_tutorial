/**
 * Problem Description: Group Anagrams (using Hash Map)
 *
 * Given an array of strings, group the anagrams together.
 *
 * Input:
 * - strings: An array of strings.
 *
 * Output:
 * - An array of arrays, where each inner array contains strings that are anagrams.
 *
 * Constraints:
 * - Use a hash map (Map or Object).
 */

/**
 * Groups anagrams from an array of strings using a Map.
 * Anagrams are grouped by using their sorted character string as a key in the map.
 *
 * @param {string[]} strings - The input array of strings.
 * @returns {string[][]} An array of arrays, each containing a group of anagrams.
 */
function groupAnagrams(strings) {
    // Handle the edge case of an empty input array.
    if (strings.length === 0) {
        return [];
    }

    // Step 1: Create a Map to store anagram groups.
    // Keys will be the canonical form (sorted string), values will be arrays of original strings.
    const anagramGroups = new Map();

    // Step 2: Iterate through each string in the input array.
    for (const string of strings) {
        // Step 3: Compute the canonical form of the current string.
        // Convert the string to an array of characters, sort it, and join back into a string.
        const chars = Array.from(string); // Convert string to array of chars
        chars.sort();                     // Sort the array of characters alphabetically
        const canonical = chars.join(''); // Join the sorted characters back into a string

        // Step 4 & 5: Use the canonical form as the key in the map to group anagrams.
        // Check if a group for this canonical form already exists in the map.
        if (anagramGroups.has(canonical)) {
            // If a group exists, get the array associated with this canonical key
            // and push the current original string into that array.
            anagramGroups.get(canonical).push(string);
        } else {
            // If no group exists for this canonical form, create a new array
            // containing the current original string, and set this new array
            // as the value for the canonical key in the map.
            const group = [string];
            anagramGroups.set(canonical, group);
        }
    }

    // Step 6 & 7: Extract all the values (the arrays of anagram groups) from the map
    // and return them as a new array of arrays.
    return Array.from(anagramGroups.values());
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Lowercase Anagrams
    const test1 = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    console.log("Lowercase Anagrams:");
    console.log("Input: ", JSON.stringify(test1));
    console.log("Output: ", JSON.stringify(groupAnagrams(test1)));
    // Expected Output: [["eat","tea","ate"],["tan","nat"],["bat"]] (order of inner arrays may vary)
    console.log("---------------");

    // Example 2: Mixed Case Anagrams (Note: Case-sensitive sorting means 'E' != 'e')
    const test2 = ['Eat', 'Tea', 'Tan', 'Ate', 'Nat', 'Bat'];
    console.log("Mixed Case Anagrams:");
    console.log("Input: ", JSON.stringify(test2));
    console.log("Output: ", JSON.stringify(groupAnagrams(test2)));
    // Expected Output: [["Eat"],["Tea"],["Tan"],["Ate"],["Nat"],["Bat"]] (as no mixed-case anagrams provided)
    console.log("---------------");

    // Example 3: No Anagrams
    const test3 = ['hello', 'world', 'test'];
    console.log("No Anagrams:");
    console.log("Input: ", JSON.stringify(test3));
    console.log("Output: ", JSON.stringify(groupAnagrams(test3)));
    // Expected Output: [["hello"],["world"],["test"]] (each string in its own group)
    console.log("---------------");

    // Example 4: Empty Strings
    const test4 = ['', '', ''];
    console.log("Empty Strings:");
    console.log("Input: ", JSON.stringify(test4));
    console.log("Output: ", JSON.stringify(groupAnagrams(test4)));
    // Expected Output: [["","",""]] (empty string is an anagram of itself)
    console.log("---------------");

    // Example 5: Single Characters (some are duplicates)
    const test5 = ['a', 'b', 'a'];
    console.log("Single Characters:");
    console.log("Input: ", JSON.stringify(test5));
    console.log("Output: ", JSON.stringify(groupAnagrams(test5)));
    // Expected Output: [["a","a"],["b"]]
    console.log("---------------");

    // Example 6: With numbers and special characters
    const test6 = ["123", "321", "!!", "!!", "$$$"];
    console.log("Numbers and Special Characters:");
    console.log("Input: ", JSON.stringify(test6));
    console.log("Output: ", JSON.stringify(groupAnagrams(test6)));
    // Expected Output: [["123","321"],["!!","!!"],["$$$"]]
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run (Order of inner arrays may vary):
    -----------------------------
    --- Sample Run ---
    Lowercase Anagrams:
    Input: ["eat","tea","tan","ate","nat","bat"]
    Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
    ---------------
    Mixed Case Anagrams:
    Input: ["Eat","Tea","Tan","Ate","Nat","Bat"]
    Output: [["Eat"],["Tea"],["Tan"],["Ate"],["Nat"],["Bat"]]
    ---------------
    No Anagrams:
    Input: ["hello","world","test"]
    Output: [["hello"],["world"],["test"]]
    ---------------
    Empty Strings:
    Input: ["","",""]
    Output: [["","",""]]
    ---------------
    Single Characters:
    Input: ["a","b","a"]
    Output: [["a","a"],["b"]]
    ---------------
    Numbers and Special Characters:
    Input: ["123","321","!!","!!","$$$"]
    Output: [["123","321"],["!!","!!"],["$$$"]]
    ---------------
    --- End Sample Run ---
*/
