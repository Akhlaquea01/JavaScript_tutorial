// TOPIC: Console.assert
// => The console.assert() method writes an error message to the console if the assertion is false.

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

// => 
var c = console.log.bind(document);
c("Message to print");