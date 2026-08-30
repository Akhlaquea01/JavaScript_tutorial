class Node {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

/**
 * N-ary tree: each node can have any number of children (stored in an array),
 * as opposed to a binary tree's fixed left/right.
 */
class NaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /**
     * Insert a child node under a given parent node.
     * Time: O(1)  Space: O(1)
     */
    insert(parent, val) {
        const newNode = new Node(val);
        parent.children.push(newNode);
        return newNode;  // Returned to allow chaining further inserts onto it
    }

    /**
     * Depth First Search traversal, visiting each node before its children.
     * Time: O(n)  Space: O(n) (recursion stack)
     */
    dfs(node) {
        if (!node) return;
        console.log(node.val);
        for (let child of node.children) {
            this.dfs(child);
        }
    }

    /**
     * Breadth First Search (level-order) traversal.
     * Time: O(n)  Space: O(n) (queue)
     */
    bfs(node) {
        if (!node) return;
        let queue = [node];

        while (queue.length > 0) {
            let currentNode = queue.shift();
            console.log(currentNode.val);

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
