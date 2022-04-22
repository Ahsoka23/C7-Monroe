var ball;
var score = 0;
var lives = 3;
var gamestate = "serve";
var paddle
var bricks 

function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}


function checker(a){

  //AND 
  /*if (a>3 && a<6 && a%2==0){
    console.log("correct number"); 
  }
*/
  //OR


}

function setup(){



  ball = createSprite(200,200,10,10);
  ball.shapeColor="white";

    paddle = createSprite(200, 350, 120, 10);
    paddle.shapeColor = "blue";
    createEdgeSprites();
    bricks = createGroup();

    createBrickRow(65, "red");
  createBrickRow(65+29, "orange");
  createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");
}



function draw() {
  background("black");
  drawSprites();
  console.log(ball.velocityY);
  textSize(20);
  text("Score: "+score,40,25);
  text("Lives: "+lives, 40, 45);
  
  if(gamestate == "serve"){
    text("Click space to start", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate =="end") {
    text("Game Over!", 150, 250);
    ball.remove;
  }
  else {
    gameplay();
  }
  
}

function keyPressed()
{
  if (keyCode === 32){
    ball.velocityX = 10;
    ball.velocityY = 6;
    
    if(gamestate == "serve"){
      gamestate = "play";
      ball.velocityY = -7;
      ball.velocityX = -7;
    }
    
  }
  
}

function brickHit(ball, brick) {
 brick.remove();
 score = score+5;

if(ball.velocityY<12 && ball.velocityY>-12){
  ball.velocityX*=1.05
  ball.velocityY*=1.05
}


}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
  }
}

function gameplay(){
  paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }

  var edges= createEdgeSprites(); 
  ball.bounceOff(edges);
  //rotation = rotation + 5;
  /*ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);*/
  
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    //playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("¡Ganaste!");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("You win!",150,200);
  }
  if(ball.y>400) {
    lifeover();
  }
}