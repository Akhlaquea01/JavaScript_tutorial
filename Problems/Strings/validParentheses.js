/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 *
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * Example 4:
 * Input: s = "([])"
 * Output: true
 */
/**
 * Method 1: Original Approach
 * Checks for specific opening and closing sets.
 * Note: usage of two objects is slightly redundant but functional.
 */
function isValid(s) {
    // Map of opening brackets to their expected closing counterparts (values unused in logic below, only keys checked)
    const opening = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    // Map of closing brackets to their corresponding opening brackets
    const closing = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        // Check if the character is an opening bracket
        if (opening[s[i]]) {
            stack.push(s[i])
        } else {
            // It is a closing bracket (or invalid char, assuming valid input)
            // If the stack is empty, there's no opening bracket to match
            if (stack.length === 0) {
                return false;
            }
            // Peek at the last element of the stack
            const lastOpenBracket = stack[stack.length - 1];

            // Check if the current closing bracket matches the last opening bracket
            if (closing[s[i]] === lastOpenBracket) {
                stack.pop()
            } else {
                return false;
            }
        }
    }
    // Return true if stack is empty (all brackets matched)
    return stack.length == 0;
}

/**
 * Method 2: Better Approach (Optimized)
 * Uses a single map for mapping closing to opening brackets.
 * cleaner logic and standard stack implementation.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValidBetter(s) {
    // Stack to keep track of opening brackets
    const stack = [];

    // Map to store matching pairs: Closing -> Opening
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // If the character is a closing bracket (it exists as a key in the map)
        if (map[char]) {
            // Get the element at the top of the stack. If stack is empty, use a dummy value '#'
            const topElement = stack.length === 0 ? '#' : stack.pop();

            // If the mapped opening bracket doesn't match the popped element, it's invalid
            if (topElement !== map[char]) {
                return false;
            }
        } else {
            // It's an opening bracket, push to stack
            stack.push(char);
        }
    }

    // If the stack is empty, all opening brackets were properly closed
    return stack.length === 0;
}

// Testing Method 1
console.log("Method 1 (isValid):");
const result1 = isValid("()[]{()}");
console.log(result1); // true

// Testing Method 2
console.log("\nMethod 2 (isValidBetter):");
const result2 = isValidBetter("()[]{()}");
console.log(result2); // true
