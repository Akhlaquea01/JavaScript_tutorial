// Exercises: Level 1
var number = parseInt(prompt("Enter number: "));
console.log((number / 2) == 0 ? `${number} is an even number` : `${number} is is an odd number.`);

// Exercises: Level 2

// Write a code which can give grades to students according to theirs scores
var score = 80;
if (score>80) {
    console.log("A");
} else if (score>70 && score<80) {
    console.log("B");
} else if (score > 60 && score < 70) {
  console.log("C");
} else if (score > 50 && score < 60) { 
  console.log("D");
} else {
  console.log("F");
}

var month = prompt("Enter month: ");
switch(month){
  case 'September':
  case 'October':
  case 'November':
    console.log("It's the Autumn");
    break
  case 'December':
  case 'January':
  case 'February':
      console.log("It's the Winter");
      break
  case 'March':
  case 'April':
  case 'May':
      console.log("It's the Spring");
    break
    case 'June':
    case 'July':
    case 'August':
        console.log("It's the Summer");
        break
  default:
    console.log("It's not a month");
}

var Day = prompt("Enter Day: ");
console.log(Day == "Saturday" || Day == "Sunday" ? "It's the weekend" : "It's a weekday");

switch (month) {
  case 'January':
  case 'March':
  case 'May':
  case 'July':
  case 'August':
  case 'October':
  case 'December':
    console.log(`${month} 31 days`);
    break
  case 'June':
  case 'April':
  case 'September':
  case 'November':
    console.log(`${month} 30 days`);
    break
  case 'February':
    console.log(`${month} 28 days`);
    break
  default:
    console.log("It's not a month");
}