// Top-K & Kth Largest / Smallest — learn-first format. Shape is documented at the top of 00-meta.js.
// The demos show a small `Heap` class (defined in 31-heap.js as DSA.heapKit) so every line really runs.
(function () {
  const kit = window.DSA.heapKit;
  const list = (a) => a.join(", ");
  const ord = (n) => n + ["th", "st", "nd", "rd"][n % 100 > 10 && n % 100 < 14 ? 0 : n % 10 < 4 ? n % 10 : 0];
  const lowerFirst = (a, b) => a < b;

  const KTH_CODE = {
    fn: "KTH_LARGEST",
    lines: [
      ...kit.classLines,
      ``,
      `function KTH_LARGEST(nums, k) {`,
      [`  const heap = new Heap((a, b) => a < b);`, "A **min**-heap: the root is the smallest value in it.", "make"],
      `  for (const x of nums) {`,
      [`    heap.push(x);`, "Every number gets in...", "push"],
      [`    if (heap.size > k) heap.pop();`, "...but when the heap holds more than k values, the **smallest** (the root) is thrown out. Whatever survives are the k biggest so far.", "evict"],
      `  }`,
      [`  return heap.peek();`, "The root is the smallest of the k biggest, which is exactly the **k-th largest**.", "done"],
      `}`
    ]
  };

  const FREQ_CODE = {
    fn: "TOP_K_FREQUENT",
    lines: [
      ...kit.classLines,
      ``,
      `function TOP_K_FREQUENT(nums, k) {`,
      [`  const freq = new Map();`, "value -> how many times it appears.", "count"],
      [`  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);`, "Count everything first (the Frequency Map topic).", "count"],
      [`  const heap = new Heap((a, b) => a[0] < b[0]);`, "A min-heap of [count, value] pairs, ordered by **count**. The root is the least frequent of the k kept.", "make"],
      [`  for (const [value, count] of freq) {`, "One entry per **distinct** value (not per number).", "each"],
      [`    heap.push([count, value]);`, "Offer this value to the heap.", "push"],
      [`    if (heap.size > k) heap.pop();`, "More than k? Throw out the least frequent one.", "evict"],
      `  }`,
      [`  return heap.a.slice().sort((p, q) => q[0] - p[0]).map((pair) => pair[1]);`, "What is left are the k most frequent values. Sort by count (biggest first) just to read them nicely.", "done"],
      `}`
    ]
  };

  const STREAM_CODE = {
    fn: "STREAM",
    lines: [
      ...kit.classLines,
      ``,
      `class KthLargest {`,
      `  constructor(k, nums) {`,
      [`    this.k = k;`, "How many winners we keep.", "make"],
      [`    this.heap = new Heap((a, b) => a < b);`, "Min-heap of the k biggest values seen so far.", "make"],
      [`    for (const x of nums) this.add(x);`, "Feed the starting numbers through the same add().", "make"],
      `  }`,
      `  add(val) {`,
      [`    this.heap.push(val);`, "A new number arrives: push it.", "push"],
      [`    if (this.heap.size > this.k) this.heap.pop();`, "Too many? Drop the smallest.", "evict"],
      [`    return this.heap.peek();`, "The root is the k-th largest **right now**.", "answer"],
      `  }`,
      `}`,
      ``,
      `function STREAM(k, start, adds) {`,
      `  const kl = new KthLargest(k, start);`,
      [`  return adds.map((v) => kl.add(v));`, "One answer for every number that arrives. Nothing is ever sorted or stored beyond k values.", "answer"],
      `}`
    ]
  };

  const CLOSEST_CODE = {
    fn: "kClosest",
    lines: [
      ...kit.classLines,
      ``,
      `function kClosest(points, k) {`,
      `  const dist = (p) => p[0] * p[0] + p[1] * p[1];`,
      [`  const heap = new Heap((a, b) => dist(a) > dist(b));`, "A **max**-heap by distance: for the k **smallest** we keep a max-heap, so the root is the farthest of the k kept."],
      `  for (const p of points) {`,
      `    heap.push(p);`,
      [`    if (heap.size > k) heap.pop();`, "Too many? Drop the farthest one."],
      `  }`,
      [`  return heap.a.slice().sort((p, q) => dist(p) - dist(q));`, "Squared distance is enough: no need for a square root."],
      `}`
    ]
  };

  [KTH_CODE, FREQ_CODE, STREAM_CODE, CLOSEST_CODE].forEach(kit.classLast);

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "top-k",
    group: "heaps",
    emoji: "🏆",
    title: "Top-K & Kth Largest / Smallest (Heap)",
    tagline: "To find the k biggest (or smallest, or most frequent) of n items, keep a small heap of size k instead of sorting everything: O(n log k) time, O(k) memory, and it works on a stream.",
    level: "Core",
    needs: ["heap", "frequency-map"],

    gist: [
      "**Top-K problems** ask for the k largest / smallest / most frequent / closest items, or the **k-th** one.",
      "Keep a heap of size **k**. For each new item push it, and if the heap has more than k items, pop one. Time **O(n log k)**, memory **O(k)**.",
      "**Golden rule: use the opposite heap.** K **largest** → **min**-heap of size k. K **smallest** → **max**-heap of size k. The root is the weakest winner, the “gatekeeper” that gets kicked out first.",
      "It works one item at a time, so it also solves the **stream** version where new numbers keep arriving."
    ],

    complexity: {
      time: "O(n log k)",
      space: "O(k)",
      why: [
        "Each of the n items does one push and at most one pop on a heap that never grows past k + 1 items. A heap operation costs O(log k), so the total is O(n log k). Sorting everything would cost O(n log n).",
        "The heap holds only k items, so memory is O(k). When k is small compared to n (the top 10 of a million scores), this is a big win. When k is close to n, just sort."
      ],
      more: [
        {
          type: "table",
          heading: "Approaches compared",
          columns: ["Approach", "Time", "Space", "Works on a stream?", "When"],
          rows: [
            ["Sort, then take the k-th", "O(n log n)", "O(1) or O(n)", "No", "Simple, small n, k close to n"],
            ["Min-heap of size k", "O(n log k)", "O(k)", "Yes", "Small k, a stream, input must not change"],
            ["Max-heap of all n, pop k times", "O(n + k log n)", "O(n)", "No", "k very small, whole array already in memory"],
            ["Quickselect (next topics)", "O(n) average, O(n²) worst", "O(1)", "No", "One-shot, fastest, array may be reordered"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Suppose you want the **3 highest scores** out of a million. Sorting a million numbers just to look at three of them is wasteful. Instead keep a small box that holds the best 3 so far. When a new score arrives, compare it with the **weakest of the three**. If the new score is better, the weakest leaves and the new one comes in. If not, ignore it.",
        "A **min-heap** is a perfect box for that: its root is always the **smallest** value inside, so it instantly tells you who the weakest winner is, and removing and inserting costs only O(log k). That is why for the k **largest** you use a **min**-heap. It feels backwards, but the root must be the one you may have to **throw out**.",
        "When the loop ends, the heap holds exactly the k biggest values, and its root is the smallest of them, which is the **k-th largest**. For the k **smallest**, flip it: a **max**-heap of size k whose root is the largest of the winners."
      ],
      signals: [
        "“**Kth largest / smallest**”, “top k”, “k most frequent”, “k closest points”, “k-th highest score”.",
        "The data is a **stream** and you need the current top k after every new item.",
        "k is **much smaller** than n, or n is too big to sort or even to keep in memory."
      ],
      notFor: [
        "k close to n: sorting is simpler and not slower.",
        "You need the whole sorted list, not just the best k."
      ],
      more: [
        {
          type: "table",
          heading: "The opposite-heap rule",
          columns: ["You want", "Heap to keep", "Size", "Root means"],
          rows: [
            ["K largest, or the k-th largest", "**Min**-heap", "k", "the weakest of the k biggest = the k-th largest"],
            ["K smallest, or the k-th smallest", "**Max**-heap", "k", "the weakest of the k smallest = the k-th smallest"]
          ]
        },
        {
          type: "points",
          heading: "Duplicates: “distinct” or not?",
          items: [
            "Always ask. In `[5, 5, 4, 4, 3]` with k = 2, the 2nd largest is **5** if duplicates count separately but **4** if only distinct values count.",
            "For the **distinct** version, skip values you have already seen with a `Set` before pushing (this is the practice problem).",
            "If there are fewer than k distinct values, the problem tells you what to return. In *Third Maximum Number* you return the maximum."
          ]
        },
        {
          type: "code",
          title: "Another example: K Closest Points to Origin (verified code)",
          code: CLOSEST_CODE
        },
        {
          type: "points",
          heading: "Where this shows up for real",
          items: [
            "**Leaderboards and trending lists**: the top 10 players, hashtags or products.",
            "**Monitoring**: the top-K slowest requests in the last hour, with O(k) memory per tracker.",
            "**Huge data in shards**: each shard keeps its own top-K heap, and one more heap merges the K × shards results.",
            "Real rankings add tie-breakers (score, then time) and decay; put that rule in the heap's comparison function."
          ]
        }
      ]
    },

    analogy: {
      title: "A podium with k places",
      story: [
        "An athletics meeting has a podium with only **3 places**. Every new runner finishes with a time, and the officials only compare them with the **bronze medallist**, the weakest person on the podium. A faster runner knocks the bronze medallist off and takes a place on the podium. A slower runner is ignored without even being looked at again.",
        "At the end of the day the podium holds the three fastest runners, and the person at the bottom of it, the bronze medallist, is the **3rd fastest**. Nobody had to rank the thousand other runners."
      ],
      map: [
        ["The podium with 3 places", "A heap of size k"],
        ["The bronze medallist (weakest on the podium)", "The heap root (the gatekeeper)"],
        ["A new runner is faster than bronze", "The new value beats the root: push it, pop the old root"],
        ["Runners slower than bronze are ignored", "They are pushed and immediately popped: no effect"],
        ["The bronze medallist at the end", "The k-th largest"]
      ],
      breaks: "A real podium is ordered gold, silver, bronze. A heap only guarantees its **root** (the weakest winner); the others are in heap order, not sorted. If you need them in order, sort the k items at the end (cheap, k is small)."
    },

    demos: [
      {
        id: "kth",
        title: "Kth largest with a size-k min-heap",
        intro: "Numbers are read left to right. Each is pushed into a **min-heap**, and if the heap grows past **k** the smallest value (the root) is thrown out. At the end the root is the k-th largest. Try the default: `3 2 1 5 6 4` with k = 2.",
        codeIntro: "The `Heap` class is the one from the Heap topic. The interesting part is the short function at the bottom.",
        viz: "heap",
        legend: [["cur", "number just pushed"], ["bad", "smallest, about to be thrown out"], ["good", "the k-th largest so far"]],
        inputs: [
          { type: "numlist", name: "nums", label: "Numbers", value: [3, 2, 1, 5, 6, 4], len: [3, 10], min: 1, max: 99 },
          { type: "number", name: "k", label: "k", value: 2, min: 1, max: 5 }
        ],
        validate: (inp) => (inp.k > inp.nums.length ? "k can not be bigger than the number of values." : null),
        random(rnd) {
          const len = rnd.int(3, 10);
          return { nums: list(Array.from({ length: len }, () => rnd.int(1, 40))), k: String(rnd.int(1, Math.min(5, len))) };
        },
        scene: (inp) => ({ caps: [inp.k + 1] }),
        frames(inp, snap) {
          const k = inp.k;
          const heap = kit.make(lowerFirst);
          const thrown = [];
          const label = "Min-heap holding the best " + k;
          const view = (i, tone, extra) =>
            Object.assign({ heaps: [{ label, hint: "root = weakest winner", values: heap.a.slice(), tone }], boxes: [{ label: "still to read", kind: "list", items: inp.nums.slice(i + 1) }, { label: "thrown out", kind: "list", items: thrown.slice() }] }, extra);
          snap({ at: ["make"], heaps: [{ label, hint: "root = weakest winner", values: [], tone: {} }], boxes: [{ label: "still to read", kind: "list", items: inp.nums.slice() }], say: "We want the **" + ord(k) + " largest**. Keep a **min**-heap that will never hold more than **" + k + "** numbers: the " + k + " biggest seen so far. Its root is the smallest of them." });
          inp.nums.forEach((x, i) => {
            const at = heap.push(x);
            snap(view(i, { [at]: "cur" }, { at: ["push"], vars: { x, size: heap.size() }, say: "Read **" + x + "** and push it. The heap now holds " + heap.size() + " number" + (heap.size() === 1 ? "" : "s") + (heap.size() > k ? ", which is more than k = " + k + "." : ", not more than k = " + k + ", so nothing is removed.") }));
            if (heap.size() > k) {
              const weakest = heap.peek();
              snap(view(i, { 0: "bad" }, { at: ["evict"], vars: { x, size: heap.size() }, say: "The heap has " + heap.size() + " > " + k + " numbers, so throw one out: always the **smallest**, which is the root, **" + weakest + "**." + (weakest === x ? " That is the number we just read, so it changes nothing." : "") }));
              heap.pop();
              thrown.push(weakest);
              snap(view(i, { 0: "good" }, { at: ["evict"], vars: { x, size: heap.size() }, say: "Back to " + k + " numbers: the **" + k + " biggest so far**. The root, **" + heap.peek() + "**, is the smallest of them, so it is the " + ord(k) + " largest so far." }));
            }
          });
          const ans = heap.peek();
          snap({
            at: ["done"],
            heaps: [{ label, hint: "root = weakest winner", values: heap.a.slice(), tone: { 0: "good" } }],
            boxes: [{ label: "thrown out", kind: "list", items: thrown.slice() }],
            out: ord(k) + " largest = " + ans,
            say: "Done. The heap holds the " + k + " biggest numbers (" + list(heap.a.slice().sort((p, q) => q - p)) + "). Its root, **" + ans + "**, is the smallest of the winners, so it is the **" + ord(k) + " largest**.",
            result: ans
          });
        },
        code: KTH_CODE,
        call: (fn, inp) => fn(inp.nums, inp.k)
      },

      {
        id: "frequent",
        title: "Top K frequent elements",
        intro: "First count how often each value appears. Then keep a **min-heap of [count, value] pairs** of size k, ordered by **count**: the least frequent of the kept values is the root and gets thrown out first. A node shows `value×count`.",
        codeIntro: "Same pattern as before. Only the heap items changed from numbers to `[count, value]` pairs.",
        viz: "heap",
        legend: [["cur", "pair just pushed"], ["bad", "least frequent, about to be thrown out"], ["good", "kept"]],
        inputs: [
          { type: "numlist", name: "nums", label: "Numbers (small values)", value: [1, 1, 1, 2, 2, 3], len: [4, 12], min: 1, max: 6 },
          { type: "number", name: "k", label: "k", value: 2, min: 1, max: 3 }
        ],
        validate(inp) {
          const distinct = new Set(inp.nums).size;
          return inp.k > distinct ? "k can not be bigger than the number of different values (" + distinct + ")." : null;
        },
        random(rnd) {
          const nums = Array.from({ length: rnd.int(4, 12) }, () => rnd.int(1, 6));
          return { nums: list(nums), k: String(rnd.int(1, Math.min(3, new Set(nums).size))) };
        },
        scene: (inp) => ({ caps: [inp.k + 1] }),
        frames(inp, snap) {
          const k = inp.k;
          const freq = new Map();
          for (const x of inp.nums) freq.set(x, (freq.get(x) || 0) + 1);
          const heap = kit.make((a, b) => a[0] < b[0]);
          const thrown = [];
          const show = (p) => p[1] + "×" + p[0];
          const label = "Min-heap by count, size " + k;
          const mapBox = { label: "counts (value → times)", kind: "map", items: [...freq].map(([v, c]) => ({ k: v, v: c })) };
          const view = (tone, extra) => Object.assign({ heaps: [{ label, hint: "root = least frequent kept", values: heap.a.map(show), tone }], boxes: [mapBox, { label: "thrown out", kind: "list", items: thrown.map(show) }] }, extra);
          snap(view({}, { at: ["count"], say: "Step 1: **count** how often each value appears: " + [...freq].map(([v, c]) => v + " appears " + c + "×").join(", ") + ". That is the Frequency Map idea." }));
          for (const [value, count] of freq) {
            const at = heap.push([count, value]);
            snap(view({ [at]: "cur" }, { at: ["push"], vars: { value, count, size: heap.size() }, say: "Take value **" + value + "** (appears " + count + "×). Push the pair **[" + count + ", " + value + "]**; the heap orders pairs by their count." }));
            if (heap.size() > k) {
              const weakest = heap.peek();
              snap(view({ 0: "bad" }, { at: ["evict"], vars: { value, count, size: heap.size() }, say: "More than k = " + k + " pairs, so remove the one with the **smallest count**: value **" + weakest[1] + "** (" + weakest[0] + "×) is not among the " + k + " most frequent." }));
              heap.pop();
              thrown.push(weakest);
              snap(view({ 0: "good" }, { at: ["evict"], vars: { value, count, size: heap.size() }, say: "Back to " + k + " pairs: the " + k + " most frequent values so far." }));
            }
          }
          const result = heap.a.slice().sort((p, q) => q[0] - p[0]).map((p) => p[1]);
          snap(view({ 0: "good" }, { at: ["done"], out: "top " + k + " = [" + list(result) + "]", say: "Done. The heap holds the **" + k + " most frequent** values: **" + list(result) + "** (most frequent first, after sorting the " + k + " survivors).", result }));
        },
        code: FREQ_CODE,
        call: (fn, inp) => fn(inp.nums, inp.k)
      },

      {
        id: "stream",
        title: "Streaming: the k-th largest after every new number",
        intro: "Numbers keep arriving one at a time and after each one we must answer “what is the k-th largest **so far**?”. The heap makes it cheap: every answer is one push, at most one pop and one peek. Nothing is ever sorted.",
        codeIntro: "A `KthLargest` object that owns the heap. `add` is called once per arriving number.",
        viz: "heap",
        legend: [["good", "current k-th largest (the root)"]],
        inputs: [
          { type: "numlist", name: "start", label: "Starting numbers", value: [4, 5, 8, 2], len: [1, 6], min: 1, max: 99 },
          { type: "numlist", name: "adds", label: "Numbers that arrive later", value: [3, 5, 10, 9], len: [1, 6], min: 1, max: 99 },
          { type: "number", name: "k", label: "k", value: 3, min: 1, max: 4 }
        ],
        validate: (inp) => (inp.start.length < inp.k - 1 ? "Give at least k − 1 = " + (inp.k - 1) + " starting numbers, so the answer exists after the first new number." : null),
        random(rnd) {
          const k = rnd.int(1, 4);
          const start = Array.from({ length: rnd.int(Math.max(1, k - 1), 6) }, () => rnd.int(1, 40));
          return { start: list(start), adds: list(Array.from({ length: rnd.int(2, 6) }, () => rnd.int(1, 40))), k: String(k) };
        },
        scene: (inp) => ({ caps: [inp.k + 1] }),
        frames(inp, snap) {
          const k = inp.k;
          const heap = kit.make(lowerFirst);
          const answers = [];
          const label = "Min-heap of the " + k + " biggest so far";
          const view = (i, tone, extra) =>
            Object.assign({ heaps: [{ label, hint: "root = " + ord(k) + " largest", values: heap.a.slice(), tone }], boxes: [{ label: "arriving next", kind: "list", items: inp.adds.slice(i + 1) }, { label: "answers so far", kind: "list", items: answers.slice() }] }, extra);
          for (const x of inp.start) {
            heap.push(x);
            if (heap.size() > k) heap.pop();
          }
          snap(view(-1, heap.size() ? { 0: "good" } : {}, { at: ["make"], vars: { k }, say: "The starting numbers **" + list(inp.start) + "** went through the same push-and-trim steps. The heap now holds the " + heap.size() + " biggest of them: **" + list(heap.a.slice().sort((p, q) => q - p)) + "**." }));
          inp.adds.forEach((v, i) => {
            heap.push(v);
            let dropped = null;
            if (heap.size() > k) dropped = heap.pop();
            const ans = heap.peek();
            answers.push(ans);
            snap(view(i, { 0: "good" }, { at: ["answer"], vars: { added: v, kth: ans }, say: "**add(" + v + ")**: pushed " + v + (dropped !== null ? " and dropped the smallest, **" + dropped + "**" + (dropped === v ? " (the new number itself: it was too small to matter)" : "") : ", nothing to drop yet") + ". The " + ord(k) + " largest so far is the root: **" + ans + "**." }));
          });
          snap(view(inp.adds.length - 1, { 0: "good" }, { at: ["answer"], out: "answers = [" + list(answers) + "]", say: "Every answer cost O(log k). The heap never stored more than " + (k + 1) + " numbers, however long the stream is.", result: answers.slice() }));
        },
        code: STREAM_CODE,
        call: (fn, inp) => fn(inp.k, inp.start, inp.adds)
      }
    ],

    checks: [
      {
        code: CLOSEST_CODE,
        tests: [
          { args: [[[1, 3], [-2, 2]], 1], expect: [[-2, 2]] },
          { args: [[[3, 3], [5, -1], [-2, 4]], 2], expect: [[3, 3], [-2, 4]] },
          { args: [[[0, 1], [1, 1], [2, 2], [3, 3]], 3], expect: [[0, 1], [1, 1], [2, 2]] },
          { args: [[[5, 5]], 1], expect: [[5, 5]] }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Using a max-heap to find the k largest",
        why: "A max-heap keeps the biggest value at the root, which is the one you want to **keep**. To drop the weakest winner you would need to reach the smallest, which is buried at the bottom.",
        fix: "Use the **opposite** heap: min-heap for the k largest, max-heap for the k smallest."
      },
      {
        oops: "Forgetting to pop when the size goes above k",
        why: "Then the heap simply grows to n items. You pay O(n log n), use O(n) memory, and the root is not the k-th largest anymore.",
        fix: "After every push write `if (heap.size > k) heap.pop();`."
      },
      {
        oops: "Off-by-one: popping at `size >= k`",
        why: "That keeps only k − 1 items, so you would return the wrong rank.",
        fix: "Pop only when `size > k` (strictly greater)."
      },
      {
        oops: "Not asking whether duplicates count",
        why: "In `[5, 5, 4]`, the 2nd largest is 5 (with duplicates) or 4 (distinct only). The two answers differ.",
        fix: "Clarify the rule. For distinct values, skip numbers already seen with a `Set`."
      },
      {
        oops: "Reading `peek()` before the heap has k items",
        why: "With fewer than k values the root is just the smallest so far, not the k-th largest.",
        fix: "Check `heap.size === k` (or handle the short case the way the problem asks)."
      },
      {
        oops: "Sorting numbers with `arr.sort()` and no comparator (JavaScript)",
        why: "The default sort compares as text: `[10, 9, 2].sort()` gives `[10, 2, 9]`.",
        fix: "Always pass `(a, b) => a - b` (or `b - a`)."
      }
    ],

    remember: {
      mnemonic: "K largest → MIN-heap of size k. The root is the bouncer: anyone who beats the bouncer gets in, the bouncer leaves.",
      rules: [
        "Push, then `if (size > k) pop`. Heap size never goes above k + 1.",
        "k largest → min-heap. k smallest → max-heap. (The root is the one that may leave.)",
        "The answer to “k-th largest” is `heap.peek()` at the end.",
        "O(n log k) time, O(k) space, and it works on a stream.",
        "Counting first (Map) then a heap of `[count, value]` gives top-K frequent."
      ],
      template: {
        lines: [
          [`const heap = new Heap(before);   // min for "largest", max for "smallest"`, "Pick the opposite heap."],
          [`for (const x of items) {`, ""],
          [`  heap.push(x);`, "Offer the item."],
          [`  if (heap.size > k) heap.pop();`, "Evict the weakest winner."],
          [`}`, ""],
          [`return heap.peek();   // or the whole heap for "top k"`, "The root is the k-th."]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own file: `Problems/Numbers/thirdMaximumNumber.js`. The class is `Heap` with a comparator; in your `Problems/Tree/heap.js` you have the min and max versions separately. Related interview problems: *Kth Largest Element in an Array*, *Top K Frequent Elements*, *K Closest Points to Origin*, *Kth Largest in a Stream*."
        }
      ]
    },

    practice: {
      title: "Third Maximum Number (distinct top 3)",
      level: "Easy",
      problem: "Given an array of integers, return the **third largest distinct** value. If there are fewer than 3 distinct values, return the **maximum** instead.",
      examples: [
        { input: "nums = [3, 2, 1]", output: "1" },
        { input: "nums = [1, 2]", output: "2", why: "Only two distinct values, so return the maximum." },
        { input: "nums = [2, 2, 3, 1]", output: "1", why: "The distinct values are 3, 2, 1: the third largest is 1." }
      ],
      hints: [
        "This is Top-K with k = 3 and a twist: **duplicates must not count twice**. What do you need to remember to skip them?",
        "Keep a tiny list of at most 3 distinct values with the **smallest first**. The first item is your gatekeeper (the heap root). With only 3 items you can use `sort` on the list instead of a heap.",
        "Whenever the list has 4 values, remove the smallest. At the end, if the list has 3 values return the first one, otherwise return the last one (the maximum)."
      ],
      solution: {
        explain: [
          "`best` plays the role of the size-3 min-heap: it holds at most 3 distinct values, smallest first, so `best[0]` is the weakest winner. Because k is only 3, sorting a list of 4 numbers is trivial. For a big k, replace it with a real heap and a `Set`.",
          "Time O(n) for k = 3 (each step sorts at most 4 numbers), memory O(1)."
        ],
        code: {
          fn: "thirdMax",
          lines: [
            `function thirdMax(nums) {`,
            [`  const best = [];`, "Up to 3 distinct values, smallest first. This is our tiny “heap”."],
            `  for (const x of nums) {`,
            [`    if (best.includes(x)) continue;`, "A duplicate of a winner does not count twice."],
            [`    best.push(x);`, "Offer the value..."],
            [`    best.sort((a, b) => a - b);`, "...keep the list ordered (always pass a comparator)."],
            [`    if (best.length > 3) best.shift();`, "Four values: the smallest (the root) leaves."],
            `  }`,
            [`  return best.length === 3 ? best[0] : best[best.length - 1];`, "Three winners: the weakest is the third largest. Otherwise return the maximum."],
            `}`
          ]
        }
      },
      tests: [
        { args: [[3, 2, 1]], expect: 1 },
        { args: [[1, 2]], expect: 2 },
        { args: [[2, 2, 3, 1]], expect: 1 },
        { args: [[1, 1, 2]], expect: 2 },
        { args: [[5]], expect: 5 },
        { args: [[1, 2, 2, 5, 3, 5]], expect: 2 },
        { args: [[3, 3, 3]], expect: 3 },
        { args: [[-1, -2, -3, -4]], expect: -3 },
        { args: [[10, 9, 2, 10, 9, 8, 1]], expect: 8 }
      ]
    },

    recall: [
      { q: "Which heap do you use for the k largest, and why?", a: "A min-heap of size k. The root is the smallest of the k winners, i.e. the one that has to leave when a better item arrives." },
      { q: "What is the loop?", a: "For each item: push it; if the heap has more than k items, pop. At the end the root is the k-th largest." },
      { q: "Time and space of the heap approach?", a: "O(n log k) time and O(k) space, versus O(n log n) for sorting." },
      { q: "Why does it work for a stream?", a: "It only needs the current item and the k kept items, so the answer is ready after every arrival." },
      { q: "What must you ask about duplicates?", a: "Whether equal values count separately or only once. For distinct values, skip numbers already seen using a Set." }
    ],

    related: {
      topics: ["heap", "two-heaps-median", "quickselect", "frequency-map", "hashmap"],
      files: ["Problems/Numbers/thirdMaximumNumber.js", "Problems/Tree/heap.js"]
    }
  });
})();
