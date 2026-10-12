// DSA-Notes/35-intervals.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "intervals",
  "num": 35,
  "emoji": "📅",
  "title": "Intervals — Overlap & Merge",
  "summary": "Interval problems [start, end] ranges ke saath hote hain (meetings, bookings, time slots). Core idea: intervals ko start ke hisaab se SORT karo — phir overlap sirf adjacent (last merged) interval se check karna padta hai. Overlap condition, merge intervals, insert interval, meeting rooms I aur interval intersections isi pattern se; sort ki wajah se time O(n log n).",
  "sections": [
    {
      "heading": "Interval Pattern kya hai?",
      "body": "\n      <ul>\n        <li>Interval = <code>[start, end]</code> — ek continuous range: meeting ka time, flight booking, task duration, IP range.</li>\n        <li>Common questions: <strong>overlap hai ya nahi</strong>, <strong>overlapping ko merge karna</strong>, naya interval <strong>insert karna</strong>, <strong>free slots</strong> dhundhna, <strong>minimum removals</strong> (greedy), <strong>max simultaneous</strong> (sweep line, topic 36), do lists ka <strong>intersection</strong>.</li>\n        <li><strong>Pehle clarify karo</strong>: intervals closed <code>[s, e]</code> hain ya half-open <code>[s, e)</code>? Touching intervals jaise <code>[1, 4]</code> aur <code>[4, 5]</code> overlap maane jaayenge ya nahi? Merge Intervals me merge hote hain; Meeting Rooms me nahi (4 pe ek khatam, doosri shuru ho sakti hai).</li>\n        <li>Input already sorted hai ya nahi — nahi ho to sabse pehla step sort.</li>\n      </ul>"
    },
    {
      "heading": "Overlap Condition",
      "code": "A = [a1, a2]    B = [b1, b2]\n\nOverlap  ⇔  a1 <= b2  AND  b1 <= a2            (closed intervals)\n         ⇔  max(a1, b1) <= min(a2, b2)          (overlap ka size = min(ends) - max(starts))\nHalf-open [s, e)  →  strict use karo:  a1 < b2  AND  b1 < a2\n\nCases (A fixed, B alag-alag jagah):\n 1) Disjoint     A:  |-----|                  A ke baad B shuru  (a2 < b1)\n                 B:            |-----|\n 2) Partial      A:  |-------|\n                 B:       |-------|           b1 <= a2  (overlap)\n 3) Contained    A:  |-----------|\n                 B:     |----|                B poora A ke andar\n 4) Touching     A=[1,4]  B=[4,6]             closed me overlap, half-open me nahi"
    },
    {
      "heading": "Sort by Start — Key Step",
      "body": "\n      <ul>\n        <li>Start ke hisaab se sort karne ke baad, agar current interval last merged interval se overlap nahi karta to aage ke koi bhi interval pichle wale se overlap nahi kar sakte — isliye sirf <strong>last merged</strong> se compare karna kaafi hai.</li>\n        <li>Cost: sorting <strong>O(n log n)</strong> poore algorithm pe dominate karti hai; baaki scan O(n).</li>\n        <li><strong>JS pitfall</strong> — <code>arr.sort()</code> bina comparator ke elements ko <em>string</em> maan ke sort karta hai: <code>[10, 9, 1, 2].sort()</code> → <code>[1, 10, 2, 9]</code>. Intervals ke liye hamesha <code>intervals.sort((a, b) =&gt; a[0] − b[0])</code>.</li>\n      </ul>"
    },
    {
      "heading": "Merge Intervals",
      "code": "function merge(intervals):\n    sort intervals by start\n    merged = [intervals[0]]\n    for i in range(1, n):\n        last = merged[merged.length - 1]\n        cur  = intervals[i]\n        if cur.start <= last.end:                     // overlap (touching bhi merge)\n            last.end = max(last.end, cur.end)         // max kyun? cur poora andar ho sakta hai\n        else:\n            merged.push(cur)                          // gap hai → naya interval\n    return merged\n\n// [[1,3],[2,6],[8,10],[15,18]]\n// sorted same. merged=[[1,3]]\n// [2,6]: 2 <= 3 → end = max(3,6)=6      → [[1,6]]\n// [8,10]: 8 > 6 → push                  → [[1,6],[8,10]]\n// [15,18]: 15 > 10 → push               → [[1,6],[8,10],[15,18]]\n//\n// [[1,4],[2,3]] → [[1,4]]   (end = max(4,3) — isliye max zaroori)\n// [[1,4],[4,5]] → [[1,5]]   (touching merge hote hain)",
      "note": "Input array ko mutate mat karo (interval objects ko directly edit karna) agar caller ko original chahiye — interval ka copy push karo."
    },
    {
      "heading": "Insert Interval (Sorted, Non-overlapping List)",
      "code": "function insert(intervals, newInterval):\n    result = []; i = 0; n = intervals.length\n\n    // 1. newInterval se POORA pehle wale (end < new.start) seedhe copy\n    while i < n and intervals[i].end < newInterval.start:\n        result.push(intervals[i]); i++\n\n    // 2. jo overlap karte hain unko newInterval me merge karte jao\n    while i < n and intervals[i].start <= newInterval.end:\n        newInterval.start = min(newInterval.start, intervals[i].start)\n        newInterval.end   = max(newInterval.end,   intervals[i].end)\n        i++\n    result.push(newInterval)\n\n    // 3. baaki (new.end se poora baad wale) copy\n    while i < n:\n        result.push(intervals[i]); i++\n    return result\n\n// [[1,3],[6,9]] + [2,5] → [[1,5],[6,9]]      Time O(n) (already sorted)"
    },
    {
      "heading": "Meeting Rooms I — Kya Saari Meetings Attend Ho Sakti Hain?",
      "code": "function canAttendAll(intervals):\n    sort intervals by start\n    for i in range(1, n):\n        if intervals[i].start < intervals[i-1].end:      // pichli abhi khatam nahi hui\n            return false                                 // overlap\n    return true\n\n// [[0,30],[5,10],[15,20]] → false  (5 < 30)\n// [[7,10],[2,4]]          → true\n// [[1,5],[5,8]]           → true   (5 < 5 false: touching allowed)",
      "note": "Sirf \"overlap hai ya nahi\" poochha ho to adjacent check kaafi hai. \"Kitne rooms chahiye\" poochha ho to ye kaafi nahi — Sweep Line (topic 36)."
    },
    {
      "heading": "Interval List Intersections (Two Pointers)",
      "code": "// A aur B dono sorted, apas me non-overlapping lists\nfunction intervalIntersection(A, B):\n    result = []; i = 0; j = 0\n    while i < A.length and j < B.length:\n        lo = max(A[i].start, B[j].start)\n        hi = min(A[i].end,   B[j].end)\n        if lo <= hi: result.push([lo, hi])        // common hissa\n        // jo interval pehle khatam hota hai wo aage kisi se overlap nahi karega\n        if A[i].end < B[j].end: i++\n        else:                   j++\n    return result\n\n// A = [[0,2],[5,10],[13,23],[24,25]]  B = [[1,5],[8,12],[15,24],[25,26]]\n// → [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]       Time O(m + n)",
      "note": "Two Pointer approach (topic 10) ka interval version: jo interval pehle khatam ho, usi ka pointer aage badhao."
    },
    {
      "heading": "Complexity & Common Pitfalls",
      "body": "\n      <ul>\n        <li><strong>Time</strong> — O(n log n) (sort) + O(n) (scan). Already sorted input me insert / intersection O(n) ya O(m + n).</li>\n        <li><strong>Space</strong> — O(n) output (merged list). Sort ka extra space language pe depend.</li>\n        <li>Pitfalls: <code>max(end)</code> bhoolna (contained interval), galat sort key, closed vs half-open ka confusion (<code>&lt;</code> vs <code>&lt;=</code>), JS ka default string-sort, input mutate kar dena, empty input (<code>intervals[0]</code> pe crash).</li>\n        <li>Next step: sirf merge nahi, \"ek saath kitne chal rahe hain\" poochha ho to Sweep Line (topic 36); \"minimum kitne hatao ki non-overlapping ho jaayein\" ho to Greedy (topic 37).</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Merge Intervals",
      "pseudocode": "function merge(intervals):\n    intervals.sort((a, b) => a[0] - b[0])\n    merged = [intervals[0]]\n    for i in range(1, intervals.length):\n        last = merged[merged.length - 1]\n        if intervals[i][0] <= last[1]:\n            last[1] = max(last[1], intervals[i][1])\n        else:\n            merged.push(intervals[i])\n    return merged"
    },
    {
      "title": "Insert Interval",
      "pseudocode": "function insert(intervals, newInterval):\n    result = []; i = 0\n    while i < intervals.length and intervals[i][1] < newInterval[0]:\n        result.push(intervals[i]); i++\n    while i < intervals.length and intervals[i][0] <= newInterval[1]:\n        newInterval = [min(newInterval[0], intervals[i][0]), max(newInterval[1], intervals[i][1])]\n        i++\n    result.push(newInterval)\n    while i < intervals.length:\n        result.push(intervals[i]); i++\n    return result"
    },
    {
      "title": "Meeting Rooms (Can Attend All Meetings?)",
      "pseudocode": "function canAttendMeetings(intervals):\n    intervals.sort((a, b) => a[0] - b[0])\n    for i in range(1, intervals.length):\n        if intervals[i][0] < intervals[i-1][1]: return false\n    return true"
    },
    {
      "title": "Interval List Intersections",
      "pseudocode": "function intervalIntersection(A, B):\n    result = []; i = 0; j = 0\n    while i < A.length and j < B.length:\n        lo = max(A[i][0], B[j][0])\n        hi = min(A[i][1], B[j][1])\n        if lo <= hi: result.push([lo, hi])\n        if A[i][1] < B[j][1]: i++\n        else: j++\n    return result"
    }
  ]
});
