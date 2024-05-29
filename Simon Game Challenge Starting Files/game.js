// Define the array of button colors
let buttonColours = ["red", "blue", "green", "yellow"];

// Create the game pattern and user clicked pattern arrays
let gamePattern = [];
let userClickedPattern = [];

// Variable to track the game level
let level = 0;

// Variable to track if the game has started
let started = false;

// Ensure the DOM is loaded before running the game logic
$(document).ready(function() {

    // Detect keyboard key press to start the game
    $(document).keypress(function() {
        if (!started) {
            // Update the h1 to show level 0
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    // Function to generate the next sequence in the game
    function nextSequence() {
        // Increment the level each time nextSequence is called
        level++;
        
        // Update the h1 to show the current level
        $("#level-title").text("Level " + level);

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        // Animate the button associated with the chosen color
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        // Play sound for the button color selected
        playSound(randomChosenColour);

        console.log(gamePattern);

        // Reset userClickedPattern for the next level
        userClickedPattern = [];
    }

    // Function to play the sound associated with the given color
    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Function to animate button press
    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    // Detect button clicks and handle the user's choice
    $(".btn").click(function() {
        // Get the ID of the clicked button
        let userChosenColour = $(this).attr("id");

        // Add the clicked button's color to the user clicked pattern
        userClickedPattern.push(userChosenColour);

        // Play the sound associated with the clicked button
        playSound(userChosenColour);

        // Animate the button press
        animatePress(userChosenColour);

        // Call checkAnswer() after a user has clicked and chosen their answer
        checkAnswer(userClickedPattern.length - 1);

        // Log the user clicked pattern to the console
        console.log(userClickedPattern);
    });

    // Function to check the user's answer against the game pattern
    function checkAnswer(currentLevel) {
        // Check if the most recent user answer is the same as the game pattern
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("success");

            // Check if the user has finished their sequence
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            console.log("wrong");

            // Play the "wrong" sound
            playSound("wrong");

            // Apply the "game-over" class to the body
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            // Change the h1 title to prompt a restart
            $("#level-title").text("Game Over, Press Any Key to Restart");

            // Restart the game
            startOver();
        }
    }

    // Function to restart the game
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});
