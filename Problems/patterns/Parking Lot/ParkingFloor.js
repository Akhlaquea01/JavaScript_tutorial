// ParkingFloor.js
// Represents a floor in the parking lot, containing multiple slots
export class ParkingFloor {
    constructor(floorNumber) {
        this.floorNumber = floorNumber;
        this.slots = [];
    }

    addSlot(slot) {
        this.slots.push(slot);
    }

    getAvailableSlots(type) {
        return this.slots.filter(slot => slot.type === type && !slot.isOccupied);
    }

    getStatus() {
        return this.slots.map(slot => ({
            slotId: slot.id,
            type: slot.type,
            isOccupied: slot.isOccupied,
            vehicle: slot.vehicle?.licensePlate || null
        }));
    }
}
