/**
 * Merges two already-sorted arrays into one sorted array.
 * Time: O(n + m)  Space: O(n + m)
 */
function mergeSortedArrays(array1, array2) {
    const mergedArray = [];
    let i = 0;
    let j = 0;

    // Edge cases: if either of the arrays is empty, return the other array
    if (array1.length === 0) return array2;
    if (array2.length === 0) return array1;

    // Loop until one array is exhausted (checked by index, not truthiness,
    // so a legitimate 0 value isn't mistaken for "no elements left")
    while (i < array1.length && j < array2.length) {
        if (array1[i] <= array2[j]) {
            mergedArray.push(array1[i]);
            i++;
        } else {
            mergedArray.push(array2[j]);
            j++;
        }
    }
    // Append whatever is left over in either array
    while (i < array1.length) mergedArray.push(array1[i++]);
    while (j < array2.length) mergedArray.push(array2[j++]);
    return mergedArray;
}

// Test the function with example arrays and log the result
console.log(mergeSortedArrays([0, 3, 5], [4, 6, 30]));
