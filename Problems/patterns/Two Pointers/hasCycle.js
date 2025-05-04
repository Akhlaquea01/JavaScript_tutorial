/**
 * Represents a node in a singly linked list.
 */
class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Detects whether a cycle exists in a linked list using Floyd's Tortoise and Hare algorithm.
 * 
 * Problem Statement:
 * Given the head of a linked list, determine if the linked list contains a cycle.
 * A cycle occurs when a node's next pointer points to a previously traversed node,
 * creating an infinite loop in the list.
 * 
 * Approach:
 * - Use two pointers moving at different speeds (slow and fast)
 * - If there's a cycle, the fast pointer will eventually catch up to the slow pointer
 * - If there's no cycle, the fast pointer will reach the end of the list
 * 
 * @param {LinkedListNode} head - The starting node of the linked list
 * @returns {boolean} - True if a cycle exists, false otherwise
 */
function hasCycle(head) {
    // Initialize two pointers at the head of the list
    let slowPointer = head;
    let fastPointer = head;

    // Traverse the list while the fast pointer can move forward
    while (fastPointer !== null && fastPointer.next !== null) {
        slowPointer = slowPointer.next;       // Moves one node at a time
        fastPointer = fastPointer.next.next;  // Moves two nodes at a time

        // If the pointers meet, a cycle exists
        if (slowPointer === fastPointer) {
            return true;
        }
    }

    // If we reach the end, no cycle exists
    return false;
}

// Example Usage:
// Create a linked list with nodes 1 → 2 → 3 → back to 1 (cycle)
const node1 = new LinkedListNode(1);
const node2 = new LinkedListNode(2);
const node3 = new LinkedListNode(3);

node1.next = node2;
node2.next = node3;
node3.next = node1; // Creates the cycle

console.log('Does the linked list have a cycle?', hasCycle(node1)); // Output: true

// Create a linked list without a cycle: 1 → 2 → 3 → null
const acyclicNode1 = new LinkedListNode(1);
const acyclicNode2 = new LinkedListNode(2);
const acyclicNode3 = new LinkedListNode(3);

acyclicNode1.next = acyclicNode2;
acyclicNode2.next = acyclicNode3;

console.log('Does the linked list have a cycle?', hasCycle(acyclicNode1)); // Output: false