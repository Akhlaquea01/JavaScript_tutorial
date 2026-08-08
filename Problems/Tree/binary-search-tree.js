class TreeNode {
    /**
     * Node class for Binary Search Tree
     * @param {*} value - The value to be stored in the node
     */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert a new value into the BST
     * @param {*} value - The value to insert
     * @returns {BinarySearchTree} - The BST instance for chaining
     */
    insert(value) {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) return undefined; // Avoid duplicates

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    /**
     * Search for a value in the BST
     * @param {*} value - The value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    contains(value) {
        if (this.root === null) return false;

        let current = this.root;

        while (current) {
            if (value === current.value) return true;

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    /**
     * Find a node with the given value
     * @param {*} value - The value to find
     * @returns {TreeNode|null} - The node if found, null otherwise
     */
    findNode(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) return current;

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    /**
     * Delete a value from the BST
     * @param {*} value - The value to delete
     * @returns {TreeNode} - The root of the modified tree
     */
    delete(value) {
        const deleteNode = (node, value) => {
            if (node === null) return null;

            if (value < node.value) {
                node.left = deleteNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = deleteNode(node.right, value);
                return node;
            } else {
                // Node to delete found
                if (node.left === null && node.right === null) return null;
                if (node.left === null) return node.right;
                if (node.right === null) return node.left;

                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.value = tempNode.value;
                node.right = deleteNode(node.right, tempNode.value);
                return node;
            }
        };

        this.root = deleteNode(this.root, value);
        return this.root;
    }

    // ---------- TRAVERSAL METHODS ----------

    /**
     * In-order traversal (Left, Root, Right)
     * @returns {Array} - Array of values in traversal order
     */
    inOrder() {
        const result = [];

        const traverse = (node) => {
            if (node.left) traverse(node.left);
            result.push(node.value);
            if (node.right) traverse(node.right);
        };

        if (this.root) traverse(this.root);
        return result;
    }

    /**
     * Pre-order traversal (Root, Left, Right)
     * @returns {Array} - Array of values in traversal order
     */
    preOrder() {
        const result = [];

        const traverse = (node) => {
            result.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        };

        if (this.root) traverse(this.root);
        return result;
    }

    /**
     * Post-order traversal (Left, Right, Root)
     * @returns {Array} - Array of values in traversal order
     */
    postOrder() {
        const result = [];

        const traverse = (node) => {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            result.push(node.value);
        };

        if (this.root) traverse(this.root);
        return result;
    }

    /**
     * Level-order traversal (Breadth-first)
     * @returns {Array} - Array of values in traversal order
     */
    levelOrder() {
        const result = [];
        const queue = [];

        if (this.root) {
            queue.push(this.root);

            while (queue.length > 0) {
                const current = queue.shift();
                result.push(current.value);

                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);
            }
        }

        return result;
    }

    // ---------- UTILITY METHODS ----------

    /**
     * Find the minimum value in the BST
     * @returns {*} - The minimum value
     */
    findMin() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }

        return current.value;
    }

    /**
     * Find the maximum value in the BST
     * @returns {*} - The maximum value
     */
    findMax() {
        if (this.root === null) return null;

        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }

        return current.value;
    }

    /**
     * Get the height of the tree
     * @returns {number} - The height of the tree
     */
    getHeight() {
        const calculateHeight = (node) => {
            if (node === null) return -1;
            return Math.max(calculateHeight(node.left), calculateHeight(node.right)) + 1;
        };
        return calculateHeight(this.root);
    }

    /**
     * Check if the tree is balanced
     * @returns {boolean} - True if balanced, false otherwise
     */
    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return { balanced: true, height: -1 };

            const left = checkBalance(node.left);
            const right = checkBalance(node.right);

            const balanced =
                left.balanced &&
                right.balanced &&
                Math.abs(left.height - right.height) <= 1;

            const height = Math.max(left.height, right.height) + 1;

            return { balanced, height };
        };

        return checkBalance(this.root).balanced;
    }

    // ---------- NEW LCA FUNCTIONALITY ----------

    /**
     * Find the lowest common ancestor of two nodes in the BST
     * @param {*} value1 - First value
     * @param {*} value2 - Second value
     * @returns {*} - Value of the lowest common ancestor
     */
    findLCA(value1, value2) {
        // Helper function to find LCA in BST
        const findLCAInBST = (node, val1, val2) => {
            if (node === null) return null;

            // If both values are less than current node, LCA is in left subtree
            if (node.value > val1 && node.value > val2) {
                return findLCAInBST(node.left, val1, val2);
            }

            // If both values are greater than current node, LCA is in right subtree
            if (node.value < val1 && node.value < val2) {
                return findLCAInBST(node.right, val1, val2);
            }

            // Current node is LCA
            return node.value;
        };

        return findLCAInBST(this.root, value1, value2);
    }

    /**
     * Find the distance between two nodes in the BST
     * @param {*} value1 - First value
     * @param {*} value2 - Second value
     * @returns {number} - Distance between nodes
     */
    findDistance(value1, value2) {
        // Find LCA first
        const lcaValue = this.findLCA(value1, value2);
        if (lcaValue === null) return -1;

        // Calculate distance from LCA to each node
        const distanceFromLCA = (value) => {
            let distance = 0;
            let current = this.root;

            while (current && current.value !== value) {
                if (value < current.value) {
                    current = current.left;
                } else {
                    current = current.right;
                }
                distance++;
            }

            return current ? distance : -1;
        };

        const dist1 = distanceFromLCA(value1);
        const dist2 = distanceFromLCA(value2);

        if (dist1 === -1 || dist2 === -1) return -1;

        return dist1 + dist2;
    }
}

// ---------- EXAMPLE USAGE ----------
const bst = new BinarySearchTree();

// Insert values
bst.insert(10).insert(5).insert(15).insert(3).insert(7).insert(12).insert(18);

// Test LCA functionality
console.log("LCA of 3 and 7:", bst.findLCA(3, 7)); // 5
console.log("LCA of 7 and 12:", bst.findLCA(7, 12)); // 10
console.log("LCA of 12 and 18:", bst.findLCA(12, 18)); // 15

// Test distance functionality
console.log("Distance between 3 and 7:", bst.findDistance(3, 7)); // 2 (3->5->7)
console.log("Distance between 7 and 12:", bst.findDistance(7, 12)); // 3 (7->5->10->12)
console.log("Distance between 12 and 18:", bst.findDistance(12, 18)); // 2 (12->15->18)

// Test other methods
console.log("Tree height:", bst.getHeight()); // 2
console.log("Is balanced:", bst.isBalanced()); // true
bst.delete(15);
console.log("Is balanced after deletion:", bst.isBalanced()); // false