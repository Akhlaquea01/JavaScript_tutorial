// Function to reverse an array in place without using built-in methods
function reverseArray(arr) {
    // Initialize pointers for the start and end of the array
    let start = 0;
    let end = arr.length - 1;

    // Swap elements from start and end until the pointers meet in the middle
    while (start < end) {
        // Swap elements at start and end indices
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        // Move pointers inward
        start++;
        end--;
    }
}

// Example usage:
const arr = [1, 2, 3, 4, 5];
console.log("Original array:", arr); // Output: [1, 2, 3, 4, 5]
reverseArray(arr);
console.log("Reversed array:", arr); // Output: [5, 4, 3, 2, 1]
