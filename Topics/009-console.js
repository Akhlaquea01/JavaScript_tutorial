// TOPIC: Console.assert

// Using console.assert() to check if user id exists
const user = {};
if (!user.id) {
    console.log("User id is missing!");
}
console.assert(user.id, "User id is missing!");

// TOPIC: Console.table

// Using console.table() to display array data
console.table(["apples", "oranges", "bananas"]);

// Defining a Person constructor function
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Creating an instance of Person
const me = new Person("Tyrone", "Jones");
console.table(me); // Displaying the Person object in a table format

// Displaying an object using console.table()
console.table({ "Name": "Akhlaque", "Age": 25 });

// Displaying an array of objects using console.table()
const people = [
    { firstName: 'George', hobby: 'Playing football' },
    { firstName: 'Carol', hobby: 'Watching movies' }
];
console.table(people);
console.table(people, ['hobby']); // Displaying only the 'hobby' property in the table

// TOPIC: Style

// Styling console output messages
console.log('%c Success', 'color:green;font-size:1.5rem');
console.log('%c Warning', 'color:orange;font-size:1.5rem');
console.log('%c Error', 'color:red;font-size:1.5rem');

// TOPIC: Variables wrapping

// Using console.log() with an object to display variable name and value
const myNumber = 234;
console.log({ myNumber });


console.log("Log");
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error("Error");
console.clear();

// TOPIC: Console.count()

// Using console.count() to count occurrences of a variable
function greet() {
    console.count(user2);
    return `hi ${user2}`;
}

let user2 = "bob";
greet();
user2 = "alice";
greet();
greet();
console.count("alice"); // Count occurrences of "alice"
console.countReset("alice"); // Reset count for "alice"

// TOPIC: Group

// Using console.group() to group console logs
console.group('user');
console.log('Atts');
console.log('Ahmad');
console.log("Hello world!");
console.groupCollapsed(); // Starting a collapsed group
console.log("Hello again, this time inside a collapsed group!");
console.groupEnd(); // Ending the collapsed group
console.groupEnd(); // Ending the 'user' group

// TOPIC: Time

// Using console.time() and console.timeEnd() to measure execution time
console.time('timer-1');
setTimeout(() => {
    console.timeEnd('timer-1');
}, 1000);

// Using console.timeLog() to log the current elapsed time
console.timeLog('timer-1');

// Using console.timeStamp() to add a timestamp to the console log
console.timeStamp('timer-1');

// TOPIC: console.dir()

// Using console.dir() to display an object in a tree-like structure
const object = { name: "Akhlaque", age: 34 };
console.dir(object);

// Logging with console.log() in a variable
let c = console.log.bind(this);
c("log");

// Styling console output message
const message = "Hello, this is a styled message!";
console.log("%c" + message, "color: blue; font-size: 20px; font-weight: bold;");
