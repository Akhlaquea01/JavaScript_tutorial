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
 * Checks if two arrays have any item in common using a Set built from arr1,
 * giving O(n+m) time instead of a brute-force nested-loop O(n*m) scan.
 * Time: O(n+m)  Space: O(n)
 *
 * @param {Array} arr1 - The first input array.
 * @param {Array} arr2 - The second input array.
 * @returns {boolean} True if the arrays have a common item, false otherwise.
 */
function itemInCommon(arr1, arr2) {
    // A real Set (not a plain object) so elements like 'toString' or 'constructor'
    // can't collide with inherited Object.prototype properties and cause a
    // false-positive lookup.
    const map = new Set(arr1);

    for (let j = 0; j < arr2.length; j++) {
        if (map.has(arr2[j])) {
            return true;
        }
    }

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