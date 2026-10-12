// DSA-Notes/24-tree-bfs-level-order.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-bfs-level-order",
  "num": 24,
  "emoji": "🌊",
  "title": "Level-Order Traversal (BFS) & Tree Views",
  "summary": "BFS / Level order (level-order) traversal tree ko level by level (upar se neeche, har level me left se right) visit karta hai — queue (FIFO) ke saath. Isi se level-wise results, zigzag, minimum depth aur \"view\" problems (right side view, left view, top view) solve hote hain. DFS (stack/recursion) se iska main farak: BFS pehle paas ke nodes, DFS pehle gehre nodes.",
  "sections": [
    {
      "heading": "BFS / Level-Order — Idea",
      "body": "\n      <ul>\n        <li>Level 0 (root) → level 1 → level 2 … — ek level poora khatam karke hi agle level pe jaate hain.</li>\n        <li><strong>Queue (FIFO)</strong> use hoti hai: root ko queue me daalo; jab tak queue khali na ho — front se node nikalo, visit karo, uske left aur right child (agar null nahi) queue ke peeche daalo.</li>\n        <li>Kyun kaam karta hai? Ek level ke saare nodes queue me pehle aate hain, unke children baad me — isliye order automatically level-wise rehta hai.</li>\n        <li>Time <strong>O(n)</strong>. Space <strong>O(w)</strong> jahan w = tree ki maximum width (ek level me max nodes) — worst case O(n) (perfect tree ka last level ~ n/2 nodes).</li>\n      </ul>"
    },
    {
      "heading": "Basic BFS (Flat Output)",
      "code": "function levelOrderFlat(root):\n    if root is null: return []\n    result = []\n    queue = [root]\n    while queue not empty:\n        node = queue.popFront()\n        result.push(node.val)\n        if node.left:  queue.push(node.left)\n        if node.right: queue.push(node.right)\n    return result\n\n//        1\n//       / \\\n//      2   3\n//     / \\   \\\n//    4   5   6\n// Output: [1, 2, 3, 4, 5, 6]"
    },
    {
      "heading": "Level-by-Level BFS (Size Snapshot Trick)",
      "code": "function levelOrder(root):\n    result = []\n    if root is null: return result\n    queue = [root]\n    while queue not empty:\n        size = queue.length              // SNAPSHOT — is level me kitne nodes hain\n        level = []\n        for i in range(size):            // sirf itne hi nodes nikalo\n            node = queue.popFront()\n            level.push(node.val)\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n        result.push(level)\n    return result\n\n// Same tree → [[1], [2, 3], [4, 5, 6]]",
      "note": "<code>size</code> loop shuru hone se pehle store karna zaroori hai. Loop ke andar queue me agle level ke nodes bhi add ho rahe hote hain, isliye <code>queue.length</code> ko live use karoge to levels mix ho jaayenge."
    },
    {
      "heading": "JS Tip — queue.shift() O(n) hota hai",
      "code": "// Option 1: head pointer (kuch remove nahi karte, bas index aage badhate hain)\nqueue = [root]; head = 0\nwhile head < queue.length:\n    node = queue[head]; head++\n    ...\n\n// Option 2: current-level array → next-level array (shift ki zaroorat hi nahi)\ncurrent = [root]\nwhile current not empty:\n    result.push(values of current)\n    next = []\n    for node in current:\n        if node.left:  next.push(node.left)\n        if node.right: next.push(node.right)\n    current = next",
      "note": "JS array ka <code>shift()</code> sab elements ko ek jagah khiskata hai (O(n)). Interview ke chhote inputs me chalta hai, par bade inputs me head pointer ya Option 2 use karo — Queue/Deque (topic 17) dekho."
    },
    {
      "heading": "Right Side View of Binary Tree",
      "body": "\n      <ul>\n        <li>Socho aap tree ke <strong>right side</strong> se khade ho — har level ka sirf <strong>sabse right wala node</strong> dikhega.</li>\n        <li>Dhyan do: right view ka matlab sirf \"right children ka chain\" nahi hai. Agar kisi level pe right side khali hai to us level ka left node bhi dikh sakta hai.</li>\n        <li><strong>BFS approach</strong> — level-by-level loop me jab <code>i == size − 1</code> ho (level ka last node), use result me daalo.</li>\n        <li><strong>DFS approach</strong> — pre-order me <em>pehle right, phir left</em> jao, aur jab bhi <code>depth == result.length</code> ho (is depth ka pehla node jo mila) use result me daalo — right-first hone se wo wahi rightmost node hoga.</li>\n      </ul>",
      "code": "//      1             Right view = [1, 3, 4]\n//     / \\            (level 2 pe 3 ke neeche koi node nahi,\n//    2   3            isliye 2 ka left child 4 dikhta hai)\n//   /\n//  4\n\n// BFS version\nfunction rightSideView(root):\n    result = []\n    if root is null: return result\n    queue = [root]\n    while queue not empty:\n        size = queue.length\n        for i in range(size):\n            node = queue.popFront()\n            if i == size - 1:                 // is level ka last node\n                result.push(node.val)\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n    return result\n\n// DFS version (right-first)\nfunction rightSideViewDFS(root):\n    result = []\n    function dfs(node, depth):\n        if node is null: return\n        if depth == result.length:            // is depth pe pehli baar aaye\n            result.push(node.val)\n        dfs(node.right, depth + 1)            // pehle RIGHT\n        dfs(node.left,  depth + 1)\n    dfs(root, 0)\n    return result",
      "note": "Dono O(n) time. BFS ka space O(width), DFS ka O(height). <strong>Left Side View</strong> bilkul same hai — BFS me <code>i == 0</code> (level ka pehla node) ya DFS me pehle left jao."
    },
    {
      "heading": "Top View & Bottom View (Horizontal Distance)",
      "body": "\n      <ul>\n        <li>Har node ko ek <strong>horizontal distance (hd)</strong> do: root = 0, left child = hd − 1, right child = hd + 1.</li>\n        <li><strong>Top View</strong> — har hd ka <em>pehla</em> node (jo BFS me sabse pehle mila, yaani sabse upar). <strong>Bottom View</strong> — har hd ka <em>aakhri</em> node (sabse neeche).</li>\n        <li>BFS zaroori hai kyunki wahi upar-se-neeche order guarantee karta hai. Output hd ke sorted order (left → right) me dete hain.</li>\n      </ul>",
      "code": "function topView(root):\n    firstSeen = Map()                          // hd → value\n    queue = [(root, 0)]\n    while queue not empty:\n        (node, hd) = queue.popFront()\n        if hd not in firstSeen:\n            firstSeen[hd] = node.val           // pehla = sabse upar wala\n        // Bottom view ke liye: har baar firstSeen[hd] = node.val (overwrite)\n        if node.left:  queue.push((node.left,  hd - 1))\n        if node.right: queue.push((node.right, hd + 1))\n    return values of firstSeen, sorted by hd\n\n// Upar wale example tree (1,2,3,4,5,6) pe:\n// hd:  -2  -1   0   1   2\n// Top   : [4, 2, 1, 3, 6]\n// Bottom: [4, 2, 5, 3, 6]     (hd = 0 pe 1 ke baad 5 aata hai → neeche wala 5)"
    },
    {
      "heading": "Common Level-Order Variants",
      "body": "\n      <table>\n        <tr><th>Problem</th><th>Kya tweak karna hai</th></tr>\n        <tr><td><strong>Level order (list of lists)</strong></td><td>Size snapshot + har level ki alag list.</td></tr>\n        <tr><td><strong>Bottom-up level order</strong></td><td>Normal level order karke result ko reverse kar do.</td></tr>\n        <tr><td><strong>Zigzag level order</strong></td><td>Ek flag/level-index rakho; odd levels ki list reverse kar do (ya deque me dono ends se daalo). [[1], [3, 2], [4, 5, 6]]</td></tr>\n        <tr><td><strong>Average / Max / Sum of each level</strong></td><td>Level loop ke andar running sum/max rakho; level ke end me result me push.</td></tr>\n        <tr><td><strong>Minimum Depth</strong></td><td>BFS me pehla <em>leaf</em> milte hi level number return — poora tree dekhne ki zaroorat nahi (early exit).</td></tr>\n        <tr><td><strong>Right / Left view</strong></td><td>Level ka last / first node.</td></tr>\n        <tr><td><strong>Width of tree</strong></td><td>Nodes ke saath index (2i, 2i+1) track karo; level me last − first + 1.</td></tr>\n      </table>"
    },
    {
      "heading": "BFS vs DFS (Trees par)",
      "body": "\n      <table>\n        <tr><th></th><th>BFS (Level-Order)</th><th>DFS (Pre / In / Post)</th></tr>\n        <tr><td>Data structure</td><td>Queue</td><td>Stack ya recursion</td></tr>\n        <tr><td>Order</td><td>Level by level</td><td>Ek branch poori gehrai tak</td></tr>\n        <tr><td>Extra space</td><td>O(width) — wide tree me bada</td><td>O(height) — skewed tree me bada</td></tr>\n        <tr><td>Best for</td><td>Level-wise answers, <strong>minimum depth / shortest path</strong>, views, nearest node</td><td>Path problems, subtree calculations (height, diameter), BST sorted order, backtracking</td></tr>\n        <tr><td>Implementation</td><td>Iterative natural</td><td>Recursive natural</td></tr>\n      </table>",
      "note": "Rule of thumb: \"level\" ya \"minimum steps\" shabd dikhe to BFS; \"path\", \"subtree\", \"sab combinations\" dikhe to DFS. Graph pe BFS (topic 39) aur DFS (topic 40) isi ke extension hain — bas visited set add hota hai."
    }
  ],
  "problems": [
    {
      "title": "Binary Tree Level Order Traversal",
      "pseudocode": "function levelOrder(root):\n    result = []\n    if root is null: return result\n    queue = [root]\n    while queue not empty:\n        size = queue.length\n        level = []\n        for i in range(size):\n            node = queue.popFront()\n            level.push(node.val)\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n        result.push(level)\n    return result"
    },
    {
      "title": "Binary Tree Right Side View",
      "pseudocode": "function rightSideView(root):\n    result = []\n    if root is null: return result\n    queue = [root]\n    while queue not empty:\n        size = queue.length\n        for i in range(size):\n            node = queue.popFront()\n            if i == size - 1: result.push(node.val)     // level ka last node\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n    return result"
    },
    {
      "title": "Binary Tree Zigzag Level Order Traversal",
      "pseudocode": "function zigzagLevelOrder(root):\n    result = []\n    if root is null: return result\n    queue = [root]; leftToRight = true\n    while queue not empty:\n        size = queue.length\n        level = []\n        for i in range(size):\n            node = queue.popFront()\n            level.push(node.val)\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n        if not leftToRight: reverse(level)\n        result.push(level)\n        leftToRight = not leftToRight\n    return result"
    },
    {
      "title": "Minimum Depth of Binary Tree (BFS early exit)",
      "pseudocode": "function minDepth(root):\n    if root is null: return 0\n    queue = [root]; depth = 1\n    while queue not empty:\n        size = queue.length\n        for i in range(size):\n            node = queue.popFront()\n            if node.left is null and node.right is null:\n                return depth                      // pehla leaf = sabse kam depth\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n        depth++"
    },
    {
      "title": "Average of Levels in Binary Tree",
      "pseudocode": "function averageOfLevels(root):\n    result = []; queue = [root]\n    while queue not empty:\n        size = queue.length; sum = 0\n        for i in range(size):\n            node = queue.popFront()\n            sum += node.val\n            if node.left:  queue.push(node.left)\n            if node.right: queue.push(node.right)\n        result.push(sum / size)\n    return result          // example tree (1,2,3,4,5,6) → [1, 2.5, 5]"
    }
  ]
});
