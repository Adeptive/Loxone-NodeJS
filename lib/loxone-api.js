var http = require('http');

function LoxoneAPI(settings) {

    var port = settings.port || 80;
    var ip = settings.ip;
    var username = settings.username || "admin";
    var password = settings.password || "admin";
    var debug = settings.debug || false;

    var baseUrl = "http://" + username + ":" + password + "@" + ip + ":" + port + "/jdev/sps/io/";

    var loxone_api = this;

    this.getBaseUrl = function () {
        return baseUrl;
    };

    this.get = function (device, callback) {
        var url = loxone_api.getBaseUrl() + device;

        http.get(url, function(response) {
            var output = "";
            response.on('data', function (chunk) {
                output += chunk;
            });

            response.on('end', function() {
                output = JSON.parse(output);
                if (debug) {console.log(output);}

                // return our current value
                callback(output);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            callback();
        });
    };

    this.set = function (device, action, callback) {
        var url = loxone_api.getBaseUrl() + device + "/" + action;

        http.get(url, function(response) {
            var output = "";
            response.on('data', function (chunk) {
                output += chunk;
            });

            response.on('end', function() {
                output = JSON.parse(output);
                if (debug) {console.log(output);}

                // return our current value
                callback(output);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            callback();
        });
    };
}

module.exports = LoxoneAPI;