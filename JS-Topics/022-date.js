// TOPIC: Date

// Creating a new Date object representing the current date and time
const now = new Date();
console.log(now);

// Creating Date objects using different date string formats
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

// Creating Date objects using specified date components
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

// Creating Date objects from timestamps
console.log(new Date(0)); // Epoch time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Three days later

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 (November)
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 (Thursday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // "2037-11-19T21:23:00.000Z"
console.log(future.getTime()); // Milliseconds since Jan 1, 1970
console.log(future.toString()); // "Thu Nov 19 2037 15:23:00 GMT+0530 (India Standard Time)"
console.log(future.toDateString()); // "Thu Nov 19 2037"
console.log(future.toTimeString()); // "15:23:00 GMT+0530 (India Standard Time)"
console.log(future.toUTCString()); // "Sun, 19 Nov 2037 09:53:00 GMT"
console.log(future.toJSON()); // "2037-11-19T21:23:00.000Z"
console.log(future.toLocaleString()); // "11/19/2037, 3:23:00 PM"
console.log(future.toLocaleDateString()); // "11/19/2037"
console.log(future.toLocaleTimeString()); // "3:23:00 PM"

// Creating Date objects from timestamps
console.log(new Date(2142256980000)); // Sun Jan 17 2038 19:33:00 GMT+0530 (India Standard Time)

// Getting the current timestamp
console.log(Date.now()); // Milliseconds since Jan 1, 1970

// Modifying date components
future.setFullYear(2040);
console.log(future); // Sun Nov 19 2040 15:23:00 GMT+0530 (India Standard Time)

// Operations with dates
const future2 = new Date(2037, 10, 19, 15, 23);
console.log(+future2); // Convert to timestamp

// Calculating days passed between two dates
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// Getting the current weekday
console.log(now.toLocaleString('default', { weekday: "long" })); // e.g., "Wednesday"
