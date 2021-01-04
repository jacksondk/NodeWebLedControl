
const port = 25000;
const controller_ip = "esp.lan";

function sendPackage(ip, port, message) {
    const dgram = require('dgram');
    const client = dgram.createSocket('udp4');

    client.send(message, 0, message.length, port, controller_ip, (err) => {
        client.close();
    });
}


function oneColor(color) {
    twoColors(color, color);
}

function twoColors(color1, color2) {

    let command = Buffer.from([0x02]);
    let message = Buffer.concat([command,
        Buffer.from(color1), Buffer.from(color2)]);

    sendPackage("esp.lan", port, message);
}





function shuffle() {
    let r = () => {
        return Math.floor(Math.random() * 200);
    }

    twoColors([r(), r(), r()], [r(), r(), r()]);
}

function step(a, b) {
    if (a == b)
        return a;
    if (a < b)
        return a + 1;
    return a - 1;
}

function fromTo(color1, color2, delay) {
    oneColor(color1);
    let color3 = [step(color1[0], color2[0]),
    step(color1[1], color2[1]),
    step(color1[2], color2[2])];
    if (color1[0] == color2[0] &&
        color1[1] == color2[1] &&
        color1[2] == color2[2]) {
        console.log("Done");
        return;
    }

    setTimeout(() => {
        fromTo(color3, color2, delay)
    }, delay);
}

function hsvToRgb(h, s, v) {
    let c = v * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1))
    let m = v - c;

    h = h % 360;
    if (h < 60) {
        rgb = [c, x, 0];
    } else if (h < 120) {
        rgb = [x, c, 0];
    } else if (h < 180) {
        rgb = [0, c, x];
    } else if (h < 240) {
        rgb = [0, x, c];
    } else if (h < 300) {
        rgb = [x, 0, c];
    } else {
        rgb = [c, 0, x];
    }

    function scale(v) { return Math.floor((v + m) * 255); }
    return [scale(rgb[0]), scale(rgb[1]), scale(rgb[2])];
}

function pulse(v1, v2) {
    let testLength = 80;
    let program = []
    for (let index = 0; index < testLength; index++) {
        program.push({
            ms: 90,
            color1: hsvToRgb(index * (360 / testLength), 0.8, v1),
            color2: hsvToRgb(index * (360 / testLength) + 80, 0.8, v2)
        });
    }

    let message = Buffer.alloc(1 + 4 + program.length * 10);
    message[0] = 0x03; // Command    
    message.writeUInt32BE(program.length, 1); // Number of program steps
    for (let index = 0; index < program.length; index++) {
        let pIndex = 5 + index * 10;
        let curProgram = program[index];
        message.writeUInt32BE(curProgram.ms, pIndex)
        message[pIndex + 4] = curProgram.color1[0];
        message[pIndex + 5] = curProgram.color1[1];
        message[pIndex + 6] = curProgram.color1[2];
        message[pIndex + 7] = curProgram.color2[0];
        message[pIndex + 8] = curProgram.color2[1];
        message[pIndex + 9] = curProgram.color2[2];
    }
    sendPackage("esp.lan", port, message);
}

function sendProgram() {
    pulse(0.8, 0.4);
}

exports.oneColor = oneColor;
exports.twoColor = twoColors;
exports.off = () => oneColor([0, 0, 0]);
exports.shuffle = shuffle;
exports.fromTo = fromTo;
exports.sendProgram = sendProgram;
exports.pulse = pulse;
