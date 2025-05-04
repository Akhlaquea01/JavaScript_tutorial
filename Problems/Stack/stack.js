class Stack {
    constructor() {
        this.items = [];
    }

    // Pushes an element onto the stack
    push(element) {
        this.items.push(element);
    }

    // Pops the top element off the stack and returns it
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }

    // Returns the top element of the stack without removing it
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    // Returns true if the stack is empty, false otherwise
    isEmpty() {
        return this.items.length === 0;
    }

    // Returns the number of elements in the stack
    size() {
        return this.items.length;
    }

    // Removes all elements from the stack
    clear() {
        this.items = [];
    }

    // Returns a string representation of the stack
    toString() {
        return this.items.toString();
    }

    // Returns the first element added to the stack (the oldest element)
    first() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[0];
    }
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack:", stack); // Output: [1, 2, 3]
console.log("Stack:", stack.toString()); // Output: [1, 2, 3]
console.log("Stack size:", stack.size()); // Output: 3
console.log("Top element of the stack:", stack.peek()); // Output: 3
console.log("Popped element:", stack.pop()); // Output: 3
console.log("Stack after pop:", stack.toString()); // Output: [1, 2]
stack.clear();
console.log("Stack size after clearing:", stack.size()); // Output: 0
