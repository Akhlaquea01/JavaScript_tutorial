function countSetBits(num) {
    let count = 0;
    while (num) {
        count += num & 1; // Count the rightmost bit if it is set
        num >>= 1; // Right shift the number by 1 to check the next bit
    }
    return count;
}

// Example usage:
console.log(countSetBits(5)); // Output: 2 (Binary representation: 101, 2 set bits)
console.log(countSetBits(15)); // Output: 4 (Binary representation: 1111, 4 set bits)

// Bitwise AND operation
function bitwiseAND(num1, num2) {
    return num1 & num2; // Sets a bit only if both corresponding bits are set
}

// Bitwise OR operation
function bitwiseOR(num1, num2) {
    return num1 | num2; // Sets a bit if either of the corresponding bits is set
}

// Bitwise XOR operation
function bitwiseXOR(num1, num2) {
    return num1 ^ num2; // Sets a bit if only one of the corresponding bits is set
}

// Example usage:
console.log(bitwiseAND(5, 3)); // Output: 1 (Binary representation of 5: 101, Binary representation of 3: 011, Bitwise AND: 001)
console.log(bitwiseOR(5, 3)); // Output: 7 (Binary representation of 5: 101, Binary representation of 3: 011, Bitwise OR: 111)
console.log(bitwiseXOR(5, 3)); // Output: 6 (Binary representation of 5: 101, Binary representation of 3: 011, Bitwise XOR: 110)


function isPowerOfTwo(num) {
    // A number is a power of two if it has only one bit set in its binary representation
    return num > 0 && (num & (num - 1)) === 0;
}

// Example usage:
console.log(isPowerOfTwo(16)); // Output: true (16 is a power of 2, its binary representation is 10000)
console.log(isPowerOfTwo(20)); // Output: false (20 is not a power of 2, its binary representation is 10100)
