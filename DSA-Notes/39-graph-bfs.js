// DSA-Notes/39-graph-bfs.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "graph-bfs",
  "num": 39,
  "emoji": "🌐",
  "title": "Graph BFS (Breadth-First Search)",
  "summary": "BFS start vertex se nearest neighbors pehle, phir unke neighbors — layer by layer, queue ke saath (paani me ripple jaisa). Visited set zaroori (enqueue karte hi mark karo). Unweighted graph me BFS fewest-edges wala shortest path deta hai. Time O(V + E), Space O(V). Grid BFS, multi-source BFS (Rotting Oranges), connected components aur word-ladder jaise problems isi se.",
  "sections": [
    {
      "heading": "BFS — Idea",
      "body": "\n      <ul>\n        <li>Start vertex se shuru: pehle uske saare <strong>direct neighbors</strong> (distance 1), phir unke neighbors (distance 2) … — <strong>layer by layer</strong>.</li>\n        <li><strong>Queue (FIFO)</strong> + <strong>visited set</strong>. Queue front se vertex nikalo, uske unvisited neighbors ko visited mark karke queue ke peeche daalo.</li>\n        <li><strong>Shortest path (unweighted)</strong> — jis level pe vertex pehli baar mila wahi start se uska minimum edges ka distance hai, kyunki BFS paas wale vertices ko door wale se pehle process karta hai.</li>\n        <li>Tree ka level-order (topic 24) hi hai — bas graph me cycles hoti hain, isliye visited set add hota hai.</li>\n      </ul>"
    },
    {
      "heading": "BFS Template (Adjacency List)",
      "code": "function bfs(adj, start):\n    visited = Set([start])             // start ko pehle hi mark karo\n    queue = [start]\n    order = []\n    while queue not empty:\n        u = queue.popFront()\n        order.push(u)\n        for v in adj[u]:\n            if v not in visited:\n                visited.add(v)         // ENQUEUE karte hi mark (dequeue pe nahi)\n                queue.push(v)\n    return order",
      "note": "<strong>Visited kab mark karein?</strong> Enqueue ke waqt. Dequeue pe mark karoge to ek vertex queue me kai baar aa sakta hai (duplicates) aur kaam badh jaata hai. Enqueue pe mark karne se har vertex queue me exactly ek baar jaata hai. (Repo ka Problems/Graph/BFS.js yahi karta hai.)"
    },
    {
      "heading": "Dry Run",
      "code": "    0 ───── 1\n    │       │\n    2 ───── 3 ───── 4\nadj: 0:[1,2]  1:[0,3]  2:[0,3]  3:[1,2,4]  4:[3]\n\nstart = 0:  queue=[0] visited={0}\npop 0 → neighbors 1,2 → queue=[1,2]          dist: 0→0, 1→1, 2→1\npop 1 → 0 visited; 3 new → queue=[2,3]       dist: 3→2\npop 2 → 0, 3 visited → queue=[3]\npop 3 → 1,2 visited; 4 new → queue=[4]       dist: 4→3\npop 4 → done\n\nBFS order : 0 1 2 3 4\nDistances : 0:0  1:1  2:1  3:2  4:3"
    },
    {
      "heading": "Shortest Path + Path Reconstruction",
      "code": "function shortestPath(adj, start, target):\n    parent = Map({ start: null })       // parent map hi visited ka kaam bhi karta hai\n    queue = [start]\n    while queue not empty:\n        u = queue.popFront()\n        if u == target: break\n        for v in adj[u]:\n            if v not in parent:\n                parent[v] = u\n                queue.push(v)\n    if target not in parent: return null          // reachable nahi\n\n    path = []; x = target\n    while x is not null:                          // target se start tak parent follow karo\n        path.push(x); x = parent[x]\n    return reverse(path)\n\n// 0 → 4 : [0, 1, 3, 4]   (3 edges)",
      "note": "Sirf distance chahiye to <code>dist[v] = dist[u] + 1</code> kaafi hai. Level-by-level count ke liye tree wala size-snapshot loop bhi use kar sakte ho."
    },
    {
      "heading": "Disconnected Graph & Connected Components",
      "code": "function countComponents(n, adj):\n    visited = Set(); count = 0\n    for s in range(n):\n        if s not in visited:           // naya island mila\n            count++\n            bfs(adj, s, visited)       // is island ke saare vertices visited ho jaate hain\n    return count",
      "note": "Graph connected hone ki guarantee na ho to BFS / DFS ko <strong>har unvisited vertex se</strong> start karna padta hai."
    },
    {
      "heading": "BFS on Grid & Multi-Source BFS (Number of Islands, Rotting Oranges)",
      "body": "\n      <ul>\n        <li><strong>Grid BFS</strong> — queue me <code>(row, col)</code>; neighbors <code>dirs</code> array se; bounds + visited check. Maze me shortest path, number of islands (BFS version), flood fill.</li>\n        <li><strong>Multi-source BFS</strong> — saare sources ko <em>shuru me hi</em> queue me daal do (distance 0). Sab sources se saath-saath \"ripple\" failti hai. Use: Rotting Oranges, Walls and Gates, 01 Matrix, fire/infection spread.</li>\n        <li>Grid ko visited ke liye modify kar sakte ho (jaise '1' → '0'), par agar original chahiye to alag visited array rakho. Repo: Problems/Graph/numIslandsBFS.js.</li>\n      </ul>",
      "code": "function shortestPathGrid(grid, start, end):\n    rows = grid.length; cols = grid[0].length\n    queue = [(start.r, start.c, 0)]\n    visited = rows x cols matrix of false; visited[start.r][start.c] = true\n    while queue not empty:\n        (r, c, d) = queue.popFront()\n        if (r, c) == end: return d\n        for [dr, dc] in [[1,0], [-1,0], [0,1], [0,-1]]:\n            nr = r + dr; nc = c + dc\n            if inBounds(nr, nc) and grid[nr][nc] == open and not visited[nr][nc]:\n                visited[nr][nc] = true\n                queue.push((nr, nc, d + 1))\n    return -1"
    },
    {
      "heading": "Complexity",
      "body": "\n      <table>\n        <tr><th></th><th>Adjacency List</th><th>Adjacency Matrix</th><th>Grid (R × C)</th></tr>\n        <tr><td>Time</td><td><strong>O(V + E)</strong></td><td>O(V²)</td><td>O(R × C)</td></tr>\n        <tr><td>Space</td><td>O(V) (queue + visited)</td><td>O(V)</td><td>O(R × C) worst (queue + visited)</td></tr>\n      </table>",
      "note": "List me har vertex ek baar dequeue hota hai (O(V)) aur har edge ek (undirected me do) baar dekha jaata hai (O(E)). JS me <code>queue.shift()</code> O(n) hota hai — bade inputs me head pointer ya level-array approach (topic 24 ka tip) use karo."
    },
    {
      "heading": "BFS Kab Use Karein? (Shortest Path, Bipartite Check, Word Ladder)",
      "body": "\n      <ul>\n        <li><strong>Shortest path in unweighted graph</strong> / minimum number of steps, moves, transformations (Word Ladder, knight moves, sliding puzzle).</li>\n        <li>Level / distance-wise processing, \"nearest X\", <strong>multi-source spread</strong> (Rotting Oranges).</li>\n        <li><strong>Bipartite check</strong> (2-coloring: neighbors ko ulta color), connected components.</li>\n        <li>Edges ka <strong>weight alag-alag</strong> ho to BFS galat hai → Dijkstra (min-heap, topic 31 ka use). 0/1 weights ke liye 0-1 BFS (deque).</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "BFS Traversal of a Graph",
      "pseudocode": "function bfsOfGraph(V, adj):\n    visited = array of V false; visited[0] = true\n    queue = [0]; order = []\n    while queue not empty:\n        u = queue.popFront()\n        order.push(u)\n        for v in adj[u]:\n            if not visited[v]:\n                visited[v] = true\n                queue.push(v)\n    return order"
    },
    {
      "title": "Shortest Path in Unweighted Graph",
      "pseudocode": "function shortestDistance(adj, src, dest):\n    dist = Map({ src: 0 })\n    queue = [src]\n    while queue not empty:\n        u = queue.popFront()\n        if u == dest: return dist[u]\n        for v in adj[u]:\n            if v not in dist:\n                dist[v] = dist[u] + 1\n                queue.push(v)\n    return -1"
    },
    {
      "title": "Number of Islands (BFS)",
      "pseudocode": "function numIslands(grid):\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count++\n                grid[r][c] = '0'                 // visited mark\n                queue = [(r, c)]\n                while queue not empty:\n                    (cr, cc) = queue.popFront()\n                    for [dr, dc] in dirs:\n                        nr = cr + dr; nc = cc + dc\n                        if inBounds(nr, nc) and grid[nr][nc] == '1':\n                            grid[nr][nc] = '0'\n                            queue.push((nr, nc))\n    return count"
    },
    {
      "title": "Rotting Oranges (Multi-Source BFS)",
      "pseudocode": "function orangesRotting(grid):\n    queue = []; fresh = 0\n    for each cell (r, c):\n        if grid[r][c] == 2: queue.push((r, c))      // saare rotten oranges source\n        else if grid[r][c] == 1: fresh++\n    minutes = 0\n    while queue not empty and fresh > 0:\n        size = queue.length\n        for i in range(size):\n            (r, c) = queue.popFront()\n            for [dr, dc] in dirs:\n                nr = r + dr; nc = c + dc\n                if inBounds(nr, nc) and grid[nr][nc] == 1:\n                    grid[nr][nc] = 2; fresh--\n                    queue.push((nr, nc))\n        minutes++                                    // ek level = ek minute\n    return fresh == 0 ? minutes : -1\n\n// [[2,1,1],[1,1,0],[0,1,1]] → 4"
    },
    {
      "title": "Word Ladder (BFS on States)",
      "pseudocode": "function ladderLength(beginWord, endWord, wordList):\n    dict = Set(wordList)\n    queue = [(beginWord, 1)]; visited = Set([beginWord])\n    while queue not empty:\n        (word, steps) = queue.popFront()\n        if word == endWord: return steps\n        for i in range(word.length):\n            for ch in 'a'..'z':\n                nxt = word[0..i] + ch + word[i+1..]       // ek letter badlo\n                if nxt in dict and nxt not in visited:\n                    visited.add(nxt)\n                    queue.push((nxt, steps + 1))\n    return 0\n\n// hit → cog, [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"] → 5"
    }
  ]
});
