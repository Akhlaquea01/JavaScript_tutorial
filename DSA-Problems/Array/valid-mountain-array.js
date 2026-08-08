/**
 *Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
 */
function validMountainArray(arr) {
    if (arr.length < 3) return false;

    const leng = arr.length;
    let prev = arr[0];
    let isUp = true;
    let hasPeak = false;  // Ensure peak exists

    for (let i = 1; i < leng; i++) {
        if (isUp) {
            if (arr[i] > prev) {
                prev = arr[i];
            } else if (arr[i] < prev) {
                if (i === 1) return false;
                isUp = false;
                hasPeak = true;
                prev = arr[i];
            } else {
                return false; // Equal values are not allowed
            }
        } else {  // Downhill part
            if (arr[i] < prev) {
                prev = arr[i];
            } else {
                return false; // If values increase again or remain same, not valid
            }
        }
    }

    return hasPeak;
};


// Method 2
function validMountainArray2(arr) {
    if (arr.length < 3) return false;

    let i = 1, n = arr.length;

    // Climbing up
    while (i < n && arr[i] > arr[i - 1]) i++;

    // Peak should not be the first or last element
    if (i === 1 || i === n) return false;

    // Climbing down
    while (i < n && arr[i] < arr[i - 1]) i++;

    return i === n;
};

console.log(validMountainArray([0, 3, 2, 1]));
console.log(validMountainArray2([0, 3, 2, 1]));