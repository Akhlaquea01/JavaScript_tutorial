// DSA-Notes/26-tree-height-diameter.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-height-diameter",
  "num": 26,
  "emoji": "📏",
  "title": "Height, Max Depth & Diameter",
  "summary": "Height / Maximum Depth = 1 + max(leftHeight, rightHeight). Diameter = tree ke kisi bhi do nodes ke beech ka sabse lamba path (root se guzarna zaroori nahi) = har node pe (leftHeight + rightHeight) ka maximum. Smart solution ek hi post-order DFS me height return karta hai aur diameter ko outer variable me update karta hai — O(n).",
  "sections": [
    {
      "heading": "Height / Maximum Depth",
      "body": "\n      <ul>\n        <li><strong>Definition</strong> — root se sabse door leaf tak ka raasta. Left aur right dono subtree ki height nikalo, bada wala lo, aur +1 (current node ke liye).</li>\n        <li><strong>Convention dhyan se</strong> — LeetCode \"Maximum Depth\" me <em>nodes</em> ginte hain (empty = 0, leaf = 1). Kai textbooks <em>edges</em> ginte hain (empty = −1, leaf = 0). Repo ka <code>getHeight()</code> (Problems/Tree/binarySearchTree.js) edges wala hai (null → −1). Interview me poochh lo.</li>\n        <li>Example tree (1; 2, 3; 4, 5, 6) ki height = <strong>3</strong> nodes me, <strong>2</strong> edges me.</li>\n        <li>Time O(n), Space O(h). BFS se bhi ho sakti hai: levels ki ginti hi height hai.</li>\n      </ul>",
      "code": "function height(node):                // nodes ginte hue: null → 0, leaf → 1\n    if node is null: return 0\n    return 1 + max(height(node.left), height(node.right))\n\n// edges wali convention: null → -1 (leaf automatically 0 aa jaata hai)\nfunction heightEdges(node):\n    if node is null: return -1\n    return 1 + max(heightEdges(node.left), heightEdges(node.right))"
    },
    {
      "heading": "Minimum Depth — Leaf Trap",
      "code": "function minDepth(node):\n    if node is null: return 0\n    if node.left is null:  return 1 + minDepth(node.right)     // sirf right hai → right me hi jao\n    if node.right is null: return 1 + minDepth(node.left)\n    return 1 + min(minDepth(node.left), minDepth(node.right))\n\n// Galat: 1 + min(minDepth(left), minDepth(right))  seedha lena\n// Skewed tree 1 → 2 → 3 (sirf right) me null side ka 0 jeet jaata hai → answer 1 aata,\n// jabki sahi answer 3 hai (minimum depth = root se sabse paas ke LEAF tak).",
      "note": "Min depth me asli target \"leaf\" hai (dono children null), null node nahi. Isiliye ye height se thoda alag hai. BFS me pehla leaf milte hi return karna bhi simple solution hai (topic 24)."
    },
    {
      "heading": "Diameter — Definition",
      "body": "\n      <ul>\n        <li><strong>Diameter</strong> = tree ke <em>kisi bhi</em> do nodes ke beech ka sabse lamba path (edges ki ginti me). Path root se guzarna <strong>zaroori nahi</strong>.</li>\n        <li>Kisi node <code>X</code> ko \"turning point\" maano: us se guzarne wala sabse lamba path = (X ke left subtree ki height) + (X ke right subtree ki height). Height nodes me li ho to ye seedha <strong>edges</strong> ki ginti dega.</li>\n        <li>Poore tree ka diameter = <strong>saare nodes pe is value ka maximum</strong>.</li>\n      </ul>",
      "code": "        1\n       /\n      2\n     / \\\n    3   4\n   /     \\\n  5       6\n\nSabse lamba path : 5 - 3 - 2 - 4 - 6   → 4 edges   (root 1 se guzra hi nahi!)\nRoot 1 se guzarne wala best : 1 - 2 - 3 - 5 → sirf 3 edges\nIsliye har node pe check karna padta hai, sirf root pe nahi."
    },
    {
      "heading": "Naive Approach — O(n²)",
      "code": "function diameterNaive(node):\n    if node is null: return 0\n    through = height(node.left) + height(node.right)       // height() har baar O(n)\n    return max(through, diameterNaive(node.left), diameterNaive(node.right))",
      "note": "Har node pe height() dobara poore subtree pe chalti hai — skewed tree me O(n²). Wahi kaam baar-baar ho raha hai, isliye height ko diameter ke saath hi nikalo."
    },
    {
      "heading": "Optimized — O(n), Ek Hi DFS (Height + Diameter)",
      "code": "function diameterOfBinaryTree(root):\n    best = 0\n\n    function height(node):             // post-order: pehle children, phir root\n        if node is null: return 0\n        l = height(node.left)\n        r = height(node.right)\n        best = max(best, l + r)         // ANSWER: is node ke through lamba path (edges)\n        return 1 + max(l, r)            // RETURN: parent ko height (nodes me)\n\n    height(root)\n    return best",
      "note": "<strong>Return ≠ Answer</strong> (topic 25): function height return karta hai, par diameter <code>best</code> me jama hota hai. Agar problem diameter ko <em>nodes</em> me maange to answer <code>best + 1</code> hoga."
    },
    {
      "heading": "Dry Run (Diameter)",
      "code": "        1\n       / \\\n      2   3\n     / \\   \\\n    4   5   6\n\nheight(4): l=0 r=0 → best=0 → return 1\nheight(5): l=0 r=0 → best=0 → return 1\nheight(2): l=1 r=1 → best=2 → return 2\nheight(6): l=0 r=0 → best=2 → return 1\nheight(3): l=0 r=1 → best=2 → return 2\nheight(1): l=2 r=2 → best=4 → return 3\n\nDiameter = 4 edges  (4-2-1-3-6  ya  5-2-1-3-6)"
    },
    {
      "heading": "Same Skeleton, Different Combine",
      "body": "\n      <table>\n        <tr><th>Problem</th><th>Function kya return karta hai</th><th>Outer answer</th></tr>\n        <tr><td>Diameter of Binary Tree</td><td>Height</td><td>max(l + r)</td></tr>\n        <tr><td>Balanced Binary Tree</td><td>Height, ya −1 (imbalance mila)</td><td>Koi nahi — −1 propagate hota hai</td></tr>\n        <tr><td>Binary Tree Maximum Path Sum</td><td>Ek taraf ka best chain (negative ho to 0)</td><td>max(val + l + r)</td></tr>\n        <tr><td>Longest Univalue Path</td><td>Same value wala ek taraf ka chain</td><td>max(leftChain + rightChain)</td></tr>\n        <tr><td>Diameter of N-ary Tree</td><td>Height</td><td>Top 2 child heights ka sum</td></tr>\n      </table>"
    },
    {
      "heading": "Complexity",
      "body": "\n      <ul>\n        <li>Height / Max Depth / Min Depth: Time <strong>O(n)</strong>, Space <strong>O(h)</strong>.</li>\n        <li>Diameter (optimized): Time <strong>O(n)</strong> — har node ek baar, Space <strong>O(h)</strong>. Naive version O(n²) (worst).</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Maximum Depth of Binary Tree",
      "pseudocode": "function maxDepth(root):\n    if root is null: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))"
    },
    {
      "title": "Diameter of Binary Tree",
      "pseudocode": "function diameterOfBinaryTree(root):\n    best = 0\n    function height(node):\n        if node is null: return 0\n        l = height(node.left)\n        r = height(node.right)\n        best = max(best, l + r)\n        return 1 + max(l, r)\n    height(root)\n    return best"
    },
    {
      "title": "Balanced Binary Tree (O(n) with -1 sentinel)",
      "pseudocode": "function isBalanced(root):\n    return check(root) != -1\n\nfunction check(node):                  // height return karta hai, ya -1 agar imbalance mila\n    if node is null: return 0\n    l = check(node.left);   if l == -1: return -1\n    r = check(node.right);  if r == -1: return -1\n    if abs(l - r) > 1: return -1\n    return 1 + max(l, r)"
    },
    {
      "title": "Minimum Depth of Binary Tree",
      "pseudocode": "function minDepth(node):\n    if node is null: return 0\n    if node.left is null:  return 1 + minDepth(node.right)\n    if node.right is null: return 1 + minDepth(node.left)\n    return 1 + min(minDepth(node.left), minDepth(node.right))"
    },
    {
      "title": "Diameter of N-ary Tree",
      "pseudocode": "best = 0\nfunction depth(node):                    // leaf → 1\n    top1 = 0; top2 = 0                   // do sabse badi child heights\n    for child in node.children:\n        h = depth(child)\n        if h > top1:   top2 = top1; top1 = h\n        else if h > top2: top2 = h\n    best = max(best, top1 + top2)        // is node ke through lamba path (edges)\n    return 1 + top1"
    }
  ]
});
