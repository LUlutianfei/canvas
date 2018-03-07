// window.addEventListener('load',windowChanged,false);
// var img;
// function windowChanged(){
// 	img = new Image();
// 	img.src = "img/round.png";
// 	img.onload = eventAssetsLoaded;
// }

// function eventAssetsLoaded(){
// 	canvasApp();
// }

// function canvasApp(){
// 	var pointImg = new Image();
// 	pointImg.src = "img/point.png";
// 	function drawScreen(){
// 		context.fillStyle = "#eeeeee";
// 		context.fillRect(0,0,theCanvas.width,theCanvas.height);

// 		context.strokeStyle = "#000000";
// 		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

// 		var dx = ship.endx - ship.x;
// 		var dy = ship.endy - ship.y;

// 		ship.velocityx = dx * easeValue;
// 		ship.velocityy = dy * easeValue;

// 		ship.x += ship.velocityx;
// 		ship.y += ship.velocityy;

// 		points.push({x:ship.x,y:ship.y});
// 		for(var i=0;i<points.length;i++){
// 			context.drawImage(pointImg,points[i].x+img.width/2,points[i].y,1,1);
// 		}

// 		context.drawImage(img,ship.x,ship.y);
// 	}
// 	var easeValue = .05;
// 	var p1 = {x:240,y:-20};
// 	var p2 = {x:240,y:470};

// 	var ship = {x:p1.x,y:p1.y,endx:p2.x,endy:p2.y,velocityx:0,velocityy:0};
// 	var points = new Array();

// 	theCanvas = document.getElementById('canvas');
// 	context = theCanvas.getContext("2d");

// 	setInterval(drawScreen,33);
// }




window.addEventListener('load',windowChanged,false);
var img;
function windowChanged(){
	img = new Image();
	img.src = "img/round.png";
	img.onload = eventAssetsLoaded;
}

function eventAssetsLoaded(){
	canvasApp();
}

function canvasApp(){
	var pointImg = new Image();
	pointImg.src = "img/point.png";
	function drawScreen(){
		context.fillStyle = "#eeeeee";
		context.fillRect(0,0,theCanvas.width,theCanvas.height);

		context.strokeStyle = "#000000";
		context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);

		

		ship.velocityx = ship.velocityx +ship.velocityx*easeValue;
		ship.velocityy = ship.velocityy +ship.velocityy*easeValue;

		ship.x += ship.velocityx;
		ship.y += ship.velocityy;

		points.push({x:ship.x,y:ship.y});
		for(var i=0;i<points.length;i++){
			context.drawImage(pointImg,points[i].x+img.width/2,points[i].y,1,1);
		}

		context.drawImage(img,ship.x,ship.y);
	}
	var easeValue = .05;
	var p1 = {x:240,y:470};
	var tempX;
	var tempY;
	var tempSpeed = .5;
	var tempAngle = 270;
	var tempRadians = tempAngle*Math.PI/180;
	var tempvelocityx = Math.cos(tempRadians)*tempSpeed;
	var tempvelocityy = Math.sin(tempRadians)*tempSpeed;

	var ship = {x:p1.x,y:p1.y,velocityx:tempvelocityx,velocityy:tempvelocityy};
	var points = new Array();

	theCanvas = document.getElementById('canvas');
	context = theCanvas.getContext("2d");

	setInterval(drawScreen,33);
}

