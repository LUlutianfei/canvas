window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
	canvasApp();
}

function canvasApp() {
	const theCanvas = document.getElementById('canvas');
	if (!theCanvas || !theCanvas.getContext) {
		return;
	}

	const context = theCanvas.getContext('2d');
	if (!context) {
		return;
	}

	//应用状态
	const GAME_STATE_TITLE = 0;
	const GAME_STATE_NEW_GAME = 1;
	const GAME_STATE_NEW_LEVEL = 2;
	const GAME_STATE_PALYER_START = 3;
	const GAME_STATE_PALY_LEVEL = 4;
	const GAME_STATE_PLAYER_DIE = 5;
	const GAME_STATE_GAME_OVER = 6;
	let currentGameState = 0;
	let currentGameStateFunction = null;

	//标题屏幕
	let titleStarted = false;

	//游戏结束屏幕
	let gameOverStarted = false;

	//游戏对象

	//游戏环境
	let score = 0;
	let level = 0;
	const extraShipAtEach = 10000;
	let extraShipEarned = 0;
	let playerShips = 3;

	//游戏区域
	const xMin = 0;
	const xMax = 400;
	const yMin = 0;
	const yMax = 400;

	//分值
	const bigRockScore = 50;
	const medRockScore = 75;
	const smlRockScore = 100;
	const saucerScore = 300;

	//陨石大小常量
	const ROCK_SCALE_LARGE = 1;
	const ROCK_SCALE_MEDIUM = 2;
	const ROCK_SCALE_SMALL = 3;

	//创建游戏对象和数组
	const player = [];
	let rocks = [];
	let saucers = [];
	let playerMissiles = [];
	let particles = [];
	let saucerMissiles = [];

	//关卡难度
	let levelRockMaxSpeedAdjust = 1;
	let levelSaucerMax = 1;
	let levelSaucerOccurenceRate = 25;
	let levelSaucerSpeed = 1;
	let levelSaucerFireDelay = 300;
	let levelSaucerFireRate = 30;
	let levelSaucerMissileSpeed = 1;

	//按键数组
	const keyPressList = [];

	function runGame() {
		currentGameStateFunction();
	}

	function switchGameState(newState) {
		currentGameState = newState;
		switch (currentGameState) {
			case GAME_STATE_TITLE:
				currentGameStateFunction = gameStateTitle;
				break;
			case GAME_STATE_NEW_GAME:
				currentGameStateFunction = gameStateNewGame;
				break;
			case GAME_STATE_NEW_LEVEL:
				currentGameStateFunction = gameStateNewLevel;
				break;
			case GAME_STATE_PALYER_START:
				currentGameStateFunction = gameStatePlayerStart;
				break;
			case GAME_STATE_PALY_LEVEL:
				currentGameStateFunction = gameStatePlayLevel;
				break;
			case GAME_STATE_PLAYER_DIE:
				currentGameStateFunction = gameStatePlayerDie;
				break;
			case GAME_STATE_GAME_OVER:
				currentGameStateFunction = gameStateGameOver;
				break;
			default:
				break;
		}
	}

	function gameStateTitle() {
		if (titleStarted != true) {
			fillBackground();
			setTextStyle();
			context.fillText("Geo Blaster BAsic", 130, 70);
			context.fillText("Press Space To Play", 120, 140);
			titleStarted = true;
		} else {
			//等待按下空格键
			if (keyPressList[32] == true) {
				console.log("space pressed");
				switchGameState(GAME_STATE_NEW_GAME);
				titleStarted = false;
			}
		}
	}

	function gameStateNewGame() {
		console.log("gameStateNewGame");

		//设置新游戏
		level = 0;
		score = 0;
		playerShips = 3;
		player.maxVelocity = 5;
		player.width = 20;
		player.height = 20;
		player.halfWidth = 10;
		player.halfHeight = 10;
		player.rotationalVelocity = 5; //飞船每次旋转多少度
		player.thrustAcceleration = .05;
		player.missileFrameDelay = 5;
		player.thrust = false;

		fillBackground();
		renderScoreBoard();
		switchGameState(GAME_STATE_NEW_LEVEL);
	}

	function gameStateNewLevel() {
		rocks = [];
		saucers = [];
		playerMissiles = [];
		particles = [];
		saucerMissiles = [];
		level++;
		levelRockMaxSpeedAdjust = level * .25;
		if (levelRockMaxSpeedAdjust > 3) {
			levelRockMaxSpeedAdjust = 3;
		}

		levelSaucerMax = 1 + Math.floor(level / 10);
		if (levelSaucerMax > 5) {
			levelSaucerMax = 5;
		}
		levelSaucerOccurenceRate = 10 + 3 * level;
		if (levelSaucerOccurenceRate > 35) {
			levelSaucerOccurenceRate = 35;
		}
		levelSaucerSpeed = 1 + .5 * level;
		if (levelSaucerSpeed > 5) {
			levelSaucerSpeed = 5;
		}
		levelSaucerFireDelay = 120 - 10 * level;
		if (levelSaucerFireDelay < 20) {
			levelSaucerFireDelay = 20;
		}
		levelSaucerFireRate = 20 + 3 * level;
		if (levelSaucerFireRate < 50) {
			levelSaucerFireRate = 50;
		}

		levelSaucerMissileSpeed = 1 + .2 * level;
		if (levelSaucerMissileSpeed > 4) {
			levelSaucerMissileSpeed = 4;
		}

		//创建关卡中的陨石
		for (let newRockctr = 0; newRockctr < level + 3; newRockctr++) {
			const newRock = {};

			newRock.scale = 1;
			//大小
			//1=大型
			//2=中型
			//3=小型
			//这些值用于作为除数，用于计算新陨石的大小
			//50/1=50
			//50/2=25
			//50/3=16
			newRock.width = 50;
			newRock.height = 50;
			newRock.halfHeight = 25;
			newRock.halfWidth = 25;

			//为保证飞船安全，所有新陨石都设置在屏幕上方
			newRock.x = Math.floor(Math.random() * 50);

			newRock.y = Math.floor(Math.random() * 50);

			newRock.dx = (Math.random() * 2) + levelRockMaxSpeedAdjust;
			if (Math.random() < 5) {
				newRock.dx *= -1;
			}

			newRock.dy = (Math.random() * 2) + levelRockMaxSpeedAdjust;
			if (Math.random() < 5) {
				newRock.dy *= -1;
			}

			//旋转速度和方向
			newRock.rotationInc = (Math.random() * 5) + 1;

			if (Math.random() < .5) {
				newRock.rotationInc *= -1;
			}

			newRock.scoreValue = bigRockScore;
			newRock.rotation = 0;

			rocks.push(newRock);
		}
		resetPlayer();
		switchGameState(GAME_STATE_PALYER_START);
	}

	function gameStatePlayerStart() {
		fillBackground();
		renderScoreBoard();
		if (player.alpha < 1) {
			player.alpha += .02;
			context.globalAlpha = player.alpha;
		} else {
			switchGameState(GAME_STATE_PALY_LEVEL);
		}

		renderPlayerShip(player.x, player.y, 270, 1);
		context.globalAlpha = 1;
		updateRocks();
		renderRocks();
	}

	function gameStatePlayLevel() {
		checkKeys();
		update();
		render();
		checkCollisions();
		checkForExtraShip();
		checkForEndOfLevel();
		frameRateCounter.countFrames();
	}

	function resetPlayer() {
		player.rotation = 270;
		player.x = .5 * xMax;
		player.y = .5 * yMax;
		player.facingX = 0;
		player.facingY = 0;
		player.movingX = 0;
		player.movingY = 0;
		player.alpha = 0;
		player.missileFrameCount = 0;
	}

	function checkForExtraShip() {
		if (Math.floor(score / extraShipAtEach) > extraShipEarned) {
			playerShips++;
			extraShipEarned++;
		}
	}

	function checkForEndOfLevel() {
		if (rocks.length == 0) {
			switchGameState(GAME_STATE_NEW_LEVEL);
		}
	}

	function gameStatePlayerDie() {
		if (particles.length > 0 || playerMissiles.length > 0) {
			fillBackground();
			renderScoreBoard();
			updateRocks();
			updateSaucers();
			updateParticles();
			updateSaucerMissiles();
			updatePlayerMissiles();
			renderRocks();
			renderSaucers();
			renderParticles();
			renderSaucerMissiles();
			renderPlayerMissiles();
			frameRateCounter.countFrames();
		} else {
			playerShips--;
			if (playerShips < 1) {
				switchGameState(GAME_STATE_GAME_OVER);
			} else {
				resetPlayer();
				switchGameState(GAME_STATE_PALYER_START);
			}
		}
	}

	function gameStateGameOver() {
		if (gameOverStarted != true) {
			fillBackground();
			renderScoreBoard();
			setTextStyle();
			context.fillText("Game Over", 150, 70);
			context.fillText("Press Space To Play", 120, 140);

			gameOverStarted = true;
		} else {
			//等待按下空格键
			if (keyPressList[32] == true) {
				console.log("space pressed");
				switchGameState(GAME_STATE_TITLE);
				gameOverStarted = false;
			}
		}
	}

	function fillBackground() {
		//绘制背景和文字
		context.fillStyle = "#000000";
		context.fillRect(xMin, yMin, xMax, yMax);
	}

	function setTextStyle() {
		context.fillStyle = "#ffffff";
		context.font = '15px _sans';
		context.textBaseline = "top";
	}

	function renderScoreBoard() {
		context.fillStyle = "#ffffff";
		context.fillText("Score" + score, 10, 20);
		renderPlayerShip(200, 16, 270, .75);
		context.fillText("X" + playerShips, 220, 20);
		context.fillText('FPS:' + frameRateCounter.lastFrameCount, 300, 20);
	}

	function checkKeys() {
		//检查按键
		if (keyPressList[38] == true) {
			//推进
			const angleInRadians = player.rotation * Math.PI / 180;
			player.facingX = Math.cos(angleInRadians);
			player.facingY = Math.sin(angleInRadians);

			const movingXNew = player.movingX + player.thrustAcceleration * player.facingX;
			const movingYNew = player.movingY + player.thrustAcceleration * player.facingY;

			const currentVelocity = Math.sqrt((movingXNew * movingXNew) + (movingYNew * movingYNew));

			if (currentVelocity < player.maxVelocity) {
				player.movingX = movingXNew;
				player.movingY = movingYNew;
			}
			player.thrust = true;
		} else {
			player.thrust = false;
		}

		if (keyPressList[37] == true) {
			//逆时针旋转
			player.rotation -= player.rotationalVelocity;
		}

		if (keyPressList[39] == true) {
			//顺时针旋转
			player.rotation += player.rotationalVelocity;
		}

		if (keyPressList[32] == true) {
			if (player.missileFrameCount > player.missileFrameDelay) {
				firePlayerMissile();
				player.missileFrameCount = 0;
			}
		}
	}

	function update() {
		updatePlayer();
		updatePlayerMissiles();
		updateRocks();
		updateSaucers();
		updateSaucerMissiles();
		updateParticles();
	}

	function render() {
		fillBackground();
		renderScoreBoard();
		renderPlayerShip(player.x, player.y, player.rotation, 1);
		renderPlayerMissiles();
		renderRocks();
		renderSaucers();
		renderSaucerMissiles();
		renderParticles();
	}

	function updatePlayer() {
		player.missileFrameCount++;

		player.x += player.movingX;
		player.y += player.movingY;

		if (player.x > xMax) {
			player.x = -player.width;
		} else if (player.x < -player.width) {
			player.x = xMax;
		}

		if (player.y > yMax) {
			player.y = -player.height;
		} else if (player.y < -player.height) {
			player.y = yMax;
		}
	}

	function updatePlayerMissiles() {
		let tempPlayerMissile = {};
		const playerMissileLength = playerMissiles.lrngth - 1;

		for (let playerMissileCtr = playerMissileLength; playerMissileCtr >= 0; playerMissileCtr--) {
			tempPlayerMissile = playerMissiles[playerMissileCtr];
			tempPlayerMissile.x += tempPlayerMissile.dx;
			tempPlayerMissile.y += tempPlayerMissile.dy;
			if (tempPlayerMissile.x > xMax) {
				tempPlayerMissile.x = -tempPlayerMissile.width;
			} else if (tempPlayerMissile.x < -tempPlayerMissile.width) {
				tempPlayerMissile.x = xMax;
			}

			if (tempPlayerMissile.y > yMax) {
				tempPlayerMissile.y = -tempPlayerMissile.height;
			} else if (tempPlayerMissile.y < -tempPlayerMissile.height) {
				tempPlayerMissile.y = yMax;
			}

			tempPlayerMissile.lifeCtr++;
			if (tempPlayerMissile.lifeCtr > tempPlayerMissile.life) {
				playerMissiles.splice(playerMissileCtr, 1);
				tempPlayerMissile = null;
			}
		}
	}

	function updateRocks() {
		let tempRock = {};
		const rocksLength = rocks.length - 1;
		for (let rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
			tempRock = rocks[rockCtr];
			tempRock.x += tempRock.dx;
			tempRock.y += tempRock.dy;
			tempRock.rotation += tempRock.rotationInc;

			if (tempRock.x > xMax) {
				tempRock.x = xMin - tempRock.width;
			} else if (tempRock.x < xMin - tempRock.width) {
				tempRock.x = xMax;
			}

			if (tempRock.y > yMax) {
				tempRock.y = yMin - tempRock.height;
			} else if (tempRock.y < yMin - tempRock.height) {
				tempRock.y = yMax;
			}
		}
	}

	function updateSaucers() {
		//检查是否需要添加一个飞碟
		if (saucers.length < levelSaucerMax) {
			if (Math.floor(Math.random() * 100) <= levelSaucerOccurenceRate) {
				const newSaucer = {};

				newSaucer.width = 28;
				newSaucer.height = 13;
				newSaucer.halfHeight = 6.5;
				newSaucer.halfWidth = 14;
				newSaucer.scoreValue = saucerScore;
				newSaucer.fireRate = levelSaucerFireRate;
				newSaucer.fireDelay = levelSaucerFireDelay;
				newSaucer.fireDelayCount = 0;
				newSaucer.missileSpeed = levelSaucerMissileSpeed;
				newSaucer.dy = (Math.random() * 2);
				if (Math.floor(Math.random) * 2 == 1) {
					newSaucer.dy *= -1;
				}

				//选择起始点是在左边界还是有右边界
				if (Math.floor(Math.random() * 2) == 1) {
					//从右边开始向左边飞
					newSaucer.x = 450;
					newSaucer.dx = -1 * levelSaucerSpeed;
				} else {
					//从左向右
					newSaucer.x = -50;
					newSaucer.dx = levelSaucerSpeed;
				}

				newSaucer.missileSpeed = levelSaucerMissileSpeed;
				newSaucer.fireDelay = levelSaucerFireDelay;
				newSaucer.fireRate = levelSaucerFireRate;
				newSaucer.y = Math.floor(Math.random() * 400);

				saucers.push(newSaucer);
			}
		}

		let tempSaucer = {};
		const saucerLength = saucers.length - 1;
		for (let saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
			tempSaucer = saucers[saucerCtr];

			//飞船是否应该射击
			tempSaucer.fireDelayCount++;
			if (Math.floor(Math.random() * 100) <= tempSaucer.fireRate &&
				tempSaucer.fireDelayCount > tempSaucer.fireDelay) {
				fireSaucerMissile(tempSaucer);
				tempSaucer.fireDelayCount = 0;
			}

			let remove = false;
			tempSaucer.x += tempSaucer.dx;
			tempSaucer.y += tempSaucer.dy;

			//在左边界或右边界将飞船移除
			if (tempSaucer.dx > 0 && tempSaucer.x > xMax) {
				remove = true;
			} else if (tempSaucer.dx < 0 && tempSaucer.x < xMin - tempSaucer.width) {
				remove = true;
			}

			//飞船在上下边界
			if (tempSaucer.y > yMax > yMax || tempSaucer.y < yMin - tempSaucer.width) {
				tempSaucer.dy *= -1;
			}

			if (remove == true) {
				//移除飞船
				console.log('saucer removed');
				saucers.splice(saucerCtr, 1);
				tempSaucer = null;
			}
		}
	}

	function updateSaucerMissiles() {
		let tempSaucerMissile = {};
		const saucerMissileLength = saucerMissiles.length - 1;

		for (let saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
			tempSaucerMissile = saucerMissiles[saucerMissileCtr];
			tempSaucerMissile.x += tempSaucerMissile.dx;
			tempSaucerMissile.y += tempSaucerMissile.dy;
			if (tempSaucerMissile.x > xMax) {
				tempSaucerMissile.x = -tempSaucerMissile.width;
			} else if (tempSaucerMissile.x < -tempSaucerMissile.width) {
				tempSaucerMissile.x = xMax;
			}

			if (tempSaucerMissile.y > yMax) {
				tempSaucerMissile.y = -tempSaucerMissile.height;
			} else if (tempSaucerMissile.y < -tempSaucerMissile.height) {
				tempSaucerMissile.y = yMax;
			}

			tempSaucerMissile.lifeCtr++;
			if (tempSaucerMissile.lifeCtr > tempSaucerMissile.life) {
				//移除导弹
				saucerMissiles.splice(saucerMissileCtr, 1);
				tempSaucerMissile = null;
			}
		}
	}

	function updateParticles() {
		let tempParticle = {};
		const particleLength = particles.length - 1;

		for (let particleCtr = particleLength; particleCtr >= 0; particleCtr--) {
			let remove = false;
			tempParticle = particles[particleCtr];
			tempParticle.x += tempParticle.dx;
			tempParticle.y += tempParticle.dy;

			tempParticle.lifeCtr++;

			if (tempParticle.lifeCtr > tempParticle.life) {
				remove = true;
			} else if ((tempParticle.x > xMax) || (tempParticle.x < xMin) ||
				(tempParticle.y > yMax) || (tempParticle.y < yMin)) {
				remove = true;
			}
			if (remove) {
				particles.splice(particleCtr, 1);
				tempParticle = null;
			}
		}
	}

	function renderPlayerShip(x, y, rotation, scale) {
		//形状变换
		const angleInRadians = rotation * Math.PI / 180;
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);

		context.translate(x + player.halfWidth, y + player.halfHeight);
		context.rotate(angleInRadians);
		context.scale(scale, scale);

		//绘制飞船
		context.strokeStyle = "#ffffff";
		context.beginPath();

		//将位置硬编码。朝向右
		context.moveTo(-10, -10);
		context.lineTo(10, 0);
		context.moveTo(10, 1);
		context.lineTo(-10, 10);
		context.lineTo(1, 1);
		context.moveTo(1, -1);
		context.lineTo(-10, -10);

		if (player.thrust == true && scale == 1) {
			//检查scale==1，作为绘制推进火焰的指示变量
			context.moveTo(-4, -2);
			context.lineTo(-4, 1);
			context.moveTo(-5, -1);
			context.lineTo(-10, -1);
			context.moveTo(-5, 0);
			context.lineTo(-10, -10);
		}
		context.stroke();
		context.closePath();

		//恢复上下文
		context.restore();
	}

	function renderPlayerMissiles() {
		let tempPlayerMissile = {};
		const playerMissileLength = playerMissiles.length - 1;

		for (let playerMissileCtr = playerMissileLength; playerMissileCtr >= 0; playerMissileCtr--) {
			tempPlayerMissile = playerMissiles[playerMissileCtr];
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);

			context.translate(tempPlayerMissile.x + 1, tempPlayerMissile.y + 1);
			context.strokeStyle = "#ffffff";

			context.beginPath();

			//绘制所有物体时偏移1/2,零相对于1/2是1.5
			context.moveTo(-1, -1);
			context.lineTo(1, -1);
			context.lineTo(1, 1);
			context.lineTo(-1, 1);
			context.lineTo(-1, -1);

			context.stroke();
			context.closePath();
			context.restore();
		}

	}

	//陨石
	function renderRocks() {
		let tempRock = {};
		const rocksLength = rocks.length - 1;
		for (let rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
			tempRock = rocks[rockCtr];
			const angleInRadians = tempRock.rotation * Math.PI / 180;
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);

			//将画布原点平移到飞船中心
			context.translate(tempRock.x + tempRock.halfWidth, tempRock.y + tempRock.halfHeight);
			context.rotate(angleInRadians);
			context.strokeStyle = "#ffffff";

			context.beginPath();

			//绘制每个物体时偏移1/2，零相对于1/2是0.5*width-1，计算高度时相同
			context.moveTo(-(tempRock.halfWidth - 1), -(tempRock.halfHeight - 1));
			context.moveTo((tempRock.halfWidth - 1), -(tempRock.halfHeight - 1));
			context.moveTo((tempRock.halfWidth - 1), (tempRock.halfHeight - 1));
			context.moveTo(-(tempRock.halfWidth - 1), (tempRock.halfHeight - 1));
			context.moveTo(-(tempRock.halfWidth - 1), -(tempRock.halfHeight - 1));

			context.stroke();
			context.closePath();
			context.restore();
		}
	}

	//飞碟
	function renderSaucers() {
		let tempSaucer = {};
		const saucerLength = saucers.length - 1;
		for (let saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
			tempSaucer = saucers[saucerCtr];

			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);

			context.translate(tempSaucer.x, tempSaucer.y);
			context.strokeStyle = "#ffffff";

			context.beginPath();

			context.moveTo(4, 0);
			context.lineTo(9, 0);
			context.lineTo(12, 3);
			context.lineTo(13, 3);
			context.moveTo(13, 4);
			context.lineTo(10, 7);
			context.lineTo(3, 7);
			context.lineTo(1, 5);
			context.lineTo(12, 5);
			context.moveTo(0, 4);
			context.lineTo(0, 3);
			context.lineTo(13, 3);
			context.moveTo(5, 1);
			context.lineTo(5, 2);
			context.moveTo(8, 1);
			context.lineTo(8, 2);
			context.moveTo(2, 2);
			context.lineTo(4, 0);

			context.stroke();
			context.closePath();
			context.restore();
		}
	}

	//导弹
	function renderSaucerMissiles() {
		let tempSaucerMissile = {};
		const saucerMissileLength = saucerMissiles.length - 1;

		for (let saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
			tempSaucerMissile = saucerMissiles[saucerMissileCtr];
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);

			context.translate(tempSaucerMissile.x + 1, tempSaucerMissile.y + 1);
			context.strokeStyle = "#ffffff";

			context.beginPath();

			//绘制所有物体时偏移1/2，零相对于1/2是1
			context.moveTo(-1, -1);
			context.lineTo(1, -1);
			context.lineTo(1, 1);
			context.lineTo(-1, 1);
			context.lineTo(-1, -1);
			context.stroke();
			context.closePath();
			context.restore();
		}
	}

	function renderParticles() {
		let tempParticle = {};
		const particleLength = particles.length - 1;

		for (let particleCtr = particleLength; particleCtr >= 0; particleCtr--) {
			tempParticle = particles[particleCtr];
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);

			context.translate(tempParticle.x, tempParticle.y);
			context.strokeStyle = "#ffffff";

			context.beginPath();

			//绘制所有物体时偏移1/2，零相对于1/2是1
			context.moveTo(0, 0);
			context.lineTo(1, 1);
			context.stroke();
			context.closePath();
			context.restore();
		}

	}

	function checkCollisions() {
		//先遍历陨石，然后遍历导弹，因为屏幕是总是有陨石和飞船，但不一定有导弹
		let tempRock = {};
		const rocksLength = rocks.length - 1;
		let tempPlayerMissile = {};
		let playerMissileLength = playerMissiles.length - 1;
		let saucerLength = saucers.length - 1;
		let tempSaucer = {};
		let saucerMissileLength = saucerMissiles.length - 1;

		rocks: for (let rockCtr = rocksLength; rockCtr >= 0; rockCtr--) {
			tempRock = rocks[rockCtr];

			missiles: for (let playerMissileCtr = playerMissileLength; playerMissileCtr >= 0; playerMissileCtr--) {
				tempPlayerMissile = playerMissiles[playerMissileCtr];

				if (boundingBoxCollide(tempRock, tempPlayerMissile)) {
					createExplode(tempRock.x + tempRock.halfWidth, tempRock.y + tempRock.halfHeight, 10);

					if (tempRock.scale < 3) {
						splitRock(tempRock.scale + 1, tempRock.x, tempRock.y);
					}

					addToScore(tempRock.scoreValue);
					playerMissiles.splice(playerMissileCtr, 1);
					tempPlayerMissile = null;

					rocks.splice(rockCtr, 1);
					tempRock = null;

					break rocks;

					break missiles;
				}
			}

			saucers: for (let saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
				tempSaucer = saucers[saucerCtr];

				if (boundingBoxCollide(tempRock, tempSaucer)) {
					createExplode(tempSaucer.x + tempSaucer.halfWidth, tempSaucer.y + tempRock.halfHeight, 10);

					if (tempRock.scale < 3) {
						splitRock(tempRock.scale + 1, tempRock.x, tempRock.y);
					}

					saucers.splice(saucerCtr, 1);
					tempSaucer = null;

					saucers.splice(rockCtr, 1);
					tempRock = null;

					break rocks;
					break saucers;
				}
			}

			//飞碟导弹与陨石碰撞
			//此处已完成，所以不需要再次遍历全部陨石
			//这可能是最大的数组
			saucerMissiles: for (let saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
				let tempSaucerMissile = saucerMissiles[saucerMissileCtr];

				if (boundingBoxCollide(tempRock, tempSaucerMissile)) {
					createExplode(tempRock.x + tempRock.halfWidth, tempRock.y + tempRock.halfHeight, 10);
					if (tempRock.scale < 3) {
						splitRock(tempRock.scale + 1, tempRock.x, tempRock.y);
					}

					saucerMissiles.splice(saucerMissileCtr, 1);
					tempSaucerMissile = null;

					rocks.splice(rockCtr, 1);
					tempRock = null;

					break rocks;
					break saucerMissiles;
				}
			}

			//检查玩家飞船与陨石碰撞
			if (boundingBoxCollide(tempRock, player)) {
				createExplode(tempRock.x + tempRock.halfWidth, tempRock.halfHeight, 10);
				addToScore(tempRock.scoreValue);

				if (tempRock.scale < 3) {
					splitRock(tempRock.scale + 1, tempRock.x, tempRock.y);
				}
				rocks.splice(rockCtr, 1);
				tempRock = null;

				playerDie();
			}
		}
		//现在检查玩家飞船与飞碟碰撞，然后检查飞碟与玩家导弹碰撞，最后检查玩家与飞碟导弹碰撞

		playerMissileLength = playerMissiles.length - 1;
		saucerLength = saucers.length - 1;
		saucers: for (let saucerCtr = saucerLength; saucerCtr >= 0; saucerCtr--) {
			tempSaucer = saucers[saucerCtr];

			missiles: for (let playerMissileCtr = playerMissileLength; playerMissileCtr >= 0; playerMissileCtr--) {
				tempPlayerMissile = playerMissiles[playerMissileCtr];
				if (boundingBoxCollide(tempSaucer, tempPlayerMissile)) {
					createExplode(tempSaucer.x + tempSaucer.halfWidth, tempSaucer.y + tempSaucer.halfHeight, 10);
					addToScore(tempSaucer.scoreValue);

					playerMissiles.splice(playerMissileCtr, 1);
					tempPlayerMissile = null;

					saucers.splice(saucerCtr, 1);
					tempSaucer = null;

					break saucers;
					break missiles;
				}
			}

			//玩家飞船与飞碟碰撞
			if (boundingBoxCollide(tempSaucer, player)) {
				console.log('hit player');
				createExplode(tempSaucer.x + 16, tempSaucer.y + 16, 10);
				addToScore(tempSaucer.scoreValue);

				saucers.splice(saucerCtr, 1);
				tempSaucer = null;

				playerDie();
			}
		}

		//飞碟与玩家碰撞
		saucerMissileLength = saucerMissiles.length - 1;

		saucerMissiles: for (let saucerMissileCtr = saucerMissileLength; saucerMissileCtr >= 0; saucerMissileCtr--) {
			let tempSaucerMissile = saucerMissiles[saucerMissileCtr];
			if (boundingBoxCollide(player, tempSaucerMissile)) {
				playerDie();
				saucerMissiles.splice(saucerMissileCtr, 1);
				tempSaucerMissile = null;
				break saucerMissiles;
			}
		}
	}

	function firePlayerMissile() {
		const newPlayerMissile = {};
		newPlayerMissile.dx = 5 * Math.cos(Math.PI * (player.rotation) / 180);
		newPlayerMissile.dy = 5 * Math.sin(Math.PI * (player.rotation) / 180);
		newPlayerMissile.x = player.x + player.halfWidth;
		newPlayerMissile.y = player.y + player.halfHeight;
		newPlayerMissile.life = 60;
		newPlayerMissile.lifeCtr = 0;
		newPlayerMissile.width = 2;
		newPlayerMissile.height = 2;
		playerMissiles.push(newPlayerMissile);
	}

	function fireSaucerMissile(saucer) {
		const newSaucerMissile = {};
		newSaucerMissile.x = saucer.x + .5 * saucer.width;
		newSaucerMissile.y = saucer.y + .5 * saucer.height;

		newSaucerMissile.width = 2;
		newSaucerMissile.height = 2;
		newSaucerMissile.speed = saucer.missileSpeed;

		//从飞碟向玩家射击
		const diffx = player.x - saucer.x;
		const diffy = player.y - saucer.y;
		const radians = Math.atan2(diffx, diffy);
		const degrees = 360 * radians / (2 * Math.PI);
		newSaucerMissile.dx = saucer.missileSpeed * Math.cos(Math.PI * (degrees) / 180);
		newSaucerMissile.dy = saucer.missileSpeed * Math.sin(Math.PI * (degrees) / 180);
		newSaucerMissile.life = 160;
		newSaucerMissile.lifeCtr = 0;
		saucerMissiles.push(newSaucerMissile);
	}

	function playerDie() {
		console.log('player die');
		createExplode(player.x + player.halfWidth, player.y + player.halfHeight, 50);
		switchGameState(GAME_STATE_PLAYER_DIE);
	}

	function createExplode(x, y, num) {
		//创建十个碎片
		for (let partCtr = 0; partCtr < num; partCtr++) {
			const newParticle = {};
			newParticle.dx = Math.random() * 3;
			if (Math.random() < .5) {
				newParticle.dx *= -1;
			}

			newParticle.dy = Math.random() * 3;
			if (Math.random() < .5) {
				newParticle.dy *= -1;
			}

			newParticle.life = Math.floor(Math.random() * 30 + 30);
			newParticle.lifeCtr = 0;
			newParticle.x = x;
			newParticle.y = y;
			particles.push(newParticle);
		}
	}

	function boundingBoxCollide(object1, object2) {
		const left1 = object1.x;
		const left2 = object2.x;
		const right1 = object1.x + object1.width;
		const right2 = object2.x + object2.width;
		const top1 = object1.y;
		const top2 = object2.y;
		const bottom1 = object1.y + object1.height;
		const bottom2 = object2.y + object2.height;

		if (bottom1 < top2) return (false);
		if (top1 > bottom2) return (false);
		if (right1 < left2) return (false);
		if (left1 < right2) return (false);

		return (true);
	}

	function splitRock(scale, x, y) {
		for (let newRockctr = 0; newRockctr < 2; newRockctr++) {
			const newRock = {};

			if (scale == 2) {
				newRock.scoreValue = medRockScore;
				newRock.width = 25;
				newRock.height = 25;
				newRock.halfHeight = 12.5;
				newRock.halfWidth = 12.5;
			} else {
				newRock.scoreValue = smlRockScore;
				newRock.width = 16;
				newRock.height = 16;
				newRock.halfHeight = 8;
				newRock.halfWidth = 8;
			}

			newRock.scale = scale;
			newRock.x = x;
			newRock.y = y;
			newRock.dx = Math.random() * 3;
			if (Math.random() < .5) {
				newRock.dx *= -1;
			}
			newRock.dy = Math.random() * 3;
			if (Math.random() < .5) {
				newRock.dy *= -1;
			}
			newRock.rotationInc = (Math.random() * 5) + 1;
			if (Math.random() < .5) {
				newRock.rotationInc *= -1;
			}
			newRock.rotation = 0;
			console.log("new rock scale" + (newRock.scale));
			rocks.push(newRock);
		}
	}

	function addToScore(value) {
		score += value;
	}

	document.onkeydown = function (e) {
		e = e ? e : window.event;
		keyPressList[e.keyCode] = true;
	};

	document.onkeyup = function (e) {
		e = e ? e : window.event;
		keyPressList[e.keyCode] = false;
	};

	//***程序开始
	switchGameState(GAME_STATE_TITLE);
	const frameRateCounter = new FrameRateCounter();
	//***程序循环
	const FRAME_RATE = 40;
	const intervalTime = 1000 / FRAME_RATE;
	setInterval(runGame, intervalTime);
}

function FrameRateCounter() {
	this.lastFrameCount = 0;
	const dateTemp = new Date();
	this.frameLast = dateTemp.getTime();
	//delete dateTemp;
	this.frameCtr = 0;
}

FrameRateCounter.prototype.countFrames = function () {
	const dateTemp = new Date();
	this.frameCtr++;

	if (dateTemp.getTime() >= this.frameLast + 1000) {
		console.log("frame event");
		this.lastFrameCount = this.frameCtr;
		this.frameLast = dateTemp.getTime();
		this.frameCtr = 0;
	}

	//delete dateTemp;
};