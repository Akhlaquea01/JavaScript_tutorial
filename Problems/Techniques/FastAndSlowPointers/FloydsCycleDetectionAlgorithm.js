/**
 * Problem Statement:
 * -------------------
 * Floyd's Cycle Detection Algorithm ("Tortoise and Hare"):
 * Given the head of a singly linked list, detect whether it contains a cycle,
 * and if it does, find the node where the cycle begins.
 *
 * - Use O(1) extra space (no visited-node set).
 * - Two pointers move through the list at different speeds: `slow` advances
 *   one node at a time, `fast` advances two nodes at a time.
 *   - If there is no cycle, `fast` reaches the end of the list (null).
 *   - If there is a cycle, `fast` eventually laps `slow` and they meet inside it.
 * - Once a meeting point is found, resetting one pointer to the head and
 *   advancing both one step at a time makes them meet again exactly at the
 *   start of the cycle (standard proof: the distance from head to the cycle
 *   start equals the distance from the meeting point to the cycle start,
 *   measured going forward around the cycle).
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// Two Pointer Technique [Fast & Slow] (Time Complexity: O(n), Space: O(1)) ✅
// -------------------------------------------------------------
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true; // pointers met inside a cycle
    }

    return false; // fast reached the end -> no cycle
}

function detectCycleStart(head) {
    let slow = head;
    let fast = head;
    let hasLoop = false;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            hasLoop = true;
            break;
        }
    }

    if (!hasLoop) return null;

    // Move one pointer back to the head; both now advance one step at a
    // time and meet exactly at the cycle's start node.
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

// ========== TEST CASES ========== //
function buildCyclicList(values, cycleIndex) {
    if (!values.length) return null;
    const head = new ListNode(values[0]);
    let current = head;
    let cycleNode = cycleIndex === 0 ? head : null;

    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        if (i === cycleIndex) cycleNode = current;
    }

    if (cycleIndex >= 0) current.next = cycleNode; // create the cycle
    return head;
}

console.log("=== Test 1: No Cycle ===");
const list1 = buildCyclicList([1, 2, 3, 4, 5], -1);
console.log("Has cycle:", hasCycle(list1)); // Expected: false
console.log("Cycle start:", detectCycleStart(list1)?.val ?? null); // Expected: null

console.log("\n=== Test 2: Cycle Back to Head ===");
const list2 = buildCyclicList([1, 2, 3, 4, 5], 0);
console.log("Has cycle:", hasCycle(list2)); // Expected: true
console.log("Cycle start:", detectCycleStart(list2)?.val ?? null); // Expected: 1

console.log("\n=== Test 3: Cycle in the Middle ===");
const list3 = buildCyclicList([1, 2, 3, 4, 5], 2);
console.log("Has cycle:", hasCycle(list3)); // Expected: true
console.log("Cycle start:", detectCycleStart(list3)?.val ?? null); // Expected: 3

console.log("\n=== Test 4: Single Node, No Cycle ===");
const list4 = buildCyclicList([1], -1);
console.log("Has cycle:", hasCycle(list4)); // Expected: false

console.log("\n=== Test 5: Empty List ===");
console.log("Has cycle:", hasCycle(null)); // Expected: false
