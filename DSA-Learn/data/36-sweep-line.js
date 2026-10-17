// Sweep Line (Meeting Rooms II) — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const kit = window.DSA.heapKit;
  const pair = (iv) => "[" + iv[0] + ", " + iv[1] + "]";
  const maxEnd = (ivs) => Math.max(...ivs.map((p) => p[1]));
  const evText = (ev) => (ev[1] > 0 ? "+1" : "-1") + " @" + ev[0];

  const ROOMS_CODE = {
    fn: "MIN_ROOMS",
    lines: [
      `function MIN_ROOMS(intervals, tie) {`,
      `  const events = [];`,
      `  for (const [s, e] of intervals) {`,
      [`    events.push([s, +1]);`, "A meeting **starts**: one more room is in use.", "events"],
      [`    events.push([e, -1]);`, "A meeting **ends**: one room is free again.", "events"],
      `  }`,
      [`  events.sort((a, b) => a[0] - b[0] || (tie === "end" ? a[1] - b[1] : b[1] - a[1]));`, "Sort the events by **time**. If two events happen at the **same** time, the tie rule decides: `end` puts the -1 first, `start` puts the +1 first.", "sort"],
      `  let active = 0, best = 0;`,
      `  for (const [time, delta] of events) {`,
      [`    active += delta;`, "Sweep the line: add +1 or -1 to the running count.", "sweep"],
      [`    best = Math.max(best, active);`, "Remember the busiest moment.", "sweep"],
      `  }`,
      [`  return best;`, "The most meetings at once = the number of rooms we need.", "done"],
      `}`
    ]
  };

  const DIFF_CODE = {
    fn: "DIFF_ROOMS",
    lines: [
      `function DIFF_ROOMS(intervals, maxTime) {`,
      [`  const diff = new Array(maxTime + 1).fill(0);`, "One cell per time unit, all zero.", "diff"],
      `  for (const [s, e] of intervals) {`,
      [`    diff[s] += 1;`, "From time s on, one more meeting is running...", "add"],
      [`    diff[e] -= 1;`, "...and from time e on, one fewer. (Meetings are half-open: `[s, e)`.)", "add"],
      `  }`,
      `  let running = 0, best = 0;`,
      `  for (let t = 0; t <= maxTime; t++) {`,
      [`    running += diff[t];`, "A **prefix sum** of diff: how many meetings are running at time t.", "sum"],
      [`    best = Math.max(best, running);`, "Track the maximum.", "sum"],
      `  }`,
      [`  return best;`, "", "done"],
      `}`
    ]
  };

  const TWO_ARRAYS_CODE = {
    fn: "minRoomsTwoArrays",
    lines: [
      `function minRoomsTwoArrays(intervals) {`,
      [`  const starts = intervals.map((iv) => iv[0]).sort((a, b) => a - b);`, "All start times, sorted."],
      [`  const ends = intervals.map((iv) => iv[1]).sort((a, b) => a - b);`, "All end times, sorted separately."],
      `  let rooms = 0, e = 0;`,
      `  for (const s of starts) {`,
      [`    if (s >= ends[e]) e++;`, "The meeting that ends first is over by the time this one starts: **reuse** its room."],
      [`    else rooms++;`, "Every room is still busy: open a new one."],
      `  }`,
      `  return rooms;`,
      `}`
    ]
  };

  const HEAP_ROOMS_CODE = {
    fn: "minRoomsHeap",
    lines: [
      ...kit.classLines,
      ``,
      `function minRoomsHeap(intervals) {`,
      [`  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);`, "Meetings by start time."],
      [`  const heap = new Heap((a, b) => a < b);`, "A min-heap of the **end times** of the meetings running right now."],
      `  let best = 0;`,
      `  for (const [s, e] of sorted) {`,
      [`    if (heap.size > 0 && heap.peek() <= s) heap.pop();`, "The meeting that ends first is already over: free its room."],
      [`    heap.push(e);`, "This meeting takes a room until e."],
      [`    best = Math.max(best, heap.size);`, "The heap size is the number of rooms in use."],
      `  }`,
      `  return best;`,
      `}`
    ]
  };
  kit.classLast(HEAP_ROOMS_CODE);

  const CAR_CODE = {
    fn: "carPooling",
    lines: [
      `function carPooling(trips, capacity) {`,
      `  const events = [];`,
      `  for (const [passengers, from, to] of trips) {`,
      [`    events.push([from, passengers]);`, "Pick-up: passengers get on."],
      [`    events.push([to, -passengers]);`, "Drop-off: passengers get off."],
      `  }`,
      [`  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);`, "By location. At the same place, the drop-off (negative) goes **first**, so people leave before others board."],
      `  let onboard = 0;`,
      `  for (const [place, change] of events) {`,
      `    onboard += change;`,
      [`    if (onboard > capacity) return false;`, "Too many people at some moment: impossible."],
      `  }`,
      `  return true;`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "sweep-line",
    group: "intervals",
    emoji: "🧹",
    title: "Sweep Line (Meeting Rooms II)",
    tagline: "To count how many ranges are active at once, turn each into two events (+1 at the start, -1 at the end), sort the events, and walk through them with a running count.",
    level: "Core",
    needs: ["intervals", "prefix-sum"],

    gist: [
      "Break each interval `[s, e]` into two **events**: `(s, +1)` “one more starts” and `(e, -1)` “one ends”.",
      "Sort the events by time and **sweep** an imaginary vertical line from left to right, keeping a running count. The **maximum** of the count is the most intervals active at once (the minimum number of meeting rooms).",
      "**Tie-break rule:** if an end and a start happen at the same time, process the **end first** (back-to-back meetings can share a room). Getting this wrong is the #1 bug.",
      "Time **O(n log n)** (sorting 2n events), space O(n). With a small fixed time range you can skip the sort with a **difference array**."
    ],

    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      why: [
        "There are 2n events and sorting them costs O(n log n). The sweep itself is one pass of 2n steps. Memory is the event list, O(n).",
        "With a fixed small time range T (say minutes in a day) the difference-array version is O(n + T) and needs no sort at all."
      ],
      more: [
        {
          type: "table",
          heading: "Ways to get the same answer",
          columns: ["Approach", "Time", "Space", "Good for"],
          rows: [
            ["Events + sort (sweep line)", "O(n log n)", "O(n)", "The general tool; huge or sparse times"],
            ["Two sorted arrays (starts and ends)", "O(n log n)", "O(n)", "Same idea without building events"],
            ["Min-heap of end times", "O(n log n)", "O(n)", "When you must also say **which** room each meeting gets"],
            ["Difference array (prefix sum)", "O(n + T)", "O(T)", "Small fixed time range"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "“How many meetings run at the same time?” cannot be answered by looking at one pair of intervals. Instead, imagine a **vertical line** sliding across the time axis from left to right. Whenever it crosses a **start**, one more meeting is running. Whenever it crosses an **end**, one fewer. The most meetings it ever sees at once is the answer.",
        "So turn every interval into two **events**: `(start, +1)` and `(end, -1)`. Sort the events by time, then walk through them adding `+1` or `-1` to a counter. You only stop at the interesting points (the event times), never at every minute.",
        "One trap: what if a meeting ends at 5 and another starts at 5? If they may share a room, the **end must be processed before the start**, otherwise the counter briefly shows 2. That is why the sort puts `-1` before `+1` at equal times. For closed intervals (touching counts as overlapping) it is the other way round. Always confirm which one the problem wants."
      ],
      signals: [
        "“**Minimum number of meeting rooms**”, “minimum platforms”, “**maximum** overlap / concurrent users / intervals”.",
        "Problems where something is **added at one time and removed at another**: car pooling, population by year, calendar bookings.",
        "You only need the **count** (or total) at the busiest moment, not which interval is where."
      ],
      notFor: [
        "Merging intervals into bigger ones: that is the Intervals topic (sort by start).",
        "Choosing the largest set of non-overlapping intervals: that is Greedy (sort by end)."
      ],
      more: [
        {
          type: "table",
          heading: "Where the sweep line shows up",
          columns: ["Problem", "Events"],
          rows: [
            ["Meeting Rooms II / Minimum Platforms", "Start +1, end -1; the maximum count"],
            ["Maximum concurrent users", "Log-in +1, log-out -1"],
            ["Car Pooling (the practice problem)", "Pick-up +passengers, drop-off -passengers; is it ever over capacity?"],
            ["Maximum Population Year", "Birth +1, death -1 (the death year does not count)"],
            ["My Calendar III", "Every booking: start +1, end -1; the maximum is the busiest overlap"],
            ["The Skyline Problem (advanced)", "Building start and end events plus a max-heap of heights"]
          ]
        },
        {
          type: "code",
          title: "The same answer from two sorted arrays (verified code)",
          code: TWO_ARRAYS_CODE
        },
        {
          type: "code",
          title: "The same answer with a min-heap of end times (verified code)",
          code: HEAP_ROOMS_CODE
        }
      ]
    },

    analogy: {
      title: "The door counter at a shop",
      story: [
        "A shop has a clicker at the door. Every time someone **walks in** it counts +1, every time someone **walks out** it counts -1. You never need to know who is inside: the number on the clicker is the number of customers right now.",
        "To find the **busiest moment** of the day you just read the clicker after every click and remember the highest number. If one customer walks out at exactly the moment another walks in, you want the clicker to register the exit first, so the busiest moment is not overstated."
      ],
      map: [
        ["Someone walks in / out", "Event `(time, +1)` / `(time, -1)`"],
        ["Clicks in the order they happened", "Events sorted by time"],
        ["The number on the clicker", "The running count `active`"],
        ["The highest number you saw", "`best`: rooms needed"],
        ["Exit registered before a simultaneous entry", "End events sorted before start events at equal times"]
      ],
      breaks: "A door clicker only counts people. A real room schedule also needs to know **which** room each meeting uses; for that you would use a min-heap of end times instead."
    },

    demos: [
      {
        id: "events",
        title: "Sweep through the events",
        intro: "Each meeting becomes a **+1** event at its start and a **-1** event at its end. The dashed line sweeps through the sorted events and the counter goes up and down. The default has meetings that **touch** (one ends at 5 as another starts at 5): switch the tie rule and watch the answer change from 2 to 3.",
        codeIntro: "Two small loops and one sort. The tie rule is inside the sort comparator.",
        viz: "intervals",
        legend: [["cur", "running right now"], ["done", "already finished"], ["dim", "not started yet"], ["good", "busiest moment"]],
        inputs: [
          { type: "intervals", name: "intervals", label: "Meetings (start-end)", value: [[1, 5], [2, 6], [5, 9], [6, 12]], len: [2, 6], min: 0, max: 16 },
          { type: "select", name: "tie", label: "Meetings that touch", value: "end", options: [["end", "back-to-back is fine (end first)"], ["start", "touching counts as overlap (start first)"]] }
        ],
        scene: (inp) => ({ min: 0, max: maxEnd(inp.intervals), n: inp.intervals.length, rows: inp.intervals.length }),
        frames(inp, snap) {
          const ivs = inp.intervals;
          const n = ivs.length;
          const events = [];
          ivs.forEach(([s, e], i) => {
            events.push([s, 1, i]);
            events.push([e, -1, i]);
          });
          const first = events.map((ev) => evText(ev));
          const draw = (tones) => ivs.map((p, i) => ({ s: p[0], e: p[1], tone: tones[i] }));
          const plain = Array(n).fill(undefined);
          snap({ at: ["events"], intervals: draw(plain), boxes: [{ label: "events, in the order we create them", kind: "list", items: first }], say: "Every meeting becomes two events: **+1** when it starts and **-1** when it ends. " + n + " meetings give " + 2 * n + " events." });
          events.sort((a, b) => a[0] - b[0] || (inp.tie === "end" ? a[1] - b[1] : b[1] - a[1]));
          const hasTie = events.some((ev, i) => i > 0 && events[i - 1][0] === ev[0] && events[i - 1][1] !== ev[1]);
          snap({ at: ["sort"], intervals: draw(plain), boxes: [{ label: "events, sorted by time", kind: "list", items: events.map(evText) }], say: "Sort the events by time." + (hasTie ? " At the **same time**, an end and a start meet. With the rule “" + (inp.tie === "end" ? "end first" : "start first") + "” the **" + (inp.tie === "end" ? "-1" : "+1") + "** goes first, so back-to-back meetings " + (inp.tie === "end" ? "can share a room." : "count as overlapping.") : " Here no start and end share a time, so the tie rule does not matter.") });
          let active = 0;
          let best = 0;
          let peak = null;
          const started = Array(n).fill(false);
          const ended = Array(n).fill(false);
          events.forEach((ev, k) => {
            const [time, delta, idx] = ev;
            active += delta;
            if (delta > 0) started[idx] = true;
            else ended[idx] = true;
            const prevBest = best;
            best = Math.max(best, active);
            if (best > prevBest) peak = { time, live: ivs.map((_, i) => started[i] && !ended[i]) };
            const tones = ivs.map((_, i) => (ended[i] ? "done" : started[i] ? "cur" : "dim"));
            snap({
              at: ["sweep"],
              intervals: draw(tones),
              line: time,
              lineLabel: "t = " + time,
              vars: { time, delta: (delta > 0 ? "+" : "") + delta, active, best },
              boxes: [{ label: "events", kind: "list", items: events.map((e2, j) => ({ v: evText(e2), tone: j === k ? "cur" : j < k ? "done" : undefined })) }],
              say: "At **t = " + time + "** a meeting " + (delta > 0 ? "**starts**: +1" : "**ends**: -1") + ". Now **" + active + "** meeting" + (active === 1 ? " is" : "s are") + " running." + (best > prevBest ? " That is a **new record**: best = " + best + "." : " The best so far is still " + best + ".")
            });
          });
          const tones = ivs.map((_, i) => (peak && peak.live[i] ? "good" : "dim"));
          snap({
            at: ["done"],
            intervals: draw(tones),
            line: peak ? peak.time : undefined,
            lineLabel: peak ? "busiest: t = " + peak.time : "",
            out: "rooms needed = " + best,
            boxes: [{ label: "events", kind: "list", items: events.map((e2) => ({ v: evText(e2), tone: "done" })) }],
            say: "The line has swept past every event. The most meetings at once was **" + best + "**, first reached at t = " + (peak ? peak.time : "?") + " (the green meetings). So we need **" + best + "** room" + (best === 1 ? "" : "s") + ".",
            result: best
          });
        },
        code: ROOMS_CODE,
        call: (fn, inp) => fn(inp.intervals, inp.tie)
      },

      {
        id: "diff",
        title: "Small time range: a difference array instead of sorting",
        intro: "When times are small whole numbers, skip the events and the sort. Put **+1** in a cell where a meeting starts and **-1** where it ends, then take a **running total** (prefix sum). The total at time t is how many meetings are running at t.",
        codeIntro: "The same idea as the Prefix Sum topic, just applied to counting meetings.",
        viz: "array",
        legend: [["good", "+1 (a meeting starts)"], ["bad", "-1 (a meeting ends)"], ["cur", "time being summed"]],
        inputs: [{ type: "intervals", name: "intervals", label: "Meetings (start-end)", value: [[0, 5], [2, 4], [3, 8], [6, 9]], len: [2, 5], min: 0, max: 11 }],
        frames(inp, snap) {
          const ivs = inp.intervals;
          const maxT = maxEnd(ivs);
          const diff = Array(maxT + 1).fill(0);
          const done = [];
          const boxOf = () => [{ label: "meetings added so far", kind: "list", items: done.map(pair) }];
          snap({ at: ["diff"], label: "diff[t]  (index t = time)", cells: diff.slice(), boxes: boxOf(), say: "Make one cell per time unit, from 0 to **" + maxT + "**, all zero. Cell t will hold the *change* in the number of running meetings at time t." });
          ivs.forEach(([s, e]) => {
            diff[s] += 1;
            diff[e] -= 1;
            done.push([s, e]);
            snap({ at: ["add"], label: "diff[t]", cells: diff.slice(), tone: { [s]: "good", [e]: "bad" }, boxes: boxOf(), say: "Meeting **[" + s + ", " + e + "]**: add **+1** at time " + s + " (it starts) and **-1** at time " + e + " (it ends). If two events land in the same cell they just add up." });
          });
          const running = Array(maxT + 1).fill(null);
          let sum = 0;
          let best = 0;
          for (let t = 0; t <= maxT; t++) {
            sum += diff[t];
            running[t] = sum;
            best = Math.max(best, sum);
            snap({ at: ["sum"], label: "diff[t]", cells: diff.slice(), tone: { [t]: "cur" }, rows: [{ label: "running total = meetings running at time t", cells: running.slice(), tone: { [t]: "cur" } }], vars: { t, running: sum, best }, say: "t = **" + t + "**: running total = previous total + diff[" + t + "] (" + (diff[t] > 0 ? "+" : "") + diff[t] + ") = **" + sum + "**." + (sum === best && sum > 0 ? " Best so far: " + best + "." : "") });
          }
          snap({ at: ["done"], label: "diff[t]", cells: diff.slice(), rows: [{ label: "running total = meetings running at time t", cells: running.slice() }], out: "rooms needed = " + best, say: "The largest running total is **" + best + "**, so that many meetings overlap at the busiest time. No sorting was needed; the cost is O(n + T) for T time units.", result: best });
        },
        code: DIFF_CODE,
        call: (fn, inp) => fn(inp.intervals, maxEnd(inp.intervals))
      }
    ],

    checks: [
      {
        code: ROOMS_CODE,
        tests: [
          { args: [[[0, 30], [5, 10], [15, 20]], "end"], expect: 2 },
          { args: [[[7, 10], [2, 4]], "end"], expect: 1 },
          { args: [[[1, 5], [2, 6], [3, 7], [4, 8]], "end"], expect: 4 },
          { args: [[[1, 5], [5, 8]], "end"], expect: 1 },
          { args: [[[1, 5], [5, 8]], "start"], expect: 2 }
        ]
      },
      {
        code: TWO_ARRAYS_CODE,
        tests: [
          { args: [[[0, 30], [5, 10], [15, 20]]], expect: 2 },
          { args: [[[7, 10], [2, 4]]], expect: 1 },
          { args: [[[1, 5], [2, 6], [3, 7], [4, 8]]], expect: 4 },
          { args: [[[1, 5], [5, 8]]], expect: 1 }
        ]
      },
      {
        code: HEAP_ROOMS_CODE,
        tests: [
          { args: [[[0, 30], [5, 10], [15, 20]]], expect: 2 },
          { args: [[[7, 10], [2, 4]]], expect: 1 },
          { args: [[[1, 5], [2, 6], [3, 7], [4, 8]]], expect: 4 },
          { args: [[[1, 5], [5, 8]]], expect: 1 }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Processing a start before an end at the same time",
        why: "For `[1, 5]` and `[5, 8]` the counter goes 1 → 2 → 1 and reports 2 rooms, even though one room is enough.",
        fix: "Sort so that at equal times the `-1` (end) comes before the `+1` (start): `a[0] - b[0] || a[1] - b[1]`. Closed intervals want the opposite."
      },
      {
        oops: "Forgetting to sort the events",
        why: "The running count only makes sense in time order.",
        fix: "Sort all 2n events by time (with the tie rule) before sweeping."
      },
      {
        oops: "Calling `sort()` without a comparator in JavaScript",
        why: "It compares as text, so `[10, 9, 2].sort()` gives `[10, 2, 9]`.",
        fix: "Always pass `(a, b) => a[0] - b[0] || …`."
      },
      {
        oops: "Using the sweep line when you need to know which room",
        why: "The counter only gives how many are active, not an assignment.",
        fix: "Use the min-heap of end times: pop a free room or open a new one."
      },
      {
        oops: "Counting the end time as inside the meeting",
        why: "With half-open `[s, e)` the meeting is already over at time e. In *Maximum Population Year* the death year does not count.",
        fix: "Decide the rule, then write the `-1` at `e` (half-open) or at `e + 1` (closed)."
      }
    ],

    remember: {
      mnemonic: "Intervals → events (+1 at start, -1 at end) → sort (END before START on ties) → sweep with a counter → keep the maximum.",
      rules: [
        "Two events per interval: `[s, +1]` and `[e, -1]`.",
        "Sort comparator: `a[0] - b[0] || a[1] - b[1]` (so -1 comes before +1 at equal times).",
        "Answer = the maximum value the running count ever reaches.",
        "Small fixed range? Difference array + prefix sum, O(n + T).",
        "Need the room assignment? Min-heap of end times."
      ],
      template: {
        lines: [
          [`events = []; for each [s, e]: events.push([s, +1], [e, -1])`, "Two events per interval."],
          [`events.sort((a, b) => a[0] - b[0] || a[1] - b[1])`, "Time first, ends before starts."],
          [`active = 0; best = 0`, ""],
          [`for ([time, delta] of events) { active += delta; best = Math.max(best, active) }`, "Sweep."],
          [`return best`, ""]
        ]
      }
    },

    practice: {
      title: "Car Pooling",
      level: "Medium",
      problem: "A car has `capacity` empty seats and only drives in one direction. `trips[i] = [passengers, from, to]` means that many passengers get on at `from` and get off at `to`. Return `true` if every trip can be done without ever exceeding the capacity.",
      examples: [
        { input: "trips = [[2, 1, 5], [3, 3, 7]], capacity = 4", output: "false", why: "Between locations 3 and 5 there are 2 + 3 = 5 passengers." },
        { input: "trips = [[2, 1, 5], [3, 5, 7]], capacity = 3", output: "true", why: "At location 5 the first group gets off before the second gets on." }
      ],
      hints: [
        "It is the meeting-room idea again: “how many people are in the car at the busiest moment?”",
        "Create two events per trip: `[from, +passengers]` and `[to, -passengers]`, then sort by location.",
        "At the same location, process the **drop-off first** (the negative change comes first when you sort by `a[1] - b[1]`). After each event, check `onboard > capacity`."
      ],
      solution: {
        explain: [
          "Sweeping the sorted events keeps the number of passengers on board. If it ever goes above the capacity, the answer is `false`. Dropping people off before picking up others at the same place avoids a false alarm.",
          "Time O(n log n) for the sort, space O(n)."
        ],
        code: CAR_CODE
      },
      tests: [
        { args: [[[2, 1, 5], [3, 3, 7]], 4], expect: false },
        { args: [[[2, 1, 5], [3, 3, 7]], 5], expect: true },
        { args: [[[2, 1, 5], [3, 5, 7]], 3], expect: true },
        { args: [[[9, 3, 4], [9, 1, 7], [4, 2, 4], [7, 4, 5]], 23], expect: true },
        { args: [[[9, 3, 4], [9, 1, 7], [4, 2, 4], [7, 4, 5]], 21], expect: false },
        { args: [[[5, 1, 3], [5, 2, 4]], 9], expect: false },
        { args: [[[1, 1, 2]], 1], expect: true }
      ]
    },

    recall: [
      { q: "How does the sweep line turn an interval into events?", a: "`[s, e]` becomes `(s, +1)` and `(e, -1)`. Sort the events by time and keep a running count." },
      { q: "What does the maximum of the running count mean?", a: "The largest number of intervals active at the same moment, e.g. the minimum number of meeting rooms." },
      { q: "What is the tie-breaking rule and why?", a: "At the same time process the end (-1) before the start (+1), so back-to-back meetings can share a room. Closed intervals use the opposite order." },
      { q: "When can you skip the sort?", a: "When times are small whole numbers: use a difference array (+1 at start, -1 at end) and a prefix sum, O(n + T)." },
      { q: "What do you use if you also need to know which room each meeting gets?", a: "A min-heap of end times: reuse the room that frees first, otherwise open a new one." }
    ],

    related: {
      topics: ["intervals", "prefix-sum", "heap", "greedy", "top-k"],
      files: []
    }
  });
})();
