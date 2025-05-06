class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.length = 1;
    }

    /* Problem Statement:
       Implement swapPairs() that swaps every two adjacent nodes in a doubly linked list
       - Must be done in-place by modifying node pointers
       - Cannot modify node values
       - Must maintain proper prev/next pointers
       - Should handle edge cases (empty list, single node)
    */

    swapPairs() {
        // Edge cases: empty list or single node
        if (this.length <= 1) return;

        // Create dummy node to simplify head handling
        const dummyNode = new Node(0);
        dummyNode.next = this.head;
        this.head.prev = dummyNode;

        let previousNode = dummyNode;
        let currentNode = this.head;

        while (currentNode !== null && currentNode.next !== null) {
            // Identify nodes to swap
            const firstNode = currentNode;
            const secondNode = currentNode.next;
            const nextPair = secondNode.next;

            // Perform the swap
            previousNode.next = secondNode;
            secondNode.prev = previousNode;

            secondNode.next = firstNode;
            firstNode.prev = secondNode;

            firstNode.next = nextPair;
            if (nextPair !== null) {
                nextPair.prev = firstNode;
            }

            // Move to next pair
            previousNode = firstNode;
            currentNode = nextPair;
        }

        // Update head and ensure its prev is null
        this.head = dummyNode.next;
        this.head.prev = null;
    }

    /* 
        How the Swap Algorithm Works:
        1. Create dummy node to handle head swaps uniformly
        2. Initialize pointers:
           - previousNode: node before current pair
           - currentNode: first node in current pair
        3. For each pair:
           a. Identify nodes (firstNode and secondNode)
           b. Update pointers to swap their positions
           c. Connect swapped nodes to previous and next nodes
           d. Move pointers to next pair
        4. Clean up by setting new head and nullifying its prev
        5. Handles odd-length lists by leaving last node in place

        Time Complexity: O(n) - single traversal
        Space Complexity: O(1) - constant space (few pointers)
    */

    // Helper methods
    push(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
            newNode.prev = currentNode;
        }
        this.length++;
    }

    printList() {
        let current = this.head;
        const values = [];
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' <-> '));
    }
}

// ========== TEST CASES ========== //
function runSwapPairsTests() {
    console.log("=== Test 1: Empty List ===");
    const emptyList = new DoublyLinkedList(1);
    emptyList.makeEmpty();
    emptyList.swapPairs();
    console.log("List after swap:");
    emptyList.printList(); // Expected: (empty)

    console.log("\n=== Test 2: Single Node ===");
    const singleNodeList = new DoublyLinkedList(1);
    console.log("Before swap:");
    singleNodeList.printList(); // 1
    singleNodeList.swapPairs();
    console.log("After swap:");
    singleNodeList.printList(); // Expected: 1

    console.log("\n=== Test 3: Two Nodes ===");
    const twoNodeList = new DoublyLinkedList(1);
    twoNodeList.push(2);
    console.log("Before swap:");
    twoNodeList.printList(); // 1 <-> 2
    twoNodeList.swapPairs();
    console.log("After swap:");
    twoNodeList.printList(); // Expected: 2 <-> 1

    console.log("\n=== Test 4: Three Nodes ===");
    const threeNodeList = new DoublyLinkedList(1);
    threeNodeList.push(2).push(3);
    console.log("Before swap:");
    threeNodeList.printList(); // 1 <-> 2 <-> 3
    threeNodeList.swapPairs();
    console.log("After swap:");
    threeNodeList.printList(); // Expected: 2 <-> 1 <-> 3

    console.log("\n=== Test 5: Four Nodes ===");
    const fourNodeList = new DoublyLinkedList(1);
    fourNodeList.push(2).push(3).push(4);
    console.log("Before swap:");
    fourNodeList.printList(); // 1 <-> 2 <-> 3 <-> 4
    fourNodeList.swapPairs();
    console.log("After swap:");
    fourNodeList.printList(); // Expected: 2 <-> 1 <-> 4 <-> 3

    console.log("\n=== Test 6: Five Nodes ===");
    const fiveNodeList = new DoublyLinkedList(1);
    fiveNodeList.push(2).push(3).push(4).push(5);
    console.log("Before swap:");
    fiveNodeList.printList(); // 1 <-> 2 <-> 3 <-> 4 <-> 5
    fiveNodeList.swapPairs();
    console.log("After swap:");
    fiveNodeList.printList(); // Expected: 2 <-> 1 <-> 4 <-> 3 <-> 5
}

runSwapPairsTests();