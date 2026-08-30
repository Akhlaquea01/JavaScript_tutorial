/**
 * Problem Description: Stack Reverse String
 *
 * Implement a function called reverseString() that takes a string as input
 * and returns a new string with its characters reversed, using the provided
 * Stack class.
 *
 * Input:
 * A string 'string'.
 *
 * Output:
 * The function should return a new string with the characters of the input
 * string reversed.
 *
 * Constraints:
 * 1. You must use the provided Stack class to reverse the string.
 * 2. You cannot use built-in string manipulation methods for reversing the string
 * (e.g., string.split('').reverse().join(''), string slicing methods, etc.).
 * 3. Simple iteration through the string characters is allowed.
 *
 * The provided Stack class implementation uses an array internally, where the
 * end of the array represents the top of the stack.
 */

/**
 * Represents a basic Stack data structure using an array.
 * The end of the array is considered the top of the stack.
 */
class Stack {
    constructor() {
        this.stackList = [];
    }

    /** Returns the internal array (mainly for tests). */
    getStackList() {
        return this.stackList;
    }

    /** Prints the elements of the stack from top to bottom. */
    printStack() {
        console.log("--- Stack (Top to Bottom) ---");
        for (let i = this.stackList.length - 1; i >= 0; i--) {
            console.log(this.stackList[i]);
        }
        console.log("---------------------------");
    }

    isEmpty() {
        return this.stackList.length === 0;
    }

    peek() {
        return this.isEmpty() ? null : this.stackList[this.stackList.length - 1];
    }

    size() {
        return this.stackList.length;
    }

    push(value) {
        this.stackList.push(value);
    }

    pop() {
        return this.isEmpty() ? null : this.stackList.pop();
    }
}

/**
 * Reverses a string by pushing every character onto a stack, then popping
 * them back off (LIFO order flips the sequence).
 * Time: O(n)  Space: O(n)
 *
 * @param {string} string - The string to reverse.
 * @returns {string} A new string with the characters reversed.
 */
function reverseString(string) {
    const stack = new Stack();
    let reversedString = "";

    for (const char of string) {
        stack.push(char);
    }

    while (!stack.isEmpty()) {
        reversedString += stack.pop();
    }

    return reversedString;
}


/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    const test1 = "hello";
    console.log(`Original: "${test1}"`);
    console.log(`Reversed: "${reverseString(test1)}"`); // Expected: "olleh"

    console.log("---");

    const test2 = "Udemy";
    console.log(`Original: "${test2}"`);
    console.log(`Reversed: "${reverseString(test2)}"`); // Expected: "ymedU"

    console.log("---");

    const test3 = "";
    console.log(`Original: "${test3}" (Empty String)`);
    console.log(`Reversed: "${reverseString(test3)}"`); // Expected: ""

    console.log("---");

    const test4 = "a";
    console.log(`Original: "${test4}" (Single Character)`);
    console.log(`Reversed: "${reverseString(test4)}"`); // Expected: "a"

    console.log("---");

    const test5 = "hello world";
    console.log(`Original: "${test5}" (With spaces)`);
    console.log(`Reversed: "${reverseString(test5)}"`); // Expected: "dlrow olleh"

    console.log("--- End Sample Run ---");
}

// Execute the sample run
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Original: "hello"
    Reversed: "olleh"
    ---
    Original: "Udemy"
    Reversed: "ymedU"
    ---
    Original: "" (Empty String)
    Reversed: ""
    ---
    Original: "a" (Single Character)
    Reversed: "a"
    ---
    Original: "hello world" (With spaces)
    Reversed: "dlrow olleh"
    --- End Sample Run ---
*/