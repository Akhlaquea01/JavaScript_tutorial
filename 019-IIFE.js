// TOPIC: Immediately Invoked Function Expressions (IIFE)

(function () {
  console.log('This will never run again');
})();


(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);



(function () {
  var x = 10;

  function foo() {
    console.log(x);
  }

  foo(); // outputs 10
})();

//console.log(x); // throws an error because x is not defined in the global scope
// In this example, we're defining a private scope using an IIFE, and defining a variable x and a function foo within that scope. We're then immediately invoking the function foo, which has access to the variable x. Finally, we're attempting to access x outside of the private scope, which will result in an error because x is not defined in the global scope.