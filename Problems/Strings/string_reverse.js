// Que: Reverse String
/**
 * Reverses a string by pushing characters in reverse order into an array.
 * Time: O(n)  Space: O(n)
 */
function reverse(string) {
    if (!string || typeof string !== 'string') return "Not Correct Input";
    const backwards = [];
    for (let i = string.length - 1; i >= 0; i--) {
        backwards.push(string[i]);
    }
    return backwards.join('');
}
console.log(reverse("string ki"));

// OR
/**
 * Reverses a string using built-in split/reverse/join.
 * Time: O(n)  Space: O(n)
 */
const reverseSentance = str => str.split('').reverse().join('');
console.log(reverseSentance("string ki"));

/**
 * Reverses a character array in place using two pointers.
 * Time: O(n)  Space: O(1)
 */
const reverseStringArray = function (s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        left++;
        right--;
    }
    return s;
};
console.log(reverseStringArray(["h", "e", "l", "l", "o"]));