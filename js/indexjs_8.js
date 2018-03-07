// window.addEventListener("load", eventWindowLoaded, false);
// function eventWindowLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	function drawScreen(){
// 		context.fillStyle = "#EEEEEE";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle = "#000000";
// 		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

// 		y+=speed;

// 		context.fillStyle= "#000000";
// 		context.beginPath();
// 		context.arc(x,y,15,0,Math.PI*2,true);
// 		context.closePath();
// 		context.fill();
// 	}

// 	theCanvas = document.getElementById('canvasOne');
// 	context = theCanvas.getContext("2d");

// 	var speed = 5;
// 	var x=250;
// 	var y = 10;

// 	setInterval(drawScreen,33);
// }



// window.addEventListener("load", eventWindowLoaded, false);
// function eventWindowLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	var pointImage = new Image();
// 	pointImage.src = "img/round.png"
// 	function drawScreen(){
// 		context.fillStyle = "#EEEEEE";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle = "#000000";
// 		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

// 		// if(moves>0){
// 		// 	moves--;
// 		 	ball.x+=xunits;
// 		 	ball.y+=yunits;
// 		// }

// 		points.push({x:ball.x,y:ball.y});
// 		for(var i = 0;i<points.length;i++){
// 			context.drawImage(pointImage,points[i].x,points[i].y,1,1);
// 		}

// 		context.fillStyle= "#000000";
// 		context.beginPath();
// 		context.arc(ball.x,ball.y,15,0,Math.PI*2,true);
// 		context.closePath();
// 		context.fill();
// 	}

// 	theCanvas = document.getElementById('canvasOne');
// 	context = theCanvas.getContext("2d");

// 	var speed = 5;
// 	var p1 = {x:20,y:20};
// 	//var p2 = {x:480,y:480};
// 	var angle = 30;
// 	var radians = angle*Math.PI/180;
// 	var xunits = Math.cos(radians)*speed;
// 	var yunits = Math.sin(radians)*speed;
// 	// var dx = p2.x-p1.x;
// 	// var dy = p2.y-p1.y;
// 	// var distance = Math.sqrt(dx*dx+dy*dy);
// 	// var moves = distance/speed;
// 	// var xunits = (p2.x-p1.x)/moves;
// 	// var yunits = (p2.y-p1.y)/moves;
// 	var ball = {x:p1.x,y:p1.y};
// 	var points = new Array();


// 	setInterval(drawScreen,33);
// }



// window.addEventListener("load", eventWindowLoaded, false);
// function eventWindowLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	function drawScreen(){
// 		context.fillStyle = "#EEEEEE";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle = "#000000";
// 		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);
// 		ball.x += xunits;
// 		ball.y+=yunits;

// 		context.fillStyle= "#000000";
// 		context.beginPath();
// 		context.arc(ball.x,ball.y,15,0,Math.PI*2,true);
// 		context.closePath();
// 		context.fill();


// 		if(ball.x>theCanvas.width||ball.x<0){
// 			angle = 180-angle;
// 			updateBall();
// 		}else if(ball.y>theCanvas.height||ball.y<0){
// 			angle = 360-angle;
// 			updateBall();
// 		}

		
// 	}
// 	function updateBall(){
// 		radians = angle*Math.PI/180;
// 		xunits = Math.cos(radians)*speed;
// 		yunits = Math.sin(radians)*speed;
// 	}
// 	theCanvas = document.getElementById('canvasOne');
// 	context = theCanvas.getContext("2d");

// 	var speed = 5;
// 	var p1 = {x:20,y:20};
// 	var angle = 35;
// 	var radians = 0;
// 	var xunits = 0;
// 	var yunits = 0;
// 	// var dx = p2.x-p1.x;
// 	// var dy = p2.y-p1.y;
// 	// var distance = Math.sqrt(dx*dx+dy*dy);
// 	// var moves = distance/speed;
// 	// var xunits = (p2.x-p1.x)/moves;
// 	// var yunits = (p2.y-p1.y)/moves;
// 	var ball = {x:p1.x,y:p1.y};
// 	updateBall();


// 	setInterval(drawScreen,10);
// }




window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded(){
	canvasApp();
}

function canvasApp(){
	var change;
	change = document.getElementById('canvasWidth');
	change.addEventListener('change',canvasWidthChanged,false);
	change = document.getElementById('canvasHeight');
	change.addEventListener('change',canvasHeightChanged,false);

	function drawScreen(){
		context.fillStyle = "#EEEEEE";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);

		context.strokeStyle = "#000000";
		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

		context.fillStyle = "#000000";
		var ball;

		for(var i=0;i<balls.length;i++){
			ball = balls[i];
			ball.x += ball.xunits;
			ball.y+=ball.yunits;

			context.beginPath();
			context.arc(ball.x,ball.y,15,0,Math.PI*2,true);
			context.closePath();
			context.fill();

			if(ball.x>theCanvas.width||ball.x<0){
				ball.angle = 180-ball.angle;
				updateBall(ball);
			}else if(ball.y>theCanvas.height||ball.y<0){
				ball.angle = 360-ball.angle;
				updateBall(ball);
			}
		}	
	}
	function updateBall(ball){
		ball.radians = ball.angle*Math.PI/180;
		ball.xunits = Math.cos(ball.radians)*ball.speed;
		ball.yunits = Math.sin(ball.radians)*ball.speed;
	}

	theCanvas = document.getElementById('canvasOne');
	context = theCanvas.getContext("2d");

	var numBalls = 500;
	var maxSize = 8;
	var minSize = 5;
	var maxSpeed = maxSize+5;
	var balls = new Array();
	var tempBall;
	var tempX;
	var tempY;
	var tempSpeed;
	var tempAngle;
	var tempRadius;
	var tempRadians;
	var tempXunits;
	var tempYunits;

	
	for(var i =0;i<numBalls;i++){
		tempRadius = Math.floor(Math.random()*maxSize)+minSize;
		tempX = tempRadius*2+(Math.floor(Math.random()*theCanvas.width)-tempRadius*2);
		tempY = tempRadius*2+(Math.floor(Math.random()*theCanvas.height)-tempRadius*2);
		tempSpeed = maxSpeed-tempRadius;
		tempAngle = Math.floor(Math.random()*360);
		tempRadians = tempAngle*Math.PI/180;
		tempXunits = Math.cos(tempRadius)*tempSpeed;
		tempYunits = Math.sin(tempRadius)*tempSpeed;

		tempBall = {x:tempX,y:tempY,radius:tempRadius,speed:tempSpeed,angle:tempAngle,
			xunits:tempXunits,yunits:tempYunits}
		balls.push(tempBall);
	}
	setInterval(drawScreen,33);

	function canvasWidthChanged(e){
		var target = e.target;
		theCanvas.width = target.value;
		drawScreen();
	}
	function canvasHeightChanged(e){
		var target = e.target;
		theCanvas.height = target.value;
		drawScreen();
	}
}