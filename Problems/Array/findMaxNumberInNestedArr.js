function findMaxNumberInNestedArray(array) {
    // SET max = negative infinity
    let max = -Infinity;

    const healper = function (subArr) {
        for (let index = 0; index < subArr.length; index++) {
            const element = subArr[index];

            if (typeof element == 'number' && element > max) max = element;
            else healper(element);

        }
    }

    //     CALL helper(array)
    //     RETURN max
    healper(array);
    return max;

}
console.log(findMaxNumberInNestedArray([1, [1, 2, 3], [1, [9, [88]]]]));
