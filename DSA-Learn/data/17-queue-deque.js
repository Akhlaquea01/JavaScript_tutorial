// Queue, Deque & Windowed Processing — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "queue-deque",
  group: "linear",
  emoji: "📥",
  title: "Queue, Deque & Windowed Processing",
  tagline: "A line where the first one in is the first one out. A deque adds both ends, which makes “maximum of every window” an O(n) job.",
  level: "Core",
  needs: ["stack"],

  gist: [
    "**Queue = FIFO** (first in, first out): add at the **back**, remove from the **front**. `enqueue`, `dequeue`, `peek` are all O(1).",
    "A plain JavaScript `array.shift()` is O(n). For a fast queue use a **circular array**, a **linked list**, or a moving head index.",
    "A **deque** (double-ended queue) can add and remove at **both ends** in O(1).",
    "A **monotonic deque** of indexes gives the max (or min) of every sliding window in **O(n)**."
  ],

  complexity: {
    time: "O(1) per queue operation, O(n) for a window pass",
    space: "O(n) for the queue, O(k) for a window deque",
    why: [
      "A queue only touches its two ends, so enqueue, dequeue and peek never depend on how many items wait: O(1). (That is true for a circular array or linked list. `array.shift()` must move every remaining item, so it is O(n).)",
      "In sliding-window maximum, every index is pushed into the deque once and popped at most once, so the whole pass is O(n) even though there is a `while` loop inside the `for`. The deque holds at most k indexes, so its memory is O(k)."
    ],
    more: [
      {
        type: "table",
        heading: "Queue operations",
        columns: ["Operation", "What it does", "Time"],
        rows: [
          ["`enqueue(x)`", "Add x at the back", "O(1)"],
          ["`dequeue()`", "Remove and return the front", "O(1)"],
          ["`peek()` / front", "Look at the front", "O(1)"],
          ["`isEmpty()`", "Is the queue empty?", "O(1)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A queue is a line at a ticket counter. New people join at the **back**, and the person at the **front** is served first. The one who waited longest leaves first: **FIFO** (first in, first out).",
      "Because a queue only touches its two ends it can be very fast, but only if it is built well. An ordinary array removes from the front by shifting every other item one place left, which is slow for big queues. A **circular array** instead keeps a `front` index and uses `%` (modulo) so that positions wrap around to the start, and nothing ever has to move.",
      "A **deque** (“deck”) is a queue you can also add to at the front and remove from at the back. That extra power is what makes **sliding window maximum** work: keep the *indexes* of useful candidates in a deque whose values are in decreasing order. Anything smaller than a newcomer can never be the maximum again, so it is dropped from the back, and anything that slides out of the window is dropped from the front. The front is always the answer."
    ],
    signals: [
      "Things must be processed **in order of arrival**: task scheduling, print jobs, BFS.",
      "A problem asks for the **maximum or minimum of every window** of size k (sliding window maximum).",
      "You need to add or remove at **both ends** (deque), or keep a **recent-first / oldest-first** order (like an LRU cache).",
      "“First negative number in every window of size k”."
    ],
    notFor: [
      "Last-in-first-out behaviour (undo, brackets): that is a **stack**.",
      "Always taking the highest-priority item regardless of arrival order: that is a **priority queue** (a heap).",
      "A window **sum** or **count** only. A plain sliding window with a running total is simpler."
    ],
    more: [
      {
        type: "table",
        heading: "Queue family",
        columns: ["Type", "What is special", "Used for"],
        rows: [
          ["**Simple queue**", "FIFO: enqueue at the back, dequeue at the front", "Scheduling, BFS"],
          ["**Circular queue**", "Fixed-size array whose ends wrap around with `%`", "Buffers, no wasted space"],
          ["**Deque**", "Add and remove at both ends in O(1)", "Sliding window max / min, palindromes"],
          ["**Priority queue**", "The most important item leaves first (built on a heap)", "Dijkstra, top-K, task priorities"]
        ]
      },
      {
        type: "callout",
        kind: "tip",
        text: "**Where queues hide:** BFS uses a queue to visit nodes level by level. An **LRU cache** uses a doubly linked list (a deque) plus a hash map to track which item was used least recently."
      }
    ]
  },

  analogy: {
    title: "A ticket counter, and a one-way revolving door",
    story: [
      "At a ticket counter new customers join at the back of the line and the clerk always serves the person at the front. Nobody can push in and nobody leaves from the middle. That is a queue.",
      "A **circular queue** is a row of numbered seats around a round table. The person who has waited longest is marked with a “front” flag. When they leave, the flag moves to the next seat and, after the last seat, wraps around to seat 0. New people sit at the first empty seat after the last person.",
      "A **monotonic deque** is a talent-show line where each newcomer pushes out everyone weaker standing at the back, because the weaker ones can never win again while the newcomer is still on stage. People also leave from the front once their time on stage is over (they slide out of the window). The person at the front is always the strongest in the current window."
    ],
    map: [
      ["Customers in a line", "Items in the queue"],
      ["Joining at the back / served at the front", "`enqueue` / `dequeue`"],
      ["The “front” flag moving round the table", "`front = (front + 1) % capacity`"],
      ["The weaker contestants pushed out by a newcomer", "`while (nums[back] <= nums[i]) pop back`"],
      ["Contestants whose time is over", "Front indexes that fell out of the window"],
      ["The strongest in the current window", "`deque[0]`, the front"]
    ],
    breaks: "A real circular table has a fixed number of seats, and so does a circular queue: when every seat is taken it is **full**. A linked-list queue has no such limit."
  },

  demos: [
    {
      id: "circular",
      title: "A circular queue: the front wraps around",
      intro: "Operations: `E5` means enqueue 5, `D` means dequeue. Watch the **front** move and the new items wrap to the start of the array. Purple = holds an item, faded = free slot (old values may linger there but are ignored). Try adding more items than the capacity.",
      codeIntro: "A fixed-size queue. `runQueue` applies a list of operations and returns what each one reported.",
      viz: "array",
      legend: [["mark", "slot holds an item"], ["good", "slot just written"], ["bad", "slot just freed / queue is full"], ["dim", "free slot"]],
      inputs: [
        { type: "number", name: "capacity", label: "Capacity", value: 4, min: 3, max: 6 },
        { type: "text", name: "ops", label: "Operations (E5 = enqueue 5, D = dequeue)", value: "E1 E2 E3 D D E4 E5 E6 D E7", len: [2, 48], alphabet: "ED0123456789 " }
      ],
      validate(inp) {
        const ops = inp.ops.split(/\s+/).filter(Boolean);
        if (ops.length < 1 || ops.length > 12) return "Use between 1 and 12 operations.";
        if (ops.some((o) => !/^(E\d{1,2}|D)$/.test(o))) return "Each operation is E followed by a number (like E5), or D.";
        return null;
      },
      random(rnd) {
        const n = rnd.int(7, 10);
        const ops = [];
        for (let i = 0; i < n; i++) ops.push(rnd() < 0.6 ? "E" + rnd.int(1, 20) : "D");
        return { capacity: String(rnd.int(3, 5)), ops: ops.join(" ") };
      },
      frames(inp, snap) {
        const cap = inp.capacity;
        const ops = inp.ops.split(/\s+/).filter(Boolean);
        const items = new Array(cap).fill(undefined);
        let front = 0;
        let size = 0;
        const log = [];
        const shown = () => items.map((v) => (v === undefined ? "·" : v));
        const zones = () => {
          const t = {};
          for (let i = 0; i < cap; i++) t[i] = "dim";
          for (let k = 0; k < size; k++) t[(front + k) % cap] = "mark";
          return t;
        };
        const view = (extra) => Object.assign({ label: "items (array of " + cap + " slots)", cells: shown(), ptr: { front, next: (front + size) % cap }, tone: zones(), vars: { size, front } }, extra);

        snap(view({ at: ["ctor"], say: "An empty queue: an array of **" + cap + "** slots, `front = 0` (where the oldest item is) and `size = 0`. **next** marks where the next item will be written: `(front + size) % capacity`." }));
        for (const op of ops) {
          if (op[0] === "E") {
            const x = Number(op.slice(1));
            if (size === cap) {
              log.push("full");
              snap(view({ at: ["enq", "full"], tone: { ...zones(), [front]: "bad" }, say: "**enqueue(" + x + ")**: size is already " + cap + " = capacity, so the queue is **full** and the item is rejected." }));
              continue;
            }
            const idx = (front + size) % cap;
            items[idx] = x;
            size++;
            log.push("ok");
            snap(view({
              at: ["enq", "write"],
              tone: { ...zones(), [idx]: "good" },
              say: "**enqueue(" + x + ")**: write at `(front + size) % capacity` = (" + front + " + " + (size - 1) + ") % " + cap + " = **" + idx + "**" + (idx < front ? ", which **wrapped around** to the start of the array" : "") + ". size becomes " + size + "."
            }));
          } else if (size === 0) {
            log.push("empty");
            snap(view({ at: ["deq", "empty"], say: "**dequeue()**: size is 0, so the queue is **empty** and there is nothing to return." }));
          } else {
            const x = items[front];
            const old = front;
            front = (front + 1) % cap;
            size--;
            log.push(x);
            snap(view({
              at: ["deq", "read", "wrap"],
              tone: { ...zones(), [old]: "bad" },
              say: "**dequeue()**: the oldest item is at the front (slot " + old + "): **" + x + "**. Move front to `(front + 1) % capacity` = **" + front + "**" + (front < old ? " (it wrapped back to 0)" : "") + ". The old slot is simply ignored from now on."
            }));
          }
        }
        snap(view({
          at: ["done"],
          out: "Results: " + log.join(", "),
          say: "Operations finished. What each one reported: **" + log.join(", ") + "**. Not one item was ever shifted: only `front` and `size` changed.",
          result: log
        }));
      },
      code: {
        fn: "runQueue",
        lines: [
          `class CircularQueue {`,
          `  constructor(capacity) {`,
          [`    this.items = new Array(capacity);`, "A fixed block of slots.", "ctor"],
          `    this.capacity = capacity;`,
          [`    this.front = 0;`, "Index of the oldest item.", "ctor"],
          [`    this.size = 0;`, "How many items are in the queue.", "ctor"],
          `  }`,
          [`  enqueue(x) {`, "Add an item at the back.", "enq"],
          [`    if (this.size === this.capacity) return false;`, "No free slot: the queue is full.", "full"],
          [`    this.items[(this.front + this.size) % this.capacity] = x;`, "Write right after the last item. `%` wraps the index back to 0 after the last slot.", "write"],
          `    this.size++;`,
          `    return true;`,
          `  }`,
          [`  dequeue() {`, "Remove the item at the front.", "deq"],
          [`    if (this.size === 0) return undefined;`, "Nothing to remove.", "empty"],
          [`    const x = this.items[this.front];`, "The oldest item sits at the front.", "read"],
          [`    this.front = (this.front + 1) % this.capacity;`, "Move the front forward, wrapping around. Nothing is shifted.", "wrap"],
          `    this.size--;`,
          `    return x;`,
          `  }`,
          `}`,
          ``,
          `function runQueue(capacity, ops) {`,
          `  const q = new CircularQueue(capacity);`,
          `  const log = [];`,
          `  for (const op of ops) {`,
          `    if (op[0] === "E") log.push(q.enqueue(Number(op.slice(1))) ? "ok" : "full");`,
          `    else log.push(q.dequeue() ?? "empty");`,
          `  }`,
          [`  return log;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.capacity, inp.ops.split(/\s+/).filter(Boolean))
    },

    {
      id: "window",
      title: "Sliding window maximum with a monotonic deque",
      intro: "For every window of size k, find its maximum in O(1) per step. The deque stores **indexes** whose values go from big (front) to small (back). Purple cells are the candidates currently in the deque.",
      codeIntro: "Returns the maximum of every window of `k` consecutive numbers.",
      viz: "array",
      legend: [["cur", "number just arrived"], ["mark", "candidate in the deque"], ["bad", "removed from the deque"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers", value: [4, 2, 12, 3, 8, 1, 7], len: [5, 9], min: 1, max: 15 },
        { type: "number", name: "k", label: "Window size k", value: 3, min: 2, max: 5 }
      ],
      validate(inp) {
        return inp.k > inp.nums.length ? "k cannot be bigger than the array length (" + inp.nums.length + ")." : null;
      },
      random(rnd) {
        const n = rnd.int(6, 9);
        return { nums: Array.from({ length: n }, () => rnd.int(1, 15)).join(", "), k: String(rnd.int(2, Math.min(4, n))) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const k = inp.k;
        const n = a.length;
        const dq = [];
        const res = new Array(n).fill("");
        const base = (i) => Object.fromEntries(dq.map((j) => [j, "mark"]));
        const box = (fresh) => ({ label: "deque of indexes", hint: "front = window max, values decrease", kind: "queue", items: dq.map((j, t) => ({ v: a[j] + " (i=" + j + ")", new: fresh && t === dq.length - 1 })) });
        const view = (i, extra) => Object.assign({ label: "nums", cells: a, range: [Math.max(0, i - k + 1), i], ptr: { i }, rows: [{ label: "max of each window (under the window's last number)", cells: res.slice() }], boxes: [box()], tone: { ...base(i), [i]: "cur" } }, extra);

        snap({ label: "nums", cells: a, at: ["init"], rows: [{ label: "max of each window (under the window's last number)", cells: res.slice() }], boxes: [box()], say: "The deque starts empty. We scan left to right. Each new number removes weaker candidates from the **back**, and expired ones are removed from the **front**, so the front is always the maximum of the current window." });
        for (let i = 0; i < n; i++) {
          if (dq.length && dq[0] <= i - k) {
            const gone = dq.shift();
            snap(view(i, {
              at: ["loop", "expire"],
              tone: { ...base(i), [i]: "cur", [gone]: "bad" },
              say: "The front index **" + gone + "** (value " + a[gone] + ") is now outside the window [" + (i - k + 1) + ".." + i + "], so remove it from the front."
            }));
          }
          while (dq.length && a[dq[dq.length - 1]] <= a[i]) {
            const gone = dq.pop();
            snap(view(i, {
              at: ["popback"],
              tone: { ...base(i), [i]: "cur", [gone]: "bad" },
              say: a[gone] + " (index " + gone + ") is not bigger than the newcomer **" + a[i] + "**. While " + a[i] + " is in the window, " + a[gone] + " can **never** be the maximum, so remove it from the back."
            }));
          }
          dq.push(i);
          const record = i >= k - 1;
          if (record) res[i] = a[dq[0]];
          snap(view(i, {
            at: record ? ["push", "record"] : ["push"],
            boxes: [box(true)],
            say: record
              ? "Push index **" + i + "**. The window [" + (i - k + 1) + ".." + i + "] is complete: its maximum is the **front** of the deque, **" + a[dq[0]] + "**. Record it."
              : "Push index **" + i + "**. The first window is not complete yet (it needs " + k + " numbers), so nothing is recorded."
          }));
        }
        const out = res.filter((v) => v !== "");
        snap({
          label: "nums",
          cells: a,
          at: ["done"],
          rows: [{ label: "max of each window (under the window's last number)", cells: res.slice(), tone: DSA.util.span(k - 1, n - 1, "good") }],
          boxes: [box()],
          out: "Window maximums: [" + out.join(", ") + "]",
          say: "Every window has its maximum: **[" + out.join(", ") + "]**. Each index entered the deque once and left at most once, so the whole pass is O(n).",
          result: out
        });
      },
      code: {
        fn: "slidingWindowMax",
        lines: [
          `function slidingWindowMax(nums, k) {`,
          [`  const deque = [];`, "Indexes, with the values going from largest (front) to smallest (back).", "init"],
          [`  const result = [];`, "", "init"],
          [`  for (let i = 0; i < nums.length; i++) {`, "Each number arrives once.", "loop"],
          [`    if (deque.length && deque[0] <= i - k) deque.shift();`, "The front index slid out of the window: drop it.", "expire"],
          [`    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();`, "Drop every candidate at the back that the newcomer beats. They can never be a window maximum again.", "popback"],
          [`    deque.push(i);`, "The newcomer is now a candidate.", "push"],
          [`    if (i >= k - 1) result.push(nums[deque[0]]);`, "Once the first window is full, the front of the deque is the window maximum.", "record"],
          `  }`,
          [`  return result;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.k)
    },

    {
      id: "twostacks",
      title: "A queue built from two stacks",
      intro: "Enqueue pushes onto the **in** stack. Dequeue pops from the **out** stack, and when that is empty we pour the whole in-stack into it (which **reverses** the order, so the oldest item ends up on top). Operations: `E5` = enqueue 5, `D` = dequeue.",
      codeIntro: "Implements FIFO using only two LIFO stacks. `runOps` returns what each dequeue gave back.",
      viz: "none",
      legend: [],
      inputs: [{ type: "text", name: "ops", label: "Operations", value: "E1 E2 E3 D E4 D D", len: [2, 48], alphabet: "ED0123456789 " }],
      validate(inp) {
        const ops = inp.ops.split(/\s+/).filter(Boolean);
        if (ops.length < 1 || ops.length > 10) return "Use between 1 and 10 operations.";
        if (ops.some((o) => !/^(E\d{1,2}|D)$/.test(o))) return "Each operation is E followed by a number (like E5), or D.";
        return null;
      },
      random(rnd) {
        const n = rnd.int(6, 9);
        const ops = [];
        for (let i = 0; i < n; i++) ops.push(rnd() < 0.6 ? "E" + rnd.int(1, 20) : "D");
        return { ops: ops.join(" ") };
      },
      frames(inp, snap) {
        const ops = inp.ops.split(/\s+/).filter(Boolean);
        const inS = [];
        const outS = [];
        const out = [];
        const boxes = (hot) => [
          { label: "in stack", hint: "enqueue pushes here", kind: "stack", items: inS.map((v, k) => ({ v, new: hot === "in" && k === inS.length - 1 })) },
          { label: "out stack", hint: "dequeue pops from here", kind: "stack", items: outS.map((v, k) => ({ v, new: hot === "out" && k === outS.length - 1 })) },
          { label: "dequeued so far", kind: "list", items: out.map((v) => ({ v })) }
        ];
        snap({ at: ["ctor"], boxes: boxes(), say: "Two empty stacks. New items always go on the **in** stack. Items are only ever taken from the **out** stack." });
        for (const op of ops) {
          if (op[0] === "E") {
            const x = Number(op.slice(1));
            inS.push(x);
            snap({ at: ["enq"], boxes: boxes("in"), say: "**enqueue(" + x + ")**: just push it on the in stack." });
            continue;
          }
          if (outS.length === 0 && inS.length > 0) {
            snap({ at: ["check"], boxes: boxes(), say: "**dequeue()**: the out stack is empty, so refill it: move every item from the in stack, one by one. This flips the order." });
            while (inS.length) {
              const v = inS.pop();
              outS.push(v);
              snap({ at: ["transfer"], boxes: boxes("out"), say: "Move **" + v + "** from the top of the in stack to the out stack." });
            }
          }
          if (outS.length === 0) {
            out.push("empty");
            snap({ at: ["check", "pop"], boxes: boxes(), say: "**dequeue()**: both stacks are empty, so there is nothing to return." });
          } else {
            const v = outS.pop();
            out.push(v);
            snap({ at: ["pop"], boxes: boxes(), say: "Pop the top of the out stack: **" + v + "**. It is the item that has waited longest, so FIFO order is kept." });
          }
        }
        snap({
          at: ["done"],
          boxes: boxes(),
          out: "Dequeued: " + (out.length ? out.join(", ") : "nothing"),
          say: "The dequeued order is **" + (out.length ? out.join(", ") : "empty") + "**: exactly first-in-first-out. Each item moves between the stacks at most once, so dequeue is **O(1) on average**.",
          result: out
        });
      },
      code: {
        fn: "runOps",
        lines: [
          `class QueueWithTwoStacks {`,
          [`  constructor() { this.inStack = []; this.outStack = []; }`, "`in` receives new items, `out` serves old ones.", "ctor"],
          [`  enqueue(x) { this.inStack.push(x); }`, "Always O(1): push onto the in stack.", "enq"],
          `  dequeue() {`,
          [`    if (this.outStack.length === 0) {`, "Out stack empty: time to refill it.", "check"],
          [`      while (this.inStack.length) this.outStack.push(this.inStack.pop());`, "Pour in → out. Popping and pushing reverses the order, so the oldest item lands on top.", "transfer"],
          `    }`,
          [`    return this.outStack.pop();`, "The top of the out stack is the oldest item overall.", "pop"],
          `  }`,
          `}`,
          ``,
          `function runOps(ops) {`,
          `  const q = new QueueWithTwoStacks();`,
          `  const out = [];`,
          `  for (const op of ops) {`,
          `    if (op[0] === "E") q.enqueue(Number(op.slice(1)));`,
          `    else out.push(q.dequeue() ?? "empty");`,
          `  }`,
          [`  return out;`, "", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.ops.split(/\s+/).filter(Boolean))
    }
  ],

  mistakes: [
    {
      oops: "Using `array.shift()` as the dequeue on a big queue",
      why: "Removing the first element makes the engine renumber everything behind it, so each dequeue is O(n) in principle and a long loop becomes O(n²).",
      fix: "Use a circular array, a linked list, or keep a moving `head` index and only read `arr[head++]`."
    },
    {
      oops: "Forgetting the `% capacity` when computing positions in a circular queue",
      why: "Without the modulo the index runs off the end of the array instead of wrapping to the start.",
      fix: "Write the next write position as `(front + size) % capacity` and move the front as `(front + 1) % capacity`."
    },
    {
      oops: "Not checking for **full** or **empty** before enqueue or dequeue",
      why: "Enqueuing into a full queue overwrites the oldest item. Dequeuing from an empty queue returns stale garbage.",
      fix: "Track `size` separately and check `size === capacity` / `size === 0`."
    },
    {
      oops: "Storing **values** instead of **indexes** in a sliding-window deque",
      why: "You cannot tell when a stored value has slid out of the window, because you no longer know where it came from.",
      fix: "Store indexes and compare with `i - k`."
    },
    {
      oops: "Forgetting to drop expired indexes from the front",
      why: "The front may belong to a number that is no longer in the window, so the reported maximum is wrong.",
      fix: "At every step, `if (deque[0] <= i - k) deque.shift()` before reading the front."
    }
  ],

  remember: {
    mnemonic: "Queue = line at a counter: join at the back, leave from the front. Deque window: newcomers knock out weaker ones from the back; expired ones leave from the front.",
    rules: [
      "FIFO: enqueue back, dequeue front. A fast queue never shifts items.",
      "Circular queue: `next = (front + size) % cap`, `front = (front + 1) % cap`.",
      "Sliding window max/min = monotonic deque of **indexes**: expire front, pop weaker from back, push, read front.",
      "Queue from two stacks: pour in → out only when out is empty (amortised O(1))."
    ],
    template: {
      lines: [
        [`const deque = [];  // indexes, values decreasing`, "Front = current window maximum."],
        [`for (let i = 0; i < n; i++) {`, ""],
        [`  if (deque.length && deque[0] <= i - k) deque.shift();`, "1. drop the expired front"],
        [`  while (deque.length && arr[deque[deque.length - 1]] <= arr[i]) deque.pop();`, "2. drop weaker candidates from the back"],
        [`  deque.push(i);`, "3. add the newcomer"],
        [`  if (i >= k - 1) answer.push(arr[deque[0]]);`, "4. the front is the answer for this window"],
        `}`
      ]
    },
    more: [
      {
        type: "text",
        text: "**Stack using a queue:** after each `push(x)`, rotate the queue (move the front to the back) n − 1 times so that x ends up at the front. Then `pop` is a plain dequeue. Your own files: `Problems/Queue/enqueue_dequeue.js`, `taskScheduler.js` and `Problems/Deque/circularDeque.js`."
      }
    ]
  },

  practice: {
    title: "First Negative Number in Every Window",
    level: "Medium",
    problem: "Given an array and a window size `k`, return, for every window of `k` consecutive numbers, the **first negative number** in that window. If a window has no negative number, report `0` for it.",
    examples: [
      { input: "[12, -1, -7, 8, -15, 30, 16, 28], k = 3", output: "[-1, -1, -7, -15, -15, 0]", why: "The last window [30, 16, 28] has no negative number." },
      { input: "[1, 2, 3], k = 2", output: "[0, 0]" }
    ],
    hints: [
      "You only care about **negative** numbers. A deque can hold just the indexes of the negatives that are inside the current window.",
      "At each step: drop the front index if it is outside the window; if the new number is negative, push its index.",
      "Once the first window is complete (`i >= k - 1`): if the deque is empty report `0`, otherwise report `arr[deque[0]]` (the oldest negative still in the window)."
    ],
    solution: {
      explain: [
        "The deque holds the indexes of negative numbers in the current window, oldest first, so its front is always the *first* negative of the window. Expired indexes are dropped from the front. No element is ever scanned twice.",
        "Time O(n), space O(k)."
      ],
      code: {
        fn: "firstNegatives",
        lines: [
          `function firstNegatives(arr, k) {`,
          [`  const dq = [];`, "Indexes of the negative numbers inside the window."],
          [`  const result = [];`, ""],
          [`  for (let i = 0; i < arr.length; i++) {`, "Visit each number once."],
          [`    if (dq.length && dq[0] <= i - k) dq.shift();`, "The oldest negative slid out of the window: drop it."],
          [`    if (arr[i] < 0) dq.push(i);`, "A new negative number joins the back."],
          [`    if (i >= k - 1) result.push(dq.length ? arr[dq[0]] : 0);`, "A complete window: the front is its first negative, or 0 if the deque is empty."],
          `  }`,
          [`  return result;`, ""],
          `}`
        ]
      }
    },
    tests: [
      { args: [[12, -1, -7, 8, -15, 30, 16, 28], 3], expect: [-1, -1, -7, -15, -15, 0] },
      { args: [[1, 2, 3], 2], expect: [0, 0] },
      { args: [[-1, -2], 1], expect: [-1, -2] },
      { args: [[5, -3, 4], 3], expect: [-3] },
      { args: [[1, -1], 2], expect: [-1] },
      { args: [[], 1], expect: [] },
      { args: [[4, 5], 3], expect: [] }
    ]
  },

  recall: [
    { q: "What does FIFO mean, and which end do you add to and remove from?", a: "First in, first out. Add at the back (`enqueue`), remove from the front (`dequeue`)." },
    { q: "Why is `array.shift()` a poor dequeue for big queues?", a: "It moves every remaining item one place left, so it is O(n). A circular array, linked list or head index gives O(1)." },
    { q: "In a circular queue, how do you compute the slot to write to and how does the front advance?", a: "Write at `(front + size) % capacity`; after a dequeue set `front = (front + 1) % capacity`." },
    { q: "In sliding-window maximum, what is stored in the deque and where is the answer?", a: "Indexes with decreasing values. The front of the deque is the maximum of the current window." },
    { q: "Why is sliding-window maximum O(n) despite the nested `while`?", a: "Each index is pushed once and popped at most once, so the total number of pops is at most n." }
  ],

  related: {
    topics: ["stack", "sliding-window", "linked-list", "graph-bfs", "heap"],
    files: ["Problems/Queue/enqueue_dequeue.js", "Problems/Queue/taskScheduler.js", "Problems/Deque/circularDeque.js", "Problems/Deque/dequeArray.js", "Problems/Deque/dequeDoublyLinkedList.js"]
  }
});
