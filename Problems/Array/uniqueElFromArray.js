/**
 * Finds unique objects in an array by comparing JSON.stringify'd keys (order-sensitive, so key order matters).
 * Time: O(n)  Space: O(n)
 */
function findUniqueObj(arr) {
    const uniqueObj = {};
    const result = [];

    for (const obj of arr) {
        const key = JSON.stringify(obj);
        if (!uniqueObj[key]) {
            uniqueObj[key] = true;
            result.push(obj);
        }
    }
    return result;
}

/**
 * Finds unique objects using a sorted-key signature (order-insensitive, unlike findUniqueObj); doesn't handle
 * functions, undefined, symbols, or circular structures correctly.
 * Time: O(n)  Space: O(n)
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


