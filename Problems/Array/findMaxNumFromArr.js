function findMaxNumberFromArr(arr) {
  if (arr.length === 0) return null; // Handle empty array case
  let maxNum = arr[0]; // Initialize maxNum with the first element
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i]; // Update maxNum if a larger number is found
    }
  }
  return maxNum; // Return the maximum number found
}

console.log(findMaxNumberFromArr([1,2,3,9,66,76,54,2]))