// Graphs — Basics & Representation — learn-first format. Shape is documented at the top of 00-meta.js.
// Also defines DSA.graphKit, a few helpers shared with the Graph BFS and Graph DFS topics.
(function () {
  const kit = (window.DSA.graphKit = {
    adj(n, edges, directed) {
      const a = Array.from({ length: n }, () => []);
      for (const [u, v] of edges) {
        a[u].push(v);
        if (!directed) a[v].push(u);
      }
      return a;
    },
    key: (u, v, directed) => (directed ? u + ">" + v : Math.min(u, v) + "-" + Math.max(u, v)),
    scene: (inp, directed) => ({ n: inp.n, edges: inp.edges, directed: !!directed }),
    // every node number in the edge list must exist
    validate(inp) {
      for (const [u, v] of inp.edges) if (u >= inp.n || v >= inp.n) return "The edge " + u + "-" + v + " uses a node that does not exist: with n = " + inp.n + " the nodes are 0 to " + (inp.n - 1) + ".";
      return null;
    },
    // random { n, edges } as raw input text; connected = start from a spanning tree so every node can be reached
    random(rnd, o) {
      const n = rnd.int((o && o.minN) || 4, (o && o.maxN) || 7);
      const directed = !!(o && o.directed);
      const edges = [];
      const seen = new Set();
      const add = (u, v) => {
        const k = kit.key(u, v, directed);
        if (u !== v && !seen.has(k)) { seen.add(k); edges.push([u, v]); return true; }
        return false;
      };
      if (!o || o.connected !== false) for (let v = 1; v < n; v++) { const u = rnd.int(0, v - 1); directed && rnd() < 0.3 ? add(v, u) : add(u, v); }
      for (let i = 0, extra = rnd.int(0, 3); i < extra; i++) add(rnd.int(0, n - 1), rnd.int(0, n - 1));
      return { n: String(n), edges: edges.map((e) => e.join("-")).join(", ") };
    }
  });

  const BUILD_CODE = {
    fn: "BUILD",
    lines: [
      `function BUILD(n, edges, directed) {`,
      [`  const adj = Array.from({ length: n }, () => []);`, "**Adjacency list**: one empty list of neighbours per node.", "init"],
      [`  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));`, "**Adjacency matrix**: an n × n table of zeros. matrix[u][v] = 1 means “there is an edge u → v”.", "init"],
      `  for (const [u, v] of edges) {`,
      [`    adj[u].push(v);`, "Edge u-v: v is a neighbour of u...", "edge"],
      [`    matrix[u][v] = 1;`, "...and the matrix cell (u, v) becomes 1.", "edge"],
      [`    if (!directed) {`, "An **undirected** edge works both ways, so we also record the reverse.", "mirror"],
      [`      adj[v].push(u);`, "u is a neighbour of v...", "mirror"],
      [`      matrix[v][u] = 1;`, "...so the matrix is symmetric.", "mirror"],
      `    }`,
      `  }`,
      [`  return { adj, matrix };`, "The same graph, stored in two ways.", "done"],
      `}`
    ]
  };

  const NEIGHBORS_CODE = {
    fn: "NEIGHBORS",
    lines: [
      `function NEIGHBORS(rows, cols, r, c) {`,
      [`  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];`, "Down, up, right, left: the four moves.", "dirs"],
      `  const result = [];`,
      `  for (const [dr, dc] of dirs) {`,
      [`    const nr = r + dr, nc = c + dc;`, "The cell we would land on.", "step"],
      [`    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {`, "**Bounds check**: stay inside the grid. Forgetting this is the classic grid bug.", "bounds"],
      [`      result.push([nr, nc]);`, "Inside: it is a neighbour.", "add"],
      `    }`,
      `  }`,
      [`  return result;`, "", "done"],
      `}`
    ]
  };

  const CONVERT_CODE = {
    fn: "listToMatrix",
    lines: [
      `function listToMatrix(adj) {`,
      `  const n = adj.length;`,
      [`  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));`, "n × n zeros."],
      `  for (let u = 0; u < n; u++) {`,
      `    for (const v of adj[u]) matrix[u][v] = 1;`,
      `  }`,
      `  return matrix;`,
      `}`
    ]
  };

  const BACK_CODE = {
    fn: "matrixToList",
    lines: [
      `function matrixToList(matrix) {`,
      `  const n = matrix.length;`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (let u = 0; u < n; u++) {`,
      [`    for (let v = 0; v < n; v++) if (matrix[u][v] === 1) adj[u].push(v);`, "Scanning a whole row to find the neighbours of u costs O(n): the matrix's weakness."],
      `  }`,
      `  return adj;`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "graph-basics",
    group: "graphs",
    emoji: "🕸️",
    title: "Graphs — Basics & Representation",
    tagline: "Things (nodes) and the links between them (edges). Store them as an adjacency list for almost every problem, or as a matrix when the graph is dense and you test edges a lot.",
    level: "Core",
    needs: ["trees-intro", "hashmap"],

    gist: [
      "A **graph** is a set of **nodes (vertices)** plus **edges** that connect pairs of them. A tree is a graph with no cycles that is all in one piece; a general graph may have cycles and may be split into separate islands.",
      "Edges can be **directed** (one-way, like “follows”) or **undirected** (two-way, like “friends”), and **weighted** (with a cost) or not.",
      "Store it as an **adjacency list** (each node keeps its neighbours): O(V + E) memory, best for most problems. An **adjacency matrix** (V × V table) uses O(V²) memory but answers “is there an edge u-v?” in O(1).",
      "The first question on any graph problem: **what are the nodes and what are the edges?** Often the graph is hidden (grid cells, words that differ by one letter, puzzle states)."
    ],

    complexity: {
      time: "Build O(V + E)",
      space: "List O(V + E) · Matrix O(V²)",
      why: [
        "Building an adjacency list visits every edge once and creates one list per node: O(V + E) time and memory. Visiting all neighbours of a node costs only its degree, so a full BFS or DFS is O(V + E).",
        "A matrix needs V × V cells even if there are very few edges, and finding the neighbours of a node means scanning a whole row, O(V). In exchange, checking one edge is O(1)."
      ],
      more: [
        {
          type: "table",
          heading: "Adjacency matrix vs adjacency list vs edge list",
          columns: ["", "Adjacency matrix", "Adjacency list", "Edge list"],
          rows: [
            ["Memory", "O(V²)", "O(V + E)", "O(E)"],
            ["Is there an edge u-v?", "O(1)", "O(degree of u)", "O(E)"],
            ["All neighbours of u", "O(V)", "O(degree of u)", "O(E)"],
            ["Add an edge", "O(1)", "O(1)", "O(1)"],
            ["Full BFS / DFS", "O(V²)", "O(V + E)", "Awkward"],
            ["Best for", "Dense graphs, small V, many edge checks", "Sparse graphs and traversals (the default)", "The input format; Kruskal's algorithm"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "A graph is the simplest possible model of **“things and connections”**: cities and roads, people and friendships, web pages and links, courses and prerequisites. Each thing is a **node**, each connection is an **edge**.",
        "To work with a graph in code, you must store it. The usual way is an **adjacency list**: for every node, a list of the nodes it is directly connected to (its **neighbours**). To find what you can reach from a node, you just read its list. For an **undirected** edge `a-b`, put `b` in a's list **and** `a` in b's list. For a **directed** edge `a → b`, only `b` in a's list.",
        "The other way is an **adjacency matrix**: a table where row `u`, column `v` holds 1 if there is an edge. It is quick to check one specific edge, but wastes memory when there are few edges. Many graphs are never written down at all: in a **grid**, the neighbours of a cell are simply the four cells around it, and you can compute them on the fly (an *implicit graph*)."
      ],
      signals: [
        "Anything described as **connections**: friends, roads, flights, dependencies, links, networks.",
        "A **grid or maze** (cells are nodes, moves are edges), **words** that change by one letter, **puzzle states**.",
        "“Is A connected to B?”, “shortest path”, “number of islands / groups”, “is there a cycle?”, “order the tasks”."
      ],
      notFor: [
        "Data that is naturally hierarchical with one root and no cycles: use a tree.",
        "Plain “find in a list” problems: you do not need a graph."
      ],
      more: [
        {
          type: "table",
          heading: "Vocabulary",
          columns: ["Word", "Meaning"],
          rows: [
            ["Directed / undirected", "Directed: u → v goes one way (follow). Undirected: u — v works both ways (friend)."],
            ["Weighted / unweighted", "Weighted: each edge has a cost or distance. Unweighted: all edges count as 1."],
            ["Neighbours (adjacent)", "Nodes joined to a node by an edge."],
            ["Degree", "Number of edges at a node. Directed: in-degree (arriving) and out-degree (leaving)."],
            ["Path / cycle", "A path is a walk along edges. A cycle is a path that comes back to where it started."],
            ["Connected / component", "Connected: every node can reach every other. A component is one connected island."],
            ["DAG", "Directed Acyclic Graph: directed with no cycle (task dependencies)."],
            ["Sparse / dense", "Sparse: few edges (E near V). Dense: many (E near V²)."]
          ]
        },
        {
          type: "points",
          heading: "Handy facts",
          items: [
            "In an undirected graph the **sum of all degrees = 2 × E**.",
            "A simple undirected graph has at most **V(V − 1) / 2** edges (directed: V(V − 1)).",
            "A **tree** = a connected graph with exactly **V − 1** edges and no cycle.",
            "**Tree traversal + a visited set = graph traversal.** The visited set is what stops you looping forever around a cycle."
          ]
        },
        {
          type: "table",
          heading: "Graph vs tree",
          columns: ["", "Tree", "Graph"],
          rows: [
            ["Root", "One root", "Not required"],
            ["Cycles", "None", "Allowed"],
            ["Paths between two nodes", "Exactly one", "None, one or many"],
            ["Edges", "V − 1", "Anything from 0 up to V(V − 1) / 2"],
            ["Visited set needed in traversals", "No", "Yes, otherwise infinite loops"]
          ]
        },
        {
          type: "points",
          heading: "Getting the graph out of the input",
          items: [
            "Nodes numbered **1..n**? Make the arrays size `n + 1` (or subtract 1).",
            "Nodes are **names** (city names)? Use a `Map` from name to neighbour list.",
            "**Course Schedule**: a prerequisite `[a, b]` means “b first, then a”, so the edge is `b → a` (directed).",
            "The graph may be **disconnected**: traversals have to be started from every unvisited node."
          ]
        },
        {
          type: "code",
          title: "Adjacency list → matrix (verified code)",
          code: CONVERT_CODE
        },
        {
          type: "code",
          title: "Adjacency matrix → list (verified code)",
          code: BACK_CODE
        }
      ]
    },

    analogy: {
      title: "A road map and a distance chart",
      story: [
        "Think of a road map. The **cities** are nodes and the **roads** are edges. A one-way street is a directed edge, an ordinary road is undirected.",
        "There are two ways to write the map down. Put a **signpost list** at every city: “from here you can go to Ana, Raj and Mei”. That is the adjacency list, short and exactly what you need to decide where to drive next. Or print a big **distance chart** with every city on both the rows and the columns, and a mark where a road exists. That is the adjacency matrix: checking whether Ana and Mei are directly connected is a quick look-up, but the chart has a cell for every possible pair, even for the thousands of pairs with no road."
      ],
      map: [
        ["Cities", "Nodes (vertices)"],
        ["Roads", "Edges"],
        ["A one-way street", "A directed edge"],
        ["The signpost list at each city", "Adjacency list"],
        ["The chart with a row and a column per city", "Adjacency matrix"],
        ["Cities you can drive to directly", "Neighbours"]
      ],
      breaks: "A real map has places that are not on any road and areas with no connection to each other. In code, a graph can likewise be split into **components**, which is why traversals must be started from every unvisited node."
    },

    demos: [
      {
        id: "build",
        title: "From an edge list to an adjacency list and a matrix",
        intro: "The input gives only a list of edges. Watch each edge being written into **both** representations. Switch to **directed** to see the reverse entries disappear and the matrix stop being symmetric. Nodes are numbered from 0.",
        codeIntro: "One loop over the edges fills both structures.",
        viz: "graph",
        legend: [["cur", "edge being added"], ["good", "already added"], ["dim", "not added yet"]],
        inputs: [
          { type: "number", name: "n", label: "Number of nodes", value: 5, min: 2, max: 8 },
          { type: "edges", name: "edges", label: "Edges (node-node)", value: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], len: [1, 12], maxNode: 7 },
          { type: "select", name: "directed", label: "Edges are", value: "no", options: [["no", "undirected (two-way)"], ["yes", "directed (one-way)"]] }
        ],
        validate: (inp) => kit.validate(inp),
        random(rnd) {
          const g = kit.random(rnd, { minN: 3, maxN: 6, connected: false });
          const edges = g.edges || "0-1";
          return { n: g.n, edges: edges, directed: rnd() < 0.3 ? "yes" : "no" };
        },
        scene: (inp) => kit.scene(inp, inp.directed === "yes"),
        frames(inp, snap) {
          const directed = inp.directed === "yes";
          const n = inp.n;
          const adj = Array.from({ length: n }, () => []);
          const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
          const view = (k, changed, extra) => {
            const etone = {};
            inp.edges.forEach(([u, v], i) => (etone[u + ">" + v] = i < k ? "good" : i === k ? "cur" : "dim"));
            return Object.assign(
              {
                etone,
                tone: Object.fromEntries(changed.map((x) => [x, "cur"])),
                boxes: [
                  { label: "adjacency list", kind: "map", items: adj.map((l, u) => ({ k: u, v: "[" + l.join(", ") + "]", tone: changed.includes(u) ? "cur" : undefined })) },
                  { label: "adjacency matrix (row u, column v)", kind: "list", items: matrix.map((row, u) => ({ v: u + ": " + row.join(" "), tone: changed.includes(u) ? "cur" : undefined })) }
                ]
              },
              extra
            );
          };
          snap(view(-1, [], { at: ["init"], say: "**" + n + "** nodes and no edges yet, so every neighbour list is empty and every matrix cell is 0." }));
          inp.edges.forEach(([u, v], k) => {
            adj[u].push(v);
            matrix[u][v] = 1;
            if (!directed) {
              adj[v].push(u);
              matrix[v][u] = 1;
            }
            snap(view(k, directed ? [u] : [u, v], { at: directed ? ["edge"] : ["edge", "mirror"], say: directed ? "Edge **" + u + " → " + v + "** (one-way): add " + v + " to node " + u + "'s list and set matrix[" + u + "][" + v + "] = 1. Nothing is added for node " + v + "." : "Edge **" + u + "-" + v + "** (two-way): add " + v + " to node " + u + "'s list and " + u + " to node " + v + "'s list, and set both matrix[" + u + "][" + v + "] and matrix[" + v + "][" + u + "] to 1." }));
          });
          snap(view(inp.edges.length, [], { at: ["done"], out: "adjacency list and matrix built", say: "Done: **" + inp.edges.length + "** edges stored twice, once in each form. The list has " + (directed ? inp.edges.length : 2 * inp.edges.length) + " entries in total (O(V + E)), the matrix has " + n * n + " cells (O(V²)), even though most are 0.", result: { adj: adj.map((l) => l.slice()), matrix: matrix.map((r) => r.slice()) } }));
        },
        code: BUILD_CODE,
        call: (fn, inp) => fn(inp.n, inp.edges, inp.directed === "yes")
      },

      {
        id: "grid",
        title: "A grid is a graph: finding a cell's neighbours",
        intro: "In a grid you do not need an edge list: the neighbours of a cell are the cells **above, below, left and right**. Pick a cell, especially one on an edge or corner, and watch the bounds check keep you inside the grid.",
        codeIntro: "The four directions and the bounds check appear in almost every grid problem (islands, mazes, flood fill).",
        viz: "grid",
        legend: [["cur", "the cell"], ["good", "its neighbours"]],
        inputs: [
          { type: "number", name: "rows", label: "Rows", value: 4, min: 2, max: 6 },
          { type: "number", name: "cols", label: "Columns", value: 5, min: 2, max: 6 },
          { type: "number", name: "r", label: "Cell row", value: 0, min: 0, max: 5 },
          { type: "number", name: "c", label: "Cell column", value: 2, min: 0, max: 5 }
        ],
        validate: (inp) => (inp.r >= inp.rows ? "Cell row must be less than the number of rows." : inp.c >= inp.cols ? "Cell column must be less than the number of columns." : null),
        random(rnd) {
          const rows = rnd.int(2, 6);
          const cols = rnd.int(2, 6);
          return { rows: String(rows), cols: String(cols), r: String(rnd.int(0, rows - 1)), c: String(rnd.int(0, cols - 1)) };
        },
        frames(inp, snap) {
          const { rows, cols, r, c } = inp;
          const grid = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => i + "," + j));
          const names = ["down", "up", "right", "left"];
          const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
          const found = [];
          const tone = () => {
            const t = { [r + "," + c]: "cur" };
            found.forEach(([a, b]) => (t[a + "," + b] = "good"));
            return t;
          };
          snap({ at: ["dirs"], grid, tone: tone(), vars: { r, c }, say: "The cell is **(" + r + ", " + c + ")** in a grid of " + rows + " rows and " + cols + " columns. Its four possible neighbours are one step down, up, right and left." });
          dirs.forEach(([dr, dc], i) => {
            const nr = r + dr;
            const nc = c + dc;
            const inside = nr >= 0 && nr < rows && nc >= 0 && nc < cols;
            if (inside) found.push([nr, nc]);
            snap({ at: inside ? ["step", "bounds", "add"] : ["step", "bounds"], grid, tone: tone(), vars: { move: names[i], "(nr, nc)": "(" + nr + ", " + nc + ")", inside }, say: inside ? "Step **" + names[i] + "** lands on **(" + nr + ", " + nc + ")**: inside the grid, so it is a neighbour." : "Step **" + names[i] + "** would land on **(" + nr + ", " + nc + ")**: that is **outside** the grid, so it is not a neighbour. The bounds check skips it." });
          });
          snap({ at: ["done"], grid, tone: tone(), out: found.length + " neighbour" + (found.length === 1 ? "" : "s") + ": " + found.map((p) => "(" + p[0] + ", " + p[1] + ")").join(" "), say: "Cell (" + r + ", " + c + ") has **" + found.length + "** neighbour" + (found.length === 1 ? "" : "s") + (found.length === 4 ? " (an inside cell has all 4)." : ", because it sits on an edge or in a corner."), result: found.map((p) => p.slice()) });
        },
        code: NEIGHBORS_CODE,
        call: (fn, inp) => fn(inp.rows, inp.cols, inp.r, inp.c)
      }
    ],

    checks: [
      {
        code: CONVERT_CODE,
        tests: [
          { args: [[[1, 2], [0, 3], [0, 3], [1, 2, 4], [3]]], expect: [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 0, 1, 0]] },
          { args: [[[], []]], expect: [[0, 0], [0, 0]] }
        ]
      },
      {
        code: BACK_CODE,
        tests: [
          { args: [[[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 0, 1, 0]]], expect: [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3]] }
        ]
      },
      {
        code: BUILD_CODE,
        tests: [
          { args: [5, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], false], expect: { adj: [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3]], matrix: [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 0, 1, 0]] } },
          { args: [3, [[0, 1], [1, 2]], true], expect: { adj: [[1], [2], []], matrix: [[0, 1, 0], [0, 0, 1], [0, 0, 0]] } }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Forgetting the reverse edge in an undirected graph",
        why: "If you only do `adj[u].push(v)`, node v cannot get back to u and traversals miss half the graph.",
        fix: "For undirected edges also do `adj[v].push(u)` (and `matrix[v][u] = 1`)."
      },
      {
        oops: "Off-by-one with node numbers",
        why: "If nodes are numbered 1..n but your arrays have n slots, `adj[n]` does not exist.",
        fix: "Use size `n + 1`, or subtract 1 from every node number when reading the input."
      },
      {
        oops: "Getting the direction wrong for dependencies",
        why: "In Course Schedule, `[a, b]` means “take b first, then a”. Writing the edge as a → b flips the whole graph.",
        fix: "Say it aloud: “b must come before a”, so the edge goes `b → a`."
      },
      {
        oops: "Using an adjacency matrix for a huge, sparse graph",
        why: "A million nodes would need a trillion cells, almost all zero.",
        fix: "Use an adjacency list. Use a matrix only for small or dense graphs."
      },
      {
        oops: "Assuming the graph is connected",
        why: "There may be separate islands, and a single BFS or DFS from node 0 only visits one of them.",
        fix: "Loop over every node and start a traversal whenever you meet an unvisited one."
      },
      {
        oops: "Forgetting the bounds check on a grid",
        why: "Stepping off the grid reads `undefined` or crashes (`grid[-1][0]`).",
        fix: "Always test `0 <= nr < rows && 0 <= nc < cols` before using a neighbour."
      }
    ],

    remember: {
      mnemonic: "Nodes + edges. Adjacency LIST for almost everything (V + E), MATRIX for dense or small. Undirected = write both directions.",
      rules: [
        "Ask first: what are the nodes, and what are the edges?",
        "List: `adj[u].push(v)` (and `adj[v].push(u)` if undirected). Matrix: `m[u][v] = 1`.",
        "Sparse graph or traversal → list. Dense graph or many edge checks → matrix.",
        "Grid: neighbours are `r±1` and `c±1`, always with a bounds check.",
        "Tree traversal + a visited set = graph traversal."
      ],
      template: {
        lines: [
          [`const adj = Array.from({ length: n }, () => [])`, "One list per node."],
          [`for (const [u, v] of edges) {`, ""],
          [`  adj[u].push(v)`, "u → v"],
          [`  if (!directed) adj[v].push(u)`, "and v → u when two-way."],
          [`}`, ""]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Graph/Graph.js` (adjacency list: addVertex, addEdge, removeEdge, removeVertex) and `Problems/Graph/GraphAdjacencyMatrix.js` (a directed matrix graph)."
        }
      ]
    },

    practice: {
      title: "Find the Town Judge",
      level: "Easy",
      problem: "In a town of `n` people (numbered 1 to n) there may be a **judge**. If there is one, then: **everybody else trusts the judge** and **the judge trusts nobody**. `trust[i] = [a, b]` means person a trusts person b. Return the judge's number, or `-1` if there is no judge.",
      examples: [
        { input: "n = 2, trust = [[1, 2]]", output: "2" },
        { input: "n = 3, trust = [[1, 3], [2, 3]]", output: "3" },
        { input: "n = 3, trust = [[1, 3], [2, 3], [3, 1]]", output: "-1", why: "Person 3 trusts someone, so they cannot be the judge." }
      ],
      hints: [
        "Treat “a trusts b” as a **directed edge a → b**. The judge is a node with in-degree n − 1 and out-degree 0.",
        "You do not need to store the graph. Keep one number per person: **+1 whenever someone trusts them** (in-degree) and **−1 whenever they trust someone** (out-degree).",
        "The judge's score is exactly `n − 1`: n − 1 people trust them and they trust nobody. Nobody else can reach that score."
      ],
      solution: {
        explain: [
          "Combining in-degree and out-degree in one score keeps it to a single array and one pass over the edges. A person who trusts anyone loses a point, so they can never reach n − 1. Exactly one person can have score n − 1.",
          "Time O(n + E), memory O(n)."
        ],
        code: {
          fn: "findJudge",
          lines: [
            `function findJudge(n, trust) {`,
            [`  const score = new Array(n + 1).fill(0);`, "Index 0 is unused: people are numbered from 1."],
            `  for (const [a, b] of trust) {`,
            [`    score[a]--;`, "a trusts someone: their out-degree rises, so they lose a point."],
            [`    score[b]++;`, "b is trusted: their in-degree rises, so they gain a point."],
            `  }`,
            `  for (let person = 1; person <= n; person++) {`,
            [`    if (score[person] === n - 1) return person;`, "Trusted by everyone else and trusting nobody."],
            `  }`,
            `  return -1;`,
            `}`
          ]
        }
      },
      tests: [
        { args: [2, [[1, 2]]], expect: 2 },
        { args: [3, [[1, 3], [2, 3]]], expect: 3 },
        { args: [3, [[1, 3], [2, 3], [3, 1]]], expect: -1 },
        { args: [3, [[1, 2], [2, 3]]], expect: -1 },
        { args: [1, []], expect: 1 },
        { args: [4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]]], expect: 3 }
      ]
    },

    recall: [
      { q: "What is a graph, and how is it different from a tree?", a: "Nodes plus edges. A tree is connected with no cycle and V − 1 edges; a graph may have cycles, several paths between nodes and separate components." },
      { q: "How do you add an undirected edge u-v to an adjacency list?", a: "`adj[u].push(v)` and `adj[v].push(u)`. For a directed edge u → v only the first one." },
      { q: "Adjacency list or matrix: costs and when each?", a: "List: O(V + E) memory, neighbours in O(degree): the default. Matrix: O(V²) memory, edge check in O(1): small or dense graphs." },
      { q: "How do you find the neighbours of a grid cell safely?", a: "Try the four moves (1,0), (-1,0), (0,1), (0,-1) and keep the cells with 0 ≤ row < rows and 0 ≤ col < cols." },
      { q: "Why must graph traversals use a visited set?", a: "Cycles would make you loop forever, and several paths would make you revisit nodes. Marking visited nodes fixes both." }
    ],

    related: {
      topics: ["graph-bfs", "graph-dfs", "trees-intro", "hashmap", "queue-deque"],
      files: ["Problems/Graph/Graph.js", "Problems/Graph/GraphAdjacencyMatrix.js"]
    }
  });
})();
