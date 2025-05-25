// Abstract Factory Design Pattern Implementation in JavaScript
// The Abstract Factory Pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.
// It is useful when your code needs to work with various families of related products, but you don't want it to depend on the concrete classes.

// Abstract Product: Car
class Car {
    drive() {
        throw new Error('drive() must be implemented by subclasses');
    }
}

// Abstract Product: Bike
class Bike {
    ride() {
        throw new Error('ride() must be implemented by subclasses');
    }
}

// Concrete Product: ElectricCar
class ElectricCar extends Car {
    drive() {
        console.log('Driving an electric car.');
    }
}

// Concrete Product: PetrolCar
class PetrolCar extends Car {
    drive() {
        console.log('Driving a petrol car.');
    }
}

// Concrete Product: ElectricBike
class ElectricBike extends Bike {
    ride() {
        console.log('Riding an electric bike.');
    }
}

// Concrete Product: PetrolBike
class PetrolBike extends Bike {
    ride() {
        console.log('Riding a petrol bike.');
    }
}

// Abstract Factory
class VehicleFactory {
    createCar() {
        throw new Error('createCar() must be implemented');
    }
    createBike() {
        throw new Error('createBike() must be implemented');
    }
}

// Concrete Factory: ElectricVehicleFactory
class ElectricVehicleFactory extends VehicleFactory {
    createCar() {
        return new ElectricCar();
    }
    createBike() {
        return new ElectricBike();
    }
}

// Concrete Factory: PetrolVehicleFactory
class PetrolVehicleFactory extends VehicleFactory {
    createCar() {
        return new PetrolCar();
    }
    createBike() {
        return new PetrolBike();
    }
}

// Usage Example:
const electricFactory = new ElectricVehicleFactory();
const petrolFactory = new PetrolVehicleFactory();

const myElectricCar = electricFactory.createCar();
myElectricCar.drive(); // Output: Driving an electric car.

const myPetrolBike = petrolFactory.createBike();
myPetrolBike.ride(); // Output: Riding a petrol bike.

// This demonstrates the Abstract Factory pattern: you can create families of related objects (electric or petrol vehicles) without specifying their concrete classes in client code.
