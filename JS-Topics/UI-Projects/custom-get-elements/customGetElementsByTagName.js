function customGetElementsByTagName(tagName, root) {
    // Normalize tag name for case-insensitive comparison,
    // similar to how native methods behave for HTML elements.
    const lowercasedTagName = tagName.toLowerCase();
    const foundElements = [];
  
    // Start the recursive search.
    function traverse(node) {
      if (!node) {
        return;
      }
  
      // Check if the current node's tag matches the target.
      // 'node.tagName' returns the tag in uppercase, so we convert it to lowercase for comparison.
      if (node.nodeType === 1 && (lowercasedTagName === '*' || node.tagName.toLowerCase() === lowercasedTagName)) {
        foundElements.push(node);
      }
  
      // Recursively visit all child nodes.
      for (const child of node.children) {
        traverse(child);
      }
    }
  
    // If no root is provided, use the entire document body.
    const startNode = root || document.body;
    traverse(startNode);
    return foundElements;
  }
  