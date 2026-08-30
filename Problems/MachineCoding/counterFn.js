/**
 * Creates a counter closure with increment/decrement/reset, each instance closing over its own state.
 * Time: O(1) per call  Space: O(1)
 */
var createCounter = function (init) {
    let initial = init;
    let count = init;
    const data = {
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        },
        reset() {
            return count = initial;
        }
    }

    return data;
};

const counter = createCounter(0);
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.reset());
console.log(counter.reset());
