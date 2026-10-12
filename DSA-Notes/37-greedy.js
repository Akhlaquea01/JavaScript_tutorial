// DSA-Notes/37-greedy.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "greedy",
  "num": 37,
  "emoji": "🤑",
  "title": "Greedy Algorithms",
  "summary": "Greedy me har step pe locally best choice lete hain, use final maante hain (kabhi undo / backtrack nahi) — aur ummeed (proof) hoti hai ki ye local choices milke global optimum dengi. Tabhi kaam karta hai jab greedy-choice property + optimal substructure ho. Examples: Interval Scheduling (sort by end time), Fractional Knapsack (value/weight ratio), Coin Change (canonical coins pe sahi, warna fail). Greedy fast aur simple hota hai, par correctness ka proof asli challenge hai.",
  "sections": [
    {
      "heading": "Greedy — Idea",
      "body": "\n      <ul>\n        <li>Har step pe jo option <strong>us waqt sabse achha</strong> lage wahi chuno, use lock kar do; pichli choices dobara mat dekho (backtracking jaisa undo nahi).</li>\n        <li>Typical shape: <strong>sort karo + ek pass</strong> → Time aksar O(n log n), Space O(1) / O(n). Code chhota, par <strong>\"ye sahi kyun hai\"</strong> sochna mushkil.</li>\n        <li>Greedy hamesha sahi nahi hota. Galat jagah lagaya to answer suboptimal aata hai — isliye pehle <em>chhote counter-example</em> se test karo.</li>\n      </ul>"
    },
    {
      "heading": "Kab Kaam Karta Hai? (Do Properties)",
      "body": "\n      <ul>\n        <li><strong>Greedy-choice property</strong> — locally best choice kisi na kisi globally optimal solution ka hissa banti hai (is choice ko lene se optimal solution kho nahi jaata).</li>\n        <li><strong>Optimal substructure</strong> — choice lene ke baad bacha hua problem usi type ka chhota problem hai, aur uska optimal answer + hamari choice = poore ka optimal.</li>\n        <li>Agar sirf optimal substructure hai par greedy-choice property nahi → <strong>Dynamic Programming</strong> (jaise 0/1 knapsack, general coin change).</li>\n        <li><strong>Proof technique — exchange argument</strong>: maano koi optimal solution greedy se alag choice leta hai; uski pehli alag choice ko greedy choice se badal do — solution kharab nahi hota. To greedy bhi optimal hai.</li>\n      </ul>"
    },
    {
      "heading": "Greedy Kaise Pehchane?",
      "body": "\n      <ul>\n        <li>Wording: <strong>\"minimum number of …\"</strong>, <strong>\"maximum number of non-overlapping …\"</strong>, \"schedule / arrange to minimize …\", \"kya reach kar sakte ho\".</li>\n        <li>Data <strong>sort</strong> karne se problem saaf hoti ho aur ek simple rule (earliest finish, highest ratio, largest first, smallest first) dikhta ho.</li>\n        <li>Test: 3–4 size ka chhota example banao, brute force se answer nikalo, greedy rule se compare karo. Ek bhi mismatch → greedy nahi chalega.</li>\n        <li>Sort ka <strong>key</strong> sabse important decision hai (neeche interval scheduling me dekho: start / duration / end — sirf end sahi hai).</li>\n      </ul>",
      "code": "Greedy Template:\n\nsort candidates by <koi rule>             // sabse zaroori decision: kis key pe sort?\nresult = []\nfor item in candidates:\n    if item feasible hai (result ke saath)?:\n        result.add(item)                  // choice lock — kabhi wapas nahi\nreturn result"
    },
    {
      "heading": "Example 1: Interval Scheduling (Activity Selection)",
      "body": "\n      <ul>\n        <li>Problem: bahut saare intervals me se <strong>maximum kitne non-overlapping</strong> chun sakte ho?</li>\n        <li><strong>Greedy rule: end time ke hisaab se sort karo</strong>, sabse jaldi khatam hone wala lo, phir har agla interval jo uske end ke baad (ya barabar) shuru ho. Sabse jaldi khatam hone wala baaki sabke liye sabse zyada jagah chhodta hai.</li>\n        <li><strong>Galat rules (counter-examples)</strong>: <em>Earliest start</em> — <code>[1,10],[2,3],[4,5]</code>: [1,10] lene par sirf 1 interval, optimal 2 ([2,3],[4,5]). <em>Shortest duration</em> — <code>[1,5],[4,7],[6,10]</code>: [4,7] (sabse chhota) lene par dono dusre overlap → 1, optimal 2 ([1,5],[6,10]).</li>\n      </ul>",
      "code": "function maxNonOverlapping(intervals):\n    sort intervals by END time\n    count = 0; lastEnd = -infinity\n    for [s, e] in intervals:\n        if s >= lastEnd:              // pichle chune hue se overlap nahi (touching allowed)\n            count++\n            lastEnd = e\n    return count\n\n// [[1,3],[2,5],[4,6],[6,8],[5,7],[8,9]]\n// end se sorted: [1,3] [2,5] [4,6] [5,7] [6,8] [8,9]\n// [1,3] lo (lastEnd=3);  [2,5] 2<3 skip;  [4,6] 4>=3 lo (lastEnd=6);\n// [5,7] skip;  [6,8] 6>=6 lo (lastEnd=8);  [8,9] 8>=8 lo\n// → 4 intervals:  [1,3], [4,6], [6,8], [8,9]",
      "note": "<strong>Non-overlapping Intervals</strong> (minimum kitne intervals hatao) = <code>n − maxNonOverlapping</code>. Intervals ke basics: topic 35."
    },
    {
      "heading": "Example 2: Fractional Knapsack",
      "body": "\n      <ul>\n        <li>Bag ki capacity W, items (value, weight). <strong>Items ko todna allowed hai</strong> (fraction le sakte ho). Max total value?</li>\n        <li><strong>Greedy rule</strong>: value/weight ratio ke hisaab se descending sort karo, ratio sabse achha pehle lo; poora na aaye to jitna bache utna fraction.</li>\n      </ul>",
      "code": "function fractionalKnapsack(items, W):\n    sort items by (value / weight) DESCENDING\n    total = 0\n    for (value, weight) in items:\n        if W >= weight:\n            total += value; W -= weight            // poora le lo\n        else:\n            total += value * (W / weight)           // bacha hua fraction\n            break\n    return total\n\n// W = 50, items (value, weight): (60,10) ratio 6,  (100,20) ratio 5,  (120,30) ratio 4\n// 10 → 60;  20 → +100 (W left 20);  item3: 20/30 fraction → +80   → total 240",
      "note": "<strong>0/1 Knapsack</strong> (item todna allowed nahi) me yahi greedy fail ho jaata hai: upar wale example me ratio-greedy = 60 + 100 = <strong>160</strong> (teesra item 30 weight ka ab fit nahi), jabki optimal = 100 + 120 = <strong>220</strong>. Isliye 0/1 knapsack ke liye DP chahiye (repo: Problems/Techniques/DynamicProgramming/knapsack.js)."
    },
    {
      "heading": "Example 3: Coin Change — Greedy kab sahi, kab galat",
      "body": "\n      <ul>\n        <li><strong>Canonical coin systems</strong> (jaise 1, 5, 10, 25) me \"sabse bada coin jitna ho sake lo\" greedy minimum coins deta hai.</li>\n        <li><strong>Counter-example</strong> — coins <code>[1, 3, 4]</code>, amount <code>6</code>: greedy 4 + 1 + 1 = <strong>3 coins</strong>, optimal 3 + 3 = <strong>2 coins</strong>.</li>\n        <li>Kabhi-kabhi greedy answer hi nahi nikaal paata: coins <code>[5, 4]</code>, amount <code>8</code> → greedy 5 le leta hai, bacha 3 ban nahi sakta → fail; optimal 4 + 4.</li>\n        <li>General coin change (arbitrary coins) ke liye <strong>DP</strong> chahiye. Interview me pehle poochho: \"coins canonical hain?\"</li>\n      </ul>",
      "code": "function greedyCoinChange(coins, amount):          // sirf canonical coins ke liye sahi\n    sort coins DESCENDING\n    count = 0\n    for coin in coins:\n        count += floor(amount / coin)\n        amount = amount % coin\n    return amount == 0 ? count : -1\n\n// coins [25,10,5,1], 63 → 25+25+10+1+1+1 = 6 coins\n// coins [1,3,4], 6     → greedy 3 coins  (galat; sahi = 2)",
      "note": "Repo: Problems/Techniques/Greedy/greedyCoinChange.js (canonical coins ke liye)."
    },
    {
      "heading": "Greedy vs DP vs Backtracking",
      "body": "\n      <table>\n        <tr><th></th><th>Greedy</th><th>Dynamic Programming</th><th>Backtracking</th></tr>\n        <tr><td>Choices</td><td>Ek, irrevocable</td><td>Sab try, results yaad rakho</td><td>Sab try, undo karke</td></tr>\n        <tr><td>Subproblems</td><td>Overlap ki zaroorat nahi</td><td>Overlapping subproblems</td><td>Poora search tree</td></tr>\n        <tr><td>Speed</td><td>Sabse fast (aksar O(n log n))</td><td>Polynomial</td><td>Exponential</td></tr>\n        <tr><td>Correctness</td><td>Proof chahiye (har problem pe nahi chalta)</td><td>Sahi recurrence ho to hamesha</td><td>Hamesha (brute force)</td></tr>\n        <tr><td>Examples</td><td>Interval scheduling, Fractional knapsack, Huffman, Dijkstra</td><td>0/1 knapsack, general coin change, LIS</td><td>Permutations, N-Queens, Sudoku</td></tr>\n      </table>",
      "note": "Greedy fail ho to agla kadam DP (agar subproblems repeat hote hon) ya Backtracking + Pruning (topic 20–21)."
    },
    {
      "heading": "Classic Greedy Problems — Cheat Sheet",
      "body": "\n      <table>\n        <tr><th>Problem</th><th>Greedy rule</th></tr>\n        <tr><td>Activity Selection / Min removals to make intervals non-overlapping</td><td>End time se sort; jo overlap kare skip</td></tr>\n        <tr><td>Jump Game</td><td>Ab tak ka farthest reachable index track karo; <code>i &gt; farthest</code> ho to false</td></tr>\n        <tr><td>Assign Cookies</td><td>Dono sort; sabse chhoti cookie us sabse kam greedy bachche ko jise wo satisfy kar de</td></tr>\n        <tr><td>Gas Station</td><td>Total gas ≥ total cost ho to answer hai; running tank negative ho to start agle station se</td></tr>\n        <tr><td>Minimum Platforms / Meeting Rooms</td><td>Sort + sweep (topic 36)</td></tr>\n        <tr><td>Task Scheduler</td><td>Sabse frequent task ke hisaab se slots/idle gaps plan karo</td></tr>\n        <tr><td>Huffman Coding</td><td>Hamesha do sabse kam frequency wale nodes merge karo (min-heap)</td></tr>\n        <tr><td>Dijkstra / Prim / Kruskal</td><td>Graph pe greedy: sabse kam distance / weight wala next lo</td></tr>\n      </table>"
    }
  ],
  "problems": [
    {
      "title": "Non-overlapping Intervals (Minimum Removals)",
      "pseudocode": "function eraseOverlapIntervals(intervals):\n    intervals.sort((a, b) => a[1] - b[1])          // END time se sort\n    kept = 0; lastEnd = -infinity\n    for [s, e] in intervals:\n        if s >= lastEnd:\n            kept++; lastEnd = e\n    return intervals.length - kept                 // jo nahi rakhe wahi hataye\n\n// [[1,2],[2,3],[3,4],[1,3]] → 1  ([1,3] hatao)"
    },
    {
      "title": "Activity Selection (Chune hue Activities)",
      "pseudocode": "function activitySelection(activities):            // [start, end] pairs\n    sort activities by end time\n    chosen = []; lastEnd = -infinity\n    for [s, e] in activities:\n        if s >= lastEnd:\n            chosen.push([s, e]); lastEnd = e\n    return chosen"
    },
    {
      "title": "Fractional Knapsack",
      "pseudocode": "function fractionalKnapsack(items, W):             // items = [(value, weight)]\n    sort items by value/weight DESC\n    total = 0\n    for (v, w) in items:\n        if W >= w: total += v; W -= w\n        else: total += v * (W / w); break\n    return total"
    },
    {
      "title": "Jump Game",
      "pseudocode": "function canJump(nums):\n    farthest = 0\n    for i in range(nums.length):\n        if i > farthest: return false              // yahan tak pahunch hi nahi sakte\n        farthest = max(farthest, i + nums[i])\n    return true\n\n// [2,3,1,1,4] → true     [3,2,1,0,4] → false"
    },
    {
      "title": "Coin Change — Greedy fail ho to DP fallback",
      "pseudocode": "function coinChangeDP(coins, amount):             // minimum coins, kisi bhi coin system ke liye\n    dp = array of size amount + 1, filled with infinity\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a >= c:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] == infinity ? -1 : dp[amount]\n\n// coins [1,3,4], 6 → 2     coins [5,4], 8 → 2"
    }
  ]
});
