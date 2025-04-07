// Count the number of digits of a number
function countDigits(num) {
    let count = 0;
    num = Math.abs(num);
    while (num > 0) {
        count = count + 1;
        num = Math.floor(num / 10);
    }
    return count;
}

console.log(countDigits(121)); // 3
console.log(countDigits(-1211413131)); // 10