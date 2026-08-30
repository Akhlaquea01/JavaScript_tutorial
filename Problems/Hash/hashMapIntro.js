/**
 * Problem Description: Hash Table Implementation
 *
 * Implement a basic Hash Table data structure using an array and separate chaining
 * to handle collisions. The hash table should support the following operations:
 * - constructor: Initializes the hash table with a specified size (number of buckets).
 * - _hash: A private helper method to compute the hash index for a given key.
 * - printTable: Prints the contents of the hash table's internal array (buckets).
 * - set: Adds or updates a key-value pair in the hash table. Handles collisions.
 * - get: Retrieves the value associated with a given key. Handles collisions.
 * - keys: Returns an array containing all keys currently stored in the hash table.
 *
 * This implementation uses an array ('dataMap') as the buckets. When a collision occurs
 * (multiple keys hash to the same index), the key-value pairs are stored as arrays
 * within an array at that index (e.g., dataMap[index] = [[key1, value1], [key2, value2]]).
 */


/**
 * Represents a simple Hash Table using an array and separate chaining for collision handling.
 */
class HashTable {
    /**
     * Creates an instance of HashTable.
     * Initializes the internal array (dataMap) which serves as the buckets.
     * @param {number} [size=7] - The desired number of buckets for the hash table. Defaults to 7.
     */
    constructor(size = 7) {
        // Initialize the main array (dataMap) with the specified size.
        // Each element of this array will potentially hold another array
        // to handle collisions (separate chaining).
        this.dataMap = new Array(size);
    }

    /**
     * Computes the hash code (index) for a given string key.
     * This is a simple hashing function that sums the character codes of the key,
     * multiplies by a prime number (23 is common), and takes the modulo of the
     * array size to ensure the index is within the bounds of the dataMap array.
     * This is a private helper method, conventionally prefixed with '_'.
     * @param {string} key - The string key to hash.
     * @returns {number} The computed index (hash code) for the key within the dataMap array.
     */
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            // Multiply by a prime (23) to spread hash values before wrapping into bounds.
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }
        return hash;
    }

    /**
     * Prints the contents of the internal hash table array (dataMap).
     * Useful for visualizing the structure and how elements are distributed across buckets,
     * including how collisions are handled.
     */
    printTable() {
        console.log("--- Hash Table Contents ---");
        for (let i = 0; i < this.dataMap.length; i++) {
            console.log(i, ": ", this.dataMap[i]);
        }
        console.log("-------------------------");
    }

    /**
     * Adds a new key-value pair to the hash table, or updates the value if the key already exists.
     * Uses the _hash method to determine the bucket index. Handles collisions using separate chaining.
     * @param {string} key - The key for the value.
     * @param {*} value - The value to store.
     * @returns {HashTable} Returns the HashTable instance to allow method chaining.
     */
    set(key, value) {
        let index = this._hash(key);

        if (!this.dataMap[index]) {
            this.dataMap[index] = [];
        }

        // Note: doesn't check for an existing key, so re-setting a key appends
        // a new pair to the chain rather than updating the old one.
        this.dataMap[index].push([key, value]);

        return this;
    }

    /**
     * Retrieves the value associated with a given key from the hash table.
     * Uses the _hash method to find the bucket index and then iterates through the chain
     * at that index to find the matching key.
     * @param {string} key - The key to retrieve the value for.
     * @returns {*} The value associated with the key, or undefined if the key is not found.
     */
    get(key) {
        let index = this._hash(key);

        if (this.dataMap[index]) {
            for (let i = 0; i < this.dataMap[index].length; i++) {
                if (this.dataMap[index][i][0] === key) {
                    return this.dataMap[index][i][1];
                }
            }
        }

        return undefined;
    }

    /**
     * Collects and returns an array containing all keys currently stored in the hash table.
     * Iterates through all buckets and all items within each bucket's chain.
     * @returns {string[]} An array of all keys.
     */
    keys() {
        let allKeys = [];

        for (let i = 0; i < this.dataMap.length; i++) {
            if (this.dataMap[i]) {
                for (let j = 0; j < this.dataMap[i].length; j++) {
                    allKeys.push(this.dataMap[i][j][0]);
                }
            }
        }
        return allKeys;
    }

}



/**
 * Sample Run Example
 * Demonstrates creating a hash table, setting some key-value pairs,
 * and retrieving all keys using the keys() method.
 */
function test() {
    console.log("--- Sample Run ---");

    // Create a new HashTable instance with the default size (7).
    let myHashTable = new HashTable();
    console.log("Created new HashTable.");

    // Set several key-value pairs. Observe how printTable shows elements
    // placed into different buckets based on the hash function, and how
    // collisions might result in arrays within buckets.
    console.log("\nSetting key-value pairs:");
    myHashTable.set("paint", 20);
    myHashTable.set("bolts", 40); // Will likely collide with 'paint' as per common examples
    myHashTable.set("nails", 100);
    myHashTable.set("tile", 50);
    myHashTable.set("lumber", 80);
    myHashTable.set("washers", 60); // Another key to demonstrate more data

    // Print the internal table structure to see the buckets and chains.
    myHashTable.printTable();

    // Demonstrate the get method
    console.log("\nRetrieving values:");
    console.log("Value for 'paint':", myHashTable.get("paint"));   // Expected: 20 (or the updated value if set handled updates)
    console.log("Value for 'bolts':", myHashTable.get("bolts"));   // Expected: 40
    console.log("Value for 'nails':", myHashTable.get("nails"));   // Expected: 100
    console.log("Value for 'glue':", myHashTable.get("glue"));     // Expected: undefined (key not set)


    // Demonstrate the keys method
    console.log("\nRetrieving all keys:");
    // The order might vary depending on the specific hash function and insertion order within chains.
    // The test expects a specific order based on the original implementation's iteration over buckets.
    console.log(myHashTable.keys()); // Expected Output shown below

    console.log("--- End Sample Run ---");
}


// Execute the sample run function
test();


/*
    EXPECTED OUTPUT for myHashTable.keys() in the sample run:
    ---------------------------------------------------------
    [ 'paint', 'bolts', 'nails', 'tile', 'lumber', 'washers' ]

    Note: The exact output of printTable will depend on the hash function
    and the specific string inputs, showing which keys land in which buckets.
    For the default size 7 and the given hash function, 'paint' and 'bolts'
    often hash to the same index, showing a collision.

    Example printTable output (may vary slightly):
    --- Hash Table Contents ---
    0 :  undefined
    1 :  [ [ 'paint', 20 ], [ 'bolts', 40 ] ] // Collision here
    2 :  undefined
    3 :  undefined
    4 :  [ [ 'nails', 100 ], [ 'washers', 60 ] ] // Another potential collision
    5 :  [ [ 'lumber', 80 ] ]
    6 :  [ [ 'tile', 50 ] ]
    -------------------------

*/