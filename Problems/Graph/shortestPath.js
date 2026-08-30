/**
 * Finds the shortest path between two nodes in an unweighted graph using BFS.
 * Time: O(V + E)  Space: O(V + E) for the queued paths
 */
function shortestPath(graph, startNode, endNode) {
    const queue = [[startNode]];
    const visited = new Set();

    while (queue.length > 0) {
        const currentPath = queue.shift();
        const currentNode = currentPath[currentPath.length - 1];

        if (currentNode === endNode) {
            return currentPath;
        }

        // visited is marked at dequeue (not enqueue) time, so a node can
        // end up queued more than once before it is first processed
        if (!visited.has(currentNode)) {
            visited.add(currentNode);

            for (const neighbor of graph[currentNode]) {
                if (!visited.has(neighbor)) {
                    queue.push([...currentPath, neighbor]);
                }
            }
        }
    }

    return null;
}