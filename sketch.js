var PLAY = 1;
var END= 0;
var gameState = PLAY;

var hero, hero_running;
var background, invisibleground, backgroundImg;
var stoneObstacle;
 var gameOverImg,restartImg;

function preload(){
    hero_running = loadAnimation("dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-0-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-1-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-2-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-3-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-4-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-5-removebg-preview.png","dchxet4-32ccdf6c-8baf-47ce-8451-e7e070ea6fc9-6-removebg-preview (1).png");
    backgroundImg = loadImage("forest.jpg");
    stoneObstacle = loadImage("image-removebg-preview.png");
    restartImg = loadImage("restart.webp");
    gameOverImg = loadImage("game_over-removebg-preview.png")
}

function setup() {
 createCanvas(600,200);

 hero = createSprite(50,160,20,50);
 hero.addAnimation("running", hero_running);
 hero.scale = 0.4;
 
 background = createSprite(300,100,600,200)
 background.addImage("back",backgroundImg);
 background.x = background.width/2;

 gameOver = createSprite(300,150);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(300,200);
 restart.addImage(restartImg);
 
 gameOver.scale = 0.5;
 restart.scale = 0.5;

 invisibleground = createSprite(200,190,400,10);
 invisibleground.visible = false;

 stoneObstaclesGroup = createGroup();
}

function draw() {
 
 if(gameState === PLAY){
     gameOver.visible = false;
     restart.visible = false;
     
     background.velocityX = -(4 + 3);

     if (background.x < 0) {
        background.x = background.width/2;
    } 

    if(keyDown("space")&& hero.y >= 100) {
        hero.velocityY = -12;
        jumpSound.play();
    }
    
    hero.velocityY = hero.velocityY + 0.8

    if(stoneObstaclesGroup.isTouching(hero)){
        gameState = END;
    }
}
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    background.velocityX = 0;
    hero.velocityY = 0;

    stoneObstaclesGroup.setLifetimeEach(-1);

    stoneObstaclesGroup.setVelocityEach(0);

    if(mousePressedOver(restart)) {
        reset();
    }    

  }

  hero.collide(invisibleground);
  
  drawSprite();
}

function reset(){
    gameState=PLAY
    stoneObstaclesGroup.destroyEach();
    gameOver.visible=false
    restart.visible=false
    hero.changeAnimation("running")
  }

  
  function spawnstoneObstacles(){
    if (frameCount % 60 === 0){
      var stoneObstacle = createSprite(600,165,10,40);
      stoneObstacle.velocityX = -(6);
                
       stoneObstacle.scale = 0.5;
       stoneObstacle.lifetime = 300;
      
       stoneObstaclesGroup.add(stoneObstacle);
    }
   }