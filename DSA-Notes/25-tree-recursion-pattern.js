// DSA-Notes/25-tree-recursion-pattern.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "tree-recursion-pattern",
  "num": 25,
  "emoji": "🧩",
  "title": "Binary Tree Recursion — Root + Left + Right",
  "summary": "Tree problems ka sabse bada pattern: left subtree solve karo, right subtree solve karo, phir dono ke answers ko root pe combine karo. Bas teen cheezein decide karni hoti hain — base case kya hoga, left/right se kya maangna hai, aur root pe combine kaise karna hai. Isi se height, size, diameter, LCA, path sum, validate BST sab nikalte hain.",
  "sections": [
    {
      "heading": "Core Mental Model",
      "body": "\n      <ul>\n        <li>Tree = <strong>root + left subtree + right subtree</strong>, aur subtrees bhi tree hi hain. Isliye wahi function chhote tree pe dobara chalta hai.</li>\n        <li><strong>Leap of faith</strong> — maan lo function left aur right subtree ke liye sahi answer de dega; tum sirf yeh socho ki <em>is root pe</em> kya karna hai. Poora recursion apne dimaag me trace karne ki koshish mat karo.</li>\n        <li>Har problem me 3 sawaal: <strong>(1)</strong> Base case — <code>null</code> node pe answer kya? <strong>(2)</strong> Left aur right se kya maangna hai (kya return karwana hai)? <strong>(3)</strong> Root pe dono ko combine karke kya return karna hai?</li>\n        <li>Time almost hamesha <strong>O(n)</strong> (har node ek baar), Space <strong>O(h)</strong> (call stack).</li>\n      </ul>"
    },
    {
      "heading": "Template",
      "code": "function solve(node):\n    if node is null:\n        return BASE                       // 0 / null / true / false / -infinity — problem pe depend\n\n    leftAns  = solve(node.left)           // left subtree ka answer (trust the recursion)\n    rightAns = solve(node.right)          // right subtree ka answer\n\n    return combine(node.val, leftAns, rightAns)     // root pe jodo",
      "note": "<strong>Null pe kya return karein?</strong> sum/height/count → <code>0</code>; max → <code>−infinity</code>; \"sab ke liye true\" (AND) → <code>true</code>; \"koi bhi ek\" (OR) → <code>false</code>; node return karna ho (LCA, search) → <code>null</code>."
    },
    {
      "heading": "Warm-up Examples (same template)",
      "code": "size(node)   = node is null ? 0 : 1 + size(node.left) + size(node.right)\n\nsum(node)    = node is null ? 0 : node.val + sum(node.left) + sum(node.right)\n\nmaxVal(node) = node is null ? -infinity\n                            : max(node.val, maxVal(node.left), maxVal(node.right))\n\nheight(node) = node is null ? 0 : 1 + max(height(node.left), height(node.right))\n\ninvert(node):                        // mirror image\n    if node is null: return null\n    left  = invert(node.left)\n    right = invert(node.right)\n    node.left  = right               // swap\n    node.right = left\n    return node"
    },
    {
      "heading": "Bottom-Up vs Top-Down",
      "body": "\n      <table>\n        <tr><th></th><th>Bottom-Up (Post-order style)</th><th>Top-Down (Pre-order style)</th></tr>\n        <tr><td>Info ka flow</td><td>Children se parent ki taraf — <strong>return value</strong> ke through</td><td>Parent se children ki taraf — <strong>parameters</strong> ke through</td></tr>\n        <tr><td>Kab</td><td>Answer subtrees ke answers par depend kare</td><td>Answer upar ke context (depth, bounds, remaining sum) par depend kare</td></tr>\n        <tr><td>Examples</td><td>Height, size, diameter, balanced check, LCA, max path sum</td><td>Depth tracking, root-to-leaf path sum (remaining target), Validate BST (min/max bounds), Good Nodes (max so far)</td></tr>\n        <tr><td>Shape</td><td><code>l = f(left); r = f(right); return combine(l, r)</code></td><td><code>f(node, extra); … f(node.left, newExtra); f(node.right, newExtra)</code></td></tr>\n      </table>",
      "note": "Kai problems dono ka mix hote hain: top-down parameter + bottom-up return. Jaise Validate BST: bounds neeche jaate hain, true/false upar aata hai."
    },
    {
      "heading": "Return Value ≠ Final Answer (Important Trap)",
      "body": "\n      <ul>\n        <li>Kuch problems me function jo cheez <em>return</em> karta hai aur jo cheez <em>final answer</em> hai, wo <strong>alag</strong> hoti hain. Examples: <strong>Diameter</strong> (return = height, answer = max of left+right), <strong>Max Path Sum</strong> (return = ek taraf ka best chain, answer = dono taraf ka chain), <strong>Longest Univalue Path</strong>.</li>\n        <li>Wajah: jo path kisi node pe \"mud\" jaata hai (dono taraf jaata hai) wo parent ko extend nahi ho sakta — parent ko sirf ek taraf ka seedha chain diya ja sakta hai.</li>\n        <li>Isliye answer ko ek outer/global variable (<code>best</code>) me update karte rehte hain, aur return me parent ke kaam ki cheez dete hain.</li>\n      </ul>",
      "code": "best = 0                                // outer variable — final answer yahan jama hota hai\n\nfunction dfs(node):\n    if node is null: return 0\n    l = dfs(node.left)\n    r = dfs(node.right)\n    best = max(best, l + r)             // ANSWER: yeh node 'turning point' ho sakta hai\n    return 1 + max(l, r)                // RETURN: parent ko sirf ek taraf ka lamba rasta",
      "note": "Detail me: Height & Diameter (topic 26). Test cases ke beech outer variable ko reset karna mat bhoolna — function ke andar define karo ya har call pe 0 karo."
    },
    {
      "heading": "Null / Leaf Gotchas",
      "body": "\n      <ul>\n        <li><strong>Null check sabse pehle</strong> — warna <code>node.left</code> pe crash.</li>\n        <li><strong>Leaf ≠ null</strong> — leaf wo node hai jiske <em>dono</em> children null hon. \"Root-to-leaf path\" problems me check <code>node.left == null and node.right == null</code> pe karo, null pe nahi (warna ek-child wale node ko galti se leaf maan loge).</li>\n        <li><strong>Min Depth trap</strong> — ek child null ho to <code>min(0, x)</code> mat lo; null side ko ignore karke doosri side lo.</li>\n        <li><strong>Empty tree</strong> (root = null) ek valid input hai — hamesha handle karo.</li>\n      </ul>"
    },
    {
      "heading": "Common Problems → Pattern Mapping",
      "body": "\n      <table>\n        <tr><th>Problem</th><th>Subtree se kya milta hai</th><th>Root pe combine</th></tr>\n        <tr><td>Max Depth / Height</td><td>Left height, right height</td><td>1 + max(l, r)</td></tr>\n        <tr><td>Count Nodes / Sum</td><td>Left count/sum, right count/sum</td><td>1 + l + r  (ya val + l + r)</td></tr>\n        <tr><td>Same Tree / Symmetric</td><td>Left/right me match hua ya nahi</td><td>val barabar AND l AND r</td></tr>\n        <tr><td>Invert Tree</td><td>Inverted left, inverted right</td><td>Dono ko swap karke attach</td></tr>\n        <tr><td>Balanced Tree</td><td>Height (ya −1 agar imbalance)</td><td>abs(l − r) &lt;= 1 AND dono balanced</td></tr>\n        <tr><td>Diameter</td><td>Left height, right height</td><td>best = max(best, l + r); return 1 + max(l, r)</td></tr>\n        <tr><td>LCA</td><td>Left me p/q mila?, right me mila?</td><td>Dono taraf mile → yahi node; warna jo non-null</td></tr>\n        <tr><td>Path Sum (top-down)</td><td>Remaining sum neeche pass hota hai</td><td>Leaf pe remaining == val</td></tr>\n        <tr><td>Validate BST (top-down)</td><td>Allowed range (lo, hi) neeche pass hoti hai</td><td>lo &lt; val &lt; hi AND l AND r</td></tr>\n        <tr><td>Max Path Sum</td><td>Left gain, right gain (negative ho to 0)</td><td>best = max(best, val + l + r); return val + max(l, r)</td></tr>\n      </table>"
    },
    {
      "heading": "Complexity & Limits",
      "body": "\n      <ul>\n        <li><strong>Time</strong> — O(n): har node pe constant kaam, har node ek baar.</li>\n        <li><strong>Space</strong> — O(h): balanced me O(log n), skewed me O(n).</li>\n        <li>JS ka recursion limit ~10<sup>4</sup> frames ke aas-paas hota hai — bahut deep (skewed) tree pe stack overflow; tab iterative (explicit stack) ya BFS use karo.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Invert Binary Tree",
      "pseudocode": "function invertTree(node):\n    if node is null: return null\n    left  = invertTree(node.left)\n    right = invertTree(node.right)\n    node.left  = right\n    node.right = left\n    return node"
    },
    {
      "title": "Same Tree",
      "pseudocode": "function isSameTree(p, q):\n    if p is null and q is null: return true        // dono khatam\n    if p is null or q is null:  return false       // ek khatam, ek nahi\n    if p.val != q.val:          return false\n    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)"
    },
    {
      "title": "Symmetric Tree (Mirror Check)",
      "pseudocode": "function isSymmetric(root):\n    return root is null or isMirror(root.left, root.right)\n\nfunction isMirror(a, b):\n    if a is null and b is null: return true\n    if a is null or b is null:  return false\n    return a.val == b.val\n       and isMirror(a.left,  b.right)              // bahar wale jode\n       and isMirror(a.right, b.left)               // andar wale jode"
    },
    {
      "title": "Path Sum (Root-to-Leaf) — Top-Down",
      "pseudocode": "function hasPathSum(node, target):\n    if node is null: return false\n    if node.left is null and node.right is null:     // leaf\n        return node.val == target\n    remaining = target - node.val\n    return hasPathSum(node.left, remaining) or hasPathSum(node.right, remaining)"
    },
    {
      "title": "Binary Tree Maximum Path Sum (Return ≠ Answer)",
      "pseudocode": "best = -infinity\n\nfunction gain(node):\n    if node is null: return 0\n    l = max(0, gain(node.left))          // negative gain ko ignore (0 le lo)\n    r = max(0, gain(node.right))\n    best = max(best, node.val + l + r)   // yahan path 'mud' sakta hai (dono taraf)\n    return node.val + max(l, r)          // parent ko sirf ek taraf ka chain\n\ngain(root)\nreturn best                              // [-10, 9, 20, null, null, 15, 7] → 42"
    }
  ]
});
