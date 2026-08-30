/**
 * Finds the maximum number in an array.
 * Time: O(n)  Space: O(1)
 */
function findMaxNumberFromArr(arr) {
  if (arr.length === 0) return null;
  let maxNum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  return maxNum;
}

console.log(findMaxNumberFromArr([1,2,3,9,66,76,54,2]))