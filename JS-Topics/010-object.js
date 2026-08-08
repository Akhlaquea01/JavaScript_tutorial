const person = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    age: new Date().getFullYear() - 1999,
    job: 'coder',
    friends: ['Aman', 'Firoz', 'Choti'],
    location: 'Portugal',
    twitter: '@iam_atts_'
};

const nameKey = 'Name'; // Using a variable to access a property
console.log(person['first' + nameKey]);

// Loop through object keys
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Using Object.entries() to loop through an object
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Object handling with dynamic keys
const interestedIn = "firstName";
if (person[interestedIn]) {
    console.log(person[interestedIn]); // Accessing dynamically using a variable
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

// Object Methods
const user = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    birthYear: 1999,
    job: 'coder',
    friends: ['Aman', 'Firoz', 'Varun'],
    hasDriversLicense: true,

    calcAge() {
        this.age = new Date().getFullYear() - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    }
};

console.log(user.calcAge());
console.log(user.age);
console.log(user.getSummary());

// Object.freeze to create an immutable object
function createPerson(name, age, favoriteFood, address, street, hobbies) {
    return Object.freeze({
        name,
        age,
        favoriteFood,
        address: Object.freeze(address),
        street,
        hobbies: Object.freeze([...hobbies]),
    });
}

const immutablePerson = createPerson("Kyle", 25, "Rice", {}, "1234", ["Weight Lifting", "Bowling"]);

console.log(immutablePerson);

// Object handling with dynamic keys
const foodMap = {
    Burger: 200,
    pizza: 500,
    juice: 200
};

function getPrice(item) {
    return foodMap[item];
}

console.log(getPrice("Burger"));
