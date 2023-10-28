// function func1(a, b, cb1, cb2) {
//     cb1(cb2)
//     return a+b;
// }

// function func2(cb3) {
//     console.log("func2")
//     cb3()
// }

// function func3() {
//     console.log("func3")
// }

// let num1 = 1
// let num2 = 2
// let sum = func1(num1, num2, func2, func3)
// console.log(sum)
// func2()

function square(a) {
    return a * a;
}

function sum(a, b) {
    return a + b;
}

function sumOfSquares(a, b, square, sum) {
    let a2 = square(a);
    let b2 = square(b);
    let sumOfSq = sum(a2, b2);
    return sumOfSq;
}

let a = 1;
let b = 2;
console.log(sumOfSquares(a, b, square, sum));

// ///////////////////
let transaction = [100, -200, 300, 400, -500, 600];

// function filterCreditTransactions(transaction) {
//     let creditTransactions = []
//     for (let i = 0; i < transaction.length; i++) {
//         if (transaction[i] > 0) {
//             creditTransactions.push(transaction[i])
//         }
//     }
//     return creditTransactions;
// }

// let creditTransactions = filterCreditTransactions(transaction)
// console.log(creditTransactions)

// function filterDebitTransactions(transaction) {
//     let debitTransactions = []
//     for (let i = 0; i < transaction.length; i++) {
//         if (transaction[i] < 0) {
//             debitTransactions.push(transaction[i])
//         }
//     }
//     return debitTransactions
// }

// let debitTransactions = filterDebitTransactions(transaction)
// console.log(debitTransactions)


function isCredit(transaction) {
    return transaction > 0;
}

function isDebit(transaction) {
    return transaction < 0;
}

function filter(transaction, cb) {
    let filter = [];
    for (let i = 0; i < transaction.length; i++) {
        if (cb(transaction[i])) {
            filter.push(transaction[i]);
        }
    }
    return filter;
}

let creditTransactions = filter(transaction, isCredit);
let debitTransactions = filter(transaction, isDebit);

console.log(creditTransactions, debitTransactions);