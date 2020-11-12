const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const led = require('./ledcontrol');

var options = {
    root: path.join(__dirname)
};

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
    console.log('Connected');
    res.sendFile('./index.html', options);
});

app.post('/turnoff', (req, res) => {
    console.log("Turn off");
    led.off();
    res.send('OK');
});

app.post('/color', (req, res) => {    
    led.twoColor(req.body.color1, req.body.color2);
    res.send('OK');
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});
