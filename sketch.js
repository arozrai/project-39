var back
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var Time
var PLAY=1
var END=0
var NICE=-1
var gamo

function preload(){
  
  well=loadImage("obstacle.png")
  monkey_running = loadImage("ninja run.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  junglr=loadImage("jungle.jpg")
 
  gameoverImg=loadImage("gameOver.png")
}



function setup() {
  createCanvas(800,400)
  back=createSprite(30,20)
  back.addImage(junglr)
  back.scale = 2
  
  monkey=createSprite(50,200,50,50)
  monkey.addAnimation("RUN",monkey_running)
  monkey.scale=0.2
  monkey.velocityX=10
  
  FoodGroup=new Group()
  obstacleGroup=new Group()

  ground=createSprite(200,350,900,10)
  ground.velocityX=10
  ground.x=ground.width/2
  ground.visible=false
  console.log(ground.x)
  
  gameover=createSprite(300,100)
  gameover.addImage(gameoverImg)
  
  score=0
  Time=0
  
  gamo=PLAY
}


function draw() {
  background("white")
  if (gamo===PLAY){
    Time=0
    Time=frameCount
    back.velocityX = -3 
    gameover.visible=false
    if (back.x < 0){
      back.x = back.width/2;
    }
    rock()
    tasty()
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    monkey.velocityY=monkey.velocityY+0.8
    monkey.debug=true
    monkey.collide(ground)
    if (keyWentDown("space")){
      monkey.velocityY=-20
    }
    if (FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach()
      score=score+2
      monkey.scale=monkey.scale+0.01
    }
    if (obstacleGroup.isTouching(monkey)){
      monkey.scale=monkey.scale-0.01
    }
    if (monkey.scale<0.05){
      gamo=END
    }
    if (Time>=10000){
      gamo=NICE
    }
  }
  
  camera.position.x=camera.position.x+10
  
  if (camera.position.x%350===0){
    back.x=ground.x-170
    back.y=ground.y-330
  }
  
  drawSprites()
  fill("yellow")
  text("Score: "+score,ground.x-360,ground.y-310)
  text("time: "+Time,ground.x-360,ground.y-300)

  if (gamo===END){
    banana.velocityX=0
    banana.lifetime=-1
    rook.velocityX=0
    rook.lifetime=-1
    back.velocityX=0
    gameover.visible=true
    monkey.velocityY=0
    monkey.destroy()
    text("GAME OVER",ground.x-30,ground.y-200)
    if (keyWentDown("space")){
      oof()
    }
  }

  if (gamo===NICE){
    banana.velocityX=0
    banana.lifetime=-1
    rook.velocityX=0
    rook.lifetime=-1
    back.velocityX=0
    monkey.velocityY=0
    monkey.destroy()
    text("YOU WON!",ground.x-30,ground.y-200)
    if (keyWentDown("space")){
      oof()
    }
  }
}

function rock(){
  if(camera.position.x%1200===0){
    rook=createSprite(monkey.x+750,ground.y-20,20,20)
    rook.addImage(obstaceImage)
    rook.scale=0.1
    rook.velocityX=-4
    rook.lifetime=200
    obstacleGroup.add(rook)
  }
  
}
function tasty(){
  if(camera.position.x%50===0){
    banana=createSprite(monkey.x+750,ground.y-Math.round(random(0,300)),20,20)
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.lifetime=200
    FoodGroup.add(banana)
  }
}
function oof(){
  FoodGroup.destroyEach()
  obstacleGroup.destroyEach()
  score=0
  frameCount=0
  Time=0
  gamo=PLAY
  
}


