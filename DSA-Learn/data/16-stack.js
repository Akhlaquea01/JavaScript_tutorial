// Stack + Monotonic Stack — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "stack",
  group: "linear",
  emoji: "📚",
  title: "Stack & Monotonic Stack",
  tagline: "A pile where you only touch the top: last in, first out. Perfect for matching things up and for “next bigger element” problems.",
  level: "Core",

  gist: [
    "**LIFO**: last in, first out. You only touch the top: `push`, `pop`, `peek`, all **O(1)**.",
    "Use a stack when the **most recent unfinished thing** must be handled first: matching brackets, undo, evaluating expressions, the recursion call stack.",
    "A **monotonic stack** keeps its items in sorted order and answers “next greater / smaller element” in O(n): each item is pushed once and popped once.",
    "In JavaScript an ordinary array is a stack: `push()` and `pop()` work on its end."
  ],

  complexity: {
    time: "O(1) per operation, O(n) per full pass",
    space: "O(n)",
    why: [
      "`push`, `pop` and `peek` only touch the top item, so they cost the same however many items are stacked: O(1). (Searching *inside* a stack is O(n), which is a sign you picked the wrong structure.)",
      "A monotonic-stack pass looks like a loop inside a loop, but every element is **pushed once and popped at most once**. That is at most 2n stack moves in total, so the whole pass is O(n), not O(n²).",
      "The stack can hold up to n items, so extra memory is O(n)."
    ],
    more: [
      {
        type: "table",
        heading: "Cost of each operation",
        columns: ["Operation", "What it does", "Time"],
        rows: [
          ["`push(x)`", "Put x on top", "O(1)"],
          ["`pop()`", "Remove and return the top", "O(1)"],
          ["`peek()` / top", "Look at the top without removing", "O(1)"],
          ["`isEmpty()` / `size()`", "Is it empty / how many items", "O(1)"],
          ["Search for a value", "Look through the whole stack", "O(n)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A stack is a pile of plates. You put a new plate on **top** and you take a plate from the **top**. You can never pull one from the middle. That rule is **LIFO**: Last In, First Out.",
      "Four operations are all you need: `push(x)` puts x on top, `pop()` removes and returns the top, `peek()` looks at the top without removing it, `isEmpty()` asks whether the pile is empty. Each is O(1) because only the top is touched.",
      "Stacks shine whenever the **most recent unfinished thing** has to be dealt with first. A closing bracket must match the *latest* opening bracket. Undo reverses the *latest* action. A function returns to the *latest* caller.",
      "A **monotonic stack** adds one rule: keep the items in order (always decreasing, or always increasing, from bottom to top). Before pushing a new item, pop everything that would break the order. The items you pop are exactly the ones that have just found their “next greater (or smaller) element”."
    ],
    signals: [
      "**Matching or nesting**: brackets, tags, “is this balanced?”.",
      "You need to **undo** or go **back** to the most recent state.",
      "You must **evaluate an expression** (postfix / reverse Polish notation) or convert between notations.",
      "For each element you need the **next or previous greater / smaller** element (Next Greater Element, Daily Temperatures, Stock Span).",
      "Largest rectangle in a histogram, trapping rain water (the monotonic-stack versions)."
    ],
    notFor: [
      "You need to reach the **middle or bottom** often. Use an array or a deque.",
      "Items must come out in the order they went in (first in, first out). That is a **queue**."
    ],
    more: [
      {
        type: "table",
        heading: "Where stacks hide in everyday software",
        columns: ["Where", "What the stack holds"],
        rows: [
          ["Recursion / function calls", "The chain of unfinished function calls (the *call stack*)"],
          ["Browser “Back” button", "Pages visited so far; Back pops the latest"],
          ["Undo / Redo", "Actions you can still reverse"],
          ["DFS (graphs and trees)", "Places still to come back to"],
          ["Compilers / calculators", "Operators and operands while evaluating an expression"]
        ]
      },
      {
        type: "callout",
        kind: "tip",
        text: "**Array or linked list?** In JavaScript use an array: `push`/`pop` on its end are O(1) and simple. A linked list (push and pop at the head) is also O(1) and never needs resizing, but you rarely need the extra work."
      },
      {
        type: "text",
        text: "**Infix vs postfix.** Infix is how we write maths: `(2 + 3) * 4`, which needs brackets and precedence rules. Postfix puts the operator *after* its numbers: `2 3 + 4 *`, which needs neither, so a computer can evaluate it with a simple stack. To convert infix to postfix, hold operators on a stack and pop those with higher or equal precedence before pushing the new one."
      }
    ]
  },

  analogy: {
    title: "A stack of plates, and a waiting room",
    story: [
      "In a canteen, clean plates are stacked. You add a plate on top, and the next person takes the top plate. The plate you put on last is the first one taken. That is the whole data structure.",
      "**Brackets are boxes inside boxes.** Every `(` opens a box; the next closing bracket must close the **innermost** box that is still open, which is the one opened most recently. So you keep the open boxes in a stack: opening pushes, closing pops, and the popped one must be the right kind.",
      "**Next greater element is a waiting room.** People stand in a line of different heights. Each person wants to know who is the first *taller* person to their right. Everyone still waiting sits in a waiting room, in order of arrival. When a new person walks in, every **shorter** person at the front of the waiting room has finally met someone taller: they get their answer and leave. Then the newcomer sits down to wait for their own taller person."
    ],
    map: [
      ["Put a plate on top", "`push`"],
      ["Take the top plate", "`pop`"],
      ["Glance at the top plate", "`peek`"],
      ["Opening a box", "Push the opening bracket"],
      ["Closing the innermost open box", "Top of the stack must be the matching opener"],
      ["The waiting room", "Monotonic stack of indices that have no answer yet"],
      ["A taller newcomer releases shorter people", "`while (arr[top] < arr[i]) pop`"]
    ],
    breaks: "Real plates can't be inspected cheaply, but a code stack can be peeked. In the monotonic version we keep **indices** (positions) rather than values, so we also know *who* is being answered."
  },

  demos: [
    {
      id: "parens",
      title: "Matching brackets (balanced parentheses)",
      intro: "Opening brackets go on the stack. A closing bracket must match the one on top. Try `([)]` to see a mismatch, or `(((` to see leftovers.",
      codeIntro: "Returns `true` only if every bracket is closed by the correct kind, in the correct order.",
      viz: "array",
      legend: [["cur", "bracket being read"], ["mark", "open and waiting on the stack"], ["good", "matched pair"], ["done", "already matched"], ["bad", "problem"]],
      inputs: [{ type: "text", name: "brackets", label: "Brackets", value: "{[()()]}", len: [1, 12], alphabet: "()[]{}" }],
      random(rnd) {
        const kinds = [["(", ")"], ["[", "]"], ["{", "}"]];
        const total = rnd.int(2, 5);
        let s = "";
        const st = [];
        let opened = 0;
        while (opened < total || st.length) {
          if (opened < total && (st.length === 0 || rnd() < 0.55)) {
            const k = kinds[rnd.int(0, 2)];
            s += k[0];
            st.push(k[1]);
            opened++;
          } else {
            s += st.pop();
          }
        }
        if (rnd() < 0.45) {
          const i = rnd.int(0, s.length - 1);
          s = s.slice(0, i) + "()[]{}"[rnd.int(0, 5)] + s.slice(i + 1);
        }
        return { brackets: s };
      },
      frames(inp, snap) {
        const chars = [...inp.brackets];
        const pairs = { ")": "(", "]": "[", "}": "{" };
        const stack = []; // { ch, idx }
        const finished = new Set();
        const box = (newTop) => ({
          label: "stack",
          hint: "top is on top",
          kind: "stack",
          items: stack.map((e, k) => ({ v: e.ch, new: newTop && k === stack.length - 1 }))
        });
        const base = () => {
          const t = {};
          finished.forEach((i) => (t[i] = "done"));
          stack.forEach((e) => (t[e.idx] = "mark"));
          return t;
        };
        const view = (extra) => Object.assign({ label: "brackets", cells: chars, boxes: [box()], tone: base() }, extra);

        snap(view({
          at: ["init"],
          say: "We read the brackets one at a time. The stack starts empty. It will hold every bracket that has been opened but not yet closed."
        }));
        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i];
          if (!pairs[ch]) {
            stack.push({ ch, idx: i });
            snap(view({
              at: ["loop", "open", "push"],
              ptr: { i },
              tone: { ...base(), [i]: "cur" },
              boxes: [box(true)],
              say: "**" + ch + "** opens a bracket. Push it on the stack, because it still needs a partner later."
            }));
            continue;
          }
          if (stack.length === 0) {
            snap(view({
              at: ["loop", "close", "check"],
              ptr: { i },
              tone: { ...base(), [i]: "bad" },
              out: "Not valid: \"" + ch + "\" closes something that was never opened",
              outTone: "bad",
              say: "**" + ch + "** is a closing bracket, but the stack is **empty**: nothing is open for it to close. **Invalid.**",
              result: false
            }));
            return;
          }
          const top = stack[stack.length - 1];
          if (top.ch === pairs[ch]) {
            stack.pop();
            finished.add(top.idx);
            finished.add(i);
            snap(view({
              at: ["loop", "close", "check"],
              ptr: { i },
              tone: { ...base(), [i]: "good", [top.idx]: "good" },
              say: "**" + ch + "** closes the most recent open bracket. The top of the stack is **" + top.ch + "**, which is the right partner, so pop it. This pair is matched."
            }));
          } else {
            snap(view({
              at: ["loop", "close", "check"],
              ptr: { i },
              tone: { ...base(), [i]: "bad", [top.idx]: "bad" },
              out: "Not valid: \"" + ch + "\" cannot close \"" + top.ch + "\"",
              outTone: "bad",
              say: "**" + ch + "** must close the most recent open bracket, but the top of the stack is **" + top.ch + "**, which is the wrong kind. **Invalid.**",
              result: false
            }));
            return;
          }
        }
        if (stack.length === 0) {
          snap(view({
            at: ["end"],
            out: "Valid: every bracket was matched",
            say: "We read everything and the stack is **empty**: every opener found its closer. **Valid.**",
            result: true
          }));
        } else {
          snap(view({
            at: ["end"],
            out: "Not valid: " + stack.length + " bracket" + (stack.length > 1 ? "s were" : " was") + " never closed",
            outTone: "bad",
            say: "We read everything but **" + stack.length + "** bracket" + (stack.length > 1 ? "s are" : " is") + " still on the stack: opened and never closed. **Invalid.**",
            result: false
          }));
        }
      },
      code: {
        fn: "isValid",
        lines: [
          `function isValid(s) {`,
          [`  const stack = [];`, "Holds the brackets that are open and waiting for a closer.", "init"],
          [`  const pairs = { ")": "(", "]": "[", "}": "{" };`, "For each closing bracket, which opener it needs.", "init"],
          [`  for (const ch of s) {`, "Read the brackets one by one.", "loop"],
          [`    if (ch === "(" || ch === "[" || ch === "{") {`, "An opener.", "open"],
          [`      stack.push(ch);`, "Remember it: it needs a closer later.", "push"],
          [`    } else {`, "A closer.", "close"],
          [`      if (stack.length === 0 || stack.pop() !== pairs[ch]) return false;`, "Nothing open, or the most recent opener is the wrong kind: invalid. Checking `length` first avoids popping an empty stack. Note `pop()` also removes the opener when it matches.", "check"],
          `    }`,
          `  }`,
          [`  return stack.length === 0;`, "Valid only if nothing is left open.", "end"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.brackets)
    },

    {
      id: "postfix",
      title: "Evaluate a postfix expression",
      intro: "Postfix writes the operator **after** its numbers, so no brackets are needed. Numbers wait on the stack. An operator takes the two newest numbers. Default: `2 3 4 * +` means 2 + (3 × 4).",
      codeIntro: "Takes the expression as an array of tokens, for example `[\"2\", \"3\", \"4\", \"*\", \"+\"]`, and returns the number it evaluates to.",
      viz: "array",
      legend: [["cur", "token being read"], ["good", "operator just applied"]],
      inputs: [{ type: "text", name: "expr", label: "Postfix expression (numbers and + - *, separated by spaces)", value: "2 3 4 * +", len: [3, 30], alphabet: "0123456789+-* " }],
      validate(inp) {
        const toks = inp.expr.split(/\s+/).filter(Boolean);
        let depth = 0;
        for (const t of toks) {
          if (/^\d{1,2}$/.test(t)) depth++;
          else if (/^[+\-*]$/.test(t)) {
            if (depth < 2) return "Not a valid postfix expression: an operator needs two numbers before it.";
            depth--;
          } else return "Use numbers (0 to 99) and + - * separated by spaces.";
        }
        return depth === 1 ? null : "Not a valid postfix expression: exactly one value should be left at the end.";
      },
      random(rnd) {
        const nums = rnd.int(3, 5);
        const toks = [];
        let depth = 0;
        let placed = 0;
        while (placed < nums || depth > 1) {
          if (placed < nums && (depth < 2 || rnd() < 0.55)) {
            toks.push(String(rnd.int(1, 9)));
            placed++;
            depth++;
          } else {
            toks.push(["+", "-", "*"][rnd.int(0, 2)]);
            depth--;
          }
        }
        return { expr: toks.join(" ") };
      },
      frames(inp, snap) {
        const toks = inp.expr.split(/\s+/).filter(Boolean);
        const stack = [];
        const box = (newTop) => ({
          label: "stack",
          hint: "top is on top",
          kind: "stack",
          items: stack.map((v, k) => ({ v, new: newTop && k === stack.length - 1 }))
        });
        const view = (extra) => Object.assign({ label: "tokens", cells: toks, boxes: [box()] }, extra);

        snap(view({
          at: ["init"],
          say: "Read the expression from left to right. **Numbers** wait on the stack. An **operator** uses the two newest numbers."
        }));
        for (let i = 0; i < toks.length; i++) {
          const t = toks[i];
          if (/^\d+$/.test(t)) {
            stack.push(Number(t));
            snap(view({
              at: ["loop", "num", "push"],
              ptr: { i },
              tone: { [i]: "cur" },
              boxes: [box(true)],
              say: "**" + t + "** is a number: push it on the stack and wait for an operator."
            }));
          } else {
            const b = stack.pop();
            const a = stack.pop();
            snap(view({
              at: ["loop", "op", "popb", "popa"],
              ptr: { i },
              tone: { [i]: "cur" },
              vars: { a, b },
              say: "The operator `" + t + "` needs two numbers, so take the two newest off the stack. The first one off is the **right** operand b = " + b + ", then the left operand a = " + a + "."
            }));
            const r = t === "+" ? a + b : t === "-" ? a - b : a * b;
            stack.push(r);
            snap(view({
              at: ["apply"],
              ptr: { i },
              tone: { [i]: "good" },
              vars: { a, b, result: r },
              boxes: [box(true)],
              say: "Work out " + a + " `" + t + "` " + b + " = **" + r + "** and push the result back, so the next operator can use it."
            }));
          }
        }
        const res = stack[0];
        snap(view({
          at: ["done"],
          out: "Result: " + res,
          say: "All tokens are used. The single number left on the stack is the answer: **" + res + "**.",
          result: res
        }));
      },
      code: {
        fn: "evalPostfix",
        lines: [
          `function evalPostfix(tokens) {`,
          [`  const stack = [];`, "Numbers wait here until an operator needs them.", "init"],
          [`  for (const t of tokens) {`, "Read the tokens left to right.", "loop"],
          [`    if (t !== "+" && t !== "-" && t !== "*") {`, "Not an operator, so it is a number.", "num"],
          [`      stack.push(Number(t));`, "Convert the text to a number and push it.", "push"],
          [`    } else {`, "An operator.", "op"],
          [`      const b = stack.pop();`, "The newest number is the **right** operand. It comes off first.", "popb"],
          [`      const a = stack.pop();`, "The next one is the left operand.", "popa"],
          [`      if (t === "+") stack.push(a + b);`, "Apply the operator and push the result back.", "apply"],
          [`      else if (t === "-") stack.push(a - b);`, "Order matters for minus: it is a - b, not b - a.", "apply"],
          [`      else stack.push(a * b);`, "", "apply"],
          `    }`,
          `  }`,
          [`  return stack.pop();`, "One number remains: the value of the whole expression.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.expr.split(/\s+/).filter(Boolean))
    },

    {
      id: "monotonic",
      title: "Monotonic stack: Next Greater Element",
      intro: "For every number, find the first **bigger** number to its right (or -1). The stack is the “waiting room” of positions that have not found their bigger number yet. Their values always decrease from bottom to top.",
      codeIntro: "Returns an array where `result[i]` is the next greater value after position `i`, or `-1` if there is none.",
      viz: "array",
      legend: [["cur", "current number"], ["mark", "waiting on the stack"], ["good", "just got its answer"], ["bad", "never found one (-1)"]],
      inputs: [{ type: "numlist", name: "nums", label: "Numbers", value: [4, 2, 5, 1, 3, 7], len: [3, 10], min: 1, max: 20 }],
      frames(inp, snap) {
        const a = inp.nums;
        const n = a.length;
        const res = new Array(n).fill(null);
        const stack = [];
        const shown = (done) => res.map((v) => (v === null ? (done ? -1 : "?") : v));
        const waiting = () => Object.fromEntries(stack.map((j) => [j, "mark"]));
        const box = (newTop) => ({
          label: "stack of waiting positions",
          hint: "bottom → top, values go down",
          kind: "stack",
          items: stack.map((j, k) => ({ v: a[j] + " (i=" + j + ")", new: newTop && k === stack.length - 1 }))
        });
        const rowLabel = "result: next greater (? = not known yet)";
        const view = (extra) => Object.assign({ label: "arr", cells: a, rows: [{ label: rowLabel, cells: shown(false) }], boxes: [box()] }, extra);

        snap(view({
          at: ["init"],
          say: "The result starts unknown (every slot will default to -1) and the stack is empty. We go left to right. Each number first **releases** the waiting numbers it is bigger than, and then waits itself."
        }));
        for (let i = 0; i < n; i++) {
          while (stack.length && a[stack[stack.length - 1]] < a[i]) {
            const j = stack.pop();
            res[j] = a[i];
            snap(view({
              at: ["loop", "while", "pop", "assign"],
              ptr: { i },
              tone: { ...waiting(), [i]: "cur", [j]: "good" },
              rows: [{ label: rowLabel, cells: shown(false), tone: { [j]: "good" } }],
              say: "**" + a[i] + "** is bigger than **" + a[j] + "** (position " + j + "), which was waiting on top. So " + a[i] + " is the **next greater element of position " + j + "**: pop it and write " + a[i] + " in its result slot."
            }));
          }
          const top = stack.length ? stack[stack.length - 1] : null;
          stack.push(i);
          snap(view({
            at: ["push"],
            ptr: { i },
            tone: { ...waiting(), [i]: "cur" },
            boxes: [box(true)],
            say: top === null
              ? "Nobody is waiting, so just push position " + i + " (value " + a[i] + "): it now waits for something bigger."
              : "The number on top (" + a[top] + ") is **not smaller** than " + a[i] + ", so " + a[i] + " cannot be its answer. Stop releasing and push position " + i + ": it now waits for its own bigger number."
          }));
        }
        const left = stack.slice();
        snap(view({
          at: ["end"],
          tone: Object.fromEntries(left.map((j) => [j, "bad"])),
          rows: [{ label: rowLabel, cells: shown(true), tone: Object.fromEntries(left.map((j) => [j, "bad"])) }],
          out: "Result: [" + shown(true).join(", ") + "]",
          say: "The numbers are used up. Anyone **still waiting** never met a bigger number to their right, so their answer stays **-1**. Final result: [" + shown(true).join(", ") + "].",
          result: shown(true)
        }));
      },
      code: {
        fn: "nextGreater",
        lines: [
          `function nextGreater(arr) {`,
          [`  const result = new Array(arr.length).fill(-1);`, "Default answer is -1: “no greater element”.", "init"],
          [`  const stack = [];`, "Positions (indexes) still waiting for a bigger number.", "init"],
          [`  for (let i = 0; i < arr.length; i++) {`, "Visit each number once, left to right.", "loop"],
          [`    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {`, "While someone is waiting and the newcomer is bigger than the top one…", "while"],
          [`      const j = stack.pop();`, "…release the top one: it has found its answer.", "pop"],
          [`      result[j] = arr[i];`, "The newcomer is its next greater element.", "assign"],
          `    }`,
          [`    stack.push(i);`, "Now the newcomer waits. We push the **index**, not the value, so we know whose slot to fill later.", "push"],
          `  }`,
          [`  return result;`, "Anyone still on the stack keeps -1.", "end"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums)
    }
  ],

  mistakes: [
    {
      oops: "Popping or peeking at an **empty** stack",
      why: "In JavaScript `[].pop()` quietly returns `undefined` instead of an error. Comparisons with `undefined` then misbehave and the bug is silent.",
      fix: "Check `stack.length` first, like `stack.length === 0 || ...` in the bracket check."
    },
    {
      oops: "Returning `true` without checking the stack is empty at the end",
      why: "`\"(((\"` never fails inside the loop, yet three brackets were never closed.",
      fix: "Finish with `return stack.length === 0;`."
    },
    {
      oops: "Mixing up the operand order in postfix evaluation",
      why: "The first value popped is the **right** operand. For `-` and `/` the order changes the answer: `5 3 -` is 5 − 3, not 3 − 5.",
      fix: "Pop `b` first, then `a`, and compute `a op b`."
    },
    {
      oops: "Putting **values** instead of **indexes** on a monotonic stack",
      why: "You can no longer say *which* slot to fill, and problems that need a distance (Daily Temperatures: `i - j`) become impossible.",
      fix: "Push the index, and read the value with `arr[index]`."
    },
    {
      oops: "Using the wrong comparison (`<` vs `<=`)",
      why: "For the next **strictly** greater element you pop while the top is *smaller* (`<`). Using `<=` changes how equal values are treated.",
      fix: "Decide the exact meaning first, then pick `<` or `<=` and keep it consistent."
    }
  ],

  remember: {
    mnemonic: "Stack = plates: the last one on is the first one off. Monotonic stack: pop everyone the newcomer beats, then push the newcomer.",
    rules: [
      "Brackets, nesting, undo, “most recent first” → **stack**.",
      "Always check `stack.length` before `pop()` or looking at the top.",
      "Monotonic stack: push **indexes**; pop while the top is *smaller* (for next greater); the popped item gets the answer.",
      "Each item is pushed once and popped once, so the whole pass is O(n).",
      "Next *smaller* element? Flip the comparison. *Previous* greater? Read the top **before** you push."
    ],
    template: {
      lines: [
        `const stack = [];`,
        [`for (let i = 0; i < arr.length; i++) {`, "Visit every position once."],
        [`  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {`, "Newcomer beats the top: release it."],
        [`    const j = stack.pop();`, "j is the position that just got its answer."],
        [`    // arr[i] is the next greater element of position j`, "Record it, or compute i - j for distances."],
        `  }`,
        [`  stack.push(i);`, "Newcomer waits for its own answer."],
        `}`
      ]
    },
    more: [
      {
        type: "text",
        text: "**Same skeleton, different questions:** Daily Temperatures (answer = `i - j`), Stock Span, Largest Rectangle in Histogram, Trapping Rain Water."
      },
      {
        type: "callout",
        kind: "tip",
        text: "**Min Stack** (get the minimum in O(1)): keep a second stack. On every `push(x)` also push `min(x, current minimum)` onto it, and pop both stacks together. Its top is always the minimum so far. Your own files: `Problems/Stack/isBalancedParentheses.js`, `stack.js`, `sortStack.js`."
      }
    ]
  },

  practice: {
    title: "Daily Temperatures",
    level: "Medium",
    problem: "Given an array `temps` of daily temperatures, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a **warmer** temperature. If there is no warmer day, `answer[i]` is `0`.",
    examples: [
      { input: "[73, 74, 75, 71, 69, 72, 76, 73]", output: "[1, 1, 4, 2, 1, 1, 0, 0]", why: "After day 2 (75), the next warmer day is day 6 (76), which is 4 days later." },
      { input: "[30, 60, 90]", output: "[1, 1, 0]" }
    ],
    hints: [
      "For each day you want the **next greater** temperature, plus how far away it is. Which pattern from this page is that?",
      "Keep a monotonic stack of day **indexes** whose temperatures are still waiting for a warmer day.",
      "When `temps[i]` is warmer than `temps[top]`, pop `j` and set `answer[j] = i - j`."
    ],
    solution: {
      explain: [
        "It is exactly the Next Greater Element skeleton. The only change: instead of writing the *value* of the bigger number, we write the *distance* `i - j`, which is why the stack must hold indexes.",
        "Time O(n), because each day is pushed and popped at most once. Space O(n) for the stack and the answer."
      ],
      code: {
        fn: "dailyTemperatures",
        lines: [
          `function dailyTemperatures(temps) {`,
          [`  const answer = new Array(temps.length).fill(0);`, "0 means “no warmer day”."],
          [`  const stack = [];`, "Days still waiting for a warmer day (indexes)."],
          [`  for (let i = 0; i < temps.length; i++) {`, "Visit each day once."],
          [`    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {`, "Today is warmer than the day on top of the stack."],
          [`      const j = stack.pop();`, "That earlier day j has found its warmer day."],
          [`      answer[j] = i - j;`, "The wait is the number of days between j and today."],
          `    }`,
          [`    stack.push(i);`, "Today now waits for a warmer day."],
          `  }`,
          [`  return answer;`, "Days left on the stack keep 0."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[73, 74, 75, 71, 69, 72, 76, 73]], expect: [1, 1, 4, 2, 1, 1, 0, 0] },
      { args: [[30, 40, 50, 60]], expect: [1, 1, 1, 0] },
      { args: [[30, 60, 90]], expect: [1, 1, 0] },
      { args: [[90, 80, 70]], expect: [0, 0, 0] },
      { args: [[50]], expect: [0] },
      { args: [[]], expect: [] },
      { args: [[55, 55, 55]], expect: [0, 0, 0] }
    ]
  },

  recall: [
    { q: "What does LIFO mean, and which operations does a stack offer?", a: "Last In, First Out. `push`, `pop`, `peek` (and `isEmpty`), all O(1) because only the top is touched." },
    { q: "Why is “balanced brackets” a stack problem?", a: "A closing bracket must match the **most recent** unclosed opener, and the most recent thing is on top of the stack." },
    { q: "In postfix evaluation, which operand is popped first?", a: "The right operand `b`. Pop `b`, then pop `a`, then compute `a op b`." },
    { q: "Why is a monotonic stack O(n) even though it has a `while` inside a `for`?", a: "Every index is pushed once and popped at most once, so the total number of pops is at most n." },
    { q: "What goes on a monotonic stack, and why?", a: "Indexes. You can read the value with `arr[index]`, and you can also fill that position's answer or compute a distance." }
  ],

  related: {
    topics: ["queue-deque", "linked-list", "recursion", "tree-dfs-traversals"],
    files: ["Problems/Stack/stackIntro.js", "Problems/Stack/stack.js", "Problems/Stack/isBalancedParentheses.js", "Problems/Stack/sortStack.js", "Problems/Stack/reverseStringStack.js"]
  }
});
