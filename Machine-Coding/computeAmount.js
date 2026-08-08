/*
Implement a JavaScript function computeAmount() that can be chained with multiple calls like .lacs(), .crore(), .thousand(), and finally .value() to compute the cumulative amount. Each method represents an amount in Indian currency terms:

Lacs = 100,000
Crores = 10,000,000
Thousand = 1,000 
*/
function computeAmount() {
    let total = 0;

    const converter = {
        lacs: function (amount) {
            total += amount * 100000;
            return this;
        },
        crore: function (amount) {
            total += amount * 10000000;
            return this;
        },
        thousand: function (amount) {
            total += amount * 1000;
            return this;
        },
        value: function () {
            return total;
        }
    };

    return converter;
}

// Example Usage:
const result = computeAmount()
    .lacs(15)
    .crore(5)
    .crore(2)
    .lacs(20)
    .thousand(45)
    .crore(7)
    .value();

console.log(result); // Output: 143545000

/*
class Amount {
  constructor() {
    this.total = 0;
  }

  lacs(amount) {
    this.total += amount * 100000;
    return this; // Enable method chaining
  }

  crore(amount) {
    this.total += amount * 10000000;
    return this;
  }

  thousand(amount) {
    this.total += amount * 1000;
    return this;
  }

  value() {
    return this.total;
  }
}

function computeAmount() {
  return new Amount(); // Return a new instance to start chaining
}


*/