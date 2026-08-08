export class Vehicle {
    constructor(licensePlate, type) {
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
