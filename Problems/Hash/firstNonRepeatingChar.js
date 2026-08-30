/**
 * Problem Description: First Non-Repeating Character (using Hash Map)
 *
 * Finds the first character in a string that does not repeat.
 *
 * Input:
 * - string: The input string.
 *
 * Output:
 * - The first non-repeating character, or null if none exists or string is empty.
 *
 * Constraints:
 * - Use a hash map (Map or Object) for frequency counting.
 */

/**
 * Finds the first non-repeating character in a string using a Map.
 * Time: O(n)  Space: O(n)
 *
 * @param {string} string - The input string to analyze.
 * @returns {string | null} The first non-repeating character, or null.
 */
function firstNonRepeatingChar(string) {
    if (string.length === 0) {
        return null;
    }

    // First pass: count frequency of each character.
    const charCounts = new Map();
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i);
        const currentCount = charCounts.get(char) || 0;
        charCounts.set(char, currentCount + 1);
    }

    // Second pass: return the first character whose count is exactly 1.
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i);
        if (charCounts.get(char) === 1) {
            return char;
        }
    }

    return null;
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: All Unique
    const test1 = 'abcde';
    console.log(`Input: "${test1}"`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test1))}`); // Expected: "a"
    console.log("---------------");

    // Example 2: Some Duplicates
    const test2 = 'aabbccdef';
    console.log(`Input: "${test2}"`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test2))}`); // Expected: "d"
    console.log("---------------");

    // Example 3: All Duplicates
    const test3 = 'aabbcc';
    console.log(`Input: "${test3}"`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test3))}`); // Expected: null
    console.log("---------------");

    // Example 4: Empty String
    const test4 = '';
    console.log(`Input: "${test4}" (Empty String)`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test4))}`); // Expected: null
    console.log("---------------");

    // Example 5: Single Character
    const test5 = 'a';
    console.log(`Input: "${test5}" (Single Character)`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test5))}`); // Expected: "a"
    console.log("---------------");

    // Example 6: Multiple Non-Repeating Chars (checking the first one)
    const test6 = 'abcdaef';
    console.log(`Input: "${test6}" (Multiple Non-Repeating Chars)`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test6))}`); // Expected: "b" (a repeats)
    console.log("---------------");

    // Example 7: With numbers and special characters
    const test7 = "112233!!@@!!@@$";
    console.log(`Input: "${test7}" (Numbers and Special Chars)`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test7))}`); // Expected: "$"
    console.log("---------------");

    // Example 8: Case-sensitive
    const test8 = "AaBbA";
    console.log(`Input: "${test8}" (Case-sensitive)`);
    console.log(`First Non-Repeating: ${JSON.stringify(firstNonRepeatingChar(test8))}`); // Expected: "a"
    console.log("---------------");


    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    All Unique:
    Input: "abcde"
    First Non-Repeating: "a"
    ---------------
    Some Duplicates:
    Input: "aabbccdef"
    First Non-Repeating: "d"
    ---------------
    All Duplicates:
    Input: "aabbcc"
    First Non-Repeating: null
    ---------------
    Empty String:
    Input: "" (Empty String)
    First Non-Repeating: null
    ---------------
    Single Character:
    Input: "a" (Single Character)
    First Non-Repeating: "a"
    ---------------
    Multiple Non-Repeating Chars:
    Input: "abcdaef" (Multiple Non-Repeating Chars)
    First Non-Repeating: "b"
    ---------------
    Numbers and Special Chars:
    Input: "112233!!@@!!@@$" (Numbers and Special Chars)
    First Non-Repeating: "$"
    ---------------
    Case-sensitive:
    Input: "AaBbA" (Case-sensitive)
    First Non-Repeating: "a"
    ---------------
    --- End Sample Run ---
*/
