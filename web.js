const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const led = require('./ledcontrol');

var options = {
    root: path.join(__dirname)
};

app.use(express.json()); // for parsing application/json
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/', (req, res) => {
    res.sendFile('./index.html', options);
});

app.post('/turnoff', (req, res) => {    
    led.off();
    res.send('OK');
});

app.post('/color', (req, res) => {
    led.twoColor(req.body.color1, req.body.color2);
    res.send('OK');
});

app.post('/program', (req, res) => {
    led.twoColor([0, 0, 0], [10, 0, 0]);
    res.send('OK')
});

app.post('/pulse', (req, res) => {
    led.pulse(req.body.v1, req.body.v2);
    res.send('OK');
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});
