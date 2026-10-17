// Searching — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "searching",
  group: "searching",
  emoji: "🔎",
  title: "Searching (the big picture)",
  tagline: "Finding a target in a collection. You can scan item by item or halve a sorted range, and one question decides which: is the data sorted?",
  level: "Starter",
  needs: ["data-structures"],

  gist: [
    "**Linear search** checks items one by one: O(n), works on **any** data.",
    "**Binary search** halves a range each step: O(log n), but needs **sorted** data.",
    "Sorted? → binary search. Unsorted and you search **once**? → linear search. Unsorted and you search **many times**? → build a Set / Map, or sort once and then binary search.",
    "Sorting just to do one search costs O(n log n), which is more than one O(n) scan."
  ],

  complexity: {
    time: "O(n) linear, O(log n) binary",
    space: "O(1)",
    why: [
      "Linear search may look at every item before finding the target (or concluding it is missing): O(n). Binary search throws away half of the remaining range with each look: O(log n), about 20 looks for a million items.",
      "Both need only a few variables, so extra space is O(1)."
    ],
    more: [
      {
        type: "table",
        heading: "Which search for which situation?",
        columns: ["Your data", "Searches", "Best choice", "Cost"],
        rows: [
          ["Sorted", "any number", "Binary search", "O(log n) each"],
          ["Unsorted", "just one", "Linear search", "O(n)"],
          ["Unsorted", "many", "Build a Set / Map once, then look up", "O(n) once, O(1) each"],
          ["Unsorted", "many (need order or ranges)", "Sort once, then binary search", "O(n log n) once, O(log n) each"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "**Searching** means finding a target value (or its position) in a collection such as an array. There are two basic strategies.",
      "**Linear search:** start at the beginning and check every item until you find the target or run out. It is simple and works on any data, sorted or not.",
      "**Binary search:** if the data is sorted, look at the middle item. One comparison tells you which half to throw away, so each step removes half the remaining items. That is dramatically faster, but only valid on sorted data."
    ],
    signals: [
      "“Find the **index** of … / is this value **present**?”.",
      "Data described as **sorted** → think binary search immediately.",
      "Data is **unsorted** and you ask the same question repeatedly → think Set / Map.",
      "A huge n with an O(log n) hint → binary search."
    ],
    notFor: [
      "Sorting an unsorted list *only* to run a single search. One linear scan is cheaper than sorting.",
      "Binary search on data that is not sorted. It will skip over the target and report “not found”."
    ],
    more: [
      {
        type: "table",
        heading: "The two strategies at a glance",
        columns: ["", "Linear search", "Binary search"],
        rows: [
          ["Idea", "Check items one by one", "Halve a sorted range"],
          ["Needs sorted data?", "No", "Yes"],
          ["Worst case", "O(n)", "O(log n)"],
          ["Best case", "O(1) (first item)", "O(1) (middle item)"],
          ["Good for", "Small or unsorted data, linked lists", "Large sorted arrays"]
        ]
      }
    ]
  },

  analogy: {
    title: "Finding a book on a shelf",
    story: [
      "Your friend's book could be on any shelf in a messy room. With no order at all, you have to scan shelf after shelf until you spot it (**linear search**). In a library the books are in alphabetical order, so you walk to the middle of the section, see whether your title is before or after it, and halve the section again (**binary search**).",
      "If the room is messy but you will look for many different books, it is worth spending an evening writing an index card for each book (a **hash map**) or sorting the shelves (so you can use binary search afterwards). For a single book, it is not."
    ],
    map: [
      ["Scanning shelf after shelf", "Linear search"],
      ["Alphabetical library, halving the section", "Binary search"],
      ["An index card for every book", "Hash map / Set"],
      ["Sorting the shelves once", "Sort first, then binary search"],
      ["Only one book wanted", "A single linear scan is cheaper than any preparation"]
    ],
    breaks: "In the library, someone else already sorted the books. In code, sorting costs real time, so “binary search is faster” is only true if the data is **already** sorted or you will search many times."
  },

  demos: [
    {
      id: "compare",
      title: "How many looks does each search need?",
      intro: "Worst case: the target is **not** in the sorted array, so each search runs to the end. Watch linear search grow with n while binary search barely moves.",
      codeIntro: "Counts the looks each search makes on a sorted array `0 … n-1` when the target is missing.",
      viz: "bars",
      legend: [["bad", "linear search"], ["good", "binary search"]],
      inputs: [{ type: "number", name: "n", label: "Largest array size", value: 10000, min: 10, max: 100000 }],
      frames(inp, snap) {
        const count = (n) => {
          let linear = 0;
          for (let i = 0; i < n; i++) linear++;
          let binary = 0;
          let left = 0;
          let right = n - 1;
          const target = -1;
          while (left <= right) {
            binary++;
            const mid = Math.floor((left + right) / 2);
            if (mid === target) break;
            if (mid < target) left = mid + 1;
            else right = mid - 1;
          }
          return { linear, binary };
        };
        const sizes = [10, 100, 1000, 10000, 100000].filter((s) => s <= inp.n);
        if (sizes[sizes.length - 1] !== inp.n) sizes.push(inp.n);
        const top = count(inp.n).linear;
        const bars = (n) => {
          const c = count(n);
          return [
            { label: "Linear", value: c.linear, tone: "bad" },
            { label: "Binary", value: c.binary, tone: "good" }
          ];
        };
        sizes.forEach((n, k) => {
          const c = count(n);
          snap({
            at: ["lin", "bin"],
            bars: bars(n),
            max: top,
            unit: "looks",
            title: "array of " + n.toLocaleString("en-US") + " items, target missing",
            say: k === 0
              ? "With **" + n + "** items: linear search needs " + c.linear + " looks, binary search " + c.binary + ". At this size the difference is small."
              : "**" + n.toLocaleString("en-US") + "** items: linear search needs **" + c.linear.toLocaleString("en-US") + "** looks, binary search only **" + c.binary + "**."
          });
        });
        const c = count(inp.n);
        snap({
          at: ["done"],
          bars: bars(inp.n),
          max: top,
          unit: "looks",
          title: "array of " + inp.n.toLocaleString("en-US") + " items, target missing",
          out: "n = " + inp.n.toLocaleString("en-US") + ": linear " + c.linear.toLocaleString("en-US") + " looks, binary " + c.binary,
          say: "Every time n grows 10 times, linear search does 10 times the work but binary search adds just about 3 more looks. That is O(n) against O(log n), and it only works because the array is sorted.",
          result: c
        });
      },
      code: {
        fn: "countLooks",
        lines: [
          `function countLooks(n) {`,
          [`  const sorted = Array.from({ length: n }, (_, i) => i);`, "A sorted array 0, 1, 2, ..., n-1.", "setup"],
          [`  const target = -1;`, "Not in the array: the worst case for both searches.", "setup"],
          [`  let linear = 0;`, "", "lin"],
          [`  for (let i = 0; i < n; i++) { linear++; if (sorted[i] === target) break; }`, "Linear search: look at every item.", "lin"],
          [`  let binary = 0, left = 0, right = n - 1;`, "", "bin"],
          [`  while (left <= right) {`, "Binary search: halve the range each time.", "bin"],
          `    binary++;`,
          `    const mid = Math.floor((left + right) / 2);`,
          `    if (sorted[mid] === target) break;`,
          `    if (sorted[mid] < target) left = mid + 1; else right = mid - 1;`,
          `  }`,
          [`  return { linear, binary };`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "pick",
      title: "Pick the right search for your data",
      intro: "Answer the two questions that decide the strategy and see the recommendation, with the reason.",
      codeIntro: "A tiny decision function. This is the thinking you do before writing any search code.",
      viz: "none",
      legend: [],
      inputs: [
        { type: "select", name: "sorted", label: "Is the data sorted?", value: "yes", options: [["yes", "Yes, sorted"], ["no", "No, unsorted"]] },
        { type: "select", name: "searches", label: "How many searches?", value: "one", options: [["one", "Just one"], ["many", "Many"]] }
      ],
      frames(inp, snap) {
        const sorted = inp.sorted === "yes";
        const many = inp.searches === "many";
        const facts = (items) => ({ label: "what we know", kind: "list", items: items.map((v) => ({ v })) });
        snap({ at: ["sorted"], boxes: [facts([])], say: "**Question 1:** is the data sorted? You said: **" + (sorted ? "yes" : "no") + "**." });
        if (sorted) {
          snap({
            at: ["sorted"],
            boxes: [facts(["sorted: yes"])],
            out: "Use binary search: O(log n)",
            say: "It is sorted, so **binary search** is the answer: O(log n) per search, no preparation needed.",
            result: "binary search"
          });
          return;
        }
        snap({ at: ["one"], boxes: [facts(["sorted: no"])], say: "Not sorted, so binary search is off the table. **Question 2:** how many searches? You said: **" + (many ? "many" : "just one") + "**." });
        if (!many) {
          snap({
            at: ["one"],
            boxes: [facts(["sorted: no", "searches: one"])],
            out: "Use linear search: O(n)",
            say: "A single search: just do a **linear scan** (O(n)). Sorting first would cost O(n log n), which is more than the scan itself.",
            result: "linear search"
          });
          return;
        }
        snap({
          at: ["many"],
          boxes: [facts(["sorted: no", "searches: many"])],
          out: "Build a Set (or sort once, then binary search)",
          say: "Many searches on unsorted data: pay a preparation cost once. **Build a Set / Map** (O(n) once, then O(1) per search), or **sort once** (O(n log n)) and then use binary search (O(log n) per search).",
          result: "build a Set, or sort once then binary search"
        });
      },
      code: {
        fn: "pickSearch",
        lines: [
          `function pickSearch(isSorted, manySearches) {`,
          [`  if (isSorted) return "binary search";`, "Sorted data: halve the range, O(log n).", "sorted"],
          [`  if (!manySearches) return "linear search";`, "Unsorted but only one search: one scan is cheaper than preparing.", "one"],
          [`  return "build a Set, or sort once then binary search";`, "Many searches: invest in preparation once so each search is cheap.", "many"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.sorted === "yes", inp.searches === "many")
    }
  ],

  mistakes: [
    {
      oops: "Running binary search on data that is not sorted",
      why: "Halving relies on order. On unsorted data the target may sit in the half you threw away, so the search wrongly reports “not found”.",
      fix: "Check the data is sorted (or sort it) before using binary search."
    },
    {
      oops: "Sorting an array just to search it once",
      why: "Sorting costs O(n log n), more than a single O(n) scan.",
      fix: "Sort only when you will search many times, or the data is needed sorted anyway."
    },
    {
      oops: "Using linear search inside a loop over another large array",
      why: "A linear search (O(n)) inside a loop of n steps is O(n²).",
      fix: "Put the data in a Set / Map first, or sort it once and use binary search."
    },
    {
      oops: "Forgetting the “not found” result",
      why: "Without a clear sentinel (like `-1`) callers cannot tell “found at index 0” from “not found”.",
      fix: "Return `-1` (or `null`) for not found and check for it."
    },
    {
      oops: "Confusing the **index** with the **value**",
      why: "Searching usually returns where the item is, not the item itself. Mixing them up gives off-by-one style bugs.",
      fix: "Name variables clearly: `index`, `target`, `value`."
    }
  ],

  remember: {
    mnemonic: "Sorted? Halve it. Unsorted and once? Scan it. Unsorted and often? Index it.",
    rules: [
      "Binary search needs **sorted** data; linear search needs nothing.",
      "Linear worst case O(n). Binary worst case O(log n).",
      "Many searches on unsorted data → Set / Map (O(1) each).",
      "The preparation cost (sorting, building a map) must be paid back by enough searches."
    ],
    template: {
      lines: [
        [`// sorted?            → binary search`, "Halve the range, O(log n)."],
        [`// unsorted, once?    → linear search`, "One scan, O(n)."],
        [`// unsorted, often?   → Set / Map  (or sort once + binary search)`, "Pay once, then fast lookups."]
      ]
    }
  },

  practice: {
    title: "Search Insert Position",
    level: "Easy",
    problem: "Given a **sorted** array of distinct numbers and a `target`, return the index where the target is found. If it is not found, return the index where it **would be inserted** to keep the array sorted.",
    examples: [
      { input: "[1, 3, 5, 6], target = 5", output: "2" },
      { input: "[1, 3, 5, 6], target = 2", output: "1", why: "2 would go between 1 and 3." },
      { input: "[1, 3, 5, 6], target = 7", output: "4", why: "Past the end." }
    ],
    hints: [
      "The array is sorted, so use binary search. Which template finds the **first position where `nums[i] >= target`**?",
      "Use a half-open range: `left = 0`, `right = nums.length` (the answer could be one past the end).",
      "Loop `while (left < right)`: if `nums[mid] < target` move `left = mid + 1`, otherwise `right = mid`. Return `left`."
    ],
    solution: {
      explain: [
        "That position is exactly the lower bound from the Binary Search topic. If the target exists it is the first index holding it; otherwise it is the spot where it would be inserted, which is also the number of items smaller than the target.",
        "Time O(log n), space O(1). (A linear scan for the first item ≥ target also works, in O(n).)"
      ],
      code: {
        fn: "searchInsert",
        lines: [
          `function searchInsert(nums, target) {`,
          [`  let left = 0, right = nums.length;`, "right is one past the end: inserting after everything is a valid answer."],
          [`  while (left < right) {`, "One candidate remains when left meets right."],
          [`    const mid = left + Math.floor((right - left) / 2);`, ""],
          [`    if (nums[mid] < target) left = mid + 1;`, "Too small: the answer is to the right."],
          [`    else right = mid;`, "Big enough: mid might be the answer, keep it."],
          `  }`,
          [`  return left;`, "First index with nums[i] >= target."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[1, 3, 5, 6], 5], expect: 2 },
      { args: [[1, 3, 5, 6], 2], expect: 1 },
      { args: [[1, 3, 5, 6], 7], expect: 4 },
      { args: [[1, 3, 5, 6], 0], expect: 0 },
      { args: [[], 3], expect: 0 },
      { args: [[2], 2], expect: 0 },
      { args: [[2, 4], 3], expect: 1 }
    ]
  },

  recall: [
    { q: "What is the one thing binary search requires that linear search does not?", a: "Sorted data (a range where one comparison tells you which half can be discarded)." },
    { q: "Roughly how many looks for 1,000,000 sorted items: linear vs binary?", a: "Linear up to 1,000,000; binary about 20." },
    { q: "You have unsorted data and one question. Sort and binary search, or just scan?", a: "Just scan. Sorting costs O(n log n), more than the O(n) scan." },
    { q: "You have unsorted data and 10,000 questions. What now?", a: "Prepare once: build a Set / Map (O(1) per question) or sort once and use binary search (O(log n) each)." },
    { q: "What should a search return when the target is missing?", a: "A clear sentinel such as `-1` (or `null`)." }
  ],

  related: {
    topics: ["linear-search", "binary-search", "hashset", "hashmap"],
    files: ["Problems/Techniques/DivideAndConquer/binarySearch.js", "Problems/Array/searchRange.js"]
  }
});
