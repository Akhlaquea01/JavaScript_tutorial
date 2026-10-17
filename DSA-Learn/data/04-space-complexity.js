// Space Complexity — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "space-complexity",
  group: "basics",
  emoji: "💾",
  title: "Space Complexity",
  tagline: "How much *extra* memory your code needs as the input grows. Count what you create, not the input you were handed.",
  level: "Starter",
  needs: ["time-complexity"],

  gist: [
    "Space complexity is the **extra memory** your code uses as n grows. The input itself is **not** counted (this is called *auxiliary* space).",
    "What counts: new arrays and objects, hash maps and sets, stacks and queues, and the **recursion call stack**.",
    "A few variables = **O(1)**. A new array of n items = **O(n)**. Recursion n levels deep = **O(n)**, even with no array at all.",
    "Time and space are often a trade: a hash set makes duplicate-checking O(n) time but costs O(n) space."
  ],

  complexity: {
    time: "see Time Complexity",
    space: "O(1) up to O(n²)",
    why: [
      "Memory is measured the same way as time: as a function of n, dropping constants. Ten variables or two variables are both O(1) because neither grows with the input.",
      "Anything whose size grows with n counts: a copy of the input is O(n), an n × n table is O(n²), a call stack n frames deep is O(n)."
    ],
    more: [
      {
        type: "table",
        heading: "Quick guide",
        columns: ["What the code creates", "Extra space"],
        rows: [
          ["A handful of variables or pointers", "O(1)"],
          ["A new array / Set / Map holding up to n items", "O(n)"],
          ["An n × m grid or table", "O(n · m)"],
          ["Recursion that goes n levels deep", "O(n) (call stack)"],
          ["Recursion that halves the problem (binary search, balanced tree)", "O(log n) (call stack)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Every program needs memory. **Space complexity** asks: as the input grows, how much *extra* memory does my code need on top of the input it was given?",
      "Count the things your code **builds**: new arrays or objects, hash maps and sets, stacks and queues. Do **not** count the input array or string itself.",
      "The classic trap is **recursion**. A recursive function that creates no array can still use O(n) memory, because every call that has not finished yet sits on the *call stack*, and a call n levels deep means n stacked frames."
    ],
    signals: [
      "The problem says **“in place”** or “with O(1) extra space”.",
      "A memory limit is mentioned, or n is very large.",
      "Your solution is **recursive** and the depth could be large.",
      "You are choosing between a faster solution that uses a Set / Map and a slower one that uses none."
    ],
    notFor: [
      "Shaving memory when time is the real problem. Clear code with a little extra memory often wins.",
      "Mutating the input “to save space” when the caller still needs the original data."
    ],
    more: [
      {
        type: "callout",
        kind: "warning",
        text: "**Recursion trap:** a recursive function with no extra array is *not* O(1) space. Check the **depth**: n levels deep means O(n) memory, and in JavaScript a very deep recursion crashes with “Maximum call stack size exceeded”."
      }
    ]
  },

  analogy: {
    title: "Your desk while solving an exam",
    story: [
      "The exam paper is the **input**. It is given to you, so it does not count as extra. Everything else you put on your desk is **extra space**: a single number jotted in the margin is O(1). A scratch page where you copy the whole paper is O(n). A grid you draw with n rows and n columns is O(n²).",
      "**Recursion** is like starting a fresh worksheet for every sub-question and keeping each half-finished worksheet on the desk until its sub-question is answered. A chain n questions deep leaves n worksheets piled up, even if each sheet has only one number on it."
    ],
    map: [
      ["The exam paper you were given", "The input (not counted)"],
      ["A number in the margin", "A variable: O(1)"],
      ["Copying the paper onto scratch paper", "A new array of n items: O(n)"],
      ["A grid of n × n boxes", "A 2D table: O(n²)"],
      ["One unfinished worksheet per sub-question", "One call-stack frame per active recursive call"],
      ["Erasing and reusing the margin", "Working “in place”: O(1)"]
    ],
    breaks: "A real desk has a fixed size, while a program's memory can usually grow until it runs out. Also, JavaScript's garbage collector frees memory you stop using, so only what is alive *at the same time* really matters."
  },

  demos: [
    {
      id: "stackdepth",
      title: "Recursion uses memory even with no arrays",
      intro: "`sumTo(n)` creates no array, only one number per call, yet look at the **call stack** grow to n frames before anything is added. Try a larger n.",
      codeIntro: "Adds 1 + 2 + … + n recursively. (A simple loop would do the same job with a single variable.)",
      viz: "none",
      legend: [],
      inputs: [{ type: "number", name: "n", label: "n", value: 5, min: 1, max: 9 }],
      frames(inp, snap) {
        const stack = [];
        let deepest = 0;
        const box = (fresh) => ({ label: "call stack", hint: "newest call on top", kind: "stack", items: stack.map((f, k) => ({ v: f, new: fresh && k === stack.length - 1 })) });
        const sumTo = (n) => {
          stack.push("sumTo(" + n + ")");
          deepest = Math.max(deepest, stack.length);
          snap({ at: ["base"], boxes: [box(true)], vars: { depth: stack.length }, say: "Call **sumTo(" + n + ")**. It cannot finish yet, because it must wait for sumTo(" + (n - 1) + ")'s answer. The call stack now holds **" + stack.length + "** frame" + (stack.length > 1 ? "s" : "") + "." });
          let value;
          if (n === 0) {
            value = 0;
            snap({ at: ["base"], boxes: [box(false)], vars: { depth: stack.length }, say: "**Base case:** sumTo(0) returns 0 immediately. This is the deepest point: **" + stack.length + "** frames are stacked at once." });
          } else {
            value = n + sumTo(n - 1);
          }
          stack.pop();
          snap({ at: ["back"], boxes: [box(false)], vars: { depth: stack.length, returned: value }, say: "sumTo(" + n + ") returns **" + value + "** and its frame leaves the stack." });
          return value;
        };
        snap({ at: ["start"], boxes: [box(false)], vars: { depth: 0 }, say: "We call `sumTo(" + inp.n + ")`. There is no array and no big variable. Watch the memory used by the **call stack** instead." });
        const result = sumTo(inp.n);
        snap({ at: ["back"], boxes: [box(false)], vars: { depth: 0, "max depth": deepest }, out: "Result " + result + ", with up to " + deepest + " frames on the stack at once", say: "The answer is **" + result + "**, but at its worst the stack held **" + deepest + "** frames (n + 1). So the extra space is **O(n)**, even though we never created an array.", result });
      },
      code: {
        fn: "sumTo",
        lines: [
          [`function sumTo(n) {`, "Solves a problem of size n by first solving size n - 1.", "start"],
          [`  if (n === 0) return 0;`, "Base case: stops the stacking.", "base"],
          [`  return n + sumTo(n - 1);`, "The addition waits until the inner call returns, so this call stays on the stack. n calls deep means n frames: O(n) space.", "back"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.n)
    },

    {
      id: "extra",
      title: "Extra memory that grows with the data: a Set",
      intro: "Counting distinct values with a **Set**: the Set can end up holding as many items as the input, so its memory is O(n). Add duplicates and it stays smaller.",
      codeIntro: "Returns how many different values the array contains.",
      viz: "array",
      legend: [["cur", "number being added"], ["good", "new in the Set"], ["done", "already in the Set"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [4, 7, 4, 2, 7, 9, 2], len: [3, 10], min: 1, max: 12 }],
      frames(inp, snap) {
        const span = DSA.util.span;
        const a = inp.nums;
        const set = new Set();
        const box = (hot) => ({ label: "Set (the extra memory)", hint: "holds each different value once", kind: "set", items: [...set].map((v) => ({ v, new: v === hot })) });
        const view = (extra) => Object.assign({ label: "nums", cells: a, boxes: [box()], vars: { "items in Set": set.size } }, extra);

        snap(view({ at: ["init"], say: "The Set starts empty. Every different value we meet will take one slot of **extra** memory (the input array itself does not count)." }));
        for (let i = 0; i < a.length; i++) {
          const fresh = !set.has(a[i]);
          set.add(a[i]);
          snap(view({
            at: ["loop", "add"],
            ptr: { i },
            tone: { ...span(0, i - 1, "done"), [i]: fresh ? "good" : "cur" },
            boxes: [box(fresh ? a[i] : undefined)],
            say: fresh ? a[i] + " is new, so the Set grows to **" + set.size + "** item" + (set.size > 1 ? "s" : "") + "." : a[i] + " is already in the Set, so memory stays at **" + set.size + "**."
          }));
        }
        snap(view({
          at: ["done"],
          tone: span(0, a.length - 1, "done"),
          out: set.size + " different values: the Set used " + set.size + " slots for " + a.length + " numbers",
          say: "**" + set.size + "** different values, so the Set used **" + set.size + "** slots. In the worst case (all values different) it would hold n items, which is why the extra space is **O(n)**.",
          result: set.size
        }));
      },
      code: {
        fn: "countDistinct",
        lines: [
          `function countDistinct(nums) {`,
          [`  const seen = new Set();`, "The extra memory. Its size depends on the data.", "init"],
          [`  for (const x of nums) {`, "One pass over the input.", "loop"],
          [`    seen.add(x);`, "Adds a slot only for a value not seen before. Worst case: n slots, so O(n) space.", "add"],
          `  }`,
          [`  return seen.size;`, "The answer is the number of slots the Set used.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    },

    {
      id: "inplace",
      title: "O(1) extra space: reverse an array in place",
      intro: "Two pointers swap pairs from the ends toward the middle. Whatever the array size, we only ever use **two indexes and one temporary value**: O(1) extra space.",
      codeIntro: "Reverses the array itself (mutating it) and returns it.",
      viz: "array",
      legend: [["cur", "pair being swapped"], ["done", "already in final place"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [1, 2, 3, 4, 5, 6], len: [2, 10], min: 1, max: 99 }],
      frames(inp, snap) {
        const a = inp.nums.slice();
        let left = 0;
        let right = a.length - 1;
        const done = () => ({ ...DSA.util.span(0, left - 1, "done"), ...DSA.util.span(right + 1, a.length - 1, "done") });
        const view = (extra) => Object.assign({ label: "nums", cells: a, ptr: { left, right } }, extra);

        snap(view({ at: ["init"], say: "Two index variables, **left** and **right**, start at the two ends. They are the *only* extra memory we need." }));
        while (left < right) {
          const l = a[left];
          const r = a[right];
          snap(view({ at: ["loop", "swap"], tone: { ...done(), [left]: "cur", [right]: "cur" }, vars: { temp: l }, say: "Hold " + l + " in one temporary variable `temp`, then put " + r + " where " + l + " was, and `temp` where " + r + " was." }));
          a[left] = r;
          a[right] = l;
          snap(view({ at: ["swap"], tone: { ...done(), [left]: "good", [right]: "good" }, vars: { temp: l }, say: "Swapped: positions " + left + " and " + right + " now hold " + a[left] + " and " + a[right] + "." }));
          left++;
          right--;
        }
        snap(view({
          at: ["done"],
          ptr: {},
          tone: DSA.util.span(0, a.length - 1, "done"),
          out: "Reversed in place: [" + a.join(", ") + "]",
          say: "The pointers met in the middle, so the array is **reversed**. No new array was created: extra space is **O(1)**, however long the array is.",
          result: a.slice()
        }));
      },
      code: {
        fn: "reverseInPlace",
        lines: [
          `function reverseInPlace(nums) {`,
          [`  let left = 0, right = nums.length - 1;`, "Two indexes: constant memory.", "init"],
          [`  while (left < right) {`, "Until the pointers meet in the middle.", "loop"],
          [`    const temp = nums[left];`, "One temporary value so the swap does not lose a number.", "swap"],
          [`    nums[left] = nums[right];`, "", "swap"],
          [`    nums[right] = temp;`, "", "swap"],
          [`    left++; right--;`, "", "swap"],
          `  }`,
          [`  return nums;`, "The same array, now reversed. No second array was ever built.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums.slice())
    }
  ],

  mistakes: [
    {
      oops: "Claiming a recursive solution uses O(1) space",
      why: "Every unfinished call occupies a stack frame. A recursion n levels deep uses O(n) memory, and in JavaScript it can crash with “Maximum call stack size exceeded”.",
      fix: "State the depth: “O(n) call stack” for a linear chain, “O(log n)” if the problem halves each level."
    },
    {
      oops: "Counting the input array as extra space",
      why: "Space complexity (auxiliary space) is only what *your code adds*. The input was already there.",
      fix: "Count the new arrays, sets, maps, stacks, queues and the recursion depth."
    },
    {
      oops: "Calling an n × m table O(n)",
      why: "A 2D grid has n × m cells, and that is what you store.",
      fix: "Write O(n · m), or O(n²) for a square table."
    },
    {
      oops: "Creating copies inside a loop: `arr.slice()`, `[...arr]`, string `+=`",
      why: "Each copy is O(n). Doing it n times churns O(n²) work and memory, even though only one copy is alive at once.",
      fix: "Mutate in place (when allowed) or build the result once and join at the end."
    },
    {
      oops: "Saving space by mutating the input when the caller still needs it",
      why: "“In place” changes the original data, which can surprise the code that called you.",
      fix: "Only work in place when the problem says so, or copy once on purpose."
    }
  ],

  remember: {
    mnemonic: "Extra, not total: count what you build, plus the call stack.",
    rules: [
      "Input does **not** count. New arrays, sets, maps, stacks, queues and recursion depth **do**.",
      "A few variables → O(1). A structure that grows with n → O(n). A table of n × n → O(n²).",
      "Recursion depth d → O(d) space. Halving recursion → O(log n).",
      "In-place trick: two pointers, swap, overwrite the input (only if mutating is allowed)."
    ],
    template: {
      lines: [
        [`// Space = (what I create that grows with n) + (recursion depth)`, "Add the two, keep the biggest term."],
        [`// new Array(n) / new Set / new Map  → O(n)`, "Grows with the input."],
        [`// a few variables and pointers       → O(1)`, "Fixed size."],
        [`// recursion n deep                   → O(n)`, "One frame per unfinished call."]
      ]
    }
  },

  practice: {
    title: "Move Zeroes (in place)",
    level: "Easy",
    problem: "Given an array `nums`, move every `0` to the end **in place**, keeping the order of the non-zero numbers. Do not create a second array: use O(1) extra space. Return the same array.",
    examples: [
      { input: "[0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "[0]", output: "[0]" }
    ],
    hints: [
      "You cannot build a second array. Think of two pointers moving in the same direction: one *reads* every element, one marks where the next non-zero belongs.",
      "Keep a `write` index at 0. Scan with `read`. When `nums[read]` is not zero, copy it to `nums[write]` and increase `write`.",
      "After the scan, every slot from `write` to the end must become 0."
    ],
    solution: {
      explain: [
        "Read/write pointers (see the Two Pointers topic): non-zero values are copied to the front in their original order. Whatever is left after `write` is filled with zeroes.",
        "Time O(n), extra space **O(1)**. The version in `Problems/Array/moveZeroes.js` builds a second array, which is O(n) space."
      ],
      code: {
        fn: "moveZeroes",
        lines: [
          `function moveZeroes(nums) {`,
          [`  let write = 0;`, "Next slot for a non-zero value."],
          [`  for (let read = 0; read < nums.length; read++) {`, "Scan every element."],
          [`    if (nums[read] !== 0) nums[write++] = nums[read];`, "Keep non-zero values, in order, at the front."],
          `  }`,
          [`  while (write < nums.length) nums[write++] = 0;`, "Fill the rest with zeroes."],
          [`  return nums;`, "Same array, modified in place."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[0, 1, 0, 3, 12]], expect: [1, 3, 12, 0, 0] },
      { args: [[0]], expect: [0] },
      { args: [[1, 2, 3]], expect: [1, 2, 3] },
      { args: [[0, 0, 1]], expect: [1, 0, 0] },
      { args: [[]], expect: [] },
      { args: [[4, 0, 0, 5, 0, 6]], expect: [4, 5, 6, 0, 0, 0] }
    ]
  },

  recall: [
    { q: "What does space complexity count, and what does it leave out?", a: "It counts the **extra** memory your code uses (new arrays, sets, maps, stacks, queues, recursion depth). It leaves out the input itself." },
    { q: "Why is a recursive sum of 1..n O(n) space even without an array?", a: "Each unfinished call keeps a frame on the call stack, so n nested calls means n frames at once." },
    { q: "What is the extra space of reversing an array with two pointers?", a: "O(1): two indexes and one temporary variable, regardless of the array length." },
    { q: "Time versus space: give an example of trading one for the other.", a: "Detecting a duplicate with a Set is O(n) time but O(n) space. Comparing every pair uses O(1) space but O(n²) time." },
    { q: "How much space does a recursion that halves the problem each level use?", a: "O(log n): the depth is about log n, one stack frame per level." }
  ],

  related: {
    topics: ["time-complexity", "recursion", "two-pointer", "hashset"],
    files: ["Problems/Array/moveZeroes.js", "Problems/Array/reverseArray.js", "Problems/ComplexityAnalysis/compareGrowthRates.js"]
  }
});
