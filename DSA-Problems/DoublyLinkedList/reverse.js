/***********************************************************************

DLL Reverse (Interview Question)

🧠 Problem:
Implement a member function called `reverse()` that reverses the nodes 
of a doubly linked list.

📤 Output:
The function should modify the doubly linked list in-place, reversing 
the order of the **nodes themselves**, not just their values.

📌 Constraints:
- Only reverse the node links, not just their values.
- The list may be empty or contain one or more nodes.

🧪 Example 1:
Input: 1 <-> 2 <-> 3 <-> 4 <-> 5
After calling reverse():
Output: 5 <-> 4 <-> 3 <-> 2 <-> 1

🧪 Example 2:
Input: 3 <-> 1 <-> 2
After calling reverse():
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

    /** 🛠️ reverse(): Reverses the node links of the doubly linked list */
    reverse() {
        let current = this.head;
        let temp = null;

        while (current !== null) {
            // Swap next and prev pointers
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        // Swap head and tail
        if (temp !== null) {
            this.tail = this.head;
            this.head = temp.prev;
        }
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

console.log("Before reverse:");
dll.printList(); // Output: 1 <-> 2 <-> 3 <-> 4 <-> 5

dll.reverse();

console.log("After reverse:");
dll.printList(); // Output: 5 <-> 4 <-> 3 <-> 2 <-> 1

