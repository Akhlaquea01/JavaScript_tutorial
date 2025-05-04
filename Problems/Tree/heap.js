class Heap {
    /**
     * @param {string} type - 'min' for Min-Heap, 'max' for Max-Heap
     */
    constructor(type = 'min') {
        this.heap = [];
        this.type = type; // 'min' or 'max'
    }

    // Helper methods
    getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
    hasParent(index) { return this.getParentIndex(index) >= 0; }

    leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
    rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
    parent(index) { return this.heap[this.getParentIndex(index)]; }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    /**
     * Peek at the root element
     * @returns {*} - The root element
     */
    peek() {
        if (this.heap.length === 0) throw new Error('Heap is empty');
        return this.heap[0];
    }

    /**
     * Remove and return the root element
     * @returns {*} - The root element
     */
    poll() {
        if (this.heap.length === 0) throw new Error('Heap is empty');
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    /**
     * Add a new element to the heap
     * @param {*} item - The element to add
     */
    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    /**
     * Move the last element up to maintain heap property
     */
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) &&
            ((this.type === 'min' && this.parent(index) > this.heap[index]) ||
                (this.type === 'max' && this.parent(index) < this.heap[index]))) {
            const parentIndex = this.getParentIndex(index);
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    /**
     * Move the root element down to maintain heap property
     */
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let childIndex = this.getLeftChildIndex(index);

            if (this.hasRightChild(index)) {
                if ((this.type === 'min' && this.rightChild(index) < this.leftChild(index)) ||
                    (this.type === 'max' && this.rightChild(index) > this.leftChild(index))) {
                    childIndex = this.getRightChildIndex(index);
                }
            }

            if ((this.type === 'min' && this.heap[index] < this.heap[childIndex]) ||
                (this.type === 'max' && this.heap[index] > this.heap[childIndex])) {
                break;
            }

            this.swap(index, childIndex);
            index = childIndex;
        }
    }

    /**
     * Get the size of the heap
     * @returns {number} - Number of elements in heap
     */
    size() {
        return this.heap.length;
    }

    /**
     * Check if heap is empty
     * @returns {boolean} - True if heap is empty
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Print the heap as a tree structure
     */
    print() {
        const levels = Math.ceil(Math.log2(this.heap.length + 1));
        let level = 0;
        let levelNodes = 1;
        let nodesPrinted = 0;

        while (level < levels) {
            const nodes = [];
            const start = Math.pow(2, level) - 1;
            const end = Math.min(start + levelNodes, this.heap.length);

            for (let i = start; i < end; i++) {
                nodes.push(this.heap[i]);
            }

            console.log(`Level ${level}: ${nodes.join(' ')}`);
            level++;
            levelNodes *= 2;
            nodesPrinted += nodes.length;
        }
    }
}

// Example Usage
console.log("=== Min-Heap ===");
const minHeap = new Heap('min');
minHeap.add(10);
minHeap.add(5);
minHeap.add(15);
minHeap.add(3);
minHeap.add(7);
minHeap.add(12);
minHeap.add(18);

console.log("Heap structure:");
minHeap.print();

console.log("\nPolling elements:");
while (!minHeap.isEmpty()) {
    console.log(minHeap.poll());
}

console.log("\n=== Max-Heap ===");
const maxHeap = new Heap('max');
maxHeap.add(10);
maxHeap.add(5);
maxHeap.add(15);
maxHeap.add(3);
maxHeap.add(7);
maxHeap.add(12);
maxHeap.add(18);

console.log("Heap structure:");
maxHeap.print();

console.log("\nPolling elements:");
while (!maxHeap.isEmpty()) {
    console.log(maxHeap.poll());
}

/**
 * Key Features:
Complete Binary Tree Property: The heap is always a complete binary tree (filled from left to right at each level)

Heap Property:

Min-Heap: Parent nodes are always smaller than or equal to child nodes

Max-Heap: Parent nodes are always larger than or equal to child nodes

Core Operations:

add(item): Insert a new element (O(log n))

poll(): Remove and return the root element (O(log n))

peek(): View the root element without removal (O(1))

Helper Methods:

heapifyUp(): Maintains heap property after insertion

heapifyDown(): Maintains heap property after removal

print(): Visualizes the heap structure

Efficiency:

Insertion: O(log n)

Removal: O(log n)

Peek: O(1)

Heapify: O(n) for building a heap from an array
 */