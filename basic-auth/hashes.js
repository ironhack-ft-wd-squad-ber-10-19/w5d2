const bcrypt = require("bcrypt");

const plainText = "Hello World!";

const salt = bcrypt.genSaltSync();

console.log(salt);

const hash = bcrypt.hashSync(plainText, "$2b$10$WZkDdUaVEiw4ju8l3.xHiO");

console.log(hash);

// $2b$10$WZkDdUaVEiw4ju8l3.xHiO
// $2b$10$WZkDdUaVEiw4ju8l3.xHiOxxWkd.0S36bMKwjbnwYP9uiQTAKlAI.
// $2b$10$WZkDdUaVEiw4ju8l3.xHiOxxWkd.0S36bMKwjbnwYP9uiQTAKlAI.

// $2b$10$9FpFHLdykSQRKB8vt0.QZe
// $2b$10$9FpFHLdykSQRKB8vt0.QZeuqhmswl5fQvnYpcw0frxjmL7imTut0S
