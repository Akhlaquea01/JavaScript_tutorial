// DSA-Notes/05-prefix-sum.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "prefix-sum",
  "num": 5,
  "emoji": "➕",
  "title": "Prefix Sum",
  "summary": "Running Sum store karna taaki range sum instantly nikal sake.",
  "sections": [
    {
      "heading": "Example",
      "code": "Array  : [2,4,6,8]\nPrefix : [2,6,12,20]"
    },
    {
      "heading": "Formula",
      "code": "prefix[i] = prefix[i-1] + arr[i]"
    },
    {
      "heading": "Range Sum",
      "code": "Sum(L,R) = prefix[R] - prefix[L-1]\n\nIf L == 0:\n    Answer = prefix[R]"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Build Prefix Array → <strong>O(n)</strong></li><li>Each Query → <strong>O(1)</strong></li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul><li>Range Sum Queries</li><li>Subarray Problems</li><li>Equal Sum Problems</li><li>2D Prefix Sum</li></ul>"
    }
  ],
  "problems": [
    {
      "title": "Range Sum Query - Immutable",
      "pseudocode": "build prefix[] where prefix[i] = prefix[i-1] + nums[i]\n\nfunction sumRange(L, R):\n    if L == 0: return prefix[R]\n    return prefix[R] - prefix[L-1]"
    },
    {
      "title": "Find Pivot Index",
      "pseudocode": "total = sum(nums)\nleftSum = 0\nfor i in range(n):\n    rightSum = total - leftSum - nums[i]\n    if leftSum == rightSum:\n        return i\n    leftSum += nums[i]\nreturn -1"
    }
  ]
});
