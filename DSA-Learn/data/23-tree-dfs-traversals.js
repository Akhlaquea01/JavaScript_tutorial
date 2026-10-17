// Binary Tree DFS traversals — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "tree-dfs-traversals",
  group: "trees",
  emoji: "🌲",
  title: "Tree DFS: Pre, In & Post-order",
  tagline: "Visit every node by going as deep as possible first. The three orders differ in just one thing: *when* you visit the node itself.",
  level: "Core",
  needs: ["trees-intro", "recursion"],

  gist: [
    "**DFS (depth-first)** follows one branch all the way down, backs up, then tries the next branch.",
    "One template, three orders: visit the node **before** (pre), **between** (in) or **after** (post) its two children. Left is always handled before right.",
    "**Pre** = copy / top-down. **In** = sorted order on a BST. **Post** = children first (height, sums, delete).",
    "**O(n)** time (every node once) and **O(h)** memory for the call stack, where h is the height of the tree."
  ],

  complexity: {
    time: "O(n)",
    space: "O(h)",
    why: [
      "Every node is visited exactly once, and each visit does a fixed amount of work, so the time is O(n).",
      "Recursion goes as deep as the tree is tall, and every level waits on the call stack, so the extra memory is O(h). For a balanced tree h is about log n. For a lopsided tree that looks like a linked list, h = n. (Collecting the results in an output list is another O(n) that you choose to keep.)"
    ],
    more: [
      {
        type: "table",
        heading: "Recursive vs iterative",
        columns: ["", "Recursive", "Iterative (your own stack)"],
        rows: [
          ["Time", "O(n)", "O(n)"],
          ["Extra space", "O(h) call stack", "O(h) explicit stack"],
          ["Risk", "Stack overflow on very deep trees", "None from depth, but more code"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A tree is not a line, so “go through every node” needs a plan. **DFS (depth-first search)** says: from the current node, dive into the whole left subtree first, then the whole right subtree, and only then come back up.",
      "At every node you do three things: go left, go right, and **visit** the node (do the work: print it, add it to a list, count it). The three famous orders differ only in **when** the visit happens: *before* the children (**pre-order**), *between* them (**in-order**) or *after* them (**post-order**).",
      "A memory trick: the name says where the **root** goes in the sequence Left, Right. **Pre** = Root first. **In** = Root in the middle. **Post** = Root last. Left always comes before Right.",
      "The opposite approach is BFS: level by level using a queue. It has its own topic."
    ],
    signals: [
      "You must process **every node** of a tree: print, count, sum, collect.",
      "A node's answer depends on its children's answers → **post-order** (bottom-up): height, diameter, subtree sum, deleting a tree.",
      "You pass information **down** to children, or copy / serialise the tree → **pre-order** (top-down).",
      "The tree is a **BST** and you want values in sorted order, the k-th smallest, or to validate it → **in-order**."
    ],
    notFor: [
      "You need nodes **level by level**, or the shortest path in an unweighted graph → BFS.",
      "The tree could be extremely deep (10,000+ levels) and you would use plain recursion. It can overflow the stack, so use the iterative version."
    ],
    more: [
      {
        type: "table",
        heading: "Which order, when?",
        columns: ["Order", "Root is visited…", "Use it for"],
        rows: [
          ["**Pre-order**", "First: top-down", "Copy / clone a tree, serialise, prefix expressions, print a directory tree"],
          ["**In-order**", "In the middle", "A BST gives sorted order: validate a BST, k-th smallest, successor / predecessor"],
          ["**Post-order**", "Last: bottom-up", "Height, diameter, subtree sum, delete a tree, LCA, evaluate an expression tree"]
        ]
      },
      {
        type: "table",
        heading: "Rebuilding a tree from traversals",
        columns: ["Fact", "Why it helps"],
        rows: [
          ["First item of **pre-order** is the root; last item of **post-order** is the root", "Tells you the root"],
          ["In **in-order**, everything left of the root belongs to the left subtree, the rest to the right", "Tells you the sizes of the two subtrees"],
          ["In-order + pre-order (or in-order + post-order) gives a **unique** tree when values are distinct", "Enough information"],
          ["Pre-order + post-order alone is **not** enough (unless every node has 0 or 2 children)", "Ambiguous"]
        ]
      }
    ]
  },

  analogy: {
    title: "Exploring a cave with forking tunnels",
    story: [
      "You explore a cave. At each junction two tunnels fork off: left and right. Your rule: always take the **left tunnel first**, walk to its very end, and only when it is completely explored come back and try the right tunnel. When a tunnel hits a dead end you walk back to the last fork where you still had an unexplored side.",
      "At every junction you also write your name on the wall (that is the “visit”). The three orders are just three habits for *when* to sign: **pre-order** = sign the moment you arrive. **In-order** = sign after finishing the left tunnel, before entering the right one. **Post-order** = sign on the way out, after both tunnels are fully explored."
    ],
    map: [
      ["Junction (room)", "A node"],
      ["Left / right tunnel", "`node.left` / `node.right`"],
      ["Dead end, no more tunnel", "`null`: the base case, return"],
      ["Walking back to the last fork", "The function returns (the call stack unwinds)"],
      ["Signing the wall when you arrive", "Pre-order"],
      ["Signing after the left tunnel, before the right", "In-order"],
      ["Signing when you leave, after both tunnels", "Post-order"],
      ["Your trail of forks not finished yet", "The call stack"]
    ],
    breaks: "In a cave you could mark your trail with string. In code the *call stack* keeps the trail for you (recursion), or you build the trail yourself with an explicit stack (iterative DFS)."
  },

  demos: [
    {
      id: "recursive",
      title: "Recursive DFS: one template, three orders",
      intro: "Pick an order and press **Run**, then compare the output list. Watch the **call stack** grow when we dive and shrink when we return. Default tree: `1,2,3,4,5,null,6`.",
      codeIntro: "A real solution keeps only one of the three `out.push` lines. Here all three are shown with a switch so you can compare them side by side.",
      viz: "tree",
      legend: [["cur", "current call"], ["mark", "waiting on the call stack"], ["good", "visited (already in the output)"]],
      inputs: [
        { type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 },
        {
          type: "select",
          name: "order",
          label: "Order",
          value: "pre",
          options: [["pre", "Pre-order (Root, Left, Right)"], ["in", "In-order (Left, Root, Right)"], ["post", "Post-order (Left, Right, Root)"]]
        }
      ],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const order = inp.order;
        const title = { pre: "Pre-order", in: "In-order", post: "Post-order" }[order];
        const visited = [];
        const done = new Set();
        const stack = [];
        const tones = (cur) => {
          const t = {};
          stack.forEach((n) => (t[n.id] = "mark"));
          done.forEach((id) => (t[id] = "good"));
          if (cur) t[cur.id] = done.has(cur.id) ? "good" : "cur";
          return t;
        };
        const boxes = (fresh) => [
          { label: "call stack", hint: "newest call on top", kind: "stack", items: stack.map((n) => "dfs(" + n.val + ")") },
          { label: "output (visit order)", kind: "list", items: visited.map((v, k) => ({ v, new: fresh && k === visited.length - 1 })) }
        ];
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.map((n) => n.id), boxes: boxes(false) }, extra);
        const where = { pre: "*before* going into its children", in: "*between* the left and right children", post: "*after* both children are finished" };

        const visit = (node) => {
          visited.push(node.val);
          done.add(node.id);
          snap(view(node, {
            at: [order],
            boxes: boxes(true),
            say: title.toUpperCase() + ": visit **" + node.val + "** now, " + where[order] + ". Output so far: [" + visited.join(", ") + "]."
          }));
        };
        const child = (node, side) => {
          if (node[side] === null) {
            snap(view(node, {
              at: [side, "base"],
              say: node.val + " has no " + side + " child, so the call `dfs(null)` hits the base case and returns immediately."
            }));
          } else {
            dfs(node[side], side);
          }
        };
        const dfs = (node, via) => {
          stack.push(node);
          snap(view(node, {
            at: [via, "base"],
            say: "Call `dfs(" + node.val + ")`. It is not null, so we carry on. The call stack now holds " + stack.length + " call" + (stack.length > 1 ? "s" : "") + "."
          }));
          if (order === "pre") visit(node);
          child(node, "left");
          if (order === "in") visit(node);
          child(node, "right");
          if (order === "post") visit(node);
          snap(view(node, {
            at: ["end"],
            say: "Both subtrees of " + node.val + " are finished, so `dfs(" + node.val + ")` returns to its caller and leaves the call stack."
          }));
          stack.pop();
        };

        snap({ at: ["init", "start"], tone: {}, boxes: boxes(false), say: "We start with an empty output list and call `dfs` on the root. Left is always explored before right; the order only decides when a node gets visited." });
        dfs(inp.tree, "start");
        snap({
          at: ["done"],
          tone: tones(null),
          boxes: boxes(false),
          out: title + ": " + visited.join(" "),
          say: "Every node has been visited exactly once. " + title + " result: **[" + visited.join(", ") + "]**.",
          result: visited.slice()
        });
      },
      code: {
        fn: "traverse",
        lines: [
          `function traverse(root, order) {`,
          [`  const out = [];`, "The visited values, in the order they are visited.", "init"],
          [`  dfs(root, order, out);`, "Start the dive at the root.", "start"],
          [`  return out;`, "Hand back the list.", "done"],
          `}`,
          ``,
          `function dfs(node, order, out) {`,
          [`  if (node === null) return;`, "Base case: no node here, so stop. This is what ends every branch.", "base"],
          [`  if (order === "pre") out.push(node.val);`, "**Pre-order**: visit the node *before* its children.", "pre"],
          [`  dfs(node.left, order, out);`, "Explore the entire left subtree first.", "left"],
          [`  if (order === "in") out.push(node.val);`, "**In-order**: visit the node *between* left and right.", "in"],
          [`  dfs(node.right, order, out);`, "Then the entire right subtree.", "right"],
          [`  if (order === "post") out.push(node.val);`, "**Post-order**: visit the node *after* both children.", "post"],
          [`}`, "The function ends: control returns to the caller, and this call leaves the call stack.", "end"]
        ]
      },
      call: (fn, inp) => fn(inp.tree, inp.order)
    },

    {
      id: "iterative",
      title: "Iterative in-order DFS with your own stack",
      intro: "The same traversal without recursion. **We** manage the stack of nodes we still have to come back to. `curr` is the node we are looking at (amber).",
      codeIntro: "Recipe: dive left pushing every node, **pop** one, **visit** it, then move to its right child.",
      viz: "tree",
      legend: [["cur", "curr: where we are"], ["mark", "pushed on our stack, to come back to"], ["good", "visited (in the output)"]],
      inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 }],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const visited = [];
        const done = new Set();
        const stack = [];
        let curr = inp.tree;
        const tones = (cur) => {
          const t = {};
          stack.forEach((n) => (t[n.id] = "mark"));
          done.forEach((id) => (t[id] = "good"));
          if (cur) t[cur.id] = done.has(cur.id) ? "good" : "cur";
          return t;
        };
        const boxes = (fresh) => [
          { label: "our stack", hint: "top is on top", kind: "stack", items: stack.map((n) => n.val) },
          { label: "output (visit order)", kind: "list", items: visited.map((v, k) => ({ v, new: fresh && k === visited.length - 1 })) }
        ];
        const view = (extra) => Object.assign({ tone: tones(curr), boxes: boxes(false) }, extra);

        snap(view({
          at: ["init"],
          say: "Start with an empty output and an empty stack, with **curr** at the root. The stack remembers the nodes we have passed but not visited yet."
        }));
        while (curr !== null || stack.length > 0) {
          while (curr !== null) {
            const prev = curr;
            stack.push(curr);
            curr = curr.left;
            snap(view({
              at: ["dive", "push", "goleft"],
              say: "Push **" + prev.val + "** on the stack (we must come back to it later), then walk to its left child: " + (curr ? "**" + curr.val + "**." : "there is none (`null`).")
            }));
          }
          curr = stack.pop();
          snap(view({
            at: ["loop", "pop"],
            say: "`curr` is null: nothing more to the left. Pop the top of the stack: **" + curr.val + "**. It is the next node in in-order, because everything to its left is finished."
          }));
          visited.push(curr.val);
          done.add(curr.id);
          snap(view({
            at: ["visit"],
            boxes: boxes(true),
            say: "Visit **" + curr.val + "**: add it to the output. Output so far: [" + visited.join(", ") + "]."
          }));
          curr = curr.right;
          snap(view({
            at: ["goright"],
            say: "Its right subtree is next: `curr` moves to " + (curr ? "**" + curr.val + "**." : "its right child, which is `null`. The next loop will pop the node waiting underneath.")
          }));
        }
        snap(view({
          at: ["loop", "done"],
          out: "In-order: " + visited.join(" "),
          say: "`curr` is null **and** the stack is empty, so the loop ends. In-order result: **[" + visited.join(", ") + "]**.",
          result: visited.slice()
        }));
      },
      code: {
        fn: "inorderIterative",
        lines: [
          `function inorderIterative(root) {`,
          [`  const out = [];`, "Visited values.", "init"],
          [`  const stack = [];`, "Nodes we passed but have not visited yet.", "init"],
          [`  let curr = root;`, "Where we are now.", "init"],
          [`  while (curr !== null || stack.length > 0) {`, "Continue while there is a node to explore or a node waiting on the stack.", "loop"],
          [`    while (curr !== null) {`, "Dive as far left as possible…", "dive"],
          [`      stack.push(curr);`, "…remembering every node on the way down.", "push"],
          [`      curr = curr.left;`, "Step to the left child.", "goleft"],
          `    }`,
          [`    curr = stack.pop();`, "Nothing left on the left: the node on top is next in line.", "pop"],
          [`    out.push(curr.val);`, "Visit it.", "visit"],
          [`    curr = curr.right;`, "Then handle its right subtree the same way.", "goright"],
          `  }`,
          [`  return out;`, "Both `curr` and the stack are empty: finished.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree)
    }
  ],

  mistakes: [
    {
      oops: "Forgetting the base case `if (node === null) return`",
      why: "`node.left` on `null` throws “Cannot read properties of null”, and without a stopping rule the recursion would never end.",
      fix: "Make it the very first line of every tree recursion."
    },
    {
      oops: "Putting the visit line in the wrong spot",
      why: "Moving `out.push` changes the order. A classic slip is using pre-order when you needed the *sorted* output of a BST (in-order).",
      fix: "Ask first: root before children (pre), sorted BST output (in), or children first (post)?"
    },
    {
      oops: "Iterative pre-order: pushing the left child before the right",
      why: "A stack pops the **last** item pushed first, so pushing left then right visits the right child first.",
      fix: "Push **right first**, then left, so that left comes off the stack first."
    },
    {
      oops: "Trusting recursion on a very deep tree",
      why: "A lopsided tree with 100,000 nodes means 100,000 nested calls, and JavaScript throws “Maximum call stack size exceeded”.",
      fix: "Use the iterative version with an explicit stack."
    },
    {
      oops: "Expecting DFS output to be level by level",
      why: "DFS goes deep first, so a tree `1,2,3,4,5,6` prints `1 2 4 5 3 6` in pre-order, not `1 2 3 4 5 6`.",
      fix: "For level order use BFS with a queue."
    }
  ],

  remember: {
    mnemonic: "**Pre** = Root first. **In** = Root in the middle. **Post** = Root last. Left always comes before Right.",
    rules: [
      "Every tree recursion starts with `if (node === null) return`.",
      "BST + in-order = sorted. Pre-order = copy / serialise. Post-order = children first (height, sums, delete).",
      "Time O(n). Space O(h): about log n if balanced, n if lopsided.",
      "Iterative recipes: **pre** = stack, pop, visit, push right then left. **in** = dive left pushing, pop, visit, go right. **post** = do Root–Right–Left (push left first, then right) and reverse the result."
    ],
    template: {
      lines: [
        `function dfs(node) {`,
        [`  if (node === null) return;`, "Base case."],
        [`  // PRE-ORDER: visit(node) here`, "Root, then Left, then Right."],
        `  dfs(node.left);`,
        [`  // IN-ORDER: visit(node) here`, "Left, then Root, then Right."],
        `  dfs(node.right);`,
        [`  // POST-ORDER: visit(node) here`, "Left, then Right, then Root."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Just know it exists: **Morris traversal** does in-order in O(1) extra space by temporarily rewiring `null` pointers. Your own implementations of all traversals are in `Problems/Tree/binaryTree.js` and `binarySearchTree.js`."
      }
    ]
  },

  practice: {
    title: "Count the Leaves",
    level: "Easy",
    problem: "Given the root of a binary tree, return how many **leaf** nodes it has. A leaf is a node with no children.",
    examples: [
      { input: "root = [1,2,3,4,5,null,6]", output: "3", why: "The leaves are 4, 5 and 6." },
      { input: "root = [1,2]", output: "1", why: "Only node 2 has no children." },
      { input: "root = []", output: "0", why: "An empty tree has no leaves." }
    ],
    hints: [
      "Use the DFS template. What should `countLeaves(null)` return?",
      "A node is a leaf when both `left` and `right` are `null`. That single node counts as 1.",
      "Otherwise the answer is the number of leaves in the left subtree plus the number in the right subtree. You combine the children's answers, a bottom-up (post-order) way of thinking."
    ],
    solution: {
      explain: [
        "Handle `null` first (it has no leaves). A node with no children is one leaf. Any other node simply passes the work to its two subtrees and adds their answers.",
        "Time O(n), since every node is visited once. Space O(h) for the call stack."
      ],
      code: {
        fn: "countLeaves",
        lines: [
          `function countLeaves(node) {`,
          [`  if (node === null) return 0;`, "Base case: an empty tree has no leaves."],
          [`  if (node.left === null && node.right === null) return 1;`, "No children: this node is a leaf, so it counts as 1."],
          [`  return countLeaves(node.left) + countLeaves(node.right);`, "Otherwise add up the leaves found in each subtree."],
          `}`
        ]
      }
    },
    tests: [
      { args: [{ tree: [1, 2, 3, 4, 5, null, 6] }], expect: 3 },
      { args: [{ tree: [1, 2] }], expect: 1 },
      { args: [{ tree: [] }], expect: 0 },
      { args: [{ tree: [1] }], expect: 1 },
      { args: [{ tree: [1, null, 2, null, 3] }], expect: 1 },
      { args: [{ tree: [1, 2, 3] }], expect: 2 },
      { args: [{ tree: [5, 3, 8, 1, 4, 7, 9] }], expect: 4 }
    ]
  },

  recall: [
    { q: "What is the difference between pre-, in- and post-order?", a: "Only *when* the node is visited relative to its subtrees: before (pre), between (in), after (post). Left is always handled before right." },
    { q: "Which traversal gives sorted output on a BST?", a: "In-order." },
    { q: "What are the time and space of DFS on a tree with n nodes and height h?", a: "O(n) time and O(h) extra space for the call stack: about log n if balanced, n if lopsided." },
    { q: "In iterative pre-order, why push the right child before the left?", a: "A stack pops the most recently pushed item first, so pushing right then left makes the left child come out first." },
    { q: "Which order do you use when a node's answer depends on its children's answers?", a: "Post-order (children first): height, diameter, subtree sums, deleting a tree." },
    { q: "Which pairs of traversals can rebuild a unique tree?", a: "In-order plus pre-order, or in-order plus post-order (with distinct values). Pre-order plus post-order is not enough on its own." }
  ],

  related: {
    topics: ["trees-intro", "tree-bfs-level-order", "tree-recursion-pattern", "bst", "recursion", "stack"],
    files: ["Problems/Tree/binaryTree.js", "Problems/Tree/binarySearchTree.js"]
  }
});
