/**
 * Represents a parking session for a vehicle: entry/exit time and the slot used.
 */
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

    // Rounds up to the next full hour so any partial hour is billed as a whole one
    getDurationInHours() {
        return Math.ceil((this.exitTime - this.entryTime) / (1000 * 60 * 60));
    }
}
  