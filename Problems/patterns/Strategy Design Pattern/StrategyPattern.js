// Strategy Design Pattern Implementation in JavaScript
// This example demonstrates a payment system where the payment method can be changed at runtime.

// 1. Strategy Interface (as a base class for convention)
class PaymentStrategy {
    pay(amount) {
        throw new Error("pay() must be implemented by subclass");
    }
}

// 2. Concrete Strategies
class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ₹${amount} using Credit Card.`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ₹${amount} using PayPal.`);
    }
}

class UpiPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ₹${amount} using UPI.`);
    }
}

// 3. Context Class
class ShoppingCart {
    constructor() {
        this.items = [];
        this.paymentStrategy = null;
    }

    addItem(item) {
        this.items.push(item);
    }

    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }

    checkout() {
        if (!this.paymentStrategy) {
            throw new Error("Payment strategy not set!");
        }
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        this.paymentStrategy.pay(total);
    }
}

// 4. Usage Example
// Create a shopping cart and add items
const cart = new ShoppingCart();
cart.addItem({ name: "Book", price: 300 });
cart.addItem({ name: "Pen", price: 50 });

// Choose payment strategy at runtime
cart.setPaymentStrategy(new CreditCardPayment());
cart.checkout(); // Paid ₹350 using Credit Card.

cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(); // Paid ₹350 using PayPal.

cart.setPaymentStrategy(new UpiPayment());
cart.checkout(); // Paid ₹350 using UPI.

// This demonstrates how the strategy can be changed at runtime without modifying the ShoppingCart logic.
