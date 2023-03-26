// TOPIC: Date

const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));


// =>Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2020-05-12T23:50:21.817Z
console.log(future.getTime());
console.log(future.toString()); // Tue May 12 2020 18:50:21 GMT-0500 (Central Daylight Time)
console.log(future.toDateString()); // Tue May 12 2020
console.log(future.toTimeString()); // 18:50:21 GMT-0500 (Central Daylight Time)
console.log(future.toUTCString()); // Tue, 12 May 2020 23:50:21 GMT
console.log(future.toJSON()); // 2020-05-12T23:50:21.817Z
console.log(future.toLocaleString()); // 5/12/2020, 6:50:21 PM
console.log(future.toLocaleDateString()); // 5/12/2020
console.log(future.toLocaleTimeString()); // 6:50:21 PM


console.log(new Date(2142256980000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);


// =>Operations With Dates
const future2 = new Date(2037, 10, 19, 15, 23);
console.log(+future2);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

console.log(now.toLocaleString('default', {
  weekday: "long",
}));