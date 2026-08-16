// DSA-Notes/11-three-pointer.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "three-pointer",
  "num": 11,
  "emoji": "🤟",
  "title": "Three Pointer Approach",
  "summary": "Two Pointer ka extended version — jab problem me teeno groups/conditions ko ek hi pass me sort ya arrange karna ho, to teen pointers use karte hain.",
  "sections": [
    {
      "heading": "Example: Sort Colors (Dutch National Flag)",
      "code": "low  = 0            // 0's ke liye boundary\nmid  = 0            // traversal pointer\nhigh = n - 1        // 2's ke liye boundary\n\nwhile mid <= high:\n    if arr[mid] == 0:\n        swap(arr[low], arr[mid]); low++; mid++\n    elif arr[mid] == 1:\n        mid++\n    else:  // arr[mid] == 2\n        swap(arr[mid], arr[high]); high--\n        // mid same rehta hai, kyunki swap se aaya element check nahi hua"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Time → <strong>O(n)</strong> (single pass, 3 pointers)</li><li>Space → <strong>O(1)</strong> (in-place)</li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Sort Colors (0,1,2 ko in-place sort karna)</li>\n        <li>3Sum type problems (ek pointer fix + do pointer opposite direction se)</li>\n        <li>Partitioning problems (3 categories me divide karna)</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Sort Colors (Dutch National Flag)",
      "pseudocode": "low, mid, high = 0, 0, n-1\nwhile mid <= high:\n    if arr[mid] == 0: swap(low, mid); low++; mid++\n    elif arr[mid] == 1: mid++\n    else: swap(mid, high); high--"
    },
    {
      "title": "3Sum",
      "pseudocode": "sort(nums)\nfor i in range(n):\n    if i > 0 and nums[i] == nums[i-1]: continue\n    left, right = i+1, n-1\n    while left < right:\n        s = nums[i] + nums[left] + nums[right]\n        if s == 0: record triplet; move both, skip dups\n        elif s < 0: left += 1\n        else: right -= 1"
    }
  ]
});
