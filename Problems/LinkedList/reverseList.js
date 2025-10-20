/**
 * Definition for a singly-linked list node.
 */
class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }
  
  /**
   * Reverses a singly-linked list iteratively.
   * @param {ListNode} head The head of the linked list.
   * @return {ListNode} The new head of the reversed list.
   */
  const reverseList = function(head) {
      // Handle edge cases: If the list is empty or has only one node,
      // it's already reversed, so we return the head as is.
      if (!head || !head.next) {
          return head;
      }
  
      // Initialize three pointers:
      // `prev`: Tracks the previous node. Starts as null because the new head's next will be null.
      // `current`: Tracks the current node being processed. Starts at the head.
      // `nextTemp`: Temporarily stores the next node before we change the current node's `next` pointer.
      let prev = null;
      let current = head;
      let nextTemp = null;
  
      // Iterate through the list as long as `current` is not null.
      while (current) {
          // 1. Store the next node before reassigning the pointer.
          // This is the most crucial step; without it, we would lose the rest of the list.
          nextTemp = current.next;
  
          // 2. Reverse the current node's `next` pointer to point to the previous node.
          current.next = prev;
  
          // 3. Move the `prev` pointer one step forward to the current node.
          // This prepares `prev` for the next iteration.
          prev = current;
  
          // 4. Move the `current` pointer one step forward to the saved `nextTemp` node.
          current = nextTemp;
      }
  
      // When the loop finishes, `current` is null, and `prev` is at the last node of the original list.
      // This `prev` is the new head of the reversed list.
      return prev;
  };
  
  // --- Example Usage and Visualization ---
  
  // Helper function to build a linked list from an array
  const buildList = (arr) => {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  };
  
  // Helper function to print a linked list
  const printList = (head) => {
    let current = head;
    let output = [];
    while (current) {
      output.push(current.val);
      current = current.next;
    }
    return output.join(" -> ");
  };
  
  // Create the original linked list: 1 -> 2 -> 3 -> 4 -> 5
  const originalListHead = buildList([1, 2, 3, 4, 5]);
  console.log("Original list:", printList(originalListHead));
  
  // Reverse the linked list
  const reversedListHead = reverseList(originalListHead);
  console.log("Reversed list:", printList(reversedListHead));
  
  