// index.js - Usage Example
const DFS = require('./DFS');
const BFS = require('./BFS');

// Create and populate a graph using DFS implementation
const dfsGraph = new DFS();
dfsGraph.addVertex("A");
dfsGraph.addVertex("B");
dfsGraph.addVertex("C");
dfsGraph.addVertex("D");
dfsGraph.addEdge("A", "B");
dfsGraph.addEdge("A", "C");
dfsGraph.addEdge("B", "D");
dfsGraph.addEdge("C", "D");

console.log("DFS Recursive:", dfsGraph.recursive("A"));
console.log("DFS Iterative:", dfsGraph.iterative("A"));

// Create and populate a graph using BFS implementation
const bfsGraph = new BFS();
bfsGraph.addVertex("A");
bfsGraph.addVertex("B");
bfsGraph.addVertex("C");
bfsGraph.addVertex("D");
bfsGraph.addEdge("A", "B");
bfsGraph.addEdge("A", "C");
bfsGraph.addEdge("B", "D");
bfsGraph.addEdge("C", "D");

console.log("BFS:", bfsGraph.search("A"));
console.log("Shortest Path A to D:", bfsGraph.shortestPath("A", "D"));