const x = [
    {
        "id": "1",
        "type": "wallet_transaction",
        "attributes": {
            "id": 1,
            "name": "John",
            "created_at": "2022-01-05T10:00:00.000+05:30",
            "amount": "50.0",
            "payment_method": "Credit Card",
            "status": "pending",
            "order_id": "123"
        }
    },
    {
        "id": "2",
        "type": "wallet_transaction",
        "attributes": {
            "id": 2,
            "name": "Alice",
            "created_at": "2022-02-10T14:30:00.000+05:30",
            "amount": "75.5",
            "payment_method": "PayPal",
            "status": "complete",
            "order_id": "456"
        }
    },
    {
        "id": "3",
        "type": "wallet_transaction",
        "attributes": {
            "id": 3,
            "name": "Bob",
            "created_at": "2022-03-15T18:15:00.000+05:30",
            "amount": "120.25",
            "payment_method": "Bank Transfer",
            "status": "failed",
            "order_id": "789"
        }
    },
    {
        "id": "4",
        "type": "wallet_transaction",
        "attributes": {
            "id": 4,
            "name": "Sarah",
            "created_at": "2022-04-20T22:45:00.000+05:30",
            "amount": "90.75",
            "payment_method": "Bitcoin",
            "status": "complete",
            "order_id": "234"
        }
    },
    {
        "id": "5",
        "type": "wallet_transaction",
        "attributes": {
            "id": 5,
            "name": "David",
            "created_at": "2022-05-25T07:30:00.000+05:30",
            "amount": "60.0",
            "payment_method": "Credit Card",
            "status": "pending",
            "order_id": "567"
        }
    },
    {
        "id": "6",
        "type": "wallet_transaction",
        "attributes": {
            "id": 6,
            "name": "Emma",
            "created_at": "2022-06-03T16:20:00.000+05:30",
            "amount": "105.5",
            "payment_method": "PayPal",
            "status": "complete",
            "order_id": "890"
        }
    },
    {
        "id": "7",
        "type": "wallet_transaction",
        "attributes": {
            "id": 7,
            "name": "Michael",
            "created_at": "2022-07-10T12:15:00.000+05:30",
            "amount": "80.25",
            "payment_method": "Bank Transfer",
            "status": "failed",
            "order_id": "123"
        }
    },
    {
        "id": "8",
        "type": "wallet_transaction",
        "attributes": {
            "id": 8,
            "name": "Olivia",
            "created_at": "2022-08-16T08:30:00.000+05:30",
            "amount": "70.0",
            "payment_method": "Bitcoin",
            "status": "complete",
            "order_id": "456"
        }
    },
    {
        "id": "9",
        "type": "wallet_transaction",
        "attributes": {
            "id": 9,
            "name": "William",
            "created_at": "2022-09-21T09:45:00.000+05:30",
            "amount": "95.5",
            "payment_method": "Credit Card",
            "status": "pending",
            "order_id": "789"
        }
    },
    {
        "id": "10",
        "type": "wallet_transaction",
        "attributes": {
            "id": 10,
            "name": "Sophia",
            "created_at": "2022-10-29T11:20:00.000+05:30",
            "amount": "110.0",
            "payment_method": "PayPal",
            "status": "complete",
            "order_id": "234"
        }
    },
    {
        "id": "11",
        "type": "wallet_transaction",
        "attributes": {
            "id": 11,
            "name": "Ethan",
            "created_at": "2022-11-03T14:50:00.000+05:30",
            "amount": "65.25",
            "payment_method": "Bank Transfer",
            "status": "failed",
            "order_id": "567"
        }
    },
    {
        "id": "12",
        "type": "wallet_transaction",
        "attributes": {
            "id": 12,
            "name": "Ava",
            "created_at": "2022-12-05T18:10:00.000+05:30",
            "amount": "120.5",
            "payment_method": "Bitcoin",
            "status": "complete",
            "order_id": "890"
        }
    },
    {
        "id": "13",
        "type": "wallet_transaction",
        "attributes": {
            "id": 13,
            "name": "Liam",
            "created_at": "2023-01-10T21:30:00.000+05:30",
            "amount": "75.0",
            "payment_method": "Credit Card",
            "status": "pending",
            "order_id": "123"
        }
    },
    {
        "id": "14",
        "type": "wallet_transaction",
        "attributes": {
            "id": 14,
            "name": "Mia",
            "created_at": "2023-02-15T23:45:00.000+05:30",
            "amount": "85.75",
            "payment_method": "PayPal",
            "status": "complete",
            "order_id": "456"
        }
    },
    {
        "id": "15",
        "type": "wallet_transaction",
        "attributes": {
            "id": 15,
            "name": "James",
            "created_at": "2023-03-20T01:05:00.000+05:30",
            "amount": "110.25",
            "payment_method": "Bank Transfer",
            "status": "failed",
            "order_id": "789"
        }
    }
];
// Create a map to store the year and month data
const yearMap = new Map();

// Loop through the initial data and add it to the yearMap
x.forEach(transaction => {
    const date = new Date(transaction.attributes.created_at);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    if (yearMap.has(year)) {
        const yearData = yearMap.get(year);
        const monthData = yearData.months.find(m => m.month === month);

        if (monthData) {
            monthData.data.push(transaction);
        } else {
            yearData.months.push({
                month,
                year,
                data: [transaction]
            });
        }
    } else {
        yearMap.set(year, {
            year,
            months: [{
                month,
                year,
                data: [transaction]
            }]
        });
    }
});

// Convert the yearMap to an array
const y = Array.from(yearMap.values());
console.log(y);
