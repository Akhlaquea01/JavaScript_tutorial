// Binary Search Tree — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  // A BST built by inserting the values one after another (node id = insertion order).
  const buildBST = (vals) => {
    let root = null;
    vals.forEach((v, i) => {
      const node = { id: i, val: v, left: null, right: null };
      if (!root) {
        root = node;
        return;
      }
      let cur = root;
      for (;;) {
        if (v < cur.val) {
          if (!cur.left) { cur.left = node; break; }
          cur = cur.left;
        } else {
          if (!cur.right) { cur.right = node; break; }
          cur = cur.right;
        }
      }
    });
    return root;
  };

  // delete shown in the notes and verified by `node DSA-Learn/check.js` through `checks` below
  const DELETE_CODE = {
    fn: "deleteNode",
    lines: [
      `function deleteNode(node, key) {`,
      [`  if (node === null) return null;`, "Key not found: nothing to delete."],
      [`  if (key < node.val) node.left = deleteNode(node.left, key);`, "Search for the key like a normal BST lookup."],
      [`  else if (key > node.val) node.right = deleteNode(node.right, key);`, ""],
      `  else {`,
      [`    if (node.left === null) return node.right;`, "**Leaf or only a right child:** replace the node by its right child (which is `null` for a leaf)."],
      [`    if (node.right === null) return node.left;`, "**Only a left child:** replace the node by it."],
      [`    let succ = node.right;`, "**Two children:** find the in-order successor, the smallest value in the right subtree..."],
      [`    while (succ.left !== null) succ = succ.left;`, "...by going left as far as possible."],
      [`    node.val = succ.val;`, "Copy the successor's value into this node."],
      [`    node.right = deleteNode(node.right, succ.val);`, "Then delete the successor node from the right subtree (it has at most one child)."],
      `  }`,
      [`  return node;`, "Return the (possibly changed) root of this subtree."],
      `}`
    ]
  };
  const BIG = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "bst",
    group: "trees",
    emoji: "🔍",
    title: "Binary Search Tree (BST)",
    tagline: "A binary tree with one ordering rule: everything in the left subtree is smaller, everything in the right is bigger. That makes search, insert and delete as fast as binary search, as long as the tree stays balanced.",
    level: "Core",
    needs: ["trees-intro", "binary-search", "tree-dfs-traversals"],

    gist: [
      "**BST rule:** for **every** node, *all* values in the left subtree are **smaller** and *all* values in the right subtree are **bigger** (whole subtrees, not just the children).",
      "Search, insert and delete walk **one path** from the root: **O(h)**. Balanced: O(log n). Fed sorted data, a plain BST becomes a chain: O(n).",
      "**In-order traversal gives the values sorted.** That powers *k-th smallest*, validation, iterators and range queries.",
      "To **validate** a BST, check each node against an allowed **(low, high)** range, not just against its two children."
    ],

    complexity: {
      time: "O(h): O(log n) balanced, O(n) skewed",
      space: "O(h)",
      why: [
        "Each comparison throws away a whole subtree, exactly like binary search. Search, insert and delete follow a single root-to-leaf path, so they cost O(h) where h is the height. A balanced tree has h ≈ log n.",
        "But the shape depends on insertion order. Inserting 1, 2, 3, 4, 5 in order gives a chain of height n, so every operation becomes O(n). That is why self-balancing trees (AVL, red-black) exist, and why shuffled input is safer.",
        "Recursion uses O(h) stack, so O(log n) balanced and O(n) skewed. An iterative search needs only O(1)."
      ],
      more: [
        {
          type: "table",
          heading: "Balanced vs skewed",
          columns: ["Operation", "Balanced (h ≈ log n)", "Skewed (h = n)"],
          rows: [
            ["Search", "O(log n)", "O(n)"],
            ["Insert", "O(log n)", "O(n)"],
            ["Delete", "O(log n)", "O(n)"],
            ["Min / max", "O(log n)", "O(n)"],
            ["In-order traversal", "O(n)", "O(n)"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "A **binary search tree** is a binary tree that keeps its values in order. The rule is strict: at every node, **everything in the left subtree is smaller and everything in the right subtree is bigger**. It is binary search turned into a linked structure.",
        "To **search**, compare with the current node: smaller → go left, bigger → go right, equal → found. You discard half of what is left (if the tree is balanced), like binary search. To **insert**, search the same way until you fall off the tree at a `null`; that empty spot is exactly where the new value belongs, so the new node becomes a leaf there. Existing nodes never move.",
        "The golden property: an **in-order traversal** (left, node, right) visits the values in **sorted** order. Many BST questions are answered by in-order: k-th smallest, “is this a valid BST?”, turn the tree into a sorted list."
      ],
      signals: [
        "“Search / insert / delete in **sorted** dynamic data”, floor, ceiling, range queries.",
        "“**k-th smallest**”, “inorder successor / predecessor”, “range sum of values between L and R”.",
        "“**Validate** a binary search tree”, “convert a sorted array to a balanced BST”.",
        "A problem says the tree is a BST: use the ordering to prune whole subtrees."
      ],
      notFor: [
        "Only exact lookups, no order: a **hash map** is simpler and O(1).",
        "Only the min or max repeatedly: a **heap** is simpler.",
        "Static sorted data: a **sorted array** with binary search is simpler and more compact."
      ],
      more: [
        {
          type: "table",
          heading: "Deleting a node: three cases",
          columns: ["Case", "What to do"],
          rows: [
            ["**Leaf** (no children)", "Remove it: the parent's link becomes `null`"],
            ["**One child**", "Replace the node with that child: the parent now points straight to the child"],
            ["**Two children**", "Copy the **in-order successor** (smallest value in the right subtree) into the node, then delete that successor from the right subtree. (Symmetric: the predecessor, the largest value in the left subtree)"]
          ]
        },
        { type: "code", title: "Delete (verified code)", code: DELETE_CODE },
        {
          type: "points",
          heading: "Min, max, successor, predecessor",
          items: [
            "**Min** = go left as far as possible. **Max** = go right as far as possible. Both O(h).",
            "**In-order successor** (next bigger): if the node has a right subtree, its minimum; otherwise the lowest ancestor for which this node lies in its *left* subtree.",
            "**Predecessor** is the mirror image. **Floor / ceil**: search while remembering the best candidate seen."
          ]
        },
        {
          type: "table",
          heading: "BST vs hash map vs sorted array",
          columns: ["Operation", "BST (balanced)", "Hash map", "Sorted array"],
          rows: [
            ["Search", "O(log n)", "O(1) average", "O(log n)"],
            ["Insert", "O(log n)", "O(1) average", "O(n) shifting"],
            ["Delete", "O(log n)", "O(1) average", "O(n)"],
            ["Sorted iteration", "O(n) in-order", "O(n log n) sort first", "O(n)"],
            ["Floor / ceil / range", "O(log n + k)", "O(n)", "O(log n + k)"]
          ]
        },
        {
          type: "points",
          heading: "How to keep it balanced",
          items: [
            "Use a **self-balancing** tree: AVL or red-black (rotations keep h ≈ log n; Java `TreeMap` is one).",
            "Build from a **sorted array** by taking the middle element as the root and recursing on both halves.",
            "Insert in **shuffled** order: the expected height is O(log n).",
            "In interviews say “O(h)” and state whether you assume balance or the O(n) worst case."
          ]
        }
      ]
    },

    analogy: {
      title: "A guessing game with “higher or lower”",
      story: [
        "Imagine a signpost at every junction of a path network. Each post shows a number and points left for **smaller** numbers and right for **bigger** ones. To find the house number 37 you start at the first post (say 50): 37 is smaller, go left. The next post says 30: 37 is bigger, go right. And so on, discarding a whole side at every post.",
        "To **add** a new house you walk the same route until you reach a spot where the sign points to nothing, and build the house right there. Houses already built never move. If everyone arrives in increasing order (1, 2, 3, ...), every new house is added further right and the network becomes one long straight road: finding the last house means walking past all of them."
      ],
      map: [
        ["A post with a number", "A node"],
        ["Smaller numbers to the left, bigger to the right", "The BST rule"],
        ["Walking to the next post", "Comparing and moving to `left` / `right`"],
        ["Building a house where the sign points to nothing", "Inserting at the first `null`"],
        ["Houses arriving in increasing order", "Sorted insertion: a skewed tree"],
        ["Reading the numbers from the leftmost post to the rightmost", "In-order traversal (sorted)"]
      ],
      breaks: "A real road network can have loops and shortcuts. A BST has exactly one path to every node, which is what makes the left / right decision always unambiguous."
    },

    demos: [
      {
        id: "insert",
        title: "Build a BST by inserting values one at a time",
        intro: "Each new value walks down from the root: **smaller → left, bigger → right**, until it reaches an empty spot, where it becomes a leaf. Faded nodes are not inserted yet. Try inserting `1, 2, 3, 4, 5` to see a chain.",
        codeIntro: "Inserts values into a BST and returns the root. (Each `insert` call walks one path.)",
        viz: "tree",
        legend: [["cur", "node being compared"], ["mark", "on the path so far"], ["good", "newly inserted node"]],
        inputs: [{ type: "numlist", name: "values", label: "Insert in this order (all different)", value: [8, 3, 10, 1, 6, 14, 4], len: [3, 9], min: 1, max: 30, unique: true }],
        scene: (inp) => ({ tree: buildBST(inp.values) }),
        frames(inp, snap) {
          const vals = inp.values;
          const root = buildBST(vals);
          const nodes = new Map(DSA.util.tree.nodes(root).map((n) => [n.id, n]));
          const allIds = [...nodes.keys()];
          let inserted = -1;
          const view = (i, tone, path, extra) =>
            Object.assign({ tone, path, hide: allIds.filter((id) => id > inserted), boxes: [{ label: "still to insert", kind: "list", items: vals.slice(i + 1).map((v) => ({ v })) }] }, extra);

          vals.forEach((v, i) => {
            if (i === 0) {
              inserted = 0;
              snap(view(0, { 0: "good" }, [0], { at: ["loop", "base"], say: "The tree is empty (`null`), so **" + v + "** simply becomes the **root**." }));
              return;
            }
            let cur = root;
            const path = [];
            for (;;) {
              path.push(cur.id);
              const goLeft = v < cur.val;
              const next = goLeft ? cur.left : cur.right;
              const exists = next && next.id < i;
              const tone = {};
              path.forEach((id) => (tone[id] = "mark"));
              tone[cur.id] = "cur";
              if (exists) {
                snap(view(i, tone, path.slice(), { at: [goLeft ? "left" : "right"], say: "Insert **" + v + "**: compare with " + cur.val + ". " + v + (goLeft ? " < " : " > ") + cur.val + ", so go **" + (goLeft ? "left" : "right") + "**." }));
                cur = next;
              } else {
                snap(view(i, tone, path.slice(), { at: [goLeft ? "left" : "right"], say: "Insert **" + v + "**: " + v + (goLeft ? " < " : " > ") + cur.val + ", so go **" + (goLeft ? "left" : "right") + "**, and that side of " + cur.val + " is **empty** (`null`)." }));
                inserted = i;
                snap(view(i, { ...tone, [cur.id]: "mark", [i]: "good" }, path.concat([i]), { at: ["base"], say: "`insert(null, " + v + ")` creates a new node: **" + v + "** becomes the " + (goLeft ? "left" : "right") + " child of " + cur.val + ". No existing node moved." }));
                break;
              }
            }
          });
          const tokens = DSA.util.tree.toLevel(root);
          snap(view(vals.length - 1, {}, [], { at: ["done"], out: "BST: [" + tokens.map((x) => (x === null ? "null" : x)).join(", ") + "]", say: "All values are inserted. The shape depends on the **order** of insertion. The in-order reading is sorted: **" + [...vals].sort((a, b) => a - b).join(", ") + "**.", result: tokens }));
        },
        code: {
          fn: "buildBST",
          lines: [
            `function insert(node, val) {`,
            [`  if (node === null) return { val, left: null, right: null };`, "Fell off the tree: this empty spot is exactly where the new value belongs. Create a leaf.", "base"],
            [`  if (val < node.val) node.left = insert(node.left, val);`, "Smaller: it belongs somewhere in the left subtree.", "left"],
            [`  else if (val > node.val) node.right = insert(node.right, val);`, "Bigger: the right subtree. (Equal values are ignored: no duplicates.)", "right"],
            [`  return node;`, "Hand back this node, so the parent keeps its link.", "ret"],
            `}`,
            ``,
            `function buildBST(values) {`,
            [`  let root = null;`, "", "loop"],
            [`  for (const v of values) root = insert(root, v);`, "Insert the values one after another.", "loop"],
            [`  return root;`, "", "done"],
            `}`
          ]
        },
        call: (fn, inp) => DSA.util.tree.toLevel(fn(inp.values))
      },

      {
        id: "validate",
        title: "Validate a BST: pass an allowed range down",
        intro: "It is **not enough** to compare a node with its two children. Every node must fit a range `(low, high)` set by **all its ancestors**. Badges show the allowed range. The default tree looks fine locally but hides a violation: 3 is in the right subtree of 5.",
        codeIntro: "Returns `true` if the tree is a valid BST (strictly smaller on the left, strictly bigger on the right).",
        viz: "tree",
        legend: [["cur", "node being checked"], ["mark", "on the current path"], ["good", "inside its range"], ["bad", "outside its range"]],
        inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "5,1,6,null,null,3,7", maxNodes: 9, maxTokens: 15 }],
        scene: (inp) => ({ tree: inp.tree }),
        frames(inp, snap) {
          const stack = [];
          const done = new Set();
          const badge = {};
          const fmt = (x) => (x === -Infinity ? "−∞" : x === Infinity ? "∞" : x);
          const tones = (cur) => {
            const t = {};
            stack.forEach((i) => (t[i] = "mark"));
            done.forEach((i) => (t[i] = "good"));
            if (cur !== null) t[cur] = "cur";
            return t;
          };
          const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge } }, extra);
          let failed = null;

          const ok = (node, low, high) => {
            if (node === null) return true;
            stack.push(node.id);
            badge[node.id] = "(" + fmt(low) + ", " + fmt(high) + ")";
            const bad = node.val <= low || node.val >= high;
            if (bad) {
              failed = node;
              snap(view(node.id, {
                at: ["check"],
                tone: { ...tones(null), [node.id]: "bad" },
                say: "**" + node.val + "** must lie strictly between " + fmt(low) + " and " + fmt(high) + ", but it does not (" + (node.val <= low ? node.val + " ≤ " + fmt(low) : node.val + " ≥ " + fmt(high)) + "). **Not a valid BST.** Return false straight up the chain."
              }));
              return false;
            }
            snap(view(node.id, { at: ["check"], say: "**" + node.val + "** must lie between " + fmt(low) + " and " + fmt(high) + ": it does. Its left subtree gets the range (" + fmt(low) + ", " + node.val + "), its right subtree (" + node.val + ", " + fmt(high) + ")." }));
            if (!ok(node.left, low, node.val)) return false;
            if (!ok(node.right, node.val, high)) return false;
            done.add(node.id);
            stack.pop();
            snap(view(null, { at: ["call"], tone: { ...tones(null), [node.id]: "good" }, say: "Both subtrees of **" + node.val + "** are valid, so " + node.val + " is valid." }));
            return true;
          };
          const res = ok(inp.tree, -Infinity, Infinity);
          snap(view(null, {
            at: ["call"],
            tone: failed ? { ...tones(null), [failed.id]: "bad" } : tones(null),
            path: failed ? stack.slice() : [],
            out: res ? "Valid BST" : "Not a valid BST (" + failed.val + " breaks its range)",
            outTone: res ? undefined : "bad",
            say: res ? "Every node fit its range, so this **is a valid BST**." : "Looking only at parents and children would have missed it: **" + failed.val + "** is on the wrong side of an ancestor higher up.",
            result: res
          }));
        },
        code: {
          fn: "isValidBST",
          lines: [
            `function isValidBST(node, low = -Infinity, high = Infinity) {`,
            [`  if (node === null) return true;`, "An empty tree is a valid BST.", "base"],
            [`  if (node.val <= low || node.val >= high) return false;`, "Outside the range allowed by the ancestors: invalid. Use `<=` and `>=` so duplicates are rejected.", "check"],
            [`  return isValidBST(node.left, low, node.val) && isValidBST(node.right, node.val, high);`, "Going left, nothing may exceed this node (`high = node.val`). Going right, nothing may be below it (`low = node.val`).", "call"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.tree)
      }
    ],

    checks: [
      {
        code: DELETE_CODE,
        tests: [
          { args: [{ tree: BIG }, 3], expect: [8, 4, 10, 1, 6, null, 14, null, null, null, 7, 13], out: "tree" },
          { args: [{ tree: BIG }, 1], expect: [8, 3, 10, null, 6, null, 14, 4, 7, 13], out: "tree" },
          { args: [{ tree: BIG }, 14], expect: [8, 3, 10, 1, 6, null, 13, null, null, 4, 7], out: "tree" },
          { args: [{ tree: BIG }, 8], expect: [10, 3, 14, 1, 6, 13, null, null, null, 4, 7], out: "tree" },
          { args: [{ tree: BIG }, 99], expect: BIG, out: "tree" }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Validating a BST by comparing each node only with its immediate children",
        why: "A node deep in the right subtree can still be smaller than the root. Local checks pass, yet the tree is not a BST.",
        fix: "Pass an allowed `(low, high)` range down, or check that the in-order values are strictly increasing."
      },
      {
        oops: "Using `Number.MIN_VALUE` / `Integer.MIN_VALUE` as the initial bound",
        why: "A node in the tree could legitimately hold that value, and `Number.MIN_VALUE` in JavaScript is a tiny *positive* number.",
        fix: "Use `-Infinity` and `Infinity` (or `null`) as the starting bounds."
      },
      {
        oops: "Forgetting that sorted insertion degrades the tree to a list",
        why: "Inserting 1, 2, 3, … makes every node the right child of the previous one: height n and O(n) operations.",
        fix: "Shuffle first, build from a sorted array via the middle element, or use a balanced tree."
      },
      {
        oops: "Deleting a node with two children by just removing it",
        why: "Both subtrees would be orphaned. The tree would split in two.",
        fix: "Replace its value with the in-order successor (or predecessor) and delete that node instead."
      },
      {
        oops: "Ignoring duplicates",
        why: "The BST rule is ambiguous for equal values, and different problems treat them differently.",
        fix: "Ask: reject duplicates, always send them to one side, or store a count in the node."
      }
    ],

    remember: {
      mnemonic: "Smaller left, bigger right, whole subtrees. In-order = sorted. Validate with a range.",
      rules: [
        "Search / insert / delete walk **one path**: O(h).",
        "**Inorder is sorted.** Use it for k-th smallest, validation, iterators.",
        "Validate with `(low, high)` bounds, never just parent-child checks.",
        "Delete: leaf → remove; one child → bypass; two children → copy the successor, delete it.",
        "Balanced ⇒ O(log n); sorted input into a plain BST ⇒ O(n)."
      ],
      template: {
        lines: [
          [`function search(node, target) {`, ""],
          [`  while (node !== null) {`, ""],
          [`    if (target === node.val) return node;`, "Found."],
          [`    node = target < node.val ? node.left : node.right;`, "Smaller → left, bigger → right: discard a whole side."],
          `  }`,
          [`  return null;`, "Fell off the tree: not present."],
          `}`
        ]
      },
      more: [
        {
          type: "text",
          text: "**More in-order tricks:** BST Iterator (run the in-order walk lazily with a stack: `next()` is O(1) amortised); Two Sum in a BST (in-order list + two pointers); **range sum** with pruning (skip a whole subtree that lies outside `[lo, hi]`). Your own files: `Problems/Tree/binarySearchTree.js` (iterative insert / search, recursive delete)."
        }
      ]
    },

    practice: {
      title: "Kth Smallest Element in a BST",
      level: "Medium",
      problem: "Given the root of a BST and an integer `k` (1-based), return the **k-th smallest** value in the tree.",
      examples: [
        { input: "root = [3, 1, 4, null, 2], k = 1", output: "1" },
        { input: "root = [5, 3, 6, 2, 4, null, null, 1], k = 3", output: "3", why: "In sorted order the values are 1, 2, 3, 4, 5, 6." }
      ],
      hints: [
        "An in-order traversal of a BST visits the values in **sorted order**. So the k-th value you visit is the answer.",
        "Use the iterative in-order walk with an explicit stack: dive left pushing nodes, pop, count, then go right.",
        "Decrement `k` each time you pop a node. When `k` hits 0, return that node's value. You can stop early, with no need to visit the rest."
      ],
      solution: {
        explain: [
          "Iterative in-order: push the left spine, pop a node (it is the next smallest), count it, then move to its right subtree. Stopping at the k-th pop avoids walking the whole tree.",
          "Time O(h + k), space O(h)."
        ],
        code: {
          fn: "kthSmallest",
          lines: [
            `function kthSmallest(root, k) {`,
            [`  const stack = [];`, "Nodes we passed but have not visited yet."],
            [`  let curr = root;`, ""],
            [`  while (curr !== null || stack.length > 0) {`, "Until there is nothing left to visit."],
            [`    while (curr !== null) { stack.push(curr); curr = curr.left; }`, "Dive left: the smallest values are on the left."],
            [`    curr = stack.pop();`, "The next node in sorted order."],
            [`    k--;`, "One more value counted."],
            [`    if (k === 0) return curr.val;`, "This is the k-th smallest: stop early."],
            [`    curr = curr.right;`, "Then everything bigger than this node but smaller than its ancestors."],
            `  }`,
            [`  return -1;`, "k is larger than the tree size."],
            `}`
          ]
        }
      },
      tests: [
        { args: [{ tree: [3, 1, 4, null, 2] }, 1], expect: 1 },
        { args: [{ tree: [5, 3, 6, 2, 4, null, null, 1] }, 3], expect: 3 },
        { args: [{ tree: [5, 3, 6, 2, 4, null, null, 1] }, 1], expect: 1 },
        { args: [{ tree: [2, 1, 3] }, 2], expect: 2 },
        { args: [{ tree: [1] }, 1], expect: 1 },
        { args: [{ tree: [5, 3, 6, 2, 4, null, null, 1] }, 6], expect: 6 }
      ]
    },

    recall: [
      { q: "What is the BST property?", a: "For every node, all values in its left subtree are smaller and all values in its right subtree are bigger (entire subtrees, not just children)." },
      { q: "Why are search / insert / delete O(h) and when is that O(n)?", a: "They follow one root-to-leaf path. h is about log n when balanced, but n when the tree is a chain (for example after inserting sorted data into a plain BST)." },
      { q: "What does an in-order traversal of a BST produce?", a: "The values in sorted (ascending) order." },
      { q: "How do you delete a node with two children?", a: "Copy the in-order successor (smallest in the right subtree) into the node, then delete that successor from the right subtree." },
      { q: "What is the right way to validate a BST?", a: "Pass an allowed `(low, high)` range down (or check that in-order values strictly increase). Comparing only with the children is wrong." }
    ],

    related: {
      topics: ["binary-search", "tree-dfs-traversals", "tree-lca", "tree-types-overview", "heap", "hashmap"],
      files: ["Problems/Tree/binarySearchTree.js", "Problems/Tree/avlTree.js", "Problems/Tree/redBlackTree.js"]
    }
  });
})();
