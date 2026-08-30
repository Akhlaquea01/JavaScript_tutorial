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
   * Time: O(n)  Space: O(1)
   */
  const reverseList = function(head) {
      // Empty list or single node: already reversed.
      if (!head || !head.next) {
          return head;
      }
  
      let prev = null;
      let current = head;
      let nextTemp = null;
  
      while (current) {
          // Save next before overwriting current.next, or we'd lose the rest of the list.
          nextTemp = current.next;
          current.next = prev;
          prev = current;
          current = nextTemp;
      }

      // current is null here, so prev is the last original node - the new head.
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
  
  