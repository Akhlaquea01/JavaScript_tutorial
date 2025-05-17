/**
 * Problem Description: Graph Adjacency Matrix Implementation
 *
 * Implement a directed, unweighted graph using an adjacency matrix.
 * The class should support initializing the graph, adding edges,
 * checking for edge existence, and printing the matrix.
 *
 * Representation:
 * An adjacency matrix 'matrix' where matrix[i][j] = 1 if there's a directed
 * edge from vertex i to vertex j, and 0 otherwise.
 */

/**
 * Represents a directed, unweighted graph using an adjacency matrix.
 */
class GraphAdjacencyMatrix {
    /**
     * Creates an instance of GraphAdjacencyMatrix.
     * Initializes the adjacency matrix with all zeros.
     * @param {number} numVertices - The number of vertices in the graph.
     */
    constructor(numVertices) {
        // Validate input: Number of vertices must be a non-negative integer.
        if (typeof numVertices !== 'number' || !Number.isInteger(numVertices) || numVertices < 0) {
            console.error("Error: Number of vertices must be a non-negative integer.");
            this.numVertices = 0;
            this.matrix = [];
            return;
        }

        this.numVertices = numVertices;
        // Initialize the adjacency matrix with dimensions numVertices x numVertices.
        // All entries are initially 0, indicating no edges.
        this.matrix = Array(numVertices).fill(null).map(() => Array(numVertices).fill(0));
    }

    /**
     * Adds a directed edge from vertex v1 to vertex v2.
     * Assumes vertices are 0-indexed.
     * @param {number} v1 - The starting vertex (source).
     * @param {number} v2 - The ending vertex (destination).
     */
    addEdge(v1, v2) {
        // Validate vertex indices
        if (v1 < 0 || v1 >= this.numVertices || v2 < 0 || v2 >= this.numVertices) {
            console.error(`Error: Invalid vertex indices. Vertices must be between 0 and ${this.numVertices - 1}.`);
            return;
        }

        // In a directed graph, an edge from v1 to v2 is represented by setting matrix[v1][v2] to 1.
        this.matrix[v1][v2] = 1;
        console.log(`Added edge from ${v1} to ${v2}`);
    }

    /**
     * Checks if a directed edge exists from vertex v1 to vertex v2.
     * Assumes vertices are 0-indexed.
     * @param {number} v1 - The starting vertex.
     * @param {number} v2 - The ending vertex.
     * @returns {boolean} True if an edge exists, false otherwise.
     */
    hasEdge(v1, v2) {
        // Validate vertex indices
        if (v1 < 0 || v1 >= this.numVertices || v2 < 0 || v2 >= this.numVertices) {
            console.error(`Error: Invalid vertex indices. Vertices must be between 0 and ${this.numVertices - 1}.`);
            return false; // Cannot have an edge with invalid vertices
        }

        // Check the value in the adjacency matrix. 1 indicates an edge.
        return this.matrix[v1][v2] === 1;
    }

    /**
     * Prints the adjacency matrix to the console.
     */
    printMatrix() {
        console.log("\n--- Adjacency Matrix ---");
        // Print column headers (vertex indices)
        let header = "  ";
        for (let i = 0; i < this.numVertices; i++) {
            header += i + " ";
        }
        console.log(header);
        console.log("---" + "-".repeat(this.numVertices * 2)); // Separator line

        // Print each row (vertex) and its connections
        for (let i = 0; i < this.numVertices; i++) {
            let row = i + "| "; // Row header (vertex index)
            for (let j = 0; j < this.numVertices; j++) {
                row += this.matrix[i][j] + " "; // Add the matrix value (0 or 1)
            }
            console.log(row);
        }
        console.log("------------------------");
    }

    /**
     * (Optional) Get the neighbors of a vertex.
     * For a directed graph, this means vertices reachable by an outgoing edge.
     * @param {number} v - The vertex to find neighbors for.
     * @returns {number[]} An array of neighbor vertex indices.
     */
    getNeighbors(v) {
        // Validate vertex index
        if (v < 0 || v >= this.numVertices) {
            console.error(`Error: Invalid vertex index. Vertex must be between 0 and ${this.numVertices - 1}.`);
            return []; // No neighbors for invalid vertex
        }

        const neighbors = [];
        // Iterate through the row corresponding to vertex v
        for (let i = 0; i < this.numVertices; i++) {
            // If the matrix entry is 1, there is an edge from v to i, so i is a neighbor.
            if (this.matrix[v][i] === 1) {
                neighbors.push(i);
            }
        }
        return neighbors;
    }
}


/**
 * Sample Run Example
 */
function sampleRun() {
    console.log("--- Sample Run: Directed Graph Adjacency Matrix ---");

    // Create a graph with 5 vertices (0, 1, 2, 3, 4)
    const myGraph = new GraphAdjacencyMatrix(5);
    console.log("Created a graph with 5 vertices.");

    // Add some directed edges
    myGraph.addEdge(0, 1); // Edge from 0 to 1
    myGraph.addEdge(0, 2); // Edge from 0 to 2
    myGraph.addEdge(1, 3); // Edge from 1 to 3
    myGraph.addEdge(2, 3); // Edge from 2 to 3
    myGraph.addEdge(3, 4); // Edge from 3 to 4
    myGraph.addEdge(4, 0); // Edge from 4 back to 0

    // Print the adjacency matrix to visualize the connections
    myGraph.printMatrix();

    // Check for existence of some edges
    console.log("\nChecking for edges:");
    console.log("Edge from 0 to 1 exists:", myGraph.hasEdge(0, 1)); // Expected: true
    console.log("Edge from 1 to 0 exists:", myGraph.hasEdge(1, 0)); // Expected: false (it's directed)
    console.log("Edge from 2 to 3 exists:", myGraph.hasEdge(2, 3)); // Expected: true
    console.log("Edge from 0 to 4 exists:", myGraph.hasEdge(0, 4)); // Expected: false

    // Get neighbors of a vertex
    console.log("\nNeighbors of vertex 0:", myGraph.getNeighbors(0)); // Expected: [1, 2]
    console.log("Neighbors of vertex 3:", myGraph.getNeighbors(3)); // Expected: [4]
    console.log("Neighbors of vertex 4:", myGraph.getNeighbors(4)); // Expected: [0]
    console.log("Neighbors of vertex 1:", myGraph.getNeighbors(1)); // Expected: [3]

    // Test invalid vertex input
    console.log("\nTesting invalid input:");
    myGraph.addEdge(0, 5); // Expected: Error message
    console.log("Edge from 0 to 5 exists:", myGraph.hasEdge(0, 5)); // Expected: Error message, then false
    console.log("Neighbors of vertex 5:", myGraph.getNeighbors(5)); // Expected: Error message, then []

    console.log("\n--- End Sample Run ---");
}

// Execute the sample run function
sampleRun();

/*
    Expected Output from Sample Run:
    -----------------------------
    --- Sample Run: Directed Graph Adjacency Matrix ---
    Created a graph with 5 vertices.
    Added edge from 0 to 1
    Added edge from 0 to 2
    Added edge from 1 to 3
    Added edge from 2 to 3
    Added edge from 3 to 4
    Added edge from 4 back to 0

    --- Adjacency Matrix ---
      0 1 2 3 4
    -----------
    0| 0 1 1 0 0
    1| 0 0 0 1 0
    2| 0 0 0 1 0
    3| 0 0 0 0 1
    4| 1 0 0 0 0
    ------------------------

    Checking for edges:
    Edge from 0 to 1 exists: true
    Edge from 1 to 0 exists: false
    Edge from 2 to 3 exists: true
    Edge from 0 to 4 exists: false

    Neighbors of vertex 0: [1,2]
    Neighbors of vertex 3: [4]
    Neighbors of vertex 4: [0]
    Neighbors of vertex 1: [3]

    Testing invalid input:
    Error: Invalid vertex indices. Vertices must be between 0 and 4.
    Error: Invalid vertex indices. Vertices must be between 0 and 4.
    Edge from 0 to 5 exists: false
    Error: Invalid vertex index. Vertex must be between 0 and 4.
    Neighbors of vertex 5: []

    --- End Sample Run ---
*/
