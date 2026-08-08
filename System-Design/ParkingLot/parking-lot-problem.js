// Use ES module imports for the classes
import { Bike, Car } from './Vehicle.js';
import { ParkingSlot } from './ParkingSlot.js';
import { ParkingLot } from './ParkingLot.js';
import { ParkingFloor } from './ParkingFloor.js';
import { DisplayBoard } from './DisplayBoard.js';
import fs from 'fs';

// Load or initialize vehicle data
const dataPath = './vehicleData.json';
function loadVehicleData() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ parkedVehicles: [], historyLogs: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dataPath));
}
function saveVehicleData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Setup floors and slots
const floor1 = new ParkingFloor(1);
floor1.addSlot(new ParkingSlot(1, 'BIKE'));
floor1.addSlot(new ParkingSlot(2, 'CAR'));
const floor2 = new ParkingFloor(2);
floor2.addSlot(new ParkingSlot(3, 'CAR'));

const lot = new ParkingLot();
lot.floors = [floor1, floor2]; // Add floors to lot

// Map slots to lot for compatibility
lot.slots = [...floor1.slots, ...floor2.slots];

// Display board setup
const displayBoard = new DisplayBoard();
displayBoard.addFloor(floor1);
displayBoard.addFloor(floor2);

displayBoard.showAvailability();

const bike = new Bike('BIKE123');
const car = new Car('CAR456');

// Load vehicle data
let vehicleData = loadVehicleData();

const ticket1 = lot.parkVehicle(bike);
console.log('Ticket for bike:', ticket1);
if (ticket1 && ticket1.ticketId) {
    vehicleData.parkedVehicles.push({
        ticketId: ticket1.ticketId,
        licensePlate: bike.licensePlate,
        entryTime: ticket1.entryTime,
        slotId: ticket1.slotId
    });
    vehicleData.historyLogs.push({
        event: 'entry',
        licensePlate: bike.licensePlate,
        time: ticket1.entryTime,
        slotId: ticket1.slotId
    });
    saveVehicleData(vehicleData);
}

displayBoard.showDetailedAvailability();

const ticket2 = lot.parkVehicle(car);
console.log('Ticket for car:', ticket2);
if (ticket2 && ticket2.ticketId) {
    vehicleData.parkedVehicles.push({
        ticketId: ticket2.ticketId,
        licensePlate: car.licensePlate,
        entryTime: ticket2.entryTime,
        slotId: ticket2.slotId
    });
    vehicleData.historyLogs.push({
        event: 'entry',
        licensePlate: car.licensePlate,
        time: ticket2.entryTime,
        slotId: ticket2.slotId
    });
    saveVehicleData(vehicleData);
}

displayBoard.showDetailedAvailability();

// Simulate time passing...
setTimeout(() => {
    const result = lot.unparkVehicle('CAR456');
    console.log('Unpark Result:', result);
    if (result && result.slotId) {
        vehicleData.parkedVehicles = vehicleData.parkedVehicles.filter(v => v.licensePlate !== 'CAR456');
        vehicleData.historyLogs.push({
            event: 'exit',
            licensePlate: 'CAR456',
            time: new Date(),
            slotId: result.slotId
        });
        saveVehicleData(vehicleData);
    }
    displayBoard.showDetailedAvailability();
    console.log('Lot Status:', lot.getStatus());
}, 2000);
