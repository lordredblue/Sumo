var gameserver = new Aθεος.Iρις();
gameserver.Start(11, location.hostname+"sumo");


//spaceScript.js


// initialize canvas
var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");

var toolCanvas = document.getElementById("toolbar");
var toolCtx = toolCanvas.getContext("2d");

var gameEnd = false;
var gameStart = false;
var playClick = true;


//initialize images 
var sumoImg = new Image();
var sumos_y = 0;
var sumos_x = 0;
sumoImg.src = "images/Wrestlers.png";

var backgroundImg = new Image();
backgroundImg.src = "images/Background.png";

var blueWinsImg = new Image();
blueWinsImg.src = "images/WinnerBN.png";

var redWinsImg = new Image();
redWinsImg.src = "images/WinnerRN.png";

var tieImg = new Image();
tieImg.src = "images/WinnerNN.png";

var readyin3Img = new Image();
readyin3Img.src = "images/readyin3.jpg";

var readyin2Img = new Image();
readyin2Img.src = "images/readyin2.jpg";

var readyin1Img = new Image();
readyin1Img.src = "images/readyin1.jpg";

var fightImg = new Image();
fightImg.src = "images/Fight_1.png";

var instructNotPressed = new Image();
instructNotPressed.src = "images/Instructions_UP.png";

var instructPressed = new Image();
instructPressed.src = "images/Instructions_P.png";

var replayImgNotPressed = new Image();
replayImgNotPressed.src = "images/PlayAgain_UP.png";

var replayImgPressed = new Image();
replayImgPressed.src = "images/PlayAgain_P.png";

var barFill = new Image();
barFill.src = "images/Bar_Fill.png";

var barBG = new Image();
barBG.src = "images/Bar_BG.png";

var patched_playGame = gameserver.Patch(playGame);
var patched_Reload = gameserver.Patch(function(){
	gameserver.Purge();
	location.reload();
});

var patched_Hit_Left=gameserver.Patch(function(){
	spaceCounter+=1;
	sumos_x +=20;
	animateDuringGame();
	changeBorderColor();
});

var patched_Hit_Right=gameserver.Patch(function(){
	enterCounter+=1;
	sumos_x -=20;
	animateDuringGame();
	changeBorderColor();
});


function instructionScreen()
{	
	var testCoords; // to be used for click detection on a canvas shape
	
	function checkCursorPositionOnClick(e)
	{ 
		function onCanvasClick(e) 
		{	
			//alert(getCursorPosition(e)); //use this to find coords of play button
		  	testCoords = getCursorPosition(e);

		  	if(playClick && testCoords[0] >= 300 && testCoords[0] <= 520 && testCoords[1] >=364 && testCoords[1] <=464) //play button coords
		  	{	
		  		//code goes here if click hits target
		  		setTimeout(function(){
		  			ctx.drawImage(instructPressed, 0,0, canvas.width, canvas.height);}, 0);
		  		playClick = false;
		  		setTimeout(patched_playGame, 1000);

		  	};
		  	//replay button
		  	if(testCoords[0] >= 735 && testCoords[0] <= 793 && testCoords[1] >=550 && testCoords[1] <=600){
		  		
		  		toolCtx.clearRect(0,0,toolCanvas.width, toolCanvas.height);
		  		setTimeout(function(){
		  			toolCtx.drawImage(replayImgPressed, toolCanvas.width-120, 0, toolCanvas.height, toolCanvas.height);}, 0);

		  		setTimeout(patched_Reload,500);
		  	}

			  //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
			  {
		  		if(gameEnd || !gameStart){}

		  		//red
		  		else if(testCoords[0]<=window.innerWidth/2){patched_Hit_Left();}
		  		//blue 
		  		else if(testCoords[0]> window.innerWidth/2){patched_Hit_Right();}

		  	}
		};
		 
		function getCursorPosition(e) 
		{
		  	var x;
		    var y;
		    if (e.pageX != undefined && e.pageY != undefined) {
				x = e.pageX;
				y = e.pageY;
		    }
		    else {
				x = e.clientX + document.body.scrollLeft +
		            document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
		            document.documentElement.scrollTop;
		    }
		  	x -= canvas.offsetLeft;
		    y -= canvas.offsetTop;
		    
		    return [x,y];
		};
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			window.addEventListener("click", onCanvasClick, false);
		}

		canvas.addEventListener("mouseup", onCanvasClick, false);
		toolCanvas.addEventListener("mouseup", onCanvasClick, false);
	};

	window.onload = function(){
		ctx.drawImage(instructNotPressed, 0,0, canvas.width, canvas.height);
		toolCtx.drawImage(replayImgNotPressed, toolCanvas.width-120, 0, toolCanvas.height, toolCanvas.height);
		checkCursorPositionOnClick(canvas);	

		
	}
}

var requestAnimationFrame = window.requestAnimationFrame
var pos_x = 0;


function animateFight()
{
  pos_x += 15;

  if(0+pos_x <= canvas.width/2){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
    ctx.drawImage(fightImg, 0+pos_x, 0, canvas.width-2*pos_x, canvas.height);
    requestAnimationFrame(animateFight);
}
  else{

  	ctx.font = "70px Joti One";
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillText("Red: " +  String(spaceCounter), 10, 70);
	ctx.fillStyle = "blue";
	ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
	gameStart = true;
	animateTimer();
	
  }
}


function loadInitialCanvas()
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
			animateFight();
		}, 3000);
		
};

function animateDuringGame()
{
	ctx.font = "70px Joti One";
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
	ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillText("Red: " +   String(spaceCounter), 10, 70);
	ctx.fillStyle = "blue";
	ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
}

//Number of keypresses tracker
var spaceCounter = 0; 
var enterCounter = 0;


function checkKeyPressed(key)
{ 	
	if(gameEnd || !gameStart){}

	else if(key.keyCode == "32"){
		patched_Hit_Left()
	}

	else if(key.keyCode == "13"){
		patched_Hit_Right();
	}

	
};

function changeBorderColor()
	{
		if(sumos_x < 0){
			canvas.style.border = "5px dashed #004cff";

		};

		if(sumos_x > 0){
			canvas.style.border = "5px dashed #ff2e00";
		};

		if(sumos_x == 0){
			canvas.style.border = "5px dashed #000000";
		};
		//toolCanvas.style.border = canvas.style.border;
	};
	
//Spits out the result depending on who wins
function compareSpaceEnter()
{
	if(spaceCounter > enterCounter){
		var text_y = 70;
		var endSize;

		function animateRedText(){
		  text_y += 20;
		  
		  if(text_y <= 850){
		    ctx.clearRect(0,0,canvas.width, canvas.height);
		    ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
		    ctx.drawImage(redWinsImg, 0, sumos_y, canvas.width, canvas.height);

		    if(text_y-70<=110){
		    	endSize = text_y-70;
		    }
		    ctx.font = String(endSize) + "px Joti One";
		    ctx.fillStyle = "red";
		    ctx.fillText("Red: " + String(spaceCounter), 10, 70+text_y);
		    ctx.font = "70px Joti One";
		    ctx.fillStyle = "blue";
			ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
		    
		    requestAnimationFrame(animateRedText);
		  }

		}

		animateRedText();
		
	}

	else if(spaceCounter < enterCounter){
		var text_y = 70;
		var endSize;
		function animateBlueText(){
		  text_y += 20;
		  
		  if(text_y <= 850){
		    ctx.clearRect(0,0,canvas.width, canvas.height);
		    ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
		    ctx.drawImage(blueWinsImg, 0, sumos_y, canvas.width, canvas.height);

		    if(text_y-70<=110){
		    	endSize = text_y-70;
		    }
		    ctx.font = String(endSize) + "px Joti One";
		    ctx.fillStyle = "blue";
		    ctx.fillText("Blue: " + String(enterCounter), 900, 70+text_y);
		    ctx.font = "70px Joti One";
		    ctx.fillStyle = "red";
			ctx.fillText("Red: " + String(spaceCounter), 10, 70);
		    
		    requestAnimationFrame(animateBlueText);
		  }

		}

		animateBlueText();
	}

	else{
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
		ctx.drawImage(tieImg, 0, sumos_y, canvas.width, canvas.height);
		ctx.fillStyle = "red";
		ctx.fillText("Red: " +   String(spaceCounter), 10, 70);
		ctx.fillStyle = "blue";
		ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
	}
};

var reduce = toolCanvas.width;

function animateTimer()
{
	 reduce-=2.088;
	 if(reduce-83-110>= 0){
		  toolCtx.clearRect(0,0,toolCanvas.width-110,toolCanvas.height);
		  toolCtx.drawImage(barBG,0,0,toolCanvas.width-110, toolCanvas.height);
		  toolCtx.drawImage(barFill,60,9,reduce-83-110, toolCanvas.height-21);
		     window.requestAnimationFrame(animateTimer);
		 }
	else{
	  toolCtx.clearRect(0,0,toolCanvas.width-110,toolCanvas.height);
	  toolCtx.drawImage(barBG,0,0,toolCanvas.width-110, toolCanvas.height);
	  toolCtx.drawImage(barFill,60,9,0, toolCanvas.height-21);
	  toolCtx.font = "40px Joti One";
	  toolCtx.fillStyle = "white";
	  toolCtx.fillText("Game Over!", toolCanvas.width/2 - 120,toolCanvas.height/2+15);
	  compareSpaceEnter();
	  gameEnd = true;
	}
}


//plays the game
function playGame()
{	
	loadInitialCanvas();
	window.addEventListener("keyup", checkKeyPressed, false);
	
};

instructionScreen(); //playGame is called

