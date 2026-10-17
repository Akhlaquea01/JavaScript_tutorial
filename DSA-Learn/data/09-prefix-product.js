// Prefix Product — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "prefix-product",
  group: "hashing",
  emoji: "✖️",
  title: "Prefix Product",
  tagline: "The prefix-sum idea with multiplication: store running products from the left and from the right, then combine them.",
  level: "Core",
  needs: ["prefix-sum"],

  gist: [
    "Same idea as prefix sums, but each cell stores a **running product** instead of a running sum.",
    "The famous use: **product of array except self**. `left[i]` = product of everything before i, `right[i]` = product of everything after i, and `answer[i] = left[i] × right[i]`.",
    "It avoids **division**, so it works even when the array contains zeros.",
    "O(n) time, and O(1) *extra* space if you reuse the output array."
  ],

  complexity: {
    time: "O(n)",
    space: "O(n), or O(1) extra",
    why: [
      "Each prefix pass (left to right, then right to left) is one loop over n items, so the total is O(n). Answering a position is one multiplication.",
      "Keeping separate `left` and `right` arrays costs O(n) extra memory. You can write the left products straight into the output array and sweep from the right with a single running variable. That needs only the output array itself, so the *extra* space is O(1)."
    ]
  },

  idea: {
    plain: [
      "A prefix product array stores `prefix[i] = nums[0] × nums[1] × … × nums[i]`, exactly like a prefix sum but multiplying.",
      "The classic question is: for every position, what is the product of **all the other** numbers? The tempting trick, “multiply everything and divide by `nums[i]`”, breaks when a number is zero (you would divide by zero, and the other products are different).",
      "The division-free way: the product of all *others* is (everything **before** i) × (everything **after** i). Compute the “before” products in one left-to-right pass, the “after” products in one right-to-left pass, and multiply them."
    ],
    signals: [
      "“Product of array **except self**”.",
      "You must avoid **division**, or the data may contain **zeros**.",
      "You need a product over a range, or over everything except one element."
    ],
    notFor: [
      "Range products over positive numbers when division is allowed: `prefix[R] / prefix[L-1]` is enough (see the first demo).",
      "Long arrays of large numbers. Products overflow quickly, so use `BigInt` or work with sums of logarithms."
    ],
    more: [
      {
        type: "table",
        heading: "Zeros in “product except self”",
        columns: ["Zeros in the array", "Answer"],
        rows: [
          ["None", "Every position has a non-zero answer (you could divide, but you do not need to)"],
          ["Exactly one", "Only the position of the zero is non-zero; every other answer is 0"],
          ["Two or more", "Every answer is 0"]
        ]
      }
    ]
  },

  analogy: {
    title: "A relay team: everyone except you",
    story: [
      "A relay team has n runners, each with a speed multiplier. For runner k you want the combined multiplier of the *other* runners. Instead of recomputing for each runner, walk down the line once keeping a running product of the multipliers **behind** you (left). Then walk back up the line keeping a running product of the multipliers **ahead** of you (right).",
      "For any runner, “everyone else” is simply *what is behind* times *what is ahead*. Nobody is ever divided out, so a zero multiplier causes no trouble."
    ],
    map: [
      ["Multiplier of each runner", "`nums[i]`"],
      ["Product of the runners behind you", "`left[i]`"],
      ["Product of the runners ahead of you", "`right[i]`"],
      ["Everyone except you", "`left[i] * right[i]`"],
      ["Nobody behind the first runner", "`left[0] = 1` (an empty product)"]
    ],
    breaks: "An empty product is defined as **1**, not 0, because multiplying by 1 changes nothing. That is why the first `left` and the last `right` start at 1."
  },

  demos: [
    {
      id: "prefix",
      title: "Running products and a range product (positive numbers)",
      intro: "Exactly like prefix sums, but multiplying. For positive numbers the product of a range is one **division**: `prefix[R] / prefix[L-1]`.",
      codeIntro: "Builds the running products once, then answers any range-product question.",
      viz: "array",
      legend: [["cur", "number being multiplied"], ["good", "prefix[R]"], ["bad", "prefix[L-1] (divided out)"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Positive numbers", value: [2, 3, 1, 4, 2], len: [3, 7], min: 1, max: 6 },
        { type: "number", name: "L", label: "L", value: 1, min: 0, max: 6 },
        { type: "number", name: "R", label: "R", value: 3, min: 0, max: 6 }
      ],
      validate(inp) {
        if (inp.R >= inp.nums.length) return "R must be an index inside the array (0 to " + (inp.nums.length - 1) + ").";
        if (inp.L > inp.R) return "L must not be bigger than R.";
        return null;
      },
      random(rnd) {
        const n = rnd.int(4, 7);
        const L = rnd.int(0, n - 2);
        return { nums: Array.from({ length: n }, () => rnd.int(1, 6)).join(", "), L: String(L), R: String(rnd.int(L, n - 1)) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const { L, R } = inp;
        const prefix = new Array(a.length).fill("?");
        let running = 1;
        const rowOf = (tone) => [{ label: "prefix product", cells: prefix.slice(), tone }];
        const view = (extra) => Object.assign({ label: "nums", cells: a, rows: rowOf(), vars: { running } }, extra);

        snap(view({ at: ["init"], say: "`running` starts at **1**, the neutral value for multiplication (the way 0 is for addition)." }));
        for (let i = 0; i < a.length; i++) {
          running *= a[i];
          prefix[i] = running;
          snap(view({
            at: ["loop", "mul", "store"],
            ptr: { i },
            tone: { [i]: "cur" },
            rows: rowOf({ [i]: "good" }),
            say: "Multiply the running product by nums[" + i + "] = " + a[i] + ": **" + running + "**. Store it as prefix[" + i + "] (the product of nums[0.." + i + "])."
          }));
        }
        const answer = L === 0 ? prefix[R] : prefix[R] / prefix[L - 1];
        const tone = L > 0 ? { [R]: "good", [L - 1]: "bad" } : { [R]: "good" };
        snap(view({
          at: ["query"],
          range: [L, R],
          rows: rowOf(tone),
          vars: { L, R },
          say: "Question: what is the product of nums[" + L + ".." + R + "]? prefix[" + R + "] = **" + prefix[R] + "** is the product of everything up to " + R + (L > 0 ? ". Divide out the unwanted part before L: prefix[" + (L - 1) + "] = **" + prefix[L - 1] + "**." : ". The range starts at 0, so nothing needs removing.")
        }));
        snap(view({
          at: ["query"],
          range: [L, R],
          rows: rowOf(tone),
          vars: { answer },
          out: "Product of nums[" + L + ".." + R + "] = " + answer,
          say: (L > 0 ? prefix[R] + " ÷ " + prefix[L - 1] + " = " : "") + "**" + answer + "**. This division works because every number is positive. A zero would break it, which is why the next demo avoids division.",
          result: answer
        }));
      },
      code: {
        fn: "makeRangeProduct",
        lines: [
          `function makeRangeProduct(nums) {`,
          [`  const prefix = [];`, "", "init"],
          [`  let running = 1;`, "Start at 1: multiplying by 1 changes nothing.", "init"],
          [`  for (const x of nums) {`, "", "loop"],
          [`    running *= x;`, "Multiply the next number in.", "mul"],
          [`    prefix.push(running);`, "prefix[i] = product of nums[0..i].", "store"],
          `  }`,
          [`  return (L, R) => (L === 0 ? prefix[R] : prefix[R] / prefix[L - 1]);`, "Range product = (product up to R) divided by (product before L). Only safe when there are no zeros.", "query"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)(inp.L, inp.R)
    },

    {
      id: "except",
      title: "Product of array except self (no division)",
      intro: "Build **left** products (everything before i) and **right** products (everything after i), then multiply them. Try a `0` in the array: with no division there is no trouble.",
      codeIntro: "Returns an array where position i holds the product of every number except `nums[i]`.",
      viz: "array",
      legend: [["cur", "number used in this step"], ["good", "value just computed"], ["mark", "earlier value reused"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers (zeros allowed)", value: [1, 2, 3, 4], len: [3, 7], min: -4, max: 6 }],
      frames(inp, snap) {
        const a = inp.nums;
        const n = a.length;
        const left = new Array(n).fill("?");
        const right = new Array(n).fill("?");
        const ans = new Array(n).fill("?");
        left[0] = 1;
        right[n - 1] = 1;
        const rows = (t = {}) => [
          { label: "left: product of everything before i", cells: left.slice(), tone: t.left },
          { label: "right: product of everything after i", cells: right.slice(), tone: t.right },
          { label: "answer = left × right", cells: ans.slice(), tone: t.ans }
        ];
        const view = (extra) => Object.assign({ label: "nums", cells: a, rows: rows() }, extra);

        snap(view({
          at: ["init"],
          rows: rows({ left: { 0: "good" }, right: { [n - 1]: "good" } }),
          say: "Nothing comes before the first number and nothing after the last, so `left[0] = 1` and `right[" + (n - 1) + "] = 1` (an empty product is 1)."
        }));
        for (let i = 1; i < n; i++) {
          left[i] = left[i - 1] * a[i - 1];
          snap(view({
            at: ["loopL"],
            ptr: { i },
            tone: { [i - 1]: "cur" },
            rows: rows({ left: { [i]: "good", [i - 1]: "mark" } }),
            say: "left[" + i + "] = left[" + (i - 1) + "] × nums[" + (i - 1) + "] = " + left[i - 1] + " × " + a[i - 1] + " = **" + left[i] + "**: the product of everything before position " + i + "."
          }));
        }
        for (let i = n - 2; i >= 0; i--) {
          right[i] = right[i + 1] * a[i + 1];
          snap(view({
            at: ["loopR"],
            ptr: { i },
            tone: { [i + 1]: "cur" },
            rows: rows({ left: {}, right: { [i]: "good", [i + 1]: "mark" } }),
            say: "right[" + i + "] = right[" + (i + 1) + "] × nums[" + (i + 1) + "] = " + right[i + 1] + " × " + a[i + 1] + " = **" + right[i] + "**: the product of everything after position " + i + "."
          }));
        }
        for (let i = 0; i < n; i++) {
          ans[i] = left[i] * right[i];
          snap(view({
            at: ["answer"],
            ptr: { i },
            tone: { [i]: "cur" },
            rows: rows({ ans: { [i]: "good" }, left: { [i]: "mark" }, right: { [i]: "mark" } }),
            say: "answer[" + i + "] = left[" + i + "] × right[" + i + "] = " + left[i] + " × " + right[i] + " = **" + ans[i] + "**. Before × after = everything except nums[" + i + "]."
          }));
        }
        const zeros = a.filter((x) => x === 0).length;
        snap(view({
          at: ["answer"],
          rows: rows({ ans: DSA.util.span(0, n - 1, "good") }),
          out: "[" + ans.map((x) => (x === 0 ? 0 : x)).join(", ") + "]",
          say: "Done: **[" + ans.map((x) => (x === 0 ? 0 : x)).join(", ") + "]**, with no division. " + (zeros === 0 ? "Try putting a 0 in the array to see how zeros are handled for free." : zeros === 1 ? "There is exactly one zero, so only its own position has a non-zero answer." : "There are two or more zeros, so every answer is 0."),
          result: ans.map((x) => (x === 0 ? 0 : x))
        }));
      },
      code: {
        fn: "productExceptSelf",
        lines: [
          `function productExceptSelf(nums) {`,
          [`  const n = nums.length;`, "", "init"],
          [`  const left = new Array(n).fill(1);`, "`left[i]` will be the product of everything before i. Slot 0 stays 1 (empty product).", "init"],
          [`  const right = new Array(n).fill(1);`, "`right[i]` will be the product of everything after i. The last slot stays 1.", "init"],
          [`  for (let i = 1; i < n; i++) left[i] = left[i - 1] * nums[i - 1];`, "Left to right: extend the previous product by the number just before i.", "loopL"],
          [`  for (let i = n - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1];`, "Right to left: extend the next product by the number just after i.", "loopR"],
          [`  return nums.map((_, i) => left[i] * right[i]);`, "Everything before × everything after = everything except nums[i]. No division anywhere.", "answer"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums).map((x) => (x === 0 ? 0 : x))
    }
  ],

  mistakes: [
    {
      oops: "Computing “total product ÷ `nums[i]`” for every i",
      why: "If `nums[i]` is 0 you divide by zero, and when the array has zeros the division trick gives wrong answers for the other positions.",
      fix: "Use the left × right method, which never divides."
    },
    {
      oops: "Starting `left[0]` or `right[n - 1]` at 0",
      why: "Multiplying by 0 wipes out every product that follows, so all answers become 0.",
      fix: "An empty product is **1**. Start both at 1."
    },
    {
      oops: "Using `nums[i]` instead of `nums[i - 1]` (or `nums[i + 1]`) when extending the product",
      why: "`left[i]` must **exclude** nums[i]. Including it makes the answer include the element you wanted to skip.",
      fix: "`left[i] = left[i - 1] * nums[i - 1]` and `right[i] = right[i + 1] * nums[i + 1]`."
    },
    {
      oops: "Ignoring overflow on long arrays of large numbers",
      why: "Products grow very fast. JavaScript numbers lose exactness beyond about 9 × 10¹⁵.",
      fix: "Use `BigInt` when exact huge products matter."
    }
  ],

  remember: {
    mnemonic: "Everyone except me = (everyone before me) × (everyone after me).",
    rules: [
      "Empty product = **1** (not 0).",
      "`left[i]` excludes `nums[i]`; so does `right[i]`.",
      "No division, so zeros are fine.",
      "Space trick: write `left` into the output array, then sweep from the right with one running variable."
    ],
    template: {
      lines: [
        [`const answer = new Array(n).fill(1);`, "Will hold left products first, then the final answers."],
        [`for (let i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];`, "Left products straight into the output."],
        [`let right = 1;`, "Running product of everything after the current index."],
        [`for (let i = n - 1; i >= 0; i--) { answer[i] *= right; right *= nums[i]; }`, "Multiply in the right product, then include nums[i] for the next step."]
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own file: `Problems/Array/productExceptSelf.js`. Try rewriting it with the one-output-array trick above."
      }
    ]
  },

  practice: {
    title: "Product of Array Except Self (one output array)",
    level: "Medium",
    problem: "Return `answer` where `answer[i]` is the product of all numbers except `nums[i]`. Do **not** use division, and use only the output array as extra memory (O(1) extra space, apart from a few variables).",
    examples: [
      { input: "[1, 2, 3, 4]", output: "[24, 12, 8, 6]" },
      { input: "[-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]", why: "There is exactly one zero, so only its own position is non-zero." }
    ],
    hints: [
      "First pass, left to right: store in `answer[i]` the product of everything **before** i (start with `answer[0] = 1`).",
      "Second pass, right to left: keep one variable `right` holding the product of everything **after** i. Multiply it into `answer[i]`.",
      "After using `nums[i]` in `answer[i]`, update `right *= nums[i]` so it is ready for index i - 1."
    ],
    solution: {
      explain: [
        "The left array and the output array are the same array. A single `right` variable replaces the whole right array. After the second pass, `answer[i]` = (product before i) × (product after i).",
        "Time O(n), extra space O(1) (the output does not count)."
      ],
      code: {
        fn: "productExceptSelf",
        lines: [
          `function productExceptSelf(nums) {`,
          [`  const n = nums.length;`, ""],
          [`  const answer = new Array(n).fill(1);`, "The output. It first holds the left products."],
          [`  for (let i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];`, "Left pass: answer[i] = product of everything before i."],
          [`  let right = 1;`, "Product of everything after the current index."],
          [`  for (let i = n - 1; i >= 0; i--) {`, "Right pass, from the end."],
          [`    answer[i] *= right;`, "Multiply in the product of everything after i."],
          [`    right *= nums[i];`, "Now include nums[i] for the next (smaller) index."],
          `  }`,
          [`  return answer;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: [[1, 2, 3, 4]], expect: [24, 12, 8, 6] },
      { args: [[-1, 1, 0, -3, 3]], expect: [0, 0, 9, 0, 0] },
      { args: [[2, 3]], expect: [3, 2] },
      { args: [[0, 0]], expect: [0, 0] },
      { args: [[5]], expect: [1] },
      { args: [[1, 0]], expect: [0, 1] },
      { args: [[4, 0, 2]], expect: [0, 8, 0] },
      { args: [[]], expect: [] }
    ]
  },

  recall: [
    { q: "Why not just divide the total product by `nums[i]`?", a: "If `nums[i]` is 0 you would divide by zero, and zeros make the total product 0 for every position. The left × right method avoids division entirely." },
    { q: "What do `left[i]` and `right[i]` mean?", a: "`left[i]` is the product of every number before i; `right[i]` is the product of every number after i. Neither includes `nums[i]`." },
    { q: "What do `left[0]` and `right[n-1]` start as, and why?", a: "1, because an empty product is 1 (multiplying by 1 changes nothing)." },
    { q: "How can you do it with O(1) extra space?", a: "Store the left products in the output array, then sweep from the right keeping one `right` variable and multiply it into each answer." },
    { q: "What happens with one zero, and with two zeros?", a: "One zero: only that position's answer is non-zero. Two or more zeros: every answer is 0." }
  ],

  related: {
    topics: ["prefix-sum", "hashmap", "two-pointer"],
    files: ["Problems/Array/productExceptSelf.js"]
  }
});
