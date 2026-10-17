// Intervals — Overlap & Merge — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const pair = (iv) => "[" + iv[0] + ", " + iv[1] + "]";
  const pairs = (a) => "[" + a.map(pair).join(", ") + "]";
  const maxEnd = (ivs) => Math.max(...ivs.map((p) => p[1]));

  const OVERLAP_CODE = {
    fn: "OVERLAP",
    lines: [
      `function OVERLAP(a1, a2, b1, b2) {`,
      [`  const startsBeforeBEnds = a1 <= b2;`, "Test 1: A starts at or before the moment B ends.", "c1"],
      [`  const endsAfterBStarts = b1 <= a2;`, "Test 2: B starts at or before the moment A ends.", "c2"],
      [`  const overlaps = startsBeforeBEnds && endsAfterBStarts;`, "They overlap only when **both** are true. (If either fails, one interval is completely over before the other begins.)", "both"],
      [`  const size = overlaps ? Math.min(a2, b2) - Math.max(a1, b1) : 0;`, "The shared part runs from the **later start** to the **earlier end**.", "size"],
      [`  return { overlaps, size };`, "", "size"],
      `}`
    ]
  };

  const MERGE_CODE = {
    fn: "MERGE",
    lines: [
      `function MERGE(intervals) {`,
      [`  const sorted = intervals.map((iv) => iv.slice()).sort((a, b) => a[0] - b[0]);`, "**Sort by start time** (always give `sort` a comparator in JavaScript). After this, an overlap can only happen with the interval right before.", "sort"],
      [`  const merged = [sorted[0]];`, "The first interval starts the answer.", "first"],
      `  for (let i = 1; i < sorted.length; i++) {`,
      [`    const last = merged[merged.length - 1];`, "The most recently merged interval.", "compare"],
      [`    const cur = sorted[i];`, "The next interval.", "compare"],
      [`    if (cur[0] <= last[1]) {`, "It starts before (or exactly when) the last one ends: they **overlap**.", "compare"],
      [`      last[1] = Math.max(last[1], cur[1]);`, "Stretch the last interval to the **later** end. We need `max`: cur may sit completely inside last.", "merge"],
      `    } else {`,
      [`      merged.push(cur);`, "A gap: cur starts a new merged interval.", "gap"],
      `    }`,
      `  }`,
      [`  return merged;`, "", "done"],
      `}`
    ]
  };

  const ATTEND_CODE = {
    fn: "canAttendAll",
    lines: [
      `function canAttendAll(intervals) {`,
      [`  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);`, "Sort by start."],
      `  for (let i = 1; i < sorted.length; i++) {`,
      [`    if (sorted[i][0] < sorted[i - 1][1]) return false;`, "The next meeting starts before the previous one ended: a clash. Meetings that merely touch (end 5, start 5) are fine."],
      `  }`,
      `  return true;`,
      `}`
    ]
  };

  const INTERSECT_CODE = {
    fn: "intervalIntersection",
    lines: [
      `function intervalIntersection(A, B) {`,
      `  const result = [];`,
      [`  let i = 0, j = 0;`, "Two pointers, one per list (both lists are sorted and have no overlaps inside themselves)."],
      `  while (i < A.length && j < B.length) {`,
      [`    const lo = Math.max(A[i][0], B[j][0]);`, "Later start..."],
      [`    const hi = Math.min(A[i][1], B[j][1]);`, "...earlier end."],
      [`    if (lo <= hi) result.push([lo, hi]);`, "If they share anything, record the shared part."],
      [`    if (A[i][1] < B[j][1]) i++;`, "The one that **ends first** can not overlap anything further along the other list, so move its pointer."],
      `    else j++;`,
      `  }`,
      `  return result;`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "intervals",
    group: "intervals",
    emoji: "📅",
    title: "Intervals — Overlap & Merge",
    tagline: "Ranges like meetings or bookings: sort them by start time, and then an overlap can only happen with the previous one, which makes merging, inserting and checking clashes a single pass.",
    level: "Core",
    needs: ["two-pointer"],

    gist: [
      "An **interval** `[start, end]` is a continuous range: a meeting, a booking, a time slot.",
      "Two intervals overlap when **`a1 <= b2` and `b1 <= a2`** (closed intervals). If either test fails, one is entirely over before the other starts.",
      "**Sort by start time first.** Afterwards an interval can only overlap the one just before it (the last merged), so a single left-to-right pass is enough.",
      "Time **O(n log n)** because of the sort, then O(n). Questions about “how many at once” need the Sweep Line; “how many to remove” need Greedy."
    ],

    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      why: [
        "Sorting the intervals by start costs O(n log n) and dominates. The pass that merges or checks clashes after that is O(n). If the input is **already sorted** (Insert Interval, list intersection), the whole thing is just O(n) or O(m + n).",
        "The answer list needs up to O(n) space. (How much extra memory the sort uses depends on the language.)"
      ]
    },

    idea: {
      plain: [
        "Draw every interval as a bar on a time line. Two bars **overlap** if they share any point. The easy way to think about it is the opposite: two intervals do **not** overlap only when one finishes before the other starts (`a2 < b1` or `b2 < a1`). Negate that and you get the overlap test: **`a1 <= b2 && b1 <= a2`**.",
        "Comparing every pair would be O(n²). The trick is to **sort by start time**. Then, reading left to right, if the current interval does not touch the one before it (the last merged), no later interval can touch that one either, because they all start even later. So you only ever compare with the **last merged** interval.",
        "To merge: if `cur.start <= last.end`, stretch the last interval to `max(last.end, cur.end)`. The `max` is important because the current interval might sit entirely inside the last one. Otherwise there is a gap, so the current interval starts a new group."
      ],
      signals: [
        "Meetings, bookings, time slots, flights, IP ranges, anything written as `[start, end]`.",
        "“**Merge** overlapping…”, “**insert** an interval…”, “can a person attend **all** meetings?”, “common free time”, “**intersection** of two lists of intervals”.",
        "The input is not sorted and order does not matter: the first step is almost always **sort by start**."
      ],
      notFor: [
        "“How many meetings are running **at the same time**?”: use the Sweep Line.",
        "“What is the **most** meetings I can attend?” or “minimum to remove”: use a Greedy rule (sort by **end**)."
      ],
      more: [
        {
          type: "table",
          heading: "The four ways two intervals can sit",
          columns: ["Case", "Picture", "Overlap?", "Example"],
          rows: [
            ["Disjoint", "A ends before B starts", "No", "[1, 3] and [5, 7]"],
            ["Partial overlap", "They share a middle part", "Yes", "[1, 5] and [3, 8]"],
            ["Contained", "B sits completely inside A", "Yes (use `max` of the ends!)", "[1, 10] and [3, 4]"],
            ["Touching", "A ends exactly where B starts", "Closed: yes. Half-open `[s, e)`: no", "[1, 4] and [4, 6]"]
          ]
        },
        {
          type: "points",
          heading: "Clarify before you code",
          items: [
            "**Closed or half-open?** In *Merge Intervals* `[1, 4]` and `[4, 5]` merge (use `<=`). In *Meeting Rooms*, a meeting can start the moment another ends (use `<`).",
            "Is the input **sorted** already? If not, sort by start with `(a, b) => a[0] - b[0]`. JavaScript's plain `sort()` compares as text: `[10, 9, 1, 2].sort()` gives `[1, 10, 2, 9]`.",
            "Should the input be left **unchanged**? Then push **copies** of the intervals instead of editing them."
          ]
        },
        {
          type: "table",
          heading: "Which tool for which question",
          columns: ["Question", "Tool"],
          rows: [
            ["Do these overlap? Merge them? Can I attend everything?", "Sort by start, one pass (this topic)"],
            ["Two sorted lists: what do they share?", "Two pointers (code below)"],
            ["How many are active at the same moment? Minimum rooms?", "Sweep Line (next topic)"],
            ["Most non-overlapping / fewest to remove?", "Greedy: sort by **end** (Greedy topic)"]
          ]
        },
        {
          type: "code",
          title: "Meeting Rooms I: can one person attend all meetings? (verified code)",
          code: ATTEND_CODE
        },
        {
          type: "code",
          title: "Intersection of two sorted interval lists (verified code)",
          code: INTERSECT_CODE
        }
      ]
    },

    analogy: {
      title: "A wall calendar",
      story: [
        "Imagine meetings drawn as coloured strips across a wall calendar, one strip per meeting, all lined up on the same time axis. Two strips are in conflict when they share some stretch of time.",
        "To tidy the calendar you read it **from morning to evening**, i.e. sorted by start time. You keep the current block of busy time in your hand. Next strip starts before your block ends? Then it is part of the same busy block: stretch the block if the strip runs further. Next strip starts after your block ends? Put the block down: there is a free gap, and a new busy block begins."
      ],
      map: [
        ["Strips on the calendar", "Intervals `[start, end]`"],
        ["Reading morning to evening", "Sort by start time"],
        ["The busy block in your hand", "The last merged interval"],
        ["Strip starts before the block ends", "`cur.start <= last.end`: overlap"],
        ["Stretch the block to the later end", "`last.end = max(last.end, cur.end)`"],
        ["Free gap, a new block starts", "`merged.push(cur)`"]
      ],
      breaks: "On a real calendar you can see the whole day at once. In code you only know the intervals in the order you read them, which is exactly why sorting by start matters."
    },

    demos: [
      {
        id: "overlap",
        title: "Do two intervals overlap?",
        intro: "Enter two intervals **A** and **B**. Two quick tests decide it: does A start before B ends, and does B start before A ends? Try a **contained** pair like A = 1–10, B = 3–4, a **touching** pair like 1–4 and 4–6, and a **disjoint** pair like 1–3 and 5–7.",
        codeIntro: "Two comparisons are the whole idea. Everything else in this topic builds on them.",
        viz: "intervals",
        legend: [["cur", "A"], ["mark", "B"], ["good", "overlap"], ["bad", "no overlap"]],
        inputs: [
          { type: "number", name: "a1", label: "A start", value: 2, min: 0, max: 19 },
          { type: "number", name: "a2", label: "A end", value: 7, min: 1, max: 20 },
          { type: "number", name: "b1", label: "B start", value: 5, min: 0, max: 19 },
          { type: "number", name: "b2", label: "B end", value: 11, min: 1, max: 20 }
        ],
        validate: (inp) => (inp.a1 >= inp.a2 ? "A: the start must be smaller than the end." : inp.b1 >= inp.b2 ? "B: the start must be smaller than the end." : null),
        random(rnd) {
          const a1 = rnd.int(0, 14);
          const b1 = rnd.int(0, 14);
          return { a1: String(a1), a2: String(a1 + rnd.int(1, 6)), b1: String(b1), b2: String(b1 + rnd.int(1, 6)) };
        },
        scene: (inp) => ({ min: 0, max: Math.max(inp.a2, inp.b2, 4), n: 2, rows: 2, merged: true, mergedMax: 1 }),
        frames(inp, snap) {
          const { a1, a2, b1, b2 } = inp;
          const view = (tA, tB, extra) =>
            Object.assign(
              {
                intervals: [
                  { s: a1, e: a2, lane: 0, tone: tA, label: "A [" + a1 + ", " + a2 + "]" },
                  { s: b1, e: b2, lane: 1, tone: tB, label: "B [" + b1 + ", " + b2 + "]" }
                ],
                merged: [],
                mergedLabel: ""
              },
              extra
            );
          const t1 = a1 <= b2;
          const t2 = b1 <= a2;
          const overlaps = t1 && t2;
          const size = overlaps ? Math.min(a2, b2) - Math.max(a1, b1) : 0;
          snap(view("cur", "mark", { at: ["c1"], line: b2, lineLabel: "B ends: " + b2, vars: { a1, b2, "a1 <= b2": t1 }, say: "**Test 1:** does A start (**" + a1 + "**) at or before B ends (**" + b2 + "**)? " + a1 + " ≤ " + b2 + " is **" + t1 + "**." + (t1 ? "" : " A only starts after B is completely over, so there can be no overlap.") }));
          snap(view("cur", "mark", { at: ["c2"], line: a2, lineLabel: "A ends: " + a2, vars: { b1, a2, "b1 <= a2": t2 }, say: "**Test 2:** does B start (**" + b1 + "**) at or before A ends (**" + a2 + "**)? " + b1 + " ≤ " + a2 + " is **" + t2 + "**." + (t2 ? "" : " B only starts after A is completely over, so there can be no overlap.") }));
          const tone = overlaps ? "good" : "bad";
          snap(view(tone, tone, { at: ["both"], vars: { overlaps }, say: overlaps ? "Both tests are true, so the intervals **overlap**." : "At least one test is false, so one interval is entirely over before the other begins: **no overlap**." }));
          const lo = Math.max(a1, b1);
          const hi = Math.min(a2, b2);
          const shared = overlaps && size > 0;
          snap(
            view(tone, tone, {
              at: ["size"],
              merged: shared ? [{ s: lo, e: hi, tone: "good", label: "[" + lo + ", " + hi + "]" }] : [],
              mergedLabel: shared ? "shared part" : "",
              out: overlaps ? "overlap, shared length " + size : "no overlap",
              outTone: overlaps ? undefined : "bad",
              vars: { overlaps, size },
              say: !overlaps ? "No shared part: the size is 0." : shared ? "The shared part runs from the **later start** (" + lo + ") to the **earlier end** (" + hi + "): length **" + size + "**." : "They only touch at the single point " + lo + ". Closed intervals count that as an overlap (length 0); half-open intervals `[s, e)` would not.",
              result: { overlaps, size }
            })
          );
        },
        code: OVERLAP_CODE,
        call: (fn, inp) => fn(inp.a1, inp.a2, inp.b1, inp.b2)
      },

      {
        id: "merge",
        title: "Merge overlapping intervals",
        intro: "Intervals are sorted by start. Then each one is compared with the **last merged** interval (shown on the lower lane): overlap means stretch it, a gap means start a new one. The default is the classic `1-3, 2-6, 8-10, 15-18`. Try `1-4, 2-3` (one sits inside the other) and `1-4, 4-5` (touching).",
        codeIntro: "Sort, then one pass comparing with the last merged interval.",
        viz: "intervals",
        legend: [["cur", "interval being looked at"], ["good", "already merged in"], ["mark", "last merged interval"], ["dim", "not looked at yet"]],
        inputs: [{ type: "intervals", name: "intervals", label: "Intervals (start-end)", value: [[1, 3], [2, 6], [8, 10], [15, 18]], len: [2, 7], min: 0, max: 20 }],
        scene: (inp) => ({ min: 0, max: maxEnd(inp.intervals), n: inp.intervals.length, rows: inp.intervals.length, merged: true, mergedMax: inp.intervals.length }),
        frames(inp, snap) {
          const given = inp.intervals.map((p) => p.slice());
          const sorted = given.map((p) => p.slice()).sort((a, b) => a[0] - b[0]);
          const n = sorted.length;
          const tones = Array(n).fill(undefined);
          const merged = [sorted[0].slice()];
          const draw = (arr) => arr.map((p, i) => ({ s: p[0], e: p[1], tone: tones[i] }));
          const lane = (lastTone) => merged.map((p, i) => ({ s: p[0], e: p[1], tone: i === merged.length - 1 ? lastTone : "good" }));
          const same = JSON.stringify(given) === JSON.stringify(sorted);
          if (!same) snap({ at: ["sort"], intervals: draw(given), merged: [], mergedLabel: "merged so far", say: "The intervals as they were given. They are **not in order**, so the first job is to sort them by start time." });
          snap({ at: ["sort"], intervals: draw(sorted), merged: [], mergedLabel: "merged so far", say: same ? "The intervals are already in order of start time. (The code sorts anyway: it is cheap, and the input is not always sorted.)" : "Sorted by start time. Now an interval can only overlap the one **just before** it." });
          for (let i = 0; i < n; i++) tones[i] = i === 0 ? "good" : "dim";
          snap({ at: ["first"], intervals: draw(sorted), merged: lane("mark"), mergedLabel: "merged so far", vars: { last: pair(merged[0]) }, say: "The first interval **" + pair(sorted[0]) + "** starts the answer. Everything else is still waiting." });
          for (let i = 1; i < n; i++) {
            const cur = sorted[i];
            const last = merged[merged.length - 1];
            const overlap = cur[0] <= last[1];
            tones[i] = "cur";
            snap({ at: ["compare"], intervals: draw(sorted), merged: lane("mark"), mergedLabel: "merged so far", vars: { cur: pair(cur), last: pair(last) }, say: "Next interval **" + pair(cur) + "** versus the last merged **" + pair(last) + "**: does it start before the last one ends? " + cur[0] + " ≤ " + last[1] + " is **" + overlap + "**" + (overlap ? ": they **overlap**." : ": there is a **gap**.") });
            if (overlap) {
              const before = last[1];
              last[1] = Math.max(last[1], cur[1]);
              tones[i] = "good";
              snap({ at: ["merge"], intervals: draw(sorted), merged: lane("good"), mergedLabel: "merged so far", vars: { last: pair(last) }, say: cur[1] <= before ? pair(cur) + " sits completely inside the last interval, so `max(" + before + ", " + cur[1] + ")` keeps the end at **" + last[1] + "**: nothing changes. (This is why `max` is needed.)" : "Stretch the last interval to the later end: `max(" + before + ", " + cur[1] + ")` = **" + last[1] + "**. It becomes **" + pair(last) + "**." });
            } else {
              merged.push(cur.slice());
              tones[i] = "good";
              snap({ at: ["gap"], intervals: draw(sorted), merged: lane("good"), mergedLabel: "merged so far", vars: { merged: merged.length }, say: "A gap between **" + last[1] + "** and **" + cur[0] + "**: start a new merged interval **" + pair(cur) + "**." });
            }
          }
          snap({ at: ["done"], intervals: draw(sorted), merged: lane("good"), mergedLabel: "merged result", out: "merged = " + pairs(merged), say: "Done: **" + n + "** intervals became **" + merged.length + "**. One sort and one pass.", result: merged.map((p) => p.slice()) });
        },
        code: MERGE_CODE,
        call: (fn, inp) => fn(inp.intervals)
      }
    ],

    checks: [
      {
        code: MERGE_CODE,
        tests: [
          { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expect: [[1, 6], [8, 10], [15, 18]] },
          { args: [[[1, 4], [4, 5]]], expect: [[1, 5]] },
          { args: [[[1, 4], [2, 3]]], expect: [[1, 4]] },
          { args: [[[5, 6], [1, 2]]], expect: [[1, 2], [5, 6]] },
          { args: [[[1, 10]]], expect: [[1, 10]] }
        ]
      },
      {
        code: ATTEND_CODE,
        tests: [
          { args: [[[0, 30], [5, 10], [15, 20]]], expect: false },
          { args: [[[7, 10], [2, 4]]], expect: true },
          { args: [[[1, 5], [5, 8]]], expect: true },
          { args: [[]], expect: true }
        ]
      },
      {
        code: INTERSECT_CODE,
        tests: [
          { args: [[[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]]], expect: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]] },
          { args: [[[1, 3]], [[4, 6]]], expect: [] },
          { args: [[], [[1, 2]]], expect: [] }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Forgetting `max` when extending the last interval",
        why: "With `[1, 4]` and `[2, 3]`, writing `last[1] = cur[1]` shrinks the merged interval to `[1, 3]`.",
        fix: "Always `last[1] = Math.max(last[1], cur[1])`."
      },
      {
        oops: "Not sorting, or sorting by the wrong key",
        why: "The whole “compare only with the last merged” idea only works when intervals are in order of **start** time.",
        fix: "Sort first with `intervals.sort((a, b) => a[0] - b[0])`."
      },
      {
        oops: "Calling `sort()` with no comparator in JavaScript",
        why: "It sorts as text: `[10, 9, 1, 2].sort()` gives `[1, 10, 2, 9]`, so intervals come out in the wrong order.",
        fix: "Always pass a comparator: `(a, b) => a[0] - b[0]`."
      },
      {
        oops: "Mixing up `<` and `<=` (closed versus half-open)",
        why: "`[1, 4]` and `[4, 5]` merge in Merge Intervals but are **not** a clash in Meeting Rooms. One wrong symbol flips the answer on touching intervals.",
        fix: "Ask whether touching counts as overlapping, and test with a touching example."
      },
      {
        oops: "Comparing with the wrong neighbour",
        why: "After merging, the thing to compare with is the **last merged** interval (which may have grown), not the previous input interval.",
        fix: "Read `merged[merged.length - 1]` each time."
      },
      {
        oops: "Crashing on empty input, or editing the caller's intervals",
        why: "`intervals[0]` fails on `[]`, and `last[1] = …` changes the original arrays.",
        fix: "Return early for an empty list, and push copies (`cur.slice()`) if the input must stay unchanged."
      }
    ],

    remember: {
      mnemonic: "Sort by start. Overlap = a1 <= b2 && b1 <= a2. Compare only with the LAST merged one, and stretch with max.",
      rules: [
        "Overlap (closed): `a1 <= b2 && b1 <= a2`. Half-open: use `<`.",
        "Sort by start: `(a, b) => a[0] - b[0]`.",
        "Merge: `if (cur.start <= last.end) last.end = max(last.end, cur.end) else push`.",
        "Sorted input already? Insert Interval and list intersection are O(n).",
        "Count at the same time → Sweep Line. Minimum to remove → Greedy by end."
      ],
      template: {
        lines: [
          [`intervals.sort((a, b) => a[0] - b[0])`, "Sort by start."],
          [`merged = [intervals[0]]`, "Seed."],
          [`for each cur after the first:`, ""],
          [`  last = merged[merged.length - 1]`, "Compare with the last merged."],
          [`  if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1])`, "Overlap: stretch."],
          [`  else merged.push(cur)`, "Gap: new interval."]
        ]
      }
    },

    practice: {
      title: "Insert Interval",
      level: "Medium",
      problem: "You are given a list of **non-overlapping** intervals sorted by start, and a new interval. Insert the new interval so the list stays sorted and non-overlapping, merging where needed. Return the new list. (Touching intervals such as `[2, 3]` and `[3, 4]` merge.)",
      examples: [
        { input: "intervals = [[1, 3], [6, 9]], newInterval = [2, 5]", output: "[[1, 5], [6, 9]]" },
        { input: "intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]", output: "[[1, 2], [3, 10], [12, 16]]", why: "[4, 8] swallows [3, 5], [6, 7] and [8, 10]." }
      ],
      hints: [
        "The list is already sorted, so there is no need to sort: think in **three phases** while walking with an index.",
        "Phase 1: copy every interval that ends **before** the new one starts (`end < new.start`). Phase 3: copy everything that starts **after** the new one ends.",
        "Phase 2 is the merge: while an interval starts at or before the new interval's end, grow the new interval to `min` of the starts and `max` of the ends. Then push the grown interval."
      ],
      solution: {
        explain: [
          "Because the list is sorted and has no overlaps, the intervals fall into three groups relative to the new one: completely before, overlapping, completely after. Each interval is visited once, so the time is O(n) (no sort needed). The overlapping group is folded into the new interval with `min` and `max`.",
          "Memory O(n) for the answer."
        ],
        code: {
          fn: "insertInterval",
          lines: [
            `function insertInterval(intervals, newInterval) {`,
            `  const result = [];`,
            `  let i = 0;`,
            `  const n = intervals.length;`,
            [`  while (i < n && intervals[i][1] < newInterval[0]) {`, "Phase 1: intervals that end before the new one starts are unaffected."],
            `    result.push(intervals[i]);`,
            `    i++;`,
            `  }`,
            [`  let s = newInterval[0], e = newInterval[1];`, "The growing new interval."],
            [`  while (i < n && intervals[i][0] <= e) {`, "Phase 2: everything that starts before the new interval ends overlaps it."],
            [`    s = Math.min(s, intervals[i][0]);`, "Earlier start..."],
            [`    e = Math.max(e, intervals[i][1]);`, "...later end."],
            `    i++;`,
            `  }`,
            [`  result.push([s, e]);`, "Put the merged interval in its place."],
            [`  while (i < n) {`, "Phase 3: whatever is left starts after the new interval ends."],
            `    result.push(intervals[i]);`,
            `    i++;`,
            `  }`,
            `  return result;`,
            `}`
          ]
        }
      },
      tests: [
        { args: [[[1, 3], [6, 9]], [2, 5]], expect: [[1, 5], [6, 9]] },
        { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expect: [[1, 2], [3, 10], [12, 16]] },
        { args: [[], [5, 7]], expect: [[5, 7]] },
        { args: [[[1, 5]], [2, 3]], expect: [[1, 5]] },
        { args: [[[1, 5]], [6, 8]], expect: [[1, 5], [6, 8]] },
        { args: [[[3, 5]], [1, 2]], expect: [[1, 2], [3, 5]] },
        { args: [[[1, 2], [3, 4]], [2, 3]], expect: [[1, 4]] }
      ]
    },

    recall: [
      { q: "What is the overlap test for two closed intervals?", a: "`a1 <= b2 && b1 <= a2`: A starts before B ends and B starts before A ends." },
      { q: "Why sort by start before merging?", a: "Afterwards an interval can only overlap the last merged one, so a single pass comparing with it is enough." },
      { q: "How do you merge when two intervals overlap, and why `max`?", a: "`last.end = max(last.end, cur.end)`. `max` is needed because the current interval may be fully inside the last one." },
      { q: "Time complexity of merge intervals, and when is it O(n)?", a: "O(n log n) because of the sort. It is O(n) if the input is already sorted (Insert Interval)." },
      { q: "Do `[1, 4]` and `[4, 5]` overlap?", a: "In Merge Intervals (closed) yes, they merge. In Meeting Rooms (half-open) no, back-to-back meetings are fine. Always confirm which one the problem wants." }
    ],

    related: {
      topics: ["sweep-line", "greedy", "two-pointer", "prefix-sum", "heap"],
      files: []
    }
  });
})();
