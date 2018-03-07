window.addEventListener("load", eventWindowLoaded, false);
var Debugger = function (){};
Debugger.log = function (message) {
	try{
		console.log(message);
	}catch (exception){
		return;
	}
}

function eventWindowLoaded(){
	canvasApp();
}



function canvasApp(){
	var canvas = document.getElementById('canvas1');
	var context = canvas.getContext("2d");
	if(!canvas || !canvas.getContext){
		return;
	}

	Debugger.log("Drawing Canvas");

	function drawScreen(){
		context.fillStyle = "#ffffaa";
		context.fillRect(0,0,500,300);

		context.fillStyle = "#000000";
		context.font = "20px _sans";
		context.textBaseline = "top";
		context.fillText ("Hello World!",195,80);

		var helloWorldImage = new Image();
		helloWorldImage.src = "img/google.jpg";
		helloWorldImage.width = "100px";
		helloWorldImage.height = "100px";
		helloWorldImage.onload = function () {
			context.drawImage(helloWorldImage,160,130);
		}

		context.strokeStyke = "#000000";
		context.strokeRect(5,5,490,290);
	}
	drawScreen();
}