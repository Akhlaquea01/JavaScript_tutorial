// Que: Merge Sorted Array
function mergeSortedArrays(array1, array2) {
    const mergedArray = [];
    let arra1Item = array1[0];
    let array2Item = array2[0];
    let j = 1; i = 1;
    if (array1.length === 0) return array2;
    if (array2.length === 0) return array1;
    while (typeof arra1Item == 'number' || typeof array2Item == 'number') {
        if (!array2Item || arra1Item <= array2Item) {
            mergedArray.push(arra1Item);
            arra1Item = array1[i];
            i++;
        } else {
            mergedArray.push(array2Item);
            array2Item = array2[j];
            j++;
        }
    }
    return mergedArray;
}

console.log(mergeSortedArrays([0, 3, 5], [4, 6, 30]));