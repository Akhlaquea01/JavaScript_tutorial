/**
 * Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
 * Input: columnNumber = 28
 * Output: "AB"
 * Time: O(log n)  Space: O(log n)
 */

function convertToTitle(columnNumber) {
    let columnTitle = "";

    while (columnNumber > 0) {
        // Excel is 1-indexed (A=1) but modulo arithmetic is 0-indexed, so decrement first to map 1->0 (A), 2->1 (B), etc.
        columnNumber--;

        let remainder = columnNumber % 26;
        let character = String.fromCharCode(65 + remainder); // 65 is the ASCII code for 'A'

        columnTitle = character + columnTitle; // prepend: we compute least-significant digit first

        columnNumber = Math.floor(columnNumber / 26);
    }
    return columnTitle;
}

console.log(convertToTitle(701)); // Expected Output: "ZY"
