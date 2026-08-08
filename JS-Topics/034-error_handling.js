/*******************************************************
 * TOPIC: ERROR HANDLING IN JAVASCRIPT
 *
 * Covers:
 *  1. Types of Errors
 *  2. try / catch / finally
 *  3. The Error object
 *  4. Custom Error classes
 *  5. Re-throwing errors
 *  6. Error in async/await
 *  7. Error.cause (ES2022)
 *  8. Global error handling
 *******************************************************/


/********************************************************
 * 1️⃣ TYPES OF BUILT-IN ERRORS
 *
 * Error         → Generic base class
 * SyntaxError   → Invalid JS syntax
 * ReferenceError→ Accessing undeclared variable
 * TypeError     → Wrong type used
 * RangeError    → Value out of allowed range
 * URIError      → Invalid URI encoding
 * EvalError     → Related to eval() (rare)
 ********************************************************/

try {
    null.property;        // TypeError
} catch (e) {
    console.log(e instanceof TypeError); // true
    console.log(e.name);                 // "TypeError"
    console.log(e.message);             // Cannot read properties of null
}

try {
    undeclaredVar;        // ReferenceError
} catch (e) {
    console.log(e instanceof ReferenceError); // true
}

try {
    new Array(-1);        // RangeError
} catch (e) {
    console.log(e instanceof RangeError); // true
    console.log(e.message); // Invalid array length
}


/********************************************************
 * 2️⃣ try / catch / finally
 *
 * try    → code that might throw
 * catch  → runs if try throws
 * finally→ ALWAYS runs (cleanup)
 ********************************************************/

function divide(a, b) {
    try {
        if (b === 0) throw new Error("Division by zero!");
        return a / b;
    } catch (err) {
        console.error("Caught:", err.message);
        return null;
    } finally {
        console.log("divide() finished"); // always runs
    }
}

console.log(divide(10, 2));  // 5, "divide() finished"
console.log(divide(10, 0));  // Caught: Division by zero!, null


/********************************************************
 * 3️⃣ THE ERROR OBJECT
 *
 * Properties:
 *   name    → type of error (string)
 *   message → human-readable description
 *   stack   → stack trace string
 ********************************************************/

const err = new Error("Something went wrong");
console.log(err.name);    // Error
console.log(err.message); // Something went wrong
console.log(err.stack);   // Error: Something went wrong\n  at ...


/********************************************************
 * 4️⃣ CUSTOM ERROR CLASSES
 *
 * Extend the Error class for domain-specific errors.
 ********************************************************/

class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

function validateAge(age) {
    if (typeof age !== "number") {
        throw new ValidationError("age", "Age must be a number");
    }
    if (age < 0 || age > 150) {
        throw new ValidationError("age", "Age must be between 0 and 150");
    }
    return true;
}

try {
    validateAge("twenty");
} catch (err) {
    if (err instanceof ValidationError) {
        console.log(`Validation failed on field: ${err.field}`);
        console.log(`Message: ${err.message}`);
    }
}


/********************************************************
 * 5️⃣ RE-THROWING ERRORS
 *
 * catch handles the errors it "knows about",
 * and re-throws anything it doesn't handle.
 ********************************************************/

function processData(data) {
    try {
        if (!data) throw new ValidationError("data", "Data is required");
        JSON.parse(data); // might throw SyntaxError
    } catch (err) {
        if (err instanceof ValidationError) {
            console.log("Handled ValidationError:", err.message);
        } else {
            throw err; // re-throw — not our problem
        }
    }
}

try {
    processData(null);         // handled
    processData("{bad json}"); // re-thrown SyntaxError
} catch (err) {
    console.log("Unhandled error:", err.name, err.message);
}


/********************************************************
 * 6️⃣ ERROR HANDLING IN ASYNC/AWAIT
 ********************************************************/

async function fetchUser(id) {
    if (!id) throw new ValidationError("id", "ID is required");

    // Simulated fetch
    const data = await Promise.resolve({ id, name: "Alice" });
    return data;
}

async function main() {
    try {
        const user = await fetchUser(null);
        console.log(user);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}

main();

// Multiple async operations
async function multipleOps() {
    try {
        const [a, b] = await Promise.all([
            Promise.resolve(1),
            Promise.reject(new Error("B failed"))
        ]);
    } catch (err) {
        console.log("One of the promises failed:", err.message);
    }
}

multipleOps();


/********************************************************
 * 7️⃣ Error.cause — ES2022
 *
 * Chain errors together to show the root cause.
 ********************************************************/

function parseConfig(raw) {
    try {
        return JSON.parse(raw);
    } catch (err) {
        throw new Error("Config parsing failed", { cause: err });
    }
}

try {
    parseConfig("{ bad }");
} catch (err) {
    console.log(err.message);       // Config parsing failed
    console.log(err.cause.message); // Unexpected token b in JSON ...
}


/********************************************************
 * 8️⃣ OPTIONAL CATCH BINDING (ES2019+)
 *
 * You can omit the error variable if you don't need it.
 ********************************************************/

try {
    JSON.parse("{bad}");
} catch {
    // no `(err)` needed
    console.log("JSON parse failed (no binding needed)");
}


/********************************************************
 * 9️⃣ GLOBAL ERROR HANDLING
 *
 * In Node.js:
 ********************************************************/

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    // process.exit(1); // usually crash gracefully
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Promise Rejection:", reason);
});

// In browsers:
// window.onerror = (msg, src, line, col, err) => { ... }
// window.addEventListener("unhandledrejection", e => { ... })


/********************************************************
 * 🔟 BEST PRACTICES
 *
 * ✔ Always handle promise rejections
 * ✔ Use custom error classes for domain errors
 * ✔ Use Error.cause to chain errors (ES2022)
 * ✔ Re-throw errors you can't handle
 * ✔ finally for cleanup (close DB, release locks)
 * ✔ Don't catch and ignore errors silently
 *
 * ❌ catch (err) {} ← never do this — swallows errors
 ********************************************************/
