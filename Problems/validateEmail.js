function validateEmail(email) {
    // Regular expression pattern for validating email addresses
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /*
        Explanation of the regex pattern:
        ^                // Asserts the start of the string
        [^\s@]+          // Matches one or more characters that are not whitespace or "@"
        @                // Matches the "@" character literally
        [^\s@]+          // Matches one or more characters that are not whitespace or "@"
        \.               // Matches the "." character literally
        [^\s@]+          // Matches one or more characters that are not whitespace or "@"
        $                // Asserts the end of the string
    */
    // Test the email against the pattern
    return pattern.test(email);
}
// Example usage:
const email1 = "user@example.com";
const email2 = "invalid.email.com";
console.log("Email 1:", validateEmail(email1)); // Output: true
console.log("Email 2:", validateEmail(email2)); // Output: false