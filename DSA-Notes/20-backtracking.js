// DSA-Notes/20-backtracking.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "backtracking",
  "num": 20,
  "emoji": "🧭",
  "title": "Backtracking",
  "summary": "Backtracking ek brute-force + undo technique hai jo recursion ka use karke saare possible solutions ko systematically explore karta hai, ek decision tree ki tarah. Pattern: ek choice try karo, aage explore karo, agar dead-end mile to us choice ko undo (backtrack) karke agli choice try karo.",
  "sections": [
    {
      "heading": "Backtracking — Core Idea",
      "body": "\n      <ul>\n        <li>Backtracking me har step pe available choices me se ek pick karke aage recursively explore kiya jaata hai.</li>\n        <li>Pattern: <strong>Choose</strong> (ek option pick karo) → <strong>Explore</strong> (recursively aage badho us choice ke saath) → <strong>Un-choose / Backtrack</strong> (choice ko undo karo taaki agli option try ho sake).</li>\n        <li>Use tab hota hai jab problem me <em>saare</em> valid combinations/permutations/subsets nikalne ho, ya koi ek valid solution jo constraints satisfy kare (jaise N-Queens, Sudoku).</li>\n      </ul>",
      "note": "Backtracking = Recursion (topic 19) + \"undo state after exploring\". Bina undo ke ye plain recursion/DFS hai."
    },
    {
      "heading": "Backtracking Template",
      "code": "function backtrack(path, choices):\n    if isSolution(path):\n        result.push([...path])   // copy of current path\n        return                    // (ya continue explore, problem pe depend)\n\n    for choice in choices:\n        if not isValid(choice, path):   // invalid choice skip (dekho: Pruning, topic 21)\n            continue\n\n        path.push(choice)         // 1. Choose\n        backtrack(path, remainingChoices)   // 2. Explore\n        path.pop()                 // 3. Un-choose (backtrack)"
    },
    {
      "heading": "Complexity of Backtracking",
      "body": "\n      <ul>\n        <li>Worst-case time generally exponential hota hai (O(2^n) subsets ke liye, O(n!) permutations ke liye) — kyunki saare combinations explore ho rahe hote hain.</li>\n        <li>Space: O(depth of recursion tree) call stack ke liye, plus path/result store karne ki extra space.</li>\n      </ul>",
      "note": "Pruning (topic 21) is worst-case complexity ko asymptotically nahi badalta, lekin practical runtime bahut kam kar deta hai."
    },
    {
      "heading": "Common Use Cases",
      "body": "\n      <ul>\n        <li>Subsets / Power Set, Permutations, Combinations</li>\n        <li>N-Queens, Sudoku Solver, Rat in a Maze — constraint satisfaction problems</li>\n        <li>Combination Sum, Word Search (grid DFS + backtrack)</li>\n        <li>Generating valid parentheses, Palindrome Partitioning</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Subsets (Power Set)",
      "pseudocode": "result = []\nfunction backtrack(start, path):\n    result.push([...path])          // har state ek valid subset hai\n    for i in range(start, n):\n        path.push(nums[i])           // choose\n        backtrack(i + 1, path)       // explore\n        path.pop()                    // un-choose"
    },
    {
      "title": "Permutations",
      "pseudocode": "result = []\nfunction backtrack(path, used):\n    if path.length == nums.length:\n        result.push([...path])\n        return\n    for i in range(0, n):\n        if used[i]: continue          // already used\n        used[i] = true\n        path.push(nums[i])\n        backtrack(path, used)\n        path.pop()\n        used[i] = false"
    }
  ]
});
