/**
 * Reverses a string by building a new string from the end.
 * Time: O(n)  Space: O(n)
 */
const reverse = (str) => {
    const backwards = [];
    const totalItems = str.length - 1;

    for (let i = totalItems; i >= 0; i--) {
        backwards.push(str[i]);
    }

    return backwards.join('');
};

console.log(reverse('Hi My name is Andrei')); // Output: lerdna si eman yM in
