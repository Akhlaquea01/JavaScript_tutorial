/**
 * find unique elements from an array
 * @param {Array} arr - The input array from which to find unique elements.
 */

function findUniqueObj(arr) {
    const uniqueObj = {}; // Object to store unique elements
    const result = []; // Array to store the result

    for (const obj of arr) {
        const key = JSON.stringify(obj); // Convert object to string for comparison
        if (!uniqueObj[key]) { // If the object is not already in the uniqueObj
            uniqueObj[key] = true; // Mark it as seen
            result.push(obj); // Add it to the result array
        }
    }
    return result; // Return the array of unique objects
}
/**
 * 
It’s order-sensitive: { a: 1, b: 2 } and { b: 2, a: 1 } are technically equal but JSON.stringify() will treat them as different.

It won’t handle functions, undefined, symbols, or circular structures properly.
 */


function findUniqueObj2(arr) {
    const seen = new Map();
    const result = [];

    for (const obj of arr) {
        const key = Object.keys(obj).sort().map(k => `${k}:${obj[k]}`).join('|');
        if (!seen.has(key)) {
            seen.set(key, true);
            result.push(obj);
        }
    }

    return result;
}

const arr = [{ name: 'John' }, { name: 'Jane' }, { name: 'John' }, { name: 'Doe' }];
console.log(findUniqueObj(arr));
console.log(findUniqueObj2(arr));


