// Shows the availability of slots on each floor
export class DisplayBoard {
    constructor() {
        this.floors = [];
    }

    addFloor(floor) {
        this.floors.push(floor);
    }

    showAvailability() {
        this.floors.forEach(floor => {
            const available = floor.getAvailableSlots('CAR').length + floor.getAvailableSlots('BIKE').length;
            console.log(`Floor ${floor.floorNumber}: ${available} slots available`);
        });
    }

    showDetailedAvailability() {
        this.floors.forEach(floor => {
            console.log(`Floor ${floor.floorNumber} status:`, floor.getStatus());
        });
    }
}
