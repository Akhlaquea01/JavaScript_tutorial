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

                // Case 1: Node with no children
                if (node.left === null && node.right === null) {
                    return null;
                }

                // Case 2: Node with one child
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }

                // Case 3: Node with two children
                // Find the minimum value in the right subtree
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                // Replace the node's value with the minimum value
                node.value = tempNode.value;
                // Delete the duplicate value from right subtree
                node.right = deleteNode(node.right, tempNode.value);
                return node;
            }
        };

        this.root = deleteNode(this.root, value);
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
}

// Example Usage:
const bst = new BinarySearchTree();

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);

// Search for values
console.log("Contains 7:", bst.contains(7)); // true
console.log("Contains 99:", bst.contains(99)); // false

// Traversals
console.log("In-order:", bst.inOrder());    // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order:", bst.preOrder());  // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order:", bst.postOrder()); // [3, 7, 5, 12, 18, 15, 10]
console.log("Level-order:", bst.levelOrder()); // [10, 5, 15, 3, 7, 12, 18]

// Min and Max
console.log("Min value:", bst.findMin()); // 3
console.log("Max value:", bst.findMax()); // 18

// Delete a node
bst.delete(15);
console.log("After deleting 15 (In-order):", bst.inOrder()); // [3, 5, 7, 10, 12, 18]