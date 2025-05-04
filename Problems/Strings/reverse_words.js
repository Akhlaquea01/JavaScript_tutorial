// Problem Statement: Implement a function to reverse words in a sentence without using any built-in methods.

function reverseWords(sentence) {
    const words = [];
    let wordStart = 0;

    // Split the sentence into words
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === ' ' || i === sentence.length - 1) {
            words.push(sentence.substring(wordStart, i + 1).trim());
            wordStart = i + 1;
        }
    }

    // Reverse the order of words
    return words.reverse().join(' ');
}

// Usage example
console.log(reverseWords("Hello world")); // Output: "world Hello"

