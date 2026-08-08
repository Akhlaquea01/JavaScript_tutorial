/*******************************************************
 * TOPIC: ES MODULES (ESM) IN JAVASCRIPT
 *
 * Modern JavaScript module system using import/export.
 *
 * Covers:
 *  1. Why modules?
 *  2. Named exports & imports
 *  3. Default exports & imports
 *  4. Rename with `as`
 *  5. Re-exporting
 *  6. Dynamic import() — lazy loading
 *  7. import.meta
 *  8. Differences: CJS vs ESM
 *
 * NOTE: This file explains concepts and patterns.
 * To run ESM in Node.js: rename to .mjs OR add
 * "type": "module" in package.json.
 * In browsers: use <script type="module">
 *******************************************************/


/********************************************************
 * 1️⃣ WHY MODULES?
 *
 * Problems modules solve:
 *  - Global namespace pollution
 *  - Dependency management
 *  - Code reusability and separation of concerns
 *  - Encapsulation (only export what's needed)
 ********************************************************/


/********************************************************
 * 2️⃣ NAMED EXPORTS
 *
 * Export multiple things from one file.
 * There can be MANY named exports per module.
 ********************************************************/

// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

// Group exports at bottom (common pattern)
// export { PI, add, multiply, Vector };


/********************************************************
 * 3️⃣ NAMED IMPORTS
 *
 * Import only what you need using destructuring syntax.
 ********************************************************/

// In another file:
// import { add, multiply, PI } from "./math.js";
// console.log(add(2, 3));      // 5
// console.log(multiply(2, 3)); // 6
// console.log(PI);             // 3.14159


/********************************************************
 * 4️⃣ DEFAULT EXPORT
 *
 * Only ONE default export per module.
 * Commonly used for main class or function.
 ********************************************************/

// userService.js
class UserService {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    getAll() {
        return this.users;
    }
}

export default UserService;

// OR inline:
// export default function fetchUser(id) { ... }
// export default class Animal { ... }


/********************************************************
 * 5️⃣ DEFAULT IMPORT
 *
 * Default import can use ANY name — no braces needed.
 ********************************************************/

// import UserService from "./userService.js";
// import Service from "./userService.js"; // same thing, different name

// Mix default + named:
// import UserService, { helper, VERSION } from "./userService.js";


/********************************************************
 * 6️⃣ RENAMING WITH `as`
 ********************************************************/

// Rename on export
// export { add as addition, multiply as times };

// Rename on import
// import { add as addition, multiply as times } from "./math.js";
// console.log(addition(2, 3)); // 5

// Import ALL exports as a namespace object
// import * as Math from "./math.js";
// console.log(Math.add(1, 2));  // 3
// console.log(Math.PI);         // 3.14159


/********************************************************
 * 7️⃣ RE-EXPORTING (Barrel Files)
 *
 * Combine multiple modules into a single entry point.
 * Very common in large codebases (React component libraries).
 ********************************************************/

// index.js (barrel file):
// export { add, multiply } from "./math.js";
// export { default as UserService } from "./userService.js";
// export * from "./utils.js";

// Consumer:
// import { add, UserService } from "./index.js";


/********************************************************
 * 8️⃣ DYNAMIC IMPORT() — LAZY LOADING
 *
 * import() returns a Promise.
 * Load modules only when needed (code splitting).
 ********************************************************/

async function loadHeavyModule() {
    // Module is only fetched/parsed when this runs
    // const module = await import('./heavy.js');

    // Named import from dynamic module:
    // const { processData } = await import('./dataProcessor.js');
    // processData(someData);

    console.log("Heavy module would be loaded here lazily");
}

loadHeavyModule();

// Conditional dynamic import
async function loadLocale(lang) {
    // const { messages } = await import(`./locales/${lang}.js`);
    console.log(`Would load locale for: ${lang}`);
}

loadLocale("en");
loadLocale("hi");


/********************************************************
 * 9️⃣ import.meta
 *
 * Metadata about the current module.
 ********************************************************/

// import.meta.url   → URL of the current module file
// import.meta.env   → environment variables (in Vite/bundlers)
// import.meta.glob  → glob imports (Vite specific)

// In Node.js (ESM):
// console.log(import.meta.url);
// // file:///d:/Scaler/JavaScript_tutorial/Topics/037-modules_esm.js

// Convert to file path (Node.js ESM):
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


/********************************************************
 * 🔟 CommonJS (CJS) vs ES Modules (ESM)
 *
 * Feature         | CJS (require)      | ESM (import)
 * --------------- | ------------------ | --------------------
 * Syntax          | require/module.exports | import/export
 * Loading         | Synchronous        | Asynchronous (static)
 * Tree shaking    | ❌ No              | ✅ Yes
 * Top-level await | ❌ No              | ✅ Yes
 * Dynamic import  | require() works    | import() function
 * File extension  | .js / .cjs         | .mjs or type:module
 * Browser support | ❌ (bundler needed)| ✅ Native
 *
 * WHEN TO USE:
 *  ✔ ESM  → modern apps, frameworks (React, Vue, Svelte)
 *  ✔ CJS  → legacy Node.js packages
 ********************************************************/


/********************************************************
 * 1️⃣1️⃣ MODULE PATTERNS SUMMARY
 *
 * Named export  → export const/function/class foo
 * Default export→ export default foo
 *
 * Named import  → import { foo, bar } from "./file.js"
 * Default import→ import Foo from "./file.js"
 * Namespace     → import * as Foo from "./file.js"
 * Dynamic       → const mod = await import("./file.js")
 * Side effects  → import "./styles.css"
 * Re-export     → export { foo } from "./other.js"
 ********************************************************/

console.log("ESM module concepts demonstrated.");
