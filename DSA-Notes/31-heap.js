// DSA-Notes/31-heap.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "heap",
  "num": 31,
  "emoji": "⛰️",
  "title": "Heap & Priority Queue",
  "summary": "Heap ek complete binary tree hai (array me store hota hai) jisme parent hamesha apne children se chhota (min-heap) ya bada (max-heap) hota hai — isliye min/max element O(1) me mil jaata hai. Insert aur remove O(log n) me heapify up / heapify down se hote hain. Priority Queue ek abstract concept hai (\"sabse zyada priority wala pehle\") aur heap uska standard implementation; Java me PriorityQueue min-heap hai.",
  "sections": [
    {
      "heading": "Heap kya hai?",
      "body": "\n      <ul>\n        <li><strong>Complete binary tree</strong> (last level ke alawa sab levels bhare, last level left se bhara) + <strong>heap-order property</strong>.</li>\n        <li><strong>Min-Heap</strong> — har parent ≤ uske children; root = minimum. <strong>Max-Heap</strong> — har parent ≥ children; root = maximum.</li>\n        <li><strong>Heap sorted nahi hota</strong> — siblings (left vs right) ka koi order nahi; guarantee sirf parent–child ki hai. Isliye sirf root (min/max) O(1) me milta hai; koi bhi arbitrary value dhundhna O(n).</li>\n        <li><strong>Priority Queue</strong> = ADT (interface): insert with priority, sabse high-priority element nikalo. <strong>Heap</strong> = uska common implementation (ek aur: sorted array / balanced BST, par heap sabse efficient). PQ ≠ normal FIFO queue.</li>\n      </ul>"
    },
    {
      "heading": "Array me Storage (Index Math)",
      "code": "Min-heap array : [1, 3, 2, 5, 9, 8]      (index 0..5)\n\n            1 (0)\n          /       \\\n       3 (1)       2 (2)\n      /    \\       /\n   5 (3)  9 (4)  8 (5)\n\n0-based index formulas:\n   left(i)   = 2*i + 1\n   right(i)  = 2*i + 2\n   parent(i) = floor((i - 1) / 2)\n\n1-based:  left = 2i,  right = 2i + 1,  parent = floor(i / 2)",
      "note": "Complete tree me beech me gap nahi hota, isliye pointers ki jagah ek simple array kaafi hai — cache-friendly aur compact. Repo implementation: Problems/Tree/heap.js (min / max dono, getLeftChildIndex etc.)."
    },
    {
      "heading": "Insert — Heapify Up (Sift Up)",
      "body": "\n      <ul>\n        <li>Naya element array ke <strong>end</strong> me daalo (complete-tree shape bani rahe).</li>\n        <li>Phir usse parent se compare karo: agar heap-order toot raha ho (min-heap me child &lt; parent) to <strong>swap</strong> karo, aur upar badhte raho jab tak order theek na ho ya root na aa jaaye.</li>\n        <li>Time <strong>O(log n)</strong> (max tree ki height tak upar).</li>\n      </ul>",
      "code": "function push(x):\n    heap.append(x)\n    i = heap.length - 1\n    while i > 0:\n        p = floor((i - 1) / 2)\n        if heap[p] <= heap[i]: break              // min-heap: order theek\n        swap(heap[p], heap[i])\n        i = p\n\n// Min-heap me 5, 3, 8, 1, 9, 2 ek-ek karke insert:\n// 5          → [5]\n// 3          → [5, 3]     → 3 < 5 swap     → [3, 5]\n// 8          → [3, 5, 8]\n// 1          → [3, 5, 8, 1] → 1 < 5 swap → [3, 1, 8, 5] → 1 < 3 swap → [1, 3, 8, 5]\n// 9          → [1, 3, 8, 5, 9]\n// 2          → [1, 3, 8, 5, 9, 2] → 2 < 8 swap → [1, 3, 2, 5, 9, 8]"
    },
    {
      "heading": "Extract Min/Max — Heapify Down (Sift Down)",
      "body": "\n      <ul>\n        <li>Root hi answer hai. Usko nikalne par khali jagah bharne ke liye <strong>aakhri element ko root pe le aao</strong> (array ka size 1 kam).</li>\n        <li>Ab root se neeche ki taraf: dono children me se <strong>chhota (min-heap) / bada (max-heap)</strong> child chuno; agar wo current se chhota hai to swap karo; tab tak jab tak order theek na ho ya leaf na aa jaaye.</li>\n        <li>Time <strong>O(log n)</strong>.</li>\n      </ul>",
      "code": "function pop():\n    top = heap[0]\n    last = heap.removeLast()\n    if heap is not empty:\n        heap[0] = last\n        siftDown(0)\n    return top\n\nfunction siftDown(i):\n    n = heap.length\n    while true:\n        l = 2*i + 1; r = 2*i + 2; smallest = i\n        if l < n and heap[l] < heap[smallest]: smallest = l\n        if r < n and heap[r] < heap[smallest]: smallest = r\n        if smallest == i: break\n        swap(heap[i], heap[smallest])\n        i = smallest\n\n// [1, 3, 2, 5, 9, 8] me pop():\n// top = 1,  last = 8 → root pe: [8, 3, 2, 5, 9]\n// children 3, 2 → chhota 2 < 8 → swap → [2, 3, 8, 5, 9]  (8 ke aage ab koi child nahi)"
    },
    {
      "heading": "Build Heap — O(n), n Inserts ka O(n log n) nahi",
      "body": "\n      <ul>\n        <li>Agar array pehle se hai to har element ko ek-ek karke push karna <strong>O(n log n)</strong> hai. Behtar: array ko hi heap bana do — <strong>aakhri non-leaf node se root tak sift-down</strong> chalao.</li>\n        <li>Aakhri non-leaf index = <code>floor(n / 2) − 1</code> (uske baad ke saare nodes leaves hain, wo already valid heaps hain).</li>\n        <li>Total <strong>O(n)</strong> — kyunki zyada-tar nodes neeche hain jinki height chhoti hai (sum of n/2<sup>h+1</sup> × h converge karta hai). Java <code>new PriorityQueue&lt;&gt;(collection)</code> yahi (heapify) use karta hai.</li>\n      </ul>",
      "code": "function buildHeap(arr):\n    n = arr.length\n    for i from floor(n / 2) - 1 down to 0:\n        siftDown(arr, i, n)\n\n// [4, 10, 3, 5, 1]  (min-heap banana hai)\n// i = 1 (10): children 5, 1 → 1 sabse chhota → swap → [4, 1, 3, 5, 10]\n// i = 0 (4) : children 1, 3 → 1 < 4 → swap → [1, 4, 3, 5, 10]; 4 ke children 5, 10 → theek\n// Result: [1, 4, 3, 5, 10]"
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Time</th></tr>\n        <tr><td>peek (min / max dekhna)</td><td>O(1)</td></tr>\n        <tr><td>insert / push</td><td>O(log n)</td></tr>\n        <tr><td>extract-min / extract-max (pop)</td><td>O(log n)</td></tr>\n        <tr><td>Build heap from array</td><td>O(n)</td></tr>\n        <tr><td>Heap sort (build + n pops)</td><td>O(n log n), in-place O(1) extra space, stable nahi</td></tr>\n        <tr><td>Search arbitrary value</td><td>O(n)</td></tr>\n        <tr><td>Delete arbitrary value</td><td>O(n) dhundhne me + O(log n) fix (index pata ho to sirf O(log n))</td></tr>\n        <tr><td>Space</td><td>O(n)</td></tr>\n      </table>"
    },
    {
      "heading": "Min-Heap vs Max-Heap — Kab Kaunsa",
      "body": "\n      <ul>\n        <li>Baar-baar <strong>sabse chhota</strong> chahiye (next task, shortest distance, smallest end-time) → <strong>Min-Heap</strong>.</li>\n        <li>Baar-baar <strong>sabse bada</strong> chahiye → <strong>Max-Heap</strong>.</li>\n        <li><strong>K largest / Kth largest</strong> ke liye <em>min-heap of size K</em> (ulta!) aur <strong>K smallest</strong> ke liye <em>max-heap of size K</em> — detail Top-K (topic 32) me.</li>\n        <li>JavaScript me built-in heap nahi hai: ya to apni Heap class (Problems/Tree/heap.js), ya max-heap ke liye min-heap me values ko negate (−x) karke daalo.</li>\n      </ul>"
    },
    {
      "heading": "Java PriorityQueue Mapping",
      "code": "// Java — PriorityQueue = binary MIN-HEAP (default)\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.add(5);  minHeap.offer(3);     // insert → O(log n)   (heapify up)\nminHeap.peek();                        // root dekho → O(1)    → 3\nminHeap.poll();                        // root nikalo → O(log n) (heapify down)\nminHeap.size();  minHeap.isEmpty();\n\n// MAX-HEAP: comparator ulta karo\nPriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n// ya: new PriorityQueue<>((a, b) -> Integer.compare(b, a));   // (b - a) overflow kar sakta hai\n\n// Pairs / objects → comparator se field choose karo\nPriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));\npq.offer(new int[]{ node, distance });         // distance (index 1) ke hisaab se min-heap\n\n// Collection se banao → O(n) heapify\nPriorityQueue<Integer> pq2 = new PriorityQueue<>(list);",
      "body": "\n      <table>\n        <tr><th>Concept</th><th>Java PriorityQueue</th><th>Heap operation</th></tr>\n        <tr><td><code>add(x)</code> / <code>offer(x)</code></td><td>Insert</td><td>Heapify up — O(log n)</td></tr>\n        <tr><td><code>peek()</code></td><td>Root dekhna</td><td>O(1)</td></tr>\n        <tr><td><code>poll()</code> / <code>remove()</code></td><td>Root nikalna</td><td>Swap with last + heapify down — O(log n)</td></tr>\n        <tr><td><code>remove(Object)</code></td><td>Kisi bhi element ko hataana</td><td>O(n) (pehle dhundhna padta hai)</td></tr>\n        <tr><td><code>size()</code>, <code>isEmpty()</code></td><td>Count</td><td>O(1)</td></tr>\n      </table>",
      "note": "Dhyan: PriorityQueue ko print / iterate karoge to internal <strong>array order</strong> milega, sorted nahi — sorted chahiye to baar-baar poll karo. Python me <code>heapq</code> bhi min-heap hota hai (max ke liye negate)."
    },
    {
      "heading": "Heap Use Cases",
      "body": "\n      <ul>\n        <li><strong>Priority Queue</strong> — OS / task scheduling, event simulation, \"next highest priority job\".</li>\n        <li><strong>Top-K / Kth largest-smallest</strong> (topic 32), <strong>Running Median</strong> — two heaps (topic 33).</li>\n        <li><strong>Merge K sorted lists / arrays</strong> — har list ka current head heap me.</li>\n        <li><strong>Graph algorithms</strong> — Dijkstra (min-heap by distance), Prim's MST, A*.</li>\n        <li><strong>Huffman coding</strong>, <strong>Heap Sort</strong>, ranking / leaderboard systems, meeting rooms (earliest end-time — topic 36).</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Implement a Min-Heap",
      "pseudocode": "class MinHeap:\n    constructor(): this.a = []\n\n    peek(): return this.a[0]\n\n    push(x):\n        a = this.a; a.push(x)\n        i = a.length - 1\n        while i > 0:\n            p = floor((i - 1) / 2)\n            if a[p] <= a[i]: break\n            swap(a[p], a[i]); i = p\n\n    pop():\n        a = this.a; top = a[0]; last = a.pop()\n        if a is not empty:\n            a[0] = last\n            i = 0\n            while true:\n                l = 2*i + 1; r = 2*i + 2; m = i\n                if l < a.length and a[l] < a[m]: m = l\n                if r < a.length and a[r] < a[m]: m = r\n                if m == i: break\n                swap(a[i], a[m]); i = m\n        return top"
    },
    {
      "title": "Heap Sort (In-place)",
      "pseudocode": "function heapSort(arr):\n    n = arr.length\n    for i from floor(n / 2) - 1 down to 0:     // 1. MAX-heap banao — O(n)\n        siftDownMax(arr, i, n)\n    for end from n - 1 down to 1:               // 2. max ko aakhir me bhejo — O(n log n)\n        swap(arr[0], arr[end])\n        siftDownMax(arr, 0, end)                // heap ka size ab 'end'\n    return arr                                  // ascending sorted\n\n// siftDownMax = siftDown jisme bada child chuna jaata hai"
    },
    {
      "title": "Merge K Sorted Linked Lists",
      "pseudocode": "function mergeKLists(lists):\n    heap = MinHeap(by node.val)\n    for head in lists:\n        if head is not null: heap.push(head)       // har list ka pehla node\n\n    dummy = Node(0); tail = dummy\n    while heap not empty:\n        node = heap.pop()                          // abhi ke sabse chhote nodes me se min\n        tail.next = node; tail = node\n        if node.next is not null:\n            heap.push(node.next)                   // usi list ka agla node\n    return dummy.next\n\n// Time O(N log k)  (N = total nodes, k = lists)   Space O(k)\n// Do lists ka merge: Linked List (topic 18)"
    },
    {
      "title": "Last Stone Weight (Max-Heap)",
      "pseudocode": "function lastStoneWeight(stones):\n    heap = MaxHeap(stones)\n    while heap.size > 1:\n        a = heap.pop()                 // sabse bhaari\n        b = heap.pop()                 // doosra sabse bhaari\n        if a != b: heap.push(a - b)    // bacha hua tukda wapas\n    return 0 if heap is empty else heap.peek()\n\n// [2, 7, 4, 1, 8, 1] → 1"
    }
  ]
});
