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
 * Checks if a string of '(' and ')' is balanced using a stack.
 * Time: O(n)  Space: O(n)
 *
 * @param {string} parentheses - The string containing parentheses to check.
 * @returns {boolean} True if the parentheses are balanced, false otherwise.
 */
function isBalancedParentheses(parentheses) {
    const stack = new Stack();

    for (const char of parentheses) {
        if (char === '(') {
            stack.push(char);
        }
        else if (char === ')') {
            // A closing paren with nothing to match means it's unbalanced.
            if (stack.isEmpty()) {
                return false;
            }
            stack.pop();
        }
        // Any other characters are ignored.
    }

    // Balanced only if every '(' found a matching ')'.
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