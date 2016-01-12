var loxone = require('./my-loxone');

var myCallback = function(output){
    var f = console.log;
    if (output.LL.Code != 200) {
        f = console.error;
    }
    f("Call to: " + output.LL.control);
    f('Code = ' + output.LL.Code);
    f('Value = ' + output.LL.value);
    //console.log(output);
    f('----------------------------')
};

//First execute this method to discover all inputs
    //loxone.getEnumIn(myCallback);

//Select an input that holds a value
    // The inputs like I1, I2, ... are digital inputs
    // The inputs like AI1, AI2, ... are analog inputs
    // The inputs like VI1, VI2, ... are virtual inputs
    // Temperatures of the loxone modules are also returned by the enumIn function

    // If a digital input is a push button, the status will always be 0.
    // If a digital input is a switch, it will be status of the switch
    // Analog inputs may contain temperatures, virtual inputs can contain values, ...
    // From an input it's unlikely that you can check the status of a light.
    // Markers (GET)
    // Virtual status (GET)

//Example
    // If the enumIn function return 'switch A (I1)',
    // You can both use 'switch A' or 'I1' to pass the the get() or set() function.

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//read the value for an input
    //loxone.get("VI33", myCallback);

    //Will return 0 or 1 when a switch is off or on
    //Will return a numeric value in case the input is analog
    //Can contain additional characters like °C or V like configured on the input

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//send command or value for an input
    //loxone.set("VI33", 4, myCallback);

    //The value can be different for every input type
    //Analog inputs accept a numeric value (e.g. 2, 300, ...)
    //Digital inputs that are configured as a push button accept 'Pulse'
    //digital inputs that are configued as a switch accept 'On' or 'Off'

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//First execute this method to discover all outputs
    //loxone.getEnumOut(myCallback);

//Select an output that holds a value
// The inputs like Q1, Q2, ... are digital outputs
// The inputs like AQ1, AQ2, ... are analog outputs
// The virtual inputs can only be used by name

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//read the value for an output
    //loxone.get("Q_I6", myCallback); // socket
    //loxone.get("AQ_T2", myCallback); // dimming spot

    //Reading the value of a digital output indicates most of the time a light or socket that is on or off. (0 or 1)
    //Reading the value of a analog output returns a numeric value between 0 and 10 (or another configured range)
    //Reading a marker is also possible (both digital and analog)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//send command or value for an output
    //Controlling (setting a value to) an output is not possible if it indicates it's an 'only status indicator'
    //To control an output, you need to set the input that matches with that output.

    //TODO: input to output through a 'Lichtsturing'
    //TODO: input to output on another way...

    //control a simple socket or light
    //loxone.get('Q_I6', myCallback);
    //loxone.set("I_I6", 'Pulse', myCallback);

    //dimmer
    //loxone.get('AQ_T6', myCallback);
    //loxone.set("I_T2", 'Pulse', myCallback);

    //TODO: LED
    //LED1  (RGB)

    //TODO: fan, port, ...


    //TODO: getAll
    //loxone.getAll('Toilet%20beneden', myCallback);



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Other functions

//loxone.getCPU(console.log);
//loxone.getChanges(console.log);