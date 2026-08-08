class Node {
    constructor(value) {
        this.value = value;  // Value stored in the node
        this.next = null;    // Pointer to the next node
    }
}

class LinkedList {
    constructor(value) {
        // Create first node when initializing the list
        const newNode = new Node(value);
        this.head = newNode;  // Both head and tail point to the first node
        this.tail = newNode;
        this.length = 1;     // Initial length is 1
    }

    // Print all values in the list
    printList() {
        let currentNode = this.head;
        while (currentNode !== null) {
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }

    // Get the head node's value
    getHead() {
        console.log(`Head: ${this.head?.value ?? 'null'}`);
    }

    // Get the tail node's value
    getTail() {
        console.log(`Tail: ${this.tail?.value ?? 'null'}`);
    }

    // Get the current length
    getLength() {
        console.log(`Length: ${this.length}`);
    }

    // Empty the entire list
    makeEmpty() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Add node to the end (push)
    push(value) {
        const newNode = new Node(value);

        // If list is empty, new node becomes both head and tail
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Otherwise, add to end and update tail
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;  // Allow method chaining
    }

    // Remove node from the end (pop)
    pop() {
        if (!this.head) return undefined;  // Empty list case

        let previousNode = null;
        let currentNode = this.head;

        // Traverse until we reach the last node
        while (currentNode.next) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        // Update tail and remove reference to popped node
        this.tail = previousNode;
        if (this.tail) {
            this.tail.next = null;
        }

        this.length--;

        // If list is now empty, reset head and tail
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return currentNode;  // Return the removed node
    }

    // Add node to the beginning (unshift)
    unshift(value) {
        const newNode = new Node(value);

        if (!this.head) {
            // If list is empty, new node is both head and tail
            this.head = newNode;
            this.tail = newNode;
        } else {
            // New node points to current head, then becomes new head
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // Remove node from the beginning (shift)
    shift() {
        if (!this.head) return undefined;  // Empty list case

        const nodeToRemove = this.head;
        this.head = this.head.next;  // Move head to next node
        nodeToRemove.next = null;    // Remove reference

        this.length--;

        // If list is now empty, update tail
        if (this.length === 0) {
            this.tail = null;
        }

        return nodeToRemove;
    }

    // Get node at specific index (0-based)
    get(index) {
        if (index < 0 || index >= this.length) return undefined;

        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    // Update value at specific index
    set(index, value) {
        const nodeToUpdate = this.get(index);
        if (!nodeToUpdate) return false;

        nodeToUpdate.value = value;
        return true;
    }

    // Insert node at specific index
    insert(index, value) {
        if (index === 0) return this.unshift(value);
        if (index === this.length) return this.push(value);
        if (index < 0 || index > this.length) return false;

        const newNode = new Node(value);
        const previousNode = this.get(index - 1);

        // Insert between previousNode and its next node
        newNode.next = previousNode.next;
        previousNode.next = newNode;

        this.length++;
        return true;
    }

    // Remove node at specific index
    remove(index) {
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        if (index < 0 || index >= this.length) return undefined;

        const previousNode = this.get(index - 1);
        const nodeToRemove = previousNode.next;

        // Bypass the node to remove
        previousNode.next = nodeToRemove.next;
        nodeToRemove.next = null;  // Clean up reference

        this.length--;
        return nodeToRemove;
    }

    // Reverse the entire list
    reverse() {
        // Swap head and tail
        let currentNode = this.head;
        this.head = this.tail;
        this.tail = currentNode;

        let nextNode = null;
        let previousNode = null;

        for (let i = 0; i < this.length; i++) {
            nextNode = currentNode.next;      // Store next node
            currentNode.next = previousNode;  // Reverse pointer
            previousNode = currentNode;       // Move previous forward
            currentNode = nextNode;           // Move current forward
        }
    }
}

// ========== TEST CASES ========== //
function runTestCases() {
    console.log("=== Initializing List ===");
    const myList = new LinkedList(1);
    myList.printList();
    myList.getHead();
    myList.getTail();
    myList.getLength();

    console.log("\n=== Pushing Values 2, 3 ===");
    myList.push(2);
    myList.push(3);
    myList.printList();
    myList.getLength();

    console.log("\n=== Popping Last Value ===");
    const poppedNode = myList.pop();
    console.log(`Popped Value: ${poppedNode.value}`);
    myList.printList();
    myList.getTail();

    console.log("\n=== Unshifting (Adding to Front) ===");
    myList.unshift(0);
    myList.printList();
    myList.getHead();

    console.log("\n=== Shifting (Removing from Front) ===");
    const shiftedNode = myList.shift();
    console.log(`Shifted Value: ${shiftedNode.value}`);
    myList.printList();

    console.log("\n=== Getting Node at Index 1 ===");
    const nodeAtIndex1 = myList.get(1);
    console.log(`Value at index 1: ${nodeAtIndex1.value}`);

    console.log("\n=== Setting Value at Index 1 to 99 ===");
    myList.set(1, 99);
    myList.printList();

    console.log("\n=== Inserting 50 at Index 1 ===");
    myList.insert(1, 50);
    myList.printList();

    console.log("\n=== Removing Node at Index 2 ===");
    const removedNode = myList.remove(2);
    console.log(`Removed Value: ${removedNode.value}`);
    myList.printList();

    console.log("\n=== Reversing List ===");
    myList.reverse();
    myList.printList();

    console.log("\n=== Final State ===");
    myList.getHead();
    myList.getTail();
    myList.getLength();
}

runTestCases();