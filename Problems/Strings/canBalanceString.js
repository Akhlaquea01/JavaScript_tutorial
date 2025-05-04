/*
  Problem Statement:

  You are given a string of characters, consisting of <, >, and []. 
  The string is initially unbalanced. You are allowed to perform a number of operations (denoted as "n" attempts) to balance the string. 
  Each attempt consists of changing one character to any of the allowed characters: <, >, or []. 
  Your task is to determine whether it is possible to balance the string with at most n attempts.

  Problem Clarification:

  - The string is made up of the characters <, >, and [].
  - A string is balanced if every opening bracket (< or [) has a corresponding closing bracket (> or ]) 
    and each pair is properly nested.
  - The string must be balanced in a way that for every opening angle bracket < there is a corresponding closing angle bracket >,
    and brackets are properly matched.
  - You can change a character to any of the three allowed types: <, >, or [] in each attempt.
*/

// Enhanced version: tracking replacements
function canBalanceString(str, maxAttempts) {
    const stack = [];
    const replacements = [];
    let attempts = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === '<' || char === '[') {
            stack.push({ char, index: i });
        } else if (char === '>' || char === ']') {
            if (stack.length === 0) {
                // Unmatched closing bracket — propose a replacement
                const replacementChar = char === '>' ? '<' : '[';
                replacements.push({ index: i, from: char, to: replacementChar });
                attempts++;
            } else {
                const last = stack.pop();
                if ((last.char === '<' && char !== '>') || (last.char === '[' && char !== ']')) {
                    // Mismatched pair — propose fix
                    const correctChar = last.char === '<' ? '>' : ']';
                    replacements.push({ index: i, from: char, to: correctChar });
                    attempts++;
                }
            }
        } else {
            // Invalid character — assume replacement needed
            replacements.push({ index: i, from: char, to: '?' });
            attempts++;
        }
    }

    // Remaining unmatched opening brackets
    while (stack.length > 0) {
        const { char, index } = stack.pop();
        const correctChar = char === '<' ? '>' : ']';
        replacements.push({ index: index + 1, from: null, to: correctChar }); // hypothetical insert
        attempts++;
    }

    return {
        result: attempts <= maxAttempts,
        usedAttempts: attempts,
        replacements
    };
}

// Example usage
const inputString = "<[>>";
const allowedChanges = 2;
const result = canBalanceString(inputString, allowedChanges);
console.log(`Can balance: ${result.result}`);
console.log(`Used attempts: ${result.usedAttempts}`);
console.log("Replacements:", result.replacements);
