/**
 * @file enqueue_dequeue.js
 * @description This file contains the implementation of a Queue data structure using a JavaScript array.
 *
 * What is a Queue?
 * A Queue is a linear data structure that follows a particular order in which operations are performed.
 * The order is FIFO (First-In, First-Out), meaning the first element added to the queue will be the
 * first one to be removed. Think of it like a line of people waiting for a service: the first person
 * to join the line is the first person to be served.
 *
 * Core Queue Operations:
 * 1. enqueue(item): Adds an item to the rear (end) of the queue.
 * 2. dequeue(): Removes and returns the item from the front of the queue.
 * 3. peek() or front(): Returns the item at the front of the queue without removing it.
 * 4. isEmpty(): Checks if the queue is empty.
 * 5. size() or length(): Returns the number of items in the queue.
 *
 * Common Use Cases:
 * - Task scheduling (e.g., print queues, CPU task scheduling).
 * - Breadth-First Search (BFS) algorithm in graphs.
 * - Buffers in streaming data (e.g., video streaming).
 * - Handling requests in web servers.
 * - Message queues in distributed systems.
 *
 * This implementation uses a JavaScript array, leveraging its built-in methods:
 * - `push()` for enqueue (adds to the end).
 * - `shift()` for dequeue (removes from the beginning).
 */

/**
 * Implements a Queue data structure using a JavaScript array.
 * Follows the FIFO (First-In, First-Out) principle.
 */
class Queue {
    /**
     * Initializes a new empty Queue.
     */
    constructor() {
        /** @private @type {Array<*>} items - The internal array to store queue elements. */
        this.items = []; // Array to store the queue elements
    }

    /**
     * Adds an item to the rear (end) of the queue.
     * @param {*} item - The item to be added to the queue.
     */
    enqueue(item) {
        this.items.push(item); // Adds to the end of the array
    }

    /**
     * Removes and returns the item from the front of the queue.
     * If the queue is empty, it throws an Error.
     * @returns {*} The item at the front of the queue.
     * @throws {Error} If the queue is empty.
     */
    dequeue() {
        if (!this.isEmpty()) {
            return this.items.shift(); // Removes from the beginning of the array
        } else {
            throw new Error("Queue is empty");
        }
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of items in the queue.
     * @returns {number} The number of items in the queue.
     */
    size() {
        return this.items.length;
    }

    /**
     * Returns the item at the front of the queue without removing it.
     * If the queue is empty, it throws an Error.
     * @returns {*} The item at the front of the queue.
     * @throws {Error} If the queue is empty.
     */
    peek() {
        if (!this.isEmpty()) {
            return this.items[0]; // Accesses the first element
        } else {
            throw new Error("Queue is empty");
        }
    }

    /**
     * Removes all items from the queue, making it empty.
     */
    clear() {
        this.items = [];
    }

    /**
     * Returns an array representation of the queue.
     * The returned array is a copy, so modifications to it won't affect the queue.
     * @returns {Array<*>} An array containing all items in the queue, from front to rear.
     */
    toArray() {
        return [...this.items]; // Creates a shallow copy
    }

    /**
     * Returns a string representation of the queue.
     * Items are typically separated by a comma and space.
     * @returns {string} A string representation of the queue.
     */
    toString() {
        return this.items.join(', ');
    }
}

/**
 * A comprehensive test function to demonstrate Queue operations.
 */
function comprehensiveQueueTest() {
    console.log("--- Queue Comprehensive Test ---");

    let myQueue = new Queue();

    console.log("\n1. Initial state:");
    console.log("Is empty?", myQueue.isEmpty()); // Expected: true
    console.log("Size:", myQueue.size());       // Expected: 0
    console.log("Queue content (toArray):", myQueue.toArray()); // Expected: []
    console.log("Queue content (toString): '" + myQueue.toString() + "'"); // Expected: ''

    console.log("\n2. Enqueueing items:");
    myQueue.enqueue(10);
    console.log("Enqueued 10. Queue:", myQueue.toString()); // Expected: 10
    myQueue.enqueue(20);
    console.log("Enqueued 20. Queue:", myQueue.toString()); // Expected: 10, 20
    myQueue.enqueue(30);
    console.log("Enqueued 30. Queue:", myQueue.toString()); // Expected: 10, 20, 30
    console.log("Is empty?", myQueue.isEmpty()); // Expected: false
    console.log("Size:", myQueue.size());       // Expected: 3
    console.log("Peek (front):", myQueue.peek()); // Expected: 10

    console.log("\n3. Dequeueing items:");
    console.log("Dequeued:", myQueue.dequeue()); // Expected: 10
    console.log("Queue after dequeue:", myQueue.toString()); // Expected: 20, 30
    console.log("Peek (front):", myQueue.peek()); // Expected: 20
    console.log("Size:", myQueue.size());       // Expected: 2

    console.log("Dequeued:", myQueue.dequeue()); // Expected: 20
    console.log("Queue after dequeue:", myQueue.toString()); // Expected: 30
    console.log("Peek (front):", myQueue.peek()); // Expected: 30
    console.log("Size:", myQueue.size());       // Expected: 1

    console.log("Dequeued:", myQueue.dequeue()); // Expected: 30
    console.log("Queue after dequeue:", myQueue.toString()); // Expected: ''
    console.log("Is empty?", myQueue.isEmpty()); // Expected: true
    console.log("Size:", myQueue.size());       // Expected: 0

    console.log("\n4. Operations on an empty queue (expect errors):");
    try {
        myQueue.dequeue();
    } catch (e) {
        console.error("Error during dequeue on empty queue:", e.message); // Expected: Queue is empty
    }
    try {
        myQueue.peek();
    } catch (e) {
        console.error("Error during peek on empty queue:", e.message); // Expected: Queue is empty
    }

    console.log("\n5. Using clear():");
    myQueue.enqueue('A');
    myQueue.enqueue('B');
    console.log("Queue before clear:", myQueue.toString()); // Expected: A, B
    console.log("Size before clear:", myQueue.size());    // Expected: 2
    myQueue.clear();
    console.log("Queue after clear:", myQueue.toString());   // Expected: ''
    console.log("Size after clear:", myQueue.size());      // Expected: 0
    console.log("Is empty after clear?", myQueue.isEmpty()); // Expected: true

    console.log("\n--- Test Complete ---");
}

// Run the comprehensive test
comprehensiveQueueTest();
