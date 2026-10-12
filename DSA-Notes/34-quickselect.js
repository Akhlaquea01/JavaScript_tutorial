// DSA-Notes/34-quickselect.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "quickselect",
  "num": 34,
  "emoji": "🎯",
  "title": "Quickselect (Kth Element in O(n))",
  "summary": "Kth smallest / largest nikalne ke liye poora sort chahiye hi nahi — Quickselect QuickSort ke partition ko use karta hai par recursion sirf us ek side me karta hai jahan answer hai. Average time O(n), worst O(n²) (random pivot se avoid), extra space O(1), par array ko modify karta hai aur streaming data pe nahi chalta.",
  "sections": [
    {
      "heading": "Quickselect — Idea",
      "body": "\n      <ul>\n        <li>Kth element ke liye poora sorted order nahi, bas <strong>ek element sahi jagah pe</strong> chahiye.</li>\n        <li><strong>Partition</strong>: ek pivot chuno aur array ko aise baanto ki pivot apni final sorted position pe aa jaaye — chhote elements uske left, bade right (dono side unsorted ho sakte hain).</li>\n        <li>Pivot ka index <code>p</code> mila. Agar <code>p == target</code> → answer mil gaya. <code>p &lt; target</code> → answer right side me; <code>p &gt; target</code> → left side me. <strong>Sirf ek side</strong> pe dobara chalao (QuickSort dono pe chalata hai — isiliye O(n log n) vs O(n)).</li>\n        <li><strong>Target index (0-based, ascending sorted me)</strong> — Kth smallest: <code>k − 1</code>. Kth largest: <code>n − k</code>.</li>\n      </ul>"
    },
    {
      "heading": "Partition (Lomuto Scheme)",
      "code": "function partition(arr, lo, hi):\n    pivot = arr[hi]                    // last element ko pivot maano\n    i = lo                              // i = \"pivot se chhote elements ka boundary\"\n    for j in range(lo, hi):\n        if arr[j] < pivot:\n            swap(arr[i], arr[j])\n            i++\n    swap(arr[i], arr[hi])              // pivot ko uski sahi jagah (i) pe rakho\n    return i                            // pivot ka final index\n\n// Invariant (loop ke dauran):  arr[lo..i-1] < pivot,   arr[i..j-1] >= pivot"
    },
    {
      "heading": "Quickselect — Kth Largest",
      "code": "function quickselect(arr, k):               // k-th LARGEST (1-based)\n    target = arr.length - k                  // ascending sorted me index\n    lo = 0; hi = arr.length - 1\n    while lo <= hi:\n        p = partition(arr, lo, hi)\n        if p == target: return arr[p]\n        else if p < target: lo = p + 1       // answer right side me\n        else:               hi = p - 1       // answer left side me\n\n// Kth SMALLEST: target = k - 1, baaki code same",
      "note": "Iterative loop use kiya hai kyunki sirf ek taraf jaana hai — recursion ki zaroorat nahi, isliye extra space O(1)."
    },
    {
      "heading": "Dry Run",
      "code": "arr = [3, 2, 1, 5, 6, 4],  k = 2  (2nd largest)   →  target = 6 - 2 = 4\n\nRound 1: lo=0, hi=5, pivot = arr[5] = 4\n   partition → [3, 2, 1, 4, 6, 5],  p = 3     (4 apni jagah, index 3)\n   p (3) < target (4)  →  lo = 4\n\nRound 2: lo=4, hi=5, pivot = arr[5] = 5\n   partition → [3, 2, 1, 4, 5, 6],  p = 4\n   p == target  →  return 5     ✓"
    },
    {
      "heading": "Complexity — Average vs Worst",
      "body": "\n      <ul>\n        <li><strong>Average O(n)</strong> — har round me array lagbhag aadha ho jaata hai: n + n/2 + n/4 + … ≈ 2n.</li>\n        <li><strong>Worst O(n²)</strong> — agar pivot hamesha sabse chhota ya sabse bada aaye (jaise already sorted array aur pivot = last element): n + (n−1) + (n−2) + …</li>\n        <li><strong>Fix: random pivot</strong> — partition se pehle <code>swap(arr[random(lo..hi)], arr[hi])</code>. Isse bad input ka asar khatam, expected O(n). (Median-of-three bhi common; <em>median-of-medians</em> worst-case O(n) deta hai par implementation bhaari.)</li>\n        <li><strong>Bahut saare duplicates</strong> — Lomuto degrade kar sakta hai; <em>3-way partition</em> (&lt;, ==, &gt; pivot) use karo (Dutch National Flag).</li>\n        <li>Space: O(1) extra (iterative). Array <strong>in-place reorder</strong> hota hai.</li>\n      </ul>",
      "code": "// Random pivot — partition ke shuru me\nr = random integer in [lo, hi]\nswap(arr[r], arr[hi])\npivot = arr[hi]"
    },
    {
      "heading": "Heap vs Quickselect vs Sort",
      "body": "\n      <table>\n        <tr><th></th><th>Sort</th><th>Min-heap (size k)</th><th>Quickselect</th></tr>\n        <tr><td>Time</td><td>O(n log n)</td><td>O(n log k)</td><td><strong>O(n) avg</strong>, O(n²) worst</td></tr>\n        <tr><td>Space</td><td>O(1) / O(n)</td><td>O(k)</td><td>O(1)</td></tr>\n        <tr><td>Streaming data</td><td>Nahi</td><td><strong>Haan</strong></td><td>Nahi (poora array chahiye)</td></tr>\n        <tr><td>Input modify hota hai?</td><td>Haan (in-place sort) ya copy</td><td>Nahi</td><td>Haan (reorder)</td></tr>\n        <tr><td>Kab</td><td>Simple, chhota n</td><td>Stream, chhota k, input read-only</td><td>One-shot offline, sabse fast chahiye</td></tr>\n      </table>",
      "note": "Bonus: Quickselect khatam hone ke baad <code>arr[target..n−1]</code> me K largest elements hote hain (unsorted order me) — \"K largest elements\" O(n) average me bina sort kiye mil jaate hain."
    }
  ],
  "problems": [
    {
      "title": "Kth Largest Element in an Array (Quickselect)",
      "pseudocode": "function findKthLargest(nums, k):\n    target = nums.length - k\n    lo = 0; hi = nums.length - 1\n    while lo <= hi:\n        r = random in [lo, hi]; swap(nums[r], nums[hi])      // random pivot\n        pivot = nums[hi]; i = lo\n        for j in range(lo, hi):\n            if nums[j] < pivot:\n                swap(nums[i], nums[j]); i++\n        swap(nums[i], nums[hi])\n        if i == target: return nums[i]\n        if i < target:  lo = i + 1\n        else:           hi = i - 1"
    },
    {
      "title": "K Closest Points to Origin (Quickselect on Distance)",
      "pseudocode": "// Partition ko distance (x*x + y*y) ke basis pe karo, target = k\n// Quickselect ke baad points[0..k-1] sabse paas ke k points hote hain (unsorted order me)\nfunction kClosest(points, k):\n    lo = 0; hi = points.length - 1\n    while lo <= hi:\n        p = partitionByDistance(points, lo, hi)\n        if p == k: break\n        else if p < k: lo = p + 1\n        else:          hi = p - 1\n    return points[0..k-1]               // Average O(n)"
    },
    {
      "title": "Sort Colors (3-way Partition / Dutch National Flag)",
      "pseudocode": "function sortColors(nums):               // 0, 1, 2 ko in-place sort karo\n    lo = 0; mid = 0; hi = nums.length - 1\n    while mid <= hi:\n        if nums[mid] == 0:\n            swap(nums[lo], nums[mid]); lo++; mid++\n        else if nums[mid] == 1:\n            mid++\n        else:                             // 2\n            swap(nums[mid], nums[hi]); hi--      // mid yahin rukta hai: swap hua value abhi check nahi hua\n\n// [2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2]      Time O(n), Space O(1)"
    }
  ]
});
