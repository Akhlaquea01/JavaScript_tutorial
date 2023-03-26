function myDisplayerx(some) {
    console.log(some);
    return some;
}

let myPromise = new Promise(function (myResolve, myReject) {
    let x = 0;

    setTimeout(function () {
        if (x == 0) {
            myResolve("OK");
        } else {
            myReject("Error");
        }
    }, 1000);

});

myPromise
    .then(function (value) {
        return myDisplayerx(value);
    })
    .then(function (value) {
        console.log(value);
        return value;
    })
    .then((value) => console.log(`${value} and bar`))
    // .then((value) => { if (!value) throw Error("Error Ho gya"); })
    .catch(function (err) {
        console.error(err, "Atts");
    });


// EX 2
const promiseA = new Promise((resolve, reject) => {
    resolve(777);
});
// At this point, "promiseA" is already settled.
promiseA.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777

//   EX 3

function fetchData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

function myDisplayer(some) {
    console.log(some);
    return some;
}

const promise1 = fetchData('https://jsonplaceholder.typicode.com/posts');
const promise2 = fetchData('https://jsonplaceholder.typicode.com/posts');

Promise.all([ promise1, promise2 ])
    .then(([ data1, data2 ]) => {
        console.log('Data from promise1:', data1);
        console.log('Data from promise2:', data2);
        return [ data1, data2 ];
    })
    .then(([ data1, data2 ]) => {
        const combinedData = [ ...data1, ...data2 ];
        console.log('Combined data:', combinedData);
        return combinedData;
    })
    .then(data => {
        console.log('First element from combined data:', data[ 0 ]);
        return data[ 0 ];
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

// Ex 4
const promise3 = new Promise(resolve => setTimeout(resolve, 1000, 'one'));
const promise4 = new Promise(resolve => setTimeout(resolve, 2000, 'two'));

Promise.race([ promise3, promise4 ])
    .then(result => console.log(result)); // Output: "one"

//   Ex5
Promise.resolve('Resolved!')
    .then(result => console.log(result)); // Output: "Resolved!"

Promise.reject(new Error('Rejected!'))
    .catch(error => console.error(error)); // Output: "Error: Rejected!"

//   Ex 6
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function main() {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

main();
