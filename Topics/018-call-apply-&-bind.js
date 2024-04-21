// Define a function getEmailGlobal that generates email addresses based on a domain and a greeting
function getEmailGlobal(domain, greet) {
    console.log(greet);
    return `${this.firstName}.${this.lastName}@${domain}.com`;
}

// Create an object representing a student
let student1 = {
    firstName: 'Adam',
    lastName: 'Smith',
    age: 25,
    getEmail: getEmailGlobal // Assign getEmailGlobal function to getEmail property
};

// Call getEmail method of student1 object with the context of student1
console.log(student1.getEmail.call(student1)); // Adam.Smith@gmail.com

// Call getEmailGlobal function directly with the context of student1
console.log(getEmailGlobal.call(student1)); // Adam.Smith@undefined.com

// Call getEmailGlobal function with arguments and the context of student1
console.log(getEmailGlobal.call(student1, 'gmail', "hi")); // hi

// Apply method
let args = ['gmail', "hi"];
console.log(getEmailGlobal.apply(student1, args)); // hi

// Bind Method
let callLater = getEmailGlobal.bind(student1, "gmail", "hi");
console.log(callLater()); // hi

// Define an object representing an airline
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

// Call book method of lufthansa with different context using call method
lufthansa.book.call(lufthansa, 239, 'Jonas Schmedtmann');
lufthansa.book.call(lufthansa, 635, 'John Smith');

// Define another airline object
const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

// Call book method of lufthansa with eurowings as context using call method
lufthansa.book.call(eurowings, 23, 'Sarah Williams');

// Define objects representing different airlines
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

// Define a function constructor for products
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Define a function constructor for food products, inheriting from Product
function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

// Create a new Food object
console.log(new Food('cheese', 5).name); // Expected output: "cheese"

// Apply method
const flightData = [583, 'George Cooper'];
lufthansa.book.apply(swiss, flightData);
console.log(swiss.bookings); // Contains the booking for flight 583 by George Cooper

// Bind Method
const bookEW = lufthansa.book.bind(eurowings);
bookEW(23, 'Steven Williams'); // Book a seat on Eurowings flight 23 for Steven Williams

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
lufthansa.buyPlane(); // Increments the number of planes owned by Lufthansa

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // Calculate tax for a value

const addVAT = addTax.bind(null, 0.23); // Pre-bind tax rate for VAT
console.log(addVAT(100)); // Calculate VAT for a value
console.log(addVAT(23)); // Calculate VAT for another value

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); // Calculate VAT for a value using a closure
console.log(addVAT2(23)); // Calculate VAT for another value using a closure
