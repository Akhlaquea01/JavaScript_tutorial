// Lowest Common Ancestor — learn-first format. Shape is documented at the top of 00-meta.js.
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

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "tree-lca",
    group: "trees",
    emoji: "🤝",
    title: "Lowest Common Ancestor (LCA)",
    tagline: "The deepest node that has both p and q somewhere below it (a node counts as its own ancestor). The first meeting point when you climb up from both.",
    level: "Core",
    needs: ["tree-recursion-pattern"],

    gist: [
      "**LCA(p, q)** = the **lowest** (deepest) node whose subtree contains both p and q. A node is allowed to be its own ancestor, so if p is above q then LCA = p.",
      "General binary tree: recurse; return the node if it is p or q; if **both** sides return something, this node is the LCA; otherwise pass up whichever side found something.",
      "In a **BST** use the ordering: both smaller → go left, both bigger → go right, otherwise this node is the **split point**: the LCA. O(h), no recursion needed.",
      "Handy afterwards: distance(p, q) = depth(p) + depth(q) − 2 × depth(LCA)."
    ],

    complexity: {
      time: "O(n) general, O(h) in a BST",
      space: "O(h)",
      why: [
        "In a plain binary tree the recursion may have to look at every node before it can tell where p and q are: O(n). The stack holds at most h calls.",
        "In a BST each step discards a whole subtree (go left **or** right), so only one root-to-node path is walked: O(h), and an iterative version needs O(1) extra space."
      ]
    },

    idea: {
      plain: [
        "The **lowest common ancestor** of two nodes p and q is the deepest node that is an ancestor of both. Picture climbing up from p and from q at the same time: the first node where your two paths meet is the LCA. (If p is already an ancestor of q, then p itself is the LCA.)",
        "**Recursive idea.** Ask every node one question: “do my left and right subtrees contain p or q?”. A node that **is** p or q simply returns itself without looking further down (if the other target is below it, this node is the LCA anyway; otherwise a node higher up will decide). Otherwise recurse into both sides. If **both** sides come back with something, p is on one side and q on the other, so *this* node is the LCA. If only one side did, pass that result upward.",
        "In a **BST** you do not need to search at all: values are ordered. If p and q are both smaller than the node, the LCA must be on the left; both bigger, on the right; otherwise they are split (or one equals the node), so this node is the LCA."
      ],
      signals: [
        "“Lowest / closest **common ancestor**” of two nodes, “common manager”, “common folder”.",
        "“**Distance** between two nodes in a tree”, “is one node an ancestor of the other?”.",
        "A **BST** and two values: use the ordering shortcut.",
        "Many LCA queries on a huge fixed tree: advanced methods (binary lifting, Euler tour) exist."
      ],
      notFor: [
        "A tree where p or q may **not exist**. The simple recursion assumes both are present. If not guaranteed, verify they exist first.",
        "Graphs with cycles: LCA is defined on trees."
      ],
      more: [
        {
          type: "table",
          heading: "Three ways to find an LCA",
          columns: ["Approach", "Idea", "Time / space"],
          rows: [
            ["**Recursion** (the demo)", "Return a node when it is p or q; both sides non-null → LCA", "O(n) / O(h)"],
            ["**Root-to-node paths**", "Find the path from the root to p and to q (DFS + backtracking), compare from the start, the last equal node is the LCA", "O(n) / O(h)"],
            ["**Parent pointers**", "Put all of p's ancestors in a set, climb from q until you hit one (or run two pointers like the linked-list intersection trick)", "O(h) / O(h)"],
            ["**BST ordering**", "Go left / right using values; the first split is the LCA", "O(h) / O(1)"]
          ]
        },
        {
          type: "table",
          heading: "What you can do with an LCA",
          columns: ["Question", "Answer"],
          rows: [
            ["Distance between p and q (edges)", "`depth(p) + depth(q) − 2 × depth(LCA)`"],
            ["Is p an ancestor of q?", "`LCA(p, q) === p`"],
            ["LCA of the deepest leaves", "Bottom-up: each node returns (height, lca) and picks the deeper side"],
            ["Thousands of queries on one big tree", "Euler tour + sparse table, or binary lifting: O(log n) per query"]
          ]
        }
      ]
    },

    analogy: {
      title: "Finding the common boss of two employees",
      story: [
        "Two employees, Priya and Quinn, want to know who their lowest shared manager is. Each walks up the chain of command from their own desk. The first manager that appears in **both** chains is their lowest common boss: anyone further up is also a common boss but not the *lowest* one.",
        "If Priya's own manager chain happens to pass through Quinn, then Quinn **is** the answer: a person counts as their own ancestor. The recursive version works downward instead: the CEO asks “is Priya or Quinn in your department?” to each of the two directors. If *both* directors say yes, Priya and Quinn are in different departments, so the CEO is their lowest common boss. If only one says yes, the answer lies inside that department."
      ],
      map: [
        ["Each person's chain of command", "The path from a node up to the root"],
        ["The first manager shared by both chains", "The LCA"],
        ["A person who is their colleague's boss", "p is an ancestor of q: LCA = p"],
        ["“Is Priya or Quinn in your department?”", "`lca(node.left)`, `lca(node.right)`"],
        ["Both directors say yes", "`left && right` → this node is the LCA"],
        ["Employees sorted by seniority number (a BST)", "Compare values to know which side to go"]
      ],
      breaks: "In a real company you can look up everyone's boss instantly. In a tree you only have `left` and `right` pointers downward, so the algorithm must search for p and q."
    },

    demos: [
      {
        id: "lca",
        title: "LCA in a binary tree: both sides found something",
        intro: "Pick two values p and q (the tree's values must all be different). A call returns the node if it is p or q; otherwise it combines its two sides. Badges: `p`, `q`, and what each call returned. The LCA lights up green.",
        codeIntro: "Returns the lowest common ancestor node of p and q (this demo reports its value).",
        viz: "tree",
        legend: [["cur", "call running now"], ["mark", "waiting for its two sides"], ["good", "returned (a node found)"], ["bad", "the LCA"]],
        inputs: [
          { type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "3,5,1,6,2,0,8,null,null,7,4", maxNodes: 11, maxTokens: 15 },
          { type: "number", name: "p", label: "p", value: 6, min: -9, max: 99 },
          { type: "number", name: "q", label: "q", value: 4, min: -9, max: 99 }
        ],
        validate(inp) {
          const vals = DSA.util.tree.nodes(inp.tree).map((n) => n.val);
          if (new Set(vals).size !== vals.length) return "In this demo every value in the tree must be different.";
          if (!vals.includes(inp.p) || !vals.includes(inp.q)) return "p and q must both be values that appear in the tree.";
          if (inp.p === inp.q) return "Pick two different values for p and q.";
          return null;
        },
        random(rnd) {
          // a random shape, with every value made different (1, 2, 3, ...)
          let k = 1;
          const tokens = DSA.util.tree.random(rnd, rnd.int(5, 8)).map((x) => (x === null ? null : k++));
          const p = rnd.int(1, k - 1);
          let q = rnd.int(1, k - 1);
          if (q === p) q = (p % (k - 1)) + 1;
          return { tree: tokens.map((x) => (x === null ? "null" : x)).join(","), p: String(p), q: String(q) };
        },
        scene: (inp) => ({ tree: inp.tree }),
        frames(inp, snap) {
          const { p, q } = inp;
          const stack = [];
          const found = new Set();
          const badge = {};
          let lcaId = null;
          DSA.util.tree.nodes(inp.tree).forEach((n) => {
            if (n.val === p) badge[n.id] = "p";
            if (n.val === q) badge[n.id] = "q";
          });
          const tones = (cur) => {
            const t = {};
            stack.forEach((i) => (t[i] = "mark"));
            found.forEach((i) => (t[i] = "good"));
            if (lcaId !== null) t[lcaId] = "bad";
            if (cur !== null && cur !== lcaId) t[cur] = "cur";
            return t;
          };
          const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge } }, extra);
          const tag = (node, text) => {
            badge[node.id] = (badge[node.id] ? badge[node.id] + " " : "") + text;
          };

          const lca = (node) => {
            if (node === null) return null;
            stack.push(node.id);
            if (node.val === p || node.val === q) {
              found.add(node.id);
              tag(node, "→ " + node.val);
              snap(view(node.id, { at: ["base"], say: "**" + node.val + "** is " + (node.val === p ? "p" : "q") + ". Return it **immediately**, with no need to look below it: if the other target is under it, this node is the LCA anyway; if not, a node higher up will decide." }));
              stack.pop();
              return node;
            }
            snap(view(node.id, { at: ["left", "right"], say: "At **" + node.val + "**: it is neither p nor q. Ask the left subtree and the right subtree whether they contain p or q." }));
            const l = lca(node.left);
            const r = lca(node.right);
            if (l !== null && r !== null) {
              lcaId = node.id;
              tag(node, "→ LCA");
              snap(view(node.id, { at: ["both"], say: "The left side returned **" + l.val + "** and the right side returned **" + r.val + "**: p and q are on **different sides** of " + node.val + ". So **" + node.val + " is the lowest common ancestor**." }));
              stack.pop();
              return node;
            }
            const out = l !== null ? l : r;
            if (out !== null) found.add(node.id);
            tag(node, "→ " + (out ? out.val : "null"));
            snap(view(node.id, { at: ["ret"], say: out ? "Only one side found something (**" + out.val + "**), so pass that result up unchanged." : "Neither side contains p or q: return **null**." }));
            stack.pop();
            return out;
          };
          const ans = lca(inp.tree);
          snap(view(null, { at: ["ret"], tone: tones(null), path: [], out: "LCA(" + p + ", " + q + ") = " + ans.val, say: "The root returned **" + ans.val + "**: the lowest common ancestor of " + p + " and " + q + ".", result: ans.val }));
        },
        code: {
          fn: "lowestCommonAncestor",
          lines: [
            `function lowestCommonAncestor(root, p, q) {`,
            [`  if (root === null || root.val === p || root.val === q) return root;`, "Nothing here, or **found one of them**: return this node. (We do not search below a match.)", "base"],
            [`  const left = lowestCommonAncestor(root.left, p, q);`, "Did the left subtree find p or q?", "left"],
            [`  const right = lowestCommonAncestor(root.right, p, q);`, "Did the right subtree?", "right"],
            [`  if (left !== null && right !== null) return root;`, "Both sides found one target: they are on opposite sides, so **this node is the LCA**.", "both"],
            [`  return left !== null ? left : right;`, "At most one side found something: pass it up (or null if neither did).", "ret"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.tree, inp.p, inp.q).val
      },

      {
        id: "bst",
        title: "LCA in a BST: follow the ordering, find the split",
        intro: "The BST is built by inserting your numbers in order. Walk down from the root: if **both** p and q are smaller, go left; if **both** are bigger, go right; otherwise this node is where they **split**, the LCA. No searching of both sides needed.",
        codeIntro: "Returns the LCA node of values `p` and `q` in a BST (this demo reports its value).",
        viz: "tree",
        legend: [["cur", "node being examined"], ["mark", "passed on the way down"], ["bad", "the LCA (split point)"]],
        inputs: [
          { type: "numlist", name: "values", label: "Insert values (all different)", value: [8, 3, 10, 1, 6, 14, 4, 7, 13], len: [5, 9], min: 1, max: 30, unique: true },
          { type: "number", name: "p", label: "p", value: 4, min: 1, max: 30 },
          { type: "number", name: "q", label: "q", value: 7, min: 1, max: 30 }
        ],
        validate(inp) {
          if (!inp.values.includes(inp.p) || !inp.values.includes(inp.q)) return "p and q must both be among the inserted values.";
          if (inp.p === inp.q) return "Pick two different values for p and q.";
          return null;
        },
        random(rnd) {
          const pool = Array.from({ length: 30 }, (_, i) => i + 1);
          const vals = [];
          for (let i = 0, n = rnd.int(6, 9); i < n; i++) vals.push(pool.splice(rnd.int(0, pool.length - 1), 1)[0]);
          const p = vals[rnd.int(0, vals.length - 1)];
          let q = vals[rnd.int(0, vals.length - 1)];
          if (q === p) q = vals[(vals.indexOf(p) + 1) % vals.length];
          return { values: vals.join(", "), p: String(p), q: String(q) };
        },
        scene: (inp) => ({ tree: buildBST(inp.values) }),
        frames(inp, snap) {
          const { p, q } = inp;
          const root = buildBST(inp.values);
          const passed = [];
          const badge = {};
          DSA.util.tree.nodes(root).forEach((n) => {
            if (n.val === p) badge[n.id] = "p";
            if (n.val === q) badge[n.id] = "q";
          });
          const view = (cur, lcaId, extra) => {
            const t = {};
            passed.forEach((i) => (t[i] = "mark"));
            if (lcaId !== null) t[lcaId] = "bad";
            else if (cur !== null) t[cur] = "cur";
            return Object.assign({ tone: t, badge: { ...badge }, path: passed.concat(cur !== null ? [cur] : []) }, extra);
          };
          let node = root;
          while (node !== null) {
            if (p < node.val && q < node.val) {
              snap(view(node.id, null, { at: ["loop", "left"], say: "At **" + node.val + "**: p (" + p + ") and q (" + q + ") are **both smaller**, so both live in the left subtree. Go left." }));
              passed.push(node.id);
              node = node.left;
            } else if (p > node.val && q > node.val) {
              snap(view(node.id, null, { at: ["loop", "right"], say: "At **" + node.val + "**: p (" + p + ") and q (" + q + ") are **both bigger**, so both live in the right subtree. Go right." }));
              passed.push(node.id);
              node = node.right;
            } else {
              snap(view(null, node.id, {
                at: ["loop", "split"],
                path: passed.concat([node.id]),
                out: "LCA(" + p + ", " + q + ") = " + node.val,
                say: node.val === p || node.val === q ? "At **" + node.val + "**: this node **is** " + (node.val === p ? "p" : "q") + ", and the other target is below it. A node is its own ancestor, so it is the LCA." : "At **" + node.val + "**: " + Math.min(p, q) + " is on one side and " + Math.max(p, q) + " on the other (or equal to it). They **split** here, so **" + node.val + " is the LCA**.",
                result: node.val
              }));
              return;
            }
          }
        },
        code: {
          fn: "lcaBST",
          lines: [
            `function lcaBST(root, p, q) {`,
            [`  let node = root;`, "Start at the root: no recursion needed.", "loop"],
            [`  while (node !== null) {`, "", "loop"],
            [`    if (p < node.val && q < node.val) node = node.left;`, "Both smaller: they are both in the left subtree.", "left"],
            [`    else if (p > node.val && q > node.val) node = node.right;`, "Both bigger: both in the right subtree.", "right"],
            [`    else return node;`, "Otherwise they **split** here (or this node is p or q): this is the LCA.", "split"],
            `  }`,
            [`  return null;`, "", "none"],
            `}`
          ]
        },
        call: (fn, inp) => fn(buildBST(inp.values), inp.p, inp.q).val
      }
    ],

    mistakes: [
      {
        oops: "Assuming p and q are in the tree",
        why: "The simple recursion returns the *one* it finds. If the other target is missing it returns that node as if it were an LCA.",
        fix: "If existence is not guaranteed, check both exist first (or count how many were found)."
      },
      {
        oops: "Forgetting that a node is its own ancestor",
        why: "If p is above q, the LCA is p itself. Searching for a *strict* ancestor gives the wrong node.",
        fix: "Return the node as soon as it equals p or q."
      },
      {
        oops: "Using the BST shortcut on a plain binary tree",
        why: "The “both smaller → go left” logic relies on ordering. In an unordered tree it sends you the wrong way.",
        fix: "Use the recursive version unless you are sure the tree is a BST."
      },
      {
        oops: "Comparing nodes by value when values can repeat",
        why: "Two different nodes with the same value look identical, so the wrong node is treated as p or q.",
        fix: "Compare node **references** (`root === p`) when given nodes, or require distinct values."
      },
      {
        oops: "Computing the distance between two nodes without the LCA",
        why: "Paths do not go through the root in general, so `depth(p) + depth(q)` overcounts.",
        fix: "`depth(p) + depth(q) − 2 × depth(LCA)`."
      }
    ],

    remember: {
      mnemonic: "Found one? Return it. Both sides found one? I am the LCA. Otherwise pass up what you got.",
      rules: [
        "A node is its own ancestor: LCA(p, q) = p if p is above q.",
        "General tree: recursion, O(n). BST: ordering, O(h).",
        "Both subtree results non-null ⇒ current node is the LCA.",
        "distance(p, q) = depth(p) + depth(q) − 2 × depth(LCA)."
      ],
      template: {
        lines: [
          [`if (root === null || root === p || root === q) return root;`, "Base: nothing, or found a target."],
          [`const left = lca(root.left, p, q);`, ""],
          [`const right = lca(root.right, p, q);`, ""],
          [`if (left && right) return root;`, "They split here."],
          [`return left || right;`, "Pass up whichever side found something."]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Tree/lowestCommonAncestor.js` (plain tree, with a `contains` check) and `findLCA` / `findDistance` in `Problems/Tree/binarySearchTree.js`."
        }
      ]
    },

    practice: {
      title: "Distance Between Two Nodes",
      level: "Medium",
      problem: "Given a binary tree and two **different** node values `p` and `q` that exist in it (all values are distinct), return the **number of edges** on the path between them.",
      examples: [
        { input: "tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 7, q = 8", output: "5", why: "7 → 2 → 5 → 3 → 1 → 8 is 5 edges; the LCA is 3." },
        { input: "same tree, p = 6, q = 4", output: "3", why: "6 → 5 → 2 → 4: the LCA is 5." }
      ],
      hints: [
        "The path between two nodes always goes **up to their LCA and back down**. Which function finds the LCA?",
        "Find the LCA first (the recursion from this topic), then measure how far **down** each target is from that LCA.",
        "Write a small helper `depthFrom(node, target, d)` that returns `d` when it finds the target and −1 if it is not in this subtree. The answer is `depthFrom(lca, p, 0) + depthFrom(lca, q, 0)`."
      ],
      solution: {
        explain: [
          "Two steps: find the LCA, then add the distance from the LCA down to p and down to q. This is the formula `depth(p) + depth(q) − 2 × depth(LCA)` computed without needing absolute depths.",
          "Time O(n), space O(h)."
        ],
        code: {
          fn: "distance",
          lines: [
            `function distance(root, p, q) {`,
            `  function lca(node) {`,
            [`    if (node === null || node.val === p || node.val === q) return node;`, "Found a target, or nothing: return."],
            [`    const l = lca(node.left), r = lca(node.right);`, "Search both sides."],
            [`    if (l && r) return node;`, "Targets on different sides: this is the LCA."],
            [`    return l || r;`, "Otherwise pass up what was found."],
            `  }`,
            `  function depthFrom(node, target, d) {`,
            [`    if (node === null) return -1;`, "Not found in this branch."],
            [`    if (node.val === target) return d;`, "Found it, d edges below the start."],
            [`    const left = depthFrom(node.left, target, d + 1);`, "Try the left side one level deeper."],
            [`    return left !== -1 ? left : depthFrom(node.right, target, d + 1);`, "If not there, try the right side."],
            `  }`,
            [`  const anc = lca(root);`, "The meeting point of the two paths."],
            [`  return depthFrom(anc, p, 0) + depthFrom(anc, q, 0);`, "Down from the LCA to p, plus down to q."],
            `}`
          ]
        }
      },
      tests: [
        { args: [{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] }, 7, 8], expect: 5 },
        { args: [{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] }, 6, 4], expect: 3 },
        { args: [{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] }, 5, 4], expect: 2 },
        { args: [{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] }, 7, 4], expect: 2 },
        { args: [{ tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] }, 6, 2], expect: 2 },
        { args: [{ tree: [1, 2, 3] }, 2, 3], expect: 2 }
      ]
    },

    recall: [
      { q: "Define the lowest common ancestor.", a: "The deepest node that has both p and q in its subtree. A node counts as its own ancestor." },
      { q: "In the recursive LCA, when is the current node the answer?", a: "When both the left and right recursive calls return non-null: p and q are on opposite sides." },
      { q: "How does the BST version avoid searching both sides?", a: "It compares values: both smaller → go left, both bigger → go right, otherwise this node is the split point (the LCA). O(h)." },
      { q: "How do you compute the distance between two nodes?", a: "`depth(p) + depth(q) − 2 × depth(LCA)`." },
      { q: "Name two other ways to get an LCA besides the recursion.", a: "Compare root-to-node paths and take the last common node; or use parent pointers and climb from one node until you meet an ancestor of the other." }
    ],

    related: {
      topics: ["tree-recursion-pattern", "bst", "tree-height-diameter", "tree-dfs-traversals", "linked-list"],
      files: ["Problems/Tree/lowestCommonAncestor.js", "Problems/Tree/binarySearchTree.js"]
    }
  });
})();
