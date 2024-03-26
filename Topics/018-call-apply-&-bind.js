function getEmailGlobal(domain, greet) {
    console.log(greet);
    return (`${this.firstName}.${this.lastName}@${domain}.com`);
}

let student1 = {
    firstName: 'Adam',
    lastName: 'Smith',
    age: 25,

    getEmail: getEmailGlobal
};


// Call method
// <function_to_be_invoked>.call(<value_of_this_that_we_want_to_use>)
console.log(student1.getEmail.call(student1))
console.log(getEmailGlobal.call(student1))

// Call method with arguments
console.log(getEmailGlobal.call(student1, 'gmail', "hi"))

// Apply method
let args = ['gmail', "hi"];
console.log(getEmailGlobal.apply(student1, args))
console.log(getEmailGlobal.apply(student1, ['yahoo', 'hello']))
// Bind Method
let callLater = getEmailGlobal.bind(student1, "gmail", "hi");
console.log(callLater);
// ...later in code
console.log(callLater());



// TOPIC: The call and apply Methods
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams'); // INFO:wont be able to push in bookings

// TOPIC: Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

// 
function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// Expected output: "cheese"


book.call(swiss, 583, 'Mary Cooper');

// TOPIC: Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);


// apply(thisArg, argsArray)
/*
thisArg
The value of this provided for the call to func. If the function is not in strict mode, null and undefined will be replaced with the global object, and primitive values will be converted to objects.

argsArray (Optional)
An array-like object, specifying the arguments with which func should be called, or null or undefined if no arguments should be provided to the function.
*/
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max);
// Expected output: 7
const min = Math.min.apply(null, numbers);
console.log(min);
// Expected output: 2

// TOPIC: Bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// bind(thisArg, arg1, arg2, /* …, */ argN)
const module = {
    x: 42,
    getX: function () {
        return this.x;
    }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42

// =>With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);
};
lufthansa.buyPlane();

// =>Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

