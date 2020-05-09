var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, obstaclesGroup;
var cloudImg,ob1,ob2,ob3,ob4,ob5,ob6
var restart,gameover;
var restartImg,gameoverImg;
var score;
var PLAY,END,gameState;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImg=loadImage("cloud.png");
  
  
  ob1=loadImage("obstacle1.png");  
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
  restartImg=loadImage("restart.png");
  
  gameoverImg=loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  score=0;
  
  obstaclesGroup=createGroup();
  cloudsGroup=createGroup();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameoverImg)
  gameover.visible=false;
  
  restart=createSprite(300,140,10,10);
  restart.addImage(restartImg);
  restart.scale=0.6;
  restart.visible=false;
}

function draw() {
  background(255); 
  
  text("Score: "+score,450,50);
    
  
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60);
  
    spawnClouds();
    spawnObstacles();

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (trex.y>=161){
      if(keyDown("space")) {
      trex.velocityY = -10;
      }
    }
    
    trex.velocityY = trex.velocityY + 0.8;
  
    if(obstaclesGroup.isTouching(trex)){
    gameState=END;   
    }
    
  }
  
  else if(gameState===END){
    trex.velocityY=0;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    gameover.visible=true;
    restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
   reset() 
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    cloudsGroup.add(cloud)
    
  
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1);
      break;
      
      case 2: obstacle.addImage(ob2);
      break;
      
      case 3: obstacle.addImage(ob3);
      break;
      
      case 4: obstacle.addImage(ob4);
      break;
      
      case 5: obstacle.addImage(ob5);
      break;
      
      case 6: obstacle.addImage(ob6);
      break;
      
      default: break      
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 105;
        obstaclesGroup.add(obstacle);
        
  }
}

  function reset(){
    gameover.visible=false;
    restart.visible=false;
    score=0;
    gameState=PLAY
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trex_running)
    
  }
  