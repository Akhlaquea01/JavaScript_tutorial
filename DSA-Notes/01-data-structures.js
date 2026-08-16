// DSA-Notes/01-data-structures.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "data-structures",
  "num": 1,
  "emoji": "🗂️",
  "title": "Data Structures (DS)",
  "summary": "Data ko efficiently store aur organize karne ka tareeka taaki operations fast ho.",
  "sections": [
    {
      "heading": "Linear DS",
      "body": "\n      <ul>\n        <li><strong>Array</strong> — Fixed size, index se access (O(1) access). Contiguous memory me store hota hai. Insert/Delete beech me mehenga hai (shifting lagti hai) → O(n). Best for: fast access, worst for: frequent insert/delete.</li>\n        <li><strong>Linked List</strong> — Nodes connected by pointers (har node me data + next address). Memory contiguous nahi hoti, dynamically size badh/ghat sakta hai. Access O(n), Insert/Delete O(1) (agar pointer pata ho). Types: Singly, Doubly, Circular.</li>\n        <li><strong>Stack</strong> — LIFO (Last In First Out). Operations: push (insert top), pop (remove top), peek/top. Sab operations O(1). Use: Recursion (call stack), Undo, Balanced Parentheses, Backtracking.</li>\n        <li><strong>Queue</strong> — FIFO (First In First Out). Operations: enqueue (insert rear), dequeue (remove front). Sab operations O(1). Types: Simple, Circular, Deque, Priority Queue. Use: Scheduling, BFS, Order processing.</li>\n      </ul>"
    },
    {
      "heading": "Non-Linear DS",
      "body": "\n      <ul>\n        <li><strong>Tree</strong> — Hierarchical structure, ek root node aur uske children. Cycle nahi hoti. Types: Binary Tree, BST, AVL, Heap. Use: File system, searching (BST → O(log n)).</li>\n        <li><strong>Graph</strong> — Nodes (vertices) + Edges se bana, cycle ho sakti hai. Directed/Undirected, Weighted/Unweighted. Representation: Adjacency Matrix, Adjacency List. Use: Networks, Maps, BFS/DFS.</li>\n        <li><strong>Heap</strong> — Complete Binary Tree based. Min-Heap → smallest root pe. Max-Heap → largest root pe. Insert/Delete O(log n), Get Min/Max O(1). Use: Priority Queue, Top-K problems.</li>\n        <li><strong>Trie</strong> — \"Prefix Tree\" for strings. Har node ek character represent karta hai. Insert/Search → O(length of word). Use: Autocomplete, Dictionary, Prefix Search.</li>\n      </ul>"
    },
    {
      "heading": "Common Operations",
      "body": "<ul><li>Insert</li><li>Delete</li><li>Search</li><li>Update</li><li>Traverse</li></ul>",
      "note": "Interview me mostly poocha jata hai kis operation ki complexity kitni hai."
    }
  ]
});
