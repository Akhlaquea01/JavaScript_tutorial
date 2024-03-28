// TOPIC: Strings and Template Literals
const _firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + _firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${_firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log('String with \n\
multiple \n\
lines');

console.log(`String
multiple
lines`);

// TOPIC: String methods

// 1. length: Returns the length of a string
const str = "hello world";
console.log(str.length); // 11

// 2. charAt(): Returns the character at a specified index in a string
console.log(str.charAt(1)); // "e"

// 3. charCodeAt(): Returns the Unicode value of the character at a specified index in a string
console.log(str.charCodeAt(1)); // 101

// 4. indexOf(): Returns the index of the first occurrence of a specified value in a string
console.log(str.indexOf("o")); // 4

// 5. lastIndexOf(): Returns the index of the last occurrence of a specified value in a string
console.log(str.lastIndexOf("o")); // 7

// 6. includes(): Checks whether a string contains specified characters
console.log(str.includes("world")); // true
console.log(str.includes("foo")); // false

// 7. startsWith(): Checks whether a string starts with specified characters
console.log(str.startsWith("hello")); // true
console.log(str.startsWith("world")); // false

// 8. endsWith(): Checks whether a string ends with specified characters
console.log(str.endsWith("world")); // true
console.log(str.endsWith("hello")); // false

// 9. substring(): Extracts the characters from a string between two specified indices
console.log(str.substring(0, 5)); // "hello"

// 10. substr(): Extracts a specified number of characters from a string, starting at a specified index
console.log(str.substr(6, 5)); // "world"

// 11. replace(): Searches a string for a specified value, and returns a new string where the specified value is replaced with another value
console.log(str.replace("world", "earth")); // "hello earth"

// 12. match(): Searches a string for a match against a regular expression, and returns the matched substrings
const regex = /world/;
console.log(str.match(regex)); // ["world"]

// 13. search(): Searches a string for a specified value, and returns the position of the match
console.log(str.search("world")); // 6

// 14. toString(): Returns a string representing the specified object
const num = 42;
console.log(num.toString()); // "42"

// 15. valueOf(): Returns the primitive value of a string object
const strObj = new String("hello world");
console.log(strObj.valueOf()); // "hello world"

// 16. toLocaleLowerCase(): Returns a new string with all the characters converted to lowercase, according to the current locale
console.log(str.toLocaleLowerCase()); // "hello world"

// 17. toLocaleUpperCase(): Returns a new string with all the characters converted to uppercase, according to the current locale
console.log(str.toLocaleUpperCase()); // "HELLO WORLD"

// 18. toLowerCase(): Returns a new string with all the characters converted to lowercase
console.log(str.toLowerCase()); // "hello world"

// 19. toUpperCase(): Returns a new string with all the characters converted to uppercase
console.log(str.toUpperCase()); // "HELLO WORLD"

// 20. concat(): Joins two or more strings, and returns a new string
const str1 = "hello";
const str2 = "world";
console.log(str1.concat(" ", str2)); // "hello world"

// 21. trim(): Removes whitespace from both ends of a string
const str3 = "   hello world    ";
console.log(str3.trim()); // "hello world"

// 22. trimStart() / trimLeft(): Removes whitespace from the beginning of a string
console.log(str3.trimStart()); // "hello world "
console.log(str3.trimLeft()); // "hello world "

// 23. trimEnd() / trimRight(): Removes whitespace from the end of a string
console.log(str3.trimEnd()); // " hello world"
console.log(str3.trimRight()); // " hello world"

// 24. repeat(): Returns a new string with a specified number of copies of an existing string
console.log(str.repeat(3)); // "hello worldhello worldhello world"

// 25. padStart(): Pads the beginning of a string with a specified character, until the resulting string reaches a specified length
console.log(str.padStart(15, "*")); // "****hello world"

// 26. padEnd(): Pads the end of a string with a specified character, until the resulting string reaches a specified length
console.log(str.padEnd(15, "")); // "hello world***"

// 27. toLocaleString(): Returns a string that represents the object in the current locale
console.log(num.toLocaleString()); // "42"

// 28. valueOf(): Returns the primitive value of a string object
console.log(strObj.valueOf()); // "hello world"

// 29. anchor(): Creates an HTML anchor element that is used as a hypertext target
console.log(str.anchor("myAnchor")); // "<a name="myAnchor">hello world</a>"

// 30. big(): Wraps a string in a <big> HTML tag
console.log(str.big()); // "<big>hello world</big>"

// 31. bold(): Wraps a string in a <b> HTML tag
console.log(str.bold()); // "<b>hello world</b>"

// 32. fixed(): Wraps a string in a <tt> HTML tag
console.log(str.fixed()); // "<tt>hello world</tt>"

// 33. fontcolor(): Wraps a string in a <font> HTML tag with a specified color
console.log(str.fontcolor("red")); // '<font color="red">hello world</font>'

// 34. fontsize(): Wraps a string in a <font> HTML tag with a specified font size
console.log(str.fontsize("6")); // '<font size="6">hello world</font>'

// 35. italics(): Wraps a string in an <i> HTML tag
console.log(str.italics()); // "<i>hello world</i>"

// 36. link(): Wraps a string in an <a> HTML tag with a specified URL
console.log(str.link("https://www.example.com")); // '<a href="https://www.example.com">hello world</a>'

// 37. small(): Wraps a string in a <small> HTML tag
console.log(str.small()); // "<small>hello world</small>"

// 38. slice(): Extracts a section of a string and returns a new string
console.log(str.slice(0, 5)); // "hello"

// 39. split(): Splits a string into an array of substrings
console.log(str.split(" ")); // ["hello", "world"]

// 40. startsWith(): Checks whether a string starts with specified characters
console.log(str.startsWith("hello")); // true
console.log(str.startsWith("world")); // false

// 41. endsWith(): Checks whether a string ends with specified characters
console.log(str.endsWith("world")); // true
console.log(str.endsWith("hello")); // false

// 42. includes(): Checks whether
console.log(str.includes("world")); // true
console.log(str.includes("goodbye")); // false

// 43. match(): Searches a string for a specified pattern and returns an array of the matches
console.log(str.match("world")); // ["world"]
console.log(str.match(/l/g)); // ["l", "l", "l"]

// 44. replace(): Searches a string for a specified value, and returns a new string where the specified value has been replaced with another value
console.log(str.replace("world", "friend")); // "hello friend"

// 45. search(): Searches a string for a specified value and returns the position of the first match
console.log(str.search("world")); // 6

// 46. toLowerCase(): Converts a string to lowercase letters
console.log(str.toLowerCase()); // "hello world"

// 47. toLocaleLowerCase(): Converts a string to lowercase letters, according to the host's current locale
console.log(str.toLocaleLowerCase()); // "hello world"

// 48. toUpperCase(): Converts a string to uppercase letters
console.log(str.toUpperCase()); // "HELLO WORLD"

// 49. toLocaleUpperCase(): Converts a string to uppercase letters, according to the host's current locale
console.log(str.toLocaleUpperCase()); // "HELLO WORLD"

// 50. toString(): Returns a string representation of an object
console.log(num.toString()); // "42"

// 51. trim(): Removes whitespace from both ends of a string
console.log(str3.trim()); // "hello world"

// 52. valueOf(): Returns the primitive value of a string object
console.log(strObj.valueOf()); // "hello world"


/**Extras */
// TOPIC: String

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';');
    const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')}
    ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
    console.log(output);
}

// TOPIC: Split and Join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');


// TOPIC: Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '#').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// TOPIC: Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);

// TOPIC: Uppercase Lowercase
const airlines = 'TAP Air Portugal';

console.log(airlines.toLowerCase());
console.log(airlines.toUpperCase());

// => Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// =>Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// => replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
    'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// => Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW ARirbus family');
}

const checkBaggage = function (items) {
    const baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are NOT allowed on board');
    } else {
        console.log('Welcome aboard!');
    }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');


const airline = 'TAP Air Portugal';
const plane2 = 'A320';

console.log(plane2[0]);
console.log(plane2[1]);
console.log(plane2[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
    // B and E are middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
    else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1));

//Que:  truncate a String
function truncateStr(string, length) {
    if ((string.constructor === String) && (string.length > 0)) {
        return string.slice(0, length);
    }
}

console.log(truncateStr("string", 2));

// Que: Reverse String
function reverse(string) {
    if (!string || string.length < 2 || typeof string !== 'string') return "Not Correct Input";
    const backwards = [];
    for (let i = string.length - 1; i >= 0; i--) {
        backwards.push(string[i]);
    }
    return backwards.join('');
}
console.log(reverse("string ki"));

// OR
const reverseSentance = str => str.split('').reverse().join('');
console.log(reverseSentance("string ki"));