// Original object with circular reference
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room
};

// Creating circular references
room.occupiedBy = meetup;
meetup.self = meetup;

// Serializing the object with a replacer function to exclude circular references
let serializedMeetup = JSON.stringify(meetup, function replacer(key, value) {
    // Check if the value is the circular reference
    if (key === 'self' || key === 'occupiedBy') {
        return undefined; // Exclude circular references
    }
    return value; // Return other values as is
});

console.log("Serialized Object:");
console.log(serializedMeetup); // Output: {"title":"Conference","place":{"number":23},"occupiedBy":[{"name":"John"},{"name":"Alice"}]}

// Deserializing the JSON string with a reviver function to handle circular references
let deserializedMeetup = JSON.parse(serializedMeetup, function reviver(key, value) {
    // Check if the key indicates a circular reference
    if (key === 'place') {
        // Create a new object for the place to avoid circular reference
        return { number: value.number };
    }
    return value; // Return other values as is
});

console.log("Deserialized Object:");
console.log(deserializedMeetup);
