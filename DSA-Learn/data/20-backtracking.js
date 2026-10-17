// Backtracking — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "backtracking",
  group: "recursion",
  emoji: "🧭",
  title: "Backtracking",
  tagline: "Try every possibility one choice at a time: choose, explore deeper, then undo the choice so the next one can be tried.",
  level: "Core",
  needs: ["recursion"],

  gist: [
    "Backtracking = **recursion + undo**. Build a solution step by step, and when you finish a branch, **undo** the last step and try the next option.",
    "The loop inside every backtracking function is the same three beats: **choose → explore → un-choose**.",
    "It explores a **decision tree**: subsets, permutations, combinations, N-Queens, Sudoku, word search.",
    "Worst case is exponential (2ⁿ subsets, n! permutations), so pair it with **pruning** to cut dead branches early."
  ],

  complexity: {
    time: "exponential: O(2ⁿ) subsets, O(n!) permutations",
    space: "O(depth) + the output",
    why: [
      "Backtracking visits every node of the decision tree. A subset problem has two options per item, so 2ⁿ leaves; a permutation problem has n choices, then n − 1, then n − 2…, so n! leaves. There is no way around that when you must *list* every solution.",
      "Besides the output itself, memory is the recursion depth plus the current `path`: O(n) for these problems."
    ],
    more: [
      {
        type: "table",
        heading: "How big is the tree?",
        columns: ["Problem", "Number of results", "Typical time"],
        rows: [
          ["Subsets of n items", "2ⁿ", "O(n · 2ⁿ) (copying each subset)"],
          ["Permutations of n items", "n!", "O(n · n!)"],
          ["Combinations C(n, k)", "n! / (k!(n−k)!)", "O(k · C(n, k))"],
          ["N-Queens, Sudoku", "few solutions, huge search", "Exponential, rescued by pruning"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Some problems ask for **all** the ways to do something (every subset, every ordering, every valid placement) or for **one** way that satisfies rules. You cannot compute these with a formula, so you search. Backtracking is the organised way to search.",
      "At each step you have a list of choices. **Choose** one (add it to the current `path`), **explore** by recursing with that choice made, and when that whole branch is finished, **un-choose** (remove it from the path) so the next choice starts from a clean state. The undo is what separates backtracking from plain recursion.",
      "Picture it as a **decision tree**: each node is a partial solution, each edge is a choice. Backtracking walks that tree depth-first, recording a result whenever a node is a complete (valid) solution."
    ],
    signals: [
      "“Return **all** subsets / permutations / combinations / arrangements / paths”.",
      "A **constraint-satisfaction** puzzle: N-Queens, Sudoku, word search in a grid, maze solving.",
      "Constraints say n is small (about 20 or less): exponential time is acceptable.",
      "“Generate all valid …” (for example all well-formed parentheses)."
    ],
    notFor: [
      "Problems where only the **count** or the **best** answer matters and sub-problems overlap: use dynamic programming.",
      "A single optimal choice at every step: that is greedy."
    ],
    more: [
      {
        type: "table",
        heading: "Common uses",
        columns: ["Family", "Examples"],
        rows: [
          ["Enumeration", "Subsets (power set), permutations, combinations"],
          ["Constraint satisfaction", "N-Queens, Sudoku solver, rat in a maze"],
          ["Search in a grid / string", "Word search, palindrome partitioning"],
          ["Generation", "Valid parentheses, combination sum"]
        ]
      },
      {
        type: "callout",
        kind: "warning",
        text: "When you store a result, store a **copy** of the path: `result.push([...path])`. If you push `path` itself, later `push` / `pop` calls change every stored result."
      }
    ]
  },

  analogy: {
    title: "Exploring a maze with a piece of chalk",
    story: [
      "You are in a maze with many junctions. At a junction you **choose** a corridor and draw a chalk mark to show it is on your current route. You **explore**: walk down it and repeat at the next junction. If you hit a dead end (or find the exit and write it down), you walk back and **rub out the last chalk mark** (un-choose) so that your route is clean again, then try the next corridor from that junction.",
      "Your chalk marks are always exactly the path from the entrance to where you stand: that is the `path` array. Because every mark is rubbed out when you return, you never confuse the route you are on with a route you already finished."
    ],
    map: [
      ["A junction", "A recursive call (a node of the decision tree)"],
      ["Picking a corridor and chalking it", "`path.push(choice)`: choose"],
      ["Walking down the corridor", "`backtrack(...)`: explore"],
      ["Rubbing out the chalk mark when you return", "`path.pop()`: un-choose"],
      ["Reaching the exit", "A complete solution: copy `path` into `result`"],
      ["Dead end", "A call that returns with nothing to add"]
    ],
    breaks: "In a real maze you remember which corridors you have tried. Backtracking relies on a fixed order of choices (the loop) to make sure each option is tried exactly once."
  },

  demos: [
    {
      id: "subsets",
      title: "Subsets: every state is an answer",
      intro: "Each circle is a call to `backtrack`, labelled with the current path. A call records its path as a subset, then tries to **add each remaining item**, recurses, and **removes it again**. Edge labels show the item added.",
      codeIntro: "Returns all subsets (the power set) of the numbers.",
      viz: "tree",
      legend: [["cur", "the call running now"], ["mark", "on the current path"], ["good", "finished"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers (all different)", value: [1, 2, 3], len: [2, 4], min: 1, max: 9, unique: true }],
      scene(inp) {
        const nums = inp.nums;
        let id = 0;
        const make = (start, path) => {
          const node = { id: id++, val: "[" + path.join(",") + "]", children: [] };
          for (let i = start; i < nums.length; i++) {
            const child = make(i + 1, path.concat(nums[i]));
            child.edge = String(nums[i]);
            node.children.push(child);
          }
          return node;
        };
        return { tree: make(0, []) };
      },
      frames(inp, snap) {
        const nums = inp.nums;
        const n = nums.length;
        let id = 0;
        const stack = [];
        const done = new Set();
        const path = [];
        const result = [];
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = "good"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const boxes = (fresh) => [
          { label: "path (current choices)", kind: "list", items: path.map((v) => ({ v })) },
          { label: "result so far", kind: "list", items: result.map((r, k) => ({ v: "[" + r.join(", ") + "]", new: fresh && k === result.length - 1 })) }
        ];
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), boxes: boxes(false) }, extra);

        const run = (start) => {
          const me = id++;
          stack.push(me);
          result.push(path.slice());
          snap(view(me, { at: ["call", "record"], boxes: boxes(true), say: "Call `backtrack(" + start + ", [" + path.join(", ") + "])`. Every path is a valid subset, so **record a copy**: [" + path.join(", ") + "]." }));
          for (let i = start; i < n; i++) {
            path.push(nums[i]);
            snap(view(me, { at: ["loop", "choose"], say: "**Choose** " + nums[i] + ": push it, so the path becomes [" + path.join(", ") + "]. Next, explore with this choice made." }));
            run(i + 1);
            path.pop();
            snap(view(me, { at: ["unchoose"], say: "That whole branch is finished. **Un-choose** " + nums[i] + ": pop it, so the path is back to [" + path.join(", ") + "] and the next option can be tried." }));
          }
          done.add(me);
          stack.pop();
        };
        snap({ at: ["init"], tone: {}, boxes: boxes(false), say: "We start with an empty path. The root call will record the empty subset, then try each item as the first choice." });
        run(0);
        snap({
          at: ["done"],
          tone: tones(null),
          boxes: boxes(false),
          out: result.length + " subsets (2^" + n + " = " + Math.pow(2, n) + ")",
          say: "All **" + result.length + "** subsets were found, which is 2^" + n + ": every item is either in or out. The tree has one node per subset.",
          result: result.map((r) => r.slice())
        });
      },
      code: {
        fn: "subsets",
        lines: [
          `function subsets(nums) {`,
          [`  const result = [];`, "All finished answers.", "init"],
          `  function backtrack(start, path) {`,
          [`    result.push([...path]);`, "Every path is a valid subset. Store a **copy** (`[...path]`), because `path` keeps changing.", "record"],
          [`    for (let i = start; i < nums.length; i++) {`, "Only consider items from `start` on, so each subset is built in one fixed order and never repeated.", "loop"],
          [`      path.push(nums[i]);`, "**Choose** nums[i].", "choose"],
          [`      backtrack(i + 1, path);`, "**Explore** with it chosen. `i + 1` means the same item cannot be used twice.", "explore"],
          [`      path.pop();`, "**Un-choose**: restore the path before trying the next item.", "unchoose"],
          `    }`,
          `  }`,
          [`  backtrack(0, []);`, "Start with an empty path.", "call"],
          [`  return result;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "permutations",
      title: "Permutations: use each item once, in every order",
      intro: "Here every call tries **every item not already used**. The `used` flags stop an item appearing twice in one arrangement. Leaves of the tree are complete permutations.",
      codeIntro: "Returns all orderings of the numbers.",
      viz: "tree",
      legend: [["cur", "the call running now"], ["mark", "on the current path"], ["good", "finished"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers (all different)", value: [1, 2, 3], len: [2, 3], min: 1, max: 9, unique: true }],
      scene(inp) {
        const nums = inp.nums;
        let id = 0;
        const make = (path, used) => {
          const node = { id: id++, val: "[" + path.join(",") + "]", children: [] };
          if (path.length === nums.length) return node;
          for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            const u = used.slice();
            u[i] = true;
            const child = make(path.concat(nums[i]), u);
            child.edge = String(nums[i]);
            node.children.push(child);
          }
          return node;
        };
        return { tree: make([], new Array(nums.length).fill(false)) };
      },
      frames(inp, snap) {
        const nums = inp.nums;
        const n = nums.length;
        let id = 0;
        const stack = [];
        const done = new Set();
        const path = [];
        const used = new Array(n).fill(false);
        const result = [];
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = "good"));
          if (cur !== null) t[cur] = "cur";
          return t;
        };
        const boxes = (fresh) => [
          { label: "path (current choices)", kind: "list", items: path.map((v) => ({ v })) },
          { label: "used flags", kind: "list", items: nums.map((v, i) => ({ v: v + (used[i] ? " ✓" : ""), tone: used[i] ? "mark" : undefined })) },
          { label: "result so far", kind: "list", items: result.map((r, k) => ({ v: "[" + r.join(", ") + "]", new: fresh && k === result.length - 1 })) }
        ];
        const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), boxes: boxes(false) }, extra);

        const run = () => {
          const me = id++;
          stack.push(me);
          if (path.length === n) {
            result.push(path.slice());
            snap(view(me, { at: ["full"], boxes: boxes(true), say: "The path has all " + n + " items: **[" + path.join(", ") + "]** is a complete permutation. Record a copy and return." }));
            done.add(me);
            stack.pop();
            return;
          }
          snap(view(me, { at: ["loop"], say: "Call with path [" + path.join(", ") + "]. Try every item that is **not used yet**." }));
          for (let i = 0; i < n; i++) {
            if (used[i]) {
              snap(view(me, { at: ["skip"], say: nums[i] + " is already in the path, so **skip** it." }));
              continue;
            }
            used[i] = true;
            path.push(nums[i]);
            snap(view(me, { at: ["choose"], say: "**Choose** " + nums[i] + ": mark it used and push it. Path: [" + path.join(", ") + "]." }));
            run();
            path.pop();
            used[i] = false;
            snap(view(me, { at: ["unchoose"], say: "**Un-choose** " + nums[i] + ": pop it and mark it **unused** again, so other branches may use it. Path: [" + path.join(", ") + "]." }));
          }
          done.add(me);
          stack.pop();
        };
        snap({ at: ["init"], tone: {}, boxes: boxes(false), say: "Start with an empty path and nothing used. Every complete path of length " + n + " will be a permutation." });
        run();
        snap({
          at: ["done"],
          tone: tones(null),
          boxes: boxes(false),
          out: result.length + " permutations",
          say: "**" + result.length + "** permutations found. For " + n + " items that is " + n + "! = " + result.length + ", the number of leaves of this tree.",
          result: result.map((r) => r.slice())
        });
      },
      code: {
        fn: "permute",
        lines: [
          `function permute(nums) {`,
          [`  const result = [], path = [];`, "", "init"],
          [`  const used = new Array(nums.length).fill(false);`, "Which items are already in the current path.", "init"],
          `  function backtrack() {`,
          [`    if (path.length === nums.length) { result.push([...path]); return; }`, "A full-length path is a complete permutation: store a copy and stop going deeper.", "full"],
          [`    for (let i = 0; i < nums.length; i++) {`, "Try every item...", "loop"],
          [`      if (used[i]) continue;`, "...except those already used in this path.", "skip"],
          [`      used[i] = true; path.push(nums[i]);`, "**Choose**: mark it used and add it.", "choose"],
          [`      backtrack();`, "**Explore** the rest of the arrangement.", "explore"],
          [`      path.pop(); used[i] = false;`, "**Un-choose**: remove it **and clear the used flag**.", "unchoose"],
          `    }`,
          `  }`,
          `  backtrack();`,
          [`  return result;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    }
  ],

  mistakes: [
    {
      oops: "Pushing `path` itself into the results instead of a copy",
      why: "`result.push(path)` stores a reference. Later `push` / `pop` calls change it, so every stored answer ends up identical (usually empty).",
      fix: "`result.push([...path])` (or `path.slice()`)."
    },
    {
      oops: "Forgetting to un-choose (no `path.pop()`)",
      why: "The choice stays in the path, so every later branch starts from a polluted state and answers are wrong.",
      fix: "Whatever you do before the recursive call, undo right after it. Choose and un-choose come in pairs."
    },
    {
      oops: "Forgetting to reset the `used` flag in permutations",
      why: "Once an item is marked used it can never be used again, so you only find the first permutation.",
      fix: "`used[i] = false` right after `path.pop()`."
    },
    {
      oops: "Wrong loop start (`i = 0` for subsets / combinations, or `start` for permutations)",
      why: "Subsets and combinations ignore order, so each branch must only look **forward** (`start`), or you generate duplicates like [1,2] and [2,1]. Permutations care about order, so they must look at **all** unused items.",
      fix: "Order does not matter → loop from `start`, recurse with `i + 1`. Order matters → loop from 0 and use a `used` array."
    },
    {
      oops: "Missing the base case or the “record” step",
      why: "Without the base case the recursion never ends; without the record step nothing is ever saved.",
      fix: "Decide when a path is a complete solution (every node for subsets, `path.length === n` for permutations) and store it there."
    }
  ],

  remember: {
    mnemonic: "Choose → Explore → Un-choose. Record a copy when the path is a solution.",
    rules: [
      "Backtracking = recursion + undo.",
      "Order irrelevant (subsets, combinations): loop from `start`, recurse with `i + 1`. Order matters (permutations): loop from 0 with a `used` array.",
      "Always push a **copy** of the path into the result.",
      "Time is the size of the decision tree (2ⁿ, n!), so add **pruning** whenever you can."
    ],
    template: {
      lines: [
        [`function backtrack(path, choices) {`, ""],
        [`  if (isSolution(path)) { result.push([...path]); return; }`, "Record a copy of a finished solution."],
        [`  for (const choice of choices) {`, "Every option available at this step."],
        [`    if (!isValid(choice, path)) continue;`, "Skip bad options early (see Pruning)."],
        [`    path.push(choice);`, "1. Choose"],
        [`    backtrack(path, remainingChoices);`, "2. Explore"],
        [`    path.pop();`, "3. Un-choose"],
        `  }`,
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Techniques/Backtracking/permute.js`, `combinationSum.js`, `solveNQueens.js` and `wordSearch.js`. Next topic: **Pruning** shows how to cut dead branches early."
      }
    ]
  },

  practice: {
    title: "All Binary Strings of Length n",
    level: "Easy",
    problem: "Return every binary string of length `n`, in increasing order (`\"0\"` is tried before `\"1\"`). For `n = 0` return `[\"\"]`.",
    examples: [
      { input: "2", output: "[\"00\", \"01\", \"10\", \"11\"]" },
      { input: "1", output: "[\"0\", \"1\"]" }
    ],
    hints: [
      "At every position you have exactly two choices: `\"0\"` or `\"1\"`. When the path has length `n`, you have a finished string.",
      "Use the three beats: push a bit, recurse, pop the bit.",
      "Join the path with `path.join(\"\")` when you record it. Try `\"0\"` before `\"1\"` to get increasing order."
    ],
    solution: {
      explain: [
        "A decision tree where each node has two children (`0` and `1`) and depth n. Choosing, exploring and un-choosing a bit visits all 2ⁿ leaves in order.",
        "Time O(n · 2ⁿ), stack depth O(n)."
      ],
      code: {
        fn: "binaryStrings",
        lines: [
          `function binaryStrings(n) {`,
          [`  const result = [], path = [];`, "Finished strings, and the bits chosen so far."],
          `  function backtrack() {`,
          [`    if (path.length === n) { result.push(path.join("")); return; }`, "Complete string: record it and stop."],
          [`    for (const bit of ["0", "1"]) {`, "Two options at every position, `0` first."],
          [`      path.push(bit);`, "Choose."],
          [`      backtrack();`, "Explore."],
          [`      path.pop();`, "Un-choose."],
          `    }`,
          `  }`,
          `  backtrack();`,
          [`  return result;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: [0], expect: [""] },
      { args: [1], expect: ["0", "1"] },
      { args: [2], expect: ["00", "01", "10", "11"] },
      { args: [3], expect: ["000", "001", "010", "011", "100", "101", "110", "111"] }
    ]
  },

  recall: [
    { q: "What are the three beats inside a backtracking loop?", a: "Choose (add to the path), explore (recurse), un-choose (remove from the path)." },
    { q: "How is backtracking different from plain recursion?", a: "Backtracking undoes its choice after exploring, so each branch starts from a clean state, and it systematically tries every option." },
    { q: "Why do you store `[...path]` and not `path` in the result?", a: "`path` is reused and mutated; storing the reference would make every stored result change with it." },
    { q: "Subsets loop from `start`; permutations loop from 0 with `used`. Why?", a: "Subsets ignore order, so each branch only looks forward to avoid duplicates. Permutations care about order, so any unused item may come next." },
    { q: "How big are the decision trees for subsets and permutations of n items?", a: "2ⁿ leaves for subsets and n! for permutations, so the time is exponential." }
  ],

  related: {
    topics: ["recursion", "pruning", "tree-dfs-traversals", "greedy"],
    files: ["Problems/Techniques/Backtracking/permute.js", "Problems/Techniques/Backtracking/combinationSum.js", "Problems/Techniques/Backtracking/solveNQueens.js", "Problems/Techniques/Backtracking/wordSearch.js"]
  }
});
