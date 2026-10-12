// DSA-Notes/33-two-heaps-median.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "two-heaps-median",
  "num": 33,
  "emoji": "⚖️",
  "title": "Two Heaps — Running Median",
  "summary": "Two Heaps pattern data ko do aadhe hisson me baant deta hai: chhoti aadhi values ek MAX-heap (lo) me aur badi aadhi values ek MIN-heap (hi) me. Dono heaps ke roots beech ki values hote hain, isliye stream me median O(1) me milta hai aur har naye number ka add O(log n) me. Invariant: dono sizes barabar ya lo me ek zyada.",
  "sections": [
    {
      "heading": "Problem: Running Median",
      "body": "\n      <ul>\n        <li><strong>Median</strong> = sorted list ka beech wala element (odd count); even count me do beech wale elements ka average.</li>\n        <li>Stream me numbers ek-ek karke aate hain aur <strong>har step pe median</strong> chahiye.</li>\n        <li>Naive: har baar sort → O(n log n) per step; ya sorted array me insert → O(n) per step. Dono slow.</li>\n        <li><strong>Two Heaps</strong>: add O(log n), median O(1).</li>\n      </ul>"
    },
    {
      "heading": "Two Heaps Idea",
      "code": " lo = MAX-heap  (chhoti aadhi values)        hi = MIN-heap  (badi aadhi values)\n\n     [ ... 1, 3 ]            |            [ 5, 15 ... ]\n          └ top = 3 (lo ka max)             └ top = 5 (hi ka min)\n\n Dono tops sorted order ke BEECH me baithe hain:\n   sizes barabar  → median = (lo.top + hi.top) / 2      →  (3 + 5) / 2 = 4\n   lo me ek zyada → median = lo.top",
      "body": "\n      <ul>\n        <li><strong>Invariant 1 (order)</strong> — lo ka har element ≤ hi ka har element.</li>\n        <li><strong>Invariant 2 (size)</strong> — <code>size(lo) == size(hi)</code> ya <code>size(lo) == size(hi) + 1</code> (odd count me extra element lo me, to median = lo.top).</li>\n        <li>Max-heap me root = lo ka sabse bada, Min-heap me root = hi ka sabse chhota — yaani sorted list ke bilkul beech wale do elements.</li>\n      </ul>"
    },
    {
      "heading": "Add Number — Steps",
      "code": "class MedianFinder:\n    constructor():\n        this.lo = MaxHeap()          // chhoti aadhi\n        this.hi = MinHeap()          // badi aadhi\n\n    addNum(x):\n        this.lo.push(x)                          // 1. pehle lo me daalo\n        this.hi.push(this.lo.pop())              // 2. lo ka max hi me bhej do (order sahi rakhne ke liye)\n        if this.hi.size > this.lo.size:          // 3. size balance: lo kabhi hi se chhota na ho\n            this.lo.push(this.hi.pop())\n\n    findMedian():\n        if this.lo.size > this.hi.size: return this.lo.peek()\n        return (this.lo.peek() + this.hi.peek()) / 2",
      "note": "Step 1–2 ka matlab: x chahe jahan ka ho, pehle lo se hokar guzarta hai, to order invariant automatically bana rehta hai. Step 3 sirf size balance karta hai. Sab heap operations constant baar → add O(log n)."
    },
    {
      "heading": "Dry Run: 5, 15, 1, 3",
      "body": "\n      <table>\n        <tr><th>Add</th><th>lo (max-heap)</th><th>hi (min-heap)</th><th>Median</th></tr>\n        <tr><td>5</td><td>[5]</td><td>[ ]</td><td>5</td></tr>\n        <tr><td>15</td><td>[5]</td><td>[15]</td><td>(5 + 15) / 2 = 10</td></tr>\n        <tr><td>1</td><td>[5, 1]</td><td>[15]</td><td>5</td></tr>\n        <tr><td>3</td><td>[3, 1]</td><td>[5, 15]</td><td>(3 + 5) / 2 = 4</td></tr>\n      </table>",
      "note": "Add 1 par: lo=[5,1] hi=[15] — lo me ek zyada hai, median = lo.top = 5. Add 3 par: 3 → lo me → lo ka max 5 hi me gaya → hi=[5,15], lo=[3,1] → sizes barabar."
    },
    {
      "heading": "Complexity",
      "body": "\n      <ul>\n        <li><code>addNum</code> — <strong>O(log n)</strong> (constant number of heap push/pop).</li>\n        <li><code>findMedian</code> — <strong>O(1)</strong> (sirf tops dekhne hain).</li>\n        <li>Space — <strong>O(n)</strong> (saare numbers heaps me).</li>\n      </ul>"
    },
    {
      "heading": "Edge Cases & Variants",
      "body": "\n      <ul>\n        <li>Duplicates aur negative numbers bina kisi change ke chalte hain.</li>\n        <li>Median ka even case float deta hai — (a + b) / 2; integer language me overflow / rounding ka dhyan rakho.</li>\n        <li>Agar values ek chhoti fixed range (jaise 0–100) me hain to <strong>counting array</strong> se bhi median nikal sakte ho.</li>\n        <li><strong>Sliding Window Median</strong> — window se purana element hatana padta hai; heap se arbitrary delete costly hai. Solution: <em>lazy deletion</em> (hash map me \"hatana hai\" mark, jab wo top pe aaye tab pop) ya multiset / TreeMap. Advanced.</li>\n        <li>Do heaps ka pattern median ke alawa \"do halves ko alag treat karna\" wale problems me bhi aata hai (IPO / Maximize Capital, Find Median, scheduling).</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Find Median from Data Stream",
      "pseudocode": "class MedianFinder:\n    constructor():\n        this.lo = MaxHeap()                  // chhoti aadhi\n        this.hi = MinHeap()                  // badi aadhi\n\n    addNum(x):\n        this.lo.push(x)\n        this.hi.push(this.lo.pop())\n        if this.hi.size > this.lo.size:\n            this.lo.push(this.hi.pop())\n\n    findMedian():\n        if this.lo.size > this.hi.size: return this.lo.peek()\n        return (this.lo.peek() + this.hi.peek()) / 2\n\n// stream 5, 15, 1, 3 → medians 5, 10, 5, 4"
    },
    {
      "title": "IPO / Maximize Capital (Two Heaps)",
      "pseudocode": "function findMaximizedCapital(k, w, profits, capital):\n    projects = sort pairs (capital[i], profits[i]) by capital      // sasta pehle\n    affordable = MaxHeap()                       // abhi afford hone wale projects ka profit\n    i = 0\n    for round in range(k):\n        while i < projects.length and projects[i].capital <= w:\n            affordable.push(projects[i].profit)  // jo ab afford ho gaye unko heap me lao\n            i++\n        if affordable is empty: break            // koi project afford nahi\n        w += affordable.pop()                    // sabse zyada profit wala le lo\n    return w\n\n// k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1] → 4"
    }
  ]
});
