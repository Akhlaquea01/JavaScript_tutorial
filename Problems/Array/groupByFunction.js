/**
 * Groups elements of a collection by keys generated from running each element 
 * through an iteratee function.
 * 
 * @param {Array} collection - The array to iterate over
 * @param {Function} iteratee - The function to generate grouping keys
 * @returns {Object} Returns the composed aggregate object
 */
function groupBy(collection, iteratee) {
    // Initialize the result object
    const result = {};

    // Handle edge case: empty collection
    if (!collection || collection.length === 0) {
        return result;
    }

    // Iterate through each element in the collection
    for (const item of collection) {
        // Get the grouping key by applying the iteratee to the current item
        const key = iteratee(item);

        // Convert key to string to ensure consistent object property access
        // (JavaScript object keys are always strings)
        const stringKey = String(key);

        // If the key doesn't exist in the result object, initialize it with an empty array
        if (!result[stringKey]) {
            result[stringKey] = [];
        }

        // Push the current item to the array for this key
        result[stringKey].push(item);
    }

    return result;
}

// Test Case 1: Group numbers by their integer part
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
// Expected: { '4': [4.2], '6': [6.1, 6.3] }

// Test Case 2: Group words by their first letter
console.log(groupBy(['apple', 'banana', 'cherry'], word => word[0]));
// Expected: { 'a': ['apple'], 'b': ['banana'], 'c': ['cherry'] }

// Test Case 3: Group objects by property value
console.log(groupBy(
    [
        { name: 'John', age: 20 },
        { name: 'Jane', age: 20 },
        { name: 'Bob', age: 30 }
    ],
    person => person.age
));
// Expected: { '20': [{name: 'John', age: 20}, {name: 'Jane', age: 20}], '30': [{name: 'Bob', age: 30}] }

// Test Case 4: Empty array should return empty object
console.log(groupBy([], x => x));
// Expected: {}

// Test Case 5: Group by identity function
console.log(groupBy([1, 2, 2, 3, 1], x => x));
// Expected: { '1': [1, 1], '2': [2, 2], '3': [3] }

// Test Case 6: Group by string length
console.log(groupBy(['one', 'two', 'three'], str => str.length));
// Expected: { '3': ['one', 'two'], '5': ['three'] }