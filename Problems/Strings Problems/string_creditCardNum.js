const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));