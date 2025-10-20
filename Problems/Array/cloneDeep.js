function cloneDeep(value, clonedObjects = new Map()) {
    // 1. Input Check: Primitives and null
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // 4. Handle Circular References
    if (clonedObjects.has(value)) {
        return clonedObjects.get(value);
    }

    // 2 & 3. Type Identification and Container Creation
    let clone;
    if (Array.isArray(value)) {
        clone = [];
    } else {
        clone = {};
    }

    // Add the original value and its new clone to the cache
    clonedObjects.set(value, clone);

    // 5. Recursive Traversal
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            clone[key] = cloneDeep(value[key], clonedObjects);
        }
    }

    // 6. Return the new clone
    return clone;
}

// Example usage:
const originalObject = {
    a: 1,
    b: {
        c: 2
    },
    d: [3, { e: 4 }]
};

// Create a circular reference
originalObject.b.f = originalObject;

const deepCopy = cloneDeep(originalObject);

console.log(deepCopy);
// Output: { a: 1, b: { c: 2, f: [Circular] }, d: [ 3, { e: 4 } ] }

// Modify the original and see that the copy is unaffected
originalObject.b.c = 99;
console.log(originalObject.b.c); // 99
console.log(deepCopy.b.c);      // 2
