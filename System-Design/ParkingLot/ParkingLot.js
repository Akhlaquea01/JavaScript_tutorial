import { Ticket } from './Ticket.js';
import { ParkingFeeCalculator } from './ParkingFeeCalculator.js';

export class ParkingLot {
    constructor() {
        this.slots = []; // array of ParkingSlot
        this.activeTickets = new Map(); // licensePlate -> Ticket
    }

    addSlot(slot) {
        this.slots.push(slot);
    }

    findAvailableSlot(type) {
        return this.slots.find(slot => slot.type === type && !slot.isOccupied);
    }

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

    unparkVehicle(licensePlate) {
        const ticket = this.activeTickets.get(licensePlate);
        if (!ticket) return `Vehicle ${licensePlate} not found`;

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
