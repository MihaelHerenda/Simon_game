let green = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/green.mp3");
let yellow = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/yellow.mp3");
let red = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/red.mp3");
let blue = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/blue.mp3");
let wrong = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/wrong.mp3");
let gameStarted = false;
let level = 0;
let orderOfSquaresArr = [];
let pressCounter = 0;
const squareNumberDict = {
  1: "green",
  2: "yellow",
  3: "red",
  4: "blue",
};

const squareSoundDict = {
  1: green,
  2: yellow,
  3: red,
  4: blue,
};

function resetAll() {
  $("h1").html("You lost at level " + level + ".");
}

function wrongPress() {
  let wrong = new Audio("https://github.com/MihaelHerenda/Simon_game/blob/main/sounds/wrong.mp3");
  wrong.play();
  $("body").css("background-color", "red");
  setTimeout(function () {
    $("body").css("background-color", "#183D3D");
  }, 200);
}

function generateSquare() {
  level++;
  var squareNr = Math.ceil(Math.random() * 4);
  squareSoundDict[squareNr].play();
  orderOfSquaresArr.push(squareNr);
  let nextSquare = squareNumberDict[squareNr];
  $("." + nextSquare)
    .animate({ opacity: 0.2 })
    .animate({ opacity: 1 });
  $("h1").html("Level " + level);
  return squareNr;
}

$("body").keypress(function (e) {
  if (gameStarted) {
    wrongPress();
    return;
  } else {
    gameStarted = true;
    generateSquare();
  }
});

$(".start-button").click(function (e) {
  if (gameStarted) {
    wrongPress();
    return;
  } else {
    gameStarted = true;
    $("h1").html("Level 1");
    setTimeout(generateSquare, 500);
  }
});

$(".button-style").click(function (e) {
  e.preventDefault();
  if (gameStarted == false) {
    wrongPress();
    pressCounter = 0;
    return;
  } else if (e.target.id == orderOfSquaresArr[pressCounter]) {
    squareSoundDict[e.target.id].play();
    pressCounter++;
    if (pressCounter == orderOfSquaresArr.length) {
      pressCounter = 0;
      setTimeout(generateSquare, 750);
    }
  } else {
    wrongPress();
    resetAll();
    pressCounter = 0;
    level = 0;
    gameStarted = false;
  }
});
