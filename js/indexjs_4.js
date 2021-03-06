window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
	canvasApp();
}


function canvasApp(){
	var message = "your text";
	var fillOrStroke = "fill";

	var fontSize = "50";
	var fontFace = "serif";
	var textFillColor = "#ff0000"; 
	var textBaseline = "middle";
	var textAlign = "center";
	var fontWight = "normal";
	var fontStyle = "normal";

	var theCanvas = document.getElementById('canvasOne');
	var context = theCanvas.getContext("2d");

	if(!theCanvas || !theCanvas.getContext){
		return;
	}

	var formElement = document.getElementById('textBox');
	formElement.addEventListener("keyup",function (e) {
			var target = e.target;
			message = target.value;
			drawScreen();
		},false
);

	formElement = document.getElementById('fillOrStroke');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			fillOrStroke = target.value;
			drawScreen();
		},false);

	formElement = document.getElementById('textSize');
	formElement.addEventListener("change",
		function (e){
			var target = e.target;
			fontSize = target.value;
			drawScreen();
		},false);

	formElement = document.getElementById('textFillColor');
	formElement.addEventListener('change',function(e){
			var target = e.target;
			textFillColor = "#"+target.value;
			drawScreen();
		
	},false);

	formElement = document.getElementById('textFont');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			fontFace = target.value;
			drawScreen();
		},false);

	formElement = document.getElementById('textBaseline');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			textBaseline = target.value;
			drawScreen();
		},false);

	formElement = document.getElementById('textAlign');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			textAlign = target.value;
			drawScreen();
		}
,false);

	formElement = document.getElementById('fontWeight');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			fontWeight = target.value;
			drawScreen();
		},false);

	formElement = document.getElementById('fontStyle');
	formElement.addEventListener("change",function (e){
			var target = e.target;
			fontStyle = target.value;
			drawScreen();
		},false);

	drawScreen();

	function drawScreen(){
		context.fillStyle = "#ffffaa";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);

		context.strokeStyle = "#000000";
		context.strokeRect(5,5,theCanvas.width-10,theCanvas.height-10);

		context.textBaseline = textBaseline;
		context.textAlign = textAlign;
		context.font = fontWeight +" "+fontStyle+" "+fontSize+"px "+fontFace;

		var xPosition = (theCanvas.width/2);
		var yPosition = (theCanvas.height/2);
		switch(fillOrStroke){
			case "fill":
			context.fillStyle = textFillColor;
			context.fillText(message,xPosition,yPosition);
			break;
			case "stroke":
			context.strokeStyle = textFillColor;
			context.strokeText(message,xPosition,yPosition);
			break;
			case "both":
			context.fillStyle = textFillColor;
			context.fillText(message,xPosition,yPosition);
			context.strokeStyle = "#000000";
			context.strokeText(message,xPosition,yPosition);
			break;
		}
	

		function textBoxChanged(e) {
			var target = e.target;
			message = target.value;
			drawScreen();
		}

		function fillOrStrokeChanged(e){
			var target = e.target;
			fillOrStroke = target.value;
			drawScreen();
		}

		function textSizeChanged(e){
			var target = e.target;
			fontSize = target.value;
			drawScreen();
		}

		function textFillColorChanged(e){
			var target = e.target;
			textFillColor = "#"+target.value;
			drawScreen();
		}

		function textFontChanged(e){
			var target = e.target;
			fontFace = target.value;
			drawScreen();
		}

		function textBaselineChanged(e){
			var target = e.target;
			textBaseline = target.value;
			drawScreen();
		}

		function textAlignChanged(e){
			var target = e.target;
			textAlign = target.value;
			drawScreen();
		}

		function fontWeightChanged(e){
			var target = e.target;
			fontWeight = target.value;
			drawScreen();
		}

		function fontStyleChanged(e){
			var target = e.target;
			fontStyle = target.value;
			drawScreen();
		}
	}
	
}