// DSA-Notes/32-top-k.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "top-k",
  "num": 32,
  "emoji": "🏆",
  "title": "Top-K & Kth Largest / Smallest (Heap)",
  "summary": "Top-K pattern: k largest / k smallest / k most frequent / k closest nikalna ho to poora sort (O(n log n)) ki jagah size-k ka heap rakho — O(n log k) time, O(k) space, aur streaming data pe bhi chalta hai. Golden rule: K largest ke liye MIN-heap of size K, K smallest ke liye MAX-heap of size K — heap ka root \"gatekeeper\" hota hai. Distinct top-K aur real ranking systems bhi isi pattern se.",
  "sections": [
    {
      "heading": "Top-K Pattern kab pehchane?",
      "body": "\n      <ul>\n        <li>Keywords: <strong>\"kth largest / smallest\"</strong>, <strong>\"top k\"</strong>, <strong>\"k most frequent\"</strong>, <strong>\"k closest\"</strong>, \"k-th highest score\", data <strong>stream</strong> me baar-baar top k chahiye.</li>\n        <li>Poora sort karna <strong>O(n log n)</strong> hai aur saare n elements memory me chahiye. Size-k heap: <strong>O(n log k)</strong> time, <strong>O(k)</strong> space, aur ek-ek element aate hi process ho jaata hai.</li>\n        <li>k chhota (jaise k = 10, n = 10<sup>6</sup>) ho to heap bahut behtar; k ≈ n ho to sort hi simple hai.</li>\n      </ul>"
    },
    {
      "heading": "Golden Rule: Ulta Heap",
      "body": "\n      <table>\n        <tr><th>Chahiye</th><th>Heap</th><th>Size</th><th>Root kya hota hai?</th></tr>\n        <tr><td><strong>K largest</strong> / Kth largest</td><td><strong>MIN-heap</strong></td><td>k</td><td>K winners me sabse <em>kamzor</em> = Kth largest</td></tr>\n        <tr><td><strong>K smallest</strong> / Kth smallest</td><td><strong>MAX-heap</strong></td><td>k</td><td>K winners me sabse <em>kamzor</em> = Kth smallest</td></tr>\n      </table>",
      "note": "Soch: root ek <strong>gatekeeper / threshold</strong> hai. Naya element aaye to root se compare karo — agar naya element behtar hai to root ko bahar nikalo aur naya andar. Heap size hamesha k rehta hai. Isliye \"largest\" ke liye <em>min</em>-heap: bahar nikalna sabse chhote ko hai."
    },
    {
      "heading": "Kth Largest — Template & Trace",
      "code": "function kthLargest(nums, k):\n    heap = MinHeap()\n    for x in nums:\n        heap.push(x)\n        if heap.size > k:\n            heap.pop()                 // sabse chhota bahar → bache k sabse bade\n    return heap.peek()                 // root = Kth largest\n\n// nums = [3, 2, 1, 5, 6, 4], k = 2\n// 3 → [3]\n// 2 → [2, 3]\n// 1 → [1, 2, 3] → size 3 > 2 → pop 1 → [2, 3]\n// 5 → [2, 3, 5] → pop 2 → [3, 5]\n// 6 → [3, 5, 6] → pop 3 → [5, 6]\n// 4 → [4, 5, 6] → pop 4 → [5, 6]\n// root = 5  → 2nd largest = 5\n\n// Kth SMALLEST: MaxHeap use karo, baaki logic same",
      "note": "Time O(n log k), Space O(k). Heap me push ke baad pop ki jagah, heap full hone par pehle <code>if x > heap.peek()</code> check karke replace karna thoda aur fast hai."
    },
    {
      "heading": "Approaches ka Comparison",
      "body": "\n      <table>\n        <tr><th>Approach</th><th>Time</th><th>Space</th><th>Streaming?</th><th>Kab</th></tr>\n        <tr><td>Sort karke index lo</td><td>O(n log n)</td><td>O(1) ya O(n)</td><td>Nahi</td><td>Simple, chhota n, k ≈ n</td></tr>\n        <tr><td>Min-heap of size k</td><td>O(n log k)</td><td>O(k)</td><td><strong>Haan</strong></td><td>k chhota, stream, input modify nahi karna</td></tr>\n        <tr><td>Max-heap of all n, k baar pop</td><td>O(n + k log n)</td><td>O(n)</td><td>Nahi</td><td>Heapify O(n) hai, k bahut chhota ho</td></tr>\n        <tr><td>Quickselect (topic 34)</td><td>O(n) average, O(n²) worst</td><td>O(1)</td><td>Nahi</td><td>One-shot, array memory me, fastest chahiye</td></tr>\n      </table>"
    },
    {
      "heading": "Distinct Top-K (Duplicates Handle Karna)",
      "body": "\n      <ul>\n        <li><strong>Pehle clarify karo</strong>: \"Kth largest\" me duplicates alag-alag gine jaate hain ya ek hi? Example <code>[5, 5, 4, 4, 3]</code>, k = 2 → duplicates ke saath 2nd largest = <strong>5</strong>; <strong>distinct</strong> me 2nd largest = <strong>4</strong>.</li>\n        <li>Distinct version: heap me push karne se pehle ek <strong>Set</strong> se check karo — pehle se dekha hua value skip.</li>\n        <li>Agar k se kam distinct values hain to problem ke hisaab se handle karo — jaise \"Third Maximum Number\" me jab 3 distinct nahi to <em>maximum</em> return karte hain.</li>\n        <li>Set se popped value hatana optional hai: hatate ho to space O(k) rehta hai (value dobara aayegi to dobara push+pop hogi — result same), nahi hatate to O(distinct).</li>\n      </ul>",
      "code": "function kthLargestDistinct(nums, k):\n    heap = MinHeap(); seen = Set()\n    for x in nums:\n        if x in seen: continue                 // duplicate skip\n        seen.add(x)\n        heap.push(x)\n        if heap.size > k:\n            seen.delete(heap.pop())            // (optional) memory O(k) rakhne ke liye\n    return heap.size == k ? heap.peek() : null // k distinct nahi mile → null / fallback\n\n// [5, 5, 4, 4, 3], k = 2 → 4        [2, 2, 3, 1], k = 3 → 1",
      "note": "Repo me Third Maximum ka solution: Problems/Numbers/thirdMaximumNumber.js."
    },
    {
      "heading": "Top K Frequent Elements",
      "code": "function topKFrequent(nums, k):\n    freq = Map()                                   // value → count\n    for x in nums: freq[x] = freq.get(x, 0) + 1\n\n    heap = MinHeap(by count)                       // (count, value) pairs\n    for (value, count) in freq:\n        heap.push((count, value))\n        if heap.size > k: heap.pop()               // sabse kam frequent bahar\n    return values in heap\n\n// [1, 1, 1, 2, 2, 3], k = 2 → [1, 2]      Time O(n log k)\n\n// Alternative — Bucket Sort, O(n):  bucket[count] = [values with that count]\n// phir bucket ko bade count se chhote ki taraf scan karke k values utha lo",
      "note": "Frequency barabar ho (tie) to problem tie-break rule deta hai (jaise alphabetical order) — comparator me wo rule add karo. Hash Map / Frequency Map ke basics: topic 06–07."
    },
    {
      "heading": "Streaming: Kth Largest in a Stream",
      "code": "class KthLargest:\n    constructor(k, nums):\n        this.k = k\n        this.heap = MinHeap()\n        for x in nums: this.add(x)\n\n    add(val):                                  // O(log k) per call\n        this.heap.push(val)\n        if this.heap.size > this.k:\n            this.heap.pop()\n        return this.heap.peek()                // abhi ka Kth largest\n\n// k = 3, nums = [4, 5, 8, 2]:  add(3) → 4,  add(5) → 5,  add(10) → 5,  add(9) → 8",
      "note": "Yahi wajah hai ki heap interview + production dono me pasand hai: poora data kabhi sort / store nahi karna padta, sirf k elements rakhne hain."
    },
    {
      "heading": "Real Ranking Systems me Heap",
      "body": "\n      <ul>\n        <li><strong>Leaderboards</strong> (top 10 players), <strong>trending</strong> hashtags / products, \"top searches\", recommendation / feed re-ranking, monitoring (\"top-K slowest requests\").</li>\n        <li>Bahut bada data to <strong>shards</strong> me hota hai: har shard apna local top-K heap se nikalta hai, phir coordinator in K × shards ko merge karke final top-K deta hai (wapas heap se).</li>\n        <li>Ranking me aksar <strong>tie-breaker</strong> (score barabar to time / id) aur time-decay hota hai — comparator me wo rule daalo.</li>\n        <li>Memory O(k) per tracker — isliye lakhon users ke stream me bhi chalta hai.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Kth Largest Element in an Array",
      "pseudocode": "function findKthLargest(nums, k):\n    heap = MinHeap()\n    for x in nums:\n        heap.push(x)\n        if heap.size > k: heap.pop()\n    return heap.peek()"
    },
    {
      "title": "Top K Frequent Elements",
      "pseudocode": "function topKFrequent(nums, k):\n    freq = Map()\n    for x in nums: freq[x] = freq.get(x, 0) + 1\n    heap = MinHeap(by count)\n    for (value, count) in freq:\n        heap.push((count, value))\n        if heap.size > k: heap.pop()\n    return [value for (count, value) in heap]"
    },
    {
      "title": "K Closest Points to Origin",
      "pseudocode": "function kClosest(points, k):\n    heap = MaxHeap(by distance)                  // size k; root = abhi tak ka sabse DOOR wala\n    for (x, y) in points:\n        d = x*x + y*y                            // squared distance — sqrt ki zaroorat nahi\n        heap.push((d, [x, y]))\n        if heap.size > k: heap.pop()             // sabse door wala bahar\n    return [point for (d, point) in heap]"
    },
    {
      "title": "Kth Largest Element in a Stream",
      "pseudocode": "class KthLargest:\n    constructor(k, nums):\n        this.k = k; this.heap = MinHeap()\n        for x in nums: this.add(x)\n\n    add(val):\n        this.heap.push(val)\n        if this.heap.size > this.k: this.heap.pop()\n        return this.heap.peek()"
    },
    {
      "title": "Third Maximum Number (Distinct Top-3)",
      "pseudocode": "function thirdMax(nums):\n    heap = MinHeap(); seen = Set()\n    for x in nums:\n        if x in seen: continue\n        seen.add(x)\n        heap.push(x)\n        if heap.size > 3: heap.pop()\n    if heap.size == 3: return heap.peek()        // teesra distinct maximum\n    return max(nums)                             // 3 distinct nahi → maximum"
    }
  ]
});
