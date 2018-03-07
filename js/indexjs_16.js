window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    const audioElement = document.getElementById("theAudio");
    audioElement.addEventListener('progress', updateLoadingStatus, false);
    audioElement.addEventListener('canplaythrough', audioLoaded, false);
    audioElement.load();
}

function updateLoadingStatus() {
    const loadingStatus = document.getElementById('loadingStatus');
    const audioElement = document.getElementById('theAudio');
    const percentLoaded = parseInt(((audioElement.buffered.end(0) / audioElement.duration) * 100));
    document.getElementById('loadingStatus').innerHTML = 'Loaded' + percentLoaded + "%";
}

function audioLoaded() {
    canvasApp();
}

function canvasApp() {
    function drawScreen() {
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, theCanvas - 10, theCanvas - 10);

        context.fillStyle = "#000000";
        context.fillText("duration:" + audioElement.duration, 20, 20);
        context.fillText("Current time:" + audioElement.currentTime, 20, 40);
        context.fillText("Loop:" + audioElement.loop, 20, 60);
        context.fillText("autoplay:" + audioElement.autoplay, 20, 80);
        context.fillText("Muted:" + audioElement.muted, 20, 100);
        context.fillText("Controls" + audioElement.controls, 20, 120);
        context.fillText("Volume:" + audioElement.volume, 20, 140);
        context.fillText("Paused:" + audioElement.paused, 20, 160);
        context.fillText("Ended:" + audioElement.ended, 20, 180);
        context.fillText("Source:" + audioElement.currentSrc, 20, 200);
        context.fillText("Can paly ogg:" + audioElement.canPlayType("audio/ogg"), 20, 220);
        context.fillText("Can paly wav:" + audioElement.canPlayType("audio/wav"), 20, 240);
        context.fillText("Can paly mp3:" + audioElement.canPlayType("audio/mp3"), 20, 260);
    }

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext('2d');
    const audioElement = document.getElementById('theAudio');
    audioElement.play();

    setInterval(drawScreen, 33);
}