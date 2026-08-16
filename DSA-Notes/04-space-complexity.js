// DSA-Notes/04-space-complexity.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "space-complexity",
  "num": 4,
  "emoji": "💾",
  "title": "Space Complexity",
  "summary": "Program extra memory kitni use karta hai. Include: Extra Arrays, HashMap, Stack, Recursion. Don't include input array.",
  "sections": [
    {
      "heading": "Examples",
      "code": "Extra Variable    → O(1)\nExtra Array (N)   → O(n)\nRecursive Depth n → O(n)"
    },
    {
      "heading": "Kya Count Hota Hai?",
      "body": "\n      <ul>\n        <li><strong>Count hota hai:</strong> Extra arrays/objects jo function banata hai, HashMap/HashSet, Stack/Queue used, recursion call stack (depth jitni deep, utni O(depth) space).</li>\n        <li><strong>Count NAHI hota:</strong> Input array/string khud — usse \"auxiliary space\" nahi maante jaate.</li>\n        <li><strong>Recursion Trap:</strong> Recursive function bina koi extra array use kiye bhi O(n) space le sakta hai — kyunki call stack me n frames ban jaate hain. Isliye \"no extra space\" claim karne se pehle recursion depth check karo.</li>\n      </ul>"
    }
  ]
});
