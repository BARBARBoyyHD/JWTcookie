const crypto = require("crypto");

function generateToken() {
    return crypto.randomBytes(20).toString("hex");
}

console.log(generateToken());