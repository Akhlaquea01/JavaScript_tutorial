// Function to detect cycles in a directed graph using DFS
function hasCycle(graph) {
    const visited = new Set(); // Set to keep track of visited nodes
    const recursionStack = new Set(); // Set to keep track of nodes in the current recursion stack

    // Recursive function to detect cycles
    function dfs(node) {
        if (recursionStack.has(node)) {
            return true; // Cycle detected
        }

        if (!visited.has(node)) {
            visited.add(node); // Mark the current node as visited
            recursionStack.add(node); // Add the current node to the recursion stack

            // Traverse all adjacent nodes of the current node
            for (const neighbor of graph[node]) {
                if (dfs(neighbor)) {
                    return true; // Cycle detected
                }
            }

            recursionStack.delete(node); // Remove the current node from the recursion stack
        }

        return false; // No cycle found
    }

    // Iterate through all nodes in the graph
    for (const node in graph) {
        if (dfs(node)) {
            return true; // Cycle detected
        }
    }

    return false; // No cycle found
}