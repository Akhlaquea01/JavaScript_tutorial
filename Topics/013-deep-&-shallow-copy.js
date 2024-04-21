// Shallow Copy
/*
In the above example, we use the Object.assign() method to create a shallow copy of the originalObj object. Then we modify the age and hobbies properties of the original object, which also affects the shallow copy object.
*/
let originalObj = {
    name: "John",
    age: 30,
    hobbies: [ "reading", "cooking" ]
};

let shallowCopyObj = Object.assign({}, originalObj);

console.log(originalObj); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }
console.log(shallowCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }

// Modify the original object
originalObj.age = 35;
originalObj.hobbies.push("gardening");

console.log(originalObj); // { name: "John", age: 35, hobbies: ["reading", "cooking", "gardening"] }
console.log(shallowCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking", "gardening"] }

// Deep Copy
/*
In this example, we use JSON.parse() and JSON.stringify() to create a deep copy of the originalObj object. This method creates a new object with new properties and values that are copies of the original object's properties and values. Modifying the original object does not affect the deep copy object. However, note that this method may not work for all types of objects, such as objects that contain functions or circular references.
*/
let originalObj2 = {
    name: "John",
    age: 30,
    hobbies: [ "reading", "cooking" ]
};

let deepCopyObj = JSON.parse(JSON.stringify(originalObj2));

console.log(originalObj2); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }
console.log(deepCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }

// Modify the original object
originalObj2.age = 35;
originalObj2.hobbies.push("gardening");

console.log(originalObj2); // { name: "John", age: 35, hobbies: ["reading", "cooking", "gardening"] }
console.log(deepCopyObj); // { name: "John", age: 30, hobbies: ["reading", "cooking"] }
