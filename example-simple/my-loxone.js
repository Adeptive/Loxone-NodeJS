var LoxoneAPI = require('loxone-nodejs');

var loxone = new LoxoneAPI({
    ip: "10.0.1.100",
    debug: true,
    username: "admin",
    password: "admin"
});

module.exports = loxone;