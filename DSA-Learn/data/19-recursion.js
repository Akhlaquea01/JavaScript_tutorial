// Recursion — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "recursion",
  group: "recursion",
  emoji: "🔁",
  title: "Recursion",
  tagline: "A function that solves a problem by calling itself on a smaller copy of the same problem, until the problem is so small the answer is obvious.",
  level: "Core",
  needs: ["stack", "space-complexity"],

  gist: [
    "Every recursive function needs a **base case** (the smallest problem, answered directly) and a **recursive case** (calls itself with a *smaller* input).",
    "Each call waits on the **call stack**. When the base case returns, the calls unwind one by one and combine their answers.",
    "Each call must move toward the base case, or the recursion never stops (stack overflow).",
    "A function that calls itself **twice** (like naive Fibonacci) makes an exponential tree of calls. **Memoization** (caching answers) fixes that."
  ],

  complexity: {
    time: "calls × work per call",
    space: "O(depth) call stack",
    why: [
      "To find the time, count how many calls are made and multiply by the work each call does itself. A single chain like factorial makes n calls: O(n). A function that calls itself twice on `n - 1` (naive Fibonacci) makes about 2ⁿ calls: O(2ⁿ).",
      "Memory is the **depth** of the deepest chain of unfinished calls, because every one of them keeps a stack frame: factorial uses O(n); Fibonacci uses O(n) as well (the tree is wide but its depth is only n)."
    ],
    more: [
      {
        type: "table",
        heading: "Common recursive shapes",
        columns: ["Shape", "Example", "Time", "Stack depth"],
        rows: [
          ["One call on n - 1", "factorial(n)", "O(n)", "O(n)"],
          ["Two calls on n - 1, n - 2", "naive fib(n)", "O(2ⁿ)", "O(n)"],
          ["Same, with memoization", "fibMemo(n)", "O(n)", "O(n)"],
          ["One call on n / 2", "binary search", "O(log n)", "O(log n)"],
          ["Two calls on n / 2 plus O(n) work", "merge sort", "O(n log n)", "O(log n)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Recursion means a function **calls itself**. It works because many big problems are made of a smaller copy of the same problem: the length of a list is 1 plus the length of the list without its first item; n! is n times (n − 1)!.",
      "Every recursive function has two parts. The **base case** is the smallest problem, answered directly without any further call (this is what stops the recursion). The **recursive case** reduces the problem a little and calls the function again on the smaller input, then uses that answer to build its own.",
      "While a call waits for its smaller call to finish it sits on the **call stack**. When the base case returns, the stack **unwinds**: each waiting call receives an answer, finishes its own work, and returns to the one below it.",
      "The most useful mindset is the *leap of faith*: assume the recursive call already returns the correct answer for the smaller problem, and only decide how to turn that into the answer for the current one."
    ],
    signals: [
      "The problem is defined in terms of **smaller versions of itself** (a tree, nested lists, “n − 1”).",
      "You work with **trees** or graphs: each child is a smaller tree.",
      "You must explore **all possibilities** (subsets, permutations, paths): that is backtracking.",
      "A **divide and conquer** idea: split in half, solve each half, combine (merge sort, binary search)."
    ],
    notFor: [
      "A plain loop over a list. A `for` loop is simpler and uses O(1) memory.",
      "Very deep recursion (tens of thousands of levels) in JavaScript: the stack overflows. Use a loop or an explicit stack."
    ],
    more: [
      {
        type: "table",
        heading: "Kinds of recursion",
        columns: ["Kind", "What it means", "Example"],
        rows: [
          ["**Direct**", "A function calls itself", "`factorial` calls `factorial`"],
          ["**Indirect**", "A calls B and B calls A", "`isEven` and `isOdd`"],
          ["**Tail**", "The recursive call is the very last thing done (nothing waits afterwards). JavaScript engines generally do **not** optimise it, so it can still overflow", "`go(n, acc) { return n === 0 ? acc : go(n - 1, acc * n); }`"],
          ["**Tree**", "More than one recursive call per call", "naive `fib(n - 1) + fib(n - 2)`"]
        ]
      },
      {
        type: "table",
        heading: "Recursion vs iteration",
        columns: ["", "Recursion", "Iteration (loop)"],
        rows: [
          ["Reads best for", "Trees, graphs, branching problems", "Simple linear scans"],
          ["Extra memory", "O(depth) call stack", "Usually O(1)"],
          ["Risk", "Stack overflow when very deep", "None from depth"]
        ]
      }
    ]
  },

  analogy: {
    title: "“How many people are in front of you?”",
    story: [
      "You are standing somewhere in a long queue and want to know how many people are ahead of you. You cannot see the front, so you ask the person in front: “how many people are ahead of **you**?”. They cannot see the front either, so they ask the person in front of them, and so on.",
      "Finally the person at the very front says **“nobody: 0”**. That is the base case. Now the answer travels back: the second person says “0 + 1 = 1”, the third “1 + 1 = 2”, and so on until the answer reaches you. Everyone was *waiting* for the person ahead before they could answer: those waiting people are the call stack.",
      "Think of a set of **Russian dolls** too: open a doll and inside is a smaller doll of the same shape, until the tiniest doll that does not open (the base case)."
    ],
    map: [
      ["Each person in the queue", "One call of the function"],
      ["Asking the person in front", "The recursive call on a smaller problem"],
      ["The person at the front: “0”", "The base case"],
      ["Everyone waiting for an answer", "The call stack"],
      ["“My answer is theirs + 1”", "Combining the smaller answer into your own"],
      ["The answer travelling back down the queue", "The stack unwinding"]
    ],
    breaks: "In a real queue everyone asks in parallel and the whole thing is over in seconds. In code, calls are strictly nested: the deepest call must finish first, and every waiting call occupies memory until it does."
  },

  demos: [
    {
      id: "factorial",
      title: "Factorial: winding down, then unwinding",
      intro: "`factorial(n)` is `n × factorial(n - 1)`. Watch the calls **stack up** until the base case, then come back **multiplying**. The badge on each circle is the value that call returned.",
      codeIntro: "Computes n! = n × (n−1) × … × 1.",
      viz: "tree",
      legend: [["cur", "the call running now"], ["mark", "waiting for a smaller call"], ["good", "finished (returned a value)"]],
      inputs: [{ type: "number", name: "n", label: "n", value: 4, min: 1, max: 7 }],
      scene(inp) {
        let id = 0;
        const make = (k) => {
          const node = { id: id++, val: String(k), children: [] };
          if (k > 1) node.children.push(make(k - 1));
          return node;
        };
        return { tree: make(inp.n) };
      },
      frames(inp, snap) {
        let id = 0;
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
        const names = {};
        const view = (cur, extra) =>
          Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge }, boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: stack.map((i) => names[i]) }], vars: { depth: stack.length } }, extra);

        const run = (k) => {
          const me = id++;
          names[me] = "factorial(" + k + ")";
          stack.push(me);
          let value;
          if (k <= 1) {
            value = 1;
            badge[me] = "→ 1";
            snap(view(me, { at: ["base"], say: "**factorial(1)**: this is the **base case** (n ≤ 1). It needs no further call and returns **1** immediately. This is where the stack stops growing." }));
          } else {
            snap(view(me, { at: ["recurse"], say: "**factorial(" + k + ")** is not the base case. It needs `" + k + " × factorial(" + (k - 1) + ")`, so it calls factorial(" + (k - 1) + ") and **waits**. The stack now holds " + stack.length + " call" + (stack.length > 1 ? "s" : "") + "." }));
            const sub = run(k - 1);
            value = k * sub;
            badge[me] = "→ " + value;
            snap(view(me, { at: ["recurse"], say: "factorial(" + (k - 1) + ") came back with **" + sub + "**. So factorial(" + k + ") = " + k + " × " + sub + " = **" + value + "**. Return it to the caller below." }));
          }
          done.add(me);
          stack.pop();
          return value;
        };
        const result = run(inp.n);
        snap({
          at: ["recurse"],
          tone: tones(null),
          badge: { ...badge },
          boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: [] }],
          out: inp.n + "! = " + result,
          say: "The stack is empty again and the final answer is **" + inp.n + "! = " + result + "**. The calls went down n levels, then the answers were multiplied on the way back up.",
          result
        });
      },
      code: {
        fn: "factorial",
        lines: [
          [`function factorial(n) {`, "Solves n! by asking for (n - 1)! first.", "start"],
          [`  if (n <= 1) return 1;`, "**Base case.** The smallest problem has a known answer, so no more calls. Without it the recursion would never stop.", "base"],
          [`  return n * factorial(n - 1);`, "**Recursive case.** Trust that `factorial(n - 1)` is correct and multiply by n. The input shrinks every call, so the base case is eventually reached.", "recurse"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "fib",
      title: "Tree recursion: naive Fibonacci repeats itself",
      intro: "`fib(n)` calls itself **twice**, so the calls form a tree. Circles are labelled `f5` for `fib(5)`. Calls that appear **again** (red) are work already done somewhere else in the tree.",
      codeIntro: "Each call spawns two more, which is why the number of calls explodes.",
      viz: "tree",
      legend: [["cur", "the call running now"], ["mark", "waiting for its two sub-calls"], ["good", "finished"], ["bad", "a repeat of a call made before"]],
      inputs: [{ type: "number", name: "n", label: "n", value: 5, min: 2, max: 6 }],
      scene(inp) {
        let id = 0;
        const make = (k) => {
          const node = { id: id++, val: "f" + k, children: [] };
          if (k > 1) {
            node.children.push(make(k - 1));
            node.children.push(make(k - 2));
          }
          return node;
        };
        return { tree: make(inp.n) };
      },
      frames(inp, snap) {
        let id = 0;
        let calls = 0;
        const stack = [];
        const done = new Set();
        const badge = {};
        const seen = new Set();
        const repeats = new Set();
        const names = {};
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = repeats.has(i) ? "bad" : "good"));
          if (cur !== null) t[cur] = repeats.has(cur) ? "bad" : "cur";
          return t;
        };
        const view = (cur, extra) =>
          Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge }, boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: stack.map((i) => names[i]) }], vars: { calls } }, extra);

        const run = (k) => {
          const me = id++;
          calls++;
          names[me] = "fib(" + k + ")";
          stack.push(me);
          const again = seen.has(k);
          if (again) repeats.add(me);
          seen.add(k);
          let value;
          if (k <= 1) {
            value = k;
            badge[me] = "→ " + value;
            snap(view(me, { at: ["base"], say: "**fib(" + k + ")** is a base case: it returns " + k + " at once." + (again ? " (We have computed fib(" + k + ") before in another branch.)" : "") }));
          } else {
            snap(view(me, { at: ["recurse"], say: "**fib(" + k + ")**" + (again ? " again! We already computed fib(" + k + ") in another branch, but this call does all the work again." : "") + " It needs fib(" + (k - 1) + ") + fib(" + (k - 2) + "), so it makes **two** calls and waits." }));
            const a = run(k - 1);
            const b = run(k - 2);
            value = a + b;
            badge[me] = "→ " + value;
            snap(view(me, { at: ["recurse"], say: "Both sub-calls are back: fib(" + k + ") = " + a + " + " + b + " = **" + value + "**." }));
          }
          done.add(me);
          stack.pop();
          return value;
        };
        const result = run(inp.n);
        snap({
          at: ["recurse"],
          tone: tones(null),
          badge: { ...badge },
          boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: [] }],
          vars: { calls },
          out: "fib(" + inp.n + ") = " + result + " using " + calls + " calls",
          say: "**fib(" + inp.n + ") = " + result + "**, but it took **" + calls + "** calls. The red circles are repeats: the same sub-problems solved again and again. Memoization (next demo) removes them.",
          result
        });
      },
      code: {
        fn: "fib",
        lines: [
          [`function fib(n) {`, "Each call produces one Fibonacci number from two smaller ones.", "start"],
          [`  if (n <= 1) return n;`, "Base cases: fib(0) = 0 and fib(1) = 1.", "base"],
          [`  return fib(n - 1) + fib(n - 2);`, "**Two** recursive calls per call: the calls form a tree whose size roughly doubles with each extra level (about 2ⁿ calls).", "recurse"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "memo",
      title: "Memoization: remember answers so nothing is computed twice",
      intro: "Same function, plus a **memo** object. Before computing `fib(k)` we check the memo; after computing it we store the answer. Repeated calls now return immediately (green leaf marked “cached”).",
      codeIntro: "`memo` maps n to fib(n). It is passed along in every call so all calls share it.",
      viz: "tree",
      legend: [["cur", "the call running now"], ["mark", "waiting for sub-calls"], ["good", "finished"], ["bad", "cached: answered from the memo"]],
      inputs: [{ type: "number", name: "n", label: "n", value: 6, min: 2, max: 9 }],
      scene(inp) {
        let id = 0;
        const memo = {};
        const make = (k) => {
          const node = { id: id++, val: "f" + k, children: [] };
          if (k <= 1 || memo[k] !== undefined) return node;
          node.children.push(make(k - 1));
          node.children.push(make(k - 2));
          memo[k] = true;
          return node;
        };
        return { tree: make(inp.n) };
      },
      frames(inp, snap) {
        let id = 0;
        let calls = 0;
        const memo = {};
        const stack = [];
        const done = new Set();
        const hits = new Set();
        const badge = {};
        const names = {};
        const memoBox = (fresh) => ({ label: "memo", hint: "n → fib(n)", kind: "map", items: Object.keys(memo).map((k) => ({ k: "fib(" + k + ")", v: memo[k], new: fresh === Number(k) })) });
        const tones = (cur) => {
          const t = {};
          stack.forEach((i) => (t[i] = "mark"));
          done.forEach((i) => (t[i] = hits.has(i) ? "bad" : "good"));
          if (cur !== null) t[cur] = hits.has(cur) ? "bad" : "cur";
          return t;
        };
        const view = (cur, fresh, extra) =>
          Object.assign({ tone: tones(cur), path: stack.slice(), badge: { ...badge }, boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: stack.map((i) => names[i]) }, memoBox(fresh)], vars: { calls } }, extra);

        const run = (k) => {
          const me = id++;
          calls++;
          names[me] = "fibMemo(" + k + ")";
          stack.push(me);
          let value;
          if (k <= 1) {
            value = k;
            badge[me] = "→ " + value;
            snap(view(me, undefined, { at: ["base"], say: "**fibMemo(" + k + ")**: base case, returns " + k + "." }));
          } else if (memo[k] !== undefined) {
            value = memo[k];
            hits.add(me);
            badge[me] = "cached " + value;
            snap(view(me, undefined, { at: ["hit"], say: "**fibMemo(" + k + ")**: the memo already has an answer (**" + value + "**), so return it **without any further calls**. This is the work memoization saves." }));
          } else {
            snap(view(me, undefined, { at: ["store"], say: "**fibMemo(" + k + ")** is not in the memo yet, so compute it from fibMemo(" + (k - 1) + ") + fibMemo(" + (k - 2) + ")." }));
            const a = run(k - 1);
            const b = run(k - 2);
            value = a + b;
            memo[k] = value;
            badge[me] = "→ " + value;
            snap(view(me, k, { at: ["store", "done"], say: "Both answers are back: " + a + " + " + b + " = **" + value + "**. **Store it** in the memo as memo[" + k + "], then return it." }));
          }
          done.add(me);
          stack.pop();
          return value;
        };
        const result = run(inp.n);
        snap({
          at: ["done"],
          tone: tones(null),
          path: [],
          badge: { ...badge },
          boxes: [{ label: "call stack", hint: "newest call on top", kind: "stack", items: [] }, memoBox()],
          vars: { calls },
          out: "fib(" + inp.n + ") = " + result + " using only " + calls + " calls",
          say: "**fib(" + inp.n + ") = " + result + "** with only **" + calls + "** calls instead of " + (() => { let c = 0; const f = (x) => { c++; return x < 2 ? x : f(x - 1) + f(x - 2); }; f(inp.n); return c.toLocaleString("en-US"); })() + ". Each fib(k) was computed once, so the time drops from O(2ⁿ) to **O(n)**.",
          result
        });
      },
      code: {
        fn: "fibMemo",
        lines: [
          `function fibMemo(n, memo = {}) {`,
          [`  if (n <= 1) return n;`, "Base cases.", "base"],
          [`  if (memo[n] !== undefined) return memo[n];`, "Already solved? Return the saved answer immediately. Compare with `memo[n]` only after checking for `undefined`, since 0 is a valid answer.", "hit"],
          [`  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);`, "Compute once and store it. `memo` is passed down so every call shares the same cache.", "store"],
          [`  return memo[n];`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    }
  ],

  mistakes: [
    {
      oops: "Forgetting the base case (or writing one that is never reached)",
      why: "Nothing stops the recursion, so calls pile up until JavaScript throws “Maximum call stack size exceeded”.",
      fix: "Write the base case first. Check that every recursive call gets closer to it."
    },
    {
      oops: "A recursive call that does not make the problem smaller",
      why: "`f(n)` calling `f(n)` (or `f(n + 1)` when the base case is n = 0) loops forever.",
      fix: "Make sure the argument moves toward the base case: n − 1, n / 2, a child node, a shorter string."
    },
    {
      oops: "Forgetting to `return` the recursive result",
      why: "`fib(n - 1) + fib(n - 2)` without `return` makes the function return `undefined`, and the final answer is `undefined` or `NaN`.",
      fix: "`return n * factorial(n - 1);`"
    },
    {
      oops: "Solving the same sub-problem again and again (naive Fibonacci)",
      why: "With overlapping sub-problems the call tree is exponential: fib(40) takes hundreds of millions of calls.",
      fix: "Memoize: store each answer in a map keyed by the arguments, and check it first."
    },
    {
      oops: "Relying on very deep recursion",
      why: "Each call costs a stack frame, and JavaScript has no tail-call optimisation, so about 10,000 levels can crash.",
      fix: "Use a loop or an explicit stack when depth could be large."
    }
  ],

  remember: {
    mnemonic: "Base case to stop. Smaller call to progress. Trust the call, combine the answer.",
    rules: [
      "Ask three questions: **What is the smallest problem?** (base case) **How do I make it smaller?** (recursive call) **How do I combine the smaller answer?**",
      "Draw the call tree for a tiny input before coding.",
      "Time = number of calls × work per call. Space = deepest stack of waiting calls.",
      "Overlapping sub-problems? Add a memo (that is the doorway to dynamic programming)."
    ],
    template: {
      lines: [
        [`function solve(problem) {`, ""],
        [`  if (isSmallest(problem)) return directAnswer;`, "Base case: stop here."],
        [`  const smaller = solve(shrink(problem));`, "Recursive call on a smaller problem. Trust it."],
        [`  return combine(problem, smaller);`, "Use the smaller answer to build this answer."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Recursion/factorial.js`, `fibonacci.js` and `fibMemo.js`. Next: **Backtracking** uses recursion to try every choice and undo it."
      }
    ]
  },

  practice: {
    title: "Sum of Digits",
    level: "Easy",
    problem: "Write a **recursive** function `sumDigits(n)` that returns the sum of the digits of a non-negative integer. For example `sumDigits(123)` is `1 + 2 + 3 = 6`.",
    examples: [
      { input: "123", output: "6" },
      { input: "9999", output: "36" },
      { input: "0", output: "0" }
    ],
    hints: [
      "What is the **smallest** input whose answer you know without calculating? (A single digit.)",
      "`n % 10` is the last digit and `Math.floor(n / 10)` is everything before it. Which one is the “smaller problem”?",
      "Answer = last digit + `sumDigits(Math.floor(n / 10))`. The base case is `n < 10`, which returns `n`."
    ],
    solution: {
      explain: [
        "Base case: a number below 10 is a single digit, so its digit sum is the number itself. Otherwise peel off the last digit and let the recursion handle the rest, then add them together.",
        "Time O(d) and stack depth O(d), where d is the number of digits."
      ],
      code: {
        fn: "sumDigits",
        lines: [
          [`function sumDigits(n) {`, "Sum of the digits of n."],
          [`  if (n < 10) return n;`, "Base case: a single digit is its own sum."],
          [`  return (n % 10) + sumDigits(Math.floor(n / 10));`, "Last digit plus the digit sum of the number with that digit removed (a smaller number)."],
          `}`
        ]
      }
    },
    tests: [
      { args: [123], expect: 6 },
      { args: [0], expect: 0 },
      { args: [9], expect: 9 },
      { args: [9999], expect: 36 },
      { args: [100], expect: 1 },
      { args: [5050], expect: 10 },
      { args: [987654321], expect: 45 }
    ]
  },

  recall: [
    { q: "What are the two parts every recursive function needs?", a: "A **base case** that returns directly, and a **recursive case** that calls the function on a smaller input and uses the result." },
    { q: "What happens on the call stack when the base case is reached?", a: "The stack stops growing and starts to unwind: each waiting call receives the answer below it, finishes its own work and returns." },
    { q: "Why is naive `fib(n)` exponential, and how do you fix it?", a: "Each call makes two calls and the same sub-problems are recomputed many times. Memoization stores answers so each is computed once: O(n)." },
    { q: "What is the space cost of recursion?", a: "O(depth): one stack frame per unfinished call, even if the function creates no arrays." },
    { q: "Why can recursion fail on a very deep input in JavaScript?", a: "Each call uses stack memory, there is a limit (around ten thousand frames) and JavaScript does not optimise tail calls, so it throws a stack overflow error." }
  ],

  related: {
    topics: ["stack", "backtracking", "tree-dfs-traversals", "space-complexity", "time-complexity"],
    files: ["Problems/Recursion/factorial.js", "Problems/Recursion/fibonacci.js", "Problems/Recursion/fibMemo.js"]
  }
});
