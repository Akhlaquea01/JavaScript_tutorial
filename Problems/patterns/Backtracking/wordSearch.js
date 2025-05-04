/**
 * 🧩 Problem: Word Search (Leetcode #79)
 *
 * Given a 2D grid of letters (board) and a word, determine if the word exists in the grid.
 * The word can be formed by connecting adjacent cells (up, down, left, or right).
 * Each letter cell can be used only once per word path.
 */

/**
 * @param {character[][]} board - 2D grid of characters
 * @param {string} word - The word to search for
 * @return {boolean} - Returns true if the word exists in the grid
 */
const wordExistsInGrid = (board, word) => {
    const totalRows = board.length;
    const totalCols = board[0].length;

    // Recursive backtracking function to explore possible paths
    const searchFromCell = (row, col, charIndex) => {
        // ✅ Word fully matched
        if (charIndex === word.length) return true;

        // ❌ Out of bounds or character mismatch
        if (
            row < 0 || row >= totalRows ||
            col < 0 || col >= totalCols ||
            board[row][col] !== word[charIndex]
        ) return false;

        // Mark current cell as visited by temporarily changing its value
        const originalChar = board[row][col];
        board[row][col] = '#'; // Special marker for visited cell

        // Directions: up, down, left, right
        const directions = [
            [row - 1, col], // up
            [row + 1, col], // down
            [row, col - 1], // left
            [row, col + 1]  // right
        ];

        const isMatchFound = directions.some(
            ([nextRow, nextCol]) => searchFromCell(nextRow, nextCol, charIndex + 1)
        );

        // Restore original character during backtrack
        board[row][col] = originalChar;

        return isMatchFound;
    };

    // Try to find the word starting from every cell
    for (let row = 0; row < totalRows; row++) {
        for (let col = 0; col < totalCols; col++) {
            const isStartingChar = board[row][col] === word[0];
            if (isStartingChar && searchFromCell(row, col, 0)) {
                return true;
            }
        }
    }

    return false; // No matching path found
};

// === 🧪 Example Test Cases ===

const letterGrid = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

const testWords = [
    "ABCCED", // ✅ true
    "SEE",    // ✅ true
    "ABCB",   // ❌ false
    "ABFSAB", // ❌ false
    "A",      // ✅ true
    "ESE",    // ✅ true
];

// Run and log results
testWords.forEach(word => {
    // Deep copy grid to avoid mutation between tests
    const boardCopy = letterGrid.map(row => [...row]);
    const result = wordExistsInGrid(boardCopy, word);
    console.log(`Word "${word}" exists in grid? ➜`, result);
});
