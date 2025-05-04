function mergeSort(arr) {
    // Base case: a single-element array is already sorted
    if (arr.length <= 1) return arr;

    // Step 1: Divide the array into halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Step 2: Conquer - recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Step 3: Combine - merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

// Helper function to merge two sorted arrays
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    // Compare elements from left and right arrays and push the smaller one
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add remaining elements from both arrays
    return result.concat(left.slice(i)).concat(right.slice(j));
}
const arr = [38, 27, 43, 3, 9, 82, 10];
const sorted = mergeSort(arr);
console.log(sorted); // Output: [3, 9, 10, 27, 38, 43, 82]
