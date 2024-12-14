// Sum of digits of a number i.e 12=3;
function sumOfDigits(num) {
    let sum = 0;

    while (num > 0) {
        sum += num % 10; //will get last digit
        num = Math.floor(num / 10);//will remove last digit
    }
    return sum;
}

console.log(sumOfDigits(1287)); // 18