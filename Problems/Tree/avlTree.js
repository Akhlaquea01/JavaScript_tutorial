class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;   // Height of the subtree rooted here, used to compute balance factor
    }
}

/**
 * AVL Tree: a self-balancing BST that keeps every node's balance factor
 * (left subtree height - right subtree height) within [-1, 1] by performing
 * rotations after each insertion.
 */
class AVLTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert a value into the AVL Tree, rebalancing as needed.
     * Time: O(log n)  Space: O(log n) (recursion stack)
     */
    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (!node) return new Node(value);  // Insert at leaf node

        // 1. Perform standard BST insertion
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            return node;  // Duplicate values are not allowed
        }

        // 2. Update the height of the ancestor node
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

        // 3. Check balance factor
        const balance = this._getBalance(node);

        // 4. Perform rotations if the node is unbalanced

        // Left Left Case: left-heavy, and the new value landed in left.left
        // (the "outer" side) -> a single right rotation restores balance.
        if (balance > 1 && value < node.left.value) {
            return this._rightRotate(node);
        }

        // Right Right Case: mirror of Left Left, single left rotation.
        if (balance < -1 && value > node.right.value) {
            return this._leftRotate(node);
        }

        // Left Right Case: left-heavy, but the new value landed in left.right
        // (the "inner" side). A single rotation wouldn't balance this shape,
        // so first left-rotate the left child to turn it into the Left Left
        // case, then right-rotate the node.
        if (balance > 1 && value > node.left.value) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }

        // Right Left Case: mirror of Left Right.
        if (balance < -1 && value < node.right.value) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        return node;
    }

    /**
     * Rotate the subtree rooted at y to the right (used when left-heavy).
     * Time: O(1)  Space: O(1)
     */
    _rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        // Heights must be recomputed bottom-up: y moves below x.
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

        return x;
    }

    /**
     * Rotate the subtree rooted at x to the left (used when right-heavy).
     * Time: O(1)  Space: O(1)
     */
    _leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        // Heights must be recomputed bottom-up: x moves below y.
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

        return y;
    }

    _getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    // Get balance factor of a node
    _getBalance(node) {
        if (!node) return 0;
        return this._getHeight(node.left) - this._getHeight(node.right);
    }
}

// Example Usage
const avlTree = new AVLTree();
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(15);

console.log(avlTree);
