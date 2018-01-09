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

var fightImg = new Image();
fightImg.src = "https://lh3.googleusercontent.com/uQSY57j3nUdapC34NGJMrkgOX2W9kzZINoZQokQbk8mJoUlLN_qa7h8uBMSOAa6m7mkqkyF1SY-v84DwEaREuaaLbzP32fVi1iPPvPceu84DgtUd3m_pc3dDFkfknA4jarGTDk6Djp_J-OpRtLf9GzefOhXiBGqkoQAS81yv_GonKF6Skwf6BUnHzWOopRcbpIErHkbIV1FedalCyrWNWjJwULVQVuQOVZGYkgDHofFxRGdyjgXG9sPiSqzqHpoSu7OKD91oz__NnbEXRaOeW7ul1FHaS0aa9MJba4e5cIG5JrGtDMAY_BwlTCUrvSeSUxHV0k596KEHZKmd7xZ2dVxms7wk-cguD4HcWdLu1PD0Z86hLZ6xXmFo1Lu_2QuOGPkqQ9hfkdB1KDklH5lvTbTyTXqAiYMIGXUWb8vZt4gsH4xyCCBwIgCCBy7fISAFnf3ZKGlFvnEZ7GzWYjuxcfTVoiM4JIXsUt-HtXNuNCeQPGWuemvqUWs-iiHZ3MM9uxzKlmWNf-6bHaNXBjLPDSGC08kRtiRyKh_8lrt2GekeGBdR6CNQQsmzn6X4e-IMoX6F403xCYyLmjm4_Ua_O4kxLBR6WfTH4yI6k1k=w1900-h1425-no";

var instructNotPressed = new Image();
instructNotPressed.src = "https://lh3.googleusercontent.com/wlNFWnscOHVuzF7_eCi9-hXcB_OR8U_YANz0MqcwRhnsy2rjSahwijI2SpI5QEHOnRwd-E167GgNmp9L6Qi-NVL9dro6p08c8hpvve9RVWo3xOfTb9_N_BH3v2jHSWu_VDmCzyuGB5zzkz0gHjcCSGNmT7bpOWl5zyomZ4rr8AbuIMll3WQSBGZwKfCSpoimFbFXsOB4oL6Wogp_9I9nsBQcD1VCv7i1AGpSSw312jhhlAwbLBb2-6Wvr-ADR3rS3yIInPkO3QvUUfdZuorPrPcXhBuFmyPUWrmXDtJXey_zmIJLWb_rxms4oL6s6_JUyJsrFChkOnNEb6iSruY7gSiNppFywjqTR_642m9uhMiYwPhhXuTyZ_9JnG6ZfAVhnnZIifR89RBv8aPYm5oMUKUljIGxlUBdI9GxVthuF3uf6m2IwuwfFYBGxOjyaraBD3mGhIJPFKd93nCCPBX6v91YKIggxqgDScWeZTCnSaes4dJDJK9okmf_TdjTsGUruxVkVSe9s0fXj29bI8JRdh1RebtCXuwgJYRAk518c-LnZs4mkMoyvb8XkdNRoXLRNY7cBsYd0DgKTS7iQ49vgmAUsV5ljrdfgf6q2SA=w2445-h1833-no";

var instructPressed = new Image();
instructPressed.src = "https://lh3.googleusercontent.com/YonwvqWLC6NewlutD940TN0xGkpinl5Y8psP-8RaFJyp8bA75c97MJAsvFtiOJgqWtBW0FZt1KfpYW_v_kAk3pDPj7lSobJwJ0-qXYRCE-hlBfHx16mKI4bJeJ1ZIY1PbLL7Im_Z3aBx02DL_6UvTANFEb9NG84xgBllRCDxD0uoaQmhT4RepJz0ab-hNsnP0J62XanKdh-6aeZPrkC2FJGWCYc4DrhkoIrQb7P-vUoD8HmWzMJq_mOKRLKXYAe16I0rwLPpyOt52XwwpJQl4j8i1rTquwvDh3l7q_9Qkl3_kh7qZfKb79sK9eQZBshES8XB5lJ63YgDJqmvvK-CWT1qOBdcMfHxwTBNUob53bZk8VLZ7YhAfI0N7c0trxub_aYIxorpW4ikIaNW8pxqCkxRdQMwBNAGeq8hArPvja7hgO69YN2JeulOSkWati-3Ws8TLInnmVDTt0TXAvfJgYVBv8fjOExiRCfqQzM53p7gsOaDRtK_K4-o2x_xSJSZ-_5HHfV4MV71ZTh7EfKCu-uEXIhIQ4qh9p0vOeOp2aVDWvtIXXpZFz4BqSsvULnIjrKVIHT0JPd3zraaZA_UCYw83Nk6r58KBehdBB0=w2445-h1833-no";


function instructionScreen()
{	
	var testCoords; // to be used for click detection on a canvas shape
	
	function checkCursorPositionOnClick(e)
	{ 
		function onCanvasClick(e) 
		{	
			//alert(getCursorPosition(e)); //use this to find coords of play button
		  	testCoords = getCursorPosition(e);
		  	if(testCoords[0] >= 300 && testCoords[0] <= 520 && testCoords[1] >=364 && testCoords[1] <=464) //play button coords
		  	{	
		  		//code goes here if click hits target
		  		setTimeout(function(){
		  			ctx.drawImage(instructPressed, 0,0, canvas.width, canvas.height);}, 0);
		  		setTimeout(function(){playGame();}, 500);
		  	};
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

		canvas.addEventListener("mouseup", onCanvasClick, false);
	};

	window.onload = function(){
		ctx.drawImage(instructNotPressed, 0,0, canvas.width, canvas.height);
		checkCursorPositionOnClick(canvas);	
	}
}

var requestAnimationFrame = window.requestAnimationFrame
var pos_x = 0;


function animateFight()
{
  
  pos_x += 25;
  if(pos_x-900 <= canvas.width){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
    ctx.drawImage(fightImg, pos_x - 900, canvas.height/2 - 100, 900, 600);
    requestAnimationFrame(animateFight);
}
  else{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
    ctx.font = "70px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Red: " +  String(spaceCounter), 10, 70);
	ctx.fillStyle = "blue";
	ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
	gameStart = true;
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
	ctx.font = "70px Arial";
	ctx.clearRect(0,0, canvas.width, canvas.height);
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
		spaceCounter += 1;
		sumos_x +=20
		animateDuringGame();
	}

	else if(key.keyCode == "13"){
		enterCounter += 1;
		sumos_x -= 20
		animateDuringGame();
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
			canvas.style.border = "5px solid #a500ff";
		};
	};
	

//Spits out the result depending on who wins
function compareSpaceEnter()
{
	if(spaceCounter > enterCounter){
		ctx.drawImage(redWinsImg, 0, 75, canvas.width, canvas.height);
	}
	else if(spaceCounter < enterCounter){
		ctx.drawImage(blueWinsImg, 0, 75, canvas.width, canvas.height);
	}
	else{
		ctx.drawImage(tieImg, 0, 75, canvas.width, canvas.height);
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
	countDown(14, "underCanvas"); //add x to desired time limit to allow for 123fight
};


instructionScreen(); //playGame is called

