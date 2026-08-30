/**
 * Detects a cycle in a directed graph using DFS.
 * Time: O(V + E)  Space: O(V)
 */
function hasCycle(graph) {
    const visited = new Set(); // nodes fully explored, across any component
    const recursionStack = new Set(); // nodes on the current DFS path

    function dfs(node) {
        // node is already on the current path -> back edge -> cycle
        if (recursionStack.has(node)) {
            return true;
        }

        if (!visited.has(node)) {
            visited.add(node);
            recursionStack.add(node);

            for (const neighbor of graph[node]) {
                if (dfs(neighbor)) {
                    return true;
                }
            }

            recursionStack.delete(node); // backtrack: leaving this path
        }

        return false;
    }

    for (const node in graph) {
        if (dfs(node)) {
            return true;
        }
    }

    return false;
}