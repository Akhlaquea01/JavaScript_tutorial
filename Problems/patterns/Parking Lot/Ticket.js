export class Ticket {
    constructor(slot, vehicle) {
        this.ticketId = `${slot.id}-${Date.now()}`;
        this.slotId = slot.id;
        this.vehicle = vehicle;
        this.entryTime = new Date();
        this.exitTime = null;
    }

    close() {
        this.exitTime = new Date();
    }

    getDurationInHours() {
        return Math.ceil((this.exitTime - this.entryTime) / (1000 * 60 * 60));
    }
}
  