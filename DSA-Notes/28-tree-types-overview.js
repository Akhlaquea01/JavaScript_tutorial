// DSA-Notes/28-tree-types-overview.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-types-overview",
  "num": 28,
  "emoji": "🗂️",
  "title": "Tree Family — Kaunsa Tree Kab?",
  "summary": "Alag-alag tree structures alag problems solve karte hain: Binary Tree (hierarchy + recursion practice), BST (ordered search), Heap (min/max fast, priority queue), Trie (prefix lookup), AVL / Red-Black (guaranteed balance), B-Tree / B+ Tree (databases aur disk), Fenwick Tree (prefix sums with updates). Interview prep me kis par kitna focus karna hai, wo bhi yahan.",
  "sections": [
    {
      "heading": "Ek Nazar me — Tree Family",
      "body": "\n      <table>\n        <tr><th>Structure</th><th>Ordering rule</th><th>Best at</th><th>Key operation cost</th><th>Interview priority</th></tr>\n        <tr><td><strong>Binary Tree</strong></td><td>Koi order nahi (bas max 2 children)</td><td>Hierarchy, traversal + recursion practice</td><td>Search O(n)</td><td>High</td></tr>\n        <tr><td><strong>BST</strong></td><td>left &lt; node &lt; right (poore subtrees)</td><td>Ordered data me search / insert / delete, range queries</td><td>O(h) — balanced O(log n)</td><td>High</td></tr>\n        <tr><td><strong>AVL / Red-Black</strong></td><td>BST + height balance maintained</td><td>Guaranteed O(log n) worst case</td><td>O(log n) always</td><td>Concept</td></tr>\n        <tr><td><strong>Heap</strong></td><td>Parent &lt;= children (min) / &gt;= (max); complete tree</td><td>Min/max fast, priority queue, Top-K</td><td>peek O(1); push/pop O(log n)</td><td>High</td></tr>\n        <tr><td><strong>Trie</strong></td><td>Root → node path = prefix</td><td>Prefix search, autocomplete, dictionary</td><td>O(L), L = word length</td><td>Medium</td></tr>\n        <tr><td><strong>B-Tree / B+ Tree</strong></td><td>Multi-way sorted tree, saare leaves ek level pe</td><td>Database indexes, file systems (disk)</td><td>O(log<sub>m</sub> n) disk reads</td><td>Concept</td></tr>\n        <tr><td><strong>Fenwick Tree (BIT)</strong></td><td>Array-based; har index kuch range ka sum rakhta hai</td><td>Prefix sums + point updates</td><td>O(log n) dono</td><td>Low / Concept</td></tr>\n        <tr><td><strong>Segment Tree</strong></td><td>Har node ek range ka summary (sum/min/max)</td><td>Range query + range update</td><td>O(log n)</td><td>Low / Concept</td></tr>\n      </table>"
    },
    {
      "heading": "Binary Tree vs BST vs Heap (Confusion Clear Karo)",
      "body": "\n      <table>\n        <tr><th>Property</th><th>Binary Tree</th><th>BST</th><th>Heap</th></tr>\n        <tr><td>Ordering</td><td>Koi nahi</td><td>left subtree &lt; node &lt; right subtree</td><td>Sirf parent vs children (siblings ka order nahi)</td></tr>\n        <tr><td>Shape</td><td>Koi bhi</td><td>Koi bhi (skewed ho sakta hai)</td><td>Hamesha <strong>complete</strong> tree</td></tr>\n        <tr><td>Search kisi value ka</td><td>O(n)</td><td>O(h)</td><td>O(n)</td></tr>\n        <tr><td>Min / Max</td><td>O(n)</td><td>O(h) — leftmost / rightmost</td><td>O(1) — root (min-heap me min)</td></tr>\n        <tr><td>Sorted output</td><td>Nahi</td><td>In-order traversal, O(n)</td><td>Heap sort, O(n log n)</td></tr>\n        <tr><td>Storage</td><td>Pointers</td><td>Pointers</td><td>Array (index math)</td></tr>\n        <tr><td>Typical use</td><td>Hierarchy, recursion practice</td><td>TreeMap / TreeSet, ordered lookup</td><td>Priority queue, Top-K, scheduling</td></tr>\n      </table>",
      "note": "Sabse common galti: heap ko \"sorted tree\" samajhna. Heap me sirf root (min/max) guaranteed hai — poora array sorted nahi hota."
    },
    {
      "heading": "Self-Balancing BST: AVL & Red-Black (Brief)",
      "body": "\n      <ul>\n        <li>Plain BST ko sorted data dene par wo skewed (linked list jaisa) ho jaata hai aur O(n) pe aa jaata hai — topic 29 me detail.</li>\n        <li><strong>AVL Tree</strong> — har node pe balance factor <code>height(left) − height(right)</code> hamesha −1, 0 ya +1. Insert/delete ke baad <strong>rotations</strong> (left / right / left-right / right-left) se balance wapas laate hain. Lookup fast, par updates me rotations zyada.</li>\n        <li><strong>Red-Black Tree</strong> — nodes ko red/black rang dete hain aur kuch rules (root black, red ke children black, har path me black nodes barabar). Balance thoda loose, par insert/delete me kam rotations. Java <code>TreeMap / TreeSet</code> aur C++ <code>std::map / set</code> iske upar bane hain.</li>\n        <li>Dono me search / insert / delete <strong>O(log n) guaranteed</strong>.</li>\n      </ul>",
      "note": "Implementations repo me hain: Problems/Tree/avlTree.js aur Problems/Tree/redBlackTree.js. Interview me aksar sirf concept (kyun chahiye, rotation ka idea, complexity) puchha jaata hai."
    },
    {
      "heading": "B-Tree / B+ Tree (Brief)",
      "body": "\n      <ul>\n        <li><strong>Problem</strong> — Disk / SSD se ek block padhna RAM ke muqable bahut slow hai. BST me har node pe sirf 1 key hoti hai, isliye tree lamba (tall) hota hai aur bahut saari disk reads lagti hain.</li>\n        <li><strong>Solution</strong> — har node me bahut saari keys (kai sau) aur utne hi children rakho. Tree bahut <em>chhota (short)</em> ho jaata hai — crore records bhi 3–4 levels me. Ek node = ek disk block.</li>\n        <li><strong>B-Tree</strong> — multi-way balanced search tree; saare leaves ek hi level pe; har node sorted keys rakhta hai.</li>\n        <li><strong>B+ Tree</strong> — actual data / record pointers <em>sirf leaves</em> me; internal nodes sirf routing keys. Leaves aapas me linked list se jude hote hain, isliye <strong>range scan</strong> (<code>BETWEEN</code>, <code>ORDER BY</code>) bahut fast hota hai.</li>\n        <li>Zyada-tar relational databases ke default indexes isi B-Tree / B+ Tree family ke hote hain — \"DB index kaise kaam karta hai\" system-design interview ka common sawaal hai.</li>\n      </ul>",
      "note": "Coding rounds me B-Tree / B+ Tree implement karne ko generally nahi kehte; concept (kyun, fan-out, leaves linked, range queries) jaanna kaafi hai."
    },
    {
      "heading": "Fenwick Tree (Binary Indexed Tree) — Brief",
      "body": "\n      <ul>\n        <li><strong>Problem</strong> — array me <em>prefix sum</em> chahiye aur elements <em>update</em> bhi hote hain. Prefix-sum array (topic 05): query O(1) par update O(n). Plain array: update O(1) par query O(n).</li>\n        <li><strong>Fenwick Tree</strong>: dono operations <strong>O(log n)</strong>. Ye ek simple array hai (1-indexed); har index <code>i</code> apne last-set-bit (<code>i &amp; −i</code>) jitni length ki range ka sum rakhta hai.</li>\n        <li><strong>Segment Tree</strong> isi ka bada bhai hai — sum ke alawa min / max / gcd aur <em>range update</em> bhi sambhal leta hai, par code lamba.</li>\n        <li>Competitive programming aur advanced rounds me aate hain; general SDE interviews me bahut kam.</li>\n      </ul>",
      "code": "tree = array of size n + 1, all 0          // 1-indexed\n\nfunction update(i, delta):                // arr[i] += delta\n    while i <= n:\n        tree[i] += delta\n        i += i & (-i)                      // agla index jo is position ko cover karta hai\n\nfunction prefixSum(i):                    // arr[1..i] ka sum\n    sum = 0\n    while i > 0:\n        sum += tree[i]\n        i -= i & (-i)                      // lowest set bit hata do\n    return sum\n\nfunction rangeSum(l, r): return prefixSum(r) - prefixSum(l - 1)",
      "note": "<code>i &amp; −i</code> number ka sabse chhota set bit nikalta hai (6 → 2, 8 → 8, 5 → 1). Ye hi Fenwick ka poora trick hai."
    },
    {
      "heading": "Interview Prep me Ye Kahan Fit Hote Hain?",
      "body": "\n      <ul>\n        <li><strong>Tier 1 — pakka aana chahiye</strong>: Binary tree (traversals, recursion, LCA, diameter), BST (search / insert / delete / validate), Heap + Priority Queue (Top-K, median), Trie basics.</li>\n        <li><strong>Tier 2 — concept level</strong>: AVL / Red-Black (kyun balance, rotation ka idea), B+ Tree (DB index), Fenwick / Segment tree (range queries). \"Kya problem solve karta hai, complexity kya hai, kab use hota hai\" itna kaafi.</li>\n        <li>Tier 2 ko implement karna tabhi seekho jab target role / company advanced ho (competitive-style rounds, database / infra roles) — warna time Tier 1 ki problems practice karne me lagao.</li>\n      </ul>",
      "code": "Sahi structure kaise chunein?\n\nhierarchy / recursion practice              → Binary Tree\nordered data + dynamic search / range       → BST  (balanced: TreeMap / TreeSet)\nbas min / max / top-K / next task chahiye   → Heap (Priority Queue)\nstrings ka prefix / autocomplete            → Trie\ndisk-based sorted index (database)          → B+ Tree\nprefix sums + frequent updates              → Fenwick Tree\nrange min / max + range updates             → Segment Tree"
    }
  ],
  "problems": [
    {
      "title": "Range Sum Query - Mutable (Fenwick Tree)",
      "pseudocode": "class NumArray:\n    constructor(nums):\n        n = nums.length\n        tree = [0] * (n + 1)\n        values = copy of nums\n        for i in range(n): add(i + 1, nums[i])        // 1-indexed Fenwick\n\n    add(i, delta):\n        while i <= n:\n            tree[i] += delta\n            i += i & (-i)\n\n    prefix(i):\n        sum = 0\n        while i > 0:\n            sum += tree[i]\n            i -= i & (-i)\n        return sum\n\n    update(index, val):                               // index 0-based\n        add(index + 1, val - values[index])\n        values[index] = val\n\n    sumRange(left, right):\n        return prefix(right + 1) - prefix(left)\n\n// nums = [3, 2, -1, 6, 5, 4, -3, 3]: sumRange(2, 5) = 14;\n// update(3, 10) (6 → 10) ke baad sumRange(2, 5) = 18"
    }
  ]
});
