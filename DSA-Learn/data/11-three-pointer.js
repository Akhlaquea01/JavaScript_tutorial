// Three Pointers — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "three-pointer",
  group: "pointers",
  emoji: "🤟",
  title: "Three Pointers",
  tagline: "Two Pointers with a third helper: either split an array into three groups in one pass, or fix one number and let two pointers find the other two.",
  level: "Core",
  needs: ["two-pointer"],

  gist: [
    "Two classic shapes: **partition** (`low`, `mid`, `high`) and **fix one + two pointers** (3Sum).",
    "**Dutch National Flag** sorts 0s, 1s and 2s in place in **one pass**: `low` guards the 0-zone, `high` guards the 2-zone, `mid` explores the unknown middle.",
    "**3Sum**: sort, fix `i`, then converge `left` and `right` on the rest. That is O(n²) instead of O(n³).",
    "After swapping with `high`, do **not** advance `mid`: the item that arrived has not been looked at yet."
  ],

  complexity: {
    time: "O(n) partition, O(n²) 3Sum",
    space: "O(1)",
    why: [
      "The partition version moves `mid` forward or `high` backward on every step, so together they cross after at most n steps: a single O(n) pass.",
      "3Sum fixes each of n numbers and then runs a two-pointer scan (O(n)) on the rest, so n × n = O(n²). Sorting first costs O(n log n), which is smaller. Brute force would try every triple: O(n³).",
      "Only a few index variables are used, so extra space is O(1) (not counting the answer list)."
    ]
  },

  idea: {
    plain: [
      "With **two** pointers you walk toward each other or run at different speeds. A **third** pointer lets you track one more thing at once.",
      "**Shape 1: partition into three groups.** Items are 0, 1 or 2 (think red, white, blue). Keep three zones: everything before `low` is a 0, everything after `high` is a 2, and `low..mid-1` holds 1s. `mid` scans the unknown stretch between `mid` and `high`, throwing each item into its zone. One pass, no extra array.",
      "**Shape 2: fix one, two-pointer the rest.** To find three numbers adding to a target, sort the array, fix the first number with a loop, and run converging Two Pointers on what is to its right. It turns the O(n³) triple loop into O(n²)."
    ],
    signals: [
      "You must sort or group items into **three categories** in place (Sort Colors, partition around a pivot).",
      "You need **triplets** with a given sum (3Sum, 3Sum closest) or a quadruplet (4Sum, fix two).",
      "The brute force is **three nested loops**."
    ],
    notFor: [
      "More than three categories. Use counting or a general sort.",
      "You need the original **indexes** of the triplet and cannot sort. Use a hash map approach."
    ],
    more: [
      {
        type: "table",
        heading: "The three zones in the Dutch flag",
        columns: ["Zone", "Contents", "Boundary"],
        rows: [
          ["`0 .. low-1`", "all 0s (finished)", "`low` is the next spot for a 0"],
          ["`low .. mid-1`", "all 1s (finished)", "`mid` is the item being examined"],
          ["`mid .. high`", "**unknown**, still to examine", "shrinks every step"],
          ["`high+1 .. n-1`", "all 2s (finished)", "`high` is the last unknown spot"]
        ]
      }
    ]
  },

  analogy: {
    title: "Sorting marbles into three piles with three fingers",
    story: [
      "Red, white and blue marbles lie in one row, and you may only swap marbles in place. Put one finger (`low`) where red marbles should end, one finger (`high`) where blue marbles should begin, and use your third finger (`mid`) to examine the next unknown marble. **Red**: swap it to the red end and move on. **White**: leave it, step forward. **Blue**: swap it to the blue end, but do not step forward yet, because the marble that just arrived from the blue end has not been examined.",
      "**3Sum version:** you must pick a team of three whose skill scores add up to zero. Fix the first member (the captain) and then search the rest of the sorted roster with two fingers, one at the weakest and one at the strongest."
    ],
    map: [
      ["Finger at the end of the red pile", "`low`"],
      ["Finger examining the next marble", "`mid`"],
      ["Finger at the start of the blue pile", "`high`"],
      ["Red marble found", "swap with `low`, `low++`, `mid++`"],
      ["Blue marble found", "swap with `high`, `high--` (mid stays)"],
      ["The captain you fix", "the loop variable `i` in 3Sum"]
    ],
    breaks: "Real marbles can be sorted by looking at all of them at once. The algorithm only ever looks at the marble under `mid` and still manages a perfect sort in one pass."
  },

  demos: [
    {
      id: "flag",
      title: "Dutch National Flag: sort 0s, 1s and 2s in one pass",
      intro: "Green = 0s done, purple = 1s done, red = 2s done. The amber cell at **mid** is the next unknown. Watch the zones grow until the unknown part vanishes.",
      codeIntro: "Sorts the array in place (only values 0, 1 and 2) and returns it.",
      viz: "array",
      legend: [["good", "0-zone (finished)"], ["mark", "1-zone (finished)"], ["bad", "2-zone (finished)"], ["cur", "mid: next to examine"]],
      inputs: [{ type: "numlist", name: "nums", label: "Values (only 0, 1, 2)", value: [2, 0, 2, 1, 1, 0], len: [3, 10], min: 0, max: 2 }],
      frames(inp, snap) {
        const a = inp.nums.slice();
        const n = a.length;
        let low = 0;
        let mid = 0;
        let high = n - 1;
        const zones = () => {
          const t = {};
          for (let i = 0; i < low; i++) t[i] = "good";
          for (let i = low; i < mid; i++) t[i] = "mark";
          for (let i = high + 1; i < n; i++) t[i] = "bad";
          if (mid <= high) t[mid] = "cur";
          return t;
        };
        const view = (extra) => Object.assign({ label: "nums", cells: a, ptr: { low, mid, high }, tone: zones(), vars: { low, mid, high } }, extra);

        snap(view({ at: ["init"], say: "Three pointers: **low** and **mid** at the start, **high** at the end. Everything between mid and high is still unknown." }));
        while (mid <= high) {
          const v = a[mid];
          const L = low;
          const H = high;
          if (v === 0) {
            [a[low], a[mid]] = [a[mid], a[low]];
            low++;
            mid++;
            snap(view({ at: ["loop", "zero"], say: "mid looked at a **0**. Swap it with the item at low (" + L + ") so it joins the 0-zone, then move **both** low and mid forward." }));
          } else if (v === 1) {
            mid++;
            snap(view({ at: ["loop", "one"], say: "mid looked at a **1**. It is already in the right place (between the 0s and the 2s), so just move **mid** forward." }));
          } else {
            [a[mid], a[high]] = [a[high], a[mid]];
            high--;
            snap(view({ at: ["loop", "two"], say: "mid looked at a **2**. Swap it with the item at high (" + H + ") so it joins the 2-zone, and move **high** back. **mid stays**, because the item that just arrived has not been examined yet." }));
          }
        }
        snap(view({
          at: ["done"],
          out: "Sorted: [" + a.join(", ") + "]",
          say: "mid has passed high, so the unknown part is empty: every item sits in its zone. Sorted array: **[" + a.join(", ") + "]**, in one pass with no extra array.",
          result: a.slice()
        }));
      },
      code: {
        fn: "sortColors",
        lines: [
          `function sortColors(nums) {`,
          [`  let low = 0, mid = 0, high = nums.length - 1;`, "`low`: next spot for a 0. `mid`: item being examined. `high`: next spot (from the end) for a 2.", "init"],
          [`  while (mid <= high) {`, "While some items are still unknown. `<=` because the item at high has not been examined either.", "loop"],
          [`    if (nums[mid] === 0) {`, "A 0 belongs at the front.", "zero"],
          [`      [nums[low], nums[mid]] = [nums[mid], nums[low]];`, "Swap it into the 0-zone. The item that comes back to mid was a 1 (or mid itself), so it is already checked.", "zero"],
          [`      low++; mid++;`, "Both zones grew by one, so move both pointers.", "zero"],
          [`    } else if (nums[mid] === 1) {`, "A 1 is already between the 0s and the 2s.", "one"],
          [`      mid++;`, "Just step forward.", "one"],
          [`    } else {`, "A 2 belongs at the back.", "two"],
          [`      [nums[mid], nums[high]] = [nums[high], nums[mid]];`, "Swap it into the 2-zone.", "two"],
          [`      high--;`, "The 2-zone grew. **Do not move mid:** the item swapped in from high is unknown.", "two"],
          `    }`,
          `  }`,
          [`  return nums;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums.slice())
    },

    {
      id: "threesum",
      title: "3Sum: fix one number, then two pointers on the rest",
      intro: "Find all unique triplets that add up to 0. The array is sorted first. **i** (purple) is the fixed number; **left** and **right** converge on the rest.",
      codeIntro: "Returns every unique triplet `[a, b, c]` with `a + b + c = 0`.",
      viz: "array",
      legend: [["mark", "i: the fixed number"], ["cur", "left and right"], ["good", "triplet found"], ["bad", "skipped duplicate"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [0, -1, 2, -1, 1, -4], len: [4, 7], min: -6, max: 6 }],
      frames(inp, snap) {
        const orig = inp.nums.slice();
        const a = inp.nums.slice().sort((x, y) => x - y);
        const n = a.length;
        const result = [];
        const box = (fresh) => ({ label: "triplets found", kind: "list", items: result.map((t, k) => ({ v: "[" + t.join(", ") + "]", new: fresh && k === result.length - 1 })) });
        const view = (extra) => Object.assign({ label: "nums (sorted)", cells: a, boxes: [box()] }, extra);

        snap(view({ at: ["sort"], say: "Sort first: [" + orig.join(", ") + "] becomes **[" + a.join(", ") + "]**. Sorted order is what lets two pointers work, and it puts equal numbers next to each other so duplicates are easy to skip." }));
        for (let i = 0; i < n - 2; i++) {
          if (i > 0 && a[i] === a[i - 1]) {
            snap(view({ at: ["loopI", "dupI"], ptr: { i }, tone: { [i]: "bad" }, say: "**" + a[i] + "** is the same as the previous first number, so any triplet starting with it was already found. Skip it." }));
            continue;
          }
          let left = i + 1;
          let right = n - 1;
          snap(view({ at: ["loopI", "setLR"], ptr: { i, left, right }, tone: { [i]: "mark", [left]: "cur", [right]: "cur" }, say: "Fix the first number: **" + a[i] + "** (position " + i + "). Now we need two numbers to its right that add up to **" + -a[i] + "**. Put **left** just after i and **right** at the end." }));
          while (left < right) {
            const sum = a[i] + a[left] + a[right];
            const L = left;
            const R = right;
            if (sum === 0) {
              result.push([a[i], a[L], a[R]]);
              left++;
              right--;
              let skipped = false;
              while (left < right && a[left] === a[left - 1]) { left++; skipped = true; }
              while (left < right && a[right] === a[right + 1]) { right--; skipped = true; }
              snap(view({
                at: ["sum", "found", "skip"],
                ptr: { i, left, right },
                tone: { [i]: "good", [L]: "good", [R]: "good" },
                boxes: [box(true)],
                vars: { sum },
                say: a[i] + " + " + a[L] + " + " + a[R] + " = **0**: a triplet! Record it, then move both pointers inward" + (skipped ? " and skip equal neighbours so the same triplet is not reported twice." : ".")
              }));
            } else if (sum < 0) {
              left++;
              snap(view({
                at: ["sum", "small"],
                ptr: { i, left, right },
                tone: { [i]: "mark", [L]: "bad", [R]: "cur" },
                vars: { sum },
                say: a[i] + " + " + a[L] + " + " + a[R] + " = **" + sum + "**, which is below 0. We need a bigger total, so move **left** to a bigger number."
              }));
            } else {
              right--;
              snap(view({
                at: ["sum", "big"],
                ptr: { i, left, right },
                tone: { [i]: "mark", [L]: "cur", [R]: "bad" },
                vars: { sum },
                say: a[i] + " + " + a[L] + " + " + a[R] + " = **" + sum + "**, which is above 0. We need a smaller total, so move **right** to a smaller number."
              }));
            }
          }
        }
        snap(view({
          at: ["done"],
          out: result.length + " unique triplet" + (result.length === 1 ? "" : "s"),
          say: "Every first number has been tried. **" + result.length + "** unique triplet" + (result.length === 1 ? "" : "s") + " add up to 0.",
          result
        }));
      },
      code: {
        fn: "threeSum",
        lines: [
          `function threeSum(nums) {`,
          [`  nums.sort((a, b) => a - b);`, "Sort numerically. This enables two pointers and groups duplicates together.", "sort"],
          `  const result = [];`,
          [`  for (let i = 0; i < nums.length - 2; i++) {`, "Fix the first number. It needs two more after it, so stop at length - 3.", "loopI"],
          [`    if (i > 0 && nums[i] === nums[i - 1]) continue;`, "Same first number as before: its triplets were already found.", "dupI"],
          [`    let left = i + 1, right = nums.length - 1;`, "Two pointers over everything to the right of i.", "setLR"],
          [`    while (left < right) {`, "", "loopLR"],
          [`      const sum = nums[i] + nums[left] + nums[right];`, "", "sum"],
          [`      if (sum === 0) {`, "Found one.", "found"],
          [`        result.push([nums[i], nums[left], nums[right]]);`, "Record the triplet.", "found"],
          [`        left++; right--;`, "Move both inward.", "found"],
          [`        while (left < right && nums[left] === nums[left - 1]) left++;`, "Skip repeats of the number we just used on the left...", "skip"],
          [`        while (left < right && nums[right] === nums[right + 1]) right--;`, "...and on the right, so no duplicate triplets.", "skip"],
          [`      } else if (sum < 0) left++;`, "Too small: need a bigger number.", "small"],
          [`      else right--;`, "Too big: need a smaller number.", "big"],
          `    }`,
          `  }`,
          [`  return result;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums.slice())
    }
  ],

  mistakes: [
    {
      oops: "Moving `mid` after swapping with `high`",
      why: "The item that arrives at `mid` from the end has never been examined. It could be a 0 or another 2. Skipping it leaves unsorted items behind.",
      fix: "After the `high` swap only do `high--`. Move `mid` only after a 0 or a 1."
    },
    {
      oops: "Writing `while (mid < high)` in the Dutch flag",
      why: "The item at `high` is still unknown when `mid === high`. Stopping early leaves one item unchecked.",
      fix: "Use `mid <= high`."
    },
    {
      oops: "Forgetting to sort before the 3Sum two-pointer scan",
      why: "The “too small, move left / too big, move right” logic only holds on a sorted array.",
      fix: "Sort numerically first: `nums.sort((a, b) => a - b)` (the default sort compares as text!)."
    },
    {
      oops: "Not skipping duplicates in 3Sum",
      why: "Repeated numbers produce the same triplet several times, so the answer is not unique.",
      fix: "Skip a repeated first number, and after a hit skip repeated left / right values."
    },
    {
      oops: "Looping `i` up to `nums.length`",
      why: "A triplet needs two more numbers after `i`, so the last useful `i` is `length - 3`.",
      fix: "`for (let i = 0; i < nums.length - 2; i++)`."
    }
  ],

  remember: {
    mnemonic: "Low guards the 0s, high guards the 2s, mid explores. Swapped with high? Mid stays put.",
    rules: [
      "Dutch flag zones: `[0, low)` zeros, `[low, mid)` ones, `(high, end]` twos, `[mid, high]` unknown.",
      "A 0 or a 1 moves `mid` forward. A 2 moves `high` back and keeps `mid`.",
      "3Sum = sort + fix `i` + converging pointers; skip duplicates at all three levels.",
      "4Sum = fix two numbers, then two pointers: O(n³)."
    ],
    template: {
      lines: [
        [`let low = 0, mid = 0, high = n - 1;`, "Three pointers for a three-way partition."],
        [`while (mid <= high) {`, "While the unknown zone is not empty."],
        [`  if (isFirstGroup(nums[mid]))  { swap(low++, mid++); }`, "Belongs at the front: swap and advance both."],
        [`  else if (isMiddle(nums[mid])) { mid++; }`, "Already in the middle zone."],
        [`  else                           { swap(mid, high--); }`, "Belongs at the back: swap and shrink high, mid stays."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/Techniques/TwoPointers/threeSum.js` and `fourSum.js`. In the in-place partition world this is also the idea behind quicksort's three-way partition."
      }
    ]
  },

  practice: {
    title: "Count Unique Triplets That Sum to Zero",
    level: "Medium",
    problem: "Given an array of integers, return **how many unique triplets** of values `[a, b, c]` add up to 0. Two triplets are the same if they contain the same three values (order does not matter).",
    examples: [
      { input: "[-1, 0, 1, 2, -1, -4]", output: "2", why: "The triplets are [-1, -1, 2] and [-1, 0, 1]." },
      { input: "[0, 0, 0, 0]", output: "1", why: "Only one unique triplet: [0, 0, 0]." },
      { input: "[1, 2, 3]", output: "0" }
    ],
    hints: [
      "This is 3Sum, but you only need the **count**. Sort first.",
      "Fix `i`, then use `left` / `right` on the rest. Move left up if the sum is negative, right down if positive.",
      "When you find a triplet, add 1 to the count, move both pointers, and skip repeated values so you do not count the same triplet twice."
    ],
    solution: {
      explain: [
        "Exactly the 3Sum algorithm from the demo, but incrementing a counter instead of storing the triplets. Sorting and skipping equal neighbours is what guarantees each unique triplet is counted once.",
        "Time O(n²), space O(1) besides the sort."
      ],
      code: {
        fn: "countTriplets",
        lines: [
          `function countTriplets(nums) {`,
          [`  nums = nums.slice().sort((a, b) => a - b);`, "Work on a sorted copy (numeric comparison)."],
          [`  let count = 0;`, ""],
          [`  for (let i = 0; i < nums.length - 2; i++) {`, "Fix the first number."],
          [`    if (i > 0 && nums[i] === nums[i - 1]) continue;`, "Skip a repeated first number."],
          [`    let left = i + 1, right = nums.length - 1;`, ""],
          [`    while (left < right) {`, ""],
          [`      const sum = nums[i] + nums[left] + nums[right];`, ""],
          [`      if (sum < 0) left++;`, "Too small: move left up."],
          [`      else if (sum > 0) right--;`, "Too big: move right down."],
          [`      else {`, "A triplet that sums to zero."],
          [`        count++;`, "Count it once."],
          [`        left++; right--;`, ""],
          [`        while (left < right && nums[left] === nums[left - 1]) left++;`, "Skip repeats on the left."],
          [`        while (left < right && nums[right] === nums[right + 1]) right--;`, "Skip repeats on the right."],
          `      }`,
          `    }`,
          `  }`,
          [`  return count;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: [[-1, 0, 1, 2, -1, -4]], expect: 2 },
      { args: [[0, 0, 0, 0]], expect: 1 },
      { args: [[1, 2, 3]], expect: 0 },
      { args: [[]], expect: 0 },
      { args: [[-2, 0, 1, 1, 2]], expect: 2 },
      { args: [[-1, -1, -1, 2, 2]], expect: 1 },
      { args: [[3, 0, -2, -1, 1, 2]], expect: 3 },
      { args: [[0, 0, 0]], expect: 1 }
    ]
  },

  recall: [
    { q: "What do `low`, `mid` and `high` mean in the Dutch National Flag algorithm?", a: "`low` = next spot for a 0, `high` = next spot (from the end) for a 2, `mid` = the item being examined. Between `mid` and `high` everything is still unknown." },
    { q: "After swapping with `high`, why must `mid` stay where it is?", a: "The item that arrived from `high` has not been examined yet and might need moving too." },
    { q: "How does 3Sum get from O(n³) down to O(n²)?", a: "Sort, fix one number with a loop (n), and find the other two with converging pointers (n) instead of a second and third loop." },
    { q: "Where do duplicates get skipped in 3Sum?", a: "For the fixed number (`i`, if equal to the previous) and, after a hit, for `left` and `right`." },
    { q: "Why `i < nums.length - 2` in 3Sum?", a: "A triplet needs two more numbers after `i`, so the last useful `i` is `length - 3`." }
  ],

  related: {
    topics: ["two-pointer", "sliding-window", "binary-search", "quickselect"],
    files: ["Problems/Techniques/TwoPointers/threeSum.js", "Problems/Techniques/TwoPointers/fourSum.js"]
  }
});
