/**
 * Problem Description: Stack Parentheses Balanced
 *
 * Implement a function called isBalancedParentheses() that checks if a given
 * string containing only parentheses '(' and ')' is balanced or not.
 *
 * Input:
 * A string 'parentheses'.
 *
 * Output:
 * The function should return a boolean value, true if the input string
 * contains balanced parentheses, and false if not.
 *
 * Constraints:
 * 1. You must use the provided Stack class to check if the parentheses are balanced.
 * 2. You cannot use built-in string manipulation methods for this task
 * (simple iteration is allowed, but not things like replace, substring, etc.).
 * 3. The input string is assumed to only contain '(' and ')' characters
 * relevant to the balancing check.
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
 * Checks if a string containing only parentheses is balanced using a stack.
 * Balanced means each opening parenthesis has a corresponding closing
 * parenthesis, and they are closed in the correct order.
 *
 * Algorithm:
 * 1. Initialize an empty stack.
 * 2. Iterate through each character in the input string.
 * 3. If the character is an opening parenthesis '(', push it onto the stack.
 * 4. If the character is a closing parenthesis ')':
 * a. Check if the stack is empty. If it is, this closing parenthesis has
 * no matching opening one, so the string is unbalanced. Return false.
 * b. If the stack is not empty, pop the top element. This popped element
 * should be the most recent unmatched opening parenthesis. Since we
 * only push '(' in this problem, we just need to ensure we successfully
 * popped *something*. If the input could have other bracket types,
 * we would check if the popped element is the *correct* opening type
 * for the current closing type.
 * 5. After iterating through the entire string, check if the stack is empty.
 * If it is empty, it means every opening parenthesis found a matching
 * closing one in the correct order. The string is balanced. Return true.
 * If the stack is not empty, it means there are unmatched opening
 * parentheses remaining. The string is unbalanced. Return false.
 *
 * @param {string} parentheses - The string containing parentheses to check.
 * @returns {boolean} True if the parentheses are balanced, false otherwise.
 */
function isBalancedParentheses(parentheses) {
    // Create a new stack instance to keep track of opening parentheses.
    const stack = new Stack();

    // Iterate through each character of the input string.
    for (const char of parentheses) {
        // If the character is an opening parenthesis, push it onto the stack.
        // This signifies that we've encountered an opening parenthesis that
        // is currently waiting for its matching closing one.
        if (char === '(') {
            stack.push(char);
        }
        // If the character is a closing parenthesis.
        else if (char === ')') {
            // If the stack is empty, it means we've found a closing parenthesis
            // without a corresponding opening one. The parentheses are unbalanced.
            if (stack.isEmpty()) {
                return false;
            }
            // If the stack is not empty, pop the top element.
            // In this specific problem, we only push '(', so the popped element
            // should implicitly be '('. If the problem involved other types
            // like [] or {}, we would explicitly check if the popped element
            // matches the current closing character (e.g., if char is ']',
            // popped should be '[').
            stack.pop(); // Pop the matching opening parenthesis
        }
        // Note: Any characters other than '(' or ')' would be ignored by this logic,
        // assuming the constraint means only these characters are relevant to balance.
    }

    // After processing the entire string, if the stack is empty, it means
    // every opening parenthesis had a corresponding closing one that was
    // processed correctly.
    // If the stack is NOT empty, it means there are leftover opening parentheses
    // that never found a closing match.
    return stack.isEmpty();
}

/**
 * Sample Run Examples
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    const test1 = "(()())";
    console.log(`Input: "${test1}"`);
    console.log(`Is Balanced: ${isBalancedParentheses(test1)}`); // Expected: true

    console.log("---");

    const test2 = "(()";
    console.log(`Input: "${test2}"`);
    console.log(`Is Balanced: ${isBalancedParentheses(test2)}`); // Expected: false

    console.log("---");

    const test3 = ")(";
    console.log(`Input: "${test3}"`);
    console.log(`Is Balanced: ${isBalancedParentheses(test3)}`); // Expected: false

    console.log("---");

    const test4 = "";
    console.log(`Input: "${test4}" (Empty String)`);
    console.log(`Is Balanced: ${isBalancedParentheses(test4)}`); // Expected: true

    console.log("---");

    const test5 = "(";
    console.log(`Input: "${test5}" (Single Opening)`);
    console.log(`Is Balanced: ${isBalancedParentheses(test5)}`); // Expected: false

    console.log("---");

    const test6 = "()()";
    console.log(`Input: "${test6}" (Multiple Pairs)`);
    console.log(`Is Balanced: ${isBalancedParentheses(test6)}`); // Expected: true

    console.log("--- End Sample Run ---");
}

// Execute the sample run
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Input: "(()())"
    Is Balanced: true
    ---
    Input: "(()"
    Is Balanced: false
    ---
    Input: ")("
    Is Balanced: false
    ---
    Input: "" (Empty String)
    Is Balanced: true
    ---
    Input: "(" (Single Opening)
    Is Balanced: false
    ---
    Input: "()()" (Multiple Pairs)
    Is Balanced: true
    --- End Sample Run ---
*/