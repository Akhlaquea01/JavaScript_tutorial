// DSA-Notes/23-tree-dfs-traversals.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-dfs-traversals",
  "num": 23,
  "emoji": "🌲",
  "title": "Binary Tree DFS Traversals (Pre / In / Post-order)",
  "summary": "Traversal ka matlab hai tree ke har node ko exactly ek baar visit karna. DFS (Depth First Search) me pehle ek branch ko poora neeche tak explore karte hain, phir wapas aake doosri branch. DFS ke teen orders hain — Pre-order (Root, Left, Right), In-order (Left, Root, Right) aur Post-order (Left, Right, Root) — jo sirf is baat pe depend karte hain ki root ko kab visit karna hai.",
  "sections": [
    {
      "heading": "Traversal kya hai — DFS vs BFS",
      "body": "\n      <ul>\n        <li>Array me traversal simple hai (index 0 se n−1). Tree non-linear hai, isliye har node tak pahunchne ke <strong>multiple tareeke</strong> hain.</li>\n        <li><strong>DFS (Depth-First)</strong> — ek raste pe jitna ho sake gehra jao, dead-end pe wapas aao (backtrack), phir agli branch. Recursion ya explicit <strong>stack</strong> use hota hai. Ye topic isi ke baare me hai.</li>\n        <li><strong>BFS (Breadth-First / Level-Order)</strong> — level by level, <strong>queue</strong> ke saath. Next topic (24) me.</li>\n        <li>Teeno DFS orders me <strong>left subtree hamesha right se pehle</strong> aata hai — farq sirf itna ki <em>root</em> ko left/right ke pehle, beech me ya baad me visit karte hain.</li>\n        <li>Teeno ka Time <strong>O(n)</strong> (har node ek baar) aur Space <strong>O(h)</strong> (recursion stack; h = height).</li>\n      </ul>"
    },
    {
      "heading": "Ek Template, Teen Orders",
      "code": "function dfs(node):\n    if node is null: return          // base case\n\n    // PRE-ORDER  : visit(node) yahan  → Root, Left, Right\n    dfs(node.left)\n    // IN-ORDER   : visit(node) yahan  → Left, Root, Right\n    dfs(node.right)\n    // POST-ORDER : visit(node) yahan  → Left, Right, Root",
      "note": "Yaad rakhne ka trick: naam me <strong>Pre / In / Post</strong> root ki position batata hai — root left-right ke <em>pehle</em>, <em>beech me</em>, ya <em>baad me</em>."
    },
    {
      "heading": "Example Tree & Teeno Outputs",
      "code": "        1\n       / \\\n      2   3\n     / \\   \\\n    4   5   6\n\nPre-order  (Root, Left, Right) : 1 2 4 5 3 6\nIn-order   (Left, Root, Right) : 4 2 5 1 3 6\nPost-order (Left, Right, Root) : 4 5 2 6 3 1"
    },
    {
      "heading": "In-order ka Recursion Trace",
      "code": "inorder(1)\n  inorder(2)\n    inorder(4)  → left null, VISIT 4, right null\n    VISIT 2\n    inorder(5)  → VISIT 5\n  VISIT 1\n  inorder(3)\n    left null\n    VISIT 3\n    inorder(6)  → VISIT 6\n\nOutput: 4 2 5 1 3 6",
      "note": "Har call apna kaam khatam karke return hota hai aur call stack me ek level upar aa jaata hai — isi stack ko iterative version me hum khud manage karte hain."
    },
    {
      "heading": "Recursive Implementation",
      "code": "result = []\n\nfunction preorder(node):\n    if node is null: return\n    result.push(node.val)          // Root\n    preorder(node.left)            // Left\n    preorder(node.right)           // Right\n\nfunction inorder(node):\n    if node is null: return\n    inorder(node.left)             // Left\n    result.push(node.val)          // Root\n    inorder(node.right)            // Right\n\nfunction postorder(node):\n    if node is null: return\n    postorder(node.left)           // Left\n    postorder(node.right)          // Right\n    result.push(node.val)          // Root",
      "note": "Repo me teeno (aur level-order) ka implementation: Problems/Tree/binaryTree.js aur Problems/Tree/binarySearchTree.js."
    },
    {
      "heading": "Iterative Implementation (Explicit Stack)",
      "code": "// PRE-ORDER — stack me pehle RIGHT push karo, phir LEFT (taaki left pehle pop ho)\nfunction preorderIter(root):\n    result = []; stack = [root] if root else []\n    while stack not empty:\n        node = stack.pop()\n        result.push(node.val)\n        if node.right: stack.push(node.right)\n        if node.left:  stack.push(node.left)\n    return result\n\n// IN-ORDER — jitna ho sake left jao (push karte hue), phir pop → visit → right\nfunction inorderIter(root):\n    result = []; stack = []; curr = root\n    while curr is not null or stack not empty:\n        while curr is not null:         // left spine neeche tak\n            stack.push(curr)\n            curr = curr.left\n        curr = stack.pop()\n        result.push(curr.val)           // visit\n        curr = curr.right               // ab right subtree ki baari\n    return result\n\n// POST-ORDER — (Root, Right, Left) banao aur result ko REVERSE kar do\nfunction postorderIter(root):\n    result = []; stack = [root] if root else []\n    while stack not empty:\n        node = stack.pop()\n        result.push(node.val)\n        if node.left:  stack.push(node.left)\n        if node.right: stack.push(node.right)\n    return reverse(result)             // Root,Right,Left → Left,Right,Root",
      "note": "Iterative kyun? (1) JS me bahut deep tree (~10,000+ levels) pe recursion stack overflow kar sakta hai, (2) interviewer aksar follow-up me \"iteratively karo\" puchhta hai, (3) in-order iterator jaise problems (BST Iterator) me yahi logic chahiye."
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th></th><th>Recursive</th><th>Iterative</th></tr>\n        <tr><td>Time</td><td>O(n)</td><td>O(n)</td></tr>\n        <tr><td>Space</td><td>O(h) call stack — balanced O(log n), skewed O(n)</td><td>O(h) explicit stack</td></tr>\n        <tr><td>Output array</td><td>O(n) alag se (result ke liye)</td><td>O(n) alag se</td></tr>\n      </table>",
      "note": "Morris Traversal (advanced) in-order ko O(1) extra space me karta hai, tree me temporary \"thread\" links bana kar — bas itna pata ho ki ye exist karta hai."
    },
    {
      "heading": "Kaunsa Order Kab Use Karein?",
      "body": "\n      <table>\n        <tr><th>Order</th><th>Kab</th><th>Examples</th></tr>\n        <tr><td><strong>Pre-order</strong> (Root pehle)</td><td>Pehle root pe kaam chahiye, phir children pe — \"top-down\"</td><td>Tree copy/clone, <strong>serialize</strong>, prefix expression, directory structure print, path track karna</td></tr>\n        <tr><td><strong>In-order</strong> (Root beech me)</td><td>BST me <strong>sorted order</strong> milta hai</td><td>Validate BST, Kth smallest in BST, BST → sorted list, successor/predecessor</td></tr>\n        <tr><td><strong>Post-order</strong> (Root baad me)</td><td>Pehle children ka answer chahiye, phir root — \"bottom-up\"</td><td>Height, diameter, subtree sum, tree delete, LCA, expression tree evaluate</td></tr>\n      </table>"
    },
    {
      "heading": "Traversals se Tree Pehchanna / Banana",
      "body": "\n      <ul>\n        <li><strong>Pre-order ka pehla element</strong> = root. <strong>Post-order ka aakhri element</strong> = root.</li>\n        <li>In-order me root ke <em>left wale elements</em> left subtree ke hain, <em>right wale</em> right subtree ke.</li>\n        <li>Sirf ek traversal se unique tree nahi banta. <strong>In-order + Pre-order</strong> (ya <strong>In-order + Post-order</strong>) se unique tree banta hai (distinct values ke liye). Pre-order + Post-order se nahi (jab tak tree full na ho).</li>\n        <li>Isi idea se \"Construct Binary Tree from Preorder and Inorder\" solve hota hai: pre-order se root uthao, in-order me uski position dhundo, usse left/right ka size mil jaata hai.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Binary Tree Inorder Traversal (Iterative)",
      "pseudocode": "function inorderTraversal(root):\n    result = []; stack = []; curr = root\n    while curr is not null or stack not empty:\n        while curr is not null:\n            stack.push(curr)\n            curr = curr.left\n        curr = stack.pop()\n        result.push(curr.val)\n        curr = curr.right\n    return result"
    },
    {
      "title": "Binary Tree Postorder Traversal (Iterative)",
      "pseudocode": "function postorderTraversal(root):\n    if root is null: return []\n    result = []; stack = [root]\n    while stack not empty:\n        node = stack.pop()\n        result.push(node.val)           // Root, Right, Left order me\n        if node.left:  stack.push(node.left)\n        if node.right: stack.push(node.right)\n    return reverse(result)              // → Left, Right, Root"
    },
    {
      "title": "Construct Binary Tree from Preorder and Inorder",
      "pseudocode": "function buildTree(preorder, inorder):\n    indexOf = Map of value → index in inorder       // O(1) lookup\n    preIdx = 0\n\n    function helper(lo, hi):                        // inorder[lo..hi] = current subtree\n        if lo > hi: return null\n        rootVal = preorder[preIdx]\n        preIdx++\n        root = TreeNode(rootVal)\n        mid = indexOf[rootVal]\n        root.left  = helper(lo, mid - 1)            // pehle LEFT (pre-order: Root, Left, Right)\n        root.right = helper(mid + 1, hi)\n        return root\n\n    return helper(0, inorder.length - 1)\n\n// preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]\n// → tree [3, 9, 20, null, null, 15, 7]     Time O(n)  Space O(n)"
    },
    {
      "title": "Serialize and Deserialize Binary Tree (Pre-order)",
      "pseudocode": "function serialize(node):\n    if node is null: return \"#\"                     // null marker\n    return node.val + \",\" + serialize(node.left) + \",\" + serialize(node.right)\n\nfunction deserialize(tokens):                       // tokens = data.split(\",\"), ek queue ki tarah consume honge\n    token = tokens.popFront()\n    if token == \"#\": return null\n    node = TreeNode(parse(token))\n    node.left  = deserialize(tokens)\n    node.right = deserialize(tokens)\n    return node\n\n// Example tree upar wala: \"1,2,4,#,#,5,#,#,3,#,6,#,#\""
    }
  ]
});
