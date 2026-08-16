// DSA-Notes/09-prefix-product.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "prefix-product",
  "num": 9,
  "emoji": "✖️",
  "title": "Prefix Product",
  "summary": "Prefix Sum jaisa hi concept, bas sum ki jagah product store karte hain. Mostly do prefix arrays banaye jaate hain — left product aur right product.",
  "sections": [
    {
      "heading": "Example (Product of Array Except Self)",
      "code": "Array  : [1, 2, 3, 4]\nLeft   : [1, 1, 2,  6]   → left[i] = product of all before i\nRight  : [24,12, 4,  1]  → right[i] = product of all after i\nAnswer : left[i] * right[i] → [24,12, 8, 6]"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Build Left + Right Prefix Product → <strong>O(n)</strong></li><li>Space → <strong>O(n)</strong> (ya <strong>O(1)</strong> agar answer array reuse karein)</li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Product of Array Except Self</li>\n        <li>Division use kiye bina product/sum range nikalna</li>\n        <li>Zero handling: ek zero ho to sirf uss index ka answer non-zero hoga, do zero hone par sab 0.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Product of Array Except Self",
      "pseudocode": "left = [1]*n\nright = [1]*n\nfor i in 1..n-1: left[i] = left[i-1] * nums[i-1]\nfor i in n-2..0: right[i] = right[i+1] * nums[i+1]\nanswer[i] = left[i] * right[i]"
    }
  ]
});
