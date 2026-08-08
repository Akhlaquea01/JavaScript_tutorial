/**
 * Given an integer n, return a string array answer (1-indexed) where:

answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.
Example 1:
Input: n = 3
Output: ["1","2","Fizz"]

Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
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