// window.addEventListener('load',eventWindowLoaded,false);
// function eventWindowLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	var img = new Image();
// 	img.src = "img/round.png";
// 	function drawScreen(){
// 		context.fillStyle = "#eeeeee";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle = "#000000";
// 		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

// 		ball.x = circle.centerX+Math.cos(circle.angle)*circle.radius;
// 		ball.y = circle.centerY+Math.sin(circle.angle)*circle.radius;

// 		circle.angle += ball.speed;
// 		//circle.radius +=radiusInc;

// 		points.push({x:ball.x,y:ball.y});
// 		for(var i = 0 ; i<points.length;i++){
// 			context.drawImage(img,points[i].x,points[i].y,1,1);
// 		}

// 		context.fillStyle = "#000000";
// 		context.beginPath();
// 		context.arc(ball.x,ball.y,15,0,Math.PI*2,true);
// 		context.closePath();
// 		context.fill();
// 	}
// 	var radius = 100;
// 	var radiusInc = 2;
// 	var circle = {centerX:250,centerY:250,radius:2,angle:0,radiusInc:2};
// 	var ball = {x:0,y:0,speed:.1};
// 	var points = new Array();
// 	theCanvas = document.getElementById('canvas');
// 	var context = theCanvas.getContext('2d');

// 	setInterval(drawScreen,33);
// }




window.addEventListener('load',eventWindowLoaded,false);
var bullseye;
function eventWindowLoaded(){
	bullseye = new Image();
	bullseye.src = "img/round.png"
	bullseye.onload = eventAssetsLaoded;
}

function eventAssetsLaoded(){
	canvasApp(); 
}

function canvasApp(){
	var img = new Image();
	img.src = "img/point.png";
	function drawScreen(){
		context.fillStyle = "#eeeeee";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);

		context.strokeStyle = "#000000";
		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

		var t= ball.t;

		var cx = 3*(p1.x-p0.x);
		var bx = 3*(p2.x-p1.x)-cx;
		var ax = p3.x-p0.x-cx-bx;

		var cy = 3*(p1.y-p0.y);
		var by = 3*(p2.y-p1.y)-cy;
		var ay = p3.y-p0.y-cy-by;

		var xt = ax*(t*t*t)+bx*t*t+cx*t+p0.x;
		var yt = ay*(t*t*t)+by*t*t+cy*t+p0.y;

		ball.t+=ball.speed;

		if(ball.t>1){
			ball.t=1;
		}

		context.font = "10px sans";

		context.fillStyle = "#ff0000";
		context.beginPath();
		context.arc(p0.x,p0.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#ffffff";
		context.fillText("0",p0.x-2,p0.y+2);

		context.fillStyle = "#ff0000";
		context.beginPath();
		context.arc(p1.x,p1.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#ffffff";
		context.fillText("1",p1.x-2,p1.y+2);

		context.fillStyle = "#ff0000";
		context.beginPath();
		context.arc(p2.x,p2.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#ffffff";
		context.fillText("2",p2.x-2,p2.y+2);

		context.fillStyle = "#ff0000";
		context.beginPath();
		context.arc(p3.x,p3.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#ffffff";
		context.fillText("3",p3.x-2,p3.y+2);

		points.push({x:xt,y:yt});
		for(var i = 0 ; i<points.length;i++){
			context.drawImage(img,points[i].x,points[i].y,1,1);
		}


		context.closePath();

		ball.x = xt-bullseye.width/2;
		ball.y = yt-bullseye.height/2;

		context.drawImage(bullseye,ball.x,ball.y);
		// context.fillStyle = "#000000";
		// context.beginPath();
		// context.arc(xt,yt,5,0,Math.PI*2,true);
		// context.closePath();
		// context.fill();
	}
	// var p0 = {x:60,y:10};
	// var p1 = {x:70,y:200};
	// var p2 = {x:125,y:295};
	// var p3 = {x:350,y:350};
	var p0 = {x:150,y:440};
	var p1 = {x:450,y:10};
	var p2 = {x:50,y:10};
	var p3 = {x:325,y:450};
	var ball = {x:0,y:0,speed:.01,t:0};
	var points = new Array();
	var theCanvas = document.getElementById('canvas');
	var context = theCanvas.getContext('2d');

	setInterval(drawScreen,33);
}