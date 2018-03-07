window.addEventListener('load',windowChanged,false);

function windowChanged(){
	var canvasO = document.getElementById('canvas');
	var context = canvasO.getContext('2d');
	context.fillStyle = "#ccc";
	context.fillRect(0,0,canvasO.width,canvasO.height);
	context.lineWidth=10;
	context.strokeStyle = "#3399ff";
	context.strokeRect(50,50,100,100);

	context.fillStyle = "#000000";
	context.arc(200,200,50,(Math.PI/180)*0,(Math.PI/180)*360,false);
	context.fill();
	

	context.stroke();
	context.beginPath();
	context.moveTo(10,10);
	context.lineTo(50,50);
	context.lineTo(50,0);
	context.lineTo(10,10);
	context.closePath();

	context.stroke();

	var i = new Image();
	i.addEventListener('load',eventSheetLoaded,false);
	i.src = 'img/google.jpg';

	function eventSheetLoaded(){
		context.drawImage(i,300,300,100,100);
		
	}
}
