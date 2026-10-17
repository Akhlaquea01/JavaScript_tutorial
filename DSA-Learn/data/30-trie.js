// Trie (prefix tree) — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const splitWords = (s) => s.split(/[\s,]+/).filter(Boolean);

  // The finished trie as a tree for the picture. Ids follow the order the nodes get created.
  const trieScene = (words) => {
    let id = 0;
    const root = { id: id++, val: "•", children: [], map: {} };
    for (const w of words) {
      let node = root;
      for (const ch of w) {
        if (!node.map[ch]) {
          const c = { id: id++, val: ch, children: [], map: {} };
          node.map[ch] = c;
          node.children.push(c);
        }
        node = node.map[ch];
      }
    }
    const sortKids = (n) => {
      n.children.sort((a, b) => (a.val < b.val ? -1 : 1));
      n.children.forEach(sortKids);
    };
    sortKids(root);
    return { root, letters: id - 1 };
  };

  const validWords = (inp) => {
    const words = splitWords(inp.words);
    if (words.length < 1 || words.length > 6) return "Use between 1 and 6 words.";
    if (words.some((w) => !/^[a-z]{1,6}$/.test(w))) return "Each word must be 1 to 6 letters (a to z).";
    if (new Set(words).size !== words.length) return "Words must all be different in this demo.";
    if (trieScene(words).letters > 22) return "That makes a trie too big to draw. Use fewer or shorter words, or words that share prefixes.";
    return null;
  };

  const VOCAB = ["app", "apple", "apply", "apt", "bat", "bar", "bark", "cat", "car", "card", "care", "dog", "dot"];
  const randomWords = (rnd) => {
    for (;;) {
      const pool = VOCAB.slice();
      const picked = [];
      for (let i = 0, n = rnd.int(3, 6); i < n; i++) picked.push(pool.splice(rnd.int(0, pool.length - 1), 1)[0]);
      if (trieScene(picked).letters <= 22) return picked;
    }
  };

  const TRIE_CODE = {
    fn: "TRIE",
    lines: [
      `class Trie {`,
      [`  constructor() { this.root = { children: {}, isEnd: false }; }`, "The root holds no letter. Each node keeps its children by letter, plus a flag: does a word **end** here?", "node"],
      `  insert(word) {`,
      [`    let node = this.root;`, "Start at the root for every word.", "insert"],
      [`    for (const ch of word) {`, "One step down per letter.", "insert"],
      [`      if (!node.children[ch]) node.children[ch] = { children: {}, isEnd: false };`, "No path for this letter yet? Create the node. Otherwise **reuse** the existing one: shared prefixes share nodes.", "create"],
      [`      node = node.children[ch];`, "Step down to that child.", "follow"],
      `    }`,
      [`    node.isEnd = true;`, "The word is complete here. Without this flag “app” and “apple” would look the same.", "end"],
      `  }`,
      `  walk(s) {`,
      [`    let node = this.root;`, "", "walk"],
      [`    for (const ch of s) {`, "Follow the letters of s from the root...", "walk"],
      [`      if (!node.children[ch]) return null;`, "...and stop with null if a letter has no path.", "miss"],
      [`      node = node.children[ch];`, "", "walk"],
      `    }`,
      [`    return node;`, "The node where s ends (it may or may not be a word end).", "walk"],
      `  }`,
      [`  search(word) { const node = this.walk(word); return node !== null && node.isEnd; }`, "**Exact word:** the path must exist **and** a word must end there.", "search"],
      [`  startsWith(prefix) { return this.walk(prefix) !== null; }`, "**Prefix:** the path existing is enough.", "prefix"],
      `}`,
      ``,
      `function TRIE(words, query, mode) {`,
      `  const trie = new Trie();`,
      `  for (const w of words) trie.insert(w);`,
      [`  if (mode === "build") return trie.walk("") && words.length;`, "", "node"],
      `  return mode === "prefix" ? trie.startsWith(query) : trie.search(query);`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "trie",
    group: "trees",
    emoji: "🔤",
    title: "Trie (Prefix Tree)",
    tagline: "A tree of letters where each path from the root spells a prefix, so words that start the same share the same nodes. Prefix and word lookups cost O(length), however many words are stored.",
    level: "Core",
    needs: ["trees-intro", "hashmap"],

    gist: [
      "A **trie** stores words **letter by letter**: each step down the tree is one letter, and the path from the root to a node is a **prefix**.",
      "Words with the same beginning **share** their first nodes (`app`, `apple`, `apply` all share `a → p → p`).",
      "A flag **`isEnd`** marks where a real word finishes: `search` needs it, `startsWith` does not.",
      "Insert, search and prefix search are all **O(L)** (L = word length), independent of how many words are stored. Perfect for autocomplete."
    ],

    complexity: {
      time: "O(L) per word or prefix",
      space: "O(total letters)",
      why: [
        "Every operation just walks down the tree, one node per letter of the word or prefix, so it costs O(L). That does not depend on the number of words in the dictionary. A plain list of words would need O(N · L) to find everything starting with a prefix.",
        "The price is memory: one node per distinct prefix, and each node needs a container for its children. In the worst case (no shared prefixes) that is one node per letter stored. A fixed array of 26 children per node is fast but wasteful; a map or object per node is leaner."
      ],
      more: [
        {
          type: "table",
          heading: "Costs",
          columns: ["Operation", "Time", "Extra space"],
          rows: [
            ["`insert(word)`", "O(L)", "O(L) new nodes at worst"],
            ["`search(word)`", "O(L)", "O(1)"],
            ["`startsWith(prefix)`", "O(P), P = prefix length", "O(1)"],
            ["Autocomplete (all words with a prefix)", "O(P + size of that subtree)", "O(L) recursion + the output"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Think of a dictionary where you do not store whole words but **spell them out step by step**. The root is empty. From the root there is one branch for each possible first letter, from each of those one branch per possible second letter, and so on. Following a path of letters from the root spells a **prefix**; a node where a word stops is marked as a word end.",
        "Because paths are shared, `app`, `apple` and `apply` use the same three nodes `a → p → p` and only then split (`l → e`, `l → y`). So “does anything start with `ap`?” is just “can I walk `a` then `p` from the root?”, a few steps, however many words there are.",
        "You need the **`isEnd` flag**. If you only inserted `apple`, the path `a-p-p` exists but `app` is **not** a stored word. `search(\"app\")` must say false, while `startsWith(\"app\")` says true."
      ],
      signals: [
        "“**Autocomplete** / type-ahead”, “search suggestions”, “dictionary”, spell-check.",
        "“Does any word **start with** …?”, “count words with a prefix”, “longest common prefix”.",
        "**Wildcard** search (`a.t`) or word games on a grid (Word Search II: trie + backtracking + pruning).",
        "Bit-level tricks: a binary trie solves “maximum XOR of two numbers”."
      ],
      notFor: [
        "Only **exact** lookups. A hash set is simpler and lighter.",
        "Memory-tight situations with very few shared prefixes."
      ],
      more: [
        {
          type: "table",
          heading: "Trie vs hash set of words",
          columns: ["", "Hash set", "Trie"],
          rows: [
            ["Exact lookup", "O(L) (hashing the string)", "O(L)"],
            ["Prefix search", "O(N · L): scan every word", "O(L) + the output"],
            ["Sorted listing", "Needs a separate sort", "A DFS gives alphabetical order"],
            ["Wildcards (`.`)", "Hard", "DFS over the branches"],
            ["Memory", "Small", "More (a node per letter), but shared prefixes save some"]
          ]
        },
        {
          type: "code",
          title: "Autocomplete: all words with a prefix (verified code)",
          code: {
            fn: "autocomplete",
            lines: [
              `function autocomplete(words, prefix) {`,
              [`  const root = { children: {}, isEnd: false };`, "Build the trie..."],
              `  for (const w of words) {`,
              `    let node = root;`,
              `    for (const ch of w) {`,
              `      if (!node.children[ch]) node.children[ch] = { children: {}, isEnd: false };`,
              `      node = node.children[ch];`,
              `    }`,
              `    node.isEnd = true;`,
              `  }`,
              [`  let node = root;`, "...walk down to the end of the prefix..."],
              `  for (const ch of prefix) {`,
              [`    if (!node.children[ch]) return [];`, "No such prefix: no suggestions."],
              `    node = node.children[ch];`,
              `  }`,
              [`  const results = [];`, ""],
              `  function collect(n, path) {`,
              [`    if (n.isEnd) results.push(path);`, "A word ends here: it is a suggestion."],
              [`    for (const ch of Object.keys(n.children).sort()) collect(n.children[ch], path + ch);`, "...then explore everything below in alphabetical order (a DFS)."],
              `  }`,
              [`  collect(node, prefix);`, ""],
              [`  return results;`, ""],
              `}`
            ]
          }
        },
        {
          type: "points",
          heading: "Common extensions",
          items: [
            "**Delete a word:** clear `isEnd`, then remove nodes on the way back up that have no children and are not word ends.",
            "**Prefix count:** keep a `pass` counter in every node (how many words go through it) to answer “how many words start with …” in O(P). That is the practice problem.",
            "**Compressed trie / radix tree:** merge single-child chains into one edge to save memory.",
            "**Word Search II:** build a trie of the words, then DFS the grid and prune any path that is not a prefix in the trie."
          ]
        }
      ]
    },

    analogy: {
      title: "Typing into a phone's contact search",
      story: [
        "When you type `a`, your phone narrows the list to everyone whose name starts with `a`. Type `p`: now only `ap…`. Each letter you press is one step down a tree, and the contacts still matching are everything below where you are. You never re-scan the whole address book: you only move one step per letter.",
        "Names that begin the same share the same first steps, so “Ana”, “Anand” and “Anita” share `A → n`. A small marker at the end of “Ana” says “a complete contact ends here”, which is how you can tell the *whole name* “Ana” from the *beginning* of “Anand”."
      ],
      map: [
        ["Each letter you type", "One step down the trie"],
        ["Contacts that still match", "Everything below the current node"],
        ["“Ana” and “Anand” sharing `A → n`", "Shared prefix nodes"],
        ["A marker meaning “a whole name ends here”", "`isEnd = true`"],
        ["Your typed text matches nothing", "A letter with no child: `walk` returns `null`"]
      ],
      breaks: "A phone app also ranks suggestions by how often you call someone. A trie only knows letters; a real autocomplete adds counts or a heap on top to pick the top few."
    },

    demos: [
      {
        id: "insert",
        title: "Build a trie by inserting words",
        intro: "Each word walks down from the root, one letter at a time. If the letter's node exists the word **reuses** it (follow); if not, a new node is **created**. The ★ marks a node where a word ends. Faded nodes are not created yet. Try `app, apple, apply, apt, bat`.",
        codeIntro: "A trie with `insert`, plus `walk`, `search` and `startsWith` (used in the next demo).",
        viz: "tree",
        legend: [["cur", "node being visited"], ["mark", "path so far"], ["good", "new node just created"]],
        inputs: [{ type: "text", name: "words", label: "Words (comma separated, a to z)", value: "app, apple, apply, apt, bat", len: [1, 48], alphabet: "abcdefghijklmnopqrstuvwxyz, " }],
        validate: validWords,
        random(rnd) {
          return { words: randomWords(rnd).join(", ") };
        },
        scene: (inp) => ({ tree: trieScene(splitWords(inp.words)).root }),
        frames(inp, snap) {
          const words = splitWords(inp.words);
          const root = trieScene(words).root;
          const allIds = [];
          (function collect(n) { allIds.push(n.id); n.children.forEach(collect); })(root);
          const created = new Set([root.id]);
          const badge = {};
          const view = (path, tone, extra) => Object.assign({ tone, path, badge: { ...badge }, hide: allIds.filter((i) => !created.has(i)), boxes: [{ label: "word being inserted", kind: "list", items: [] }] }, extra);
          let letters = 0;

          words.forEach((w) => {
            let node = root;
            const path = [root.id];
            [...w].forEach((ch, k) => {
              const next = node.map[ch];
              const isNew = !created.has(next.id);
              const tone = {};
              path.forEach((i) => (tone[i] = "mark"));
              if (isNew) {
                created.add(next.id);
                letters++;
              }
              path.push(next.id);
              tone[next.id] = isNew ? "good" : "cur";
              snap(view(path.slice(), tone, {
                at: isNew ? ["insert", "create", "follow"] : ["insert", "follow"],
                boxes: [{ label: "word being inserted", kind: "list", items: [...w].map((c, j) => ({ v: c, tone: j < k ? "mark" : j === k ? "good" : undefined })) }],
                say: isNew
                  ? "Word \"" + w + "\", letter **" + ch + "**: " + (k === 0 ? "the root" : "the node above") + " has no child **" + ch + "** yet, so **create** it and step down."
                  : "Word \"" + w + "\", letter **" + ch + "**: the node already exists (an earlier word started the same way), so **reuse** it and step down. Shared prefixes share nodes."
              }));
              node = next;
            });
            badge[node.id] = "★";
            const tone = {};
            path.forEach((i) => (tone[i] = "mark"));
            tone[node.id] = "good";
            snap(view(path.slice(), tone, {
              at: ["end"],
              boxes: [{ label: "word being inserted", kind: "list", items: [...w].map((c) => ({ v: c, tone: "mark" })) }],
              say: "End of \"" + w + "\": set `isEnd = true` on this node (★). The path spells the word, and the star says a complete word stops here."
            }));
          });
          snap(view([], {}, {
            at: ["end"],
            out: words.length + " word" + (words.length === 1 ? "" : "s") + " stored in " + letters + " letter nodes",
            say: "**" + words.length + "** words use only **" + letters + "** letter nodes (" + words.reduce((s, w) => s + w.length, 0) + " letters in total) because shared prefixes are stored once. Each ★ marks a stored word.",
            result: { nodes: letters }
          }));
        },
        code: TRIE_CODE,
        call: (fn, inp) => {
          const words = splitWords(inp.words);
          // The displayed TRIE builds its trie internally, so count the nodes with a mirror build
          let count = 0;
          const root = { children: {} };
          for (const w of words) {
            let node = root;
            for (const ch of w) {
              if (!node.children[ch]) { node.children[ch] = { children: {} }; count++; }
              node = node.children[ch];
            }
          }
          fn(words, "", "prefix"); // make sure the displayed code builds without error
          return { nodes: count };
        }
      },

      {
        id: "search",
        title: "Search a word vs search a prefix",
        intro: "Choose a query and a mode. Both walk letters from the root. **Search** also needs the ★ (a word ends there). **Prefix** only needs the path to exist. Try `app` against `apple` only: search says no, prefix says yes.",
        codeIntro: "Same trie code as above. `walk` does the work, and the two modes differ only in the final check.",
        viz: "tree",
        legend: [["cur", "letter being matched"], ["mark", "matched so far"], ["good", "found"], ["bad", "no path / not a word"]],
        inputs: [
          { type: "text", name: "words", label: "Stored words (comma separated, a to z)", value: "apple, apt, bat", len: [1, 48], alphabet: "abcdefghijklmnopqrstuvwxyz, " },
          { type: "text", name: "query", label: "Query", value: "app", len: [1, 8], alphabet: "abcdefghijklmnopqrstuvwxyz" },
          { type: "select", name: "mode", label: "Mode", value: "search", options: [["search", "search (whole word)"], ["prefix", "startsWith (prefix)"]] }
        ],
        validate: validWords,
        random(rnd) {
          const words = randomWords(rnd);
          const w = words[rnd.int(0, words.length - 1)];
          const r = rnd();
          const query = r < 0.35 ? w : r < 0.7 ? w.slice(0, rnd.int(1, w.length)) : w.slice(0, 2) + "z";
          return { words: words.join(", "), query, mode: rnd() < 0.5 ? "search" : "prefix" };
        },
        scene: (inp) => ({ tree: trieScene(splitWords(inp.words)).root }),
        frames(inp, snap) {
          const words = splitWords(inp.words);
          const root = trieScene(words).root;
          // mark word ends
          const ends = new Set();
          for (const w of words) {
            let n = root;
            for (const ch of w) n = n.map[ch];
            ends.add(n.id);
          }
          const badge = Object.fromEntries([...ends].map((i) => [i, "★"]));
          const q = inp.query;
          const modeName = inp.mode === "search" ? "search" : "startsWith";
          const view = (path, tone, extra) => Object.assign({ tone, path, badge, boxes: [{ label: "query", kind: "list", items: [...q].map((c, j) => ({ v: c, tone: extra && extra.upto !== undefined ? (j < extra.upto ? "mark" : j === extra.upto ? extra.tone : undefined) : undefined })) }] }, extra && { at: extra.at, say: extra.say, out: extra.out, outTone: extra.outTone, result: extra.result });
          let node = root;
          const path = [root.id];
          snap(view(path.slice(), { [root.id]: "cur" }, { at: ["walk"], say: "**" + modeName + "(\"" + q + "\")**: start at the root and follow the letters of the query, one step each." }));
          for (let k = 0; k < q.length; k++) {
            const ch = q[k];
            const next = node.map[ch];
            if (!next) {
              const tone = {};
              path.forEach((i) => (tone[i] = "mark"));
              snap(view(path.slice(), tone, { at: ["miss"], upto: k, tone: "bad", out: modeName + "(\"" + q + "\") = false", outTone: "bad", say: "Letter **" + ch + "**: the current node has **no child " + ch + "**, so no stored word follows this path. `walk` returns `null`, and the answer is **false**.", result: false }));
              return;
            }
            node = next;
            path.push(node.id);
            const tone = {};
            path.forEach((i) => (tone[i] = "mark"));
            tone[node.id] = "cur";
            snap(view(path.slice(), tone, { at: ["walk"], upto: k, tone: "good", say: "Letter **" + ch + "**: the child exists, step down." }));
          }
          const tone = {};
          path.forEach((i) => (tone[i] = "mark"));
          const isEnd = ends.has(node.id);
          if (inp.mode === "prefix") {
            tone[node.id] = "good";
            snap(view(path.slice(), tone, { at: ["prefix"], upto: q.length, tone: "good", out: "startsWith(\"" + q + "\") = true", say: "All letters matched, so the path exists: some stored word starts with **" + q + "**. For a prefix that is enough: **true**.", result: true }));
          } else if (isEnd) {
            tone[node.id] = "good";
            snap(view(path.slice(), tone, { at: ["search"], upto: q.length, tone: "good", out: "search(\"" + q + "\") = true", say: "All letters matched **and** this node has a ★: \"" + q + "\" is a stored word. **true**.", result: true }));
          } else {
            tone[node.id] = "bad";
            snap(view(path.slice(), tone, { at: ["search"], upto: q.length, tone: "bad", out: "search(\"" + q + "\") = false", outTone: "bad", say: "All letters matched, but this node has **no ★**: \"" + q + "\" is only the beginning of longer words, not a stored word itself. `search` says **false** (while `startsWith` would say true).", result: false }));
          }
        },
        code: TRIE_CODE,
        call: (fn, inp) => fn(splitWords(inp.words), inp.query, inp.mode)
      }
    ],

    checks: [
      {
        code: {
          fn: "autocomplete",
          lines: [
            `function autocomplete(words, prefix) {`,
            `  const root = { children: {}, isEnd: false };`,
            `  for (const w of words) {`,
            `    let node = root;`,
            `    for (const ch of w) {`,
            `      if (!node.children[ch]) node.children[ch] = { children: {}, isEnd: false };`,
            `      node = node.children[ch];`,
            `    }`,
            `    node.isEnd = true;`,
            `  }`,
            `  let node = root;`,
            `  for (const ch of prefix) {`,
            `    if (!node.children[ch]) return [];`,
            `    node = node.children[ch];`,
            `  }`,
            `  const results = [];`,
            `  function collect(n, path) {`,
            `    if (n.isEnd) results.push(path);`,
            `    for (const ch of Object.keys(n.children).sort()) collect(n.children[ch], path + ch);`,
            `  }`,
            `  collect(node, prefix);`,
            `  return results;`,
            `}`
          ]
        },
        tests: [
          { args: [["app", "apple", "apply", "apt", "bat"], "app"], expect: ["app", "apple", "apply"] },
          { args: [["app", "apple", "apply", "apt", "bat"], "ap"], expect: ["app", "apple", "apply", "apt"] },
          { args: [["app", "apple", "apply", "apt", "bat"], "b"], expect: ["bat"] },
          { args: [["app", "apple", "apply", "apt", "bat"], "z"], expect: [] },
          { args: [["bat", "app"], ""], expect: ["app", "bat"] }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Forgetting the `isEnd` flag",
        why: "Without it you cannot tell a stored word from a mere prefix: after inserting `apple`, `search(\"app\")` would wrongly be true.",
        fix: "Set `isEnd = true` on the last node of every inserted word, and require it in `search`."
      },
      {
        oops: "Making `startsWith` check `isEnd`",
        why: "A prefix does not have to be a complete word. Requiring `isEnd` turns it into an exact search.",
        fix: "`startsWith` only needs the path to exist (`walk(prefix) !== null`)."
      },
      {
        oops: "Creating a new node for every letter of every word",
        why: "That wastes memory and breaks prefix sharing: the whole point of a trie. Two words would no longer meet at the same nodes.",
        fix: "Create a child only if `children[ch]` is missing; otherwise reuse it."
      },
      {
        oops: "Not handling the empty string or uppercase letters",
        why: "`\"\"` leaves you at the root, and `\"A\"` and `\"a\"` are different keys.",
        fix: "Decide what the empty prefix means (all words) and normalise case before inserting and searching."
      },
      {
        oops: "Deleting a word by just clearing `isEnd` everywhere",
        why: "That leaves useless nodes behind, and clearing the wrong node removes a different word.",
        fix: "Clear the flag, then prune childless, non-end nodes on the way back up."
      }
    ],

    remember: {
      mnemonic: "One node per letter, shared prefixes, a ★ for “a word ends here”. search needs ★, startsWith does not.",
      rules: [
        "Insert / search / prefix are **O(L)**, independent of the number of words.",
        "`walk(s)` is the helper: follow letters, return the end node or `null`.",
        "Prefix questions → trie. Exact-only questions → hash set.",
        "Count by prefix: add a `pass` counter to each node.",
        "Wildcard `.` → try every child with a DFS."
      ],
      template: {
        lines: [
          [`class TrieNode { constructor() { this.children = {}; this.isEnd = false; } }`, "A node: children by letter and a word-end flag."],
          [`insert(word): for each ch: create child if missing; step down; finally isEnd = true`, "Build."],
          [`walk(s): for each ch: if no child return null; step down; return node`, "Reuse for everything."],
          [`search(w) = node !== null && node.isEnd`, "Exact word."],
          [`startsWith(p) = node !== null`, "Prefix."]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own file: `Problems/Tree/Trie.js` (insert, search, startsWith). Related ideas: *Design Add and Search Words* (wildcard DFS), *Search Suggestions*, and *Word Search II* (trie + backtracking + pruning)."
        }
      ]
    },

    practice: {
      title: "Count Words With a Given Prefix",
      level: "Medium",
      problem: "Given a list of words and a prefix, return **how many words start with that prefix**. An empty prefix matches every word. Build it with a trie so each query costs O(length of the prefix).",
      examples: [
        { input: "words = [\"apple\", \"app\", \"apply\", \"bat\"], prefix = \"app\"", output: "3" },
        { input: "same words, prefix = \"b\"", output: "1" },
        { input: "same words, prefix = \"c\"", output: "0" }
      ],
      hints: [
        "A trie node represents a prefix. How could each node remember **how many words pass through it**?",
        "Give each node a counter `pass`. When inserting a word, add 1 to `pass` of **every node you step onto**.",
        "To answer a query, walk the prefix. If a letter is missing return 0, otherwise return the `pass` of the last node. (An empty prefix matches all words.)"
      ],
      solution: {
        explain: [
          "Every node counts how many inserted words go through it, so the count at the end of the prefix path is exactly the number of words with that prefix. No word list needs to be scanned at query time.",
          "Building is O(total letters). A query is O(P)."
        ],
        code: {
          fn: "countPrefix",
          lines: [
            `function countPrefix(words, prefix) {`,
            [`  const root = { next: {}, pass: 0 };`, "Each node counts the words that pass through it."],
            [`  for (const w of words) {`, "Insert every word..."],
            [`    let node = root;`, ""],
            [`    for (const ch of w) {`, ""],
            [`      if (!node.next[ch]) node.next[ch] = { next: {}, pass: 0 };`, "Create the child if this prefix is new."],
            [`      node = node.next[ch];`, "Step down."],
            [`      node.pass++;`, "One more word passes through this node."],
            `    }`,
            `  }`,
            [`  let node = root;`, "Now follow the query prefix."],
            [`  for (const ch of prefix) {`, ""],
            [`    if (!node.next[ch]) return 0;`, "No stored word has this prefix."],
            [`    node = node.next[ch];`, ""],
            `  }`,
            [`  return prefix === "" ? words.length : node.pass;`, "The counter at the end of the prefix is the answer (an empty prefix matches all words)."],
            `}`
          ]
        }
      },
      tests: [
        { args: [["apple", "app", "apply", "bat"], "app"], expect: 3 },
        { args: [["apple", "app", "apply", "bat"], "ap"], expect: 3 },
        { args: [["apple", "app", "apply", "bat"], "b"], expect: 1 },
        { args: [["apple", "app", "apply", "bat"], "c"], expect: 0 },
        { args: [["apple", "app", "apply", "bat"], ""], expect: 4 },
        { args: [["a"], "a"], expect: 1 },
        { args: [[], "x"], expect: 0 }
      ]
    },

    recall: [
      { q: "What does each step down a trie represent, and what does a path represent?", a: "One step is one letter. The path from the root to a node is a prefix." },
      { q: "Why is the `isEnd` flag needed?", a: "To tell a stored word from a mere prefix. After inserting `apple`, `app` exists as a path but is not a word." },
      { q: "How do `search` and `startsWith` differ?", a: "Both walk the letters. `search` also needs `isEnd` on the last node; `startsWith` only needs the path to exist." },
      { q: "Cost of insert and search in a trie?", a: "O(L), the word length, independent of how many words are stored." },
      { q: "When choose a trie over a hash set?", a: "When you need prefix search, autocomplete, sorted listing or wildcard matching. For exact lookups only, a hash set is simpler." }
    ],

    related: {
      topics: ["hashmap", "hashset", "backtracking", "pruning", "tree-types-overview"],
      files: ["Problems/Tree/Trie.js"]
    }
  });
})();
