/**
 * Problem Statement: Implement a custom Event Emitter in JavaScript.
 *
 * Create a class `MyEventEmitter` that mimics the functionality of an event-driven system.
 * The class should support the following operations:
 *
 * 1. `on(event, listener)`: Registers a listener for a specific event.
 * 2. `emit(event, ...args)`: Triggers an event, calling all registered listeners.
 * 3. `off(event, listener)`: Removes a specific listener from an event.
 * 4. `once(event, listener)`: Registers a one-time listener that executes once and then removes itself.
 *
 * Example Usage:
 * const emitter = new MyEventEmitter();
 * emitter.on('greet', name => console.log(`Hello, ${name}!`));
 * emitter.emit('greet', 'Alice'); // Output: Hello, Alice!
 * emitter.off('greet', listener); // Removes the specific listener
 */
class MyEventEmitter {
    constructor() {
        this.events = {};
    }

    // Register a listener for a specific event
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    // Trigger an event, calling all its listeners with provided data
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    // Unregister a specific listener from an event
    off(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    // Register a listener that only executes once
    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper); // Remove the listener after first execution
        };
        this.on(event, wrapper);
    }
}

// Example usage:
const emitter = new MyEventEmitter();

const greet = name => console.log(`Hello, ${name}!`);
const greetOnce = name => console.log(`Hello for the first time, ${name}!`);

emitter.on('greet', greet);
emitter.once('greet', greetOnce);

emitter.emit('greet', 'Alice'); // Both listeners fire
emitter.emit('greet', 'Bob');   // Only the persistent one fires

emitter.off('greet', greet);
emitter.emit('greet', 'Charlie'); // No output, as all listeners are removed
