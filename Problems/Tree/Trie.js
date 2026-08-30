class TrieNode {
    constructor() {
        this.children = {};  // Map of character -> TrieNode
        this.isEndOfWord = false;  // Flag to mark the end of a word
    }
}

/**
 * Trie (prefix tree): stores strings character-by-character along root-to-node
 * paths so that words sharing a prefix share the same path.
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Insert a word into the Trie, creating nodes for any missing characters.
     * Time: O(L)  Space: O(L), where L is the word length
     */
    insert(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    /**
     * Search for an exact word in the Trie.
     * Time: O(L)  Space: O(1), where L is the word length
     */
    search(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                return false;  // Word not found
            }
            node = node.children[char];
        }

        return node.isEndOfWord;  // Return true if it's a complete word
    }

    /**
     * Check if any word in the Trie starts with the given prefix.
     * Time: O(L)  Space: O(1), where L is the prefix length
     */
    startsWith(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return false;  // No word starts with the prefix
            }
            node = node.children[char];
        }

        return true;  // Prefix exists in the Trie
    }
}

// Example usage
const trie = new Trie();

trie.insert("apple");
trie.insert("app");
trie.insert("banana");
trie.insert("bat");

console.log(trie.search("apple"));  // true
console.log(trie.search("app"));    // true
console.log(trie.search("banana")); // true
console.log(trie.search("ban"));    // false
console.log(trie.startsWith("ba")); // true
console.log(trie.startsWith("bat")); // true
console.log(trie.startsWith("cat")); // false
