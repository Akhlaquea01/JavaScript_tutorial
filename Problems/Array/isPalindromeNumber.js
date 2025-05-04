// Check if a number is palindrome
function isPalindrome(num) {
    let reverseNum = 0;
    let copyOfNum = num;
    while (num > 0) {
        const lastDigit = num % 10;
        reverseNum = reverseNum * 10 + lastDigit;
        num = Math.floor(num / 10);
    }
    return copyOfNum == reverseNum;
}

console.log(isPalindrome(121)); // true
console.log(isPalindrome(1234)); // false