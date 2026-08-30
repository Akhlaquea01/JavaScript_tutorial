/**
 * Deep clones an object or array, correctly handling circular references.
 * Time: O(n)  Space: O(n)
 */
function cloneDeep(value, clonedObjects = new Map()) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (clonedObjects.has(value)) {
        return clonedObjects.get(value);
    }

    let clone;
    if (Array.isArray(value)) {
        clone = [];
    } else {
        clone = {};
    }

    // Cache the clone before recursing so a circular reference resolves to it instead of looping forever
    clonedObjects.set(value, clone);

    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            clone[key] = cloneDeep(value[key], clonedObjects);
        }
    }

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
