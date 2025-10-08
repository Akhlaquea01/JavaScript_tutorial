/**
 * Given the heads of two sorted linked lists, merge them into a single sorted linked list and return the head of the merged list.
 */
class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

var mergeTwoLists = function (list1, list2) {
    const result = new Node(0);
    let current = result;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return result.next;
};

// Helper functions for testing
function arrayToLinkedList(arr) {
    const list = new Node(0);
    let current = list;

    for (const val of arr) {
        current.next = new Node(val);
        current = current.next;
    }

    return list.next;
}

function linkedListToArray(head) {
    const result = [];
    let current = head;

    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}

// Test
const list1 = arrayToLinkedList([1, 2, 4]);
const list2 = arrayToLinkedList([1, 3, 4]);
const merged = mergeTwoLists(list1, list2);
console.log(linkedListToArray(merged)); // [1, 1, 2, 3, 4, 4]