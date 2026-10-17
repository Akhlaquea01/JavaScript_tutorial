// Data Structures — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "data-structures",
  group: "basics",
  emoji: "🗂️",
  title: "Data Structures",
  tagline: "Different ways to arrange data in memory. Each one makes some jobs fast and others slow, so choosing well is half of solving a problem.",
  level: "Starter",

  gist: [
    "A data structure is a **rule for storing and connecting data** plus the operations it offers (insert, delete, search, update, traverse).",
    "**No structure wins at everything.** Arrays read by position instantly but are slow to insert in the middle. Linked lists are the opposite. Hash maps find by key fast but keep no useful order.",
    "**Linear:** array, linked list, stack, queue. **Non-linear:** tree, graph, heap, trie.",
    "To choose, ask: *which operation will I repeat the most?*"
  ],

  complexity: {
    time: "varies by structure",
    space: "O(n)",
    why: [
      "Every structure stores n items, so memory is O(n). What changes from structure to structure is the **time each operation takes**, and that is the whole reason several structures exist.",
      "That is why interviewers ask “what is the complexity of *this* operation on *that* structure?”. The table below is worth knowing by heart."
    ],
    more: [
      {
        type: "table",
        heading: "Cost cheat-sheet (average case)",
        columns: ["Structure", "Read by position / key", "Search a value", "Insert", "Delete"],
        rows: [
          ["Array", "O(1)", "O(n)", "O(n) front or middle, O(1) at end", "O(n) front or middle, O(1) at end"],
          ["Linked list", "O(n)", "O(n)", "O(1) once you hold the spot", "O(1) once you hold the spot"],
          ["Stack", "top only: O(1)", "O(n)", "push O(1)", "pop O(1)"],
          ["Queue", "front only: O(1)", "O(n)", "enqueue O(1)", "dequeue O(1)"],
          ["Hash map / set", "by key: O(1)", "by key: O(1)", "O(1)", "O(1)"],
          ["Balanced BST", "O(log n)", "O(log n)", "O(log n)", "O(log n)"],
          ["Heap", "min / max: O(1)", "O(n)", "O(log n)", "O(log n)"],
          ["Trie", "-", "O(word length)", "O(word length)", "O(word length)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "The *same* data can live in a drawer, a filing cabinet or a notebook. What changes is how quickly you can **find**, **add** and **remove** things. A data structure is the chosen way of organising the data, together with the operations it gives you.",
      "Every structure makes a trade. An array keeps items side by side, so jumping to position 500 is instant, but squeezing a new item into the middle forces everything after it to shuffle along. A linked list chains items with pointers, so inserting is cheap but reaching position 500 means following 500 links.",
      "**Linear** structures (array, linked list, stack, queue) hold items in a line. **Non-linear** ones (tree, graph, heap, trie) connect items in branches or networks, which is what makes hierarchies, maps and fast “smallest first” possible."
    ],
    signals: [
      "“Look something up by **key** / name / id” → **hash map** (or set if you only need yes/no).",
      "“The **most recent** thing first”, undo, matching brackets → **stack**.",
      "“In the **order they arrived**”, scheduling, BFS → **queue**.",
      "“Always the **smallest or largest** quickly”, top-K → **heap**.",
      "A **hierarchy** (folders, org chart) → **tree**. **Connections** (roads, friends) → **graph**. Words and **prefixes** → **trie**."
    ],
    notFor: [
      "Reaching for a fancy structure before checking the simple one. An array or a hash map solves most problems.",
      "Judging a structure by one operation. Always ask which operations your algorithm repeats."
    ],
    more: [
      {
        type: "table",
        heading: "Linear structures",
        columns: ["Structure", "How it works", "Good at", "Weak at", "Typical uses"],
        rows: [
          ["**Array**", "Items side by side in memory, found by index", "Reading by position", "Insert / delete in the middle", "Lists, tables, most inputs"],
          ["**Linked list**", "Nodes holding data plus a pointer to the next node", "Insert / delete when you hold the spot, growing freely", "Reading by position", "LRU cache, undo chains"],
          ["**Stack**", "Last in, first out", "Push / pop at the top", "Anything but the top", "Recursion, undo, bracket matching"],
          ["**Queue**", "First in, first out", "Add at the back, take from the front", "Anything but the ends", "Scheduling, BFS"]
        ]
      },
      {
        type: "table",
        heading: "Non-linear structures",
        columns: ["Structure", "How it works", "Typical uses"],
        rows: [
          ["**Tree**", "A root with children, no cycles (binary tree, BST, AVL, heap)", "File systems, fast searching"],
          ["**Graph**", "Nodes (vertices) joined by edges. Cycles allowed, edges may be directed or weighted", "Maps, networks, BFS / DFS"],
          ["**Heap**", "A complete binary tree where the root is always the smallest (min-heap) or largest (max-heap)", "Priority queues, top-K"],
          ["**Trie**", "A tree of characters, one letter per step (prefix tree)", "Autocomplete, dictionaries, prefix search"]
        ]
      },
      {
        type: "points",
        heading: "The five common operations",
        style: "chips",
        items: ["Insert", "Delete", "Search", "Update", "Traverse"]
      }
    ]
  },

  analogy: {
    title: "Where you keep things in a house",
    story: [
      "An **array** is an egg tray: numbered slots side by side. Grab slot 5 instantly. But to add a new slot in the middle you must shift every egg after it. A **linked list** is a scavenger hunt: each clue tells you where the next one is. Reaching clue 50 means following 49 clues, but adding a clue is just rewriting one hint.",
      "A **stack** is a pile of plates (last on, first off). A **queue** is the line at a ticket counter (first in, first served). A **hash map** is a wall of labelled drawers: say the label and walk straight to the drawer.",
      "A **tree** is an org chart or a folder tree. A **graph** is a city map or a friendship network. A **heap** is a hospital emergency room: the most urgent patient is always seen next. A **trie** is your phone's contact search: every letter you type narrows the list."
    ],
    map: [
      ["Egg tray", "Array"],
      ["Scavenger hunt of clues", "Linked list"],
      ["Pile of plates", "Stack"],
      ["Line at a counter", "Queue"],
      ["Labelled drawers", "Hash map / set"],
      ["Org chart, folder tree", "Tree"],
      ["City map, friendships", "Graph"],
      ["Emergency room triage", "Heap (priority queue)"],
      ["Contact search as you type", "Trie"]
    ],
    breaks: "Real egg trays have a fixed size; JavaScript arrays grow on their own. And a hospital triage nurse can re-rank people any time, while a heap only guarantees that the *top* is the most urgent."
  },

  demos: [
    {
      id: "tour",
      title: "A quick tour: four structures doing their jobs",
      intro: "Step through a few lines of JavaScript and watch each structure change. Notice what each one guarantees: the stack gives back the **last** item, the queue the **first**, the set ignores repeats, the map overwrites a repeated key.",
      codeIntro: "JavaScript already gives you these: an array works as a stack or a queue, and `Set` and `Map` are hash-based.",
      viz: "none",
      legend: [],
      inputs: [],
      frames(inp, snap) {
        const st = [];
        const qu = [];
        const se = new Set();
        const mp = new Map();
        const made = { stack: false, queue: false, set: false, map: false };
        const boxes = (hot) => {
          const b = [];
          if (made.stack) b.push({ label: "stack (array)", hint: "add and remove at the top", kind: "stack", items: st.map((v, k) => ({ v, new: hot === "stack" && k === st.length - 1 })) });
          if (made.queue) b.push({ label: "queue (array)", hint: "add at the back, remove from the front", kind: "queue", items: qu.map((v, k) => ({ v, new: hot === "queue" && k === qu.length - 1 })) });
          if (made.set) b.push({ label: "Set", hint: "no repeats", kind: "set", items: [...se].map((v) => ({ v, new: hot === v })) });
          if (made.map) b.push({ label: "Map", hint: "key → value", kind: "map", items: [...mp].map(([k, v]) => ({ k, v, new: hot === k })) });
          return b;
        };
        const shot = (at, say, hot) => snap({ at: [at], boxes: boxes(hot), say });

        snap({ at: ["start"], boxes: [], say: "We will create four structures and use each one. At every step, read the label: it says what the structure promises." });
        made.stack = true;
        shot("mkstack", "`stack = []` An ordinary array, but we only touch its **end**. That makes it a stack: last in, first out.");
        st.push("plate 1");
        shot("push1", "`push(\"plate 1\")` goes on top.", "stack");
        st.push("plate 2");
        shot("push2", "`push(\"plate 2\")` goes on top of plate 1.", "stack");
        const top = st.pop();
        shot("pop", "`pop()` removes the **last** one that went in: " + top + ". Plate 1 stays at the bottom.");
        made.queue = true;
        shot("mkqueue", "`queue = []` Another array, but this time we add at the back and take from the **front**: first in, first out.");
        qu.push("Ann");
        shot("enq1", "Ann joins the back of the line.", "queue");
        qu.push("Bob");
        shot("enq2", "Bob joins behind Ann.", "queue");
        const served = qu.shift();
        shot("deq", "`shift()` takes from the **front**: " + served + " is served first because she arrived first.");
        made.set = true;
        shot("mkset", "`new Set()` is hash-based and stores each value **at most once**.");
        se.add(7);
        shot("add7", "Add 7.", 7);
        shot("add7b", "Add 7 again: nothing changes, because a set keeps no duplicates.");
        se.add(3);
        shot("add3", "Add 3.", 3);
        made.map = true;
        shot("mkmap", "`new Map()` is hash-based too, but stores **key → value** pairs.");
        mp.set("Asha", 30);
        shot("set1", "Store Asha → 30.", "Asha");
        mp.set("Ravi", 25);
        shot("set2", "Store Ravi → 25.", "Ravi");
        mp.set("Asha", 31);
        shot("set3", "Setting Asha again **overwrites** her value (30 becomes 31). Keys are unique.", "Asha");
        snap({
          at: ["done"],
          boxes: boxes(),
          out: "Each structure kept its promise",
          say: "Stack kept plate 1, queue kept Bob, set kept 7 and 3 (once each), map kept Asha → 31 and Ravi → 25.",
          result: { stack: st.slice(), queue: qu.slice(), seen: [...se], ages: [...mp] }
        });
      },
      code: {
        fn: "tour",
        lines: [
          [`function tour() {`, "", "start"],
          [`  const stack = [];`, "An array used as a stack: only touch the end.", "mkstack"],
          [`  stack.push("plate 1");`, "`push` adds on top.", "push1"],
          [`  stack.push("plate 2");`, "", "push2"],
          [`  stack.pop();`, "`pop` removes the most recent item.", "pop"],
          [`  const queue = [];`, "An array used as a queue: add at the back, remove from the front.", "mkqueue"],
          [`  queue.push("Ann");`, "Enqueue.", "enq1"],
          [`  queue.push("Bob");`, "", "enq2"],
          [`  queue.shift();`, "Dequeue: the oldest item leaves first.", "deq"],
          [`  const seen = new Set();`, "A hash-based set: each value once.", "mkset"],
          [`  seen.add(7);`, "", "add7"],
          [`  seen.add(7);`, "A repeat is ignored.", "add7b"],
          [`  seen.add(3);`, "", "add3"],
          [`  const ages = new Map();`, "A hash-based map: key → value.", "mkmap"],
          [`  ages.set("Asha", 30);`, "", "set1"],
          [`  ages.set("Ravi", 25);`, "", "set2"],
          [`  ages.set("Asha", 31);`, "Same key again: the value is replaced.", "set3"],
          [`  return { stack, queue, seen: [...seen], ages: [...ages] };`, "Show what each structure ended up holding.", "done"],
          `}`
        ]
      },
      call: (fn) => fn()
    },

    {
      id: "shift",
      title: "Why inserting into the middle of an array is slow",
      intro: "To insert at position *pos* the array must make room, so **every item after it moves one place to the right**. Count the moves. Try `pos` = the length (append) to see zero moves.",
      codeIntro: "A hand-written `insertAt`, so the shifting is visible. (`arr.splice(pos, 0, value)` does exactly this work for you.)",
      viz: "array",
      legend: [["cur", "item being copied"], ["good", "slot just written"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Array", value: [10, 20, 30, 40, 50], len: [2, 8], min: 1, max: 99 },
        { type: "number", name: "pos", label: "Insert at position", value: 1, min: 0, max: 8 },
        { type: "number", name: "value", label: "Value", value: 99, min: 1, max: 99 }
      ],
      validate(inp) {
        return inp.pos > inp.nums.length ? "Position must be between 0 and " + inp.nums.length + " (the array length)." : null;
      },
      random(rnd) {
        const n = rnd.int(3, 7);
        const nums = Array.from({ length: n }, () => rnd.int(10, 80));
        return { nums: nums.join(", "), pos: String(rnd.int(0, n)), value: String(rnd.int(81, 99)) };
      },
      frames(inp, snap) {
        const n = inp.nums.length;
        const pos = inp.pos;
        const disp = inp.nums.concat(["·"]);
        let moves = 0;
        const view = (extra) => Object.assign({ label: "arr", cells: disp, vars: { moves } }, extra);

        snap(view({
          at: ["init"],
          say: "The array has " + n + " items and we want to put **" + inp.value + "** at position **" + pos + "**. First, make room: add one empty slot (·) at the end."
        }));
        for (let i = n; i > pos; i--) {
          disp[i] = disp[i - 1];
          moves++;
          snap(view({
            at: ["loop", "shift"],
            ptr: { i },
            tone: { [i]: "good", [i - 1]: "cur" },
            say: "**Move #" + moves + ":** copy the item at position " + (i - 1) + " (" + disp[i - 1] + ") into position " + i + ". We go from the right so nothing gets overwritten before it is copied."
          }));
        }
        disp[pos] = inp.value;
        snap(view({
          at: ["place"],
          tone: { [pos]: "good" },
          ptr: { pos },
          out: "Inserted with " + moves + " move" + (moves === 1 ? "" : "s") + (moves === 0 ? " (appending is cheap)" : ""),
          say: moves === 0
            ? "Position " + pos + " is the empty slot at the end, so **no item had to move**. Appending is O(1)."
            : "The gap is now at position " + pos + ": write **" + inp.value + "** there. It took **" + moves + "** moves. Inserting at the front would cost n moves, which is why this is **O(n)**.",
          result: { arr: disp.slice(), moves }
        }));
      },
      code: {
        fn: "insertAt",
        lines: [
          `function insertAt(arr, pos, value) {`,
          [`  arr.push(0);`, "Grow the array by one slot at the end (the value 0 is just a placeholder).", "init"],
          [`  let moves = 0;`, "Count the work.", "init"],
          [`  for (let i = arr.length - 1; i > pos; i--) {`, "Walk from the end back to the insert position.", "loop"],
          [`    arr[i] = arr[i - 1];`, "Shift the item one place to the right.", "shift"],
          [`    moves++;`, "", "shift"],
          `  }`,
          [`  arr[pos] = value;`, "The gap is open: drop the new value in.", "place"],
          [`  return { arr, moves };`, "", "place"],
          `}`
        ]
      },
      call: (fn, inp) => {
        const r = fn(inp.nums.slice(), inp.pos, inp.value);
        return { arr: r.arr, moves: r.moves };
      }
    }
  ],

  mistakes: [
    {
      oops: "Picking a structure without asking which operations matter most",
      why: "A structure that is perfect for reading can be terrible for inserting, and vice versa. Choosing by habit gives code that works on small tests and crawls on big inputs.",
      fix: "Write down the operations your algorithm repeats (lookup? insert at front? smallest item?) and pick the structure that makes *those* cheap."
    },
    {
      oops: "Asking an array “is it in here?” inside a loop (`arr.includes(x)`)",
      why: "`includes` scans the array, which is O(n). Inside a loop over n items that quietly becomes O(n²).",
      fix: "Put the values in a `Set` (or `Map`) once, then ask in O(1)."
    },
    {
      oops: "Using `array.shift()` as a queue in a hot loop",
      why: "Removing from the front forces the array to renumber everything behind it, so each dequeue costs O(n) in principle.",
      fix: "Keep a moving `head` index, or use a deque / linked list when the queue is big."
    },
    {
      oops: "Saying “insert is O(1)” or “insert is O(n)” without saying *where* and *in what*",
      why: "The cost depends on position and structure: appending to an array is O(1), inserting at its front is O(n), inserting after a node you already hold in a linked list is O(1).",
      fix: "Always state the structure and the position, e.g. “insert at the front of an array is O(n)”."
    }
  ],

  remember: {
    mnemonic: "Ask what you do most. By position → array. By key → map. Latest first → stack. Oldest first → queue. Smallest or largest → heap. Hierarchy → tree. Links → graph. Prefix → trie.",
    rules: [
      "Start simple: array and hash map solve most problems.",
      "Linear: array, linked list, stack, queue. Non-linear: tree, graph, heap, trie.",
      "Array: fast read, slow middle insert. Linked list: slow read, fast insert once you hold the spot.",
      "In interviews, say the complexity of the **operation** on the **structure**, not just “O(n)”."
    ],
    template: {
      lines: [
        [`// 1. What operations does my algorithm repeat?`, "Lookup by key? Remove the oldest? Get the smallest? Walk neighbours?"],
        [`// 2. Which structure makes THOSE cheap?`, "Use the cheat-sheet table on this page."],
        [`// 3. What does it cost in memory?`, "Usually O(n), but hash maps and trees carry some overhead."],
        [`// 4. Is there a simpler one that is fast enough?`, "Prefer the simplest structure that meets the time limit."]
      ]
    }
  },

  practice: {
    title: "First Repeated Value",
    level: "Easy",
    problem: "Given an array of numbers, return the **first value that turns out to be a repeat**, meaning the first element (scanning left to right) that you have already seen earlier. Return `-1` if nothing repeats.",
    examples: [
      { input: "[2, 5, 1, 2, 3, 5, 1]", output: "2", why: "Scanning left to right, the second 2 is the first element seen before." },
      { input: "[1, 2, 3]", output: "-1" }
    ],
    hints: [
      "For each element you need the question “have I seen this before?” answered quickly. Which structure answers that in O(1)?",
      "Keep a `Set` of values seen so far. Scan left to right.",
      "If the current value is already in the set, return it. Otherwise add it and continue."
    ],
    solution: {
      explain: [
        "A `Set` gives “seen before?” in O(1), so one pass is enough. With an array and `includes` the same idea would be O(n²). Choosing the right structure is the whole trick.",
        "Time O(n), space O(n)."
      ],
      code: {
        fn: "firstRepeated",
        lines: [
          `function firstRepeated(arr) {`,
          [`  const seen = new Set();`, "Values we have already passed."],
          [`  for (const x of arr) {`, "Scan left to right."],
          [`    if (seen.has(x)) return x;`, "Seen before: this is the first repeat."],
          [`    seen.add(x);`, "Otherwise remember it."],
          `  }`,
          [`  return -1;`, "No value repeated."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[2, 5, 1, 2, 3, 5, 1]], expect: 2 },
      { args: [[1, 2, 3]], expect: -1 },
      { args: [[5, 5]], expect: 5 },
      { args: [[]], expect: -1 },
      { args: [[3, 1, 3, 1]], expect: 3 },
      { args: [[1, 2, 1, 2]], expect: 1 },
      { args: [[7]], expect: -1 }
    ]
  },

  recall: [
    { q: "Array vs linked list: which is better for reading by position, and which for inserting?", a: "Array reads by position in O(1) but inserting in the middle is O(n). A linked list inserts in O(1) once you hold the spot but reading by position is O(n)." },
    { q: "Which structure matches “most recent first”, and which “in order of arrival”?", a: "Stack for most recent first (LIFO). Queue for order of arrival (FIFO)." },
    { q: "Which structure answers “is this value present?” fastest?", a: "A hash set (or hash map for key → value): O(1) on average." },
    { q: "Name the linear and the non-linear structures.", a: "Linear: array, linked list, stack, queue. Non-linear: tree, graph, heap, trie." },
    { q: "Why can `arr.includes(x)` inside a loop be a problem?", a: "It scans the array each time (O(n)), so the loop becomes O(n²). Use a Set for O(1) checks." }
  ],

  related: {
    topics: ["algorithms", "time-complexity", "stack", "queue-deque", "linked-list", "hashmap", "heap", "graph-basics", "trie"],
    files: ["Problems/Stack/stackIntro.js", "Problems/Queue/enqueue_dequeue.js", "Problems/LinkedList/linkedListIntro.js", "Problems/Hash/hashMapIntro.js", "Problems/Tree/binaryTree.js", "Problems/Graph/Graph.js", "Problems/Tree/heap.js", "Problems/Tree/Trie.js"]
  }
});
