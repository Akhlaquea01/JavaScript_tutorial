/**
 * Write a function expect that helps developers test their code. It should take in any value val and return an object with the following two functions.

toBe(val) accepts another value and returns true if the two values === each other. If they are not equal, it should throw an error "Not Equal".
notToBe(val) accepts another value and returns true if the two values !== each other. If they are equal, it should throw an error "Equal".
 */

const expect = function (val) {
    const func = {
        toBe(x) {
            if (val === x) {
                return true
            }
            throw new Error("Not Equal")
        },
        notToBe(x) {
            if (val !== x) {
                return true
            }
            throw new Error("Equal")
        }
    }
    return func;
};

console.log(expect(5).toBe(5));
console.log(expect(5).notToBe(5));
