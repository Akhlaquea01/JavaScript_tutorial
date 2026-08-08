// TOPIC: The switch Statement

// The switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case.
// If no case matches the expression, the default clause is executed.

const dayOfWeek = 'Monday';

switch (dayOfWeek) {
  case 'Monday':
    console.log('Start of the workweek!');
    break;
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
    console.log('Midweek hustle!');
    break;
  case 'Friday':
    console.log('TGIF - Time to unwind!');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend vibes!');
    break;
  default:
    console.log('Invalid day!');
}
