/**
 * Problem Description: Item in Common (using Hash Map)
 *
 * Given two arrays, determine if they have any items in common.
 *
 * Input:
 * - arr1: An array of elements.
 * - arr2: An array of elements.
 *
 * Output:
 * - A boolean value: true if there is at least one common element, false otherwise.
 *
 * Constraints:
 * - The solution should utilize a hash map (or object in JavaScript) to achieve better
 * time complexity than a brute-force nested loop approach.
 * - Elements can be of any data type that can be used as a hash map key (typically strings,
 * numbers, booleans).
 */

/**
 * Explanation of Approaches:
 *
 * 1. Brute Force (Nested Loops):
 * - Iterate through each element of the first array (arr1).
 * - For each element in arr1, iterate through each element of the second array (arr2).
 * - If a match is found (arr1[i] === arr2[j]), return true.
 * - If the nested loops complete without finding a match, return false.
 * - Time Complexity: O(n*m), where n is the length of arr1 and m is the length of arr2.
 * This can be O(n^2) if the arrays are of similar size, which is inefficient for large inputs.
 * - Space Complexity: O(1) (constant extra space).
 *
 * 2. Using a Hash Map:
 * - Create an empty hash map (e.g., a JavaScript object).
 * - Iterate through the first array (arr1) and store each element as a key in the hash map.
 * The value associated with the key doesn't strictly matter, just the presence of the key.
 * - Iterate through the second array (arr2). For each element, check if it exists as a key
 * in the hash map created from arr1.
 * - If an element from arr2 is found in the hash map, it means that element is present
 * in both arrays. A common item is found, so immediately return true.
 * - If the second loop completes without finding any element from arr2 in the hash map,
 * it means there are no common elements. Return false.
 * - Time Complexity: O(n + m), where n is the length of arr1 and m is the length of arr2.
 * Iterating through arr1 takes O(n) time, and adding elements to a hash map is typically
 * O(1) on average. Iterating through arr2 takes O(m) time, and checking for existence
 * in a hash map is typically O(1) on average. The total time is dominated by the two
 * separate loops. This is significantly faster than O(n*m) for large inputs.
 * - Space Complexity: O(n) or O(m), depending on which array's elements are stored in the map.
 * In this implementation, we store elements from arr1, so it's O(n) extra space for the hash map.
 *
 * This implementation uses the Hash Map approach for better time efficiency.
 */

/**
 * Checks if two arrays have any item in common using a hash map.
 *
 * @param {Array} arr1 - The first input array.
 * @param {Array} arr2 - The second input array.
 * @returns {boolean} True if the arrays have a common item, false otherwise.
 */
function itemInCommon(arr1, arr2) {
    // Step 1: Create a hash map (using a JavaScript object).
    // This map will store elements from arr1 for efficient lookup.
    let map = {};

    // Step 2: Iterate through arr1 and add each element to the hash map.
    // We use the element itself as the key. The value can be anything (like 'true'),
    // as we only care about the key's existence.
    for (let i = 0; i < arr1.length; i++) {
        // Add the element arr1[i] as a key in the map.
        // The average time complexity for this operation is O(1).
        map[arr1[i]] = true;
    }

    // Step 3: Iterate through arr2. For each element, check if it exists as a key in the map.
    // If it exists in the map, it means this element was also present in arr1,
    // so we've found a common item.
    for (let j = 0; j < arr2.length; j++) {
        // Check if arr2[j] is a property (key) in the map object.
        // Using `map[arr2[j]]` leverages the O(1) average time lookup property
        // of hash maps (objects in JS). If the key exists, it won't return undefined
        // (assuming we store a truthy value like `true`).
        if (map[arr2[j]]) {
            // A common item is found, so we can immediately return true.
            return true;
        }
    }

    // Step 4: If the loop through arr2 finishes without finding any element
    // in the map, it means there are no common items between arr1 and arr2.
    return false;
}


/**
 * Sample Run Example
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Example 1: Arrays with a common item
    let array1 = [1, 3, 5];
    let array2 = [2, 4, 5];
    console.log(`Array 1: [${array1.join(', ')}]`);
    console.log(`Array 2: [${array2.join(', ')}]`);
    // Call the function and log the result
    const result1 = itemInCommon(array1, array2);
    console.log(`Items in Common? ${result1}`); // Expected: true (because of 5)

    console.log("---");

    // Example 2: Arrays with no common items
    let array3 = [1, 2, 3];
    let array4 = [4, 5, 6];
    console.log(`Array 3: [${array3.join(', ')}]`);
    console.log(`Array 4: [${array4.join(', ')}]`);
    // Call the function and log the result
    const result2 = itemInCommon(array3, array4);
    console.log(`Items in Common? ${result2}`); // Expected: false

    console.log("---");

    // Example 3: Arrays with mixed data types
    let array5 = ['a', 'b', 10, true];
    let array6 = [false, 20, 'c', 'a'];
    console.log(`Array 5: [${array5.join(', ')}]`);
    console.log(`Array 6: [${array6.join(', ')}]`);
    // Call the function and log the result
    const result3 = itemInCommon(array5, array6);
    console.log(`Items in Common? ${result3}`); // Expected: true (because of 'a')

    console.log("--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Array 1: [1, 3, 5]
    Array 2: [2, 4, 5]
    Items in Common? true
    ---
    Array 3: [1, 2, 3]
    Array 4: [4, 5, 6]
    Items in Common? false
    ---
    Array 5: [a, b, 10, true]
    Array 6: [false, 20, c, a]
    Items in Common? true
    --- End Sample Run ---
*/