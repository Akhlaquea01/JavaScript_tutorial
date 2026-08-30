// DSA-Notes/19-recursion.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "recursion",
  "num": 19,
  "emoji": "🔁",
  "title": "Recursion",
  "summary": "Recursion ek function hai jo khud ko call karta hai — problem ko chhote-chhote same-shape sub-problems me todta hai jab tak base case na aa jaaye. Har call apna khud ka stack frame use karta hai; base case hit hote hi stack unwind hona shuru hota hai.",
  "sections": [
    {
      "heading": "Recursion — Basics",
      "body": "\n      <ul>\n        <li><strong>Base Case</strong> — wo condition jahan recursion rukta hai (bina aage call kiye directly return). Base case ke bina recursion kabhi khatam nahi hoga → <em>Stack Overflow</em>.</li>\n        <li><strong>Recursive Case</strong> — function khud ko ek ya zyada baar call karta hai, ek <em>chhote/simpler</em> input ke saath, jab tak base case tak na pahunche.</li>\n        <li><strong>Call Stack</strong> — har recursive call ek naya stack frame banata hai (apne local variables ke saath). Jab base case hit hota hai, stack unwind hona shuru hota hai — har call apna result return karke pop ho jaata hai.</li>\n      </ul>",
      "note": "Rule of thumb: har recursive call input ko base case ke <em>kareeb</em> le jaana chahiye, warna infinite recursion ho jaayega."
    },
    {
      "heading": "Factorial — Simplest Example",
      "code": "function factorial(n):\n    if n <= 1:              // base case\n        return 1\n    return n * factorial(n - 1)   // recursive case\n\n// factorial(4)\n// = 4 * factorial(3)\n// = 4 * 3 * factorial(2)\n// = 4 * 3 * 2 * factorial(1)\n// = 4 * 3 * 2 * 1              (base case hit)\n// = 24"
    },
    {
      "heading": "Types of Recursion",
      "body": "\n      <ul>\n        <li><strong>Direct Recursion</strong> — function seedha khud ko call karta hai (jaise factorial).</li>\n        <li><strong>Indirect Recursion</strong> — A function B ko call karta hai, aur B wapas A ko call karta hai.</li>\n        <li><strong>Tail Recursion</strong> — recursive call function ka <em>last</em> statement hota hai, koi pending operation nahi bacha (jaise <code>n * factorial(n-1)</code> tail recursive NAHI hai kyunki multiply pending hai). JS engines generally tail-call optimization nahi karte, isliye deep tail recursion bhi stack overflow kar sakti hai.</li>\n        <li><strong>Tree Recursion</strong> — function ek se zyada baar khud ko call karta hai (jaise plain Fibonacci: <code>fib(n-1) + fib(n-2)</code>) — recursion tree banta hai, calls exponentially badh sakti hain.</li>\n      </ul>"
    },
    {
      "heading": "Fibonacci — Tree Recursion & Overlapping Subproblems",
      "code": "function fib(n):\n    if n <= 1: return n          // base case\n    return fib(n - 1) + fib(n - 2)   // 2 recursive calls → recursion tree\n\n// fib(5) same subproblems (jaise fib(2)) ko baar-baar recompute karta hai\n// → Time: O(2^n)   Space: O(n) (max recursion depth)",
      "note": "Fix: <strong>Memoization</strong> — pehle se compute kiye results ko cache (object/array) me store karo, dobara call aane par cache se return karo. Isse fib O(2^n) se O(n) ban jaata hai. Dekho: Problems/Recursion/fibMemo.js."
    },
    {
      "heading": "Recursion vs Iteration",
      "body": "\n      <table>\n        <tr><th></th><th>Recursion</th><th>Iteration</th></tr>\n        <tr><td>Readability</td><td>Tree/graph jaise branching problems ke liye zyada natural</td><td>Simple linear loops ke liye simpler</td></tr>\n        <tr><td>Space</td><td>O(depth) extra (call stack)</td><td>O(1) extra generally</td></tr>\n        <tr><td>Risk</td><td>Stack overflow (bahut deep recursion)</td><td>Koi stack limit nahi</td></tr>\n      </table>",
      "note": "Har recursive solution ko iterative (explicit stack ke saath) me convert kiya jaa sakta hai, lekin backtracking wale problems me recursion zyada readable hota hai — dekho: Backtracking (topic 20)."
    }
  ],
  "problems": [
    {
      "title": "Factorial (Direct Recursion)",
      "pseudocode": "function factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)"
    },
    {
      "title": "Fibonacci with Memoization",
      "pseudocode": "function fib(n, memo = {}):\n    if n <= 1: return n\n    if n in memo: return memo[n]\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]"
    }
  ]
});
