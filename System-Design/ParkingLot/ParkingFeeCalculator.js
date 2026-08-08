export class ParkingFeeCalculator {
    static rates = {
        BIKE: 10,  // per hour
        CAR: 20
    };

    static calculate(ticket) {
        const hours = ticket.getDurationInHours();
        const rate = this.rates[ticket.vehicle.type] || 0;
        return hours * rate;
    }
}
  