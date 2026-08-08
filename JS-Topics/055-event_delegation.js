/*******************************************************
 * TOPIC: EVENT BUBBLING, CAPTURING & DELEGATION
 *
 * ⚠️ Note: These are browser DOM APIs. Running this file in
 * Node.js will skip the live examples (guarded below) —
 * the concepts still apply any time you're working with a
 * DOM (see JS-Topics/DOM-Tutorial/ for a full page demo).
 *
 * When an event fires on an element, it doesn't just run
 * handlers on that element — it travels through the DOM
 * tree in two distinct phases. Understanding that path is
 * what makes "event delegation" (one listener handling many
 * children) possible.
 *
 * Covers:
 *  1. The three phases: capturing -> target -> bubbling
 *  2. addEventListener's 3rd argument controls the phase
 *  3. stopPropagation vs preventDefault (different jobs)
 *  4. Event delegation — one listener for many children
 *  5. Why delegation matters for dynamically-added elements
 *******************************************************/


/********************************************************
 * 1️⃣ THE THREE PHASES
 *
 * A click on a deeply nested element travels:
 *   1. CAPTURING phase — from the document DOWN to the target
 *   2. TARGET phase    — the element that was actually clicked
 *   3. BUBBLING phase  — back UP from the target to the document
 *
 * Most listeners run during bubbling by default, which is
 * why a click on a child ALSO triggers a listener on its parent.
 ********************************************************/


/********************************************************
 * 2️⃣ CONTROLLING THE PHASE WITH addEventListener
 *
 * addEventListener(type, handler, useCapture) — the 3rd
 * argument (default false) decides which phase the handler
 * runs in.
 ********************************************************/

if (typeof document !== "undefined") {
    const outer = document.getElementById('outer');
    const inner = document.getElementById('inner');

    outer.addEventListener('click', () => console.log('outer: capturing'), true);  // runs on the way DOWN
    inner.addEventListener('click', () => console.log('inner: target'));            // runs at the target
    outer.addEventListener('click', () => console.log('outer: bubbling'), false);   // runs on the way back UP

    // Clicking #inner logs, in this exact order:
    // "outer: capturing"  (capturing phase reaches outer first)
    // "inner: target"     (arrives at the actual target)
    // "outer: bubbling"   (bubbles back up through outer)
}


/********************************************************
 * 3️⃣ stopPropagation vs preventDefault — DIFFERENT JOBS
 *
 * - stopPropagation(): stops the event from continuing to
 *   travel to other elements (capturing/bubbling), but the
 *   browser's default action (following a link, submitting
 *   a form) still happens.
 * - preventDefault(): stops the browser's default action,
 *   but the event still propagates to other listeners.
 * These are independent — you may need one, the other, or both.
 ********************************************************/

if (typeof document !== "undefined") {
    const link = document.getElementById('myLink');
    link?.addEventListener('click', (e) => {
        e.preventDefault();  // the link will NOT navigate
        e.stopPropagation(); // ancestor listeners will NOT see this click at all
        console.log('link clicked, but navigation was cancelled');
    });
}


/********************************************************
 * 4️⃣ EVENT DELEGATION — ONE LISTENER, MANY CHILDREN
 *
 * Because events bubble, you can attach ONE listener to a
 * PARENT and inspect `event.target` to figure out which
 * child was actually clicked — instead of attaching a
 * separate listener to every single child.
 ********************************************************/

if (typeof document !== "undefined") {
    const list = document.getElementById('todoList');

    // ❌ Without delegation: one listener PER <li>, repeated for every item
    // document.querySelectorAll('#todoList li').forEach(li => li.addEventListener('click', ...));

    // ✅ With delegation: exactly ONE listener, on the parent
    list?.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            console.log('clicked item:', event.target.textContent);
            event.target.classList.toggle('done');
        }
    });
}


/********************************************************
 * 5️⃣ WHY DELEGATION MATTERS FOR DYNAMIC CONTENT
 *
 * A listener attached directly to a specific <li> only
 * works for THAT element. If you later add a NEW <li> via
 * JS, it won't have a listener unless you remember to add
 * one. A delegated listener on the PARENT automatically
 * covers children added at any point in the future — no
 * re-binding needed.
 ********************************************************/

if (typeof document !== "undefined") {
    const list2 = document.getElementById('todoList');
    const newItem = document.createElement('li');
    newItem.textContent = 'New task';
    list2?.appendChild(newItem); // this new <li> is ALREADY covered by the delegated listener from §4
}


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Bubbling is the DEFAULT phase for event listeners;
 *   capturing has to be opted into explicitly (3rd arg = true).
 * ✔ stopPropagation ≠ preventDefault — they solve different
 *   problems and are often confused.
 * ✔ Delegation trades "many listeners" for "one listener +
 *   a target check" — better performance with large lists,
 *   and automatically covers elements added later.
 * ✔ Not every event bubbles — e.g. `focus`/`blur` don't,
 *   though `focusin`/`focusout` do.
 *
 * KEY: events travel down (capturing) then back up
 * (bubbling) through the DOM tree — delegation exploits
 * the bubbling half to let one ancestor handle events for
 * any number of descendants, present or future.
 ********************************************************/
