// Function to perform Breadth-First Search (BFS) on a graph
function BFS(graph, startNode) {
    const visited = new Set(); // Set to keep track of visited nodes
    const queue = [startNode]; // Queue to store nodes for BFS traversal
    const result = []; // Array to store BFS traversal order

    visited.add(startNode); // Mark the start node as visited

    while (queue.length > 0) {
        const currentNode = queue.shift(); // Dequeue the current node
        result.push(currentNode); // Add the current node to the result array

        // Traverse all adjacent nodes of the current node
        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark the neighbor as visited
                queue.push(neighbor); // Enqueue the neighbor
            }
        }
    }

    return result;
}