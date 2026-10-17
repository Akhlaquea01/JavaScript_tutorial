// DSA-Learn/data/00-meta.js — page title, topic groups, and the master list of all 41 topics.
//
// HOW THE NOTES ARE ORGANISED
// ------------------------------------------------------------------
// Every topic is shown in the SAME order, so after a long break you always know where to look:
//   In 30 seconds -> Idea -> Analogy -> See it work -> Code line by line -> Speed/memory
//   -> Common mistakes -> How to remember -> Practice -> Check yourself -> Related
//
// `order` below lists all 41 topics (id, group, emoji, title) in the order the sidebar shows them.
// Every id needs a data file with the same id. To add a topic: add a line here, create
// data/NN-id.js, and add its <script> tag to index.html before renderer.js.
//
// TOPIC FILE SHAPE  (data/NN-id.js  ->  window.DSA_TOPICS.push({...}))
//   id, group, emoji, title, tagline, level?, needs?: [topicIds]
//   gist:        ["3-4 bullets: the whole topic in 30 seconds"]
//   complexity:  { time, space, why: ["plain-words paragraphs"], more?: [blocks] }
//   idea:        { plain: ["paragraphs"], signals: ["clues in a problem"], notFor?: [..], more?: [blocks] }
//   analogy:     { title, story: "text" | ["paragraphs"], map: [["in the story","in the algorithm"],..], breaks? }
//   demos:       [ DEMO, ... ]
//   mistakes:    [ { oops, why, fix } ]
//   remember:    { mnemonic, rules: [..], template?: CODE, more?: [blocks] }
//   practice:    { title, level, problem, examples: [{input, output, why?}], hints: [..],
//                  solution: { explain: [..], code: CODE }, tests?: [{ args: [..], expect }] }
//   recall:      [ { q, a } ]
//   related:     { topics: [ids], files: ["Problems/..."] }
//
// CODE  = { fn: "functionName", lines: [ "plain line" | [codeText, note?, id?], ... ] }
//   - write code lines as `backtick` strings and notes as "double quoted" strings
//   - never use backticks or ${} inside a code line (use string concatenation)
//   - `id` ties a line to frames: a frame with at:"id" highlights that line in the stepper
//
// DEMO  = {
//   id, title, intro, codeIntro?,
//   viz: "array" | "tree" | "list" | "grid" | "bars" | "heap" | "intervals" | "graph" | "none",
//   legend: [["cur","what amber means"], ["good", "..."], ...],       tones: cur good bad mark done dim
//   inputs: [ { type, name, label, value, ...limits } ],              numlist | number | text | treelist | intervals | edges | select
//           intervals = "1-3, 2-6" (start-end pairs), edges = "0-1, 0-2" (node-node pairs; set directed:true for one-way)
//   validate(inp) -> error string | null,   random(rnd) -> { name: rawText } (optional),
//   scene(inp) -> static scene (tree viz: { tree: inp.tree }),
//   frames(inp, snap, scene) { snap({ at, say, ...state }); ... }       one snap() per animation step
//   code: CODE,   call(fn, inp) -> result,   (used only by the check script, never by the page)
// }
//   The LAST frame must carry `result` (a JSON value). The check script runs the displayed code and
//   compares it with that result on many random inputs, so the picture can never drift from the code.
//
// FRAME STATE
//   array: cells[], ptr{label:index}, tone{index:tone}, range[l,r], rows[{label,cells,tone}], endSlot, label
//   tree:  tone{nodeId:tone}, path[nodeIds], badge{nodeId:text}, vals{id:text}, hide[ids]   (scene.tree; n-ary via children[])
//   list:  lists[{label, nodes[], links[], ptr{label:index}, tone{index:tone}}]               (linked lists)
//   grid:  grid[][] (cell text), tone{"row,col":tone}, checker
//   bars:  bars[{label, value, tone, note}], max, scale ("log"), unit, title
//   heap:  heaps[{label, hint, values[], tone{index:tone}}]                  scene { caps:[capacity per heap] }
//   intervals: intervals[{s, e, tone, label, lane}], merged[{s, e, tone}], mergedLabel, line, lineLabel
//                                                                           scene { min, max, n, rows?, merged?, mergedMax? }
//   graph: tone{node:tone}, etone{"u-v" or "u>v":tone}, badge{node:text}     scene { n, edges[[u,v]], directed? }
//   any:  vars{name:value}, boxes[{label, kind: stack|queue|set|list|map|buckets|text, items, hint?}],
//          out (final answer banner), outTone ("bad" for a negative result), say (caption, required)
//   Strings support **bold**, *italic* and `code`.

window.DSA_META = {
  title: "DSA Learn",
  subtitle:
    "Notes written so you can come back after months and still get it: plain words, a real-world picture, an animation you can step through, code with a note on every line, the mistakes to avoid, and a small problem to try.",
  storagePrefix: "dsa-learn",
  groups: [
    { id: "basics",    emoji: "🧭", title: "Foundations",             desc: "What data structures, algorithms and complexity mean." },
    { id: "hashing",   emoji: "🗂️", title: "Hashing & Prefix tricks",  desc: "Look things up in O(1) and precompute running totals." },
    { id: "pointers",  emoji: "👉", title: "Pointers & Windows",      desc: "Walk an array smartly instead of checking every pair." },
    { id: "searching", emoji: "🔎", title: "Searching",               desc: "Find things fast, from simple scans to halving the search." },
    { id: "linear",    emoji: "📚", title: "Stacks, Queues & Lists",  desc: "Linear structures and the problems they unlock." },
    { id: "recursion", emoji: "🌀", title: "Recursion & Backtracking", desc: "Solve big problems by solving smaller copies." },
    { id: "trees",     emoji: "🌳", title: "Trees",                   desc: "Hierarchies, traversals, BST and tries." },
    { id: "heaps",     emoji: "⛰️", title: "Heaps & Top-K",           desc: "Always know the biggest or smallest quickly." },
    { id: "intervals", emoji: "📏", title: "Intervals & Greedy",      desc: "Ranges, overlaps and locally-best choices." },
    { id: "graphs",    emoji: "🕸️", title: "Graphs",                  desc: "Things connected to other things." },
    { id: "strategy",  emoji: "🧠", title: "Strategy",                desc: "How to approach and prepare for problems." }
  ],
  order: [
    { id: "data-structures", group: "basics", emoji: "🗂️", title: "Data Structures (DS)" },
    { id: "algorithms", group: "basics", emoji: "⚙️", title: "Algorithms" },
    { id: "time-complexity", group: "basics", emoji: "⏱️", title: "Time Complexity" },
    { id: "space-complexity", group: "basics", emoji: "💾", title: "Space Complexity" },
    { id: "prefix-sum", group: "hashing", emoji: "➕", title: "Prefix Sum" },
    { id: "hashmap", group: "hashing", emoji: "🗺️", title: "HashMap" },
    { id: "frequency-map", group: "hashing", emoji: "🔢", title: "Frequency Map" },
    { id: "hashset", group: "hashing", emoji: "🧮", title: "HashSet" },
    { id: "prefix-product", group: "hashing", emoji: "✖️", title: "Prefix Product" },
    { id: "two-pointer", group: "pointers", emoji: "👉", title: "Two Pointer Approach" },
    { id: "three-pointer", group: "pointers", emoji: "🤟", title: "Three Pointer Approach" },
    { id: "sliding-window", group: "pointers", emoji: "🪟", title: "Sliding Window" },
    { id: "searching", group: "searching", emoji: "🔎", title: "Searching" },
    { id: "linear-search", group: "searching", emoji: "➡️", title: "Linear Search" },
    { id: "binary-search", group: "searching", emoji: "🎯", title: "Binary Search" },
    { id: "stack", group: "linear", emoji: "📚", title: "Stack + Monotonic Stack" },
    { id: "queue-deque", group: "linear", emoji: "📥", title: "Queue, Deque & Windowed Processing" },
    { id: "linked-list", group: "linear", emoji: "🔗", title: "Linked List" },
    { id: "recursion", group: "recursion", emoji: "🔁", title: "Recursion" },
    { id: "backtracking", group: "recursion", emoji: "🧭", title: "Backtracking" },
    { id: "pruning", group: "recursion", emoji: "✂️", title: "Pruning" },
    { id: "trees-intro", group: "trees", emoji: "🌳", title: "Trees & Binary Trees (Basics)" },
    { id: "tree-dfs-traversals", group: "trees", emoji: "🌲", title: "Binary Tree DFS Traversals (Pre / In / Post-order)" },
    { id: "tree-bfs-level-order", group: "trees", emoji: "🌊", title: "Level-Order Traversal (BFS) & Tree Views" },
    { id: "tree-recursion-pattern", group: "trees", emoji: "🧩", title: "Binary Tree Recursion — Root + Left + Right" },
    { id: "tree-height-diameter", group: "trees", emoji: "📏", title: "Height, Max Depth & Diameter" },
    { id: "tree-lca", group: "trees", emoji: "🤝", title: "Lowest Common Ancestor (LCA)" },
    { id: "tree-types-overview", group: "trees", emoji: "🗂️", title: "Tree Family — Kaunsa Tree Kab?" },
    { id: "bst", group: "trees", emoji: "🔍", title: "Binary Search Tree (BST)" },
    { id: "trie", group: "trees", emoji: "🔤", title: "Trie (Prefix Tree)" },
    { id: "heap", group: "heaps", emoji: "⛰️", title: "Heap & Priority Queue" },
    { id: "top-k", group: "heaps", emoji: "🏆", title: "Top-K & Kth Largest / Smallest (Heap)" },
    { id: "two-heaps-median", group: "heaps", emoji: "⚖️", title: "Two Heaps — Running Median" },
    { id: "quickselect", group: "heaps", emoji: "🎯", title: "Quickselect (Kth Element in O(n))" },
    { id: "intervals", group: "intervals", emoji: "📅", title: "Intervals — Overlap & Merge" },
    { id: "sweep-line", group: "intervals", emoji: "🧹", title: "Sweep Line (Meeting Rooms II)" },
    { id: "greedy", group: "intervals", emoji: "🤑", title: "Greedy Algorithms" },
    { id: "graph-basics", group: "graphs", emoji: "🕸️", title: "Graphs — Basics & Representation" },
    { id: "graph-bfs", group: "graphs", emoji: "🌐", title: "Graph BFS (Breadth-First Search)" },
    { id: "graph-dfs", group: "graphs", emoji: "🧗", title: "Graph DFS (Depth-First Search)" },
    { id: "dsa-prep-strategy", group: "strategy", emoji: "🎯", title: "Problem-Solving & DSA Prep Strategy" }

  ]
};
