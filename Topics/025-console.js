// TOPIC: Console.assert

// INFO: The console.assert() method writes an error message to the console if the assertion is false.
const user = {};
if (!user.id) {
    console.log("User id is missing!");
}
console.assert(user.id, "User id is missing!");

// TOPIC: Console.table
console.table([ "apples", "oranges", "bananas" ]);
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const me = new Person("Tyrone", "Jones");

console.table(me);
console.table({ "Name": "Akhlaque", "Age": 25 });
const people = [
    {
        firstName: 'George',
        hobby: 'Playing football'
    },
    {
        firstName: 'Carol',
        hobby: 'Watching movies'
    }
];
console.table(people);
console.table(people, [ 'hobby' ]); //INFO: will print hobby in table

// Brownser thing=> 
// var c = console.log.bind(document);
// c("Message to print");
// console.trace("Log with stack trace");

// TOPIC: Style

console.log('%c Success', 'color:green;font-size:1.5rem');
console.log('%c Warning', 'color:orange;font-size:1.5rem');
console.log('%c Error', 'color:red;font-size:1.5rem');

// TOPIC: Variables wrapping

const myNumber = 234;
console.log({ myNumber });


console.log("Log");
console.debug("Debug");
console.info("Info");
console.warn("Warn");
console.error("Error");
console.clear();

// TOPIC: Console.count()
function greet() {
    console.count(user2);
    return `hi ${user2}`;
}

let user2 = "bob";
greet();
user2 = "alice";
greet();
greet();
console.count("alice");
console.countReset("alice");

// TOPIC: Group
console.group('user');
console.log('Atts');
console.log('Ahmad');
console.log("Hello world!");
console.groupCollapsed();
console.log("Hello again, this time inside a collapsed group!");
console.groupEnd();

// TOPIC: Time
console.time('timer-1');
setTimeout(() => {
    console.timeEnd('timer-1');
}, 1000);
console.timeLog('timer-1');
console.timeStamp('timer-1');

// TOPIC: console.dir()
const object = { name: "Akhlaque", age: 34 };
console.dir(object)

