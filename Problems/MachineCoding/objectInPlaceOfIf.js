// => Use OBJECTS instead of switch/if
const handlePayment = () => { console.log("Handle Payment"); };
const handleFailure = () => { console.log("Handle Failure"); };

const handlers = {
    success: handlePayment,
    failed: handleFailure,
};
const statusToHandle = 'failed';
const handler = handlers[statusToHandle];
if (!handler) throw Error("Status not recognized!");
return (handler()); // Handle Failure Logged
