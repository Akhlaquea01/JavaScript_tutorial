// DSA-Notes/14-linear-search.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "linear-search",
  "num": 14,
  "emoji": "➡️",
  "title": "Linear Search",
  "summary": "Array ke start se end tak ek-ek element check karke target dhundna.",
  "sections": [
    {
      "heading": "Steps",
      "code": "for i in range(n):\n    if arr[i] == target:\n        return i\nreturn -1"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Time → <strong>O(n)</strong> (worst case: element last me ya absent)</li><li>Space → <strong>O(1)</strong></li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Unsorted array me search</li>\n        <li>Small array (overhead of sorting/binary search worth nahi)</li>\n        <li>Linked List me search (index se direct access nahi hota)</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Find Target in Unsorted Array",
      "pseudocode": "for i in range(n):\n    if arr[i] == target: return i\nreturn -1"
    }
  ]
});
