class Node {
    constructor(val) {
        this.val = val;        // Value of the node
        this.children = [];    // Array to store children nodes
    }
}

class NaryTree {
    constructor(root = null) {
        this.root = root;      // Root of the N-ary tree
    }

    // Insert a child node to a given parent node
    insert(parent, val) {
        const newNode = new Node(val); // Create a new node
        parent.children.push(newNode); // Add the new node to the parent's children
        return newNode;  // Return the new node to allow further operations
    }

    // Depth First Search (DFS) Traversal
    dfs(node) {
        if (!node) return;
        console.log(node.val);  // Visit the node (process it)
        for (let child of node.children) {
            this.dfs(child);  // Recursively visit each child
        }
    }

    // Breadth First Search (BFS) Traversal
    bfs(node) {
        if (!node) return;
        let queue = [node];  // Start with the root node in the queue

        while (queue.length > 0) {
            let currentNode = queue.shift();  // Get the first node in the queue
            console.log(currentNode.val);      // Visit the node (process it)

            // Add all children of the current node to the queue
            for (let child of currentNode.children) {
                queue.push(child);
            }
        }
    }
}

// Example Usage
const root = new Node(1);
const tree = new NaryTree(root);

// Insert children for the root node
const node2 = tree.insert(root, 2);
const node3 = tree.insert(root, 3);
const node4 = tree.insert(root, 4);

// Insert children for node 2
tree.insert(node2, 5);
tree.insert(node2, 6);

// Insert children for node 4
tree.insert(node4, 7);
tree.insert(node4, 8);
tree.insert(node4, 9);

// DFS Traversal
console.log("DFS Traversal:");
tree.dfs(root);  // Output: 1 2 5 6 3 4 7 8 9

// BFS Traversal
console.log("\nBFS Traversal:");
tree.bfs(root);  // Output: 1 2 3 4 5 6 7 8 9
