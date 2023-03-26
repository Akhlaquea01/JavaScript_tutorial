const regex1 = /[aeiou]/; // character class
console.log(regex1.test("hello")); // true
console.log(regex1.test("wrld")); // false

const regex2 = /a+/; // quantifier
console.log(regex2.test("hello")); // false
console.log(regex2.test("aaa")); // true

const regex3 = /b*/; // quantifier
console.log(regex3.test("hello")); // true
console.log(regex3.test("bbb")); // true

const regex4 = /^hello/; // anchor
console.log(regex4.test("hello world")); // true
console.log(regex4.test("world hello")); // false

const regex5 = /world$/; // anchor
console.log(regex5.test("hello world")); // true
console.log(regex5.test("world hello")); // false

const regex6 = /(hello)+/; // group
console.log(regex6.test("hellohellohello")); // true
console.log(regex6.test("world")); // false

const regex7 = /hello|world/; // alternation
console.log(regex7.test("hello")); // true
console.log(regex7.test("world")); // true
console.log(regex7.test("foo")); // false

// Matching a valid email address:
const regex8 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(regex8.test("john.doe@example.com")); // true
console.log(regex8.test("jane.doe@example")); // false

// Matching a string of at least eight characters, containing at least one uppercase letter, one lowercase letter, and one number:
const regex9 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
console.log(regex9.test("Abcdefg1")); // true
console.log(regex9.test("abc123")); // false

// Matching a string that is a valid URL:
const regex10 = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
console.log(regex10.test("http://www.example.com")); // true
console.log(regex10.test("www.example.com")); // false

// Matching a string that contains only ASCII characters:
const regex11 = /^[\x00-\x7F]*$/;
console.log(regex11.test("hello world")); // true
console.log(regex11.test("こんにちは")); // false
