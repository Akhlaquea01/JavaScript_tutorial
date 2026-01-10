class DequeArray {
    constructor() {
        this.items = [];
    }

    // Add to Rear (O(1))
    addRear(element) {
        this.items.push(element);
    }

    // Add to Front (O(n) - Slow)
    addFront(element) {
        this.items.unshift(element);
    }

    // Remove from Rear (O(1))
    removeRear() {
        if (this.isEmpty()) return "Underflow";
        return this.items.pop();
    }

    // Remove from Front (O(n) - Slow)
    removeFront() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    getFront() {
        if (this.isEmpty()) return "Empty";
        return this.items[0];
    }

    getRear() {
        if (this.isEmpty()) return "Empty";
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// --- Usage ---
const deque = new DequeArray();
deque.addRear(10);  // [10]
deque.addFront(5);  // [5, 10]
deque.addRear(20);  // [5, 10, 20]
console.log(deque.removeFront()); // 5
console.log(deque.removeRear());  // 20
