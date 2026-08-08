// Example 1: Asynchronous Callbacks

// Simulates an asynchronous operation
function doSomethingAsync(callback) {
  setTimeout(() => {
    const result = 42;
    callback(result);
  }, 1000);
}

// Processes data asynchronously
function processData(data, callback) {
  const processedData = data + 10;
  callback(processedData);
}

// Main function to demonstrate asynchronous callback chaining
function main() {
  doSomethingAsync((result) => {
    processData(result, (processedData) => {
      console.log(`Example 1: The final result is ${processedData}`);
    });
  });
}

main();

// Example 2: Synchronous Callbacks

// Adds two numbers synchronously
function addNumbers(num1, num2, callback) {
  const sum = num1 + num2;
  callback(sum);
}

// Logs the result synchronously
function logResult(result) {
  console.log(`Example 2: The result is ${result}`);
}

addNumbers(5, 10, logResult);

// Example 3: Higher-order Functions and Callbacks

let transactions = [100, -200, 300, 400, -500, 600];

// Callback function to filter credit transactions
function isCredit(transaction) {
  return transaction > 0;
}

// Callback function to filter debit transactions
function isDebit(transaction) {
  return transaction < 0;
}

// Generic filter function to filter transactions based on a callback
function filterTransactions(transactions, filterFn) {
  let filtered = [];
  for (let i = 0; i < transactions.length; i++) {
    if (filterFn(transactions[i])) {
      filtered.push(transactions[i]);
    }
  }
  return filtered;
}

// Filter credit transactions
let creditTransactions = filterTransactions(transactions, isCredit);
// Filter debit transactions
let debitTransactions = filterTransactions(transactions, isDebit);

console.log("Example 3: Credit Transactions:", creditTransactions);
console.log("Example 3: Debit Transactions:", debitTransactions);
