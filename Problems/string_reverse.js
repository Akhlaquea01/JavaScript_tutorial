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