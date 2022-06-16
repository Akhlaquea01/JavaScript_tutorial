// Exercises: Level 1
let n = 10;
for(let i = 0; i <= n; i++){
  console.log(i, "for");
}

let i = 0
while (i <= 10) {
  console.log(i, "while");
  i++
}
let x = 0
do {
  console.log(x, "do while");
  x++
} while (x <= 10)

n = 5;
let string = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    string += '#';
  }
  string += "\n";
}
console.log(string);

for(let i = 0; i <= 10; i++) {
  const result = i * i;
  console.log(`${i} * ${i} = ${result}`);
}

console.log(`i  i^2  i^3`);
for(let i = 0; i <= 10; i++) {
  const result = i * i;
  console.log(`${i}  ${result}  ${result*i}`);
}

n = 100;
let sum = 0;
let oddSum = 0;
let evenSum = 0;
for (let i = 0; i <= n; i++){
  if (i % 2 == 0) {
    console.log(i, "even");
    evenSum += i;
  } else { 
    console.log(i, "odd");
    oddSum += i;
  }
  sum += i;
}
console.log(sum);
console.log(evenSum);
console.log(oddSum);
let arr = [];
arr.push(evenSum);
arr.push(oddSum);
console.log(arr);

//JavaScript program to print prime numbers from 1 to 100 using while loop
let isPrime = true;
 
console.log("Prime numbers from 1 to 100 are: ");
 
i =2;
while(i <= 100){
  let j=2;
  while(j < i - 1){
    if(i % j == 0){
      isPrime = false;
      break;
    }
    j++;
  }
  if(isPrime){
    console.log(i);
  }
  isPrime = true;
  i++;
}

const z = [];
for(let i = 0; i <= 5; i++){
  z.push(Math.random()*100);
}
console.log(z);

function stringGen(x){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < x; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
console.log(stringGen(6));

// Exercises: Level 2

console.log(stringGen(parseInt(Math.random()*100)));

console.log("#" + stringGen(6));

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
for ( i = 0; i < 10; i++) {
  console.log(getRandomRgb());
}

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

let upperCaseCountries = [];
let lengthCountries = [];
let allCountriesArray = [];
for (i = 0; i < countries.length; i++) {
  let arr = [];
  arr.push(countries[i].toUpperCase());
  arr.push(countries[i].toUpperCase().slice(0,3));
  arr.push(countries[i].length);
  upperCaseCountries.push(countries[i].toUpperCase());
  lengthCountries.push(countries[i].length);
  allCountriesArray.push(arr);
}
console.log(upperCaseCountries);
console.log(lengthCountries);
console.log(allCountriesArray);