class TreeNode {
    /**
     * Node class for Binary Tree
     * @param {*} data - The value to be stored in the node
     */
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert a new node in level order (breadth-first) to maintain complete tree
     * @param {*} data - The value to insert
     */
    insert(data) {
        const newNode = new TreeNode(data);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        // Use queue for level order insertion
        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            // Check left child
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            // Check right child
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    /**
     * Search for a value in the tree (breadth-first search)
     * @param {*} target - The value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    search(target) {
        if (this.root === null) return false;

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.data === target) {
                return true;
            }

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return false;
    }

    // ---------- TRAVERSAL METHODS ----------

    /**
     * In-order traversal (Left, Root, Right)
     * @param {TreeNode} node - Starting node (defaults to root)
     * @returns {Array} - Array of values in traversal order
     */
    inOrderTraversal(node = this.root) {
        if (node === null) return [];

        return [
            ...this.inOrderTraversal(node.left),
            node.data,
            ...this.inOrderTraversal(node.right)
        ];
    }

    /**
     * Pre-order traversal (Root, Left, Right)
     * @param {TreeNode} node - Starting node (defaults to root)
     * @returns {Array} - Array of values in traversal order
     */
    preOrderTraversal(node = this.root) {
        if (node === null) return [];

        return [
            node.data,
            ...this.preOrderTraversal(node.left),
            ...this.preOrderTraversal(node.right)
        ];
    }

    /**
     * Post-order traversal (Left, Right, Root)
     * @param {TreeNode} node - Starting node (defaults to root)
     * @returns {Array} - Array of values in traversal order
     */
    postOrderTraversal(node = this.root) {
        if (node === null) return [];

        return [
            ...this.postOrderTraversal(node.left),
            ...this.postOrderTraversal(node.right),
            node.data
        ];
    }

    /**
     * Level-order traversal (Breadth-first)
     * @returns {Array} - Array of values in traversal order
     */
    levelOrderTraversal() {
        if (this.root === null) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return result;
    }

    /**
     * Reverse level-order traversal (from bottom to top)
     * @returns {Array} - Array of values in traversal order
     */
    reverseLevelOrderTraversal() {
        if (this.root === null) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            result.unshift(current.data); // Add to beginning for reverse order

            // Right first for proper reversal
            if (current.right !== null) {
                queue.push(current.right);
            }

            if (current.left !== null) {
                queue.push(current.left);
            }
        }

        return result;
    }
}

// Example Usage:
const tree = new BinaryTree();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

// Search for values
console.log(tree.search(7)); // true
console.log(tree.search(99)); // false

// Traversals
console.log("In-order:", tree.inOrderTraversal());    // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order:", tree.preOrderTraversal());  // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order:", tree.postOrderTraversal()); // [3, 7, 5, 12, 18, 15, 10]
console.log("Level-order:", tree.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18]
console.log("Reverse Level-order:", tree.reverseLevelOrderTraversal()); // [18, 12, 7, 3, 15, 5, 10]