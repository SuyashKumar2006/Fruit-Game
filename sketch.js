var fruit,fruitGroup;
var xPos,yPos;
var fruit1Img,fruit2Img,fruit3Img,fruit4Img;
var sword,swordImg;
var score=0;
var aand,rand;
var enemy,enemyGroup;
var PLAY,END;
var gameState;

function preload(){
  
  fruit1Img=loadImage("fruit1.png");
  fruit2Img=loadImage("fruit2.png");
  fruit3Img=loadImage("fruit3.png");
  fruit4Img=loadImage("fruit4.png");
  
  swordImg=loadImage("sword.png");
  swordSound=loadSound("knifeSwooshSound.mp3");
 
  gameOverImg=loadImage('gameover.png');
  gO=loadSound("gameover.mp3");
  
  enemyImg=loadImage("alien1.png");
  enemy2Img=loadImage("alien2.png");
}
function setup(){
  createCanvas(500,600)
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordImg);
  sword.scale=0.95;  
  
  gameOver=createSprite(250,300,300,300);
  gameOver.scale=2.35;
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible=false;
  
  PLAY=1;
  END=0;
  
  gameState=PLAY;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
}
function draw(){
background("lightblue")
  
    sword.debug=true;
  sword.setCollider("circle",1,8,70)
  if(gameState===PLAY){
   
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
    gameOver.visible=false;
  if(sword.isTouching(fruitGroup)){
    
    aand=Math.round(random(1,3));
    fruitGroup.destroyEach();
    swordSound.play();
    score=score+aand;
    
    console.log(aand);
  } 
    
    fruits();
    enemies();
    

   if(sword.isTouching(enemyGroup)){
     gameState=END;
     gO.play();
     enemyGroup.setVelocityXEach(0);
     fruitGroup.setVelocityXEach(0);
   }
  }else if(gameState===END){
    
    fruit.lifetime=-1;
    enemy.lifetime=-1;
    gameOver.visible=true;
    fill("red");
    textSize(25);
  text("Press 'R' to restart the Game",100,50);
    if(keyDown("r") ){
            gameState===PLAY;
      reset();

    }
  } 
  
    drawSprites();
  
  fill("green");
  textSize(25);
  text("Score:"+" "+score,400,40);
  
}
function fruits(){
  
    yPos=Math.round(random(10,550));
    xPos=Math.round(random(1,10));
  
  if(frameCount%85===0){   
    
    fruit=createSprite(xPos,yPos,20,20);
    fruit.velocityX=5;
    fruit.lifetime=100;
    fruit.scale=0.225;
    fruitGroup.add(fruit);
    
  var rand=Math.round(random(1,4));
    switch(rand){
    case 1 : fruit.addImage(fruit1Img);
        break;
    case 2 : fruit.addImage(fruit2Img);
        break;
    case 3 : fruit.addImage(fruit3Img);
        break;
    case 4 : fruit.addImage(fruit4Img);
        break;
    
    default:break;
    }
    
  }
}
function enemies(){

var yEne=Math.round(random(10,550));
  if(frameCount%50===0 && frameCount%30===0)
 {
  enemy=createSprite(610,yEne,20,20);
  enemy.velocityX=-7;
  enemyGroup.add(enemy); 
  enemy.lifetime=80; 
   enemy.debug=true;
   var and=Math.round(random(1,2));
    switch(and){
    case 1 : enemy.addImage(enemyImg);
        break;
    case 2 : enemy.addImage(enemy2Img);
        break;
 
    default:break;
    }
 }
  
}
function reset(){
  score=0;
  enemyGroup.destroyEach();
  fruitGroup.destroyEach();
  gameState=PLAY;
}