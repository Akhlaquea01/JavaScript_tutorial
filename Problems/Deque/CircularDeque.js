class MyCircularDeque {
    /**
     * @param {number} k - The capacity of the deque
     */
    constructor(k) {
        this.capacity = k;
        this.data = new Array(k); // Fixed size array
        this.front = -1;
        this.rear = -1;
        this.size = 0; // Keeping track of count makes logic easier
    }

    // 1. Insert at Front
    insertFront(value) {
        if (this.isFull()) return false;

        // If empty, initialize pointers
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            // Move Front Backwards (Wrap around)
            this.front = (this.front - 1 + this.capacity) % this.capacity;
        }

        this.data[this.front] = value;
        this.size++;
        return true;
    }

    // 2. Insert at Rear
    insertLast(value) {
        if (this.isFull()) return false;

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            // Move Rear Forward
            this.rear = (this.rear + 1) % this.capacity;
        }

        this.data[this.rear] = value;
        this.size++;
        return true;
    }

    // 3. Delete Front
    deleteFront() {
        if (this.isEmpty()) return false;

        // If only 1 element was left, reset pointers
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            // Move Front Forward
            this.front = (this.front + 1) % this.capacity;
        }
        this.size--;
        return true;
    }

    // 4. Delete Last
    deleteLast() {
        if (this.isEmpty()) return false;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            // Move Rear Backward
            this.rear = (this.rear - 1 + this.capacity) % this.capacity;
        }
        this.size--;
        return true;
    }

    getFront() {
        if (this.isEmpty()) return -1;
        return this.data[this.front];
    }

    getRear() {
        if (this.isEmpty()) return -1;
        return this.data[this.rear];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }
}

// --- Usage ---
const circularDeque = new MyCircularDeque(3); // Capacity 3
circularDeque.insertLast(1);  // [1, _, _]
circularDeque.insertLast(2);  // [1, 2, _]
circularDeque.insertFront(3); // [3, 1, 2]  <- Wrapped around!
circularDeque.insertFront(4); // Returns False (Full)
