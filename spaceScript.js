//spaceScript.js

// initialize canvas
var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");
var gameEnd = false;

//initialize images 
var sumoImg = new Image();
var sumos_y = 55;
var sumos_x = 0;
sumoImg.src = "https://i.imgur.com/LFFjwSH.jpg";
ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);

var blueWinsImg = new Image();
blueWinsImg.src = "https://i.imgur.com/mW9e3oy.jpg";

var redWinsImg = new Image();
redWinsImg.src = "https://i.imgur.com/M9tZ30a.jpg";

var tieImg = new Image();
tieImg.src = "https://i.imgur.com/hP8aJl2.jpg";

//Number of keypresses tracker
var spaceCounter = 0;
var enterCounter = 0;

function checkKeyPressed(key)
{ 	
	if(gameEnd){}

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
	element.innerHTML = "Time remaining: " + secs + " seconds";
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
	window.addEventListener("keyup", checkKeyPressed, false);
	countDown(10, "underCanvas");
};

playGame();



