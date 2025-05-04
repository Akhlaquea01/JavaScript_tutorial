// Morse code mapping
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/'
};

// Reverse mapping for Morse code to text
const textCode = Object.fromEntries(Object.entries(morseCode).map(([key, value]) => [value, key]));

// Convert text to Morse code
function textToMorse() {
    const text = document.getElementById('textInput').value.toUpperCase();
    let morse = '';
    for (let char of text) {
        morse += morseCode[char] ? morseCode[char] + ' ' : '';
    }
    const morseOutput = document.getElementById('morseOutput');
    morseOutput.textContent = morse.trim();
    morseOutput.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to output
}

// Convert Morse code to text
function morseToText() {
    const morse = document.getElementById('morseInput').value.trim();
    const morseWords = morse.split('/');
    let text = '';
    for (let word of morseWords) {
        const letters = word.split(' ');
        for (let code of letters) {
            text += textCode[code] || '';
        }
        text += ' ';
    }
    const textOutput = document.getElementById('textOutput');
    textOutput.textContent = text.trim();
    textOutput.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to output
}

// Copy to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        // alert('Copied to clipboard!');
        console.log('Copied to clipboard:', text);
        
    }).catch(() => {
        alert('Failed to copy text.');
    });
}