var monkey , monkeyImage;
var banana ,bananaImage;
var obstacle, obstacleImage;
var ground , groundImage;
var bananaGroup, obstacleGroup;
var survival_time = 0;
var gameState = "play";
var score = 0;

function preload(){
  
  monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(400,400);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(0,375,800,10);
  ground.shapeColor = "black";
  monkey = createSprite(60,340,10,10);

}

function draw() {
  
  background(51,206,223);
  
  textSize(20);
  fill("black");
  text("Survival Time : " + survival_time , 20 , 25);
  
  text("score : " + score , 310,25);
  
  monkey.addAnimation("monkeyImage" , monkeyImage);
  monkey.scale = 0.1;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    
    bananaGroup.destroyEach();
    score = score + 1;
    
  }
  
  if(gameState === "play"){
    
   if(keyDown("space") && monkey.y >= 339){
    
    monkey.velocityY = -13;
     
   }
    
    if(monkey.isTouching(obstacleGroup)){
    
    gameState = "end";
    
  }
    
    survival_time = survival_time + Math.round(getFrameRate()/60);
    
    }
    
  if(gameState === "end"){
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    bananaGroup.velocityX = 0;
    bananaGroup.velocityY = 0;
    
    obstacleGroup.velocityX = 0;
    obstacleGroup.velocityY = 0;
    
    monkey.visible = false;
    ground.visible = false;
    
    fill("black");
    text("GAMEOVER" , 150 ,200);
    
  }
    
  monkey.velocityY = monkey.velocityY + 0.3;
  
  ground.velocityX = -3;
  
  if(ground.x<0){
    
    ground.x = ground.width/2;
  
  }
  
  bananas();
  obstacles();
   
  drawSprites(); 
  
}

function bananas(){
  
  if(frameCount  % 80 === 0 ){
    
    banana = createSprite(570,100,13,13);
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -(4 + survival_time/150);
    banana.lifetime = 150;
    
    banana.y = Math.round(random(50,370));
    
    bananaGroup.add(banana);
  
 }
  
}

function obstacles(){
  
  if(frameCount % 300 === 0){
    
    obstacle = createSprite(370,352,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(5 + 2 * (score/150));
    obstacle.lifetime = 120;
    
    obstacleGroup.add(obstacle);  
    
  }
  
}






