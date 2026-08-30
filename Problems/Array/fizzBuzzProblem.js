/**
 * Builds the 1-indexed FizzBuzz string array up to n.
 * Time: O(n)  Space: O(n)
 */
function fizzBuzz(n) {
    let array = [];
    for (let index = 1; index <= n; index++) {
        if (index % 3 === 0 && index % 5 === 0) {
            array.push('FizzBuzz');
        } else if (index % 3 === 0) {
            array.push('Fizz');
        } else if (index % 5 === 0) {
            array.push('Buzz');
        } else {
            array.push(index.toString());
        }
    }
    return array;
}

console.log(fizzBuzz(5)); // Output: ["1", "2", "Fizz", "4", "Buzz"]