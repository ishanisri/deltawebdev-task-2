




var framecheck=20;
var myGamePiece;
var myObstacles = [];
var myScore;
var gameOver;
var count=0;

 function main(){
    myGameArea.clear();
    
    var x, height, gap, minHeight, maxHeight, minGap, maxGap,flag=0;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            //myGameArea.clear();
            myGameArea.canvas.removeEventListener("mousemove", move);
              flag=1;
            gameOver.text="GAME OVER\n"+myScore.text;
            myGameArea.frameNo=0;
            gameOver.update();
            console.log("hi");
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
            count++;

            break;}
            
            return;
        } 
    }if(flag==0){
    
    
    myGameArea.frameNo += 1;
    
    if(myGameArea.frameNo%framecheck==0){
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

        myObstacles.push(new component(10, height, "pink", x, 0));
        myObstacles.push(new component(10, x - height - gap, "pink", x, height + gap));}
    
    for (i = myObstacles.length-1; i >0; i -= 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + Math.floor(myGameArea.frameNo/framecheck);
    myScore.update();
    myGamePiece.update();

    
}

    
    if(myGameArea.frameNo>=0)
    window.requestAnimationFrame(main);
 }




function startGame() {
    myGamePiece = new component( 5,"true","green",10,270/2,"circle");
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    gameOver=new component("30px","Consolas","white",10,160,"text");
    myGameArea.start();
    main();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        
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
    this.x = x;
    this.y = y;
    
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
    
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
           
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




myGameArea.canvas.addEventListener("mousemove",move,false);
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

        
        

}

 function reset()  
 {
    
    myGameArea.frameNo=0;
    myScore.text="SCORE:"+myGameArea.frameNo;
    myObstacles=[];

    var button=document.getElementsByTagName("button")[0];
    button.parentNode.removeChild(button);
    var canvas=document.getElementsByTagName("canvas")[0];
    canvas.parentNode.removeChild(canvas);

    count=0;
    startGame();
    console.log("hello");

    
 }  
 
