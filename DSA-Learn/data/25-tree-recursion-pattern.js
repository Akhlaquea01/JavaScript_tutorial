// Binary tree recursion pattern — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "tree-recursion-pattern",
  group: "trees",
  emoji: "🧩",
  title: "Binary Tree Recursion: Root + Left + Right",
  tagline: "The one pattern behind most tree problems: solve the left subtree, solve the right subtree, then combine the two answers at the root.",
  level: "Core",
  needs: ["trees-intro", "recursion", "tree-dfs-traversals"],

  gist: [
    "A tree is a root plus a left tree plus a right tree, so **one function** can call itself on `node.left` and `node.right`.",
    "Three decisions per problem: **(1)** what to return for `null` (base case), **(2)** what to get from the left and right, **(3)** how to **combine** them at this node.",
    "**Leap of faith:** assume the recursive calls already give the right answers for the subtrees. Only think about *this one node*.",
    "Information can flow **up** (return values, “bottom-up”) or **down** (parameters, “top-down”). Time is O(n), space O(h)."
  ],

  complexity: {
    time: "O(n)",
    space: "O(h)",
    why: [
      "Each node is visited exactly once and does a fixed amount of work (combine two numbers, compare two values), so the total is O(n).",
      "The recursion goes as deep as the tree is tall, so the call stack holds up to h frames: about log n for a balanced tree, n for a chain. In JavaScript a very deep (skewed) tree can overflow the stack; then use an explicit stack or BFS."
    ]
  },

  idea: {
    plain: [
      "A binary tree is defined in terms of itself: **a tree is a root with a left tree and a right tree** (and an empty tree is `null`). So you almost never need a clever trick: write one function and let it call itself on the two children.",
      "For each problem decide three things. **What does `null` return?** (the base case). **What do I want back from each subtree?** (a number, a boolean, a node). **How do I build this node's answer from those?** (the combine step).",
      "Do not try to trace the whole recursion in your head. Take the **leap of faith**: assume `solve(node.left)` and `solve(node.right)` are correct for their smaller trees, then write only what happens at the current node."
    ],
    signals: [
      "“**Height / depth / size / sum / max** of a tree”, “count the nodes that …”.",
      "“Is the tree **symmetric**, **balanced**, the **same** as another, a valid **BST**?”.",
      "“Does a **root-to-leaf path** add up to …?”, “**invert** / mirror the tree”.",
      "Any question about a tree that depends on answers about its subtrees."
    ],
    notFor: [
      "Level-by-level answers: BFS with a queue is the natural fit.",
      "Trees so deep that recursion could overflow: use an iterative DFS with an explicit stack."
    ],
    more: [
      {
        type: "table",
        heading: "What should `null` return?",
        columns: ["Kind of answer", "Base case for `null`", "Why"],
        rows: [
          ["Sum, count, height (nodes)", "`0`", "An empty tree contributes nothing"],
          ["Maximum", "`-Infinity`", "So any real value beats it"],
          ["“Is everything true?” (AND)", "`true`", "No node can violate the rule"],
          ["“Does any exist?” (OR)", "`false`", "An empty tree contains no match"],
          ["Return a node (search, LCA, invert)", "`null`", "Nothing found"]
        ]
      },
      {
        type: "table",
        heading: "Bottom-up vs top-down",
        columns: ["", "Bottom-up (post-order style)", "Top-down (pre-order style)"],
        rows: [
          ["Information flows", "From children **up** to the parent, through **return values**", "From parent **down** to children, through **parameters**"],
          ["Use when", "The answer depends on the subtrees' answers", "The answer depends on context from above (depth, a bound, remaining sum)"],
          ["Examples", "Height, size, diameter, balanced, LCA", "Path sum (remaining target), validate BST (min / max bounds), depth tracking"],
          ["Shape", "`l = f(left); r = f(right); return combine(l, r)`", "`f(node, extra)` then `f(node.left, newExtra)` and `f(node.right, newExtra)`"]
        ]
      },
      {
        type: "callout",
        kind: "warning",
        text: "**Return value ≠ final answer (a classic trap).** For *diameter* the function returns a **height**, but the answer is the best `left + right` seen anywhere. For *max path sum* it returns the best **one-sided** chain, while the answer may bend through a node. Keep the real answer in an outer variable and return only what the **parent** needs. (Details in the next topic.)"
      },
      {
        type: "table",
        heading: "Gotchas",
        columns: ["Gotcha", "Fix"],
        rows: [
          ["Forgetting the `null` check", "It is always the first line"],
          ["A leaf is a node whose **both** children are `null`", "In root-to-leaf problems test `!node.left && !node.right`, not just `node === null`"],
          ["Min depth: one side `null`", "Do not take `min(0, x)`. Ignore the missing side and use the other"],
          ["An empty tree (`root = null`) is valid input", "Handle it"]
        ]
      }
    ]
  },

  analogy: {
    title: "Asking each department for a report",
    story: [
      "You are the CEO and want the total salary bill. You do not add every salary yourself. You ask your two direct reports: “what is the total for your department?”. Each of them asks *their* two reports the same question, and so on down to people with no reports, who answer “0” for the missing departments and just their own salary for themselves.",
      "Each manager's answer is *their own salary plus the two answers they got back*. That is the combine step. Nobody needs to know how the departments below did their sums: they trust the answers (the leap of faith). The same structure answers “how many people?”, “what is the highest salary?” or “how many levels?” by changing only the combine step.",
      "**Top-down** is the opposite flow: the CEO hands each report a budget (“you may spend X”), they subtract their own cost and pass the rest down. That is a parameter flowing downwards, like the remaining target in a path-sum problem."
    ],
    map: [
      ["Asking a department for its total", "`solve(node.left)`, `solve(node.right)`"],
      ["A department with nobody in it", "`null` → the base case"],
      ["Manager's salary plus the two answers", "The combine step"],
      ["Trusting the reports without checking", "The leap of faith"],
      ["Reports travelling up the chain", "Bottom-up: return values"],
      ["A budget passed down the chain", "Top-down: parameters"]
    ],
    breaks: "A real manager has not got a magic function to trust. In code the recursion really does run for every node. It just does it for you, one node at a time."
  },

  demos: [
    {
      id: "template",
      title: "One template, many problems: only the combine step changes",
      intro: "Pick a task and press **Run**. Every node asks both children for their answer and **combines** them. Badges show what each node returned. A missing child returns the base value (0, or −∞ for max).",
      codeIntro: "One function; the `task` decides the combine step. (A real solution has just one of those lines.)",
      viz: "tree",
      legend: [["cur", "node being solved"], ["mark", "waiting for its subtrees"], ["good", "solved (badge = its answer)"]],
      inputs: [
        { type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 },
        { type: "select", name: "task", label: "Task", value: "size", options: [["size", "Count the nodes"], ["sum", "Sum of values"], ["height", "Height (in nodes)"], ["max", "Largest value"]] }
      ],
      scene: (inp) => ({ tree: inp.tree }),
      frames(inp, snap) {
        const task = inp.task;
        const base = task === "max" ? -Infinity : 0;
        const stack = [];
        const done = new Set();
        const badge = {};
        const f = (v) => (v === -Infinity ? "−∞" : v);
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = "good"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge } }, extra);
        const say = { size: "1 + left + right", sum: "node value + left + right", height: "1 + max(left, right)", max: "max(node value, left, right)" }[task];

        const solve = (node) => {
          if (node === null) return base;
          stack.push(node.id);
          snap(view(node.id, { at: ["left", "right"], say: "At **" + node.val + "**: ask the left subtree and the right subtree for their answers (an empty side gives **" + f(base) + "**), then combine with `" + say + "`." }));
          const l = solve(node.left);
          const r = solve(node.right);
          const v = task === "size" ? 1 + l + r : task === "sum" ? node.val + l + r : task === "height" ? 1 + Math.max(l, r) : Math.max(node.val, l, r);
          badge[node.id] = String(v);
          done.add(node.id);
          const expr = { size: "1 + " + f(l) + " + " + f(r), sum: node.val + " + " + f(l) + " + " + f(r), height: "1 + max(" + f(l) + ", " + f(r) + ")", max: "max(" + node.val + ", " + f(l) + ", " + f(r) + ")" }[task];
          snap(view(node.id, { at: [task], tone: { ...tones(null), [node.id]: "good" }, say: "Both sides answered (left " + f(l) + ", right " + f(r) + "). Combine: " + expr + " = **" + v + "**. Return it to the parent." }));
          stack.pop();
          return v;
        };
        const result = solve(inp.tree);
        const label = { size: "Number of nodes", sum: "Sum of all values", height: "Height in nodes", max: "Largest value" }[task];
        snap(view(null, { at: [task], tone: tones(null), path: [], out: label + " = " + result, say: "The root returned **" + result + "**. **" + label + "** of the whole tree. Change the task and run again: the walk is identical, only the combine line differs.", result }));
      },
      code: {
        fn: "solve",
        lines: [
          `function solve(node, task) {`,
          [`  if (node === null) return task === "max" ? -Infinity : 0;`, "**Base case.** The empty tree's answer. For `max` it is −∞ so that any real value wins.", "base"],
          [`  const left = solve(node.left, task);`, "Leap of faith: this is already the right answer for the left subtree.", "left"],
          [`  const right = solve(node.right, task);`, "Same for the right subtree.", "right"],
          [`  if (task === "size") return 1 + left + right;`, "**Combine** (size): this node plus everything on each side.", "size"],
          [`  if (task === "sum") return node.val + left + right;`, "**Combine** (sum).", "sum"],
          [`  if (task === "height") return 1 + Math.max(left, right);`, "**Combine** (height): one more than the taller side.", "height"],
          [`  return Math.max(node.val, left, right);`, "**Combine** (max): the biggest of this value and the two subtrees' maximums.", "max"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree, inp.task)
    },

    {
      id: "pathsum",
      title: "Top-down: pass the remaining target down the tree",
      intro: "Does some **root-to-leaf path** add up to the target? Here information flows **down**: each call receives how much is still needed (`need`). At a leaf, `need` must equal the leaf's value. Badges show `need`; a ✓ or ✗ shows what each call returned.",
      codeIntro: "Returns `true` if a root-to-leaf path sums to `target`.",
      viz: "tree",
      legend: [["cur", "call running now"], ["mark", "on the current path"], ["good", "returned ✓"], ["bad", "returned ✗"]],
      inputs: [
        { type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 },
        { type: "number", name: "target", label: "Target sum", value: 8, min: -20, max: 60 }
      ],
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
        const finish = (node, ok) => {
          badge[node.id] = (badge[node.id] || "") + (ok ? " ✓" : " ✗");
          done.set(node.id, ok);
          stack.pop();
        };

        const has = (node, need) => {
          if (node === null) return false;
          stack.push(node.id);
          badge[node.id] = "need " + need;
          if (node.left === null && node.right === null) {
            const ok = node.val === need;
            finish(node, ok);
            snap(view(node.id, { at: ["leaf"], tone: { ...tones(null), [node.id]: ok ? "good" : "bad" }, say: "**" + node.val + "** is a **leaf**: the path ends here. We still need " + need + " and the leaf's value is " + node.val + ": " + (ok ? "**equal, this path works!** Return true." : "**not equal**. Return false.") }));
            return ok;
          }
          const remaining = need - node.val;
          snap(view(node.id, { at: ["remaining"], say: "At **" + node.val + "** (still needing " + need + "): after taking this node the **remaining** need is " + need + " - " + node.val + " = **" + remaining + "**. Pass it down to the children." }));
          let ok = false;
          if (node.left === null) {
            snap(view(node.id, { at: ["null"], say: node.val + " has no left child: that call returns **false** immediately." }));
          } else ok = has(node.left, remaining);
          if (!ok) {
            if (node.right === null) {
              snap(view(node.id, { at: ["null"], say: node.val + " has no right child: that call returns **false** immediately." }));
            } else ok = has(node.right, remaining);
          } else {
            snap(view(node.id, { at: ["call"], say: "The left side already found a path, so `||` **short-circuits**: the right side is not even tried." }));
          }
          finish(node, ok);
          snap(view(node.id, { at: ["call"], tone: { ...tones(null), [node.id]: ok ? "good" : "bad" }, say: "**" + node.val + "** returns **" + ok + "**" + (ok ? ": a good path runs through it." : ": no path below it works.") }));
          return ok;
        };
        const result = has(inp.tree, inp.target);
        snap(view(null, { at: ["call"], tone: tones(null), path: [], out: result ? "Yes: a root-to-leaf path sums to " + inp.target : "No path sums to " + inp.target, outTone: result ? undefined : "bad", say: result ? "The root returned **true**: some root-to-leaf path adds up to " + inp.target + "." : "The root returned **false**: no root-to-leaf path adds up to " + inp.target + ".", result }));
      },
      code: {
        fn: "hasPathSum",
        lines: [
          `function hasPathSum(node, target) {`,
          [`  if (node === null) return false;`, "No node, no path.", "null"],
          [`  if (node.left === null && node.right === null) return node.val === target;`, "A **leaf** ends a root-to-leaf path: it works only if what is still needed equals the leaf's value. (Test both children, not just `null`.)", "leaf"],
          [`  const remaining = target - node.val;`, "**Top-down:** this node pays part of the target, so the children need less.", "remaining"],
          [`  return hasPathSum(node.left, remaining) || hasPathSum(node.right, remaining);`, "A path through either side is enough. `||` stops at the first success.", "call"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.tree, inp.target)
    }
  ],

  mistakes: [
    {
      oops: "Forgetting the `null` check (or doing it after touching `node.left`)",
      why: "`null.left` throws. The base case must run before anything uses `node`.",
      fix: "`if (node === null) return BASE;` as the very first line."
    },
    {
      oops: "Choosing the wrong base value",
      why: "Returning `0` for `null` in a **max** problem makes negative trees report 0; returning `false` for an AND-style check makes everything fail.",
      fix: "Use the neutral value: 0 for sum / count, −∞ for max, true for “all”, false for “any”."
    },
    {
      oops: "Treating `null` as a leaf in root-to-leaf problems",
      why: "A node with one child is **not** a leaf. Stopping at `null` can accept a path that ends at an internal node.",
      fix: "A leaf is `node.left === null && node.right === null`."
    },
    {
      oops: "Returning the final answer when the parent needs something else",
      why: "Diameter or max-path-sum bends through a node, and a bent path cannot be extended by the parent. Returning it gives wrong numbers upstairs.",
      fix: "Keep the answer in an outer variable; return only the one-sided value the parent can use."
    },
    {
      oops: "Forgetting to reset an outer variable between runs",
      why: "A leftover `best` from a previous call makes the next answer wrong.",
      fix: "Define it inside the outer function, or reset it at the start."
    }
  ],

  remember: {
    mnemonic: "Null → base. Left, right → trust. Combine at the root. Down = parameters, up = return values.",
    rules: [
      "Ask: **base case? what from each side? how to combine?**",
      "Need context from above (bounds, remaining sum, depth)? Pass it as a **parameter**.",
      "Need the answer of the subtrees? Use their **return values**.",
      "Answer ≠ what you return? Use an outer variable.",
      "Always handle the empty tree."
    ],
    template: {
      lines: [
        [`function solve(node) {`, ""],
        [`  if (node === null) return BASE;`, "0 / -Infinity / true / false / null."],
        [`  const left = solve(node.left);`, "Trust it."],
        [`  const right = solve(node.right);`, "Trust it."],
        [`  return combine(node.val, left, right);`, "Build this node's answer."],
        `}`
      ]
    },
    more: [
      {
        type: "table",
        heading: "Common problems and their combine step",
        columns: ["Problem", "Combine at the root"],
        rows: [
          ["Maximum depth", "`1 + max(l, r)`"],
          ["Count nodes / sum", "`1 + l + r` / `val + l + r`"],
          ["Same tree / symmetric", "`values equal && l && r`"],
          ["Invert tree", "Swap the two inverted children"],
          ["Balanced tree", "`|l − r| ≤ 1 && both balanced`"],
          ["Path sum (top-down)", "Pass `target − val`; at a leaf compare"],
          ["Validate BST (top-down)", "Pass `(low, high)`; check `low < val < high`"]
        ]
      },
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Tree/binaryTree.js` and `binarySearchTree.js` have recursive helpers you can compare. Next topics apply this exact pattern: **height & diameter**, **LCA**, **BST**."
      }
    ]
  },

  practice: {
    title: "Invert a Binary Tree",
    level: "Easy",
    problem: "Mirror a binary tree: swap the left and right child of **every** node. Return the root of the inverted tree.",
    examples: [
      { input: "[4, 2, 7, 1, 3, 6, 9]", output: "[4, 7, 2, 9, 6, 3, 1]" },
      { input: "[2, 1, 3]", output: "[2, 3, 1]" }
    ],
    hints: [
      "What is the inverse of an empty tree?",
      "Use the template: first invert the left subtree, then the right subtree.",
      "At the current node, **swap** the two (already inverted) children and return the node."
    ],
    solution: {
      explain: [
        "Leap of faith: after `invertTree(node.left)` and `invertTree(node.right)` each side is correctly mirrored. The only thing left to do at this node is to swap the two sides.",
        "Time O(n), space O(h)."
      ],
      code: {
        fn: "invertTree",
        lines: [
          `function invertTree(node) {`,
          [`  if (node === null) return null;`, "Base case: nothing to invert."],
          [`  const left = invertTree(node.left);`, "A mirrored left subtree."],
          [`  const right = invertTree(node.right);`, "A mirrored right subtree."],
          [`  node.left = right;`, "Swap the sides: the right result becomes the left child..."],
          [`  node.right = left;`, "...and the left result becomes the right child."],
          [`  return node;`, "Return the root of this (now mirrored) tree."],
          `}`
        ]
      }
    },
    tests: [
      { args: [{ tree: [4, 2, 7, 1, 3, 6, 9] }], expect: [4, 7, 2, 9, 6, 3, 1], out: "tree" },
      { args: [{ tree: [2, 1, 3] }], expect: [2, 3, 1], out: "tree" },
      { args: [{ tree: [] }], expect: [], out: "tree" },
      { args: [{ tree: [1] }], expect: [1], out: "tree" },
      { args: [{ tree: [1, 2] }], expect: [1, null, 2], out: "tree" },
      { args: [{ tree: [1, null, 2] }], expect: [1, 2], out: "tree" }
    ]
  },

  recall: [
    { q: "What three decisions define a tree recursion?", a: "The base case for `null`, what to ask each subtree for, and how to combine the answers at this node." },
    { q: "What is the “leap of faith”?", a: "Assume the recursive calls on the left and right subtrees already return correct answers; only reason about what to do at the current node." },
    { q: "Bottom-up versus top-down: how does information travel in each?", a: "Bottom-up: from children to parent through return values. Top-down: from parent to children through parameters (like a remaining target or bounds)." },
    { q: "Why is a leaf `!node.left && !node.right` and not just `node === null`?", a: "A node with one child is not a leaf. Root-to-leaf problems must end only at real leaves." },
    { q: "What do `null` return for sum, max and “all valid”?", a: "0 for sum, −Infinity for max, true for an AND-style check." }
  ],

  related: {
    topics: ["tree-dfs-traversals", "tree-height-diameter", "tree-lca", "bst", "recursion", "trees-intro"],
    files: ["Problems/Tree/binaryTree.js", "Problems/Tree/binarySearchTree.js"]
  }
});
