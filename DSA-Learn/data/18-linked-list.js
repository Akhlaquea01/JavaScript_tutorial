// Linked List — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "linked-list",
  group: "linear",
  emoji: "🔗",
  title: "Linked List",
  tagline: "A chain of nodes, each holding a value and a pointer to the next node. Inserting and deleting is cheap once you are at the spot; finding the spot is the slow part.",
  level: "Core",
  needs: ["data-structures", "two-pointer"],

  gist: [
    "Each **node** stores a `val` and a `next` pointer. The list is reached through its **head**. There is no index, so reaching position i means following i links.",
    "Insert or delete is **O(1)** once you hold the node before the spot; searching or reading by position is **O(n)**.",
    "Three skills cover most problems: **rewire pointers** (insert, delete), **reverse** (`prev` / `curr` / `next`), and **fast & slow pointers** (middle, cycle).",
    "Types: **singly** (next only), **doubly** (next and prev), **circular** (the tail points back to the head)."
  ],

  complexity: {
    time: "O(1) insert/delete at a known spot, O(n) search",
    space: "O(1) extra for most pointer tricks",
    why: [
      "Because nodes are connected by pointers, changing the chain means changing one or two pointers: O(1). But there is no way to jump to the middle, so finding a node by value or by position walks the list from the head: O(n).",
      "Pointer-based algorithms (reverse, middle, cycle detection) walk the list once with a few extra variables, so they are O(n) time and **O(1)** extra space."
    ],
    more: [
      {
        type: "table",
        heading: "Array vs linked list",
        columns: ["Operation", "Array", "Linked list"],
        rows: [
          ["Access by index", "O(1)", "O(n)"],
          ["Search", "O(n)", "O(n)"],
          ["Insert / delete at the start", "O(n)", "O(1)"],
          ["Insert / delete at the end", "O(1) amortised", "O(1) with a tail pointer, otherwise O(n)"],
          ["Insert / delete in the middle", "O(n) (shifting)", "O(1) once you hold the node before it"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "An array keeps its items side by side in memory. A **linked list** does not: each item lives in its own small object called a **node**, and each node simply remembers where the next one is. You hold on to the first node (the **head**) and follow the `next` pointers to walk the list. The last node's `next` is `null`.",
      "That layout makes **changing** the list cheap. To insert a node you point two links at it. To delete one you make its predecessor skip over it. Nothing has to shift. The price is that you cannot jump straight to position 500: there is no index, so you follow 500 links.",
      "Most linked-list problems are about **moving pointers carefully**. The golden rule: *save what you are about to lose before you overwrite a pointer*. And remember that `curr.next` may be `null`, so check before you go further."
    ],
    signals: [
      "The problem gives you a **head** node (`ListNode`) rather than an array.",
      "“**Reverse** the list”, “**middle** of the list”, “**detect a cycle**”, “**merge** two sorted lists”, “remove the nth node from the end”.",
      "You need cheap insert / delete in the middle or at both ends (queues, LRU caches, undo history).",
      "Memory must grow and shrink freely, with no resizing."
    ],
    notFor: [
      "You read by index a lot. An array is far better.",
      "Small data where the extra pointers only waste memory and slow things down (arrays are cache-friendly)."
    ],
    more: [
      {
        type: "table",
        heading: "Types of linked lists",
        columns: ["Type", "Each node stores", "Good for"],
        rows: [
          ["**Singly**", "`val`, `next`", "Stacks, simple queues, most interview problems"],
          ["**Doubly**", "`val`, `next`, `prev`", "Deleting a node you already hold in O(1), moving both ways: LRU cache, browser history"],
          ["**Circular**", "The tail's `next` is the head", "Playlists, round-robin scheduling"]
        ]
      },
      {
        type: "callout",
        kind: "tip",
        text: "A **dummy node** in front of the list removes the special case for the head: `const dummy = { val: 0, next: head }`, work with `dummy`, and return `dummy.next` at the end."
      }
    ]
  },

  analogy: {
    title: "A scavenger hunt of clues",
    story: [
      "In a scavenger hunt, each clue card tells you where to find the next card. You are only given the first card (the **head**). To reach clue 5 you must follow clues 1, 2, 3 and 4 in order: there is no shortcut. But if the organiser wants to add a new clue between clues 2 and 3, they just change what clue 2 says and what the new card says. No card has to move.",
      "**Reversing** the hunt means walking along and, on each card, rewriting the arrow to point *backwards*. You must remember the next card before you rewrite the arrow, or you would lose the rest of the trail. **Fast & slow** is two runners on the same hunt: one takes one step per clue, the other two. If the trail loops back on itself, the fast runner eventually laps the slow one."
    ],
    map: [
      ["A clue card", "A node (`val` and `next`)"],
      ["“Go to card X next”", "The `next` pointer"],
      ["The first card you are handed", "`head`"],
      ["A card that says “the hunt ends”", "`next = null`"],
      ["Rewriting an arrow before you lose the trail", "`const nextNode = curr.next` first, then `curr.next = prev`"],
      ["Two runners, one twice as fast", "`slow` and `fast` pointers"]
    ],
    breaks: "In a real hunt you can look at every card and count. A program only sees the node it is currently holding and the pointer inside it, which is why the pointer tricks matter."
  },

  demos: [
    {
      id: "delete",
      title: "Delete the first node with a given value",
      intro: "Find the node **before** the unwanted one (`curr`), then make it **skip over** the target. The amber arrow is the link that was rewired; the red node is now unreachable.",
      codeIntro: "Returns the new head of the list after deleting the first node whose value is `val`.",
      viz: "list",
      legend: [["bad", "deleted (unreachable)"], ["cur", "curr: the node before the target"]],
      inputs: [
        { type: "numlist", name: "nums", label: "List values", value: [4, 7, 9, 2, 6], len: [4, 7], min: 1, max: 9 },
        { type: "number", name: "value", label: "Delete value", value: 9, min: 1, max: 9 }
      ],
      random(rnd) {
        const n = rnd.int(4, 6);
        const nums = Array.from({ length: n }, () => rnd.int(1, 9));
        return { nums: nums.join(", "), value: String(rnd() < 0.8 ? nums[rnd.int(0, n - 1)] : rnd.int(1, 9)) };
      },
      frames(inp, snap) {
        const vals = inp.nums.slice();
        const n = vals.length;
        const target = inp.value;
        const nxt = vals.map((_, i) => i + 1);
        let head = 0;
        const removed = new Set();
        const gone = () => Object.fromEntries([...removed].map((i) => [i, "bad"]));
        const view = (ptr, tone, extra) => Object.assign({ lists: [{ label: "linked list", nodes: vals, links: nxt.slice(), ptr, tone: { ...gone(), ...tone } }] }, extra);
        const collect = () => {
          const out = [];
          for (let i = head; i !== n; i = nxt[i]) out.push(vals[i]);
          return out;
        };

        snap(view({ head }, {}, { at: ["guard"], say: "`head` points at the first node. We want to delete the first node holding **" + target + "**." }));
        if (vals[head] === target) {
          removed.add(head);
          head = nxt[head];
          const out = collect();
          snap(view({ head }, {}, { at: ["head"], out: "[" + out.join(", ") + "]", say: "The **head itself** holds " + target + ", so there is no node before it. Just move `head` to the next node. The list is now **[" + out.join(", ") + "]**.", result: out }));
          return;
        }
        let curr = head;
        snap(view({ head, curr }, { [curr]: "cur" }, { at: ["setcurr"], say: "The head is not " + target + ". Start `curr` at the head and look at **`curr.next`** each time, because we need the node *before* the target." }));
        while (nxt[curr] !== n && vals[nxt[curr]] !== target) {
          const peek = vals[nxt[curr]];
          curr = nxt[curr];
          snap(view({ head, curr }, { [curr]: "cur" }, { at: ["loop"], say: "The node after the old `curr` held " + peek + ", not " + target + ", so move `curr` forward." }));
        }
        if (nxt[curr] !== n) {
          const victim = nxt[curr];
          nxt[curr] = nxt[victim];
          removed.add(victim);
          const out = collect();
          snap(view({ head, curr }, { [curr]: "cur" }, { at: ["skip"], out: "[" + out.join(", ") + "]", say: "`curr.next` holds **" + target + "**. Make `curr.next` point to `curr.next.next`: the arrow now **skips** the target. Nothing points to it any more, so it is gone. The list is **[" + out.join(", ") + "]**.", result: out }));
        } else {
          const out = collect();
          snap(view({ head, curr }, { [curr]: "cur" }, { at: ["notfound"], out: target + " is not in the list", outTone: "bad", say: "We reached the end without finding " + target + ", so nothing is deleted. The list stays **[" + out.join(", ") + "]**.", result: out }));
        }
      },
      code: {
        fn: "deleteNode",
        lines: [
          `function deleteNode(head, val) {`,
          [`  if (head === null) return null;`, "Empty list: nothing to delete.", "guard"],
          [`  if (head.val === val) return head.next;`, "Deleting the head: the new head is the second node.", "head"],
          [`  let curr = head;`, "We search for the node **before** the target.", "setcurr"],
          [`  while (curr.next && curr.next.val !== val) curr = curr.next;`, "Walk forward until the next node holds the target (or the list ends).", "loop"],
          [`  if (curr.next) curr.next = curr.next.next;`, "Make `curr` skip over the target. This single pointer change is the whole deletion.", "skip"],
          [`  return head;`, "The head did not change.", "notfound"],
          `}`
        ]
      },
      call: (fn, inp) => DSA.util.list.toArray(fn(DSA.util.list.build(inp.nums), inp.value))
    },

    {
      id: "reverse",
      title: "Reverse a linked list (prev, curr, next)",
      intro: "Walk along the list and flip each arrow to point **backwards**. Three pointers do it: `prev`, `curr` and `nextNode`. The amber arrow is the one just flipped. The arrows end up pointing left, so the list now starts at the old tail.",
      codeIntro: "Returns the head of the reversed list.",
      viz: "list",
      legend: [["cur", "curr: node being flipped"], ["good", "already reversed"]],
      inputs: [{ type: "numlist", name: "nums", label: "List values", value: [1, 2, 3, 4, 5], len: [3, 7], min: 1, max: 9 }],
      frames(inp, snap) {
        const vals = inp.nums.slice();
        const n = vals.length;
        const nxt = vals.map((_, i) => i + 1);
        let prev = -1;
        let curr = 0;
        const reversed = () => DSA.util.span(0, prev, "good");
        const view = (ptr, tone, extra) => Object.assign({ lists: [{ label: "linked list", nodes: vals, links: nxt.slice(), ptr, tone }] }, extra);

        snap(view({ prev, curr }, { [curr]: "cur" }, { at: ["init"], say: "`prev` starts as **null** (the new tail will point to null) and `curr` is the head. For each node we will flip its arrow to point at `prev`." }));
        while (curr !== n) {
          const nextNode = nxt[curr];
          snap(view({ prev, curr, next: nextNode }, { ...reversed(), [curr]: "cur" }, { at: ["loop", "save"], say: "Save `nextNode = curr.next` (**" + (nextNode === n ? "null" : vals[nextNode]) + "**) **before** changing anything. Once we flip the arrow, this is the only way to find the rest of the list." }));
          nxt[curr] = prev;
          snap(view({ prev, curr, next: nextNode }, { ...reversed(), [curr]: "cur" }, { at: ["flip"], say: "Flip: `curr.next = prev`. Node " + vals[curr] + " now points **" + (prev === -1 ? "to null" : "back to " + vals[prev]) + "**. The amber arrow is the change." }));
          prev = curr;
          curr = nextNode;
          snap(view({ prev, curr }, { ...reversed(), ...(curr !== n ? { [curr]: "cur" } : {}) }, { at: ["step1", "step2"], say: "Step forward: `prev = curr` and `curr = nextNode`. Everything up to **" + vals[prev] + "** is now reversed." }));
        }
        const out = vals.slice().reverse();
        snap(view({ head: prev }, reversed(), { at: ["done"], out: "Reversed: [" + out.join(", ") + "]", say: "`curr` is null, so every arrow has been flipped. `prev` is the last node we handled, the old tail, and it is the **new head**. Read the arrows: **[" + out.join(", ") + "]**.", result: out }));
      },
      code: {
        fn: "reverseList",
        lines: [
          `function reverseList(head) {`,
          [`  let prev = null, curr = head;`, "`prev` is the already-reversed part (empty at first). `curr` is the node we are about to flip.", "init"],
          [`  while (curr !== null) {`, "One node per pass.", "loop"],
          [`    const nextNode = curr.next;`, "Remember the next node, or the rest of the list would be lost.", "save"],
          [`    curr.next = prev;`, "Flip the arrow so it points backwards.", "flip"],
          [`    prev = curr;`, "The reversed part now includes `curr`.", "step1"],
          [`    curr = nextNode;`, "Move on to the saved next node.", "step2"],
          `  }`,
          [`  return prev;`, "When `curr` runs off the end, `prev` is the old tail: the new head.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => DSA.util.list.toArray(fn(DSA.util.list.build(inp.nums)))
    },

    {
      id: "middle",
      title: "Fast & slow pointers: find the middle",
      intro: "`slow` takes one step and `fast` takes two. When `fast` reaches the end, `slow` is exactly halfway. Try an even-length list: you get the second of the two middle nodes.",
      codeIntro: "Returns the middle node (for an even length, the second middle).",
      viz: "list",
      legend: [["good", "the middle node"]],
      inputs: [{ type: "numlist", name: "nums", label: "List values", value: [1, 2, 3, 4, 5, 6, 7], len: [3, 9], min: 1, max: 9 }],
      frames(inp, snap) {
        const vals = inp.nums.slice();
        const n = vals.length;
        const nxt = vals.map((_, i) => i + 1);
        let slow = 0;
        let fast = 0;
        const view = (ptr, tone, extra) => Object.assign({ lists: [{ label: "linked list", nodes: vals, links: nxt, ptr, tone }] }, extra);

        snap(view({ slow, fast }, {}, { at: ["init"], say: "Both pointers start at the head. **slow** will move 1 node per step and **fast** 2 nodes per step." }));
        while (fast !== n && nxt[fast] !== n) {
          slow = nxt[slow];
          fast = nxt[nxt[fast]];
          snap(view({ slow, fast }, {}, { at: ["loop", "move"], say: "slow moves one node (to **" + vals[slow] + "**), fast moves two (" + (fast === n ? "off the end: null" : "to **" + vals[fast] + "**") + "). fast covers twice the distance of slow." }));
        }
        snap(view({ slow, fast }, { [slow]: "good" }, { at: ["done"], out: "Middle node: " + vals[slow], say: "fast cannot move two more steps, so the loop ends. fast has travelled the whole list while slow travelled half of it, so **slow is at the middle: " + vals[slow] + "**.", result: vals[slow] }));
      },
      code: {
        fn: "middleNode",
        lines: [
          `function middleNode(head) {`,
          [`  let slow = head, fast = head;`, "Both start at the head.", "init"],
          [`  while (fast !== null && fast.next !== null) {`, "Stop when fast has no two more nodes to jump. Check `fast` **before** `fast.next`, or you would read a property of null.", "loop"],
          [`    slow = slow.next;`, "slow: 1 step.", "move"],
          [`    fast = fast.next.next;`, "fast: 2 steps.", "move"],
          `  }`,
          [`  return slow;`, "fast went twice as far, so slow is halfway.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(DSA.util.list.build(inp.nums)).val
    },

    {
      id: "cycle",
      title: "Fast & slow pointers: detect a cycle",
      intro: "If the tail points back to an earlier node, `fast` will eventually lap `slow` and they meet. If there is no cycle, `fast` falls off the end. `cycleAt` is the index the tail points back to (-1 = no cycle).",
      codeIntro: "Returns `true` if the list contains a cycle (Floyd's algorithm).",
      viz: "list",
      legend: [["good", "slow and fast meet"]],
      inputs: [
        { type: "numlist", name: "nums", label: "List values", value: [3, 5, 8, 2, 6, 4], len: [3, 8], min: 1, max: 9 },
        { type: "number", name: "cycleAt", label: "Tail points back to index (-1 = none)", value: 2, min: -1, max: 7 }
      ],
      validate(inp) {
        return inp.cycleAt >= inp.nums.length ? "The tail can only point back to an index from 0 to " + (inp.nums.length - 1) + " (or -1 for no cycle)." : null;
      },
      random(rnd) {
        const n = rnd.int(4, 7);
        return { nums: Array.from({ length: n }, () => rnd.int(1, 9)).join(", "), cycleAt: String(rnd() < 0.6 ? rnd.int(0, n - 1) : -1) };
      },
      frames(inp, snap) {
        const vals = inp.nums.slice();
        const n = vals.length;
        const c = inp.cycleAt;
        const nxt = vals.map((_, i) => (i < n - 1 ? i + 1 : c >= 0 ? c : n));
        let slow = 0;
        let fast = 0;
        const view = (ptr, tone, extra) => Object.assign({ lists: [{ label: "linked list", nodes: vals, links: nxt, ptr, tone }] }, extra);

        snap(view({ slow, fast }, {}, { at: ["init"], say: c >= 0 ? "The tail points back to node **" + vals[c] + "**, so this list has a cycle. Both pointers start at the head." : "No cycle here: the tail points to null. Both pointers start at the head." }));
        while (fast !== n && nxt[fast] !== n) {
          slow = nxt[slow];
          fast = nxt[nxt[fast]];
          if (slow === fast) {
            snap(view({ slow, fast }, { [slow]: "good" }, { at: ["loop", "move", "meet"], out: "Cycle detected", say: "slow and fast are on the **same node (" + vals[slow] + ")**. A runner who is twice as fast only meets the slow one again if the track is a loop: **there is a cycle**.", result: true }));
            return;
          }
          snap(view({ slow, fast }, {}, { at: ["loop", "move"], say: "slow moves 1, fast moves 2: slow is at **" + vals[slow] + "**, fast at **" + (fast === n ? "null" : vals[fast]) + "**. Not the same node yet." }));
        }
        snap(view({ slow, fast }, {}, { at: ["end"], out: "No cycle", outTone: "bad", say: "fast reached the end (**null**), so the list is finite: **no cycle**.", result: false }));
      },
      code: {
        fn: "hasCycle",
        lines: [
          `function hasCycle(head) {`,
          [`  let slow = head, fast = head;`, "Two runners on the same track.", "init"],
          [`  while (fast !== null && fast.next !== null) {`, "If the list ends, there is no cycle.", "loop"],
          [`    slow = slow.next;`, "", "move"],
          [`    fast = fast.next.next;`, "fast gains one node on slow every step.", "move"],
          [`    if (slow === fast) return true;`, "Same node (compare the nodes themselves, not their values): they met inside a cycle.", "meet"],
          `  }`,
          [`  return false;`, "fast fell off the end: no cycle.", "end"],
          `}`
        ]
      },
      call: (fn, inp) => fn(DSA.util.list.build(inp.nums, inp.cycleAt))
    }
  ],

  mistakes: [
    {
      oops: "Overwriting `curr.next` before saving the next node",
      why: "The old `next` pointer was the only link to the rest of the list. Once it is overwritten, the remaining nodes are lost.",
      fix: "Save first: `const nextNode = curr.next;` and only then `curr.next = prev;`."
    },
    {
      oops: "Reading `fast.next.next` without checking `fast` and `fast.next`",
      why: "If `fast` or `fast.next` is `null`, accessing a property on it throws “Cannot read properties of null”.",
      fix: "Loop condition: `while (fast !== null && fast.next !== null)`, in that order."
    },
    {
      oops: "Forgetting that the head can change",
      why: "Deleting or inserting at the front changes which node is the head. If you keep using the old `head` variable the list looks unchanged or broken.",
      fix: "Return the new head, or use a dummy node in front and return `dummy.next`."
    },
    {
      oops: "Comparing node **values** instead of the nodes in cycle detection",
      why: "Different nodes can hold the same value, so equal values do not prove the pointers met.",
      fix: "Compare references: `slow === fast`."
    },
    {
      oops: "Indexing a list like an array (`list[3]`)",
      why: "A linked list has no random access. The expression is simply `undefined`.",
      fix: "Walk with a pointer: `let node = head; for (let i = 0; i < 3; i++) node = node.next;`."
    }
  ],

  remember: {
    mnemonic: "Save the next, flip the arrow, step forward. Slow takes 1, fast takes 2.",
    rules: [
      "Before changing a pointer ask: “what will I lose?” Save it first.",
      "Reverse: `prev = null`, loop { `next = curr.next`; `curr.next = prev`; `prev = curr`; `curr = next` }, return `prev`.",
      "Fast & slow: middle = slow when fast ends; cycle = slow meets fast.",
      "Use a **dummy head** when the head might change. Always null-check before `.next`."
    ],
    template: {
      lines: [
        [`const dummy = { val: 0, next: head };`, "A fake node in front: the real head is no longer a special case."],
        [`let curr = dummy;`, "Walk with curr."],
        [`while (curr.next !== null) {`, "Always check before using .next"],
        [`  // look at curr.next, then rewire:  curr.next = ...`, "Rewire pointers; save anything you would lose."],
        [`  curr = curr.next;`, "Advance."],
        `}`,
        [`return dummy.next;`, "The (possibly new) head."]
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Your own files: `Problems/LinkedList/reverseList.js`, `findMiddleNode.js`, `hasLoop.js`, `mergeSortedLists.js`, and the full LRU cache in `Problems/LinkedList/lruCache.js` (doubly linked list + hash map). Doubly-linked basics are in `Problems/DoublyLinkedList/`."
      }
    ]
  },

  practice: {
    title: "Merge Two Sorted Lists",
    level: "Easy",
    problem: "Given the heads of two **sorted** linked lists, merge them into one sorted list by re-linking the existing nodes, and return the head of the merged list.",
    examples: [
      { input: "[1, 2, 4] and [1, 3, 4]", output: "[1, 1, 2, 3, 4, 4]" },
      { input: "[] and [0]", output: "[0]" }
    ],
    hints: [
      "Keep a `tail` pointer to the end of the merged list. At each step attach the smaller of the two current nodes to `tail.next`.",
      "A **dummy node** in front means you never need a special case for the first node: start with `tail = dummy` and return `dummy.next`.",
      "When one list runs out, attach the **rest of the other list** in one go: `tail.next = a || b`."
    ],
    solution: {
      explain: [
        "Like merging in merge sort: compare the two front nodes, take the smaller one and advance that list. No new nodes are created, only pointers change.",
        "Time O(n + m), extra space O(1)."
      ],
      code: {
        fn: "mergeTwoLists",
        lines: [
          `function mergeTwoLists(a, b) {`,
          [`  const dummy = { val: 0, next: null };`, "A fake first node so the real head needs no special case."],
          [`  let tail = dummy;`, "The last node of the merged list so far."],
          [`  while (a && b) {`, "While both lists still have nodes."],
          [`    if (a.val <= b.val) { tail.next = a; a = a.next; }`, "Take the smaller front node (ties go to `a`) and advance that list."],
          [`    else { tail.next = b; b = b.next; }`, ""],
          [`    tail = tail.next;`, "The merged list grew by one node."],
          `  }`,
          [`  tail.next = a || b;`, "One list is empty: hook up whatever remains of the other."],
          [`  return dummy.next;`, "Skip the dummy."],
          `}`
        ]
      }
    },
    tests: [
      { args: [{ list: [1, 2, 4] }, { list: [1, 3, 4] }], expect: [1, 1, 2, 3, 4, 4], out: "list" },
      { args: [{ list: [] }, { list: [] }], expect: [], out: "list" },
      { args: [{ list: [] }, { list: [0] }], expect: [0], out: "list" },
      { args: [{ list: [5] }, { list: [1, 2, 3] }], expect: [1, 2, 3, 5], out: "list" },
      { args: [{ list: [1, 3, 5] }, { list: [2, 4, 6] }], expect: [1, 2, 3, 4, 5, 6], out: "list" },
      { args: [{ list: [2] }, { list: [2] }], expect: [2, 2], out: "list" }
    ]
  },

  recall: [
    { q: "What does a node hold, and how do you reach the list?", a: "A `val` and a `next` pointer. You hold the `head`, the first node, and follow `next` pointers; the last node's `next` is `null`." },
    { q: "Why is inserting cheap but reading by position slow?", a: "Inserting only rewires one or two pointers (O(1) once you hold the spot). Reading position i requires following i links from the head (O(n))." },
    { q: "What are the three lines you must not reorder when reversing a list?", a: "Save `nextNode = curr.next`, then flip `curr.next = prev`, then advance `prev = curr; curr = nextNode`. Saving first prevents losing the rest of the list." },
    { q: "How do fast and slow pointers find the middle, and how do they detect a cycle?", a: "Slow moves 1, fast moves 2. When fast reaches the end, slow is at the middle. If the list loops, fast eventually catches slow, so meeting means a cycle." },
    { q: "Why use a dummy head node?", a: "It removes the special case when the head changes (insert / delete at the front): you always work on `dummy.next` and return it." }
  ],

  related: {
    topics: ["data-structures", "two-pointer", "stack", "queue-deque", "recursion"],
    files: ["Problems/LinkedList/reverseList.js", "Problems/LinkedList/findMiddleNode.js", "Problems/LinkedList/hasLoop.js", "Problems/LinkedList/mergeSortedLists.js", "Problems/LinkedList/lruCache.js", "Problems/LinkedList/linkedListIntro.js", "Problems/DoublyLinkedList/intro.js"]
  }
});
