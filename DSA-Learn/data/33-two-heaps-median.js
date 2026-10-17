// Two Heaps — Running Median — learn-first format. Shape is documented at the top of 00-meta.js.
// Uses the `Heap` class shown in the Heap topic (DSA.heapKit, defined in 31-heap.js).
(function () {
  const kit = window.DSA.heapKit;
  const list = (a) => a.join(", ");
  const biggerFirst = (a, b) => a > b;
  const smallerFirst = (a, b) => a < b;

  const MEDIAN_CODE = {
    fn: "RUNNING_MEDIAN",
    lines: [
      ...kit.classLines,
      ``,
      `function RUNNING_MEDIAN(stream) {`,
      [`  const lo = new Heap((a, b) => a > b);`, "**lo**: a **max**-heap holding the smaller half. Its root is the biggest of the small numbers.", "make"],
      [`  const hi = new Heap((a, b) => a < b);`, "**hi**: a **min**-heap holding the bigger half. Its root is the smallest of the big numbers.", "make"],
      `  const medians = [];`,
      `  for (const x of stream) {`,
      [`    lo.push(x);`, "**Step 1.** Every new number goes into lo first.", "lo"],
      [`    hi.push(lo.pop());`, "**Step 2.** Then lo's biggest moves to hi. Wherever x belongs, this keeps **every number in lo ≤ every number in hi**.", "move"],
      [`    if (hi.size > lo.size) lo.push(hi.pop());`, "**Step 3.** Keep the sizes balanced: lo may have one more than hi, but never fewer. If hi got bigger, hand its smallest back.", "balance"],
      [`    medians.push(lo.size > hi.size ? lo.peek() : (lo.peek() + hi.peek()) / 2);`, "The two roots sit **in the middle of the sorted data**. Odd count: lo's root is the median. Even count: the average of the two roots.", "median"],
      `  }`,
      [`  return medians;`, "", "done"],
      `}`
    ]
  };

  const CAPITAL_CODE = {
    fn: "findMaximizedCapital",
    lines: [
      ...kit.classLines,
      ``,
      `function findMaximizedCapital(k, w, profits, capital) {`,
      [`  const projects = profits.map((p, i) => [capital[i], p]).sort((a, b) => a[0] - b[0]);`, "Pairs [capital needed, profit], cheapest to start first. This is the **waiting list** of projects we cannot afford yet."],
      [`  const affordable = new Heap((a, b) => a > b);`, "A **max**-heap of profits: projects we can afford right now, best profit on top."],
      [`  let i = 0;`, "i = how far we have walked down the waiting list."],
      `  for (let round = 0; round < k; round++) {`,
      `    while (i < projects.length && projects[i][0] <= w) {`,
      [`      affordable.push(projects[i][1]);`, "Our capital grew: move every project we can now afford into the heap."],
      `      i++;`,
      `    }`,
      [`    if (affordable.size === 0) break;`, "Nothing affordable: we are stuck, stop early."],
      [`    w += affordable.pop();`, "Do the most profitable affordable project; its profit adds to our capital."],
      `  }`,
      `  return w;`,
      `}`
    ]
  };

  [MEDIAN_CODE, CAPITAL_CODE].forEach(kit.classLast);

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "two-heaps-median",
    group: "heaps",
    emoji: "⚖️",
    title: "Two Heaps — Running Median",
    tagline: "Split the numbers into a smaller half (max-heap) and a bigger half (min-heap). The two roots sit in the middle, so the median is O(1) to read and O(log n) to update.",
    level: "Core",
    needs: ["heap", "top-k"],

    gist: [
      "The **median** is the middle value of the sorted data (or the average of the two middle values). Re-sorting after every new number is too slow.",
      "Keep two heaps: **lo** = a **max**-heap with the **smaller half**, **hi** = a **min**-heap with the **bigger half**. Their roots are exactly the two numbers next to the middle.",
      "Two rules (invariants): every number in `lo` ≤ every number in `hi`, and `lo` has the same size as `hi` or **one more**.",
      "Add in O(log n) with three steps (push to lo, move lo's top to hi, rebalance). Median in O(1)."
    ],

    complexity: {
      time: "add O(log n) · median O(1)",
      space: "O(n)",
      why: [
        "Each new number does a constant number of heap pushes and pops (at most three), each O(log n). Reading the median only looks at the two roots, so it is O(1).",
        "Compare with the naive ideas: sorting after every number is O(n log n) per step, and inserting into a sorted array is O(n) per step (shifting). Two heaps give O(log n)."
      ]
    },

    idea: {
      plain: [
        "The median splits sorted data into two halves of (almost) equal size: a **lower half** and an **upper half**. To know the median you only need the **largest of the lower half** and the **smallest of the upper half**, the two numbers standing at the middle line.",
        "A **max**-heap hands you the largest of a group instantly, and a **min**-heap hands you the smallest. So keep the lower half in a max-heap (`lo`) and the upper half in a min-heap (`hi`). Both roots are exactly the two numbers at the middle line.",
        "When a new number arrives you do not even have to decide which half it belongs to. Always push it into `lo`, then move `lo`'s biggest over to `hi`: that guarantees nothing in `lo` is bigger than anything in `hi`. Finally, if `hi` ended up bigger than `lo`, move one back so `lo` never has fewer numbers."
      ],
      signals: [
        "“**Median** of a stream”, “running median”, “median after every insertion”.",
        "You need the **middle** element repeatedly while data keeps arriving.",
        "Problems that treat the data as **two halves**: *IPO / Maximize Capital*, scheduling with two queues."
      ],
      notFor: [
        "A one-time median of a fixed array: Quickselect (next topic) does it in O(n) average, or just sort.",
        "Values in a tiny fixed range (0–100): a counting array is simpler."
      ],
      more: [
        {
          type: "table",
          heading: "Where the median is",
          columns: ["Count", "Sizes", "Median"],
          rows: [
            ["Odd (5 numbers)", "`lo` has 3, `hi` has 2", "`lo.peek()`: the extra number is the middle one"],
            ["Even (4 numbers)", "`lo` has 2, `hi` has 2", "`(lo.peek() + hi.peek()) / 2`"]
          ]
        },
        {
          type: "points",
          heading: "Edge cases and variants",
          items: [
            "**Duplicates and negatives** need no change.",
            "The even-count median can be a **fraction** (`(3 + 4) / 2 = 3.5`); in other languages beware of integer division.",
            "**Sliding-window median**: the oldest number has to leave the window, but a heap cannot delete an arbitrary value cheaply. Use *lazy deletion* (mark it as removed and discard it when it reaches a root) or an ordered multiset. Advanced.",
            "The same “two halves” trick shows up in *IPO / Maximize Capital* (see the practice problem)."
          ]
        }
      ]
    },

    analogy: {
      title: "Two lines of students split at the middle",
      story: [
        "Imagine all students lined up by height. Split them into the **shorter half** and the **taller half**. The class median is decided by just two students: the **tallest of the shorter half** and the **shortest of the taller half**, the two standing on either side of the middle line.",
        "When a new student walks in you do not re-line the whole class. You stand them in the shorter group, then send that group's tallest student across to the taller group (so nobody in the shorter group is taller than someone in the taller group). If the taller group now has more students, you send their shortest back. The middle line is fixed again."
      ],
      map: [
        ["Shorter half of the class", "`lo`, a max-heap"],
        ["Taller half of the class", "`hi`, a min-heap"],
        ["Tallest of the shorter half", "`lo.peek()`"],
        ["Shortest of the taller half", "`hi.peek()`"],
        ["Send the tallest of the short group across", "`hi.push(lo.pop())`"],
        ["Odd class size: the extra student stays in the shorter group", "`lo` has one more, so the median is `lo.peek()`"]
      ],
      breaks: "Students inside each group are not lined up in order; only the one at the edge facing the middle matters, and the heap gives you exactly that one."
    },

    demos: [
      {
        id: "median",
        title: "Running median of a stream",
        intro: "Numbers arrive one at a time. The left heap **lo** (a max-heap) holds the smaller half, the right heap **hi** (a min-heap) the bigger half. After each number the median is read from the two roots. Try the default `5 15 1 3`: medians 5, 10, 5, 4.",
        codeIntro: "The `Heap` class is from the Heap topic. A comparator decides which way it works: `a > b` gives a max-heap, `a < b` a min-heap.",
        viz: "heap",
        legend: [["cur", "number just moved"], ["good", "the roots that give the median"]],
        inputs: [{ type: "numlist", name: "stream", label: "Stream of numbers", value: [5, 15, 1, 3], len: [2, 8], min: 1, max: 99 }],
        scene: (inp) => ({ caps: [Math.ceil(inp.stream.length / 2) + 1, Math.floor(inp.stream.length / 2) + 1] }),
        frames(inp, snap) {
          const lo = kit.make(biggerFirst);
          const hi = kit.make(smallerFirst);
          const medians = [];
          const view = (i, toneLo, toneHi, extra) =>
            Object.assign(
              {
                heaps: [
                  { label: "lo: max-heap (smaller half)", hint: "root = biggest of the small", values: lo.a.slice(), tone: toneLo },
                  { label: "hi: min-heap (bigger half)", hint: "root = smallest of the big", values: hi.a.slice(), tone: toneHi }
                ],
                vars: { "lo size": lo.size(), "hi size": hi.size() },
                boxes: [{ label: "still to arrive", kind: "list", items: inp.stream.slice(i + 1) }, { label: "medians so far", kind: "list", items: medians.slice() }]
              },
              extra
            );
          snap(view(-1, {}, {}, { at: ["make"], boxes: [{ label: "still to arrive", kind: "list", items: inp.stream.slice() }], say: "Two empty heaps. **lo** is a max-heap for the smaller half of the numbers, **hi** a min-heap for the bigger half. Their roots will be the two numbers next to the middle." }));
          inp.stream.forEach((x, i) => {
            const a = lo.push(x);
            snap(view(i, { [a]: "cur" }, {}, { at: ["lo"], vars: { x, "lo size": lo.size(), "hi size": hi.size() }, say: "**" + x + "** arrives. **Step 1:** push it into **lo**." }));
            const m = lo.pop();
            const b = hi.push(m);
            snap(view(i, {}, { [b]: "cur" }, { at: ["move"], vars: { x, moved: m, "lo size": lo.size(), "hi size": hi.size() }, say: "**Step 2:** take the **biggest** number in lo, **" + m + "**" + (m === x ? " (the number that just arrived)" : "") + ", and move it to **hi**. Now every number in lo is ≤ every number in hi, wherever " + x + " really belongs." }));
            if (hi.size() > lo.size()) {
              const m2 = hi.pop();
              const c = lo.push(m2);
              snap(view(i, { [c]: "cur" }, {}, { at: ["balance"], vars: { x, moved: m2, "lo size": lo.size(), "hi size": hi.size() }, say: "**Step 3:** hi has more numbers than lo (" + (hi.size() + 1) + " vs " + (lo.size() - 1) + "), which is not allowed. Move hi's **smallest**, **" + m2 + "**, back to lo." }));
            }
            const med = lo.size() > hi.size() ? lo.peek() : (lo.peek() + hi.peek()) / 2;
            medians.push(med);
            snap(
              view(i, lo.size() ? { 0: "good" } : {}, hi.size() ? { 0: "good" } : {}, {
                at: ["median"],
                vars: { x, median: med, "lo size": lo.size(), "hi size": hi.size() },
                say:
                  lo.size() > hi.size()
                    ? "Sizes are " + lo.size() + " and " + hi.size() + ": an **odd** count, so the extra number in lo is the middle. Median = **" + med + "**."
                    : "Sizes are equal (" + lo.size() + " and " + hi.size() + "): an **even** count, so the median is the average of the two roots: (" + lo.peek() + " + " + hi.peek() + ") / 2 = **" + med + "**."
              })
            );
          });
          snap(view(inp.stream.length - 1, lo.size() ? { 0: "good" } : {}, hi.size() ? { 0: "good" } : {}, { at: ["done"], out: "medians = [" + list(medians) + "]", say: "Each number cost O(log n) and each median was read in O(1). Nothing was ever sorted.", result: medians.slice() }));
        },
        code: MEDIAN_CODE,
        call: (fn, inp) => fn(inp.stream)
      }
    ],

    mistakes: [
      {
        oops: "Using two min-heaps (or two max-heaps)",
        why: "You need the biggest of the lower half and the smallest of the upper half. Two heaps of the same kind cannot give both from the root.",
        fix: "lo is a **max**-heap, hi is a **min**-heap."
      },
      {
        oops: "Pushing straight to lo or hi depending on a comparison, and forgetting to fix the order",
        why: "It is easy to leave a number in the wrong half, so some number in lo ends up bigger than one in hi.",
        fix: "Use the safe routine: push to lo, move lo's top to hi, then rebalance sizes. The order invariant then holds automatically."
      },
      {
        oops: "Forgetting the size rule (step 3)",
        why: "If hi grows bigger than lo, the median formula picks the wrong number.",
        fix: "After moving to hi: `if (hi.size > lo.size) lo.push(hi.pop())`."
      },
      {
        oops: "Reading the median from the wrong heap on odd counts",
        why: "The extra element lives in **lo** by our convention. Reading hi's root gives a wrong value.",
        fix: "Odd → `lo.peek()`. Even → average of both roots."
      },
      {
        oops: "Using integer division for the even case",
        why: "`(3 + 4) / 2` should be 3.5, but in some languages it truncates to 3.",
        fix: "Divide by `2.0` or convert to a float in those languages (JavaScript is fine)."
      }
    ],

    remember: {
      mnemonic: "lo = MAX-heap of the small half, hi = MIN-heap of the big half. Push to lo → move lo's top to hi → rebalance. Median = the roots.",
      rules: [
        "Two invariants: everything in lo ≤ everything in hi, and `lo.size` is `hi.size` or `hi.size + 1`.",
        "Add: `lo.push(x); hi.push(lo.pop()); if (hi.size > lo.size) lo.push(hi.pop());`",
        "Median: odd → `lo.peek()`; even → `(lo.peek() + hi.peek()) / 2`.",
        "Add O(log n), median O(1), space O(n).",
        "A fixed array only once? Use Quickselect or sort instead."
      ],
      template: {
        lines: [
          [`const lo = new Heap((a, b) => a > b);   // smaller half (max-heap)`, ""],
          [`const hi = new Heap((a, b) => a < b);   // bigger half (min-heap)`, ""],
          [`add(x): lo.push(x); hi.push(lo.pop()); if (hi.size > lo.size) lo.push(hi.pop());`, "Three steps, always."],
          [`median(): lo.size > hi.size ? lo.peek() : (lo.peek() + hi.peek()) / 2`, "Read the middle."]
        ]
      }
    },

    practice: {
      title: "Maximize Capital (IPO)",
      level: "Hard",
      problem: "You start with capital `w`. Project `i` needs `capital[i]` to start and adds `profits[i]` to your capital when it is finished. You can do **at most `k` projects**, one after another, and you can only start a project if your current capital is at least what it needs. Return the **maximum capital** you can end up with.",
      examples: [
        { input: "k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]", output: "4", why: "Do project 0 (capital 0, profit 1) → 1. Now both others are affordable: take the profit-3 one → 4." },
        { input: "k = 1, w = 0, profits = [1, 2, 3], capital = [1, 1, 2]", output: "0", why: "Nothing is affordable with capital 0." }
      ],
      hints: [
        "Greedy: among the projects you can afford **right now**, always take the one with the **highest profit**. Why is that never worse?",
        "Keep two collections, like two halves: the projects you **cannot afford yet** (sorted by the capital they need) and the ones you **can afford** (a max-heap by profit).",
        "Each round: move every project with `capital <= w` from the waiting list into the max-heap, then pop the best profit and add it to `w`. Stop early if the heap is empty."
      ],
      solution: {
        explain: [
          "Sorting the projects by capital lets a single index `i` walk down the waiting list as `w` grows, so each project enters the heap exactly once. The heap hands back the most profitable affordable project in O(log n).",
          "Time O(n log n + k log n): the sort, plus at most k pops and n pushes. Memory O(n)."
        ],
        code: CAPITAL_CODE
      },
      tests: [
        { args: [2, 0, [1, 2, 3], [0, 1, 1]], expect: 4 },
        { args: [3, 0, [1, 2, 3], [0, 1, 2]], expect: 6 },
        { args: [1, 0, [1, 2, 3], [1, 1, 2]], expect: 0 },
        { args: [2, 1, [5, 10], [2, 1]], expect: 16 },
        { args: [1, 5, [3, 9, 4], [1, 6, 2]], expect: 9 },
        { args: [10, 0, [1, 2, 3], [0, 1, 2]], expect: 6 },
        { args: [0, 3, [1], [0]], expect: 3 }
      ]
    },

    recall: [
      { q: "Which kind of heap holds which half?", a: "The smaller half lives in a max-heap (lo), the bigger half in a min-heap (hi). Both roots face the middle." },
      { q: "State the two invariants.", a: "Every number in lo ≤ every number in hi, and lo.size equals hi.size or hi.size + 1." },
      { q: "What are the three steps of adding a number?", a: "Push it to lo; move lo's top to hi; if hi became bigger than lo, move hi's top back to lo." },
      { q: "How do you read the median?", a: "Odd count: lo.peek(). Even count: (lo.peek() + hi.peek()) / 2." },
      { q: "Cost of add and of the median?", a: "Add O(log n), median O(1), memory O(n)." }
    ],

    related: {
      topics: ["heap", "top-k", "quickselect", "greedy", "sliding-window"],
      files: ["Problems/Tree/heap.js"]
    }
  });
})();
