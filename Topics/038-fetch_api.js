/*******************************************************
 * TOPIC: FETCH API & HTTP REQUESTS IN JAVASCRIPT
 *
 * The Fetch API is the modern way to make HTTP requests
 * in JavaScript (browser and Node.js 18+).
 *
 * Covers:
 *  1. Basic GET request
 *  2. Response handling & status codes
 *  3. POST / PUT / DELETE requests
 *  4. Headers & Authentication
 *  5. Abort Controller (cancel requests)
 *  6. Timeout pattern
 *  7. Parallel requests with Promise.all
 *  8. Error handling with Fetch
 *  9. XMLHttpRequest (legacy comparison)
 *******************************************************/

const BASE_URL = "https://jsonplaceholder.typicode.com";


/********************************************************
 * 1️⃣ BASIC GET REQUEST
 ********************************************************/

async function getPost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    const post = await response.json();
    console.log("Post:", post.title);
    return post;
}

// getPost(1);


/********************************************************
 * 2️⃣ RESPONSE HANDLING & STATUS CODES
 *
 * ⚠️ fetch() does NOT throw on HTTP errors (404, 500)!
 * You must check response.ok manually.
 ********************************************************/

async function safeFetch(url) {
    const response = await fetch(url);

    // response.ok is true for status 200-299
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function demonstrateStatusCheck() {
    try {
        // This 404 would NOT throw without the check above
        const data = await safeFetch(`${BASE_URL}/posts/99999`);
        console.log(data);
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}

demonstrateStatusCheck();

// Response object properties:
// response.status    → 200, 404, 500
// response.statusText→ "OK", "Not Found"
// response.ok        → true if status 200-299
// response.headers   → Headers object
// response.url       → final URL (after redirects)

// Response body methods (all return Promises):
// response.json()    → parse as JSON
// response.text()    → parse as plain text
// response.blob()    → parse as Blob (files/images)
// response.arrayBuffer() → parse as ArrayBuffer


/********************************************************
 * 3️⃣ POST REQUEST
 ********************************************************/

async function createPost(data) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return response.json();
}

async function demoCreate() {
    const newPost = await createPost({
        title: "Learn JavaScript",
        body: "Fetch API is powerful!",
        userId: 1
    });
    console.log("Created:", newPost.id, newPost.title);
}

demoCreate();


/********************************************************
 * 4️⃣ PUT / PATCH / DELETE REQUESTS
 ********************************************************/

// PUT — full update
async function updatePost(id, data) {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

// PATCH — partial update
async function patchPost(id, data) {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}

// DELETE
async function deletePost(id) {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE"
    });
    console.log("Deleted, status:", res.status); // 200
}


/********************************************************
 * 5️⃣ HEADERS & AUTHENTICATION
 ********************************************************/

async function fetchWithAuth(url, token) {
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

// Using the Headers constructor
const headers = new Headers();
headers.append("Authorization", "Bearer my-token");
headers.append("Content-Type", "application/json");

// fetch(url, { headers });


/********************************************************
 * 6️⃣ ABORT CONTROLLER — CANCEL REQUESTS
 *
 * Cancel a request that takes too long.
 ********************************************************/

async function fetchWithCancel() {
    const controller = new AbortController();
    const { signal } = controller;

    // Cancel after 2 seconds
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
        const res = await fetch(`${BASE_URL}/posts`, { signal });
        clearTimeout(timeoutId);
        return res.json();
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("Request was cancelled");
            return null;
        }
        throw err;
    }
}


/********************************************************
 * 7️⃣ TIMEOUT HELPER PATTERN
 ********************************************************/

function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { ...options, signal: controller.signal })
        .then(res => {
            clearTimeout(id);
            return res;
        })
        .catch(err => {
            clearTimeout(id);
            if (err.name === "AbortError") {
                throw new Error(`Request timed out after ${timeout}ms`);
            }
            throw err;
        });
}


/********************************************************
 * 8️⃣ PARALLEL REQUESTS WITH Promise.all
 ********************************************************/

async function fetchMultiple() {
    try {
        const [posts, users, todos] = await Promise.all([
            fetch(`${BASE_URL}/posts?_limit=3`).then(r => r.json()),
            fetch(`${BASE_URL}/users?_limit=3`).then(r => r.json()),
            fetch(`${BASE_URL}/todos?_limit=3`).then(r => r.json())
        ]);

        console.log("Posts:", posts.length);  // 3
        console.log("Users:", users.length);  // 3
        console.log("Todos:", todos.length);  // 3
    } catch (err) {
        console.error("One or more requests failed:", err.message);
    }
}

// fetchMultiple();


/********************************************************
 * 9️⃣ XMLHttpRequest (XHR) — Legacy API
 *
 * The old way of making HTTP requests.
 * Still seen in older codebases.
 ********************************************************/

function xhrGet(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`XHR Error: ${xhr.status}`));
            }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.ontimeout = () => reject(new Error("Timeout"));

        xhr.timeout = 5000;
        xhr.send();
    });
}

// XHR vs Fetch comparison:
// ┌──────────────┬─────────────────┬───────────────────────┐
// │ Feature      │ XMLHttpRequest  │ Fetch API             │
// ├──────────────┼─────────────────┼───────────────────────┤
// │ Syntax       │ Verbose         │ Clean / Promise-based │
// │ async/await  │ ❌ Manual       │ ✅ Native             │
// │ Progress     │ ✅ onprogress   │ ❌ (needs streams)    │
// │ Cancellation │ xhr.abort()     │ AbortController       │
// │ Cookies      │ withCredentials │ credentials: "include"│
// └──────────────┴─────────────────┴───────────────────────┘


/********************************************************
 * 🔟 COMPLETE FETCH WRAPPER UTILITY
 ********************************************************/

class ApiClient {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders
        };
    }

    async request(method, path, data = null) {
        const options = {
            method,
            headers: this.defaultHeaders
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const res = await fetch(`${this.baseURL}${path}`, options);

        if (!res.ok) {
            throw new Error(`${method} ${path} → ${res.status} ${res.statusText}`);
        }

        return res.json();
    }

    get(path)           { return this.request("GET", path); }
    post(path, data)    { return this.request("POST", path, data); }
    put(path, data)     { return this.request("PUT", path, data); }
    patch(path, data)   { return this.request("PATCH", path, data); }
    delete(path)        { return this.request("DELETE", path); }
}

const api = new ApiClient(BASE_URL);
// api.get("/posts/1").then(console.log);
// api.post("/posts", { title: "Hello", body: "World", userId: 1 }).then(console.log);

console.log("Fetch API module loaded.");
