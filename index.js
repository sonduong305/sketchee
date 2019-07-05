var mousePressed = false;
var lastX, lastY;
var context, contextResult;
var img = new Image();
var text = document.getElementById('test');
const CANVAS_SIZE = 800;
const LINE_SIZE = 25; 
const EXPECTED_SIZE = 28;

function InitThis() {
    context = document.getElementById('canvas').getContext("2d");
    contextResult = document.getElementById('canvasResult').getContext("2d");

    $('#canvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#canvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#canvas').mouseup(function (e) {
        mousePressed = false;
    });
    $('#canvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        context.beginPath();
        context.lineWidth = LINE_SIZE;
        context.lineJoin = "round";
        context.strokeStyle = "#555";
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
    }
    lastX = x;
    lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    text.innerHTML = '';
}

function save() {

    var dataURL = canvas.toDataURL("image/jpeg");
    img.src = dataURL;

    img.onload = async function () {
        await contextResult.drawImage(img, 0, 0, EXPECTED_SIZE, EXPECTED_SIZE);
        await contextResult.drawImage(canvasResult, 0, 0, EXPECTED_SIZE, EXPECTED_SIZE);
        await contextResult.drawImage(canvasResult, 0, 0, EXPECTED_SIZE, EXPECTED_SIZE, 0, 0, EXPECTED_SIZE, EXPECTED_SIZE);
        var dataURLResult = await canvasResult.toDataURL("image/jpeg");
        document.getElementById("canvas-image").src = dataURLResult;
        
        var url = 'https://sketchee-app-2.herokuapp.com/predict';

        var data = {
            img: dataURLResult
        }

        fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            text.innerHTML = data.results[0];
        })
    }
}
