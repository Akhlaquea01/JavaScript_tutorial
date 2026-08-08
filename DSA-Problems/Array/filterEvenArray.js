/**
 * Filter and return only even number in a array
 */

function filterEven(arr) {
    let result = [];
    for (let index = 0; index < arr.length; index++) {

        if (arr[index] % 2 == 0) {
            result.push(arr[index]);
        }
        
    }
    return result;
}
console.log(filterEven([1,2,3,4,5,6]));

// Method 2
console.log([1, 2, 3, 4, 5, 6].filter(el=>el%2==0))