// Promise creation and basic chaining
function myDisplayer(some) {
    console.log(some);
    return some;
}

const myPromise = new Promise(function (resolve, reject) {
    let x = 0;
    setTimeout(function () {
        if (x == 0) {
            resolve("OK");
        } else {
            reject("Error");
        }
    }, 1000);
});

myPromise
    .then(myDisplayer)
    .then((value) => {
        console.log(value);
        return value;
    })
    .then((value) => console.log(`${value} and bar`))
    .catch((err) => console.error(err, "Atts"));

// Handling settled promises
const promiseA = Promise.resolve(777);
promiseA.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");

// Asynchronous data fetching with Promise.all
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

const promise1 = fetchData('https://jsonplaceholder.typicode.com/posts');
const promise2 = fetchData('https://jsonplaceholder.typicode.com/posts');

Promise.all([promise1, promise2])
    .then(([data1, data2]) => {
        console.log('Data from promise1:', data1);
        console.log('Data from promise2:', data2);
        return [data1, data2];
    })
    .then(([data1, data2]) => {
        const combinedData = [...data1, ...data2];
        console.log('Combined data:', combinedData);
        return combinedData;
    })
    .then(data => {
        console.log('First element from combined data:', data[0]);
        return data[0];
    })
    .then(value => {
        console.log('Value and bar:', value, 'and bar');
        return value;
    })
    .then(value => {
        if (!value) {
            throw new Error('Value is falsy');
        }
        console.log('Value is truthy');
        return value;
    })
    .catch(error => {
        console.error('Error occurred:', error);
    })
    .finally(() => {
        console.log('Promise chain has completed');
    });

// Promise.race and Promise.resolve / Promise.reject
const promise3 = new Promise(resolve => setTimeout(resolve, 1000, 'one'));
const promise4 = new Promise(resolve => setTimeout(resolve, 2000, 'two'));

Promise.race([promise3, promise4])
    .then(result => console.log(result)); // Output: "one"

Promise.resolve('Resolved!')
    .then(result => console.log(result)); // Output: "Resolved!"

Promise.reject(new Error('Rejected!'))
    .catch(error => console.error(error)); // Output: "Error: Rejected!"

// Asynchronous data fetching with async/await
async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Promise.all
const fetchPostData = async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.json();
};

const post1Promise = fetchPostData(1);
const post2Promise = fetchPostData(2);

Promise.all([post1Promise, post2Promise])
    .then(([post1Data, post2Data]) => {
        console.log('Post 1:', post1Data);
        console.log('Post 2:', post2Data);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });

// Promise.race
const racePromise1 = new Promise(resolve => setTimeout(resolve, 1000, 'one'));
const racePromise2 = new Promise(resolve => setTimeout(resolve, 2000, 'two'));

Promise.race([racePromise1, racePromise2])
    .then(result => console.log('Result of race:', result)); // Output: "one"

// Promise.resolve and Promise.reject
Promise.resolve('Resolved value')
    .then(value => console.log('Resolved:', value)); // Output: "Resolved value"

Promise.reject(new Error('Rejected reason'))
    .catch(error => console.error('Rejected:', error.message)); // Output: "Rejected reason"

// Async/Await with try-catch
async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchAndLogData(url) {
    try {
        const data = await fetchDataAsync(url);
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

fetchAndLogData('https://jsonplaceholder.typicode.com/posts/1');


async function main() {
    const data = await fetchDataAsync('https://jsonplaceholder.typicode.com/posts/1');
    console.log(data);
}

main();
