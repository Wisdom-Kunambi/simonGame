// alert("Hello Kunambi")

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

// Ensure the dom is loaded before running the game

$(document).ready(function() {
function nextSequence() {

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play sound for the button colour selected
    playSound(randomChosenColour);

    // return randomNumber;
    console.log(gamePattern);
}

function playSound(randomChosenColour) {
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

nextSequence()

});