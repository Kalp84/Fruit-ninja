//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var over, enemy, fruit, fruit_group, enemy_group;
var  alien_group,  fruit1, fruit2, fruit3, fruit4, gameoverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
   fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
  alien_group = loadAnimation("alien1.png","alien2.png");
  gameoverImage= loadImage("gameover.png");
  
  knife_voice = loadSound("knife_voice.mp3");
 game_end_voice = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.9
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,20,130);
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    enemy();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if (fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
       knife_voice.play();
      score = score + 2
      
    }
    else
  {
   if (enemyGroup.isTouching(knife)){
     gameState = END;
     game_end_voice.play();
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     
     knife.addImage(gameoverImage);
     knife.x = 300;
     knife.y = 300;
   }
      
        
      }
    
    
      
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
function fruits(){
    if(World.frameCount%80===0){
      position = Math.round(random(1,2));
      
      
    fruit = createSprite(400,200,20,20);
      console.log(position);
      fruit.scale = 0.2;
     
     if(position == 1)
      {
      fruit.x = 400;
       fruit.velocityX  = -(7 + (score/4));
      
      }
      else
      {
        if(position == 2){
          fruit.x = 0;
          fruit.velocityX = (7 +(score/4));
        }
        }   
        
       fruit.scale = 0.2;
       fruit.debug = false;
    
    
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    //fruit.setLifetime = 100;
    //fruit.velocityX = -4;
    fruitGroup.add(fruit)
  
}
}

function enemy(){
  if(World.frameCount %200 === 0){
    virus = createSprite(400,200,20,20);
    virus.addAnimation("moving",alien_group);
    virus.y = Math.round(random(100,300));
    virus.velocityX = -(8 + (score/10));
    virus.setLifetime = 50;
    
    enemyGroup.add(virus);
  }
}
