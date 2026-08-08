/**
 Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 */
const stringCompression = function (chars) {
    const result = [];
    let lastChar = '';
    let countOfChar = 0;
    for (let index = 0; index < chars.length; index++) {
        const element = chars[index];
        if (lastChar == element) {
            countOfChar += 1;
            if (index == chars.length - 1) {
                result.push(countOfChar.toString());
            }
        } else {
            if (countOfChar) result.push(countOfChar.toString());
            result.push(element);
            lastChar = element;
            countOfChar = 1;
        }
    }
    return result;
}
let chars = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
console.log(stringCompression(chars));
const compress = function (chars) {
    let index = 0; // The position to insert the compressed result
    let i = 0; // The position to read the original characters

    while (i < chars.length) {
        let char = chars[i];
        let count = 0;
        while (i < chars.length && chars[i] === char) {
            i++;
            count++;
        }
        chars[index++] = char;
        if (count > 1) {
            for (let digit of count.toString()) {
                chars[index++] = digit;
            }
        }
    }
    chars.length = index;
    return chars;
};

console.log(compress(chars));
