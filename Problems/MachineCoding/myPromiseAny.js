function myPromiseAny(promises) {
    return new Promise((resolve, reject) => {
        // Handle empty iterable edge case.
        if (promises.length === 0) {
            reject(new AggregateError([], 'All promises were rejected'));
            return;
        }

        const errors = [];
        let rejectedCount = 0;

        // Loop through each promise.
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then((value) => {
                    // Resolve immediately upon the first successful promise.
                    resolve(value);
                })
                .catch((reason) => {
                    errors[i] = reason; // Store the rejection reason at its original index.
                    rejectedCount++;

                    // If all promises have been rejected, reject with the AggregateError.
                    if (rejectedCount === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                });
        }
    });
}
const pA = new Promise((resolve) => setTimeout(() => resolve('A wins!'), 100));
const pB = new Promise((resolve) => setTimeout(() => resolve('B wins!'), 50));
const pC = new Promise((resolve, reject) => setTimeout(() => reject('C failed!'), 20));

myPromiseAny([pA, pB, pC])
    .then(result => console.log('First to fulfill:', result)) // Logs: "First to fulfill: B wins!"
    .catch(error => console.error('All rejected:', error));


// Example where all promises reject
const pD = new Promise((_, reject) => setTimeout(() => reject('D failed!'), 10));
const pE = new Promise((_, reject) => setTimeout(() => reject('E failed!'), 20));

myPromiseAny([pD, pE])
    .then(result => console.log('First to fulfill:', result))
    .catch(error => console.error(error)); // Logs: AggregateError: All promises were rejected
