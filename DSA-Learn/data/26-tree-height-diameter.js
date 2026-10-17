// Height, max depth & diameter — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "tree-height-diameter",
  group: "trees",
  emoji: "📏",
  title: "Height, Max Depth & Diameter",
  tagline: "How tall is the tree, and what is the longest path between any two nodes? One post-order walk answers both in O(n).",
  level: "Core",
  needs: ["tree-recursion-pattern"],

  gist: [
    "**Height / max depth** = `1 + max(leftHeight, rightHeight)`, with `0` for an empty tree (counting nodes).",
    "**Diameter** = the longest path between *any* two nodes. It does not have to pass through the root. At each node the longest path through it is `leftHeight + rightHeight`.",
    "**Return ≠ answer:** the function **returns the height** (what the parent needs) but **records the diameter** in an outer variable.",
    "Do it in **one** post-order DFS, O(n). Computing height again at every node would be O(n²)."
  ],

  complexity: {
    time: "O(n)",
    space: "O(h)",
    why: [
      "The optimised version visits each node exactly once and does a constant amount of work in it (two lookups, one comparison), so it is O(n). The stack holds up to h calls (h = height).",
      "The naive diameter calls `height()` at every node, and each of those calls walks a whole subtree again. On a skewed tree that adds up to about n² / 2 steps: O(n²). Computing the height and the diameter in the same walk removes the repeated work."
    ],
    more: [
      {
        type: "table",
        heading: "Costs",
        columns: ["Task", "Time", "Space"],
        rows: [
          ["Height / max depth / min depth", "O(n)", "O(h)"],
          ["Diameter (one walk)", "O(n)", "O(h)"],
          ["Diameter (height at every node)", "O(n²) worst", "O(h)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "The **height** of a tree is how many levels it has. A node's height is one more than the taller of its two children, so it is a perfect bottom-up recursion: ask both children, take the larger, add one. An empty tree has height 0 (when counting nodes).",
      "The **diameter** is the length of the longest path between any two nodes (measured in edges). The path does not have to touch the root: it can bend at some node lower down. If you pick a node as the *turning point*, the longest path through it goes down the taller side on the left and the taller side on the right, which is exactly `leftHeight + rightHeight`. The diameter is the best value of that over **all** nodes.",
      "The neat trick: while computing heights anyway, update a variable `best = max(best, l + r)` at every node. The function *returns* the height (the parent needs a single chain it can extend) while the *answer* collects in `best`. One walk, O(n)."
    ],
    signals: [
      "“**Maximum depth**”, “height of the tree”, “how many levels”.",
      "“**Longest path** between any two nodes” (diameter), “longest path with the same value”, “maximum path sum”.",
      "“Is the tree **height-balanced**?” (heights of the two sides differ by at most 1).",
      "“**Minimum depth**”: the nearest *leaf*."
    ],
    notFor: [
      "Level-by-level questions where you also need every level's contents: use BFS.",
      "Very deep trees where recursion might overflow: use an iterative DFS or BFS (count levels)."
    ],
    more: [
      {
        type: "table",
        heading: "Same skeleton, different combine",
        columns: ["Problem", "Function returns", "Outer answer"],
        rows: [
          ["Diameter of a binary tree", "Height", "`max(l + r)`"],
          ["Balanced binary tree", "Height, or −1 if an imbalance was found", "none: −1 travels upward"],
          ["Maximum path sum", "Best one-sided chain (a negative one counts as 0)", "`max(val + l + r)`"],
          ["Longest univalue path", "One-sided chain of equal values", "`max(leftChain + rightChain)`"],
          ["Diameter of an n-ary tree", "Height", "Sum of the two tallest child heights"]
        ]
      },
      {
        type: "callout",
        kind: "warning",
        text: "**Nodes or edges?** Max depth on LeetCode counts **nodes** (empty = 0, leaf = 1). Many textbooks count **edges** (empty = −1, leaf = 0). The diameter is usually asked in **edges**: with heights in nodes, `l + r` is already the edge count. Always confirm."
      },
      {
        type: "callout",
        kind: "warning",
        text: "**Minimum depth trap:** it is the distance to the nearest **leaf**, not the nearest `null`. If a node has only one child, you must go down that child. Taking `1 + min(left, right)` blindly returns 1 for a chain like 1 → 2 → 3 (the missing side counts as 0)."
      }
    ]
  },

  analogy: {
    title: "The longest hallway in a branching building",
    story: [
      "Imagine a building whose corridors branch like a tree. The **height** is the longest walk from the front door to a dead end: at each junction you ask both corridors how far they go and report one more than the longer one.",
      "The **diameter** is different: the longest walk between *any two dead ends*, which may never pass the front door. Standing at a junction, the longest walk that *turns around* here is “longest corridor on my left” plus “longest corridor on my right”. You check this at every junction while reporting heights, and remember the best.",
      "When you report to your parent you only mention the longer single corridor below you, never the bent route, because the parent can only extend a straight chain."
    ],
    map: [
      ["Longest walk from the door to a dead end", "Height / max depth"],
      ["Asking each corridor how far it goes", "`height(node.left)`, `height(node.right)`"],
      ["Longest walk between any two dead ends", "Diameter"],
      ["A junction where the route turns around", "A “turning point” node: `l + r`"],
      ["Reporting only the longer single corridor upward", "`return 1 + max(l, r)`"],
      ["Remembering the best bent route seen", "The outer variable `best`"]
    ],
    breaks: "In a building you can see the whole floor plan. The recursion only ever sees one node and the numbers its children return, which is why the “remember the best” variable is needed."
  },

  demos: [
    {
      id: "diameter",
      title: "Diameter in one walk: return the height, record the best",
      intro: "Every node reports its **height** upward (badge `h`). At the same time each node checks `l + r`, the longest path that turns at that node, and updates **best**. At the end the diameter path is lit up. Try `1,2,null,3,4,5,null,null,6`: the longest path bends at node 2, not the root.",
      codeIntro: "Returns the diameter in **edges**.",
      viz: "tree",
      legend: [["cur", "node being solved"], ["mark", "waiting for children"], ["good", "finished (badge = height)"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const stack = [];
        const done = new Set();
        const badge = {};
        const heights = new Map();
        let best = 0;
        let bestNode = null;
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = "good"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge }, vars: { best } }, extra);

        const height = (node) => {
          if (node === null) return 0;
          stack.push(node.id);
          snap(view(node.id, { at: ["left", "right"], say: "At **" + node.val + "**: first get the height of the left side, then of the right side." }));
          const l = height(node.left);
          const r = height(node.right);
          const h = 1 + Math.max(l, r);
          heights.set(node.id, h);
          const improved = l + r > best;
          if (improved) {
            best = l + r;
            bestNode = node;
          }
          badge[node.id] = "h=" + h;
          done.add(node.id);
          snap(view(node.id, {
            at: ["update", "ret"],
            tone: { ...tones(null), [node.id]: "good" },
            say: "Left height " + l + ", right height " + r + ". A path that **turns here** has " + l + " + " + r + " = **" + (l + r) + "** edges" + (improved ? ", a new record: **best = " + best + "**." : ", not better than best (" + best + ").") + " Return the height **" + h + "** (= 1 + the taller side) to the parent."
          }));
          stack.pop();
          return h;
        };
        height(inp.tree);

        // light up one longest path: down the taller side from the turning point, both ways
        const path = new Set();
        const downTaller = (n) => {
          while (n) {
            path.add(n.id);
            const hl = n.left ? heights.get(n.left.id) : 0;
            const hr = n.right ? heights.get(n.right.id) : 0;
            n = hl === 0 && hr === 0 ? null : hl >= hr ? n.left : n.right;
          }
        };
        if (bestNode) {
          path.add(bestNode.id);
          downTaller(bestNode.left);
          downTaller(bestNode.right);
        }
        snap(view(null, {
          at: ["call", "done"],
          tone: Object.fromEntries([...path].map((i) => [i, "good"])),
          path: [...path],
          out: "Diameter = " + best + " edges",
          say: "Every node has been a possible turning point. The best was **" + best + " edges** (lit up). It bends at **" + (bestNode ? bestNode.val : "the root") + "**" + (best > 0 && bestNode && bestNode.id !== inp.tree.id ? ", not at the root." : ".") + " One walk, O(n).",
          result: best
        }));
      },
      code: {
        fn: "diameterOfBinaryTree",
        lines: [
          `function diameterOfBinaryTree(root) {`,
          [`  let best = 0;`, "The **answer** collects here. It is not what the function returns.", "init"],
          `  function height(node) {`,
          [`    if (node === null) return 0;`, "Empty side: height 0 (counting nodes).", "base"],
          [`    const l = height(node.left);`, "Height of the left side.", "left"],
          [`    const r = height(node.right);`, "Height of the right side.", "right"],
          [`    best = Math.max(best, l + r);`, "If the path turned around **here**, it would have l + r edges. Keep the best over all nodes.", "update"],
          [`    return 1 + Math.max(l, r);`, "**Return the height** for the parent: only the taller straight chain can be extended.", "ret"],
          `  }`,
          [`  height(root);`, "One walk computes everything.", "call"],
          [`  return best;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree)
    },

    {
      id: "balanced",
      title: "Is it height-balanced? One walk with a −1 alarm",
      intro: "A tree is **balanced** if at every node the left and right heights differ by at most 1. Each call returns its height, or **−1** as an alarm if it found an imbalance. The alarm travels straight to the top, and the remaining work is skipped. Try `1,2,null,3`.",
      codeIntro: "Returns `true` if the tree is height-balanced.",
      viz: "tree",
      legend: [["cur", "node being solved"], ["mark", "waiting for children"], ["good", "balanced (badge = height)"], ["bad", "imbalance alarm (−1)"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,2,3,3,null,null,4,4", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const stack = [];
        const done = new Map();
        const badge = {};
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((ok, i) => (t[i] = ok ? "good" : "bad"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge } }, extra);
        const finish = (node, v) => {
          badge[node.id] = v === -1 ? "−1 ✗" : "h=" + v;
          done.set(node.id, v !== -1);
          stack.pop();
        };

        const check = (node) => {
          if (node === null) return 0;
          stack.push(node.id);
          snap(view(node.id, { at: ["left"], say: "At **" + node.val + "**: get the left height first." }));
          const l = check(node.left);
          if (l === -1) {
            finish(node, -1);
            snap(view(node.id, { at: ["leftcheck"], tone: { ...tones(null), [node.id]: "bad" }, say: "The left side returned **−1**, the imbalance alarm. Pass it straight up: there is no need to look at the right side." }));
            return -1;
          }
          const r = check(node.right);
          if (r === -1) {
            finish(node, -1);
            snap(view(node.id, { at: ["rightcheck"], tone: { ...tones(null), [node.id]: "bad" }, say: "The right side returned **−1**. Pass the alarm up." }));
            return -1;
          }
          if (Math.abs(l - r) > 1) {
            finish(node, -1);
            snap(view(node.id, { at: ["diff"], tone: { ...tones(null), [node.id]: "bad" }, say: "Heights are " + l + " (left) and " + r + " (right): they differ by **" + Math.abs(l - r) + "**, more than 1. **Not balanced here**: return the alarm **−1**." }));
            return -1;
          }
          const h = 1 + Math.max(l, r);
          finish(node, h);
          snap(view(node.id, { at: ["ret"], tone: { ...tones(null), [node.id]: "good" }, say: "Heights " + l + " and " + r + " differ by " + Math.abs(l - r) + " (at most 1): balanced here. Return the height **" + h + "**." }));
          return h;
        };
        const res = check(inp.tree);
        const ok = res !== -1;
        snap(view(null, { at: ["call"], tone: tones(null), path: [], out: ok ? "Balanced" : "Not balanced", outTone: ok ? undefined : "bad", say: ok ? "The root returned a real height (**" + res + "**), not −1, so **every node is balanced**." : "The alarm (−1) reached the root, so **the tree is not balanced**.", result: ok }));
      },
      code: {
        fn: "isBalanced",
        lines: [
          `function isBalanced(root) {`,
          `  function check(node) {`,
          [`    if (node === null) return 0;`, "Empty: height 0.", "base"],
          [`    const l = check(node.left);`, "Left height (or -1).", "left"],
          [`    if (l === -1) return -1;`, "Imbalance below: pass the alarm up without more work.", "leftcheck"],
          [`    const r = check(node.right);`, "Right height (or -1).", "right"],
          [`    if (r === -1) return -1;`, "", "rightcheck"],
          [`    if (Math.abs(l - r) > 1) return -1;`, "The sides differ too much: **raise the alarm**.", "diff"],
          [`    return 1 + Math.max(l, r);`, "Balanced here: report the height.", "ret"],
          `  }`,
          [`  return check(root) !== -1;`, "A real height means no alarm was raised anywhere.", "call"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree)
    },

    {
      id: "mindepth",
      title: "Minimum depth: aim for a leaf, not a null",
      intro: "Minimum depth is the number of nodes down to the **nearest leaf**. If a node has only one child, there is only one way down, so ignore the missing side. Try the chain `1,null,2,null,3`: the answer is 3, not 1.",
      codeIntro: "Returns the number of nodes on the shortest root-to-leaf path.",
      viz: "tree",
      legend: [["cur", "node being solved"], ["mark", "waiting for children"], ["good", "finished (badge = depth to nearest leaf)"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,null,2,null,3", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const stack = [];
        const done = new Set();
        const badge = {};
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = "good"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge } }, extra);
        const finish = (node, v, extra) => {
          badge[node.id] = "→ " + v;
          done.add(node.id);
          snap(view(node.id, Object.assign({ tone: { ...tones(null), [node.id]: "good" } }, extra)));
          stack.pop();
        };

        const min = (node) => {
          if (node === null) return 0;
          stack.push(node.id);
          if (node.left === null) {
            snap(view(node.id, { at: ["onlyright"], say: "**" + node.val + "** has no left child, so the only way down is right. **Ignore the empty side**: if we took min(0, ...) we would wrongly stop here." }));
            const r = min(node.right);
            finish(node, 1 + r, { at: ["onlyright"], say: node.right === null ? "**" + node.val + "** is a **leaf** (no children): depth 1 + 0 = **1**." : "Down the right side the nearest leaf is " + r + " node" + (r === 1 ? "" : "s") + " away, so **" + node.val + "** returns 1 + " + r + " = **" + (1 + r) + "**." });
            return 1 + r;
          }
          if (node.right === null) {
            snap(view(node.id, { at: ["onlyleft"], say: "**" + node.val + "** has no right child, so go left only." }));
            const l = min(node.left);
            finish(node, 1 + l, { at: ["onlyleft"], say: "Down the left side the nearest leaf is " + l + " node" + (l === 1 ? "" : "s") + " away, so **" + node.val + "** returns 1 + " + l + " = **" + (1 + l) + "**." });
            return 1 + l;
          }
          snap(view(node.id, { at: ["both"], say: "**" + node.val + "** has two children: ask both for their distance to a leaf." }));
          const l = min(node.left);
          const r = min(node.right);
          finish(node, 1 + Math.min(l, r), { at: ["both"], say: "Left " + l + ", right " + r + ": take the **smaller**. **" + node.val + "** returns 1 + min(" + l + ", " + r + ") = **" + (1 + Math.min(l, r)) + "**." });
          return 1 + Math.min(l, r);
        };
        const res = min(inp.tree);
        snap(view(null, { at: ["both"], tone: tones(null), path: [], out: "Minimum depth = " + res + " node" + (res === 1 ? "" : "s"), say: "The nearest leaf is **" + res + "** node" + (res === 1 ? "" : "s") + " from the root, counting the root.", result: res }));
      },
      code: {
        fn: "minDepth",
        lines: [
          `function minDepth(node) {`,
          [`  if (node === null) return 0;`, "Empty tree: 0 levels.", "base"],
          [`  if (node.left === null) return 1 + minDepth(node.right);`, "Only a right child (or none, which makes it a leaf): continue on the existing side. Do **not** let the missing side win with 0.", "onlyright"],
          [`  if (node.right === null) return 1 + minDepth(node.left);`, "Only a left child: continue left.", "onlyleft"],
          [`  return 1 + Math.min(minDepth(node.left), minDepth(node.right));`, "Two children: the nearer leaf wins.", "both"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree)
    }
  ],

  mistakes: [
    {
      oops: "Computing the diameter by calling `height()` at every node",
      why: "Each `height()` call walks a whole subtree again. On a lopsided tree that is O(n²).",
      fix: "Compute height and diameter in **one** walk: update `best` and return the height in the same function."
    },
    {
      oops: "Returning the diameter (or the bent path) to the parent",
      why: "The parent can only extend a straight chain below it. A path that turns at the child cannot be stretched further.",
      fix: "Return the height; keep the answer in an outer variable."
    },
    {
      oops: "Assuming the diameter passes through the root",
      why: "The longest path can bend at any node. Checking only the root misses it.",
      fix: "Evaluate `l + r` at **every** node."
    },
    {
      oops: "Minimum depth as `1 + min(left, right)` with no special case",
      why: "A missing child returns 0, which wins the `min`, so a chain 1 → 2 → 3 reports 1 instead of 3.",
      fix: "If one child is missing, use the other child's depth."
    },
    {
      oops: "Mixing node and edge counting",
      why: "A one-node tree has height 1 (nodes) or 0 (edges), and the diameter changes accordingly.",
      fix: "Decide the convention first (null → 0 for nodes, null → −1 for edges) and keep it throughout."
    }
  ],

  remember: {
    mnemonic: "Height = 1 + taller side. Diameter = best (left + right) at any node. Return the height, remember the best.",
    rules: [
      "Max depth: `null → 0`, `1 + max(l, r)` (nodes).",
      "Diameter (edges) = `max over nodes of (leftHeight + rightHeight)`, using heights in nodes.",
      "Same walk: update `best`, then `return 1 + max(l, r)`.",
      "Balanced: height or −1 alarm. Min depth: go only to the side that exists."
    ],
    template: {
      lines: [
        [`let best = 0;`, "The answer collects here."],
        [`function height(node) {`, ""],
        [`  if (node === null) return 0;`, ""],
        [`  const l = height(node.left), r = height(node.right);`, "Heights of both sides."],
        [`  best = Math.max(best, /* something with l and r */ l + r);`, "Record the best bent answer at this node."],
        [`  return 1 + Math.max(l, r);`, "Return only what the parent can extend."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own file: `getHeight()` in `Problems/Tree/binarySearchTree.js` counts **edges** (`null → -1`). N-ary diameter: keep the two **tallest** child heights per node and add them. More variants: *Maximum Path Sum*, *Longest Univalue Path*."
      }
    ]
  },

  practice: {
    title: "Maximum Depth of a Binary Tree",
    level: "Easy",
    problem: "Return the **maximum depth** of a binary tree: the number of **nodes** on the longest path from the root down to a leaf. An empty tree has depth 0.",
    examples: [
      { input: "[3, 9, 20, null, null, 15, 7]", output: "3" },
      { input: "[1, null, 2]", output: "2" },
      { input: "[]", output: "0" }
    ],
    hints: [
      "What is the depth of an empty tree?",
      "Ask the left subtree and the right subtree for their depths.",
      "The depth at this node is **one more** than the deeper of the two."
    ],
    solution: {
      explain: [
        "The classic bottom-up recursion: empty is 0, otherwise 1 (this node) plus the taller subtree.",
        "Time O(n), space O(h)."
      ],
      code: {
        fn: "maxDepth",
        lines: [
          [`function maxDepth(root) {`, "Depth in nodes of the tree rooted here."],
          [`  if (root === null) return 0;`, "No node: depth 0."],
          [`  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));`, "This node counts 1, plus whichever side goes deeper."],
          `}`
        ]
      }
    },
    tests: [
      { args: [{ tree: [3, 9, 20, null, null, 15, 7] }], expect: 3 },
      { args: [{ tree: [1, null, 2] }], expect: 2 },
      { args: [{ tree: [] }], expect: 0 },
      { args: [{ tree: [1] }], expect: 1 },
      { args: [{ tree: [1, 2, 3, 4, 5, null, 6] }], expect: 3 },
      { args: [{ tree: [1, null, 2, null, 3, null, 4] }], expect: 4 }
    ]
  },

  recall: [
    { q: "What is the recurrence for height?", a: "`height(node) = 1 + max(height(left), height(right))`, with `height(null) = 0` when counting nodes." },
    { q: "Why does the diameter not always pass through the root?", a: "The longest path can turn around at any node lower down. You must check `leftHeight + rightHeight` at every node." },
    { q: "In the optimal diameter solution, what does the function return and what does it record?", a: "It returns the **height** (what the parent needs) and records the **diameter** in an outer variable `best`." },
    { q: "Why is calling `height()` at every node slow?", a: "Each call re-walks a whole subtree, so a skewed tree costs O(n²). One combined walk is O(n)." },
    { q: "What is the minimum-depth trap?", a: "A node with one child must continue down that child. Treating the missing side as depth 0 would stop too early." }
  ],

  related: {
    topics: ["tree-recursion-pattern", "tree-lca", "tree-bfs-level-order", "trees-intro", "bst"],
    files: ["Problems/Tree/binaryTree.js", "Problems/Tree/binarySearchTree.js"]
  }
});
