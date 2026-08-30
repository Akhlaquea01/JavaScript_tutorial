/**
 * Array-based Stack (LIFO). push/pop/peek operate on the end of the array.
 * Time: O(1) push/pop/peek  Space: O(n)
 */
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    toString() {
        return this.items.toString();
    }

    // Bottom-of-stack element (oldest, i.e. first pushed) — not the same as peek().
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
