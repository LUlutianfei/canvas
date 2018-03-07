// //有错误，待检查

// window.addEventListener('load', eventWindowLaoded, false);
// var videoElement;
// var videoDiv;

// function eventWindowLaoded() {
//     videoElement = document.createElement('video');
//     videoDiv = document.createElement('div');
//     document.body.appendChild(videoDiv);
//     videoDiv.appendChild(videoElement);
//     videoDiv.setAttribute("style", "display:none;");
//     var videoType = supportedVideoFormat(videoElement);
//     if (videoType == "") {
//         alert("no video support");
//         return;
//     }
//     videoElement.setAttribute('src', 'video/sing.' + videoType);
//     //videoElement.addEventListener("canplaythrough", videoLoaded, false);
//     videoLoaded();
// }

// function supportedVideoFormat(video) {
//     var returnExtension = "";
//     if (video.canPlayType("video/webm") == "probably" ||
//         video.canPlayType("video/webm") == "maybe") {
//         returnExtension = "webm";
//     } else if (video.canPlayType('video/mp4') == "probably" ||
//         video.canPlayType("video/mp4") == "maybe") {
//         returnExtension = "mp4";
//     }
//     return returnExtension;
// }

// function videoLoaded() {
//     canvasApp();
// }

// function canvasApp() {
//     function drawScreen() {
//         context.fillStyle = "#303030";
//         context.fillRect(0, 0, theCanvas.width, theCanvas.height);

//         context.strokeStyle = "#ffffff";
//         context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10);

//         for (var c = 0; c < cols; c++)
//             for (var r = 0; r < rows; r++) {
//                 var tempPiece = board[c][r];
//                 var imageX = tempPiece.finalCol * partWidth;
//                 var imageY = tempPiece.finalRow * partHeight;
//                 var placeX = c * partWidth + c * xPad + startXOffset;
//                 var placeY = r * partHeight + r * yPad + startYOffset;
//                 context.drawImage(videoElement, imageX, imageY, partWidth, partHeight);
//                 if (tempPiece.selected) {
//                     context.strokeStyle = "#ffff00";
//                     context.strokeRect(placeX, placeY, partWidth, partHeight);
//                 }
//             }

//     }

//     function randomizeBoard(board) {
//         var newBoard = [];
//         var cols = board.length;
//         var rows = board[0].length;
//         for (var i = 0; i < cols; i++) {
//             newBoard[i] = [];
//             for (var j = 0; j < rows; j++) {
//                 var found = false;
//                 var rndCol = 0;
//                 var rndRow = 0;
//                 while (!found) {
//                     var rndCol1 = Math.floor(Math.random() * cols);
//                     var rndRow1 = Math.floor(Math.random() * rows);
//                     if (board[rndCol1][rndRow1].selected != false) {
//                         found = true;
//                     }
//                 }
//                 newBoard[i][j] = board[rndCol][rndRow];
//                 board[rndCol][rndRow] = false;
//             }
//         }
//         return newBoard;
//     }

//     function eventMouseUp(event) {
//         var mouseX;
//         var mouseY;
//         var pieceX;
//         var pieceY;
//         if (event.layerX || event.layerX == 0) {
//             mouseX = event.layerX;
//             mouseY = event.layerY;
//         } else if (event.offsetX || event.offsetX == 0) {
//             mouseX = event.offsetX;
//             mouseY = event.offsetY;
//         }
//         var selectedList = [];
//         for (var c = 0; c < cols; c++) {
//             for (var r = 0; r < rows; r++) {
//                 pieceX = c * partWidth + c * xPad + startXOffset;
//                 pieceY = r * partHeight + r * yPad + startYOffset;
//                 if ((mouseY >= pieceY) && (mouseY <= pieceY + partHeight) &&
//                     (mouseX >= pieceX) && (mouseX <= pieceX + partWidth)) {
//                     if (board[c][r].selected) {
//                         board[c][r].selected = false;
//                     } else {
//                         board[c][r].selected = true;
//                     }
//                 }
//                 if (board[c][r].selected) {
//                     selectedList.push({
//                         col: c,
//                         row: r
//                     });
//                 }
//             }
//         }
//         if (selectedList.length == 2) {
//             var selected1 = selectedList[0];
//             var selected2 = selectedList[1];
//             var tempPiece1 = board[selected1.col][selected1.row];
//             board[selected1.col][selected1.row] = board[selected2.col][selected2.row];
//             board[selected2.col][selected2.row] = tempPiece1;
//             board[selected1.col][selected1.row].selected = false;
//             board[selected2.col][selected2.row].selected = false;
//         }
//     }

//     var theCanvas = document.getElementById('canvasOne');
//     var context = theCanvas.getContext('2d');

//     var rows = 4;
//     var cols = 4;
//     var xPad = 10;
//     var yPad = 10;
//     var startXOffset = 10;
//     var startYOffset = 10;
//     var partWidth = videoElement.width / cols;
//     var partHeight = videoElement.height / rows;

//     partWidth = 80;
//     partHeight = 60;
//     var board = [];
//     for (var i = 0; i < cols; i++) {
//         board[i] = [];
//         for (var j = 0; j < rows; j++) {
//             board[i][j] = {
//                 finalCol: i,
//                 finalRow: j,
//                 selected: false
//             };
//         }
//     }
//     console.log(board);
//     board = randomizeBoard(board);

//     theCanvas.addEventListener("mouseup", eventMouseUp, false);

//     setInterval(drawScreen, 33);
// }