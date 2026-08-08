/*******************************************************
 * TOPIC: WeakRef & FinalizationRegistry
 *
 * A normal reference to an object keeps it alive in
 * memory as long as the reference exists. A WeakRef holds
 * a reference WITHOUT preventing garbage collection — the
 * object can still be collected even while a WeakRef points
 * to it. FinalizationRegistry lets you run cleanup code
 * after an object has actually been collected.
 *
 * Covers:
 *  1. The problem: strong references keep things alive forever
 *  2. WeakRef — a reference that doesn't block GC
 *  3. .deref() — getting the value back (if it still exists)
 *  4. FinalizationRegistry — cleanup after collection
 *  5. Why these are rarely needed (and the big caveats)
 *******************************************************/


/********************************************************
 * 1️⃣ THE PROBLEM: STRONG REFERENCES NEVER GO AWAY
 *
 * A plain object reference stored somewhere (a variable,
 * a Map key/value, an array) keeps that object alive for
 * as long as the reference itself is reachable — even if
 * nothing else in the program actually needs it anymore.
 * This is normal and usually exactly what you want — but
 * for things like caches, it can leak memory indefinitely.
 ********************************************************/

const cache = new Map();
function cacheResult(key, value) {
    cache.set(key, value); // a STRONG reference — `value` can never be GC'd while `cache` holds it
}
// (see 029-weakMap.js for WeakMap, which solves the KEY side of this same problem)


/********************************************************
 * 2️⃣ WeakRef — A REFERENCE THAT DOESN'T BLOCK GC
 *
 * `new WeakRef(obj)` wraps an object without keeping it
 * alive. The wrapped object can be garbage-collected at
 * any point the engine decides it's no longer reachable
 * through any STRONG reference elsewhere.
 ********************************************************/

let user = { name: 'Akhlaque' };
const weakUserRef = new WeakRef(user);

console.log(weakUserRef.deref()); // { name: 'Akhlaque' } — still alive, `user` variable still holds a strong ref


/********************************************************
 * 3️⃣ .deref() — RETRIEVING THE VALUE, IF IT STILL EXISTS
 *
 * .deref() returns the original object, OR `undefined` if
 * it has already been garbage-collected. You can NEVER
 * assume it's still there — always check.
 ********************************************************/

function readWeakRef(ref) {
    const value = ref.deref();
    if (value) {
        console.log('still alive:', value);
    } else {
        console.log('has been garbage collected');
    }
}

readWeakRef(weakUserRef); // "still alive" right now, because `user` still references it

user = null; // drop the only STRONG reference
// At some LATER, engine-decided point, the object becomes eligible for collection.
// You cannot force or predict exactly when — that's intentional, and why this API is rarely used directly.


/********************************************************
 * 4️⃣ FinalizationRegistry — CLEANUP AFTER COLLECTION
 *
 * Register an object with a callback that runs (at some
 * unpredictable future point) once the object has actually
 * been garbage collected. Useful for releasing an external
 * resource (a file handle, a WASM buffer) tied to a JS object.
 ********************************************************/

const registry = new FinalizationRegistry((heldValue) => {
    console.log(`cleaned up: ${heldValue}`); // runs at SOME point after the object is collected — not immediately
});

function trackResource(id) {
    let resource = { id }; // imagine this owns something external that needs releasing
    registry.register(resource, `resource-${id}`); // 2nd arg is a plain value passed to the callback later
    resource = null; // drop the only strong reference
}

trackResource(1);
// No guarantee this callback fires during this script's run at all — GC timing is entirely up to the engine.


/********************************************************
 * 5️⃣ WHY THESE ARE RARELY NEEDED (BIG CAVEATS)
 *
 * - GC timing is NON-DETERMINISTIC — you cannot rely on
 *   WHEN (or even whether, before the process exits) an
 *   object gets collected.
 * - Never use these for core program logic (e.g. "clean up
 *   my UI when this callback fires") — only for OPTIONAL
 *   memory optimizations layered on top of normal code.
 * - Most caching needs are better solved with a WeakMap
 *   (016/017) or an explicit eviction policy (LRU cache,
 *   see Problems/LinkedList/lruCache.js) — those are
 *   deterministic; WeakRef/FinalizationRegistry are not.
 ********************************************************/


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ WeakRef doesn't prevent garbage collection; a normal
 *   reference does.
 * ✔ .deref() can return undefined at any time — always
 *   guard against it.
 * ✔ FinalizationRegistry callbacks are a "best effort"
 *   cleanup hook, never a guaranteed one — don't build
 *   correctness-critical logic on them.
 * ✔ These are advanced, memory-management-adjacent APIs —
 *   most day-to-day code should never need them directly.
 *
 * KEY: WeakRef/FinalizationRegistry exist for advanced
 * memory-sensitive tooling (caches, external resource
 * cleanup) — not for everyday application logic.
 ********************************************************/
