/**
 * Represents a single parking slot; tracks occupancy and the type of vehicle it accepts.
 */
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

    // Frees the slot and hands back whichever vehicle was occupying it
    unpark() {
        const v = this.vehicle;
        this.isOccupied = false;
        this.vehicle = null;
        return v;
    }
}
  