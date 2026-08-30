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
 * Sorts a stack into ascending order (smallest on top) using a single
 * temporary stack, insertion-sort style.
 * Time: O(n^2)  Space: O(n)
 *
 * @param {Stack} stack - The stack of integers to be sorted. Modified in place.
 */
function sortStack(stack) {
    const additionalStack = new Stack();

    while (!stack.isEmpty()) {
        const temp = stack.pop();

        // Keep additionalStack in descending order (largest on top) so that
        // moving everything back later lands smallest-on-top in `stack`.
        while (!additionalStack.isEmpty() && additionalStack.peek() > temp) {
            stack.push(additionalStack.pop());
        }

        additionalStack.push(temp);
    }

    while (!additionalStack.isEmpty()) {
        stack.push(additionalStack.pop());
    }
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