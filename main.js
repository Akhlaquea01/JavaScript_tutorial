// comments can make code readable

// Welcome to 30DaysOfJavaScript

/*comments can make code readable,
  asy to reuse and informative*/

// Exercise: Level 1 {Day 2}
let challenge = '30 Days Of JavaScript';
console.log(challenge); //30 Days Of JavaScript
console.log(challenge.length); //21
console.log(challenge.toUpperCase()); //30 DAYS OF JAVASCRIPT
console.log(challenge.toLowerCase()); //30 days of javascript
console.log(challenge.substr(0, 2)); //30
console.log(challenge.substring(0, 2)); //30
console.log(challenge.substring(2)); //Days Of JavaScript
console.log(challenge.includes('Script')); //true
console.log(challenge.split()); //['30 Days Of JavaScript']
console.log(challenge.split(' ')); //['30', 'Days', 'Of', 'JavaScript']

let brandNames = 'Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon';
console.log(brandNames.split(',')); //['Facebook', ' Google', ' Microsoft', ' Apple', ' IBM', ' Oracle', ' Amazon']

console.log(challenge.replace('JavaScript', 'Python')); //30 Days Of Python
console.log(challenge.charAt(15)); //S
console.log(challenge.charCodeAt(11)); //74
console.log(challenge.indexOf('a')); //4
console.log(challenge.lastIndexOf('a')); //14

let because = 'You cannot end a sentence with because because because is a conjunction';
console.log(because.indexOf('because')); //31 
console.log(because.lastIndexOf('because')); //47
console.log(because.search('because')); //31

console.log(challenge.trim()); //30 Days Of JavaScript
console.log(challenge.startsWith('30 Days')); //true
console.log(challenge.endsWith('JavaScript')); //true
console.log(challenge.match('a')); //true

let string = '30'
console.log(string.concat("Days", "Of", "JavaScript")) // 30DaysOfJavaScript
console.log(challenge.repeat(2)) // 30 Days Of JavaScript30 Days Of JavaScript

// Exercise: Level 2 {Day 2}
console.log("The quote 'There is no exercise better for the heart than reaching down and lifting people up.' by John Holmes teaches us to help one another.");
console.log(`"Love is not patronizing and charity isn't about pity, it is about love. Charity and love are the same -- with charity you give love, so don't just give money but reach out your hand instead."`);
console.log(typeof (Number('10')) == typeof (10)); //true
console.log(Math.round(parseFloat('9.8')) == 10); //true

console.log('jargon'.includes('on') && 'python'.includes('on')); //true
console.log('I hope this course is not full of jargon'.includes('jargon')); //true
console.log(Math.floor(Math.random() * 101)); //Generate a random number between 0 and 100 inclusively.
console.log(Math.floor(Math.random() * (100 - 50) + 50)); //Generate a random number between 50 and 100 inclusively.
console.log(Math.floor(Math.random() * 256)); //Generate a random number between 0 and 255 inclusively.

let myString = 'JavaScript';
console.log(myString[Math.floor(Math.random() * myString.length)]); //Access the 'JavaScript' string characters using a random number.
console.log('1 1 1 1 1 \n2 1 2 4 8 \n3 1 3 9 27 \n4 1 4 16 64 \n5 1 5 25 125'); // Print pattern

let myString2 = 'You cannot end a sentence with because because because is a conjunction';
console.log(myString2.substr(myString2.indexOf('because'), ('because ').repeat(3).length)); //Use substr to slice out the phrase because because because from sentence

// Exercise: Level 3 {Day 2}
let myString3 = 'Love is the best thing in this world. Some found their love and some are still looking for their love.';
console.log(myString3.match(/love/gi)); //3
console.log('You cannot end a sentence with because because because is a conjunction'.match(/because/gi).length); //3

let myString4 = 'He earns 5000 euro from salary per month, 10000 euro annual bonus, 15000 euro online courses per month.';
const x = myString4.split(' ');
let sum = 0;
x.forEach(element => {
  if (element.match(/\d+/g)) {
    sum += Number(element)
  }
});
console.log(sum); //30000

const sentence = '%I $am@% a %tea@cher%, &and& I lo%#ve %te@a@ching%;. The@re $is no@th@ing; &as& mo@re rewarding as educa@ting &and& @emp%o@weri@ng peo@ple. ;I found tea@ching m%o@re interesting tha@n any ot#her %jo@bs. %Do@es thi%s mo@tiv#ate yo@u to be a tea@cher!? %Th#is 30#Days&OfJavaScript &is al@so $the $resu@lt of &love& of tea&ching';
let word = sentence.replace(/[^\w\s]/g, "")
  .match(/\w+/g)
  .reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    if (!(acc[word] < acc[acc.$])) acc.$ = word;
    return acc;
  }, {}).$;

console.log(word); //Teaching