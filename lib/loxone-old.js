var http = require('http');
var loxoneAPI = require('loxone-api');
var Characteristic = require('hap-nodejs').Characteristic;

var LOXONE = {

    url: "http://admin:il7ect8it0jerj@10.0.1.25/jdev/sps/io/",

    getLightKerstboom: function(callback) {
        LOXONE.get("Q_I6", function(err, value) {
            if (value == 0) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    setLightKerstboom: function(action, callback) {
        LOXONE.get("I_I6", function(err, value) {
            var isOn = (value != 0);
            if (isOn != action) {
                LOXONE.set("I_I6/Pulse", callback);
            }
        });
    },

    getLightEethoek: function(callback) {
        LOXONE.get("TEMP%20EETHOEK", function(err, value) {
            if (value == 0) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    setLightEethoek: function(action, callback) {
        LOXONE.set("I_T5/Pulse", callback);
    },

    getLightZithoek: function(callback) {
        LOXONE.get("AQ_T2", function(err, value) {
            if (value == 0) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    },

    getBrightnessLightZithoek: function(callback) {
        LOXONE.get("AQ_T2", function(err, value) {
            callback(err, value * 10);
        });
    },

    setLightZithoek: function(action, callback) {
        LOXONE.set("I_T2/Pulse", callback);
    },

    setBrightnessLightZithoek: function(value, callback) {
        LOXONE.set("I_T2/" + value.toFixed(3), callback);
    },



    getTemperatuurLeefruimte: function(callback) {
        LOXONE.get("AI_SEN2-T", callback);
    },

    getVochtLeefruimte: function(callback) {
        LOXONE.get("AI_SEN2-RH", callback);
    },

    getTemperatuurBadkamer: function(callback) {
        LOXONE.get("AI_SEN3-T", callback);
    },

    getVochtBadkamer: function(callback) {
        LOXONE.get("AI_SEN3-RH", callback);
    },

    getCO2Leefruimte: function(callback) {
        LOXONE.get("AI_SEN2-CO2", function(id, value) {
            if (value >= 1100) {
                callback(id, Characteristic.AirQuality.POOR);
            } else if (value >= 950) {
                callback(id, Characteristic.AirQuality.INFERIOR);
            } else if (value >= 800) {
                callback(id, Characteristic.AirQuality.FAIR);
            } else if (value >= 650) {
                callback(id, Characteristic.AirQuality.GOOD);
            } else {
                callback(id, Characteristic.AirQuality.EXCELLENT);
            }
        });
    },

    getTemperatuurZonneboiler: function(callback) {
        LOXONE.get("AWI9", callback);
    },

    getTemperatuurKinderkamer1: function(callback) {
        LOXONE.get("AWI1", callback);
    },

    getTemperatuurKinderkamer2: function(callback) {
        LOXONE.get("AWI7", callback);
    },

    getTemperatuurBureau: function(callback) {
        LOXONE.get("AWI3", callback);
    },

    getTemperatuurEethoek: function(callback) {
        LOXONE.get("AWI5", callback);
    },

    getTemperatuurZithoek: function(callback) {
        LOXONE.get("AWI6", callback);
    },

    getTemperatuurMasterBedroom: function(callback) {
        LOXONE.get("AWI8", callback);
    },


    get: function (device, callback) {
        var url = LOXONE.url + device;

        http.get(url, function(response) {
            var output = "";
            response.on('data', function (chunk) {
                output += chunk;
            });

            response.on('end', function() {
                output = JSON.parse(output);
                console.log(output);

                // return our current value
                callback(null, output.LL.value * 1);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            callback(e.message, null);
        });
    },

    set: function (device, callback) {
        var url = LOXONE.url + device;

        http.get(url, function(response) {
            var output = "";
            response.on('data', function (chunk) {
                output += chunk;
            });

            response.on('end', function() {
                output = JSON.parse(output);
                console.log(output);

                // return our current value
                callback();
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            callback(e.message);
        });
    }
};

module.exports = LOXONE;