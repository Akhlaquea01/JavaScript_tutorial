/***
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 */
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

    // Helper method to add nodes (for testing)
    append(value) {
        const newNode = new Node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }

    // Helper method to convert to array (for testing)
    toArray() {
        let result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

const addTwoNumbers = function (l1, l2) {
    let dummyHead = new Node(0);
    let current = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry > 0) {
        // Get values from current nodes (or 0 if node is null)
        let val1 = l1 !== null ? l1.value : 0;
        let val2 = l2 !== null ? l2.value : 0;

        // Calculate sum and carry
        let sum = val1 + val2 + carry;
        let digit = sum % 10;
        carry = Math.floor(sum / 10);

        // Create new node with the digit
        current.next = new Node(digit);
        current = current.next;

        // Move to next nodes
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummyHead.next; //here we are returning next which will exclude 0 first node
};

// Helper function to create linked list from array
function createLinkedListFromArray(arr) {
    if (arr.length === 0) return null;
    let list = new LinkedList(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        list.append(arr[i]);
    }
    return list.head;
}

// TEST CASES

// Example 1: [2,4,3] + [5,6,4] = [7,0,8]
console.log("Example 1:");
let l1 = createLinkedListFromArray([2, 4, 3]);
let l2 = createLinkedListFromArray([5, 6, 4]);
let result = addTwoNumbers(l1, l2);

// Convert result to array to display
function linkedListToArray(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.value);
        current = current.next;
    }
    return result;
}
console.log("Input: [2,4,3] + [5,6,4]");
console.log("Output:", linkedListToArray(result)); // [7,0,8]
console.log("Explanation: 342 + 465 = 807");
console.log("---");

