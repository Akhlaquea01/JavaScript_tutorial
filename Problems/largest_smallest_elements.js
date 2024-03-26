function findMinMax(arr) {
    if (arr.length === 0) {
        return null; // Array is empty
    }

    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        } else if (arr[i] > max) {
            max = arr[i];
        }
    }

    return { min, max };
}
const numbers = [5, 2, 9, 3, 7];
console.log("Min and Max:", findMinMax(numbers)); // Output: { min: 2, max: 9 }