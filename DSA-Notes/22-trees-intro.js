// DSA-Notes/22-trees-intro.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "trees-intro",
  "num": 22,
  "emoji": "🌳",
  "title": "Trees & Binary Trees (Basics)",
  "summary": "Tree ek hierarchical, non-linear data structure hai — ek root node se shuru hoke parent → child links ke through neeche failta hai aur kabhi cycle nahi banata. Binary tree me har node ke maximum 2 children (left, right) hote hain. Tree ek recursive structure hai: har node khud ek chhote tree ka root hai, isliye zyada-tar tree problems recursion se solve hoti hain.",
  "sections": [
    {
      "heading": "Tree kya hota hai?",
      "body": "\n      <ul>\n        <li><strong>Linear vs Non-linear</strong> — Array, Linked List, Stack, Queue linear hain (ek element ke baad ek). Tree me ek parent ke <em>multiple</em> children ho sakte hain, isliye ye hierarchical (non-linear) hai.</li>\n        <li><strong>Rules</strong> — ek hi root, har non-root node ka exactly ek parent, aur <strong>koi cycle nahi</strong>. n nodes ke tree me hamesha <strong>n − 1 edges</strong> hote hain, aur kisi bhi do nodes ke beech exactly ek hi path hota hai.</li>\n        <li><strong>Tree = special Graph</strong> — connected + acyclic graph. Isliye graph ke concepts (BFS/DFS) tree pe bhi lagte hain, bas tree me visited set ki zaroorat nahi padti (cycle nahi hai).</li>\n        <li><strong>Real-life examples</strong> — File system (folder → subfolder → file), HTML DOM, company org chart, nested comments (Reddit/YouTube), game decision trees, database indexes, autocomplete.</li>\n        <li><strong>Kyun important?</strong> — Interviews me trees sabse zyada puchhe jaane wale topics me se hain, aur yahi se recursion, BST, Heap, Trie aur Graph ka base banta hai.</li>\n      </ul>",
      "note": "Tree ka short intro Data Structures (topic 01) me aur Graph ka connection Graphs (topic 38) me bhi hai. N-ary tree (kisi bhi node ke kitne bhi children) ke liye dekho: Problems/Tree/NaryTree.js."
    },
    {
      "heading": "Tree Terminology",
      "body": "\n      <table>\n        <tr><th>Term</th><th>Matlab</th></tr>\n        <tr><td><strong>Root</strong></td><td>Sabse upar ka node — jiska koi parent nahi.</td></tr>\n        <tr><td><strong>Parent / Child</strong></td><td>Ek edge ke upar wala node parent, neeche wala child.</td></tr>\n        <tr><td><strong>Siblings</strong></td><td>Same parent ke children.</td></tr>\n        <tr><td><strong>Leaf</strong></td><td>Jiska koi child nahi (left aur right dono null).</td></tr>\n        <tr><td><strong>Internal node</strong></td><td>Jiska kam se kam ek child ho (leaf nahi).</td></tr>\n        <tr><td><strong>Edge</strong></td><td>Do nodes ko jodne wali link (parent → child).</td></tr>\n        <tr><td><strong>Ancestor / Descendant</strong></td><td>Root se us node tak ke raaste pe aane wale saare upar ke nodes ancestors; neeche wale saare descendants.</td></tr>\n        <tr><td><strong>Subtree</strong></td><td>Kisi bhi node ko root maan ke uske neeche ka poora tree.</td></tr>\n        <tr><td><strong>Degree</strong></td><td>Ek node ke children ki sankhya (binary tree me 0, 1 ya 2).</td></tr>\n        <tr><td><strong>Depth of a node</strong></td><td>Root se us node tak ke edges ki sankhya (root ka depth = 0).</td></tr>\n        <tr><td><strong>Height of a node</strong></td><td>Us node se sabse door ke leaf tak ke edges ki sankhya (leaf ki height = 0).</td></tr>\n        <tr><td><strong>Level</strong></td><td>Same depth ke saare nodes ek level pe hote hain (root = level 0, kahin kahin level 1 se bhi count karte hain).</td></tr>\n      </table>",
      "note": "<strong>Depth</strong> upar se neeche count hota hai (root se), <strong>Height</strong> neeche se upar (leaf ki taraf se). Tree ki height = root ki height. Kuch jagah height ko <em>nodes</em> ki ginti me bhi dete hain (empty tree = 0, leaf = 1) — interview me hamesha confirm karo ki edges ya nodes."
    },
    {
      "heading": "Depth vs Height — Example",
      "code": "        1            <- level 0   (depth 0)\n       / \\\n      2   3          <- level 1   (depth 1)\n     / \\   \\\n    4   5   6        <- level 2   (depth 2)\n\ndepth(4)  = 2     // 1 -> 2 -> 4  (2 edges)\nheight(2) = 1     // 2 -> 4       (1 edge)\nheight(3) = 1     // 3 -> 6\nheight(1) = 2     // = poore tree ki height (edges me)\nheight(leaf) = 0  // edges me;   nodes ginte to leaf = 1 aur empty tree = 0"
    },
    {
      "heading": "Binary Tree — Node Structure",
      "code": "class TreeNode:\n    constructor(val):\n        this.val = val\n        this.left = null      // left child (ya null)\n        this.right = null     // right child (ya null)\n\n// Tree ko hum sirf uske root node se pehchante hain:\nroot = TreeNode(1)\nroot.left = TreeNode(2)\nroot.right = TreeNode(3)",
      "note": "Binary tree ka full implementation (insert, search, saari traversals) repo me hai: Problems/Tree/binaryTree.js. N-ary node me left/right ki jagah <code>children = []</code> hota hai."
    },
    {
      "heading": "Types of Binary Trees",
      "body": "\n      <table>\n        <tr><th>Type</th><th>Definition</th><th>Kahan dikhta hai</th></tr>\n        <tr><td><strong>Full (Strict)</strong></td><td>Har node ke ya to 0 children ya exactly 2 — koi node 1 child wala nahi.</td><td>Expression trees, Huffman tree</td></tr>\n        <tr><td><strong>Complete</strong></td><td>Last level ko chhodkar saare levels poore bhare; last level left se right bhara hota hai (beech me gap nahi).</td><td><strong>Heap</strong> (array me store ho sakta hai)</td></tr>\n        <tr><td><strong>Perfect</strong></td><td>Saare internal nodes ke 2 children aur saare leaves ek hi level pe. Height h (edges) ho to nodes = 2<sup>h+1</sup> − 1.</td><td>Ideal / best case tree</td></tr>\n        <tr><td><strong>Balanced (Height-balanced)</strong></td><td>Har node pe |height(left) − height(right)| &lt;= 1.</td><td>AVL, Red-Black tree isko maintain karte hain</td></tr>\n        <tr><td><strong>Degenerate / Skewed</strong></td><td>Har node ka sirf ek child — tree linked list jaisa ban jaata hai, height = n − 1.</td><td>Sorted data ko plain BST me daalne par</td></tr>\n      </table>",
      "note": "Perfect ⊂ Complete aur Perfect ⊂ Full — har perfect tree complete bhi hai aur full bhi. Lekin Complete tree full ho, ye zaroori nahi."
    },
    {
      "heading": "Important Properties / Formulas",
      "body": "\n      <ul>\n        <li>Level <code>L</code> (root = level 0) pe maximum <code>2<sup>L</sup></code> nodes ho sakte hain.</li>\n        <li>Height <code>h</code> (edges) wale binary tree me maximum nodes = <code>2<sup>h+1</sup> − 1</code>.</li>\n        <li>n nodes ke binary tree ki height: <strong>minimum ≈ log<sub>2</sub>(n)</strong> (balanced/complete), <strong>maximum = n − 1</strong> (skewed). Isi wajah se balanced tree pe operations O(log n) aur skewed pe O(n) hote hain.</li>\n        <li>Binary tree me <strong>leaves = (2-children wale nodes) + 1</strong>.</li>\n        <li>n nodes → n − 1 edges (har tree me).</li>\n        <li>Tree pe recursion ka space = <strong>O(h)</strong> (call stack) — balanced me O(log n), skewed me O(n).</li>\n      </ul>"
    },
    {
      "heading": "Tree ki Recursive Definition (sabse important idea)",
      "body": "\n      <ul>\n        <li>Tree = <strong>root + left subtree + right subtree</strong>, aur left/right subtree bhi khud tree hain (ya <code>null</code> = empty tree).</li>\n        <li>Isliye ek hi function ko chhote subtree pe dobara call kar sakte hain: <strong>base case = null node</strong>, baaki kaam \"left solve, right solve, combine\".</li>\n        <li>Isi pattern ki detail: Binary Tree Recursion (topic 25). Traversals (topic 23, 24) isi ka pehla use hain.</li>\n      </ul>"
    },
    {
      "heading": "Tree Representations",
      "body": "\n      <ul>\n        <li><strong>Pointer-based (TreeNode + left/right)</strong> — sabse common; kisi bhi shape ke tree ke liye.</li>\n        <li><strong>Array-based</strong> — sirf <em>complete</em> trees (jaise Heap) ke liye. Root index 0, <code>left(i) = 2i + 1</code>, <code>right(i) = 2i + 2</code>, <code>parent(i) = floor((i − 1) / 2)</code>. Skewed/sparse tree me bahut saari jagah waste hoti hai.</li>\n        <li><strong>LeetCode / interview input format</strong> — level-order array with <code>null</code>, jaise <code>[3, 9, 20, null, null, 15, 7]</code> (har node ke left aur right slot, null = child nahi).</li>\n      </ul>"
    },
    {
      "heading": "Level-Order Array se Tree Banana",
      "code": "function buildTree(arr):            // arr = [3, 9, 20, null, null, 15, 7]\n    if arr is empty or arr[0] is null: return null\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue is not empty and i < arr.length:\n        node = queue.popFront()\n        // is node ka left child\n        if i < arr.length and arr[i] is not null:\n            node.left = TreeNode(arr[i])\n            queue.push(node.left)\n        i++\n        // is node ka right child\n        if i < arr.length and arr[i] is not null:\n            node.right = TreeNode(arr[i])\n            queue.push(node.right)\n        i++\n    return root\n\n//        3\n//       / \\\n//      9   20\n//         /  \\\n//        15   7",
      "note": "Practice karte waqt tests ke liye ye helper bahut kaam aata hai — har baar manually left/right link karne ki jagah ek array se tree bana lo."
    },
    {
      "heading": "Complexity at a Glance",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Plain Binary Tree</th><th>BST (balanced)</th><th>BST (skewed)</th></tr>\n        <tr><td>Search</td><td>O(n)</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>Insert</td><td>O(n) (level-order slot dhundna) ya O(1) given parent</td><td>O(log n)</td><td>O(n)</td></tr>\n        <tr><td>Traversal (any)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td></tr>\n        <tr><td>Recursion space</td><td>O(h)</td><td>O(log n)</td><td>O(n)</td></tr>\n      </table>",
      "note": "Plain binary tree me values ka koi order nahi hota, isliye search me har node dekhna padta hai. Order wala tree (BST) topic 29 me."
    }
  ],
  "problems": [
    {
      "title": "Count Total Nodes",
      "pseudocode": "function countNodes(node):\n    if node is null: return 0\n    return 1 + countNodes(node.left) + countNodes(node.right)"
    },
    {
      "title": "Count Leaf Nodes",
      "pseudocode": "function countLeaves(node):\n    if node is null: return 0\n    if node.left is null and node.right is null:\n        return 1                              // leaf mil gaya\n    return countLeaves(node.left) + countLeaves(node.right)"
    },
    {
      "title": "Check if Tree is a Full Binary Tree",
      "pseudocode": "function isFull(node):\n    if node is null: return true\n    if node.left is null and node.right is null: return true     // leaf\n    if node.left is not null and node.right is not null:\n        return isFull(node.left) and isFull(node.right)           // dono children hain\n    return false                                                  // sirf ek child → full nahi"
    }
  ]
});
