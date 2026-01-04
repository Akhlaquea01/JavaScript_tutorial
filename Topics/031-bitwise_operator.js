/*******************************************************
 * BITWISE OPERATORS IN JAVASCRIPT — COMPLETE GUIDE
 *
 * Bitwise operations work on BITS (0s and 1s)
 * Instead of working on whole numbers, they work
 * on the binary representation of numbers.
 *
 * Example:
 * Decimal: 5
 * Binary : 0101
 *******************************************************/


/********************************************************
 * 1️⃣ WHAT IS A BIT?
 *
 * A bit is the smallest unit of data.
 * It can be either:
 * 0 or 1
 *
 * Numbers in computers are stored as bits.
 ********************************************************/


/********************************************************
 * 2️⃣ DECIMAL TO BINARY (IMPORTANT)
 *
 * Decimal  → Binary
 * 0 → 0000
 * 1 → 0001
 * 2 → 0010
 * 3 → 0011
 * 4 → 0100
 * 5 → 0101
 * 6 → 0110
 * 7 → 0111
 * 8 → 1000
 ********************************************************/


/********************************************************
 * 3️⃣ BITWISE OPERATORS
 *
 * Operator | Name
 * ---------|----------------
 * &        | AND
 * |        | OR
 * ^        | XOR
 * ~        | NOT
 * <<       | Left Shift
 * >>       | Right Shift
 ********************************************************/


/********************************************************
 * 4️⃣ BITWISE AND (&)
 *
 * Rule:
 * 1 & 1 = 1
 * 1 & 0 = 0
 * 0 & 1 = 0
 * 0 & 0 = 0
 *
 * Both bits must be 1
 ********************************************************/

let a = 5;  // 0101
let b = 3;  // 0011

//   0101
// & 0011
// -------
//   0001  -> 1

console.log(a & b); // 1


/********************************************************
 * 5️⃣ BITWISE OR (|)
 *
 * Rule:
 * 1 | 1 = 1
 * 1 | 0 = 1
 * 0 | 1 = 1
 * 0 | 0 = 0
 *
 * At least one bit must be 1
 ********************************************************/

//   0101
// | 0011
// -------
//   0111 -> 7

console.log(a | b); // 7


/********************************************************
 * 6️⃣ BITWISE XOR (^)
 *
 * XOR = "exclusive OR"
 *
 * Rule:
 * 1 ^ 1 = 0
 * 0 ^ 0 = 0
 * 1 ^ 0 = 1
 * 0 ^ 1 = 1
 *
 * Bits must be DIFFERENT
 ********************************************************/

//   0101
// ^ 0011
// -------
//   0110 -> 6

console.log(a ^ b); // 6


/********************************************************
 * 7️⃣ WHY XOR IS SPECIAL
 *
 * a ^ a = 0
 * a ^ 0 = a
 *
 * This is why XOR is used to find a single number
 * when all others appear twice.
 ********************************************************/

console.log(5 ^ 5); // 0
console.log(5 ^ 0); // 5


/********************************************************
 * 8️⃣ REAL PROBLEM EXAMPLE (SINGLE NUMBER)
 *
 * Every number appears twice except one.
 ********************************************************/

let nums = [4, 1, 2, 1, 2];

let result = 0;

for (let i = 0; i < nums.length; i++) {
    result ^= nums[i];
}

console.log(result); // 4


/********************************************************
 * 9️⃣ BITWISE NOT (~)
 *
 * NOT flips all bits:
 * 0 → 1
 * 1 → 0
 *
 * JavaScript uses 32-bit signed integers.
 ********************************************************/

let x = 5;   // 00000000 00000000 00000000 00000101
let y = ~x;  // 11111111 11111111 11111111 11111010

console.log(y); // -6 (because of two's complement)


/********************************************************
 * 🔟 LEFT SHIFT (<<)
 *
 * Shifts bits LEFT
 * Adds 0s on the right
 *
 * Effect: multiply by powers of 2
 ********************************************************/

// 5 << 1
// 0101 -> 1010 (10)

console.log(5 << 1); // 10
console.log(5 << 2); // 20


/********************************************************
 * 1️⃣1️⃣ RIGHT SHIFT (>>)
 *
 * Shifts bits RIGHT
 * Removes bits from the right
 *
 * Effect: divide by powers of 2
 ********************************************************/

// 10 >> 1
// 1010 -> 0101 (5)

console.log(10 >> 1); // 5
console.log(20 >> 2); // 5


/********************************************************
 * 1️⃣2️⃣ SUMMARY
 *
 * &  → Check flags, masks
 * |  → Set bits
 * ^  → Toggle bits, find unique number
 * ~  → Flip bits
 * << → Multiply by 2
 * >> → Divide by 2
 *
 * Bitwise operators are FAST and memory efficient.
 ********************************************************/


/********************************************************
 * 1️⃣3️⃣ WHEN TO USE BITWISE
 *
 * ✔ Performance-critical code
 * ✔ Low-level logic
 * ✔ XOR trick problems
 * ✔ Flags & permissions
 *
 * ❌ Avoid if readability is more important
 ********************************************************/
