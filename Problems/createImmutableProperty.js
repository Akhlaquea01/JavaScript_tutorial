function createImmutableProperty(object, symbol, value) {
    Object.defineProperty(object, symbol, {
        get() {
            return value;
        },
        set() {
            throw new Error('Cannot update the value of an immutable property');
        }
    });

    return object;
}

const symbol = Symbol('immutableSymbol');

const object = {};

// Create an immutable property on the object
const immutableProperty = createImmutableProperty(object, symbol, 'original value');

// Attempt to update the value of the property will throw error
//   immutableProperty[symbol] = 'new value';

// Get an array of all the symbol properties on the object
const symbol2 = Symbol('immutableSymbol2');
const immutableProperty2 = createImmutableProperty(object, symbol2, 'original value');
const symbolProperties = Object.getOwnPropertySymbols(object);
console.log(symbolProperties);


console.log(symbolProperties); // [ Symbol('immutableSymbol') ]
// Log the value of the property
console.log(immutableProperty[symbol]); // 'original value'
console.log(object); // { name: 'Atts', [Symbol('immutableSymbol')]: 'original value' }
