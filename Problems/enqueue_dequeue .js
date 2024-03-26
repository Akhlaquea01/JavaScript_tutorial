class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        // Add an item to the rear of the queue
        this.items.push(item);
    }

    dequeue() {
        // Remove and return the item at the front of the queue
        if (!this.isEmpty()) {
            return this.items.shift();
        } else {
            throw new Error("Queue is empty");
        }
    }

    isEmpty() {
        // Check if the queue is empty
        return this.items.length === 0;
    }

    size() {
        // Return the number of items in the queue
        return this.items.length;
    }

    peek() {
        // Return the item at the front of the queue without removing it
        if (!this.isEmpty()) {
            return this.items[0];
        } else {
            throw new Error("Queue is empty");
        }
    }

    clear() {
        // Remove all items from the queue
        this.items = [];
    }

    toArray() {
        // Return an array representation of the queue
        return [...this.items];
    }

    toString() {
        // Return a string representation of the queue
        return this.items.join(', ');
    }
}

// Example usage:
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Queue size:", queue.size()); // Output: 3
console.log("Front of the queue:", queue.peek()); // Output: 1
console.log("Dequeued item:", queue.dequeue()); // Output: 1
console.log("Queue size after dequeue:", queue.size()); // Output: 2
console.log("Array representation of queue:", queue.toArray()); // Output: [2, 3]
console.log("String representation of queue:", queue.toString()); // Output: 2, 3
queue.clear();
console.log("Queue size after clearing:", queue.size()); // Output: 0
