// var img = new Image();
// img.addEventListener('load',eventImg,false);
// img.src = "img/google.jpg";
// var counter = 0;
// function eventImg(){
// 	setInterval(drawScreen,1000);
// }


// function drawScreen(){
// 	var theCanvas = document.getElementById('canvasOne');
// 	var context = theCanvas.getContext('2d');
// 	if(counter==1){
// 	context.drawImage(img,0,0,32,32,50,50,64,64);
// 	counter=0;
// 	}
// 	else{
// 		context.drawImage(img,0,0,32,32);
// 		counter=1;
// 	}
// }

var photo = new Image();
photo.addEventListener('load', eventPhotoLoaded, false);

photo.src = "img/google.jpg";

var w = 500;
var h = 500;

var windowX = 0;
var windowY = 0;
var currentScale = .5;
var minScale = .2;
var maxScale = 3;
var scaleIncrement = .1;

function eventPhotoLoaded(){
	startUp();
}

function drawScreen(){
	var theCanvas = document.getElementById('canvasOne');
 	var context = theCanvas.getContext('2d');

 	context.fillStyle = "#ffffff";
 	context.fillRect(0,0,500,500);
 	context.drawImage(photo, windowX, windowY,
 		w , h, 0,0,w*currentScale,h*currentScale);

}

function startUp(){
	setInterval(drawScreen,100);

}

document.onkeydown = function(e){
	e = e?e:window.event;
	console.log(e.keyCode+"down");

	switch (e.keyCode){
		case 38:
		windowY -= 10;
		if(windowY<0){
			windowY = 0;
		}
		break;
		case 40:
		windowY+=10;
		if(windowY>photo.height - h){
			windowY = photo.height - h;
		}
		break;
		case 37:
		windowX-=10;
		if(windowX<0){
			windowX=0;
		}
		break;
		case 39:
		windowX+=10;
		if(windowX>photo.width -w){
			windowX = photo.width - w;
		}
		break;
		case 109:
		currentScale-=scaleIncrement;
		if(currentScale<minScale){
			currentScale=minScale;
		}
		break;
		case 107:
		currentScale+=scaleIncrement;
		if(currentScale>maxScale){
			currentScale=maxScale;
		}
	}
}