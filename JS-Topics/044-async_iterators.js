/*******************************************************
 * TOPIC: ASYNC ITERATORS & for await...of
 *
 * A sync iterator (043-generators_iterators.js) produces
 * values one at a time, synchronously. An ASYNC iterator
 * produces a PROMISE of a value each time — perfect for
 * paginated APIs, streams, or any source that delivers
 * items over time instead of all at once.
 *
 * Covers:
 *  1. The async iterable protocol (Symbol.asyncIterator)
 *  2. Async generator functions (async function*)
 *  3. for await...of — consuming an async iterable
 *  4. Practical example: paginated API simulation
 *  5. Why this is better than manually chaining .then()
 *******************************************************/


/********************************************************
 * 1️⃣ THE ASYNC ITERABLE PROTOCOL
 *
 * A sync iterable implements Symbol.iterator, returning
 * { value, done } directly. An async iterable implements
 * Symbol.asyncIterator, returning a PROMISE that resolves
 * to { value, done }.
 ********************************************************/

const asyncCounter = {
    [Symbol.asyncIterator]() {
        let count = 0;
        return {
            next() {
                count++;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(count <= 3
                            ? { value: count, done: false }
                            : { value: undefined, done: true });
                    }, 100); // simulate async delay, e.g. a network call
                });
            }
        };
    }
};


/********************************************************
 * 2️⃣ ASYNC GENERATOR FUNCTIONS — THE EASY WAY
 *
 * `async function*` combines generators and async/await:
 * `yield` still pauses/produces a value, but you can also
 * `await` inside the generator body. Far less boilerplate
 * than hand-writing Symbol.asyncIterator like above.
 ********************************************************/

async function* asyncNumberGenerator() {
    for (let i = 1; i <= 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 100)); // simulate async work per item
        yield i;
    }
}


/********************************************************
 * 3️⃣ for await...of — CONSUMING AN ASYNC ITERABLE
 *
 * Works like a regular for...of, except it automatically
 * awaits each { value, done } promise before moving on.
 * Must be used inside an async function.
 ********************************************************/

async function consumeAsyncCounter() {
    for await (const value of asyncCounter) {
        console.log('from asyncCounter:', value); // 1, 2, 3 — each one arrives ~100ms apart
    }
}

async function consumeAsyncGenerator() {
    for await (const num of asyncNumberGenerator()) {
        console.log('from asyncNumberGenerator:', num); // 1, 2, 3
    }
}


/********************************************************
 * 4️⃣ PRACTICAL EXAMPLE: PAGINATED API SIMULATION
 *
 * This is the most common real use case — fetching pages
 * of results without the caller needing to know or manage
 * page numbers/cursors themselves.
 ********************************************************/

async function* fetchAllUsers() {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        // simulate a paginated API response
        const response = await new Promise(resolve => {
            setTimeout(() => {
                resolve(page <= 2
                    ? { users: [`user${page}A`, `user${page}B`], nextPage: page + 1 }
                    : { users: [], nextPage: null });
            }, 100);
        });

        if (response.users.length === 0) {
            hasMore = false;
        } else {
            for (const user of response.users) {
                yield user; // yield ONE user at a time, hiding the pagination entirely
            }
            page = response.nextPage;
        }
    }
}

async function listAllUsers() {
    for await (const user of fetchAllUsers()) {
        console.log('user:', user); // user1A, user1B, user2A, user2B — pages fetched transparently
    }
}


/********************************************************
 * 5️⃣ RUN THE EXAMPLES
 ********************************************************/

(async () => {
    await consumeAsyncCounter();
    await consumeAsyncGenerator();
    await listAllUsers();
})();


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Sync iterable -> Symbol.iterator -> { value, done }
 *   Async iterable -> Symbol.asyncIterator -> Promise<{ value, done }>
 * ✔ `async function*` is almost always preferable to
 *   hand-writing Symbol.asyncIterator manually.
 * ✔ `for await...of` only works inside an async function
 *   (or at the top level of an ES module).
 * ✔ Compared to manually chaining .then() calls or
 *   recursion, async generators let you write "pull one
 *   item at a time" logic that reads like a normal loop.
 *
 * KEY: async iterators are the standard pattern for
 * "a sequence of values that arrive over time" — streams,
 * paginated APIs, or any source you don't want to buffer
 * entirely into memory before processing.
 ********************************************************/
