// DSA-Notes/30-trie.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "trie",
  "num": 30,
  "emoji": "🔤",
  "title": "Trie (Prefix Tree)",
  "summary": "Trie ek tree hai jo strings ko character-by-character store karta hai — root se kisi node tak ka path ek prefix hota hai, aur same prefix wale words ek hi path share karte hain. Insert, exact search aur prefix search teeno O(L) me (L = word ki length), chahe dictionary me kitne bhi words hon. Autocomplete, dictionary lookup, spell-check aur prefix-based problems ke liye best.",
  "sections": [
    {
      "heading": "Trie kya hai?",
      "body": "\n      <ul>\n        <li><strong>Prefix Tree</strong> — har edge ek character hai, root empty hota hai. Root se kisi node tak ka path = ek prefix. Jis node pe koi word poora hota hai wahan <code>isEnd = true</code> flag lagta hai.</li>\n        <li>Same prefix wale words ka path shuru me <strong>shared</strong> hota hai (app, apple, apply sab \"a → p → p\" share karte hain) — isi se prefix queries fast aur memory me saving hoti hai.</li>\n        <li>Har node ke paas children ka collection: <strong>Map / object</strong> (flexible, kam memory) ya <strong>fixed array[26]</strong> (sirf lowercase a–z; fast index access par zyada memory).</li>\n        <li>Complexity <strong>words ki sankhya (N) par depend nahi</strong> karti, sirf word ki length L par.</li>\n      </ul>",
      "code": "Words: app, apple, apply, apt, bat\n\nroot\n ├─ a\n │   └─ p\n │       ├─ p*          (\"app\" complete word)\n │       │   └─ l\n │       │       ├─ e*  (\"apple\")\n │       │       └─ y*  (\"apply\")\n │       └─ t*          (\"apt\")\n └─ b\n     └─ a\n         └─ t*          (\"bat\")\n\n* = isEnd true  → yahan ek poora word khatam hota hai\nTotal nodes (root ke saath) = 11,  words = 5"
    },
    {
      "heading": "Node Structure & Insert",
      "code": "class TrieNode:\n    constructor():\n        this.children = {}        // char → TrieNode  (ya array of size 26)\n        this.isEnd = false        // yahan koi word khatam hota hai?\n\nclass Trie:\n    constructor():\n        this.root = TrieNode()\n\n    insert(word):                              // O(L)\n        node = this.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode() // raasta nahi hai to naya node banao\n            node = node.children[ch]\n        node.isEnd = true                      // word complete"
    },
    {
      "heading": "Exact Search vs Prefix Search",
      "code": "    // Common helper: prefix ke end wale node tak chalo (ya null)\n    walk(s):\n        node = this.root\n        for ch in s:\n            if ch not in node.children: return null\n            node = node.children[ch]\n        return node\n\n    search(word):                              // exact word — O(L)\n        node = this.walk(word)\n        return node is not null and node.isEnd\n\n    startsWith(prefix):                        // koi word is prefix se shuru hota hai? — O(L)\n        return this.walk(prefix) is not null",
      "body": "\n      <ul>\n        <li>Dono ka raasta same hai — farq sirf <strong>aakhri check</strong> me: <code>search</code> me node ka <code>isEnd</code> true hona chahiye, <code>startsWith</code> me bas node ka exist karna kaafi hai.</li>\n        <li>Example: sirf \"apple\" insert kiya ho to <code>search(\"app\")</code> = <strong>false</strong> (isEnd nahi), par <code>startsWith(\"app\")</code> = <strong>true</strong>. <code>isEnd</code> flag isi liye zaroori hai — warna \"app\" aur \"apple\" me farq nahi kar paoge.</li>\n      </ul>",
      "note": "Repo me poora implementation: Problems/Tree/Trie.js (insert, search, startsWith)."
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Time</th><th>Space</th></tr>\n        <tr><td>insert(word)</td><td>O(L)</td><td>O(L) naye nodes (worst case)</td></tr>\n        <tr><td>search(word)</td><td>O(L)</td><td>O(1)</td></tr>\n        <tr><td>startsWith(prefix)</td><td>O(P) (P = prefix length)</td><td>O(1)</td></tr>\n        <tr><td>Autocomplete (prefix ke saare words)</td><td>O(P + size of subtree)</td><td>O(L) recursion + output</td></tr>\n        <tr><td>Poora Trie</td><td>—</td><td>O(total characters) worst; array[26] children me O(26 × nodes)</td></tr>\n      </table>",
      "note": "N words me se scan karne par har query O(N × L) hoti; Trie me O(L). Trade-off: memory zyada — har character ke liye ek node (aur uske children ka container)."
    },
    {
      "heading": "Autocomplete — Prefix ke Saare Words",
      "code": "function autocomplete(prefix):\n    node = this.walk(prefix)\n    if node is null: return []\n    results = []\n    function collect(node, path):\n        if node.isEnd: results.push(path)\n        for ch in sorted(node.children.keys()):     // sorted → lexicographic order\n            collect(node.children[ch], path + ch)\n    collect(node, prefix)\n    return results\n\n// autocomplete(\"app\") → [\"app\", \"apple\", \"apply\"]\n// autocomplete(\"ap\")  → [\"app\", \"apple\", \"apply\", \"apt\"]",
      "note": "Real systems me sirf top-K suggestions chahiye hote hain: har node pe popular words ka count / top-K list store karte hain, ya yahan Heap (topic 32) lagate hain."
    },
    {
      "heading": "Trie vs HashSet / HashMap",
      "body": "\n      <table>\n        <tr><th>Feature</th><th>HashSet of words</th><th>Trie</th></tr>\n        <tr><td>Exact lookup</td><td>O(L) (string hash karna)</td><td>O(L)</td></tr>\n        <tr><td>Prefix search</td><td>O(N × L) — sab words scan</td><td><strong>O(L)</strong> + output</td></tr>\n        <tr><td>Sorted / lexicographic listing</td><td>Nahi (sort alag se)</td><td>DFS se naturally sorted</td></tr>\n        <tr><td>Wildcard (\".\") matching</td><td>Mushkil</td><td>Branches pe DFS</td></tr>\n        <tr><td>Memory</td><td>Kam</td><td>Zyada (har char ka node) — par shared prefixes se saving</td></tr>\n      </table>",
      "note": "Sirf exact lookup chahiye to HashSet kaafi hai. Prefix / autocomplete / wildcard / \"longest common prefix\" jaise sawal dikhein to Trie."
    },
    {
      "heading": "Use Cases",
      "body": "\n      <ul>\n        <li><strong>Autocomplete / Type-ahead</strong> (search box, IDE suggestions), spell-checker, dictionary lookup.</li>\n        <li><strong>Word games</strong> — Boggle / Word Search II (Trie + Backtracking + Pruning, topic 20–21).</li>\n        <li><strong>IP routing</strong> — longest prefix match (binary trie), phone contacts / T9 predictive text.</li>\n        <li><strong>Longest Common Prefix</strong> of many strings, count of words with a given prefix.</li>\n        <li>Binary Trie (bits ka trie) — \"Maximum XOR of two numbers\" jaise problems.</li>\n      </ul>"
    },
    {
      "heading": "Extensions / Variants",
      "body": "\n      <ul>\n        <li><strong>Delete a word</strong> — <code>isEnd = false</code> kar do; jo nodes ab kisi aur word ke kaam ke nahi (no children, isEnd false) unhe wapas chalte hue hata do.</li>\n        <li><strong>Prefix count</strong> — har node pe <code>passCount</code> rakho (kitne words yahan se guzre) → \"kitne words is prefix se shuru hote hain\" O(L) me.</li>\n        <li><strong>Word ko end node me store karna</strong> — Word Search II me path rebuild karne ki zaroorat nahi padti.</li>\n        <li><strong>Compressed Trie / Radix Tree</strong> — single-child chains ko ek edge (multi-character label) me merge karke memory bachana.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Implement Trie (Prefix Tree)",
      "pseudocode": "class Trie:\n    constructor(): this.root = TrieNode()\n\n    insert(word):\n        node = this.root\n        for ch in word:\n            if ch not in node.children: node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.isEnd = true\n\n    search(word):\n        node = this.walk(word)\n        return node is not null and node.isEnd\n\n    startsWith(prefix):\n        return this.walk(prefix) is not null\n\n    walk(s):\n        node = this.root\n        for ch in s:\n            if ch not in node.children: return null\n            node = node.children[ch]\n        return node"
    },
    {
      "title": "Design Add and Search Words (Wildcard \".\")",
      "pseudocode": "function search(word):                      // '.' kisi bhi ek character se match karta hai\n    function dfs(node, i):\n        if i == word.length: return node.isEnd\n        ch = word[i]\n        if ch == '.':\n            for child in node.children.values():       // har branch try karo\n                if dfs(child, i + 1): return true\n            return false\n        if ch not in node.children: return false\n        return dfs(node.children[ch], i + 1)\n    return dfs(this.root, 0)\n\n// words = app, apple, apply, apt, bat\n// search(\"a.t\") → true (apt)    search(\"b.d\") → false    search(\"a..\") → true"
    },
    {
      "title": "Search Suggestions (Autocomplete, top 3)",
      "pseudocode": "function suggestions(prefix, limit = 3):\n    node = this.walk(prefix)\n    if node is null: return []\n    results = []\n    function collect(node, path):\n        if results.length == limit: return                // limit pe ruk jao\n        if node.isEnd: results.push(path)\n        for ch in sorted(node.children.keys()):\n            collect(node.children[ch], path + ch)\n    collect(node, prefix)\n    return results"
    },
    {
      "title": "Word Search II (Trie + Backtracking + Pruning)",
      "pseudocode": "function findWords(board, words):\n    trie = buildTrie(words)\n    found = Set()\n\n    function dfs(r, c, node, path):\n        ch = board[r][c]\n        next = node.children[ch]\n        if next is null: return                      // PRUNE — koi word is prefix se shuru nahi hota\n        path = path + ch\n        if next.isEnd: found.add(path)\n        board[r][c] = '#'                            // choose (visited mark)\n        for (dr, dc) in [(1,0), (-1,0), (0,1), (0,-1)]:\n            nr = r + dr; nc = c + dc\n            if inBounds(nr, nc) and board[nr][nc] != '#':\n                dfs(nr, nc, next, path)              // explore\n        board[r][c] = ch                             // un-choose (backtrack)\n\n    for each cell (r, c): dfs(r, c, trie.root, \"\")\n    return found"
    }
  ]
});
