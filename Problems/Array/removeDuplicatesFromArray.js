/**
 * Removes duplicate elements from an array, preserving order of first occurrence.
 * Time: O(n)  Space: O(n)
 */
function removeDuplicates(arr) {
    // Use a real Set (not a plain object) so a number and its string
    // equivalent, e.g. 1 and "1", aren't coerced into the same key.
    const uniqueElements = new Set();

    const uniqueArray = arr.filter(element => {
        if (!uniqueElements.has(element)) {
            uniqueElements.add(element);
            return true;
        }
        return false;
    });

    return uniqueArray;
}

// Example usage:
const arrayWithDuplicates = [1, 2, 3, 4, 2, 5, 6, 1, 3];
console.log("Original array:", arrayWithDuplicates); // Output: [1, 2, 3, 4, 2, 5, 6, 1, 3]
const arrayWithoutDuplicates = removeDuplicates(arrayWithDuplicates);
console.log("Array without duplicates:", arrayWithoutDuplicates); // Output: [1, 2, 3, 4, 5, 6]

// Method 2: Using Set
function removeDuplicatesUsingSet(arr) {
    // Use Set to store unique elements
    const uniqueSet = new Set(arr);
    return Array.from(uniqueSet); // Convert Set back to array
}
console.log(removeDuplicatesUsingSet(arrayWithDuplicates)); // Output: [1, 2, 3, 4, 5, 6]
// Method 3: Using reduce
function removeDuplicatesUsingReduce(arr) {
    return arr.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            accumulator.push(currentValue); // Add unique element to accumulator
        }
        return accumulator; // Return the accumulator for the next iteration
    }, []);
}
console.log(removeDuplicatesUsingReduce(arrayWithDuplicates)); // Output: [1, 2, 3, 4, 5, 6]