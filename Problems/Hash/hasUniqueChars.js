/**
 * Problem Description: Has Unique Chars (using Set)
 *
 * Checks if all characters in a string are unique.
 *
 * Input:
 * - string: The input string.
 *
 * Output:
 * - True if all characters are unique, false otherwise.
 *
 * Constraints:
 * - Use a Set.
 * - Case-sensitive.
 * - Empty string returns true.
 */

/**
 * Checks if a string contains only unique characters using a Set.
 *
 * @param {string} string - The input string to check.
 * @returns {boolean} True if all characters are unique, false otherwise.
 */
function hasUniqueChars(string) {
    // Step 1: Create a new Set.
    // This Set will store the characters we encounter as we iterate through the string.
    const charSet = new Set();

    // Step 2: Iterate through each character of the input string.
    // We can use a for...of loop for easy iteration over string characters.
    for (const char of string) {
        // Step 3: Check if the current character is already in the Set.
        // Set.has(char) returns true if 'char' is already in the Set, false otherwise.
        if (charSet.has(char)) {
            // If the character is already in the Set, it means we have found a duplicate.
            // The string does NOT have unique characters. Return false immediately.
            return false;
        }

        // If the character was NOT in the Set, it means this is the first time we've seen it.
        // Add the character to the Set.
        charSet.add(char);
    }

    // Step 4: If the loop completes without finding any duplicates (i.e., we never returned false),
    // it means all characters encountered were unique.
    // Return true. This also correctly handles the empty string case, as the loop won't run,
    // and it will directly reach this return statement.
    return true;
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Unique Chars
    const test1 = 'abc';
    console.log(`Input: "${test1}"`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test1)}`); // Expected: true
    console.log("---------------");

    // Example 2: Duplicate Chars
    const test2 = 'aabb';
    console.log(`Input: "${test2}"`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test2)}`); // Expected: false
    console.log("---------------");

    // Example 3: Single Char
    const test3 = 'a';
    console.log(`Input: "${test3}"`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test3)}`); // Expected: true
    console.log("---------------");

    // Example 4: Empty String
    const test4 = '';
    console.log(`Input: "${test4}" (Empty String)`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test4)}`); // Expected: true
    console.log("---------------");

    // Example 5: Case Sensitivity
    const test5 = 'Aa'; // 'A' and 'a' are different characters
    console.log(`Input: "${test5}" (Case Sensitivity)`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test5)}`); // Expected: true
    console.log("---------------");

    // Example 6: Case Sensitivity with Duplicates
    const test6 = 'aAab'; // 'a' repeats
    console.log(`Input: "${test6}" (Case Sensitivity with Duplicates)`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test6)}`); // Expected: false
    console.log("---------------");

    // Example 7: Longer string with duplicates
    const test7 = 'programming'; // 'r', 'g', 'm' repeat
    console.log(`Input: "${test7}" (Longer string with duplicates)`);
    console.log(`Has Unique Chars: ${hasUniqueChars(test7)}`); // Expected: false
    console.log("---------------");

    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Unique Chars:
    Input: "abc"
    Has Unique Chars: true
    ---------------
    Duplicate Chars:
    Input: "aabb"
    Has Unique Chars: false
    ---------------
    Single Char:
    Input: "a"
    Has Unique Chars: true
    ---------------
    Empty String:
    Input: "" (Empty String)
    Has Unique Chars: true
    ---------------
    Case Sensitivity:
    Input: "Aa" (Case Sensitivity)
    Has Unique Chars: true
    ---------------
    Case Sensitivity with Duplicates:
    Input: "aAab" (Case Sensitivity with Duplicates)
    Has Unique Chars: false
    ---------------
    Longer string with duplicates:
    Input: "programming" (Longer string with duplicates)
    Has Unique Chars: false
    ---------------
    --- End Sample Run ---
*/
