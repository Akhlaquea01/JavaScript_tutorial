// Quickselect (Kth element in O(n)) — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const list = (a) => a.join(", ");
  const ord = (n) => n + ["th", "st", "nd", "rd"][n % 100 > 10 && n % 100 < 14 ? 0 : n % 10 < 4 ? n % 10 : 0];

  // zone colours for a partition in progress: [lo, i) small = good, [i, j) big = bad, pivot = mark
  const zones = (lo, i, j, hi) => {
    const t = {};
    for (let x = lo; x < i; x++) t[x] = "good";
    for (let x = i; x < j; x++) t[x] = "bad";
    t[hi] = "mark";
    return t;
  };

  const PARTITION_CODE = {
    fn: "PARTITION",
    lines: [
      `function PARTITION(arr) {`,
      `  const a = arr.slice();`,
      `  const hi = a.length - 1;`,
      [`  const pivot = a[hi];`, "Pick the **last** element as the pivot. (Any element would do.)", "pivot"],
      [`  let i = 0;`, "**i** = the boundary: everything left of i is smaller than the pivot.", "pivot"],
      [`  for (let j = 0; j < hi; j++) {`, "**j** scans every element before the pivot.", "compare"],
      [`    if (a[j] < pivot) {`, "Smaller than the pivot? It belongs in the left zone.", "compare"],
      [`      [a[i], a[j]] = [a[j], a[i]];`, "Swap it to the boundary spot i...", "swap"],
      [`      i++;`, "...and the left zone grows by one.", "swap"],
      `    }`,
      `  }`,
      [`  [a[i], a[hi]] = [a[hi], a[i]];`, "Finally drop the pivot in the gap between the two zones. It is now in its **final sorted position**.", "place"],
      [`  return { arr: a, p: i };`, "p = the pivot's final index.", "place"],
      `}`
    ]
  };

  const QS_CODE = {
    fn: "QUICKSELECT",
    lines: [
      `function QUICKSELECT(nums, k) {`,
      `  const a = nums.slice();`,
      [`  const target = a.length - k;`, "In sorted (ascending) order the k-th **largest** sits at index n - k. We never sort, but this is the index we are hunting.", "target"],
      [`  let lo = 0, hi = a.length - 1;`, "The part of the array that can still hold the answer.", "target"],
      [`  while (lo <= hi) {`, "", "pivot"],
      [`    const pivot = a[hi];`, "Last element of the range is the pivot.", "pivot"],
      `    let i = lo;`,
      `    for (let j = lo; j < hi; j++) {`,
      [`      if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }`, "Partition (previous demo): smaller values go to the left zone.", "partition"],
      `    }`,
      [`    [a[i], a[hi]] = [a[hi], a[i]];`, "The pivot lands at index i, its final sorted spot.", "partition"],
      [`    if (i === target) return a[i];`, "Lucky: the pivot is exactly the element we wanted. Done.", "found"],
      [`    if (i < target) lo = i + 1;`, "The pivot is too far left: the answer must be on its **right**.", "decide"],
      [`    else hi = i - 1;`, "The pivot is too far right: the answer must be on its **left**.", "decide"],
      `  }`,
      `}`
    ]
  };

  const COMPARE_CODE = {
    fn: "COUNT_COMPARISONS",
    lines: [
      `function COUNT_COMPARISONS(n, pivotRule) {`,
      [`  const a = Array.from({ length: n }, (_, i) => i + 1);`, "The worst kind of input for a bad pivot: already sorted, 1..n.", "setup"],
      [`  const target = n >> 1;`, "We hunt for the middle element.", "setup"],
      `  let lo = 0, hi = n - 1, comparisons = 0;`,
      `  while (lo <= hi) {`,
      [`    if (pivotRule === "middle") { const m = (lo + hi) >> 1; [a[m], a[hi]] = [a[hi], a[m]]; }`, "**Rule “middle”**: swap the middle element to the end and use it as the pivot. **Rule “last”**: use whatever is at the end.", "rule"],
      `    const pivot = a[hi];`,
      `    let i = lo;`,
      `    for (let j = lo; j < hi; j++) {`,
      [`      comparisons++;`, "One comparison per element in the range.", "count"],
      `      if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }`,
      `    }`,
      `    [a[i], a[hi]] = [a[hi], a[i]];`,
      `    if (i === target) break;`,
      `    if (i < target) lo = i + 1; else hi = i - 1;`,
      `  }`,
      [`  return comparisons;`, "", "done"],
      `}`
    ]
  };

  const countComparisons = (n, rule) => {
    const a = Array.from({ length: n }, (_, i) => i + 1);
    const target = n >> 1;
    let lo = 0, hi = n - 1, comparisons = 0;
    while (lo <= hi) {
      if (rule === "middle") { const m = (lo + hi) >> 1; [a[m], a[hi]] = [a[hi], a[m]]; }
      const pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        comparisons++;
        if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      if (i === target) break;
      if (i < target) lo = i + 1; else hi = i - 1;
    }
    return comparisons;
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "quickselect",
    group: "heaps",
    emoji: "🎯",
    title: "Quickselect (Kth Element in O(n))",
    tagline: "Find the k-th smallest or largest without sorting: partition around a pivot, then keep looking only on the one side that must hold the answer. O(n) on average, O(1) extra memory.",
    level: "Core",
    needs: ["binary-search", "two-pointer"],

    gist: [
      "To find the **k-th** smallest/largest you do not need the whole array sorted, only **one element in its final place**.",
      "**Partition** around a pivot: smaller values go left, bigger go right, and the pivot lands at its **final sorted index p**.",
      "If p is the index you want, done. Otherwise **recurse into only one side** (the side that contains the target index), unlike QuickSort which does both.",
      "**O(n)** average, **O(n²)** worst case (a bad pivot; a random pivot avoids it), **O(1)** extra space, but it **reorders the input** and needs all the data up front."
    ],

    complexity: {
      time: "O(n) average · O(n²) worst",
      space: "O(1)",
      why: [
        "On average each partition leaves about half of the array, so the work is n + n/2 + n/4 + … ≈ 2n, which is O(n). In the worst case the pivot is always the smallest or largest value (for instance a sorted array with the last element as pivot): each round removes only one element and the total is n + (n−1) + (n−2) + … = O(n²).",
        "A **random pivot** (or median-of-three) makes the bad case extremely unlikely. The loop is iterative, so no recursion stack: O(1) extra space. The array is partially rearranged in place."
      ],
      more: [
        {
          type: "table",
          heading: "Quickselect vs heap vs sort (for the k-th largest)",
          columns: ["", "Sort", "Min-heap of size k", "Quickselect"],
          rows: [
            ["Time", "O(n log n)", "O(n log k)", "O(n) average, O(n²) worst"],
            ["Extra space", "O(1) or O(n)", "O(k)", "O(1)"],
            ["Works on a stream", "No", "Yes", "No (needs the whole array)"],
            ["Changes the input", "Yes (or copy)", "No", "Yes (reorders it)"],
            ["Use it when", "Simple, small n", "Stream, small k, read-only data", "One-shot, offline, fastest wanted"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Quickselect is **QuickSort that gives up early**. QuickSort picks a **pivot**, moves every smaller value to its left and every bigger value to its right (this is called a **partition**), and then sorts both sides. After one partition the pivot is already at the exact index it would have in the fully sorted array.",
        "That is all we need. Suppose we want the value that belongs at sorted index `target`. After partitioning we know the pivot's index `p`. If `p === target`, the pivot is the answer. If `p < target`, the answer is somewhere **right** of the pivot, so forget the left side completely. If `p > target`, forget the right side. Each round throws away a chunk of the array.",
        "The k-th **smallest** is at index `k - 1` of the sorted array, and the k-th **largest** is at index `n - k`. The partition itself (Lomuto scheme): scan with `j`, and whenever `a[j]` is smaller than the pivot, swap it to the boundary `i` and move the boundary on. At the end swap the pivot into the gap."
      ],
      signals: [
        "“**Kth largest / smallest**” in an **array that is fully in memory**, once, and you want it fast: O(n) average.",
        "“**K closest points**” or “K largest” where order does not matter: after quickselect the first (or last) k positions hold the answer, unsorted.",
        "Median of an array in linear time."
      ],
      notFor: [
        "A **stream** or data that does not fit in memory: use a heap of size k.",
        "You must not modify the input, or you need a guaranteed O(n log n) worst case.",
        "You need the k elements **sorted**: sort just those k afterwards."
      ],
      more: [
        {
          type: "points",
          heading: "Making it robust",
          items: [
            "**Random pivot**: before partitioning swap a random element of the range into the last spot (`const r = lo + Math.floor(Math.random() * (hi - lo + 1)); [a[r], a[hi]] = [a[hi], a[r]];`). Bad inputs stop mattering; the expected time is O(n).",
            "**Many duplicates**: the Lomuto partition degrades. Use a **3-way partition** (smaller / equal / bigger) like the Dutch National Flag, which is the practice problem.",
            "**Median-of-medians** gives a guaranteed O(n) but is heavy to implement: rarely needed.",
            "**Bonus**: when Quickselect finishes, positions `target … n-1` hold the k largest values, in no particular order. That is “top K without sorting”."
          ]
        }
      ]
    },

    analogy: {
      title: "Finding the 5th tallest without lining everyone up",
      story: [
        "You are in a hall of 100 people and need to find who is the 5th tallest. Lining everybody up by height would take ages. Instead pick **one person** (the pivot) and ask everyone to stand either on their left (shorter) or on their right (taller). Now you know that person's exact rank: say there are 60 people on the shorter side, so the pivot is 61st from the bottom, and therefore **40th tallest**.",
        "The 5th tallest is obviously among the 39 taller people on the right, so the 60 on the left can **go home** and never be looked at again. Pick a new pivot among the taller group, split again, and repeat. Each round sends a big chunk of people home, so it ends quickly."
      ],
      map: [
        ["Pick a person as reference", "Choose the pivot"],
        ["Shorter to the left, taller to the right", "Partition"],
        ["Now the reference's exact rank is known", "The pivot is at its final sorted index p"],
        ["Send the wrong group home", "Recurse into only one side"],
        ["Rank 5th tallest", "Target index n − k"]
      ],
      breaks: "If your reference person is always the very shortest, almost nobody goes home each round and it takes forever. That is the worst case, and picking the reference at random avoids it."
    },

    demos: [
      {
        id: "partition",
        title: "One partition around the last element",
        intro: "The last number is the **pivot**. Scan `j` from the left. Every number **smaller** than the pivot is swapped into the left zone (green) at the boundary `i`. Bigger numbers (red) stay on the right. In the end the pivot is placed between the zones: its final sorted position.",
        codeIntro: "This is the Lomuto partition scheme, the building block of Quickselect and QuickSort.",
        viz: "array",
        legend: [["good", "smaller than the pivot"], ["bad", "bigger or equal"], ["cur", "j: being examined"], ["mark", "the pivot"]],
        inputs: [{ type: "numlist", name: "nums", label: "Numbers (the last one is the pivot)", value: [3, 8, 2, 5, 1, 4, 6], len: [3, 10], min: 1, max: 99 }],
        frames(inp, snap) {
          const a = inp.nums.slice();
          const hi = a.length - 1;
          const pivot = a[hi];
          let i = 0;
          snap({ at: ["pivot"], cells: a.slice(), tone: { [hi]: "mark" }, ptr: { i: 0, j: 0 }, vars: { pivot }, say: "The pivot is the last number, **" + pivot + "**. The goal: everything smaller than " + pivot + " on its left, everything else on its right. **i** is the boundary of the left zone (empty for now), **j** scans." });
          for (let j = 0; j < hi; j++) {
            const small = a[j] < pivot;
            const t = zones(0, i, j, hi);
            t[j] = "cur";
            snap({ at: ["compare"], cells: a.slice(), tone: t, ptr: { i, j }, vars: { pivot, i, j }, say: small ? "**" + a[j] + "** is smaller than the pivot " + pivot + ", so it belongs in the left zone. Swap it with the number at boundary **i = " + i + "**" + (i === j ? " (the same spot, so nothing visibly moves)" : "") + " and move the boundary on." : "**" + a[j] + "** is not smaller than the pivot " + pivot + ", so it stays on the right. Just move j on." });
            if (small) {
              [a[i], a[j]] = [a[j], a[i]];
              i++;
              const t2 = zones(0, i, j + 1, hi);
              snap({ at: ["swap"], cells: a.slice(), tone: t2, ptr: { i, j }, vars: { pivot, i, j }, say: "Swapped. The left zone (green) now has **" + i + "** number" + (i === 1 ? "" : "s") + ", all smaller than " + pivot + "." });
            }
          }
          [a[i], a[hi]] = [a[hi], a[i]];
          const done = {};
          for (let x = 0; x < i; x++) done[x] = "good";
          for (let x = i + 1; x <= hi; x++) done[x] = "bad";
          done[i] = "mark";
          snap({ at: ["place"], cells: a.slice(), tone: done, ptr: { p: i }, vars: { pivot, p: i }, out: "pivot " + pivot + " is now at index " + i, say: "Swap the pivot into the gap at index **" + i + "**. Now **" + pivot + "** is exactly where it would be in the fully sorted array: " + i + " numbers are smaller (left) and " + (hi - i) + " are bigger or equal (right). Both sides are still unsorted, and that is fine.", result: { arr: a.slice(), p: i } });
        },
        code: PARTITION_CODE,
        call: (fn, inp) => fn(inp.nums)
      },

      {
        id: "select",
        title: "Quickselect: find the k-th largest",
        intro: "Each round partitions only the **active range** (the rest is faded). The pivot lands at index `p`. If `p` equals the **target** index (`n - k`), we are done; otherwise we continue on the one side that contains the target. The default is the 2nd largest of `3 2 1 5 6 4`.",
        codeIntro: "The partition is the same as before, now wrapped in a loop that narrows `lo` and `hi`.",
        viz: "array",
        legend: [["mark", "the pivot"], ["good", "smaller than pivot"], ["bad", "bigger or equal"]],
        inputs: [
          { type: "numlist", name: "nums", label: "Numbers", value: [3, 2, 1, 5, 6, 4], len: [3, 10], min: 1, max: 99 },
          { type: "number", name: "k", label: "k (k-th largest)", value: 2, min: 1, max: 10 }
        ],
        validate: (inp) => (inp.k > inp.nums.length ? "k can not be bigger than the number of values." : null),
        random(rnd) {
          const len = rnd.int(3, 10);
          return { nums: list(Array.from({ length: len }, () => rnd.int(1, 30))), k: String(rnd.int(1, len)) };
        },
        frames(inp, snap) {
          const a = inp.nums.slice();
          const n = a.length;
          const target = n - inp.k;
          let lo = 0, hi = n - 1;
          let round = 0;
          snap({ at: ["target"], cells: a.slice(), range: [lo, hi], ptr: { target }, vars: { k: inp.k, target }, say: "We want the **" + ord(inp.k) + " largest** of " + n + " numbers. In the sorted array it would sit at index **" + n + " − " + inp.k + " = " + target + "**. We will not sort; we only need to find which number ends up at index " + target + "." });
          while (lo <= hi) {
            round++;
            const pivot = a[hi];
            snap({ at: ["pivot"], cells: a.slice(), range: [lo, hi], tone: { [hi]: "mark" }, ptr: { target }, vars: { round, lo, hi, pivot }, say: "**Round " + round + ".** Only positions " + lo + " to " + hi + " are still candidates. The pivot is the last of them: **" + pivot + "**." });
            let i = lo;
            for (let j = lo; j < hi; j++) {
              if (a[j] < pivot) {
                [a[i], a[j]] = [a[j], a[i]];
                i++;
              }
            }
            [a[i], a[hi]] = [a[hi], a[i]];
            const t = {};
            for (let x = lo; x < i; x++) t[x] = "good";
            for (let x = i + 1; x <= hi; x++) t[x] = "bad";
            t[i] = "mark";
            snap({ at: ["partition"], cells: a.slice(), range: [lo, hi], tone: t, ptr: { p: i, target }, vars: { round, pivot, p: i, target }, say: "After partitioning, **" + pivot + "** sits at index **p = " + i + "**: its final sorted place. Smaller numbers are on its left, the rest on its right." });
            if (i === target) {
              snap({ at: ["found"], cells: a.slice(), range: [lo, hi], tone: { [i]: "good" }, ptr: { p: i, target }, vars: { p: i, target }, out: ord(inp.k) + " largest = " + a[i], say: "**p equals the target index " + target + "**, so the pivot is exactly the number we wanted: the " + ord(inp.k) + " largest is **" + a[i] + "**. We finished without sorting.", result: a[i] });
              return;
            }
            if (i < target) {
              lo = i + 1;
              snap({ at: ["decide"], cells: a.slice(), range: [lo, hi], tone: t, ptr: { p: i, target }, vars: { round, p: i, target, lo, hi }, say: "p = " + i + " is **left** of the target " + target + ", so the answer must be on the right of the pivot. Set **lo = " + lo + "**: everything on the left is ignored from now on." });
            } else {
              hi = i - 1;
              snap({ at: ["decide"], cells: a.slice(), range: [lo, hi], tone: t, ptr: { p: i, target }, vars: { round, p: i, target, lo, hi }, say: "p = " + i + " is **right** of the target " + target + ", so the answer must be on the left of the pivot. Set **hi = " + hi + "**: everything on the right is ignored from now on." });
            }
          }
        },
        code: QS_CODE,
        call: (fn, inp) => fn(inp.nums, inp.k)
      },

      {
        id: "pivot",
        title: "Why the pivot matters: best case vs worst case",
        intro: "Both runs search for the **middle element of an already sorted array** and count every comparison. With the **last element** as pivot every round removes just one number (quadratic work). With the **middle element** as pivot the first round is almost enough. Raise **n** and watch the red bar explode.",
        codeIntro: "The same Quickselect loop, counting comparisons, with two pivot rules.",
        viz: "bars",
        legend: [["bad", "last element as pivot"], ["good", "middle element as pivot"]],
        inputs: [{ type: "number", name: "n", label: "Largest n", value: 64, min: 16, max: 200 }],
        frames(inp, snap) {
          const sizes = [...new Set([inp.n / 8, inp.n / 4, inp.n / 2, inp.n].map(Math.floor))];
          const top = countComparisons(inp.n, "last");
          sizes.forEach((n) => {
            const last = countComparisons(n, "last");
            const mid = countComparisons(n, "middle");
            snap({
              at: ["rule", "count"],
              bars: [
                { label: "last as pivot", value: last, tone: "bad" },
                { label: "middle as pivot", value: mid, tone: "good" }
              ],
              max: top,
              unit: "comparisons",
              title: "finding the middle of a sorted array of n = " + n,
              say: "**n = " + n + "**: the last-element pivot needs **" + last + "** comparisons, the middle-element pivot only **" + mid + "**. " + (last > mid * 3 ? "A bad pivot turns a linear job into a quadratic one." : "At this tiny size the gap is still small.")
            });
          });
          snap({
            at: ["done"],
            bars: [
              { label: "last as pivot", value: top, tone: "bad" },
              { label: "middle as pivot", value: countComparisons(inp.n, "middle"), tone: "good" }
            ],
            max: top,
            unit: "comparisons",
            title: "finding the middle of a sorted array of n = " + inp.n,
            out: "n = " + inp.n + ": " + top + " comparisons with the last element as pivot, " + countComparisons(inp.n, "middle") + " with the middle element",
            say: "Doubling n roughly **doubles** the good bar but **quadruples** the bad one. That is O(n) versus O(n²). In practice you pick the pivot at random so no input can reliably trigger the bad case.",
            result: { last: top, middle: countComparisons(inp.n, "middle") }
          });
        },
        code: COMPARE_CODE,
        call: (fn, inp) => ({ last: fn(inp.n, "last"), middle: fn(inp.n, "middle") })
      }
    ],

    checks: [
      {
        code: QS_CODE,
        tests: [
          { args: [[3, 2, 1, 5, 6, 4], 2], expect: 5 },
          { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expect: 4 },
          { args: [[1], 1], expect: 1 },
          { args: [[7, 7, 7], 2], expect: 7 },
          { args: [[5, 2], 1], expect: 5 },
          { args: [[5, 2], 2], expect: 2 },
          { args: [[9, 8, 7, 6, 5, 4, 3, 2, 1], 9], expect: 1 }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Recursing into both sides like QuickSort",
        why: "Then you are sorting, and the time becomes O(n log n). The whole speed-up comes from ignoring the side that cannot contain the target.",
        fix: "After partitioning, continue only on the side that contains the target index."
      },
      {
        oops: "Mixing up the target index",
        why: "The k-th **smallest** is at index `k - 1` and the k-th **largest** at index `n - k` (0-based, ascending order). Using the wrong one returns the neighbouring element.",
        fix: "Write the target down first: `target = n - k` for largest, `k - 1` for smallest."
      },
      {
        oops: "Always choosing the last element on sorted or nearly sorted data",
        why: "Every round removes only one number: O(n²).",
        fix: "Swap a random element of the range to the end before partitioning."
      },
      {
        oops: "Forgetting that the array gets reordered",
        why: "Quickselect works in place. If the caller needs the original order it is silently destroyed.",
        fix: "Work on a copy (`nums.slice()`) when the input must stay untouched."
      },
      {
        oops: "Using it on a stream",
        why: "It needs all values at once, because every round re-reads the range.",
        fix: "For a stream use a min-heap of size k (the Top-K topic)."
      },
      {
        oops: "Off-by-one when updating lo and hi",
        why: "The pivot is already in place, so the next range excludes it: `lo = p + 1` or `hi = p - 1`. Using `p` again can loop forever.",
        fix: "Always skip the pivot's own index."
      }
    ],

    remember: {
      mnemonic: "Partition, look at where the pivot landed, throw away the wrong side. Only ONE side survives.",
      rules: [
        "k-th largest → index `n - k`. k-th smallest → index `k - 1`.",
        "After a partition the pivot is at its **final** sorted index p.",
        "p == target → answer. p < target → go right. p > target → go left.",
        "O(n) average, O(n²) worst, O(1) space; randomize the pivot.",
        "Changes the array; needs all data; not for streams."
      ],
      template: {
        lines: [
          [`target = n - k;  lo = 0;  hi = n - 1`, "Where the answer lives, and the active range."],
          [`while (lo <= hi) {`, ""],
          [`  p = partition(a, lo, hi)   // pivot lands at index p`, "Lomuto partition."],
          [`  if (p === target) return a[p]`, "Found it."],
          [`  if (p < target) lo = p + 1; else hi = p - 1`, "Keep only the side with the target."],
          [`}`, ""]
        ]
      }
    },

    practice: {
      title: "Sort Colors (3-way partition)",
      level: "Medium",
      problem: "An array contains only the numbers **0, 1 and 2**. Sort it **in place** in one pass, without using `sort`. Return the array.",
      examples: [
        { input: "nums = [2, 0, 2, 1, 1, 0]", output: "[0, 0, 1, 1, 2, 2]" },
        { input: "nums = [2, 0, 1]", output: "[0, 1, 2]" }
      ],
      hints: [
        "It is a partition with **three** zones instead of two: all 0s on the left, all 2s on the right, 1s in the middle.",
        "Use three pointers: `lo` = the next spot for a 0, `hi` = the next spot for a 2 (counting from the right), and `mid` scanning.",
        "If `nums[mid]` is 0, swap it to `lo` and advance both `lo` and `mid`. If it is 1, just advance `mid`. If it is 2, swap it to `hi` and move `hi` back, but **do not advance `mid`**: the swapped-in value has not been checked yet."
      ],
      solution: {
        explain: [
          "Three zones are kept invariant: `[0, lo)` are 0s, `[lo, mid)` are 1s, `(hi, end]` are 2s, and `[mid, hi]` is still unknown. Each step shrinks the unknown zone by one, so one pass is enough: O(n) time and O(1) space.",
          "This is the **Dutch National Flag** algorithm, the 3-way partition used to speed up Quickselect and QuickSort when there are many duplicates."
        ],
        code: {
          fn: "sortColors",
          lines: [
            `function sortColors(nums) {`,
            [`  let lo = 0, mid = 0, hi = nums.length - 1;`, "lo: next spot for a 0. mid: scanner. hi: next spot for a 2."],
            `  while (mid <= hi) {`,
            [`    if (nums[mid] === 0) {`, "A 0 belongs on the left."],
            `      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];`,
            [`      lo++; mid++;`, "Both move on: what we swapped in from lo was a 1 (already checked)."],
            [`    } else if (nums[mid] === 1) {`, "A 1 is already in the middle zone."],
            `      mid++;`,
            [`    } else {`, "A 2 belongs on the right."],
            `      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];`,
            [`      hi--;`, "Do not move mid: the value we swapped in has not been looked at yet."],
            `    }`,
            `  }`,
            `  return nums;`,
            `}`
          ]
        }
      },
      tests: [
        { args: [[2, 0, 2, 1, 1, 0]], expect: [0, 0, 1, 1, 2, 2] },
        { args: [[2, 0, 1]], expect: [0, 1, 2] },
        { args: [[0]], expect: [0] },
        { args: [[1, 1, 1]], expect: [1, 1, 1] },
        { args: [[2, 2, 0, 0, 1, 1]], expect: [0, 0, 1, 1, 2, 2] },
        { args: [[]], expect: [] },
        { args: [[1, 2, 0, 1, 2, 0, 0, 2]], expect: [0, 0, 0, 1, 1, 2, 2, 2] }
      ]
    },

    recall: [
      { q: "What does one partition guarantee?", a: "The pivot is at its final sorted index, with smaller numbers on its left and bigger or equal ones on its right (each side unsorted)." },
      { q: "How is Quickselect different from QuickSort?", a: "It continues into only the one side that contains the target index, so the work shrinks geometrically: O(n) average instead of O(n log n)." },
      { q: "Which index do you search for: k-th smallest and k-th largest?", a: "k-th smallest: index k − 1. k-th largest: index n − k (0-based, ascending sorted order)." },
      { q: "When is it O(n²) and how do you avoid it?", a: "When the pivot is always the smallest or largest value (for example a sorted array with the last element as pivot). Pick the pivot at random." },
      { q: "Quickselect or heap: when each?", a: "Quickselect: one-shot, array in memory, want O(n) average. Heap of size k: stream, read-only data, small k." }
    ],

    related: {
      topics: ["top-k", "heap", "binary-search", "two-pointer", "greedy"],
      files: []
    }
  });
})();
