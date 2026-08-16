// DSA-Notes/16-stack.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "stack",
  "num": 16,
  "emoji": "📚",
  "title": "Stack + Monotonic Stack",
  "summary": "LIFO (Last In First Out) — sirf ek end (top) se insert/delete hota hai. Pehle basic stack (implementation, complexity, expression evaluation) cover karenge, fir Monotonic Stack — ek powerful extension jo next-greater/next-smaller type problems O(n) me solve karta hai.",
  "sections": [
    {
      "heading": "Basic Operations",
      "body": "\n      <ul>\n        <li><strong>push(x)</strong> — top pe naya element daalta hai.</li>\n        <li><strong>pop()</strong> — top se element nikalta hai aur return karta hai.</li>\n        <li><strong>peek() / top()</strong> — top element dekhata hai bina remove kiye.</li>\n        <li><strong>isEmpty()</strong> — stack khali hai ya nahi check karta hai.</li>\n        <li><strong>size()</strong> — stack me kitne elements hain, count return karta hai.</li>\n      </ul>"
    },
    {
      "heading": "Implementation — Array vs Linked List",
      "code": "class Stack:\n    constructor():\n        this.items = []\n\n    push(x):\n        this.items.push(x)          // array ke end me insert → O(1) amortized\n\n    pop():\n        return this.items.pop()     // array ke end se remove → O(1)\n\n    peek():\n        return this.items[this.items.length - 1]\n\n    isEmpty():\n        return this.items.length === 0\n\n    size():\n        return this.items.length",
      "note": "Array-based implementation simplest hai. Linked List se bhi bana sakte ho (head par push/pop karo) — tab bhi O(1) milega, aur fixed capacity ki tension nahi rehti. JS me array push/pop already O(1) hai isliye array hi kaafi hota hai."
    },
    {
      "heading": "Complexity (Basic Operations)",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Time</th></tr>\n        <tr><td>push</td><td>O(1)</td></tr>\n        <tr><td>pop</td><td>O(1)</td></tr>\n        <tr><td>peek / top</td><td>O(1)</td></tr>\n        <tr><td>isEmpty / size</td><td>O(1)</td></tr>\n        <tr><td>Search (kisi element ko dhundhna)</td><td>O(n)</td></tr>\n      </table>",
      "note": "Space → O(n) for n elements. Stack sirf top pe operate karta hai isliye push/pop/peek sab constant time hain — search ke liye poora traverse karna padta hai."
    },
    {
      "heading": "Use Cases",
      "body": "\n      <ul>\n        <li>Balanced Parentheses / Valid Expression check</li>\n        <li>Undo functionality (text editors, browsers)</li>\n        <li>Expression evaluation — Infix to Postfix, Postfix Evaluation</li>\n        <li>Function call stack (recursion internally stack hi use karta hai)</li>\n        <li>Browser history \"back\" button</li>\n        <li>DFS traversal (explicit stack ya recursion ke through)</li>\n      </ul>"
    },
    {
      "heading": "Expression Evaluation with Stack",
      "body": "\n      <ul>\n        <li><strong>Infix</strong> (a + b) → normal human-readable form, jisme operator operands ke beech me hota hai.</li>\n        <li><strong>Postfix</strong> (a b +) → operator operands ke BAAD aata hai. Koi parentheses ya precedence rules ki zaroorat nahi — isliye computer ke liye evaluate karna easy hai.</li>\n        <li><strong>Infix → Postfix</strong>: operators ko ek stack me hold karo. Jab tak stack ke top wala operator, current operator se higher/equal precedence ka hai, use pop karke output me daalte raho — phir current operator push karo.</li>\n        <li><strong>Postfix Evaluation</strong>: numbers milne pe push karo. Operator milte hi top ke 2 numbers pop karo, operation apply karo, result wapas push karo. End me stack me sirf ek hi answer bachega.</li>\n      </ul>"
    },
    {
      "heading": "Postfix Evaluation — Steps",
      "code": "stack = []\n\nfor token in expression:\n    if token is a number:\n        stack.push(token)\n    else:                          // token is an operator: +, -, *, /\n        b = stack.pop()\n        a = stack.pop()\n        stack.push(apply(token, a, b))\n\nreturn stack.pop()                 // final answer"
    },
    {
      "heading": "Monotonic Stack — Kya Hai?",
      "body": "\n      <ul>\n        <li>Ek stack jisme elements hamesha ek order me maintain hote hain — <strong>increasing</strong> ya <strong>decreasing</strong> (bottom se top tak).</li>\n        <li>Jab naya element aata hai jo is order ko break karta hai, to top se elements pop karte raho jab tak order wapas maintain na ho jaaye — fir naya element push karo.</li>\n        <li>Trick: stack me values ki bajaye <strong>indices</strong> store karte hain, taaki position bhi pata rahe.</li>\n      </ul>"
    },
    {
      "heading": "General Steps (Next Greater Element)",
      "code": "stack = []   // indices store karte hain\nresult = [-1] * n\n\nfor i in range(n):\n    while stack is not empty and arr[stack.top()] < arr[i]:\n        j = stack.pop()\n        result[j] = arr[i]   // arr[i] is Next Greater for index j\n    stack.push(i)"
    },
    {
      "heading": "Complexity (Monotonic Stack)",
      "body": "<ul><li>Time → <strong>O(n)</strong> (har element sirf ek baar push aur ek baar pop hota hai)</li><li>Space → <strong>O(n)</strong> (stack + result array)</li></ul>"
    },
    {
      "heading": "Use Cases (Monotonic Stack)",
      "body": "\n      <ul>\n        <li>Next Greater / Next Smaller Element (aur unke circular variants)</li>\n        <li>Daily Temperatures (kitne din baad warmer temperature aayega)</li>\n        <li>Largest Rectangle in Histogram</li>\n        <li>Trapping Rain Water (stack-based approach)</li>\n        <li>Stock Span Problem</li>\n      </ul>",
      "note": "Golden Rule: Jaha bhi 'next greater/smaller' ya 'nearest bigger/smaller on left/right' dikhe, wahan Monotonic Stack try karo."
    }
  ],
  "problems": [
    {
      "title": "Valid Parentheses",
      "pseudocode": "stack = []\npairs = { ')': '(', ']': '[', '}': '{' }\n\nfor ch in s:\n    if ch in '([{':\n        stack.push(ch)\n    else:\n        if stack is empty or stack.pop() != pairs[ch]:\n            return false\nreturn stack is empty"
    },
    {
      "title": "Min Stack (getMin in O(1))",
      "pseudocode": "mainStack = []\nminStack = []   // parallel stack, tracks minimum seen so far at each level\n\nfunction push(x):\n    mainStack.push(x)\n    if minStack is empty or x <= minStack.top():\n        minStack.push(x)\n    else:\n        minStack.push(minStack.top())   // duplicate current min so pop stays in sync\n\nfunction pop():\n    mainStack.pop()\n    minStack.pop()\n\nfunction getMin():\n    return minStack.top()"
    },
    {
      "title": "Evaluate Postfix / Reverse Polish Notation",
      "pseudocode": "stack = []\nfor token in tokens:\n    if token is a number:\n        stack.push(token)\n    else:\n        b = stack.pop()\n        a = stack.pop()\n        stack.push(apply(token, a, b))\nreturn stack.pop()"
    },
    {
      "title": "Next Greater Element",
      "pseudocode": "stack = []   // indices, decreasing order maintain karta hai\nresult = [-1] * n\nfor i in range(n):\n    while stack and arr[stack.top()] < arr[i]:\n        result[stack.pop()] = arr[i]\n    stack.push(i)\nreturn result"
    },
    {
      "title": "Daily Temperatures",
      "pseudocode": "stack = []   // indices\nanswer = [0] * n\nfor i in range(n):\n    while stack and temps[i] > temps[stack.top()]:\n        j = stack.pop()\n        answer[j] = i - j\n    stack.push(i)\nreturn answer"
    }
  ]
});
