
function oneColor(color) {
    twoColors(color, color);
}

function twoColors(color1, color2) {
    const dgram = require('dgram');
    const client = dgram.createSocket('udp4');
    const port = 25000;

    let command = Buffer.from([0x02]);
    let message = Buffer.concat([command,
        Buffer.from(color1), Buffer.from(color2)]);
    const controller_ip = "esp.lan";

    client.send(message, 0, 7, port, controller_ip, (err) => {
        client.close();
    });
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

exports.oneColor = oneColor;
exports.twoColor = twoColors;
exports.off = () => oneColor([0, 0, 0]);
exports.shuffle = shuffle;
exports.fromTo = fromTo;

