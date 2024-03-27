// Function to perform Depth-First Search (DFS) on a graph
function DFS(graph, startNode) {
    const visited = new Set(); // Set to keep track of visited nodes
    const result = []; // Array to store DFS traversal order

    // Recursive function to perform DFS
    function dfsRecursive(node) {
        visited.add(node); // Mark the current node as visited
        result.push(node); // Add the current node to the result array

        // Traverse all adjacent nodes of the current node
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfsRecursive(neighbor); // Recursively call DFS on unvisited neighbors
            }
        }
    }

    dfsRecursive(startNode); // Start DFS from the given start node
    return result;
}
