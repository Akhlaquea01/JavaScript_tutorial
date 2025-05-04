/**
 * Solves the N-Queens puzzle.
 *
 * The N-Queens puzzle is the problem of placing N non-attacking queens on an
 * N×N chessboard. Two queens attack each other if they are in the same row,
 * same column, or same diagonal.
 *
 * This function finds all distinct solutions to the N-Queens puzzle. Each
 * solution is represented as a list of strings, where each string represents
 * a row of the chessboard. The character 'Q' indicates a queen, and '.'
 * indicates an empty square.
 *
 * @param {number} n The size of the chessboard (N x N).
 * @returns {string[][]} A list of all distinct solutions to the N-Queens puzzle.
 */
function solveNQueens(n) {
    /**
     * Stores all valid board configurations (solutions).
     * @type {string[][]}
     */
    const solutions = [];

    /**
     * Represents the current state of the chessboard during the backtracking process.
     * Each inner array represents a row.
     * @type {string[][]}
     */
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));

    /**
     * Recursively explores possible placements of queens on the board.
     *
     * @param {number} currentRow The current row being considered for queen placement.
     */
    function backtrack(currentRow) {
        // Base case: If all rows have been filled (a queen has been placed in each row),
        // a valid solution has been found. Add a copy of the current board to the solutions.
        if (currentRow === n) {
            solutions.push(board.map(row => row.join('')));
            return;
        }

        // Iterate through each column in the current row to try placing a queen.
        for (let currentColumn = 0; currentColumn < n; currentColumn++) {
            // Check if placing a queen at the current position (currentRow, currentColumn)
            // is valid (i.e., it doesn't attack any previously placed queens).
            if (isValidPlacement(board, currentRow, currentColumn)) {
                // Place the queen at the current position.
                board[currentRow][currentColumn] = 'Q';

                // Recursively explore the next row.
                backtrack(currentRow + 1);

                // Backtrack: Remove the queen from the current position to explore other possibilities.
                board[currentRow][currentColumn] = '.';
            }
        }
    }

    /**
     * Checks if placing a queen at the given row and column is a valid placement
     * (i.e., it doesn't attack any queens placed in previous rows).
     *
     * @param {string[][]} currentBoard The current state of the chessboard.
     * @param {number} row The row where the queen is being placed.
     * @param {number} col The column where the queen is being placed.
     * @returns {boolean} True if the placement is valid, false otherwise.
     */
    function isValidPlacement(currentBoard, row, col) {
        // Check the same column for any existing queens in previous rows.
        for (let i = 0; i < row; i++) {
            if (currentBoard[i][col] === 'Q') {
                return false;
            }
        }

        // Check the top-left diagonal for any existing queens.
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (currentBoard[i][j] === 'Q') {
                return false;
            }
        }

        // Check the top-right diagonal for any existing queens.
        for (let i = row - 1, j = col + 1; i >= 0 && j < currentBoard.length; i--, j++) {
            if (currentBoard[i][j] === 'Q') {
                return false;
            }
        }

        // If no attacking queens were found, the placement is valid.
        return true;
    }

    // Start the backtracking process from the first row (row 0).
    backtrack(0);

    // Return the list of all valid solutions.
    return solutions;
}

// --- Test Examples ---

console.log("--- Test Case: n = 1 ---");
const solutions1 = solveNQueens(1);
console.log("Number of solutions:", solutions1.length);
console.log("Solutions:", solutions1);
// Expected Output:
// Number of solutions: 1
// Solutions: [ [ 'Q' ] ]

console.log("\n--- Test Case: n = 2 ---");
const solutions2 = solveNQueens(2);
console.log("Number of solutions:", solutions2.length);
console.log("Solutions:", solutions2);
// Expected Output:
// Number of solutions: 0
// Solutions: []

console.log("\n--- Test Case: n = 3 ---");
const solutions3 = solveNQueens(3);
console.log("Number of solutions:", solutions3.length);
console.log("Solutions:", solutions3);
// Expected Output:
// Number of solutions: 0
// Solutions: []

console.log("\n--- Test Case: n = 4 ---");
const solutions4 = solveNQueens(4);
console.log("Number of solutions:", solutions4.length);
console.log("Solutions:", solutions4);
// Expected Output (order may vary):
// Number of solutions: 2
// Solutions: [
//   [ '.Q..', '...Q', 'Q...', '..Q.' ],
//   [ '..Q.', 'Q...', '...Q', '.Q..' ]
// ]

console.log("\n--- Test Case: n = 5 ---");
const solutions5 = solveNQueens(5);
console.log("Number of solutions:", solutions5.length);
console.log("Solutions (first few):", solutions5.slice(0, 3)); // Displaying only the first 3 for brevity
// For n = 5, there are 10 solutions.