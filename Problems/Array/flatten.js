function flatten(array, depth = 1) {
    if (!Array.isArray(array)) {
        return [];
    }

    const result = [];

    for (const element of array) {
        // If the element is an array and we still have depth to flatten...
        if (Array.isArray(element) && depth > 0) {
            // Concatenate the result of the recursive call.
            // Decrease the depth for the next level of recursion.
            result.push(...flatten(element, depth - 1));
        } else {
            // If it's not an array or we've reached the flattening depth,
            // just push the element as is.
            result.push(element);
        }
    }

    return result;
}
console.log(flatten([1, 2, [3, 4, [4, 3]]]));
