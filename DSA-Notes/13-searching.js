// DSA-Notes/13-searching.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "searching",
  "num": 13,
  "emoji": "🔎",
  "title": "Searching",
  "summary": "Ek given element (target) ko data structure (mostly array) me dhundna.",
  "sections": [
    {
      "heading": "Types",
      "body": "\n      <ul>\n        <li><strong>Linear Search</strong> → Ek-ek element check karo, unsorted/sorted dono pe chalta hai.</li>\n        <li><strong>Binary Search</strong> → Sorted array pe baar-baar search space aadha karte jao.</li>\n      </ul>",
      "note": "Sorted data ho to Binary Search prefer karo (bahut fast), warna Linear Search hi option hota hai."
    }
  ]
});
