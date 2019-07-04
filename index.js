var mousePressed = false;
var lastX, lastY;
var context, contextResult;
var img = new Image();
var text = document.getElementById('test');

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
        context.lineWidth = "25";
        context.lineJoin = "round";
        context.strokeStyle = "#eee";
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
    context.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


function save(e) {
    
    var dataURL = canvas.toDataURL("image/jpeg");
    img.src = dataURL;

    img.onload = async function () {
        await contextResult.drawImage(img, 0, 0, 28, 28);
        await contextResult.drawImage(canvasResult, 0, 0, 28, 28);
        await contextResult.drawImage(canvasResult, 0, 0, 28, 28, 0, 0, 28, 28);
        var dataURLResult = await canvasResult.toDataURL("image/jpeg");
        document.getElementById("canvas-image").src = dataURLResult;

        console.log(dataURLResult);
        
        var url = 'http://localhost:5000/predict';

        var data = {
            img: dataURLResult
        }

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: "no-cors",
            
            headers: {
                // "Content-Type": "application/json"
                Connection: 'keep-alive',
                'accept-encoding': 'gzip, deflate',
                Host: 'localhost:5000',
                Accept: '*/*',
                'cache-control': 'no-cache',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
            json: true // body data type must match "Content-Type" header
        })
        // .then(results => {
        //     text.innerText = results.body;
        //     console.log(results)
        // })
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            text.innerHTML = data.results[0]; // this will be a string
        });

    }
}