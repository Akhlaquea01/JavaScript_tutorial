// DSA-Notes/17-queue-deque.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "queue-deque",
  "num": 17,
  "emoji": "📥",
  "title": "Queue, Deque & Windowed Processing",
  "summary": "FIFO (First In First Out) — ek end (rear) se insert, doosre end (front) se delete. Deque (Double-Ended Queue) dono ends se insert/delete allow karta hai, jo sliding window type problems ke liye bahut powerful hai.",
  "sections": [
    {
      "heading": "Basic Queue Operations",
      "body": "\n      <ul>\n        <li><strong>enqueue(x)</strong> — rear (peeche) se element daalta hai.</li>\n        <li><strong>dequeue()</strong> — front (aage) se element nikalta hai.</li>\n        <li><strong>front() / peek()</strong> — front element dekhata hai bina remove kiye.</li>\n        <li><strong>isEmpty()</strong> — queue khali hai ya nahi.</li>\n      </ul>",
      "note": "Plain array pe shift()/unshift() O(n) hota hai (sab elements shift karne padte hain) — O(1) ke liye linked list ya circular array use karo."
    },
    {
      "heading": "Implementation (Array-based Circular Queue)",
      "code": "class CircularQueue:\n    constructor(capacity):\n        this.items = new Array(capacity)\n        this.capacity = capacity\n        this.front = 0\n        this.size = 0\n\n    enqueue(x):\n        if this.size == this.capacity: throw \"Queue Full\"\n        rearIndex = (this.front + this.size) % this.capacity\n        this.items[rearIndex] = x\n        this.size++\n\n    dequeue():\n        if this.isEmpty(): throw \"Queue Empty\"\n        x = this.items[this.front]\n        this.front = (this.front + 1) % this.capacity   // wrap around\n        this.size--\n        return x\n\n    isEmpty():\n        return this.size == 0",
      "note": "% (mod) capacity se hi 'wrap around' hota hai — front/rear array ke end tak pahunch ke wapas index 0 pe chale jaate hain, bina kisi space waste kiye."
    },
    {
      "heading": "Complexity (Basic Operations)",
      "body": "\n      <table>\n        <tr><th>Operation</th><th>Time</th></tr>\n        <tr><td>enqueue</td><td>O(1)</td></tr>\n        <tr><td>dequeue</td><td>O(1)</td></tr>\n        <tr><td>front / peek</td><td>O(1)</td></tr>\n        <tr><td>isEmpty</td><td>O(1)</td></tr>\n      </table>",
      "note": "Circular Queue ya Linked List based implementation se hi ye sab O(1) milta hai — plain array pe dequeue (shift) O(n) hoga."
    },
    {
      "heading": "Queue Types",
      "body": "\n      <ul>\n        <li><strong>Simple Queue</strong> — basic FIFO, sirf ek taraf se enqueue, doosri taraf se dequeue.</li>\n        <li><strong>Circular Queue</strong> — fixed size array, end pe pahunch ke wapas start se wrap around ho jaata hai. Space waste nahi hota.</li>\n        <li><strong>Priority Queue</strong> — Heap se implement hoti hai, highest/lowest priority element pehle nikalta hai (FIFO nahi).</li>\n        <li><strong>Deque (Double-Ended Queue)</strong> — dono ends (front aur rear) se insert/delete O(1) me ho sakta hai.</li>\n      </ul>"
    },
    {
      "heading": "Deque — Windowed Processing ke liye kyun powerful?",
      "body": "\n      <ul>\n        <li>Deque me indices store karte hain, aur ek <strong>monotonic order</strong> maintain karte hain (Monotonic Stack jaisa hi idea, bas dono ends se).</li>\n        <li>Naya element aane par, <strong>back</strong> se wo saare elements pop karo jo naye element se chhote hain (Sliding Window Maximum ke liye) — wo kabhi max nahi ban sakte jab tak naya element window me hai.</li>\n        <li><strong>front</strong> check karo — agar wo index current window ke bahar nikal gaya hai, to use pop karo.</li>\n        <li>Front hamesha current window ka answer (max/min) hota hai.</li>\n      </ul>"
    },
    {
      "heading": "General Steps (Sliding Window Maximum)",
      "code": "deque = []   // indices store karta hai, front→back DECREASING order me (max ke liye)\nresult = []\n\nfor i in range(n):\n    // window ke bahar wale front elements nikalo\n    while deque and deque.front() <= i - k:\n        deque.popFront()\n\n    // back se chhote elements nikalo (wo kabhi max nahi banenge)\n    while deque and arr[deque.back()] <= arr[i]:\n        deque.popBack()\n\n    deque.pushBack(i)\n\n    if i >= k - 1:\n        result.push(arr[deque.front()])"
    },
    {
      "heading": "Complexity (Windowed Processing)",
      "body": "<ul><li>Time → <strong>O(n)</strong> (har index max ek baar push aur ek baar pop hota hai)</li><li>Space → <strong>O(k)</strong> (deque me max window size jitne indices)</li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "\n      <ul>\n        <li>Sliding Window Maximum / Minimum</li>\n        <li>First Negative Number in every window of size K</li>\n        <li>BFS Traversal (Tree/Graph) — simple queue use karta hai</li>\n        <li>Task Scheduling, Order Processing</li>\n        <li>LRU Cache jaisi structures me recently-used order maintain karna (Doubly Linked List + HashMap combo)</li>\n      </ul>",
      "note": "Two Pointer/Sliding Window vs Monotonic Deque: Jab sirf sum/count track karna ho to plain Sliding Window (two pointer) kaafi hai. Jab window ka MAX/MIN chahiye O(1) me har step pe, tab Monotonic Deque use karo."
    }
  ],
  "problems": [
    {
      "title": "Sliding Window Maximum",
      "pseudocode": "deque = []   // indices, decreasing order\nresult = []\nfor i in range(n):\n    while deque and deque.front() <= i - k:\n        deque.popFront()\n    while deque and arr[deque.back()] <= arr[i]:\n        deque.popBack()\n    deque.pushBack(i)\n    if i >= k - 1:\n        result.push(arr[deque.front()])\nreturn result"
    },
    {
      "title": "Implement Queue using Two Stacks",
      "pseudocode": "inStack = [], outStack = []\n\nfunction enqueue(x):\n    inStack.push(x)\n\nfunction dequeue():\n    if outStack is empty:\n        while inStack is not empty:\n            outStack.push(inStack.pop())\n    return outStack.pop()"
    },
    {
      "title": "Implement Stack using a Queue",
      "pseudocode": "queue = []\n\nfunction push(x):\n    queue.push(x)\n    // naye element ko front tak rotate karo — isse push O(n) ban jaata hai, pop O(1)\n    for i in range(queue.length - 1):\n        queue.push(queue.popFront())\n\nfunction pop():\n    return queue.popFront()\n\nfunction top():\n    return queue.front()"
    },
    {
      "title": "First Negative Number in Every Window of Size K",
      "pseudocode": "deque = []   // sirf negative numbers ke indices store karta hai\nresult = []\nfor i in range(n):\n    if deque and deque.front() <= i - k:\n        deque.popFront()\n    if arr[i] < 0:\n        deque.pushBack(i)\n    if i >= k - 1:\n        result.push(deque is empty ? 0 : arr[deque.front()])\nreturn result"
    }
  ]
});
