// DFS.js - Depth-First Search Implementation
const Graph = require('./Graph');

class DFS extends Graph {
    /**
     * Depth-first traversal, recursive, visiting vertices in DFS order.
     * Time: O(V + E)  Space: O(V) recursion stack + visited set
     */
    recursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);

            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);

        return result;
    }

    /**
     * Depth-first traversal, iterative, using an explicit stack.
     * Time: O(V + E)  Space: O(V)
     */
    iterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

        while (stack.length) {
            const currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }
}

module.exports = DFS;