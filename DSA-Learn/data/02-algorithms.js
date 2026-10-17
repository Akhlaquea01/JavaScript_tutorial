// Algorithms — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "algorithms",
  group: "basics",
  emoji: "⚙️",
  title: "Algorithms",
  tagline: "A step-by-step recipe for solving a problem. The same problem usually has a slow recipe and a fast one, and the skill is knowing both.",
  level: "Starter",

  gist: [
    "An algorithm is a **finite list of clear steps** that turns any valid input into the correct output.",
    "A good one is **correct**, **fast**, **light on memory** and **easy to understand**, in roughly that order of priority.",
    "Nearly every problem has a **brute force** (try everything) and a smarter version built on a **pattern**. Write the brute force first, then remove the wasted work.",
    "The patterns in this course: hashing, prefix sums, two pointers, sliding window, binary search, stacks and queues, recursion, backtracking, greedy, heaps, BFS / DFS."
  ],

  complexity: {
    time: "depends on the recipe",
    space: "depends on the recipe",
    why: [
      "The *same* problem can cost O(n²) with a brute-force recipe and O(n) with a smarter one. The demos below show it on a real example: one input, two recipes, very different amounts of work.",
      "Measuring and comparing recipes is exactly what the next two topics (time and space complexity) are for."
    ],
    more: [
      {
        type: "table",
        heading: "Slow recipe → smarter recipe for classic problems",
        columns: ["Problem", "Brute force", "Smarter recipe"],
        rows: [
          ["Two numbers that add to a target (sorted array)", "Nested loops, O(n²)", "Two pointers, O(n)"],
          ["Does the array contain a duplicate?", "Nested loops, O(n²)", "Hash set, O(n)"],
          ["Find a value in a sorted array", "Scan every item, O(n)", "Binary search, O(log n)"],
          ["Largest sum of k neighbours", "Re-add k items each time, O(n·k)", "Sliding window, O(n)"],
          ["Many range-sum questions", "Re-add the range each time, O(n) per question", "Prefix sum, O(1) per question"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "An algorithm is a recipe: a precise list of steps that always finishes and gives the right dish for any valid ingredients (the input). “Look at every number and remember the biggest” is an algorithm.",
      "Two different recipes can make the same dish. “Compare every pair” and “remember what I have seen in a Set” both detect a duplicate, but on a million items one takes forever and the other takes a blink.",
      "A reliable way to work: **(1)** understand the problem with a tiny example, **(2)** write the **brute force**, even if it is slow, because it proves you understand the problem, **(3)** ask where the *wasted work* is, **(4)** apply a pattern that removes it, **(5)** test the edge cases."
    ],
    signals: [
      "Your first solution has a **double loop** over the same data.",
      "You keep **recomputing** the same thing (a sum, a lookup, a sub-problem).",
      "The input is **sorted** (or could be) but you scan it from the start anyway.",
      "The input size is large (10⁵ or more) and your solution is quadratic."
    ],
    notFor: [
      "Optimising before the problem is understood. A correct slow solution beats a clever wrong one.",
      "Using a heavy pattern on tiny inputs where a simple loop is clear and fast enough."
    ],
    more: [
      {
        type: "table",
        heading: "Read the constraints: how much work is allowed?",
        columns: ["Input size n", "Aim for", "What that means"],
        rows: [
          ["up to about 20", "O(2ⁿ) or O(n!)", "Trying every subset or order is fine (backtracking)"],
          ["up to about 1,000", "O(n²)", "Nested loops are fine"],
          ["up to about 100,000", "O(n log n) or O(n)", "Sorting, heaps, hashing, two pointers, sliding window"],
          ["up to about 1,000,000,000", "O(log n) or O(1)", "Binary search or a formula"]
        ]
      },
      {
        type: "table",
        heading: "The families of algorithms you will meet",
        columns: ["Family", "One-line idea"],
        rows: [
          ["Brute force", "Try every possibility. Simple and slow, your safety net."],
          ["Two pointers / sliding window", "Walk an array with two markers instead of checking every pair or range."],
          ["Prefix sum / hashing", "Pre-store totals or seen values so lookups cost O(1)."],
          ["Binary search", "Halve the search range each step."],
          ["Recursion / divide and conquer", "Solve smaller copies of the problem and combine the answers."],
          ["Backtracking", "Build a solution step by step and undo a step when it fails."],
          ["Greedy", "Always take the locally best choice."],
          ["Dynamic programming", "Remember answers to sub-problems so they are never computed twice."]
        ]
      }
    ]
  },

  analogy: {
    title: "Finding a phone number: three recipes",
    story: [
      "You need Meera's number in a printed phone book. **Recipe 1:** read every entry from page 1 until you find Meera. It always works, but a thick book takes ages (*brute force*). **Recipe 2:** the book is sorted, so open it in the middle, see whether “Meera” comes before or after that page, and keep halving (*binary search*). **Recipe 3:** use the contacts app, type the name and the number appears (*a hash map*).",
      "All three give the right answer, so all three are *correct*. They differ in how much work they do as the book grows, and in the price you paid beforehand: recipe 2 needed the book to be sorted, recipe 3 needed someone to type every contact in first."
    ],
    map: [
      ["Reading every page", "Brute force / linear scan, O(n)"],
      ["Halving a sorted book", "Binary search, O(log n)"],
      ["Contacts app lookup", "Hash map, O(1) on average"],
      ["“Works for any name in the book”", "Correctness for every valid input"],
      ["Sorting or typing in the book first", "Preparation cost (sorting, building the map)"]
    ],
    breaks: "A real recipe has a few steps. An algorithm must be precise enough for a computer: no “use your judgement”, every step defined, and it must finish."
  },

  demos: [
    {
      id: "max",
      title: "An algorithm in miniature: find the largest number",
      intro: "Even the simplest algorithm has a rule that stays true at every step (an **invariant**). Here it is: *best is always the largest number seen so far*. Watch it stay true.",
      codeIntro: "Input: an array. Output: its largest value. Steps: assume the first is best, then scan the rest.",
      viz: "array",
      legend: [["cur", "number being checked"], ["good", "the current best"], ["done", "already checked"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [4, 9, 2, 9, 7, 12, 5], len: [2, 10], min: -20, max: 50 }],
      frames(inp, snap) {
        const span = DSA.util.span;
        const a = inp.nums;
        let best = a[0];
        let bestIdx = 0;
        const view = (extra) => Object.assign({ label: "nums", cells: a, vars: { best } }, extra);

        snap(view({
          at: ["init"],
          tone: { 0: "good" },
          ptr: { best: 0 },
          say: "Assume the first number, **" + a[0] + "**, is the largest so far: best = " + best + ". We will keep one rule true: **best is always the largest of the numbers looked at so far**."
        }));
        for (let i = 1; i < a.length; i++) {
          const bigger = a[i] > best;
          const old = best;
          if (bigger) {
            best = a[i];
            bestIdx = i;
          }
          snap(view({
            at: ["loop", "cmp"],
            tone: { ...span(0, i - 1, "done"), [bestIdx]: "good", [i]: bigger ? "good" : "cur" },
            ptr: { i, best: bestIdx },
            say: bigger
              ? "**" + a[i] + "** is bigger than the old best (" + old + "), so it becomes the new best. The rule still holds: best is the largest of the first " + (i + 1) + " numbers."
              : "**" + a[i] + "** is not bigger than best (" + best + "), so best stays. The rule still holds for the first " + (i + 1) + " numbers."
          }));
        }
        snap(view({
          at: ["done"],
          tone: { ...span(0, a.length - 1, "done"), [bestIdx]: "good" },
          ptr: { best: bestIdx },
          out: "Largest number: " + best,
          say: "Every number has been checked and the rule held at every step, so **" + best + "** is the largest. That is why the algorithm is *correct*.",
          result: best
        }));
      },
      code: {
        fn: "findMax",
        lines: [
          `function findMax(nums) {`,
          [`  let best = nums[0];`, "Assume the first number is the largest so far.", "init"],
          [`  for (let i = 1; i < nums.length; i++) {`, "Look at every other number once.", "loop"],
          [`    if (nums[i] > best) best = nums[i];`, "A bigger number replaces best, so best is always the largest seen so far.", "cmp"],
          `  }`,
          [`  return best;`, "Nothing is left to look at, and best is the largest of all of them.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "duplicates",
      title: "Two recipes, one problem: is there a duplicate?",
      intro: "First the **brute force** (compare every pair), then the **smarter recipe** (remember what we have seen in a Set), on the same numbers. Compare how many steps each one takes.",
      codeIntro: "Both functions answer the same question. They also count their steps so we can compare them fairly.",
      viz: "array",
      legend: [["cur", "number being looked at"], ["mark", "number it is compared with"], ["good", "the duplicate found"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [3, 8, 5, 1, 9, 5, 2], len: [4, 8], min: 1, max: 9 }],
      frames(inp, snap) {
        const a = inp.nums;
        const n = a.length;
        let sSteps = 0;
        let fSteps = 0;
        const set = new Set();
        const setBox = (hot) => ({ label: "seen (Set)", kind: "set", items: [...set].map((v) => ({ v, new: v === hot })) });

        snap({
          label: "nums",
          cells: a,
          at: ["sloop"],
          vars: { steps: 0 },
          say: "**Recipe 1, brute force.** Take each number and compare it with every number after it. If any two are equal, there is a duplicate."
        });
        let slow = null;
        outer: for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            sSteps++;
            const same = a[i] === a[j];
            snap({
              label: "nums",
              cells: a,
              at: same ? ["sloop", "sinner", "scmp", "sfound"] : ["sloop", "sinner", "scmp"],
              ptr: { i, j },
              tone: same ? { [i]: "good", [j]: "good" } : { [i]: "cur", [j]: "mark" },
              vars: { steps: sSteps },
              say: "Comparison **#" + sSteps + "**: nums[" + i + "] = " + a[i] + " vs nums[" + j + "] = " + a[j] + (same ? ": **equal**. Duplicate found." : ": different.")
            });
            if (same) {
              slow = { found: true, steps: sSteps };
              break outer;
            }
          }
        }
        if (!slow) {
          slow = { found: false, steps: sSteps };
          snap({ label: "nums", cells: a, at: ["snone"], vars: { steps: sSteps }, say: "Every pair was compared and none matched: **no duplicate**. It took " + sSteps + " comparisons." });
        } else {
          snap({ label: "nums", cells: a, at: ["sfound"], vars: { steps: sSteps }, say: "Recipe 1 is done: it found a duplicate after **" + sSteps + " comparisons**." });
        }

        snap({
          label: "nums",
          cells: a,
          at: ["finit"],
          boxes: [setBox()],
          vars: { steps: 0 },
          say: "**Recipe 2, remember what we have seen.** A Set answers “have I seen this?” instantly. Walk through the numbers once."
        });
        let fast = null;
        for (let i = 0; i < n; i++) {
          fSteps++;
          if (set.has(a[i])) {
            snap({
              label: "nums",
              cells: a,
              at: ["floop", "fhas"],
              ptr: { i },
              tone: { [i]: "good", [a.indexOf(a[i])]: "good" },
              boxes: [setBox()],
              vars: { steps: fSteps },
              say: "Step **#" + fSteps + "**: " + a[i] + " is already in the Set, so it is a **duplicate**."
            });
            fast = { found: true, steps: fSteps };
            break;
          }
          set.add(a[i]);
          snap({
            label: "nums",
            cells: a,
            at: ["floop", "fhas", "fadd"],
            ptr: { i },
            tone: { [i]: "cur" },
            boxes: [setBox(a[i])],
            vars: { steps: fSteps },
            say: "Step **#" + fSteps + "**: " + a[i] + " is not in the Set yet, so add it and move on."
          });
        }
        if (!fast) fast = { found: false, steps: fSteps };
        snap({
          label: "nums",
          cells: a,
          at: ["cmp"],
          boxes: [setBox()],
          vars: { steps: fSteps },
          out: (slow.found ? "Duplicate found" : "No duplicate") + ". Brute force: " + slow.steps + " steps. Set: " + fast.steps + " steps.",
          say: "Same answer, very different work: **" + slow.steps + "** steps for brute force against **" + fast.steps + "** for the Set. The gap grows quickly with bigger inputs, as the next example shows.",
          result: { slow, fast }
        });
      },
      code: {
        fn: "compare",
        lines: [
          `function slowWay(nums) {`,
          [`  let steps = 0;`, "Count comparisons so we can compare the recipes.", "sloop"],
          [`  for (let i = 0; i < nums.length; i++) {`, "Take each number…", "sloop"],
          [`    for (let j = i + 1; j < nums.length; j++) {`, "…and compare it with every number after it.", "sinner"],
          [`      steps++;`, "", "scmp"],
          [`      if (nums[i] === nums[j]) return { found: true, steps };`, "Two equal numbers: duplicate.", "sfound"],
          `    }`,
          `  }`,
          [`  return { found: false, steps };`, "All pairs checked, no match.", "snone"],
          `}`,
          ``,
          `function fastWay(nums) {`,
          [`  const seen = new Set();`, "The numbers we have already passed.", "finit"],
          `  let steps = 0;`,
          [`  for (const x of nums) {`, "One pass.", "floop"],
          `    steps++;`,
          [`    if (seen.has(x)) return { found: true, steps };`, "O(1) question: seen before?", "fhas"],
          [`    seen.add(x);`, "Remember it.", "fadd"],
          `  }`,
          `  return { found: false, steps };`,
          `}`,
          ``,
          [`function compare(nums) {`, "Run both recipes on the same input.", "cmp"],
          `  return { slow: slowWay(nums), fast: fastWay(nums) };`,
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "growth",
      title: "How the gap grows with the input size",
      intro: "The same two recipes, counted on bigger and bigger inputs (worst case: no duplicate at all). Watch the brute-force bar explode while the Set bar barely moves.",
      codeIntro: "Counts how many steps each recipe needs on an input of size `n` that has no duplicate.",
      viz: "bars",
      legend: [["bad", "brute force"], ["good", "Set"]],
      inputs: [{ type: "number", name: "n", label: "Largest input size", value: 200, min: 10, max: 400 }],
      frames(inp, snap) {
        const sizes = [10, 25, 50, 100, 200, 400].filter((s) => s <= inp.n);
        if (!sizes.includes(inp.n)) sizes.push(inp.n);
        const work = (n) => ({ slow: (n * (n - 1)) / 2, fast: n });
        const bars = (n) => [
          { label: "Brute force", value: work(n).slow, tone: "bad" },
          { label: "Set", value: work(n).fast, tone: "good" }
        ];
        snap({ at: ["declare"], bars: bars(sizes[0]), unit: "steps", title: "steps needed for n = " + sizes[0], say: "With only **" + sizes[0] + "** numbers: brute force needs " + work(sizes[0]).slow + " steps, the Set needs " + work(sizes[0]).fast + ". Small inputs hide the problem." });
        sizes.slice(1).forEach((n) => {
          const w = work(n);
          snap({
            at: ["loop"],
            bars: bars(n),
            unit: "steps",
            max: work(sizes[sizes.length - 1]).slow,
            title: "steps needed for n = " + n,
            say: "n = **" + n + "**: brute force needs **" + w.slow.toLocaleString("en-US") + "** steps, the Set only **" + w.fast + "**. That is " + Math.round(w.slow / w.fast).toLocaleString("en-US") + " times more work."
          });
        });
        const last = sizes[sizes.length - 1];
        snap({
          at: ["done"],
          bars: bars(last),
          unit: "steps",
          max: work(last).slow,
          title: "steps needed for n = " + last,
          out: "n = " + last + ": " + work(last).slow.toLocaleString("en-US") + " steps vs " + last,
          say: "Doubling n doubles the Set's work but **quadruples** brute force's work. That is the difference between O(n) and O(n²), and why choosing the recipe matters.",
          result: work(last)
        });
      },
      code: {
        fn: "countWork",
        lines: [
          `function countWork(n) {`,
          [`  let slow = 0;`, "Steps for the brute-force recipe.", "declare"],
          [`  for (let i = 0; i < n; i++) {`, "For every number…", "loop"],
          [`    for (let j = i + 1; j < n; j++) slow++;`, "…one comparison with each later number. That is n(n-1)/2 comparisons in total.", "loop"],
          `  }`,
          [`  return { slow, fast: n };`, "The Set recipe touches each number once: n steps.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    }
  ],

  mistakes: [
    {
      oops: "Jumping straight to the clever solution without writing the brute force",
      why: "You may be solving a slightly different problem, miss edge cases, or have nothing to compare your fast solution against.",
      fix: "Write the simple version first. Keep it around as a reference to test the optimised one."
    },
    {
      oops: "Skipping edge cases: empty input, one element, duplicates, negatives, all equal",
      why: "Most wrong answers in practice come from the inputs you did not imagine, not from the ones you did.",
      fix: "Before you finish, run the algorithm by hand on: empty, size 1, size 2, all the same, already sorted, reverse sorted."
    },
    {
      oops: "Judging speed by the small example instead of the worst case with large n",
      why: "O(n²) feels instant on 10 items and impossible on 100,000 (10 billion steps).",
      fix: "Read the constraints, picture the biggest input, and choose a recipe that fits."
    },
    {
      oops: "Forgetting the preparation cost of a faster recipe",
      why: "Binary search needs sorted data (sorting costs O(n log n)). A hash map costs O(n) memory and time to build. “Fast lookup” is not free.",
      fix: "Count the preparation too, and check it is worth it for how many lookups you do."
    }
  ],

  remember: {
    mnemonic: "Understand → brute force → spot the waste → apply a pattern → test the edges.",
    rules: [
      "Always keep a **correct** solution before chasing a **fast** one.",
      "Constraints tell you the budget: n ≈ 1,000 → O(n²); n ≈ 100,000 → O(n log n) or O(n); n ≈ 10⁹ → O(log n).",
      "Ask “where am I repeating work?” The answer usually names the pattern (a stored total, a stored lookup, a halved range).",
      "State an **invariant**, a sentence that stays true after every step, to convince yourself the loop is correct."
    ],
    template: {
      lines: [
        [`// 1. Restate the problem with a tiny example`, "If you cannot trace an example by hand, you cannot code it yet."],
        [`// 2. Brute force: what is the simplest thing that works?`, "Write it, note its complexity."],
        [`// 3. Where is the wasted / repeated work?`, "Nested loops over the same data? Repeated sums? Repeated lookups?"],
        [`// 4. Which pattern removes it?`, "Hashing, prefix sum, two pointers, window, binary search, heap, ..."],
        [`// 5. Test: empty, one element, duplicates, negatives, huge n`, "Edge cases first, then large inputs."]
      ]
    }
  },

  practice: {
    title: "Second Largest Number",
    level: "Easy",
    problem: "Given an array of numbers, return the **second largest distinct value**. If there is no second largest (fewer than two different values), return `-1`. Do it in a single pass without sorting.",
    examples: [
      { input: "[3, 1, 4, 1, 5, 9, 2, 6]", output: "6", why: "The largest is 9 and the next one down is 6." },
      { input: "[10, 9, 10]", output: "9", why: "10 is the largest; repeats do not count as a second value." },
      { input: "[5, 5, 5]", output: "-1", why: "Only one distinct value." }
    ],
    hints: [
      "The *findMax* demo kept one variable, `best`. How many variables do you need to remember the top two?",
      "Keep `first` and `second`, both starting at -Infinity. Update them as you scan.",
      "For each number `x`: if `x > first`, then the old `first` becomes `second` and `x` becomes `first`. Else if `x` is bigger than `second` **and different from `first`**, it becomes `second`."
    ],
    solution: {
      explain: [
        "Two variables hold the largest and second largest distinct values seen so far (the invariant). A new number either beats `first` (then everything shifts down one place) or slips in between `first` and `second`. The `x !== first` check stops a repeat of the largest value from counting as the second.",
        "Time O(n) in a single pass, space O(1)."
      ],
      code: {
        fn: "secondLargest",
        lines: [
          `function secondLargest(nums) {`,
          [`  let first = -Infinity, second = -Infinity;`, "Largest and second largest distinct values seen so far."],
          [`  for (const x of nums) {`, "One pass."],
          [`    if (x > first) {`, "A new largest."],
          [`      second = first;`, "The old largest drops to second place."],
          [`      first = x;`, ""],
          [`    } else if (x > second && x !== first) {`, "Between second and first, and not a repeat of the largest."],
          [`      second = x;`, ""],
          `    }`,
          `  }`,
          [`  return second === -Infinity ? -1 : second;`, "If second never changed, there was no second distinct value."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[3, 1, 4, 1, 5, 9, 2, 6]], expect: 6 },
      { args: [[1, 2]], expect: 1 },
      { args: [[2, 1]], expect: 1 },
      { args: [[5, 5, 5]], expect: -1 },
      { args: [[]], expect: -1 },
      { args: [[7]], expect: -1 },
      { args: [[10, 9, 10]], expect: 9 },
      { args: [[-1, -2, -3]], expect: -2 }
    ]
  },

  recall: [
    { q: "What makes an algorithm *good*?", a: "Correct first, then fast, light on memory and easy to understand." },
    { q: "What is the safe first step when you meet a new problem?", a: "Understand it with a tiny example and write the brute force, even if it is slow. It proves understanding and gives you something to test the optimised version against." },
    { q: "Roughly what complexity is allowed when n is 100,000?", a: "O(n log n) or O(n). O(n²) would be about 10 billion steps." },
    { q: "What is an invariant and why use one?", a: "A statement that stays true after every step of a loop (like “best is the largest seen so far”). It is how you convince yourself the algorithm is correct." },
    { q: "Name two ways to detect a duplicate and their costs.", a: "Compare every pair: O(n²) time, O(1) space. Use a hash set: O(n) time, O(n) space." }
  ],

  related: {
    topics: ["data-structures", "time-complexity", "space-complexity", "two-pointer", "binary-search", "dsa-prep-strategy"],
    files: ["Problems/ComplexityAnalysis/compareGrowthRates.js", "Problems/Array/containsDuplicate.js", "Problems/Array/findMaxNumFromArr.js", "Problems/Array/largest_smallest_elements.js"]
  }
});
