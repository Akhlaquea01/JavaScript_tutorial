// TOPIC: Dot vs. Bracket Notation
const atts = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    age: new Date().getFullYear() - 1999,
    job: 'coder',
    friends: [ 'Aman', 'Firoz', 'Choti' ]
};
console.log(atts);

console.log(atts.firstName);
console.log(atts[ 'lastName' ]);

const nameKey = 'Name';
console.log(atts[ 'first' + nameKey ]);
console.log(atts[ 'last' + nameKey ]);

const interestedIn = "firstName";

if (atts[ interestedIn ]) {
    console.log(atts[ interestedIn ]);
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

atts.location = 'Portugal';
atts[ 'twitter' ] = '@iam_atts_';
console.log(atts);

console.log(`${atts.firstName} has ${atts.friends.length} friends, and his best friend is called ${atts.friends[ 0 ]}`);


// TOPIC: Object Methods

const myData = {
    firstName: 'Akhlaque',
    lastName: 'Ahmad',
    birthYeah: 1999,
    job: 'coder',
    friends: [ 'Aman', 'Firoz', 'Varun' ],
    hasDriversLicense: true,

    calcAge: function () {
        this.age = new Date().getFullYear() - this.birthYeah;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${myData.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    }
};
console.log(myData.calcAge());
console.log(myData.age);
console.log(myData.getSummary());



// TOPIC: Looping Objects: Object Keys, Values, and Entries

const openingHours = {
    'sun': { open: '10', close: '18' },
    'mon': { open: '9', close: '19' },
    'tue': { open: '9', close: '19' },
    'wed': { open: '9', close: '19' },
    'thu': { open: '9', close: '19' },
    'fri': { open: '9', close: '21' },
    'sat': { open: '10', close: '18' },
};

// => Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); //[ 'a', 'b', 'c','d', 'e', 'f', 'g']

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
    openStr += `${day}, `;
}
console.log(openStr);

// => Property VALUES
const values = Object.values(openingHours);
console.log(values);

// => Entire object
const entries = Object.entries(openingHours);
console.log(entries);

// => [key, value]
for (const [ day, { open, close } ] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// Que:
const foodMap = {
    Burger: 200,
    pizza: 500,
    juice: 200
};
function getPrice(item) {
    return foodMap[ item ];
}
console.log(getPrice("Burger"));

// => Use OBJECTS instead of switch/if
const handlePayment = () => { console.log("Handle Payment"); };
const handleFailure = () => { console.log("Handle Failure"); };

const handlers = {
    success: handlePayment,
    failed: handleFailure,
};
const statusToHandle = 'failed';
const handler = handlers[ statusToHandle ];
if (!handler) throw Error("Status not recognized!");
return (handler()); // Handle Failure Logged

