/*******************************************************
 * TOPIC: DEBOUNCE & THROTTLE — THE CONCEPTS
 *
 * Both techniques limit how often a fast-firing function
 * (scroll, resize, keystroke, mousemove) actually runs —
 * but they solve different problems. This file explains
 * WHEN and WHY to reach for each.
 *
 * Production-ready implementations (with edge cases like
 * leading/trailing options, cancel methods, etc.) live in
 * Problems/MachineCoding/debounce.js and throttle.js —
 * this file focuses on the underlying idea, with the
 * simplest version that demonstrates it.
 *
 * Covers:
 *  1. The problem: events that fire too often
 *  2. Debounce — wait for a pause, then run once
 *  3. Throttle — run at most once per time window
 *  4. Choosing between them
 *******************************************************/


/********************************************************
 * 1️⃣ THE PROBLEM
 *
 * Some events can fire dozens of times per second:
 * typing, scrolling, resizing, dragging. Running an
 * expensive handler (an API call, a heavy re-render) on
 * EVERY single one of those events wastes work and can
 * visibly hurt performance.
 ********************************************************/

function expensiveSearch(query) {
    console.log(`searching for: "${query}"`); // imagine this hits a network API
}

// Calling this on every keystroke of a fast typer fires far more
// requests than necessary — most of them for text the user
// didn't even pause on.


/********************************************************
 * 2️⃣ DEBOUNCE — WAIT FOR A PAUSE, THEN RUN ONCE
 *
 * Debounce delays running the function until CALLS STOP
 * ARRIVING for a specified period. Every new call resets
 * the timer. Result: the function only runs once, after
 * the "burst" of activity has settled.
 *
 * Best for: search-as-you-type, form validation, resize
 * handlers where you only care about the FINAL state.
 ********************************************************/

function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);              // cancel the previous pending call
        timeoutId = setTimeout(() => fn(...args), delay); // schedule a fresh one
    };
}

const debouncedSearch = debounce(expensiveSearch, 300);

// Simulating fast typing — "h", "he", "hel", "hell", "hello" typed within 300ms of each other:
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello');
// Only ONE call actually runs, ~300ms after the LAST keystroke: searching for "hello"


/********************************************************
 * 3️⃣ THROTTLE — RUN AT MOST ONCE PER TIME WINDOW
 *
 * Throttle guarantees the function runs at a regular
 * interval AT MOST, no matter how often it's called —
 * it does NOT wait for calls to stop like debounce does.
 *
 * Best for: scroll handlers, mousemove, drag events —
 * anything where you need periodic updates DURING
 * continuous activity, not just at the end.
 ********************************************************/

function throttle(fn, interval) {
    let isWaiting = false;
    return function (...args) {
        if (isWaiting) return;    // ignore calls that arrive mid-cooldown
        fn(...args);
        isWaiting = true;
        setTimeout(() => { isWaiting = false; }, interval);
    };
}

function logScrollPosition(y) {
    console.log('scroll position:', y);
}

const throttledScroll = throttle(logScrollPosition, 200);

// Simulating 11 rapid scroll events (in a real app these would be spread over
// ~200ms of actual scrolling; here they fire back-to-back with no real delay):
[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].forEach(y => throttledScroll(y));
// Only the FIRST call runs — the other 10 all land inside that same 200ms
// cooldown window and get ignored. The key contrast with debounce: this one
// fired IMMEDIATELY, at the start of the burst, not after it settled.
// (With real, time-spread scroll events, throttledScroll would fire again
// every ~200ms for as long as scrolling continued — never fully silent
// like debounce until the user actually stops.)


/********************************************************
 * 4️⃣ CHOOSING BETWEEN THEM
 *
 *              | Debounce                  | Throttle
 * ------------ | -------------------------- | --------------------------
 * Fires        | Once, after calls stop     | Repeatedly, at a fixed rate
 * Use when     | Only the FINAL state matters | Periodic updates matter DURING activity
 * Examples     | search box, form validation | scroll position, drag, mousemove
 ********************************************************/


/********************************************************
 * 5️⃣ INTERVIEW NOTES
 *
 * ✔ Debounce = "wait until it's quiet." Throttle = "no
 *   more than once every X ms, no matter how noisy."
 * ✔ Both are built on the same primitive: setTimeout +
 *   a closure holding some shared state (timer ID / flag).
 * ✔ A classic interview ask is implementing BOTH from
 *   scratch — the versions here are the minimal correct
 *   shape; see Problems/MachineCoding/ for versions with
 *   `cancel()`, leading/trailing edge options, etc.
 *
 * KEY: both techniques trade "run every single time" for
 * "run on a controlled schedule" — the difference is
 * whether that schedule resets on new activity (debounce)
 * or ticks at a fixed rate regardless (throttle).
 ********************************************************/
