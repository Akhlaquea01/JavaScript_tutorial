// HashSet — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "hashset",
  group: "hashing",
  emoji: "🧮",
  title: "HashSet",
  tagline: "A HashMap that keeps only keys: the fastest way to ask “have I seen this?” and to keep each value once.",
  level: "Starter",
  needs: ["hashmap"],

  gist: [
    "A Set stores **unique values** only: no repeats, no values attached.",
    "`add`, `has` and `delete` are all **O(1)** on average.",
    "Reach for it to detect duplicates, to remember what you have visited, and to look up neighbours in O(1).",
    "A Set has no index and no useful order. If you need counts or an attached value, use a Map."
  ],

  complexity: {
    time: "O(1) average per operation",
    space: "O(n)",
    why: [
      "Like a HashMap, a Set hashes each value to a bucket and jumps straight to it, so `add`, `has` and `delete` cost the same however many values are stored: O(1) on average (O(n) only in the rare worst case of many collisions).",
      "It stores each distinct value once, so memory is O(n) in the worst case."
    ],
    more: [
      {
        type: "table",
        heading: "Cost of each operation",
        columns: ["Operation", "Average", "Worst case"],
        rows: [
          ["`add(x)`", "O(1)", "O(n)"],
          ["`has(x)`", "O(1)", "O(n)"],
          ["`delete(x)`", "O(1)", "O(n)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A Set is a collection with one rule: **every value appears at most once**. Adding a value that is already there changes nothing.",
      "Under the hood it is a HashMap that stores only the keys. That is why “is this value in there?” is answered in O(1) instead of scanning a whole array.",
      "Use it when you only care about **presence**: have I seen this number? is this word allowed? is this cell already visited? When you also need a count or an attached value, upgrade to a Map."
    ],
    signals: [
      "**Duplicate** detection: “does any value appear twice?”.",
      "A fast **“seen before?”** check inside a loop (visited cells, visited nodes).",
      "You need the **unique** values of a list.",
      "You must check whether the **neighbours** of a number exist (`x - 1`, `x + 1`), as in Longest Consecutive Sequence."
    ],
    notFor: [
      "You need **counts** (use a frequency map) or an **attached value** (use a Map).",
      "You need values in **sorted order** or by **position**. A Set is not indexable and keeps insertion order only."
    ],
    more: [
      {
        type: "table",
        heading: "HashMap vs HashSet",
        columns: ["", "HashMap", "HashSet"],
        rows: [
          ["Stores", "key → value", "keys only"],
          ["Typical question", "“What goes with this key? How many?”", "“Is this value present?”"],
          ["JavaScript", "`new Map()`", "`new Set()`"]
        ]
      }
    ]
  },

  analogy: {
    title: "A guest list at the door",
    story: [
      "A bouncer holds a guest list. Their only job: when someone arrives, check whether the name is on the list. They never count visits, store phone numbers or sort anything. Writing a name twice makes no difference, because a name is either on the list or it is not. The list is organised so checking a name is instant.",
      "**Longest consecutive sequence version:** you have a pile of numbered tickets. You spread them all on a table. To find the longest run like 1-2-3-4, you only start counting from a ticket whose *predecessor is missing*, because a run can only begin there."
    ],
    map: [
      ["Guest list", "The Set"],
      ["Checking a name at the door", "`set.has(x)`"],
      ["Writing a name on the list", "`set.add(x)`"],
      ["The same name written twice", "A repeat add is ignored"],
      ["Starting a run only where the previous ticket is missing", "`!set.has(num - 1)`"]
    ],
    breaks: "A real guest list is usually alphabetical. A Set deliberately keeps no order you can rely on, which is exactly what makes lookups fast."
  },

  demos: [
    {
      id: "dup",
      title: "Contains duplicate: the Set remembers what we've seen",
      intro: "For each number, ask the Set “seen before?”. If yes, that is a duplicate. If not, add it.",
      codeIntro: "Returns `true` as soon as any value repeats.",
      viz: "array",
      legend: [["cur", "number being checked"], ["good", "the repeated number"], ["done", "already added"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [1, 5, 3, 8, 2, 5], len: [3, 10], min: 1, max: 9 }],
      frames(inp, snap) {
        const span = DSA.util.span;
        const a = inp.nums;
        const seen = new Set();
        const box = (hot) => ({ label: "seen (Set)", kind: "set", items: [...seen].map((v) => ({ v, new: v === hot })) });
        const view = (extra) => Object.assign({ label: "nums", cells: a, boxes: [box()] }, extra);

        snap(view({ at: ["init"], say: "The Set `seen` starts empty. We go through the numbers once, asking “have I seen this?”." }));
        for (let i = 0; i < a.length; i++) {
          if (seen.has(a[i])) {
            snap(view({
              at: ["loop", "check"],
              ptr: { i },
              tone: { ...span(0, i - 1, "done"), [i]: "good", [a.indexOf(a[i])]: "good" },
              out: "Duplicate found: " + a[i],
              say: "**" + a[i] + "** is already in the Set, so it appeared before (at index " + a.indexOf(a[i]) + "). **Duplicate found**, and we stop.",
              result: true
            }));
            return;
          }
          seen.add(a[i]);
          snap(view({
            at: ["loop", "check", "add"],
            ptr: { i },
            tone: { ...span(0, i - 1, "done"), [i]: "cur" },
            boxes: [box(a[i])],
            say: a[i] + " is not in the Set, so it is new. Add it and move on."
          }));
        }
        snap(view({
          at: ["done"],
          tone: span(0, a.length - 1, "done"),
          out: "No duplicates",
          say: "We reached the end without any number being in the Set already: **no duplicates**.",
          result: false
        }));
      },
      code: {
        fn: "containsDuplicate",
        lines: [
          `function containsDuplicate(nums) {`,
          [`  const seen = new Set();`, "Numbers we have already passed.", "init"],
          [`  for (const num of nums) {`, "One pass.", "loop"],
          [`    if (seen.has(num)) return true;`, "O(1) check: already seen means a repeat, so stop.", "check"],
          [`    seen.add(num);`, "Otherwise remember it. (Check **before** adding, or every number would look “seen”.)", "add"],
          `  }`,
          [`  return false;`, "No number repeated.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "consecutive",
      title: "Longest consecutive sequence: only start counting at the start of a run",
      intro: "Find the longest run of consecutive integers (like 1, 2, 3, 4) in an **unsorted** array, in O(n). A number only starts a run if `num - 1` is **not** in the Set.",
      codeIntro: "Returns the length of the longest run of consecutive numbers.",
      viz: "array",
      legend: [["cur", "number being checked"], ["good", "the run being counted"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [100, 4, 200, 1, 3, 2], len: [4, 9], min: 1, max: 200 }],
      random(rnd) {
        const base = rnd.int(1, 20);
        const nums = [];
        for (let k = 0, run = rnd.int(2, 4); k < run; k++) nums.push(base + k);
        while (nums.length < rnd.int(5, 8)) nums.push(rnd.int(1, 40));
        for (let i = nums.length - 1; i > 0; i--) {
          const j = rnd.int(0, i);
          [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        return { nums: nums.join(", ") };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const set = new Set(a);
        let best = 0;
        const idxOf = (v) => a.map((x, i) => (x === v ? i : -1)).filter((i) => i >= 0);
        const tone = (vals, t) => Object.fromEntries(vals.flatMap(idxOf).map((i) => [i, t]));
        const box = (hot) => ({ label: "numSet", hint: "the unique numbers", kind: "set", items: [...set].map((v) => ({ v, new: v === hot })) });
        const view = (extra) => Object.assign({ label: "nums", cells: a, boxes: [box()], vars: { best } }, extra);

        snap(view({ at: ["init"], say: "First put every number in a Set, so “is this number present?” is O(1). Then look at each number and decide whether it **starts** a run." }));
        for (const num of set) {
          if (set.has(num - 1)) {
            snap(view({
              at: ["loop", "start"],
              tone: tone([num], "cur"),
              say: "Check **" + num + "**: is " + (num - 1) + " in the Set? **Yes**, so " + num + " is in the middle of a run. Skip it: the run will be counted from its true start."
            }));
            continue;
          }
          snap(view({
            at: ["loop", "start"],
            tone: tone([num], "cur"),
            say: "Check **" + num + "**: is " + (num - 1) + " in the Set? **No**, so " + num + " is the **start of a run**. Count how far it goes."
          }));
          let length = 1;
          const run = [num];
          while (set.has(num + length)) {
            run.push(num + length);
            length++;
            snap(view({
              at: ["grow"],
              tone: tone(run, "good"),
              vars: { best, length },
              say: (num + length - 1) + " is in the Set too, so the run grows: **" + run.join(", ") + "** (length " + length + ")."
            }));
          }
          best = Math.max(best, length);
          snap(view({
            at: ["grow", "best"],
            tone: tone(run, "good"),
            vars: { best, length },
            say: (num + length) + " is not in the Set, so this run ends with length **" + length + "**. best = **" + best + "**."
          }));
        }
        snap(view({
          at: ["done"],
          out: "Longest run: " + best,
          say: "Every number was checked, and each run was walked only once (from its start). The longest run has length **" + best + "**.",
          result: best
        }));
      },
      code: {
        fn: "longestConsecutive",
        lines: [
          `function longestConsecutive(nums) {`,
          [`  const numSet = new Set(nums);`, "Put everything in a Set for O(1) “is it there?” checks.", "init"],
          [`  let best = 0;`, "", "init"],
          [`  for (const num of numSet) {`, "Look at each distinct number.", "loop"],
          [`    if (!numSet.has(num - 1)) {`, "If num - 1 exists, num is mid-run: skip. Otherwise num starts a run. This one check makes the whole thing O(n).", "start"],
          [`      let length = 1;`, "", "grow"],
          [`      while (numSet.has(num + length)) length++;`, "Walk forward as long as the next number exists.", "grow"],
          [`      best = Math.max(best, length);`, "Keep the longest run seen.", "best"],
          `    }`,
          `  }`,
          [`  return best;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    }
  ],

  mistakes: [
    {
      oops: "Using `array.includes(x)` where a Set would do",
      why: "`includes` scans the array (O(n)). Inside a loop over n items the whole thing becomes O(n²).",
      fix: "Build a Set once and use `set.has(x)`."
    },
    {
      oops: "Adding to the Set **before** checking it (in duplicate detection)",
      why: "Every number then finds itself already in the Set, so everything looks like a duplicate.",
      fix: "Order is **has → add**."
    },
    {
      oops: "Starting a run from every number in Longest Consecutive Sequence",
      why: "Then 1, 2, 3, 4 is walked four times, 3, 4 three times, and so on: O(n²) in the worst case.",
      fix: "Only start when `!set.has(num - 1)`."
    },
    {
      oops: "Expecting a Set to be indexable or sorted",
      why: "A Set has no `set[0]`. Iteration follows insertion order, which is not sorted order.",
      fix: "Convert with `[...set]` and sort when you need an order."
    },
    {
      oops: "Putting objects or arrays in a Set and expecting equal contents to match",
      why: "Objects are compared by reference, so `{a: 1}` and another `{a: 1}` are different entries.",
      fix: "Use primitive values or a string key like `JSON.stringify(obj)`."
    }
  ],

  remember: {
    mnemonic: "Set = guest list: only the question “is it on the list?” matters.",
    rules: [
      "Duplicate check pattern: `has` first, then `add`.",
      "Need counts? Map. Need only presence? Set.",
      "Turn a list into its unique values with `[...new Set(list)]`.",
      "Neighbour questions (`x - 1`, `x + 1`) become O(1) with a Set."
    ],
    template: {
      lines: [
        [`const seen = new Set();`, "What we have seen so far."],
        [`for (const x of items) {`, "One pass."],
        [`  if (seen.has(x)) { /* repeat found */ }`, "O(1) question."],
        [`  seen.add(x);`, "Remember it for later."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Hash/hasUniqueChars.js`, `findDuplicates.js`, `itemInCommon.js`, `longestConsecutiveSequence.js` and `Problems/Array/containsDuplicate.js`."
      }
    ]
  },

  practice: {
    title: "Intersection of Two Arrays",
    level: "Easy",
    problem: "Given two arrays, return the **unique** values that appear in both, sorted from smallest to largest.",
    examples: [
      { input: "[1, 2, 2, 1] and [2, 2]", output: "[2]", why: "2 is in both. Repeats count only once." },
      { input: "[4, 9, 5] and [9, 4, 9, 8, 4]", output: "[4, 9]" },
      { input: "[1] and [2]", output: "[]" }
    ],
    hints: [
      "Checking “is this value in the other array?” fast is exactly what a Set is for.",
      "Put the first array into a Set. Then walk through the second array and keep every value that the Set contains.",
      "Collect the matches in another Set so repeats count only once, then sort the result."
    ],
    solution: {
      explain: [
        "One Set makes membership checks O(1). A second Set collects the matches without duplicates. A final sort (numeric comparison!) gives a predictable order.",
        "Time O(n + m + k log k) where k is the number of common values, space O(n + k)."
      ],
      code: {
        fn: "intersection",
        lines: [
          `function intersection(a, b) {`,
          [`  const setA = new Set(a);`, "Fast membership test for the first array."],
          [`  const common = new Set();`, "Matches, each stored once."],
          [`  for (const x of b) {`, "Check every value of the second array."],
          [`    if (setA.has(x)) common.add(x);`, "In both arrays: keep it (a repeat is ignored by the Set)."],
          `  }`,
          [`  return [...common].sort((p, q) => p - q);`, "Turn the Set into an array and sort it numerically."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[1, 2, 2, 1], [2, 2]], expect: [2] },
      { args: [[4, 9, 5], [9, 4, 9, 8, 4]], expect: [4, 9] },
      { args: [[1], [2]], expect: [] },
      { args: [[], [1]], expect: [] },
      { args: [[1, 1, 1], [1]], expect: [1] },
      { args: [[3, 1, 2], [1, 3]], expect: [1, 3] },
      { args: [[5, 6, 7], [7, 6, 5]], expect: [5, 6, 7] }
    ]
  },

  recall: [
    { q: "What does a Set guarantee, and what does it cost to check membership?", a: "Each value appears at most once, and `has` / `add` / `delete` are O(1) on average." },
    { q: "In duplicate detection, what is the correct order: add then check, or check then add?", a: "Check (`has`) first, then `add`. Otherwise every value finds itself." },
    { q: "In Longest Consecutive Sequence, why only start counting when `num - 1` is missing?", a: "A run can only begin at a number with no predecessor. Starting elsewhere would re-walk the same run and make the algorithm O(n²)." },
    { q: "Set or Map: you need to know how many times each value appears.", a: "Map (a frequency map). A Set only knows presence." },
    { q: "How do you get the unique values of an array in one line?", a: "`[...new Set(array)]`." }
  ],

  related: {
    topics: ["hashmap", "frequency-map", "sliding-window", "graph-bfs"],
    files: ["Problems/Hash/hasUniqueChars.js", "Problems/Hash/findDuplicates.js", "Problems/Hash/itemInCommon.js", "Problems/Hash/longestConsecutiveSequence.js", "Problems/Array/containsDuplicate.js"]
  }
});
