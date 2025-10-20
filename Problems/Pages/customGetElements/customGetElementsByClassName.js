function customGetElementsByClassName(classNames, root) {
    const foundElements = [];
    const requiredClasses = classNames.split(' ').filter(c => c);
  
    function traverse(node) {
      if (!node) {
        return;
      }
  
      // Check if the node is an element and has a 'classList' property.
      if (node.nodeType === 1 && node.classList) {
        // Use the 'every' method to check if the element has all the required classes.
        const hasAllClasses = requiredClasses.every(className => node.classList.contains(className));
        if (hasAllClasses) {
          foundElements.push(node);
        }
      }
  
      // Recursively visit all child nodes.
      for (const child of node.children) {
        traverse(child);
      }
    }
  
    const startNode = root || document.body;
    traverse(startNode);
    return foundElements;
  }
  