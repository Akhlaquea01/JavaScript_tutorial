import { Ticket } from './Ticket.js';
import { ParkingFeeCalculator } from './ParkingFeeCalculator.js';

/**
 * Top-level parking lot: owns all slots and tracks active tickets by license plate.
 */
export class ParkingLot {
    constructor() {
        this.slots = []; // array of ParkingSlot
        this.activeTickets = new Map(); // licensePlate -> Ticket
    }

    addSlot(slot) {
        this.slots.push(slot);
    }

    // O(n) scan over all slots for the first free one matching the vehicle type
    findAvailableSlot(type) {
        return this.slots.find(slot => slot.type === type && !slot.isOccupied);
    }

    // Assigns a free slot to the vehicle and opens a ticket for the session
    parkVehicle(vehicle) {
        if (this.activeTickets.has(vehicle.licensePlate)) {
            return `Vehicle ${vehicle.licensePlate} is already parked.`;
        }

        const slot = this.findAvailableSlot(vehicle.type);
        if (!slot) return `No available slot for vehicle type ${vehicle.type}`;

        slot.park(vehicle);
        const ticket = new Ticket(slot, vehicle);
        this.activeTickets.set(vehicle.licensePlate, ticket);

        return ticket;
    }

    // Closes out the ticket, frees the slot, and computes the fee for the session
    unparkVehicle(licensePlate) {
        const ticket = this.activeTickets.get(licensePlate);
        if (!ticket) return `Vehicle ${licensePlate} not found`;

        // Close the ticket first so exitTime is set before duration/fee are derived from it
        ticket.close();
        const slot = this.slots.find(s => s.id === ticket.slotId);
        slot.unpark();

        this.activeTickets.delete(licensePlate);

        const fee = ParkingFeeCalculator.calculate(ticket);

        return {
            licensePlate,
            fee,
            duration: ticket.getDurationInHours(),
            slotId: slot.id
        };
    }

    getStatus() {
        return this.slots.map(s => ({
            slotId: s.id,
            type: s.type,
            isOccupied: s.isOccupied,
            vehicle: s.vehicle?.licensePlate || null
        }));
    }
}
