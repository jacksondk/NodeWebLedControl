
document.getElementById("turnOff").onclick = () => {
    fetch('/turnoff', { method: 'POST' }).then(response => {
        document.getElementById("status").innerText = response.statusText;
    });
};


document.getElementById("low").onclick = () => {
    fetch('/color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ color1: [3, 0, 0], color2: [2, 0, 0] })
    }).then(response => {
        document.getElementById("status").innerText = response.statusText;
    });
};

document.getElementById("pulse").onclick = () => {
    let v1 = parseInt(document.getElementById("v1").value);
    let v2 = parseInt(document.getElementById("v2").value);
    fetch('/pulse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ v1: v1 / 100.0, v2: v2 / 100.0 })
    }).then(response => {
        document.getElementById("status").innerText = response.statusText;
    });
};

function colorArray(jscolor) {
    return [jscolor.channel('r'), jscolor.channel('g'), jscolor.channel('b')];
}

function twoColorUpdate() {
    let color1 = colorArray(document.getElementById("color1").jscolor);
    let color2 = colorArray(document.getElementById("color2").jscolor);
    fetch('/color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ color1: color1, color2: color2 })
    }).then(response => {
        document.getElementById("status").innerText = response.statusText;
    });
}
jscolor.install()
document.getElementById("color1").jscolor.onChange = twoColorUpdate;
document.getElementById("color2").jscolor.onChange = twoColorUpdate;
