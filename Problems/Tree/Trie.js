class TrieNode {
    constructor() {
        this.children = {};  // Map of character -> TrieNode
        this.isEndOfWord = false;  // Flag to mark the end of a word
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;  // Mark the end of the word
    }

    // Search for a word in the Trie
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

    // Check if there is any word in the Trie that starts with the given prefix
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
