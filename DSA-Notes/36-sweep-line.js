// DSA-Notes/36-sweep-line.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "sweep-line",
  "num": 36,
  "emoji": "🧹",
  "title": "Sweep Line (Meeting Rooms II)",
  "summary": "Sweep Line me intervals ko events me todte hain — start pe +1, end pe −1 — events ko time ke hisaab se sort karte hain aur ek imaginary line ko left se right sweep karte hue running count rakhte hain. Count ka maximum = ek saath kitne intervals chal rahe hain (minimum meeting rooms). Tie-break (same time pe end pehle) sabse common bug hai. Alternatives: do sorted arrays ya min-heap of end times.",
  "sections": [
    {
      "heading": "Sweep Line — Idea",
      "body": "\n      <ul>\n        <li>Ek imaginary vertical line time-axis par left se right chalti hai. Hum sirf <strong>\"interesting points\"</strong> (start / end times) par ruk kar state update karte hain.</li>\n        <li>Har interval <code>[s, e]</code> ko do events banao: <strong>(s, +1)</strong> \"ek aur shuru hua\" aur <strong>(e, −1)</strong> \"ek khatam hua\".</li>\n        <li>Events ko <strong>time ke hisaab se sort</strong> karo, line sweep karo, <code>active</code> counter me +1 / −1 add karte jao. Counter ka <strong>maximum</strong> = max overlap / concurrency.</li>\n        <li>Time <strong>O(n log n)</strong> (2n events ka sort), Space <strong>O(n)</strong>.</li>\n      </ul>",
      "code": "Meetings: [0,30], [5,10], [15,20]\n\ntime:   0    5    10   15   20   30\n        |------------------------|   A [0,30]\n             |-----|                 B [5,10]\n                       |-----|       C [15,20]\n\nEvents sorted : (0,+1) (5,+1) (10,-1) (15,+1) (20,-1) (30,-1)\nRunning count :   1      2      1       2       1       0\nMax = 2   →   kam se kam 2 meeting rooms chahiye"
    },
    {
      "heading": "Meeting Rooms II — Sweep Line Code",
      "code": "function minMeetingRooms(intervals):\n    events = []\n    for [s, e] in intervals:\n        events.push([s, +1])               // meeting shuru\n        events.push([e, -1])               // meeting khatam\n    // time asc; same time pe END (-1) pehle, START (+1) baad me\n    events.sort((a, b) => a[0] - b[0] || a[1] - b[1])\n\n    active = 0; best = 0\n    for [time, delta] in events:\n        active += delta\n        best = max(best, active)\n    return best\n\n// [[0,30],[5,10],[15,20]] → 2       [[7,10],[2,4]] → 1\n// [[1,5],[2,6],[3,7],[4,8]] → 4      [[1,5],[5,8]] → 1"
    },
    {
      "heading": "Tie-Breaking Rule (Sabse Common Bug)",
      "body": "\n      <ul>\n        <li>Agar ek meeting <code>5</code> pe khatam ho aur doosri <code>5</code> pe shuru ho (<code>[1,5]</code>, <code>[5,8]</code>) to kya ek hi room kaafi hai? Haan (half-open maan ke) — to same time pe <strong>END event pehle</strong> process hona chahiye (−1 pehle, +1 baad me).</li>\n        <li>Galat order (start pehle) me count 1 → 2 ho jaata hai aur answer <strong>2</strong> aata hai jabki sahi <strong>1</strong> hai.</li>\n        <li>Sort comparator: <code>(a, b) =&gt; a.time − b.time || a.delta − b.delta</code> (−1 &lt; +1, isliye end pehle aata hai).</li>\n        <li>Agar problem closed intervals maane (touching bhi overlap hai) to ulta — start pehle. <strong>Hamesha problem se confirm karo.</strong></li>\n      </ul>"
    },
    {
      "heading": "Alternative 1 — Do Sorted Arrays (Events ke bina)",
      "code": "function minMeetingRooms(intervals):\n    starts = sorted(all start times)\n    ends   = sorted(all end times)\n    rooms = 0; e = 0\n    for s in starts:\n        if s >= ends[e]:        // sabse jaldi khatam hone wali meeting is start se pehle khatam → room reuse\n            e++\n        else:\n            rooms++              // koi room free nahi → naya room\n    return rooms\n\n// [[0,30],[5,10],[15,20]]: starts [0,5,15], ends [10,20,30]\n// 0 → rooms 1;  5 (< 10) → rooms 2;  15 >= 10 → e=1 (reuse) → rooms 2"
    },
    {
      "heading": "Alternative 2 — Min-Heap of End Times",
      "code": "function minMeetingRooms(intervals):\n    sort intervals by start\n    heap = MinHeap()                    // abhi chal rahi meetings ke END times\n    best = 0\n    for [s, e] in intervals:\n        if heap not empty and heap.peek() <= s:\n            heap.pop()                  // sabse jaldi khatam hone wali meeting khatam ho chuki → room reuse\n        heap.push(e)\n        best = max(best, heap.size)     // heap size = abhi use me rooms\n    return best",
      "note": "Heap size = us waqt chal rahi meetings. Heap (topic 31) ka seedha use. Teeno tareeke O(n log n); heap wala tab useful hai jab rooms assign bhi karne ho (heap me room id store karo)."
    },
    {
      "heading": "Difference Array se Connection (Prefix Sum)",
      "body": "\n      <ul>\n        <li>Agar time / coordinates ek <strong>chhoti fixed range</strong> me hain (jaise 0..10<sup>5</sup>), to events ko sort karne ki jagah array me seedha count rakh sakte ho: <code>diff[start]++</code>, <code>diff[end]−−</code>, phir <strong>prefix sum</strong> = us waqt active intervals.</li>\n        <li>Ye Prefix Sum (topic 05) wahi idea hai. Sweep Line uska <em>compressed</em> version hai — sirf event points rakhta hai, isliye bade / sparse coordinates (jaise timestamps) me kaam aata hai.</li>\n      </ul>",
      "code": "diff = array of size maxTime + 2, all 0\nfor [s, e] in intervals:\n    diff[s] += 1\n    diff[e] -= 1                       // half-open [s, e)\n\nactive = 0; best = 0\nfor t in range(0, maxTime + 1):\n    active += diff[t]                  // prefix sum\n    best = max(best, active)"
    },
    {
      "heading": "Sweep Line kahan aur lagta hai?",
      "body": "\n      <table>\n        <tr><th>Problem</th><th>Events</th></tr>\n        <tr><td>Meeting Rooms II / Minimum Platforms</td><td>Start +1, End −1; max active</td></tr>\n        <tr><td>Max Concurrent Users / Max Overlapping Intervals</td><td>Login +1, Logout −1</td></tr>\n        <tr><td>Car Pooling</td><td>Pickup +passengers, Drop-off −passengers; kabhi capacity cross to nahi hui? (same location pe drop-off pehle)</td></tr>\n        <tr><td>Maximum Population Year</td><td>Birth +1, Death −1 (death year count nahi)</td></tr>\n        <tr><td>My Calendar III</td><td>Har booking ke start +1, end −1; max k-booking</td></tr>\n        <tr><td>The Skyline Problem (advanced)</td><td>Building start/end events + max-heap of heights</td></tr>\n      </table>"
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th>Approach</th><th>Time</th><th>Space</th></tr>\n        <tr><td>Events + sort (sweep line)</td><td>O(n log n)</td><td>O(n)</td></tr>\n        <tr><td>Do sorted arrays</td><td>O(n log n)</td><td>O(n)</td></tr>\n        <tr><td>Min-heap of end times</td><td>O(n log n)</td><td>O(n)</td></tr>\n        <tr><td>Difference array</td><td>O(n + T)  (T = time range)</td><td>O(T)</td></tr>\n      </table>"
    }
  ],
  "problems": [
    {
      "title": "Meeting Rooms II (Sweep Line)",
      "pseudocode": "function minMeetingRooms(intervals):\n    events = []\n    for [s, e] in intervals:\n        events.push([s, +1]); events.push([e, -1])\n    events.sort((a, b) => a[0] - b[0] || a[1] - b[1])      // end (-1) pehle\n    active = 0; best = 0\n    for [t, d] in events:\n        active += d\n        best = max(best, active)\n    return best"
    },
    {
      "title": "Meeting Rooms II (Min-Heap)",
      "pseudocode": "function minMeetingRooms(intervals):\n    intervals.sort((a, b) => a[0] - b[0])\n    heap = MinHeap(); best = 0\n    for [s, e] in intervals:\n        if heap not empty and heap.peek() <= s: heap.pop()\n        heap.push(e)\n        best = max(best, heap.size)\n    return best"
    },
    {
      "title": "Car Pooling",
      "pseudocode": "function carPooling(trips, capacity):          // trips[i] = [passengers, from, to]\n    events = []\n    for [n, from, to] in trips:\n        events.push([from, +n])                // pickup\n        events.push([to,   -n])                // drop-off\n    events.sort((a, b) => a[0] - b[0] || a[1] - b[1])      // same jagah pe drop-off (negative) pehle\n    onboard = 0\n    for [loc, delta] in events:\n        onboard += delta\n        if onboard > capacity: return false\n    return true\n\n// [[2,1,5],[3,3,7]], capacity 4 → false    capacity 5 → true"
    },
    {
      "title": "Maximum Population Year",
      "pseudocode": "function maximumPopulation(logs):               // logs[i] = [birth, death)  — death year count nahi\n    diff = array of size 101 (years 1950..2050)\n    for [b, d] in logs:\n        diff[b - 1950]++\n        diff[d - 1950]--\n    active = 0; best = 0; year = 1950\n    for i in range(0, 101):\n        active += diff[i]\n        if active > best: best = active; year = 1950 + i      // pehli (earliest) max year\n    return year\n\n// [[1993,1999],[2000,2010]] → 1993     [[1950,1961],[1960,1971],[1970,1981]] → 1960"
    }
  ]
});
