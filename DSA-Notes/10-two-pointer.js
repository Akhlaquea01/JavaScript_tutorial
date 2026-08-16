// DSA-Notes/10-two-pointer.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "two-pointer",
  "num": 10,
  "emoji": "👉",
  "title": "Two Pointer Approach",
  "summary": "Do pointers (index) use karke array/string traverse karna, taaki nested loop O(n²) ki jagah single pass O(n) me solution mil jaaye.",
  "sections": [
    {
      "heading": "Types",
      "body": "\n      <ul>\n        <li><strong>Opposite Direction (Converging)</strong> — Ek pointer start (left=0) se, ek end (right=n-1) se shuru hota hai, dono ek doosre ki taraf move karte hain jab tak left &lt; right. Use: Valid Palindrome, Two Sum II, Reverse Array/String.</li>\n        <li><strong>Same Direction (Fast &amp; Slow)</strong> — Dono pointers start se chalte hain, alag speed/condition se aage badhte hain. Use: Remove Duplicates, Linked List Cycle Detection, Sliding Window ka base bhi yahi hai.</li>\n      </ul>"
    },
    {
      "heading": "General Steps",
      "code": "left = 0\nright = n - 1\n\nwhile left < right:\n    check condition using arr[left], arr[right]\n    move left++ or right-- (or both) based on condition"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Time → <strong>O(n)</strong> (single pass)</li><li>Space → <strong>O(1)</strong></li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Valid Palindrome (skip non-alphanumeric, compare from both ends)</li>\n        <li>Two Sum II - Input Array Is Sorted</li>\n        <li>Trapping Rain Water (leftMax, rightMax track karte hain)</li>\n        <li>Reverse String, Container With Most Water</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Two Sum II - Input Array Is Sorted",
      "pseudocode": "left, right = 0, n-1\nwhile left < right:\n    s = arr[left] + arr[right]\n    if s == target: return [left+1, right+1]\n    elif s < target: left += 1\n    else: right -= 1"
    },
    {
      "title": "Valid Palindrome",
      "pseudocode": "left, right = 0, n-1\nwhile left < right:\n    skip non-alphanumeric from left and right\n    if lower(s[left]) != lower(s[right]): return false\n    left += 1; right -= 1\nreturn true"
    }
  ]
});
