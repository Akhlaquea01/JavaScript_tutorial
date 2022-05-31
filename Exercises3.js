//Exercises: Level 1

let firstName = 'Akhlaque'; // first name of a person
let lastName = 'Ahmad'; // last name of a person
let country = 'India'; // country
let city = 'Muzaffarpur'; // city
let age = 23; // age in years
let isMarried = false;
let nullValue = null;
let year ;

console.log(typeof (firstName)); //string
console.log(typeof (lastName)); //string
console.log(typeof (country)); //string
console.log(typeof (city)); //string
console.log(typeof (age)); //number
console.log(typeof (isMarried)); //boolean
console.log(typeof (nullValue)); //object
console.log(typeof (year)); //undefined

console.log(typeof ('10')==10); //false
console.log(parseInt('9.8') == 10); //false

console.log(3 > 2)              // true, because 3 is greater than 2
console.log(3 >= 2)             // true, because 3 is greater than 2
console.log(2 < 3)              // true, because 2 is less than 3
console.log(0 === '')           // false, not exactly the same
console.log(NaN == NaN)         // false, not equal
console.log(NaN === NaN)        // false

console.log(4 > 3); //true
console.log(4 >= 3); //true
console.log(4 < 3); //false
console.log(4 <= 3); //false
console.log(4 == 4); //true
console.log(4 === 4); //true
console.log(4 != 4); //false
console.log(4 !== 4); //false
console.log(4 != '4'); //false
console.log(4 == '4'); //true
console.log(4 === '4'); //false
console.log('python'.length !== 'jargon'.length); //false => Find the length of python and jargon and make a falsy comparison statement.

console.log(4 > 3 && 10 < 12,'true')
console.log(4 > 3 && 10 > 12,'false')
console.log(4 > 3 || 10 < 12,'true')
console.log(4 > 3 || 10 > 12,'true')
console.log(!(4 > 3),'false')
console.log(!(4 < 3),'true')
console.log(!(false),'true')
console.log(!(4 > 3 && 10 < 12),'false')
console.log(!(4 > 3 && 10 > 12),'true')
console.log(!(4 === '4'), 'true')

const now = new Date()
console.log(now.getFullYear()); //2022
console.log(now.getMonth()); //04
console.log(now.getDate()); //31
console.log(now.getDay()); //2
console.log(now.getHours()); //20
console.log(now.getMinutes()); //48
console.log(now.getSeconds()); //52

// Exercises: Level 2

//JavaScript Program To Calculate The Area of a Triangle
var base = parseInt(prompt("Enter the base: "));
var height = parseInt(prompt("Enter the height: "));
//Calculating the area
var area = (base * height) / 2;
//Display Output
console.log("Base: " + base);
console.log("Height: " + height);
console.log("The area of the triangle is " + area);

//JavaScript Program To Calculate The  Perimeter of Triangle (perimeter = a + b + c).
var a = parseInt(prompt("Enter a: "));
var b = parseInt(prompt("Enter b: "));
var c = parseInt(prompt("Enter c: "));
//Calculating the Perimeter
var perimeter = a+b+c;
//Display Output
console.log("Enter side a : " + a);
console.log("Enter side b : " + b);
console.log("Enter side c : " + c);
console.log("The Perimeter of the triangle is " + perimeter);

//JavaScript Program To Calculate The Area of a Rectangle (area = length x width and the perimeter of rectangle (perimeter = 2 x (length + width))
var length = parseInt(prompt("Enter the length: "));
var width = parseInt(prompt("Enter the width: "));
//Calculating the area
var area = (length * width);
var perimeter = (length + width) * 2;
//Display Output
console.log("length: " + length);
console.log("width: " + width);
console.log("The area of the Rectangle is " + area);
console.log("The perimeter of the Rectangle is " + perimeter);

// Get radius using prompt and calculate the area of a circle (area = pi x r x r) and circumference of a circle(c = 2 x pi x r) where pi = 3.14.
var radius = parseInt(prompt("Enter the radius: "));
//Calculating the area
const pi = 3.14;
var area = (pi*radius * radius);
var circumference = pi*radius * 2;
//Display Output
console.log("radius: " + radius);
console.log("The area of the Circle is " + area);
console.log("The circumference of the Circle is " + circumference);

// Writ a script that prompt a user to enter hours and rate per hour. Calculate pay of the person?
var hours = parseInt(prompt("Enter hours: "));
var rate = parseInt(prompt("Enter rate: "));
weeklyEarnings = hours * rate;
console.log("Enter hours :", hours);
console.log("Enter rate per hour :", rate)
console.log("Your weekly earning is :", weeklyEarnings)

var name = 'Akhlaque Ahmad';
console.log(name.length>7?'Long Name':'Short Name');
console.log(firstName.length > lastName.length ? `Your first name, ${firstName} is longer than your family name,${lastName}` : `Your first name, ${firstName} is shorter than your family name,${lastName}`);

let myAge = 250;
let yourAge = 25;
console.log(myAge > yourAge ? `I am ${myAge - yourAge} years older than you.` : `I am ${yourAge - myAge} years younger than you.`);

var DOB = parseInt(prompt("Enter birth year : "));
var ageInNumber = parseInt(new Date().getFullYear()) - Number(DOB);
console.log(`You are ${ageInNumber}`, ageInNumber>18?'You are old enough to drive':'You will be allowed to drive after'+18-ageInNumber+' years.');

var liveForSeconds =ageInNumber*365*24*60*60;
console.log(`You have lived for ${liveForSeconds} seconds`);

var date = new Date();
// YYYY-MM-DD HH:mm
console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`);
// DD-MM-YYYY HH:mm
console.log(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`);
// DD/MM/YYYY HH:mm
console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`);

// Exercises: Level 3
console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`);
