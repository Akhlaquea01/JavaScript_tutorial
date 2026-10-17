// Graph BFS (Breadth-First Search) — learn-first format. Shape is documented at the top of 00-meta.js.
// Uses DSA.graphKit from 38-graph-basics.js.
(function () {
  const kit = window.DSA.graphKit;
  const list = (a) => a.join(", ");
  const checkStart = (inp) => kit.validate(inp) || (inp.start >= inp.n ? "The start node must be one of the nodes 0 to " + (inp.n - 1) + "." : null) || (inp.target !== undefined && inp.target >= inp.n ? "The target node must be one of the nodes 0 to " + (inp.n - 1) + "." : null);
  const graphInputs = (withTarget) => [
    { type: "number", name: "n", label: "Number of nodes", value: 5, min: 2, max: 8 },
    { type: "edges", name: "edges", label: "Edges (node-node, two-way)", value: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], len: [1, 12], maxNode: 7 },
    { type: "number", name: "start", label: "Start node", value: 0, min: 0, max: 7 }
  ].concat(withTarget ? [{ type: "number", name: "target", label: "Target node", value: 4, min: 0, max: 7 }] : []);
  const randomGraph = (withTarget) => (rnd) => {
    const g = kit.random(rnd, { minN: 4, maxN: 7, connected: rnd() < 0.8 });
    const n = Number(g.n);
    const out = { n: g.n, edges: g.edges || "0-1", start: String(rnd.int(0, n - 1)) };
    if (withTarget) out.target = String(rnd.int(0, n - 1));
    return out;
  };

  const BFS_CODE = {
    fn: "BFS",
    lines: [
      `function BFS(n, edges, start) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      [`  const dist = new Array(n).fill(-1);`, "dist[v] = how many edges from the start (-1 means “not seen yet”). This array doubles as the **visited** set.", "init"],
      [`  dist[start] = 0;`, "The start is at distance 0, and it is marked as seen **right now**.", "init"],
      [`  const queue = [start];`, "A **queue** (first in, first out) holds the nodes whose neighbours we still have to look at.", "init"],
      `  const order = [];`,
      [`  while (queue.length > 0) {`, "Keep going until nobody is waiting.", "pop"],
      [`    const u = queue.shift();`, "Take the node at the **front**: the one that has been waiting longest, i.e. the closest to the start.", "pop"],
      [`    order.push(u);`, "Visit it.", "pop"],
      [`    for (const v of adj[u]) {`, "Look at every neighbour of u.", "scan"],
      [`      if (dist[v] === -1) {`, "Not seen before?", "scan"],
      [`        dist[v] = dist[u] + 1;`, "Mark it **when it joins the queue** (not when it leaves), so it can never be queued twice. It is one step further than u.", "mark"],
      [`        queue.push(v);`, "Join the **back** of the queue.", "mark"],
      `      }`,
      `    }`,
      `  }`,
      [`  return { order, dist };`, "", "done"],
      `}`
    ]
  };

  const PATH_CODE = {
    fn: "SHORTEST_PATH",
    lines: [
      `function SHORTEST_PATH(n, edges, start, target) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      [`  const parent = new Array(n).fill(-2);`, "parent[v] = the node we came from. -2 means “not seen yet”, so this array is also the visited set.", "init"],
      [`  parent[start] = -1;`, "The start has no parent (-1).", "init"],
      `  const queue = [start];`,
      [`  while (queue.length > 0) {`, "", "pop"],
      [`    const u = queue.shift();`, "", "pop"],
      [`    if (u === target) break;`, "We reached the target: because BFS goes outward layer by layer, this is already the **fewest edges**. Stop.", "found"],
      [`    for (const v of adj[u]) {`, "", "scan"],
      [`      if (parent[v] === -2) {`, "", "scan"],
      [`        parent[v] = u;`, "Remember who discovered v...", "mark"],
      [`        queue.push(v);`, "...and queue it.", "mark"],
      `      }`,
      `    }`,
      `  }`,
      [`  if (parent[target] === -2) return null;`, "Never reached: there is no path.", "none"],
      `  const path = [];`,
      [`  for (let x = target; x !== -1; x = parent[x]) path.push(x);`, "Walk **backwards** from the target following the parent pointers until the start.", "rebuild"],
      [`  return path.reverse();`, "Flip it so it reads start → target.", "done"],
      `}`
    ]
  };

  const MAZE_CODE = {
    fn: "MAZE",
    lines: [
      `function MAZE(layout) {`,
      `  const grid = layout.split(",");`,
      `  const rows = grid.length, cols = grid[0].length;`,
      `  let start, end;`,
      `  for (let r = 0; r < rows; r++) {`,
      `    for (let c = 0; c < cols; c++) {`,
      `      if (grid[r][c] === "S") start = [r, c];`,
      `      if (grid[r][c] === "E") end = [r, c];`,
      `    }`,
      `  }`,
      [`  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));`, "A distance for every cell. -1 = not seen yet (this is also the visited marker).", "init"],
      [`  dist[start[0]][start[1]] = 0;`, "", "init"],
      [`  const queue = [start];`, "The queue holds [row, col] cells.", "init"],
      [`  while (queue.length > 0) {`, "", "pop"],
      [`    const [r, c] = queue.shift();`, "The waiting cell that is closest to the start.", "pop"],
      [`    if (r === end[0] && c === end[1]) return dist[r][c];`, "Reached the exit: its distance is the shortest path length.", "found"],
      [`    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {`, "The four neighbours (the grid is an implicit graph).", "scan"],
      `      const nr = r + dr, nc = c + dc;`,
      [`      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== "#" && dist[nr][nc] === -1) {`, "Inside the grid, not a wall, and not seen before.", "scan"],
      [`        dist[nr][nc] = dist[r][c] + 1;`, "One step further. Mark it now.", "mark"],
      [`        queue.push([nr, nc]);`, "", "mark"],
      `      }`,
      `    }`,
      `  }`,
      [`  return -1;`, "The queue ran dry without reaching E: there is no way out.", "none"],
      `}`
    ]
  };

  const COMPONENTS_CODE = {
    fn: "countComponents",
    lines: [
      `function countComponents(n, edges) {`,
      `  const adj = Array.from({ length: n }, () => []);`,
      `  for (const [u, v] of edges) {`,
      `    adj[u].push(v);`,
      `    adj[v].push(u);`,
      `  }`,
      `  const seen = new Array(n).fill(false);`,
      `  let count = 0;`,
      `  for (let s = 0; s < n; s++) {`,
      [`    if (seen[s]) continue;`, "Already part of an island we counted."],
      [`    count++;`, "A new, unseen node: this is a new island."],
      `    seen[s] = true;`,
      `    const queue = [s];`,
      [`    for (let i = 0; i < queue.length; i++) {`, "A BFS from s. (Walking an index `i` instead of `shift()` keeps it O(1) per step.)"],
      `      for (const v of adj[queue[i]]) {`,
      `        if (!seen[v]) {`,
      `          seen[v] = true;`,
      `          queue.push(v);`,
      `        }`,
      `      }`,
      `    }`,
      `  }`,
      `  return count;`,
      `}`
    ]
  };

  const LADDER_CODE = {
    fn: "ladderLength",
    lines: [
      `function ladderLength(beginWord, endWord, wordList) {`,
      [`  const dict = new Set(wordList);`, "Valid words, for O(1) look-ups."],
      [`  const queue = [[beginWord, 1]];`, "Each node is a **word**, with the number of words in the chain so far."],
      `  const seen = new Set([beginWord]);`,
      [`  for (let i = 0; i < queue.length; i++) {`, "BFS with an index instead of `shift()`."],
      `    const [word, steps] = queue[i];`,
      `    if (word === endWord) return steps;`,
      `    for (let k = 0; k < word.length; k++) {`,
      `      for (let code = 97; code <= 122; code++) {`,
      [`        const next = word.slice(0, k) + String.fromCharCode(code) + word.slice(k + 1);`, "Change one letter: these are the **neighbours** of the word. The graph is never written down."],
      `        if (dict.has(next) && !seen.has(next)) {`,
      `          seen.add(next);`,
      `          queue.push([next, steps + 1]);`,
      `        }`,
      `      }`,
      `    }`,
      `  }`,
      `  return 0;`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "graph-bfs",
    group: "graphs",
    emoji: "🌐",
    title: "Graph BFS (Breadth-First Search)",
    tagline: "Explore a graph in rings: first everything one step from the start, then two steps, and so on, using a queue. It finds the fewest-edges path in an unweighted graph.",
    level: "Core",
    needs: ["graph-basics", "queue-deque", "tree-bfs-level-order"],

    gist: [
      "**BFS** starts at a node and visits its neighbours first, then their neighbours, ring by ring, like ripples in a pond. It uses a **queue** (first in, first out).",
      "Keep a **visited** record and mark a node **when you add it to the queue**, not when you take it out. Then every node is queued exactly once.",
      "In an **unweighted** graph, the ring in which a node is first found is its **shortest distance** (fewest edges) from the start.",
      "Time **O(V + E)**, space O(V). Used for shortest paths, grids and mazes, “minimum steps”, multi-source spreading (rotting oranges) and connected components."
    ],

    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      why: [
        "With an adjacency list every node is queued and taken out once (O(V)), and every edge is looked at once from each end (O(E)), so the total is O(V + E). On a grid with R × C cells it is O(R × C).",
        "The queue and the visited record hold at most all the nodes, so the memory is O(V). (In JavaScript `queue.shift()` is O(n) for big arrays; use an index pointer or process level by level to stay fast.)"
      ],
      more: [
        {
          type: "table",
          heading: "Cost by representation",
          columns: ["", "Adjacency list", "Adjacency matrix", "Grid (R × C)"],
          rows: [
            ["Time", "O(V + E)", "O(V²)", "O(R × C)"],
            ["Space", "O(V)", "O(V)", "O(R × C) in the worst case"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "Drop a stone in water: ripples spread outward. First the points touching the stone, then the next ring, then the next. BFS spreads through a graph the same way. From the start node you first visit **all its neighbours** (1 step away), then **their** neighbours (2 steps away), and so on.",
        "To do that you keep a **queue**. Take the node at the front, look at its neighbours, and put every neighbour you have not seen yet at the **back**. Because the queue is first in, first out, nodes that are closer to the start are always processed before nodes that are further away. That is why the first time you reach a node is also by the **fewest edges**.",
        "Graphs have cycles, so you also need a **visited** record. Mark a node **the moment you add it to the queue**. If you only marked nodes when you take them out, the same node could be added by two different neighbours and queued twice."
      ],
      signals: [
        "“**Shortest path**” or “**minimum number of steps / moves / transformations**” in an unweighted graph, grid or state space (word ladder, knight moves, sliding puzzle).",
        "“**Nearest** something”, level-by-level processing, or something that **spreads at the same speed from several places** (rotting oranges, fire).",
        "Connected components, bipartite checks (colour neighbours with opposite colours)."
      ],
      notFor: [
        "**Weighted** edges with different costs: BFS counts edges, not cost. Use Dijkstra (a min-heap). With only 0 and 1 weights use 0-1 BFS with a deque.",
        "Problems that need to explore **one full path at a time** (all paths, cycle detection, topological order): use DFS."
      ],
      more: [
        {
          type: "points",
          heading: "Variations you will meet",
          items: [
            "**Grid BFS**: queue cells `[row, col]`, neighbours are the 4 (or 8) adjacent cells with a bounds check (the third demo).",
            "**Multi-source BFS**: put **all** the sources in the queue at the start, each at distance 0. The rings spread from all of them at once (*Rotting Oranges*, *Walls and Gates*, *01 Matrix*). The practice problem is exactly this.",
            "**Level by level**: process the queue in rounds, taking a snapshot of its size first (as in tree level order), when the answer is a number of levels or minutes.",
            "**Implicit graphs**: the nodes are words, board positions or states, and the neighbours are computed on demand (*Word Ladder*, below)."
          ]
        },
        {
          type: "code",
          title: "Connected components with BFS (verified code)",
          code: COMPONENTS_CODE
        },
        {
          type: "code",
          title: "Word Ladder: BFS on an implicit graph (verified code)",
          code: LADDER_CODE
        }
      ]
    },

    analogy: {
      title: "Ripples in a pond (or a rumour spreading)",
      story: [
        "Imagine a rumour that every person tells to all their friends **one hour later**. Start with one person. After 1 hour all their direct friends know it, after 2 hours the friends of those friends, and so on. The hour in which someone first hears the rumour is exactly the **fewest friendship links** between them and the first person.",
        "To keep track you hold a waiting line. Person at the front of the line tells their friends. Every friend who has not heard it yet joins the back of the line and is marked “knows” **immediately**, so they are not added again by someone else who also tells them a minute later."
      ],
      map: [
        ["People and friendships", "Nodes and edges"],
        ["The first person", "The start node"],
        ["The waiting line of people who will pass it on", "The queue"],
        ["“This person already knows”", "The visited record (`dist[v] !== -1`)"],
        ["The hour someone first hears it", "Their distance from the start"],
        ["Marked as knowing the moment they join the line", "Mark when you enqueue, not when you dequeue"]
      ],
      breaks: "In real life friends take different amounts of time to spread news. BFS assumes every edge takes the same time (one step); with different costs per edge you need Dijkstra."
    },

    demos: [
      {
        id: "traverse",
        title: "BFS: visit order and distances",
        intro: "The node at the front of the queue (amber) is processed; its unseen neighbours turn purple and join the back of the queue with their distance **d**. Green edges show who discovered whom. Edit the edges (two-way, `node-node`) or press Random.",
        codeIntro: "`dist` is both the distance array and the visited record.",
        viz: "graph",
        legend: [["cur", "node being processed"], ["mark", "waiting in the queue"], ["done", "finished"], ["good", "edge used to discover a node"]],
        inputs: graphInputs(false),
        validate: checkStart,
        random: randomGraph(false),
        scene: (inp) => kit.scene(inp, false),
        frames(inp, snap) {
          const { n, edges, start } = inp;
          const adj = kit.adj(n, edges, false);
          const dist = Array(n).fill(-1);
          const finished = Array(n).fill(false);
          const tree = [];
          const queue = [start];
          const order = [];
          dist[start] = 0;
          const view = (cur, fresh, extra) => {
            const tone = {};
            finished.forEach((f, i) => f && (tone[i] = "done"));
            queue.forEach((q) => (tone[q] = "mark"));
            if (cur !== null) tone[cur] = "cur";
            const badge = {};
            dist.forEach((d, i) => d >= 0 && (badge[i] = "d=" + d));
            const etone = {};
            tree.forEach(([a, b]) => (etone[a + "-" + b] = fresh && fresh.some((v) => (a === cur && b === v)) ? "cur" : "good"));
            return Object.assign({ tone, badge, etone, boxes: [{ label: "queue (front → back)", kind: "queue", items: queue.slice() }, { label: "visit order", kind: "list", items: order.slice() }] }, extra);
          };
          snap(view(null, null, { at: ["init"], vars: { start }, say: "Start at node **" + start + "**: its distance is 0, and it goes into the queue. It is marked as seen **now**, at the moment it joins the queue." }));
          while (queue.length > 0) {
            const u = queue.shift();
            order.push(u);
            snap(view(u, null, { at: ["pop"], vars: { u, "dist[u]": dist[u] }, say: "Take the **front** of the queue: node **" + u + "** (distance " + dist[u] + "). It is visited next." }));
            const fresh = [];
            const seen = [];
            for (const v of adj[u]) {
              if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                queue.push(v);
                fresh.push(v);
                tree.push([u, v]);
              } else seen.push(v);
            }
            const nb = adj[u];
            snap(view(u, fresh, { at: fresh.length ? ["scan", "mark"] : ["scan"], vars: { u }, say: !nb.length ? "Node **" + u + "** has no neighbours." : "Neighbours of **" + u + "**: " + list(nb) + ". " + (fresh.length ? "**New:** " + list(fresh) + ", at distance **" + (dist[u] + 1) + "**: marked now and added to the **back** of the queue." : "All of them were seen already, so nothing is added.") + (seen.length && fresh.length ? " Skipped (seen already): " + list(seen) + "." : "") }));
            finished[u] = true;
          }
          snap(view(null, null, { at: ["done"], out: "visit order: " + list(order), say: "The queue is empty. Visit order: **" + list(order) + "**. The badges are the shortest distances (fewest edges) from node " + start + "." + (order.length < n ? " Nodes " + list([...Array(n).keys()].filter((i) => dist[i] === -1)) + " were never reached: they are in a different component." : ""), result: { order: order.slice(), dist: dist.slice() } }));
        },
        code: BFS_CODE,
        call: (fn, inp) => fn(inp.n, inp.edges, inp.start)
      },

      {
        id: "path",
        title: "Shortest path, with the way back",
        intro: "BFS stops as soon as it takes the **target** off the queue. Each node remembers **who discovered it** (the small `←` label). Then the path is rebuilt **backwards** from the target following those labels.",
        codeIntro: "The same BFS, with a `parent` array instead of `dist`.",
        viz: "graph",
        legend: [["cur", "node being processed"], ["mark", "waiting in the queue"], ["good", "on the shortest path"], ["done", "finished"]],
        inputs: graphInputs(true),
        validate: checkStart,
        random: randomGraph(true),
        scene: (inp) => kit.scene(inp, false),
        frames(inp, snap) {
          const { n, edges, start, target } = inp;
          const adj = kit.adj(n, edges, false);
          const parent = Array(n).fill(-2);
          parent[start] = -1;
          const finished = Array(n).fill(false);
          const tree = [];
          const queue = [start];
          const base = (cur, extra) => {
            const tone = {};
            finished.forEach((f, i) => f && (tone[i] = "done"));
            queue.forEach((q) => (tone[q] = "mark"));
            if (cur !== null) tone[cur] = "cur";
            const badge = {};
            parent.forEach((p, i) => p >= 0 && (badge[i] = "←" + p));
            const etone = {};
            tree.forEach(([a, b]) => (etone[a + "-" + b] = "dim"));
            return Object.assign({ tone, badge, etone, boxes: [{ label: "queue (front → back)", kind: "queue", items: queue.slice() }] }, extra);
          };
          snap(base(null, { at: ["init"], vars: { start, target }, say: "Find the shortest path from **" + start + "** to **" + target + "**. Start in the queue; its parent is -1 (it came from nowhere)." }));
          let reached = false;
          while (queue.length > 0) {
            const u = queue.shift();
            snap(base(u, { at: ["pop"], vars: { u }, say: "Take **" + u + "** from the front of the queue." }));
            if (u === target) {
              reached = true;
              snap(base(u, { at: ["found"], say: "**" + u + "** is the target. BFS reaches nodes in order of distance, so this is already the **fewest-edges** route. Stop searching." }));
              break;
            }
            const fresh = [];
            for (const v of adj[u]) {
              if (parent[v] === -2) {
                parent[v] = u;
                queue.push(v);
                fresh.push(v);
                tree.push([u, v]);
              }
            }
            snap(base(u, { at: fresh.length ? ["scan", "mark"] : ["scan"], say: fresh.length ? "New neighbours of **" + u + "**: " + list(fresh) + ". Each remembers that **" + u + "** found it (the `←` label), and joins the queue." : "No new neighbours to add." }));
            finished[u] = true;
          }
          if (!reached) {
            snap(base(null, { at: ["none"], out: "no path from " + start + " to " + target, outTone: "bad", say: "The queue ran dry without ever reaching **" + target + "**: it is in a different component, so there is **no path**.", result: null }));
            return;
          }
          const path = [];
          const tone = {};
          const etone = {};
          const badge = {};
          parent.forEach((p, i) => p >= 0 && (badge[i] = "←" + p));
          for (let x = target; x !== -1; x = parent[x]) {
            path.push(x);
            tone[x] = "good";
            if (parent[x] >= 0) etone[parent[x] + "-" + x] = "good";
            snap({ at: ["rebuild"], tone: Object.assign({}, tone, { [x]: "cur" }), etone: Object.assign({}, etone), badge, boxes: [{ label: "path built so far (backwards)", kind: "list", items: path.slice() }], say: x === target ? "Rebuild the path **backwards**, from the target **" + x + "**." : "**" + x + "** was found by **" + (parent[x] === -1 ? "nobody: it is the start" : parent[x]) + "**" + (parent[x] === -1 ? "." : ", so go to " + parent[x] + " next.") });
          }
          path.reverse();
          snap({ at: ["done"], tone, etone, badge, boxes: [{ label: "shortest path", kind: "list", items: path.slice() }], out: "path = " + path.join(" → ") + "  (" + (path.length - 1) + " edge" + (path.length === 2 ? "" : "s") + ")", say: "Reversed, the path is **" + path.join(" → ") + "**: **" + (path.length - 1) + "** edge" + (path.length === 2 ? "" : "s") + ", the fewest possible.", result: path.slice() });
        },
        code: PATH_CODE,
        call: (fn, inp) => fn(inp.n, inp.edges, inp.start, inp.target)
      },

      {
        id: "maze",
        title: "BFS on a grid: the shortest way out of a maze",
        intro: "`S` is the start, `E` the exit, `#` a wall, `.` an open cell. Rows are separated by commas. BFS spreads from S one ring at a time; the number in a cell is its distance. The ring that first touches E gives the shortest path length.",
        codeIntro: "A grid is an implicit graph: the neighbours are computed from the row and column.",
        viz: "grid",
        legend: [["cur", "cell being processed"], ["mark", "waiting in the queue"], ["good", "finished"], ["done", "wall"]],
        inputs: [{ type: "text", name: "maze", label: "Maze (rows separated by commas)", value: "S..#.,.#...,.#.#.,...#E", len: [7, 40], alphabet: ".#SE," }],
        validate(inp) {
          const rows = inp.maze.split(",");
          if (rows.length < 2 || rows.length > 5) return "Use 2 to 5 rows (separated by commas).";
          if (rows.some((r) => r.length !== rows[0].length)) return "Every row must have the same length.";
          if (rows[0].length < 2 || rows[0].length > 7) return "Use 2 to 7 columns.";
          if ((inp.maze.match(/S/g) || []).length !== 1) return "There must be exactly one S (the start).";
          if ((inp.maze.match(/E/g) || []).length !== 1) return "There must be exactly one E (the exit).";
          return null;
        },
        random(rnd) {
          const rows = rnd.int(3, 5);
          const cols = rnd.int(3, 6);
          const cells = Array.from({ length: rows * cols }, () => (rnd() < 0.25 ? "#" : "."));
          const s = rnd.int(0, rows * cols - 1);
          let e = rnd.int(0, rows * cols - 1);
          if (e === s) e = (s + 1) % (rows * cols);
          cells[s] = "S";
          cells[e] = "E";
          return { maze: Array.from({ length: rows }, (_, r) => cells.slice(r * cols, r * cols + cols).join("")).join(",") };
        },
        frames(inp, snap) {
          const grid = inp.maze.split(",");
          const rows = grid.length;
          const cols = grid[0].length;
          let start;
          let end;
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if (grid[r][c] === "S") start = [r, c]; if (grid[r][c] === "E") end = [r, c]; }
          const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
          dist[start[0]][start[1]] = 0;
          const queue = [start];
          const finished = new Set();
          const view = (cur, extra) => {
            const g = grid.map((row, r) => [...row].map((ch, c) => (ch === "#" ? "#" : ch === "S" ? "S" : dist[r][c] >= 0 ? dist[r][c] : ch === "E" ? "E" : "")));
            const tone = {};
            grid.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === "#") tone[r + "," + c] = "done"; }));
            finished.forEach((k) => (tone[k] = "good"));
            queue.forEach(([r, c]) => (tone[r + "," + c] = "mark"));
            if (cur) tone[cur[0] + "," + cur[1]] = "cur";
            return Object.assign({ grid: g, tone, boxes: [{ label: "queue (front → back)", kind: "queue", items: queue.map(([r, c]) => "(" + r + "," + c + ")") }] }, extra);
          };
          snap(view(null, { at: ["init"], say: "Start at **S = (" + start[0] + ", " + start[1] + ")** with distance 0 and put it in the queue. We are looking for **E = (" + end[0] + ", " + end[1] + ")**." }));
          while (queue.length > 0) {
            const [r, c] = queue.shift();
            snap(view([r, c], { at: ["pop"], vars: { cell: "(" + r + ", " + c + ")", distance: dist[r][c] }, say: "Take the front cell **(" + r + ", " + c + ")** (distance " + dist[r][c] + ")." }));
            if (r === end[0] && c === end[1]) {
              snap(view([r, c], { at: ["found"], out: "shortest path = " + dist[r][c] + " steps", say: "This is the exit **E**: the shortest way out takes **" + dist[r][c] + "** steps. The ring that reached E first is the shortest by construction.", result: dist[r][c] }));
              return;
            }
            const fresh = [];
            for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== "#" && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
                fresh.push("(" + nr + ", " + nc + ")");
              }
            }
            finished.add(r + "," + c);
            snap(view([r, c], { at: fresh.length ? ["scan", "mark"] : ["scan"], say: fresh.length ? "Open, unseen neighbours: " + fresh.join(" ") + ". Mark them with distance **" + (dist[r][c] + 1) + "** and queue them. (Walls, edges of the grid and cells already seen are skipped.)" : "No new neighbours here (walls, the grid's edge or cells already seen)." }));
          }
          snap(view(null, { at: ["none"], out: "no way out", outTone: "bad", say: "The queue is empty and E was never reached: the exit is walled off.", result: -1 }));
        },
        code: MAZE_CODE,
        call: (fn, inp) => fn(inp.maze)
      }
    ],

    checks: [
      {
        code: COMPONENTS_CODE,
        tests: [
          { args: [6, [[0, 1], [1, 2], [3, 4]]], expect: 3 },
          { args: [3, []], expect: 3 },
          { args: [4, [[0, 1], [1, 2], [2, 3]]], expect: 1 }
        ]
      },
      {
        code: LADDER_CODE,
        tests: [
          { args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], expect: 5 },
          { args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], expect: 0 },
          { args: ["a", "c", ["a", "b", "c"]], expect: 2 }
        ]
      },
      {
        code: MAZE_CODE,
        tests: [
          { args: ["S..#.,.#...,.#.#.,...#E"], expect: 7 },
          { args: ["S#E"], expect: -1 },
          { args: ["SE"], expect: 1 }
        ]
      },
      {
        code: PATH_CODE,
        tests: [
          { args: [5, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], 0, 4], expect: [0, 1, 3, 4] },
          { args: [4, [[0, 1], [2, 3]], 0, 3], expect: null },
          { args: [3, [[0, 1], [1, 2]], 1, 1], expect: [1] }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Marking a node as visited when taking it out of the queue",
        why: "Two different neighbours can both add the same node before it is taken out. It is then queued (and processed) more than once, which wastes time and can break distances.",
        fix: "Mark it **when you add it** to the queue: `dist[v] = …; queue.push(v)`."
      },
      {
        oops: "Forgetting the visited record",
        why: "A cycle would make the search loop forever, or at least revisit nodes again and again.",
        fix: "Always keep a visited set (or a `dist`/`parent` array with “not seen” as the default)."
      },
      {
        oops: "Using BFS for the shortest path in a weighted graph",
        why: "BFS counts **edges**, not total cost. The path with the fewest edges can be much more expensive.",
        fix: "With different edge costs use Dijkstra (min-heap). With only 0/1 costs use 0-1 BFS."
      },
      {
        oops: "Using `queue.shift()` on a huge array in JavaScript",
        why: "`shift()` can be O(n), turning BFS into O(n²) on large inputs.",
        fix: "Walk the array with an index (`for (let i = 0; i < queue.length; i++)`), or process the queue level by level."
      },
      {
        oops: "Starting from only one node when the graph may be disconnected",
        why: "You only reach one component. Counting islands or visiting everything then gives the wrong answer.",
        fix: "Loop over all nodes and start a BFS from each one that has not been seen."
      },
      {
        oops: "Forgetting the bounds and wall checks on a grid",
        why: "Stepping to row −1 or into a wall gives wrong paths or crashes.",
        fix: "Check `0 <= nr < rows`, `0 <= nc < cols`, not a wall and not visited, before queueing."
      }
    ],

    remember: {
      mnemonic: "Queue + mark-on-enqueue. Rings outward: first time you reach a node = fewest edges.",
      rules: [
        "Start: `dist[start] = 0; queue = [start]`.",
        "Loop: take the front; for each unseen neighbour set `dist = dist[u] + 1` **and** enqueue it.",
        "BFS = shortest path only when every edge costs the same.",
        "Many sources at once? Put them all in the queue at the start (multi-source BFS).",
        "O(V + E); for a grid O(rows × cols)."
      ],
      template: {
        lines: [
          [`const dist = new Array(n).fill(-1); dist[start] = 0`, "Distances double as visited."],
          [`const queue = [start]`, ""],
          [`for (let i = 0; i < queue.length; i++) {   // index instead of shift()`, ""],
          [`  const u = queue[i]`, "Front of the queue."],
          [`  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; queue.push(v) }`, "Mark and queue the unseen."],
          [`}`, ""]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Graph/BFS.js` (the template), `Problems/Graph/numIslandsBFS.js` (grid BFS). Related ideas: *Shortest Path in Binary Matrix*, *Walls and Gates*, *Word Ladder*, *Open the Lock*."
        }
      ]
    },

    practice: {
      title: "Rotting Oranges (multi-source BFS)",
      level: "Medium",
      problem: "A grid has `0` (empty), `1` (fresh orange) and `2` (rotten orange). Every minute, each fresh orange that is **up, down, left or right** of a rotten orange becomes rotten. Return the **minimum number of minutes** until no fresh orange is left, or `-1` if that is impossible.",
      examples: [
        { input: "grid = [[2, 1, 1], [1, 1, 0], [0, 1, 1]]", output: "4" },
        { input: "grid = [[2, 1, 1], [0, 1, 1], [1, 0, 1]]", output: "-1", why: "The bottom-left orange can never be reached." },
        { input: "grid = [[0, 2]]", output: "0", why: "There are no fresh oranges to begin with." }
      ],
      hints: [
        "Think of rotting as a **ripple**: all rotten oranges spread at the same time, one ring per minute. That is BFS, but starting from **many** sources.",
        "Put **every** rotten orange in the queue at the start, and count the fresh ones. Then process the queue **one level at a time**: all cells of the current minute, then `minutes++`.",
        "When a fresh neighbour is found, make it rotten **immediately** (that is your visited mark), decrease the fresh count and add it to the next level. At the end return `minutes` if no fresh orange is left, else `-1`."
      ],
      solution: {
        explain: [
          "The queue starts with all rotten oranges at distance 0 (multi-source BFS). Each round of the loop is one minute: every orange rotted this minute infects its fresh neighbours, which become the next round. Counting `fresh` tells us at the end whether everything rotted.",
          "Time O(R × C), memory O(R × C) for the queue."
        ],
        code: {
          fn: "orangesRotting",
          lines: [
            `function orangesRotting(grid) {`,
            [`  const g = grid.map((row) => row.slice());`, "Work on a copy so the input is untouched."],
            `  const rows = g.length, cols = g[0].length;`,
            `  let queue = [], fresh = 0;`,
            `  for (let r = 0; r < rows; r++) {`,
            `    for (let c = 0; c < cols; c++) {`,
            [`      if (g[r][c] === 2) queue.push([r, c]);`, "Every rotten orange is a **source** at time 0."],
            [`      else if (g[r][c] === 1) fresh++;`, "Count the fresh ones."],
            `    }`,
            `  }`,
            `  let minutes = 0;`,
            [`  while (queue.length > 0 && fresh > 0) {`, "Stop as soon as nothing fresh is left."],
            [`    const next = [];`, "The oranges that rot during this minute."],
            `    for (const [r, c] of queue) {`,
            `      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {`,
            `        const nr = r + dr, nc = c + dc;`,
            [`        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {`, "A fresh orange next to a rotten one."],
            [`          g[nr][nc] = 2;`, "It rots now: this is also the visited mark."],
            `          fresh--;`,
            `          next.push([nr, nc]);`,
            `        }`,
            `      }`,
            `    }`,
            [`    queue = next;`, "The next level (minute)."],
            `    minutes++;`,
            `  }`,
            [`  return fresh === 0 ? minutes : -1;`, "If any fresh orange was unreachable, the answer is -1."],
            `}`
          ]
        }
      },
      tests: [
        { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expect: 4 },
        { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expect: -1 },
        { args: [[[0, 2]]], expect: 0 },
        { args: [[[0]]], expect: 0 },
        { args: [[[1]]], expect: -1 },
        { args: [[[2, 1, 1, 1, 2]]], expect: 2 },
        { args: [[[2, 2], [1, 1], [0, 0], [2, 0]]], expect: 1 }
      ]
    },

    recall: [
      { q: "What data structure drives BFS, and what order does that give?", a: "A queue (first in, first out). Nodes are processed in order of distance from the start: all at distance 1, then distance 2, and so on." },
      { q: "When must a node be marked visited in BFS, and why?", a: "When it is added to the queue, not when it is taken out. Otherwise two neighbours could queue it twice." },
      { q: "Why does BFS give the shortest path in an unweighted graph?", a: "It reaches nodes ring by ring, so the first time a node is found is by the fewest edges." },
      { q: "What is multi-source BFS?", a: "Start with all the sources in the queue at distance 0, so the rings spread from all of them at once (rotting oranges, walls and gates)." },
      { q: "Time and space of BFS? What if edges have different weights?", a: "O(V + E) time and O(V) space. With different weights use Dijkstra instead." }
    ],

    related: {
      topics: ["graph-basics", "graph-dfs", "tree-bfs-level-order", "queue-deque", "heap"],
      files: ["Problems/Graph/BFS.js", "Problems/Graph/numIslandsBFS.js", "Problems/Graph/shortestPath.js"]
    }
  });
})();
