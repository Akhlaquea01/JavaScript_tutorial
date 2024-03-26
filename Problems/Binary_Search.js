function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            low = mid + 1; // Search in the right half
        } else {
            high = mid - 1; // Search in the left half
        }
    }

    return -1; // Element not found
}
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Binary Search:", binarySearch(sortedArray, 7)); // Output: 3 (index of 7 in the array)
console.log("Binary Search:", binarySearch(sortedArray, 8)); // Output: -1 (element not found)
