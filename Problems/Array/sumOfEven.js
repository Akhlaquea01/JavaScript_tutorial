/**
 * write a function to find the sum of all even numbers in that array
 */

function sumOfEven(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sum += arr[i];
        }
    }
    return sum;
}

console.log(sumOfEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
