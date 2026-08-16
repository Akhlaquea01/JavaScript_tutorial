// DSA-Notes/08-hashset.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "hashset",
  "num": 8,
  "emoji": "🧮",
  "title": "HashSet",
  "summary": "HashMap jaisa hi hai, bas sirf keys store karta hai, koi value nahi. Sirf ye check karne ke liye ki element exist karta hai ya nahi.",
  "sections": [
    {
      "heading": "Operations &amp; Complexity",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Average</th><th>Worst Case</th></tr>\n        <tr><td>Add</td><td>O(1)</td><td>O(n)</td></tr>\n        <tr><td>Contains</td><td>O(1)</td><td>O(n)</td></tr>\n        <tr><td>Remove</td><td>O(1)</td><td>O(n)</td></tr>\n      </table>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Duplicate check (contains-duplicate type)</li>\n        <li>Fast existence check (seen element ya nahi)</li>\n        <li>Longest Consecutive Sequence (set me daal ke O(1) me neighbours check)</li>\n        <li>Unique elements nikalna</li>\n      </ul>",
      "note": "HashMap vs HashSet: HashMap → Key-Value store karta hai (jaise frequency count). HashSet → Sirf Key store karta hai (jaise \"maine ye element dekha hai ya nahi\")."
    }
  ],
  "problems": [
    {
      "title": "Contains Duplicate",
      "pseudocode": "seen = set()\nfor num in nums:\n    if num in seen: return true\n    seen.add(num)\nreturn false"
    },
    {
      "title": "Longest Consecutive Sequence",
      "pseudocode": "numSet = set(nums)\nbest = 0\nfor num in numSet:\n    if num - 1 not in numSet:   // start of a sequence\n        length = 1\n        while num + length in numSet:\n            length += 1\n        best = max(best, length)\nreturn best"
    }
  ]
});
