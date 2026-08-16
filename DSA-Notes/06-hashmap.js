// DSA-Notes/06-hashmap.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "hashmap",
  "num": 6,
  "emoji": "🗺️",
  "title": "HashMap",
  "summary": "Key-Value pair store karne ka structure, jisme key se value O(1) average time me mil jaati hai (hashing ki wajah se).",
  "sections": [
    {
      "heading": "Kaise Kaam Karta Hai",
      "body": "\n      <ul>\n        <li>Key ko ek <strong>hash function</strong> se hash karke ek index nikalta hai.</li>\n        <li>Us index pe value store ho jaati hai (bucket me).</li>\n        <li>Collision (do keys ka same index) → Chaining ya Open Addressing se handle hota hai.</li>\n      </ul>"
    },
    {
      "heading": "Operations &amp; Complexity",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Average</th><th>Worst Case</th></tr>\n        <tr><td>Insert</td><td>O(1)</td><td>O(n)</td></tr>\n        <tr><td>Search / Get</td><td>O(1)</td><td>O(n)</td></tr>\n        <tr><td>Delete</td><td>O(1)</td><td>O(n)</td></tr>\n      </table>",
      "note": "Worst case tab hota hai jab bahut saari collisions ho jaayein."
    },
    {
      "heading": "Use Cases",
      "body": "<ul><li>Fast Lookup (duplicate/existence check)</li><li>Counting elements</li><li>Caching</li><li>Two Sum type problems (value → index store karke)</li></ul>"
    }
  ],
  "problems": [
    {
      "title": "Two Sum",
      "pseudocode": "map = {}\nfor i, num in enumerate(nums):\n    need = target - num\n    if need in map:\n        return [map[need], i]\n    map[num] = i"
    },
    {
      "title": "Subarray Sum Equals K",
      "pseudocode": "prefixCount = {0: 1}   // prefixSum -> kitni baar dekha\nprefixSum = 0\ncount = 0\nfor num in nums:\n    prefixSum += num\n    count += prefixCount.get(prefixSum - k, 0)\n    prefixCount[prefixSum] = prefixCount.get(prefixSum, 0) + 1\nreturn count"
    }
  ]
});
