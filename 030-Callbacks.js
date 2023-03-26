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