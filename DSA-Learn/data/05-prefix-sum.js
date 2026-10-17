// Prefix Sum — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "prefix-sum",
  group: "hashing",
  emoji: "➕",
  title: "Prefix Sum",
  tagline: "Store the running total as you go, so the sum of any range becomes a single subtraction.",
  level: "Core",

  gist: [
    "`prefix[i]` is the sum of the first i + 1 numbers. Build it **once** in O(n).",
    "The sum of any range L..R is `prefix[R] - prefix[L - 1]` (just `prefix[R]` when L is 0), in **O(1)**.",
    "It pays off when you answer **many** range-sum questions about the same array.",
    "Combined with a hash map it counts the subarrays that add up to K in O(n)."
  ],

  complexity: {
    time: "O(n) build, O(1) per query",
    space: "O(n)",
    why: [
      "Building the prefix array is one pass over the data: O(n). After that, **every** range-sum question is one subtraction: O(1), no matter how long the range is.",
      "Without it, each question re-adds the range, up to O(n) per question. With q questions that is O(n · q) instead of O(n + q).",
      "The prefix array has as many slots as the input, so extra memory is O(n)."
    ]
  },

  idea: {
    plain: [
      "Suppose someone keeps asking “what is the sum from index 3 to index 7?”. Adding those numbers each time costs up to n steps per question.",
      "A **prefix sum array** pre-computes the running totals once: `prefix[i] = nums[0] + nums[1] + … + nums[i]`. Now the sum of any range is the total *up to R* minus the total *before L*.",
      "Why the subtraction works: `prefix[R]` holds everything from 0 to R. `prefix[L-1]` holds everything from 0 to L-1. Take the second away from the first and exactly L..R is left."
    ],
    signals: [
      "**Range sum queries**: “sum between index L and R”, asked many times on a fixed array.",
      "**Subarray** problems: “how many subarrays add up to K?”, “longest subarray with sum K”.",
      "“Does some index split the array into **equal sums**?” (pivot index).",
      "A 2D grid where you need the sum of a **rectangle**: 2D prefix sums."
    ],
    notFor: [
      "The array **changes** between queries. Then use a Fenwick tree or segment tree, because every update would break the stored totals.",
      "You only need **one** range. A simple loop is just as good and needs no extra memory."
    ],
    more: [
      {
        type: "text",
        text: "**2D version:** `P[r][c]` = sum of the rectangle from the top-left corner to (r, c). The sum of any rectangle needs four lookups: `P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]` (add back the corner that was subtracted twice)."
      }
    ]
  },

  analogy: {
    title: "A car's odometer",
    story: [
      "A car's odometer shows the total distance driven since the car was built. You record the reading at the end of every stop on a long journey. How far did you drive between stop 3 and stop 7? You do not add up five separate legs. You take the reading at the **end of stop 7** and subtract the reading at the **end of stop 2** (just before stop 3 began).",
      "That is exactly a prefix sum: the odometer reading is the running total, and any trip's length is one subtraction of two readings."
    ],
    map: [
      ["Odometer reading after each stop", "`prefix[i]`"],
      ["Distance of one leg", "`nums[i]`"],
      ["Writing down readings once during the journey", "Building the prefix array: O(n)"],
      ["Distance from stop L to stop R", "`prefix[R] - prefix[L - 1]`"],
      ["Trip that starts at the very beginning", "L = 0, answer is just `prefix[R]`"]
    ],
    breaks: "An odometer only goes up, but prefix sums can go down when the numbers are negative. The subtraction trick works either way."
  },

  demos: [
    {
      id: "build",
      title: "Build the prefix array",
      intro: "Each prefix cell is the previous prefix plus the current number. One pass, O(n).",
      codeIntro: "Builds the running totals. We will use this array to answer queries in the next demo.",
      viz: "array",
      legend: [["cur", "number being added"], ["good", "prefix value just written"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [2, 4, 6, 8, 5], len: [3, 9], min: -9, max: 15 }],
      frames(inp, snap) {
        const a = inp.nums;
        const prefix = new Array(a.length).fill("?");
        let running = 0;
        const view = (extra) => Object.assign({ label: "nums", cells: a, rows: [{ label: "prefix (running total)", cells: prefix.slice() }], vars: { running } }, extra);

        snap(view({ at: ["init"], say: "`prefix` will hold the running total after each number. We start with `running = 0` (nothing added yet)." }));
        for (let i = 0; i < a.length; i++) {
          running += a[i];
          prefix[i] = running;
          snap(view({
            at: ["loop", "add", "store"],
            ptr: { i },
            tone: { [i]: "cur" },
            rows: [{ label: "prefix (running total)", cells: prefix.slice(), tone: { [i]: "good" } }],
            say: "Add nums[" + i + "] = " + a[i] + " to the running total: **" + running + "**. Store it as prefix[" + i + "]. It equals the sum of nums[0.." + i + "]."
          }));
        }
        snap(view({
          at: ["done"],
          out: "prefix = [" + prefix.join(", ") + "]",
          say: "The prefix array is ready: **[" + prefix.join(", ") + "]**. It took one pass. Now any range sum is one subtraction.",
          result: prefix.slice()
        }));
      },
      code: {
        fn: "buildPrefix",
        lines: [
          `function buildPrefix(nums) {`,
          [`  const prefix = [];`, "Will hold the running totals.", "init"],
          [`  let running = 0;`, "The total of everything added so far.", "init"],
          [`  for (let i = 0; i < nums.length; i++) {`, "One pass over the numbers.", "loop"],
          [`    running += nums[i];`, "Add the next number to the running total.", "add"],
          [`    prefix.push(running);`, "Store it: prefix[i] is the sum of nums[0..i].", "store"],
          `  }`,
          [`  return prefix;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "query",
      title: "Answer a range sum with one subtraction",
      intro: "Pick a range **L..R**. The faded cells are not part of it. Watch the answer appear without adding the range up.",
      codeIntro: "Builds the prefix array once, then returns a function that answers any `(L, R)` question in O(1).",
      viz: "array",
      legend: [["good", "prefix[R]: everything up to R"], ["bad", "prefix[L-1]: the part we subtract"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers", value: [2, 4, 6, 8, 5, 3], len: [4, 9], min: -5, max: 12 },
        { type: "number", name: "L", label: "L", value: 2, min: 0, max: 8 },
        { type: "number", name: "R", label: "R", value: 4, min: 0, max: 8 }
      ],
      validate(inp) {
        if (inp.R >= inp.nums.length) return "R must be an index inside the array (0 to " + (inp.nums.length - 1) + ").";
        if (inp.L > inp.R) return "L must not be bigger than R.";
        return null;
      },
      random(rnd) {
        const n = rnd.int(5, 8);
        const L = rnd.int(0, n - 2);
        return { nums: Array.from({ length: n }, () => rnd.int(-3, 10)).join(", "), L: String(L), R: String(rnd.int(L, n - 1)) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const { L, R } = inp;
        const prefix = [];
        let run = 0;
        a.forEach((x) => prefix.push((run += x)));
        const base = { label: "nums", cells: a, rows: [{ label: "prefix (built once)", cells: prefix }] };
        const rowTone = (tone) => [{ label: "prefix (built once)", cells: prefix, tone }];
        const answer = L === 0 ? prefix[R] : prefix[R] - prefix[L - 1];

        snap({ ...base, at: ["build"], say: "The prefix array was built once (O(n)). From now on each question is answered with prefix values only." });
        snap({ ...base, at: ["query"], range: [L, R], vars: { L, R }, say: "Question: what is the sum of nums[" + L + ".." + R + "]? The faded cells are outside the range." });
        snap({
          ...base,
          at: ["query"],
          range: [L, R],
          rows: rowTone({ [R]: "good" }),
          vars: { L, R, "prefix[R]": prefix[R] },
          say: "prefix[" + R + "] = **" + prefix[R] + "** is the sum of everything from index 0 to " + R + (L === 0 ? ". That is exactly what we want, because the range starts at 0." : ". That is too much: it also contains the part *before* L.")
        });
        if (L > 0) {
          snap({
            ...base,
            at: ["query"],
            range: [L, R],
            rows: rowTone({ [R]: "good", [L - 1]: "bad" }),
            vars: { L, R, "prefix[R]": prefix[R], "prefix[L-1]": prefix[L - 1] },
            say: "prefix[" + (L - 1) + "] = **" + prefix[L - 1] + "** is the sum of everything before L. That is the unwanted part, so we subtract it."
          });
        }
        snap({
          ...base,
          at: ["query"],
          range: [L, R],
          rows: rowTone(L > 0 ? { [R]: "good", [L - 1]: "bad" } : { [R]: "good" }),
          vars: { answer },
          out: "Sum of nums[" + L + ".." + R + "] = " + answer,
          say: L > 0 ? prefix[R] + " - " + prefix[L - 1] + " = **" + answer + "**. One subtraction, however long the range." : "Answer: **" + answer + "**. One lookup, however long the range.",
          result: answer
        });
      },
      code: {
        fn: "makeRangeSum",
        lines: [
          `function makeRangeSum(nums) {`,
          [`  const prefix = [];`, "Build the running totals once...", "build"],
          [`  let running = 0;`, "", "build"],
          [`  for (const x of nums) {`, "", "build"],
          [`    running += x;`, "Add the next number to the running total.", "build"],
          [`    prefix.push(running);`, "Store it: prefix[i] is the sum of nums[0..i].", "build"],
          `  }`,
          [`  return (L, R) => (L === 0 ? prefix[R] : prefix[R] - prefix[L - 1]);`, "...then every question is one subtraction. When L is 0 there is nothing before it to remove, so `prefix[L - 1]` would be out of range.", "query"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)(inp.L, inp.R)
    },

    {
      id: "subarrayk",
      title: "Prefix sums + a map: count subarrays that add up to K",
      intro: "A subarray sums to K exactly when **an earlier prefix equals (current prefix − K)**. The map remembers how many times each prefix has appeared.",
      codeIntro: "Counts the subarrays whose sum is exactly `k`. The map starts with `{0: 1}` for the empty prefix.",
      viz: "array",
      legend: [["cur", "current number"], ["good", "a subarray ending here sums to K"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers", value: [1, 2, 1, 2, 1], len: [3, 8], min: -3, max: 6 },
        { type: "number", name: "k", label: "K", value: 3, min: -6, max: 12 }
      ],
      frames(inp, snap) {
        const a = inp.nums;
        const k = inp.k;
        const seen = new Map([[0, 1]]);
        const pre = new Array(a.length).fill("?");
        let running = 0;
        let count = 0;
        const mapBox = (hot) => ({ label: "seen prefixes", hint: "prefix value → times seen", kind: "map", items: [...seen].map(([key, v]) => ({ k: key, v, new: key === hot })) });
        const view = (extra) => Object.assign({ label: "nums", cells: a, rows: [{ label: "prefix", cells: pre.slice() }], boxes: [mapBox()], vars: { running, count, K: k } }, extra);

        snap(view({ at: ["init"], say: "Before any number the prefix is 0, and it has been seen once: `{0: 1}`. That represents the empty prefix, so subarrays that start at index 0 are counted too." }));
        for (let i = 0; i < a.length; i++) {
          running += a[i];
          pre[i] = running;
          const need = running - k;
          const hit = seen.get(need) || 0;
          count += hit;
          snap(view({
            at: ["loop", "run", "count"],
            ptr: { i },
            tone: { [i]: hit ? "good" : "cur" },
            rows: [{ label: "prefix", cells: pre.slice(), tone: { [i]: "cur" } }],
            vars: { running, need, "found before": hit, count, K: k },
            say: "Running total is **" + running + "**. A subarray ending here sums to " + k + " if an earlier prefix equals " + running + " - " + k + " = **" + need + "**. That prefix was seen **" + hit + "** time" + (hit === 1 ? "" : "s") + ", so " + (hit ? "**+" + hit + "** subarray" + (hit === 1 ? "" : "s") + " (count = " + count + ")." : "no new subarray ends here.")
          }));
          seen.set(running, (seen.get(running) || 0) + 1);
          snap(view({
            at: ["record"],
            ptr: { i },
            tone: { [i]: "cur" },
            rows: [{ label: "prefix", cells: pre.slice(), tone: { [i]: "cur" } }],
            boxes: [mapBox(running)],
            say: "Now record this prefix (" + running + ") in the map for later positions to find."
          }));
        }
        snap(view({
          at: ["done"],
          out: count + " subarray" + (count === 1 ? "" : "s") + " add up to " + k,
          say: "Every number is processed. **" + count + "** subarray" + (count === 1 ? "" : "s") + " sum" + (count === 1 ? "s" : "") + " to " + k + ", found in one pass.",
          result: count
        }));
      },
      code: {
        fn: "subarraySum",
        lines: [
          `function subarraySum(nums, k) {`,
          [`  const seen = new Map([[0, 1]]);`, "prefix value → how many times it has appeared. The empty prefix (0) has appeared once.", "init"],
          [`  let running = 0, count = 0;`, "", "init"],
          [`  for (const x of nums) {`, "", "loop"],
          [`    running += x;`, "The prefix sum up to the current number.", "run"],
          [`    count += seen.get(running - k) || 0;`, "Each earlier prefix equal to `running - k` marks a start for a subarray that sums to K.", "count"],
          [`    seen.set(running, (seen.get(running) || 0) + 1);`, "Remember this prefix for later numbers. Done **after** the lookup so a subarray is never empty.", "record"],
          `  }`,
          [`  return count;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.k)
    }
  ],

  mistakes: [
    {
      oops: "Computing `prefix[R] - prefix[L]` instead of `prefix[R] - prefix[L - 1]`",
      why: "`prefix[L]` already includes `nums[L]`, so subtracting it throws that number away and the answer is short by `nums[L]`.",
      fix: "Subtract the prefix **before** L: `prefix[L - 1]`."
    },
    {
      oops: "Forgetting the L = 0 case",
      why: "`prefix[-1]` is `undefined` in JavaScript, so the result becomes `NaN`.",
      fix: "Special-case L = 0, or store an extra leading `0` so that the sum is `prefix[R + 1] - prefix[L]` for every L."
    },
    {
      oops: "Using prefix sums when the array keeps changing",
      why: "Changing one number changes every prefix after it, so the stored totals go stale.",
      fix: "For arrays with updates use a Fenwick tree or a segment tree."
    },
    {
      oops: "Forgetting to seed the map with `{0: 1}` in “subarray sum equals K”",
      why: "Subarrays that start at index 0 have an empty prefix before them. Without that entry they are never counted.",
      fix: "Start with `new Map([[0, 1]])`."
    },
    {
      oops: "Updating the map before the lookup",
      why: "If K is 0, the current prefix would match itself and count an empty subarray.",
      fix: "Look up first, then record the prefix."
    }
  ],

  remember: {
    mnemonic: "Running total in, subtraction out: sum(L..R) = prefix[R] − prefix[L−1].",
    rules: [
      "`prefix[i]` includes `nums[i]` (sum of 0..i). To drop the part before L, subtract `prefix[L - 1]`.",
      "A leading **0 sentinel** (`prefix[0] = 0`) removes the L = 0 special case.",
      "“Subarray with sum K” → look for **two prefixes that differ by K**, and keep a map of the prefixes seen.",
      "Build once O(n), then each query O(1). Worth it only for many queries on unchanging data."
    ],
    template: {
      lines: [
        [`const prefix = [0];`, "The leading 0 means “nothing added yet”."],
        [`for (const x of nums) prefix.push(prefix[prefix.length - 1] + x);`, "prefix[i + 1] = sum of the first i + 1 numbers."],
        [`const rangeSum = (L, R) => prefix[R + 1] - prefix[L];`, "No special case for L = 0."]
      ]
    }
  },

  practice: {
    title: "Find Pivot Index",
    level: "Easy",
    problem: "Return the **leftmost index** where the sum of the numbers strictly to its left equals the sum of the numbers strictly to its right. If no such index exists return `-1`. (The sum of an empty side is 0.)",
    examples: [
      { input: "[1, 7, 3, 6, 5, 6]", output: "3", why: "Left of index 3: 1 + 7 + 3 = 11. Right of index 3: 5 + 6 = 11." },
      { input: "[1, 2, 3]", output: "-1" },
      { input: "[2, 1, -1]", output: "0", why: "Nothing on the left (0), and 1 + (-1) = 0 on the right." }
    ],
    hints: [
      "For index `i`, the left sum and the right sum together with `nums[i]` make the **total**. So `right = total - left - nums[i]`.",
      "Compute the total once. Then scan, keeping a running `left` sum.",
      "At each index check whether `left === total - left - nums[i]`, then add `nums[i]` to `left`."
    ],
    solution: {
      explain: [
        "A prefix sum in disguise: `left` is the prefix before `i`, and the right side is whatever is left of the total. One pass to find the total and one pass to test each index.",
        "Time O(n), space O(1)."
      ],
      code: {
        fn: "pivotIndex",
        lines: [
          `function pivotIndex(nums) {`,
          [`  const total = nums.reduce((a, b) => a + b, 0);`, "Sum of the whole array."],
          [`  let left = 0;`, "Sum of everything before index i."],
          [`  for (let i = 0; i < nums.length; i++) {`, ""],
          [`    const right = total - left - nums[i];`, "Right sum = total minus the left part minus the element itself."],
          [`    if (left === right) return i;`, "Balanced: this is the leftmost pivot."],
          [`    left += nums[i];`, "Move nums[i] into the left side for the next index."],
          `  }`,
          [`  return -1;`, "No index balanced the array."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[1, 7, 3, 6, 5, 6]], expect: 3 },
      { args: [[1, 2, 3]], expect: -1 },
      { args: [[2, 1, -1]], expect: 0 },
      { args: [[]], expect: -1 },
      { args: [[0]], expect: 0 },
      { args: [[-1, -1, 0, 1, 1, 0]], expect: 5 },
      { args: [[1, -1, 2]], expect: 2 }
    ]
  },

  recall: [
    { q: "How do you get the sum of nums[L..R] from a prefix array?", a: "`prefix[R] - prefix[L - 1]`, or just `prefix[R]` when L = 0." },
    { q: "What do building and querying cost?", a: "Build is O(n) once. Each query is O(1)." },
    { q: "Why does `prefix[R] - prefix[L - 1]` leave exactly L..R?", a: "`prefix[R]` covers 0..R and `prefix[L-1]` covers 0..L-1, so removing the second leaves L..R." },
    { q: "How do you count subarrays with sum K in O(n)?", a: "Keep a map of prefix sums seen (starting with {0: 1}). At each position add `map[running - K]` to the count, then record `running`." },
    { q: "When should you NOT use prefix sums?", a: "When the array is modified between queries (use a Fenwick or segment tree), or when you only ask one question." }
  ],

  related: {
    topics: ["prefix-product", "hashmap", "sliding-window", "frequency-map"],
    files: ["Problems/Array/pivotIndex.js", "Problems/Hash/subarraySum.js", "Problems/Techniques/PrefixSum/longestSubarrayWithSumK.js", "Problems/Techniques/PrefixSum/subArraySum2.js"]
  }
});
