// Trees & Binary Trees (basics) — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "trees-intro",
  group: "trees",
  emoji: "🌳",
  title: "Trees & Binary Trees (basics)",
  tagline: "A hierarchy of nodes: one root at the top, every other node hanging below exactly one parent, with no loops. A binary tree allows at most two children per node.",
  level: "Core",
  needs: ["data-structures", "recursion"],

  gist: [
    "A **tree** has one **root**; every other node has exactly one **parent**; there are no cycles. n nodes always have **n − 1 edges**.",
    "A **binary tree**: each node has at most two children, `left` and `right`. You hold the tree by its root node.",
    "A tree is **recursive**: every node is the root of a smaller tree (its *subtree*), so most tree problems are solved with recursion.",
    "Know the vocabulary: **depth** counts down from the root, **height** counts up from the deepest leaf. Balanced trees have height about log n, skewed ones n − 1."
  ],

  complexity: {
    time: "O(n) to visit everything",
    space: "O(h) recursion stack",
    why: [
      "Visiting every node of a tree once costs O(n). Operations on a plain binary tree that have to look for a value (search) are O(n) too, because there is no ordering to exploit.",
      "A recursive walk uses stack memory equal to the **height h** of the tree: about log n for a balanced tree, but n for a tree that has degenerated into a chain. A tree with an ordering rule (a BST) searches in O(h)."
    ],
    more: [
      {
        type: "table",
        heading: "Cost at a glance",
        columns: ["Operation", "Plain binary tree", "BST (balanced)", "BST (skewed)"],
        rows: [
          ["Search", "O(n)", "O(log n)", "O(n)"],
          ["Insert", "O(n) to find a slot, O(1) once you hold the parent", "O(log n)", "O(n)"],
          ["Traverse everything", "O(n)", "O(n)", "O(n)"],
          ["Recursion stack", "O(h)", "O(log n)", "O(n)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Arrays, linked lists, stacks and queues are lines: one item after another. A **tree** branches. It starts at a single **root**, and each node can have **children** below it, like folders inside folders. Three rules define it: one root, every other node has exactly one parent, and there are no cycles. Because of this, there is exactly one path between any two nodes.",
      "In a **binary** tree each node has at most two children, called `left` and `right`. In code a node is a tiny object `{ val, left, right }`, and the whole tree is just a reference to its root. A missing child is `null`.",
      "The most important idea: a tree is **recursive**. Take any node and everything below it, and you have a smaller tree. So a function that works on a tree can call itself on `node.left` and `node.right` and combine the answers. Nearly every tree problem uses this."
    ],
    signals: [
      "Hierarchical data: **folders**, an org chart, HTML (the DOM), nested comments, a family tree.",
      "A problem gives you a **root** (`TreeNode`) or a level-order array like `[3, 9, 20, null, null, 15, 7]`.",
      "Words like **depth**, **height**, **ancestor**, **leaf**, **subtree**, **level**.",
      "Decisions that branch: game moves, “choose or skip” (the recursion tree of backtracking)."
    ],
    notFor: [
      "Data with **cycles** or several routes between nodes. That is a graph.",
      "Simple linear collections. An array or list is simpler and faster."
    ],
    more: [
      {
        type: "table",
        heading: "Vocabulary",
        columns: ["Term", "Meaning"],
        rows: [
          ["**Root**", "The top node, the only one with no parent"],
          ["**Parent / child**", "The node above / below an edge"],
          ["**Siblings**", "Children of the same parent"],
          ["**Leaf**", "A node with no children (left and right are both `null`)"],
          ["**Internal node**", "A node with at least one child"],
          ["**Edge**", "A link from a parent to a child"],
          ["**Ancestor / descendant**", "Any node above / below on the path from the root"],
          ["**Subtree**", "A node together with everything below it"],
          ["**Degree**", "How many children a node has (0, 1 or 2 in a binary tree)"],
          ["**Depth** of a node", "Edges from the root down to it (root = 0)"],
          ["**Height** of a node", "Edges on the longest path from it down to a leaf (leaf = 0)"],
          ["**Level**", "All nodes at the same depth"]
        ]
      },
      {
        type: "callout",
        kind: "warning",
        text: "Some books count height in **nodes** (empty tree = 0, leaf = 1) and others in **edges** (empty = −1, leaf = 0). LeetCode “maximum depth” counts nodes. In an interview, always confirm which one."
      },
      {
        type: "table",
        heading: "Kinds of binary tree",
        columns: ["Kind", "Definition", "Where it shows up"],
        rows: [
          ["**Full**", "Every node has 0 or exactly 2 children, never 1", "Expression trees, Huffman trees"],
          ["**Complete**", "All levels full except maybe the last, which fills from the left", "Heaps (stored in an array)"],
          ["**Perfect**", "Every internal node has 2 children and all leaves are on one level (height h has 2ʰ⁺¹ − 1 nodes)", "The ideal, best-case shape"],
          ["**Balanced**", "At every node the left and right heights differ by at most 1", "What AVL and red-black trees maintain"],
          ["**Skewed (degenerate)**", "Every node has one child, so the tree is a linked list (height n − 1)", "Sorted data inserted into a plain BST"]
        ]
      },
      {
        type: "points",
        heading: "Handy formulas",
        items: [
          "Level L (root = level 0) holds at most **2ᴸ** nodes.",
          "A binary tree of height h (in edges) has at most **2ʰ⁺¹ − 1** nodes.",
          "n nodes give a height between about **log₂ n** (balanced) and **n − 1** (skewed).",
          "In any binary tree, leaves = (nodes with two children) + 1.",
          "Array form (only for complete trees): children of `i` are at `2i + 1` and `2i + 2`; the parent is at `floor((i − 1) / 2)`."
        ]
      }
    ]
  },

  analogy: {
    title: "A company org chart",
    story: [
      "The CEO is the **root**. Each person has exactly one boss (their parent) and can have several people reporting to them (children). People with no reports are the **leaves**. Someone's whole department, themselves and everyone beneath them, is a **subtree**. You cannot have a loop (A reports to B who reports to A), and there is exactly one chain of command between any two people.",
      "**Depth** is how many steps down from the CEO a person sits. **Height** is the longest chain of command *below* a person. The CEO has depth 0 and the biggest height; an intern with no reports has height 0. Because every department is itself a small org chart, any question about the company can be answered by asking each department the same question and combining the answers: that is recursion on a tree."
    ],
    map: [
      ["The CEO", "The root"],
      ["Boss / direct report", "Parent / child"],
      ["Employee with no reports", "A leaf"],
      ["A whole department", "A subtree"],
      ["Steps down from the CEO", "Depth"],
      ["Longest chain of command below a person", "Height"],
      ["Asking each department the same question", "Recursion on `node.left` and `node.right`"]
    ],
    breaks: "A real org chart often has more than two reports per manager (an *n-ary* tree). A binary tree is the special case with at most two, which keeps the code simple."
  },

  demos: [
    {
      id: "build",
      title: "Build a tree from a level-order array",
      intro: "Interview problems give a tree as `[3, 9, 20, null, null, 15, 7]`: the values **level by level**, with `null` for a missing child. A **queue** of nodes waiting for children turns that list into a tree. Faded nodes do not exist yet.",
      codeIntro: "Returns the root of the tree described by the array.",
      viz: "tree",
      legend: [["cur", "parent getting its children"], ["good", "node just created"], ["mark", "waiting in the queue for children"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "3,9,20,null,null,15,7", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const tokens = DSA.util.tree.toLevel(inp.tree);
        const n = tokens.length;
        const valOf = new Map(DSA.util.tree.nodes(inp.tree).map((x) => [x.id, x.val]));
        const allIds = [...valOf.keys()];
        const created = new Set([0]);
        const queue = [0];
        let i = 1;
        const hide = () => allIds.filter((id) => !created.has(id));
        const cells = tokens.map((t) => (t === null ? "null" : t));
        const boxes = () => [{ label: "queue", hint: "nodes waiting for children", kind: "queue", items: queue.map((id) => String(valOf.get(id))) }];
        const view = (parent, fresh, extra) => {
          const tone = {};
          queue.forEach((id) => (tone[id] = "mark"));
          if (parent !== null) tone[parent] = "cur";
          if (fresh !== null) tone[fresh] = "good";
          return Object.assign({ cells, tone, hide: hide(), boxes: boxes() }, extra);
        };
        const cellTone = (upTo, cur) => ({ ...DSA.util.span(0, upTo, "done"), ...(cur !== null ? { [cur]: "cur" } : {}) });

        snap({ cells, cellTone: { 0: "cur" }, at: ["guard", "root"], tone: { 0: "good" }, hide: hide(), boxes: boxes(), say: "The first value, **" + tokens[0] + "**, is the **root**. Create it and put it in the queue: it is waiting to receive its children." });
        while (queue.length && i < n) {
          const parent = queue.shift();
          for (const side of ["left", "right"]) {
            if (i >= n) break;
            const tok = tokens[i];
            if (tok !== null) {
              created.add(i);
              queue.push(i);
              snap(view(parent, i, {
                at: ["loop", side],
                cellTone: cellTone(i - 1, i),
                say: "Token " + i + " is **" + tok + "**: create it as the **" + side + " child** of " + valOf.get(parent) + " and add it to the queue so it can get children later."
              }));
            } else {
              snap(view(parent, null, {
                at: ["loop", side],
                cellTone: cellTone(i - 1, i),
                say: "Token " + i + " is **null**: " + valOf.get(parent) + " has **no " + side + " child**."
              }));
            }
            i++;
          }
        }
        snap(view(null, null, {
          at: ["done"],
          cellTone: cellTone(n - 1, null),
          out: "Tree built: " + created.size + " node" + (created.size === 1 ? "" : "s"),
          say: "All tokens are used. The tree has **" + created.size + "** nodes. The queue is what kept the order straight: nodes get their children in the same order they were created, which is exactly level order.",
          result: tokens.slice()
        }));
      },
      code: {
        fn: "buildTree",
        lines: [
          `function buildTree(arr) {`,
          [`  if (arr.length === 0 || arr[0] === null) return null;`, "No root, no tree.", "guard"],
          [`  const root = { val: arr[0], left: null, right: null };`, "The first value is always the root.", "root"],
          [`  const queue = [root];`, "Nodes that still need their children, oldest first.", "root"],
          [`  let i = 1;`, "Position of the next unread token.", "root"],
          [`  while (queue.length && i < arr.length) {`, "Keep going while some node is waiting and tokens remain.", "loop"],
          [`    const node = queue.shift();`, "Take the oldest waiting node.", "loop"],
          [`    if (i < arr.length && arr[i] !== null) {`, "The next token is its left child (unless `null`).", "left"],
          [`      node.left = { val: arr[i], left: null, right: null };`, "Create it...", "left"],
          [`      queue.push(node.left);`, "...and queue it so it can receive its own children.", "left"],
          `    }`,
          [`    i++;`, "Either way, that token is used up.", "left"],
          [`    if (i < arr.length && arr[i] !== null) {`, "The token after it is the right child.", "right"],
          [`      node.right = { val: arr[i], left: null, right: null };`, "", "right"],
          [`      queue.push(node.right);`, "", "right"],
          `    }`,
          [`    i++;`, "", "right"],
          `  }`,
          [`  return root;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => DSA.util.tree.toLevel(fn(DSA.util.tree.toLevel(inp.tree)))
    },

    {
      id: "terms",
      title: "Depth comes from the top, height comes from the bottom",
      intro: "Walk the tree. On the way **down** each node learns its **depth** (edges from the root). On the way **back up** it learns its **height** (edges down to its deepest leaf). Badges show `d` and `h`. A leaf has height 0.",
      codeIntro: "Returns `[value, depth, height]` for every node (in the order the recursion finishes them).",
      viz: "tree",
      legend: [["cur", "node being visited"], ["mark", "waiting for its children"], ["good", "finished: depth and height known"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const info = [];
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
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge }, boxes: [{ label: "[value, depth, height] so far", kind: "list", items: info.map((x) => ({ v: "[" + x.join(", ") + "]" })) }] }, extra);

        const walk = (node, depth) => {
          if (node === null) return -1;
          stack.push(node.id);
          badge[node.id] = "d=" + depth;
          snap(view(node.id, { at: ["walk"], say: "Arrive at **" + node.val + "** after " + depth + " step" + (depth === 1 ? "" : "s") + " from the root: its **depth is " + depth + "**. Now ask its children for their heights." }));
          const l = walk(node.left, depth + 1);
          const r = walk(node.right, depth + 1);
          const h = 1 + Math.max(l, r);
          info.push([node.val, depth, h]);
          badge[node.id] = "d=" + depth + " h=" + h;
          done.add(node.id);
          snap(view(node.id, {
            at: ["height", "record"],
            tone: { ...tones(null), [node.id]: "good" },
            say: node.left === null && node.right === null
              ? "**" + node.val + "** is a leaf: both children are null (height -1 each), so height = 1 + max(-1, -1) = **0**."
              : "Heights came back: left " + l + ", right " + r + ". **Height of " + node.val + " = 1 + max(" + l + ", " + r + ") = " + h + "**."
          }));
          stack.pop();
          return h;
        };
        walk(inp.tree, 0);
        snap(view(null, {
          at: ["done"],
          tone: tones(null),
          path: [],
          out: "Height of the whole tree = " + info[info.length - 1][2] + " (edges)",
          say: "Every node now shows both numbers. **Depth** was passed *down* (+1 per level); **height** was passed *up* (1 + the taller child). The root's height, **" + info[info.length - 1][2] + "**, is the height of the whole tree.",
          result: info.map((x) => x.slice())
        }));
      },
      code: {
        fn: "depthAndHeight",
        lines: [
          `function depthAndHeight(root) {`,
          [`  const info = [];`, "Collects [value, depth, height] for each node.", "walk"],
          `  function walk(node, depth) {`,
          [`    if (node === null) return -1;`, "Nothing here. Height -1 makes a leaf come out as 0 (height in edges).", "base"],
          [`    const l = walk(node.left, depth + 1);`, "Go down: children are one level deeper.", "left"],
          [`    const r = walk(node.right, depth + 1);`, "", "right"],
          [`    const height = 1 + Math.max(l, r);`, "Back up: the taller child decides the height.", "height"],
          [`    info.push([node.val, depth, height]);`, "Now both numbers are known for this node.", "record"],
          [`    return height;`, "Hand the height to the parent.", "record"],
          `  }`,
          `  walk(root, 0);`,
          [`  return info;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree)
    }
  ],

  mistakes: [
    {
      oops: "Mixing up depth and height",
      why: "Depth is measured from the **root** down to a node; height is measured from a node down to its deepest **leaf**. Using one for the other flips your answers.",
      fix: "Depth flows **down** (pass it as a parameter, +1 per level). Height flows **up** (return it, `1 + max(l, r)`)."
    },
    {
      oops: "Not saying whether height counts nodes or edges",
      why: "Leaf height is 1 in one convention and 0 in the other, so the whole answer shifts by one.",
      fix: "Confirm the convention. Edges: `null → -1`. Nodes: `null → 0`."
    },
    {
      oops: "Forgetting the `null` check before touching `node.left` / `node.val`",
      why: "A missing child is `null`, and `null.left` throws “Cannot read properties of null”.",
      fix: "Make the first line of every tree function `if (node === null) return …`."
    },
    {
      oops: "Treating a node with one child as a leaf",
      why: "A leaf has **both** children null. A node with one child is internal, and some problems (min depth, full tree) depend on the difference.",
      fix: "Test `node.left === null && node.right === null`."
    },
    {
      oops: "Assuming a binary tree is ordered or balanced",
      why: "A plain binary tree has no ordering (search is O(n)) and can be a long chain (height n − 1).",
      fix: "Only a BST has ordering, and only a self-balancing tree guarantees height O(log n)."
    }
  ],

  remember: {
    mnemonic: "A tree is a root plus two smaller trees. Null check first. Depth goes down, height comes up.",
    rules: [
      "n nodes → **n − 1 edges**; one path between any two nodes.",
      "Leaf = both children null. Height of leaf = 0 (edges).",
      "Balanced height ≈ log n, skewed height = n − 1, so work depends on **h**.",
      "Level-order input: use a queue to build the tree; use a queue to read it back (BFS)."
    ],
    template: {
      lines: [
        [`function solve(node) {`, ""],
        [`  if (node === null) return BASE;`, "Empty tree: the answer you can give without looking."],
        [`  const left = solve(node.left);`, "Trust the recursion on the left subtree."],
        [`  const right = solve(node.right);`, "Trust it on the right subtree."],
        [`  return combine(node.val, left, right);`, "Build this tree's answer from its parts."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: the full binary tree in `Problems/Tree/binaryTree.js`, the n-ary version in `NaryTree.js`. Next: **DFS traversals**, **BFS / level order**, then the **recursion pattern** that solves height, diameter and LCA."
      }
    ]
  },

  practice: {
    title: "Is It a Full Binary Tree?",
    level: "Easy",
    problem: "A binary tree is **full** if every node has either **0 or 2 children** (never exactly 1). Given the root, return `true` if the tree is full. An empty tree counts as full.",
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "true", why: "Node 2 has two children (4, 5); 3, 4, 5 are leaves." },
      { input: "[1, 2]", output: "false", why: "The root has only one child." }
    ],
    hints: [
      "Start with the null check. What should an empty tree return?",
      "For a node with **no** children return `true`. For a node with **both** children, the tree is full only if both subtrees are full.",
      "If exactly one child is missing, the answer is `false`."
    ],
    solution: {
      explain: [
        "Three cases for each node: a leaf is fine, a node with two children is fine if both subtrees are full, and a node with exactly one child immediately breaks the rule. The recursion checks every node once.",
        "Time O(n), space O(h)."
      ],
      code: {
        fn: "isFull",
        lines: [
          `function isFull(node) {`,
          [`  if (node === null) return true;`, "An empty tree has no node with one child."],
          [`  if (node.left === null && node.right === null) return true;`, "A leaf is fine."],
          [`  if (node.left !== null && node.right !== null) return isFull(node.left) && isFull(node.right);`, "Two children: both subtrees must also be full."],
          [`  return false;`, "Exactly one child: not full."],
          `}`
        ]
      }
    },
    tests: [
      { args: [{ tree: [1, 2, 3, 4, 5] }], expect: true },
      { args: [{ tree: [1, 2] }], expect: false },
      { args: [{ tree: [] }], expect: true },
      { args: [{ tree: [1] }], expect: true },
      { args: [{ tree: [1, 2, 3, 4, null, null, 5] }], expect: false },
      { args: [{ tree: [1, null, 2] }], expect: false },
      { args: [{ tree: [1, 2, 3, null, null, 4, 5] }], expect: true }
    ]
  },

  recall: [
    { q: "What three rules define a tree?", a: "One root, every other node has exactly one parent, and no cycles. As a result n nodes have n − 1 edges and there is a single path between any two nodes." },
    { q: "Depth vs height?", a: "Depth = edges from the root down to a node (root is 0). Height = edges from a node down to its deepest leaf (leaf is 0)." },
    { q: "Why are tree problems usually solved with recursion?", a: "Every node is the root of a smaller tree, so a function can call itself on `left` and `right` and combine the answers, with `null` as the base case." },
    { q: "What is the difference between full, complete and perfect binary trees?", a: "Full: every node has 0 or 2 children. Complete: all levels full except the last, which fills from the left. Perfect: all internal nodes have 2 children and all leaves share one level." },
    { q: "How does the height of a tree affect performance?", a: "Recursion depth and BST operations are O(h): about log n for a balanced tree but n for a skewed one." }
  ],

  related: {
    topics: ["tree-dfs-traversals", "tree-bfs-level-order", "tree-recursion-pattern", "tree-height-diameter", "bst", "recursion", "queue-deque"],
    files: ["Problems/Tree/binaryTree.js", "Problems/Tree/NaryTree.js"]
  }
});
