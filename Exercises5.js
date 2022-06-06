// Exercise: Level 1

const emptyArray = Array();
console.log(emptyArray);

var arrayWithFiveElements = Array(5).fill(1);
console.log(arrayWithFiveElements);
console.log(arrayWithFiveElements.length);
console.log(arrayWithFiveElements[0],"First element",arrayWithFiveElements[arrayWithFiveElements.length-1],"Last element",arrayWithFiveElements[parseInt(arrayWithFiveElements.length/2)],"Midle element");

const mixedDataTypes = ["string", 1, true, undefined, null, {}, [], new Date()];
console.log(mixedDataTypes.length);

const itCompanies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon'];
console.log(itCompanies);
console.log("Number of companies " + itCompanies.length);
console.log(itCompanies[0],"First companie",itCompanies[itCompanies.length-1],"Last companie",itCompanies[parseInt(itCompanies.length/2)],"Midle companie");
console.log(itCompanies.join(' '));
itCompanies.forEach(Companies => {
  console.log(Companies.toUpperCase());
});

console.log(itCompanies.includes('Microsoft') ? 'Microsoft is in the list' : 'Microsoft is not in the list');
console.log(itCompanies.sort());
console.log(itCompanies.reverse());
console.log(itCompanies.slice(0,3));
console.log(itCompanies.slice((itCompanies.length-3),(itCompanies.length)));
console.log(itCompanies[parseInt((itCompanies.length) / 2)]);
console.log(itCompanies.shift());
console.log(itCompanies.splice(parseInt(itCompanies.length/2),1));
console.log(itCompanies.pop());
console.log(itCompanies.splice());

// Filter out companies which have more than one 'o' without the filter method

// Exercise: Level 2

// import { countries } from '/countries';
// import { webTechs } from '/web_techs';
// console.log(countries);
// console.log(webTechs);

let text = 'I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.';
var words=text.replaceAll('.','').replaceAll(',','').replaceAll('!','').replaceAll('?','').replaceAll(';','').replaceAll(':','').replaceAll('-','').split(' ');
console.log(words);
console.log(words.length);

const shoppingCart = ['Milk', 'Coffee', 'Tea', 'Honey'];
shoppingCart.unshift('Meat');
shoppingCart.includes('Sugar') ? '' : shoppingCart.push('Sugar');
const isAllergic = false;
shoppingCart.findIndex(item => item === 'Honey') === -1 ? '' : isAllergic ? shoppingCart.splice(shoppingCart.findIndex(item => item === 'Honey'), 1) : '';
shoppingCart[shoppingCart.findIndex(item => item === 'Tea')] = 'Green Tea';
console.log(shoppingCart);

const countries = [
  'Albania',
  'Bolivia',
  'Canada',
  'Denmark',
  'Ethiopia',
  'Finland',
  'Germany',
  'Hungary',
  'Ireland',
  'Japan',
  'Kenya'
];
countries.includes('Ethiopia') ? console.log('ETHIOPIA') : countries.push('Ethiopia');
console.log(countries);
(countries.length/2)===0?console.log(countries[parseInt((countries.length-1)/2)]):console.log(countries[parseInt((countries.length)/2)]);

const halfWayIndex = Math.ceil(countries.length / 2);
const firstHalfOfArray = countries.slice(0, halfWayIndex)
const secondHalfOfArray = countries.slice(halfWayIndex)
console.log(firstHalfOfArray);
console.log(secondHalfOfArray);


const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
];
webTechs.includes('Sass') ? console.log('Sass is a CSS preprocess') : webTechs.push('Sass') && console.log(webTechs);

const frontEnd = ['HTML', 'CSS', 'JS', 'React', 'Redux'];
const backEnd = ['Node', 'Express', 'MongoDB'];
const fullStack = frontEnd.concat(backEnd);
console.log(fullStack);

// Exercise: Level 3

const ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24];
ages.sort((a, b) => a - b);
console.log("min:", ages[0], "min:", ages[ages.length - 1]);
ages.length % 2 === 0 ? console.log("median:", (ages[ages.length / 2] + ages[ages.length / 2 - 1]) / 2) : console.log("median:", ages[parseInt(ages.length / 2)]);
console.log((ages.reduce((acc, curr) => acc + curr) / ages.length).toFixed(2) ,"Average age");