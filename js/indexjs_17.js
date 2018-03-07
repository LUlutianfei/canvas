window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    const theCanvas = document.getElementById('canvas');
    if (!theCanvas || !theCanvas.getContext) {
        return;
    }
    const context = theCanvas.getContext('2d');

    if (!context) {
        return;
    }

    //let shipState = 0;
    let rotation = 0;
    let x = 50;
    let y = 50;
    let facingX = 0;
    let facingY = 0;
    let movingX = 0;
    let movingY = 0;
    const width = 20;
    const height = 20;
    const rotationalVelocity = 5;
    const thrustAcceleration = 0.03;
    let keyPressList = [];
    // let alpha = 0;
    // context.globalAlpha = 1;

    function drawScreen() {
        // shipState++;
        // if (shipState > 1) {
        //     shipState = 0;
        // }
        //context.globalAlpha = 1;
        if (keyPressList[38] == true) {
            const angleInRadians = rotation * Math.PI / 180;
            facingX = Math.cos(angleInRadians);
            facingY = Math.sin(angleInRadians);

            movingX = movingX + thrustAcceleration * facingX;
            movingY = movingY + thrustAcceleration * facingY;
        }

        if (keyPressList[37] == true) {
            rotation -= rotationalVelocity;
        }

        if (keyPressList[39] == true) {
            rotation += rotationalVelocity;
        }

        x = x + movingX;
        y = y + movingY;

        context.fillStyle = "#000000";
        context.fillRect(0, 0, 200, 200);
        context.fillStyle = "#ffffff";
        context.font = '20px _sans';
        context.textBaseline = 'top';
        context.fillText("Player Ship - Thrust", 0, 180);
        //context.globalAlpha = alpha;
        //const angleInRadians = rotation * Math.PI / 180;
        const angleInRadians = rotation * Math.PI / 180;

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.translate(x + .5 * width, y + .5 * height);
        context.rotate(angleInRadians);

        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(-10, -10);
        context.lineTo(10, 0);
        context.moveTo(10, 1);
        context.lineTo(-10, 10);
        context.lineTo(1, 1);
        context.moveTo(1, -1);
        context.lineTo(-10, -10);

        // if (shipState == 1) {
        //     context.moveTo(8, 13);
        //     context.lineTo(11, 13);
        //     context.moveTo(9, 14);
        //     context.lineTo(9, 18);
        //     context.moveTo(10, 14);
        //     context.lineTo(10, 18);
        // }

        context.stroke();
        context.closePath();

        context.restore();

        //rotation++;

        // alpha += .01;
        // if (alpha > 1) {
        //     alpha = 0;
        // }
    }
    const FRAME_RATE = 40;
    const intervalTime = 1000 / FRAME_RATE;
    setInterval(drawScreen, intervalTime);

    document.onkeydown = function (e) {
        //e = e ? e : window.event;
        keyPressList[e.keyCode] = true;
    };

    document.onkeyup = function (e) {
        // e = e ? e : window.event;
        keyPressList[e.keyCode] = false;
    };
}