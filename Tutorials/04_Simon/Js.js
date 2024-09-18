var colorButtons = ["red", "blue", "green", "yellow"];

var gameSequence = [];
var userSequence = [];

var isGameStarted = false;
var gameLevel = 0;

$(document).keypress(function() {
  if (!isGameStarted) {
    $("#level-title").text("Level " + gameLevel);
    generateNextColor();
    isGameStarted = true;
  }
});

$(".btn").click(function() {

  var clickedColor = $(this).attr("id");
  userSequence.push(clickedColor);

  playColorSound(clickedColor);
  pressAnimation(clickedColor);

  verifyAnswer(userSequence.length - 1);
});

function verifyAnswer(currentStep) {
  if (gameSequence[currentStep] === userSequence[currentStep]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(function () {
        generateNextColor();
      }, 1000);
    }
  } else {
    playColorSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    resetGame();
  }
}

function generateNextColor() {
  userSequence = [];
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);

  var randomIndex = Math.floor(Math.random() * 4);
  var selectedColor = colorButtons[randomIndex];
  gameSequence.push(selectedColor);

  playFullSequence();
}

function playFullSequence() {
  let i = 0;

  // Verificamos si la secuencia tiene al menos un color
  if (gameSequence.length === 0) {
    generateNextColor();
    return;
  }

  const interval = setInterval(function() {
    var currentColor = gameSequence[i];
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playColorSound(currentColor);

    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 600);
}

function pressAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playColorSound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}

function resetGame() {
  gameLevel = 0;
  gameSequence = [];
  isGameStarted = false;
}
