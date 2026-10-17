// Graph DFS (Depth-First Search) — learn-first format. Shape is documented at the top of 00-meta.js.
// Uses DSA.graphKit from 38-graph-basics.js.
(function () {
  const kit = window.DSA.graphKit;
  const list = (a) => a.join(", ");

  const DFS_CODE = {
    fn: "DFS",
    lines: [
      `function DFS(n, edges, start) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      [`  const visited = new Array(n).fill(false);`, "Which nodes have we been to? Without this a cycle would trap us forever.", "init"],
      `  const order = [];`,
      `  function go(u) {`,
      [`    visited[u] = true;`, "Arrive at u: mark it visited...", "visit"],
      [`    order.push(u);`, "...and visit it.", "visit"],
      [`    for (const v of adj[u]) {`, "Look at u's neighbours one at a time.", "scan"],
      [`      if (!visited[v]) go(v);`, "A neighbour we have not been to? **Go deeper** into it straight away, before looking at u's other neighbours.", "recurse"],
      `    }`,
      [`  }`, "u has no unvisited neighbours left: the function returns, which means we **backtrack** to the node that called us.", "back"],
      `  go(start);`,
      [`  return order;`, "", "done"],
      `}`
    ]
  };

  const ISLANDS_CODE = {
    fn: "numIslands",
    lines: [
      `function numIslands(layout) {`,
      [`  const grid = layout.split(",").map((row) => row.split(""));`, "A copy of the grid as arrays of characters: \"1\" = land, \"0\" = water."],
      `  const rows = grid.length, cols = grid[0].length;`,
      `  let count = 0;`,
      `  function sink(r, c) {`,
      [`    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;`, "Outside the grid, water, or already sunk: nothing to do. This is the **stop condition**.", "guard"],
      [`    grid[r][c] = "0";`, "Sink the land cell. This also works as the **visited** mark.", "sink"],
      [`    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);`, "Spread to the four neighbours (down, up, right, left): DFS on a grid.", "spread"],
      `  }`,
      `  for (let r = 0; r < rows; r++) {`,
      `    for (let c = 0; c < cols; c++) {`,
      [`      if (grid[r][c] === "1") {`, "Unvisited land: we have found an island we have not counted.", "count"],
      [`        count++;`, "Count it...", "count"],
      [`        sink(r, c);`, "...and sink the **whole** island so it is not counted again.", "count"],
      `      }`,
      `    }`,
      `  }`,
      `  return count;`,
      `}`
    ]
  };

  const CYCLE_CODE = {
    fn: "HAS_CYCLE",
    lines: [
      `function HAS_CYCLE(n, edges) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) adj[u].push(v);`,
      [`  const state = new Array(n).fill(0);`, "Three states: **0** = not seen yet, **1** = on the path we are walking right now, **2** = completely finished.", "init"],
      `  function go(u) {`,
      [`    state[u] = 1;`, "u joins the current path.", "enter"],
      [`    for (const v of adj[u]) {`, "Follow each arrow out of u.", "scan"],
      [`      if (state[v] === 1) return true;`, "The arrow points back to a node on our **current path**: we went around in a circle. A cycle!", "cycle"],
      [`      if (state[v] === 0 && go(v)) return true;`, "Never seen: explore it. (A finished node, state 2, is safe to skip.)", "recurse"],
      `    }`,
      [`    state[u] = 2;`, "Everything reachable from u is explored and no cycle was found: u leaves the path.", "leave"],
      `    return false;`,
      `  }`,
      `  for (let s = 0; s < n; s++) {`,
      `    if (state[s] === 0 && go(s)) return true;`,
      `  }`,
      [`  return false;`, "", "done"],
      `}`
    ]
  };

  const ITER_CODE = {
    fn: "dfsIter",
    lines: [
      `function dfsIter(n, edges, start) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      `  const visited = new Array(n).fill(false);`,
      `  const stack = [start];`,
      `  const order = [];`,
      `  while (stack.length > 0) {`,
      [`    const u = stack.pop();`, "Take the most recently added node (**last in, first out**)."],
      [`    if (visited[u]) continue;`, "It may have been pushed twice: skip if we have already been here. (Mark visited when you **pop**, not when you push, to keep the true DFS order.)"],
      `    visited[u] = true;`,
      `    order.push(u);`,
      [`    for (let i = adj[u].length - 1; i >= 0; i--) {`, "Push neighbours in **reverse**, so the first neighbour is popped (visited) first, like the recursive version."],
      `      if (!visited[adj[u][i]]) stack.push(adj[u][i]);`,
      `    }`,
      `  }`,
      `  return order;`,
      `}`
    ]
  };

  const UNDIRECTED_CYCLE_CODE = {
    fn: "hasCycleUndirected",
    lines: [
      `function hasCycleUndirected(n, edges) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      `  const visited = new Array(n).fill(false);`,
      `  function go(u, parent) {`,
      `    visited[u] = true;`,
      `    for (const v of adj[u]) {`,
      [`      if (v === parent) continue;`, "The edge we just came along leads back to the parent. That is not a cycle, so ignore it."],
      [`      if (visited[v]) return true;`, "A visited node that is **not** our parent: we reached it by a second route, so there is a cycle."],
      `      if (go(v, u)) return true;`,
      `    }`,
      `    return false;`,
      `  }`,
      `  for (let s = 0; s < n; s++) {`,
      `    if (!visited[s] && go(s, -1)) return true;`,
      `  }`,
      `  return false;`,
      `}`
    ]
  };

  const SCHEDULE_CODE = {
    fn: "canFinish",
    lines: [
      `function canFinish(numCourses, prerequisites) {`,
      `  const adj = Array.from({ length: numCourses }, () => []);`,
      [`  for (const [a, b] of prerequisites) adj[b].push(a);`, "“b before a” is the arrow **b → a**."],
      `  const state = new Array(numCourses).fill(0);`,
      `  function hasCycle(u) {`,
      `    state[u] = 1;`,
      `    for (const v of adj[u]) {`,
      `      if (state[v] === 1) return true;`,
      `      if (state[v] === 0 && hasCycle(v)) return true;`,
      `    }`,
      `    state[u] = 2;`,
      `    return false;`,
      `  }`,
      `  for (let c = 0; c < numCourses; c++) {`,
      [`    if (state[c] === 0 && hasCycle(c)) return false;`, "A cycle of prerequisites means the courses can never all be finished."],
      `  }`,
      `  return true;`,
      `}`
    ]
  };

  const checkStart = (inp) => kit.validate(inp) || (inp.start >= inp.n ? "The start node must be one of the nodes 0 to " + (inp.n - 1) + "." : null);

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "graph-dfs",
    group: "graphs",
    emoji: "🧗",
    title: "Graph DFS (Depth-First Search)",
    tagline: "Follow one path as deep as it goes, backtrack at a dead end, and try the next branch. It is the tool for connectivity, islands, cycle detection and anything about whole paths.",
    level: "Core",
    needs: ["graph-basics", "recursion", "tree-dfs-traversals"],

    gist: [
      "**DFS** goes **deep first**: pick a neighbour, then its neighbour, and so on until a dead end, then **backtrack** and try the next branch. It uses recursion (the call stack) or an explicit stack.",
      "You need a **visited** record, otherwise cycles trap you. DFS on a graph = recursion + visited (DFS on a tree needs no visited set).",
      "Time **O(V + E)**, space O(V) (deepest recursion = up to V levels).",
      "Use it for **connected components, number of islands, path existence, cycle detection, topological order**. For the **shortest path** use BFS."
    ],

    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      why: [
        "Each node is visited once, and each edge is looked at once from each end (an adjacency matrix would cost O(V²)). On a grid with R × C cells it is O(R × C).",
        "The visited record is O(V), and the recursion can go as deep as V levels when the graph is a long chain. On a big grid that depth can overflow JavaScript's call stack (roughly 10,000 levels), and then you use the explicit-stack version."
      ]
    },

    idea: {
      plain: [
        "Exploring a maze with a ball of string: you walk down one corridor as far as it goes. At a dead end you walk back (**backtrack**) to the last junction that still has an unexplored corridor and try that one. You never explore two corridors at once. That is depth-first search.",
        "In code, DFS is a function that, for a node, (1) marks it visited, (2) calls itself on every neighbour that has not been visited, and (3) returns when there is nothing left. The returning **is** the backtracking. It is the recursion pattern from trees with one addition: because a graph has cycles, a **visited** record stops you from walking in circles.",
        "Because DFS follows complete paths, it is the natural tool for questions about **what is reachable**, **how many separate groups there are**, and **whether a path loops back on itself** (a cycle). It does not find shortest paths: it reaches a node by whatever route it happens to try first."
      ],
      signals: [
        "“Is there a **path** from A to B?”, “how many **connected components / islands / provinces**?”, “**flood fill**”.",
        "“Is there a **cycle**?”, “can all courses be finished?” (dependencies), “topological order”.",
        "“Find **all** paths / explore every possibility” (DFS with backtracking)."
      ],
      notFor: [
        "**Shortest path** (fewest edges): use BFS.",
        "Very deep graphs in JavaScript (recursion limit): use the explicit-stack version."
      ],
      more: [
        {
          type: "code",
          title: "The same traversal with an explicit stack (verified code)",
          code: ITER_CODE
        },
        {
          type: "table",
          heading: "BFS vs DFS",
          columns: ["", "BFS", "DFS"],
          rows: [
            ["Data structure", "Queue", "Stack or recursion"],
            ["Explores", "Ring by ring (nearest first)", "As deep as possible, then backtracks"],
            ["Shortest path (unweighted)", "Yes", "No"],
            ["Memory", "Width of the graph (the queue)", "Depth of the graph (the stack)"],
            ["Best for", "Fewest steps, nearest, levels, multi-source spreading", "Components, cycles, path existence, all paths, topological sort, backtracking"],
            ["Time", "O(V + E)", "O(V + E)"]
          ]
        },
        {
          type: "points",
          heading: "Cycle detection: two different rules",
          items: [
            "**Undirected graph:** keep the **parent**. If a neighbour is visited and is **not** the parent, you reached it by a second route: a cycle. You must ignore the parent, because an undirected edge also points back to where you came from.",
            "**Directed graph:** the parent trick fails (`a → b`, `a → c → b` is a harmless “diamond”). Use **three states**: 0 not seen, 1 **on the current path**, 2 finished. An arrow to a node in state 1 (a *back edge*) is a cycle. An arrow to a finished node (state 2) is fine. (The third demo.)"
          ]
        },
        {
          type: "code",
          title: "Cycle in an undirected graph (verified code)",
          code: UNDIRECTED_CYCLE_CODE
        },
        {
          type: "code",
          title: "Course Schedule: a cycle in a directed graph means “impossible” (verified code)",
          code: SCHEDULE_CODE
        },
        {
          type: "points",
          heading: "What comes next (graphs II)",
          items: [
            "**Topological sort**: order the nodes of a DAG so every arrow goes forward (DFS post-order reversed, or Kahn's algorithm: BFS plus in-degrees).",
            "**Weighted shortest paths**: Dijkstra (a min-heap), Bellman-Ford.",
            "**Union-Find**: connectivity and cycle detection without a traversal; also Kruskal's minimum spanning tree."
          ]
        }
      ]
    },

    analogy: {
      title: "Exploring a maze with a ball of string",
      story: [
        "You enter a maze holding the end of a ball of string. At every junction you take the first corridor you have not tried yet, and keep going. When you hit a dead end, or a junction whose corridors are all explored, you **follow the string back** to the previous junction and try its next corridor.",
        "Chalk marks on the walls tell you where you have already been, so you never walk in circles. When you are back at the entrance and every corridor has been tried, the whole maze is explored."
      ],
      map: [
        ["Junctions and corridors", "Nodes and edges"],
        ["Going down the first untried corridor", "Recursing into an unvisited neighbour"],
        ["Chalk marks on the walls", "The visited record"],
        ["Following the string back", "Backtracking (the function returns)"],
        ["The string itself", "The call stack"]
      ],
      breaks: "A person in a maze can see the chalk marks but not what lies ahead. DFS likewise only knows what it has already visited, which is why it can wander a long way round and why it cannot promise the shortest route."
    },

    demos: [
      {
        id: "traverse",
        title: "DFS: dive, then backtrack",
        intro: "The amber node is where DFS is now. Purple nodes are on the **current path** (the recursion stack, shown on the left). Grey nodes are finished. Green edges are the ones DFS actually walked. Compare the visit order with BFS on the same graph: here it dives to node 3 before going back to visit 2.",
        codeIntro: "A recursive helper does the diving. Its `return` is the backtracking.",
        viz: "graph",
        legend: [["cur", "where DFS is now"], ["mark", "on the current path"], ["done", "finished (backtracked)"], ["good", "edge walked"]],
        inputs: [
          { type: "number", name: "n", label: "Number of nodes", value: 5, min: 2, max: 8 },
          { type: "edges", name: "edges", label: "Edges (node-node, two-way)", value: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], len: [1, 12], maxNode: 7 },
          { type: "number", name: "start", label: "Start node", value: 0, min: 0, max: 7 }
        ],
        validate: checkStart,
        random(rnd) {
          const g = kit.random(rnd, { minN: 4, maxN: 7 });
          return { n: g.n, edges: g.edges || "0-1", start: String(rnd.int(0, Number(g.n) - 1)) };
        },
        scene: (inp) => kit.scene(inp, false),
        frames(inp, snap) {
          const { n, edges, start } = inp;
          const adj = kit.adj(n, edges, false);
          const visited = Array(n).fill(false);
          const finished = Array(n).fill(false);
          const order = [];
          const path = [];
          const walked = [];
          const view = (cur, curEdge, extra) => {
            const tone = {};
            finished.forEach((f, i) => f && (tone[i] = "done"));
            path.forEach((p) => (tone[p] = "mark"));
            if (cur !== null) tone[cur] = "cur";
            const etone = {};
            walked.forEach(([a, b]) => (etone[a + "-" + b] = "good"));
            if (curEdge) etone[curEdge[0] + "-" + curEdge[1]] = "cur";
            return Object.assign({ tone, etone, boxes: [{ label: "recursion stack (current path, top = deepest)", kind: "stack", items: path.slice() }, { label: "visit order", kind: "list", items: order.slice() }] }, extra);
          };
          snap(view(null, null, { at: ["init"], vars: { start }, say: "Nothing is visited yet. We start the dive at node **" + start + "**." }));
          function go(u) {
            visited[u] = true;
            order.push(u);
            path.push(u);
            snap(view(u, null, { at: ["visit"], vars: { u }, say: "Arrive at node **" + u + "**: mark it visited and add it to the visit order." }));
            const skipped = [];
            for (const v of adj[u]) {
              if (!visited[v]) {
                snap(view(u, [u, v], { at: ["scan", "recurse"], vars: { u, v }, say: "Neighbour **" + v + "** has not been visited, so **go deeper** into it right away." + (skipped.length ? " (Skipped so far: " + list(skipped) + ", already visited.)" : "") }));
                walked.push([u, v]);
                go(v);
              } else skipped.push(v);
            }
            finished[u] = true;
            path.pop();
            const back = path.length ? path[path.length - 1] : null;
            snap(view(back, null, { at: ["back"], vars: { finished: u }, say: "Node **" + u + "** has no unvisited neighbours left" + (skipped.length ? " (" + list(skipped) + " " + (skipped.length === 1 ? "was" : "were") + " already visited)" : "") + ", so the function returns: **backtrack** " + (back !== null ? "to node **" + back + "**, which may still have neighbours to try." : "out of the start node: the dive is over.") }));
          }
          go(start);
          snap(view(null, null, { at: ["done"], out: "visit order: " + list(order), say: "DFS finished. Visit order: **" + list(order) + "**." + (order.length < n ? " Nodes " + list([...Array(n).keys()].filter((i) => !visited[i])) + " are not connected to the start, so they were never visited." : ""), result: order.slice() }));
        },
        code: DFS_CODE,
        call: (fn, inp) => fn(inp.n, inp.edges, inp.start)
      },

      {
        id: "islands",
        title: "Number of islands: sink each island with DFS",
        intro: "`1` is land, `0` is water. Scan the grid; whenever you find **unvisited land**, that is a new island: count it and let DFS **sink** every connected land cell so it is never counted again. Purple = the island being sunk, green = finished islands.",
        codeIntro: "The outer loops find islands; `sink` is a DFS on the grid.",
        viz: "grid",
        legend: [["cur", "cell being sunk"], ["mark", "current island"], ["good", "finished island"], ["dim", "water"]],
        inputs: [{ type: "text", name: "layout", label: "Grid (rows separated by commas)", value: "1100,1001,0011", len: [5, 41], alphabet: "01," }],
        validate(inp) {
          const rows = inp.layout.split(",");
          if (rows.length < 2 || rows.length > 5) return "Use 2 to 5 rows (separated by commas).";
          if (rows.some((r) => r.length !== rows[0].length)) return "Every row must have the same length.";
          if (rows[0].length < 2 || rows[0].length > 7) return "Use 2 to 7 columns.";
          return null;
        },
        random(rnd) {
          const rows = rnd.int(3, 5);
          const cols = rnd.int(3, 6);
          return { layout: Array.from({ length: rows }, () => Array.from({ length: cols }, () => (rnd() < 0.5 ? "1" : "0")).join("")).join(",") };
        },
        frames(inp, snap) {
          const grid = inp.layout.split(",").map((row) => row.split(""));
          const rows = grid.length;
          const cols = grid[0].length;
          const text = inp.layout.split(",").map((row) => row.split(""));
          const state = Array.from({ length: rows }, () => new Array(cols).fill(0)); // 1 current island, 2 finished
          let count = 0;
          const view = (cur, extra) => {
            const tone = {};
            for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
              const k = r + "," + c;
              if (text[r][c] === "0") tone[k] = "dim";
              else if (state[r][c] === 1) tone[k] = "mark";
              else if (state[r][c] === 2) tone[k] = "good";
            }
            if (cur) tone[cur[0] + "," + cur[1]] = "cur";
            return Object.assign({ grid: text.map((row) => row.slice()), tone, vars: { islands: count } }, extra);
          };
          function sink(r, c) {
            if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
            grid[r][c] = "0";
            state[r][c] = 1;
            snap(view([r, c], { at: ["sink", "spread"], say: "Sink land at **(" + r + ", " + c + ")** (it counts as visited now), then try its four neighbours: down, up, right, left. Water, cells outside the grid and sunk cells return at once." }));
            sink(r + 1, c);
            sink(r - 1, c);
            sink(r, c + 1);
            sink(r, c - 1);
          }
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (grid[r][c] === "1") {
                for (let a = 0; a < rows; a++) for (let b = 0; b < cols; b++) if (state[a][b] === 1) state[a][b] = 2;
                count++;
                snap(view([r, c], { at: ["count"], say: "Scanning the grid, we meet unvisited land at **(" + r + ", " + c + ")**: a **new island**. Count = **" + count + "**. Now sink the whole island with DFS so it is not counted again." }));
                sink(r, c);
              }
            }
          }
          for (let a = 0; a < rows; a++) for (let b = 0; b < cols; b++) if (state[a][b] === 1) state[a][b] = 2;
          snap(view(null, { at: ["count"], out: "islands = " + count, say: "Every land cell has been sunk. We counted **" + count + "** island" + (count === 1 ? "" : "s") + ": each time the scan met land, it was a whole new island.", result: count }));
        },
        code: ISLANDS_CODE,
        call: (fn, inp) => fn(inp.layout)
      },

      {
        id: "cycle",
        title: "Cycle in a directed graph (three states)",
        intro: "Edges are **one-way** now (`a-b` means a → b). DFS keeps three states: unseen, **on the current path** (purple) and finished (grey). An arrow that points back to a node **on the current path** is a cycle. The default is a harmless “diamond”: try adding the edge `3-0`.",
        codeIntro: "Same DFS, but `visited` becomes a three-valued `state`.",
        viz: "graph",
        legend: [["cur", "where DFS is now"], ["mark", "on the current path"], ["done", "finished"], ["bad", "the back edge: a cycle"]],
        inputs: [
          { type: "number", name: "n", label: "Number of nodes", value: 4, min: 2, max: 7 },
          { type: "edges", name: "edges", label: "Edges (a-b means a → b)", value: [[0, 1], [0, 2], [1, 3], [2, 3]], len: [1, 12], maxNode: 6, directed: true }
        ],
        validate: (inp) => kit.validate(inp),
        random(rnd) {
          const g = kit.random(rnd, { minN: 3, maxN: 6, directed: true });
          return { n: g.n, edges: g.edges || "0-1" };
        },
        scene: (inp) => kit.scene(inp, true),
        frames(inp, snap) {
          const { n, edges } = inp;
          const adj = kit.adj(n, edges, true);
          const state = Array(n).fill(0);
          const path = [];
          const view = (cur, etoneExtra, extra) => {
            const tone = {};
            state.forEach((s, i) => (tone[i] = s === 1 ? "mark" : s === 2 ? "done" : undefined));
            if (cur !== null) tone[cur] = "cur";
            const etone = {};
            for (let i = 0; i + 1 < path.length; i++) etone[path[i] + ">" + path[i + 1]] = "mark";
            Object.assign(etone, etoneExtra);
            return Object.assign({ tone, etone, boxes: [{ label: "current path (stack)", kind: "stack", items: path.slice() }] }, extra);
          };
          let cycle = null;
          snap(view(null, {}, { at: ["init"], say: "All **" + n + "** nodes start in state **0** (not seen). We follow the arrows with DFS and watch for an arrow that returns to a node on the current path." }));
          function go(u) {
            state[u] = 1;
            path.push(u);
            snap(view(u, {}, { at: ["enter"], vars: { u }, say: "Enter node **" + u + "**: state 1, it is now on the current path." }));
            for (const v of adj[u]) {
              if (state[v] === 1) {
                const loop = path.slice(path.indexOf(v)).concat(v);
                const tone = {};
                loop.forEach((x) => (tone[x] = "bad"));
                const etone = {};
                for (let i = 0; i + 1 < loop.length; i++) etone[loop[i] + ">" + loop[i + 1]] = "bad";
                cycle = loop;
                snap({ at: ["scan", "cycle"], tone, etone, boxes: [{ label: "the cycle", kind: "list", items: loop.slice() }], out: "cycle found: " + loop.join(" → "), outTone: "bad", say: "Arrow **" + u + " → " + v + "** points back to **" + v + "**, which is **on the current path** (state 1). We have walked in a circle: **" + loop.join(" → ") + "**. A cycle!", result: true });
                return true;
              }
              if (state[v] === 2) {
                snap(view(u, { [u + ">" + v]: "dim" }, { at: ["scan"], vars: { u, v, "state[v]": 2 }, say: "Arrow " + u + " → **" + v + "**: node " + v + " is **finished** (state 2). It was fully explored and led back to nothing on our path, so this is **not** a cycle. Skip it." }));
                continue;
              }
              snap(view(u, { [u + ">" + v]: "cur" }, { at: ["scan", "recurse"], vars: { u, v, "state[v]": 0 }, say: "Arrow " + u + " → **" + v + "**: node " + v + " is new (state 0), so explore it." }));
              if (go(v)) return true;
            }
            state[u] = 2;
            path.pop();
            snap(view(path.length ? path[path.length - 1] : null, {}, { at: ["leave"], vars: { finished: u }, say: "All arrows out of **" + u + "** are explored and none returned to the path: **" + u + "** is finished (state 2) and leaves the current path." }));
            return false;
          }
          for (let s = 0; s < n; s++) {
            if (state[s] === 0 && go(s)) return;
          }
          snap(view(null, {}, { at: ["done"], out: "no cycle", say: "Every node is finished and no arrow ever pointed back to the current path: the graph has **no cycle** (it is a DAG, so a topological order exists).", result: false }));
        },
        code: CYCLE_CODE,
        call: (fn, inp) => fn(inp.n, inp.edges)
      }
    ],

    checks: [
      {
        code: DFS_CODE,
        tests: [
          { args: [5, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], 0], expect: [0, 1, 3, 2, 4] },
          { args: [4, [[0, 1], [2, 3]], 0], expect: [0, 1] }
        ]
      },
      {
        code: ITER_CODE,
        tests: [
          { args: [5, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], 0], expect: [0, 1, 3, 2, 4] },
          { args: [4, [[0, 1], [2, 3]], 0], expect: [0, 1] },
          { args: [1, [], 0], expect: [0] }
        ]
      },
      {
        code: ISLANDS_CODE,
        tests: [
          { args: ["1100,1001,0011"], expect: 2 },
          { args: ["11000,11000,00100,00011"], expect: 3 },
          { args: ["000,000"], expect: 0 },
          { args: ["111,111"], expect: 1 }
        ]
      },
      {
        code: CYCLE_CODE,
        tests: [
          { args: [4, [[0, 1], [0, 2], [1, 3], [2, 3]]], expect: false },
          { args: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]], expect: true },
          { args: [3, [[0, 1], [1, 0]]], expect: true },
          { args: [3, []], expect: false }
        ]
      },
      {
        code: UNDIRECTED_CYCLE_CODE,
        tests: [
          { args: [3, [[0, 1], [1, 2], [2, 0]]], expect: true },
          { args: [4, [[0, 1], [1, 2], [2, 3]]], expect: false },
          { args: [4, [[0, 1], [2, 3]]], expect: false }
        ]
      },
      {
        code: SCHEDULE_CODE,
        tests: [
          { args: [2, [[1, 0]]], expect: true },
          { args: [2, [[1, 0], [0, 1]]], expect: false },
          { args: [3, [[1, 0], [2, 1]]], expect: true },
          { args: [3, [[1, 0], [2, 1], [0, 2]]], expect: false }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Forgetting the visited check",
        why: "On a graph with a cycle the recursion never ends (a stack overflow in JavaScript).",
        fix: "Mark nodes visited when you arrive and only recurse into unvisited neighbours."
      },
      {
        oops: "Using the “parent” trick to find cycles in a directed graph",
        why: "In `a → b`, `a → c → b` node b is reached twice, yet there is no cycle. The parent trick would report one.",
        fix: "For directed graphs use three states (0 / 1 on the current path / 2 finished) and report a cycle only for an arrow into state 1."
      },
      {
        oops: "Not ignoring the parent when detecting a cycle in an undirected graph",
        why: "Each undirected edge also points back to the parent, so every edge would look like a cycle.",
        fix: "Pass the parent into `go(u, parent)` and skip `v === parent`."
      },
      {
        oops: "Marking visited at push time in iterative DFS",
        why: "It still visits every node, but the order is no longer the true DFS order (the stack is used like a queue).",
        fix: "Mark visited when you **pop**, and skip a node you have already visited."
      },
      {
        oops: "Using DFS to find the shortest path",
        why: "DFS reaches a node by whichever route it tries first, which may be far from the shortest.",
        fix: "Use BFS for the fewest edges in an unweighted graph."
      },
      {
        oops: "Recursion that is too deep on a large grid or a long chain",
        why: "JavaScript's call stack holds roughly ten thousand frames. A grid with a huge island can overflow it.",
        fix: "Use the explicit-stack version, or BFS."
      }
    ],

    remember: {
      mnemonic: "Mark → recurse into every unseen neighbour → return (backtrack). DFS = recursion + visited.",
      rules: [
        "Template: `visited[u] = true; for each v: if (!visited[v]) go(v)`.",
        "Components / islands: loop over all nodes, count each time you start a fresh DFS.",
        "Undirected cycle: visited neighbour that is not the parent. Directed cycle: arrow into a node **on the current path** (state 1).",
        "Shortest path → BFS, not DFS.",
        "Deep graphs: explicit stack (mark when you pop)."
      ],
      template: {
        lines: [
          [`const visited = new Array(n).fill(false)`, ""],
          [`function go(u) {`, ""],
          [`  visited[u] = true`, "Mark on arrival."],
          [`  for (const v of adj[u]) if (!visited[v]) go(v)`, "Dive into every unseen neighbour."],
          [`}`, "Returning = backtracking."],
          [`for (let s = 0; s < n; s++) if (!visited[s]) { count++; go(s) }   // components`, "Cover every island."]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Graph/DFS.js`, `Problems/Graph/numIslandsDfs.js` and `Problems/Graph/hasCycle.js` (recursion stack with a Set)."
        }
      ]
    },

    practice: {
      title: "Find if a Path Exists",
      level: "Easy",
      problem: "There are `n` nodes numbered `0` to `n - 1` and a list of **two-way** edges. Return `true` if there is a path from `source` to `destination`, and `false` otherwise.",
      examples: [
        { input: "n = 3, edges = [[0, 1], [1, 2], [2, 0]], source = 0, destination = 2", output: "true" },
        { input: "n = 6, edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], source = 0, destination = 5", output: "false", why: "Nodes 0-1-2 and 3-4-5 are separate components." }
      ],
      hints: [
        "First build an adjacency list (add both directions for each edge).",
        "Then run a DFS (or BFS) from `source` and see whether you ever reach `destination`. You need a visited array so cycles do not trap you.",
        "You can stop early: as soon as you arrive at `destination` return `true`. If the traversal ends without finding it, return `false`."
      ],
      solution: {
        explain: [
          "Everything reachable from `source` gets visited exactly once, so `destination` is reachable if and only if the DFS touches it. Time O(n + E), memory O(n).",
          "This version uses an explicit stack, so a long chain of nodes cannot overflow the call stack."
        ],
        code: {
          fn: "validPath",
          lines: [
            `function validPath(n, edges, source, destination) {`,
            `  const adj = Array.from({ length: n }, () => []);`,
            `  for (const [u, v] of edges) {`,
            [`    adj[u].push(v);`, "Two-way edge: add both directions."],
            `    adj[v].push(u);`,
            `  }`,
            [`  const visited = new Array(n).fill(false);`, "So cycles do not trap us."],
            [`  const stack = [source];`, "An explicit stack for DFS."],
            `  while (stack.length > 0) {`,
            `    const u = stack.pop();`,
            [`    if (u === destination) return true;`, "Reached it."],
            [`    if (visited[u]) continue;`, "Already explored from here."],
            `    visited[u] = true;`,
            `    for (const v of adj[u]) if (!visited[v]) stack.push(v);`,
            `  }`,
            [`  return false;`, "Everything reachable was explored and the destination was not among it."],
            `}`
          ]
        }
      },
      tests: [
        { args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2], expect: true },
        { args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], expect: false },
        { args: [1, [], 0, 0], expect: true },
        { args: [2, [], 0, 1], expect: false },
        { args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]], 0, 4], expect: true },
        { args: [4, [[0, 1], [2, 3]], 1, 0], expect: true }
      ]
    },

    recall: [
      { q: "Describe DFS in one sentence.", a: "Mark the node visited, then recurse into each unvisited neighbour; when nothing is left the function returns, which is the backtracking." },
      { q: "Why does a graph DFS need a visited set while a tree DFS does not?", a: "A graph can have cycles and several paths to the same node, so without it you would loop forever or revisit nodes." },
      { q: "How do you detect a cycle in an undirected graph?", a: "DFS with the parent: a visited neighbour that is not the parent means a second route, so there is a cycle." },
      { q: "How do you detect a cycle in a directed graph?", a: "Three states (0 unseen, 1 on the current path, 2 finished). An arrow into a node in state 1 is a cycle; an arrow into state 2 is harmless." },
      { q: "When do you choose BFS over DFS?", a: "For the shortest path (fewest edges) in an unweighted graph, nearest-something questions and multi-source spreading. DFS is for components, cycles, path existence and exploring everything." }
    ],

    related: {
      topics: ["graph-basics", "graph-bfs", "recursion", "tree-dfs-traversals", "backtracking"],
      files: ["Problems/Graph/DFS.js", "Problems/Graph/numIslandsDfs.js", "Problems/Graph/hasCycle.js"]
    }
  });
})();
