/**
 * 
Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is a group of adjacent '1's connected horizontally or vertically (not diagonally). All grid edges are surrounded by water.
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
                grid[r][c] = '0'; // Mark as visited

                while (queue.length > 0) {
                    const [currentR, currentC] = queue.shift();

                    // Explore all 4-directional neighbors
                    for (const [dr, dc] of directions) {
                        const newR = currentR + dr;
                        const newC = currentC + dc;

                        // Check boundaries and if the neighbor is unvisited land
                        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === '1') {
                            queue.push([newR, newC]);
                            grid[newR][newC] = '0'; // Mark as visited
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