'use strict';

(function(window){

	// Initial Data
	var canvas = document.getElementsByClassName('canvas-snake')[0];
	var ctx = canvas.getContext('2d');
	var width = canvas.getAttribute('width');
	var height = canvas.getAttribute('height');
	var posFx;
	var posFy;
	var start = 0;
	var frameRate = 60;

	// Block Width
	var blockWidth = 10;

	// Snake and Food
	var f; // food
	var snake;
	var snakeArray = []; //snakeArray

	// Games Functions
	var game;

	// Directions
	var direction = 'right';

	// Drawing Food
	function drawFood() {
		f = {
			x: Math.floor( Math.floor( (Math.random() * 100) / 100 *  ( width / blockWidth))) * blockWidth,
			y: Math.floor( Math.floor( (Math.random() * 100) / 100 *  ( height/ blockWidth))) * blockWidth,
		}
		ctx.fillStyle = 'red';
		ctx.fillRect(f.x,f.y, blockWidth, blockWidth);
	}

	// Drawing Snake
	function drawSnake() {
		var snakeSize = 5;
		for (var i =5; i > 0; i--){
			snakeArray.push([i * blockWidth, 0]);
		}

		for (var i =0; i < snakeArray.length; i++){
			ctx.fillStyle = 'green';
			ctx.fillRect(snakeArray[i][0] , snakeArray[i][1] , blockWidth, blockWidth);
		}
	}

	// Drawings
	function drawing() {
		
		var draws = {
			init: function() {
				this.clear();
			},
			clear : function() {
				ctx.clearRect(0,0,width,height);
				this.draw();
			},
			draw : function() {
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, width, height);
				ctx.strokeStyle = "black";
				ctx.strokeRect(0, 0, width, height);
				this.food();
			},
			snake: function() {
				
				var firstX = snakeArray[0][0];
				var firstY = snakeArray[0][1];

				for (var i=snakeArray.length-1; i>0; i--) {
					snakeArray[i][0] = snakeArray[i-1][0];
					snakeArray[i][1] = snakeArray[i-1][1];
				}

				if (direction == 'up') {
					snakeArray[0][0] = firstX;
					snakeArray[0][1] = firstY - blockWidth;
				} else if (direction == 'down') {
					snakeArray[0][0] = firstX;
					snakeArray[0][1] = firstY + blockWidth;
				} else if (direction == 'left') {
					snakeArray[0][0] = firstX - blockWidth;
					snakeArray[0][1] = firstY;
				} else if (direction == 'right') {
					snakeArray[0][0] = firstX + blockWidth;
					snakeArray[0][1] = firstY;
				}

				// Desenhamos o Novo Array
				for (var i =0; i < snakeArray.length; i++){
					ctx.fillStyle = 'green';
					ctx.fillRect(snakeArray[i][0] , snakeArray[i][1] , blockWidth, blockWidth);
				}
				this.checkColision();
			},
			food: function() {
				ctx.fillStyle = 'red';
				ctx.fillRect(f.x,f.y, blockWidth, blockWidth);
				this.snake();
			},
			checkColision: function() {
				if (snakeArray[0][0] > 500 || snakeArray[0][1] > 500 || snakeArray[0][0] < 0 || snakeArray[0][1] < 0) {
					clearInterval(game);
					alert('Game Over');
					snakeArray = [];
					f.x = '';
					f.y = '';
					direction = 'right';
					frameRate = 60;
					init();
				}

				if (snakeArray[0][0] == f.x && snakeArray[0][1] == f.y) {
					var size = snakeArray.length;

					var lastCellX = snakeArray[snakeArray.length-1][0];
					var lastCellY = snakeArray[snakeArray.length-1][1];

					var penCellX = snakeArray[snakeArray.length-2][0];
					var penCellY = snakeArray[snakeArray.length-2][1];

					if (lastCellX - penCellX == 0) {
						// increase in Y axis
						if ( lastCellY - penCellY < 0) {
							var newY = lastCellY - blockWidth;
						} else {
							var newY = lastCellY + blockWidth;
						}
						snakeArray.push([lastCellX,newY]);

					} else {
						// increase in X axis	
						if ( lastCellY - penCellY < 0) {
							var newX = lastCellX - blockWidth;
						} else {
							var newX = lastCellX + blockWidth;
						}
						snakeArray.push([newX,lastCellY]);
					}

					f.x = '';
					f.y = '';
					drawFood();
					clearInterval(game);
					frameRate = frameRate - 2;
					game = setInterval(drawing, frameRate);
				}
			}
		}

		// Chamadas
		ctx.save();
		draws.init();
		ctx.restore();
	}

	// Init
	function init() {
		drawSnake();
		drawFood();
		
		window.addEventListener('keydown', function(e) {
			if (e.keyCode == 37) {
				if (direction != 'right') {
					direction = 'left';
				}
			} else if ( e.keyCode == 38) {
				if (direction != 'down') {
					direction = 'up';
				}
			} else if ( e.keyCode == 39) {
				if (direction != 'left') {
					direction = 'right';
				}
			} else if ( e.keyCode == 40) {
				if (direction != 'up') {
					direction = 'down';
				}
			} else if ( e.keyCode == 80) {
				clearInterval(game);
			} else if ( e.keyCode == 81) {
				game = setInterval(drawing, frameRate);				
			}
		});

		game = setInterval(drawing, frameRate);
	}
	init();



})(window);