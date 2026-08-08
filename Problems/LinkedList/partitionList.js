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
       Implement partitionList(x) that rearranges nodes so all values < x come before values ≥ x
       - Must maintain original relative order of nodes
       - Cannot modify node values, only change next pointers
       - Must be done in O(n) time with O(1) space
       - Can only traverse the list once
    */

    partitionList(partitionValue) {
        // Edge case: empty list or single node
        if (this.head === null || this.head.next === null) {
            return;
        }

        // Create dummy nodes for the two partitions
        const lessThanDummy = new Node(0);    // Nodes < partitionValue
        const greaterOrEqualDummy = new Node(0); // Nodes ≥ partitionValue

        let lessThanTail = lessThanDummy;
        let greaterOrEqualTail = greaterOrEqualDummy;
        let currentNode = this.head;

        // Traverse the original list
        while (currentNode !== null) {
            if (currentNode.value < partitionValue) {
                // Add to less-than partition
                lessThanTail.next = currentNode;
                lessThanTail = currentNode;
            } else {
                // Add to greater-or-equal partition
                greaterOrEqualTail.next = currentNode;
                greaterOrEqualTail = currentNode;
            }
            currentNode = currentNode.next;
        }

        // Combine the partitions
        greaterOrEqualTail.next = null; // Important to prevent cycles
        lessThanTail.next = greaterOrEqualDummy.next;

        // Update the head of the list
        this.head = lessThanDummy.next;
    }

    /* 
        How the Solution Works:
        1. Create two dummy nodes to serve as starting points for:
           - Nodes less than partitionValue
           - Nodes greater or equal to partitionValue
        2. Traverse the original list once:
           - Route each node to the appropriate partition
           - Maintain the relative order within each partition
        3. Connect the tail of the less-than partition to the head of the greater-or-equal partition
        4. Update the list's head to point to the new start
        5. The dummy nodes are discarded after partitioning
    */

    // Helper methods
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
}

// ========== TEST CASES ========== //
function runPartitionTests() {
    console.log("=== Test 1: Basic Partition ===");
    const list1 = new LinkedList(3);
    [8, 5, 10, 2, 1].forEach(n => list1.push(n));
    console.log("Original:");
    list1.printList(); // 3 -> 8 -> 5 -> 10 -> 2 -> 1
    list1.partitionList(5);
    console.log("Partitioned at 5:");
    list1.printList(); // Expected: 3 -> 2 -> 1 -> 8 -> 5 -> 10

    console.log("\n=== Test 2: All Elements < Partition ===");
    const list2 = new LinkedList(1);
    [2, 3, 4].forEach(n => list2.push(n));
    list2.partitionList(5);
    console.log("Partitioned at 5:");
    list2.printList(); // Expected: 1 -> 2 -> 3 -> 4

    console.log("\n=== Test 3: All Elements ≥ Partition ===");
    const list3 = new LinkedList(5);
    [6, 7, 8].forEach(n => list3.push(n));
    list3.partitionList(5);
    console.log("Partitioned at 5:");
    list3.printList(); // Expected: 5 -> 6 -> 7 -> 8

    console.log("\n=== Test 4: Single Element ===");
    const list4 = new LinkedList(1);
    list4.partitionList(5);
    console.log("Partitioned at 5:");
    list4.printList(); // Expected: 1

    console.log("\n=== Test 5: Empty List ===");
    const list5 = new LinkedList(1);
    list5.makeEmpty();
    list5.partitionList(5);
    console.log("Partitioned at 5:");
    list5.printList(); // Expected: empty
}

runPartitionTests();