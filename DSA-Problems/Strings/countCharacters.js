function countCharacters(str) {
    return str.split("").reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
}

// Example usage:
const text = "hello world ";
const result = countCharacters(text);
console.log(result);
// Output: { h: 1, e: 1, l: 3, o: 2, ' ': 2, w: 1, r: 1, d: 1 }

// Method 2
function countCharacters2(str) {
    let charCount = {};
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
}

// Example usage:
console.log(countCharacters2(text));

// Method 3
function countCharacters3(str) {
    let charMap = new Map();
    for (let char of str) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    return Object.fromEntries(charMap);
}

// Example usage:
console.log(countCharacters3(text));

