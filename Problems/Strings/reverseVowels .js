var reverseVowels = function (s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']); // Set of vowels for quick lookup
    let chars = s.split(''); // Convert string to array for easy manipulation
    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
        // Move left pointer until a vowel is found
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        // Move right pointer until a vowel is found
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        // Swap vowels
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }

    return chars.join(''); // Convert array back to string
};

console.log(reverseVowels("IceCreAm"));