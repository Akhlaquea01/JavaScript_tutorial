/**
 * Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
 * Input: columnNumber = 28
 * Output: "AB"
 */

function convertToTitle(columnNumber) {
    // Variable to store the final column title string (e.g., "A", "AB").
    let columnTitle = "";

    // Loop until we have processed the entire number.
    while (columnNumber > 0) {
        // Excel columns are 1-indexed (A=1, B=2, ... Z=26).
        // However, mathematical modulo arithmetic is 0-indexed (0 to 25).
        // Decrementing columnNumber by 1 allows us to map 1->0 (A), 2->1 (B), etc.
        columnNumber--;

        // Get the remainder when divided by 26 to find the current character.
        // 0 -> A, 1 -> B, ... 25 -> Z.
        let remainder = columnNumber % 26;

        // Convert the remainder to its ASCII character.
        // 65 is the ASCII code for 'A'. So 65 + 0 = 'A', 65 + 1 = 'B', etc.
        let character = String.fromCharCode(65 + remainder);

        // Prepend the character to the result because we are calculating from right to left (least significant digit first).
        columnTitle = character + columnTitle;

        // Move to the next "digit" by dividing by 26 (base 26 system).
        // Math.floor is used to get the integer part of the division.
        columnNumber = Math.floor(columnNumber / 26);
    }
    return columnTitle;
}

console.log(convertToTitle(701)); // Expected Output: "ZY"
