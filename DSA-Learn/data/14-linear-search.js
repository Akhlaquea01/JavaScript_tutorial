// Linear Search — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "linear-search",
  group: "searching",
  emoji: "➡️",
  title: "Linear Search",
  tagline: "Check items one by one from the start until you find the target or run out. Simple, works on any data, and sometimes exactly the right tool.",
  level: "Starter",
  needs: ["searching"],

  gist: [
    "Walk from index 0 to the end, comparing each item with the target. Return the index on a match, else `-1`.",
    "Works on **unsorted** and sorted data, arrays and linked lists alike.",
    "Time **O(n)** worst case (target last or missing), **O(1)** best case; space **O(1)**.",
    "Best for small data, unsorted data you search once, and structures with no random access (linked lists)."
  ],

  complexity: {
    time: "O(n)",
    space: "O(1)",
    why: [
      "In the worst case the target is the last item or not there at all, so every one of the n items is looked at once: O(n). The best case is the first item: O(1).",
      "The loop only needs an index variable, so extra memory is O(1)."
    ],
    more: [
      {
        type: "table",
        heading: "Cases",
        columns: ["Case", "When", "Looks"],
        rows: [
          ["Best", "Target is the first item", "1"],
          ["Average", "Target is somewhere in the middle", "about n / 2"],
          ["Worst", "Target is last, or missing", "n"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "Linear search is the most natural search in the world: start at the first item, check it, move to the next, and stop when you find what you want or reach the end.",
      "It makes no assumption about the data, so it works when nothing else can: the list is unsorted, it is a linked list with no index access, or it is so small that anything cleverer would just add overhead.",
      "Its weakness is that cost grows in a straight line with the size of the data. For one search that is fine. For thousands of searches on big data, switch to a Set / Map or binary search."
    ],
    signals: [
      "The data is **unsorted** and you only need **one** answer.",
      "The collection is **small**, where sorting or hashing costs more than scanning.",
      "You are working with a **linked list** (no direct index access).",
      "You need the **first / last / every** position of a value or the first item matching a **condition** (not just an equal value)."
    ],
    notFor: [
      "Large **sorted** data where you search repeatedly: use binary search.",
      "Repeated membership questions on large data: use a Set or Map."
    ],
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "In JavaScript, `indexOf`, `includes`, `find` and `findIndex` are all linear searches under the hood. Each costs O(n) per call."
      }
    ]
  },

  analogy: {
    title: "Looking for your keys by checking every pocket",
    story: [
      "You lost your keys in your jacket. You check the left pocket, then the right pocket, then the inside pocket, and so on, one at a time, until you find them or have checked every pocket. There is no cleverer plan, because the keys could be in any pocket.",
      "With a few pockets that is perfectly fine. With a warehouse of ten thousand boxes it would be slow, which is when you wish you had labelled the boxes (a hash map) or arranged them in order (binary search)."
    ],
    map: [
      ["Checking pockets one by one", "The `for` loop over indexes"],
      ["Keys found", "`arr[i] === target`, return `i`"],
      ["Checked every pocket, no keys", "Loop ends, return `-1`"],
      ["Keys in the very first pocket", "Best case O(1)"],
      ["Keys in the last pocket or missing", "Worst case O(n)"]
    ],
    breaks: "You would not re-check pockets you already emptied, and neither does linear search. But unlike a person, it cannot guess which pocket is likely, so every pocket is equally suspect."
  },

  demos: [
    {
      id: "scan",
      title: "Scan until the first match",
      intro: "Each step compares one item with the target. It **stops early** on a match, so the number of looks depends on where the target is. Try a target that is missing.",
      codeIntro: "Returns the index of the first match, or `-1`.",
      viz: "array",
      legend: [["cur", "item being checked"], ["done", "already checked, no match"], ["good", "found"]],
      inputs: [
        { type: "numlist", name: "arr", label: "Array (any order)", value: [8, 3, 9, 4, 7, 4], len: [4, 10], min: 1, max: 20 },
        { type: "number", name: "target", label: "Target", value: 4, min: 1, max: 20 }
      ],
      random(rnd) {
        const n = rnd.int(5, 9);
        const arr = Array.from({ length: n }, () => rnd.int(1, 15));
        const target = rnd() < 0.7 ? arr[rnd.int(0, n - 1)] : rnd.int(16, 20);
        return { arr: arr.join(", "), target: String(target) };
      },
      frames(inp, snap) {
        const span = DSA.util.span;
        const a = inp.arr;
        const T = inp.target;
        const view = (extra) => Object.assign({ label: "arr", cells: a, vars: { target: T } }, extra);

        snap(view({ at: ["loop"], say: "We look for **" + T + "**. Start at index 0 and check items one at a time, in order." }));
        for (let i = 0; i < a.length; i++) {
          if (a[i] === T) {
            snap(view({
              at: ["loop", "check"],
              ptr: { i },
              tone: { ...span(0, i - 1, "done"), [i]: "good" },
              out: T + " found at index " + i + " after " + (i + 1) + " look" + (i === 0 ? "" : "s"),
              say: "arr[" + i + "] = " + a[i] + " **equals** the target. Found at index **" + i + "** after " + (i + 1) + " look" + (i === 0 ? "" : "s") + ". We stop right away, without checking the rest.",
              result: i
            }));
            return;
          }
          snap(view({
            at: ["loop", "check"],
            ptr: { i },
            tone: { ...span(0, i - 1, "done"), [i]: "cur" },
            say: "arr[" + i + "] = " + a[i] + " is not " + T + ". Move to the next item."
          }));
        }
        snap(view({
          at: ["notfound"],
          tone: span(0, a.length - 1, "done"),
          out: T + " is not in the array (" + a.length + " looks)",
          outTone: "bad",
          say: "We checked **all " + a.length + "** items and none matched, so return **-1**. Missing targets always cost the full n looks.",
          result: -1
        }));
      },
      code: {
        fn: "linearSearch",
        lines: [
          `function linearSearch(arr, target) {`,
          [`  for (let i = 0; i < arr.length; i++) {`, "Go through every index in order.", "loop"],
          [`    if (arr[i] === target) return i;`, "A match: return its index immediately (early exit).", "check"],
          `  }`,
          [`  return -1;`, "Checked everything and found nothing.", "notfound"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.arr, inp.target)
    },

    {
      id: "all",
      title: "Find every position of a value",
      intro: "When you need **all** matches there is no early exit: the scan must reach the end. Matches are collected in a list.",
      codeIntro: "Returns every index where `target` appears.",
      viz: "array",
      legend: [["cur", "item being checked"], ["good", "a match"], ["done", "checked, no match"]],
      inputs: [
        { type: "numlist", name: "arr", label: "Array", value: [2, 5, 2, 7, 2, 9], len: [4, 10], min: 1, max: 9 },
        { type: "number", name: "target", label: "Target", value: 2, min: 1, max: 9 }
      ],
      frames(inp, snap) {
        const a = inp.arr;
        const T = inp.target;
        const hits = [];
        const matched = () => Object.fromEntries(hits.map((i) => [i, "good"]));
        const box = (fresh) => ({ label: "hits (indexes)", kind: "list", items: hits.map((v, k) => ({ v, new: fresh && k === hits.length - 1 })) });
        const view = (extra) => Object.assign({ label: "arr", cells: a, boxes: [box()], vars: { target: T } }, extra);

        snap(view({ at: ["init"], say: "We need **every** index where the value is " + T + ", so we cannot stop at the first match. `hits` starts empty." }));
        for (let i = 0; i < a.length; i++) {
          const hit = a[i] === T;
          if (hit) hits.push(i);
          snap(view({
            at: ["loop", "check"],
            ptr: { i },
            tone: { ...matched(), [i]: hit ? "good" : "cur" },
            boxes: [box(hit)],
            say: hit ? "arr[" + i + "] = " + a[i] + " is a match: add index **" + i + "** to `hits`." : "arr[" + i + "] = " + a[i] + " is not " + T + ". Carry on."
          }));
        }
        snap(view({
          at: ["done"],
          tone: matched(),
          out: hits.length ? T + " found at index" + (hits.length > 1 ? "es " : " ") + hits.join(", ") : T + " not found",
          outTone: hits.length ? undefined : "bad",
          say: hits.length ? "We reached the end. **" + T + "** appears at " + (hits.length > 1 ? "indexes " : "index ") + "**" + hits.join(", ") + "**. Collecting every match always costs a full O(n) scan." : "We reached the end with no match: the list of hits is empty.",
          result: hits.slice()
        }));
      },
      code: {
        fn: "findAll",
        lines: [
          `function findAll(arr, target) {`,
          [`  const hits = [];`, "Indexes where the target appears.", "init"],
          [`  for (let i = 0; i < arr.length; i++) {`, "No early exit this time: look at every item.", "loop"],
          [`    if (arr[i] === target) hits.push(i);`, "Record each match instead of returning.", "check"],
          `  }`,
          [`  return hits;`, "May be empty, one index, or many.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.arr, inp.target)
    }
  ],

  mistakes: [
    {
      oops: "Forgetting the “not found” return (falling off the end of the function)",
      why: "The function then returns `undefined`, which callers may mistake for a real answer or crash on.",
      fix: "Always end with an explicit `return -1` (or `null`)."
    },
    {
      oops: "Using `==` instead of `===` when comparing",
      why: "Loose equality converts types (`\"5\" == 5` is true), so you can match the wrong thing.",
      fix: "Use `===` unless you really want coercion."
    },
    {
      oops: "Calling `indexOf` / `includes` inside a loop over big data",
      why: "Each call is a hidden linear search, so the loop becomes O(n²).",
      fix: "Build a Set / Map once and look up in O(1)."
    },
    {
      oops: "Trying to index into a linked list (`list[i]`)",
      why: "Linked lists have no random access. Reaching position i means following i links from the head.",
      fix: "Walk with a pointer: `while (node) { ...; node = node.next }`."
    },
    {
      oops: "Returning the **item** when the caller expects the **index** (or the reverse)",
      why: "The two are different numbers. The mix-up shows up as off-by-one or wrong-value bugs.",
      fix: "Name things `index` and `value`, and document what you return."
    }
  ],

  remember: {
    mnemonic: "Check each item in turn; match → return the index; end of list → return -1.",
    rules: [
      "Worst case O(n), best case O(1), space O(1).",
      "Early exit for “first match”, full scan for “every match / count”.",
      "`indexOf`, `includes`, `find` are linear searches. Do not hide them inside loops.",
      "Sorted data + many searches? Switch to binary search."
    ],
    template: {
      lines: [
        [`for (let i = 0; i < arr.length; i++) {`, "Visit each index."],
        [`  if (matches(arr[i])) return i;`, "First item that satisfies the condition."],
        `}`,
        [`return -1;`, "Nothing matched."]
      ]
    }
  },

  practice: {
    title: "Find the Last Occurrence",
    level: "Easy",
    problem: "Return the **last** index where `target` appears in the array, or `-1` if it does not appear.",
    examples: [
      { input: "[1, 2, 3, 2, 1], target = 2", output: "3" },
      { input: "[5], target = 5", output: "0" },
      { input: "[1, 2, 3], target = 4", output: "-1" }
    ],
    hints: [
      "You want the *last* match, so a plain forward scan that returns on the first match is the wrong shape.",
      "Option A: scan the whole array and remember the latest index that matched.",
      "Option B (smarter): scan **from the end** and return on the first match you meet."
    ],
    solution: {
      explain: [
        "Scanning from the end means the first match we meet is the last one in the array, so we can exit early. In the worst case (target absent) it is still O(n).",
        "Time O(n), space O(1)."
      ],
      code: {
        fn: "lastIndex",
        lines: [
          `function lastIndex(arr, target) {`,
          [`  for (let i = arr.length - 1; i >= 0; i--) {`, "Start at the last index and walk backwards."],
          [`    if (arr[i] === target) return i;`, "The first match from the end is the last occurrence."],
          `  }`,
          [`  return -1;`, "Not found anywhere."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[1, 2, 3, 2, 1], 2], expect: 3 },
      { args: [[5], 5], expect: 0 },
      { args: [[1, 2, 3], 4], expect: -1 },
      { args: [[], 1], expect: -1 },
      { args: [[7, 7, 7], 7], expect: 2 },
      { args: [[4, 1, 4], 1], expect: 1 }
    ]
  },

  recall: [
    { q: "What are the best and worst cases of linear search?", a: "Best O(1) (first item matches). Worst O(n) (last item or not present)." },
    { q: "Does linear search need sorted data?", a: "No. It works on any order, which is its main advantage." },
    { q: "Why is `indexOf` inside a loop a performance trap?", a: "`indexOf` is a linear search, so the loop becomes O(n²). Use a Set or Map instead." },
    { q: "How do you get *all* positions of a value, and what does it cost?", a: "Scan the whole array and push every matching index: always O(n), with no early exit." },
    { q: "Why is a linked list searched linearly?", a: "It has no random access: to reach an item you must follow the links from the head." }
  ],

  related: {
    topics: ["searching", "binary-search", "hashset", "linked-list"],
    files: ["Problems/Array/findMaxNumFromArr.js", "Problems/Array/containsDuplicate.js", "Problems/Strings/firstOccurance.js"]
  }
});
