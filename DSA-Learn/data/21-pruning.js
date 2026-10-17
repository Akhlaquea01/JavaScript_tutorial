// Pruning — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  // The decision tree of Combination Sum, with or without the pruning line.
  // Node label = what is still left to make; the edge label = the candidate just chosen.
  const buildCombo = (nums, target, prune) => {
    const sorted = nums.slice().sort((a, b) => a - b);
    let id = 0;
    const make = (start, remaining, edge) => {
      const node = { id: id++, val: remaining === 0 ? "✓" : String(remaining), children: [] };
      if (edge !== undefined) node.edge = String(edge);
      if (remaining <= 0) return node;
      for (let i = start; i < sorted.length; i++) {
        const c = sorted[i];
        if (c > remaining && prune) {
          node.children.push({ id: id++, val: "✂", children: [], edge: String(c) });
          break;
        }
        node.children.push(make(i, remaining - c, c));
      }
      return node;
    };
    const root = make(0, target);
    return { root, count: id, sorted };
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "pruning",
    group: "recursion",
    emoji: "✂️",
    title: "Pruning",
    tagline: "Cut a whole branch of the search the moment you can tell it cannot lead to a valid answer, instead of exploring it to the bottom.",
    level: "Core",
    needs: ["backtracking"],

    gist: [
      "Pruning = **abandoning a branch of the decision tree early** because it can never produce a valid answer.",
      "Put the check **before** the recursive call, so the dead branch is never entered.",
      "Typical prune conditions: the partial state is already **invalid** (two queens attack), a **limit is exceeded** (sum above target), or it is a **duplicate** of a branch already explored.",
      "Worst-case time is usually unchanged (still exponential), but real running time drops dramatically."
    ],

    complexity: {
      time: "same worst case, far fewer steps in practice",
      space: "O(depth)",
      why: [
        "Pruning does not change the *theoretical* worst case of a backtracking search: an adversarial input can still force it to visit exponentially many nodes. What it changes is how many of those nodes are *actually visited* on typical inputs, often by orders of magnitude.",
        "The earlier a doomed state is detected, the bigger the sub-tree you skip. Cutting at the top of the tree saves far more than cutting near the leaves."
      ]
    },

    idea: {
      plain: [
        "A backtracking search explores a tree of choices. Many branches are **hopeless** long before they reach the bottom: for example, after placing two queens that attack each other, nothing placed afterwards can fix it; once a running sum already exceeds the target, adding more positive numbers only makes it worse.",
        "**Pruning** means testing for that condition and refusing to go down the branch. Instead of descending and failing later, you check **right before the recursive call** and skip (`continue`) or stop the whole loop (`break`).",
        "To prune well you need a quick test for “can this possibly work?”. If the choices are **sorted**, one failing choice often means all the following ones fail too, so a single `break` removes many branches."
      ],
      signals: [
        "A backtracking solution that is **too slow** because it explores obviously hopeless states.",
        "A **constraint** that can be checked on a partial solution (queens attacking, sum too large, characters repeating).",
        "A **sorted** list of choices where larger choices only make things worse.",
        "Inputs that create **duplicate** results and you want to skip repeated values."
      ],
      notFor: [
        "A check that costs more than the work it saves.",
        "A prune condition you are not **certain** is safe. Cutting a branch that does contain an answer gives wrong results (over-pruning)."
      ],
      more: [
        {
          type: "table",
          heading: "Kinds of prune conditions",
          columns: ["Kind", "Example", "How"],
          rows: [
            ["Invalid partial state", "N-Queens: two queens share a column or diagonal", "`continue` before placing"],
            ["Bound exceeded", "Combination Sum: candidate > remaining", "`break` (sorted candidates)"],
            ["Counting limit", "Valid parentheses: more `)` than `(`, or more than n `(`", "Do not recurse"],
            ["Duplicate branch", "Subsets with duplicates: skip an equal neighbour", "`if (i > start && nums[i] === nums[i-1]) continue`"]
          ]
        }
      ]
    },

    analogy: {
      title: "A treasure hunt with “NO ENTRY” signs",
      story: [
        "You explore a cave system looking for treasure, trying every tunnel. Some tunnels have a sign at the entrance: “collapsed 10 metres in”. If you trust the sign, you do not walk into that tunnel at all. You have **pruned** that whole branch of the cave without spending a single step inside it.",
        "The earlier in the cave a sign is placed, the more tunnels it hides behind it. A sign at the first fork saves you from half the cave; a sign one metre from a dead end saves almost nothing. But a *wrong* sign (a tunnel marked closed that actually leads to treasure) means you can miss the treasure forever, so only post signs you are sure about."
      ],
      map: [
        ["Tunnel entrance with a “collapsed” sign", "A failed validity check before the recursive call"],
        ["Skipping that whole tunnel system", "Pruning a sub-tree of the decision tree"],
        ["A sign near the first fork", "Pruning near the root: huge savings"],
        ["A wrong sign", "Over-pruning: valid answers lost"],
        ["Tunnels listed from shortest to longest, all too long past a point", "Sorted choices + `break`"]
      ],
      breaks: "In a real cave a sign costs nothing to read. In code the prune test itself takes time, so it must be much cheaper than the sub-tree it avoids."
    },

    demos: [
      {
        id: "combo",
        title: "Combination Sum: see how many branches pruning removes",
        intro: "Find all ways to reach the target using the candidates (each may be reused). Node label = amount still needed, edge label = candidate just added, `✓` = solution. Set **Prune** to *no* to see the tree **without** the pruning line: the red nodes are wasted calls that overshoot.",
        codeIntro: "Returns every combination of candidates (repeats allowed) that adds up to `target`.",
        viz: "tree",
        legend: [["cur", "the call running now"], ["mark", "on the current path"], ["good", "solution / finished"], ["bad", "cut (✂) or dead end"]],
        inputs: [
          { type: "numlist", name: "nums", label: "Candidates", value: [2, 3, 5], len: [2, 3], min: 2, max: 7, unique: true },
          { type: "number", name: "target", label: "Target", value: 8, min: 3, max: 9 },
          { type: "select", name: "prune", label: "Prune", value: "yes", options: [["yes", "Yes (use the prune line)"], ["no", "No (show the unpruned tree)"]] }
        ],
        validate(inp) {
          return buildCombo(inp.nums, inp.target, false).count > 70 ? "That input makes a tree too big to draw. Use a smaller target or fewer candidates." : null;
        },
        scene(inp) {
          return { tree: buildCombo(inp.nums, inp.target, inp.prune === "yes").root };
        },
        frames(inp, snap) {
          const prune = inp.prune === "yes";
          const sorted = inp.nums.slice().sort((a, b) => a - b);
          let id = 0;
          let calls = 0;
          const stack = [];
          const done = new Set();
          const bad = new Set();
          const path = [];
          const result = [];
          const tones = (cur) => {
            const t = {};
            stack.forEach((i) => (t[i] = "mark"));
            done.forEach((i) => (t[i] = "good"));
            bad.forEach((i) => (t[i] = "bad"));
            if (cur !== null && !bad.has(cur)) t[cur] = "cur";
            return t;
          };
          const boxes = (fresh) => [
            { label: "path", kind: "list", items: path.map((v) => ({ v })) },
            { label: "solutions so far", kind: "list", items: result.map((r, k) => ({ v: "[" + r.join(", ") + "]", new: fresh && k === result.length - 1 })) }
          ];
          const view = (cur, extra) => Object.assign({ tone: tones(cur), path: stack.slice(), boxes: boxes(false), vars: { calls } }, extra);

          const run = (start, remaining) => {
            const me = id++;
            calls++;
            stack.push(me);
            if (remaining === 0) {
              result.push(path.slice());
              snap(view(me, { at: ["found"], boxes: boxes(true), say: "`remaining` is **0**: the path [" + path.join(", ") + "] adds up exactly to " + inp.target + ". **Record a copy.**" }));
              done.add(me);
              stack.pop();
              return;
            }
            if (remaining < 0) {
              bad.add(me);
              snap(view(me, { at: ["explore"], say: "`remaining` is **" + remaining + "**: we overshot, so this call is a **dead end**. Without the prune line we only find that out *after* making the call. Wasted work." }));
              stack.pop();
              return;
            }
            snap(view(me, { at: ["loop"], say: "Call with " + remaining + " still to make. Try the candidates from position " + start + " onward (" + sorted.slice(start).join(", ") + ")." }));
            for (let i = start; i < sorted.length; i++) {
              const c = sorted[i];
              if (c > remaining && prune) {
                const cutId = id++;
                bad.add(cutId);
                snap(view(me, { at: ["prune"], say: "**" + c + " > " + remaining + "**: this candidate is too big. The candidates are sorted, so every later one is too big too. **Prune: `break`** and skip all of them without a single call." }));
                break;
              }
              path.push(c);
              snap(view(me, { at: ["choose"], say: "**Choose** " + c + ": path [" + path.join(", ") + "], " + (remaining - c) + " left to make." }));
              run(i, remaining - c);
              path.pop();
              snap(view(me, { at: ["unchoose"], say: "**Un-choose** " + c + ": path back to [" + path.join(", ") + "]." }));
            }
            done.add(me);
            stack.pop();
          };

          snap({ at: ["call"], tone: {}, boxes: boxes(false), vars: { calls }, say: "Sort the candidates first (needed so that one failing candidate means all later ones fail). We need to make **" + inp.target + "**." + (prune ? "" : " Pruning is switched **off** for this run.") });
          run(0, inp.target);
          const withP = buildCombo(inp.nums, inp.target, true).count;
          const without = buildCombo(inp.nums, inp.target, false).count;
          snap({
            at: ["done"],
            tone: tones(null),
            path: [],
            boxes: boxes(false),
            vars: { calls },
            out: result.length + " solution" + (result.length === 1 ? "" : "s") + ", tree of " + (prune ? withP : without) + " nodes",
            say: "**" + result.length + "** combination" + (result.length === 1 ? "" : "s") + " found. " + (prune ? "With pruning the tree has " + withP + " nodes; without it it would have " + without + "." : "Without pruning the tree has " + without + " nodes; with the prune line it would have only " + withP + ". Same answers, less work."),
            result: result.map((r) => r.slice())
          });
        },
        code: {
          fn: "combinationSum",
          lines: [
            `function combinationSum(candidates, target) {`,
            [`  candidates.sort((a, b) => a - b);`, "Sort so that “too big” stays true for every later candidate.", "init"],
            `  const result = [];`,
            `  function backtrack(start, path, remaining) {`,
            [`    if (remaining === 0) { result.push([...path]); return; }`, "Exactly the target: record a copy.", "found"],
            [`    for (let i = start; i < candidates.length; i++) {`, "Candidates from `start` on (`start` stops reordered duplicates).", "loop"],
            [`      if (candidates[i] > remaining) break;`, "**PRUNE.** Too big, so this and all later (bigger) candidates are hopeless. This check comes **before** the recursive call.", "prune"],
            [`      path.push(candidates[i]);`, "Choose.", "choose"],
            [`      backtrack(i, path, remaining - candidates[i]);`, "Explore. `i` (not `i + 1`) because a candidate may be reused.", "explore"],
            [`      path.pop();`, "Un-choose.", "unchoose"],
            `    }`,
            `  }`,
            [`  backtrack(0, [], target);`, "", "call"],
            [`  return result;`, "", "done"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.nums.slice(), inp.target)
      },

      {
        id: "queens",
        title: "N-Queens: reject a square the moment it is attacked",
        intro: "Place one queen per row so that no two attack each other (same column or diagonal). Each row tries columns left to right. A square that is attacked is **pruned** immediately (red). When a row has no safe square, we **backtrack** and move the previous queen.",
        codeIntro: "Finds the first valid arrangement and returns it as one column number per row (or `null` if none exists).",
        viz: "grid",
        legend: [["good", "queen placed"], ["bad", "attacked square / queen being removed"]],
        inputs: [{ type: "number", name: "n", label: "Board size n", value: 4, min: 4, max: 6 }],
        frames(inp, snap) {
          const n = inp.n;
          const board = [];
          const cols = new Set();
          const d1 = new Set();
          const d2 = new Set();
          const grid = () => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (board[r] === c ? "♛" : "")));
          const queens = () => Object.fromEntries(board.map((c, r) => [r + "," + c, "good"]));
          const view = (tone, extra) => Object.assign({ grid: grid(), checker: true, tone: { ...queens(), ...tone }, vars: { row: board.length, queens: board.length } }, extra);

          const place = (row) => {
            if (row === n) return true;
            for (let col = 0; col < n; col++) {
              if (cols.has(col) || d1.has(row - col) || d2.has(row + col)) {
                const clash = board.findIndex((c, r) => c === col || r - c === row - col || r + c === row + col);
                const same = board[clash] === col;
                snap(view({ [row + "," + col]: "bad", [clash + "," + board[clash]]: "bad" }, {
                  at: ["loop", "prune"],
                  say: "Row " + row + ", column " + col + ": attacked by the queen at (row " + clash + ", column " + board[clash] + ") along " + (same ? "the **column**" : "a **diagonal**") + ". **Prune**: do not place here, move on to the next column."
                }));
                continue;
              }
              cols.add(col);
              d1.add(row - col);
              d2.add(row + col);
              board.push(col);
              snap(view({}, { at: ["loop", "place"], say: "Row " + row + ", column " + col + " is safe. **Place a queen** and go on to row " + (row + 1) + "." }));
              if (place(row + 1)) return true;
              snap(view({ [row + "," + col]: "bad" }, { at: ["backtrack"], say: "Row " + (row + 1) + " has **no safe square**, so this placement leads nowhere. **Backtrack**: remove the queen at (row " + row + ", column " + col + ") and try the next column in row " + row + "." }));
              board.pop();
              cols.delete(col);
              d1.delete(row - col);
              d2.delete(row + col);
            }
            return false;
          };

          snap(view({}, { at: ["init"], say: "An empty " + n + " × " + n + " board. We place one queen per row, top to bottom, and check each square before using it." }));
          const ok = place(0);
          snap(view({}, {
            at: ["done"],
            out: ok ? "Solution (column of each row): [" + board.join(", ") + "]" : "No solution",
            outTone: ok ? undefined : "bad",
            say: ok ? "All " + n + " rows have a queen and none attack each other. Columns by row: **[" + board.join(", ") + "]**. Pruning rejected every bad square the instant it was seen." : "No arrangement exists.",
            result: ok ? board.slice() : null
          }));
        },
        code: {
          fn: "solveNQueens",
          lines: [
            `function solveNQueens(n) {`,
            [`  const cols = new Set(), diag1 = new Set(), diag2 = new Set();`, "Columns and the two diagonal directions that already hold a queen. Cells on one diagonal share `row - col`; on the other, `row + col`.", "init"],
            `  const board = [];`,
            `  function place(row) {`,
            [`    if (row === n) return true;`, "Every row has a queen: solved.", "full"],
            [`    for (let col = 0; col < n; col++) {`, "Try each column of this row.", "loop"],
            [`      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;`, "**PRUNE.** An attacked square is skipped before anything is placed. Three O(1) set lookups instead of scanning the board.", "prune"],
            [`      cols.add(col); diag1.add(row - col); diag2.add(row + col); board.push(col);`, "Choose: place the queen and record what it attacks.", "place"],
            [`      if (place(row + 1)) return true;`, "Explore the next row. If it succeeds, stop at once.", "explore"],
            [`      board.pop(); cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);`, "Un-choose: take the queen back, including its attack records.", "backtrack"],
            `    }`,
            `    return false;`,
            `  }`,
            [`  return place(0) ? board.slice() : null;`, "", "done"],
            `}`
          ]
        },
        call: (fn, inp) => fn(inp.n)
      }
    ],

    mistakes: [
      {
        oops: "Checking validity **after** the recursive call",
        why: "By then you have already paid for the whole sub-tree. The point of pruning is to avoid entering it.",
        fix: "Put the test at the top of the loop body (or at the start of the call) and `continue` / `return` / `break` before choosing."
      },
      {
        oops: "Pruning too much (a condition that can reject a branch that does contain an answer)",
        why: "The search is then incomplete: valid solutions are silently lost, and the code looks fine on small tests.",
        fix: "Prove the condition: “if this fails now, it can never succeed later”. Test against a brute force."
      },
      {
        oops: "Using `break` without sorting the candidates",
        why: "`break` assumes that *all later candidates also fail*. On unsorted data a later candidate might still fit.",
        fix: "Sort first. If you cannot sort, use `continue` instead of `break`."
      },
      {
        oops: "Not undoing the bookkeeping (sets, counts) after returning",
        why: "Stale entries in `cols` or `diag1` make squares look attacked when they are not, so valid placements are pruned.",
        fix: "Every `add` made before the recursive call needs a matching `delete` after it."
      },
      {
        oops: "Expecting pruning to change the Big-O",
        why: "The worst case is still exponential; pruning only reduces the typical amount of work.",
        fix: "Describe it as “same worst case, much faster in practice”."
      }
    ],

    remember: {
      mnemonic: "Check before you dive. A dead state dies at the door.",
      rules: [
        "Prune **before** the recursive call: `if (!promising) continue;`.",
        "Sorted choices + a failing one → `break`. Otherwise → `continue`.",
        "The earlier in the tree you cut, the more you save.",
        "Every prune condition must be provably safe (never discards a real answer)."
      ],
      template: {
        lines: [
          [`for (const choice of choices) {`, ""],
          [`  if (!isPromising(choice, path)) continue;`, "PRUNE: skip before choosing (use `break` if later choices fail too)."],
          [`  path.push(choice);`, "Choose"],
          [`  backtrack(path, remainingChoices);`, "Explore"],
          [`  path.pop();`, "Un-choose"],
          `}`
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Techniques/Backtracking/combinationSum.js` and `solveNQueens.js`. Duplicates trick for subsets / permutations with repeated values: **sort**, then `if (i > start && nums[i] === nums[i - 1]) continue;`."
        }
      ]
    },

    practice: {
      title: "Generate Valid Parentheses",
      level: "Medium",
      problem: "Given `n` pairs of parentheses, return **all well-formed** combinations, with `\"(\"` tried before `\")\"` so the results come out in a fixed order. For `n = 0` return `[\"\"]`.",
      examples: [
        { input: "2", output: "[\"(())\", \"()()\"]" },
        { input: "3", output: "[\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"]" }
      ],
      hints: [
        "Build the string one character at a time. You could try both `\"(\"` and `\")\"` at every step, but most of those strings are invalid. Which simple rules identify an invalid prefix **immediately**?",
        "Track how many `(` you have used (`open`) and how many `)` (`close`). You may add `\"(\"` only while `open < n`. You may add `\")\"` only while `close < open`.",
        "Those two checks are the pruning. When the string has length `2 * n`, it is a complete valid answer."
      ],
      solution: {
        explain: [
          "Rather than generate every string of length 2n and filter, we only ever extend a prefix in ways that keep it valid: never more than n opens, never a close without an unmatched open. Invalid branches are never entered, so every finished string is valid.",
          "The number of results is the n-th Catalan number, so the time is proportional to the output size."
        ],
        code: {
          fn: "generateParenthesis",
          lines: [
            `function generateParenthesis(n) {`,
            [`  const result = [];`, ""],
            `  function build(current, open, close) {`,
            [`    if (current.length === 2 * n) { result.push(current); return; }`, "A complete string (it is valid by construction)."],
            [`    if (open < n) build(current + "(", open + 1, close);`, "PRUNE: we may open another bracket only if we have not used all n."],
            [`    if (close < open) build(current + ")", open, close + 1);`, "PRUNE: we may close only a bracket that is currently open."],
            `  }`,
            [`  build("", 0, 0);`, ""],
            [`  return result;`, ""],
            `}`
          ]
        }
      },
      tests: [
        { args: [0], expect: [""] },
        { args: [1], expect: ["()"] },
        { args: [2], expect: ["(())", "()()"] },
        { args: [3], expect: ["((()))", "(()())", "(())()", "()(())", "()()()"] }
      ]
    },

    recall: [
      { q: "What is pruning, in one sentence?", a: "Skipping a whole branch of the search tree because you can already tell it cannot lead to a valid answer." },
      { q: "Where should the prune check go: before or after the recursive call?", a: "Before. The aim is never to enter the dead branch at all." },
      { q: "When can you use `break` instead of `continue` when pruning?", a: "When the choices are sorted and a failing choice implies every later choice also fails (as in Combination Sum)." },
      { q: "Does pruning change the worst-case time complexity?", a: "No. The worst case stays exponential; pruning cuts the typical amount of work, often dramatically." },
      { q: "What are the prune conditions for generating valid parentheses?", a: "Add `(` only while `open < n`; add `)` only while `close < open`." }
    ],

    related: {
      topics: ["backtracking", "recursion", "greedy", "time-complexity"],
      files: ["Problems/Techniques/Backtracking/combinationSum.js", "Problems/Techniques/Backtracking/solveNQueens.js", "Problems/Techniques/Backtracking/permute.js"]
    }
  });
})();
