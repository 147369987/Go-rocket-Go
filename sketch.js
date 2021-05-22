var space , spaceImg;
var obstacle , obstacleImg , obstaclesGroup;
var star , starImg , starsGroup;
var rocket ,rocketImg ;
var crashImg;
var gameState = "play";
var stars = 0 ;
var score = 0 ;
var starSound;
var gameOverSound;

function preload(){
spaceImg = loadImage ("space.jpg");
  obstacleImg = loadImage("obstacle.png");
  starImg = loadImage("star.png");
  rocketImg = loadImage("rocket.png")
  crashImg = loadImage("crash.jpg")
  starSound = loadSound("stars.wav")
 
 gameOverSound = loadSound("gameOver.wav")
  
  
  obstaclesGroup = new Group();
  starsGroup = new Group();
}

function setup() {
  createCanvas(600,600);
  
  space = createSprite (300,300)
  space.addImage("space", spaceImg);
  space.velocityY = 2;
  
  rocket = createSprite(200,200,50,50);
  rocket.addImage ("rocket", rocketImg);
  rocket.scale = 0.2 ;
  
  crash = createSprite(300,420);
  crash.addImage(crashImg);
  crash.scale = 0.3 ;
  
}

function draw() {
  background (0);
 
 camera.x =  rocket.x;
  
  
  if(space.y > 400){
    space.y = 300;
    
  }
  if(gameState === "play"){
    
   space.velocityY  = (2 + 2*score/150);
   crash.visible = false
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("left_arrow")){
   rocket.x = rocket.x - 5;
  }
   if(keyDown("right_arrow")){
    rocket.x = rocket.x + 5;
  }
   if(keyDown("space")){
    rocket.velocityY = -5;
     
  }
    
    
    if(starsGroup.isTouching(rocket)){
      starsGroup.destroyEach();
      
      stars = stars + 1
      starSound.play();
      
    }
  rocket.velocityY = rocket.velocityY + 0.8 ;
    
    if(obstaclesGroup.isTouching(rocket)||rocket.y > 600){
    rocket.velocityY = 0;
      rocket.destroy();
      gameState = "end" ;
       space.velocityY = 0;
      obstaclesGroup.destroyEach(); 
      starsGroup.destroyEach();
      gameOverSound.play();
     
      
    }
    
         
  spawnObstacles();
  spawnStars();
  }
  drawSprites();
  textSize(30);
  fill("yellow");
  text("Stars:"+ stars,10,30);
  
    fill ("yellow")
    textSize(30)
    
     text ("Score :"+ score , 10 , 70);
  
  if(gameState === "end"){
    crash.visible = true;
  stroke("orange")
  fill("orange")
  textSize (40);
  text ("Game Over  ", 230 , 200)
    text ("Your rocket has been crashed",50,250)
        
}
} 
 

function spawnObstacles(){
  if(frameCount% 240 === 0){
    obstacle = createSprite(200, -50)
    obstacle.addImage(obstacleImg);
    obstacle.x = Math.round(random(120,400));
    obstacle.scale = 0.2;
    obstacle.velocityY =  6 ;  
    obstacle.lifetime =800;
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnStars(){
  if(frameCount% 240 === 0){
    star = createSprite(200,-50)
    star.addImage(starImg);
    star.x = Math.round(random(120,420));
    star.scale = 0.1;
    star.velocityY = 3;  
    star.lifetime =800;
    starsGroup.add(star);
    
  }
}
