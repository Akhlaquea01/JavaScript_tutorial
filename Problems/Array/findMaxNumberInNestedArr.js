/**
 * Finds the maximum number in an arbitrarily nested array.
 * Time: O(n)  Space: O(d)
 */
function findMaxNumberInNestedArray(array) {
    let max = -Infinity;

    const healper = function (subArr) {
        for (let index = 0; index < subArr.length; index++) {
            const element = subArr[index];

            if (typeof element == 'number' && element > max) max = element;
            else healper(element);

        }
    }

    healper(array);
    return max;

}
console.log(findMaxNumberInNestedArray([1, [1, 2, 3], [1, [9, [88]]]]));
