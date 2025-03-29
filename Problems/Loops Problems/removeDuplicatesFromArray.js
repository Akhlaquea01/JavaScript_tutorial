function removeDuplicates(arr) {
    // Create an object to store unique elements
    const uniqueElements = {};

    // Filter out duplicate elements
    const uniqueArray = arr.filter(element => {
        if (!uniqueElements[element]) {
            uniqueElements[element] = true;
            return true; // Include the element in the filtered array
        }
        return false; // Exclude the element from the filtered array
    });

    return uniqueArray;
}

// Example usage:
const arrayWithDuplicates = [1, 2, 3, 4, 2, 5, 6, 1, 3];
console.log("Original array:", arrayWithDuplicates); // Output: [1, 2, 3, 4, 2, 5, 6, 1, 3]
const arrayWithoutDuplicates = removeDuplicates(arrayWithDuplicates);
console.log("Array without duplicates:", arrayWithoutDuplicates); // Output: [1, 2, 3, 4, 5, 6]
