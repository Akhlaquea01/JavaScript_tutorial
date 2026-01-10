class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DequeDLL {
    constructor() {
        this.head = null; // Front
        this.tail = null; // Rear
        this.size = 0;
    }

    // 1. Add to Front (Push Head)
    addFront(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head; // Link new node to current head
            this.head.prev = newNode; // Link current head back to new node
            this.head = newNode;      // Update Head pointer
        }
        this.size++;
    }

    // 2. Add to Rear (Push Tail)
    addRear(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail; // Link new node to current tail
            this.tail.next = newNode; // Link current tail forward to new node
            this.tail = newNode;      // Update Tail pointer
        }
        this.size++;
    }

    // 3. Remove from Front (Pop Head)
    removeFront() {
        if (this.isEmpty()) return "Underflow";

        const value = this.head.value;

        if (this.head === this.tail) { // Only 1 node
            this.head = this.tail = null;
        } else {
            this.head = this.head.next; // Move head forward
            this.head.prev = null;      // Remove link to old head
        }
        this.size--;
        return value;
    }

    // 4. Remove from Rear (Pop Tail)
    removeRear() {
        if (this.isEmpty()) return "Underflow";

        const value = this.tail.value;

        if (this.head === this.tail) { // Only 1 node
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev; // Move tail backward
            this.tail.next = null;      // Remove link to old tail
        }
        this.size--;
        return value;
    }

    isEmpty() {
        return this.size === 0;
    }
}

// --- Usage ---
const myDeque = new DequeDLL();
myDeque.addFront("A");
myDeque.addRear("B");
myDeque.addFront("C");
// Order: C <-> A <-> B

console.log(myDeque.removeFront()); // "C"
console.log(myDeque.removeRear());  // "B"
