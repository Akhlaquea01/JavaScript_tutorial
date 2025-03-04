/**
 * Design and implement an LRU (Least Recently Used) cache data structure in JavaScript that efficiently supports the following operations:
•
get(key): Retrieve the value associated with the given key.
•
put(key, value): Insert or update a key-value pair in the cache.
The LRU cache has a limited capacity. When the cache is full, it should evict the least recently used item to make space for new items. When a key is accessed (either through put or get), it becomes the most recently used
 */

class ListNode {
    constructor(key, value) {
        this.key = key; // Store key for map reference
        this.value = value; // Store value for retrieval
        this.prev = null; // Pointer to previous node
        this.next = null; // Pointer to next node
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity; // Maximum capacity of cache
        this.map = new Map(); // Hash map for quick key lookup

        // Dummy head and tail to simplify edge cases
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Remove a node from the doubly linked list
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Add a node right after the head (mark as recently used)
    _addNodeToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    // Retrieve a value from the cache
    get(key) {
        if (!this.map.has(key)) return -1; // Return -1 if key not found

        const node = this.map.get(key);
        this._removeNode(node); // Remove from current position
        this._addNodeToHead(node); // Move to the front (most recently used)
        return node.value; // Return the value
    }

    // Insert or update a value in the cache
    put(key, value) {
        if (this.map.has(key)) {
            this._removeNode(this.map.get(key)); // Remove existing node if present
        }

        const newNode = new ListNode(key, value); // Create a new node
        this._addNodeToHead(newNode); // Add to the front
        this.map.set(key, newNode); // Store in the map

        // If cache exceeds capacity, remove the least recently used node (from the tail)
        if (this.map.size > this.capacity) {
            const lruNode = this.tail.prev; // Get LRU node
            this._removeNode(lruNode); // Remove from the list
            this.map.delete(lruNode.key); // Remove from the map
        }
    }
}

// Example Usage:
const cache = new LRUCache(2);
cache.put(1, 1); // Cache is {1=1}
cache.put(2, 2); // Cache is {1=1, 2=2}
console.log(cache.get(1)); // Returns 1 (updates order)
cache.put(3, 3); // Evicts key 2, Cache is {1=1, 3=3}
console.log(cache.get(2)); // Returns -1 (not found)
cache.put(4, 4); // Evicts key 1, Cache is {3=3, 4=4}
console.log(cache.get(1)); // Returns -1 (not found)
console.log(cache.get(3)); // Returns 3
console.log(cache.get(4)); // Returns 4
