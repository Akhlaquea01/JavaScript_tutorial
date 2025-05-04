// BFS.js - Breadth-First Search Implementation
const Graph = require('./Graph');

class BFS extends Graph {
    /**
     * Standard BFS implementation using a queue
     * @param {string} start - Starting vertex
     * @returns {Array<string>} - Vertices in BFS order
     */
    search(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

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
     * Finds the shortest path between two vertices (unweighted graph)
     * @param {string} start - Starting vertex
     * @param {string} end - Target vertex
     * @returns {Array<string>|null} - Shortest path or null if no path exists
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