// DSA-Notes/40-graph-dfs.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "graph-dfs",
  "num": 40,
  "emoji": "🧗",
  "title": "Graph DFS (Depth-First Search)",
  "summary": "DFS ek raste pe jitna ho sake gehra jaata hai, dead-end pe wapas aakar (backtrack) agli branch try karta hai — recursion ya explicit stack se. Visited set zaroori. Time O(V + E), Space O(V). Connected components, cycle detection (undirected: parent tracking; directed: 3-state / recursion stack), path existence, flood fill aur number of islands isi se. Shortest path ke liye DFS nahi, BFS.",
  "sections": [
    {
      "heading": "DFS — Idea",
      "body": "\n      <ul>\n        <li>Start vertex se kisi ek neighbor ko chuno aur uske neighbor, phir uske neighbor … jab tak <strong>dead-end</strong> na aa jaaye. Phir <strong>backtrack</strong> karke pichle vertex ke agle unvisited neighbor pe jao.</li>\n        <li>Maze solve karne jaisa: ek raasta poora explore, phir dusra.</li>\n        <li><strong>Stack</strong> use hota hai — recursion ka call stack ya explicit stack. Saath me <strong>visited set</strong>.</li>\n        <li>Backtracking (topic 20) ka cousin: DFS = recursion + visited. Trees ka DFS (topic 23) isi ka special case jahan visited ki zaroorat nahi.</li>\n      </ul>"
    },
    {
      "heading": "Recursive DFS",
      "code": "function dfs(adj, start):\n    visited = Set()\n    order = []\n    function go(u):\n        visited.add(u)\n        order.push(u)\n        for v in adj[u]:\n            if v not in visited:\n                go(v)                  // gehre jao\n    go(start)\n    return order"
    },
    {
      "heading": "Iterative DFS (Explicit Stack)",
      "code": "function dfsIter(adj, start):\n    visited = Set(); stack = [start]; order = []\n    while stack not empty:\n        u = stack.pop()\n        if u in visited: continue          // pop pe check + mark\n        visited.add(u)\n        order.push(u)\n        // neighbors ulte order me push karo taaki pehla neighbor pehle pop ho\n        for v in reversed(adj[u]):\n            if v not in visited:\n                stack.push(v)\n    return order",
      "note": "Iterative DFS me visited <strong>pop ke waqt</strong> mark karo (BFS ki tarah push pe nahi) — warna true DFS order nahi rehta. JS me deep graph (~10,000+ depth) pe recursion stack overflow kar sakta hai, tab yahi version use karo. Repo: Problems/Graph/DFS.js."
    },
    {
      "heading": "Dry Run",
      "code": "adj: 0:[1,2]  1:[0,3]  2:[0,3]  3:[1,2,4]  4:[3]\n\ngo(0)            visited {0}            order: 0\n  go(1)          visited {0,1}          order: 0 1\n    0 visited → skip\n    go(3)        visited {0,1,3}        order: 0 1 3\n      1 visited → skip\n      go(2)      visited {0,1,3,2}      order: 0 1 3 2\n        0, 3 visited → return\n      go(4)      visited {...,4}        order: 0 1 3 2 4\n        3 visited → return\n  ... baaki saare neighbors visited → return\n\nDFS order : 0 1 3 2 4     (BFS order tha 0 1 2 3 4)"
    },
    {
      "heading": "Complexity",
      "body": "\n      <ul>\n        <li><strong>Time O(V + E)</strong> (adjacency list) — har vertex ek baar visit, har edge ek (undirected me do) baar dekhi. Adjacency matrix me O(V²).</li>\n        <li><strong>Space O(V)</strong> — visited set + recursion / explicit stack (worst case path jaisa graph me depth V).</li>\n        <li>Grid DFS: Time O(R × C), recursion depth worst O(R × C) — bade grid me stack overflow ka dhyan rakho.</li>\n      </ul>"
    },
    {
      "heading": "Connected Components (Count)",
      "code": "function countComponents(n, adj):\n    visited = Set(); count = 0\n    for s in range(n):\n        if s not in visited:\n            count++\n            dfs-from(s)                // is island ke saare vertices mark ho jaate hain\n    return count\n\n// n = 6, edges (0,1) (1,2) (3,4)   → components: {0,1,2}, {3,4}, {5}  → 3"
    },
    {
      "heading": "Cycle Detection",
      "body": "\n      <ul>\n        <li><strong>Undirected graph</strong> — DFS me <em>parent track</em> karo. Agar koi neighbor visited hai aur wo <strong>parent nahi</strong> hai → cycle (usi vertex pe doosre raaste se wapas aa gaye). Parent ko ignore karna zaroori, kyunki undirected edge u–v dono taraf hai.</li>\n        <li><strong>Directed graph</strong> — parent trick kaam nahi karta (a → b aur a → c → b diamond me cycle nahi hai). <strong>3 states</strong>: 0 = unvisited, 1 = \"visiting\" (abhi current DFS path par), 2 = done. Neighbor agar state 1 me mile (<strong>back edge</strong>) → cycle. State 2 wale se cycle nahi.</li>\n        <li>Directed cycle = Course Schedule problem (prerequisites me cycle ho to saare courses nahi ho sakte). Repo: Problems/Graph/hasCycle.js (recursion stack Set se).</li>\n      </ul>",
      "code": "// UNDIRECTED\nfunction hasCycleUndirected(n, adj):\n    visited = Set()\n    function go(u, parent):\n        visited.add(u)\n        for v in adj[u]:\n            if v == parent: continue            // aaya hua edge ignore\n            if v in visited: return true        // visited aur parent nahi → cycle\n            if go(v, u): return true\n        return false\n    for s in range(n):\n        if s not in visited and go(s, -1): return true\n    return false\n\n// DIRECTED — 3 colors\nfunction hasCycleDirected(n, adj):\n    state = array of n zeros                    // 0 unvisited, 1 visiting, 2 done\n    function go(u):\n        state[u] = 1                            // current path par\n        for v in adj[u]:\n            if state[v] == 1: return true       // back edge → cycle\n            if state[v] == 0 and go(v): return true\n        state[u] = 2                            // path se bahar, fully explored\n        return false\n    for s in range(n):\n        if state[s] == 0 and go(s): return true\n    return false"
    },
    {
      "heading": "DFS on Grid (Number of Islands / Flood Fill)",
      "code": "function numIslands(grid):\n    count = 0\n    function sink(r, c):\n        if not inBounds(r, c) or grid[r][c] != '1': return\n        grid[r][c] = '0'                        // visited mark (grid ko hi use kiya)\n        sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count++                         // naya island\n                sink(r, c)                      // poora island 0 kar do\n    return count\n\n// 1 1 0 0\n// 1 0 0 1      → 2 islands\n// 0 0 1 1",
      "note": "Repo: Problems/Graph/numIslandsDfs.js. Flood Fill bhi bilkul yahi hai — old color wale connected cells ko new color se rang do."
    },
    {
      "heading": "BFS vs DFS (Graph)",
      "body": "\n      <table>\n        <tr><th></th><th>BFS</th><th>DFS</th></tr>\n        <tr><td>Data structure</td><td>Queue</td><td>Stack / recursion</td></tr>\n        <tr><td>Exploration</td><td>Level by level (paas wale pehle)</td><td>Gehrai me pehle, phir backtrack</td></tr>\n        <tr><td>Shortest path (unweighted)</td><td><strong>Haan</strong></td><td>Nahi</td></tr>\n        <tr><td>Space</td><td>O(width of graph / queue)</td><td>O(depth / V)</td></tr>\n        <tr><td>Best for</td><td>Minimum steps, nearest, levels, multi-source spread</td><td>Cycle detection, components, path existence, all paths, topological sort, backtracking</td></tr>\n        <tr><td>Complexity</td><td>O(V + E)</td><td>O(V + E)</td></tr>\n      </table>",
      "note": "Dono saare reachable vertices visit karte hain. Sirf \"kya connected hai?\" / \"kitne islands?\" poochha ho to kuch bhi chalega; \"kam se kam kitne steps?\" ho to BFS."
    },
    {
      "heading": "Aage ka Roadmap (Graphs II Preview: Topological Sort, Dijkstra, Union-Find)",
      "body": "\n      <ul>\n        <li><strong>Topological Sort</strong> — DAG me dependency order (DFS post-order reverse, ya Kahn's algorithm BFS + in-degree). Course Schedule II.</li>\n        <li><strong>Weighted shortest path</strong> — Dijkstra (min-heap, topic 31), Bellman-Ford.</li>\n        <li><strong>Union-Find (DSU)</strong> — connectivity / cycle detection ka alternative, Kruskal MST.</li>\n        <li>Ye sirf preview hai — jab ye topics class me aayein, tab inke alag notes add kar lena.</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "DFS Traversal (Recursive + Iterative)",
      "pseudocode": "// Recursive\nfunction dfsRec(u, adj, visited, order):\n    visited.add(u); order.push(u)\n    for v in adj[u]:\n        if v not in visited: dfsRec(v, adj, visited, order)\n\n// Iterative\nfunction dfsIter(start, adj):\n    visited = Set(); stack = [start]; order = []\n    while stack not empty:\n        u = stack.pop()\n        if u in visited: continue\n        visited.add(u); order.push(u)\n        for v in reversed(adj[u]):\n            if v not in visited: stack.push(v)\n    return order"
    },
    {
      "title": "Number of Connected Components",
      "pseudocode": "function countComponents(n, edges):\n    adj = buildAdjList(n, edges, undirected)\n    visited = Set(); count = 0\n    for s in range(n):\n        if s not in visited:\n            count++\n            stack = [s]; visited.add(s)\n            while stack not empty:\n                u = stack.pop()\n                for v in adj[u]:\n                    if v not in visited:\n                        visited.add(v); stack.push(v)\n    return count"
    },
    {
      "title": "Number of Islands (DFS)",
      "pseudocode": "function numIslands(grid):\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count++\n                sink(r, c)\n    return count\n\nfunction sink(r, c):\n    if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1': return\n    grid[r][c] = '0'\n    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1)"
    },
    {
      "title": "Find if Path Exists in Graph",
      "pseudocode": "function validPath(n, edges, source, destination):\n    adj = buildAdjList(n, edges, undirected)\n    visited = Set()\n    function go(u):\n        if u == destination: return true\n        visited.add(u)\n        for v in adj[u]:\n            if v not in visited and go(v): return true\n        return false\n    return go(source)"
    },
    {
      "title": "Detect Cycle in Undirected Graph",
      "pseudocode": "function hasCycle(n, adj):\n    visited = Set()\n    function go(u, parent):\n        visited.add(u)\n        for v in adj[u]:\n            if v == parent: continue\n            if v in visited: return true\n            if go(v, u): return true\n        return false\n    for s in range(n):\n        if s not in visited and go(s, -1): return true\n    return false"
    },
    {
      "title": "Course Schedule (Cycle in Directed Graph)",
      "pseudocode": "function canFinish(numCourses, prerequisites):         // [a, b] : b pehle, phir a\n    adj = [[] for _ in range(numCourses)]\n    for [a, b] in prerequisites: adj[b].push(a)        // b → a\n    state = array of numCourses zeros                  // 0 unvisited, 1 visiting, 2 done\n\n    function hasCycle(u):\n        state[u] = 1\n        for v in adj[u]:\n            if state[v] == 1: return true\n            if state[v] == 0 and hasCycle(v): return true\n        state[u] = 2\n        return false\n\n    for c in range(numCourses):\n        if state[c] == 0 and hasCycle(c): return false\n    return true\n\n// (2, [[1,0]]) → true     (2, [[1,0],[0,1]]) → false"
    }
  ]
});
