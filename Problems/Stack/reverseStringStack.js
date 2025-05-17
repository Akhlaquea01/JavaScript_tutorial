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
    /**
     * Creates an instance of Stack.
     * Initializes an empty array to store stack elements.
     */
    constructor() {
        this.stackList = []; // Array to hold the stack elements
    }

    /**
     * Returns the internal array representing the stack.
     * Primarily used for testing purposes to easily check stack contents.
     * @returns {Array} The internal array.
     */
    getStackList() {
        return this.stackList;
    }

    /**
     * Prints the elements of the stack from top to bottom.
     */
    printStack() {
        console.log("--- Stack (Top to Bottom) ---");
        // Iterate from the end of the array (top) to the beginning (bottom)
        for (let i = this.stackList.length - 1; i >= 0; i--) {
            console.log(this.stackList[i]);
        }
        console.log("---------------------------");
    }

    /**
     * Checks if the stack is empty.
     * @returns {boolean} True if the stack has no elements, false otherwise.
     */
    isEmpty() {
        return this.stackList.length === 0;
    }

    /**
     * Returns the value of the top element without removing it.
     * @returns {*} The value of the top element, or null if the stack is empty.
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            // The top element is the last element in the array
            return this.stackList[this.stackList.length - 1];
        }
    }

    /**
     * Returns the number of elements in the stack.
     * @returns {number} The current size of the stack.
     */
    size() {
        return this.stackList.length;
    }

    /**
     * Adds an element to the top of the stack (push operation).
     * @param {*} value - The value to push onto the stack.
     */
    push(value) {
        // Add the new element to the end of the array
        this.stackList.push(value);
    }

    /**
     * Removes and returns the top element from the stack (pop operation).
     * @returns {*} The value of the top element, or null if the stack is empty.
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        } else {
            // Remove and return the last element of the array
            return this.stackList.pop();
        }
    }
}

/**
 * Reverses a string using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Iterate through the input string character by character.
 * 3. Push each character onto the stack.
 * 4. Initialize an empty string to build the reversed result.
 * 5. While the stack is not empty, pop characters off the stack
 * and append them to the result string.
 * 6. Return the result string.
 *
 * The Stack's LIFO (Last-In, First-Out) property is key here.
 * The last character pushed onto the stack (which was the last character
 * of the original string) will be the first character popped off, and so on.
 *
 * @param {string} string - The string to reverse.
 * @returns {string} A new string with the characters reversed.
 */
function reverseString(string) {
    // Create a new stack instance.
    const stack = new Stack();

    // Initialize an empty string to store the reversed result.
    let reversedString = "";

    // Step 1: Push each character of the input string onto the stack.
    // Iterating through the string from beginning to end means the last
    // character of the string will be the top element of the stack.
    for (const char of string) {
        stack.push(char);
    }

    // Step 2: Pop characters from the stack and append them to the result string.
    // Since the stack is LIFO, popping elements will retrieve them in
    // the reverse order of how they were pushed. The last character of the
    // original string is popped first, then the second-to-last, and so on,
    // until the first character of the original string is popped last.
    while (!stack.isEmpty()) {
        reversedString += stack.pop();
    }

    // Return the newly constructed reversed string.
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