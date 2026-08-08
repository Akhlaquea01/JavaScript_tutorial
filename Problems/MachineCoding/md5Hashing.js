const crypto = require('crypto');

function generateMD5Hash(obj) {
    // Trim spaces from keys and value
    const trimmedObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            trimmedObj[key.trim()] = obj[key].trim();
        }
    }
    const str = JSON.stringify(trimmedObj);
    return crypto.createHash('md5').update(str).digest('hex'); // Generate MD5 hash
}

// Example object/array

// Example object
// const responseObject = {
//     key1: 'value1 ',
//     key2: 'value2',
//     key3: 'value3'
// };

const responseObject = [
    'value1',
    'value2',
    'value3'
];

// Generate MD5 hash of the object
const currentHash = generateMD5Hash(responseObject);


// const previousHash = '43966138aebfdc4438520cc5cd2aefa8';
const previousHash = 'f24ecde3af7394fda8c5b7b34fe467ac';

// Compare current and previous hashes
if (currentHash === previousHash) {
    console.log('Response has not changed.');
} else {
    console.log('Response has changed.');
}
