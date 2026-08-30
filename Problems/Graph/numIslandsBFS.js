/**
 * Counts islands ('1' land, '0' water, 4-directionally connected) in a grid using BFS flood fill; mutates the grid to mark visited cells.
 * Time: O(rows * cols)  Space: O(min(rows, cols)) for the queue in the worst case
 */
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    let islandCount = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Down, Up, Right, Left

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                const queue = [[r, c]];
                grid[r][c] = '0'; // reuse the grid itself as the visited set

                while (queue.length > 0) {
                    const [currentR, currentC] = queue.shift();

                    for (const [dr, dc] of directions) {
                        const newR = currentR + dr;
                        const newC = currentC + dc;

                        // bounds check, then only enqueue unvisited land
                        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === '1') {
                            queue.push([newR, newC]);
                            grid[newR][newC] = '0';
                        }
                    }
                }
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
console.log(numIslandsBFS(grid1)); // Output: 3