// Sliding Window — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "sliding-window",
  group: "pointers",
  emoji: "🪟",
  title: "Sliding Window",
  tagline: "Slide a window over the data: add the new item on the right, drop the old one on the left, instead of recomputing the whole window each time.",
  level: "Core",
  needs: ["two-pointer"],

  gist: [
    "A **window** is a contiguous range `left..right`. Move it along the array instead of rebuilding it from scratch.",
    "**Fixed size k:** add the item entering on the right, subtract the item leaving on the left.",
    "**Variable size:** grow with `right`; shrink with `left` while the window breaks a rule (to find the *longest*) or while it is big enough (to find the *shortest*).",
    "**O(n)**: every item enters the window once and leaves at most once."
  ],

  complexity: {
    time: "O(n)",
    space: "O(1) or O(k)",
    why: [
      "`right` moves forward n times and `left` only ever moves forward too, so together they make at most 2n moves. A `while` loop inside the `for` loop does not make it O(n²), because `left` never goes back: each item is removed at most once.",
      "A fixed window needs only a running total (O(1)). A variable window that tracks letters or distinct values needs a Set or Map of up to k items (O(k))."
    ]
  },

  idea: {
    plain: [
      "Many problems ask about a **contiguous stretch** of an array or string: the best sum of 3 neighbours, the longest substring with no repeats. Re-adding the whole stretch for every position wastes work, because neighbouring windows overlap almost completely.",
      "A **sliding window** reuses the overlap. When the window moves one step, only two things change: one item **enters** on the right and one **leaves** on the left. Update your running answer for just those two items.",
      "Two flavours. **Fixed size:** the window always holds k items. **Variable size:** the window grows on the right, and when it breaks the rule you shrink it from the left until it is valid again."
    ],
    signals: [
      "“**Subarray** / **substring**” (contiguous) plus a condition: sum, count, number of distinct values.",
      "“Longest / shortest / maximum / minimum **window** that …”.",
      "“Maximum sum of **k consecutive** items”.",
      "A brute force that recomputes a sum or a count for every start position."
    ],
    notFor: [
      "The items you pick need not be neighbours (subsequences). Windows only cover contiguous ranges.",
      "Variable windows driven by a **sum** when the array has **negative numbers**: growing the window no longer reliably increases the sum, so the shrink logic breaks. (Use prefix sums and a map instead.)"
    ],
    more: [
      {
        type: "table",
        heading: "Fixed vs variable window",
        columns: ["", "Fixed size k", "Variable size"],
        rows: [
          ["Window size", "Always k", "Grows and shrinks"],
          ["Move `right`", "Every step", "Every step"],
          ["Move `left`", "Together with `right`", "Only while the window is invalid (longest) or big enough (shortest)"],
          ["Typical problems", "Max sum of k items, max vowels in k letters", "Longest substring without repeats, smallest subarray with sum ≥ target"]
        ]
      }
    ]
  },

  analogy: {
    title: "A bus with a moving window of passengers",
    story: [
      "Imagine counting the money carried by the last k passengers on a bus. At each stop one passenger gets on at the front (right) and one gets off at the back (left). You do **not** recount everyone: you keep a running total, add the newcomer's money and subtract the leaver's.",
      "**Variable version:** think of a stretchy rubber band around a part of a sentence. You stretch it to the right to include more letters. The moment a letter appears twice inside it, you pull the left end in until the repeat is gone, and you note the longest the band ever was."
    ],
    map: [
      ["The group of k passengers", "The window `left..right`"],
      ["A passenger boards at the front", "`right` moves; add `nums[right]`"],
      ["A passenger leaves at the back", "`left` moves; remove `nums[left]`"],
      ["Running total of money", "`windowSum` (or a Set / Map)"],
      ["Rubber band snapping tighter", "`while (invalid) left++`"]
    ],
    breaks: "A bus carries a fixed number of passengers, but a window can be any size. Also, real passengers can leave from anywhere, whereas the window only ever drops its **leftmost** item."
  },

  demos: [
    {
      id: "fixed",
      title: "Fixed window: maximum sum of k consecutive numbers",
      intro: "The window always holds **k** numbers. Each slide adds the number entering on the right and subtracts the one leaving on the left. The faded cells are outside the window.",
      codeIntro: "Returns the largest sum of any `k` consecutive numbers.",
      viz: "array",
      legend: [["good", "number entering"], ["bad", "number leaving"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers", value: [2, 1, 5, 1, 3, 2, 4], len: [4, 10], min: -5, max: 12 },
        { type: "number", name: "k", label: "Window size k", value: 3, min: 1, max: 10 }
      ],
      validate(inp) {
        return inp.k > inp.nums.length ? "k cannot be bigger than the array length (" + inp.nums.length + ")." : null;
      },
      random(rnd) {
        const n = rnd.int(5, 9);
        return { nums: Array.from({ length: n }, () => rnd.int(-3, 10)).join(", "), k: String(rnd.int(1, Math.min(4, n))) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const k = inp.k;
        const n = a.length;
        let sum = 0;
        for (let i = 0; i < k; i++) sum += a[i];
        let best = sum;
        let bestLeft = 0;
        const view = (left, right, extra) => Object.assign({ label: "nums", cells: a, range: [left, right], ptr: { left, right }, vars: { windowSum: sum, best } }, extra);

        snap(view(0, k - 1, { at: ["first", "best0"], say: "Add up the first **" + k + "** numbers to make the first window: **" + sum + "**. That is our best so far." }));
        for (let right = k; right < n; right++) {
          const old = sum;
          sum += a[right] - a[right - k];
          if (sum > best) {
            best = sum;
            bestLeft = right - k + 1;
          }
          snap(view(right - k + 1, right, {
            at: ["loop", "slide", "update"],
            tone: { [right]: "good", [right - k]: "bad" },
            say: "Slide one step: **" + a[right] + "** enters, **" + a[right - k] + "** leaves. New sum = " + old + " + " + a[right] + " - " + a[right - k] + " = **" + sum + "**. " + (sum >= best && bestLeft === right - k + 1 ? "New best!" : "best stays " + best + ".")
          }));
        }
        snap(view(bestLeft, bestLeft + k - 1, {
          at: ["done"],
          tone: DSA.util.span(bestLeft, bestLeft + k - 1, "good"),
          out: "Best window sum: " + best,
          say: "No more numbers to slide in. The best window starts at index **" + bestLeft + "**, with sum **" + best + "**. We never re-added a whole window, so the work is O(n).",
          result: best
        }));
      },
      code: {
        fn: "maxSumK",
        lines: [
          `function maxSumK(nums, k) {`,
          [`  let windowSum = 0;`, "", "first"],
          [`  for (let i = 0; i < k; i++) windowSum += nums[i];`, "Build the first window by adding its k numbers (done once).", "first"],
          [`  let best = windowSum;`, "The first window is the best so far.", "best0"],
          [`  for (let right = k; right < nums.length; right++) {`, "`right` is the index of the number entering the window.", "loop"],
          [`    windowSum += nums[right] - nums[right - k];`, "Add the newcomer, subtract the number that just fell off the left (k places behind).", "slide"],
          [`    best = Math.max(best, windowSum);`, "Keep the largest window sum.", "update"],
          `  }`,
          [`  return best;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.k)
    },

    {
      id: "variable",
      title: "Variable window (longest): substring without repeating letters",
      intro: "Grow with **right**. When the new letter is already inside the window, shrink from **left** until it is gone. The best length is the biggest window seen.",
      codeIntro: "Returns the length of the longest substring with all different letters.",
      viz: "array",
      legend: [["cur", "letter just added on the right"], ["good", "current window"], ["bad", "letter dropped from the left"]],
      inputs: [{ type: "text", name: "s", label: "Text (a to z)", value: "abcabcbb", len: [3, 10], alphabet: "abcdefghijklmnopqrstuvwxyz" }],
      frames(inp, snap) {
        const span = DSA.util.span;
        const s = [...inp.s];
        const n = s.length;
        const seen = new Set();
        let left = 0;
        let best = 0;
        const box = (hot) => ({ label: "window letters (Set)", kind: "set", items: [...seen].map((v) => ({ v, new: v === hot })) });
        const view = (lo, hi, extra) => Object.assign({ label: "letters", cells: s, range: [lo, hi], ptr: { left, right: Math.min(hi, n - 1) }, boxes: [box()], vars: { best, "window size": Math.max(0, hi - lo + 1) } }, extra);

        snap(view(0, -1, { at: ["init"], ptr: {}, say: "The window is empty, `left = 0`, and the Set holds the letters inside the window." }));
        for (let right = 0; right < n; right++) {
          while (seen.has(s[right])) {
            const gone = s[left];
            seen.delete(gone);
            left++;
            snap(view(left, right - 1, {
              at: ["loop", "while", "shrink"],
              ptr: { left, right },
              tone: { [right]: "cur", [left - 1]: "bad", ...span(left, right - 1, "good") },
              say: "**" + s[right] + "** is already in the window, so drop the leftmost letter (**" + gone + "**) and move **left** to " + left + ". Repeat until **" + s[right] + "** is no longer inside."
            }));
          }
          seen.add(s[right]);
          best = Math.max(best, right - left + 1);
          snap(view(left, right, {
            at: ["add", "best"],
            ptr: { left, right },
            tone: { ...span(left, right, "good"), [right]: "cur" },
            boxes: [box(s[right])],
            say: "Add **" + s[right] + "**. The window is [" + left + ".." + right + "], with " + (right - left + 1) + " different letter" + (right - left === 0 ? "" : "s") + ". best = **" + best + "**."
          }));
        }
        snap(view(left, n - 1, {
          at: ["done"],
          tone: span(left, n - 1, "good"),
          out: "Longest substring without repeats: " + best,
          say: "The window reached the end. The longest window ever seen had **" + best + "** different letters. `left` never moved backwards, so this is O(n).",
          result: best
        }));
      },
      code: {
        fn: "longestUnique",
        lines: [
          `function longestUnique(s) {`,
          [`  const seen = new Set();`, "The letters currently inside the window.", "init"],
          [`  let left = 0, best = 0;`, "", "init"],
          [`  for (let right = 0; right < s.length; right++) {`, "Grow the window to the right, one letter at a time.", "loop"],
          [`    while (seen.has(s[right])) {`, "The new letter is already inside: the window is invalid.", "while"],
          [`      seen.delete(s[left]);`, "Drop the leftmost letter...", "shrink"],
          [`      left++;`, "...and shrink the window from the left. Repeat until the repeat is gone.", "shrink"],
          `    }`,
          [`    seen.add(s[right]);`, "The window is valid again: add the new letter.", "add"],
          [`    best = Math.max(best, right - left + 1);`, "Update the longest window. Do it **after** fixing the window.", "best"],
          `  }`,
          [`  return best;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.s)
    },

    {
      id: "shortest",
      title: "Variable window (shortest): smallest subarray with sum ≥ target",
      intro: "Now we want the **shortest** valid window, so we shrink while the window is **big enough**, and record the length each time. (All numbers are positive.)",
      codeIntro: "Returns the length of the shortest subarray whose sum is at least `target`, or `0` if none exists.",
      viz: "array",
      legend: [["good", "current window"], ["cur", "number just added"], ["bad", "number dropped"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Positive numbers", value: [2, 3, 1, 2, 4, 3], len: [4, 9], min: 1, max: 9 },
        { type: "number", name: "target", label: "Target sum", value: 7, min: 1, max: 40 }
      ],
      frames(inp, snap) {
        const span = DSA.util.span;
        const a = inp.nums;
        const T = inp.target;
        const n = a.length;
        let left = 0;
        let sum = 0;
        let best = Infinity;
        const shown = () => (best === Infinity ? "∞" : best);
        const view = (lo, hi, extra) => Object.assign({ label: "nums", cells: a, range: [lo, hi], ptr: { left, right: Math.min(hi, n - 1) }, vars: { sum, target: T, best: shown() } }, extra);

        snap(view(0, -1, { at: ["init"], ptr: {}, say: "We look for the shortest run of numbers adding to at least **" + T + "**. The window starts empty with sum 0." }));
        for (let right = 0; right < n; right++) {
          sum += a[right];
          snap(view(left, right, {
            at: ["loop", "add"],
            ptr: { left, right },
            tone: { ...span(left, right, "good"), [right]: "cur" },
            say: "Add **" + a[right] + "**: the window [" + left + ".." + right + "] now sums to **" + sum + "**" + (sum >= T ? ", which is at least " + T + ". Valid, so try to shrink it." : ", still below " + T + ". Keep growing.")
          }));
          while (sum >= T) {
            const len = right - left + 1;
            best = Math.min(best, len);
            const dropped = a[left];
            sum -= dropped;
            left++;
            snap(view(left, right, {
              at: ["while", "best", "shrink"],
              ptr: { left, right },
              tone: { ...span(left, right, "good"), [left - 1]: "bad" },
              say: "The window had length **" + len + "**, so best = **" + best + "**. Now drop **" + dropped + "** from the left: sum becomes " + sum + (sum >= T ? ", still ≥ " + T + ", so keep shrinking." : ", below " + T + ", so go back to growing.")
            }));
          }
        }
        snap(view(left, n - 1, {
          at: ["done"],
          out: best === Infinity ? "No subarray reaches " + T : "Shortest subarray length: " + best,
          outTone: best === Infinity ? "bad" : undefined,
          say: best === Infinity ? "Even the whole array never reaches " + T + ", so the answer is **0**." : "Done. The shortest window with sum ≥ " + T + " has length **" + best + "**.",
          result: best === Infinity ? 0 : best
        }));
      },
      code: {
        fn: "minSubArrayLen",
        lines: [
          `function minSubArrayLen(target, nums) {`,
          [`  let left = 0, sum = 0, best = Infinity;`, "Window sum, left edge, and the shortest valid length so far.", "init"],
          [`  for (let right = 0; right < nums.length; right++) {`, "Grow to the right.", "loop"],
          [`    sum += nums[right];`, "Add the new number to the window.", "add"],
          [`    while (sum >= target) {`, "The window is big enough, so try to make it shorter.", "while"],
          [`      best = Math.min(best, right - left + 1);`, "Record this valid length **inside** the loop (we want the minimum).", "best"],
          [`      sum -= nums[left];`, "Remove the leftmost number...", "shrink"],
          [`      left++;`, "...and shrink.", "shrink"],
          `    }`,
          `  }`,
          [`  return best === Infinity ? 0 : best;`, "Infinity means no window ever reached the target.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.target, inp.nums)
    }
  ],

  mistakes: [
    {
      oops: "Recomputing the whole window sum for every position",
      why: "That is O(n · k) and throws away the whole point. Neighbouring windows differ by only two items.",
      fix: "Add the item entering and subtract the item leaving."
    },
    {
      oops: "Removing the wrong index when the window slides (`nums[right - k + 1]` instead of `nums[right - k]`)",
      why: "After the slide the window is `right-k+1 .. right`, so the item that **left** is `right - k`. An off-by-one here silently corrupts the sum.",
      fix: "Trace a tiny example by hand: k = 2, right = 2 → the leaver is index 0."
    },
    {
      oops: "Using `if` instead of `while` to shrink the window",
      why: "One removal may not be enough to make the window valid again (or to find the shortest one). The window stays invalid.",
      fix: "Use `while (invalid) { remove left; left++ }`."
    },
    {
      oops: "Updating `best` at the wrong moment",
      why: "For the **longest** valid window, update after the window is fixed. For the **shortest**, update inside the shrink loop while it is still valid.",
      fix: "Ask: am I maximising or minimising? That tells you where the update goes."
    },
    {
      oops: "Using a sum-based variable window when numbers can be negative",
      why: "Adding a negative number makes the sum smaller, so “grow when too small, shrink when too big” no longer works.",
      fix: "Use prefix sums with a hash map instead."
    }
  ],

  remember: {
    mnemonic: "Right adds, left removes. Longest: shrink while invalid. Shortest: shrink while valid.",
    rules: [
      "Fixed window: `windowSum += nums[right] - nums[right - k]`.",
      "Variable window: `for right` { add `right` ; `while (bad)` { remove `left`; `left++` } ; update answer }.",
      "Each item enters once and leaves once → O(n), even with the `while` inside the `for`.",
      "Window state is usually a number, a Set (distinct values) or a Map (letter counts)."
    ],
    template: {
      lines: [
        [`let left = 0;`, "Left edge of the window."],
        [`for (let right = 0; right < n; right++) {`, "Right edge grows every step."],
        [`  // add arr[right] to the window state`, "Update sum / Set / Map."],
        [`  while (windowIsInvalid()) {`, "Too many repeats, sum too big..."],
        [`    // remove arr[left] from the window state`, "Undo what adding it did."],
        [`    left++;`, "Shrink."],
        `  }`,
        [`  // update the answer using right - left + 1`, "Window length is right - left + 1."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Techniques/SlidingWindow/maxSumSubarray.js` and `longestUniqueSubstring.js`. A sliding window plus a **frequency map** also solves “find an anagram inside a string”."
      }
    ]
  },

  practice: {
    title: "Maximum Vowels in a Substring of Length k",
    level: "Easy",
    problem: "Given a lowercase string `s` and an integer `k`, return the **maximum number of vowels** (`a e i o u`) in any substring of length `k`.",
    examples: [
      { input: "s = \"abciiidef\", k = 3", output: "3", why: "The substring \"iii\" has 3 vowels." },
      { input: "s = \"leetcode\", k = 3", output: "2", why: "\"lee\", \"eet\" and \"ode\" all contain 2 vowels." },
      { input: "s = \"rhythms\", k = 4", output: "0" }
    ],
    hints: [
      "The window length is fixed at `k`, so this is the fixed-size window.",
      "Count the vowels in the first k letters. Then slide: add 1 if the entering letter is a vowel, subtract 1 if the leaving letter is a vowel.",
      "Track the largest count seen. A helper such as `\"aeiou\".includes(ch)` tells you whether a letter is a vowel."
    ],
    solution: {
      explain: [
        "Exactly the max-sum-of-k idea, with “1 if vowel else 0” as each letter's value. The window count changes only by what enters and what leaves.",
        "Time O(n), space O(1)."
      ],
      code: {
        fn: "maxVowels",
        lines: [
          `function maxVowels(s, k) {`,
          [`  const isVowel = (ch) => "aeiou".includes(ch);`, "1 for vowels, 0 for everything else (as a boolean)."],
          [`  let count = 0;`, "Vowels inside the current window."],
          [`  for (let i = 0; i < k; i++) if (isVowel(s[i])) count++;`, "Count the first window."],
          [`  let best = count;`, ""],
          [`  for (let right = k; right < s.length; right++) {`, "Slide the window."],
          [`    if (isVowel(s[right])) count++;`, "A vowel enters."],
          [`    if (isVowel(s[right - k])) count--;`, "A vowel leaves."],
          [`    best = Math.max(best, count);`, ""],
          `  }`,
          [`  return best;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: ["abciiidef", 3], expect: 3 },
      { args: ["aeiou", 2], expect: 2 },
      { args: ["leetcode", 3], expect: 2 },
      { args: ["rhythms", 4], expect: 0 },
      { args: ["a", 1], expect: 1 },
      { args: ["abc", 3], expect: 1 },
      { args: ["weallloveyou", 7], expect: 4 }
    ]
  },

  recall: [
    { q: "What changes when a fixed window slides one step?", a: "One item enters on the right and one leaves on the left, so you add the entering item and subtract the leaving one." },
    { q: "Why is a variable window O(n) even though it has a `while` inside a `for`?", a: "`left` never moves backwards, so every item is removed at most once. Total moves are at most 2n." },
    { q: "For the longest valid window, when do you shrink and where do you update the answer?", a: "Shrink while the window is **invalid**, then update the answer after the window is valid again." },
    { q: "For the shortest valid window, when do you shrink and where do you update the answer?", a: "Shrink while the window is **valid (big enough)**, and update the answer inside the shrink loop each time." },
    { q: "Why does a sum-based variable window fail with negative numbers?", a: "Adding a number no longer reliably increases the sum, so you cannot decide whether to grow or shrink. Use prefix sums + a map instead." }
  ],

  related: {
    topics: ["two-pointer", "frequency-map", "hashset", "prefix-sum"],
    files: ["Problems/Techniques/SlidingWindow/maxSumSubarray.js", "Problems/Techniques/SlidingWindow/longestUniqueSubstring.js"]
  }
});
