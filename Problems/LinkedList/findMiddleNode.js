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
        this.tail = newNode;
        this.length = 1;
    }

    /* Problem Statement:
       Implement findMiddleNode() that returns the middle node of the linked list
       - For odd-length lists: return the exact middle node
       - For even-length lists: return the second middle node
       - Must be done in O(n) time with O(1) space
       - Can only traverse the list once
    */

    findMiddleNode() {
        // Edge case: empty list
        if (!this.head) return null;

        // Initialize two pointers
        let slowPointer = this.head;
        let fastPointer = this.head;

        // Traverse the list
        while (fastPointer !== null && fastPointer.next !== null) {
            slowPointer = slowPointer.next;          // Moves 1 node at a time
            fastPointer = fastPointer.next.next;      // Moves 2 nodes at a time
        }

        // When fastPointer reaches end, slowPointer is at middle
        return slowPointer;
    }

    /* 
        How the Solution Works (Tortoise and Hare Algorithm):
        1. Initialize two pointers at head
        2. Slow pointer moves one node at a time
        3. Fast pointer moves two nodes at a time
        4. When fast pointer reaches end, slow pointer will be at middle
        5. For even-length lists, returns the second middle node
    */

    // Helper methods
    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }
}

// ========== TEST CASES ========== //
function runMiddleNodeTests() {
    console.log("=== Test 1: Odd-Length List ===");
    const oddList = new LinkedList(1);
    [2, 3, 4, 5].forEach(n => oddList.push(n));
    console.log("List: 1 -> 2 -> 3 -> 4 -> 5");
    const oddMiddle = oddList.findMiddleNode();
    console.log(`Middle Node: ${oddMiddle.value}`); // Expected: 3

    console.log("\n=== Test 2: Even-Length List ===");
    const evenList = new LinkedList(1);
    [2, 3, 4, 5, 6].forEach(n => evenList.push(n));
    console.log("List: 1 -> 2 -> 3 -> 4 -> 5 -> 6");
    const evenMiddle = evenList.findMiddleNode();
    console.log(`Middle Node: ${evenMiddle.value}`); // Expected: 4

    console.log("\n=== Test 3: Single-Node List ===");
    const singleList = new LinkedList(1);
    const singleMiddle = singleList.findMiddleNode();
    console.log(`Middle Node: ${singleMiddle.value}`); // Expected: 1

    console.log("\n=== Test 4: Two-Node List ===");
    const twoList = new LinkedList(1);
    twoList.push(2);
    const twoMiddle = twoList.findMiddleNode();
    console.log(`Middle Node: ${twoMiddle.value}`); // Expected: 2

    console.log("\n=== Test 5: Empty List ===");
    const emptyList = new LinkedList(1);
    emptyList.makeEmpty();
    const emptyMiddle = emptyList.findMiddleNode();
    console.log(`Middle Node: ${emptyMiddle?.value ?? 'null'}`); // Expected: null
}

runMiddleNodeTests();