# JavaScript Tutorial & DSA Prep

Personal collection of JavaScript language notes, data-structure/algorithm problem
solutions, and system-design practice, plus a browsable revision dashboard.

## Layout

- **`DSA-Notes/` + `index.html`** — the DSA revision dashboard. Each `DSA-Notes/NN-topic-id.js`
  file holds one topic's notes and practice problems; `index.html` loads them all and renders
  a searchable, checkable sidebar. Open `index.html` in a browser (or serve the folder locally)
  to use it. To add a topic, copy an existing `DSA-Notes/*.js` file's shape into a new
  `NN-your-topic-id.js` and add a matching `<script>` tag in `index.html`, in numeric order.

- **`dsa-learn.html` + `DSA-Learn/`** — the DSA notes rebuilt to be understood after a long break.
  Every topic uses the same template: 30-second recap, plain-words idea, real-world analogy, an
  **animated step-through you can re-run on your own input** (with the code line highlighted as it
  runs), code with a note on every important line, complexity in plain words, common mistakes, a
  memory trick, a practice problem with hints and a solution, and recall questions. All 41 topics of
  the old dashboard are converted (the old `index.html` + `DSA-Notes/` stay as they were). Content
  lives in `DSA-Learn/data/NN-topic.js` (shape documented at the top of `data/00-meta.js`), the
  drawing code (array, tree, linked list, grid, bars, heap, intervals, graph) in `DSA-Learn/engine/`
  and `renderer.js`. To add or edit a topic, add its `<script>` tag to `dsa-learn.html` before
  `renderer.js`, then run `node DSA-Learn/check.js`: it executes the displayed code against the
  animation on 60+ inputs and runs every practice solution against its tests.

- **`lld-notes.html` + `LLD-Notes/`** — short revision notes for Low-Level Design (OOP pillars,
  class relationships, SOLID and friends), distilled from the class transcripts in
  `Low Level Design/`. The HTML is only the page shell, `LLD-Notes/renderer.js` draws it, and
  all content lives in `LLD-Notes/data/NN-topic.js` (one topic per file; the field and block
  shapes are documented at the top of `data/00-meta.js`). To add a topic, create a new data
  file and add its `<script>` tag in `lld-notes.html` before `renderer.js`. Features: search,
  per-topic "revised" ticks, dark/light theme, and a ⚡ Quick revise mode that shows only the
  key points.

- **`Problems/`** — algorithm/DSA solutions, one file per problem, grouped by topic folder
  (`Array/`, `Strings/`, `Hash/`, `LinkedList/`, `Graph/`, `Tree/`, `Stack/`, `Queue/`,
  `Deque/`, `DoublyLinkedList/`, `Recursion/`, `Sort/`, `Numbers/`, `Bits/`, `Techniques/`,
  `MachineCoding/`, `ComplexityAnalysis/`). Files are named after the function/problem they
  solve, camelCase (e.g. `twoSum.js`). A few files are PascalCase by convention because they
  define a class or data structure rather than a single algorithm (e.g. `Graph.js`, `Trie.js`).

- **`JS-Topics/`** — numbered notes on JavaScript language features and APIs
  (`NNN-topic_name.js`), roughly in learning order from basics through ES2025 features.

- **`System-Design/`** — worked system-design examples, currently a Parking Lot implementation
  (`System-Design/ParkingLot/`) split into one class per file. Run it with
  `node System-Design/ParkingLot/parking-lot-problem.js`; it persists state to a local
  `vehicleData.json` next to it (git-ignored — it's regenerated automatically on first run).

## Running a solution file

Most files in `Problems/` and `JS-Topics/` are standalone scripts with example calls/`console.log`s
at the bottom — run any one directly:

```bash
node Problems/Array/twoSum.js
```

Some (`Problems/Graph/BFS.js`, `DFS.js`, `example.js`) `require()` sibling files in the same
folder and must be run from the repo root or with Node's module resolution intact — just
`node <path-to-file>` still works since the `require` paths are relative to the file itself.
