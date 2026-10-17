// Level-order traversal (BFS) & tree views — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  // One queue-based walk, used by both demos. mode: "levels" collects each level, "right" keeps each level's last node.
  const bfsFrames = (root, snap, mode) => {
    const queue = [root];
    const done = new Set();
    const picked = new Set();
    const result = [];
    const level = [];
    const tones = (cur) => {
      const t = {};
      done.forEach((i) => (t[i] = "done"));
      picked.forEach((i) => (t[i] = "good"));
      queue.forEach((n) => (t[n.id] = "mark"));
      if (cur !== null) t[cur] = "cur";
      return t;
    };
    const boxes = (fresh) => [
      { label: "queue", hint: "front on the left", kind: "queue", items: queue.map((n) => String(n.val)) },
      ...(mode === "levels" ? [{ label: "current level", kind: "list", items: level.map((v) => ({ v })) }] : []),
      { label: mode === "levels" ? "result (levels so far)" : "right view so far", kind: "list", items: result.map((r, k) => ({ v: Array.isArray(r) ? "[" + r.join(", ") + "]" : r, new: fresh && k === result.length - 1 })) }
    ];
    const view = (cur, fresh, extra) => Object.assign({ tone: tones(cur), boxes: boxes(fresh) }, extra);

    snap(view(null, false, { at: ["guard", "init"], say: "Put the **root** in the queue. The queue always holds the nodes still to visit, in the order they will be visited." }));
    while (queue.length) {
      const size = queue.length;
      level.length = 0;
      snap(view(null, false, { at: ["loop", "size"], vars: { size }, say: "**size = " + size + "**: exactly " + size + " node" + (size === 1 ? " is" : "s are") + " in the queue right now, and they are one whole **level**. Process only that many, because new nodes will join the queue while we work." }));
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        done.add(node.id);
        const kids = [node.left, node.right].filter(Boolean);
        kids.forEach((k) => queue.push(k));
        const last = i === size - 1;
        let say;
        if (mode === "levels") {
          level.push(node.val);
          say = "Take **" + node.val + "** from the front of the queue and add it to the current level." + (kids.length ? " Its " + (kids.length === 2 ? "two children go" : "child goes") + " to the **back** of the queue (**" + kids.map((k) => k.val).join(", ") + "**), to be visited in the next level." : " It has no children.");
        } else {
          if (last) {
            result.push(node.val);
            picked.add(node.id);
          }
          say = "Take **" + node.val + "** from the front." + (last ? " It is the **last node of this level**, so it is the one visible from the right: add it to the view." : " It is not the last of its level, so something further right hides it.") + (kids.length ? " Queue its children (" + kids.map((k) => k.val).join(", ") + ") at the back." : "");
        }
        snap(view(node.id, mode === "right" && last, { at: ["inner", "pop", "add", "pushL", "pushR"], vars: { size, i }, say }));
      }
      if (mode === "levels") {
        result.push(level.slice());
        const finished = level.slice();
        level.length = 0;
        snap(view(null, true, { at: ["record"], say: "The level is finished: record **[" + finished.join(", ") + "]**. The queue now holds exactly the next level." }));
      }
    }
    snap(view(null, false, {
      at: ["done"],
      out: mode === "levels" ? "Levels: " + JSON.stringify(result).replace(/,/g, ", ") : "Right view: [" + result.join(", ") + "]",
      say: mode === "levels" ? "The queue is empty, so every node has been visited, level by level. Result: **" + JSON.stringify(result).replace(/,/g, ", ") + "**." : "The queue is empty. Looking from the right you see **[" + result.join(", ") + "]**: one node per level.",
      result: JSON.parse(JSON.stringify(result))
    }));
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "tree-bfs-level-order",
    group: "trees",
    emoji: "🌊",
    title: "Level-Order Traversal (BFS) & Tree Views",
    tagline: "Visit a tree one level at a time, top to bottom, left to right, using a queue. It answers “by level”, “nearest” and “what do I see from the side?”.",
    level: "Core",
    needs: ["trees-intro", "queue-deque"],

    gist: [
      "**BFS** (breadth-first search) visits **level 0, then level 1, then level 2…** using a **queue** (first in, first out).",
      "Recipe: put the root in the queue. Take the front node, visit it, add its **left** then **right** child to the **back**. Repeat until the queue is empty.",
      "**Size snapshot trick:** read `queue.length` *before* the inner loop to know how many nodes belong to the current level.",
      "Time **O(n)**, space **O(w)** where w is the widest level. Use it for level lists, zigzag, minimum depth, and right / left / top / bottom views."
    ],

    complexity: {
      time: "O(n)",
      space: "O(w)",
      why: [
        "Every node enters the queue once and leaves it once, with constant work each time: O(n).",
        "The queue never holds more than about two levels of nodes, and the biggest it gets is the **widest level** w. For a perfect tree the last level has about n / 2 nodes, so the worst case is O(n). A very tall, thin tree needs only O(1)-ish memory, the opposite of DFS."
      ]
    },

    idea: {
      plain: [
        "Depth-first search dives down one branch before trying the next. **Breadth-first search** does the opposite: it finishes everything at distance 0 from the root, then everything at distance 1, then distance 2, and so on, so you meet the **closest** nodes first.",
        "A **queue** makes that happen automatically. The root goes in. When you take a node out you add its children at the **back**. All of one level's nodes entered the queue before any of the next level's, so they leave in level order.",
        "To split the output into levels, use the **size snapshot**: at the start of each round, `size = queue.length` is exactly the number of nodes in this level, so loop `size` times. New children added meanwhile belong to the *next* round."
      ],
      signals: [
        "“Level by level”, “by depth”, “zigzag”, “average of each level”.",
        "“**Minimum depth**” or “nearest / shortest” (the first leaf found by BFS is the shallowest).",
        "“**Right side view**”, “left side view”, “top view”, “bottom view”.",
        "The tree is very **tall and thin** (BFS memory stays small) or you want to avoid deep recursion."
      ],
      notFor: [
        "Path and subtree problems (height, diameter, LCA, path sum): DFS recursion is more natural.",
        "A very **wide** tree where the queue would get huge and DFS would use less memory."
      ],
      more: [
        {
          type: "table",
          heading: "BFS vs DFS on a tree",
          columns: ["", "BFS (level order)", "DFS (pre / in / post)"],
          rows: [
            ["Data structure", "Queue", "Stack or recursion"],
            ["Visit order", "Level by level", "One branch to the bottom first"],
            ["Extra memory", "O(width): large for wide trees", "O(height): large for tall trees"],
            ["Best for", "Levels, minimum depth, nearest, views", "Paths, subtrees, BST order, backtracking"],
            ["Natural to write", "Iteratively", "Recursively"]
          ]
        },
        {
          type: "table",
          heading: "Common variants (what to change)",
          columns: ["Problem", "Tweak"],
          rows: [
            ["Level order (list of lists)", "Size snapshot + one list per level"],
            ["Bottom-up level order", "Do normal level order, then reverse the result"],
            ["Zigzag", "Reverse every second level's list"],
            ["Average / max / sum of a level", "Keep a running total inside the level loop"],
            ["Minimum depth", "Return the level number of the first leaf you meet"],
            ["Right / left view", "Keep the last / first node of each level"],
            ["Top / bottom view", "BFS with a horizontal distance: root 0, left −1, right +1. Top = first node per distance; bottom = last"]
          ]
        },
        {
          type: "callout",
          kind: "warning",
          text: "**Right view is not “follow the right children”.** If a level has no node on the right, the node you see from the right is a **left** child further in. Take the *last node of every level*."
        },
        {
          type: "callout",
          kind: "tip",
          text: "In JavaScript `queue.shift()` is O(n) on big arrays. For large trees use a moving `head` index (`queue[head++]`) or build the **next level as a fresh array** instead of shifting."
        }
      ]
    },

    analogy: {
      title: "A rumour spreading through ripples",
      story: [
        "Drop a pebble in a pond: the ripple reaches everything 1 metre away at the same moment, then everything 2 metres away, and so on. BFS is that ripple. The root is where the pebble lands, and every node is reached in order of how many steps it is from the root.",
        "The **queue** is a line of people waiting to pass the rumour on. Each person who hears it first joins the **back** of the line; the person at the front tells their friends (their children) and leaves. Because friends of earlier people are queued before friends of later people, the whole group is reached generation by generation.",
        "**Right side view:** stand to the right of the tree and look left. At each depth you see only the **last** person in that row."
      ],
      map: [
        ["Where the pebble lands", "The root"],
        ["Ripples at 1, 2, 3… metres", "Levels 1, 2, 3…"],
        ["The line of people waiting to pass it on", "The queue"],
        ["Hearing the news joins you to the back", "`queue.push(child)`"],
        ["How many people are in the line right now", "`size`: the current level"],
        ["Seeing only the last person in each row", "The right side view"]
      ],
      breaks: "A real ripple spreads in all directions at once. Our queue handles one node at a time, but the *order* it handles them is the same as the ripple's."
    },

    demos: [
      {
        id: "levels",
        title: "Level-order traversal with the size snapshot",
        intro: "Watch the **queue** (left = front). Each round starts by noting `size`, the number of nodes in the level, and processes exactly that many. Grey nodes are done, purple ones wait in the queue.",
        codeIntro: "Returns the values grouped by level.",
        viz: "tree",
        legend: [["cur", "node being visited"], ["mark", "waiting in the queue"], ["done", "already visited"]],
        inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4,5,null,6", maxNodes: 9, maxTokens: 15 }],
        scene: (inp) => ({ tree: inp.tree }),
        frames(inp, snap) {
          bfsFrames(inp.tree, snap, "levels");
        },
        code: {
          fn: "levelOrder",
          lines: [
            `function levelOrder(root) {`,
            [`  const result = [];`, "", "guard"],
            [`  if (root === null) return result;`, "Empty tree: no levels.", "guard"],
            [`  const queue = [root];`, "The queue starts with just the root.", "init"],
            [`  while (queue.length) {`, "One round per level, until nothing is left to visit.", "loop"],
            [`    const size = queue.length;`, "**Snapshot** how many nodes are in this level, before children are added.", "size"],
            [`    const level = [];`, "", "size"],
            [`    for (let i = 0; i < size; i++) {`, "Handle exactly `size` nodes.", "inner"],
            [`      const node = queue.shift();`, "Take the node at the front.", "pop"],
            [`      level.push(node.val);`, "Visit it.", "add"],
            [`      if (node.left) queue.push(node.left);`, "Queue its children at the back: they are the next level.", "pushL"],
            [`      if (node.right) queue.push(node.right);`, "", "pushR"],
            `    }`,
            [`    result.push(level);`, "The level is complete.", "record"],
            `  }`,
            [`  return result;`, "", "done"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.tree)
      },

      {
        id: "right",
        title: "Right side view: the last node of every level",
        intro: "Same walk, but we only keep the **last node of each level** (green). Those are the nodes you would see standing on the right of the tree. Try a tree where a level has no right node, like `1,2,3,4`.",
        codeIntro: "Returns the values visible from the right side, top to bottom.",
        viz: "tree",
        legend: [["cur", "node being visited"], ["mark", "waiting in the queue"], ["done", "visited, hidden from view"], ["good", "visible from the right"]],
        inputs: [{ type: "treelist", name: "tree", label: "Tree (level order, null = no child)", value: "1,2,3,4", maxNodes: 9, maxTokens: 15 }],
        scene: (inp) => ({ tree: inp.tree }),
        frames(inp, snap) {
          bfsFrames(inp.tree, snap, "right");
        },
        code: {
          fn: "rightSideView",
          lines: [
            `function rightSideView(root) {`,
            [`  const result = [];`, "", "guard"],
            [`  if (root === null) return result;`, "", "guard"],
            [`  const queue = [root];`, "The queue starts with the root.", "init"],
            [`  while (queue.length) {`, "", "loop"],
            [`    const size = queue.length;`, "Nodes in the current level.", "size"],
            [`    for (let i = 0; i < size; i++) {`, "", "inner"],
            [`      const node = queue.shift();`, "Take the node at the front of the queue.", "pop"],
            [`      if (i === size - 1) result.push(node.val);`, "Only the **last** node of the level is visible from the right.", "add"],
            [`      if (node.left) queue.push(node.left);`, "", "pushL"],
            [`      if (node.right) queue.push(node.right);`, "", "pushR"],
            `    }`,
            `  }`,
            [`  return result;`, "", "done"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.tree)
      }
    ],

    mistakes: [
      {
        oops: "Reading `queue.length` live in the loop instead of taking a snapshot",
        why: "While you process a level you keep adding the next level's nodes, so the live length grows and levels get mixed together.",
        fix: "`const size = queue.length;` first, then `for (let i = 0; i < size; i++)`."
      },
      {
        oops: "Using a stack instead of a queue",
        why: "A stack gives last-in-first-out, which turns the walk into a DFS and destroys the level order.",
        fix: "BFS needs **FIFO**: add at the back, remove from the front."
      },
      {
        oops: "Calling `queue.shift()` on a huge array",
        why: "Each shift is O(n), so a big tree becomes O(n²).",
        fix: "Use a head index, or build the next level into a new array each round."
      },
      {
        oops: "Pushing `null` children into the queue",
        why: "The next iteration then reads `null.val` and crashes.",
        fix: "Guard with `if (node.left)` / `if (node.right)` before pushing."
      },
      {
        oops: "Computing the right view by following only right children",
        why: "A level whose right side is empty shows its left-side node instead, so the “right chain” misses nodes.",
        fix: "Take the last node of **each level** (`i === size - 1`)."
      }
    ],

    remember: {
      mnemonic: "Queue the root. Snapshot the size. Pop `size` nodes, queue their children. One level per round.",
      rules: [
        "BFS = **queue** (FIFO). DFS = stack or recursion.",
        "`size = queue.length` **before** the level loop.",
        "Right view = last node of each level; left view = first.",
        "Minimum depth: return as soon as you meet the first leaf (early exit).",
        "Time O(n); space O(widest level)."
      ],
      template: {
        lines: [
          [`const queue = [root];`, "Start with the root (guard against null first)."],
          [`while (queue.length) {`, "One round per level."],
          [`  const size = queue.length;`, "Snapshot: this level's node count."],
          [`  for (let i = 0; i < size; i++) {`, ""],
          [`    const node = queue.shift();`, "Take from the front."],
          [`    // visit node (add to level, check i === size - 1, ...)`, "Level-specific work goes here."],
          [`    if (node.left) queue.push(node.left);`, "Children go to the back."],
          [`    if (node.right) queue.push(node.right);`, ""],
          `  }`,
          `}`
        ]
      },
      more: [
        {
          type: "text",
          text: "**Top view (preview):** give each node a horizontal distance `hd` (root 0, left child `hd − 1`, right child `hd + 1`). In a BFS keep the **first** node you meet at each `hd`. The bottom view keeps the **last**. Print the `hd` values from smallest to largest. Graph BFS (topic *Graph BFS*) is this same idea plus a `visited` set. Your own files: `Problems/Tree/binaryTree.js`."
        }
      ]
    },

    practice: {
      title: "Average of Each Level",
      level: "Easy",
      problem: "Given the root of a binary tree, return the **average value of the nodes on each level**, from the top level down.",
      examples: [
        { input: "[3, 9, 20, null, null, 15, 7]", output: "[3, 14.5, 11]", why: "Level 2 holds 15 and 7, whose average is 11." },
        { input: "[1, 2, 3]", output: "[1, 2.5]" }
      ],
      hints: [
        "“Per level” means level-order traversal with the **size snapshot**.",
        "Inside the level loop keep a running `sum` of the node values, and divide by `size` when the level ends.",
        "Do not forget to queue each node's children."
      ],
      solution: {
        explain: [
          "The level-order skeleton, with a running total instead of a list. At the end of each round `sum / size` is that level's average.",
          "Time O(n), space O(w)."
        ],
        code: {
          fn: "averageOfLevels",
          lines: [
            `function averageOfLevels(root) {`,
            [`  const result = [];`, ""],
            [`  if (root === null) return result;`, "Empty tree: no levels."],
            [`  const queue = [root];`, ""],
            [`  while (queue.length) {`, "One round per level."],
            [`    const size = queue.length;`, "Nodes in this level."],
            [`    let sum = 0;`, "Running total for the level."],
            [`    for (let i = 0; i < size; i++) {`, ""],
            [`      const node = queue.shift();`, ""],
            [`      sum += node.val;`, "Add this node to the level total."],
            [`      if (node.left) queue.push(node.left);`, "Queue the next level."],
            [`      if (node.right) queue.push(node.right);`, ""],
            `    }`,
            [`    result.push(sum / size);`, "Average = total / how many."],
            `  }`,
            [`  return result;`, ""],
            `}`
          ]
        }
      },
      tests: [
        { args: [{ tree: [3, 9, 20, null, null, 15, 7] }], expect: [3, 14.5, 11] },
        { args: [{ tree: [1] }], expect: [1] },
        { args: [{ tree: [1, 2, 3] }], expect: [1, 2.5] },
        { args: [{ tree: [] }], expect: [] },
        { args: [{ tree: [1, 2, 3, 4, 5, null, 6] }], expect: [1, 2.5, 5] },
        { args: [{ tree: [2, 1, 3] }], expect: [2, 2] }
      ]
    },

    recall: [
      { q: "What data structure drives BFS, and why?", a: "A queue (FIFO). Children join the back, so all of one level leaves the queue before any of the next level." },
      { q: "What is the size snapshot trick?", a: "Read `queue.length` before the level loop. It equals the number of nodes in the current level, so you process exactly those nodes." },
      { q: "How do you get the right side view?", a: "BFS, and keep the last node of each level (`i === size - 1`)." },
      { q: "What are the time and space of BFS on a tree?", a: "O(n) time. O(w) space where w is the widest level (up to about n / 2)." },
      { q: "When prefer BFS over DFS?", a: "For anything by level or nearest (minimum depth, level lists, views). DFS suits paths and subtree computations." }
    ],

    related: {
      topics: ["tree-dfs-traversals", "queue-deque", "graph-bfs", "tree-recursion-pattern", "trees-intro"],
      files: ["Problems/Tree/binaryTree.js", "Problems/Queue/enqueue_dequeue.js"]
    }
  });
})();
