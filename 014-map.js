// TOPIC: Maps
const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
  ]);
  console.log(question);
  
  // => Convert object to map
  const openingHours = {
    'sun': { open: '10', close: '18' },
    'mon': { open: '9', close: '19' },
    'tue': { open: '9', close: '19' },
    'wed': { open: '9', close: '19' },
    'thu': { open: '9', close: '19' },
    'fri': { open: '9', close: '21' },
    'sat': { open: '10', close: '18' },
};
  console.log(Object.entries(openingHours));
  const hoursMap = new Map(Object.entries(openingHours));
  console.log(hoursMap);
  
  // Quiz app
  console.log(question.get('question'));
  for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
  }
  const answer = 3;
  console.log(answer);
  
  console.log(question.get(question.get('correct') === answer));
  
  // =>Convert map to array
  console.log([...question]);
  console.log(question.entries());
  console.log([...question.keys()]);
  console.log([...question.values()]);
  
  
  // TOPIC: Map: Fundamentals
  const rest = new Map();
  rest.set('name', 'Classico Italiano');
  rest.set(1, 'Firenze, Italy');
  console.log(rest.set(2, 'Lisbon, Portugal'));
  
  rest
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');
  
  console.log(rest.get('name'));
  console.log(rest.get(true));
  console.log(rest.get(1));
  
  const time = 8;
  console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
  
  console.log(rest.has('categories'));
  rest.delete(2);
  // rest.clear();
  
  const arr = [1, 2];
  rest.set(arr, 'Test');
  console.log(rest);
  console.log(rest.size);
  
  console.log(rest.get(arr));

// =>Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});


// Que:
// Define the initial data
const x = [{
  "id": "15",
  "type": "wallet_transaction",
  "attributes": {
    "id": 15,
    "name": "sudhakar",
    "created_at": "2023-03-02T16:48:32.186+05:30",
    "amount": "100.0",
    "payment_method": "Manually by Admin",
    "status": "complete",
    "order_id": "null"
  }
}];

// Create a map to store the year and month data
const yearMap = new Map();

// Loop through the initial data and add it to the yearMap
x.forEach(transaction => {
  const date = new Date(transaction.attributes.created_at);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });

  if (yearMap.has(year)) {
    const yearData = yearMap.get(year);
    const monthData = yearData.months.find(m => m.month === month);

    if (monthData) {
      monthData.data.push(transaction);
    } else {
      yearData.months.push({
        month,
        year,
        data: [transaction]
      });
    }
  } else {
    yearMap.set(year, {
      year,
      months: [{
        month,
        year,
        data: [transaction]
      }]
    });
  }
});

// Convert the yearMap to an array
const y = Array.from(yearMap.values());
console.log(y);