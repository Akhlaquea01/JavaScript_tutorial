/*******************************************************
 * TOPIC: LEXICAL SCOPE & THE SCOPE CHAIN
 *
 * "Lexical scoping" means a variable's scope is determined
 * by WHERE it's physically written in the code, not by
 * how/where the function is later called. The scope chain
 * is the lookup path JS follows outward through nested
 * scopes to resolve a variable name.
 *
 * Covers:
 *  1. The three kinds of scope: global, function, block
 *  2. The scope chain — how a lookup walks outward
 *  3. Inner scopes can read outer variables, never the reverse
 *  4. Lexical = defined by code structure, not call site
 *  5. Shadowing
 *******************************************************/


/********************************************************
 * 1️⃣ THREE KINDS OF SCOPE
 *
 * - Global scope: top-level of the file/script
 * - Function scope: created by every function call
 * - Block scope: created by { } for let/const (NOT var)
 ********************************************************/

const globalVar = 'I am global'; // global scope

function outer() {
    const functionVar = 'I am function-scoped'; // function scope

    if (true) {
        const blockVar = 'I am block-scoped'; // block scope — only exists inside this { }
        console.log(blockVar);
    }

    // console.log(blockVar); // ReferenceError — blockVar doesn't exist out here
    console.log(functionVar);
}

outer();


/********************************************************
 * 2️⃣ THE SCOPE CHAIN
 *
 * When JS looks up a variable name, it checks the CURRENT
 * scope first. If not found, it checks the scope that
 * lexically CONTAINS it, then that scope's container, and
 * so on out to the global scope. This ordered path of
 * "scope, then its parent, then its parent's parent..." is
 * the scope chain.
 ********************************************************/

const level0 = 'global';

function levelOne() {
    const level1 = 'inside levelOne';

    function levelTwo() {
        const level2 = 'inside levelTwo';

        function levelThree() {
            // levelThree has NO variables of its own here, so every
            // lookup below walks the chain: levelThree -> levelTwo -> levelOne -> global
            console.log(level2);  // found in levelTwo's scope
            console.log(level1);  // found in levelOne's scope
            console.log(level0);  // found in global scope
        }

        levelThree();
    }

    levelTwo();
}

levelOne();


/********************************************************
 * 3️⃣ ONE-WAY VISIBILITY
 *
 * Inner scopes can read outer variables — but outer scopes
 * can NEVER read into an inner scope. Scope only opens
 * "downward and inward" in the code, never back out.
 ********************************************************/

function makeSecret() {
    const secret = 'hidden';
    console.log(secret); // fine, same scope
}
makeSecret();
// console.log(secret); // ReferenceError — `secret` doesn't exist out here at all


/********************************************************
 * 4️⃣ LEXICAL = DEFINED BY WHERE CODE IS WRITTEN
 *
 * A function's scope chain is fixed at the moment it's
 * DEFINED, based on its physical nesting — not by where or
 * how it's later called. This is what makes closures work
 * (see 022-closures.js).
 ********************************************************/

function makeGreeter(name) {
    // `greet` is physically written inside makeGreeter, so its
    // scope chain permanently includes makeGreeter's scope —
    // no matter where `greet` ends up being called from later.
    function greet() {
        console.log(`Hello, ${name}!`);
    }
    return greet;
}

const greetAkhlaque = makeGreeter('Akhlaque');
greetAkhlaque(); // "Hello, Akhlaque!" — still works even though makeGreeter already returned


/********************************************************
 * 5️⃣ SHADOWING
 *
 * A variable in an inner scope with the SAME NAME as an
 * outer one "shadows" it — the inner one wins for any
 * lookup inside that inner scope, and the outer one is
 * untouched.
 ********************************************************/

const color = 'blue';

function paint() {
    const color = 'red'; // shadows the outer `color`
    console.log(color);  // 'red' — inner wins inside this scope
}

paint();
console.log(color); // 'blue' — outer variable was never modified


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ Scope chain lookup direction is always INWARD-to-OUTWARD,
 *   stopping at the first match found.
 * ✔ "Lexical" scoping = decided by source-code structure at
 *   definition time — this is why closures can still access
 *   variables from a function that has already returned.
 * ✔ Shadowing isn't an error — it's often intentional
 *   (e.g. a loop variable named the same as an outer one).
 * ✔ Block scope (`{ }`) only applies to let/const — `var`
 *   ignores block boundaries and is function-scoped only
 *   (see 002-let_const_var_scoping.js).
 *
 * KEY: scope is a static map baked in by where you WRITE
 * your code — the scope chain is just the lookup path
 * through that map.
 ********************************************************/
