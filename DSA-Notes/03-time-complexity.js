// DSA-Notes/03-time-complexity.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "time-complexity",
  "num": 3,
  "emoji": "⏱️",
  "title": "Time Complexity",
  "summary": "Program kitna time lega input size (N) badhne par. Ignore constants &amp; small terms — focus highest order term.",
  "sections": [
    {
      "heading": "Complexity Table",
      "body": "\n      <table>\n        <tr><th>Complexity</th><th>Meaning</th></tr>\n        <tr><td>O(1)</td><td>Constant</td></tr>\n        <tr><td>O(log n)</td><td>Binary Search</td></tr>\n        <tr><td>O(n)</td><td>Single Loop</td></tr>\n        <tr><td>O(n log n)</td><td>Merge/Quick Sort</td></tr>\n        <tr><td>O(n²)</td><td>Nested Loop</td></tr>\n        <tr><td>O(2ⁿ)</td><td>Recursion</td></tr>\n        <tr><td>O(n!)</td><td>Permutations</td></tr>\n      </table>"
    },
    {
      "heading": "Best → Worst",
      "code": "O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2ⁿ) → O(n!)"
    },
    {
      "heading": "How to Calculate",
      "body": "\n      <ul>\n        <li><strong>Drop constants</strong> — O(2n) ya O(n + 100) dono <strong>O(n)</strong> hi hain, sirf highest-growth term matter karta hai.</li>\n        <li><strong>Sequential loops → Add</strong> — do alag loops ek ke baad ek chalein to complexity add hoti hai: O(n) + O(m) = O(n + m).</li>\n        <li><strong>Nested loops → Multiply</strong> — ek loop doosre ke andar ho to complexity multiply hoti hai: O(n) * O(n) = O(n²).</li>\n        <li><strong>Drop lower-order terms</strong> — O(n² + n) me n² hi dominate karega bade n ke liye, isliye sirf O(n²) likhte hain.</li>\n        <li><strong>Recursion</strong> — <em>number of calls × work per call</em> dekho. Recurrence solve karke complexity milti hai (e.g. Merge Sort: T(n) = 2T(n/2) + O(n) → O(n log n)).</li>\n      </ul>"
    }
  ]
});
