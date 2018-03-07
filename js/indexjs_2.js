window.onload = function(){
	var canvas1 = document.getElementById('canvas1');
	var context = canvas1.getContext("2d");
	/*context.fillStyle = "#000000";
	context.strokeStyle = "#ff00ff";
	context.lineWidth = 2;
	context.fillRect(10,10,40,40);
	context.strokeRect(10,10,60,60);
	context.clearRect(18,18,22,22);*/
	/*
	//圆形端点，斜角链接，在画布左上角
	context.strokeStyle = "black";
	context.lineWidth = 10;
	context.lineJoin = "bevel";
	context.lineCap = "round";
	context.beginPath();
	context.moveTo(5,5);
	context.lineTo(25,5);
	context.lineTo(25,25);
	context.stroke();
	context.closePath();

	//圆形端点，斜角链接，不在画布左上角
	context.beginPath();
	context.moveTo(10,50);
	context.lineTo(35,50);
	context.lineTo(35,75);
	context.stroke();
	context.closePath();

	//平直端点，圆形链接，不在画布左上角
	context.lineJoin = "round";
	context.lineCap = "butt";
	context.beginPath();
	context.moveTo(10,100);
	context.lineTo(35,100);
	context.lineTo(35,125);
	context.stroke();
	context.closePath();
	*/

	/*
	//圆
	context.beginPath();
	context.strokeStyle = "black";
	context.lineWidth = 5;
	context.arc(100,100,20,(Math.PI/180)*0,(Math.PI/180)*90,false);
	//true为逆时针

	context.moveTo(0,0);
	context.lineTo(100,200);
	context.arcTo(350,350,0,100,10);

	context.moveTo(0,0);
	context.quadraticCurveTo(100,25,0,50);

	context.moveTo(150,0);
	context.bezierCurveTo(0,125,300,175,150,300);

	context.stroke();
	context.closePath();
	*/

	/*
	context.fillStyle = "black";
	context.fillRect(10,10,200,200);
	context.save();
	context.beginPath();

	context.rect(0,0,50,50);
	conetxt.clip();

	context.beginPath();
	context.strokeStyle = "red";
	context.lineWidth = 5;
	context.arc(100,100,100,(Math.PI/180)*0,(Math.PI/180)*360,false);

	context.stroke();
	context.closePath();

	context.restore();
 
	context.beginPath();
	context.rect(0,0,500,500);
	context.clip();

	context.beginPath();
	context.strokeStyle = "blue";
	context.lineWidth = 5;
	context.arc(100,100,50,(Math.PI/180)*0,(Math.PI/180)*360,false);

	context.stroke();
	context.closePath();
	*/

	/*
	context.fillStyle = "black";
	context.fillRect(10,10,200,200);

	context.fillStyle = "red";
	context.fillRect(1,1,50,50);

	context.globalCompositeOperation = "source-over";
	context.fillRect(60,1,50,50);

	context.globalCompositeOperation = "destination-over";
	context.fillRect(1,60,50,50);

	context.globalAlpha = .5;

	context.globalCompositeOperation = "source-atop";
	context.fillRect(60,60,50,50);
	*/

	
	/*
	context.fillStyle = "black";
	context.fillRect(20,20,25,25);

	context.setTransform(1,0,0,1,0,0);
	var angleInRadians = 45*Math.PI/180;
	context.rotate(angleInRadians);
	context.fillStyle = "red";
	context.fillRect(100,100,50,50);

	context.setTransform(1,0,0,1,0,0);
	var x = 100;
	var y = 100;
	var width = 50;
	var height = 50;
	context.translate(x+.5*width,y+.5*height);
	context.rotate(45*Math.PI/180);
	context.fillStyle = "red";
	context.fillRect(-.5*width,-.5*height,width,height);
	*/

	/*
	context.setTransform(1,0,0,1,0,0);
	var x = 100;
	var y = 100;
	var width = 50; 
	var height = 100;
	context.translate(x+.5*width,y+.5*height);
	context.scale(2,2);
	context.rotate(45*Math.PI/180);
	context.fillStyle = "red";
	context.fillRect(-.5*width,-.5*height,width,height);
	*/

	/*
	var gr = context.createLinearGradient(0,0,100,0);

	gr.addColorStop(0,"red");
	gr.addColorStop(.5,"green");
	gr.addColorStop(1,"blue");

	context.fillStyle = gr;
	context.fillRect(0,0,200,200);
	context.fillRect(0,200,100,100);
	context.lineWidth =20;
	context.strokeStyle = gr;
	context.strokeRect(20,300,100,100);
	*/

	/*
	var gr = context.createLinearGradient(0,0,100,10 0);
	gr.addColorStop(0,"red");
	gr.addColorStop(.5,"green");
	gr.addColorStop(1,"blue");

	context.fillStyle = gr;
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(50,0);
	context.lineTo(100,50);
	context.lineTo(50,100);
	context.lineTo(0,100);
	context.lineTo(0,0);
	context.stroke();
	context.fill();
	context.closePath();
	*/

	/*
	//var gr = context.createRadialGradient(50,50,25,50,50,100);
	var gr = context.createRadialGradient(50,50,25,100,100,100);
	gr.addColorStop(0,"red");
	gr.addColorStop(.5,"green");
	gr.addColorStop(1,"blue");
	context.lineWidth = 10;
	context.fillStyle = gr;
	//context.fillRect(0,0,100,100);
	context.strokeStyle = gr;
	context.arc(100,100,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
	context.stroke();
	//context.fill();
	*/

	/*
	var fillImg = new Image();
	fillImg.src = "img/round.png";
	fillImg.onload = function(){
		var fillPattern1 = context.createPattern(fillImg,"no-repeat");
		var fillPattern2 = context.createPattern(fillImg,"repeat-x");
		var fillPattern3 = context.createPattern(fillImg,"repeat-y");
		context.fillStyle = fillPattern1;
		context.fillRect(0,0,100,100);

		context.fillStyle = fillPattern2;
		context.fillRect(0,110,100,100);

		context.fillStyle = fillPattern3;
		context.fillRect(0,220,100,100);
	}
	*/

	context.fillStyle = "red";

	context.shadowOffsetX = 4;
	context.shadowOffsetY = 4;
	context.shadowColor = "black";
	context.shadowBlur = 4;
	context.fillRect(10,10,100,100);

	context.shadowOffsetX = -4;
	context.shadowOffsetY = -4;
	context.shadowColor = "black";
	context.shadowBlur = 4;
	context.fillRect(150,10,100,100);

	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowColor = "rgb(100,100,100)";
	context.shadowBlur = 8;
	context.arc(200,300,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
	context.fill();
}
