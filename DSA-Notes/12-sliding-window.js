// DSA-Notes/12-sliding-window.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "sliding-window",
  "num": 12,
  "emoji": "🪟",
  "title": "Sliding Window",
  "summary": "Ek \"window\" (subarray/substring range) ko array/string ke upar slide karte hain, taaki har baar naye sirey se sum/count calculate na karna pade — purana element nikaalo, naya element daalo.",
  "sections": [
    {
      "heading": "Types",
      "body": "\n      <ul>\n        <li><strong>Fixed Size Window</strong> — Window size (k) fixed rehta hai. Pehle k elements se window banao, fir ek-ek karke slide karo (right++ aur left++ saath). Use: Max Sum Subarray of size K.</li>\n        <li><strong>Variable Size Window</strong> — Window size condition ke hisaab se badhti-ghatti hai. right pointer se window badhao, jab condition break ho to left pointer se window chhoti karo. Use: Longest Substring Without Repeating Characters, Smallest Subarray with Sum &gt;= Target.</li>\n      </ul>"
    },
    {
      "heading": "General Steps (Fixed Window)",
      "code": "windowSum = sum(arr[0..k-1])   // pehla window banao\n\nbest = windowSum\nfor right in range(k, n):\n    windowSum += arr[right] - arr[right-k]   // ek naya element andar, ek purana bahar\n    best = max(best, windowSum)"
    },
    {
      "heading": "General Steps (Variable Window)",
      "code": "left = 0\nfor right in range(n):\n    add arr[right] to window\n    while window condition invalid:\n        remove arr[left] from window\n        left++\n    update answer using current window"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Time → <strong>O(n)</strong> (har element max 2 baar visit hota hai)</li><li>Space → <strong>O(1)</strong> ya <strong>O(k)</strong> (agar HashMap/HashSet use ho)</li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Maximum Sum Subarray of size K</li>\n        <li>Longest Substring Without Repeating Characters</li>\n        <li>Minimum Size Subarray Sum</li>\n        <li>Longest Substring with K Distinct Characters</li>\n        <li>Sliding Window + Frequency Map combo (anagram/permutation in string)</li>\n      </ul>",
      "note": "Two Pointer vs Sliding Window: Sliding Window ek tarah ka Two Pointer hi hai, bas \"window\" (continuous range) maintain karta hai jisme kuch condition (sum, count, distinct chars) track hoti hai."
    }
  ],
  "problems": [
    {
      "title": "Maximum Sum Subarray of Size K",
      "pseudocode": "windowSum = sum(arr[0..k-1])\nbest = windowSum\nfor i in range(k, n):\n    windowSum += arr[i] - arr[i-k]\n    best = max(best, windowSum)\nreturn best"
    },
    {
      "title": "Longest Substring Without Repeating Characters",
      "pseudocode": "left = 0\nseen = set()\nbest = 0\nfor right in range(n):\n    while s[right] in seen:\n        seen.remove(s[left]); left++\n    seen.add(s[right])\n    best = max(best, right - left + 1)"
    }
  ]
});
