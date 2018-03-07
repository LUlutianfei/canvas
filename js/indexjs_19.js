 window.addEventListener('load', eventWindowLoaded, false);

 function eventWindowLoaded() {
     canvasApp();
 }

 function canvasApp() {
     const theCanvas = document.getElementById("canvas");
     const context = theCanvas.getContext('2d');

     const theCanvas2 = document.getElementById("canvas2");
     const context2 = theCanvas2.getContext('2d');

     const rotationImageArray = [];
     const titleSheet = new Image();
     let animationFrame = 0;
     titleSheet.addEventListener('load', eventSheetLoaded, false);
     titleSheet.src = "img/square.png";

     function eventSheetLoaded() {
         startUp();
     }

     function startUp() {
         for (let ctr = 0; ctr < 360; ctr += 10) {
             context2.fillStyle = "#ffffff";
             context2.fillRect(0, 0, 32, 32);

             context2.save();
             context2.setTransform(1, 0, 0, 1, 0, 0);
             const angleInRadians = ctr * Math.PI / 180;
             context2.translate(16, 16);
             context2.rotate(angleInRadians);
             context2.drawImage(titleSheet, 0, 0, titleSheet.width, titleSheet.height, -16, -16, 32, 32);
             context2.restore();

             const imagedata = context2.getImageData(0, 0, titleSheet.width, titleSheet.height);

             rotationImageArray.push(imagedata);
         }
         setInterval(drawScreen, 100);
     }

     function drawScreen() {
         context.putImageData(rotationImageArray[animationFrame], 50, 50);
         animationFrame++;
         if (animationFrame == rotationImageArray.length) {
             animationFrame = 0;
         }
     }
 }