window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded(){
	canvasApp();
}

function canvasApp(){
	var theCanvas = document.getElementById('canvas');
	var context = theCanvas.getContext("2d");
	var theCanvas2 = document.getElementById('canvas2');
	var context2 = theCanvas2.getContext("2d");

	var titleSheet = new Image();
	titleSheet.addEventListener('load',eventSheetLoaded,false);
	titleSheet.src = "img/google.jpg";

	function eventSheetLoaded(){
		context.drawImage(titleSheet,0,0);
		context2.drawImage(theCanvas,32,0,32,32,0,0,32,32);
	}
}