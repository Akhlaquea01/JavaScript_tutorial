// DSA-Notes/29-bst.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "bst",
  "num": 29,
  "emoji": "🔍",
  "title": "Binary Search Tree (BST)",
  "summary": "BST ek binary tree hai jisme har node ke liye poora left subtree uske value se chhota aur poora right subtree bada hota hai. Isse binary search ki tarah search, insert, delete O(h) me hote hain — balanced tree me O(log n), lekin sorted insertions se tree skewed (linked list jaisa) ban kar O(n) ho jaata hai. In-order traversal hamesha sorted order deta hai, aur BST validation ka sahi tareeka range (min, max) check karna hai.",
  "sections": [
    {
      "heading": "BST Property",
      "body": "\n      <ul>\n        <li>Har node ke liye: <strong>left subtree ke SAARE nodes &lt; node &lt; right subtree ke SAARE nodes</strong>. Sirf immediate children nahi — poore subtrees.</li>\n        <li><strong>In-order traversal (Left, Root, Right) hamesha sorted ascending</strong> deta hai — BST ki sabse badi pehchaan. Validation, kth smallest, sorted list sab isi se.</li>\n        <li><strong>Duplicates</strong> — policy decide karo: allow nahi, ya ek fixed side (jaise left &lt;=), ya node me count rakho. Interview me poochh lo.</li>\n        <li>Idea = <strong>Binary Search (topic 15) ko linked structure pe</strong>: har comparison me aadha search space discard ho jaata hai (balanced case me).</li>\n      </ul>",
      "code": "Insert order: 8, 3, 10, 1, 6, 14, 4, 7, 13\n\n           8\n         /   \\\n        3     10\n       / \\      \\\n      1   6      14\n         / \\     /\n        4   7   13\n\nIn-order : 1 3 4 6 7 8 10 13 14     (sorted!)\nMin = 1 (sabse left)   Max = 14 (sabse right)"
    },
    {
      "heading": "Search",
      "code": "// Iterative — O(h) time, O(1) space\nfunction search(root, target):\n    node = root\n    while node is not null:\n        if target == node.val: return node\n        if target < node.val:  node = node.left      // chhota hai → left me hi hoga\n        else:                  node = node.right     // bada hai → right me\n    return null\n\n// Recursive — O(h) time, O(h) space\nfunction searchRec(node, target):\n    if node is null or node.val == target: return node\n    if target < node.val: return searchRec(node.left, target)\n    return searchRec(node.right, target)"
    },
    {
      "heading": "Insert",
      "code": "// Naya node hamesha kisi null jagah (leaf position) pe lagta hai\nfunction insert(node, val):\n    if node is null: return TreeNode(val)           // jagah mil gayi\n    if val < node.val:   node.left  = insert(node.left,  val)\n    else if val > node.val: node.right = insert(node.right, val)\n    return node                                      // (equal → duplicate, ignore)\n\n// 5 insert karna hai: 5<8 → left(3) → 5>3 → right(6) → 5<6 → left(4) → 5>4 → 4.right = null ← yahan lagao",
      "note": "Insert hamesha existing node ko move nahi karta — bas ek leaf ke neeche naya leaf jodta hai. Isliye same elements alag order me daalne par tree ka shape alag banta hai."
    },
    {
      "heading": "Delete — 3 Cases",
      "body": "\n      <ul>\n        <li><strong>Case 1: Leaf</strong> — seedha hata do (parent ka link null).</li>\n        <li><strong>Case 2: Ek child</strong> — node ko uske us child se replace kar do (parent ab seedha child ko point kare).</li>\n        <li><strong>Case 3: Do children</strong> — node ki value ko <strong>in-order successor</strong> (right subtree ka minimum) ki value se replace karo, phir right subtree se wo successor node delete karo. (Symmetric: in-order predecessor = left subtree ka maximum.)</li>\n      </ul>",
      "code": "function deleteNode(node, key):\n    if node is null: return null\n    if key < node.val:      node.left  = deleteNode(node.left,  key)\n    else if key > node.val: node.right = deleteNode(node.right, key)\n    else:                                            // yehi node delete karna hai\n        if node.left is null:  return node.right     // leaf ya sirf right child\n        if node.right is null: return node.left      // sirf left child\n        succ = node.right                            // do children\n        while succ.left is not null: succ = succ.left     // right subtree ka min\n        node.val = succ.val                          // value copy\n        node.right = deleteNode(node.right, succ.val)     // successor ko hata do\n    return node\n\n// Upar wale tree me 3 delete karo (do children: 1 aur 6):\n// successor = 6 ke subtree ka min = 4  → 3 ki jagah 4 aa jaata hai\n//\n//           8\n//         /   \\\n//        4     10        In-order abhi bhi sorted: 1 4 6 7 8 10 13 14\n//       / \\      \\\n//      1   6      14\n//           \\     /\n//            7   13",
      "note": "Repo me iterative insert/search aur recursive delete: Problems/Tree/binarySearchTree.js."
    },
    {
      "heading": "Min, Max, Successor, Predecessor",
      "body": "\n      <ul>\n        <li><strong>Min</strong> = sabse left node, <strong>Max</strong> = sabse right node. O(h).</li>\n        <li><strong>In-order Successor</strong> (next bada) — agar node ka right subtree hai to uska min. Nahi hai to wo sabse neecha ancestor jiske left subtree me ye node aata hai (root se neeche aate hue last baar jahan \"left\" gaye the).</li>\n        <li><strong>Predecessor</strong> (next chhota) — symmetric: left subtree ka max, ya sabse neecha ancestor jiske right subtree me node aata hai.</li>\n        <li><strong>Floor / Ceil</strong> (given value se &lt;= sabse bada / &gt;= sabse chhota) — search karte hue best candidate yaad rakho.</li>\n      </ul>"
    },
    {
      "heading": "Validate BST — Sabse Common Galti",
      "code": "      5\n     / \\\n    1   6          Har node apne IMMEDIATE children se theek lagta hai\n       / \\         (6 > 5, 3 < 6, 7 > 6) ... par\n      3   7        3 right subtree of 5 me hai aur 3 < 5  → YE BST NAHI HAI",
      "body": "\n      <ul>\n        <li>Sirf \"left child &lt; node &lt; right child\" check karna <strong>galat</strong> hai — poora subtree dekhna padta hai.</li>\n        <li><strong>Approach 1 (range / top-down)</strong> — har node ke liye allowed range <code>(low, high)</code> neeche pass karo. Left jaate hue <code>high = node.val</code>, right jaate hue <code>low = node.val</code>.</li>\n        <li><strong>Approach 2 (in-order)</strong> — in-order traversal me har value pichli value se <em>strictly bada</em> hona chahiye. Ek <code>prev</code> variable rakho.</li>\n        <li>Dono O(n) time, O(h) space. Edge: bounds ke liye <code>-Infinity / +Infinity</code> (ya null) use karo — <code>Integer.MIN_VALUE</code> jaisi value tree me ho sakti hai, isliye usko sentinel mat banao.</li>\n      </ul>",
      "note": "Equal values ka handling problem statement pe depend karta hai (usually strictly smaller/greater — duplicates invalid)."
    },
    {
      "heading": "Validate BST — Code",
      "code": "// Approach 1: range pass karo\nfunction isValidBST(node, low = -infinity, high = +infinity):\n    if node is null: return true\n    if node.val <= low or node.val >= high: return false\n    return isValidBST(node.left,  low, node.val)\n       and isValidBST(node.right, node.val, high)\n\n// Approach 2: in-order, prev se compare\nprev = null\nfunction isValidInorder(node):\n    if node is null: return true\n    if not isValidInorder(node.left): return false\n    if prev is not null and node.val <= prev: return false\n    prev = node.val\n    return isValidInorder(node.right)"
    },
    {
      "heading": "Complexity & Balance Kyun Matter Karta Hai",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Balanced BST (h ≈ log n)</th><th>Skewed BST (h = n)</th></tr>\n        <tr><td>Search</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>Delete</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>Min / Max</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>In-order traversal</td><td>O(n)</td><td>O(n)</td></tr>\n        <tr><td>Space (recursion)</td><td>O(log n)</td><td>O(n)</td></tr>\n      </table>",
      "code": "Sorted order me insert: 1, 2, 3, 4, 5\n\n1\n \\\n  2\n   \\\n    3          Height = n → BST ab bas ek LINKED LIST hai\n     \\         → search / insert / delete sab O(n)\n      4\n       \\\n        5"
    },
    {
      "heading": "Balance Kaise Rakhein?",
      "body": "\n      <ul>\n        <li><strong>Self-balancing BST</strong> — AVL / Red-Black rotations se height O(log n) pe rakhte hain (topic 28; repo: avlTree.js, redBlackTree.js). Java <code>TreeMap</code> isi pe bana hai.</li>\n        <li><strong>Sorted array se build</strong> — beech wale element ko root banao, left half se left subtree, right half se right subtree → perfectly balanced.</li>\n        <li><strong>Random order</strong> — input shuffle karke insert karo, expected height O(log n) rehti hai.</li>\n        <li>Agar ordering ki zaroorat hi nahi (sirf lookup) to <strong>HashMap</strong> sahi hai; sirf min/max chahiye to <strong>Heap</strong>.</li>\n        <li>Interview me complexity \"O(h)\" bolo aur clarify karo ki balanced assume kar rahe ho ya worst case O(n).</li>\n      </ul>"
    },
    {
      "heading": "BST vs HashMap vs Sorted Array",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>BST (balanced)</th><th>HashMap</th><th>Sorted Array</th></tr>\n        <tr><td>Search</td><td>O(log n)</td><td>O(1) average</td><td>O(log n)</td></tr>\n        <tr><td>Insert</td><td>O(log n)</td><td>O(1) average</td><td>O(n) (shifting)</td></tr>\n        <tr><td>Delete</td><td>O(log n)</td><td>O(1) average</td><td>O(n)</td></tr>\n        <tr><td>Sorted iteration</td><td>O(n) (in-order)</td><td>Sort karna padega, O(n log n)</td><td>O(n)</td></tr>\n        <tr><td>Min / Max</td><td>O(log n)</td><td>O(n)</td><td>O(1)</td></tr>\n        <tr><td>Floor / Ceil / Range query</td><td>O(log n + k)</td><td>O(n)</td><td>O(log n + k)</td></tr>\n      </table>",
      "note": "BST ka asli faayda: <strong>dynamic data + ordered queries</strong> (floor, ceil, range, kth). HashMap sirf exact lookup me jeetta hai; sorted array static data me."
    },
    {
      "heading": "In-order Tricks (Kth Smallest, Iterator, Two Sum)",
      "code": "// Kth smallest — iterative in-order, k-th pe ruk jao (early stop)\nfunction kthSmallest(root, k):\n    stack = []; curr = root\n    while curr is not null or stack not empty:\n        while curr is not null:\n            stack.push(curr); curr = curr.left\n        curr = stack.pop()\n        k--\n        if k == 0: return curr.val\n        curr = curr.right\n\n// Range query me pruning (topic 21 jaisa idea): jo subtree range se bahar ho use chhodo\nfunction rangeSum(node, lo, hi):\n    if node is null: return 0\n    if node.val < lo: return rangeSum(node.right, lo, hi)     // left poora chhota hai → skip\n    if node.val > hi: return rangeSum(node.left,  lo, hi)     // right poora bada hai → skip\n    return node.val + rangeSum(node.left, lo, hi) + rangeSum(node.right, lo, hi)",
      "note": "Aur ideas: <strong>BST Iterator</strong> (in-order ko stack ke saath lazily chalana, next() amortized O(1)), <strong>Two Sum in BST</strong> (in-order list pe two pointers — topic 10), <strong>LCA in BST</strong> (topic 27)."
    }
  ],
  "problems": [
    {
      "title": "Validate Binary Search Tree",
      "pseudocode": "function isValidBST(node, low = -infinity, high = +infinity):\n    if node is null: return true\n    if node.val <= low or node.val >= high: return false\n    return isValidBST(node.left,  low, node.val)\n       and isValidBST(node.right, node.val, high)"
    },
    {
      "title": "Kth Smallest Element in a BST",
      "pseudocode": "function kthSmallest(root, k):\n    stack = []; curr = root\n    while curr is not null or stack not empty:\n        while curr is not null:\n            stack.push(curr)\n            curr = curr.left\n        curr = stack.pop()\n        k--\n        if k == 0: return curr.val\n        curr = curr.right"
    },
    {
      "title": "Delete Node in a BST",
      "pseudocode": "function deleteNode(node, key):\n    if node is null: return null\n    if key < node.val:      node.left  = deleteNode(node.left,  key)\n    else if key > node.val: node.right = deleteNode(node.right, key)\n    else:\n        if node.left is null:  return node.right\n        if node.right is null: return node.left\n        succ = node.right\n        while succ.left is not null: succ = succ.left\n        node.val = succ.val\n        node.right = deleteNode(node.right, succ.val)\n    return node"
    },
    {
      "title": "Convert Sorted Array to Height-Balanced BST",
      "pseudocode": "function sortedArrayToBST(nums, lo = 0, hi = nums.length - 1):\n    if lo > hi: return null\n    mid = floor((lo + hi) / 2)\n    node = TreeNode(nums[mid])                       // beech wala = root\n    node.left  = sortedArrayToBST(nums, lo, mid - 1)\n    node.right = sortedArrayToBST(nums, mid + 1, hi)\n    return node"
    },
    {
      "title": "Range Sum of BST (with Pruning)",
      "pseudocode": "function rangeSumBST(node, lo, hi):\n    if node is null: return 0\n    if node.val < lo: return rangeSumBST(node.right, lo, hi)\n    if node.val > hi: return rangeSumBST(node.left,  lo, hi)\n    return node.val + rangeSumBST(node.left, lo, hi) + rangeSumBST(node.right, lo, hi)"
    },
    {
      "title": "Inorder Successor in BST",
      "pseudocode": "function inorderSuccessor(root, p):\n    succ = null\n    node = root\n    while node is not null:\n        if p.val < node.val:\n            succ = node                  // candidate — isse chhota koi mile to update\n            node = node.left\n        else:\n            node = node.right\n    return succ"
    }
  ]
});
