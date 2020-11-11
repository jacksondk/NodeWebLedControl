const express = require('express');
const app = express();
const port = 8080;
const led = require('./ledcontrol');


app.get('/', (req, res) => {
    console.log("Shuffle light");
    led.shuffle()
    res.send("Ok");
});     

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);   
})
