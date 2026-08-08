export class ParkingSlot {
    constructor(id, type) {
        this.id = id;
        this.type = type; // 'BIKE', 'CAR'
        this.isOccupied = false;
        this.vehicle = null;
    }

    park(vehicle) {
        this.isOccupied = true;
        this.vehicle = vehicle;
    }

    unpark() {
        const v = this.vehicle;
        this.isOccupied = false;
        this.vehicle = null;
        return v;
    }
}
  