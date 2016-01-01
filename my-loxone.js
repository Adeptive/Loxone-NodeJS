var LoxoneAPI = require('./lib/loxone-api');

var loxone = new LoxoneAPI({
    ip: "0.0.0.0",
    debug: true,
    username: "admin",
    password: "admin"
});

module.exports = loxone;