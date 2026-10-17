// Binary Search — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "binary-search",
  group: "searching",
  emoji: "🎯",
  title: "Binary Search",
  tagline: "Find something in sorted data by checking the middle and throwing away the half that cannot contain it, again and again.",
  level: "Core",

  gist: [
    "Needs **sorted** data, or any yes/no question that flips only once (`no, no, no, YES, YES`).",
    "Check the middle: that one comparison tells you which **half** cannot hold the answer, so discard it. Repeat on what is left.",
    "Halving every step means at most about **log₂ n** steps: 1,000,000 items take ~20 steps.",
    "Three shapes to know: **exact search**, **first position where…** (lower bound), and **binary search on the answer**."
  ],

  complexity: {
    time: "O(log n)",
    space: "O(1)",
    why: [
      "Every step throws away half of what is left: n → n/2 → n/4 → … → 1. The number of times you can halve n until you reach 1 is log₂ n. That is a tiny number: about 10 for 1,000 items, 20 for a million, 30 for a billion.",
      "You only keep three variables (`left`, `right`, `mid`), so extra memory is O(1). A *recursive* version uses O(log n) stack space instead."
    ],
    more: [
      {
        type: "table",
        heading: "Why it is so much faster than scanning",
        columns: ["Items (n)", "Binary search steps", "Linear scan (worst case)"],
        rows: [
          ["8", "3", "8"],
          ["1,000", "10", "1,000"],
          ["1,000,000", "20", "1,000,000"],
          ["1,000,000,000", "30", "1,000,000,000"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Imagine a sorted list. Look at the **middle** item. If it is too small, then everything to its left is also too small (the list is sorted), so you can throw the whole left half away without looking at it. If it is too big, throw the right half away. Repeat on what remains.",
      "That is **binary search**: keep a range of positions (`left` to `right`) that could still hold the answer, check the middle, and cut the range in half each time until you find the target or the range is empty.",
      "It is not only for “find this number”. Whenever a yes/no question goes `no, no, no, YES, YES, YES` in order, binary search finds the flip point. That is how “first bad version”, “smallest speed that works” and “square root” are solved."
    ],
    signals: [
      "The data is **sorted** (or rotated-sorted, or ordered by some rule).",
      "You must find a value, a position, or the **first / last position** where something becomes true.",
      "Constraints say n is huge (10⁵ to 10⁹) and the target time is **O(log n)**.",
      "The question reads “what is the **minimum / maximum** value such that … still works?” and the condition flips only once (binary search *on the answer*)."
    ],
    notFor: [
      "The data is **unsorted** and sorting it first would cost more than one simple scan.",
      "The yes/no condition does not flip just once (it goes yes, no, yes…). Halving would throw away the wrong half."
    ],
    more: [
      {
        type: "table",
        heading: "The three templates",
        columns: ["Template", "Loop and moves", "Typical questions"],
        rows: [
          ["**Exact search**", "`left <= right`, `left = mid + 1`, `right = mid - 1`, return `-1` if missing", "Is `x` in the sorted array, and where?"],
          ["**First position where…** (lower bound)", "`left < right`, `left = mid + 1`, `right = mid`", "Insert position, first occurrence, first bad version"],
          ["**On the answer**", "Same as above, but over a *range of possible answers* with a test `isOk(mid)`", "Minimum speed / capacity / days, integer square root"]
        ]
      }
    ]
  },

  analogy: {
    title: "Looking up a word in a paper dictionary",
    story: [
      "You want the word **mango**. You do not start at page 1. You open the dictionary roughly in the middle and land on *jungle*. “Mango” comes after “jungle” alphabetically, so the whole front half is useless. You ignore it. Now open the middle of the remaining back half: *queen*. “Mango” comes before that, so the last quarter goes too. After about ten flips in a 1,000-page dictionary you are looking at a single page.",
      "**Higher / lower game:** a friend thinks of a number from 1 to 100 and only answers “higher” or “lower”. If you always guess the middle, you need at most 7 guesses, because each answer removes half of the remaining numbers."
    ],
    map: [
      ["Dictionary pages in alphabetical order", "A sorted array"],
      ["The pages you still consider", "The range `left` … `right`"],
      ["Opening the middle page", "`mid`"],
      ["“My word comes later” → drop the front half", "`nums[mid] < target` → `left = mid + 1`"],
      ["“My word comes earlier” → drop the back half", "`nums[mid] > target` → `right = mid - 1`"],
      ["Landed on the word / no pages left", "Found / `left > right`"]
    ],
    breaks: "A person flips to an *approximate* middle. The code uses exact index maths. And a dictionary arrives sorted; in code **you must make sure the data is sorted**, otherwise throwing away half is a guess."
  },

  demos: [
    {
      id: "classic",
      title: "Exact search: find a number in a sorted array",
      intro: "Red cells are the half that gets **thrown away** at each step. Faded cells are already ruled out. Change the numbers or the target and press **Run**.",
      codeIntro: "Returns the index of `target`, or `-1` if it is not there. The array must be sorted.",
      viz: "array",
      legend: [["cur", "the middle we check"], ["bad", "thrown away this step"], ["good", "found"], ["dim", "already ruled out (faded)"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Sorted array", value: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72], len: [3, 12], min: 1, max: 99, sorted: true },
        { type: "number", name: "target", label: "Target", value: 38, min: 1, max: 99 }
      ],
      random(rnd) {
        const n = rnd.int(6, 12);
        const set = new Set();
        while (set.size < n) set.add(rnd.int(1, 60));
        const nums = [...set].sort((a, b) => a - b);
        const target = rnd() < 0.7 ? nums[rnd.int(0, n - 1)] : rnd.int(1, 60);
        return { nums: nums.join(", "), target: String(target) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const T = inp.target;
        const n = a.length;
        let left = 0;
        let right = n - 1;
        let looks = 0;
        const span = (from, to, tone) => Object.fromEntries(Array.from({ length: Math.max(0, to - from + 1) }, (_, k) => [from + k, tone]));
        const view = (extra) => Object.assign({ label: "nums (sorted)", cells: a, ptr: { left, right }, range: [left, right], vars: { left, right, target: T } }, extra);

        snap(view({
          at: "init",
          say: "Every position is still possible: **left = 0**, **right = " + (n - 1) + "**. Because the array is sorted, one comparison at a time will let us cut the range in half while looking for **" + T + "**."
        }));
        while (left <= right) {
          const mid = left + Math.floor((right - left) / 2);
          looks++;
          snap(view({
            at: ["loop", "mid"],
            ptr: { left, right, mid },
            tone: { [mid]: "cur" },
            vars: { left, right, mid, target: T },
            say: "Look at the **middle** of the range: index **" + mid + "** holds **" + a[mid] + "**. Compare it with the target **" + T + "**."
          }));
          if (a[mid] === T) {
            snap(view({
              at: ["hit", "found"],
              ptr: { left, right, mid },
              tone: { [mid]: "good" },
              vars: { left, right, mid, target: T },
              out: T + " found at index " + mid + ", after looking at only " + looks + " of " + n + " numbers",
              say: a[mid] + " equals the target. **Found at index " + mid + "**, after checking only " + looks + " of the " + n + " numbers.",
              result: mid
            }));
            return;
          }
          if (a[mid] < T) {
            snap(view({
              at: ["less", "moveL"],
              ptr: { left, right, mid },
              tone: span(left, mid, "bad"),
              vars: { left, right, mid, target: T },
              say: a[mid] + " is **less** than " + T + ". The middle is too small, and since the array is sorted, **everything at or left of it is too small too**. Throw that whole part away: left = mid + 1 = " + (mid + 1) + "."
            }));
            left = mid + 1;
          } else {
            snap(view({
              at: ["more", "moveR"],
              ptr: { left, right, mid },
              tone: span(mid, right, "bad"),
              vars: { left, right, mid, target: T },
              say: a[mid] + " is **greater** than " + T + ". The middle is too big, so **everything at or right of it is too big too**. Throw that part away: right = mid - 1 = " + (mid - 1) + "."
            }));
            right = mid - 1;
          }
        }
        snap(view({
          at: ["loop", "none"],
          out: T + " is not in the array",
          outTone: "bad",
          say: "left (" + left + ") has moved past right (" + right + "), so **no positions are left** to check. " + T + " is **not in the array**.",
          result: -1
        }));
      },
      code: {
        fn: "binarySearch",
        lines: [
          `function binarySearch(nums, target) {`,
          [`  let left = 0;`, "The range starts as the whole array: left end…", "init"],
          [`  let right = nums.length - 1;`, "…and right end.", "init"],
          [`  while (left <= right) {`, "Keep going while at least one position is still possible. `<=` because when left equals right there is still one position to check.", "loop"],
          [`    const mid = left + Math.floor((right - left) / 2);`, "The middle position. (`Math.floor` keeps it a whole number; writing it as `left + (right - left) / 2` also avoids overflow in languages with fixed-size ints.)", "mid"],
          [`    if (nums[mid] === target) {`, "Lucky: the middle is the target.", "hit"],
          [`      return mid;`, "Return its index.", "found"],
          [`    } else if (nums[mid] < target) {`, "Middle is too small.", "less"],
          [`      left = mid + 1;`, "Discard mid and everything left of it. `+ 1` because mid was just checked.", "moveL"],
          [`    } else {`, "Middle is too big.", "more"],
          [`      right = mid - 1;`, "Discard mid and everything right of it.", "moveR"],
          `    }`,
          `  }`,
          [`  return -1;`, "The range became empty: the target is not there.", "none"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.target)
    },

    {
      id: "lowerbound",
      title: "First position where nums[i] ≥ x (lower bound)",
      intro: "The most reusable template. It finds the **first** spot where a condition becomes true. The dashed **end** slot means “past the last number”, a valid answer when every number is smaller than x.",
      codeIntro: "Returns the first index whose value is **at least** `x` (or `nums.length` if there is none). Works with repeated values.",
      viz: "array",
      legend: [["cur", "the middle we check"], ["good", "could be the answer"], ["bad", "thrown away this step"], ["dim", "already ruled out (faded)"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Sorted array (repeats allowed)", value: [1, 3, 3, 5, 5, 5, 8, 9], len: [3, 12], min: 1, max: 20, sorted: true },
        { type: "number", name: "x", label: "x", value: 5, min: 0, max: 22 }
      ],
      random(rnd) {
        const n = rnd.int(5, 11);
        const nums = Array.from({ length: n }, () => rnd.int(1, 14)).sort((a, b) => a - b);
        return { nums: nums.join(", "), x: String(rnd.int(0, 16)) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const x = inp.x;
        const n = a.length;
        let left = 0;
        let right = n;
        const span = (from, to, tone) => Object.fromEntries(Array.from({ length: Math.max(0, to - from + 1) }, (_, k) => [from + k, tone]));
        const view = (extra) => Object.assign({ label: "nums (sorted)", cells: a, endSlot: true, ptr: { left, right }, range: [left, right], vars: { left, right, x } }, extra);

        snap(view({
          at: "init",
          say: "We want the **first** index whose value is at least **" + x + "**. It might even be **" + n + "** (past the end) if every number is smaller. So **right starts at " + n + "**, on the dashed end slot, and the answer is always somewhere in [left, right]."
        }));
        while (left < right) {
          const mid = left + Math.floor((right - left) / 2);
          snap(view({
            at: ["loop", "mid"],
            ptr: { left, right, mid },
            tone: { [mid]: "cur" },
            vars: { left, right, mid, x },
            say: "Middle of the range: index **" + mid + "** holds **" + a[mid] + "**. Is it smaller than " + x + "?"
          }));
          if (a[mid] < x) {
            snap(view({
              at: ["small", "moveL"],
              ptr: { left, right, mid },
              tone: span(left, mid, "bad"),
              vars: { left, right, mid, x },
              say: a[mid] + " is **smaller** than " + x + ", so it and everything left of it are too small. The first number that is ≥ " + x + " must be to the **right** of mid: left = mid + 1 = " + (mid + 1) + "."
            }));
            left = mid + 1;
          } else {
            snap(view({
              at: ["big", "moveR"],
              ptr: { left, right, mid },
              tone: { ...span(mid + 1, right - 1, "bad"), [mid]: "good" },
              vars: { left, right, mid, x },
              say: a[mid] + " is **at least** " + x + ", so mid **might be** the first such number. Keep it: right = mid = " + mid + ". Everything after mid can't be earlier, so it is dropped."
            }));
            right = mid;
          }
        }
        snap(view({
          at: ["loop", "done"],
          ptr: { left, right },
          tone: left < n ? { [left]: "good" } : {},
          out: left < n ? "First index with value ≥ " + x + " is " + left + " (value " + a[left] + ")" : "Every number is smaller than " + x + ", so the answer is " + n + " (the end)",
          say: "left and right have met at **" + left + "**. That is the first index whose value is ≥ " + x + (left < n ? " (value " + a[left] + ")." : " (past the end, because every number is smaller).") ,
          result: left
        }));
      },
      code: {
        fn: "lowerBound",
        lines: [
          `function lowerBound(nums, x) {`,
          [`  let left = 0;`, "Smallest possible answer.", "init"],
          [`  let right = nums.length;`, "One past the end: “every number is smaller than x” is a valid answer.", "init"],
          [`  while (left < right) {`, "Stop when left meets right: exactly one candidate is left, and it is the answer.", "loop"],
          [`    const mid = left + Math.floor((right - left) / 2);`, "Middle. It is always a real index because left < right.", "mid"],
          [`    if (nums[mid] < x) {`, "Too small to be the answer.", "small"],
          [`      left = mid + 1;`, "The answer is to the right of mid.", "moveL"],
          [`    } else {`, "Big enough: nums[mid] >= x.", "big"],
          [`      right = mid;`, "mid might be the *first* big-enough one, so keep it. Do not write `mid - 1` here.", "moveR"],
          `    }`,
          `  }`,
          [`  return left;`, "left === right: the first index where nums[i] >= x.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.x)
    }
  ],

  mistakes: [
    {
      oops: "Writing `mid = (left + right) / 2` in JavaScript",
      why: "JavaScript division gives a fraction (`7 / 2` is `3.5`), so `nums[mid]` becomes `undefined` and the search goes wrong.",
      fix: "Always floor it: `left + Math.floor((right - left) / 2)`."
    },
    {
      oops: "Forgetting the `+ 1` / `- 1` in exact search (`left = mid`, `right = mid`)",
      why: "When the range is two cells wide, `mid` equals `left`. Setting `left = mid` changes nothing, so the loop never ends.",
      fix: "In exact search always exclude `mid`: it was just checked. Use `left = mid + 1` and `right = mid - 1`."
    },
    {
      oops: "Mixing the two templates",
      why: "`while (left <= right)` together with `right = mid` loops forever. `while (left < right)` together with `right = mid - 1` can skip the real answer.",
      fix: "Treat each template as a set: exact = `<=` with `mid ± 1`; first-true = `<` with `right = mid`."
    },
    {
      oops: "Running it on data that is not sorted",
      why: "Throwing away a half is only valid when order guarantees the answer is not in it. On shuffled data you can discard the very number you want.",
      fix: "Sort first (if allowed) or use a hash map / linear scan."
    }
  ],

  remember: {
    mnemonic: "Look at the middle, throw away the half that cannot win, repeat.",
    rules: [
      "Two templates are enough: **exact** (`left <= right`, `mid ± 1`) and **first true** (`left < right`, `right = mid`).",
      "After every step, state what is true: “the answer is always inside [left, right]”. If you can't, the template is wrong.",
      "Exact search that fails ends with `left > right`. `left` is then the position where the value *would* be inserted.",
      "**Search on the answer:** write `isOk(x)` that flips from false to true once, then find the first true.",
      "If n is huge and the time limit is O(log n), think binary search."
    ],
    template: {
      lines: [
        [`let left = 0, right = n;`, "The answer is somewhere in [left, right]."],
        [`while (left < right) {`, "More than one candidate left."],
        [`  const mid = left + Math.floor((right - left) / 2);`, "Safe middle."],
        [`  if (isOk(mid)) right = mid;`, "mid works. It might be the first one that does, so keep it."],
        [`  else left = mid + 1;`, "mid fails, so the answer is to its right."],
        `}`,
        [`return left;`, "The first position where isOk is true."]
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Lower bound gives you more for free: **first occurrence** of `x` = `lowerBound(nums, x)`; **last occurrence** = `lowerBound(nums, x + 1) - 1`; **how many copies** = the difference of the two. Your own files: `Problems/Array/searchRange.js`, `findMinRotatedSortedArray.js` and `mySqrt.js`."
      },
      {
        type: "text",
        text: "**Search on the answer, quick example:** “What is the smallest eating speed that finishes all piles in H hours?” Possible speeds go from 1 to the biggest pile. `isOk(speed)` = “can I finish in time at this speed?”. It is false for slow speeds and true for fast ones, so binary search the speed range for the first true."
      }
    ]
  },

  practice: {
    title: "Integer Square Root",
    level: "Easy",
    problem: "Given a non-negative integer `x`, return the **floor of its square root**: the largest integer `r` such that `r * r <= x`. Do not use `Math.sqrt`.",
    examples: [
      { input: "8", output: "2", why: "2 × 2 = 4 fits in 8, but 3 × 3 = 9 does not." },
      { input: "16", output: "4", why: "4 × 4 = 16 exactly." },
      { input: "0", output: "0" }
    ],
    hints: [
      "The answer is somewhere between 0 and x. Is “`r * r <= x`” true for small r and false for big r, flipping only once? That is a binary-search-on-the-answer clue.",
      "Binary search over `r` from `0` to `x`. If `mid * mid <= x`, then `mid` works but a bigger r might also work, so move `left` up. Otherwise `mid` is too big, so move `right` down.",
      "Keep a variable `ans` that remembers the last `mid` that satisfied `mid * mid <= x`."
    ],
    solution: {
      explain: [
        "The candidates 0 … x are in order, and the test `mid * mid <= x` goes true, true, true, false, false. So binary search finds the **last** true. Every time the test passes we record `mid` as the best answer so far and look for something bigger.",
        "Time O(log x), space O(1)."
      ],
      code: {
        fn: "mySqrt",
        lines: [
          `function mySqrt(x) {`,
          [`  let left = 0, right = x;`, "The answer lies between 0 and x."],
          [`  let ans = 0;`, "Best valid answer found so far."],
          [`  while (left <= right) {`, "Exact-search style loop over the candidates."],
          [`    const mid = left + Math.floor((right - left) / 2);`, "Candidate square root."],
          [`    if (mid * mid <= x) {`, "mid is small enough to be an answer."],
          [`      ans = mid;`, "Remember it..."],
          [`      left = mid + 1;`, "...and try for a bigger one."],
          [`    } else {`, "mid * mid is too big."],
          [`      right = mid - 1;`, "Try smaller candidates."],
          `    }`,
          `  }`,
          [`  return ans;`, "The largest r with r * r <= x."],
          `}`
        ]
      }
    },
    tests: [
      { args: [0], expect: 0 },
      { args: [1], expect: 1 },
      { args: [2], expect: 1 },
      { args: [3], expect: 1 },
      { args: [4], expect: 2 },
      { args: [8], expect: 2 },
      { args: [16], expect: 4 },
      { args: [24], expect: 4 },
      { args: [25], expect: 5 },
      { args: [99], expect: 9 },
      { args: [100], expect: 10 },
      { args: [2147395599], expect: 46339 }
    ]
  },

  recall: [
    { q: "What must be true about the data for binary search to work?", a: "It is **sorted**, or more generally a yes/no question flips only once. Then one comparison tells you which half to discard." },
    { q: "How many steps does binary search take on 1,000,000 items?", a: "About 20, because log₂ 1,000,000 ≈ 20." },
    { q: "Why `left <= right` in exact search but `left < right` in lower bound?", a: "Exact search may still have to check a single leftover position (left equals right). Lower bound keeps a candidate in the range, so when left meets right that position *is* the answer and needs no extra check." },
    { q: "In lower bound, why `right = mid` and not `mid - 1`?", a: "`nums[mid]` already satisfies the condition, so `mid` itself might be the first such position. Skipping it could skip the answer." },
    { q: "What is “binary search on the answer”?", a: "Binary search over the range of possible *answers* using a yes/no test that flips once (like “is this speed fast enough?”), looking for the first yes." }
  ],

  related: {
    topics: ["searching", "linear-search", "two-pointer", "bst"],
    files: ["Problems/Techniques/DivideAndConquer/binarySearch.js", "Problems/Array/searchRange.js", "Problems/Array/findMinRotatedSortedArray.js", "Problems/Array/mySqrt.js"]
  }
});
