class Node {
    constructor(value) {
        this.value = value;   // Node value
        this.left = null;      // Left child
        this.right = null;     // Right child
        this.height = 1;       // Height of the node
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Insert a value into the AVL Tree
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

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return this._rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return this._leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        return node;
    }

    // Right rotate
    _rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

        return x;
    }

    // Left rotate
    _leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

        return y;
    }

    // Get height of the node
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
