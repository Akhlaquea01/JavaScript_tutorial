// DSA-Notes/38-graph-basics.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "graph-basics",
  "num": 38,
  "emoji": "🕸️",
  "title": "Graphs — Basics & Representation",
  "summary": "Graph = vertices (nodes) + edges (connections). Tree ka generalization: cycles, multiple paths aur disconnected parts ho sakte hain. Directed / undirected, weighted / unweighted types hote hain. Representation: Adjacency Matrix (V×V, O(1) edge check, O(V²) space) aur Adjacency List (O(V+E) space, sparse graphs ke liye default). Grid aur puzzle states \"implicit graphs\" hain.",
  "sections": [
    {
      "heading": "Graph kya hai?",
      "body": "\n      <ul>\n        <li><strong>G = (V, E)</strong> — V vertices (nodes) ka set, E edges (do vertices ke beech link) ka set.</li>\n        <li>Tree ek special graph hai (connected + acyclic). Graph me <strong>cycle ho sakti hai</strong>, do nodes ke beech <strong>multiple paths</strong> ho sakte hain, aur wo <strong>disconnected</strong> bhi ho sakta hai (alag-alag islands).</li>\n        <li><strong>Real life</strong> — social network (log = nodes, friendship = edges), maps (cities / roads), web pages aur links, course prerequisites (dependency), flights, network routers, recommendation.</li>\n        <li>Interview me graph problems ka pehla kadam: <em>nodes kya hain? edges kya hain?</em> — kai baar graph chhupa hota hai (grid, words, states).</li>\n      </ul>"
    },
    {
      "heading": "Graph Terminology",
      "body": "\n      <table>\n        <tr><th>Term</th><th>Matlab</th></tr>\n        <tr><td><strong>Directed / Undirected</strong></td><td>Directed: edge u → v ek hi direction (Twitter follow). Undirected: u — v dono taraf (Facebook friend).</td></tr>\n        <tr><td><strong>Weighted / Unweighted</strong></td><td>Weighted: edge pe cost / distance / time. Unweighted: sab edges barabar (1).</td></tr>\n        <tr><td><strong>Neighbors / Adjacent</strong></td><td>Jo vertices ek edge se seedhe jude hain.</td></tr>\n        <tr><td><strong>Degree</strong></td><td>Vertex se jude edges ki ginti. Directed me <em>in-degree</em> (aane wale) aur <em>out-degree</em> (jaane wale).</td></tr>\n        <tr><td><strong>Path</strong></td><td>Vertices ka sequence jisme har agla pichle ka neighbor ho.</td></tr>\n        <tr><td><strong>Cycle</strong></td><td>Path jo usi vertex pe wapas aa jaaye.</td></tr>\n        <tr><td><strong>Connected</strong></td><td>Har vertex se har vertex tak path (undirected). <strong>Connected component</strong> = ek connected island.</td></tr>\n        <tr><td><strong>DAG</strong></td><td>Directed Acyclic Graph — directed aur koi cycle nahi (task dependencies, topological order).</td></tr>\n        <tr><td><strong>Self-loop / Multi-edge</strong></td><td>Self-loop: u → u. Multi-edge: u, v ke beech ek se zyada edges.</td></tr>\n        <tr><td><strong>Sparse / Dense</strong></td><td>Sparse: E ≈ V (kam edges). Dense: E ≈ V².</td></tr>\n      </table>",
      "note": "Useful facts: undirected graph me <strong>sum of degrees = 2E</strong>. Simple undirected graph me max edges = <strong>V(V−1)/2</strong>, directed me <strong>V(V−1)</strong>. Tree = connected graph with exactly <strong>V − 1</strong> edges."
    },
    {
      "heading": "Example Graph",
      "code": "Undirected graph, V = 5 (vertices 0..4), E = 5\n\n    0 ───── 1\n    │       │\n    2 ───── 3 ───── 4\n\nEdges: (0,1) (0,2) (1,3) (2,3) (3,4)"
    },
    {
      "heading": "Representation 1: Adjacency Matrix",
      "body": "\n      <ul>\n        <li>V × V ka 2D matrix; <code>matrix[u][v] = 1</code> (ya edge ka weight) agar u → v edge hai, warna 0 (weighted me \"no edge\" ke liye <code>infinity</code> bhi use hota hai).</li>\n        <li>Undirected graph me matrix <strong>symmetric</strong> hota hai (<code>matrix[u][v] == matrix[v][u]</code>).</li>\n        <li><strong>Edge check O(1)</strong>, add / remove edge O(1). Neighbors dhundhna <strong>O(V)</strong> (poori row scan). Space <strong>O(V²)</strong> — kam edges hon tab bhi.</li>\n        <li>Dense graphs, chhote V, aur Floyd–Warshall jaise algorithms ke liye theek.</li>\n      </ul>",
      "code": "        0  1  2  3  4\n   0  [ 0, 1, 1, 0, 0 ]\n   1  [ 1, 0, 0, 1, 0 ]\n   2  [ 1, 0, 0, 1, 0 ]\n   3  [ 0, 1, 1, 0, 1 ]\n   4  [ 0, 0, 0, 1, 0 ]\n\nmatrix = array of V arrays, each filled with 0\nfor (u, v) in edges:\n    matrix[u][v] = 1\n    matrix[v][u] = 1          // undirected; directed me sirf pehli line",
      "note": "Repo: Problems/Graph/GraphAdjacencyMatrix.js (directed matrix based graph)."
    },
    {
      "heading": "Representation 2: Adjacency List",
      "body": "\n      <ul>\n        <li>Har vertex ke saath uske <strong>neighbors ki list</strong>. JS me array of arrays (vertices 0..n−1) ya Map / object (string / arbitrary labels).</li>\n        <li>Space <strong>O(V + E)</strong>. Neighbors iterate karna <strong>O(degree)</strong> — BFS / DFS ke liye ideal. Edge <code>(u, v)</code> exist karta hai ya nahi check: O(degree(u)) (Set use karo to O(1)).</li>\n        <li>Weighted graph me list me <code>[neighbor, weight]</code> pairs.</li>\n        <li><strong>Zyada-tar interview graph problems</strong> (sparse graphs) me adjacency list hi default hai.</li>\n      </ul>",
      "code": "adj[0] = [1, 2]\nadj[1] = [0, 3]\nadj[2] = [0, 3]\nadj[3] = [1, 2, 4]\nadj[4] = [3]\n\nadj = array of V empty lists\nfor (u, v) in edges:\n    adj[u].push(v)\n    adj[v].push(u)            // undirected; directed me sirf adj[u].push(v)\n\n// Weighted: adj[u].push([v, weight])",
      "note": "Repo: Problems/Graph/Graph.js (adjacency list, addVertex / addEdge / removeEdge / removeVertex)."
    },
    {
      "heading": "Matrix vs List vs Edge List",
      "body": "\n      <table>\n        <tr><th></th><th>Adjacency Matrix</th><th>Adjacency List</th><th>Edge List</th></tr>\n        <tr><td>Space</td><td>O(V²)</td><td>O(V + E)</td><td>O(E)</td></tr>\n        <tr><td>Edge u–v exists?</td><td><strong>O(1)</strong></td><td>O(degree(u))</td><td>O(E)</td></tr>\n        <tr><td>Saare neighbors of u</td><td>O(V)</td><td><strong>O(degree(u))</strong></td><td>O(E)</td></tr>\n        <tr><td>Add edge</td><td>O(1)</td><td>O(1)</td><td>O(1)</td></tr>\n        <tr><td>Full traversal (BFS / DFS)</td><td>O(V²)</td><td><strong>O(V + E)</strong></td><td>Awkward</td></tr>\n        <tr><td>Best for</td><td>Dense graph, chhota V, frequent edge checks</td><td>Sparse graph, traversals</td><td>Input format; Kruskal (edges sort)</td></tr>\n      </table>"
    },
    {
      "heading": "Input se Graph Banana (Edge List → Adjacency List)",
      "code": "function buildGraph(n, edges, directed = false):\n    adj = array of n empty lists          // vertices 0..n-1\n    for [u, v] in edges:\n        adj[u].push(v)\n        if not directed: adj[v].push(u)\n    return adj\n\n// Dhyan do:\n//  - Vertices 1-indexed hon to size n + 1 rakho (ya u-1, v-1)\n//  - Labels string hon (city names) to Map<label, list> use karo\n//  - Course Schedule: prerequisites [a, b] = \"b pehle, a baad me\" → edge b → a (directed)\n//  - Disconnected graph ho sakta hai → traversal sab vertices se start karna padega"
    },
    {
      "heading": "Implicit Graphs — Grid & State Graphs",
      "body": "\n      <ul>\n        <li>Kai problems me graph explicit nahi diya hota. <strong>Grid</strong>: har cell ek vertex, 4 (ya 8) direction ke cells neighbors. Edge list banane ki zaroorat nahi — neighbors on-the-fly nikalo.</li>\n        <li><strong>Word Ladder</strong>: har word ek node, ek letter badal ke ban jaane wale words neighbors. <strong>Puzzles / states</strong>: har board configuration ek node, ek move = edge.</li>\n        <li>Grid me hamesha <strong>bounds check</strong> aur <strong>visited</strong> (alag matrix ya grid me hi mark) yaad rakho.</li>\n      </ul>",
      "code": "dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]        // neeche, upar, right, left\n\nfor [dr, dc] in dirs:\n    nr = r + dr; nc = c + dc\n    if nr >= 0 and nr < rows and nc >= 0 and nc < cols:     // bounds\n        // (nr, nc) cell (r, c) ka neighbor hai"
    },
    {
      "heading": "Graph vs Tree",
      "body": "\n      <table>\n        <tr><th></th><th>Tree</th><th>Graph</th></tr>\n        <tr><td>Root</td><td>Ek hi root</td><td>Zaroori nahi</td></tr>\n        <tr><td>Cycle</td><td>Nahi</td><td>Ho sakti hai</td></tr>\n        <tr><td>Paths between 2 nodes</td><td>Exactly 1</td><td>Ek ya zyada (ya koi nahi)</td></tr>\n        <tr><td>Edges</td><td>V − 1</td><td>Kuch bhi (0 se V(V−1)/2 tak)</td></tr>\n        <tr><td>Traversal me visited set</td><td>Zaroorat nahi</td><td><strong>Zaroori</strong> — warna cycle me infinite loop</td></tr>\n      </table>",
      "note": "Yaad rakhne wali baat: <strong>Tree traversal + visited set = Graph traversal</strong>. Isiliye BFS / DFS (topic 39 / 40) trees ke BFS / DFS ka hi extension hain."
    }
  ],
  "problems": [
    {
      "title": "Build Adjacency List from Edge List",
      "pseudocode": "function buildAdjList(n, edges, directed):\n    adj = [[] for _ in range(n)]\n    for [u, v] in edges:\n        adj[u].push(v)\n        if not directed: adj[v].push(u)\n    return adj\n\n// n = 5, edges = [[0,1],[0,2],[1,3],[2,3],[3,4]]\n// → [[1,2],[0,3],[0,3],[1,2,4],[3]]"
    },
    {
      "title": "Adjacency List ↔ Adjacency Matrix",
      "pseudocode": "function listToMatrix(adj):\n    n = adj.length\n    matrix = n x n filled with 0\n    for u in range(n):\n        for v in adj[u]:\n            matrix[u][v] = 1\n    return matrix\n\nfunction matrixToList(matrix):\n    n = matrix.length\n    adj = [[] for _ in range(n)]\n    for u in range(n):\n        for v in range(n):\n            if matrix[u][v] == 1: adj[u].push(v)\n    return adj"
    },
    {
      "title": "Find the Town Judge (In-degree / Out-degree)",
      "pseudocode": "function findJudge(n, trust):                 // trust[i] = [a, b] : a, b pe trust karta hai\n    score = array of size n + 1, filled with 0\n    for [a, b] in trust:\n        score[a]--                            // a kisi ko trust karta hai (out-degree)\n        score[b]++                            // b ko trust mila (in-degree)\n    for person in range(1, n + 1):\n        if score[person] == n - 1: return person     // sab trust karte hain, ye kisi ko nahi\n    return -1\n\n// n = 3, trust = [[1,3],[2,3]] → 3"
    }
  ]
});
