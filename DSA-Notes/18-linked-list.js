// DSA-Notes/18-linked-list.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "linked-list",
  "num": 18,
  "emoji": "🔗",
  "title": "Linked List",
  "summary": "Nodes ki chain — har node do cheezein rakhta hai: data aur next node ka address (pointer). Memory contiguous nahi hoti (Array ke ulat), isliye insert/delete O(1) hai (agar pointer pata ho) lekin index se direct access nahi hota.",
  "sections": [
    {
      "heading": "Types",
      "body": "\n      <ul>\n        <li><strong>Singly Linked List</strong> — har node sirf agle (next) node ka address rakhta hai. Ek hi direction me traverse ho sakta hai.</li>\n        <li><strong>Doubly Linked List</strong> — har node next aur previous, dono ka address rakhta hai. Dono direction me traverse ho sakta hai, delete O(1) hai agar node ka pointer pata ho.</li>\n        <li><strong>Circular Linked List</strong> — last node phir se head ko point karta hai (loop ban jaata hai). Playlist, round-robin scheduling jaise use cases.</li>\n      </ul>"
    },
    {
      "heading": "Node Structure",
      "code": "class Node:\n    constructor(val):\n        this.val = val\n        this.next = null      // Doubly me: this.prev = null bhi"
    },
    {
      "heading": "Basic Operations",
      "body": "\n      <ul>\n        <li><strong>Traverse</strong> → O(n)</li>\n        <li><strong>Insert at Head</strong> → O(1)</li>\n        <li><strong>Insert at Tail</strong> → O(1) agar tail pointer maintain karte ho, warna O(n)</li>\n        <li><strong>Insert/Delete at given Node</strong> → O(1) agar pointer already pata ho, warna find karne ke liye O(n)</li>\n        <li><strong>Search</strong> → O(n) — index se direct access nahi hota (Array jaisa arr[i] nahi chalega)</li>\n      </ul>"
    },
    {
      "heading": "Insert & Delete Operations",
      "code": "// Insert at head — O(1)\nfunction insertAtHead(head, val):\n    newNode = Node(val)\n    newNode.next = head\n    return newNode                    // naya head\n\n// Insert at tail — O(n) without a tail pointer\nfunction insertAtTail(head, val):\n    newNode = Node(val)\n    if head is null: return newNode\n    curr = head\n    while curr.next is not null:\n        curr = curr.next\n    curr.next = newNode\n    return head\n\n// Delete first node matching val — O(n) to find it\nfunction deleteNode(head, val):\n    if head is null: return null\n    if head.val == val: return head.next     // deleting the head itself\n    curr = head\n    while curr.next and curr.next.val != val:\n        curr = curr.next\n    if curr.next:\n        curr.next = curr.next.next            // skip over the node to delete\n    return head"
    },
    {
      "heading": "Reversing a Linked List (Iterative)",
      "code": "prev = null\ncurr = head\n\nwhile curr is not null:\n    nextNode = curr.next   // agla node yaad rakho, kyunki link todne wale hain\n    curr.next = prev       // link reverse karo\n    prev = curr            // prev ko aage badhao\n    curr = nextNode        // curr ko aage badhao\n\nhead = prev                // naya head, jo pehle tail tha"
    },
    {
      "heading": "Fast & Slow Pointers (Floyd's Technique)",
      "body": "\n      <ul>\n        <li>Dono pointers head se start hote hain — <strong>slow</strong> ek step, <strong>fast</strong> do step aage badhta hai.</li>\n        <li>Agar list me cycle hai, to fast aur slow kabhi na kabhi <strong>same node</strong> pe milenge.</li>\n        <li>Agar cycle nahi hai, to fast pointer <strong>null</strong> pe pahunch jaayega (list khatam).</li>\n        <li>Middle node dhundne ke liye bhi yahi trick: jab fast end pe pahunche, slow exactly middle pe hoga.</li>\n      </ul>",
      "note": "Ye wahi Fast & Slow Pointer idea hai jo Two Pointer Approach (topic 10) me cover kiya tha — bas ab ek linked list pe apply ho raha hai instead of array."
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Array</th><th>Linked List</th></tr>\n        <tr><td>Access by index</td><td>O(1)</td><td>O(n)</td></tr>\n        <tr><td>Search</td><td>O(n)</td><td>O(n)</td></tr>\n        <tr><td>Insert/Delete at start</td><td>O(n)</td><td>O(1)</td></tr>\n        <tr><td>Insert/Delete at end</td><td>O(1)*</td><td>O(1) with tail pointer</td></tr>\n      </table>",
      "note": "*Array ke end me insert amortized O(1) hota hai, lekin beech me insert/delete O(n) hai (shifting lagti hai)."
    },
    {
      "heading": "Use Cases",
      "body": "\n      <ul>\n        <li>Stack/Queue/Deque implement karna without fixed size limit</li>\n        <li><strong>LRU Cache</strong> — Doubly Linked List + HashMap combo (O(1) get/put)</li>\n        <li>Undo functionality, Browser history (doubly linked list ki tarah)</li>\n        <li>Music Playlist (circular linked list — next song, loop back to first)</li>\n        <li>Polynomial representation, Sparse Matrix</li>\n      </ul>",
      "note": "Is repo me LRU Cache ka full implementation dekho: Problems/LinkedList/lruCache.js, aur Doubly Linked List basics: Problems/DoublyLinkedList/."
    }
  ],
  "problems": [
    {
      "title": "Reverse a Linked List",
      "pseudocode": "prev = null\ncurr = head\nwhile curr is not null:\n    nextNode = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nextNode\nreturn prev   // naya head"
    },
    {
      "title": "Detect Cycle in Linked List (Floyd's)",
      "pseudocode": "slow = head\nfast = head\nwhile fast and fast.next:\n    slow = slow.next\n    fast = fast.next.next\n    if slow == fast:\n        return true   // cycle mil gaya\nreturn false"
    },
    {
      "title": "Find Middle of Linked List",
      "pseudocode": "slow = head\nfast = head\nwhile fast and fast.next:\n    slow = slow.next\n    fast = fast.next.next\nreturn slow   // middle node (ya upper-middle agar even length)"
    },
    {
      "title": "Merge Two Sorted Linked Lists",
      "pseudocode": "dummy = Node(0)\ntail = dummy\n\nwhile list1 and list2:\n    if list1.val <= list2.val:\n        tail.next = list1; list1 = list1.next\n    else:\n        tail.next = list2; list2 = list2.next\n    tail = tail.next\n\ntail.next = list1 if list1 else list2\nreturn dummy.next"
    }
  ]
});
