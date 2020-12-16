
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  //loading all images
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating the playground
  createCanvas(600,600);
  
  //creating all objects of the game & adding images
  ground=createSprite(100,550,800,10);
  //ground.velocityX=-4;
  
  monkey=createSprite(100,540,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.15;
  
  //survival time
  suvivalTime=0;
  
  //creating groups for food and obstacles
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  //underline the text with black colour
  stroke("black");
  //changing the text size in pixels
  textSize(20);
  //changing the text colour
  fill("black");
  
}

function draw() {
  //changing the background colour
  background(220);
  
  //survival time calculating 
  survivalTime=Math.ceil(frameCount/frameRate());
  //display text
  text("Survival Time:"+ survivalTime,camera.x,50);
  
  //reset the ground's position and making it infinite scrolling
  // if (ground.x < 0){
  //     ground.x = ground.width/2;
  // }

  ground.width += 20;

  monkey.velocityX = 5;
  camera.x = monkey.x;
  //camera.position.y = displayWidth/2;
  
  //jump monkey when the space key is pressed
  if(keyDown("space")) {
   monkey.velocityY=-12; 
  }
  
  // adding gravity
  monkey.velocityY=monkey.velocityY+0.6;
  
  //colliding the monkey with the ground
  monkey.collide(ground);
  
  //calling the functions for food and obstacles
  spawnFood();
  spawnObstacles();
  
  //display the objects on the screen
  drawSprites();
  
}

//creating food
function spawnFood() {
 if(frameCount%80===0) {
    banana=createSprite(650,100,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    //banana.velocityX=-5;
    banana.lifetime=80;
    banana.scale=0.15; 
   
    FoodGroup.add(banana);
 } 
}

//creating obstacles
function spawnObstacles() {
 if(frameCount%250===0) { 
   obstacle=createSprite(650,510,20,20); 
   obstacle.addImage(obstacleImage); 
   //obstacle.velocityX=-5;
   obstacle.scale=0.18;
   obstacle.lifetime=80;
   
   obstacleGroup.add(obstacle);
 } 
}