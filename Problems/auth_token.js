//Problem Statement: Create a JavaScript library for managing authentication tokens in a web application. Ensure that these tokens are stored securely and cannot be accessed directly or tampered with.
const TokenManager = (function () {
    const tokenSymbol = Symbol('authToken');

    // Private function to generate a random token
    function generateToken() {
        return Math.random().toString(36).substr(2);
    }

    // Public API for token management
    return {
        setToken(userObject, token) {
            userObject[tokenSymbol] = token;
        },

        getToken(userObject) {
            return userObject[tokenSymbol];
        },

        generateAndSetToken(userObject) {
            const token = generateToken();
            this.setToken(userObject, token);
        },
    };
})();

// Usage example
const user = { username: 'john_doe' };
TokenManager.generateAndSetToken(user);

console.log(user); // { username: 'john_doe' }
console.log(TokenManager.getToken(user)); // <random token>


