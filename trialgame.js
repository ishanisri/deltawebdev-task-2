var framecheck=60;
var myGamePiece;
var myObstacles = [];
var myScore;
var gameOver;
var count=0;
var mySound;
var myBackground;
var countDown;
var enemy=[];
var myBells;
var finalBell;
var flagSound=0;
var cycle=0;
var imgflag=0;


 function main(){
    
    myGameArea.clear();
    myGameArea.canvas.addEventListener("mousemove",move,false);

    
    console.log("mouse working");

    
    var x, height, gap, minHeight, maxHeight, minGap, maxGap,flag=0;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            
            flag=1;
            myGameArea.canvas.removeEventListener("mousemove", move);
             
            
            
            gameOver.text="GAME OVER\n"+myScore.text;
            myGameArea.frameNo=0;
            gameOver.update();
            console.log("hi");
            if(flagSound==1)
            {myBackground.stop();
                 mySound.play();

               }
            if(count===0)
            {
            var p=document.getElementsByTagName("p")[0];
            var btn=document.createElement("button");
           // Create a <button> element
            var t = document.createTextNode("Reset");       // Create a text node
            btn.appendChild(t);                                // Append the text to <button>
            p.appendChild(btn);
            btn.setAttribute("onclick","reset()"); 
            console.log("reset");
            btn.setAttribute("style","background-color:red;border:1;text-align: center;display: inline-block;font-size: 16px;color:white;width:100px;height:50px");
            count++;
           

            break;}
            
            return;
        } 
    }if(flag==0){
    
    
    myGameArea.frameNo += 1;
    
    if(myGameArea.frameNo%framecheck==0){
        x = myGameArea.canvas.width;
        minHeight = 50;
        maxHeight = 350;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 60;
        maxGap = 350;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

        myObstacles.push(new component(20, height, "pink", x, 0));
        myObstacles.push(new component(20, x - height - gap, "pink", x, height + gap));
        
        
        
        if(flagSound===1)
        myBackground.play();

            }
    
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
     myGamePiece = new component( 25,40,"green",10,500/2,"image");
     myScore = new component("50px", "Consolas", "white", 550, 40, "text");
     gameOver=new component("50px","Consolas","white",200,250,"text");
     countDown=new component("100px","Consolas","white",800/2-50,500/2,"text");
     mySound=new sound("explode.mp3");
     myBackground=new sound("running.mp3");
     myBells=new sound("bells.mp3");
     finalBell=new sound("final bell.mp3");
    
    
    if(window.confirm("do you want to play audio?"))
    { 
        init();
        myGameArea.start();
        flagSound=1;var count = 4;
function anim() {

    if (count >= 0) {
        myGameArea.clear();
        if(count>0)
        {countDown.text=count;
            myBells.play();}

    else
        {countDown.text="GO!";
         finalBell.play();
     }
    
        countDown.update();

        count--;
        setTimeout(anim, 2000);

    }
    else {myBackground.play();
    


    
    main();}
        
    }

anim();
}
else{ 
    init();
    flagSound=0;
    myGameArea.start();
    var count=4;
    function anim() {
    if (count >= 0) {
        myGameArea.clear();
        if(count>0)
        {countDown.text=count;
            }

    else
        {countDown.text="GO!";
         
     }
    
        countDown.update();

        count--;
        setTimeout(anim, 2000);

    }
    
    

 else
    
    main();
        
    }

anim();
}


}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
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
    var x1=x;
    var y1=y;
    
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



        }else if(this.type=="image")
        {
          init();
         cycle++;
         console.log(this.x,this.y);
         ctx.drawImage(image,this.x,this.y,25,40);
         console.log("image ");
       }

       else {
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
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y+this.height;
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





function move(event)
{     
        ctx=myGameArea.context;
        ctx.beginPath();
       ctx.clearRect(myGamePiece.x,myGamePiece.y,myGamePiece.width+myGamePiece.x,myGamePiece.width+myGamePiece.y);
        ctx.closePath();
        myGamePiece.x =event.clientX;
        myGamePiece.y=event.clientY;
        
    
        myGamePiece.update();
            
        myGamePiece.hitBottom();
       console.log("image loaded");

        
        

}

 function reset()  
 {
    myGameArea.canvas.removeEventListener("mousemove", move);
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


 function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


var image= new Image();
function init(){
    
    switch(cycle%100){
        case 0:
        case 50:
        image.src="stage1.jpg";
        break;
        case 10:
        case 60:
        image.src="stage2.jpg";
        break;
        case 20:
        case 70:
        image.src="stage3.jpg";
        break;
        case 30:
        case 80:
        image.src="stage4.jpg";
        break;
        case 40:
        case 90:
        image.src="stage5.jpg";
        break;}
    image.onload=function(){
        imgflag=1;

}}
