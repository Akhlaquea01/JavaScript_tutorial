/**
 * Reverses an array in place using the two-pointer swap technique.
 * Time: O(n)  Space: O(1)
 */
function reverseArray(arr) {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;
        end--;
    }
}

// Example usage:
const arr = [1, 2, 3, 4, 5];
console.log("Original array:", arr); // Output: [1, 2, 3, 4, 5]
reverseArray(arr);
console.log("Reversed array:", arr); // Output: [5, 4, 3, 2, 1]
