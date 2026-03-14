/*******************************************************
 * TOPIC: WEB STORAGE API
 *
 * Provides mechanisms by which browsers can store
 * key/value pairs much more intuitively than using cookies.
 *
 * Covers:
 *  1. localStorage vs sessionStorage vs Cookies
 *  2. Storing and retrieving values
 *  3. Storing objects (JSON.stringify / parse)
 *  4. Removing items and clearing storage
 *  5. Storage Event (Cross-tab communication)
 *******************************************************/


/********************************************************
 * 1️⃣ COMPARISON
 *
 * Feature        | localStorage | sessionStorage | Cookies
 * -------------- | ------------ | -------------- | -------
 * Lifespan       | Persistent   | Tab session    | Expirable
 * Capacity       | ~5-10MB      | ~5MB           | 4KB
 * Sent with reqs | No           | No             | Yes (every request)
 * Scope          | Same-origin  | Same-tab       | Specified domain/path
 * Use case       | Themes, auth | Form drafts    | Session IDs, tracking
 ********************************************************/


/********************************************************
 * 2️⃣ LOCAL STORAGE — Basic usage (Persistent)
 ********************************************************/

// ⚠️ Note: These are browser APIs. Running this file in Node.js
// will throw ReferenceError: localStorage is not defined.

if (typeof window !== "undefined") {
    // 1. Set Item
    localStorage.setItem("theme", "dark");
    localStorage.setItem("fontSize", "16");

    // 2. Get Item
    const theme = localStorage.getItem("theme");
    console.log("Current theme:", theme); // "dark"

    // 3. Check if exists
    if (localStorage.getItem("username") === null) {
        console.log("No username found.");
    }
}


/********************************************************
 * 3️⃣ STORING OBJECTS (JSON Encoding)
 *
 * Storage ONLY holds strings. If you pass an object,
 * it becomes "[object Object]". You must use JSON.
 ********************************************************/

if (typeof window !== "undefined") {
    const userPrefs = {
        theme: "light",
        notifications: true,
        volume: 80
    };

    // Store (serialize to JSON string)
    localStorage.setItem("userPrefs", JSON.stringify(userPrefs));

    // Retrieve (parse back to JS object)
    const rawData = localStorage.getItem("userPrefs");
    const parsedPrefs = rawData ? JSON.parse(rawData) : null;

    console.log("Parsed volume:", parsedPrefs?.volume); // 80
}


/********************************************************
 * 4️⃣ REMOVING DATA & CLEARING
 ********************************************************/

if (typeof window !== "undefined") {
    // Remove a specific key
    localStorage.removeItem("fontSize");

    // Clear EVERYTHING in localStorage for this origin
    // localStorage.clear();
}


/********************************************************
 * 5️⃣ SESSION STORAGE
 *
 * Exact same API as localStorage, but data is cleared
 * when the page session ends (when the tab is closed).
 ********************************************************/

if (typeof window !== "undefined") {
    sessionStorage.setItem("draftText", "Hello world");
    console.log("Draft:", sessionStorage.getItem("draftText"));
}


/********************************************************
 * 6️⃣ COOKIES (Brief Overview)
 *
 * Cookies are mainly for server-side reading, but JS
 * can access them via document.cookie.
 ********************************************************/

if (typeof window !== "undefined") {
    // Write cookie (needs expiration date to persist across sessions)
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
    document.cookie = `username=Alice; expires=${date.toUTCString()}; path=/`;

    // Read ALL cookies (returns a single string "key=value; key=value")
    console.log("All cookies:", document.cookie);
}


/********************************************************
 * 7️⃣ THE 'storage' EVENT (Cross-tab communication)
 *
 * When localStorage changes in Tab A, Tab B receives
 * a 'storage' event allowing them to sync state.
 * (Does NOT fire in the tab that made the change!).
 ********************************************************/

if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
        if (event.key === "theme") {
            console.log(`Theme changed from ${event.oldValue} to ${event.newValue}`);
            // Apply new theme to the current tab as well!
        }
    });
}
