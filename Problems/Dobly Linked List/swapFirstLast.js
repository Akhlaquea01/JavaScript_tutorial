/***********************************************************************

DLL Swap First and Last (Interview Question)

🧠 Problem:
Implement a member function called `swapFirstLast()` that swaps the 
values of the first and last nodes of a doubly linked list.

📤 Output:
The function should modify the doubly linked list in-place, swapping 
the values of the first and last nodes.

📌 Constraints:
- The list may be empty or have only one node.
- You must only swap values, not node links.

🧪 Example 1:
Input: 1 <-> 2 <-> 3 <-> 4 <-> 5
After calling swapFirstLast():
Output: 5 <-> 2 <-> 3 <-> 4 <-> 1

🧪 Example 2:
Input: 3 <-> 1 <-> 2
After calling swapFirstLast():
Output: 2 <-> 1 <-> 3

************************************************************************/

/** Node class representing a node in the doubly linked list */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/** Doubly Linked List class */
class DoublyLinkedList {
    constructor(value) {
        if (value !== undefined) {
            const newNode = new Node(value);
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
        } else {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
    }

    /** Add a new node to the end */
    push(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    /** Empties the linked list */
    makeEmpty() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /** 🛠️ swapFirstLast(): Swaps the values of first and last nodes */
    swapFirstLast() {
        if (this.length < 2) return;
        const temp = this.head.value;
        this.head.value = this.tail.value;
        this.tail.value = temp;
    }

    /** Utility: Print all node values in order */
    printList() {
        let temp = this.head;
        const values = [];
        while (temp !== null) {
            values.push(temp.value);
            temp = temp.next;
        }
        console.log(values.join(' <-> '));
    }
}


// ✅ Example Test
const dll = new DoublyLinkedList(1);
dll.push(2);
dll.push(3);
dll.push(4);
dll.push(5);

console.log("Before swap:");
dll.printList(); // Output: 1 <-> 2 <-> 3 <-> 4 <-> 5

dll.swapFirstLast();

console.log("After swap:");
dll.printList(); // Output: 5 <-> 2 <-> 3 <-> 4 <-> 1

