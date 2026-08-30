// BFS.js - Breadth-First Search Implementation
const Graph = require('./Graph');

class BFS extends Graph {
    /**
     * Breadth-first traversal using a queue.
     * Time: O(V + E)  Space: O(V)
     */
    search(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true; // mark visited at enqueue time to avoid queuing duplicates

        while (queue.length) {
            const currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }

    /**
     * Finds the shortest path between two vertices in an unweighted graph.
     * Time: O(V + E)  Space: O(V)
     */
    shortestPath(start, end) {
        const queue = [[start]];
        const visited = new Set();
        visited.add(start);

        while (queue.length) {
            const path = queue.shift();
            const node = path[path.length - 1];

            if (node === end) return path;

            for (const neighbor of this.adjacencyList[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    const newPath = [...path, neighbor];
                    queue.push(newPath);
                }
            }
        }

        return null;
    }
}

module.exports = BFS;