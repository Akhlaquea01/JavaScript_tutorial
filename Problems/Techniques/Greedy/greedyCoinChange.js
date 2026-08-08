function greedyCoinChange(coins, amount) {
    // Sort coins in descending order for greedy selection
    coins.sort((a, b) => b - a);

    const result = [];
    let remaining = amount;

    for (let coin of coins) {
        while (remaining >= coin) {
            remaining -= coin;
            result.push(coin); // take the coin
        }
    }

    // If change was made successfully
    return remaining === 0 ? result : -1;
}
const coins = [25, 10, 5, 1];
const amount = 63;
console.log(greedyCoinChange(coins, amount)); // Output: [25, 25, 10, 1, 1, 1]
