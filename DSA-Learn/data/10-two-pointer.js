// Two Pointers — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "two-pointer",
  group: "pointers",
  emoji: "👉",
  title: "Two Pointers",
  tagline: "Use two index markers instead of a nested loop, so one pass through the array does the work of checking every pair.",
  level: "Starter",

  gist: [
    "A *pointer* is just an index variable. Keep **two** of them and move them by a simple rule instead of trying every pair.",
    "Two flavours: **converging** (start at both ends, walk toward the middle) and **read / write** (both start on the left, one runs ahead).",
    "It turns an O(n²) double loop into one O(n) pass using O(1) extra memory.",
    "Converging only works when each step lets you **safely throw one candidate away**, usually because the array is sorted."
  ],

  complexity: {
    time: "O(n)",
    space: "O(1)",
    why: [
      "Each pointer only ever moves forward (or only inward). It never steps back. Together the two pointers make at most *n* moves, so the whole scan is O(n). The double loop it replaces makes about n × n / 2 comparisons.",
      "You store only a couple of integers (the pointers) and maybe one running value, so extra memory stays O(1). Remove-duplicates even edits the array in place."
    ],
    more: [
      {
        type: "table",
        heading: "Finding a pair that adds to a target: three ways",
        columns: ["Approach", "Time", "Extra memory", "Needs sorted input?"],
        rows: [
          ["Two nested loops (brute force)", "O(n²)", "O(1)", "No"],
          ["**Two pointers**", "**O(n)**", "**O(1)**", "**Yes**"],
          ["Hash map (see HashMap topic)", "O(n)", "O(n)", "No"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A pointer here is just an index like `left` or `right`. *Two Pointers* means you keep two of them and move them by a simple rule, so you never have to compare every position with every other position.",
      "**Flavour 1: converging.** One pointer starts at the left end, the other at the right end, and they walk toward each other. It works when looking at the pair lets you **throw one end away for sure**. For example, the array is sorted and the sum is too big, so the biggest number can't be part of the answer.",
      "**Flavour 2: read / write (fast and slow).** Both pointers start on the left. The fast one (`read`) looks at every element. The slow one (`write`) marks where the next element worth keeping should be placed. This is how you clean an array *in place* without a second array."
    ],
    signals: [
      "The array or string is **sorted** and you need a pair (or triple) with a given sum, difference or product.",
      "You have to compare the **two ends** of something: palindromes, reversing, “container” problems.",
      "You must **filter or rearrange in place** with O(1) extra memory: remove duplicates, move zeroes, partition.",
      "Your first idea is a double loop over all pairs (`for i … for j …`)."
    ],
    notFor: [
      "The array is **unsorted** and sorting it would lose something you need (like the original indexes). A hash map is usually better.",
      "You need to track a *contiguous range* whose sum or count changes as it grows and shrinks. That is Sliding Window, a close cousin."
    ],
    more: [
      {
        type: "table",
        heading: "The two flavours at a glance",
        columns: ["Flavour", "Where the pointers start", "How they move", "Typical problems"],
        rows: [
          ["Converging", "One at each end", "Toward each other", "Pair sum in sorted array, palindrome check, reverse, container with most water"],
          ["Read / write (fast & slow)", "Both at the left", "Same direction, different jobs", "Remove duplicates, move zeroes, cycle detection in a linked list"]
        ]
      }
    ]
  },

  analogy: {
    title: "Buying exactly two snacks with exactly 10 coins",
    story: [
      "A shelf holds snacks **sorted by price**, cheapest on the left, priciest on the right. You have exactly 10 coins and want to buy two snacks that cost 10 together. Put one finger on the cheapest snack and one on the priciest.",
      "If the two prices add up to **more** than 10, the priciest snack is too expensive for *any* partner, because even the cheapest partner (the one your left finger is on) already pushes the total over. Cross it off and slide your right finger one snack to the left. If they add up to **less** than 10, the cheapest snack can't reach 10 even with the best partner left, so cross it off and slide your left finger right. Stop when the total is exactly 10, or when your fingers meet.",
      "**Read / write version:** you sort a pile of exam papers into a clean desk. One hand (read) flips through every paper in the pile. The other hand (write) points at the next free spot on the clean desk. You place a paper there only if it is not a repeat of the one just placed."
    ],
    map: [
      ["Shelf sorted by price", "A sorted array"],
      ["Finger on the cheapest / priciest", "`left` and `right` pointers"],
      ["Total is more than 10, cross off the priciest", "`sum > target`, so `right--`"],
      ["Total is less than 10, cross off the cheapest", "`sum < target`, so `left++`"],
      ["Fingers meet with no match", "Loop ends (`left` reaches `right`): no pair exists"],
      ["Hand that flips through every paper", "`read` pointer"],
      ["Hand that marks the next free spot", "`write` pointer"]
    ],
    breaks: "A real shopper could add up every pair with a calculator. The trick is that sorted order lets you cross a snack off *without ever testing it against the others*. On an unsorted shelf that reasoning is wrong, and you could cross off the winning snack."
  },

  demos: [
    {
      id: "converging",
      title: "Two Sum on a sorted array (converging pointers)",
      intro: "Find two numbers that add up to the target. Press **Play**, or step with the arrows. Change the numbers or the target and press **Run**.",
      codeIntro: "Return the two **indexes**, or `null` if no pair exists. The array must be sorted.",
      viz: "array",
      legend: [["cur", "being added now"], ["bad", "thrown away"], ["good", "the answer"], ["dim", "already ruled out (faded)"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Sorted array", value: [1, 3, 4, 6, 8, 11], len: [2, 10], min: -20, max: 40, sorted: true },
        { type: "number", name: "target", label: "Target sum", value: 10, min: -40, max: 80 }
      ],
      random(rnd) {
        const n = rnd.int(5, 9);
        const nums = Array.from({ length: n }, () => rnd.int(1, 25)).sort((a, b) => a - b);
        let target;
        if (rnd() < 0.7) {
          const i = rnd.int(0, n - 2);
          const j = rnd.int(i + 1, n - 1);
          target = nums[i] + nums[j];
        } else {
          target = rnd.int(2, 50);
        }
        return { nums: nums.join(", "), target: String(target) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const T = inp.target;
        let left = 0;
        let right = a.length - 1;
        const view = (extra) => Object.assign({ label: "nums (sorted)", cells: a, ptr: { left, right }, range: [left, right], vars: { target: T } }, extra);

        snap(view({
          at: "init",
          say: "Put one finger (**left**) on the smallest number and one (**right**) on the biggest. We want two numbers that add up to **" + T + "**."
        }));
        while (left < right) {
          const sum = a[left] + a[right];
          snap(view({
            at: "sum",
            tone: { [left]: "cur", [right]: "cur" },
            vars: { target: T, sum },
            say: "Try this pair: " + a[left] + " + " + a[right] + " = **" + sum + "**. The target is **" + T + "**."
          }));
          if (sum === T) {
            snap(view({
              at: ["hit", "found"],
              tone: { [left]: "good", [right]: "good" },
              vars: { target: T, sum },
              out: a[left] + " + " + a[right] + " = " + T + ", so the answer is indexes [" + left + ", " + right + "]",
              say: "The sum equals the target, so we are done. The answer is indexes **[" + left + ", " + right + "]**.",
              result: [left, right]
            }));
            return;
          }
          if (sum < T) {
            snap(view({
              at: ["small", "moveL"],
              tone: { [left]: "bad", [right]: "cur" },
              vars: { target: T, sum },
              say: "**" + sum + "** is less than " + T + ". Even with the biggest number still in play (" + a[right] + "), " + a[left] + " falls short, so " + a[left] + " can never be part of the answer. Throw it away: move **left** one step right."
            }));
            left++;
          } else {
            snap(view({
              at: ["big", "moveR"],
              tone: { [left]: "cur", [right]: "bad" },
              vars: { target: T, sum },
              say: "**" + sum + "** is more than " + T + ". Even with the smallest number still in play (" + a[left] + "), " + a[right] + " is too big, so " + a[right] + " can never be part of the answer. Throw it away: move **right** one step left."
            }));
            right--;
          }
        }
        snap(view({
          at: ["loop", "none"],
          out: "No two numbers add up to " + T,
          outTone: "bad",
          say: "The two fingers have met, so there is no pair left to try. **No answer exists** for this target.",
          result: null
        }));
      },
      code: {
        fn: "twoSumSorted",
        lines: [
          `function twoSumSorted(nums, target) {`,
          [`  let left = 0;`, "Left finger on the smallest number.", "init"],
          [`  let right = nums.length - 1;`, "Right finger on the biggest number.", "init"],
          [`  while (left < right) {`, "Keep going until the fingers meet. A pair needs two *different* positions, so `<` and not `<=`.", "loop"],
          [`    const sum = nums[left] + nums[right];`, "Add the two numbers the fingers point at.", "sum"],
          [`    if (sum === target) {`, "Exactly the target: we found the pair.", "hit"],
          [`      return [left, right];`, "Return the two indexes.", "found"],
          [`    } else if (sum < target) {`, "Too small: we need a bigger total.", "small"],
          [`      left++;`, "`nums[left]` is too small even with the biggest partner left, so drop it. Moving left to the right gives bigger numbers.", "moveL"],
          [`    } else {`, "Otherwise the sum is too big.", "big"],
          [`      right--;`, "`nums[right]` is too big even with the smallest partner left, so drop it. Moving right to the left gives smaller numbers.", "moveR"],
          `    }`,
          `  }`,
          [`  return null;`, "The fingers met and nothing matched: no such pair.", "none"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.target)
    },

    {
      id: "readwrite",
      title: "Remove duplicates in place (read / write pointers)",
      intro: "Both pointers start on the left. **read** looks at every number, **write** marks the next free slot at the front. Watch the kept numbers pile up on the left.",
      codeIntro: "The array is sorted, so equal numbers sit side by side. Returns how many unique numbers there are and leaves them at the front of the array.",
      viz: "array",
      legend: [["good", "kept (the clean front part)"], ["cur", "read is looking here"], ["mark", "last kept value"], ["dim", "leftover, ignored"]],
      inputs: [{ type: "numlist", name: "nums", label: "Sorted array (repeats allowed)", value: [1, 1, 2, 3, 3, 3, 5], len: [2, 10], min: 0, max: 9, sorted: true }],
      frames(inp, snap) {
        const a = inp.nums.slice();
        let write = 1;
        let read = null;
        const kept = (upTo) => Object.fromEntries(Array.from({ length: upTo }, (_, i) => [i, "good"]));
        const view = (extra) => Object.assign({ label: "nums", cells: a, ptr: { write, read }, vars: { write } }, extra);

        snap(view({
          at: "init",
          tone: kept(1),
          ptr: { write },
          say: "The first number is always unique, so slot 0 is already \"kept\". **write = 1** is the next free slot. **read** will scan everything after it."
        }));
        for (read = 1; read < a.length; read++) {
          if (a[read] !== a[write - 1]) {
            snap(view({
              at: ["loop", "cmp"],
              tone: { ...kept(write), [read]: "cur", [write - 1]: "mark" },
              vars: { write, read },
              say: "read = " + read + ": " + a[read] + " is **different** from the last kept value (" + a[write - 1] + "), so it is a new unique number."
            }));
            const slot = write;
            a[write] = a[read];
            write++;
            snap(view({
              at: ["copy", "adv"],
              tone: { ...kept(write), [read]: "cur" },
              vars: { write, read },
              say: "Copy " + a[slot] + " into slot " + slot + ", then move **write** to " + write + "."
            }));
          } else {
            snap(view({
              at: ["loop", "cmp"],
              tone: { ...kept(write), [read]: "cur", [write - 1]: "mark" },
              vars: { write, read },
              say: "read = " + read + ": " + a[read] + " is the **same** as the last kept value (" + a[write - 1] + "), a duplicate. Skip it: only **read** moves on, **write** stays."
            }));
          }
        }
        read = null;
        const tone = kept(write);
        for (let i = write; i < a.length; i++) tone[i] = "dim";
        snap(view({
          at: "done",
          tone,
          ptr: { write },
          vars: { write },
          out: write + " unique numbers: [" + a.slice(0, write).join(", ") + "]",
          say: "**read** ran off the end. The first **" + write + "** slots hold the unique numbers in order. Whatever is after them is leftover and ignored.",
          result: { count: write, unique: a.slice(0, write) }
        }));
      },
      code: {
        fn: "removeDuplicates",
        lines: [
          `function removeDuplicates(nums) {`,
          `  if (nums.length === 0) return 0;`,
          [`  let write = 1;`, "`write` is the next free slot in the clean front part. `nums[0]` is always unique, so we start at 1.", "init"],
          [`  for (let read = 1; read < nums.length; read++) {`, "`read` visits every element once, left to right.", "loop"],
          [`    if (nums[read] !== nums[write - 1]) {`, "Compare with the **last kept** value. Because the array is sorted, a repeat always equals it.", "cmp"],
          [`      nums[write] = nums[read];`, "A new value: copy it to the write slot.", "copy"],
          [`      write++;`, "Move the write finger to the next free slot.", "adv"],
          `    }`,
          `  }`,
          [`  return write;`, "`write` is how many unique values now sit at the front.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => {
        const copy = inp.nums.slice();
        const count = fn(copy);
        return { count, unique: copy.slice(0, count) };
      }
    }
  ],

  mistakes: [
    {
      oops: "Using converging pointers on an **unsorted** array",
      why: "The “throw one end away” argument only holds because the array is ordered. On unsorted data you can discard the very number you needed and miss the answer.",
      fix: "Sort first if you don't need the original indexes, or use a hash map."
    },
    {
      oops: "Writing `while (left <= right)` in a pair problem",
      why: "When `left === right` both pointers sit on the same element, so you might pair a number with itself.",
      fix: "Use `left < right` for pairs. Use `<=` only when a single middle element must also be processed."
    },
    {
      oops: "Moving the wrong pointer",
      why: "If the sum is too small you need a *bigger* number, which means moving **left** (toward bigger values). Moving right makes the sum even smaller and you can loop or miss the answer.",
      fix: "Say it out loud: too small → raise the small side; too big → lower the big side."
    },
    {
      oops: "Reading the whole array after an in-place remove-duplicates",
      why: "Slots from `write` onward still hold old leftovers, so the array looks like it still has duplicates.",
      fix: "Use only `nums[0 .. write-1]`, or cut the array with `nums.length = write`."
    }
  ],

  remember: {
    mnemonic: "Too small? Move the left finger up. Too big? Move the right finger down. Fingers meet? Stop.",
    rules: [
      "**Converging** = sorted data or a symmetric check. **Read / write** = in-place filtering.",
      "Ask yourself: “Which candidate can I throw away *right now*, and *why* is it safe?” If you can answer, Two Pointers fits.",
      "Every loop iteration must move at least one pointer, otherwise you loop forever.",
      "For “all unique pairs/triplets” problems, also skip equal neighbours so the same answer isn't reported twice."
    ],
    template: {
      lines: [
        `let left = 0, right = arr.length - 1;`,
        [`while (left < right) {`, "Pointers still have room between them."],
        [`  // 1. look at arr[left] and arr[right]`, "Compute whatever the problem asks: a sum, a difference, a comparison."],
        [`  // 2. is this the answer? then return it`, "Stop as soon as the condition is met."],
        [`  // 3. otherwise move ONE pointer inward`, "Move the pointer whose element can't be part of any answer."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Revisit your own files: `Problems/Array/sortedSquares.js` squares everything and then sorts (O(n log n)). The biggest square always sits at one of the two ends, so converging pointers can fill the answer from the back in O(n). `Problems/Array/moveZeroes.js` builds a second array. Read / write pointers do it in place with O(1) memory."
      }
    ]
  },

  practice: {
    title: "Valid Palindrome",
    level: "Easy",
    problem: "Given a string, return `true` if it reads the same forwards and backwards after you ignore every character that is **not a letter or digit** and ignore upper / lower case.",
    examples: [
      { input: "\"A man, a plan, a canal: Panama\"", output: "true", why: "Ignoring spaces, commas and case it becomes amanaplanacanalpanama, which is a palindrome." },
      { input: "\"race a car\"", output: "false", why: "raceacar is not the same backwards." }
    ],
    hints: [
      "You must compare the two **ends** of the string. Which flavour of Two Pointers is that?",
      "Put `left` at the start and `right` at the end. If the character under a pointer is not a letter or digit, just move that pointer without comparing anything.",
      "When both pointers are on real characters, compare them in lower case. If they differ, return `false`. If the pointers meet, return `true`."
    ],
    solution: {
      explain: [
        "Converging pointers: compare the outermost real characters and walk inward. Characters we have to ignore are skipped by moving only that pointer. One mismatch proves it is not a palindrome. If the pointers cross without a mismatch, it is one.",
        "Time O(n) because each pointer moves at most n times in total, space O(1)."
      ],
      code: {
        fn: "isPalindrome",
        lines: [
          `function isPalindrome(s) {`,
          [`  let left = 0, right = s.length - 1;`, "One finger at each end of the string."],
          [`  const isAlnum = (c) => /[a-z0-9]/i.test(c);`, "True for letters and digits only."],
          [`  while (left < right) {`, "Continue until the fingers meet."],
          [`    if (!isAlnum(s[left])) { left++; continue; }`, "Not a real character: skip it by moving only `left`."],
          [`    if (!isAlnum(s[right])) { right--; continue; }`, "Same on the right side."],
          [`    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;`, "Both are real characters: they must match, ignoring case."],
          [`    left++; right--;`, "They matched, so step both fingers inward."],
          `  }`,
          [`  return true;`, "No mismatch was found."],
          `}`
        ]
      }
    },
    tests: [
      { args: ["A man, a plan, a canal: Panama"], expect: true },
      { args: ["race a car"], expect: false },
      { args: [" "], expect: true },
      { args: [""], expect: true },
      { args: ["0P"], expect: false },
      { args: ["ab_a"], expect: true },
      { args: ["No 'x' in Nixon"], expect: true }
    ]
  },

  recall: [
    { q: "When can you use converging pointers to find a pair with a given sum?", a: "When the array is **sorted** (or you can sort it without losing what you need). Then every comparison lets you discard one end for sure." },
    { q: "The sum is smaller than the target. Which pointer moves, and why?", a: "`left` moves right. The left number is too small even with the biggest remaining partner, so it can never be part of the answer." },
    { q: "Why is Two Pointers O(n) and not O(n²)?", a: "Each step moves a pointer and pointers never go back, so there are at most n steps in total." },
    { q: "In remove-duplicates, what do `read` and `write` mean?", a: "`read` scans every element. `write` is the next free slot in the clean, kept part at the front of the array." },
    { q: "Two Pointers vs Sliding Window?", a: "Two Pointers looks at the elements *at* the pointers. Sliding Window cares about *everything between* them (a contiguous range)." }
  ],

  related: {
    topics: ["three-pointer", "sliding-window", "hashmap", "binary-search"],
    files: ["Problems/Techniques/TwoPointers/twoSumSorted.js", "Problems/Techniques/TwoPointers/threeSum.js", "Problems/Techniques/FastAndSlowPointers/removeDuplicates.js", "Problems/Array/removeDuplicatesFromSortedArray.js", "Problems/Array/moveZeroes.js", "Problems/Array/sortedSquares.js", "Problems/Array/mergeSortedArray.js", "Problems/Array/reverseArray.js"]
  }
});
