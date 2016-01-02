var Accessory = require('hap-nodejs').Accessory;
var Service = require('hap-nodejs').Service;
var Characteristic = require('hap-nodejs').Characteristic;
var uuid = require('hap-nodejs').uuid;

var loxone = require('../loxone_temperatures');

// Generate a consistent UUID for our Temperature Sensor Accessory that will remain the same
// even when restarting our server. We use the `uuid.generate` helper function to create
// a deterministic UUID based on an arbitrary "namespace" and the string "temperature-sensor".
var sensorUUID = uuid.generate('hap-nodejs:loxone-accessories:temperature');

// This is the Accessory that we'll return to HAP-NodeJS that represents our fake lock.
var sensor = exports.accessory = new Accessory('Temperature (Dummy)', sensorUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
sensor.username = "C1:6D:3B:AE:5E:FA";
sensor.pincode = "031-45-154";

// set some basic properties (these values are arbitrary and setting them is optional)
sensor
    .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, "Loxone")
    .setCharacteristic(Characteristic.Model, "rev-1")
    .setCharacteristic(Characteristic.SerialNumber, "0000");

// Add the actual TemperatureSensor Service.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
sensor
    .addService(Service.TemperatureSensor)
    .getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', function(callback) {
        loxone.getTemperature(callback);
    });
