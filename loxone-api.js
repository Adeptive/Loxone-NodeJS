var http = require('http');

function LoxoneAPI(settings) {

    var port = settings.port || 80;
    var ip = settings.ip;
    var username = settings.username || "admin";
    var password = settings.password || "admin";
    var debug = settings.debug || false;

    var baseUrl = "http://" + username + ":" + password + "@" + ip + ":" + port;

    var getBaseUrl = function () {
        return baseUrl;
    };

    this.getEnumIn = function(callback) {
        _get("/jdev/sps/enumin", callback);
    };

    this.getEnumOut = function(callback) {
        _get("/jdev/sps/enumout", callback);
    };

    this.getEnumDev = function(callback) {
        _get("/jdev/sps/enumdev", callback);
    };

    this.getState = function(callback) {
        _get("/jdev/sps/state", callback);
    };

    this.getChanges = function(callback) {
        _get("/jdev/sps/changes", callback);
    };

    this.getCPU= function(callback) {
        _get("/jdev/sys/cpu", callback);
    };

    this.getValue = function (device, callback) {
        this.get(device, function(output) {
            if (output.LL.Code == '200') {
                callback(output.LL.value);
            } else {
                callback();
            }
        });
    };

    this.get = function (device, callback) {
        var url = "/jdev/sps/io/" + device;
        _get(url, callback);
    };

    this.set = function (device, action, callback) {
        var url = "/jdev/sps/io/" + device + "/" + action;
        _get(url, callback);
    };

    // UTILITY METHODS +++++++++++++++++++++++++++++

    var _get = function(url, callback) {
        url = getBaseUrl() + url;

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