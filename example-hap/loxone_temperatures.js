var loxone = require('./my-loxone');

loxone.getTemperature = function(callback) {
    this.getValue("AI_SEN2-T", callback);
};

module.exports = loxone;