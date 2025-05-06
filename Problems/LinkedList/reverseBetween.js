class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.length = 1;
    }

    /* Problem Statement:
       Implement reverseBetween(m, n) that reverses nodes between indexes m and n (0-based)
       - Must be done in-place without using additional data structures
       - Can only traverse the list once
       - Edge cases: empty list, single node, reversing entire list
       - Constraints: m and n are always valid indices (m ≤ n)
    */

    reverseBetween(startIndex, endIndex) {
        // Edge case: empty list or single node
        if (this.head === null || this.head.next === null || startIndex === endIndex) {
            return;
        }

        // Create dummy node to handle edge case when reversing from head
        const dummyHead = new Node(0);
        dummyHead.next = this.head;

        // Find the node before the reversal section (previousNode)
        let previousNode = dummyHead;
        for (let i = 0; i < startIndex; i++) {
            previousNode = previousNode.next;
        }

        // Initialize pointers for reversal
        let current = previousNode.next;
        let nextNode = null;

        // Reverse the subsection between startIndex and endIndex
        for (let i = 0; i < endIndex - startIndex; i++) {
            nextNode = current.next;
            current.next = nextNode.next;
            nextNode.next = previousNode.next;
            previousNode.next = nextNode;
        }

        // Update head in case we reversed from the beginning
        this.head = dummyHead.next;
    }

    // Helper methods remain the same
    printList() {
        let current = this.head;
        let output = "";
        while (current !== null) {
            output += current.value;
            if (current.next !== null) {
                output += " -> ";
            }
            current = current.next;
        }
        console.log(output);
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }
    makeEmpty() {
        this.head = null;
        this.length = 0;
    }
}

/* 
    How the reversal works:
    1. We create a dummy node to handle edge cases where reversal starts at head
    2. Move previousNode to the node before our reversal section
    3. Initialize current at the first node to be reversed
    4. For each node in the reversal range:
       - Save next node
       - Point current node to node after next
       - Insert next node at start of reversal section
       - Update previousNode's next pointer
    5. Finally update the head if needed
*/

// Test Case Demonstration
console.log("=== Testing reverseBetween ===");
const list = new LinkedList(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);

console.log("\nOriginal List:");
list.printList(); // 1 -> 2 -> 3 -> 4 -> 5

console.log("\nReversing between indexes 1 and 3...");
list.reverseBetween(1, 3);
list.printList(); // Expected: 1 -> 4 -> 3 -> 2 -> 5

console.log("\nReversing between indexes 0 and 4 (entire list)...");
list.reverseBetween(0, 4);
list.printList(); // Expected: 5 -> 2 -> 3 -> 4 -> 1

console.log("\nReversing single element (indexes 2 to 2)...");
list.reverseBetween(2, 2);
list.printList(); // Expected: No change (5 -> 2 -> 3 -> 4 -> 1)

// Edge Case Testing
console.log("\n=== Edge Case Testing ===");
const emptyList = new LinkedList(1);
emptyList.makeEmpty();
console.log("Empty list before reversal:");
emptyList.printList(); // empty
emptyList.reverseBetween(0, 0);
console.log("After reversal:");
emptyList.printList(); // remains empty