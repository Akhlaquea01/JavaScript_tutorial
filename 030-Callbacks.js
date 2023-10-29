// Ex 1
function doSomethingAsync(callback) {
  setTimeout(() => {
    const result = 42;
    callback(result);
  }, 1000);
}

function processData(data, callback) {
  const processedData = data + 10;
  callback(processedData);
}

function main() {
  doSomethingAsync((result) => {
    processData(result, (processedData) => {
      console.log(`The final result is ${processedData}`);
    });
  });
}

main();

//   Ex2
function addNumbers(num1, num2, callback) {
  const sum = num1 + num2;
  callback(sum);
}

function logResult(result) {
  console.log(`The result is ${result}`);
}

addNumbers(5, 10, logResult);

// Ex-3
let transaction = [100, -200, 300, 400, -500, 600];

function isCredit(transaction) {
  return transaction > 0;
}

function isDebit(transaction) {
  return transaction < 0;
}

function filter(transaction, cb) {
  let filter = [];
  for (let i = 0; i < transaction.length; i++) {
    if (cb(transaction[i])) {
      filter.push(transaction[i]);
    }
  }
  return filter;
}

let creditTransactions = filter(transaction, isCredit);
let debitTransactions = filter(transaction, isDebit);

console.log(creditTransactions, debitTransactions);