/**
 * Reverses the order of words in a sentence, splitting on spaces manually instead of using String.split.
 * Time: O(n)  Space: O(n)
 */
function reverseWords(sentence) {
    const words = [];
    let wordStart = 0;

    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === ' ' || i === sentence.length - 1) {
            const word = sentence.substring(wordStart, i + 1).trim();
            if (word) words.push(word); // skip empty segments from consecutive spaces
            wordStart = i + 1;
        }
    }

    return words.reverse().join(' ');
}

// Usage example
console.log(reverseWords("Hello world")); // Output: "world Hello"

