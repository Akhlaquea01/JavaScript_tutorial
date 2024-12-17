/**
 Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.
 */
const rotateString = function (s, goal) {
    if (s.length !== goal.length) return false;
    const doubleS = s + s; // Concatenate s with itself
    return doubleS.includes(goal);
};

console.log(rotateString('abcde', 'cdeab'));

const rotateString2 = function (s, goal) {
    if (s.length !== goal.length) return false; // If lengths are different, they can't match

    let rotated = s; // Start with the original string
    for (let i = 0; i < s.length; i++) {
        // Rotate the string by moving the first character to the end
        rotated = rotated.slice(1) + rotated[0];
        if (rotated === goal) return true; // Check if rotated string matches the goal
    }

    return false; // If no rotation matches, return false
};

console.log(rotateString2('abcde', 'cdeab')); // Output: true
console.log(rotateString2('abcde', 'abced')); // Output: false