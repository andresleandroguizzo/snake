var snake = [{x:225,y:225}];
var fruit = {x:0,y:0};
var SIZE = 15;
var longitud = 1;
var WIDTH = 450;
var HEIGHT =450;
var ctx;
var interval;
var left = 0;
var up = 0;
var right = 0;
var down = 0;
var gameover = false;
var speed = 200;
var control = true;
var Level = 1;
var score = 0;

function initialize() {
	ctx = document.getElementById('container').getContext("2d");
	updateFruit();
	updateSnake();
	interval = setInterval(update,speed);
	document.getElementById("btn").disabled = true;
}

function play() {
	clearInterval(interval);
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	snake = [{x:225,y:225}];
	longitud = 1;
	speed = 200;
	left = 0;
	up = 0;
	right = 0;
	down = 0;
	gameover = false;
	speed = 200;
	control = true;
	Level = 1;
	score = 0;
	document.getElementById("level").innerHTML = "Level " + Level;
	document.getElementById("score").innerHTML = "Score " + score;
	initialize();
}


function updateFruit() {
	document.getElementById("score").innerHTML = "Score " + score;
	var x = Math.floor(Math.random()*((WIDTH-SIZE)/SIZE)) + 1;
	fruit.x = x*SIZE;
	var y = Math.floor(Math.random()*((HEIGHT-SIZE)/SIZE)) + 1;
	fruit.y = y*SIZE;
	draw(fruit.x, fruit.y, SIZE, color="red");
	score++;
}

function updateSnake() {
	control = true;
	var oldx = snake[0].x;
	var oldy = snake[0].y;
	if (left == 1)  {
		snake[0].x = oldx - SIZE;
	}
	else if (up == 1)  {
		snake[0].y = oldy - SIZE;
	}
	else if (right == 1)  {
		snake[0].x = oldx + SIZE;
	}
	else if (down == 1)  {
		snake[0].y = oldy + SIZE;
	}
	if (longitud > snake.length) {
		var auxx = snake[snake.length - 1].x;
		var auxy = snake[snake.length - 1].y;
		if (left == 1)  {
			auxx = auxx - SIZE;
		}
		else if (up == 1)  {
			auxy = auxy - SIZE;
		}
		else if (right == 1)  {
			auxx = auxx + SIZE;
		}
		else if (down == 1)  {
			auxy = auxy + SIZE;
		}
		snake.push({x:auxx,y:auxy});
	}
	if (longitud > 1) {
		for (i = 1; i < longitud; ++i) {
			var tmpx = snake[i].x;
			var tmpy = snake[i].y;
			snake[i].x = oldx;
			snake[i].y = oldy;
			oldx = tmpx;
			oldy = tmpy;
		}
	}
	for (i=0; i < longitud; i++){
		draw(snake[i].x, snake[i].y, SIZE, color="green");
	}
}

function draw(x, y, SIZE, color) {
	ctx.beginPath();
	ctx.rect(x, y, SIZE, SIZE);
	ctx.fillStyle = color;
	ctx.fill();
}

function update() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if (snake[0].x == fruit.x && snake[0].y == fruit.y) {
		longitud = longitud + 1;
		control = false;
		updateFruit();
	}
	else draw(fruit.x, fruit.y, SIZE, color="red");
	speedup();
	updateSnake();
	if (snake[0].x >= WIDTH || snake[0].x < 0 || snake[0].y >= HEIGHT || snake[0].y < 0 ) {
		gameover = true;
	}
	var i = 1;
	while (!gameover && i < snake.length) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			gameover = true;
		}
		i++;
	}
	if (gameover) {
		clearInterval(interval);
		var img = document.getElementById("game");
		ctx.drawImage(img,-50,0);
		document.getElementById("btn").disabled = false;
	}
}

function speedup() {
	if (score % 3 == 0 && (!control)) {
		Level++;
		speed = speed - 20;
		if (speed <= 50) {
			speed = 50;
		}
		clearInterval(interval);
		interval = setInterval(update,speed);
		document.getElementById("level").innerHTML = "Level " + Level;
	}
}

window.onload = initialize;
window.onkeydown = function(new_event) {
	var code = new_event.keyCode;
	if(code == 37){
		if (right == 0) {
			left = 1;
		}
		up = 0;
		down = 0;
	}
	else if (code == 38) {
		if (down == 0){
			up = 1;
		}
		left = 0;
		right = 0;
	}
	else if (code == 39) {
		if (left == 0) {
			right = 1;
		}
		up = 0;
		down = 0;
	}
	else if (code == 40) {
		if (up == 0){
			down = 1;
		}
		left = 0;
		right = 0;
	}
}