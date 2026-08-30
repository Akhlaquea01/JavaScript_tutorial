/**
 Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.
 * Time: O(n)  Space: O(n)
 */
const rotateString = function (s, goal) {
    if (s.length !== goal.length) return false;
    const doubleS = s + s;
    return doubleS.includes(goal);
};

console.log(rotateString('abcde', 'cdeab'));

/**
 * Rotates s one character at a time and checks whether any rotation equals goal.
 * Time: O(n^2)  Space: O(n)
 */
const rotateString2 = function (s, goal) {
    if (s.length !== goal.length) return false;
    if (s.length === 0) return true; // Two empty strings are trivially rotations of each other

    let rotated = s;
    for (let i = 0; i < s.length; i++) {
        rotated = rotated.slice(1) + rotated[0];
        if (rotated === goal) return true;
    }

    return false;
};

console.log(rotateString2('abcde', 'cdeab')); // Output: true
console.log(rotateString2('abcde', 'abced')); // Output: false