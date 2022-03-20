// all constants and variables

let inputDir = {x:0, y:0};
let foodsound = new Audio('food.mp3');
let gameoversound  = new Audio('gameover.mp3');
let movesound =new Audio('move.mp3');
let musicsound = new Audio('music.mp3');
let speed =10;
let score =0;
let lastPaintTime=0;
let snakeArr = [{x:3, y:13}]
food = { x: 6, y:7};

// all functions
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime);

   if((ctime-lastPaintTime)/1000<1/speed)
    {
     return;
    }
  lastPaintTime = ctime;
  gameEngine();
}

function iscolide(snake){
  // if you bump into urself
  for (let i = 1; i < snakeArr.length; i++) {
    if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
    return true;
  }
  // if it collides with wall
  if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
  return true;
}

function gameEngine(){
    // part: updating the snake array and food
    if(iscolide(snakeArr)){
     gameoversound.play();
     musicsound.pause();
      inputDir = {x:0, y:0};
      alert('GAME OVER. Press any key to play again!');
      snakeArr = [{x:13, y:15}]
    //  musicsound.play()
     score= 0;
     
    }

    // if snake has eaten the food , increment the score and regenerate the food
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x ){
      foodsound.play();
      score+=1;
      if(score>hiscore){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
        hiscorebox.innerHTML = "highest score:"+  hiscoreval;

      }
      scorebox.innerHTML = "SCORE:" + score;
      snakeArr.unshift({ x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
      let a=2;
      let b=16;
      food = { x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) }
    }
    // moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
      snakeArr[i+1]={...snakeArr[i]};
      console.log("abc");
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // part 2: display of snake and food
    // display of snake
    board.innerHTML =  " ";
    snakeArr.forEach((e,index) => {
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if(index==0){
      snakeElement.classList.add('head');
      }
      else{
        snakeElement.classList.add('snake');
      }
      board.appendChild(snakeElement);
    });

    // display of food
    foodElement = document.createElement('div');
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add('food');
      board.appendChild(foodElement);
}





// main logic starts here
let hiscore = localStorage.getItem("hiscore")
if(hiscore== null){
  hiscoreval=0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
  hiscoreval=JSON.parse(hiscore)
  hiscorebox.innerHTML = "highest score:"+  hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
inputDir = {x:0 , y:1}  //start the game
movesound.play();
switch (e.key) {
  case "ArrowUp":
   console.log("ArrowUp");
   inputDir.x = 0;
   inputDir.y = -1;
    break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
       break;

       case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
         break;

         case "ArrowRight":
          console.log("ArrowRight");
          inputDir.x = 1;
          inputDir.y = 0;
           break;
  default:
    break;
}
});