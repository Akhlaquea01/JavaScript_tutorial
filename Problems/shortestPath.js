// Function to find the shortest path between two nodes in an unweighted graph
function shortestPath(graph, startNode, endNode) {
    const queue = [[startNode]]; // Queue to store paths
    const visited = new Set(); // Set to keep track of visited nodes

    // Continue until there are paths in the queue
    while (queue.length > 0) {
        const currentPath = queue.shift(); // Dequeue the current path
        const currentNode = currentPath[currentPath.length - 1]; // Get the last node of the path

        if (currentNode === endNode) {
            return currentPath; // Return the path if the end node is reached
        }

        if (!visited.has(currentNode)) {
            visited.add(currentNode); // Mark the current node as visited

            // Enqueue new paths with neighbors of the current node
            for (const neighbor of graph[currentNode]) {
                if (!visited.has(neighbor)) {
                    queue.push([...currentPath, neighbor]);
                }
            }
        }
    }

    return null; // If no path is found
}