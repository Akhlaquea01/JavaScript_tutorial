/**
 * Adds two binary strings and returns their binary sum as a string.
 * Time: O(max(a.length, b.length))  Space: O(max(a.length, b.length))
 */
function addBinary(a, b) {
    let result = "";
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
  
    while (i >= 0 || j >= 0 || carry > 0) {
      // Treat a missing digit (index out of bounds) as 0
      const bitA = i >= 0 ? parseInt(a[i]) : 0;
      const bitB = j >= 0 ? parseInt(b[j]) : 0;

      const sum = bitA + bitB + carry;
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);

      i--;
      j--;
    }
  
    return result;
  }
  
  // Example usage:
  console.log(addBinary("11", "1")); // "100"
  console.log(addBinary("1010", "1011")); // "10101"
  