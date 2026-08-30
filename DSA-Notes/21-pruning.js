// DSA-Notes/21-pruning.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "pruning",
  "num": 21,
  "emoji": "✂️",
  "title": "Pruning",
  "summary": "Pruning wo trick hai jisse recursion/backtracking tree ki ek poori branch ko explore kiye bina hi discard kar diya jaata hai, jab pehle se pata chal jaaye ki wahan se valid answer nahi milega. Isse bahut sa wasted work bach jaata hai — search space effectively chhota ho jaata hai.",
  "sections": [
    {
      "heading": "Pruning — Cutting Dead Branches Early",
      "body": "\n      <ul>\n        <li>Pruning ka matlab hai: recursion tree ki ek poori branch ko <strong>explore karne se pehle hi reject</strong> kar dena, jab already pata ho ki wahan se koi valid answer nahi aayega.</li>\n        <li>Bina pruning ke backtracking (topic 20) bhi kaafi slow ho sakta hai — pruning se unnecessary calls skip ho jaati hain.</li>\n        <li>Common pruning conditions: current partial state already invalid ho (jaise N-Queens me do queens same column/diagonal pe), current sum target se zyada ho chuka ho (Combination Sum), duplicate avoid karna ho (Subsets/Permutations with duplicates → sorted array + skip adjacent same element).</li>\n      </ul>",
      "note": "Pruning check hamesha recursive call se <em>pehle</em> lagao (\"if not valid: continue/return\"), taaki us invalid branch ke andar wasteful recursive calls hi na ho."
    },
    {
      "heading": "Pruning Template (inside Backtracking)",
      "code": "for choice in choices:\n    if not isPromising(choice, path):   // PRUNE — recursive call se pehle check\n        continue                          // ya break, agar choices sorted hain\n\n    path.push(choice)\n    backtrack(path, remainingChoices)\n    path.pop()"
    },
    {
      "heading": "Impact on Complexity",
      "body": "\n      <ul>\n        <li>Pruning worst-case asymptotic complexity ko generally nahi badalta (backtracking still exponential worst-case).</li>\n        <li>Lekin <strong>practical runtime</strong> bahut kam ho jaata hai kyunki dead branches jaldi discard ho jaati hain — jitni jaldi ek invalid state detect hoti hai, utni hi zyada recursive calls bachti hain.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Combination Sum (with Pruning)",
      "pseudocode": "result = []\nfunction backtrack(start, path, remaining):\n    if remaining == 0:\n        result.push([...path])\n        return\n    for i in range(start, n):\n        if candidates[i] > remaining:  // PRUNE — isse aage bhi sab bade honge (sorted array)\n            break\n        path.push(candidates[i])\n        backtrack(i, path, remaining - candidates[i])  // 'i' dobara — reuse allowed\n        path.pop()"
    },
    {
      "title": "N-Queens (Backtracking + Pruning)",
      "pseudocode": "function solve(row, cols, diag1, diag2, board):\n    if row == n:\n        result.push(render(board))\n        return\n    for col in range(0, n):\n        if cols.has(col) or diag1.has(row - col) or diag2.has(row + col):\n            continue                   // PRUNE — attack hoga, is column/diagonal ko skip karo\n        cols.add(col); diag1.add(row - col); diag2.add(row + col)\n        board[row] = col\n        solve(row + 1, cols, diag1, diag2, board)\n        cols.delete(col); diag1.delete(row - col); diag2.delete(row + col)  // backtrack"
    }
  ]
});
