// This pattern allows you to add new functionality to objects dynamically, without changing their structure.
// It is useful when you want to add features to individual objects, not to an entire class.

// Base component: a simple Coffee class
class Coffee {
    cost() {
        return 5; // Base cost
    }
    description() {
        return "Plain Coffee";
    }
}

// Decorator base class: wraps a coffee object and delegates methods
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost();
    }
    description() {
        return this.coffee.description();
    }
}

// Concrete Decorator: adds milk
class MilkDecorator extends CoffeeDecorator {
    cost() {
        return super.cost() + 2; // Adds cost of milk
    }
    description() {
        return super.description() + ", Milk";
    }
}

// Concrete Decorator: adds sugar
class SugarDecorator extends CoffeeDecorator {
    cost() {
        return super.cost() + 1; // Adds cost of sugar
    }
    description() {
        return super.description() + ", Sugar";
    }
}

// Usage Example:
// Start with a plain coffee
let myCoffee = new Coffee();
console.log(myCoffee.description(), "Cost:", myCoffee.cost()); // Plain Coffee Cost: 5

// Add milk using the decorator
myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description(), "Cost:", myCoffee.cost()); // Plain Coffee, Milk Cost: 7

// Add sugar using another decorator
myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description(), "Cost:", myCoffee.cost()); // Plain Coffee, Milk, Sugar Cost: 8

// This demonstrates how you can add features to objects at runtime using the Decorator pattern.
