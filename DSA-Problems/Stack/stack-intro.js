/**
 * @file stack-intro.js
 * @description This file contains the implementation of a Stack data structure using a singly linked list.
 *
 * What is a Stack?
 * A Stack is a linear data structure that follows a particular order in which operations are performed.
 * The order is LIFO (Last In, First Out), meaning the last element added to the stack will be the first one to be removed.
 * Think of it like a stack of plates: you add plates to the top and remove plates from the top.
 *
 * Core Stack Operations:
 * 1. push(value): Adds an element to the top of the stack.
 * 2. pop(): Removes and returns the element from the top of the stack.
 * 3. peek() or top(): Returns the top element of the stack without removing it.
 * 4. isEmpty(): Checks if the stack is empty. (Can be inferred from length === 0)
 * 5. size() or length(): Returns the number of elements in the stack.
 *
 * Common Use Cases:
 * - Function call management (the "call stack").
 * - Undo/redo operations in software.
 * - Expression evaluation (e.g., infix to postfix conversion, balancing parentheses).
 * - Backtracking algorithms (e.g., maze solving, N-queens problem).
 * - Browser history navigation (back button).
 *
 * This implementation uses a singly linked list where the 'top' of the stack
 * corresponds to the head of the linked list.
 */

/**
 * Represents a node in the linked list used to implement the stack.
 * Each node stores a value and a reference to the next node in the stack (the one below it).
 */
class Node {
    /**
     * Creates a new Node instance.
     * @param {*} value - The value to be stored in the node.
     */
    constructor(value) {
        this.value = value; // The data stored in this node
        this.next = null;   // Pointer to the next node in the stack (element below this one)
    }
}

/**
 * Implements a Stack data structure using a singly linked list.
 * Follows the LIFO (Last In, First Out) principle.
 */
class Stack {
    /**
     * Initializes a new Stack.
     * If an initialValue is provided, the stack is created with that one element.
     * Otherwise, an empty stack is created.
     * @param {*} [initialValue] - The optional initial value to add to the stack.
     */
    constructor(initialValue) {
        /** @property {Node|null} top - Points to the top node of the stack. Null if the stack is empty. */
        this.top = null;
        /** @property {number} length - The number of elements currently in the stack. */
        this.length = 0;

        if (initialValue !== undefined) {
            const newNode = new Node(initialValue);
            this.top = newNode;
            this.length = 1;
        }
    }

    /**
     * Prints all the values in the stack from top to bottom.
     * Useful for debugging and visualization.
     */
    printStack() {
        let temp = this.top;
        const values = [];
        while (temp !== null) {
            values.push(temp.value);
            temp = temp.next;
        }
        if (values.length === 0) {
            console.log("Stack is empty.");
        } else {
            console.log("Stack (top to bottom): " + values.join(" -> "));
        }
    }

    /**
     * Gets the value of the top element of the stack without removing it.
     * Logs the top value or indicates if the stack is empty.
     * @returns {*} The value of the top element, or undefined if the stack is empty.
     */
    getTop() {
        if (this.top === null) {
            console.log("Top: null (Stack is empty)");
            return undefined;
        } else {
            console.log("Top: " + this.top.value);
            return this.top.value;
        }
    }

    /**
     * Gets the current number of elements (length) in the stack.
     * Logs the length.
     * @returns {number} The number of elements in the stack.
     */
    getLength() {
        console.log("Length: " + this.length);
        return this.length;
    }

    /**
     * Empties the stack by removing all its elements.
     * Resets the top pointer to null and length to 0.
     */
    makeEmpty() {
        this.top = null;
        this.length = 0; // Corrected from this.height to this.length
    }

    /**
     * Adds a new element with the given value to the top of the stack.
     * @param {*} value - The value to be pushed onto the stack.
     */
    push(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
    }

    /**
     * Removes and returns the top element (node) from the stack.
     * If the stack is empty, it returns undefined.
     * @returns {Node|undefined} The removed node containing the value, or undefined if the stack was empty.
     */
    pop() {
        if (this.length === 0) { // Or check if this.top is null
            return undefined;
        }

        let temp = this.top;
        this.top = this.top.next;
        temp.next = null; // Sever the link from the popped node

        this.length--;
        return temp; // Returns the Node object
    }

}


/**
 * A comprehensive test function to demonstrate Stack operations.
 */
function comprehensiveTest() {
    console.log("--- Stack Comprehensive Test ---");

    // Test 1: Initialize an empty stack and check initial state
    console.log("\n1. Initializing an empty Stack:");
    let myStack = new Stack();
    myStack.printStack(); // Expected: Stack is empty.
    myStack.getTop();     // Expected: Top: null (Stack is empty)
    myStack.getLength();  // Expected: Length: 0

    // Test 2: Push operations
    console.log("\n2. Pushing elements:");
    myStack.push(10);
    console.log("Pushed 10.");
    myStack.printStack(); // Expected: Stack (top to bottom): 10
    myStack.getTop();     // Expected: Top: 10
    myStack.getLength();  // Expected: Length: 1

    myStack.push(20);
    console.log("Pushed 20.");
    myStack.printStack(); // Expected: Stack (top to bottom): 20 -> 10
    myStack.getTop();     // Expected: Top: 20
    myStack.getLength();  // Expected: Length: 2

    myStack.push(30);
    console.log("Pushed 30.");
    myStack.printStack(); // Expected: Stack (top to bottom): 30 -> 20 -> 10
    myStack.getTop();     // Expected: Top: 30
    myStack.getLength();  // Expected: Length: 3

    // Test 3: Pop operations
    console.log("\n3. Popping elements:");
    let poppedNode = myStack.pop();
    console.log("Popped value: " + (poppedNode ? poppedNode.value : "undefined")); // Expected: 30
    myStack.printStack(); // Expected: Stack (top to bottom): 20 -> 10
    myStack.getTop();     // Expected: Top: 20
    myStack.getLength();  // Expected: Length: 2

    poppedNode = myStack.pop();
    console.log("Popped value: " + (poppedNode ? poppedNode.value : "undefined")); // Expected: 20
    myStack.printStack(); // Expected: Stack (top to bottom): 10
    myStack.getTop();     // Expected: Top: 10
    myStack.getLength();  // Expected: Length: 1

    poppedNode = myStack.pop();
    console.log("Popped value: " + (poppedNode ? poppedNode.value : "undefined")); // Expected: 10
    myStack.printStack(); // Expected: Stack is empty.
    myStack.getTop();     // Expected: Top: null (Stack is empty)
    myStack.getLength();  // Expected: Length: 0

    // Test 4: Operations on an empty stack
    console.log("\n4. Operations on an empty stack:");
    poppedNode = myStack.pop();
    console.log("Popped value from empty stack: " + (poppedNode ? poppedNode.value : "undefined")); // Expected: undefined
    myStack.getTop();     // Expected: Top: null (Stack is empty)
    myStack.getLength();  // Expected: Length: 0

    // Test 5: makeEmpty method
    console.log("\n5. Using makeEmpty():");
    myStack.push(5); // Add some items before emptying
    myStack.push(15);
    console.log("Stack before makeEmpty:");
    myStack.printStack(); // Expected: Stack (top to bottom): 15 -> 5
    myStack.makeEmpty();
    console.log("Stack after makeEmpty:");
    myStack.printStack(); // Expected: Stack is empty.
    myStack.getTop();     // Expected: Top: null (Stack is empty)
    myStack.getLength();  // Expected: Length: 0

    // Test 6: Push to a stack that was emptied by makeEmpty
    console.log("\n6. Pushing to a stack emptied by makeEmpty():");
    myStack.push(100);
    console.log("Pushed 100.");
    myStack.printStack(); // Expected: Stack (top to bottom): 100
    myStack.getTop();     // Expected: Top: 100
    myStack.getLength();  // Expected: Length: 1

    console.log("\n--- Test Complete ---");
}

// Run the comprehensive test
comprehensiveTest();