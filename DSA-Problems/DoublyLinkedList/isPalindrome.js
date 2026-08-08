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
        this.tail = newNode;
        this.length = 1;
    }

    /* Problem Statement:
       Implement isPalindrome() that checks if a doubly linked list reads the same
       forwards and backwards.
       - Must use the doubly linked nature of the list (two-way traversal)
       - Must only traverse the list once (O(n) time)
       - Must use O(1) space (no additional data structures)
    */

    isPalindrome() {
        // Edge cases: empty list or single node is always a palindrome
        if (this.length <= 1) return true;

        // Initialize two pointers at both ends
        let leftPointer = this.head;
        let rightPointer = this.tail;

        // We only need to check half the list
        const stepsToCheck = Math.floor(this.length / 2);

        for (let i = 0; i < stepsToCheck; i++) {
            // If values don't match, it's not a palindrome
            if (leftPointer.value !== rightPointer.value) {
                return false;
            }

            // Move pointers towards each other
            leftPointer = leftPointer.next;
            rightPointer = rightPointer.prev;
        }

        // All comparisons matched
        return true;
    }

    /* 
        How the Palindrome Check Works:
        1. Initialize two pointers at head (left) and tail (right)
        2. Compare values at both pointers:
           - If any pair doesn't match → not a palindrome
        3. Move pointers towards center:
           - Left pointer moves forward (next)
           - Right pointer moves backward (prev)
        4. Only need to check half the list (floor(length/2) comparisons)
        5. If all comparisons match → is palindrome
        
        Time Complexity: O(n) - single traversal (half the list)
        Space Complexity: O(1) - constant space (two pointers)
    */

    // Helper methods
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
function runPalindromeTests() {
    console.log("=== Test 1: Empty List ===");
    const emptyList = new DoublyLinkedList(1);
    emptyList.makeEmpty();
    console.log(`Is palindrome? ${emptyList.isPalindrome()}`); // Expected: true

    console.log("\n=== Test 2: Single Node ===");
    const singleNodeList = new DoublyLinkedList(5);
    console.log(`Is palindrome? ${singleNodeList.isPalindrome()}`); // Expected: true

    console.log("\n=== Test 3: Two-Node Palindrome ===");
    const twoNodePalindrome = new DoublyLinkedList(1);
    twoNodePalindrome.push(1);
    console.log(`Is palindrome? ${twoNodePalindrome.isPalindrome()}`); // Expected: true

    console.log("\n=== Test 4: Two-Node Non-Palindrome ===");
    const twoNodeNonPalindrome = new DoublyLinkedList(1);
    twoNodeNonPalindrome.push(2);
    console.log(`Is palindrome? ${twoNodeNonPalindrome.isPalindrome()}`); // Expected: false

    console.log("\n=== Test 5: Odd-Length Palindrome ===");
    const oddPalindrome = new DoublyLinkedList(1);
    oddPalindrome.push(2).push(3).push(2).push(1);
    console.log("List: 1 <-> 2 <-> 3 <-> 2 <-> 1");
    console.log(`Is palindrome? ${oddPalindrome.isPalindrome()}`); // Expected: true

    console.log("\n=== Test 6: Even-Length Palindrome ===");
    const evenPalindrome = new DoublyLinkedList(1);
    evenPalindrome.push(2).push(2).push(1);
    console.log("List: 1 <-> 2 <-> 2 <-> 1");
    console.log(`Is palindrome? ${evenPalindrome.isPalindrome()}`); // Expected: true

    console.log("\n=== Test 7: Non-Palindrome ===");
    const nonPalindrome = new DoublyLinkedList(1);
    nonPalindrome.push(2).push(3).push(4);
    console.log("List: 1 <-> 2 <-> 3 <-> 4");
    console.log(`Is palindrome? ${nonPalindrome.isPalindrome()}`); // Expected: false

    console.log("\n=== Test 8: All Same Values ===");
    const allSame = new DoublyLinkedList(5);
    allSame.push(5).push(5).push(5);
    console.log("List: 5 <-> 5 <-> 5 <-> 5");
    console.log(`Is palindrome? ${allSame.isPalindrome()}`); // Expected: true
}

runPalindromeTests();