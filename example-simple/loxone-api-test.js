var loxone = require('./my-loxone');

loxone.get("AI_SEN2-T", function(output){
    if (output.LL.Code == 200) {
        console.log('Device does exists!');
        console.log('Value = ' + output.LL.value);
    } else {
        console.error('Device does NOT exists!');
    }
});

var myCallback = function(output) {
    console.log(output);
};

//loxone.getCPU(myCallback);

//loxone.getEnumDev(myCallback);

//loxone.getEnumIn(myCallback);

//loxone.getEnumOut(myCallback);

//loxone.getState(myCallback);

//loxone.getChanges(myCallback);