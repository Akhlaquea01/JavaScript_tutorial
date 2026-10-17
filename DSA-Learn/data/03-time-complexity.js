// Time Complexity — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "time-complexity",
  group: "basics",
  emoji: "⏱️",
  title: "Time Complexity (Big-O)",
  tagline: "How the running time grows as the input grows. We ignore constants and tiny terms and look only at the part that grows fastest.",
  level: "Starter",
  needs: ["algorithms"],

  gist: [
    "Big-O counts **how many steps** the code takes as the input size **n** grows. It is not measured in seconds.",
    "Best to worst: **O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)**.",
    "Rules: drop constants (`3n` → `n`), drop smaller terms (`n² + n` → `n²`), loops one after another **add**, loops inside loops **multiply**.",
    "Recursion: count the **number of calls × the work per call**."
  ],

  complexity: {
    time: "grows with n",
    space: "see Space Complexity",
    why: [
      "This topic *is* the vocabulary for talking about time. The question is always: “if I double the input, what happens to the work?” Same work: O(1). One more step: O(log n). Double: O(n). Quadruple: O(n²). Square: exponential.",
      "Big-O quotes the **worst case** unless you are told otherwise, so “linear search is O(n)” even though the first item might match."
    ],
    more: [
      {
        type: "table",
        heading: "The growth shapes, and how they feel at n = 1,000,000",
        columns: ["Big-O", "Name", "Typical code", "Work at n = 1,000,000"],
        rows: [
          ["O(1)", "constant", "array index, hash lookup", "1 step"],
          ["O(log n)", "logarithmic", "binary search (halving)", "about 20 steps"],
          ["O(n)", "linear", "one loop over the data", "1 million steps"],
          ["O(n log n)", "linearithmic", "good sorting (merge sort), loop with a halving inside", "about 20 million steps"],
          ["O(n²)", "quadratic", "loop inside a loop", "1 trillion steps: far too slow"],
          ["O(2ⁿ)", "exponential", "trying every subset, naive Fibonacci", "impossible beyond n ≈ 30"],
          ["O(n!)", "factorial", "trying every ordering (permutations)", "impossible beyond n ≈ 12"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Computers differ in speed, so we don't measure seconds. We count **how many basic steps** the code performs and, more importantly, **how that count grows** when the input gets bigger.",
      "Big-O keeps only the shape. If code does `3n + 20` steps we say **O(n)**: for huge n the 3 and the 20 hardly matter, what matters is that doubling n doubles the work. If it does `n² + 5n + 20` steps we say **O(n²)**, because the n² part swamps everything else.",
      "You do not need much maths. Learn the handful of shapes in the table, learn five counting rules, and you can analyse almost any code you meet."
    ],
    signals: [
      "You are **comparing two solutions** and want to know which scales better.",
      "The problem says n is large (10⁵ or more) and you must know whether your idea will be fast enough.",
      "You have **loops inside loops**, a **recursion that branches**, or a **halving** pattern and want to name its cost."
    ],
    notFor: [
      "Predicting exact running time. Two O(n) programs can differ by 100× because of constants, caching and the language.",
      "Tiny inputs, where constants dominate and a “worse” Big-O can actually be faster."
    ],
    more: [
      {
        type: "table",
        heading: "Five counting rules",
        columns: ["Rule", "Example", "Result"],
        rows: [
          ["**Drop constants**", "`2n` or `n + 100` steps", "O(n)"],
          ["**Drop smaller terms**", "`n² + n` steps", "O(n²)"],
          ["**Sequential loops add**", "a loop over n, then a loop over m", "O(n + m)"],
          ["**Nested loops multiply**", "a loop over n inside a loop over n", "O(n × n) = O(n²)"],
          ["**Recursion: calls × work per call**", "Merge sort: 2 calls on half the data plus O(n) merging, `T(n) = 2T(n/2) + n`", "O(n log n)"]
        ]
      }
    ]
  },

  analogy: {
    title: "Greeting everyone at a party of n guests",
    story: [
      "**O(1):** you wave at the door once. Whether 5 or 5,000 guests are inside, it takes the same single wave. **O(n):** you greet each guest in turn, so twice the guests means twice the time. **O(n²):** every guest must shake hands with every other guest. Double the guests and the handshakes quadruple.",
      "**O(log n):** you are looking for one person and ask “is your name before M?”. The crowd halves with each question, so even a stadium needs only about 20 questions. **O(2ⁿ):** every guest decides *in or out* of a team and you want to list every possible team. Each extra guest doubles the list."
    ],
    map: [
      ["One wave at the door", "O(1) constant"],
      ["Greet each guest once", "O(n) one loop"],
      ["Everyone shakes hands with everyone", "O(n²) nested loops"],
      ["“Before M?” halving questions", "O(log n) binary search"],
      ["Listing every possible team", "O(2ⁿ) all subsets"],
      ["Ignoring the 5 seconds spent parking", "Dropping constants and small terms"]
    ],
    breaks: "At a real party you would notice that a 2-second wave is faster than a 20-second greeting. Big-O deliberately ignores such constant factors and only describes how the work *grows*."
  },

  demos: [
    {
      id: "growth",
      title: "Watch the growth shapes pull apart",
      intro: "Each bar is **how many times a loop body runs** for input size n. As n doubles, see which bars barely move and which explode. Raise the largest n and press **Run**.",
      codeIntro: "Four loops with different shapes. The function counts how many times each one runs.",
      viz: "bars",
      legend: [["good", "constant / halving"], ["cur", "one loop"], ["bad", "nested loops"]],
      inputs: [{ type: "number", name: "n", label: "Largest n", value: 64, min: 8, max: 128 }],
      frames(inp, snap) {
        const count = (n) => {
          let halving = 0;
          for (let i = n; i > 1; i = Math.floor(i / 2)) halving++;
          return { constant: 1, halving, single: n, nested: n * n };
        };
        const sizes = [];
        for (let s = 1; s <= inp.n; s *= 2) sizes.push(s);
        if (sizes[sizes.length - 1] !== inp.n) sizes.push(inp.n);
        const bars = (n) => {
          const c = count(n);
          return [
            { label: "O(1)", value: c.constant, tone: "good" },
            { label: "O(log n)", value: c.halving, tone: "good" },
            { label: "O(n)", value: c.single, tone: "cur" },
            { label: "O(n²)", value: c.nested, tone: "bad" }
          ];
        };
        const top = count(inp.n).nested;
        sizes.forEach((n, k) => {
          const c = count(n);
          snap({
            at: ["log", "lin", "quad"],
            bars: bars(n),
            max: top,
            unit: "runs",
            title: "n = " + n,
            say: k === 0
              ? "With n = **1** every shape costs about the same: 1 run. Nothing to worry about yet."
              : "n = **" + n + "**: the halving loop ran **" + c.halving + "** time" + (c.halving === 1 ? "" : "s") + ", the single loop **" + n + "**, the nested loops **" + c.nested.toLocaleString("en-US") + "**. Since n grew " + (n / sizes[k - 1] === 2 ? "2×" : (n / sizes[k - 1]).toFixed(2) + "×") + ", the single loop grew by the same factor but the nested loops grew by its **square**."
          });
        });
        const c = count(inp.n);
        snap({
          at: ["done"],
          bars: bars(inp.n),
          max: top,
          unit: "runs",
          title: "n = " + inp.n,
          out: "n = " + inp.n + ": log n = " + c.halving + ", n = " + inp.n + ", n² = " + c.nested.toLocaleString("en-US"),
          say: "At n = " + inp.n + " the O(n²) bar is " + Math.round(c.nested / c.halving).toLocaleString("en-US") + " times longer than O(log n). That gap is why we care about the shape of growth.",
          result: { constant: 1, halving: c.halving, single: inp.n, nested: c.nested }
        });
      },
      code: {
        fn: "countSteps",
        lines: [
          `function countSteps(n) {`,
          [`  let halving = 0;`, "How many times can n be halved before it reaches 1? That is about log₂ n.", "log"],
          [`  for (let i = n; i > 1; i = Math.floor(i / 2)) halving++;`, "Each pass cuts the remaining size in half: O(log n).", "log"],
          [`  let single = 0;`, "", "lin"],
          [`  for (let i = 0; i < n; i++) single++;`, "One pass over n items: O(n).", "lin"],
          [`  let nested = 0;`, "", "quad"],
          [`  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) nested++;`, "A loop inside a loop: n × n runs, O(n²).", "quad"],
          [`  return { constant: 1, halving, single, nested };`, "A single statement that always runs once is O(1).", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "terms",
      title: "Why we drop constants and smaller terms",
      intro: "This code does `n² + 5n + 20` steps. Watch how the **n²** part takes over as n grows, until the other parts are almost invisible.",
      codeIntro: "A nested loop (n²), a loop that adds 5 per item (5n) and a fixed cost (20).",
      viz: "bars",
      legend: [["bad", "n² part"], ["cur", "5n part"], ["good", "fixed part"]],
      inputs: [{ type: "number", name: "n", label: "Largest n", value: 100, min: 10, max: 1000 }],
      frames(inp, snap) {
        const sizes = [1, 5, 10, 50, 100, 500, 1000].filter((s) => s <= inp.n);
        if (sizes[sizes.length - 1] !== inp.n) sizes.push(inp.n);
        const parts = (n) => ({ nested: n * n, linear: 5 * n, fixed: 20, total: n * n + 5 * n + 20 });
        const bars = (n) => {
          const p = parts(n);
          return [
            { label: "n² part", value: p.nested, tone: "bad" },
            { label: "5n part", value: p.linear, tone: "cur" },
            { label: "fixed 20", value: p.fixed, tone: "good" }
          ];
        };
        const maxAll = parts(inp.n).total;
        sizes.forEach((n) => {
          const p = parts(n);
          const share = Math.round((p.nested / p.total) * 100);
          snap({
            at: ["quad", "lin", "const"],
            bars: bars(n),
            max: maxAll,
            unit: "steps",
            title: "n = " + n + "   (total " + p.total.toLocaleString("en-US") + " steps)",
            say: "n = **" + n + "**: the n² part is " + p.nested.toLocaleString("en-US") + " of " + p.total.toLocaleString("en-US") + " steps (**" + share + "%**). " + (share >= 95 ? "The rest is rounding error, so we just say **O(n²)**." : "The other parts still matter at this size.")
          });
        });
        const p = parts(inp.n);
        snap({
          at: ["done"],
          bars: bars(inp.n),
          max: maxAll,
          unit: "steps",
          title: "n = " + inp.n,
          out: "n² + 5n + 20 is O(n²)",
          say: "For big n the **n²** part decides everything, so `n² + 5n + 20` simplifies to **O(n²)**. The same logic turns `2n + 5` into O(n).",
          result: p.total
        });
      },
      code: {
        fn: "work",
        lines: [
          `function work(n) {`,
          `  let ops = 0;`,
          [`  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) ops++;`, "Nested loops: n × n = n² steps.", "quad"],
          [`  for (let i = 0; i < n; i++) ops += 5;`, "One loop doing 5 steps per item: 5n steps.", "lin"],
          [`  ops += 20;`, "A fixed cost that never grows: 20 steps.", "const"],
          [`  return ops;`, "Total: n² + 5n + 20, which we simplify to O(n²).", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "recursion",
      title: "Recursion that branches: count the calls",
      intro: "Naive Fibonacci calls itself **twice** per call. Watch the number of calls explode (O(2ⁿ)) while n only grows by 5 each time.",
      codeIntro: "A naive recursive Fibonacci that counts how many times the function is called.",
      viz: "bars",
      legend: [["bad", "number of calls"], ["good", "n itself"]],
      inputs: [{ type: "number", name: "n", label: "Largest n (keep it small!)", value: 20, min: 5, max: 25 }],
      frames(inp, snap) {
        const memo = {};
        const calls = (n) => {
          if (memo[n] !== undefined) return memo[n];
          let c = 0;
          const fib = (k) => {
            c++;
            return k < 2 ? k : fib(k - 1) + fib(k - 2);
          };
          fib(n);
          return (memo[n] = c);
        };
        const sizes = [5, 10, 15, 20, 25].filter((s) => s <= inp.n);
        if (sizes[sizes.length - 1] !== inp.n) sizes.push(inp.n);
        const top = calls(inp.n);
        const bars = (n) => [
          { label: "n", value: n, tone: "good" },
          { label: "calls", value: calls(n), tone: "bad" }
        ];
        sizes.forEach((n, k) => {
          const c = calls(n);
          snap({
            at: ["call"],
            bars: bars(n),
            max: top,
            unit: "",
            title: "fib(" + n + ")",
            say: k === 0
              ? "fib(" + n + ") makes **" + c + "** calls. Each call spawns two more until the answer is tiny, so the calls form a branching tree."
              : "n = **" + n + "**: **" + c.toLocaleString("en-US") + "** calls. Going from " + sizes[k - 1] + " to " + n + " multiplied the work about " + Math.round(c / calls(sizes[k - 1])).toLocaleString("en-US") + "×."
          });
        });
        snap({
          at: ["done"],
          bars: bars(inp.n),
          max: top,
          unit: "",
          title: "fib(" + inp.n + ")",
          out: "fib(" + inp.n + ") makes " + top.toLocaleString("en-US") + " calls",
          say: "That is **exponential**: roughly 1.6 times more calls for every +1 in n. The fix is to remember answers already computed (memoization), which turns it into O(n). That idea is dynamic programming.",
          result: top
        });
      },
      code: {
        fn: "countCalls",
        lines: [
          `function countCalls(n) {`,
          [`  let calls = 0;`, "Counts every call of fib.", "call"],
          [`  function fib(k) {`, "The recursive function whose calls we count.", "call"],
          [`    calls++;`, "One more call has started.", "call"],
          [`    return k < 2 ? k : fib(k - 1) + fib(k - 2);`, "Two recursive calls per call: the number of calls roughly doubles each level, so O(2ⁿ).", "call"],
          `  }`,
          `  fib(n);`,
          [`  return calls;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    }
  ],

  mistakes: [
    {
      oops: "Keeping constants and lower terms: writing O(2n + 5)",
      why: "Big-O describes the *shape* of growth. Constants and small terms do not change the shape, and they make comparing solutions harder.",
      fix: "Drop them: `2n + 5` is O(n), `n² + n` is O(n²)."
    },
    {
      oops: "Adding when you should multiply, or the other way round",
      why: "A loop **inside** a loop multiplies its costs (n × n). Two loops **one after another** only add (n + n = 2n, which is O(n)).",
      fix: "Ask: does the second loop run *for every step* of the first (multiply) or just *after* it (add)?"
    },
    {
      oops: "Missing the hidden loops inside built-in methods",
      why: "`includes`, `indexOf`, `slice`, `splice`, `sort`, spreading `[...arr]` and string concatenation all walk through data internally. A `.includes` inside a `for` loop is a nested loop.",
      fix: "Know the cost of every method you call, and replace repeated `includes` with a Set."
    },
    {
      oops: "Quoting the best case: “linear search is O(1) because the first item can match”",
      why: "Big-O normally describes the **worst case**, the input that makes the code do the most work.",
      fix: "Say “O(n) worst case, O(1) best case” if you want to mention both."
    },
    {
      oops: "Worrying about the base of a logarithm",
      why: "log₂ n and log₁₀ n differ only by a constant factor, and constants are dropped.",
      fix: "Just write O(log n)."
    }
  ],

  remember: {
    mnemonic: "Drop constants, drop small terms, add sequential, multiply nested.",
    rules: [
      "Order to remember: **1 < log n < n < n log n < n² < 2ⁿ < n!**.",
      "Halving the problem each step → **log n**. A loop with a halving inside → **n log n**.",
      "Two recursive calls on size n−1 → **2ⁿ**. Two calls on size n/2 plus O(n) work → **n log n**.",
      "Always say *which* input size: n, m, rows × columns, string length…"
    ],
    template: {
      lines: [
        [`// one loop over n items                 → O(n)`, "Each item touched a fixed number of times."],
        [`// a loop inside a loop (both over n)    → O(n²)`, "Multiply the two loop sizes."],
        [`// a loop, then another loop             → O(n)`, "Add, then drop constants: n + n = 2n = O(n)."],
        [`// halving the data every step           → O(log n)`, "Binary search, balanced trees."],
        [`// loop with halving inside               → O(n log n)`, "Good sorting algorithms."],
        [`// two recursive calls of size n - 1     → O(2ⁿ)`, "Exploring every subset."]
      ]
    }
  },

  practice: {
    title: "Count the Operations",
    level: "Easy",
    problem: "Write `countOps(n)` that returns **how many times the inner statement runs** in this code, then decide its Big-O:\n\n`for (let i = 0; i < n; i++) { for (let j = i; j < n; j++) { ops++; } }`",
    examples: [
      { input: "4", output: "10", why: "i = 0 runs 4 times, i = 1 runs 3, i = 2 runs 2, i = 3 runs 1: 4 + 3 + 2 + 1 = 10." },
      { input: "1", output: "1" },
      { input: "0", output: "0" }
    ],
    hints: [
      "Just write the two loops and count with a variable. Run it by hand for n = 4 first.",
      "The inner loop starts at `i`, so it runs `n - i` times for each `i`.",
      "The total is n + (n-1) + … + 1 = n(n+1)/2, a quadratic. Which Big-O is that after dropping the constant and the smaller term?"
    ],
    solution: {
      explain: [
        "Counting directly gives 4 + 3 + 2 + 1 for n = 4. In general it is n + (n−1) + … + 1 = **n(n+1)/2 = n²/2 + n/2**. Drop the constant ½ and the smaller term n/2, and what remains is **O(n²)**. A “triangle” of work is still quadratic.",
        "(You could also return `n * (n + 1) / 2` directly. The point of the exercise is to see where it comes from.)"
      ],
      code: {
        fn: "countOps",
        lines: [
          `function countOps(n) {`,
          [`  let ops = 0;`, "Counter for the inner statement."],
          [`  for (let i = 0; i < n; i++) {`, "Outer loop: n passes."],
          [`    for (let j = i; j < n; j++) {`, "Inner loop starts at i, so it does n - i passes."],
          [`      ops++;`, "The statement we are counting."],
          `    }`,
          `  }`,
          [`  return ops;`, "n(n+1)/2 in total, which is O(n²)."],
          `}`
        ]
      }
    },
    tests: [
      { args: [4], expect: 10 },
      { args: [1], expect: 1 },
      { args: [0], expect: 0 },
      { args: [5], expect: 15 },
      { args: [10], expect: 55 },
      { args: [100], expect: 5050 }
    ]
  },

  recall: [
    { q: "What does Big-O actually measure?", a: "How the number of steps grows as the input size n grows, usually for the worst case. Not seconds." },
    { q: "Put these in order from best to worst: O(n²), O(1), O(n log n), O(log n), O(2ⁿ), O(n).", a: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)." },
    { q: "Two loops one after the other, versus one inside the other: what happens to the cost?", a: "One after the other: the costs **add** (and constants drop, so O(n)). One inside the other: the costs **multiply** (O(n²))." },
    { q: "How do you analyse a recursive function?", a: "Count the number of calls and multiply by the work done per call, or write the recurrence (e.g. merge sort: T(n) = 2T(n/2) + n → O(n log n))." },
    { q: "Why can `.includes()` inside a `for` loop be a performance bug?", a: "`includes` is itself a loop over the array, so the code is really nested loops: O(n²). A Set makes the check O(1)." }
  ],

  related: {
    topics: ["algorithms", "space-complexity", "binary-search", "recursion"],
    files: ["Problems/ComplexityAnalysis/compareGrowthRates.js", "Problems/ComplexityAnalysis/nestedVsSequentialLoopsComplexity.js", "Problems/ComplexityAnalysis/triangularNestedLoopComplexity.js", "Problems/ComplexityAnalysis/twoSequentialLoopsComplexity.js"]
  }
});
