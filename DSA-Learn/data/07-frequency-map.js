// Frequency Map — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "frequency-map",
  group: "hashing",
  emoji: "🔢",
  title: "Frequency Map",
  tagline: "A hash map that counts: each key stores how many times we have seen it.",
  level: "Starter",
  needs: ["hashmap"],

  gist: [
    "`freq.set(x, (freq.get(x) || 0) + 1)` counts anything in **one pass**, O(n).",
    "Once counted, “how many times does x appear?” is an **O(1)** lookup.",
    "It solves duplicates, anagrams, majority element, most / least frequent and many window problems.",
    "To compare two collections, compare their frequency maps."
  ],

  complexity: {
    time: "O(n) to build, O(1) per query",
    space: "O(k)",
    why: [
      "Building is one pass over the n items, and each update (`get` then `set`) is O(1) on average, so O(n) in total. After that, any count is a single lookup.",
      "The map stores one entry per **distinct** value, so extra memory is O(k) where k is the number of different values (at most n). For lowercase letters k is at most 26, which is O(1)."
    ]
  },

  idea: {
    plain: [
      "A frequency map is simply a HashMap whose **values are counts**: key = the thing we are counting, value = how many times we have seen it.",
      "To build one, visit each element and ask the map “how many do I have so far?”. If the element is new there is no answer, so use 0. Add one and store it back: `freq.set(x, (freq.get(x) || 0) + 1)`.",
      "After that you can answer many questions without scanning again: which value is the most common, does anything appear twice, do these two strings contain exactly the same letters."
    ],
    signals: [
      "The problem talks about **counts**, “appears more than n/2 times”, “most / least frequent”.",
      "**Duplicates**: which elements repeat, or how many times.",
      "**Anagrams** and “same characters” questions.",
      "A **substring or window** problem where you must track how many of each character are inside (Sliding Window + frequency map)."
    ],
    notFor: [
      "You only need to know whether something was seen at all. A Set is lighter.",
      "Keys are tiny known ranges such as lowercase letters. A plain array of 26 counters (`new Array(26).fill(0)`) is faster and simpler."
    ],
    more: [
      {
        type: "table",
        heading: "Map or counter array?",
        columns: ["Keys", "Use", "Why"],
        rows: [
          ["Anything (numbers, words, objects as ids)", "`Map`", "Handles any key"],
          ["Lowercase letters a to z", "`Array(26)` with `code - 97`", "Fixed size, no hashing"],
          ["Small integers 0 to 100", "`Array(101)`", "Index is the key"]
        ]
      }
    ]
  },

  analogy: {
    title: "Tally marks on an election night",
    story: [
      "Votes arrive one at a time. For each vote the clerk finds the candidate's name on the board and adds one tally mark next to it. A candidate with no marks yet simply starts at zero. When the votes run out, every candidate's total is already on the board, so “who won?” and “how many did Rita get?” need no recount.",
      "The clerk only keeps names that actually received votes, so the board's size depends on how many *different* candidates there are, not on how many votes were cast."
    ],
    map: [
      ["Candidate's name on the board", "The key"],
      ["Tally marks next to the name", "The count (the value)"],
      ["A new candidate starts at zero", "`freq.get(x) || 0`"],
      ["Adding a mark per vote", "`+ 1` and `set`"],
      ["Reading the winner off the board", "Looking for the largest count"]
    ],
    breaks: "The board shows totals but forgets the order of the votes. A frequency map also forgets positions: if you need *where* something occurred, store indexes instead."
  },

  demos: [
    {
      id: "count",
      title: "Build a frequency map",
      intro: "Each letter either starts a new entry at 1 or increases an existing count. Try your own word.",
      codeIntro: "Returns the list of `[letter, count]` pairs in the order each letter first appeared.",
      viz: "array",
      legend: [["cur", "letter being counted"]],
      inputs: [{ type: "text", name: "str", label: "Word (a to z)", value: "banana", len: [3, 10], alphabet: "abcdefghijklmnopqrstuvwxyz" }],
      frames(inp, snap) {
        const chars = [...inp.str];
        const freq = new Map();
        const box = (hot) => ({ label: "freq", hint: "letter → count", kind: "map", items: [...freq].map(([k, v]) => ({ k, v, new: k === hot })) });
        const view = (extra) => Object.assign({ label: "letters", cells: chars, boxes: [box()] }, extra);

        snap(view({ at: ["init"], say: "The frequency map starts empty. We will visit each letter once and tick up its count." }));
        chars.forEach((ch, i) => {
          const before = freq.get(ch) || 0;
          freq.set(ch, before + 1);
          snap(view({
            at: ["loop", "count"],
            ptr: { i },
            tone: { [i]: "cur" },
            boxes: [box(ch)],
            vars: { letter: ch, "count before": before },
            say: before === 0
              ? "**" + ch + "** is new: it is not in the map yet, so `|| 0` gives it a starting count of 0, and we store **" + ch + " → 1**."
              : "**" + ch + "** has been seen **" + before + "** time" + (before === 1 ? "" : "s") + " already, so we store **" + ch + " → " + (before + 1) + "**."
          }));
        });
        const pairs = [...freq];
        snap(view({
          at: ["done"],
          out: pairs.map(([k, v]) => k + ":" + v).join("  "),
          say: "Done in one pass. Counts: **" + pairs.map(([k, v]) => k + " → " + v).join(", ") + "**. Any count is now an O(1) lookup.",
          result: pairs
        }));
      },
      code: {
        fn: "countFrequency",
        lines: [
          `function countFrequency(str) {`,
          [`  const freq = new Map();`, "letter → how many times seen.", "init"],
          [`  for (const ch of str) {`, "Visit each letter once.", "loop"],
          [`    freq.set(ch, (freq.get(ch) || 0) + 1);`, "`freq.get(ch)` is undefined for a new letter, so `|| 0` makes it 0. Add one and store it back.", "count"],
          `  }`,
          [`  return [...freq];`, "The map as a list of [letter, count] pairs.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.str)
    },

    {
      id: "anagram",
      title: "Valid anagram: count up for one word, count down for the other",
      intro: "Two words are anagrams if they have exactly the same letters. Add 1 for every letter of **s**, then subtract 1 for every letter of **t**. If a count can't go down, they differ.",
      codeIntro: "Returns `true` when `t` is a rearrangement of `s`.",
      viz: "array",
      legend: [["cur", "letter being processed"], ["done", "already counted"], ["bad", "problem"]],
      inputs: [
        { type: "text", name: "s", label: "Word s", value: "listen", len: [1, 8], alphabet: "abcdefghijklmnopqrstuvwxyz" },
        { type: "text", name: "t", label: "Word t", value: "silent", len: [1, 8], alphabet: "abcdefghijklmnopqrstuvwxyz" }
      ],
      random(rnd) {
        const words = ["listen", "night", "stone", "apple", "paler", "angel", "cheese", "dusty"];
        const s = words[rnd.int(0, words.length - 1)];
        const chars = [...s];
        for (let i = chars.length - 1; i > 0; i--) {
          const j = rnd.int(0, i);
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        let t = chars.join("");
        const r = rnd();
        if (r < 0.3) t = t.slice(0, -1) + "z";
        else if (r < 0.4) t = t + "a";
        return { s, t };
      },
      frames(inp, snap) {
        const s = [...inp.s];
        const t = [...inp.t];
        const cells = s.concat(t);
        const ns = s.length;
        const freq = new Map();
        const sTone = (upTo) => DSA.util.span(0, upTo, "done");
        const box = (hot) => ({ label: "letter counts", hint: "+1 for s, -1 for t", kind: "map", items: [...freq].map(([k, v]) => ({ k, v, new: k === hot })) });
        const view = (extra) => Object.assign({ label: "s, then t", cells, boxes: [box()] }, extra);

        if (s.length !== t.length) {
          snap(view({
            at: ["len"],
            tone: { ...DSA.util.span(0, ns - 1, "bad"), ...DSA.util.span(ns, cells.length - 1, "bad") },
            out: "Not anagrams: different lengths",
            outTone: "bad",
            say: "**s** has " + s.length + " letters but **t** has " + t.length + ". Words of different length can never be anagrams, so we stop right away.",
            result: false
          }));
          return;
        }
        snap(view({ at: ["len", "init"], say: "Both words have " + s.length + " letters, so they could be anagrams. We make an empty count map." }));
        s.forEach((ch, i) => {
          freq.set(ch, (freq.get(ch) || 0) + 1);
          snap(view({
            at: ["countS"],
            ptr: { i },
            tone: { ...sTone(i - 1), [i]: "cur" },
            boxes: [box(ch)],
            say: "Letter **" + ch + "** of s: add 1, so " + ch + " → " + freq.get(ch) + "."
          }));
        });
        for (let j = 0; j < t.length; j++) {
          const ch = t[j];
          const idx = ns + j;
          if (!freq.get(ch)) {
            snap(view({
              at: ["loopT", "check"],
              ptr: { i: idx },
              tone: { ...sTone(idx - 1), [idx]: "bad" },
              out: "Not anagrams: t has an extra \"" + ch + "\"",
              outTone: "bad",
              say: "Letter **" + ch + "** of t: its count is " + (freq.get(ch) || 0) + ", so s has no \"" + ch + "\" left to match it. **Not an anagram.**",
              result: false
            }));
            return;
          }
          freq.set(ch, freq.get(ch) - 1);
          snap(view({
            at: ["loopT", "check", "dec"],
            ptr: { i: idx },
            tone: { ...sTone(idx - 1), [idx]: "cur" },
            boxes: [box(ch)],
            say: "Letter **" + ch + "** of t: s still has one to match, so subtract 1: " + ch + " → " + freq.get(ch) + "."
          }));
        }
        snap(view({
          at: ["done"],
          tone: sTone(cells.length - 1),
          out: "Anagram: every letter of t was matched",
          say: "Every letter of t found a partner in s and, since the lengths are equal, every count is back to 0. **They are anagrams.**",
          result: true
        }));
      },
      code: {
        fn: "isAnagram",
        lines: [
          `function isAnagram(s, t) {`,
          [`  if (s.length !== t.length) return false;`, "Different lengths can never be anagrams.", "len"],
          [`  const freq = new Map();`, "Letter counts.", "init"],
          [`  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);`, "Add 1 for every letter of s.", "countS"],
          [`  for (const ch of t) {`, "Now walk through t.", "loopT"],
          [`    if (!freq.get(ch)) return false;`, "No count left for this letter (0 or missing): t has a letter that s cannot supply.", "check"],
          [`    freq.set(ch, freq.get(ch) - 1);`, "Use one up.", "dec"],
          `  }`,
          [`  return true;`, "Every letter matched, and equal lengths mean nothing is left over.", "done"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.s, inp.t)
    }
  ],

  mistakes: [
    {
      oops: "Writing `freq[x]++` without giving it a starting value",
      why: "`undefined + 1` is `NaN`, so the first count of every key becomes `NaN` and stays that way.",
      fix: "Use `(freq.get(x) || 0) + 1`, or `freq[x] = (freq[x] || 0) + 1`."
    },
    {
      oops: "Forgetting that a missing key and a zero count are different things in `if (!freq.get(ch))`",
      why: "Here both mean “none left”, which is what we want for anagrams. But for other problems a stored 0 and a missing key can mean different things.",
      fix: "Use `freq.has(ch)` when the difference matters."
    },
    {
      oops: "Comparing two maps with `===` or `==`",
      why: "Maps are compared by reference, so two maps with identical contents are still “not equal”.",
      fix: "Compare sizes, then every key's count; or turn both into sorted strings."
    },
    {
      oops: "Using a plain object for counts with arbitrary keys",
      why: "Keys become strings and names like `constructor` can clash with built-in properties.",
      fix: "Use a `Map`, or an array when the keys are small integers or letters."
    },
    {
      oops: "Ignoring the length check in anagram problems",
      why: "`\"ab\"` vs `\"abb\"` can slip through some count-only checks.",
      fix: "Compare lengths first. It is a free O(1) rejection."
    }
  ],

  remember: {
    mnemonic: "Count with `(get || 0) + 1`; query with `get`.",
    rules: [
      "Counting pattern: **get (default 0) → add 1 → set**.",
      "Same letters? Count up for one, count down for the other, or compare two maps.",
      "Majority element (> n/2): count while scanning and return as soon as a count passes n/2.",
      "Only 26 lowercase letters? An array of 26 counters beats a Map."
    ],
    template: {
      lines: [
        [`const freq = new Map();`, "key → count."],
        [`for (const x of items) {`, "One pass."],
        [`  freq.set(x, (freq.get(x) || 0) + 1);`, "The counting idiom."],
        `}`,
        [`// now freq.get(x) answers "how many x?" in O(1)`, "Scan the map afterwards for most / least frequent."]
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "Bonus: **Boyer–Moore voting** finds a majority element in O(1) space. Keep a `candidate` and a `votes` counter: a matching number adds a vote, a different one removes a vote, and at 0 votes the next number becomes the candidate. Your own files: `Problems/Hash/groupAnagrams.js`, `Problems/Array/majorityElement.js`."
      }
    ]
  },

  practice: {
    title: "Majority Element",
    level: "Easy",
    problem: "Given an array `nums`, return the element that appears **more than n / 2 times** (where n is the length). Return `-1` if there is no such element.",
    examples: [
      { input: "[3, 2, 3]", output: "3", why: "3 appears 2 times, and 2 > 3 / 2." },
      { input: "[2, 2, 1, 1, 1, 2, 2]", output: "2", why: "2 appears 4 times out of 7." },
      { input: "[1, 2]", output: "-1", why: "Nothing appears more than once." }
    ],
    hints: [
      "You need to know how many times each value appears. Which structure keeps counts?",
      "Count while you scan. After updating the count for `x`, check whether it already exceeds `nums.length / 2`.",
      "If the count passes n / 2, you can return that value immediately."
    ],
    solution: {
      explain: [
        "A frequency map counts each value in one pass. The moment a count passes half the array length, that value is the majority and we can stop.",
        "Time O(n), space O(k) for k distinct values."
      ],
      code: {
        fn: "majorityElement",
        lines: [
          `function majorityElement(nums) {`,
          [`  const freq = new Map();`, "value → count so far."],
          [`  for (const x of nums) {`, "One pass."],
          [`    const c = (freq.get(x) || 0) + 1;`, "The new count for this value."],
          [`    freq.set(x, c);`, "Store it."],
          [`    if (c > nums.length / 2) return x;`, "More than half of all elements: this is the majority."],
          `  }`,
          [`  return -1;`, "No value passed half."],
          `}`
        ]
      }
    },
    tests: [
      { args: [[3, 2, 3]], expect: 3 },
      { args: [[2, 2, 1, 1, 1, 2, 2]], expect: 2 },
      { args: [[1]], expect: 1 },
      { args: [[5, 5, 5, 1, 2]], expect: 5 },
      { args: [[6, 5, 5]], expect: 5 },
      { args: [[1, 1, 2, 2, 2]], expect: 2 },
      { args: [[1, 2]], expect: -1 },
      { args: [[]], expect: -1 }
    ]
  },

  recall: [
    { q: "What is the idiom for counting with a Map?", a: "`freq.set(x, (freq.get(x) || 0) + 1)`: read the current count (0 if new), add one, store it." },
    { q: "How do you check two strings are anagrams with one map?", a: "Check equal lengths, add 1 for each letter of s, subtract 1 for each letter of t, and fail if a count is 0 when you try to subtract." },
    { q: "What do building and querying a frequency map cost?", a: "O(n) to build and O(1) per query, with O(k) memory for k distinct keys." },
    { q: "When would you use an array of 26 counters instead of a Map?", a: "When the keys are lowercase letters (or small integers): it is simpler and faster." },
    { q: "Why is `freq[x]++` buggy on a fresh key?", a: "`undefined + 1` is `NaN`, so the count is `NaN` from the start." }
  ],

  related: {
    topics: ["hashmap", "hashset", "sliding-window", "prefix-sum"],
    files: ["Problems/Hash/groupAnagrams.js", "Problems/Hash/firstNonRepeatingChar.js", "Problems/Hash/findDuplicates.js", "Problems/Array/majorityElement.js", "Problems/Strings/isAnagram.js", "Problems/Strings/countCharacters.js"]
  }
});
