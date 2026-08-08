'use strict';

// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Creating instances using constructor function
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// =>1. New {} is created
// =>2. function is called, this = {}
// =>3. {} linked to prototype
// =>4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// Checking instance's constructor
console.log(jonas instanceof Person);

// Adding a static method to the constructor function
Person.hey = function () {
  console.log('Hey there 👋');
};
Person.hey();

// Prototypes
console.log(Person.prototype);

// Adding a method to the prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Calling method on instances
jonas.calcAge();
matilda.calcAge();

// Demonstrating prototype chain
console.log(jonas.__proto__ === Person.prototype);

// Checking if an object is in the prototype chain
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// Adding a property to the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// Checking if a property is an own property
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // Getter and Setter
  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

// Creating instances using ES6 Classes
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

// Demonstrating inheritance
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  // Overriding method
  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.calcAge();


