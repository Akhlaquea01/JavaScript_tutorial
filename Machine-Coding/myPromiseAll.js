function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        // Handle the edge case of an empty array immediately.
        if (promises.length === 0) {
            resolve([]);
            return;
        }

        const results = [];
        let completedCount = 0;

        // Loop through each promise in the input array.
        for (let i = 0; i < promises.length; i++) {
            // Use Promise.resolve to handle non-promise values gracefully.
            Promise.resolve(promises[i])
                .then((value) => {
                    results[i] = value; // Store the result at the correct index.
                    completedCount++;

                    // If all promises have completed, resolve with the full results array.
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch((reason) => {
                    // Reject immediately if any single promise rejects.
                    reject(reason);
                });
        }
    });
}
const p1 = new Promise(resolve => setTimeout(() => resolve('Result from P1'), 100));
const p2 = Promise.resolve('Immediate result');
const p3 = new Promise(resolve => setTimeout(() => resolve('Result from P3'), 500));

myPromiseAll([p1, p2, p3])
    .then(results => console.log('All resolved:', results))
    .catch(error => console.error('A promise rejected:', error));

// Example with a rejection
const p4 = Promise.resolve('This will be ignored');
const p5 = new Promise((_, reject) => setTimeout(() => reject('Error from P5'), 10));
const p6 = Promise.resolve('Also ignored');

myPromiseAll([p4, p5, p6])
    .then(results => console.log('All resolved:', results))
    .catch(error => console.error('Caught error:', error)); // Logs: "Caught error: Error from P5"
