/**
 * Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is a group of adjacent '1's connected horizontally or vertically (not diagonally). All grid edges are surrounded by water.
 * Counts the number of islands in a 2D grid.
 * @param {character[][]} grid - 2D array of '1's (land) and '0's (water)
 * @return {number} - Number of islands
 */
function numIslands(grid) {
    // Edge case: empty grid
    if (!grid || grid.length === 0) return 0;

    let islandCount = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    /**
     * Marks all connected land as visited by setting them to '0'.
     * @param {number} r - Row index
     * @param {number} c - Column index
     */
    function dfs(r, c) {
        // Stop if out of bounds or if the cell is water ('0')
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }

        // Mark the current cell as visited by setting it to '0'
        grid[r][c] = '0';

        // Recursively visit all 4-directional neighbors
        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
    }

    // Iterate through every cell in the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If an unvisited land cell is found
            if (grid[r][c] === '1') {
                islandCount++; // New island found
                dfs(r, c);    // Mark all connected land as visited
            }
        }
    }

    return islandCount;
}

// Example Usage:
const grid1 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];
console.log(numIslands(grid1)); // Output: 3