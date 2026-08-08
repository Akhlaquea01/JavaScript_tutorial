/*******************************************************
 * TOPIC: call, apply & bind
 *
 * Every function in JS has these three methods. They all
 * let you explicitly control what `this` is inside a
 * function call, instead of relying on how the function
 * happens to be invoked (see 016-this_binding.js for why
 * that matters).
 *
 * Covers:
 *  1. Why you'd need to control `this` manually
 *  2. .call()  — invoke now, args listed individually
 *  3. .apply() — invoke now, args passed as an array
 *  4. .bind()  — DON'T invoke, return a new bound function
 *  5. Partial application with bind
 *******************************************************/


/********************************************************
 * 1️⃣ THE PROBLEM: A METHOD BORROWED BY ANOTHER OBJECT
 *
 * `this` inside a regular function is determined by HOW
 * it's called, not where it's defined. Assigning the same
 * function to different objects means `this` changes too.
 ********************************************************/

function getEmailGlobal(domain, greet) {
    console.log(greet);
    return `${this.firstName}.${this.lastName}@${domain}.com`;
}

let student1 = {
    firstName: 'Adam',
    lastName: 'Smith',
    age: 25,
    getEmail: getEmailGlobal // same function, now a method of student1
};

console.log(student1.getEmail.call(student1)); // "Adam.Smith@undefined.com" — called AS a method, `this` is already student1

// Called plainly, `getEmailGlobal` has no object context — `this` is undefined (or global in non-strict mode)
// getEmailGlobal(); // would throw: Cannot read properties of undefined


/********************************************************
 * 2️⃣ .call(thisArg, arg1, arg2, ...)
 *
 * Runs the function IMMEDIATELY, with `this` forced to
 * `thisArg` and the rest of the arguments passed one by one.
 ********************************************************/

console.log(getEmailGlobal.call(student1));               // "Adam.Smith@undefined.com" — no domain/greet passed
console.log(getEmailGlobal.call(student1, 'gmail', 'hi')); // logs "hi", returns "Adam.Smith@gmail.com"


/********************************************************
 * 3️⃣ .apply(thisArg, [argsArray])
 *
 * Identical to .call(), except the arguments are passed
 * as a single array. Useful when you already have the
 * arguments collected in an array (e.g. from `arguments`
 * or a spread).
 ********************************************************/

let args = ['gmail', 'hi'];
console.log(getEmailGlobal.apply(student1, args)); // same result as the .call() above, args unpacked from the array


/********************************************************
 * 4️⃣ .bind(thisArg, arg1, ...)
 *
 * Does NOT call the function. It returns a brand-new
 * function with `this` (and optionally some leading args)
 * permanently locked in. You call the returned function
 * whenever you actually need the result.
 ********************************************************/

let callLater = getEmailGlobal.bind(student1, 'gmail', 'hi'); // not called yet
console.log(callLater()); // NOW it runs: logs "hi", returns "Adam.Smith@gmail.com"


/********************************************************
 * 5️⃣ REAL-WORLD EXAMPLE: BORROWING A METHOD
 ********************************************************/

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book.call(lufthansa, 239, 'Jonas Schmedtmann'); // normal case: `this` = lufthansa
lufthansa.book.call(lufthansa, 635, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

// eurowings has no .book() of its own — borrow lufthansa's, but force `this` to be eurowings
lufthansa.book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings.bookings); // the booking landed on eurowings, not lufthansa

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

const flightData = [583, 'George Cooper'];
lufthansa.book.apply(swiss, flightData); // same idea as .call(), args as an array
console.log(swiss.bookings);

const bookEW = lufthansa.book.bind(eurowings); // pre-bound: `this` is locked to eurowings forever
bookEW(23, 'Steven Williams');                 // call it like a normal function — `this` is already correct


/********************************************************
 * 6️⃣ call/apply/bind FOR CONSTRUCTOR-STYLE INHERITANCE
 *
 * Before ES6 classes, this was how you'd chain a "parent
 * constructor" — call it with the new object as `this` so
 * it initializes properties onto the object being built.
 ********************************************************/

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price); // run Product's init logic, but on THIS Food instance
    this.category = 'food';
}

console.log(new Food('cheese', 5).name); // "cheese"


/********************************************************
 * 7️⃣ PARTIAL APPLICATION WITH bind()
 *
 * Because bind() accepts leading arguments too, you can
 * "pre-fill" some parameters and get back a specialized
 * function that only needs the rest.
 ********************************************************/

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // 220 — generic version, both args supplied each time

const addVAT = addTax.bind(null, 0.23); // `rate` is now permanently 0.23; `this` isn't used here so it's `null`
console.log(addVAT(100)); // 123
console.log(addVAT(23));  // 28.29

// The same idea without bind, using a closure instead (see 022-closures.js)
const addTaxRate = (rate) => (value) => value + value * rate;
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); // 123 — same result, different mechanism


/********************************************************
 * 8️⃣ INTERVIEW NOTES
 *
 * ✔ call/apply run the function immediately; bind returns
 *   a new function for later.
 * ✔ call takes args individually; apply takes them as an array.
 * ✔ bind is the only one of the three that supports partial
 *   application (pre-filling leading arguments).
 * ✔ Arrow functions ignore call/apply/bind's `this` entirely —
 *   they always use the `this` from their enclosing scope.
 * ✔ Classic use case: "borrowing" a method from one object
 *   to run against another, or locking `this` for a callback
 *   passed to setTimeout/addEventListener.
 *
 * KEY: call/apply/bind exist because `this` is decided by
 * the CALL SITE, not the function definition — these methods
 * let you override that.
 ********************************************************/
