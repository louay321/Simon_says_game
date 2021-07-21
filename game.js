var buttonClrs = ["red", "blue", "green", "yellow"];
var userPattern = [];
var pattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function(){
  if(!started){
  $("h1").text("level "+level);
  nextSequence();
  started = true;
  }
});

$(".btn").click(function(){
  var userChosenColor = this.id;
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  verify(userPattern.length-1); //verify the answer of player.
});

function verify(currentLevel){
    if(pattern[currentLevel] == userPattern[currentLevel]){
      console.log("Gode jambe sahbé");
      if(userPattern.length == pattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
  }
  else{
    console.log("ya khasar ya shbesh y9ol fommi !");
    playSound("wrong");
    animateWrong();
    startOver();
  }
}
function nextSequence(){
  level++;
  $("h1").text("level "+level);
  var rand = Math.floor(Math.random()*4);
  var randSelected = buttonClrs[rand];
  pattern.push(randSelected);

  $('#'+randSelected).fadeOut(250).fadeIn(250);
  playSound(randSelected);
  userPattern = [];
}


function playSound(name){
  switch(name){
    case "red" :
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;
    case "blue" :
      var blueSound = new Audio('sounds/blue.mp3');
      blueSound.play();
      break;
    case "green" :
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;
    case "yellow" :
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;
    case "wrong" :
      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();
      break;
    default:
      alert("error, sound won't play.");
  }
}

function animatePress(currentColor){
  $('.'+currentColor).addClass("pressed");
  setTimeout(function(){
    $('.'+currentColor).removeClass("pressed");
  }, 100);
}

function animateWrong(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("GAME OVER, press any key to start again");
}
function startOver(){
  level = 0;
  started = false;
  pattern = [];
}
