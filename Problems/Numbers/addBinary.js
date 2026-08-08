function addBinary(a, b) {
    let result = "";
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
  
    while (i >= 0 || j >= 0 || carry > 0) {
      // Get the current bit from each string, or 0 if the index is out of bounds
      const bitA = i >= 0 ? parseInt(a[i]) : 0;
      const bitB = j >= 0 ? parseInt(b[j]) : 0;
  
      // Calculate the sum of the bits plus the carry
      const sum = bitA + bitB + carry;
  
      // The current bit of the result is the remainder of the sum divided by 2
      result = (sum % 2) + result;
  
      // The carry for the next iteration is the integer division of the sum by 2
      carry = Math.floor(sum / 2);
  
      // Move to the next bit
      i--;
      j--;
    }
  
    return result;
  }
  
  // Example usage:
  console.log(addBinary("11", "1")); // "100"
  console.log(addBinary("1010", "1011")); // "10101"
  