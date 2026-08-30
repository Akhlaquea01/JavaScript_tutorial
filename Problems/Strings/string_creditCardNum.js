/**
 * Masks all but the last 4 digits of a credit card number with asterisks.
 * Time: O(n)  Space: O(n)
 */
const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));