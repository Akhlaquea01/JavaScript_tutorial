// Function to merge two sorted arrays into one sorted array
function mergeSortedArrays(array1, array2) {
    // Initialize an empty array to store the merged array
    const mergedArray = [];
    // Initialize variables to track the current element in each array
    let arra1Item = array1[0]; // Current element in array1
    let array2Item = array2[0]; // Current element in array2
    let i = 1; // Index pointer for array1
    let j = 1; // Index pointer for array2

    // Edge cases: if either of the arrays is empty, return the other array
    if (array1.length === 0) return array2;
    if (array2.length === 0) return array1;

    // Loop until there are elements left in either array
    while (typeof arra1Item === 'number' || typeof array2Item === 'number') {
        // If array2Item is null or arra1Item is less than or equal to array2Item
        if (!array2Item || arra1Item <= array2Item) {
            // Push arra1Item into the merged array
            mergedArray.push(arra1Item);
            // Move to the next element in array1
            arra1Item = array1[i];
            i++;
        } else {
            // Push array2Item into the merged array
            mergedArray.push(array2Item);
            // Move to the next element in array2
            array2Item = array2[j];
            j++;
        }
    }
    // Return the merged array
    return mergedArray;
}

// Test the function with example arrays and log the result
console.log(mergeSortedArrays([0, 3, 5], [4, 6, 30]));
