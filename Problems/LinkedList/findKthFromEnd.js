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
    }

    /* Problem Statement:
       Implement findKthFromEnd(k) that returns the kth node from the end
       - Must use O(1) space (no additional data structures)
       - Can only traverse the list once
       - Return null if k is invalid (k ≤ 0 or k > list length)
    */

    findKthFromEnd(k) {
        // Edge case: invalid k or empty list
        if (k <= 0 || this.head === null) {
            return null;
        }

        // Initialize two pointers
        let slowPointer = this.head;
        let fastPointer = this.head;

        // Move fastPointer k nodes ahead
        for (let i = 0; i < k; i++) {
            // If fastPointer reaches end before k steps, k is too large
            if (fastPointer === null) {
                return null;
            }
            fastPointer = fastPointer.next;
        }

        // Move both pointers until fastPointer reaches end
        while (fastPointer !== null) {
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next;
        }

        // slowPointer is now at the kth node from end
        return slowPointer;
    }

    // Helper methods remain the same
    printList() {
        let current = this.head;
        while (current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    makeEmpty() {
        this.head = null;
        this.tail = null;
    }
}

/* 
    How the solution works (Two Pointer Technique):
    1. Initialize two pointers at head
    2. Move fast pointer k nodes ahead
    3. If fast pointer reaches null early, k is invalid
    4. Move both pointers at same speed until fast reaches end
    5. Slow pointer will be at length - k position (kth from end)

    Time Complexity: O(n) - single traversal
    Space Complexity: O(1) - constant space
*/

// ========== TEST CASES ========== //
function runTests() {
    console.log("=== Test 1: Basic Case ===");
    const list1 = new LinkedList(1);
    list1.push(2);
    list1.push(3);
    list1.push(4);
    list1.push(5);
    const result1 = list1.findKthFromEnd(2);
    console.log(`2nd from end: ${result1?.value}`); // Expected: 4

    console.log("\n=== Test 2: k = length ===");
    const result2 = list1.findKthFromEnd(5);
    console.log(`5th from end: ${result2?.value}`); // Expected: 1

    console.log("\n=== Test 3: k = 1 (tail) ===");
    const result3 = list1.findKthFromEnd(1);
    console.log(`1st from end: ${result3?.value}`); // Expected: 5

    console.log("\n=== Test 4: Empty List ===");
    const emptyList = new LinkedList(1);
    emptyList.makeEmpty();
    const result4 = emptyList.findKthFromEnd(1);
    console.log(`Empty list result: ${result4?.value}`); // Expected: null

    console.log("\n=== Test 5: Invalid k ===");
    const result5 = list1.findKthFromEnd(0);
    console.log(`k=0 result: ${result5?.value}`); // Expected: null
    const result6 = list1.findKthFromEnd(6);
    console.log(`k=6 result: ${result6?.value}`); // Expected: null
}

runTests();