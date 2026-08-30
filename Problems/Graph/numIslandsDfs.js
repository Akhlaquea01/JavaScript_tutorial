/**
 * Counts islands ('1' land, '0' water, 4-directionally connected) in a grid using DFS flood fill; mutates the grid to mark visited cells.
 * Time: O(rows * cols)  Space: O(rows * cols) recursion stack in the worst case
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    let islandCount = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    function dfs(r, c) {
        // out of bounds or water: nothing to explore
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }

        grid[r][c] = '0'; // reuse the grid itself as the visited set

        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                dfs(r, c);
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