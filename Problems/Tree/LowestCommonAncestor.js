/**
 * Problem Statement:
 * -------------------
 * Given the root of a (general, not necessarily sorted) binary tree and two
 * values that exist in it, find their Lowest Common Ancestor (LCA) — the
 * deepest node that has both values as descendants (a node can be its own
 * descendant).
 *
 * Unlike a BST (see binarySearchTree.js's findLCA, which can use value
 * ordering to decide left/right), a plain binary tree has no ordering to
 * exploit, so both subtrees must actually be searched.
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Level-order insert, matching binaryTree.js's approach, so trees built
    // here are plain/unordered rather than BST-shaped.
    // Time: O(n)  Space: O(n) (queue)
    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.left === null) {
                current.left = newNode;
                return this;
            }
            queue.push(current.left);

            if (current.right === null) {
                current.right = newNode;
                return this;
            }
            queue.push(current.right);
        }
        return this;
    }

    contains(value) {
        const search = (node) => {
            if (node === null) return false;
            if (node.value === value) return true;
            return search(node.left) || search(node.right);
        };
        return search(this.root);
    }

    /**
     * Find the lowest common ancestor of two values in the tree.
     * @param {*} value1
     * @param {*} value2
     * @returns {*} value of the LCA, or null if either value isn't in the tree
     * Time: O(n)  Space: O(n) (recursion stack)
     */
    findLCA(value1, value2) {
        if (!this.contains(value1) || !this.contains(value2)) return null;

        // Recursive case: if value1/value2 are found in different subtrees
        // of `node`, then `node` itself is the LCA. If both are found in
        // the same subtree, the LCA is further down that subtree.
        const findLCANode = (node, val1, val2) => {
            if (node === null) return null;
            if (node.value === val1 || node.value === val2) return node;

            const left = findLCANode(node.left, val1, val2);
            const right = findLCANode(node.right, val1, val2);

            if (left && right) return node; // found on both sides -> this is the LCA
            return left || right;
        };

        return findLCANode(this.root, value1, value2)?.value ?? null;
    }
}

// ========== TEST CASES ========== //
// Level-order insert of [1,2,3,4,5,6,7] builds:
//              1
//            /   \
//           2     3
//          / \   / \
//         4   5 6   7
const tree = new BinaryTree();
[1, 2, 3, 4, 5, 6, 7].forEach(v => tree.insert(v));

console.log("=== Test 1: Both in left subtree ===");
console.log(tree.findLCA(4, 5)); // Expected: 2

console.log("\n=== Test 2: One is ancestor of the other ===");
console.log(tree.findLCA(2, 4)); // Expected: 2

console.log("\n=== Test 3: One in each subtree ===");
console.log(tree.findLCA(4, 6)); // Expected: 1

console.log("\n=== Test 4: Value not in tree ===");
console.log(tree.findLCA(4, 100)); // Expected: null

console.log("\n=== Test 5: Same node twice ===");
console.log(tree.findLCA(5, 5)); // Expected: 5
