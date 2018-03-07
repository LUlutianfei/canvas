window.addEventListener("load", eventWindowLoaded, false);
let videoElement;
let videoDiv;

function eventWindowLoaded() {
    videoElement = document.createElement('video');
    videoDiv = document.createElement('div');
    document.body.appendChild(videoDiv);
    videoDiv.appendChild(videoElement);
    videoDiv.setAttribute('style', 'display:none;');
    const videoSupport = supportVideoFormat(videoElement);
    if (videoSupport == '') {
        alert('no vide support');
        return;
    }
    videoElement.setAttribute('src', 'video/sing.' + videoSupport);
    //videoElement.addEventListener('canplaythrough', videoLoaded, false);
    videoLoaded();
}

function supportVideoFormat(video) {
    var returnExtension = "";
    if (video.canPlayType("video/webm") == "probably" ||
        video.canPlayType("video/webm") == "maybe") {
        returnExtension = "webm";
    } else if (video.canPlayType('video/mp4') == "probably" ||
        video.canPlayType("video/mp4") == "maybe") {
        returnExtension = "mp4";
    }
    return returnExtension;
}

function videoLoaded() {
    canvasApp();
}

function canvasApp() {
    function drawScreen() {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);

        context.strokeStyle = "#ffffff";
        context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10);

        context.fillStyle = "#ffff00";
        let video;
        for (let i = 0; i < videos.length; i++) {
            video = videos[i];
            video.x += video.xunits;
            video.y += video.yunits;

            context.drawImage(videoElement, video.x, video.y, video.width, video.height);

            if (video.x > theCanvas.width - video.width || video.x < 0) {
                video.angle = 180 - video.angle;
                updatevideo(video);
            } else if (video.y > theCanvas.height - video.height || video.y < 0) {
                video.angle = 360 - video.angle;
                updatevideo(video);
            }
        }
    }

    function updatevideo(video) {
        video.radians = video.angle * Math.PI / 180;
        video.xunits = Math.cos(video.radians) * video.speed;
        video.yunits = Math.sin(video.radians) * video.speed;
    }

    const numVideos = 12;
    const maxSpeed = 10;
    let videos = [];
    let tempX;
    let tempY;
    let tempSpeed;
    let tempAngle;
    let tempRadians;
    let tempXunits;
    let tempYunits;
    let tempVideo = {};
    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext('2d');
    videoElement.play();

    for (let i = 0; i < numVideos; i++) {
        tempX = 160;
        tempY = 190;
        tempSpeed = 5;
        tempAngle = Math.floor(Math.random() * 360);
        tempRadians = tempAngle * Math.PI / 180;
        tempXunits = Math.cos(tempRadians) * tempSpeed;
        tempYunits = Math.sin(tempRadians) * tempSpeed;

        tempVideo = {
            x: tempX,
            y: tempY,
            width: 180,
            height: 120,
            speed: tempSpeed,
            angle: tempAngle,
            xunits: tempXunits,
            yunits: tempYunits
        };
        videos.push(tempVideo);
    }

    setInterval(drawScreen, 33);
}