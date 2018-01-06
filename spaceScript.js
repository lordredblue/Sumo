//spaceScript.js

// initialize canvas
var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");
var gameEnd = false;
var gameStart = false;

//initialize images 
var sumoImg = new Image();
var sumos_y = 55;
var sumos_x = 0;
sumoImg.src = "https://i.imgur.com/LFFjwSH.jpg";

var blueWinsImg = new Image();
blueWinsImg.src = "https://i.imgur.com/mW9e3oy.jpg";

var redWinsImg = new Image();
redWinsImg.src = "https://i.imgur.com/M9tZ30a.jpg";

var tieImg = new Image();
tieImg.src = "https://i.imgur.com/hP8aJl2.jpg";

var readyin3Img = new Image();
readyin3Img.src = "https://i.imgur.com/nMmcpSP.jpg";

var readyin2Img = new Image();
readyin2Img.src = "https://i.imgur.com/C1XK5Cu.jpg";

var readyin1Img = new Image();
readyin1Img.src = "https://i.imgur.com/k1Z2Wjz.jpg";

function loadInitialCanvas()
{  
	window.onload = function()
	{	
		setTimeout(function(){
			ctx.drawImage(readyin3Img, 0,0, canvas.width, canvas.height);
		}, 0);
		setTimeout(function(){
			ctx.drawImage(readyin2Img, 0,0, canvas.width, canvas.height);
		}, 1000);
		setTimeout(function(){
			ctx.drawImage(readyin1Img, 0,0, canvas.width, canvas.height);
		}, 2000);
		setTimeout(function(){	
			ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);
			ctx.font = "30px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("Red: " +  String(spaceCounter), 10, 50);
			ctx.fillStyle = "blue";
			ctx.fillText("Blue: " + String(enterCounter), 350, 50);
			gameStart = true;
		}, 3000);
	};	
};

//Number of keypresses tracker
var spaceCounter = 0; 
var enterCounter = 0;

function checkKeyPressed(key)
{ 	
	if(gameEnd || !gameStart){}

	else if(key.keyCode == "32"){
		spaceCounter += 1;
		sumos_x +=10
		ctx.font = "30px Arial";
		ctx.clearRect(0,0, 170, 60);
		ctx.fillStyle = "red";
		ctx.fillText("Red: " +   String(spaceCounter), 10, 50);
		ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);
	}

	else if(key.keyCode == "13"){
		enterCounter += 1;
		sumos_x -= 10
		ctx.font = "30px Arial";
		ctx.clearRect(340,0,200,60);
		ctx.fillStyle = "blue";
		ctx.fillText("Blue: " + String(enterCounter), 350, 50);
		ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);
	}

	changeBorderColor();
};

function changeBorderColor()
	{
		if(sumos_x < 0){
			canvas.style.border = "5px solid #004cff";
		};

		if(sumos_x > 0){
			canvas.style.border = "5px solid #ff2e00";
		};

		if(sumos_x == 0){
			canvas.style.border = "5px solid #000000";
		};
	};
	


//Spits out the result depending on who wins
function compareSpaceEnter()
{
	if(spaceCounter > enterCounter){
		ctx.drawImage(redWinsImg, 0, sumos_y, canvas.width, canvas.height);
	}
	else if(spaceCounter < enterCounter){
		ctx.drawImage(blueWinsImg, 0, sumos_y, canvas.width, canvas.height);
	}
	else{
		ctx.drawImage(tieImg, 0, sumos_y, canvas.width, canvas.height);
	}
};

//Timer
function countDown(secs, elem)
{
	var element = document.getElementById(elem);
	if(secs <= 10){
		element.innerHTML = "Time remaining: " + secs + " seconds";
	};

	secs--;
	var timer = setTimeout('countDown('+secs+',"'+elem+'")', 1000);
	
	if(secs < -1){
		clearTimeout(timer);
		element.innerHTML = '<h3>Game Over!</h3>'
		compareSpaceEnter();
		gameEnd = true;
		//code for what happens after countdown ends goes here
	};
	
};

//plays the game
function playGame()
{	
	loadInitialCanvas();
	window.addEventListener("keyup", checkKeyPressed, false);
	countDown(13, "underCanvas"); //add 3 to desired time limit to allow for 123go
};


playGame();



