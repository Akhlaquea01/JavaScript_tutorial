class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function preorderTraversal(root) {
    if (root === null) return;
    console.log(root.value); // Process the current node
    preorderTraversal(root.left); // Traverse left subtree
    preorderTraversal(root.right); // Traverse right subtree
}

function inorderTraversal(root) {
    if (root === null) return;
    inorderTraversal(root.left); // Traverse left subtree
    console.log(root.value); // Process the current node
    inorderTraversal(root.right); // Traverse right subtree
}

function postorderTraversal(root) {
    if (root === null) return;
    postorderTraversal(root.left); // Traverse left subtree
    postorderTraversal(root.right); // Traverse right subtree
    console.log(root.value); // Process the current node
}

function findHeight(root) {
    if (root === null) return -1;
    return Math.max(findHeight(root.left), findHeight(root.right)) + 1;
}

function isBalanced(root) {
    if (root === null) return true;

    function checkHeight(node) {
        if (node === null) return 0;

        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // Left subtree is unbalanced

        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // Right subtree is unbalanced

        const heightDiff = Math.abs(leftHeight - rightHeight);
        if (heightDiff > 1) return -1; // Current node is unbalanced

        return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(root) !== -1;
}

// Example 1: A simple balanced binary tree
const balancedTree = new TreeNode(1);
balancedTree.left = new TreeNode(2);
balancedTree.right = new TreeNode(3);
balancedTree.left.left = new TreeNode(4);
balancedTree.left.right = new TreeNode(5);

console.log("Example 1: Balanced Binary Tree");
console.log("Preorder Traversal:");
preorderTraversal(balancedTree);
console.log("\nInorder Traversal:");
inorderTraversal(balancedTree);
console.log("\nPostorder Traversal:");
postorderTraversal(balancedTree);
console.log("\nHeight of the tree:", findHeight(balancedTree));
console.log("Is the tree balanced?", isBalanced(balancedTree)); // Output: true

// Example 2: A more complex unbalanced binary tree
const unbalancedTree = new TreeNode(1);
unbalancedTree.left = new TreeNode(2);
unbalancedTree.left.left = new TreeNode(3);
unbalancedTree.left.left.left = new TreeNode(4);
unbalancedTree.right = new TreeNode(5);
unbalancedTree.right.right = new TreeNode(6);
unbalancedTree.right.right.right = new TreeNode(7);

console.log("\nExample 2: Unbalanced Binary Tree");
console.log("Preorder Traversal:");
preorderTraversal(unbalancedTree);
console.log("\nInorder Traversal:");
inorderTraversal(unbalancedTree);
console.log("\nPostorder Traversal:");
postorderTraversal(unbalancedTree);
console.log("\nHeight of the tree:", findHeight(unbalancedTree));
console.log("Is the tree balanced?", isBalanced(unbalancedTree)); // Output: false
