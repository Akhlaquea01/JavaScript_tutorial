// Promisified function
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Async function with `await`
async function myAsyncFunction() {
    try {
        console.log('Starting...');
        await delay(2000);
        console.log('Waiting...');
        await delay(2000);
        console.log('Finished!');
        return 'Success!';
    } catch (err) {
        console.error('Error:', err);
        return 'Failed!';
    }
}

// Using `async/await` with `.then()/.catch()`
myAsyncFunction()
    .then(result => {
        console.log('Result:', result);
    })
    .catch(err => {
        console.error('Error:', err);
    });

// Using `async/await` with `try/catch`
async function myAsyncWrapper() {
    try {
        const result = await myAsyncFunction();
        console.log('Result:', result);
    } catch (err) {
        console.error('Error:', err);
    }
}

myAsyncWrapper();
