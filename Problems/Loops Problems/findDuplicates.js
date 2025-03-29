function findDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

// Example usage:
const numbers = [1, 2, 3, 4, 2, 3, 5];
const duplicates = findDuplicates(numbers);
console.log(duplicates); // Output: [2, 3]

// Method 2
function findDuplicates2(arr) {
    let seen = new Set();
    let duplicates = new Set();
    arr.forEach((item) => {
        if (seen.has(item)) {
            duplicates.add(item);
        } else {
            seen.add(item);
        }
    });
    return Array.from(duplicates);
}

const duplicates2 = findDuplicates2(numbers);
console.log(duplicates2); // Output: [2, 3]

// Method 3
function findDuplicates3(arr) {
    let counts = new Map();
    let duplicates = [];

    for (let item of arr) {
        if (counts.has(item)) {
            counts.set(item, counts.get(item) + 1);
        } else {
            counts.set(item, 1);
        }
    }

    counts.forEach((count, item) => {
        if (count > 1) {
            duplicates.push(item);
        }
    });

    return duplicates;
}

// Example usage:
const duplicates3 = findDuplicates(numbers);
console.log(duplicates3); // Output: [2, 3]

