/**
 * Computes parking fees from a ticket's duration and the vehicle's hourly rate.
 */
export class ParkingFeeCalculator {
    static rates = {
        BIKE: 10,  // per hour
        CAR: 20
    };

    // Fee = hours parked (rounded up) * hourly rate for the vehicle's type
    static calculate(ticket) {
        const hours = ticket.getDurationInHours();
        const rate = this.rates[ticket.vehicle.type] || 0;
        return hours * rate;
    }
}
  