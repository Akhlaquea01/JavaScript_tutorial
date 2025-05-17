/**
 * Problem Description: Stack Sort Stack
 *
 * Implement a function called sortStack() that takes a stack of integers as input
 * and sorts the stack in ascending order (with the smallest element on top)
 * using an additional temporary stack.
 *
 * Input:
 * A Stack object 'stack' containing integer values.
 *
 * Output:
 * The function should modify the original input 'stack', sorting its elements
 * in ascending order (smallest on top).
 *
 * Constraints:
 * 1. You must use the provided Stack class to store and manipulate the elements.
 * 2. You cannot use any other data structures (like arrays, lists, etc.,
 * outside of the internal implementation of the Stack class) or built-in
 * sorting methods for this task.
 * 3. You can use only ONE additional temporary Stack object.
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
 * Sorts a stack in ascending order (smallest element on top) using an
 * additional temporary stack.
 *
 * The algorithm works by repeatedly popping an element from the input stack
 * and inserting it into the temporary stack in a sorted manner (descending
 * order in the temporary stack, largest on top). Elements are moved back
 * to the input stack temporarily if they are larger than the element being
 * inserted into the temporary stack. Finally, all elements are moved back
 * from the temporary stack to the input stack.
 *
 * @param {Stack} stack - The stack of integers to be sorted. Modified in place.
 */
function sortStack(stack) {
    // Create the single additional temporary stack as allowed by the constraint.
    const additionalStack = new Stack();

    // Step 1: Process elements from the original stack until it's empty.
    // We will move elements to the additionalStack, ensuring additionalStack
    // remains sorted in DESCENDING order (largest on top) at each step.
    // This is because when we move them back later, the largest will go in
    // first (at the bottom of the original stack), leading to ascending order
    // in the original stack (smallest on top).
    while (!stack.isEmpty()) {
        // Pop the top element from the original stack.
        const temp = stack.pop();

        // Now, insert 'temp' into 'additionalStack' in its correct sorted position.
        // Move elements from 'additionalStack' back to 'stack' as long as they
        // are GREATER than 'temp'. This ensures 'additionalStack' maintains
        // descending order (largest on top).
        while (!additionalStack.isEmpty() && additionalStack.peek() > temp) {
            // If the top of additionalStack is greater than temp,
            // pop it from additionalStack and push it back onto the original stack.
            stack.push(additionalStack.pop());
        }

        // Once the inner loop finishes, the top of 'additionalStack' is either
        // less than or equal to 'temp', or 'additionalStack' is empty.
        // This is the correct position to push 'temp' into 'additionalStack'
        // to maintain the descending order (largest on top).
        additionalStack.push(temp);
    }

    // Step 2: All elements are now in 'additionalStack', sorted in descending order
    // (largest on top). Transfer them back to the original stack.
    // Since we are popping from the top (largest first) and pushing onto the
    // original stack, the original stack will receive elements in descending
    // order, resulting in the smallest element ending up on top (ascending order).
    while (!additionalStack.isEmpty()) {
        // Pop from the top of the additional stack and push onto the original stack.
        stack.push(additionalStack.pop());
    }

    // The original stack is now sorted in ascending order (smallest on top).
    // No explicit return needed as the input stack is modified in place.
}


/**
 * Sample Run Example
 */
function sampleRun() {
    console.log("--- Sample Run ---");

    // Create a new stack and push some elements
    const myStack = new Stack();
    myStack.push(5);
    myStack.push(3);
    myStack.push(1);
    myStack.push(4);
    myStack.push(2);

    console.log("Original Stack:");
    myStack.printStack(); // Expected: 2, 4, 1, 3, 5 (Top to Bottom)

    // Sort the stack
    sortStack(myStack);

    console.log("\nSorted Stack (Ascending - Smallest on Top):");
    myStack.printStack(); // Expected: 1, 2, 3, 4, 5 (Top to Bottom)

    console.log("--- End Sample Run ---");

    // Example with negative numbers and zero
    console.log("\n--- Sample Run 2 (Negative and Zero) ---");
    const myStack2 = new Stack();
    myStack2.push(-3);
    myStack2.push(0);
    myStack2.push(7);
    myStack2.push(1);
    myStack2.push(-2);

    console.log("Original Stack 2:");
    myStack2.printStack(); // Expected: -2, 1, 7, 0, -3 (Top to Bottom)

    sortStack(myStack2);

    console.log("\nSorted Stack 2 (Ascending - Smallest on Top):");
    myStack2.printStack(); // Expected: -3, -2, 0, 1, 7 (Top to Bottom)
    console.log("--- End Sample Run 2 ---");
}

// Execute the sample run
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run ---
    Original Stack:
    --- Stack (Top to Bottom) ---
    2
    4
    1
    3
    5
    ---------------------------

    Sorted Stack (Ascending - Smallest on Top):
    --- Stack (Top to Bottom) ---
    1
    2
    3
    4
    5
    ---------------------------
    --- End Sample Run ---

    --- Sample Run 2 (Negative and Zero) ---
    Original Stack 2:
    --- Stack (Top to Bottom) ---
    -2
    1
    7
    0
    -3
    ---------------------------

    Sorted Stack 2 (Ascending - Smallest on Top):
    --- Stack (Top to Bottom) ---
    -3
    -2
    0
    1
    7
    ---------------------------
    --- End Sample Run 2 ---
*/