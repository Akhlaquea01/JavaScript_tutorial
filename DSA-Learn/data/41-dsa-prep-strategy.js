// Problem-Solving & DSA Prep Strategy — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const BUDGET = 100000000;
  const ops = (v) => (v >= 1e18 ? "more than a quintillion" : Math.round(v).toLocaleString("en-US"));

  // clue -> [technique, topic ids]. The displayed code and the animation both read this one table.
  const PATTERNS = [
    { id: "sortedPair", label: "Sorted array: find a pair or triplet with a given sum", technique: "Two pointers or binary search", topics: "two-pointer, three-pointer, binary-search", slow: "Checking every pair is O(n²), but sorted order lets one pointer at each end discard values." },
    { id: "rangeSum", label: "Sum of a subarray, or many range queries", technique: "Prefix sums or sliding window", topics: "prefix-sum, sliding-window", slow: "Re-adding the same numbers for every range repeats work you could precompute or update." },
    { id: "countLookup", label: "Count things, find duplicates, group items", technique: "HashMap, HashSet or frequency map", topics: "hashmap, hashset, frequency-map", slow: "Searching the list again for every item is O(n) each time; a hash lookup is O(1)." },
    { id: "treePath", label: "Depth, subtree or path in a tree", technique: "Tree recursion: root, left, right", topics: "tree-recursion-pattern, tree-height-diameter, tree-lca", slow: "Every node asks the same question of its two subtrees, which is exactly what recursion expresses." },
    { id: "levels", label: "Level by level, or the fewest steps", technique: "BFS", topics: "tree-bfs-level-order, graph-bfs", slow: "Exploring ring by ring with a queue reaches everything at distance 1 before distance 2." },
    { id: "prefixWords", label: "Autocomplete, or words starting with a prefix", technique: "Trie", topics: "trie", slow: "Scanning every word for a prefix costs O(N × L); a trie walks only the prefix." },
    { id: "topK", label: "Kth largest, top K, or merge K sorted lists", technique: "Heap of size K", topics: "heap, top-k", slow: "Sorting everything is overkill: you only need to remember the best K so far." },
    { id: "median", label: "Median of a stream of numbers", technique: "Two heaps", topics: "two-heaps-median", slow: "Re-sorting after every number is far too slow; the middle sits between two halves." },
    { id: "kthOnce", label: "Kth element of an array, once, as fast as possible", technique: "Quickselect", topics: "quickselect", slow: "A full sort does more work than finding one rank; partitioning discards half each round." },
    { id: "ranges", label: "Merge, insert or check overlapping ranges", technique: "Sort by start, then one pass", topics: "intervals", slow: "Comparing every pair is O(n²); sorted by start, only the previous interval matters." },
    { id: "simultaneous", label: "How many at the same time? Rooms? Platforms?", technique: "Sweep line (+1 / -1 events)", topics: "sweep-line", slow: "Counting overlaps at every time point repeats work; events only change the count at their own time." },
    { id: "localBest", label: "Most or fewest of something, with an obvious best-first rule", technique: "Greedy: sort, then one pass", topics: "greedy", slow: "Trying every combination is exponential; a safe local choice makes it one pass." },
    { id: "network", label: "Connections, regions in a grid, or dependencies", technique: "Graph BFS or DFS", topics: "graph-basics, graph-bfs, graph-dfs", slow: "Treat the things as nodes and the links as edges, then explore with a visited set." },
    { id: "allPossibilities", label: "All combinations, permutations or a constraint search", technique: "Backtracking with pruning", topics: "backtracking, pruning", slow: "You must explore a tree of choices; undo each choice and cut branches that cannot work." },
    { id: "repeatSub", label: "The same subproblem keeps repeating", technique: "Memoization or dynamic programming", topics: "recursion", slow: "The plain recursion recomputes identical subproblems; caching each answer once fixes it." }
  ];

  const FAST_CODE = {
    fn: "FAST_ENOUGH",
    lines: [
      `function FAST_ENOUGH(n) {`,
      [`  const budget = 100000000;`, "A computer does very roughly **10^8 simple operations per second**. That is the budget for one solution.", "budget"],
      `  const cap = (x) => Math.min(x, 1e18);`,
      `  let fact = 1;`,
      `  for (let i = 2; i <= n && fact < 1e18; i++) fact *= i;`,
      `  const costs = [`,
      [`    ["O(log n)", Math.log2(n)],`, "How many operations each growth rate needs for this n.", "costs"],
      `    ["O(n)", n],`,
      `    ["O(n log n)", n * Math.log2(n)],`,
      `    ["O(n^2)", cap(n * n)],`,
      `    ["O(n^3)", cap(n * n * n)],`,
      `    ["O(2^n)", cap(2 ** n)],`,
      `    ["O(n!)", cap(fact)]`,
      `  ];`,
      [`  return costs.filter(([name, ops]) => ops <= budget).map(([name]) => name);`, "Keep the growth rates whose operation count fits in the budget.", "pick"],
      `}`
    ]
  };

  const PICK_CODE = {
    fn: "WHICH_PATTERN",
    lines: [
      `function WHICH_PATTERN(clue) {`,
      [`  const table = {`, "A tiny cheat sheet: **clue → technique** (and the topics to re-read). Real interview clues map to a handful of ideas.", "table"],
      ...PATTERNS.map((p) => `    ${p.id}: [${JSON.stringify(p.technique)}, ${JSON.stringify(p.topics)}],`),
      [`  };`, "Add your own clues here as you solve problems: a personal cheat sheet is the point of this page.", "table"],
      [`  return table[clue];`, "Look the clue up.", "pick"],
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "dsa-prep-strategy",
    group: "strategy",
    emoji: "🎯",
    title: "Problem-Solving & DSA Prep Strategy",
    tagline: "How to study, what to do when you are stuck, how to turn tricky wording into plain English, how to read constraints, and a clue-to-technique cheat sheet tying every topic here together.",
    level: "Overview",
    needs: [],

    gist: [
      "**Study patterns, not problem counts.** Learn the idea on a tiny example, then do 5 to 10 good problems per pattern, write each solution yourself, and revisit them after a day, a week and a month.",
      "**When stuck:** restate the problem, solve a small example by hand, write the brute force, find the **repeated work** (the bottleneck), then match it to a pattern. Time-box yourself to 20 to 30 minutes before looking at a hint.",
      "**Read the constraints.** The size of `n` tells you which complexity is allowed (about 10^8 simple steps): n ≤ 10 allows n!, n ≤ 5,000 allows n², n ≥ 10^6 needs about O(n).",
      "**In an interview:** clarify, example, brute force, optimise, code, dry run, complexity, edge cases. Think out loud."
    ],

    complexity: {
      time: "Pick it from n",
      space: "Pick it from n",
      why: [
        "Before writing code, look at the largest input size `n` in the problem. A computer does roughly 10^8 simple operations per second, so you can work out which growth rate is affordable: n ≤ 10 allows trying every ordering (n!), n ≤ 20 allows trying every subset (2ⁿ), n up to a few hundred allows three nested loops, and so on.",
        "The same reasoning runs backwards: if a brute force is O(n²) and n is 10^5, you already know it is too slow and that you need O(n log n) or O(n): sorting, a heap, binary search, two pointers or hashing."
      ],
      more: [
        {
          type: "table",
          heading: "Constraint → complexity → typical technique",
          columns: ["Largest n", "Allowed complexity (roughly)", "Typical technique"],
          rows: [
            ["n ≤ 10", "O(n!)", "Permutations, backtracking"],
            ["n ≤ 20", "O(2ⁿ)", "Subsets, bitmask, backtracking"],
            ["n ≤ 500", "O(n³)", "Triple loops, Floyd–Warshall"],
            ["n ≤ 5,000", "O(n²)", "Nested loops, simple DP"],
            ["n ≤ 10⁵", "O(n log n) or O(n)", "Sort, heap, binary search, two pointers, hashing"],
            ["n ≥ 10⁶", "O(n) or O(log n)", "A single pass, prefix sums, math"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Getting good at data structures and algorithms is mostly about **recognising patterns**, not memorising 500 solutions. Almost every problem is a disguised version of a handful of ideas (hash lookups, two pointers, BFS, heaps, intervals, recursion…). Each topic in these notes teaches one idea with a small example you can step through. This page is about how to **use** them under pressure.",
        "When a problem looks hard, do the same short routine every time. **Restate** it in your own words. **Solve a small example by hand** and notice what you do: that is the algorithm. Write the **brute force**, even if it is slow, and say its complexity. Then look for the **repeated work**: re-checking the list for every item (hash it), re-adding the same numbers (prefix sum), recomputing the same sub-answer (cache it), always needing the smallest (heap). The repeated work names the pattern.",
        "Finally, **learn from every problem**. Write the solution again from memory a day later, keep a one-line **mistake log** (“forgot the tie-break”, “off by one at the end”), and revisit weak topics every week. Being stuck is normal: the learning happens in that gap, as long as you attempt first and read the solution actively, not passively."
      ],
      signals: [
        "You open a problem and do not know where to start.",
        "You have solved many problems but forget the ideas after a few weeks.",
        "The wording of a problem is dense jargon (“diameter”, “lowest common ancestor”, “height-balanced”).",
        "You are planning your practice for an interview in the next weeks or months."
      ],
      notFor: [
        "Cramming 500 random problems with no review: it feels productive and builds little.",
        "Reading solutions without writing them yourself afterwards."
      ],
      more: [
        {
          type: "points",
          heading: "How to study effectively",
          items: [
            "**Concept first, problems second.** Dry-run the core idea of a topic on a tiny example (“the heap root is the gatekeeper”) before coding it.",
            "**Patterns over problem count.** 5 to 10 good problems per pattern, in the order easy → medium → hard, beat hundreds of random ones.",
            "**Write it yourself.** Read a solution, close it, and write it again without looking. An interview has no autocomplete.",
            "**Spaced revision:** the same problems again after 1 day, 1 week and 1 month.",
            "**Mistake log:** one line per mistake (edge case? tie-break? off-by-one?). The same mistakes keep coming back.",
            "**Say the time and space complexity** out loud and explain it in your own words.",
            "**Consistency beats marathons:** 1 to 2 hours a day, plus one mixed set a week."
          ]
        },
        {
          type: "points",
          heading: "Stuck? Do these in order",
          items: [
            "**1. Restate** the question in your own words: input, output, constraints.",
            "**2. Solve a small example by hand** (3 to 5 items) and notice the steps you take. Those steps are the algorithm.",
            "**3. Brute force first**, with its complexity. If nothing else comes, start there.",
            "**4. Find the bottleneck:** what work repeats? Repeated lookup → hash map. Sorted data → two pointers or binary search. Repeated min/max → heap. Overlapping subproblems → memoisation. The same question at every node → recursion.",
            "**5. Match the cheat sheet** below and check the constraints.",
            "**6. Time-box 20 to 30 minutes**, then take a hint, then the approach, then the solution. After the solution, close it and implement it yourself (and again tomorrow)."
          ]
        },
        {
          type: "table",
          heading: "Clarifying questions to ask",
          columns: ["Area", "Questions"],
          rows: [
            ["Any problem", "Can the input be empty? Duplicates? Negative numbers? Is it sorted? In place? Return or print? One answer or all?"],
            ["Trees", "Binary tree or BST? Height in edges or nodes? Must a path start at the root?"],
            ["Intervals", "Closed `[s, e]` or half-open `[s, e)`? Do touching intervals overlap?"],
            ["Top-K", "Do duplicates count separately? What about ties?"],
            ["Graphs", "Directed or undirected? Weighted? Connected? Cycles or self-loops?"],
            ["Grids", "4 directions or 8? What are the boundaries?"]
          ]
        },
        {
          type: "table",
          heading: "Jargon → plain English (from these notes)",
          columns: ["The wording", "In plain English"],
          rows: [
            ["Diameter of a tree", "The longest path between any two nodes (it need not pass through the root)"],
            ["Right side view", "Stand on the right: the rightmost node of every level"],
            ["Lowest Common Ancestor", "Climb up from p and q until their routes first meet"],
            ["Height-balanced tree", "At every node the left and right heights differ by at most 1"],
            ["Validate a BST", "Every node is bigger than its **whole** left subtree and smaller than its **whole** right subtree"],
            ["Merge intervals", "Turn ranges that overlap into one bigger range"],
            ["Minimum meeting rooms", "The most meetings that run at the same time"],
            ["Non-overlapping intervals (min removals)", "The fewest to delete so the rest do not collide"],
            ["Number of islands", "How many separate groups of connected 1s"],
            ["Shortest path (unweighted)", "The fewest edges or steps: BFS"],
            ["Course schedule", "Is there a cycle in the dependencies (a directed graph)?"]
          ]
        },
        {
          type: "points",
          heading: "What to prioritise",
          items: [
            "**High frequency (first):** arrays and strings with hash maps, two pointers, sliding window, linked lists, stacks and queues, binary search, trees and BSTs, recursion and backtracking, graphs (BFS/DFS), heaps.",
            "**Medium:** intervals, greedy, tries, basic dynamic programming, Union-Find, topological sort.",
            "**Role-specific:** segment trees, Fenwick trees, B+ trees, advanced graphs, bit tricks: only go deep if your target role asks for them.",
            "**Depth over breadth:** about 15 to 20 good problems per major topic, not 2 or 3 for many topics.",
            "**Phases:** (1) foundations and notes, (2) pattern by pattern practice, (3) mixed, timed sets (two problems in 45 minutes), (4) mock interviews, coding while talking. Look at the target company's recent problems in the last 2 to 3 weeks."
          ]
        },
        {
          type: "points",
          heading: "How to present a solution in an interview",
          items: [
            "Order: **clarify → example → brute force → optimise → code → dry run → complexity → edge cases.**",
            "Say your approach first and start coding after the interviewer agrees. Do not code in silence: think out loud.",
            "After the code, **dry-run your own example** and test the edge cases: empty, one element, duplicates, negatives, huge input.",
            "No optimal idea? Give the brute force, name its bottleneck and show your progress. The interviewer will usually give a hint."
          ]
        }
      ]
    },

    analogy: {
      title: "A doctor diagnosing a patient",
      story: [
        "A good doctor does not run every possible test on everybody. They ask what the problem is in plain words (**restate**), examine the patient (**a small example**), start with the obvious treatment (**brute force**), and then look at the **symptoms** to narrow it down. Each symptom points to a condition, and each condition has a standard treatment.",
        "This page is your diagnosis chart. The **clue** in the problem is the symptom (“sorted array”, “top K”, “overlapping ranges”). The **constraints** are the patient's vital signs: they tell you how aggressive the treatment must be (n = 10 allows a lot, n = 10⁶ allows almost nothing). The **technique** is the standard treatment. The mistake log is the patient's medical history."
      ],
      map: [
        ["The patient describes the problem", "Restate the question in your own words"],
        ["Examining the patient", "Solving a small example by hand"],
        ["The obvious treatment first", "The brute force solution"],
        ["Symptoms point to a condition", "Clues point to a pattern (the cheat sheet)"],
        ["Vital signs set how risky a treatment can be", "The constraints (n) set the allowed complexity"],
        ["The medical history", "Your mistake log"]
      ],
      breaks: "A doctor can rely on years of cases; you will build that experience problem by problem. Until then the chart and the routine are what keep you from guessing."
    },

    demos: [
      {
        id: "budget",
        title: "Will my solution be fast enough?",
        intro: "Enter the largest input size **n** from a problem's constraints. Each bar shows how many operations a growth rate needs for that n. The amber bar is the budget: about **10⁸** simple operations per second. Green fits, red is too slow. (Bars use a logarithmic scale, so each step to the right is ×10 or more.)",
        codeIntro: "A rough calculation you can do in your head in an interview.",
        viz: "bars",
        legend: [["mark", "budget: about 10^8 operations"], ["good", "fits the budget"], ["bad", "too slow"]],
        inputs: [{ type: "number", name: "n", label: "Largest input size n", value: 100000, min: 1, max: 1000000000 }],
        random(rnd) {
          const picks = [5, 10, 12, 20, 30, 100, 500, 2000, 10000, 100000, 1000000, 10000000];
          return { n: String(picks[rnd.int(0, picks.length - 1)]) };
        },
        frames(inp, snap) {
          const n = inp.n;
          const cap = (x) => Math.min(x, 1e18);
          let fact = 1;
          for (let i = 2; i <= n && fact < 1e18; i++) fact *= i;
          const costs = [
            ["O(log n)", Math.log2(n)],
            ["O(n)", n],
            ["O(n log n)", n * Math.log2(n)],
            ["O(n^2)", cap(n * n)],
            ["O(n^3)", cap(n * n * n)],
            ["O(2^n)", cap(2 ** n)],
            ["O(n!)", cap(fact)]
          ];
          const bars = (k) => [{ label: "budget", value: BUDGET, tone: "mark", note: "(1 second)" }].concat(costs.slice(0, k).map(([name, o]) => ({ label: name, value: Math.round(o), tone: o <= BUDGET ? "good" : "bad", note: o <= BUDGET ? "fits" : "too slow" })));
          snap({ at: ["budget"], bars: bars(0), max: 1e18, scale: "log", unit: "operations", title: "operations needed for n = " + n.toLocaleString("en-US"), say: "Our budget is about **10⁸** simple operations (roughly one second). Now let us see how many operations each growth rate needs when **n = " + n.toLocaleString("en-US") + "**." });
          costs.forEach(([name, o], k) => {
            const fits = o <= BUDGET;
            snap({ at: ["costs"], bars: bars(k + 1), max: 1e18, scale: "log", unit: "operations", title: "operations needed for n = " + n.toLocaleString("en-US"), say: "**" + name + "**: " + (o >= 1e18 ? "" : "about ") + ops(o) + " operations. " + (fits ? "That is within the budget: **fast enough**." : "That is **far more** than the budget: **too slow**.") });
          });
          const ok = costs.filter(([, o]) => o <= BUDGET).map(([name]) => name);
          snap({ at: ["pick"], bars: bars(costs.length), max: 1e18, scale: "log", unit: "operations", title: "operations needed for n = " + n.toLocaleString("en-US"), out: "fast enough: " + ok.join(", "), say: "For n = " + n.toLocaleString("en-US") + " the affordable growth rates are **" + ok.join(", ") + "**. If your idea is slower than that, look for a better pattern.", result: ok });
        },
        code: FAST_CODE,
        call: (fn, inp) => fn(inp.n)
      },

      {
        id: "pattern",
        title: "From a clue to a technique",
        intro: "Pick a **clue** you might see in a problem statement. The cheat sheet (the table inside the code) tells you the technique to try first and which topics to re-read. Clues are what to look for; techniques are what to reach for.",
        codeIntro: "The whole cheat sheet is one lookup table. Add your own clues as you practise.",
        viz: "none",
        legend: [],
        inputs: [{ type: "select", name: "clue", label: "The clue in the problem", value: "topK", options: PATTERNS.map((p) => [p.id, p.label]) }],
        frames(inp, snap) {
          const p = PATTERNS.find((x) => x.id === inp.clue);
          snap({ at: ["table"], boxes: [{ label: "the clue", kind: "text", items: [p.label] }], say: "The clue in the problem: **" + p.label + "**. The cheat sheet maps each clue to a technique." });
          snap({ at: ["table"], boxes: [{ label: "the clue", kind: "text", items: [p.label] }, { label: "what is slow in the brute force", kind: "text", items: [p.slow] }], say: "Ask: **what work does the brute force repeat?** " + p.slow });
          snap({ at: ["pick"], boxes: [{ label: "the clue", kind: "text", items: [p.label] }, { label: "technique to try first", kind: "text", items: [p.technique] }, { label: "re-read these topics", kind: "list", items: p.topics.split(", ") }], out: p.technique, say: "So try **" + p.technique + "** first. Topics to revisit: **" + p.topics + "**. A problem can combine patterns, so check the constraints too.", result: [p.technique, p.topics] });
        },
        code: PICK_CODE,
        call: (fn, inp) => fn(inp.clue)
      }
    ],

    mistakes: [
      {
        oops: "Grinding hundreds of random problems",
        why: "Without a pattern in mind and without review, most of it is forgotten within weeks.",
        fix: "Learn one pattern at a time, do 5 to 10 good problems for it, and revisit them after 1 day, 1 week and 1 month."
      },
      {
        oops: "Reading the solution and moving on",
        why: "Passively reading feels like learning but the effort that builds memory is writing it yourself.",
        fix: "Close the solution and implement it again from scratch (and again the next day)."
      },
      {
        oops: "Skipping the brute force",
        why: "You lose a working baseline, and finding the bottleneck is much easier when you can point at slow code.",
        fix: "Always state the simplest solution and its complexity first, then optimise."
      },
      {
        oops: "Ignoring the constraints",
        why: "n tells you the complexity that is allowed. An O(n²) idea with n = 10⁵ will never pass.",
        fix: "Read n first and compare with the table (about 10⁸ operations)."
      },
      {
        oops: "Coding in silence in an interview",
        why: "The interviewer cannot see your reasoning and cannot help you when you drift.",
        fix: "Say the approach, get agreement, then code while explaining. Dry-run your own example afterwards."
      },
      {
        oops: "Not keeping a mistake log",
        why: "The same few slips (off-by-one, edge case, tie-break) repeat across problems.",
        fix: "One line per mistake, and look over the list before each practice session."
      }
    ],

    remember: {
      mnemonic: "Restate → Example → Brute force → Optimise → Code → Dry-run → Complexity → Edge cases. Stuck? Find the REPEATED WORK.",
      rules: [
        "About 10⁸ simple operations per second: let n decide the complexity.",
        "Repeated lookup → hash. Sorted → pointers / binary search. Repeated min/max → heap. Overlapping subproblems → cache.",
        "Time-box 20 to 30 minutes, then hint → approach → solution → rewrite it yourself.",
        "Patterns over problem count. Review after 1 day, 1 week, 1 month.",
        "Ask clarifying questions: duplicates? sorted? closed or half-open? directed?"
      ],
      template: {
        lines: [
          [`1. RESTATE     the question in your own words; confirm input, output, constraints`, ""],
          [`2. EXAMPLE     solve a small one (and an edge case) by hand`, ""],
          [`3. BRUTE       the simplest solution and its time / space`, ""],
          [`4. OPTIMISE    find the repeated work, match a pattern`, ""],
          [`5. CODE        clear names, small helpers`, ""],
          [`6. DRY RUN     trace your own example line by line`, ""],
          [`7. COMPLEXITY  final time and space, and the trade-offs`, ""],
          [`8. EDGE CASES  empty, single element, duplicates, negatives, huge input`, ""]
        ]
      }
    },

    practice: {
      title: "Pick the Safe Complexity",
      level: "Easy",
      problem: "Write `slowestSafe(n)`. With a budget of **100,000,000** simple operations, return the **slowest** growth rate that is still affordable for input size `n`, choosing from these (slowest first): `\"O(n!)\"`, `\"O(2^n)\"`, `\"O(n^3)\"`, `\"O(n^2)\"`, `\"O(n log n)\"`, `\"O(n)\"`. If none fits, return `\"O(log n)\"`. (Use `Math.log2` for the logarithm.)",
      examples: [
        { input: "n = 10", output: "\"O(n!)\"", why: "10! = 3,628,800 operations, well within 10⁸." },
        { input: "n = 100000", output: "\"O(n log n)\"", why: "n² would be 10¹⁰, too slow; n log n is about 1.7 million." },
        { input: "n = 1000000000", output: "\"O(log n)\"", why: "Even a single pass over a billion items is too slow." }
      ],
      hints: [
        "Compute the number of operations for each growth rate: `n!`, `2 ** n`, `n ** 3`, `n * n`, `n * Math.log2(n)`, `n`.",
        "List them from slowest to fastest and return the **first** whose count is at most 100,000,000.",
        "Careful with huge values: build `n!` with a loop that stops as soon as the product passes the budget, so it never overflows or runs for long. `2 ** n` becomes `Infinity` for large n, which is fine for the comparison."
      ],
      solution: {
        explain: [
          "Each growth rate becomes a number of operations; scanning from the slowest to the fastest, the first one that fits in the budget is the slowest affordable rate. This is exactly what you do mentally when you look at the constraints of a problem.",
          "Cost: constant time (the factorial loop stops after about 12 steps)."
        ],
        code: {
          fn: "slowestSafe",
          lines: [
            `function slowestSafe(n) {`,
            [`  const budget = 100000000;`, "About one second of simple operations."],
            `  let fact = 1;`,
            [`  for (let i = 2; i <= n && fact <= budget; i++) fact *= i;`, "n! grows so fast that we can stop as soon as it passes the budget."],
            `  const classes = [`,
            [`    ["O(n!)", fact],`, "Slowest first."],
            `    ["O(2^n)", 2 ** n],`,
            `    ["O(n^3)", n * n * n],`,
            `    ["O(n^2)", n * n],`,
            `    ["O(n log n)", n * Math.log2(n)],`,
            `    ["O(n)", n]`,
            `  ];`,
            [`  for (const [name, ops] of classes) if (ops <= budget) return name;`, "The first growth rate that fits is the slowest one we can afford."],
            [`  return "O(log n)";`, "Nothing else fits: you would need something sub-linear."],
            `}`
          ]
        }
      },
      tests: [
        { args: [10], expect: "O(n!)" },
        { args: [11], expect: "O(n!)" },
        { args: [12], expect: "O(2^n)" },
        { args: [26], expect: "O(2^n)" },
        { args: [27], expect: "O(n^3)" },
        { args: [400], expect: "O(n^3)" },
        { args: [500], expect: "O(n^2)" },
        { args: [10000], expect: "O(n^2)" },
        { args: [10001], expect: "O(n log n)" },
        { args: [1000000], expect: "O(n log n)" },
        { args: [10000000], expect: "O(n)" },
        { args: [100000000], expect: "O(n)" },
        { args: [1000000000], expect: "O(log n)" }
      ]
    },

    recall: [
      { q: "What are the steps of the problem-solving routine?", a: "Restate, example by hand, brute force, optimise (find the repeated work), code, dry run, complexity, edge cases." },
      { q: "You are stuck. What do you do before reaching for the solution?", a: "Restate, solve a small example by hand, write the brute force, find the bottleneck, match the cheat sheet and constraints, and time-box 20 to 30 minutes. Then hint, approach, solution." },
      { q: "What complexity is allowed for n = 10⁵? For n = 20? For n = 5,000?", a: "About O(n log n) or O(n); O(2ⁿ); O(n²). The rule of thumb is roughly 10⁸ simple operations per second." },
      { q: "Name three clue → technique pairs.", a: "Kth largest or top K → heap of size K; sorted array pair sum → two pointers; overlapping ranges → sort by start and merge; fewest steps → BFS; all combinations → backtracking." },
      { q: "How do you make practice stick?", a: "Patterns over problem count, write each solution yourself, review after 1 day, 1 week and 1 month, and keep a one-line mistake log." }
    ],

    related: {
      topics: ["time-complexity", "algorithms", "hashmap", "two-pointer", "binary-search", "heap", "graph-bfs", "backtracking"],
      files: []
    }
  });
})();
