// Color constants
const RED = 'RED';
const BLACK = 'BLACK';

class RBNode {
    /**
     * Node class for Red-Black Tree
     * @param {*} value - The value to be stored in the node
     */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = RED; // New nodes are always red
    }

    /**
     * Get the sibling node
     * @returns {RBNode|null} - The sibling node or null
     */
    sibling() {
        if (!this.parent) return null;
        return this === this.parent.left ? this.parent.right : this.parent.left;
    }

    /**
     * Check if node is a left child
     * @returns {boolean} - True if left child
     */
    isLeftChild() {
        return this === this.parent?.left;
    }

    /**
     * Check if node has a red child
     * @returns {boolean} - True if has at least one red child
     */
    hasRedChild() {
        return (this.left !== null && this.left.color === RED) ||
            (this.right !== null && this.right.color === RED);
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert a value into the tree
     * @param {*} value - Value to insert
     */
    insert(value) {
        const newNode = new RBNode(value);

        if (this.root === null) {
            this.root = newNode;
            this.root.color = BLACK; // Root must be black
            return;
        }

        // Regular BST insertion
        let current = this.root;
        while (true) {
            if (value === current.value) return; // No duplicates

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    newNode.parent = current;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    newNode.parent = current;
                    break;
                }
                current = current.right;
            }
        }

        // Fix the tree to maintain Red-Black properties
        this.fixInsert(newNode);
    }

    /**
     * Fix the tree after insertion to maintain Red-Black properties
     * @param {RBNode} node - The newly inserted node
     */
    fixInsert(node) {
        while (node.parent?.color === RED) {
            const parent = node.parent;
            const grandParent = parent.parent;
            const uncle = parent.sibling();

            if (uncle?.color === RED) {
                // Case 1: Uncle is red - Recolor
                parent.color = BLACK;
                uncle.color = BLACK;
                grandParent.color = RED;
                node = grandParent;
            } else {
                // Case 2: Uncle is black - Rotations needed
                if (parent.isLeftChild()) {
                    if (!node.isLeftChild()) {
                        // Left-Right case
                        this.rotateLeft(parent);
                        node = parent;
                        continue;
                    }
                    // Left-Left case
                    parent.color = BLACK;
                    grandParent.color = RED;
                    this.rotateRight(grandParent);
                } else {
                    if (node.isLeftChild()) {
                        // Right-Left case
                        this.rotateRight(parent);
                        node = parent;
                        continue;
                    }
                    // Right-Right case
                    parent.color = BLACK;
                    grandParent.color = RED;
                    this.rotateLeft(grandParent);
                }
            }
        }

        // Ensure root is black
        this.root.color = BLACK;
    }

    /**
     * Left rotation
     * @param {RBNode} node - The node to rotate around
     */
    rotateLeft(node) {
        const newParent = node.right;
        node.right = newParent.left;

        if (newParent.left !== null) {
            newParent.left.parent = node;
        }

        newParent.parent = node.parent;

        if (node.parent === null) {
            this.root = newParent;
        } else if (node === node.parent.left) {
            node.parent.left = newParent;
        } else {
            node.parent.right = newParent;
        }

        newParent.left = node;
        node.parent = newParent;
    }

    /**
     * Right rotation
     * @param {RBNode} node - The node to rotate around
     */
    rotateRight(node) {
        const newParent = node.left;
        node.left = newParent.right;

        if (newParent.right !== null) {
            newParent.right.parent = node;
        }

        newParent.parent = node.parent;

        if (node.parent === null) {
            this.root = newParent;
        } else if (node === node.parent.right) {
            node.parent.right = newParent;
        } else {
            node.parent.left = newParent;
        }

        newParent.right = node;
        node.parent = newParent;
    }

    /**
     * Search for a value in the tree
     * @param {*} value - Value to search for
     * @returns {boolean} - True if found
     */
    contains(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // ---------- TRAVERSAL METHODS ----------

    /**
     * In-order traversal (Left, Root, Right)
     * @returns {Array} - Array of values in traversal order
     */
    inOrder() {
        const result = [];
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        };
        traverse(this.root);
        return result;
    }

    /**
     * Pre-order traversal (Root, Left, Right)
     * @returns {Array} - Array of values in traversal order
     */
    preOrder() {
        const result = [];
        const traverse = (node) => {
            if (node === null) return;
            result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
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
     * Visualize the tree structure (for debugging)
     */
    visualize() {
        const print = (node, prefix = "", isLeft = true) => {
            if (node === null) return;
            console.log(prefix + (isLeft ? "├── " : "└── ") +
                node.value + " (" + node.color + ")");
            print(node.left, prefix + (isLeft ? "│   " : "    "), true);
            print(node.right, prefix + (isLeft ? "│   " : "    "), false);
        };
        print(this.root);
    }
}

// Example Usage
const rbt = new RedBlackTree();

// Insert values
rbt.insert(10);
rbt.insert(5);
rbt.insert(15);
rbt.insert(3);
rbt.insert(7);
rbt.insert(12);
rbt.insert(18);
rbt.insert(1);
rbt.insert(4);

// Search
console.log("Contains 7:", rbt.contains(7)); // true
console.log("Contains 99:", rbt.contains(99)); // false

// Traversals
console.log("In-order:", rbt.inOrder()); // Sorted order
console.log("Level-order:", rbt.levelOrder());

// Visualize the tree structure
console.log("\nTree Structure:");
rbt.visualize();