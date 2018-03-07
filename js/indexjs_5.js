window.addEventListener('load',eventWindowLoaded,false);
		function eventWindowLoaded(){
			canvasApp();
			var pattern = new Image();
			pattern.src = "img/google.jpg";
			pattern.onload = eventAssetsLoaded;
		}

		function eventAssetsLoaded(){
			canvasApp();
		}

		function canvasApp(){
			var message = "your text";
			var fontSize = "50";
			var fontFace = "serif";
			var textFillColor = "#ffff00";
			var textAlpha = 1;
			var shadowX =1;
			var shadowY =1;
			var shadowBlur = 1;
			var shadowColor = "#707070";
			var textBaseline = "middle";
			var textAlign = "center";
			var fillOrStroke = "fill";
			var fontWeight = "normal";
			var fontStyle = "normal";
			var fillType = "colorFill"
			var textFillColor2 = "#000000";
			var pattern = new Image();
		

		var theCanvas = document.getElementById('canvasOne');
		var context = theCanvas.getContext("2d");



		var x = document.getElementById('textBox'); 
		x.addEventListener("change", textBoxChanged, false);

		x = document.getElementById('fillOrStroke');
		x.addEventListener("change", fillOrStrokeChanged, false);

		x = document.getElementById('textSize');
		x.addEventListener("change", textSizeChanged, false);

		x = document.getElementById('textFillColor');
		x.addEventListener("change", textFillColorChanged, false);

		/*x = document.getElementById('textFont');
		x.addEventListener("change", textFontColorChanged, false);*/

		x = document.getElementById('textBaseline');
		x.addEventListener("change", textBaselineChanged, false);

		x = document.getElementById('textAlign');
		x.addEventListener("change", textAlignChanged, false);

		x = document.getElementById('fontWeight');
		x.addEventListener("change", fontWeightChanged, false);

		x = document.getElementById('fontStyle');
		x.addEventListener("change", fontStyleChanged, false);

		x = document.getElementById('shadowX');
		x.addEventListener("change", shadowXChanged, false);

		x = document.getElementById('shadowY');
		x.addEventListener("change", shadowYChanged, false);

		x = document.getElementById('shadowBlur');
		x.addEventListener("change", shadowBlurChanged, false);

		x = document.getElementById('shadowColor');
		x.addEventListener("change", shadowColorChanged, false);

		x = document.getElementById('textAlpha');
		x.addEventListener("change", textAlignChanged, false);

		x = document.getElementById('textFillColor2');
		x.addEventListener("change", textFillColor2Changed, false);

		x = document.getElementById('fillType');
		x.addEventListener("change", fillTypeChanged, false);

		x = document.getElementById('canvasWidth');
		x.addEventListener("change",canvasWidthChanged,false);

		x = document.getElementById('canvasHeight');
		x.addEventListener("change", canvasHeightChanged, false);

		x = document.getElementById('canvasStyleWidth');
		x.addEventListener("change", canvasWidthChanged, false);

		x = document.getElementById('canvasStyleHeight');
		x.addEventListener("change", canvasHeightChanged, false);

		x = document.getElementById('createImageDate');
		x.addEventListener("click", createImageDataPressed, false);

		pattern.src = "img/google.jpg";

		drawScreen();

		function drawScreen(){

			//背景
			context.globalAlpha =1;
			context.shadowColor = "#707070";
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 0;
			context.fillStyle = "#ffffaa";
			context.fillRect(0,0,theCanvas.width,theCanvas.height);
			//边框
			context.strokeStyle = "#000000";
			context.strokeRect(5,5,theCanvas.width-10,theCanvas.height-10);

			//文本
			context.textBaseline = textBaseline;
			context.textAlign = textAlign;
			context.font = fontWeight +" "+fontStyle+" "+fontSize+"px "+fontFace;
			context.shadowColor = shadowColor;
			context.shadowOffsetX = shadowX;
			context.shadowOffsetY = shadowY;
			context.shadowBlur = shadowBlur;
			context.globalAlpha = textAlpha;

			var xPosition = theCanvas.width/2;
			var yPosition = theCanvas.height/2;

			var metrics = context.measureText(message);
			var textWidth = metrics.width;

			var tempColor;
			if(fillType == "colorFill"){
				tempColor = textFillColor;
			}else if(fillType == "linearGradient"){
				var gradient = context.createLinearGradient(xPosition+textWidth/2,yPosition,textWidth,yPosition);
				gradient.addColorStop(0,textFillColor);
				gradient.addColorStop(.6,textFillColor2);
				tempColor = gradient;
			}else if(fillType == "radialGradient"){
				var gradient = context.createRadialGradient(xPosition,yPosition,fontSize,xPosition+textWidth,yPosition,1);
				gradient.addColorStop(0,textFillColor);
				gradient.addColorStop(.6,textFillColor2);
				tempColor = gradient;
			}else if(fillType == "pattern"){
			var tempColor = context.createPattern(pattern,"repeat")
			}else{
				tempColor = textFillColor;
			}

		switch(fillOrStroke){
			case "fill":
			context.fillStyle = tempColor;
			context.fillText(message,xPosition,yPosition);
			break;
			case "stroke":
			context.strokeStyle = tempColor;
			context.strokeText(message,xPosition,yPosition);
			break;
			case "both":
			context.fillStyle = tempColor;
			context.fillText(message,xPosition,yPosition);
			context.strokeStyle = "#000000";
			context.strokeText(message,xPosition,yPosition);
			break;
		}
	}
		function textBoxChanged(e){
			var target = e.target;
			message = target.value;
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
			textFillColor = '#'+e.target.value;
			drawScreen();
		}
		function textFontChanged(e){
			fontFace = e.target.value;
			drawScreen();
		}
		function fontWeightChanged(e){
			fontWeight = e.target.value;
			drawScreen();
		}

		function fontStyleChanged(e){
			fontStyle = e.target.value;
			drawScreen();
		}
		function shadowXChanged(e){
			shadowX = e.target.value;
			drawScreen();
		}
		function shadowYChanged(e){
			shadowY = e.target.value;
			drawScreen();
		}
		function shadowBlurChanged(e){
			shadowBlur = e.target.value;
			drawScreen();
		}
		function shadowColorChanged(e){
			shadowColor = e.target.value;
			drawScreen();
		}
		function textAlphaChanged(e){
			textAlpha = e.target.value;
			drawScreen();
		}
		function textFillColor2Changed(e){
			textFillColor2 = e.target.value;
			drawScreen();
		}
		function fillTypeChanged(e){
			fillType = e.target.value;
			drawScreen();
		}
		function canvasWidthChanged(e){
			theCanvas.width = e.target.value;
			drawScreen();
		}
		function canvasHeightChanged(e){
			theCanvas.height = e.target.value;
			drawScreen();
		}

		function canvasStyleSizeChanged(e){
			var styleWidth = document.getElementById('canvasStyleWidth');
			var styleHeight = document.getElementById('canvasStyleHeight');
			var styleValue = "width:"+styleWidth.value+"px; height:"+styleHeight.value+"px";
			theCanvas.setAttribute("style",styleValue);
			drawScreen();
		}

		function createImageDataPressed(e){
			var imageDataDisplay = document.getElementById('imageDataDisplay');
			imageDataDisplay.value = theCanvas.toDataURL();
			window.open(imageDataDisplay.value,"canvasImage","left=0,top=0,width="+theCanvas.width+",height="+theCanvas.height+",toolbar=0,resizable=0");
		}
	}