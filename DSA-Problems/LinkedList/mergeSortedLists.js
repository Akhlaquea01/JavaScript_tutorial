/**
 * Definition for a singly-linked list node.
 */
class Node {
    constructor(val, next = null) {
        this.val = val;  // Value stored in the current node
        this.next = next; // Pointer to the next node in the list
    }
}

/**
 * Merges two sorted linked lists (list1 and list2) into one sorted linked list.
 * @param {Node} list1 - Head node of the first sorted linked list.
 * @param {Node} list2 - Head node of the second sorted linked list.
 * @returns {Node} - Head node of the merged sorted linked list.
 */
var mergeTwoLists = function (list1, list2) {
    // Create a dummy node to simplify edge case handling
    const result = new Node(0);
    let current = result; // Pointer to build the new merged list

    // Traverse both lists while both are non-empty
    while (list1 !== null && list2 !== null) {
        // Compare values from both lists and link the smaller one
        if (list1.val <= list2.val) {
            current.next = list1;  // Attach node from list1
            list1 = list1.next;    // Move to the next node in list1
        } else {
            current.next = list2;  // Attach node from list2
            list2 = list2.next;    // Move to the next node in list2
        }
        current = current.next; // Move the current pointer forward
    }

    // Attach any remaining nodes from list1 or list2
    current.next = list1 || list2;

    // Return the merged list, skipping the dummy node
    return result.next;
};

/**
 * Converts an array into a linked list.
 * @param {number[]} arr - Array of numbers to convert.
 * @returns {Node} - Head node of the created linked list.
 */
function arrayToLinkedList(arr) {
    const list = new Node(0); // Dummy head node
    let current = list;

    for (const val of arr) {
        current.next = new Node(val); // Create new node
        current = current.next;       // Move to the next node
    }

    return list.next; // Return actual head, skipping dummy
}

/**
 * Converts a linked list into an array.
 * @param {Node} head - Head node of the linked list.
 * @returns {number[]} - Array of node values.
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;

    // Traverse the linked list and collect values
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}

// ------------------- Test Example -------------------

// Create two sorted linked lists
const list1 = arrayToLinkedList([1, 2, 4]);
const list2 = arrayToLinkedList([1, 3, 4]);

// Merge the two lists
const merged = mergeTwoLists(list1, list2);

// Convert the merged list back to an array for easy display
console.log(linkedListToArray(merged)); // Output: [1, 1, 2, 3, 4, 4]
