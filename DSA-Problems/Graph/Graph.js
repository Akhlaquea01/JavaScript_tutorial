// Graph.js - Base Graph Class
class Graph {
    constructor() {
        /**
         * Adjacency list representation of the graph
         * @type {Object.<string, Array<string>>}
         */
        this.adjacencyList = {};
    }

    /**
     * Adds a new vertex to the graph
     * @param {string} vertex - The vertex to add
     */
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    /**
     * Adds an undirected edge between two vertices
     * @param {string} vertex1 - First vertex
     * @param {string} vertex2 - Second vertex
     */
    addEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
            throw new Error("One or both vertices don't exist");
        }

        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    /**
     * Removes an edge between two vertices
     * @param {string} vertex1 - First vertex
     * @param {string} vertex2 - Second vertex
     */
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    /**
     * Removes a vertex and all its connections
     * @param {string} vertex - Vertex to remove
     */
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

module.exports = Graph;