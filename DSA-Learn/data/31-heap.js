// Heap & Priority Queue — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  // ---- small helpers used by the demo inputs (the displayed code does not use these) ----
  const siftDownMin = (a, start) => {
    let i = start;
    for (;;) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let small = i;
      if (l < a.length && a[l] < a[small]) small = l;
      if (r < a.length && a[r] < a[small]) small = r;
      if (small === i) return;
      [a[i], a[small]] = [a[small], a[i]];
      i = small;
    }
  };
  const heapify = (nums) => {
    const h = nums.slice();
    for (let s = Math.floor(h.length / 2) - 1; s >= 0; s--) siftDownMin(h, s);
    return h;
  };
  const badParent = (a) => {
    for (let i = 1; i < a.length; i++) if (a[Math.floor((i - 1) / 2)] > a[i]) return i;
    return -1;
  };
  const list = (a) => a.join(", ");

  // Shared with the Top-K and Two-Heaps topics (their demos show a `Heap` class that takes a comparator).
  //   classLines : the displayed class, as plain code lines
  //   make(before) : the same algorithm for the animation tracers. before(a, b) = "a belongs above b".
  window.DSA.heapKit = {
    classLines: [
      `class Heap {`,
      `  constructor(before) { this.a = []; this.before = before; }`,
      `  get size() { return this.a.length; }`,
      `  peek() { return this.a[0]; }`,
      `  push(x) {`,
      `    const a = this.a;`,
      `    a.push(x);`,
      `    let i = a.length - 1;`,
      `    while (i > 0) {`,
      `      const p = Math.floor((i - 1) / 2);`,
      `      if (!this.before(a[i], a[p])) break;`,
      `      [a[i], a[p]] = [a[p], a[i]];`,
      `      i = p;`,
      `    }`,
      `  }`,
      `  pop() {`,
      `    const a = this.a;`,
      `    const top = a[0];`,
      `    const last = a.pop();`,
      `    if (a.length > 0) {`,
      `      a[0] = last;`,
      `      let i = 0;`,
      `      for (;;) {`,
      `        const l = 2 * i + 1, r = 2 * i + 2;`,
      `        let best = i;`,
      `        if (l < a.length && this.before(a[l], a[best])) best = l;`,
      `        if (r < a.length && this.before(a[r], a[best])) best = r;`,
      `        if (best === i) break;`,
      `        [a[i], a[best]] = [a[best], a[i]];`,
      `        i = best;`,
      `      }`,
      `    }`,
      `    return top;`,
      `  }`,
      `}`
    ],
    // A code object written as [...classLines, "", function lines] becomes [function lines, "", comment, ...classLines],
    // so the line-by-line panel shows the interesting function first. (A class declared below still works when called later.)
    classLast(code) {
      const n = window.DSA.heapKit.classLines.length + 1;
      code.lines = code.lines.slice(n).concat([``, `// ---- the Heap class, as in the Heap topic ----`], window.DSA.heapKit.classLines);
      return code;
    },
    make(before) {
      const a = [];
      return {
        a,
        size: () => a.length,
        peek: () => a[0],
        push(x) {
          a.push(x);
          let i = a.length - 1;
          while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (!before(a[i], a[p])) break;
            [a[i], a[p]] = [a[p], a[i]];
            i = p;
          }
          return i; // where x ended up
        },
        pop() {
          const top = a[0];
          const last = a.pop();
          if (a.length > 0) {
            a[0] = last;
            let i = 0;
            for (;;) {
              const l = 2 * i + 1, r = 2 * i + 2;
              let best = i;
              if (l < a.length && before(a[l], a[best])) best = l;
              if (r < a.length && before(a[r], a[best])) best = r;
              if (best === i) break;
              [a[i], a[best]] = [a[best], a[i]];
              i = best;
            }
          }
          return top;
        }
      };
    }
  };
  const kidsOf = (kids) => (kids.length === 1 ? "its only child " : "its children ") + kids.join(" and ");

  // ---- the three displayed programs ----
  const PUSH_CODE = {
    fn: "HEAP_PUSH",
    lines: [
      `function HEAP_PUSH(nums, kind) {`,
      `  const heap = [];`,
      [`  const above = (a, b) => (kind === "min" ? a < b : a > b);`, "**above(a, b)**: should a sit higher than b? In a min-heap the smaller one goes up, in a max-heap the bigger one.", "rule"],
      `  for (const x of nums) {`,
      [`    heap.push(x);`, "**Step 1:** put the new value in the next free slot, the end of the array. The tree stays complete.", "add"],
      [`    let i = heap.length - 1;`, "i = where the new value sits now.", "add"],
      [`    while (i > 0) {`, "Keep going until the value reaches the root (index 0).", "loop"],
      [`      const p = Math.floor((i - 1) / 2);`, "The parent's index. (Children of p are at 2p + 1 and 2p + 2.)", "compare"],
      [`      if (!above(heap[i], heap[p])) break;`, "**Step 2:** if the parent already wins, the heap order holds. Stop.", "compare"],
      [`      [heap[i], heap[p]] = [heap[p], heap[i]];`, "Otherwise swap with the parent...", "swap"],
      [`      i = p;`, "...and look at the next parent up.", "swap"],
      `    }`,
      `  }`,
      [`  return heap;`, "The array **is** the heap. It is not sorted, only parent-beats-child.", "done"],
      `}`
    ]
  };

  const POP_CODE = {
    fn: "HEAP_POP",
    lines: [
      `function HEAP_POP(heapIn, pops) {`,
      [`  const heap = heapIn.slice();`, "Work on a copy. The input is already a valid min-heap.", "start"],
      `  const removed = [];`,
      `  for (let k = 0; k < pops && heap.length > 0; k++) {`,
      [`    const top = heap[0];`, "The answer is always the root: the smallest value.", "top"],
      [`    const last = heap.pop();`, "Take the **last** element out of the array. The tree stays complete, and this value will fill the hole at the root.", "last"],
      `    if (heap.length > 0) {`,
      [`      heap[0] = last;`, "Drop it on the root. Shape is fine, but this value is probably too big for the top.", "root"],
      `      let i = 0;`,
      `      while (true) {`,
      [`        const l = 2 * i + 1, r = 2 * i + 2;`, "The two children of i.", "kids"],
      [`        let small = i;`, "small = index of the smallest among i and its two children.", "kids"],
      [`        if (l < heap.length && heap[l] < heap[small]) small = l;`, "Left child exists and is smaller?", "kids"],
      [`        if (r < heap.length && heap[r] < heap[small]) small = r;`, "Right child exists and is even smaller?", "kids"],
      [`        if (small === i) break;`, "No child is smaller: the value has sunk far enough. Stop.", "stop"],
      [`        [heap[i], heap[small]] = [heap[small], heap[i]];`, "Swap with the **smaller** child. (The bigger child would end up above the smaller one and break the order.)", "swap"],
      [`        i = small;`, "Continue from the spot we just moved to.", "swap"],
      `      }`,
      `    }`,
      [`    removed.push(top);`, "Hand back the old root.", "out"],
      `  }`,
      [`  return removed;`, "", "done"],
      `}`
    ]
  };

  const HEAPIFY_CODE = {
    fn: "HEAPIFY",
    lines: [
      `function HEAPIFY(nums) {`,
      [`  const heap = nums.slice();`, "Start with the array as it is, and just *read* it as a tree.", "copy"],
      `  const n = heap.length;`,
      [`  for (let s = Math.floor(n / 2) - 1; s >= 0; s--) {`, "Start at the **last parent** (index n/2 - 1) and walk back to the root. Everything after it is a leaf, and a lone node is already a valid heap.", "start"],
      [`    let i = s;`, "Sink the value at s down to where it belongs.", "start"],
      `    while (true) {`,
      [`      const l = 2 * i + 1, r = 2 * i + 2;`, "The two children of i.", "kids"],
      [`      let small = i;`, "", "kids"],
      [`      if (l < n && heap[l] < heap[small]) small = l;`, "", "kids"],
      [`      if (r < n && heap[r] < heap[small]) small = r;`, "", "kids"],
      [`      if (small === i) break;`, "Neither child is smaller: this sub-tree is a heap now.", "stop"],
      [`      [heap[i], heap[small]] = [heap[small], heap[i]];`, "Swap down with the smaller child.", "swap"],
      [`      i = small;`, "", "swap"],
      `    }`,
      `  }`,
      [`  return heap;`, "", "done"],
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "heap",
    group: "heaps",
    emoji: "⛰️",
    title: "Heap & Priority Queue",
    tagline: "A tree stored in a plain array where every parent beats its children, so the smallest (or biggest) value is always on top and adding or removing costs only O(log n).",
    level: "Core",
    needs: ["trees-intro", "queue-deque"],

    gist: [
      "A **heap** is a complete binary tree kept in an **array**. In a **min-heap** every parent is ≤ its children, so the **smallest** value is always at index 0 (a **max-heap** is the mirror).",
      "**peek** the top is O(1). **push** adds at the end and bubbles **up** (sift up). **pop** removes the root, moves the last value to the top and sinks it **down** (sift down). Both are O(log n).",
      "A heap is **not sorted**: only parent-versus-child is guaranteed. Searching for an arbitrary value is still O(n).",
      "A **priority queue** is the idea (“give me the most urgent item next”). A heap is how you build one."
    ],

    complexity: {
      time: "peek O(1) · push / pop O(log n)",
      space: "O(n)",
      why: [
        "The tree is complete, so its height is about log₂ n. Push moves one value up at most that many levels, and pop moves one value down at most that many levels. That is O(log n) each, even for a million items (about 20 steps).",
        "Peeking only reads index 0, so it is O(1). Building a heap from a whole array with the sift-down loop is O(n), not O(n log n), because most nodes sit near the bottom and can only sink a level or two."
      ],
      more: [
        {
          type: "table",
          heading: "Costs",
          columns: ["Operation", "Time", "Note"],
          rows: [
            ["`peek` (min or max)", "O(1)", "Index 0"],
            ["`push`", "O(log n)", "Add at the end, sift up"],
            ["`pop` (extract min or max)", "O(log n)", "Last value to the root, sift down"],
            ["Build a heap from an array", "O(n)", "Sift down from the last parent to the root"],
            ["Heap sort", "O(n log n)", "Build, then pop n times. In-place, not stable."],
            ["Find or delete an arbitrary value", "O(n) to find, O(log n) to fix", "Heaps are not built for searching"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Picture a family tree where **every parent is “better” than their children**: in a min-heap, better means smaller. There is no order between siblings or cousins. All we promise is parent ≤ child. That one rule is enough to guarantee that the best value of all sits at the very top.",
        "The tree is always **complete** (every row full except maybe the last, filled from the left). Because there are no gaps, you do not need pointers: store the tree in an array level by level. Index 0 is the root, and for any index `i` the children are at `2i + 1` and `2i + 2` and the parent is at `floor((i - 1) / 2)`.",
        "**Push** puts the new value at the first free slot (the end of the array) and lets it **bubble up** while it beats its parent. **Pop** takes the root, puts the last array value in its place and lets it **sink down**, always swapping with the **better child**. Each walk is at most the height of the tree, so O(log n)."
      ],
      signals: [
        "“Always give me the **smallest / largest / most urgent** next”, repeatedly, while new items keep arriving.",
        "**Kth largest**, **top K**, **running median**, **merge K sorted lists**: heaps are the standard tool.",
        "**Scheduling**: next task by priority or earliest deadline, Dijkstra's shortest path, event simulation.",
        "You would otherwise re-sort the list after every insert."
      ],
      notFor: [
        "Searching for a specific value, or listing everything in sorted order cheaply: use a sorted array, a BST or a hash map.",
        "Only the min **once**: a single pass with `Math.min` is O(n) and simpler."
      ],
      more: [
        {
          type: "table",
          heading: "Array index math (0-based)",
          columns: ["You have index i, you want…", "Formula", "Example with i = 1"],
          rows: [
            ["Left child", "`2 * i + 1`", "3"],
            ["Right child", "`2 * i + 2`", "4"],
            ["Parent", "`Math.floor((i - 1) / 2)`", "0"],
            ["Last parent (where heapify starts)", "`Math.floor(n / 2) - 1`", "n = 6 → 2"]
          ]
        },
        {
          type: "table",
          heading: "Min-heap vs max-heap: which one?",
          columns: ["You need repeatedly…", "Use", "Root is"],
          rows: [
            ["The smallest (next task, shortest distance, earliest end)", "Min-heap", "the minimum"],
            ["The largest (biggest stone, highest score)", "Max-heap", "the maximum"],
            ["The K **largest** items", "Min-heap of size K (see Top-K)", "the weakest of the winners"],
            ["The K **smallest** items", "Max-heap of size K", "the weakest of the winners"]
          ]
        },
        {
          type: "points",
          heading: "In real languages",
          items: [
            "**JavaScript has no built-in heap.** Write a small `MinHeap` class (your `Problems/Tree/heap.js`), or store negated values in a min-heap to get a max-heap (and negate again when you read).",
            "**Java**: `PriorityQueue` is a min-heap. `add`/`offer` = push, `peek` = peek, `poll` = pop. For a max-heap pass `Collections.reverseOrder()`. Printing it shows the internal array, which is **not** sorted.",
            "**Python**: `heapq` is a min-heap on a list (`heappush`, `heappop`; negate for max).",
            "**Sorting with a heap (heap sort)**: build a max-heap, then repeatedly swap the root with the last element and sift down in the shrunk heap. O(n log n), O(1) extra space."
          ]
        }
      ]
    },

    analogy: {
      title: "A company ladder",
      story: [
        "In a company where each manager is **more senior than everyone who reports to them**, the most senior person of all is the CEO at the top. Nobody says the two managers on the same level must be ranked against each other; the only rule is boss above report.",
        "A **new hire** starts in the first free desk at the bottom. If they are more senior than their boss, they swap places, and keep swapping upward until their boss is more senior or they are the CEO. That is **sift up**.",
        "When the **CEO leaves**, the person at the very last desk is moved into the CEO's chair so the building stays tidy. They are probably not senior enough, so they swap with the more senior of their two reports, again and again, until both their reports are junior to them. That is **sift down**."
      ],
      map: [
        ["The CEO at the top", "The root: the min (or max)"],
        ["“Boss is more senior than reports”", "Heap order: parent ≤ children"],
        ["New hire starts at the last free desk", "Push: append at the end of the array"],
        ["Promoted while better than the boss", "Sift up"],
        ["Last desk person takes the empty CEO chair", "Pop: last value moves to the root"],
        ["Swaps with the more senior of two reports", "Sift down with the smaller child (min-heap)"]
      ],
      breaks: "In a real company you could compare two managers' seniority. In a heap siblings are never compared, so the array is not sorted: don't read it left to right and expect order."
    },

    demos: [
      {
        id: "push",
        title: "Push: add a value and bubble it up",
        intro: "Values are inserted one by one. Each goes to the end of the array and then climbs while it beats its parent. In the picture the **array index** is shown under each node and in the strip below. Switch to a **max-heap** to see the mirror.",
        codeIntro: "`above(a, b)` is the only thing that changes between a min-heap and a max-heap.",
        viz: "heap",
        legend: [["cur", "value being moved"], ["mark", "its parent (being compared)"], ["good", "settled in its place"]],
        inputs: [
          { type: "numlist", name: "nums", label: "Values (inserted left to right)", value: [5, 3, 8, 1, 9, 2], len: [2, 10], min: 1, max: 99 },
          { type: "select", name: "kind", label: "Heap", value: "min", options: [["min", "min-heap"], ["max", "max-heap"]] }
        ],
        scene: (inp) => ({ caps: [inp.nums.length] }),
        frames(inp, snap) {
          const min = inp.kind === "min";
          const above = (a, b) => (min ? a < b : a > b);
          const heap = [];
          const label = min ? "Min-heap" : "Max-heap";
          const hint = min ? "parent ≤ children, smallest on top" : "parent ≥ children, biggest on top";
          const order = min ? "≤" : "≥";
          const view = (k, tone, extra) =>
            Object.assign({ heaps: [{ label, hint, values: heap.slice(), tone }], boxes: [{ label: "still to insert", kind: "list", items: inp.nums.slice(k + 1) }] }, extra);
          inp.nums.forEach((x, k) => {
            heap.push(x);
            let i = heap.length - 1;
            snap(view(k, { [i]: "cur" }, { at: ["add"], vars: { x, i }, say: "Insert **" + x + "**: put it in the next free slot, the end of the array (index " + i + "). The tree stays complete, but " + x + " might be in the wrong place." }));
            let rooted = true;
            while (i > 0) {
              const p = Math.floor((i - 1) / 2);
              if (!above(heap[i], heap[p])) {
                snap(view(k, { [i]: "good", [p]: "mark" }, { at: ["compare"], vars: { x, i, parent: p }, say: "Compare **" + heap[i] + "** with its parent **" + heap[p] + "** (index " + p + "): the parent is " + order + " " + heap[i] + ", so heap order already holds. **Stop**: " + heap[i] + " stays here." }));
                rooted = false;
                break;
              }
              snap(view(k, { [i]: "cur", [p]: "mark" }, { at: ["compare"], vars: { x, i, parent: p }, say: "Compare **" + heap[i] + "** with its parent **" + heap[p] + "** (index " + p + "): " + heap[i] + " is " + (min ? "smaller" : "bigger") + ", so it must sit above its parent. **Swap** them." }));
              [heap[i], heap[p]] = [heap[p], heap[i]];
              snap(view(k, { [p]: "cur", [i]: "mark" }, { at: ["swap"], vars: { x, i: p }, say: "Swapped: **" + heap[p] + "** moved up to index " + p + ", and " + heap[i] + " moved down to index " + i + "." }));
              i = p;
            }
            if (rooted) snap(view(k, { [i]: "good" }, { at: ["loop"], vars: { x, i }, say: "**" + heap[i] + "** is at the root (index 0). There is no parent above, so it cannot go any higher." }));
          });
          snap({
            at: ["done"],
            heaps: [{ label, hint, values: heap.slice(), tone: { 0: "good" } }],
            out: "heap = [" + list(heap) + "]",
            say: "All inserted. The root, **" + heap[0] + "**, is the " + (min ? "smallest" : "biggest") + " value. The array is a valid heap, but notice it is **not sorted**: only each parent beats its own children.",
            result: heap.slice()
          });
        },
        code: PUSH_CODE,
        call: (fn, inp) => fn(inp.nums, inp.kind)
      },

      {
        id: "pop",
        title: "Pop: take the top and sink the replacement",
        intro: "The input must already be a valid **min-heap** (the default is). Each pop returns the root, moves the **last** value to the top and sinks it, always towards the **smaller child**.",
        codeIntro: "The sink loop (`while (true)`) is the heart of every heap. Heapify and heap sort reuse it.",
        viz: "heap",
        legend: [["good", "value taken out / settled"], ["cur", "value sinking down"], ["mark", "children being compared"], ["bad", "old root (hole to fill)"]],
        inputs: [
          { type: "numlist", name: "heap", label: "A valid min-heap", value: [1, 3, 2, 5, 9, 8], len: [3, 10], min: 1, max: 99 },
          { type: "number", name: "pops", label: "Pops", value: 2, min: 1, max: 3 }
        ],
        validate(inp) {
          const bad = badParent(inp.heap);
          if (bad >= 0) return "Not a valid min-heap: " + inp.heap[bad] + " (index " + bad + ") is smaller than its parent " + inp.heap[Math.floor((bad - 1) / 2)] + ". Try 1, 3, 2, 5, 9, 8.";
          return null;
        },
        random(rnd) {
          const len = rnd.int(3, 10);
          const nums = Array.from({ length: len }, () => rnd.int(1, 40));
          return { heap: list(heapify(nums)), pops: String(rnd.int(1, 3)) };
        },
        scene: (inp) => ({ caps: [inp.heap.length] }),
        frames(inp, snap) {
          const heap = inp.heap.slice();
          const removed = [];
          const view = (tone, extra) => Object.assign({ heaps: [{ label: "Min-heap", hint: "smallest on top", values: heap.slice(), tone }], boxes: [{ label: "taken out, in order", kind: "list", items: removed.slice() }] }, extra);
          snap(view({}, { at: ["start"], say: "This is the heap we start from, drawn as a tree (top) and as the array it really is (bottom). The smallest value, **" + heap[0] + "**, is at index 0." }));
          for (let k = 0; k < inp.pops && heap.length > 0; k++) {
            const top = heap[0];
            snap(view({ 0: "good" }, { at: ["top"], vars: { top }, say: "**Pop " + (k + 1) + ".** The smallest value is always the root, so the answer is **" + top + "**. Now we have to fill the hole it leaves, without breaking the tree shape." }));
            const last = heap.pop();
            if (heap.length === 0) {
              snap(view({}, { at: ["last"], vars: { top, last }, say: "That was the only value, so the heap is now empty. Nothing to fix." }));
            } else {
              snap(view({ 0: "bad" }, { at: ["last"], vars: { top, last }, say: "Take the **last** value, **" + last + "**, out of the array. The bottom-right node disappears, so the shape stays a complete tree. " + last + " will fill the hole at the root." }));
              heap[0] = last;
              snap(view({ 0: "cur" }, { at: ["root"], vars: { top, last }, say: "Put **" + last + "** on the root. The shape is right, but " + last + " is probably too big to be the minimum, so heap order may be broken at the top." }));
              let i = 0;
              for (;;) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let small = i;
                if (l < heap.length && heap[l] < heap[small]) small = l;
                if (r < heap.length && heap[r] < heap[small]) small = r;
                const tone = { [i]: "cur" };
                if (l < heap.length) tone[l] = "mark";
                if (r < heap.length) tone[r] = "mark";
                const kids = [l, r].filter((c) => c < heap.length).map((c) => heap[c]);
                if (small === i) {
                  tone[i] = "good";
                  snap(view(tone, { at: ["stop"], vars: { top, i }, say: kids.length ? "**" + heap[i] + "** has " + kidsOf(kids) + ", and " + (kids.length === 1 ? "that is not smaller" : "neither is smaller") + ", so heap order holds. **Stop**." : "**" + heap[i] + "** has no children (it is a leaf), so it cannot sink any further. **Stop**." }));
                  break;
                }
                snap(view(tone, { at: ["kids"], vars: { top, i, small }, say: "Compare **" + heap[i] + "** with " + kidsOf(kids) + ". The smallest is **" + heap[small] + "** (index " + small + "), and it is smaller than " + heap[i] + ", so swap with it." + (kids.length === 2 ? " (Always the **smaller** child, or the bigger one would end up above it.)" : "") }));
                [heap[i], heap[small]] = [heap[small], heap[i]];
                snap(view({ [small]: "cur", [i]: "mark" }, { at: ["swap"], vars: { top, i: small }, say: "Swapped: **" + heap[i] + "** moved up to index " + i + ", and " + heap[small] + " sank to index " + small + "." }));
                i = small;
              }
            }
            removed.push(top);
            snap(view({}, { at: ["out"], vars: { top }, say: "Pop " + (k + 1) + " done. Handed back **" + top + "**." + (heap.length ? " The new root is **" + heap[0] + "**, the next smallest." : " The heap is empty now.") }));
          }
          snap(view({}, { at: ["done"], out: "removed = [" + list(removed) + "]", say: "The values came out in **increasing order**: that is exactly why popping a heap n times is heap sort.", result: removed.slice() }));
        },
        code: POP_CODE,
        call: (fn, inp) => fn(inp.heap, inp.pops)
      },

      {
        id: "heapify",
        title: "Build a heap from a whole array (heapify)",
        intro: "Pushing n values one by one costs O(n log n). A faster way is to take the array as it is and **sink** every parent, starting from the last one and walking back to the root. Grey nodes already hold a valid heap below them.",
        codeIntro: "Same sink loop as in Pop, just run once per parent from the bottom up.",
        viz: "heap",
        legend: [["cur", "value being sunk"], ["mark", "its children"], ["done", "sub-heap already valid"], ["good", "settled"]],
        inputs: [{ type: "numlist", name: "nums", label: "Array", value: [4, 10, 3, 5, 1], len: [3, 10], min: 1, max: 99 }],
        scene: (inp) => ({ caps: [inp.nums.length] }),
        frames(inp, snap) {
          const heap = inp.nums.slice();
          const n = heap.length;
          const view = (s, tone, extra) => {
            const t = {};
            for (let j = s + 1; j < n; j++) t[j] = "done";
            return Object.assign({ heaps: [{ label: "Min-heap (being built)", hint: "grey = valid below", values: heap.slice(), tone: Object.assign(t, tone) }] }, extra);
          };
          const first = Math.floor(n / 2) - 1;
          snap(view(n, {}, { at: ["copy"], say: "Start with the array exactly as given and just *read* it as a tree: index 0 is the root, then each row left to right. It is **not** a heap yet." }));
          for (let s = first; s >= 0; s--) {
            let i = s;
            snap(view(s, { [s]: "cur" }, { at: ["start"], vars: { s }, say: s === first ? "The **last parent** is at index " + s + " = ⌊" + n + " / 2⌋ − 1. Everything after it is a leaf, and a lone node is already a valid heap, so we begin here and walk back to the root." : "Next parent back: index **" + s + "** (value " + heap[s] + "). Its two sub-trees are already valid heaps, so we only need to sink " + heap[s] + " into the right place." }));
            for (;;) {
              const l = 2 * i + 1, r = 2 * i + 2;
              let small = i;
              if (l < n && heap[l] < heap[small]) small = l;
              if (r < n && heap[r] < heap[small]) small = r;
              const tone = { [i]: "cur" };
              if (l < n) tone[l] = "mark";
              if (r < n) tone[r] = "mark";
              const kids = [l, r].filter((c) => c < n).map((c) => heap[c]);
              if (small === i) {
                tone[i] = "good";
                snap(view(s, tone, { at: ["stop"], vars: { s, i }, say: kids.length ? "**" + heap[i] + "** versus " + kidsOf(kids) + ": it is not bigger, so it stays. This sub-tree is a heap." : "**" + heap[i] + "** is a leaf: nothing below it, so this sub-tree is a heap." }));
                break;
              }
              snap(view(s, tone, { at: ["kids"], vars: { s, i, small }, say: "**" + heap[i] + "** versus " + kidsOf(kids) + ": the smallest is **" + heap[small] + "** (index " + small + "), which is smaller than " + heap[i] + ", so swap." }));
              [heap[i], heap[small]] = [heap[small], heap[i]];
              snap(view(s, { [small]: "cur", [i]: "mark" }, { at: ["swap"], vars: { s, i: small }, say: "Swapped: **" + heap[i] + "** now sits at index " + i + ", and " + heap[small] + " sank to index " + small + "." }));
              i = small;
            }
          }
          snap({
            at: ["done"],
            heaps: [{ label: "Min-heap", hint: "smallest on top", values: heap.slice(), tone: { 0: "good" } }],
            out: "heap = [" + list(heap) + "]",
            say: "Done in one pass, bottom to top. Most nodes were near the bottom and could only sink a level or two, which is why the whole build is O(n), not O(n log n).",
            result: heap.slice()
          });
        },
        code: HEAPIFY_CODE,
        call: (fn, inp) => fn(inp.nums)
      }
    ],

    mistakes: [
      {
        oops: "Thinking the array of a heap is sorted",
        why: "Only parent ≤ child is guaranteed. `[1, 3, 2, 5, 9, 8]` is a perfectly good min-heap, and 3 comes before 2.",
        fix: "Only ever trust index 0. To read values in order, pop repeatedly (or sort a copy)."
      },
      {
        oops: "Swapping with the wrong child while sinking",
        why: "If you swap with the bigger child in a min-heap, that bigger value ends up above the smaller child and the order breaks again.",
        fix: "In a min-heap always swap with the **smaller** child (in a max-heap, the bigger one)."
      },
      {
        oops: "Mixing up index formulas (0-based vs 1-based)",
        why: "With 0-based arrays the children are `2i + 1` and `2i + 2`; the `2i` and `2i + 1` formulas belong to 1-based arrays. A mix-up quietly gives a wrong tree.",
        fix: "Pick one convention. For JavaScript arrays use 0-based: left `2i + 1`, right `2i + 2`, parent `floor((i - 1) / 2)`."
      },
      {
        oops: "Forgetting the bounds check on the children",
        why: "Near the bottom, `2i + 1` or `2i + 2` can be past the end of the array. Comparing with `undefined` gives silently wrong swaps.",
        fix: "Always write `l < heap.length && …` before reading `heap[l]`."
      },
      {
        oops: "Using `Array.sort` after every insert as a “priority queue”",
        why: "That is O(n log n) per insert; the heap does the same job in O(log n).",
        fix: "Use a real heap whenever you repeatedly need the min or max while data keeps changing."
      },
      {
        oops: "Negating values for a max-heap and forgetting to negate back",
        why: "Pushing `-x` into a min-heap gives a max-heap, but `peek()` now returns `-max`.",
        fix: "Negate when you push **and** when you read, or write the heap with a comparator."
      }
    ],

    remember: {
      mnemonic: "Push: add at the END, bubble UP. Pop: root out, LAST to the top, sink DOWN to the better child. Peek is free.",
      rules: [
        "Complete tree in an array: children `2i+1`, `2i+2`; parent `floor((i-1)/2)`.",
        "Min-heap: the smallest is the root. Max-heap: the biggest is the root.",
        "push / pop = O(log n), peek = O(1), build from an array = O(n).",
        "A heap is not sorted and cannot search quickly.",
        "“K largest” uses a **min**-heap of size K (the Top-K topic)."
      ],
      template: {
        lines: [
          [`push(x): arr.push(x); i = last; while parent beats arr[i]: swap; i = parent`, "Sift up."],
          [`pop(): top = arr[0]; arr[0] = arr.pop(); sink(0); return top`, "Replace the root with the last value, then sink."],
          [`sink(i): pick the best of i, left, right; if it is not i: swap, repeat from there`, "Sift down."],
          [`heapify: for i = floor(n/2)-1 down to 0: sink(i)`, "O(n) build."]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own code is in `Problems/Tree/heap.js` (a min and max heap). Good practice after this page: *Last Stone Weight* (max-heap), *Merge K Sorted Lists* (min-heap of list heads), *Kth Largest* (see the Top-K topic)."
        }
      ]
    },

    practice: {
      title: "Heap Sort With Your Own Min-Heap",
      level: "Medium",
      problem: "Write `heapSort(nums)` that returns the numbers in **ascending order**. You may not use `sort`. Instead, write a small min-heap (a `push` and a `pop`) inside the function, push every number, then pop until the heap is empty.",
      examples: [
        { input: "nums = [5, 3, 8, 1, 9, 2]", output: "[1, 2, 3, 5, 8, 9]" },
        { input: "nums = [4, 4, 1]", output: "[1, 4, 4]", why: "Duplicates are fine." },
        { input: "nums = []", output: "[]" }
      ],
      hints: [
        "You need two helpers: `push(x)` (append, then bubble up while the parent is bigger) and `pop()` (take index 0, move the last value to index 0, sink it).",
        "Sorting is then just: for each number `push` it; afterwards, `while (heap.length)` push the result of `pop()` onto an answer array.",
        "In `pop`, remember the case where the heap had only one element: after `heap.pop()` there is nothing to sink."
      ],
      solution: {
        explain: [
          "Pushing n numbers costs n × O(log n), and popping n times costs another n × O(log n), so the total is O(n log n). The values come out of a min-heap smallest first, so the answer array is already ascending.",
          "It needs O(n) extra space for the heap. (The in-place version of heap sort reuses the input array as a max-heap.)"
        ],
        code: {
          fn: "heapSort",
          lines: [
            `function heapSort(nums) {`,
            [`  const heap = [];`, "The heap lives in a plain array."],
            `  const push = (x) => {`,
            [`    heap.push(x);`, "Add at the end..."],
            `    let i = heap.length - 1;`,
            `    while (i > 0) {`,
            `      const p = Math.floor((i - 1) / 2);`,
            [`      if (heap[p] <= heap[i]) break;`, "...and bubble up while the parent is bigger."],
            `      [heap[p], heap[i]] = [heap[i], heap[p]];`,
            `      i = p;`,
            `    }`,
            `  };`,
            `  const pop = () => {`,
            [`    const top = heap[0];`, "The smallest value."],
            `    const last = heap.pop();`,
            `    if (heap.length > 0) {`,
            [`      heap[0] = last;`, "Last value goes to the root..."],
            `      let i = 0;`,
            `      while (true) {`,
            `        const l = 2 * i + 1, r = 2 * i + 2;`,
            `        let small = i;`,
            `        if (l < heap.length && heap[l] < heap[small]) small = l;`,
            `        if (r < heap.length && heap[r] < heap[small]) small = r;`,
            [`        if (small === i) break;`, "...and sinks to the smaller child until it fits."],
            `        [heap[i], heap[small]] = [heap[small], heap[i]];`,
            `        i = small;`,
            `      }`,
            `    }`,
            `    return top;`,
            `  };`,
            [`  for (const x of nums) push(x);`, "Push everything: O(n log n)."],
            `  const sorted = [];`,
            [`  while (heap.length > 0) sorted.push(pop());`, "Popping gives the values smallest first."],
            `  return sorted;`,
            `}`
          ]
        }
      },
      tests: [
        { args: [[5, 3, 8, 1, 9, 2]], expect: [1, 2, 3, 5, 8, 9] },
        { args: [[4, 4, 1]], expect: [1, 4, 4] },
        { args: [[]], expect: [] },
        { args: [[7]], expect: [7] },
        { args: [[9, 8, 7, 6, 5, 4, 3, 2, 1]], expect: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { args: [[-3, 10, 0, -3, 2]], expect: [-3, -3, 0, 2, 10] }
      ]
    },

    recall: [
      { q: "What two properties define a heap?", a: "A complete binary tree (no gaps, filled left to right) plus the heap order: every parent ≤ its children (min-heap) or ≥ (max-heap)." },
      { q: "Where are the children and parent of index i (0-based)?", a: "Left `2i + 1`, right `2i + 2`, parent `floor((i - 1) / 2)`." },
      { q: "Describe push and pop in one line each.", a: "Push: append at the end, sift up while it beats its parent. Pop: take the root, move the last value to the root, sift down by swapping with the better child." },
      { q: "Costs of peek, push, pop and building a heap from n values?", a: "O(1), O(log n), O(log n), and O(n) for the bottom-up build." },
      { q: "Is the heap's array sorted? Can you search it fast?", a: "No to both. Only the root is special; finding an arbitrary value is O(n)." }
    ],

    related: {
      topics: ["top-k", "two-heaps-median", "quickselect", "tree-types-overview", "queue-deque", "graph-bfs"],
      files: ["Problems/Tree/heap.js"]
    }
  });
})();
