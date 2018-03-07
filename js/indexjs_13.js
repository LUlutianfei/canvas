// window.addEventListener('load',windowChanged,false);
// function windowChanged(){
// 	var video = document.getElementById('video');
// 	video.addEventListener('progress',updateLoading,false);
// 	video.addEventListener('canplaythrought',playVideo,false);
// 	playVideo();
// 	updateLoading();
// }

// function updateLoading(){
// 	var status = document.getElementById('loadStatus');
// 	var video = document.getElementById('video');
// 	var percent = parseInt(((video.buffered.end(0)/video.duration)*100));
// 	document.getElementById('loadStatus').innerHTML = percent+"%";
// }

// function playVideo(){
// 	var video = document.getElementById('video');
// 	video.play();
// }





// window.addEventListener('load',windowChanged,false);
// var videoElement;
// var videoDiv;
// function windowChanged(){
// 	videoElement = document.createElement('video');
// 	videoDiv = document.createElement('div');
// 	document.body.appendChild(videoDiv);
// 	videoDiv.appendChild(videoElement);
// 	videoDiv.setAttribute("style","position:absolute; top:50px; left:600px;");
// 	var videoType = supportedVideoFormat(videoElement);

// 	if(videoType==""){
// 		alert("no video support")
// 		return;
// 	}
// 	videoElement.setAttribute('src','video/sing.'+videoType);
// 	videoElement.addEventListener("canplaythrough",videoLoaded,false);
// 	videoLoaded();
// }

// function supportedVideoFormat(video){
// 	var returnExtension="";
// 	if(video.canPlayType("video/webm")=="probably"||
// 		video.canPlayType("video/webm")=="maybe"){
// 		returnExtension = "webm";
// 	}else if(video.canPlayType('video/mp4')=="probably"||
// 		video.canPlayType("video/mp4")=="maybe"){
// 		returnExtension = "mp4";
// 	}
// 	return returnExtension;
// }

// function videoLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	function drawScreen(){
// 		context.fillStyle = "#ffffaa";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle= "#000000";
// 		context.strokeRect(5,5,theCanvas.width-10,theCanvas.height-10);

// 		context.drawImage(videoElement,10,10,400,200);

// 		context.fillStyle = "#000000";
// 		context.fillText("Duration:"+videoElement.duration,10,280);
// 		context.fillText("Current time:"+videoElement.currentTime,260,280);
// 		context.fillText("Loop:"+videoElement.loop,10,290);
// 		context.fillText("Autoplay:"+videoElement.autoplay,80,290);
// 		context.fillText("Muted:"+videoElement.muted,160,290);
// 		context.fillText("Controls:"+videoElement.controls,240,290);
// 		context.fillText("Volume:"+videoElement.volume,320,290);

// 		for(var i = 0;i<messages.length;i++){
// 			var tempMessage = messages[i];
// 			if(videoElement.currentTime>tempMessage.time){
// 				context.font = "bold 14px sans";
// 				context.fillStyle = "#ffff00";
// 				context.fillText(tempMessage.message,tempMessage.x,tempMessage.y);
// 			}
// 		}
// 	}

// 	var messages = new Array();
// 	messages[0] = {time:0,message:"",x:0,y:0};
// 	messages[1] = {time:1,message:"This is Muir Beach",x:90,y:200};
// 	messages[2] = {time:4,message:"Look At Those Waves",x:240,y:240};
// 	messages[3] = {time:8,message:"Look At These rocks",x:100,y:100};
// 	var theCanvas = document.getElementById('canvas');
// 	var context = theCanvas.getContext('2d');
// 	videoElement.play();

// 	setInterval(drawScreen,100);
// }




window.addEventListener('load',windowChanged,false);
var videoElement;
var videoDiv;
function windowChanged(){
	videoElement = document.createElement('video');
	videoDiv = document.createElement('div');
	document.body.appendChild(videoDiv);
	videoDiv.appendChild(videoElement);
	videoDiv.setAttribute("style","position:absolute; top:50px; left:600px;");
	var videoType = supportedVideoFormat(videoElement);

	if(videoType==""){
		alert("no video support")
		return;
	}
	videoElement.setAttribute('src','video/sing.'+videoType);
	videoElement.addEventListener("canplaythrough",videoLoaded,false);
	videoLoaded();
}

function supportedVideoFormat(video){
	var returnExtension="";
	if(video.canPlayType("video/webm")=="probably"||
		video.canPlayType("video/webm")=="maybe"){
		returnExtension = "webm";
	}else if(video.canPlayType('video/mp4')=="probably"||
		video.canPlayType("video/mp4")=="maybe"){
		returnExtension = "mp4";
	}
	return returnExtension;
}

function videoLoaded(){
	canvasApp();
}

function canvasApp(){
	var rotation = 0;
	function drawScreen(){
		context.fillStyle = "#ffffaa";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);

		context.strokeStyle= "#000000";
		context.strokeRect(5,5,theCanvas.width-10,theCanvas.height-10);

		context.save();
		context.setTransform(1,0,0,1,0,0);

		var angleInRadians = rotation*Math.PI/180;
		var x = 100;
		var y = 100;
		var videoWidth = 320;
		var videoHeight = 240;
		context.translate(x+.5*videoWidth,y+.5*videoHeight);

		context.rotate(angleInRadians);

		context.drawImage(videoElement,-.5*videoWidth,-.5*videoHeight,300,200);

		context.restore();
		rotation++;
		
	}

	
	var theCanvas = document.getElementById('canvas');
	var context = theCanvas.getContext('2d');
	videoElement.setAttribute("loop","true");
	videoElement.play();

	setInterval(drawScreen,100);
}