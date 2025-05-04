/**
 * Definition for singly-linked list node.
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Detects a cycle in a linked list using Floyd's algorithm.
 * @param {ListNode} head - Head of the linked list
 * @return {boolean} - True if a cycle exists, false otherwise
 */
function hasCycle(head) {
    // Edge case: empty list or single node without a cycle
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        if (slow === fast) return true; // Cycle detected
        slow = slow.next;      // Move 1 step
        fast = fast.next.next; // Move 2 steps
    }

    return false; // Fast reached null → no cycle
}

// Helper function to create a cyclic linked list for testing
function createCyclicList(values, cycleIndex) {
    if (!values.length) return null;
    const head = new ListNode(values[0]);
    let current = head;
    let cycleNode = null;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        if (i === cycleIndex) cycleNode = current;
    }

    if (cycleIndex >= 0) current.next = cycleNode; // Create cycle
    return head;
}

// Test Cases
const cyclicList = createCyclicList([1, 2, 3, 4, 5], 1); // Cycle at node 2
console.log(hasCycle(cyclicList)); // Output: true

const acyclicList = createCyclicList([1, 2, 3, 4, 5], -1); // No cycle
console.log(hasCycle(acyclicList)); // Output: false

/**
 * Finds the starting node of the cycle if it exists.
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode|null} - Start node if cycle exists, null otherwise
 */
function detectCycleStart(head) {
    let slow = head, fast = head;
    let hasCycle = false;

    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }

    if (!hasCycle) return null;

    // Find start node
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

// Example Usage
const cycleStartNode = detectCycleStart(cyclicList);
console.log(cycleStartNode?.val); // Output: 2

/**
 * Calculates the length of the cycle if it exists.
 * @param {ListNode} head - Head of the linked list
 * @return {number} - Length of the cycle (0 if no cycle)
 */
function getCycleLength(head) {
    let slow = head, fast = head;
    let steps = 0;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // Count cycle length
            do {
                slow = slow.next;
                steps++;
            } while (slow !== fast);
            return steps;
        }
    }

    return 0; // No cycle
}

// Example Usage
console.log(getCycleLength(cyclicList)); // Output: 4 (cycle: 2→3→4→5→2)