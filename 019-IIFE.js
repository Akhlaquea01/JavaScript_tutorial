// TOPIC: Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// TOPIC: IIFE
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

///////////////////////////////////////

/* 
Que:
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

(function () {
  var x = 10;

  function foo() {
    console.log(x);
  }

  foo(); // outputs 10
})();

console.log(x); // throws an error because x is not defined in the global scope
// In this example, we're defining a private scope using an IIFE, and defining a variable x and a function foo within that scope. We're then immediately invoking the function foo, which has access to the variable x. Finally, we're attempting to access x outside of the private scope, which will result in an error because x is not defined in the global scope.