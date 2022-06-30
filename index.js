var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChoosenPattern = [];
var started = 0;
var level = 0;
$(document).keypress(function () {
  if (started === 0) {
    nextSequence();
    started++;
  }
});
$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userChoosenPattern.push(userChoosenColor);
  animatePressed(userChoosenColor);
  playSound(userChoosenColor);
  checkAnswer(userChoosenPattern.length - 1);
});
function nextSequence() {
  userChoosenPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(curentLevel) {
  if (gamePattern[curentLevel] === userChoosenPattern[curentLevel]) {
    if (gamePattern.length === userChoosenPattern.length) {
      level++;
      setTimeout(nextSequence, 500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
