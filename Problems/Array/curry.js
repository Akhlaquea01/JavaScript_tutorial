/**
 * @param {Function} fn The function to curry.
 * @returns {Function} Returns the new curried function.
 */
function curry(fn) {
    // Get the arity (number of arguments) of the original function.
    const fnArity = fn.length;
  
    // The returned function that handles argument collection.
    return function curried(...args) {
      // If the number of collected arguments is enough,
      // call the original function with them.
      if (args.length >= fnArity) {
        return fn.apply(this, args);
      } else {
        // If not enough arguments, return a new function
        // that continues to collect arguments.
        return function(...nextArgs) {
          // Concatenate the previously collected arguments with the new ones,
          // and call the curried function again with the full set.
          return curried.apply(this, args.concat(nextArgs));
        };
      }
    };
  }
  
  // Example usage:
  function sum(a, b, c) {
    return a + b + c;
  }
  
  const curriedSum = curry(sum);
  
  console.log(curriedSum(1, 2, 3)); // Output: 6
  console.log(curriedSum(1)(2, 3)); // Output: 6
  console.log(curriedSum(1, 2)(3)); // Output: 6
  console.log(curriedSum(1)(2)(3)); // Output: 6
  