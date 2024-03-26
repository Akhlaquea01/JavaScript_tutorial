// Define the Car class
class Car {
    // Constructor to initialize make and model properties
    constructor(make, model) {
        this.make = make; // Property to store the car make
        this.model = model; // Property to store the car model
        this.isStarted = false; // Property to track if the car is started or not
        this.speed = 0; // Property to track the speed of the car
    }

    // Method to start the car
    start() {
        this.isStarted = true; // Update the isStarted property to true
        console.log(`${this.make} ${this.model} started.`);
    }

    // Method to stop the car
    stop() {
        this.isStarted = false; // Update the isStarted property to false
        this.speed = 0; // Reset the speed to 0 when the car stops
        console.log(`${this.make} ${this.model} stopped.`);
    }

    // Method to accelerate the car
    accelerate(speed) {
        if (this.isStarted) {
            this.speed += speed; // Increase the speed by the provided value
            console.log(`${this.make} ${this.model} accelerated to ${this.speed} km/h.`);
        } else {
            console.log(`${this.make} ${this.model} is not started. Cannot accelerate.`);
        }
    }

    // Method to brake the car
    brake() {
        if (this.speed > 0) {
            this.speed = 0; // Reset the speed to 0 when braking
            console.log(`${this.make} ${this.model} stopped.`);
        } else {
            console.log(`${this.make} ${this.model} is already stopped.`);
        }
    }
}

// Define the SportsCar subclass
class SportsCar extends Car {
    // Constructor to initialize make, model, and topSpeed properties
    constructor(make, model, topSpeed) {
        super(make, model); // Call the constructor of the parent class (Car)
        this.topSpeed = topSpeed; // Additional property specific to sports cars
    }

    // Method specific to sports cars to display the top speed
    displayTopSpeed() {
        console.log(`${this.make} ${this.model} has a top speed of ${this.topSpeed} km/h.`);
    }
}

// Example usage:
const myCar = new Car('Toyota', 'Camry');
myCar.start(); // Output: Toyota Camry started.
myCar.accelerate(50); // Output: Toyota Camry accelerated to 50 km/h.
myCar.brake(); // Output: Toyota Camry stopped.
myCar.stop(); // Output: Toyota Camry stopped.

const mySportsCar = new SportsCar('Ferrari', '458 Italia', 325);
mySportsCar.start(); // Output: Ferrari 458 Italia started.
mySportsCar.accelerate(100); // Output: Ferrari 458 Italia accelerated to 100 km/h.
mySportsCar.displayTopSpeed(); // Output: Ferrari 458 Italia has a top speed of 325 km/h.
mySportsCar.stop(); // Output: Ferrari 458 Italia stopped.


/* 
Encapsulation: Properties and methods are encapsulated within classes. For example, the Car class encapsulates properties like make, model, isStarted, and speed, along with methods like start, stop, accelerate, and brake.

Inheritance: The SportsCar subclass inherits properties and methods from the Car class using the extends keyword.It inherits behavior such as starting, stopping, accelerating, and braking.

Abstraction: The Car class represents a high - level abstraction of a generic car with properties and methods common to all cars.It abstracts away the specific details of individual car instances.

Polymorphism: Both Car and SportsCar classes have a start method, but the implementation is different for each.This is an example of polymorphism where the same method name is used with different implementations in different classes.;
*/