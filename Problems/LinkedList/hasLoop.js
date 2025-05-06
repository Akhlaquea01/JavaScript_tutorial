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

    /**
     * Detects if the linked list contains a cycle/loop using Floyd's algorithm
     * @returns {boolean} True if loop exists, false otherwise
     * 
     * Algorithm:
     * 1. Initialize two pointers (slow and fast) at head
     * 2. Move slow by 1 node, fast by 2 nodes each iteration
     * 3. If pointers meet, loop exists
     * 4. If fast reaches null, no loop exists
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    hasLoop() {
        // Edge cases: empty list or single node without loop
        if (!this.head || !this.head.next) return false;

        let tortoise = this.head;  // Slow pointer
        let hare = this.head;      // Fast pointer

        while (hare && hare.next) {
            tortoise = tortoise.next;        // Moves 1 step
            hare = hare.next.next;           // Moves 2 steps

            // If they meet, loop exists
            if (tortoise === hare) {
                return true;
            }
        }

        // Hare reached end - no loop
        return false;
    }

    // Helper Methods

    /**
     * Adds a node to the end of the list
     * @param {*} value Value to add
     */
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

    /**
     * Creates a loop in the list for testing purposes
     * @param {number} position Position to loop back to (0-based index)
     */
    createLoop(position) {
        if (position < 0 || position >= this.length) return;

        let current = this.head;
        let target = null;
        let index = 0;

        while (current.next) {
            if (index === position) {
                target = current;
            }
            current = current.next;
            index++;
        }

        if (target) {
            current.next = target;
        }
    }

    /**
     * Prints the list (with loop detection)
     * @param {number} maxNodes Maximum nodes to print before assuming loop
     */
    printList(maxNodes = 20) {
        let current = this.head;
        let count = 0;
        const values = [];

        while (current && count < maxNodes) {
            values.push(current.value);
            current = current.next;
            count++;
        }

        if (count === maxNodes) {
            console.log(values.join(' -> ') + ' -> ... (possible loop)');
        } else {
            console.log(values.join(' -> '));
        }
    }
}

// ========== TEST CASES ========== //

function testLoopDetection() {
    console.log("=== Test 1: No Loop ===");
    const list1 = new LinkedList(1);
    [2, 3, 4, 5].forEach(n => list1.push(n));
    list1.printList();
    console.log("Has loop:", list1.hasLoop());  // Expected: false

    console.log("\n=== Test 2: With Loop ===");
    const list2 = new LinkedList(1);
    [2, 3, 4, 5].forEach(n => list2.push(n));
    list2.createLoop(2);  // 5 -> 3
    list2.printList();
    console.log("Has loop:", list2.hasLoop());  // Expected: true

    console.log("\n=== Test 3: Empty List ===");
    const list3 = new LinkedList(1);
    list3.makeEmpty();
    console.log("Has loop:", list3.hasLoop());  // Expected: false

    console.log("\n=== Test 4: Circular List ===");
    const list4 = new LinkedList(1);
    [2, 3].forEach(n => list4.push(n));
    list4.createLoop(0);  // 3 -> 1
    list4.printList();
    console.log("Has loop:", list4.hasLoop());  // Expected: true

    console.log("\n=== Test 5: Single Node ===");
    const list5 = new LinkedList(1);
    console.log("Has loop:", list5.hasLoop());  // Expected: false
}

testLoopDetection();