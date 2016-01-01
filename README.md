# Loxone-NodeJS
Loxone nodejs project to read &amp; control inputs and outputs

## Installation
```bash
npm install https://github.com/CONNCTED/Loxone-NodeJS --save
```

## Usage
### Create a new file 'my-loxone.js'
```javascript
var LoxoneAPI = require('loxone-nodejs');

var loxone = new LoxoneAPI({
    ip: "192.168.1.200",
    debug: true,
    username: "admin",
    password: "password"
});

module.exports = loxone;
```

This example connects to a Harmony hub available on the IP `192.168.1.200`. 
Also provide a username and password.

### In another nodejs file
```javascript
var loxone = require('./my-loxone');

loxone.get("AI_SEN2-T", function(output){
    if (output.LL.Code == 200) {
        console.log('Device does exists!');
        console.log('Value = ' + output.LL.value);
    } else {
        console.error('Device does NOT exists!');
    }
});
```

The following functions are available: `get(device, callback)` and `set(device, action, callback)`. 