class Node {
    constructor(value) {
        this.value = value;  // Node value
        this.next = null;    // Pointer to next node
        this.prev = null;    // Pointer to previous node
    }
}

class DoublyLinkedList {
    constructor(value) {
        // Create first node when initializing
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    /* Core List Operations */

    // Print all values in the list
    printList() {
        let currentNode = this.head;
        const values = [];
        while (currentNode !== null) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log(values.join(' <-> '));
    }

    // Get list metadata
    getListState() {
        console.log(`Head: ${this.head?.value ?? 'null'}`);
        console.log(`Tail: ${this.tail?.value ?? 'null'}`);
        console.log(`Length: ${this.length}`);
    }

    // Empty the list
    makeEmpty() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /* Node Operations */

    // Add node to end (O(1))
    push(value) {
        const newNode = new Node(value);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    // Remove node from end (O(1))
    pop() {
        if (this.length === 0) return undefined;

        const nodeToRemove = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = nodeToRemove.prev;
            this.tail.next = null;
            nodeToRemove.prev = null;
        }

        this.length--;
        return nodeToRemove;
    }

    // Add node to beginning (O(1))
    unshift(value) {
        const newNode = new Node(value);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    // Remove node from beginning (O(1))
    shift() {
        if (this.length === 0) return undefined;

        const nodeToRemove = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = nodeToRemove.next;
            this.head.prev = null;
            nodeToRemove.next = null;
        }

        this.length--;
        return nodeToRemove;
    }

    // Get node at index (O(n) - optimized with two-way traversal)
    get(index) {
        if (index < 0 || index >= this.length) return undefined;

        let currentNode;

        // Optimize traversal direction based on index position
        if (index < this.length / 2) {
            currentNode = this.head;
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                currentNode = currentNode.prev;
            }
        }

        return currentNode;
    }

    // Update node value at index (O(n))
    set(index, value) {
        const nodeToUpdate = this.get(index);
        if (!nodeToUpdate) return false;

        nodeToUpdate.value = value;
        return true;
    }

    // Insert node at index (O(n))
    insert(index, value) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return this.unshift(value);
        if (index === this.length) return this.push(value);

        const newNode = new Node(value);
        const beforeNode = this.get(index - 1);
        const afterNode = beforeNode.next;

        // Update links
        beforeNode.next = newNode;
        newNode.prev = beforeNode;
        newNode.next = afterNode;
        afterNode.prev = newNode;

        this.length++;
        return true;
    }

    // Remove node at index (O(n))
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        const nodeToRemove = this.get(index);
        const beforeNode = nodeToRemove.prev;
        const afterNode = nodeToRemove.next;

        // Bypass node to remove
        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;

        // Clean up references
        nodeToRemove.next = null;
        nodeToRemove.prev = null;

        this.length--;
        return nodeToRemove;
    }
}

// ========== TEST CASES ========== //
function runDoublyLinkedListTests() {
    console.log("=== Test 1: Basic Operations ===");
    const dll = new DoublyLinkedList(1);
    console.log("Initial list:");
    dll.printList(); // 1

    console.log("\nPushing values 2, 3, 4, 5:");
    dll.push(2).push(3).push(4).push(5);
    dll.printList(); // 1 <-> 2 <-> 3 <-> 4 <-> 5

    console.log("\nPopping last value:");
    console.log(`Removed: ${dll.pop().value}`); // 5
    dll.printList(); // 1 <-> 2 <-> 3 <-> 4

    console.log("\nUnshifting value 0:");
    dll.unshift(0);
    dll.printList(); // 0 <-> 1 <-> 2 <-> 3 <-> 4

    console.log("\nShifting first value:");
    console.log(`Removed: ${dll.shift().value}`); // 0
    dll.printList(); // 1 <-> 2 <-> 3 <-> 4

    console.log("\n=== Test 2: Get/Set Operations ===");
    console.log(`Value at index 2: ${dll.get(2).value}`); // 3
    console.log("Setting index 2 to 99:");
    dll.set(2, 99);
    dll.printList(); // 1 <-> 2 <-> 99 <-> 4

    console.log("\n=== Test 3: Insert/Remove Operations ===");
    console.log("Inserting 50 at index 2:");
    dll.insert(2, 50);
    dll.printList(); // 1 <-> 2 <-> 50 <-> 99 <-> 4

    console.log("Removing at index 3:");
    console.log(`Removed: ${dll.remove(3).value}`); // 99
    dll.printList(); // 1 <-> 2 <-> 50 <-> 4

    console.log("\n=== Test 4: Edge Cases ===");
    console.log("Attempting to remove from empty list:");
    const emptyList = new DoublyLinkedList(1);
    emptyList.makeEmpty();
    console.log(`Removed: ${emptyList.remove(0)?.value ?? 'undefined'}`); // undefined

    console.log("\nCurrent list state:");
    dll.getListState();
}

runDoublyLinkedListTests();