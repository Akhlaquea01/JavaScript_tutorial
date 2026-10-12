// DSA-Notes/27-tree-lca.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-lca",
  "num": 27,
  "emoji": "🤝",
  "title": "Lowest Common Ancestor (LCA)",
  "summary": "LCA of nodes p aur q = wo sabse neecha (deepest) node jiske subtree me p aur q dono aate hain (node khud apna ancestor bhi maana jaata hai). Plain binary tree me recursion: \"left me mila? right me mila? dono me mila to current node hi LCA\". BST me ordering use karke O(h) me — left jaana hai ya right, ya yahi split point hai.",
  "sections": [
    {
      "heading": "LCA kya hai?",
      "body": "\n      <ul>\n        <li><strong>Definition</strong> — p aur q ka lowest (sabse neecha) common ancestor. Ek node ko apna khud ka ancestor maana jaata hai, isliye agar p, q ka ancestor ho to <code>LCA(p, q) = p</code>.</li>\n        <li><strong>Plain English</strong> — p aur q se upar (parent ki taraf) chadte jao; jahan dono ke raaste <em>pehli baar milte hain</em>, wahi LCA hai. (Linked list ke intersection point jaisa idea.)</li>\n        <li><strong>Use</strong> — org chart me do logon ka common manager, file paths ka common folder, do nodes ke beech distance, git merge-base.</li>\n      </ul>",
      "code": "          3\n        /   \\\n       5     1\n      / \\   / \\\n     6   2 0   8\n        / \\\n       7   4\n\nLCA(5, 1) = 3     // alag-alag subtrees me → root\nLCA(5, 4) = 5     // 5, 4 ka ancestor hai → khud 5\nLCA(6, 4) = 5     // 6 left me, 4 right me (5 ke neeche) → 5\nLCA(7, 8) = 3\nLCA(7, 4) = 2"
    },
    {
      "heading": "Recursive Idea (Root + Left + Right)",
      "body": "\n      <ul>\n        <li>Har node ko ek sawal: <strong>\"mere left aur right subtree me p ya q mile?\"</strong></li>\n        <li><strong>Base</strong> — node null ho to <code>null</code>. Node <code>p</code> ya <code>q</code> ho to wahi node return (neeche jaane ki zaroorat nahi: agar doosra node iske neeche hai to ye hi LCA hai; nahi hai to upar wala decide karega).</li>\n        <li>Left aur right me recursion chalao. <strong>Dono non-null</strong> aaye → p ek taraf, q doosri taraf → <strong>current node hi LCA</strong>.</li>\n        <li>Sirf ek non-null aaye → wahi return karo (dono usi taraf hain, ya sirf ek mila). Dono null → null.</li>\n        <li>Assumption: p aur q dono tree me exist karte hain. Agar guarantee na ho to pehle contains() check karo (repo version me hai) ya count karke verify karo.</li>\n      </ul>",
      "code": "function lowestCommonAncestor(root, p, q):\n    if root is null or root == p or root == q:\n        return root\n\n    left  = lowestCommonAncestor(root.left,  p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n\n    if left is not null and right is not null:\n        return root                  // p aur q alag-alag taraf → yahi LCA\n    return left if left is not null else right",
      "note": "Time O(n) (worst me har node), Space O(h). Repo: Problems/Tree/LowestCommonAncestor.js (plain tree) aur Problems/Tree/binarySearchTree.js ka findLCA (BST)."
    },
    {
      "heading": "Dry Run",
      "code": "Tree (upar wala), p = 5, q = 4\nlca(3): left  = lca(5) → root == p → return 5      (neeche ghuse hi nahi)\n        right = lca(1) → lca(0)=null, lca(8)=null → return null\n        left=5, right=null → return 5\n→ LCA(5, 4) = 5   ✓   (p khud q ka ancestor)\n\np = 6, q = 4\nlca(3): left = lca(5):\n            left  = lca(6) → 6 == p → return 6\n            right = lca(2): lca(7)=null, lca(4)=4 (== q) → return 4\n            left=6, right=4 → DONO non-null → return 5     ← LCA\n        right = lca(1) = null\n        left=5, right=null → return 5\n→ LCA(6, 4) = 5   ✓"
    },
    {
      "heading": "Approach 2 — Root-to-Node Paths",
      "body": "\n      <ul>\n        <li>Root se p tak ka path aur root se q tak ka path alag-alag list me nikalo (DFS + backtracking).</li>\n        <li>Dono paths ko shuru se compare karo; <strong>aakhri common node</strong> = LCA.</li>\n        <li>Time O(n), Space O(h) paths ke liye. Simple aur debug karne me easy; recursion wala approach zyada compact hai.</li>\n      </ul>",
      "code": "function findPath(node, target, path):          // path me root→target ke nodes\n    if node is null: return false\n    path.push(node)\n    if node == target: return true\n    if findPath(node.left, target, path) or findPath(node.right, target, path):\n        return true\n    path.pop()                                   // backtrack\n    return false\n\npathP = []; pathQ = []\nfindPath(root, p, pathP); findPath(root, q, pathQ)\ni = 0\nwhile i < pathP.length and i < pathQ.length and pathP[i] == pathQ[i]: i++\nreturn pathP[i - 1]                              // last common node"
    },
    {
      "heading": "Approach 3 — Parent Pointers",
      "body": "\n      <ul>\n        <li>Agar har node ke paas <code>parent</code> pointer ho (ya ek baar DFS/BFS se parent map bana lo), to p ke saare ancestors ek Set me daalo.</li>\n        <li>Phir q se upar chadte jao — jo pehla node Set me mile wahi LCA.</li>\n        <li>Ya linked-list-intersection jaisa two-pointer trick: <code>a = p, b = q</code>; jab ek upar root se bahar nikle to use doosre node pe set kar do; jis node pe milenge wahi LCA.</li>\n        <li>Time O(h), Space O(h). Jab baar-baar queries aayein ya node pe parent pointer already ho tab useful.</li>\n      </ul>"
    },
    {
      "heading": "LCA in a BST (Ordering Use Karo)",
      "body": "\n      <ul>\n        <li>BST me values ordered hain, to poore tree me dhundhne ki zaroorat nahi: <strong>p aur q dono current node se chhote</strong> → LCA left me; <strong>dono bade</strong> → LCA right me.</li>\n        <li>Warna (ek chhota-ek bada, ya current node khud p/q hai) → current node hi <strong>split point</strong> = LCA.</li>\n        <li>Time <strong>O(h)</strong>, Space <strong>O(1)</strong> iterative (recursive me O(h)).</li>\n      </ul>",
      "code": "function lcaBST(root, p, q):\n    node = root\n    while node is not null:\n        if p.val < node.val and q.val < node.val:\n            node = node.left\n        else if p.val > node.val and q.val > node.val:\n            node = node.right\n        else:\n            return node              // split point (ya node khud p / q hai)\n    return null"
    },
    {
      "heading": "LCA ke Applications",
      "body": "\n      <ul>\n        <li><strong>Distance between two nodes</strong> = <code>depth(p) + depth(q) − 2 × depth(LCA)</code>. (Example tree me 7 aur 8: depth 3 + 2 − 0 = 5 edges.) Repo ka <code>findDistance</code> yahi karta hai.</li>\n        <li><strong>\"Kya p, q ka ancestor hai?\"</strong> → <code>LCA(p, q) == p</code>.</li>\n        <li><strong>LCA of Deepest Leaves</strong> — bottom-up: har node (height, lca) return kare.</li>\n        <li>Bade static tree pe bahut saari LCA queries: Euler tour + sparse table ya <em>binary lifting</em> (O(log n) per query) — advanced, interviews me kam.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Lowest Common Ancestor of a Binary Tree",
      "pseudocode": "function lowestCommonAncestor(root, p, q):\n    if root is null or root == p or root == q: return root\n    left  = lowestCommonAncestor(root.left,  p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    if left and right: return root\n    return left if left else right"
    },
    {
      "title": "Lowest Common Ancestor of a BST",
      "pseudocode": "function lowestCommonAncestor(root, p, q):\n    node = root\n    while node:\n        if p.val < node.val and q.val < node.val:   node = node.left\n        else if p.val > node.val and q.val > node.val: node = node.right\n        else: return node"
    },
    {
      "title": "Distance Between Two Nodes",
      "pseudocode": "function distance(root, p, q):\n    lca = lowestCommonAncestor(root, p, q)\n    return depthFrom(lca, p, 0) + depthFrom(lca, q, 0)     // LCA se har node tak edges\n\nfunction depthFrom(node, target, d):\n    if node is null: return -1\n    if node == target: return d\n    left = depthFrom(node.left, target, d + 1)\n    if left != -1: return left\n    return depthFrom(node.right, target, d + 1)"
    },
    {
      "title": "Lowest Common Ancestor of Deepest Leaves",
      "pseudocode": "function lcaDeepestLeaves(root):\n    function dfs(node):                      // (height, lca) return karta hai\n        if node is null: return (0, null)\n        (lh, ll) = dfs(node.left)\n        (rh, rl) = dfs(node.right)\n        if lh > rh: return (lh + 1, ll)      // gehre leaves left me hain\n        if rh > lh: return (rh + 1, rl)\n        return (lh + 1, node)                // dono taraf barabar gehre → yahi node\n    return dfs(root).lca"
    }
  ]
});
