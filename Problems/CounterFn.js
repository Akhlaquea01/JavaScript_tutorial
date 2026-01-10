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
