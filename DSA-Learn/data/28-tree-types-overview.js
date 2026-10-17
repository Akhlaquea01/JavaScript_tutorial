// Tree family — which tree when — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "tree-types-overview",
  group: "trees",
  emoji: "🗂️",
  title: "The Tree Family: Which Tree, When?",
  tagline: "Binary tree, BST, heap, trie, AVL / red-black, B+ tree, Fenwick and segment trees: each one exists to make a particular question fast.",
  level: "Overview",
  needs: ["trees-intro"],

  gist: [
    "**Binary tree** = a shape (hierarchy, recursion practice). **BST** = ordered, so search is O(h). **Heap** = min or max on top, priority queue. **Trie** = prefix lookups.",
    "**AVL / red-black** keep a BST balanced so everything stays O(log n). **B-tree / B+ tree** are wide, shallow trees for **disks and database indexes**.",
    "**Fenwick** and **segment trees** answer **range queries with updates** in O(log n).",
    "A heap is **not** a sorted tree: only the root is guaranteed. Interviews mostly test binary tree, BST, heap and trie; the rest is concept level."
  ],

  complexity: {
    time: "depends on the tree",
    space: "O(n)",
    why: [
      "All these structures store n items, so memory is O(n). What differs is which operation each makes cheap: ordered search (BST), min / max (heap), prefix (trie), range sums with updates (Fenwick).",
      "The table below is the quick comparison: pick the structure whose *cheap* operation is the one your algorithm repeats."
    ],
    more: [
      {
        type: "table",
        heading: "The family at a glance",
        columns: ["Structure", "Ordering rule", "Best at", "Key cost", "Interview priority"],
        rows: [
          ["Binary tree", "None (max 2 children)", "Hierarchy, traversal and recursion practice", "Search O(n)", "High"],
          ["BST", "left < node < right (whole subtrees)", "Ordered search, insert, delete, range queries", "O(h), balanced O(log n)", "High"],
          ["AVL / red-black", "BST + kept balanced", "Guaranteed O(log n) worst case", "O(log n) always", "Concept"],
          ["Heap", "Parent ≤ children (min) or ≥ (max); complete tree", "Min / max fast, priority queue, top-K", "peek O(1), push / pop O(log n)", "High"],
          ["Trie", "Path from the root = prefix", "Prefix search, autocomplete", "O(word length)", "Medium"],
          ["B-tree / B+ tree", "Multi-way sorted, all leaves on one level", "Database indexes, file systems", "O(log_m n) disk reads", "Concept"],
          ["Fenwick (BIT)", "Array; each slot sums a block", "Prefix sums with point updates", "O(log n) both", "Low / concept"],
          ["Segment tree", "Each node summarises a range", "Range sum / min / max with updates", "O(log n)", "Low / concept"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "“Tree” is a family, not one structure. All of them are nodes with children, but each adds a **rule** that makes one kind of question fast. Choosing the right tree means asking: *what do I keep asking?*",
      "A plain **binary tree** has no rule, so it is for hierarchies and for practising recursion. Add *“left subtree < node < right subtree”* and you get a **BST**: search drops from O(n) to O(h). Keep it **balanced** (AVL, red-black) and h stays about log n. Add *“parent ≤ children”* on a complete tree and you get a **heap**: the minimum is always at the root. Give each edge a **letter** and you get a **trie** for prefixes.",
      "Some trees are about *hardware or ranges*. A **B+ tree** has hundreds of keys per node so a billion rows are only 3–4 levels deep, which suits slow disks and is how database indexes work. A **Fenwick** or **segment tree** stores partial sums so that “sum of a range” and “change one value” are both O(log n)."
    ],
    signals: [
      "“Represent a **hierarchy**” → binary / n-ary tree.",
      "“Ordered data, search / insert / delete / range / k-th” → **BST** (a balanced one, such as `TreeMap`).",
      "“Always give me the **smallest / largest**, top-K, next task” → **heap**.",
      "“**Prefix**, autocomplete, dictionary” → **trie**.",
      "“Sum / min over a **range** while values **change**” → Fenwick or segment tree."
    ],
    notFor: [
      "A tree when a **hash map** answers your questions faster (exact lookups only).",
      "Implementing AVL, red-black or B-trees in a coding interview unless the role is clearly advanced. Knowing the idea is normally enough."
    ],
    more: [
      {
        type: "table",
        heading: "Binary tree vs BST vs heap (the common mix-up)",
        columns: ["", "Binary tree", "BST", "Heap"],
        rows: [
          ["Ordering", "None", "left < node < right (whole subtrees)", "Parent vs children only; siblings unordered"],
          ["Shape", "Any", "Any (can be skewed)", "Always a complete tree"],
          ["Search a value", "O(n)", "O(h)", "O(n)"],
          ["Min / max", "O(n)", "O(h): leftmost / rightmost", "O(1): the root"],
          ["Sorted output", "No", "In-order traversal, O(n)", "Heap sort, O(n log n)"],
          ["Stored in", "Pointers", "Pointers", "An array (index maths)"],
          ["Typical use", "Hierarchy, recursion practice", "TreeMap / TreeSet, ordered lookup", "Priority queue, top-K, scheduling"]
        ]
      },
      {
        type: "callout",
        kind: "warning",
        text: "**A heap is not sorted.** Only the root (the min in a min-heap) is guaranteed. The array `[1, 5, 2, 9, 6, 3]` is a valid min-heap even though it is not in order."
      },
      {
        type: "table",
        heading: "Self-balancing trees and B-trees in a nutshell",
        columns: ["Tree", "Idea", "Remember"],
        rows: [
          ["**AVL**", "Balance factor `height(left) − height(right)` is always −1, 0 or +1. Rotations restore it after each insert / delete", "Very strict: fast lookups, more rotations on updates"],
          ["**Red-black**", "Nodes coloured red / black with a few rules (root black, no red-red, equal black count on every path)", "Looser balance, fewer rotations. Java `TreeMap` and C++ `std::map` use it"],
          ["**B-tree**", "Many keys per node, many children, all leaves on one level", "Short and wide: few disk reads"],
          ["**B+ tree**", "Data only in the leaves, leaves linked in a list", "Range scans (`BETWEEN`, `ORDER BY`) are fast: this is the usual database index"]
        ]
      },
      {
        type: "table",
        heading: "Interview tiers",
        columns: ["Tier", "What", "How deep"],
        rows: [
          ["1: must know", "Binary tree (traversals, recursion, LCA, diameter), BST, heap and priority queue (top-K, median), trie basics", "Write them from memory"],
          ["2: concept", "AVL / red-black, B+ tree, Fenwick / segment tree", "What problem they solve, complexity, when to use"]
        ]
      }
    ]
  },

  analogy: {
    title: "Different filing systems for different jobs",
    story: [
      "A **folder tree** on your computer is a plain tree: great for organising, but to find a file by name you may have to open every folder. A **library catalogue sorted by title** is a BST: jump to the middle, go left or right, find a title in a few steps. A **hospital emergency room** is a heap: you do not keep patients sorted, you only guarantee that the most urgent one is seen next.",
      "A **phone's contact search** is a trie: each letter you type narrows the list. A **printed encyclopedia index** is a B+ tree: a very wide index at the front that points you to a page in two or three lookups, because turning pages (reading a disk block) is the slow part. A **running-total board** where every cell remembers the total of a block of days is a Fenwick tree: add today's number by updating a few cells, and read any prefix total by adding a few cells."
    ],
    map: [
      ["Folder tree", "Binary tree / n-ary tree"],
      ["Catalogue sorted by title", "BST"],
      ["Emergency room: most urgent next", "Heap"],
      ["Contact search as you type", "Trie"],
      ["Wide printed index", "B+ tree"],
      ["Block totals on a board", "Fenwick tree"]
    ],
    breaks: "Real filing systems are rarely just one of these. Databases combine a B+ tree on disk with a hash map in memory, a heap for scheduling and a trie-like structure for text search."
  },

  demos: [
    {
      id: "pick",
      title: "Pick the right tree for the job",
      intro: "Choose what you need to do repeatedly and see which structure fits, and what its key operation costs.",
      codeIntro: "A decision function: the thinking you do before choosing a data structure.",
      viz: "none",
      legend: [],
      inputs: [
        {
          type: "select",
          name: "need",
          label: "What do you need?",
          value: "ordered",
          options: [
            ["hierarchy", "Model a hierarchy / practise recursion"],
            ["ordered", "Ordered data: fast search, insert, delete, ranges"],
            ["minmax", "Always the minimum or maximum (top-K, scheduling)"],
            ["prefix", "Words, prefixes, autocomplete"],
            ["disk", "A sorted index stored on disk (database)"],
            ["prefixsum", "Prefix sums while values change"],
            ["range", "Range min / max / sum with range updates"]
          ]
        }
      ],
      frames(inp, snap) {
        const table = {
          hierarchy: ["hierarchy", "Binary tree", "No ordering rule, so searching costs O(n). It is the shape for folders, org charts and for practising recursion."],
          ordered: ["ordered", "BST (balanced: AVL / red-black)", "Ordering makes search, insert and delete O(h). Keep it balanced and h is about log n. Also gives floor, ceil, range and k-th queries."],
          minmax: ["minmax", "Heap", "The min (or max) is always at the root: peek is O(1), push and pop are O(log n). It is the engine of priority queues and top-K."],
          prefix: ["prefix", "Trie", "Each step down is one letter, so insert, search and prefix search cost O(word length), however many words are stored."],
          disk: ["disk", "B+ tree", "Hundreds of keys per node make the tree very shallow (3 to 4 levels for a billion rows), so few disk reads. Linked leaves make range scans fast."],
          prefixsum: ["prefixsum", "Fenwick tree", "Prefix sum and point update are both O(log n), where a plain prefix array makes updates O(n)."],
          range: ["range", "Segment tree", "Each node summarises a range, so range queries (sum, min, max) and range updates are both O(log n)."]
        };
        const labels = { hierarchy: "model a hierarchy", ordered: "ordered search / insert / delete", minmax: "min or max on demand", prefix: "prefix / autocomplete", disk: "a disk-based index", prefixsum: "prefix sums with updates", range: "range queries with range updates" };
        const [key, name, why] = table[inp.need];
        snap({ at: ["start"], boxes: [{ label: "your need", kind: "list", items: [{ v: labels[key] }] }], say: "Your need: **" + labels[key] + "**. Which tree makes exactly that operation cheap?" });
        snap({
          at: [key],
          boxes: [{ label: "your need", kind: "list", items: [{ v: labels[key] }] }, { label: "use", kind: "list", items: [{ v: name, tone: "good" }] }],
          out: "Use a " + name,
          say: "**" + name + ".** " + why,
          result: name
        });
      },
      code: {
        fn: "pickTree",
        lines: [
          [`function pickTree(need) {`, "Name what you do most, then pick the tree that makes it cheap.", "start"],
          `  switch (need) {`,
          [`    case "hierarchy": return "Binary tree";`, "A shape for hierarchies and recursion practice.", "hierarchy"],
          [`    case "ordered": return "BST (balanced: AVL / red-black)";`, "Ordered search, insert, delete.", "ordered"],
          [`    case "minmax": return "Heap";`, "Min or max at the root.", "minmax"],
          [`    case "prefix": return "Trie";`, "Prefix and autocomplete.", "prefix"],
          [`    case "disk": return "B+ tree";`, "Shallow and wide for disks and database indexes.", "disk"],
          [`    case "prefixsum": return "Fenwick tree";`, "Prefix sums with point updates.", "prefixsum"],
          [`    default: return "Segment tree";`, "Range queries and range updates.", "range"],
          `  }`,
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.need)
    },

    {
      id: "fenwick",
      title: "Fenwick tree: a prefix sum in about log n steps",
      intro: "`tree[i]` stores the sum of a **block** of numbers ending at position i, and the block length is the **lowest set bit** of i (6 = 110 in binary → length 2 → positions 5 to 6). To get the sum of the first r numbers, add a block, strip the lowest bit of i, and repeat. Positions are **1-based** (cell 0 is unused).",
      codeIntro: "Builds the Fenwick array, then answers “sum of the first r numbers”.",
      viz: "array",
      legend: [["cur", "tree[i] being added"], ["good", "blocks already added"], ["mark", "numbers covered by tree[i]"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers", value: [3, 2, -1, 6, 5, 4, -3, 3], len: [4, 8], min: -5, max: 9 },
        { type: "number", name: "r", label: "Sum of the first r numbers", value: 7, min: 1, max: 8 }
      ],
      validate(inp) {
        return inp.r > inp.nums.length ? "r must be between 1 and " + inp.nums.length + "." : null;
      },
      random(rnd) {
        const n = rnd.int(5, 8);
        return { nums: Array.from({ length: n }, () => rnd.int(-3, 9)).join(", "), r: String(rnd.int(1, n)) };
      },
      frames(inp, snap) {
        const nums = inp.nums;
        const n = nums.length;
        const tree = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) for (let j = i; j <= n; j += j & -j) tree[j] += nums[i - 1];
        const treeRow = ["·", ...tree.slice(1)];
        const numRow = ["·", ...nums];
        const bin = (x) => x.toString(2);
        const block = (i) => DSA.util.span(i - (i & -i) + 1, i, "mark");
        const view = (extra) => Object.assign({ label: "tree (1-indexed)", cells: treeRow, rows: [{ label: "numbers (1-indexed)", cells: numRow }] }, extra);

        snap(view({ at: ["build"], say: "The tree array is built: each number is added to every slot whose block covers it. For example `tree[" + Math.min(6, n) + "]` covers positions " + (Math.min(6, n) - (Math.min(6, n) & -Math.min(6, n)) + 1) + " to " + Math.min(6, n) + " (its lowest set bit is " + (Math.min(6, n) & -Math.min(6, n)) + ")." }));
        let sum = 0;
        const added = {};
        for (let i = inp.r; i > 0; i -= i & -i) {
          sum += tree[i];
          snap(view({
            at: ["query", "add"],
            ptr: { i },
            tone: { ...added, [i]: "cur" },
            rows: [{ label: "numbers (1-indexed)", cells: numRow, tone: block(i) }],
            vars: { i, binary: bin(i), "lowest bit": i & -i, sum },
            say: "i = " + i + " (binary " + bin(i) + "). `tree[" + i + "]` = **" + tree[i] + "** is the sum of positions " + (i - (i & -i) + 1) + " to " + i + ". Add it: sum = **" + sum + "**."
          }));
          added[i] = "good";
          const next = i - (i & -i);
          if (next > 0) {
            snap(view({
              at: ["add"],
              ptr: { i: next },
              tone: { ...added },
              vars: { i: next, binary: bin(next), sum },
              say: "Clear the lowest set bit: " + i + " (" + bin(i) + ") becomes " + next + " (" + bin(next) + "). That jumps over the block we just counted to the next block to the left."
            }));
          }
        }
        snap(view({
          at: ["done"],
          tone: { ...added },
          vars: { sum },
          out: "Sum of the first " + inp.r + " = " + sum + " (" + Object.keys(added).length + " block" + (Object.keys(added).length === 1 ? "" : "s") + ")",
          say: "Sum of the first " + inp.r + " numbers = **" + sum + "**, found by adding only **" + Object.keys(added).length + "** block" + (Object.keys(added).length === 1 ? "" : "s") + " instead of " + inp.r + " numbers. The number of blocks is at most the number of bits in r: about log n.",
          result: sum
        }));
      },
      code: {
        fn: "fenwickQuery",
        lines: [
          `function fenwickQuery(nums, r) {`,
          [`  const n = nums.length;`, "", "build"],
          [`  const tree = new Array(n + 1).fill(0);`, "1-indexed: slot 0 is unused.", "build"],
          [`  for (let i = 1; i <= n; i++) {`, "Add each number to every slot whose block includes it:", "build"],
          [`    for (let j = i; j <= n; j += j & -j) tree[j] += nums[i - 1];`, "`j & -j` is the lowest set bit. Adding it jumps to the next block that covers position i.", "build"],
          `  }`,
          [`  let sum = 0;`, "", "query"],
          [`  for (let i = r; i > 0; i -= i & -i) sum += tree[i];`, "Add the block ending at i, then clear the lowest set bit of i to move to the previous block. At most log n blocks.", "add"],
          [`  return sum;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.r)
    }
  ],

  mistakes: [
    {
      oops: "Treating a heap as a sorted tree",
      why: "A heap only guarantees that each parent is ≤ (or ≥) its children. The array is *not* in order, and searching for an arbitrary value is O(n).",
      fix: "Use a heap for min / max / top-K only. For ordered data use a BST or sort."
    },
    {
      oops: "Using a plain BST on sorted input",
      why: "Inserting 1, 2, 3, 4, 5 in order builds a chain: the tree is a linked list and every operation is O(n).",
      fix: "Use a self-balancing tree (AVL / red-black), shuffle the input, or build from a sorted array by always taking the middle."
    },
    {
      oops: "Confusing a B-tree with a binary search tree",
      why: "A B-tree node holds many keys and has many children; it is designed for disk blocks. A BST node has one key and two children.",
      fix: "Think “wide and shallow” for B-trees, “narrow and (hopefully) balanced” for BSTs."
    },
    {
      oops: "Spending interview time implementing AVL / red-black / segment trees too early",
      why: "Most interviews expect the *idea* and complexity of these, while binary tree, BST, heap and trie are the ones to code fluently.",
      fix: "Master Tier 1 first. Learn Tier 2 as concepts."
    },
    {
      oops: "Forgetting the Fenwick tree is 1-indexed",
      why: "With index 0, `i & -i` is 0 and the loops never move, so you get an infinite loop.",
      fix: "Shift positions by one: position `p` in the array is index `p + 1` in the tree."
    }
  ],

  remember: {
    mnemonic: "Hierarchy → tree. Ordered → BST. Min/max → heap. Prefix → trie. Disk → B+ tree. Range sums with updates → Fenwick / segment tree.",
    rules: [
      "A heap is partially ordered (parent vs children), a BST is fully ordered (whole subtrees).",
      "Balanced BSTs guarantee O(log n); a plain BST can degrade to O(n).",
      "Wide nodes (B+ tree) minimise disk reads. Linked leaves give fast range scans.",
      "Fenwick: `i & -i` is the lowest set bit; update goes **up** (`i += i & -i`), query goes **down** (`i -= i & -i`)."
    ],
    template: {
      lines: [
        [`// hierarchy / recursion practice          → Binary tree`, ""],
        [`// ordered data, dynamic search / ranges   → BST (balanced)`, ""],
        [`// min / max / top-K / next task           → Heap`, ""],
        [`// strings by prefix                      → Trie`, ""],
        [`// disk-based sorted index                → B+ tree`, ""],
        [`// prefix sums + updates                  → Fenwick`, ""],
        [`// range min/max + range updates          → Segment tree`, ""]
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Tree/avlTree.js`, `redBlackTree.js`, `heap.js`, `Trie.js`, `NaryTree.js` and `binarySearchTree.js`."
      }
    ]
  },

  practice: {
    title: "Range Sum Queries with Updates (Fenwick tree)",
    level: "Medium",
    problem: "Given an array `nums` and a list of operations, process them in order. `[\"sum\", L, R]` asks for the sum of `nums[L..R]` (inclusive, 0-based); `[\"update\", i, v]` sets `nums[i]` to `v`. Return the answers to the `sum` operations, in order. Use a Fenwick tree so both operations are O(log n).",
    examples: [
      { input: "nums = [3, 2, -1, 6, 5, 4, -3, 3], ops = [[\"sum\", 2, 5]]", output: "[14]", why: "-1 + 6 + 5 + 4 = 14." },
      { input: "ops = [[\"sum\", 2, 5], [\"update\", 3, 10], [\"sum\", 2, 5]]", output: "[14, 18]", why: "After changing 6 to 10 the range sum grows by 4." }
    ],
    hints: [
      "Keep a 1-indexed array `tree`. Two helpers: `add(i, delta)` walks **up** with `i += i & -i`; `prefix(i)` walks **down** with `i -= i & -i`.",
      "A range sum is `prefix(R + 1) - prefix(L)` (convert the 0-based positions to 1-based).",
      "To update, add the **difference** `v - old` and remember the new value in a copy of the array."
    ],
    solution: {
      explain: [
        "`add` pushes a change into every block that covers the position; `prefix` adds the few blocks that make up a prefix. Both take O(log n). A range sum is the difference of two prefixes.",
        "Building costs O(n log n) here (n calls of `add`); each operation afterwards is O(log n)."
      ],
      code: {
        fn: "rangeSums",
        lines: [
          `function rangeSums(nums, ops) {`,
          [`  const n = nums.length;`, ""],
          [`  const tree = new Array(n + 1).fill(0);`, "1-indexed Fenwick array."],
          [`  const values = nums.slice();`, "Current values, to know how much an update changes."],
          [`  const add = (i, delta) => { for (; i <= n; i += i & -i) tree[i] += delta; };`, "Push a change up through every block that covers position i."],
          [`  const prefix = (i) => { let s = 0; for (; i > 0; i -= i & -i) s += tree[i]; return s; };`, "Sum of the first i numbers: a handful of blocks."],
          [`  nums.forEach((x, i) => add(i + 1, x));`, "Build by adding every number."],
          [`  const out = [];`, ""],
          [`  for (const [kind, a, b] of ops) {`, ""],
          [`    if (kind === "update") { add(a + 1, b - values[a]); values[a] = b; }`, "Add only the **difference** between the new and old value."],
          [`    else out.push(prefix(b + 1) - prefix(a));`, "Range sum = prefix up to R minus prefix before L."],
          `  }`,
          [`  return out;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: [[3, 2, -1, 6, 5, 4, -3, 3], [["sum", 2, 5]]], expect: [14] },
      { args: [[3, 2, -1, 6, 5, 4, -3, 3], [["sum", 2, 5], ["update", 3, 10], ["sum", 2, 5]]], expect: [14, 18] },
      { args: [[3, 2, -1, 6, 5, 4, -3, 3], [["sum", 0, 7]]], expect: [19] },
      { args: [[3, 2, -1], [["update", 0, 0], ["sum", 0, 1]]], expect: [2] },
      { args: [[1, 2, 3], []], expect: [] },
      { args: [[5], [["sum", 0, 0], ["update", 0, 1], ["sum", 0, 0]]], expect: [5, 1] }
    ]
  },

  recall: [
    { q: "Binary tree vs BST vs heap: what rule does each add?", a: "Binary tree: none. BST: left subtree < node < right subtree. Heap: parent ≤ children (min-heap) on a complete tree." },
    { q: "Why is a heap not “sorted”?", a: "Only parent-vs-child order is guaranteed. Siblings and the rest of the array can be in any order, so only the root (min or max) is known." },
    { q: "Why do AVL and red-black trees exist?", a: "A plain BST can become a chain (O(n)). They rebalance with rotations so search, insert and delete stay O(log n) in the worst case." },
    { q: "Why do databases use B+ trees?", a: "Wide nodes make the tree very shallow (few disk reads), and linked leaves make range scans fast." },
    { q: "In a Fenwick tree, how do update and query move?", a: "Update goes up with `i += i & -i`; query goes down with `i -= i & -i`. Both take O(log n)." }
  ],

  related: {
    topics: ["trees-intro", "bst", "heap", "trie", "prefix-sum"],
    files: ["Problems/Tree/avlTree.js", "Problems/Tree/redBlackTree.js", "Problems/Tree/heap.js", "Problems/Tree/Trie.js", "Problems/Tree/NaryTree.js", "Problems/Tree/binarySearchTree.js"]
  }
});
