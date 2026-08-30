/**
 * Abstract base for anything that can park; concrete vehicle types extend it.
 */
export class Vehicle {
    constructor(licensePlate, type) {
        // Guard against direct instantiation; only subclasses (Car, Bike) are valid
        if (new.target === Vehicle) throw new Error("Cannot instantiate abstract class");
        this.licensePlate = licensePlate;
        this.type = type;
    }
}

export class Car extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate, 'CAR');
    }
}

export class Bike extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate, 'BIKE');
    }
}
