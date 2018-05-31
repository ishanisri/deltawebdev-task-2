

/*var	canvas=document.getElementById("myCanvas");
var	ctx=canvas.getContext("2d");
	//canvas_width:
	//canvas_height:
const canvas_width="580";
const canvas_height="320";





function startGame()
{
    ctx.beginPath();
	ctx.rect(20, canvas_height/2, 20, 20);
	ctx.fillStyle = "green";
	ctx.fill();

}*/



var myGamePiece;
var myObstacles = [];
var myScore;
var gameOver;
var count=0;


function startGame() {
    myGamePiece = new component( 5,"true","green",10,270/2,"circle");
    //myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    gameOver=new component("30px","Consolas","white",10,160,"text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    //this.speedX = 0;
    //this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if(this.type=="circle"){
        	ctx.beginPath();
        	ctx.moveTo(this.x,this.y);
        	ctx.arc(this.x,this.y,this.width,0,Math.PI*2,true);
        	ctx.closePath();
        	ctx.fillStyle=color;
        	ctx.fill();



        }else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    /*this.newPos = function() {
        //this.gravitySpeed += this.gravity;
        this.x =event.clientX;
        //this.y += this.speedY + this.gravitySpeed;
        this.y=event.clientY;
        this.hitBottom();
    }*/
   /* this.move=function(event){
    	
    	ctx=myGameArea.context;
    	ctx.clearRect(this.x,this.y,this.width,this.height);
    	this.x =event.clientX;
    	this.y=event.clientY;
    	ctx.fillRect(this.x,this.y,this.width,this.height);
    	ctx.fillStyle=color;

    }*/
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
           // this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x-this.width;
        var myright = this.x + (this.width);
        var mytop = this.y+this.width;
        var mybottom = this.y + (this.width);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
        	myGameArea.clear();
        	gameOver.text="GAME OVER\n"+myScore.text;
        	gameOver.update();
        	
        	if(count===0)
        	{
        	var p=document.getElementsByTagName("p")[0];
        	var btn=document.createElement("button");
	       // Create a <button> element
			var t = document.createTextNode("Reset");       // Create a text node
			btn.appendChild(t);                                // Append the text to <button>
			p.appendChild(btn);
			btn.setAttribute("onclick","reset()"); 
			btn.setAttribute("style","background-color:red;border:1;text-align: center;display: inline-block;font-size: 16px;color:white;width:100px;height:50px");
		    count++;}
            
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "pink", x, 0));
        myObstacles.push(new component(10, x - height - gap, "pink", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    //myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


myGameArea.canvas.addEventListener("mousedown",move,false);
function move(event)
{
	ctx=myGameArea.context;
	    ctx.beginPath();
    	ctx.clearRect(myGamePiece.x-myGamePiece.width,myGamePiece.y-myGamePiece.width,myGamePiece.width*2,myGamePiece.width*2);
    	ctx.closePath();
    	myGamePiece.x =event.clientX;
    	myGamePiece.y=event.clientY;
    	ctx.moveTo(myGamePiece.x,myGamePiece.y);
    	myGamePiece.update();
    	myGamePiece.hitBottom();

    	//ctx.fillRect(myGamePiece.x,myGamePiece.y,myGamePiece.width,myGamePiece.height);
    	

}

 function reset()  
 {
 	startGame();
 	myGameArea.frameNo=1;
 	
 	var element=document.getElementsByTagName("button")[0];
 	element.parentNode.removeChild(element);

 	count=0;
 	countReset=0;
 }  
 

/*function accelerate(n) {
    myGamePiece.gravity = n;
}*/