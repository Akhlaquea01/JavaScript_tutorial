// Factory Design Pattern Implementation in JavaScript
// The Factory Pattern provides a way to create objects without specifying the exact class of object that will be created.
// It is useful when you want to delegate the responsibility of instantiating objects to a separate component (the factory).

// Base Product class
class Vehicle {
    drive() {
        throw new Error('drive() must be implemented by subclasses');
    }
}

// Concrete Product: Car
class Car extends Vehicle {
    drive() {
        console.log('Driving a car.');
    }
}

// Concrete Product: Bike
class Bike extends Vehicle {
    drive() {
        console.log('Riding a bike.');
    }
}

// Factory class: creates objects based on input
class VehicleFactory {
    static createVehicle(type) {
        if (type === 'car') {
            return new Car();
        } else if (type === 'bike') {
            return new Bike();
        } else {
            throw new Error('Unknown vehicle type');
        }
    }
}

// Usage Example:
const myCar = VehicleFactory.createVehicle('car');
myCar.drive(); // Output: Driving a car.

const myBike = VehicleFactory.createVehicle('bike');
myBike.drive(); // Output: Riding a bike.

// This demonstrates the Factory pattern: the factory decides which class to instantiate based on input, keeping creation logic in one place.
