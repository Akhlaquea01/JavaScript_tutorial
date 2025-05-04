// Que: Reverse String
function reverse(string) {
    if (!string || string.length < 2 || typeof string !== 'string') return "Not Correct Input";
    const backwards = [];
    for (let i = string.length - 1; i >= 0; i--) {
        backwards.push(string[i]);
    }
    return backwards.join('');
}
console.log(reverse("string ki"));

// OR
const reverseSentance = str => str.split('').reverse().join('');
console.log(reverseSentance("string ki"));

const reverseStringArray = function (s) {
    let left = 0; // Pointer at the start of the array
    let right = s.length - 1; // Pointer at the end of the array

    while (left < right) {
        // Swap characters at left and right pointers
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        // Move pointers towards the center
        left++;
        right--;
    }
    return s;
};
console.log(reverseStringArray(["h", "e", "l", "l", "o"]));