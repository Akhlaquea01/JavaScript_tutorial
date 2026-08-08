// Observer Design Pattern Implementation in JavaScript
// This pattern allows objects (Observers) to subscribe to another object (Subject) and get notified of changes.

// Subject class: maintains a list of observers and notifies them of changes
class Subject {
    constructor() {
        this.observers = [];
    }

    // Add an observer
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Remove an observer
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notify all observers
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Observer interface: expects an update() method
class Observer {
    update(data) {
        // To be implemented by concrete observers
        throw new Error('update() must be implemented');
    }
}

// Concrete Observer 1
class ConsoleLogger extends Observer {
    update(data) {
        console.log(`ConsoleLogger received update: ${data}`);
    }
}

// Concrete Observer 2
class AlertLogger extends Observer {
    update(data) {
        // In browser, would use alert(). Here, just log for demonstration.
        console.log(`AlertLogger: ALERT! New data: ${data}`);
    }
}

// Example usage:
const subject = new Subject();
const consoleLogger = new ConsoleLogger();
const alertLogger = new AlertLogger();

// Subscribe observers
subject.subscribe(consoleLogger);
subject.subscribe(alertLogger);

// Notify all observers
subject.notify('First update!');
// Output:
// ConsoleLogger received update: First update!
// AlertLogger: ALERT! New data: First update!

// Unsubscribe one observer
subject.unsubscribe(consoleLogger);
subject.notify('Second update!');
// Output:
// AlertLogger: ALERT! New data: Second update!

// This demonstrates the Observer pattern: observers can subscribe/unsubscribe and are notified of changes.
