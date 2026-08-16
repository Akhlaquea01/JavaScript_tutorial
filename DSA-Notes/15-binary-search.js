// DSA-Notes/15-binary-search.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "binary-search",
  "num": 15,
  "emoji": "🎯",
  "title": "Binary Search",
  "summary": "Sorted array pe kaam karta hai. Har step pe search space aadha (half) kar dete hain — middle element check karo, target chhota hai to left half me jao, bada hai to right half me.",
  "sections": [
    {
      "heading": "Steps",
      "code": "left = 0\nright = n - 1\n\nwhile left <= right:\n    mid = left + (right - left) // 2\n    if arr[mid] == target:\n        return mid\n    elif arr[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1\nreturn -1"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Time → <strong>O(log n)</strong> (har step search space aadha hota hai)</li><li>Space → <strong>O(1)</strong> iterative, <strong>O(log n)</strong> recursive (call stack)</li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Sorted array me element dhundna</li>\n        <li>Search in Rotated Sorted Array (modified binary search)</li>\n        <li>Find First/Last Occurrence, Lower Bound / Upper Bound</li>\n        <li>Binary Search on Answer (min/max value dhundna jo condition satisfy kare)</li>\n        <li>Peak Element, Square Root, Koko Eating Bananas type problems</li>\n      </ul>",
      "note": "Golden Rule: Jaha bhi \"sorted\" dikhe ya \"minimize/maximize kuch value jo monotonic condition satisfy kare\" dikhe, wahan Binary Search try karo."
    }
  ],
  "problems": [
    {
      "title": "Search in Rotated Sorted Array",
      "pseudocode": "left, right = 0, n-1\nwhile left <= right:\n    mid = (left+right)//2\n    if arr[mid] == target: return mid\n    if arr[left] <= arr[mid]:        // left half sorted\n        if arr[left] <= target < arr[mid]: right = mid-1\n        else: left = mid+1\n    else:                            // right half sorted\n        if arr[mid] < target <= arr[right]: left = mid+1\n        else: right = mid-1\nreturn -1"
    },
    {
      "title": "Binary Search on Answer (template)",
      "pseudocode": "left, right = minPossible, maxPossible\nanswer = -1\nwhile left <= right:\n    mid = (left+right)//2\n    if isValid(mid):\n        answer = mid\n        right = mid - 1     // ya left = mid+1, direction pe depend karta hai\n    else:\n        left = mid + 1\nreturn answer"
    }
  ]
});
