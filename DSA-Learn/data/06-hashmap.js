// HashMap — learn-first format. Shape is documented at the top of 00-meta.js.
window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  id: "hashmap",
  group: "hashing",
  emoji: "🗺️",
  title: "HashMap (Hash Table)",
  tagline: "A lookup table: jump straight to the answer by its key instead of scanning through everything to find it.",
  level: "Starter",

  gist: [
    "A HashMap stores **key → value** pairs. Get, set, has and delete by key take about **O(1)** on average.",
    "The secret is a **hash function**: it turns the key into a bucket number, so the map jumps straight to where the value lives.",
    "Reach for it to answer “have I seen this before?” or “what goes with this key?” in one step. It replaces an inner loop.",
    "Cost: O(n) extra memory. Worst case is O(n) per operation if many keys crash into the same bucket (rare with a good hash)."
  ],

  complexity: {
    time: "O(1) average",
    space: "O(n)",
    why: [
      "Instead of looking through items one by one (O(n)), the map **computes** where the key must be and goes straight there. That is the same small amount of work whether it holds 10 items or 10 million, so each operation is O(1) on average.",
      "The price is memory: the map stores every key and value, so space grows with the data, O(n). The payoff: a loop over n items doing O(1) lookups costs O(n) in total, instead of O(n²) with an inner loop.",
      "Worst case is O(n): if lots of keys land in the *same* bucket (collisions), the map has to walk a long chain. A good hash function spreads keys out so this almost never happens."
    ],
    more: [
      {
        type: "table",
        heading: "Cost of each operation",
        columns: ["Operation", "Average", "Worst case"],
        rows: [
          ["Insert / set", "O(1)", "O(n)"],
          ["Lookup / get / has", "O(1)", "O(n)"],
          ["Delete", "O(1)", "O(n)"]
        ]
      }
    ]
  },

  idea: {
    plain: [
      "A HashMap is a dictionary: you give it a **key** and it hands back the **value** stored for that key. In JavaScript that is `Map` (or a plain object).",
      "The trick is **hashing**. The map runs the key through a *hash function* that produces a number, then uses that number (modulo the number of buckets) as the address of a bucket. To look a key up later, it hashes again and jumps to that same bucket. No searching.",
      "Two different keys can land in the same bucket. That is a **collision**. Each bucket keeps a small chain of entries, so a lookup is: hash, jump to the bucket, check only that short chain."
    ],
    signals: [
      "You keep asking “have I seen this value before?” (duplicates, existence checks).",
      "You need to **count** things or **group** things by some key.",
      "You want to turn an inner loop into a lookup: “is there a number that completes this pair?” (Two Sum).",
      "You need to remember a value's **index** or **last position** for later."
    ],
    notFor: [
      "You need the keys in **sorted order**. A hash map doesn't keep sorted order. Use sorting or a tree.",
      "The input is tiny, or memory is very tight. A plain scan can be simpler and just as fast."
    ],
    more: [
      {
        type: "text",
        text: "**Where you meet it in real life:** caching (key = request, value = saved response), counting words, grouping records by id, removing duplicates, database indexes."
      },
      {
        type: "table",
        heading: "Which JavaScript tool?",
        columns: ["Tool", "Holds", "Notes"],
        rows: [
          ["`Map`", "key → value", "Any type of key. Remembers insertion order. Has `.size`. **Best default.**"],
          ["`Set`", "just keys", "“Is it in here?” and uniqueness only (see HashSet topic)."],
          ["`{}` object", "string keys → value", "Fine for simple counting, but keys turn into strings and names like `constructor` can clash."]
        ]
      }
    ]
  },

  analogy: {
    title: "A wall of pigeonholes with a rule that tells you which hole",
    story: [
      "Picture a post-office wall with numbered pigeonholes 0 to 3. The clerk has one fixed rule: *add up the letter codes of the name and take the remainder after dividing by 4.* That number is the pigeonhole. To store a letter for “cat”, apply the rule, get hole 0, drop the letter in. To collect it later, apply the **same rule**, walk straight to hole 0 and pick it up. Nobody searches the whole wall.",
      "Sometimes two names give the same hole. That's fine: the hole just holds a small stack of letters, and the clerk checks the names on **that stack only**.",
      "**Two Sum version:** you walk down a line of people holding a notebook of numbers you have already seen. For each new person you ask, “is the partner I need already written in my notebook?” One glance, no re-walking the line."
    ],
    map: [
      ["Name on the letter", "The key"],
      ["The clerk's rule", "The hash function"],
      ["Pigeonhole number", "The bucket index"],
      ["Two names, same hole", "A collision"],
      ["Stack of letters in one hole", "The chain inside a bucket"],
      ["Walking straight to the hole", "O(1) lookup"],
      ["The notebook of seen numbers", "The map in Two Sum"]
    ],
    breaks: "Real hash functions scramble keys far more than “add up the letters”, and a real map adds more buckets (and re-hashes everything) when the wall gets crowded. The idea of *compute the address, then jump* is exactly the same."
  },

  demos: [
    {
      id: "twosum",
      title: "Two Sum with a map: one pass, no inner loop",
      intro: "Find two numbers that add up to the target. The map remembers every number we pass, together with its index. Press **Play** or step through.",
      codeIntro: "Returns the two indexes, or `null`. The numbers do **not** need to be sorted (compare with the Two Pointers version).",
      viz: "array",
      legend: [["cur", "current number"], ["good", "the pair"]],
      inputs: [
        { type: "numlist", name: "nums", label: "Numbers (any order)", value: [1, 6, 9, 4, 8, 3], len: [2, 9], min: 0, max: 20 },
        { type: "number", name: "target", label: "Target sum", value: 11, min: 0, max: 40 }
      ],
      random(rnd) {
        const n = rnd.int(4, 8);
        const nums = Array.from({ length: n }, () => rnd.int(0, 15));
        let target;
        if (rnd() < 0.7) {
          const i = rnd.int(0, n - 2);
          const j = rnd.int(i + 1, n - 1);
          target = nums[i] + nums[j];
        } else {
          target = rnd.int(1, 30);
        }
        return { nums: nums.join(", "), target: String(target) };
      },
      frames(inp, snap) {
        const a = inp.nums;
        const T = inp.target;
        const seen = new Map();
        const mapBox = (newKey, goodKey) => ({
          label: "seen",
          hint: "value → index",
          kind: "map",
          items: [...seen].map(([k, v]) => ({ k, v, new: k === newKey, tone: k === goodKey ? "good" : undefined }))
        });
        const view = (extra) => Object.assign({ label: "nums", cells: a, boxes: [mapBox()], vars: { target: T } }, extra);

        snap(view({
          at: ["init"],
          say: "We walk through the numbers once, left to right. The map **seen** starts empty. It will remember each number and its index so later numbers can ask “is my partner already in here?”"
        }));
        for (let i = 0; i < a.length; i++) {
          const need = T - a[i];
          if (seen.has(need)) {
            const j = seen.get(need);
            snap(view({
              at: ["need", "has"],
              ptr: { i },
              tone: { [i]: "cur", [j]: "good" },
              boxes: [mapBox(undefined, need)],
              vars: { target: T, need },
              say: "Number " + a[i] + ": we need a partner **" + T + " - " + a[i] + " = " + need + "**. Is " + need + " in the map? **Yes**, it was at index " + j + "!"
            }));
            snap(view({
              at: ["found"],
              ptr: { i },
              tone: { [i]: "good", [j]: "good" },
              boxes: [mapBox(undefined, need)],
              vars: { target: T, need },
              out: a[j] + " + " + a[i] + " = " + T + ", so the answer is indexes [" + j + ", " + i + "]",
              say: "The earlier number (index " + j + ") and this one (index " + i + ") add up to " + T + ". Answer: **[" + j + ", " + i + "]**.",
              result: [j, i]
            }));
            return;
          }
          snap(view({
            at: ["need", "has"],
            ptr: { i },
            tone: { [i]: "cur" },
            vars: { target: T, need },
            say: "Number " + a[i] + ": we need a partner **" + T + " - " + a[i] + " = " + need + "**. Is " + need + " in the map? **No**."
          }));
          seen.set(a[i], i);
          snap(view({
            at: ["set"],
            ptr: { i },
            tone: { [i]: "cur" },
            boxes: [mapBox(a[i])],
            vars: { target: T },
            say: "Remember **" + a[i] + " → index " + i + "** in the map, so a later number can pair with it."
          }));
        }
        snap(view({
          at: ["none"],
          out: "No two numbers add up to " + T,
          outTone: "bad",
          say: "We checked every number and none had its partner in the map. **No answer.**",
          result: null
        }));
      },
      code: {
        fn: "twoSum",
        lines: [
          `function twoSum(nums, target) {`,
          [`  const seen = new Map();`, "Maps each number we've passed to its index.", "init"],
          [`  for (let i = 0; i < nums.length; i++) {`, "One pass: each number is visited once.", "loop"],
          [`    const need = target - nums[i];`, "The partner that would complete the pair.", "need"],
          [`    if (seen.has(need)) {`, "O(1) question: have we already passed that partner?", "has"],
          [`      return [seen.get(need), i];`, "Yes: its stored index and the current index are the answer.", "found"],
          `    }`,
          [`    seen.set(nums[i], i);`, "No: remember this number for later ones. We store it **after** checking, so a number can't pair with itself.", "set"],
          `  }`,
          [`  return null;`, "Nothing matched anywhere.", "none"],
          `}`
        ]
      },
      call: (fn, inp) => fn(inp.nums, inp.target)
    },

    {
      id: "inside",
      title: "Inside a HashMap: hash → bucket → collision",
      intro: "A toy map with a made-up hash (add the letter codes, then take the remainder). Watch keys pick buckets, collide, and then get found again. Change the keys or the bucket count and press **Run**.",
      codeIntro: "A tiny hash map. Real ones scramble keys better and grow when crowded, but the idea is identical.",
      viz: "none",
      legend: [["cur", "bucket / entry being looked at"], ["good", "found"]],
      inputs: [
        { type: "text", name: "keys", label: "Keys to store (comma separated, a to z)", value: "cat, dog, bird, cow, ant, eel", len: [1, 60], alphabet: "abcdefghijklmnopqrstuvwxyz, " },
        { type: "number", name: "size", label: "Buckets", value: 4, min: 2, max: 8 },
        { type: "text", name: "find", label: "Key to look up", value: "cow", len: [1, 8], alphabet: "abcdefghijklmnopqrstuvwxyz" }
      ],
      validate(inp) {
        const keys = inp.keys.split(/[\s,]+/).filter(Boolean);
        if (keys.length < 1 || keys.length > 8) return "Use between 1 and 8 keys.";
        if (keys.some((k) => !/^[a-z]{1,8}$/.test(k))) return "Each key must be 1 to 8 letters (a to z).";
        if (new Set(keys).size !== keys.length) return "Keys must all be different in this demo.";
        return null;
      },
      random(rnd) {
        const pool = ["cat", "dog", "bird", "cow", "ant", "eel", "fox", "bat", "owl", "hen", "pig", "rat", "yak", "emu"];
        const keys = [];
        const n = rnd.int(4, 7);
        while (keys.length < n) {
          const w = pool[rnd.int(0, pool.length - 1)];
          if (!keys.includes(w)) keys.push(w);
        }
        const find = rnd() < 0.75 ? keys[rnd.int(0, n - 1)] : pool.find((w) => !keys.includes(w));
        return { keys: keys.join(", "), size: String(rnd.int(3, 6)), find };
      },
      frames(inp, snap) {
        const keys = inp.keys.split(/[\s,]+/).filter(Boolean);
        const size = inp.size;
        const find = inp.find;
        const buckets = Array.from({ length: size }, () => []);
        const codes = (k) => [...k].map((c) => c.charCodeAt(0));
        const total = (k) => codes(k).reduce((s, x) => s + x, 0);
        const box = (hot, newEntry, entryTone) => ({
          label: "buckets",
          hint: "bucket number → chain of key:value",
          kind: "buckets",
          items: buckets.map((chain, id) => ({
            id,
            tone: hot === id ? "cur" : undefined,
            chain: chain.map(([k, v], n) => ({
              v: k + ":" + v,
              new: newEntry && newEntry[0] === id && newEntry[1] === n,
              tone: entryTone && entryTone[0] === id && entryTone[1] === n ? entryTone[2] : undefined
            }))
          }))
        });
        const view = (extra) => Object.assign({ boxes: [box()] }, extra);

        snap(view({
          at: ["ctor"],
          say: "Start with **" + size + " empty buckets**, numbered 0 to " + (size - 1) + ". Each bucket is an (empty) chain waiting for entries."
        }));
        keys.forEach((key, n) => {
          const sum = total(key);
          const b = sum % size;
          snap(view({
            at: ["hashsum", "hashmod"],
            boxes: [box(b)],
            vars: { key, sum, ["sum % " + size]: b },
            say: "Store **\"" + key + "\"**. Hash it: add the letter codes " + codes(key).join(" + ") + " = **" + sum + "**. Then " + sum + " mod " + size + " = **" + b + "**, so it belongs in **bucket " + b + "**."
          }));
          const clash = buckets[b].length > 0;
          buckets[b].push([key, n]);
          snap(view({
            at: ["pick", "push"],
            boxes: [box(b, [b, buckets[b].length - 1])],
            vars: { key, bucket: b },
            say: clash
              ? "Bucket " + b + " already holds \"" + buckets[b][0][0] + "\", so this is a **collision**. No problem: \"" + key + "\" joins the chain in that bucket."
              : "Bucket " + b + " is empty, so \"" + key + "\" goes straight in."
          }));
        });

        const sum = total(find);
        const b = sum % size;
        snap(view({
          at: ["pickg"],
          boxes: [box(b)],
          vars: { find, sum, ["sum % " + size]: b },
          say: "Now look up **\"" + find + "\"**. Same rule: " + codes(find).join(" + ") + " = " + sum + ", and " + sum + " mod " + size + " = **" + b + "**. Jump straight to bucket " + b + ". No other bucket needs to be touched."
        }));
        const chain = buckets[b];
        for (let n = 0; n < chain.length; n++) {
          const same = chain[n][0] === find;
          snap(view({
            at: ["walk", "match"],
            boxes: [box(b, null, [b, n, same ? "good" : "cur"])],
            vars: { find, bucket: b },
            say: same
              ? "Compare \"" + chain[n][0] + "\" with \"" + find + "\": **same key!** The stored value is **" + chain[n][1] + "**."
              : "Compare \"" + chain[n][0] + "\" with \"" + find + "\": different, keep walking this short chain."
          }));
          if (same) {
            snap(view({
              at: ["match"],
              boxes: [box(b, null, [b, n, "good"])],
              out: "\"" + find + "\" → " + chain[n][1],
              say: "Found it after checking only **" + (n + 1) + "** " + (n === 0 ? "entry" : "entries") + ", not all " + keys.length + " keys.",
              result: { buckets: buckets.map((c) => c.map(([k]) => k)), found: chain[n][1] }
            }));
            return;
          }
        }
        snap(view({
          at: ["miss"],
          boxes: [box(b)],
          out: "\"" + find + "\" is not in the map",
          outTone: "bad",
          say: chain.length ? "We checked every entry in bucket " + b + " and none matched, so the key is **not in the map**." : "Bucket " + b + " is empty, so the key **cannot be in the map**.",
          result: { buckets: buckets.map((c) => c.map(([k]) => k)), found: null }
        }));
      },
      code: {
        fn: "TinyMap",
        lines: [
          `class TinyMap {`,
          `  constructor(size) {`,
          [`    this.buckets = Array.from({ length: size }, () => []);`, "One empty chain (array) per bucket.", "ctor"],
          `  }`,
          `  hash(key) {`,
          `    let sum = 0;`,
          [`    for (const ch of key) sum += ch.charCodeAt(0);`, "Turn the key into a number: add its letter codes.", "hashsum"],
          [`    return sum % this.buckets.length;`, "The remainder is a valid bucket number, 0 to size-1.", "hashmod"],
          `  }`,
          `  set(key, value) {`,
          [`    const bucket = this.buckets[this.hash(key)];`, "Jump to the key's bucket.", "pick"],
          [`    bucket.push([key, value]);`, "Add to that bucket's chain. (A real map first checks whether the key already exists and updates it.)", "push"],
          `  }`,
          `  get(key) {`,
          [`    const bucket = this.buckets[this.hash(key)];`, "Same rule gives the same bucket: no searching elsewhere.", "pickg"],
          [`    for (const [k, v] of bucket) {`, "Walk only this one short chain.", "walk"],
          [`      if (k === key) return v;`, "Matching key: return its value.", "match"],
          `    }`,
          [`    return undefined;`, "Not in the chain, so not in the map.", "miss"],
          `  }`,
          `}`
        ]
      },
      call: (TinyMap, inp) => {
        const keys = inp.keys.split(/[\s,]+/).filter(Boolean);
        const m = new TinyMap(inp.size);
        keys.forEach((k, n) => m.set(k, n));
        const v = m.get(inp.find);
        return { buckets: m.buckets.map((c) => c.map(([k]) => k)), found: v === undefined ? null : v };
      }
    }
  ],

  mistakes: [
    {
      oops: "Checking `if (map.get(key))` instead of `map.has(key)`",
      why: "A stored value of `0`, `\"\"` or `false` is falsy, so a key that *is* there looks missing. It bites when you store index 0 or counts.",
      fix: "Use `map.has(key)` (or compare with `undefined`)."
    },
    {
      oops: "Using a plain object `{}` with arbitrary keys",
      why: "All keys become strings (`1` and `\"1\"` are the same) and names like `constructor` or `__proto__` can clash with built-in properties.",
      fix: "Use `Map`, or `Object.create(null)` if you really want an object."
    },
    {
      oops: "Using an array or object as a key",
      why: "A `Map` compares object keys by **reference**. `map.set([1, 2], \"x\"); map.get([1, 2])` is `undefined` because it is a different array.",
      fix: "Use primitive keys, or build a string key such as `\"1,2\"`."
    },
    {
      oops: "In Two Sum, storing the number **before** looking up its partner",
      why: "The number can then match itself: with `nums = [3]` and `target = 6` you'd wrongly return the same index twice.",
      fix: "Order is **need → has → set**: look up first, then store."
    }
  ],

  remember: {
    mnemonic: "Compute the address, then jump straight there: hash → bucket → check the short chain.",
    rules: [
      "Ask: “Can I replace my inner loop with a lookup?” If yes, reach for a map.",
      "In one-pass problems: **look up first, then store**.",
      "Map = key → value (counts, indexes, groups). Set = only “have I seen it?”.",
      "Average O(1) per operation, worst case O(n), memory O(n)."
    ],
    template: {
      lines: [
        `const map = new Map();`,
        [`for (const x of items) {`, "One pass over the input."],
        [`  if (map.has(keyOf(x))) {`, "Question the map can answer instantly."],
        [`    // use map.get(keyOf(x))`, "Use what you remembered earlier."],
        `  }`,
        [`  map.set(keyOf(x), valueOf(x));`, "Remember this item for later ones."],
        `}`
      ]
    },
    more: [
      {
        type: "callout",
        kind: "tip",
        text: "The same idea powers *Subarray Sum Equals K*: the map stores running (prefix) sums and how often each occurred. See the Prefix Sum topic. Your own versions live in `Problems/Hash/twoSum.js` and `Problems/Hash/subarraySum.js`."
      }
    ]
  },

  practice: {
    title: "First Unique Character in a String",
    level: "Easy",
    problem: "Given a string `s`, return the **index** of the first character that appears exactly once. If no character is unique, return `-1`.",
    examples: [
      { input: "\"leetcode\"", output: "0", why: "“l” appears once and it is first." },
      { input: "\"loveleetcode\"", output: "2", why: "l and o repeat; “v” at index 2 is the first one that doesn't." },
      { input: "\"aabb\"", output: "-1", why: "Every character repeats." }
    ],
    hints: [
      "You need to know *how many times* each character appears. Which structure maps a character to a count?",
      "Make two passes: pass 1 builds the counts. Pass 2 walks the string again **in order** and returns the first index whose count is 1.",
      "The counting idiom is `count.set(ch, (count.get(ch) || 0) + 1)`."
    ],
    solution: {
      explain: [
        "A Map from character to count answers “how many times?” in O(1). One pass fills it. A second pass walks the string in its original order and returns the first position whose count is exactly 1.",
        "Time O(n) (two passes), space O(k) where k is the number of distinct characters."
      ],
      code: {
        fn: "firstUniqChar",
        lines: [
          `function firstUniqChar(s) {`,
          [`  const count = new Map();`, "character → how many times it appears"],
          [`  for (const ch of s) {`, "Pass 1: count every character."],
          [`    count.set(ch, (count.get(ch) || 0) + 1);`, "Not seen yet? `get` gives undefined, `|| 0` turns it into 0, then add 1."],
          `  }`,
          [`  for (let i = 0; i < s.length; i++) {`, "Pass 2: go back through the string in order."],
          [`    if (count.get(s[i]) === 1) return i;`, "The first character with a count of 1 wins."],
          `  }`,
          [`  return -1;`, "No unique character exists."],
          `}`
        ]
      }
    },
    tests: [
      { args: ["leetcode"], expect: 0 },
      { args: ["loveleetcode"], expect: 2 },
      { args: ["aabb"], expect: -1 },
      { args: ["z"], expect: 0 },
      { args: [""], expect: -1 },
      { args: ["abcabc"], expect: -1 },
      { args: ["aadadaad"], expect: -1 },
      { args: ["aabbc"], expect: 4 }
    ]
  },

  recall: [
    { q: "Why is a HashMap lookup O(1) on average?", a: "It hashes the key to a bucket number and jumps straight there, then checks only the short chain inside that one bucket." },
    { q: "What is a collision, and how does chaining handle it?", a: "Two keys hash to the same bucket. Chaining keeps both entries in a small list in that bucket, and a lookup compares keys along that list." },
    { q: "In Two Sum with a map, why do you look up before you store?", a: "So a number can't be paired with itself, and because you only ever need partners that came *earlier*." },
    { q: "Why prefer `map.has(k)` over `if (map.get(k))`?", a: "A stored value like 0, \"\" or false is falsy, so `get` would make an existing key look missing." },
    { q: "When does a HashMap degrade to O(n) per operation?", a: "When many keys collide into the same bucket (a poor hash function or adversarial keys), so the chain gets long." }
  ],

  related: {
    topics: ["hashset", "frequency-map", "prefix-sum", "two-pointer"],
    files: ["Problems/Hash/twoSum.js", "Problems/Hash/hashMapIntro.js", "Problems/Hash/firstNonRepeatingChar.js", "Problems/Hash/groupAnagrams.js", "Problems/Hash/subarraySum.js", "Problems/Hash/itemInCommon.js"]
  }
});
