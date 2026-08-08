//Que:  truncate a String
function truncateStr(string, length) {
    if ((string.constructor === String) && (string.length > 0)) {
        return string.slice(0, length);
    }
}

console.log(truncateStr("string", 20));